"""
This script reads markdown content from 'input.md', sends it to the Bibcit API to convert it to a PDF document,
and saves the resulting PDF document to 'output.pdf'.
"""

import requests

# read markdown content from a file
with open("input.md", "r", encoding="utf-8") as f:
    markdown_content = f.read()

response = requests.post(
    "https://api.bibcit.com/api/massivemark/mtop",
    headers={
        "Content-Type": "text/plain;charset=UTF-8",
        "Bibcit-Key": "da454899bdfa4d2ea7b00bf910511dd6", # replace with your actual API key
    },
    data=markdown_content.encode("utf-8"),
)

# save it to a file
with open("output.pdf", "wb") as f:
    f.write(response.content)
