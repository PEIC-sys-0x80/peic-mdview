//scriptloader.js by PEIC studio

/**
 * 動態載入腳本並支援備援 URL。
 * @param {Array<string>} urls - 備援 URL 列表。
 * @param {Object} params - 需要附加到 <script> 標籤的屬性參數。
 * @returns {Promise<void>}
 */
 export async function loadScriptWithBackup(urls, params = {}) {
    for (const url of urls) {
        try {
            await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;

                // 附加傳遞的自定義參數
                Object.entries(params).forEach(([key, value]) => {
                    if (typeof value === 'boolean') {
                        // 對於布林值屬性，僅添加屬性名
                        if (value) script.setAttribute(key, '');
                    } else {
                        script.setAttribute(key, String(value));
                    }
                });

                // 設置加載完成和錯誤回調
                script.onload = () => {
                    console.log(`成功加載腳本：${url}`);
                    resolve();
                };
                script.onerror = () => {
                    console.error(`加載腳本失敗：${url}`);
                    reject(new Error(`Failed to load script: ${url}`));
                };

                // 插入到 <head>
                document.head.appendChild(script);
            });
            // 如果加載成功，結束函數
            return;
        } catch (err) {
            console.warn(`備援 URL 加載失敗：${url}`);
        }
    }
    // 如果所有 URL 加載均失敗，拋出異常
    throw new Error('所有備援 URL 加載失敗');
}

/**
 * 順序加載多個腳本。
 * @param {Array<Object>} scripts - 腳本配置的列表。
 * @returns {Promise<void>}
 */
export async function loadScriptsSequentially(scripts) {
    for (const script of scripts) {
        const { urls, params = {} } = script;
        try {
            await loadScriptWithBackup(urls, params);
        } catch (err) {
            console.error(`加載腳本失敗：${err.message}`);
            throw err;
        }
    }
}
