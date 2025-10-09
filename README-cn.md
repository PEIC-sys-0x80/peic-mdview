# PEIC-mdview：轻量级纯前端 Markdown 内容渲染框架

| [繁體中文](README-tw.md) | **简体中文** | [English](README.md) |

**PEIC-mdview** 是一套**基于浏览器**运行的纯前端网页框架，旨在提供一个**高效且高兼容性**的解决方案，将 Markdown 文件内容**无需依赖后端**即时渲染为网页格式。

本框架核心采用了 `marked.js` 和 `Katex.js` 函数库，确保了卓越的解析和渲染能力。

### 核心功能与设计优势

* **无服务器依赖的内容渲染：** 支持直接加载并显示 **.md** 文件，整个渲染流程在浏览器前端完成，**无需任何后端处理或额外的文件转换步骤**。
* **专业数学公式支持：** 整合 **Katex** 函数库，可完整解析并高效渲染 Markdown 内容中所嵌入的复杂数学公式。
* **界面主题与效果：** 内置**深色（Dark）与浅色（Light）**主题，并透过 `canvas-nest.js` 增强视觉背景效果。

---

## 部署方案与版本区分

本项目提供三种结构规格，以适应不同的部署环境限制与维护需求，所有规格的显示效果完全一致：

| 规格名称 | 结构特性 | 适用场景与优势 |
| :--- | :--- | :--- |
| **`peic-mdview-large`** | HTML、CSS 与所有 JS **文件独立**。 | 适用于标准网站服务器环境；结构清晰，**极度便于代码修改、追踪与长期维护**。 |
| **`peic-mdview-simple`** | CSS、JS **内嵌**于 HTML 中，但 `.md` 文件保持独立。 | 适用于需要将显示内容**嵌入**至现有系统或对文件数量有优化需求的场景。 |
| **`peic-mdview-single`** | 所有 CSS、JS 与 `.md` 内容**完全整合**在单一 HTML 文件中。 | 专为只能接受**单文件部署**的特殊网页服务器设计（例如某些静态页面服务或云函数）。 |

---

## 技术依赖：第三方 JavaScript 函数库

PEIC-mdview 的实现依赖于下列优秀的开源项目：

* [marked](https://github.com/markedjs/marked) - 高性能的 Markdown 解析器。
* [KaTeX](https://github.com/KaTeX/KaTeX) - 快速且高质量的数学排版引擎。
* [canvas-nest](https://github.com/hustcc/canvas-nest.js) - 轻量级的动态粒子背景特效。