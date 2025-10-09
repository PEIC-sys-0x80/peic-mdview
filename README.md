# PEIC-mdview：輕量級純前端 Markdown 內容渲染框架

| **繁體中文** | [简体中文](README-cn.md) | [English](README-en.md) |

**PEIC-mdview** 是一套**基於瀏覽器**運行的純前端網頁框架，旨在提供一個**高效且高相容性**的解決方案，將 Markdown 文件內容**無需依賴後端**即時渲染為網頁格式。

本框架核心採用了 `marked.js` 和 `Katex.js` 函式庫，確保了卓越的解析和渲染能力。

### 核心功能與設計優勢

* **無伺服器依賴的內容渲染：** 支援直接加載並顯示 **.md** 文件，整個渲染流程在瀏覽器前端完成，**無需任何後端處理或額外的檔案轉換步驟**。
* **專業數學公式支援：** 整合 **Katex** 函式庫，可完整解析並高效渲染 Markdown 內容中所嵌入的複雜數學公式。
* **介面主題與效果：** 內建**深色（Dark）與淺色（Light）**主題，並透過 `canvas-nest.js` 增強視覺背景效果。

---

## 部署方案與版本區分

本專案提供三種結構規格，以適應不同的部署環境限制與維護需求，所有規格的顯示效果完全一致：

| 規格名稱 | 結構特性 | 適用場景與優勢 |
| :--- | :--- | :--- |
| **`peic-mdview-large`** | HTML、CSS 與所有 JS **檔案獨立**。 | 適用於標準網站伺服器環境；結構清晰，**極度便於程式碼修改、追蹤與長期維護**。 |
| **`peic-mdview-simple`** | CSS、JS **內嵌**於 HTML 中，但 `.md` 文件保持獨立。 | 適用於需要將顯示內容**嵌入**至現有系統或對檔案數量有優化需求的場景。 |
| **`peic-mdview-single`** | 所有 CSS、JS 與 `.md` 內容**完全整合**在單一 HTML 檔案中。 | 專門設計給只能接受**單檔案部署**的特殊網頁伺服器（例如某些靜態頁面服務或雲端函式）。 |

---

## 技術依賴：第三方 JavaScript 函式庫

PEIC-mdview 的實現依賴於下列優秀的開源專案：

* [marked](https://github.com/markedjs/marked) - 高性能的 Markdown 解析器。
* [KaTeX](https://github.com/KaTeX/KaTeX) - 快速且高品質的數學排版引擎。
* [canvas-nest](https://github.com/hustcc/canvas-nest.js) - 輕量級的動態粒子背景特效。