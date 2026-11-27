# /teach-yourself-piano/: US spelling update

This page has no metric units, so this update only changes British spellings to American ones. 31 words in the article, 2 in the FAQ schema, 5 images and the 30-day challenge PDF:

| Before | After |
|---|---|
| practise / practised / practising | practice / practiced / practicing |
| favourite | favorite |
| centre | center |
| recognisable | recognizable |
| pedalling | pedaling |

Nothing else changed: same headings, links, buttons, layout and word count. The section anchor `#how-to-practise-piano-by-yourself` keeps its old spelling, so links already pointing to it still work. Visitors don't see it.

## Images redrawn (5)
`learning-piano-myths-vs-facts`, `science-of-learning-piano-statistics`, `piano-practice-tempo-ladder-metronome`, `how-to-practice-piano-chunking-method`, `weekly-piano-practice-schedule`. They keep the same file names and sizes. The article now loads them from `/content/images/2026/11/`.

## How to update the post
1. **Images:** upload the 5 `.webp` files from `us-spelling-update.zip` this month (November), so they land in `/content/images/2026/11/`. The easiest way is to drag them into an image card, then delete the card.
2. **PDF:** add a File card, upload `30-day-piano-challenge.pdf` from the zip, then delete the card. The download button links to `/content/files/2026/11/30-day-piano-challenge.pdf`. If Ghost renames it (for example `-1.pdf`), change that one link in `article.html`.
3. **Article:** select everything in the editor, delete it, add one HTML card and paste all of `article.html`.
4. **Code injection → Post header:** replace everything with `code-injection-header.html`. Its FAQ answers match the new visible FAQ word for word.
5. **Update**, then request indexing in Search Console.

Old October images and the old PDF can stay in Ghost; nothing links to them any more.
