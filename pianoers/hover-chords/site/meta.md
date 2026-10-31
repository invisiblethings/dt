# Two Ghost pages: /hover-chords/ and /hover-chords-privacy/

Create both as **Pages** (Ghost Admin > Pages > New page), not posts, so they stay out of the blog feed and the homepage.

## Order to publish
1. Publish **/hover-chords-privacy/** first. The Chrome Web Store asks for its address when you submit the extension.
2. Publish **/hover-chords/**. You can do it before the extension is approved; just leave the install buttons until step 4.
3. In the Web Store dashboard, use `https://pianoers.com/hover-chords/` as the homepage and `https://pianoers.com/hover-chords-privacy/` as the privacy policy.
4. When the extension is live, open `hover-chords.html`, find `CHROME_WEB_STORE_URL` (it appears twice) and replace it with your Web Store link (it looks like `https://chromewebstore.google.com/detail/hover-chords/abcdefghijklmnop`). Do the same in `hover-chords-code-injection.html` (once). Then update the page.

## Page 1: /hover-chords/

| Field | Value |
|---|---|
| Page title (H1) | Hover Chords: Free Piano Chord Finder for Chrome |
| Page URL | `hover-chords` |
| Meta title (55 chars) | Hover Chords: Free Piano Chord Finder Chrome Extension |
| Meta description (154 chars) | Free Chrome extension that shows any chord on a piano keyboard. Hover chords on any chord sheet to see the keys, hear them and transpose the whole song. |
| Excerpt | A free Chrome extension that turns every chord on a chord sheet into a piano chord diagram you can hear and transpose. |
| Feature image | `hover-chords-social.png`. Alt: Hover Chords, a free piano chord finder for Chrome, showing C and G7 chord diagrams |
| Facebook / X image | `hover-chords-social.png` |
| Code injection → Page header | paste `hover-chords-code-injection.html` (SoftwareApplication with a $0 price, plus FAQPage with 8 questions) |
| Body | one HTML card: paste all of `hover-chords.html` |

**Images:** upload these 4 in October 2026, so they live under `/content/images/2026/10/`:
- `hover-chords-piano-chord-finder.png`
- `hover-chords-chord-inversions.png`
- `hover-chords-transpose-chords.png`
- `hover-chords-social.png`

If you upload them in another month, find and replace `2026/10` in `hover-chords.html` and the code injection file.

**What's on the page:**
- **About 1,000 words**, targeting "piano chord finder", "piano chords Chrome extension", "transpose chords" and "chord inversions".
- **A live demo:** an Amazing Grace chord sheet where every chord can be hovered, tapped and heard. It has its own transpose buttons and inversion arrows, and uses the same chord engine as the extension.
- **How it works:** three steps.
- **A features list, a "chords it understands" table and a privacy summary.**
- **Two install buttons.**
- **Internal links:** piano basics, teach yourself piano, and the best online piano lessons.
- **An 8-question FAQ.**

**Navigation (optional):** add "Hover Chords" to the footer menu (Settings > Navigation > Secondary). It's a good permanent internal link, and it tells Google the page matters.

## Page 2: /hover-chords-privacy/

| Field | Value |
|---|---|
| Page title (H1) | Hover Chords Privacy Policy |
| Page URL | `hover-chords-privacy` |
| Meta title | Hover Chords Privacy Policy |
| Meta description | Hover Chords collects no data. Read how the piano chord finder extension works in your browser, what it saves on your computer and why it needs its permissions. |
| Body | one HTML card: paste all of `hover-chords-privacy.html` (or paste it into the normal editor; it's plain text, headings and lists) |
| Search engines | leave indexing on; Google reviewers and users look for it |

It links to your existing /privacy-policy/ and /contact/ pages (both return 200) and back to /hover-chords/.

## Getting backlinks to /hover-chords/
- **Post it where people ask for chord help:** r/piano, r/WorshipMusic, r/LearnMusic. Lead with the live demo ("try it on this page"), not with "install my extension".
- **Submit it to tool directories:** Product Hunt, AlternativeTo ("alternative to chord chart sites"), and lists of "Chrome extensions for musicians".
- **Pitch it to worship-team blogs and piano teachers:** a free tool is easy for them to link to.
