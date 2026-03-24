/**
 * This script reads markdown content from 'input.md', sends it to the Bibcit API to convert it to a Word document, 
 * and saves the resulting Word document to 'output.docx'.
 */

import fs from 'fs';

// read markdown content from a file
const markdownContent = fs.readFileSync('input.md', 'utf-8');


const upstreamRes = await fetch(`https://api.bibcit.com/api/massivemark/mtow`, {
        method: "POST",
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8',
            'Bibcit-Key': 'da454899bdfa4d2ea7b00bf910511dd6', // replace with your actual API key
        },
        body: markdownContent,
  });

const wordContent = await upstreamRes.arrayBuffer();
// save it to a file
fs.writeFileSync('output.docx', Buffer.from(wordContent));