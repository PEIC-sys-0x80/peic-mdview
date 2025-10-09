// mdload.js by PEIC studio - 已加入 KaTeX/LaTeX 支援
import { loadScriptsSequentially } from './scriptLoader.js';

/**
 * 使用 KaTeX 渲染 LaTeX 字符串
 * @param {string} mathText - 數學公式文字 (不含 $ 或 $$ 符號)
 * @param {boolean} displayMode - 是否為區塊顯示模式 (用 $$ 包裹)
 * @returns {string} 渲染後的 HTML 字符串
 */
function renderKaTeX(mathText, displayMode) {
    if (typeof katex === 'undefined') {
        console.error("KaTeX 庫未載入。無法渲染數學公式:", mathText);
        // 如果 KaTeX 未載入，則返回原始公式作為錯誤提示
        const className = displayMode ? "katex-error-block" : "katex-error-inline";
        return `<span class="${className}" style="color: red; background: #ffe0e0; padding: 2px;">$${displayMode ? '$' : ''}${mathText}$${displayMode ? '$' : ''} (KaTeX Not Loaded)</span>`;
    }

    try {
        // 使用 katex.renderToString 進行渲染，並設定 displayMode
        return katex.renderToString(mathText, {
            throwOnError: false, // 避免渲染失敗時拋出錯誤，而是顯示錯誤信息
            displayMode: displayMode,
            trust: true // 允許 Marked.js 處理 KaTeX 渲染出的 HTML
        });
    } catch (e) {
        console.error("KaTeX 渲染錯誤:", e, "公式:", mathText);
        // 渲染失敗時，顯示一個錯誤提示
        return `<span class="katex-error-placeholder" style="color: red;">渲染錯誤: ${mathText}</span>`;
    }
}

/**
 * 建立一個 Marked.js 擴充功能來處理 $...$ 和 $$...$$ 數學公式
 * @returns {object[]} Marked 擴充功能陣列
 */
function createKaTeXExtensions() {
    // 區塊級數學公式 (Block Math): 以 $$...$$ 包裹，且獨立成行
    const blockMath = {
        name: 'blockMath',
        level: 'block',
        tokenizer(src) {
            // 匹配 $$...$$
            const rule = /^ {0,3}\$\$([^\$]*?)\n?\$\$ *(?:\n|$)/; 
            const match = rule.exec(src);
            
            if (match) {
                const text = match[1].trim(); 
                if (text.length === 0) return false; 
                return {
                    type: 'blockMath',
                    raw: match[0],
                    text: match[1], 
                    tokens: []
                };
            }
            return false;
        },
        renderer(token) {
            // 使用 KaTeX 渲染並設定為區塊顯示模式
            return renderKaTeX(token.text, true) + '\n';
        }
    };

    // 行內級數學公式 (Inline Math): 以 $...$ 包裹
    const inlineMath = {
        name: 'inlineMath',
        level: 'inline',
        
        // **關鍵修正**：新增 start 方法，確保 Marked 遇到 $ 時會檢查此擴充功能
        start(src) {
            return src.indexOf('$');
        },
        
        tokenizer(src) {
            // 匹配 $...$
            const rule = /^\$((?:\\\$|[^$])+?)\$/; 
            const match = rule.exec(src);
            
            if (match) {
                const content = match[1];

                // 避免匹配到單獨的 $ 符號或空內容
                if (content.trim().length === 0) return false; 
                
                return {
                    type: 'inlineMath',
                    raw: match[0],
                    text: match[1],
                    tokens: []
                };
            }
            return false;
        },
        renderer(token) {
            // 使用 KaTeX 渲染並設定為行內模式
            return renderKaTeX(token.text, false);
        }
    };

    return [blockMath, inlineMath];
}


/**
 * 主加載邏輯，用於加載 Markdown 並初始化其他腳本
 * @param {string} markdownUrl - Markdown 文件的 URL
 * @param {string} targetElementId - Markdown 加載到的 DOM 元素 ID
 */
async function loadMarkdown(markdownUrl, targetElementId) {
    console.log("加載 Markdown 文件...");

    // 配置要動態加載的附加腳本: 加入 KaTeX 核心庫
    const additionalScripts = [
        {
            urls: [
                "./marked.min.js",
                "https://unpkg.com/marked@latest/marked.min.js",
            ],
        },
        // ----------------------------------------------------
        // 新增: KaTeX 核心 JS 庫 (用於渲染)
        // ----------------------------------------------------
        {
            urls: [
                "./katex.min.js",
                "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
            ],
        },
        // ----------------------------------------------------
    ];

    // 按順序加載附加腳本
    await loadScriptsSequentially(additionalScripts);

    // 確保 marked 庫已加載
    if (typeof marked === "undefined") {
        console.error("Marked.js 未正確加載");
        document.getElementById(targetElementId).innerHTML = "<p>加載失敗: Marked.js 未加載成功</p>";
        return;
    }

    // ----------------------------------------------------
    // 新增: 配置 Marked.js 處理 KaTeX
    // ----------------------------------------------------
    try {
        const extensions = createKaTeXExtensions();
        
        // 將擴充功能加入到 Marked
        marked.use({ extensions: extensions });
        
        // 設置 Marked 選項: 禁用 sanitize 以允許 KaTeX 渲染的 HTML 通過
        marked.setOptions({
            gfm: true,
            sanitize: false 
        });

    } catch(e) {
        console.warn("Marked.js 配置 KaTeX 擴充功能失敗:", e);
    }
    // ----------------------------------------------------
    
    // 嘗試加載 Markdown 文件
    try {
        const response = await fetch(markdownUrl);
        if (!response.ok) {
            throw new Error(`無法加載文件: ${response.status} ${response.statusText}`);
        }
        const markdownText = await response.text();
        console.log("成功加載 Markdown 文件...");

        // 使用配置好的 marked 實例解析 Markdown
        const htmlContent = marked.parse(markdownText);
        
        // 將結果插入 DOM
        document.getElementById(targetElementId).innerHTML = htmlContent;

    } catch (error) {
        console.error("加載或渲染 Markdown 文件失敗:", error);
        document.getElementById(targetElementId).innerHTML = `<p>加載失敗: ${error.message}</p>`;
    }
}

// 導出函數供使用
export { loadMarkdown };


/*
此js由PEIC Studio開發。 主要功能為使用"Marked.js"進行markdown編譯，並將結果展示於html上。

        {
            // 備援 URL 列表，這裡只有一個 URL
            urls: [
                'http://peiclncserv.softether.net:32769/ew_public/web_lib/convas-nest-min/canvas-nest.min.js',
                './canvas-nest.min.js',
            ],

        // 自定義腳本屬性
            params: {
                'type': 'text/javascript',
                'color': '0,60,255',
                'opacity': '0.7',
                'zIndex': '-2',
                'count': '99'
            },

        },



*/