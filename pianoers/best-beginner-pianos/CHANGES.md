# Fix kit: pianoers.com/best-beginner-pianos/

This replaces the earlier version of this file. It covers every finding in `AUDIT-2026-10-06.md`.
Work through it in order. Each step says where in Ghost (or on the server) it goes.

## Read first: what "100/100" can and can't mean

The scores in the audit are the claude-seo skills' own heuristics, not Google's. The skills say so themselves.

**What this kit fixes:** everything on the page, in Ghost settings, in the theme, and on the server. In a local preview with the kit applied, the skills' own checks came back like this:

| Check | Before | After (preview) |
|---|---|---|
| Layout shift, desktop (lab) | 0.272 (poor) | 0.0 |
| Layout shift, phone (lab) | 0.0 | 0.006 |
| Article starts on the first phone screen | No (1.2 screens down) | Yes |
| Article starts, desktop | 2.1 screens down | 1.1 screens down |
| Content-quality script | 91 | 92; no stock AI phrases, no hidden characters |
| Templated-metadata check | Pass | Pass |
| Schema types | Article, FAQPage | Article, ItemList, BreadcrumbList, Person, FAQPage (all valid JSON-LD) |
| Amazon links with `rel="sponsored"` | 0 of 7 | 7 of 7 |
| Images missing alt text | 0 | 0, now descriptive |
| Title / description length | 58 / 145 | 56 / 150 |
| Word count | 2,839 | about 3,700 article words (4,054 on the whole page) |

**What no page edit can max out:**
- **Authoritativeness** (25 of the 100 E-E-A-T points) and the GEO "brand signals" score depend on other sites citing and mentioning Pianoers.
- **The backlink score** can't be calculated without a Moz, Bing or DataForSEO key.
- **Experience points** depend on real photos and testing details that only Katarina can supply. The kit leaves clearly marked slots for them (step 8).

Part I lists the off-page work. Expect the page-level scores to land in the 90s once steps 1–8 are done, and the authority-driven ones to climb over months, not in one edit.

**Placeholders:** every spot needing your input is marked `⟦like this⟧`. Before publishing, search the post for `⟦`. There must be none left.

---

## Part A: The article (Ghost editor)

### 1. Replace the article body

`article-revised.html` is the full revised body. It was built from the live article by exact edits, so all your wording is kept except where a fix needed to change it. What changed:

- **Top of the article:**
  - "Last updated / prices checked" line
  - Keyword sentence ("beginner keyboard piano" = digital piano)
  - Affiliate disclosure, now above the first link
  - "Quick answer" box linking to the top four picks
- **Buying guide:** one budget range ($350–$500) used everywhere, a link to `/best-digital-piano/`, and "game-changer" removed.
- **Comparison table:** Weight column and a price-checked date.
- **New "How I Tested These Pianos" section:** placeholders for your details and a photo.
- **Every product section:**
  - one-line **Verdict** under the quote, so AI answers and skimmers get a self-contained summary
  - descriptive alt text
  - Amazon button with `rel="sponsored nofollow noopener"`
- **FP-30X:** the key-action contradiction is fixed.
- **Specs:** P-145 voices 24 → 10, FP-10 weight 31 → 27 lbs. **VERIFY both on Yamaha's and Roland's spec pages.**
- **Links:** Simply Piano and Flowkey are each linked once (in the buying guide), down from four times.
- **New section "Just Want a Keyboard to Try? (Kids and Tight Budgets)":** covers the 61-key/portable searchers every competitor serves. It links to the Loog review.
- **FAQ:**
  - the budget answer matches the article
  - the FAQ schema text now matches the visible answers word for word
  - one new question: "Is a 61-key keyboard OK for a child?"
- **Bottom recap ("TL;DR"):** all 7 picks (the Korg B2 was missing), each linked to its section, plus a contact link.

**How to paste it** (Ghost keeps cards it understands and converts the rest):

1. Open `article-revised.html` in a browser. Select everything from "Last updated" to the final Amazon Associates line, copy, and paste it into the empty post body. Normal text, headings, lists, links and images come across as native Ghost content.
2. The file marks seven kinds of block with `<!--kg-card-begin: html-->` … `<!--kg-card-end: html-->`. Wherever one of these didn't paste cleanly, insert an **HTML card** (`/html`) and paste that block's code from the file:
   - the Quick answer box
   - the comparison table
   - the 7 Amazon buttons (they must stay HTML cards, or the `rel` attribute is lost)
   - the FAQ schema
3. Use **Preview** to check that each product section reads Verdict → image → button → text.

If you'd rather edit the live post in place, the same changes are listed one by one in `AUDIT-2026-10-06.md`. The full paste is faster and less error-prone.

### 2. Swap the product images for the WebP versions

In each product's image card, choose **Replace image** and upload the matching file from `images/`:

| Section | File |
|---|---|
| 1. Yamaha P-145BT | `yamaha-p-145bt-beginner-digital-piano.webp` |
| 2. Alesis Recital Pro | `alesis-recital-pro-beginner-digital-piano.webp` |
| 3. Kawai ES60 | `kawai-es60-beginner-digital-piano.webp` |
| 4. Roland FP-10 | `roland-fp-10-beginner-digital-piano.webp` |
| 5. Korg B2 | `korg-b2-beginner-digital-piano.webp` |
| 6. Roland FP-30X | `roland-fp-30x-digital-piano.webp` |
| 7. Casio PX-S1100 | `casio-privia-px-s1100-digital-piano.webp` |

They're 24–41 KB, down from 41–61 KB, with filenames that describe the product.

**Alt text:** Ghost keeps a card's alt text when you replace its image. If it doesn't, re-enter it from `alt-text.md`.

## Part B: Post settings (gear icon, top right)

### 3. Featured image

- **Image:** upload `images/best-beginner-keyboard-piano.webp` (1200×630 landscape, 21 KB).
  - This is the current artwork placed on a blurred background. It's a stopgap: replace it with a real photo of Katarina at one of these pianos (1200×630, landscape) when you have one. A real photo is also the strongest "Experience" signal.
- **Alt text:** `Beginner keyboard piano with sheet music on the stand in a softly lit room`. Change it to describe the real photo once you swap it.
- **Caption:** delete it. The current caption says "(TESTED)".

### 4. Title, URL and metadata

| Field | Value |
|---|---|
| Post title (the H1) | `7 Best Beginner Keyboard & Digital Pianos in 2026 🎹 (That I've Actually Played)` |
| Post URL | **leave as** `best-beginner-pianos` (changing it loses rankings) |
| Excerpt | `Best beginner keyboard pianos of 2026, picked by a piano teacher since 2001: 7 weighted 88-key digital pianos from $350 to $730. Find the one for you.` |
| Tags | keep `Pianos` as the first (primary) tag |
| Meta data → Meta title | `7 Best Beginner Keyboard & Digital Pianos (2026, Tested)` (56 chars) |
| Meta data → Meta description | same text as the excerpt (150 chars) |
| Meta data → Canonical URL | leave empty (Ghost uses the page's own URL) |
| X card / Facebook card → Image | upload `images/best-beginner-keyboard-piano-social.jpg` |
| X card / Facebook card → Title and description | same as meta title and meta description |

**Why the title changed:**
- "Digital Pianos" is added because Google sends "best digital piano for beginners" searches to `/best-digital-piano/` today.
- The emoji stays in the H1 but is kept out of the search title, since Google often strips it.
- The excerpt also becomes the Article schema description, replacing the first lines of the intro.

### 5. Code injection (Post header)

- Paste `code-injection-header.html` into **Code injection → Post header**, replacing what's there. It contains:
  - CSS that reserves the featured image's space (this is what removes the layout jump) and lets the comparison table scroll inside its own box on phones
  - the ItemList of the 7 ranked pianos
  - the BreadcrumbList (Home → Pianos → this page)
  - Person schema for Katarina, built from the bio on her author page
- Leave **Post footer** empty. `code-injection-footer.html` is a site-wide stopgap only (step 13).

## Part C: The author profile

### 6. Katarina's staff profile (Settings → Staff → Katarina)

- **Bio:** expand to two sentences, e.g. `Piano teacher since 2001 with a B.A. in music from the University of Missouri. Lead teacher at Pianoers, where I test the beginner pianos and apps I recommend to my own students.` Ghost shows this in the author box and on the author page.
- **Website:** her onlinepianoteachers.com profile (already in the schema). Add any public teaching profile, YouTube or LinkedIn too. Ghost adds these to the author's `sameAs` links.

**Check the bio:** it says "member of the National Association of Music Teachers since 1995" but "teaching since 2001".
- The US association is officially the *Music Teachers National Association* (MTNA).
- Correct the name and dates if needed.
- Add it to the Person schema as `memberOf` only once it's accurate.

## Part D: The sibling page

### 7. `/best-digital-piano/`

Follow `best-digital-piano-edits.md`:
- Shorten its beginner section (about 820 words, including a near-copy of this page's FP-10 text) to a three-line summary that links here with the anchor "best digital pianos for beginners".
- Make both pages agree on the P-145 (CFX vs CFIIIS sample, number of voices).

This is the fix for the overlap between the two pages that the cluster check found.

## Part E: Your inputs (the placeholders)

### 8. Fill every `⟦…⟧`

| Where | What to add |
|---|---|
| Top line | Today's date, twice (last updated and prices checked) |
| Comparison table caption | Price-check date |
| How I Tested, paragraph 1 | Where and when you played these pianos. Delete the claim if you haven't played all seven. |
| How I Tested, first bullet | The pieces you actually play when testing |
| How I Tested, photo slot | A real photo of you at one of the pianos, with a caption saying where and when. This is the single biggest E-E-A-T gain available. |
| Portable keyboards section | Prices for the Casio CT-S1, Yamaha NP-15 and Korg Liano. Keep only the models you've played. |

Also re-check every price in the product sections and the Korg B2 stock note.

**Before publishing:** search the editor for `⟦` and `VERIFY`. There must be no matches.

## Part F: Theme (site-wide)

### 9. Theme edits

Follow `theme-edits.md`:
1. Featured image: WebP, `fetchpriority="high"`, correct `sizes`.
2. Name the mobile menu button (`aria-label`).
3. Dimensions and `decoding="async"` on the logo, author photo and "Read next" images.
4. Optional: Content-Signal in robots.txt (you choose the AI-training setting).

## Part G: Server and DNS

### 10. Fix `www`, add security headers, update llms.txt

Follow `server-and-dns.md`:
- Point `www.pianoers.com` at the server and 301 it to the bare domain.
- Add the security headers, starting the content policy in report-only mode.
- Fix the `llms.txt` entry ("5 Best…" → 7, and add `/best-digital-piano/`).

## Part H: After publishing

### 11. Ask Google to re-crawl

In Search Console, use **URL Inspection** on the page, then **Request indexing**. Do the same for `/best-digital-piano/` after step 7.

### 12. Re-run the audit

Run the same checks on the live page:
- The layout test should show desktop layout shift under 0.1.
- The schema should show the five types listed above.
- Every Amazon link should carry `rel="sponsored"`.
- `curl -sI https://www.pianoers.com/` should return a 301.
- The Lighthouse/PageSpeed numbers need a Google API key, or a day when the shared quota isn't used up.

### 13. Site-wide stopgap (only if the theme edits wait)

Paste `code-injection-footer.html` into **Settings → Code injection → Site footer**. Remove it once the theme edits are live.

### 14. Keep it fresh

Re-check prices and stock every 3 months. Update the "Last updated" line and the table caption each time. The GEO skill notes that pages left unchanged for 6+ months are cited less in AI answers.

## Part I: Off-page work (the points no edit can give you)

These raise Authoritativeness and brand signals, the part of the score this page can't move on its own. None of them is quick.

1. **A short YouTube video** of Katarina comparing two or three of these pianos (key feel, sound), embedded in the article.
   - It adds first-hand evidence, a video on the page, and a YouTube presence. The GEO skill's research cites YouTube mentions as the strongest single correlate of AI citations.
2. **Be useful where beginners ask.** Answer "which first piano?" threads on r/piano and r/pianolearning as Katarina, from real experience, and link only when it's the best answer. Spammy links do harm.
3. **Expert profiles:** make sure Katarina's teacher profile, and any MTNA listing once confirmed, links back to her Pianoers author page.
4. **Earn citations:** offer the comparison table (with weights and polyphony) to music teachers' blogs and studio sites as a resource for their students' parents.
5. **Measure:** add a free Moz or Bing Webmaster key so the backlink skill can score the profile (`/seo backlinks setup`). Connect Search Console so `seo-google` can report real Core Web Vitals and indexing.

---

## Files in this folder

| File | What it is | Used in step |
|---|---|---|
| `article-revised.html` | Full revised article body | 1 |
| `images/*.webp` | Product images and new featured image | 2, 3 |
| `images/best-beginner-keyboard-piano-social.jpg` | Social share image | 4 |
| `alt-text.md` | Alt text for every image | 2, 3 |
| `code-injection-header.html` | CSS + ItemList + BreadcrumbList + Person schema | 5 |
| `best-digital-piano-edits.md` | Sibling-page edits | 7 |
| `theme-edits.md` | Theme changes | 9 |
| `server-and-dns.md` | `www`, headers, llms.txt | 10 |
| `code-injection-footer.html` | Optional site-wide stopgap | 13 |
| `comparison-table.html`, `faq-schema.html`, `affiliate-buttons.html` | The HTML-card blocks on their own (already inside `article-revised.html`) | reference |
| `AUDIT-2026-10-06.md` | The full audit these fixes answer | reference |
| `baseline-2026-10-06.json` | Snapshot of the page before changes, for comparison | 12 |
