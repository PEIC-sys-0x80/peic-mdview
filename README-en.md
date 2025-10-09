# PEIC-mdview: A Lightweight Pure Frontend Markdown Content Rendering Framework

| [繁體中文](README.md) | [简体中文](README-cn.md) | **English** |

**PEIC-mdview** is a pure frontend web framework designed to run **entirely in the browser**. It provides an **efficient and highly compatible** solution for rendering Markdown file content into a web page format **without any backend dependencies**.

The framework is built upon the leading libraries `marked.js` and `Katex.js`, ensuring superior parsing and rendering capabilities.

### Core Features and Design Advantages

* **Serverless Content Rendering:** Supports direct loading and display of **.md** files. The entire rendering process is completed on the frontend, **eliminating the need for any backend processing or external conversion steps**.
* **Professional Math Formula Support:** Integration with the **Katex** library allows for the complete parsing and high-performance rendering of complex mathematical formulas embedded within your Markdown content.
* **Interface Themes and Effects:** Includes built-in **Dark and Light** themes and utilizes `canvas-nest.js` to provide an enhanced visual background effect.

---

## Deployment Schemes and Version Distinction

The project offers three structural specifications to accommodate different deployment environment constraints and maintenance requirements. The visual display is identical across all versions:

| Specification Name | Structural Characteristics | Applicable Scenarios and Advantages |
| :--- | :--- | :--- |
| **`peic-mdview-large`** | HTML, CSS, and all JS files are **separate and independent**. | Ideal for standard web server environments; the clean structure makes it **extremely easy for code modification, tracing, and long-term maintenance**. |
| **`peic-mdview-simple`** | CSS and JS are **embedded** within the HTML, but the `.md` file remains independent. | Suitable for environments requiring **content embedding** or those needing optimization for a minimal number of files. |
| **`peic-mdview-single`** | All CSS, JS, and `.md` content are **fully integrated** into a single HTML file. | Specifically designed for web servers (e.g., certain static page services or cloud functions) that only accept **single-file deployment**. |

---

## Technical Dependencies: Third-Party JavaScript Libraries

The implementation of PEIC-mdview relies on the following excellent open-source projects:

* [marked](https://github.com/markedjs/marked) - A high-performance Markdown parser.
* [KaTeX](https://github.com/KaTeX/KaTeX) - A fast and high-quality math typesetting engine.
* [canvas-nest](https://github.com/hustcc/canvas-nest.js) - A lightweight dynamic particle background effect.