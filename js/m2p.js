/**
 * This script reads markdown content from 'input.md', sends it to the Bibcit API to convert it to a PDF document,
 * and saves the resulting PDF document to 'output.pdf'.
 */

import fs from 'fs';

// read markdown content from a file
const markdownContent = fs.readFileSync('input.md', 'utf-8');


const upstreamRes = await fetch(`https://api.bibcit.com/api/massivemark/mtop`, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
            'Bibcit-Key': 'da454899bdfa4d2ea7b00bf910511dd6', // replace with your actual API key
        },
        body: markdownContent,
  });

const pdfContent = await upstreamRes.arrayBuffer();
// save it to a file
fs.writeFileSync('output.pdf', Buffer.from(pdfContent));