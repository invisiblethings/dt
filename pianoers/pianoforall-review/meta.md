# Publishing the rewritten /pianoforall-review/

Keep the same post and URL: edit the existing post, don't create a new one. That keeps its history and links.

## 1. Replace the content
Open the post, select everything in the editor and delete it. Add one HTML card and paste in all of `article.html`.
- The video, the images and the chord-taste piano reuse files already on your site, so nothing needs uploading.
- The old in-body "Get Another 20% OFF with Code: SAVE20" button is gone. Pianoforall no longer lists that code.

## 1b. Upload the course-player screenshot
In the article there's an image at `/content/images/2026/10/pianoforall-course-player.webp`. Upload `pianoforall-course-player.webp` (in this folder) by adding an image card anywhere in the post, then delete that card. Ghost saves it at that path if you upload it in October 2026 under the same file name. If Ghost gives it a different name (e.g. `-1.webp`), change the `src` in the HTML card to match. Or simply replace the `<figure>` with a normal Ghost image card holding the screenshot, and use this alt text: *The Pianoforall course player: the 10 course sections on the left, the Section 1 lesson list in the middle and the video lesson Getting to know the keyboard playing on the right.*

## 2. Post settings (gear icon)
| Field | Value |
|---|---|
| Title (H1) | `Pianoforall Review (2026): Is the $49 Chord-First Course Worth It?` |
| URL | keep `pianoforall-review` |
| Tags (in this order) | `Courses`, `Lessons`, `#affiliate` |
| Excerpt | `A piano teacher's Pianoforall review: how the online course works, the new 7-day free trial and $49 one-time price, who it suits, and the best alternatives.` |
| Meta title (58) | `Pianoforall Review 2026: Worth It? A Piano Teacher's Verdict` |
| Meta description (154) | `A piano teacher reviews Pianoforall: how the course works, the 7-day free trial, the $49 price, what it doesn't teach, and who should pick something else.` |
| X / Facebook | same title and description |
| Feature image | keep `Pianoforall_Review.jpg` (1200 × 675) |

## 3. Code injection > Post header
Delete the old Course script (its rating is the text "RATING", which is invalid). Paste `code-injection-header.html` in its place.

## 4. After you publish
- Request indexing in Search Console (URL Inspection).
- Check the trial is live through your affiliate link: open `/pianoforall` in a private window and make sure the page says "Free for 7 days".
