# Paste the corrected P-145 review

`article-revised.html` is your live article with every fix from `AUDIT-2026-10-07.md` applied. It keeps Richard's wording, except where a fact was wrong. It was tested inside the Pianoers theme at desktop and phone sizes: the contents list shows 8 sections, both buy buttons carry `rel="sponsored"`, and there is no sideways scrolling.

## 1. Back up the current version

Open the post in Ghost Admin. Select all of the body (click in the text, then Ctrl/Cmd + A twice), copy it, and paste it into a text file. That's your way back.

## 2. Paste the new body

1. Open `article-revised.html` in a browser.
2. Select from the first paragraph ("If you're starting piano right now…") to the last FAQ answer ("…springy keyboard nonsense."), and copy.
3. In Ghost, select all of the post body, delete it, and paste.

Headings, lists, links, bold text and the two images come across as normal Ghost content.

## 3. Rebuild the five HTML blocks

Pasting can't create Ghost cards. For each of these, type `/html` where it belongs and paste that block's code from the file. The blocks are marked `<!--kg-card-begin: html-->` … `<!--kg-card-end: html-->`; open the file in a text editor to copy them.

| Block | Where it goes |
|---|---|
| P-145 vs P-145BT table | after "Short answer: almost nothing…" |
| First Amazon button | after "…thank me later." |
| Quick Comparison | after the P-45 intro paragraph |
| Second Amazon button | after "Pair it with a good stand…" |
| FAQ structured data (`<script type="application/ld+json">`) | at the very end; it's invisible on the page |

Then delete any leftover text that came across from those blocks.

The buttons must stay HTML cards: a Ghost button card can't carry `rel="sponsored"`. (The theme adds it anyway; this is a second layer.)

## 4. Put the video back

Find the blue line "▶ VIDEO GOES HERE…". Delete it, type `/youtube`, paste `https://www.youtube.com/watch?v=wr4i_Ma8r6U&t=18s`, press Enter, and type the caption "Demo of Yamaha P-145 (How it sounds)".

## 5. Post settings (gear icon, top right)

- **Tags:** add `#affiliate` (with the `#`). The theme then shows the affiliate disclosure under the title.
- **Excerpt:** `I've played the Yamaha P-145 since 2023 and bought the P-145BT. Honest pros, cons, specs and how it compares with the P-45 for beginners.`
- **Meta data:**
  - Meta title: `Yamaha P-145BT Review 2026: Still My #1 Beginner Piano`
  - Meta description: same text as the excerpt.
- **Code injection → Post header:** delete the old FAQ `<script type="application/ld+json">` block. The corrected one is now in the post itself. Leaving both means Google sees two conflicting FAQs.

Click **Update**.

## 6. Check it

Open the post on your phone and on a computer:
- The contents list shows 8 entries.
- Both buttons read "Check the P-145BT price on Amazon".
- The video plays.
- The disclosure line appears under the title.

Optional: paste the URL into [Google's Rich Results Test](https://search.google.com/test/rich-results). It should find one FAQ and one Article, with no errors.
