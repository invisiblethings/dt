# /piano-basics-a-beginners-guide-to-the-keyboard/: US spelling update

The page has no metric units, so this update changes British spellings to American ones in the article (23 words), the FAQ schema (2) and the 31-page PDF guide.

| Before | After |
|---|---|
| practise / practising | practice / practicing |
| favourite | favorite |
| centre | center |
| labelled | labeled |
| neighbouring | neighboring |
| pedalling | pedaling |
| harmonised | harmonized |

Nothing else changed: same headings, links, layout and word count. None of the 13 images contain these words, so no images need re-uploading.

## How to update the post
1. **PDF:** add a File card, upload `piano-basics-beginners-guide.pdf`, then delete the card. Do this in November: both download buttons now link to `/content/files/2026/11/piano-basics-beginners-guide.pdf`. If Ghost renames the file (for example `-1.pdf`), change those two links in `article.html`.
2. **Article:** select everything in the editor, delete it, add one HTML card and paste all of `article.html`.
3. **Code injection → Post header:** replace everything with `code-injection-header.html`. Its FAQ answers match the visible FAQ word for word.
4. **Update**, then request indexing in Search Console.

## Optional: "bar" vs "measure"
The guide says "bar" 24 times. Americans say both, but "measure" is more common in US teaching books. The page already says "bars (also called measures)" and "Bar (measure)" in the glossary, so it's clear to US readers as it is. Switching to "measure" would also mean redrawing 2 images and the PDF practice log, so I left it.
