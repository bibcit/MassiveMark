# MassiveMark

MassiveMark is an API that converts **Markdown** into other document formats — **HTML**, **Word (.docx)**, and **PDF**. This repository contains ready-to-run sample code in **JavaScript** and **Python** so you can get started quickly.

---

## What does this API do?

You send Markdown text to the MassiveMark API and it returns the converted document. Three endpoints are available:

| Endpoint | Converts to | Response type |
|---|---|---|
| `/api/massivemark/mtoh` | HTML | JSON (`{ "htmlContent": "..." }`) |
| `/api/massivemark/mtow` | Word (.docx) | Binary file |
| `/api/massivemark/mtop` | PDF | Binary file |

Base URL: `https://api.bibcit.com`

---

## Getting your API Key

To call the MassiveMark API you will need an **API key**.

1. Create an account at [Bibcit](https://bibcit.com).
2. Go to your **Profile**.
3. Under the **API Key** section you will find your key.

> **Keep your key secret.** Do not commit it to public repositories. The key shown in the sample code is for demonstration only.

---

## Project Structure

```
MassiveMark/
├── js/                   # JavaScript examples (Node.js)
│   ├── input.md          # Sample Markdown input
│   ├── m2h.js            # Markdown → HTML
│   ├── m2w.js            # Markdown → Word
│   ├── m2p.js            # Markdown → PDF
│   └── output.html       # Sample HTML output
├── py/                   # Python examples
│   ├── m2h.py            # Markdown → HTML
│   ├── m2w.py            # Markdown → Word
│   └── m2p.py            # Markdown → PDF
├── LICENSE
└── README.md
```

---

## Prerequisites

| Language | Requirement |
|---|---|
| JavaScript | [Node.js](https://nodejs.org/) v18 or later (for built-in `fetch`) |
| Python | [Python](https://www.python.org/) 3.7 or later + the `requests` library |

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/MassiveMark.git
cd MassiveMark
```

### 2. Add your Markdown

Place the Markdown content you want to convert in `input.md` inside the `js/` or `py/` folder (or both). A sample file is already provided.

---

### JavaScript

```bash
cd js
node m2h.js    # Creates output.html
node m2w.js    # Creates output.docx
node m2p.js    # Creates output.pdf
```

### Python

First install the required library (one-time):

```bash
pip install requests
```

Then run the scripts:

```bash
cd py
python m2h.py    # Creates output.html
python m2w.py    # Creates output.docx
python m2p.py    # Creates output.pdf
```

---

## How the API call works (step by step)

Every script follows the same three steps:

### Step 1 — Read the Markdown file

```python
# Python
with open("input.md", "r", encoding="utf-8") as f:
    markdown_content = f.read()
```

```javascript
// JavaScript
const markdownContent = fs.readFileSync('input.md', 'utf-8');
```

### Step 2 — Send a POST request to the API

Send the raw Markdown text in the request body with two required headers:

| Header | Value |
|---|---|
| `Content-Type` | `text/plain;charset=UTF-8` |
| `Bibcit-Key` | Your API key |

```python
# Python (Markdown → HTML)
response = requests.post(
    "https://api.bibcit.com/api/massivemark/mtoh",
    headers={
        "Content-Type": "text/plain;charset=UTF-8",
        "Bibcit-Key": "YOUR_API_KEY",
    },
    data=markdown_content.encode("utf-8"),
)
```

```javascript
// JavaScript (Markdown → HTML)
const response = await fetch('https://api.bibcit.com/api/massivemark/mtoh', {
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
        'Bibcit-Key': 'YOUR_API_KEY',
    },
    body: markdownContent,
});
```

### Step 3 — Save the response

- **HTML** — the response is JSON. Extract the `htmlContent` field and save as `.html`.
- **Word / PDF** — the response is binary data. Save the raw bytes as `.docx` or `.pdf`.

```python
# Python — HTML
html_content = response.json()["htmlContent"]
with open("output.html", "w", encoding="utf-8") as f:
    f.write(html_content)

# Python — Word / PDF (binary)
with open("output.docx", "wb") as f:
    f.write(response.content)
```

```javascript
// JavaScript — HTML
const { htmlContent } = await response.json();
fs.writeFileSync('output.html', htmlContent);

// JavaScript — Word / PDF (binary)
const binaryContent = await response.arrayBuffer();
fs.writeFileSync('output.docx', Buffer.from(binaryContent));
```

---

## API Reference

### Request

```
POST https://api.bibcit.com/api/massivemark/{endpoint}
```

| Parameter | Location | Description |
|---|---|---|
| `endpoint` | URL path | One of `mtoh` (HTML), `mtow` (Word), `mtop` (PDF) |
| `Bibcit-Key` | Header | Your API key |
| `Content-Type` | Header | Must be `text/plain;charset=UTF-8` |
| *body* | Request body | Raw Markdown text |

### Response

| Endpoint | Content-Type | Body |
|---|---|---|
| `mtoh` | `application/json` | `{ "htmlContent": "<html>..." }` |
| `mtow` | `application/octet-stream` | Binary `.docx` file |
| `mtop` | `application/octet-stream` | Binary `.pdf` file |

---

## Building a product with this API

Here are some ideas to get you started:

- **Blog engine** — Convert Markdown posts to HTML and serve them on a website.
- **Report generator** — Let users write in Markdown and download PDF/Word reports.
- **Documentation site** — Bulk-convert a folder of `.md` files to HTML pages.
- **Note-taking app** — Offer "Export to PDF / Word" using the API.

The sample scripts show the core pattern: **read → call API → save**. Wrap that pattern in your own application logic and you have a product.

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `ModuleNotFoundError: No module named 'requests'` | Run `pip install requests` |
| `fetch is not defined` (Node.js) | Use Node.js v18+ which includes `fetch` |
| `401 Unauthorized` | Check that your `Bibcit-Key` header is correct |
| Empty or corrupt output file | Ensure `input.md` contains valid Markdown |

---

## License

See the [LICENSE](LICENSE) file for details.