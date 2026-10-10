# Content Review: danhon.substack.com (32 articles)

**Status:** Draft editorial audit, provisional until the site owner reviews the open fact questions.
**Captured:** 2026-10-10 (all 32 `/p/` URLs in `https://danhon.substack.com/sitemap.xml`, fetched live; HTTP 200 for every page).
**Scope:** On-page content, metadata, headings, links, images, dates, and trust signals. The sitemap also lists `/archive` and `/about`; these are not articles. `/about` was read only for author context.
**Evidence:** `raw/sitemap.xml`, `raw/extract.json` (per-page extraction), `raw/linkstatus.txt` and `raw/extlinks.json` (external link check).

## What this audit does not cover

- No Google Search Console, Bing, analytics, or ranking data was available. Nothing below says which pages rank, get traffic, or convert. "Priority" means editorial priority only.
- No SERP, keyword-volume, or competitor review was run. Query families are inferred from the titles and headings.
- No Core Web Vitals, rendering, or accessibility testing. Image alt text was counted, not judged.
- Facts flagged "verify" come from my general knowledge or from internal inconsistencies. They are not confirmed errors. The owner needs to check them against sources.
- Link check: 127 unique external URLs, excluding social, Substack and image-credit domains. 403 and 429 responses are almost certainly bot blocking and are not counted as broken.
- This is not legal advice. The disclosure point below should go to whoever owns that compliance question.

---

## 1. Site-wide findings

### 1.1 Affiliate links with no visible disclosure (highest trust risk)

The sitewide pattern: review and non-review articles link to short redirect URLs that resolve to affiliate tracking links.

| Link in articles | Redirects to |
|---|---|
| `danhonmusic.com/pfa`, `danhonmusic.com/Piano4All`, `bit.ly/P4All` | `*.hop.clickbank.net` (with a `tid=` tracking parameter) |
| `danhonmusic.one/pianobyp` | `pianobypictures.gospelonthegopiano.com/...?affiliate_id=...` |
| `simplypiano.sjv.io/pianoers` (tech article) | an affiliate network domain |
| `go.masterclass-piano.com/...` (Ridley review) | a tracked outbound link |

I searched all 32 pages for "affiliate", "commission" and "may earn". Nothing is a disclosure. The two pages that matched "disclos" (`best-piano-players-in-the-world`, `busking-street-performance`) are not disclosure statements. The affiliate CTA also appears in articles that are not reviews: `6-blind-african-american-pianists`, `best-piano-players-in-the-world`, `tom-brier-the-story-and-tragic-ending`, `11-legendary-self-taught-pianists`, `piano-pedals`-adjacent pages.

**Why it matters for content quality:** readers deciding on a purchase can't tell the verdicts are paid-for. Search quality guidance also treats undisclosed commercial intent as a trust problem. **Recommendation:** add a short plain-language disclosure near the top of every page that carries these links, plus a standing disclosure on `/about`. The owner decides the wording with whoever handles advertising rules in their jurisdiction.

### 1.2 Overlapping PianoForAll coverage

PianoForAll is the main affiliate target and appears in five places:

- the dedicated review (`pianoforall-honest-review-2022`)
- as "A Better Alternative to Piano in 21 Days"
- as the head-to-head in the Piano With Jonny review
- as a CTA inside unrelated articles
- as the closing recommendation in several reviews

Where reviews of other courses end by recommending PianoForAll, the verdicts look settled in advance. This also splits the "PianoForAll review" query across pages. **Recommendation:** keep one canonical PianoForAll page. Elsewhere, compare it honestly and link to it once, with the criteria for the recommendation stated.

### 1.3 Meta descriptions

- **About 15 descriptions are simply the first paragraph**, cut mid-thought with "..." or at the platform's ~200-character limit. Examples: `11-legendary-self-taught-pianists`, `5-common-mistakes-beginner-pianists-make`, `6-steps-to-becoming-a-piano-teacher`, `6-things-i-wish-id-known...`, `conquering-performance-anxiety-tips`, `piano-benefits-brain-wellbeing`, `paul-barton-the-pianist-of-elephants`, `the-history-of-piano`, `piano-in-21-days-review`. A story hook ("It was the first few notes that drew John in...") tells a searcher nothing about the page.
- **Too short or generic:** `qanon-looks-like-an-alternate-reality` (29 chars, "Top articles from DanHonMusic"), `best-piano-players-in-the-world` (64), `caring-for-your-piano-tuning-essentials` (76), `7-reasons-why-piano-is-the-best-instrument` (98), `the-best-sources-for-free-sheet-music` (111), `perfect-pitch-complete-explanation` (113).
- **Too long:** `play-like-a-time-traveler` (260 chars).
- **Done well, keep the pattern:** `hoffman-academy-review` (names the price, what is free, who it's for), `tom-brier-the-story-and-tragic-ending`, `best-keyboard-piano-for-beginners`.

Full candidate title and description for every article are in section 3 and are ready for the owner to paste into Substack's per-post SEO fields. Each candidate uses only facts visible on the page, but any with a price needs its price re-verified first.

### 1.4 Titles

- Seven titles carry an automatic `- DanHonMusic` suffix (`7-reasons...`, `flowkey-review`, `paul-barton...`, `perfect-pitch...`, `piano-in-21-days-review`, `playground-sessions-review`, plus the `qanon` page). That is inconsistent with the other 24.
- Three are long enough to be truncated: `6-blind-african-american-pianists` (77), `best-piano-players-in-the-world` (75), `play-like-a-time-traveler` (78).
- `what-is-the-best-age-to-learn-piano` starts with an emoji.
- Years in titles age fast: `(2024)`, `(2025)`, `(2026)`. They help freshness-sensitive queries only if the content is refreshed. `pianoforall-honest-review-2022` has a 2022 slug and a 2026 title.

### 1.5 Dates and freshness signals

- On-page `datePublished` equals `dateModified` for all 32 articles, so edits never surface in structured data.
- The sitemap `lastmod` differs from the on-page publish date for **23 of 32** articles. Example: `hoffman-academy-review` has `lastmod` 2026-10-01 against a on-page date of 2025-10-08.
- Four articles share a `lastmod` of 2025-05-24 (`best-piano-players`, `piano-in-21-days-review`, `tom-brier`, `11-legendary`), which suggests a bulk edit rather than a content review.
- Pricing-driven pages are dated 2025-01 to 2026-03 with no visible "prices checked on" statement. That is stale for a page claiming "Current Prices" (`best-keyboard-piano-for-beginners`, "Feb 2026").

**Recommendation:** put a visible "Last reviewed: [date]" line on every review and buying page, and change it only after prices and facts are actually rechecked.

### 1.6 Heading structure

- `6-steps-to-becoming-a-piano-teacher` starts with two H3s, then adds an H1 in the body (`How To Become a Piano Teacher`) that duplicates the post title's H1.
- `best-piano-players-in-the-world` uses H3 only (no H2). `how-technology-is-shaping-the-future-of-piano` uses H4 only. `caring-for-your-piano-tuning-essentials` jumps from H3 to H4 with emoji labels.
- `playground-sessions-review` contains a stray H4 (`Piano by Pictures Review: A Professional Pianist's Take (202...`), which looks like a pasted link card.
- Many reviews use playful headings that don't match search language ("PWJ's Digital Playground", "Is PWJ the Right Tune for You?", "The Parts That Actually Work Great"). Plain headings ("Piano With Jonny pricing", "Pros and cons") are what searchers scan for.
- Typo in an H2: `Book 1 - Rythm Style` on the PianoForAll review.

### 1.7 Internal linking

No internal links were detected in the body of 11 articles: `5-common-mistakes`, `busking`, `caring-for-your-piano`, `conquering-performance-anxiety`, `paul-barton`, `perfect-pitch`, `piano-benefits-brain`, `piano-by-pictures-review`, `piano-pedals`, `the-best-sources-for-free-sheet-music`, `tom-brier`. The PianoForAll review (18) and Hoffman review (7) are the best-connected. Natural pairs that aren't linked today are listed per article below. The `/p/qanon-...` page is a "Most-viewed" index linking to 8 posts; it is the closest thing to a hub, but its URL and metadata hide that.

### 1.8 Broken external links (confirmed 404 or no response)

| Article | Dead link |
|---|---|
| `5-common-mistakes-beginner-pianists-make` | `danhonmusic.com/TheArtofPianoPractice` (the author's **own** CTA, 404) |
| `6-steps-to-becoming-a-piano-teacher` | `aosa.org/about/what-is-orff-schulwerk/` |
| `piano-benefits-brain-wellbeing` | `learnpianonow.online/PianoForAll` (no response) |
| `piano-vs-guitar-which-is-easier` | `europianosnaples.com/piano-keys-101/` |
| `what-is-the-best-age-to-learn-piano` | `libertyparkmusic.com/play-by-ear-vs-reading-music/` |
| `the-best-sources-for-free-sheet-music` | `clarinetinstitute.com/free-music.html`, `publicdomainsherpa.com/public-domain.html` (a named section, "Public Domain Sherpa", points at a dead page) |
| `the-history-of-piano` | `scottjoplin.org/joplin-biography.html`, `sebastienerard.org/en/` (no response; may be transient) |

### 1.9 Images

Alt text is missing on at least one image in 19 of 32 articles. Worst cases: `qanon-looks-like-an-alternate-reality` (8 of 8), `piano-in-21-days-review` (7 of 11), `sight-reading-made-simple-guide` (3 of 8). A missing alt on a screenshot of a course is a lost chance to describe what the course contains.

### 1.10 Authorship and experience

- Author is "DanHonMusic". `/about` presents a pianist, composer and classically trained player but gives no named credentials, institutions, years teaching, or performances that a reader could verify.
- Titles and copy make claims that rest on that identity: "A Professional Pianist's Take", "As a fellow pianist", "We tested the top digital pianos". The `we`/`I` voice shifts between pages (the keyboard page's title says "My Top Picks" while its description says "We tested"). Decide whether this is one person or a team and say so.
- Review pages say they tested the product, but few show proof: no dated screenshots of the author inside the course, no practice log, no timed test.
- Technical-advice pages (tuning, pedals, health claims) have no named expert review.

### 1.11 What works well (keep)

- Q&A style FAQ blocks on `hoffman-academy-review`, `the-history-of-piano`, `7-reasons`, `what-is-the-best-age`, `caring-for-your-piano`, answering natural questions under question headings.
- `hoffman-academy-review` is the model page: price in the description, verdict near the top, "Nothing listens to your child play" as a candid limitation, per-question FAQ headings.
- `piano-pedals`, `perfect-pitch`, `conquering-performance-anxiety` have real topical depth and a heading structure that matches the questions.
- `piano-benefits-brain-wellbeing` cites studies (PubMed, Frontiers, NIH); `conquering-performance-anxiety` points to professional help.

---

## 2. Priority summary (editorial priority, not a score)

| Priority | Articles | Why |
|---|---|---|
| **P1: trust, accuracy, broken** | `qanon-looks-like-an-alternate-reality`, `6-blind-african-american-pianists`, `11-legendary-self-taught-pianists`, `paul-barton-the-pianist-of-elephants`, `tom-brier-the-story-and-tragic-ending`, `piano-in-21-days-review`, `piano-masterclass-by-ridley-academy-review`, `5-common-mistakes-beginner-pianists-make`, `the-best-sources-for-free-sheet-music`, `best-keyboard-piano-for-beginners`, plus affiliate disclosure on every page with those links | URL/content mismatch, probable factual errors, unverifiable testimonials, claims about a named person, dead links, stale prices |
| **P2: commercial pages to sharpen** | `pianoforall-honest-review-2022`, `piano-with-jonny-review`, `flowkey-review`, `playground-sessions-review`, `piano-by-pictures-review`, `hoffman-academy-review` (light touch) | Pricing freshness, missing pricing section, overlap, dated titles |
| **P3: informational pages to tighten** | everything else | Metadata, answer-first summary, internal links, alt text |

---

## 3. Per-article audit

Format for each: what it is for, what's working, issues, and fixes with candidate title and description. "Verify" = ask the owner to check against a primary source before publishing. Word counts are body text (approximate).

### A. Course and product reviews

#### 1. `/p/hoffman-academy-review` · 2,028 words · pub 2025-10-08, sitemap lastmod 2026-10-01 · **P3 (light)**
- **Serves:** parents (and adults) deciding whether Hoffman Academy is right. Strongest page on the site.
- **Working:** price and free-tier in the description, "My verdict at a glance" up top, a candid limitation section, 10 FAQ questions as H3s, 7 internal links, alternatives section.
- **Issues:** prices ($24/month, $239/year, "400+ lessons") are time-sensitive and the page doesn't say when they were checked. The 2026-10-01 sitemap date isn't visible to readers. Only 4 images and no screenshots of the lesson interface. The affiliate link is undisclosed.
- **Fix:** add "Prices checked [date]" and the disclosure; add 1–2 annotated screenshots; verify the numbers.
- **Title:** keep `Hoffman Academy Review 2026: Free Lessons, Paid Extras`. **Description:** keep.

#### 2. `/p/flowkey-review` · 1,661 words · pub 2025-01-02 · **P2**
- **Working:** TL;DR block, FAQ section, "Who actually succeeds" and alternatives.
- **Issues:** pricing text mixes at least six figures ($9.99, $13, $13.99, $19.99, $83.94, $119.88) with no date, so a reader can't tell which plan is current. No year in the title despite pricing content. TL;DR is an H4. Visible `- DanHonMusic` suffix. Links to `pianoers.com`, a sibling review site; say so if it is the author's.
- **Fix:** add a small price table (plan, monthly cost, annual cost, date checked); recheck all plans; add the year; make TL;DR an H2.
- **Title:** `Flowkey Review (2026): Pricing, Pros, Cons and Who It Suits`
- **Description:** `Is Flowkey worth it? What the lessons are like, current pricing, where it falls short, who it suits, and how it compares with other piano apps.` *(Confirm before publishing that these sections still match the page.)*

#### 3. `/p/playground-sessions-review` · 2,286 words · pub 2025-01-05 · **P2**
- **Issues:** the title `Is it bad?` frames the review negatively while the content leans promotional ("Thousands of Reviews from Satisfied Students", "Designed for Student Success"). That claim needs a source. Prices ($12.49, $19.99, $24.99, $349.99) and a "Coupon" section go stale quickly. A stray H4 for the Piano by Pictures article sits in the middle of the page. Includes a Quincy Jones link whose relevance isn't explained. Undisclosed affiliate links. No year.
- **Fix:** replace the satisfied-students claim with a sourced statement or remove it; date the prices; delete the stray H4; verify any coupon.
- **Title:** `Playground Sessions Review (2026): Pricing, Songs, Pros and Cons`
- **Description:** `Playground Sessions teaches piano with video-game-style lessons. Courses, pricing, song library, how it compares with Flowkey, and who it suits.`

#### 4. `/p/pianoforall-honest-review-2022` · 3,836 words · pub 2026-02-05 · **P2**
- **Working:** most thorough course review, 18 internal links, clear book-by-book breakdown, Table of Contents.
- **Issues:** the slug says 2022, the title says 2026. Description is generic ("find out!"). "500,000 students" is stated as fact; the older entry in the Most-viewed index says 450,000. Source it or soften it. Price points ($49, $79) undated. H2 typo "Rythm". Three different affiliate URL formats for the same offer (`danhonmusic.com/Piano4All` ×3, `bit.ly/P4All`). This page should be the single canonical PianoForAll page (see 1.2). 34 headings is a lot, and book-by-book detail could be tighter.
- **Fix:** fix the typo; source or soften the student count; add a dated price line; add the disclosure; consider whether the URL is worth changing (see decisions: slug changes need a redirect plan, which Substack may not support well).
- **Title:** `PianoForAll Review (2026): What's in the 10 eBooks, Price and Verdict`
- **Description:** `Is PianoForAll worth it? What's in the 10 eBooks, who it suits, what it costs, pros and cons, and how it compares with other online piano courses.`

#### 5. `/p/piano-in-21-days-review` · 3,564 words · pub 2025-01-02 · **P1**
- **Issues:**
  - "User Reviews and Testimonials" lists four first-name personas (John – Beginner Pianist, Sarah – Busy Professional, Michael – Music Enthusiast, Emily – Parent of a Young Learner) with no source or link. If these are invented illustrations, presenting them as reviews is misleading and should be removed or clearly labeled. If they are real quotes, cite where they came from.
  - The closing section "PianoForAll – A Better Alternative" turns a review into a sales page for the affiliate product.
  - Description is the opening paragraph. Title has a dated `(2025)` and the suffix.
  - 7 of 11 images lack alt text.
  - Pricing ($497 / $997) isn't dated; the course site returned 403 to the checker, so I couldn't confirm anything.
- **Fix:** remove or source the testimonials; state the verdict and price near the top; recheck pricing; add alt text.
- **Title:** `Piano in 21 Days Review: What You Get, Price and Verdict`
- **Description:** `An honest look at Piano in 21 Days by Jacques Hopkins: what's included, how the 21-day plan works, pricing, pros and cons, and who it's for.`

#### 6. `/p/piano-with-jonny-review` · 3,459 words · pub 2026-02-19 · **P2**
- **Issues:** commercial-intent searchers want price, and **no pricing heading exists**. Playful headings don't match search language. The H3 "Amazing Community Support" is promotional. The "PWJ vs. The Competition" section ends in PianoForAll again. Title is generic ("A Comprehensive Review"). Description says "We" while the page says "I" (verify).
- **Fix:** add "Piano With Jonny pricing" with the date checked; rename headings to plain language; add a verdict near the top.
- **Title:** `Piano With Jonny Review (2026): Pricing, Smart Sheet Music, Pros and Cons`
- **Description:** `What Piano With Jonny offers: video library, smart sheet music, live Q&As and challenges. Who it suits, who it doesn't, and how it compares with PianoForAll.`

#### 7. `/p/piano-by-pictures-review` · 1,282 words · pub 2026-01-22 · **P2**
- **Issues:** the description is the first paragraph. The same affiliate link is repeated 6 times in one 1,282-word page. The title claims "A Professional Pianist's Take"; the About page doesn't give checkable credentials (see 1.10). No internal links. No disclosure.
- **Fix:** cut repeats to two CTAs; add proof of testing (screenshots of the notation guide, lesson, song library); link to the Playground Sessions and Flowkey reviews in "alternatives".
- **Title:** `Piano by Pictures Review (2026): Learning Piano Without Sheet Music`
- **Description:** `Piano by Pictures teaches piano with visual notation instead of sheet music. What's inside the course, how well it works, pros and cons, and who it suits.`

#### 8. `/p/piano-masterclass-by-ridley-academy-review` · 1,345 words · pub 2025-04-17, lastmod 2026-03-29 · **P1**
- **Issues:**
  - Makes claims about a named person and business ("Who Really Is Stephen Ridley?", "The Missing Transparency", "Hidden Costs and Clever Marketing", "Funneling Funds" cited via a `pianoers.com` link). Each claim needs a source in a claim ledger, and opinion has to read as opinion. This should be reviewed by the owner (and legal, if there's any doubt) before it is left live.
  - Title style (`| $1,397 for a Piano Course?!`) and description ("brutally honest", "No fluff", "our") read as clickbait and mix voices.
  - The page criticises the marketing while carrying its own tracked outbound link (`go.masterclass-piano.com/...`). That is fine if disclosed, awkward if not.
  - $1,397 is the headline fact; confirm it's current.
- **Fix:** build the claim ledger; date the price; neutral wording for contested claims; disclosure.
- **Title:** `Ridley Academy Review: Is the $1,397 Piano Course Worth It?`
- **Description:** `What Ridley Academy teaches, what it costs, what students say, and how it compares with other online piano courses. Our assessment of its value.` *(Replace "Our" with "My" if single author.)*

### B. Buying guide

#### 9. `/p/best-keyboard-piano-for-beginners` · 1,559 words · pub 2026-02-05 · **P1**
- **Working:** clear structure, Pros/Cons per model, budget and accessories sections, FAQ.
- **Issues:**
  - Prices are labelled "Current Prices" and "Feb 2026"; it is now October, so they are eight months old.
  - Description says "under $700" but two of the five picks are listed at ~$700.
  - "My Top Picks" (title) vs "We tested" (description). Is there evidence of testing (hours, photos, comparison notes)?
  - Retailer links go to home pages (`sweetwater.com`, `amazon.com`, `thomannmusic.com`), not products, so a reader can't verify the price. 2 images lack alt.
  - The page doesn't show affiliate status.
- **Fix:** add a methodology box; date each price; link to the exact product pages; add a comparison table image (the platform has no native tables) with alt text.
- **Title:** `Best Keyboard Pianos for Beginners (2026): 5 Picks by Budget`
- **Description:** `Five beginner digital pianos from about $500 to $700, with pros and cons, features that matter, accessories you need and how to start. Prices checked [date].`

### C. Guides and how-tos

#### 10. `/p/5-common-mistakes-beginner-pianists-make` · 1,356 words · pub 2023-12-19 · **P1 (dead CTA)**
- **Issues:** the page's only CTA, `danhonmusic.com/TheArtofPianoPractice`, returns 404. Description is the intro. No internal links though `6-things`, `sight-reading` and `piano-pedals` overlap. A "TL;DR" at the end would be more useful at the start.
- **Fix:** repair or remove the CTA; move the five mistakes into a short list at the top.
- **Title:** `5 Common Beginner Piano Mistakes (and How to Fix Them)`
- **Description:** `Playing too fast, not really playing the music, expecting quick results, inconsistent practice and avoiding performance: five beginner mistakes and the fixes.`

#### 11. `/p/6-things-i-wish-id-known-when-i-started-piano` · 2,039 words · pub 2023-11-01 · **P3**
- **Issues:** intro-paragraph description; considerable overlap with `5-common-mistakes` (slow practice, daily practice, pedal use). 2 images lack alt. Uses a `bit.ly` affiliate link.
- **Fix:** merge-or-differentiate decision (see decisions); add cross-links.
- **Title:** `6 Things I Wish I'd Known When I Started Learning Piano`
- **Description:** `Practice until you can't get it wrong, limit pedal use, practice daily, record yourself, follow printed fingerings and slow down: six lessons from experience.`

#### 12. `/p/sight-reading-made-simple-guide` · 1,676 words · pub 2024-02-26 · **P3**
- **Issues:** several H4s under H2 with playful labels ("Chord Ninja", "Rhythm Master"). 3 images lack alt. The year `(2024)` in the title is old. Seven internal links already (good).
- **Fix:** add a one-sentence answer at the top ("how to improve sight-reading: …"); plain-language subheadings.
- **Title:** `How to Improve Piano Sight-Reading: A Beginner's Guide`
- **Description:** `Why sight-reading feels hard, the building blocks (rhythm, intervals, chords, chunking) and practice strategies you can start today.`

#### 13. `/p/piano-pedals` · 2,137 words · pub 2024-07-04 · **P3**
- **Working:** structure answers the whole topic; notation section is a differentiator.
- **Issues:** description truncated at 200 chars. No internal links. 2 images lack alt; embeds are TikTok and YouTube. Needs a direct answer at the top: "Pianos have three pedals: sustain (right), sostenuto (middle), una corda (left)." Digital-piano readers (pedal count differs) aren't addressed.
- **Title:** `Piano Pedals Explained: Sustain, Sostenuto and Una Corda`
- **Description:** `What each of the three piano pedals does, how to use them, common mistakes, and how to read pedal markings in sheet music.`

#### 14. `/p/conquering-performance-anxiety-tips` · 2,109 words · pub 2023-12-20 · **P3**
- **Working:** structure runs before / day-of / after; resource links include professional help.
- **Issues:** description is a story hook. No internal links. The health framing ("Ensure Proper Sleep, Diet, Hydration", an inflammation-diet link on `health.harvard.edu`) should be careful not to read as medical advice.
- **Title:** `Piano Performance Anxiety: How to Stay Calm on Stage`
- **Description:** `What performance anxiety is, how to prepare mentally and practically, what to do on the day and how to reflect afterwards. Includes resources for professional help.`

#### 15. `/p/what-is-the-best-age-to-learn-piano` · 763 words · pub 2025-04-22 · **P3**
- **Issues:** emoji in the title; only 763 words for a competitive question; children's development claims have no sources; one dead link (`libertyparkmusic.com`); no named teaching expertise. Strengths: age-band H2s, FAQ, clear description.
- **Fix:** put a direct answer in the first paragraph ("There's no single best age; many teachers start around…" only if the owner can support the range); add sources; fix the link.
- **Title:** `Best Age to Learn Piano: Kids, Teens and Adults`
- **Description:** keep the current one.

#### 16. `/p/piano-vs-guitar-which-is-easier` · 1,672 words · pub 2023-09-26 · **P3**
- **Issues:** the verdict is the last heading. Description is the opening question, not an answer. No internal link to `7-reasons` or the tuning article even though maintenance cost is a section. One dead link (`europianosnaples.com`). Overlaps with an FAQ answer in `7-reasons`.
- **Fix:** add a three-line summary at the top; link the maintenance section to the tuning article.
- **Title:** `Piano vs Guitar: Which Is Easier to Learn?`
- **Description:** `Piano or guitar first? Compare layout, learning songs, self-teaching, technique, children, sharing music and maintenance, with a verdict.`

#### 17. `/p/perfect-pitch-complete-explanation` · 3,343 words · pub 2023-11-24 · **P3**
- **Working:** question-shaped H2s ("Can You Learn Perfect Pitch as an Adult?"), strong citations (UCSF, UCSD, Northwell). Deepest explainer on the site.
- **Issues:** generic title and `- DanHonMusic` suffix; description is generic; no internal links; the neuroscience and autism section should read as a summary of research with sources, not claims by the author.
- **Title:** `Perfect Pitch (Absolute Pitch): What It Is and Can You Learn It?`
- **Description:** `What perfect pitch is, how common it is, whether it's genetic, whether adults can learn it, and how it differs from relative pitch.`

#### 18. `/p/the-best-sources-for-free-sheet-music` · 1,858 words · pub 2025-01-02 · **P1 (links)**
- **Issues:** two dead links including the target of a named section; the generic description; no internal links; 21 external links need a periodic check. Public-domain status varies by country and edition; add a one-paragraph explanation, sourced.
- **Fix:** replace dead links; add the date reviewed.
- **Title:** `Best Free Sheet Music Sites: IMSLP, Mutopia, Musopen and More`
- **Description:** `Where to find free sheet music: IMSLP, Mutopia Project, Musopen, CPDL and more, with advice for beginners, teachers and advanced players.`

#### 19. `/p/6-steps-to-becoming-a-piano-teacher` · 3,743 words · pub 2023-09-10 · **P1 (structure)**
- **Issues:** duplicate H1 in the body; opening H3s precede the H1; the title promises "6 Steps" but the headings are not numbered steps (Qualifications, Studio, Approach, Assessment, Challenges, Marketing). Description is the intro. One dead link (`aosa.org`). No named teaching credentials behind a "how to become a teacher" guide.
- **Fix:** structure as 6 numbered steps; remove the extra H1; fix the link; fill the "Qualifications" section with sources (MTNA, RCM are linked).
- **Title:** `How to Become a Piano Teacher: 6 Steps`
- **Description:** `Qualifications, studio setup, lesson planning, assessing progress, handling challenges and marketing your studio: how to become a piano teacher.`

#### 20. `/p/caring-for-your-piano-tuning-essentials` · 556 words · pub 2023-12-04, lastmod 2025-04-19 · **P3**
- **Issues:** 19 headings over 556 words means thin sections. Description is a single generic sentence. The "How Much Does Piano Tuning Cost?" section needs a currency, region, and date to be useful. The page starts on H3. Emoji headings. Only one external source (Piano Technicians Guild).
- **Fix:** add region and date to cost; have a technician review frequency advice; use H2s.
- **Title:** `Piano Tuning: How Often, How Much and What to Expect`
- **Description:** `How often to tune a piano, what happens during a tuning, what it costs, and how to find a qualified tuner.`

#### 21. `/p/busking-street-performance` · 2,317 words · pub 2024-02-20 · **P3**
- **Issues:** "Legal and Ethical Considerations" varies by city and country but is written generally; no internal links; the "How Much Money Can You Make" section needs sources. H4 used for the "Famous Musicians Who Busked" list. Not piano-specific on a piano-focused site.
- **Fix:** add a jurisdiction note ("Rules vary; check local permit requirements") and sources for earnings.
- **Title:** `Busking: What It Is and How to Start Street Performing`
- **Description:** keep the current one (clear and accurate).

#### 22. `/p/the-history-of-piano` · 2,967 words · pub 2023-06-16 · **P3**
- **Issues:** description is a truncated intro; 10-question FAQ generated in a uniform pattern ("Can you recommend any famous piano compositions?") that adds length but little; 27 external links mostly to Wikipedia/Britannica; one dead link, one non-responding; H2s ("Development and Innovation") don't name periods or people. Check that Cristofori and the date of invention are named plainly.
- **Fix:** structure by period; tighten the FAQ to questions the page answers well.
- **Title:** `The History of the Piano: Invention, Evolution and the Modern Instrument`
- **Description:** `How the piano evolved from earlier keyboard instruments, the design developments that shaped it, its influence on music and culture, and where it is heading.`

#### 23. `/p/7-reasons-why-piano-is-the-best-instrument` · 1,891 words · pub 2023-10-14 · **P3**
- **Issues:** "best instrument" is an opinion; no external sources at all. Description is one weak sentence. The suffix is appended. Five internal links (good).
- **Title:** `7 Reasons Piano Is the Best Instrument to Learn`
- **Description:** `Seven reasons to choose piano: a full musical foundation, immediate satisfaction, solo and ensemble play, easy music reading, coordination, genre choice and a lifelong skill.`

#### 24. `/p/piano-benefits-brain-wellbeing` · 1,741 words · pub 2023-12-11 · **P3**
- **Issues:** opens with the invented-sounding case study of "John" (a divorce, anxiety and depression story) and never says whether it is real or illustrative. Health claims should state study limits ("associated with", sample, age). Description is the story, not the topic. Includes an affiliate link to `learnpianonow.online/PianoForAll`, which doesn't resolve. 16 external links (strong), none internal.
- **Fix:** label the story as illustrative (or source it); soften claims to what the studies show; fix the link.
- **Title:** `Benefits of Playing Piano: What Research Says About Brain Health and Wellbeing`
- **Description:** `What research suggests about piano playing and cognition, emotional wellbeing, and social connection, with study links and further reading.`

#### 25. `/p/how-technology-is-shaping-the-future-of-piano` · 1,005 words · pub 2024-11-03 · **P3**
- **Issues:** H4-only structure; description truncated at 200 chars. Carries a Simply Piano affiliate link inside an editorial article. The AI/AR claims are from 2024 (MuseNet is a 2019 model) and read as dated in 2026.
- **Fix:** refresh with current examples; add dated sources; proper H2s.
- **Title:** `How Technology Is Changing Piano: Digital, Smart, AI and VR`
- **Description:** `How digital and smart pianos, AR and VR, AI composition tools and online communities are changing how pianists learn, perform and collaborate.`

### D. Lists and biographies

#### 26. `/p/11-legendary-self-taught-pianists` · 1,483 words · pub 2023-10-14 · **P1 (accuracy)**
- **Issues:** the premise "self-taught" looks wrong for several entries. Verify each against a source before the page stays live: Frédéric Chopin (studied formally with Żywny and Elsner), Elton John (attended the Royal Academy of Music junior programme), Alicia Keys (classical training from childhood), Jon Batiste (Juilliard). If the list can't be defended, change the claim ("largely self-taught" with the evidence for each) or the premise. A page that mislabels famous people undermines the site's authority on every other page. Also: an FAQ label as H4, nicknames in headings ("The Rocket Man") that don't help searchers, description is a truncated intro.
- **Title (only if supported):** `11 Famous Pianists Who Were Largely Self-Taught`
- **Description:** `Eleven well-known pianists who developed their skills largely outside formal training, and what each one's path shows about learning piano.`

#### 27. `/p/6-blind-african-american-pianists` · 1,379 words · pub 2023-10-16, lastmod 2025-11-27 · **P1 (accuracy)**
- **Issues:** the title promises six pianists, but the page lists seven (six numbered, then Blind Willie McTell unnumbered), and at least two (Blind Willie Johnson, Blind Willie McTell) are known primarily as guitarists and singers. Verify. The title is 77 characters. A good topic that readers will treat as reference, so errors cost more. Sensitive subject: ensure the Jim Crow framing is accurate and well cited (one history.com link).
- **Fix:** retitle to match the real content ("Blind Black Musicians…") or restrict to pianists; fix the numbering; cite biographies for each.
- **Title:** `Blind Black Musicians and Pianists Who Broke Barriers`
- **Description:** `Profiles of blind African American musicians, including Blind Tom Wiggins, Ray Charles, Art Tatum and Stevie Wonder, and how they shaped American music.`

#### 28. `/p/best-piano-players-in-the-world` · 1,136 words · pub 2025-03-19, lastmod 2025-05-24 · **P2**
- **Issues:** H3-only; no H2; "best" with no criteria ("who decides?"); 64-character description ("From Classical Virtuosos to Jazz Mavericks and Modern Innovators"). Subtitle bloats the title to 75 characters. Contains an undisclosed affiliate CTA.
- **Fix:** state selection criteria in the intro; use H2s; shorten the title.
- **Title:** `Best Pianists Alive Today: 7 Classical and Jazz Artists`
- **Description:** `Seven of today's most acclaimed pianists, from Yuja Wang and Lang Lang to Hiromi and Brad Mehldau, and what sets each apart.`

#### 29. `/p/paul-barton-the-pianist-of-elephants` · 1,502 words · pub 2023-10-14 · **P1 (accuracy)**
- **Issues:** description says he honed his skills at "the prestigious Royal Academy of Arts in London". The Royal Academy of Arts is a visual-arts institution; the music conservatoire is the Royal Academy of Music. Verify and correct. This is the type of slip that makes a page less trustworthy. Description is the intro. No internal links.
- **Title:** `Paul Barton, the Pianist Who Plays for Elephants in Thailand`
- **Description:** `How British-born pianist Paul Barton came to play for elephants at a sanctuary in Thailand, and what music does for the animals and the people who care for them.` *(Verify "British-born" and the claims on elephants.)*

#### 30. `/p/tom-brier-the-story-and-tragic-ending` · 1,329 words · pub 2023-11-03, lastmod 2025-05-24 · **P1 (accuracy, tone)**
- **Issues:** the title says "Tragic Ending", while the description says a crash left him "paralyzed and silenced". Check that the facts, the current status of the person and the wording match what a primary source (his own site is linked) says; "tragic ending" implies he has died. This is a real person's medical situation, so the owner should confirm it is accurate and respectful. The page also carries the PianoForAll affiliate link twice, which sits oddly next to a story about an accident. 2 images lack alt.
- **Title (once facts are confirmed):** `Tom Brier: The Piano Prodigy Behind the Video Game Covers`
- **Description:** keep the current one if verified.

### E. Off-pattern pages

#### 31. `/p/play-like-a-time-traveler` · 570 words · pub 2025-01-29 · **P2**
- **What it is:** a first-person essay. The only article on the site that reads as fiction or satire: a "dusty practice journal" from a student of Liszt, an "Epilogue: What Happened to the Diary?". If it is an invented story, label it clearly; presenting it as a real experiment beside product reviews invites distrust. Title (78 chars) and description (260 chars) are both over length; "crush modern apps" is an unsupported comparative claim; no sources on 19th-century practice.
- **Title:** `Liszt-Style Practice vs. Piano Apps: What I Learned`
- **Description:** `I swapped my piano app for a 19th-century practice regime of scales and arpeggios. What worked, what hurt, and a hybrid approach.` *(Only if the account is true; otherwise label as fiction and change the framing.)*

#### 32. `/p/qanon-looks-like-an-alternate-reality` · 575 words · pub 2023-10-21, lastmod 2024-03-15 · **P1**
- **Issues:** the URL says "QAnon" but the page is a "Most-viewed Articles" index (title `Most-viewed Articles - DanHonMusic`, description `Top articles from DanHonMusic`). The slug is a leftover from an earlier draft. It is in the sitemap, so search engines and anyone who shares the link see a political phrase on a piano site. It lists old versions of posts (e.g. "PianoForAll … (2024)", "450,000 students"), so it is also stale. All 8 images lack alt text. No headings.
- **Fix (owner's decision):** either turn it into a proper hub ("Most popular piano guides") with a better slug and fresh links, or unpublish it. Check what Substack allows for changing a published slug and whether the old URL redirects.
- **Title:** `Most Popular Piano Articles and Course Reviews`
- **Description:** `The most-read piano guides and course reviews on DanHonMusic: learning, practice, pedals, sight-reading and honest reviews of online piano courses.`

---

## 4. Claim ledger (items that need an owner-approved source)

| Claim | Where | Status |
|---|---|---|
| Hoffman: 400+ lessons, $24/month, $239/year | `hoffman-academy-review` | Verify on Hoffman's site; add date |
| Piano in 21 Days: $497 / $997; four named testimonials | `piano-in-21-days-review` | Unverified; testimonials unsourced |
| Ridley Academy: $1,397; claims about Stephen Ridley and "funneling funds" | `piano-masterclass-by-ridley-academy-review` | Needs source for each claim |
| PianoForAll: 500,000 students; $49/$79 | `pianoforall-honest-review-2022` | Older index text says 450,000; verify |
| Flowkey plan prices (six different figures) | `flowkey-review` | Reconcile and date |
| Playground Sessions: "Thousands of Reviews from Satisfied Students"; prices; coupon | `playground-sessions-review` | Unsourced; date |
| Keyboard prices (~$500 to ~$700), "We tested", "under $700" | `best-keyboard-piano-for-beginners` | Prices 8 months old; testing evidence absent |
| Chopin, Elton John, Alicia Keys, Jon Batiste as "self-taught" | `11-legendary-self-taught-pianists` | Probably contradicted by public biographies; verify |
| Blind Willie Johnson and Blind Willie McTell as pianists | `6-blind-african-american-pianists` | Probably guitarists; verify |
| "Royal Academy of Arts" for a pianist | `paul-barton-the-pianist-of-elephants` | Likely Royal Academy of Music; verify |
| "Tragic ending" and current status | `tom-brier-the-story-and-tragic-ending` | Check against primary source |
| Dusty Liszt student's journal | `play-like-a-time-traveler` | Label as fiction or substantiate |
| "John" divorce/depression story | `piano-benefits-brain-wellbeing` | Label as illustrative or source |
| "A Professional Pianist's Take" | `piano-by-pictures-review` | About page lists no checkable credentials |
