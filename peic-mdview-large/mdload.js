// mdload.js by PEIC studio
import { loadScriptsSequentially } from './scriptLoader.js';

/**
 * 主加載邏輯，用於加載 Markdown 並初始化其他腳本
 * @param {string} markdownUrl - Markdown 文件的 URL
 * @param {string} targetElementId - Markdown 加載到的 DOM 元素 ID
 */
async function loadMarkdown(markdownUrl, targetElementId) {
    console.log("加載 Markdown 文件...");

    // 配置要動態加載的附加腳本
    const additionalScripts = [
        {
            urls: [
                "./marked.min.js",
                "https://unpkg.com/marked@latest/marked.min.js",
                  
            ], 
        }
        
    ];

    // 按順序加載附加腳本
    await loadScriptsSequentially(additionalScripts);

    // 確保 marked 庫已加載
    if (typeof marked === "undefined") {
        console.error("Marked.js 未正確加載");
        document.getElementById(targetElementId).innerHTML = "<p>加載失敗: Marked.js 未加載成功</p>";
        return;
    }

    // 嘗試加載 Markdown 文件
    try {
        const response = await fetch(markdownUrl);
        if (!response.ok) {
            throw new Error(`無法加載文件: ${response.status} ${response.statusText}`);
        }
        const markdownText = await response.text();
        console.log("成功加載 Markdown 文件:", markdownText);

        // 使用 marked 解析 Markdown
        const htmlContent = marked.parse(markdownText);
        document.getElementById(targetElementId).innerHTML = htmlContent;
    } catch (error) {
        console.error("加載 Markdown 文件失敗:", error);
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