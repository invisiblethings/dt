# Search Console Findings and Revised Priorities

**Status:** Draft. Where this document disagrees with the priorities in [content-review.md](content-review.md), this one prevails because it uses measured search data.
**Source:** Search Console export for `https://danhon.substack.com/`, Web search, 2026-07-07 to 2026-10-06 (`raw/gsc/`).
**Limits:**
- `Queries.csv` is capped at 1,000 rows. They cover 2,258 of the 3,763 total clicks (60%). The rest is long tail or anonymized.
- The export has no query-by-page view. I match queries to pages by topic, so those mappings are inferences.
- Three months of data shows no cause for any movement. Clicks, impressions and position are observations only.

## 1. The shape of the traffic

| Measure | 3-month value |
|---|---|
| Clicks / impressions / CTR / avg position | 3,763 / 318,108 / 1.18% / ~7.5 |
| Trend | Flat: ~30–50 clicks/day, no visible slope (daily position ranged ~6.7–9.3) |
| Mobile vs desktop | Mobile 2,766 clicks, 1.53% CTR, pos 5.3. Desktop 900 clicks, 0.69% CTR, pos 13.3 |
| Countries (clicks) | US 1,915 (51%), UK 436, Canada 251, Sweden 177, Australia 166 |

**One page is the site.** `6-blind-african-american-pianists` has **2,182 clicks, 58% of all clicks**, and 121,210 impressions (38%). The top five pages together have 90% of clicks. Of 32 articles, **17 got 3 clicks or fewer in three months**, and 5 of those got zero.

| Page | Clicks | Impressions | CTR | Pos |
|---|---|---|---|---|
| 6-blind-african-american-pianists | 2,182 | 121,210 | 1.8% | 3.8 |
| best-piano-players-in-the-world | 423 | 52,276 | 0.81% | 10.6 |
| flowkey-review | 331 | 42,934 | 0.77% | 7.2 |
| piano-by-pictures-review | 280 | 9,024 | 3.1% | 5.8 |
| 11-legendary-self-taught-pianists | 190 | 8,957 | 2.12% | 5.0 |
| tom-brier-the-story-and-tragic-ending | 67 | 4,569 | 1.47% | 6.6 |
| best-keyboard-piano-for-beginners | 65 | 20,283 | 0.32% | 11.2 |
| hoffman-academy-review | 50 | 17,434 | 0.29% | 7.6 |
| piano-with-jonny-review | 50 | 3,697 | 1.35% | 9.0 |

## 2. What this changes

### 2.1 The blind-musicians page: fix it, but carefully

It is both the site's only real traffic source and the page I flagged for probable factual errors. Both are true, so the edit needs care.

- **What searchers want.** Blind-related queries total about 1,405 clicks and 71,800 impressions in the top-1,000 sample (230 queries). Top ones: "blind piano player", "blind pianist", "blind piano player black", "blind black musician", "blind jazz musician". A large block is about **singers**: "blind black singer" (7,255 impressions), "blind singer black" (4,396), "black blind singer" (2,951), "blind black singer male", "famous blind black singer", each ranking around position 2–3 with CTR of 0.2–0.5%.
- **The mismatch.** The page's text contains no use of the word "singer", while its title says "Pianists". Searchers for singers see "Pianists" in the title and mostly don't click. This is the strongest content-fit finding in the dataset, and it matches the accuracy problem in my earlier review: Blind Willie Johnson and Blind Willie McTell are listed under a "pianists" title, and Ray Charles and Stevie Wonder are also known as singers.
- **Recommendation:** make the title and body truthful and broader, without dropping the words people already use. Keep "blind", "Black", "piano" and "musicians". Suggested title: `Blind Black Piano Players and Musicians Who Broke Barriers` (replaces the earlier suggestion in content-review.md §3 #27). In the body, state each person's instrument and role accurately, and add "singer" where it is true. Keep the URL unchanged.
- **Risk control:** make one set of changes (title, a corrected list, accuracy fixes), then wait 2–4 weeks and compare against this baseline before further edits. Do not rewrite the page wholesale. Record the change date.
- **Affiliate link on this page.** The page that earns most of the clicks is a history piece carrying an affiliate CTA. It needs the disclosure first (action 2 in content-decisions.md). The CTA fits this audience poorly; I can't tell from this data whether it produces any conversions, only the owner's affiliate dashboard can.
- **Link out of it.** This page links to only one other article. A few honest links to related pages (e.g. `11-legendary-self-taught-pianists`, `best-piano-players-in-the-world`) would send its readers somewhere useful. Don't force it.
- **Other countries.** "blind pianospelare" (Swedish) has 31 clicks at 14% CTR; Sweden has 177 clicks at 4.3% CTR; "Translated results" gave 57 clicks. There is real non-English demand, but I wouldn't build anything for it from this data alone.

### 2.2 Largest measured gaps (position is decent, clicks are low)

| Page and queries | Observation | Action |
|---|---|---|
| **best-piano-players-in-the-world**: "best living pianists" 2,630 impr, 0 clicks, pos 8.6; "best pianist in the world", "top 10 best pianists today", "who is the best pianist in the world today" and "famous pianists today" together add roughly 10,000 impressions at pos 7–9 | 52k impressions, 0.81% CTR, pos 10.6. Title leads with "7 Best Piano Players… A symphony of genius across genres"; description is 64 characters. The page uses "piano players" while most queries say "pianists", "living" and "today" | Promote this to P2/P1. Title: `Best Living Pianists: 7 Top Classical and Jazz Pianists Today`. State selection criteria in the intro. Description from content-review.md §3 #28 |
| **flowkey-review**: "flowkey" 10,922 impr pos 8.3 (brand), "flowkey review" 1,454 impr pos 4.9, "flowkey cost" 1,567, "flowkey pricing" 706, "is flowkey free" 1,175 (pos 5.7, 3 clicks) | 42.9k impressions, 0.77% CTR. The page never uses the phrase "is Flowkey free" and its price section is a muddle of six price points | Pricing table with date; a direct answer on whether it is free (the page does mention a free trial, so confirm what is accurate); title `Flowkey Review (2026): Cost, Is It Free, Pros and Cons`. Brand-only impressions ("flowkey", "flowkey app", "flokey") are mostly people looking for the official site; do not expect those to convert |
| **caring-for-your-piano-tuning-essentials**: "piano maintenance" 1,973 impr, "piano maintenance cost" 1,471 impr, both 0 clicks at pos ~7 | 3,719 impressions, **0 clicks**, pos 7.7. 556 words, generic 76-char description; the title does not say "cost" and the page has no heading using "maintenance cost" | Raise to P2. Title `Piano Maintenance and Tuning: How Often and What It Costs`. A rewritten description. Add region/date-qualified costs (the page gives one range, $100–$200, with no region) and a maintenance-cost section. Best near-term opportunity for its size |
| **best-keyboard-piano-for-beginners**: "piano for beginners 2026" 1,645 impr, "keyboard for beginners 2026" 1,418 impr, both 0 clicks at pos ~6.4; "best 88 key keyboard for beginners" 256; "best piano for students" 369; "best musical keyboards for small churches" 408 | 20k impressions, 65 clicks, pos 11.2. The year is being searched, and the page's prices are dated Feb 2026 | Refresh prices and dates; keep 2026 in the title; add short answers for students and 88-key choices if the owner can stand behind them. The "church keyboard" query is a different need; do not stretch this page to cover it |
| **hoffman-academy-review**: "hoffman academy" 10,669 impr, 0.07% CTR (brand), "hoffman academy piano" 1,192 | 17.4k impressions, 0.29% CTR | Mostly brand/navigational impressions, so low CTR is expected. Leave the page alone apart from the price date and disclosure |
| **piano-by-pictures-review** | 3.1% CTR at pos 5.8; "piano by pictures reviews" has 9.6% CTR at pos 2.3 | The current title and description work. **Don't rewrite the title.** Keep it starting with "Piano by Pictures Review". Only replace the intro-paragraph description if you can keep the CTR |
| **11-legendary-self-taught-pianists** | 2.1% CTR, pos 5.0; "self taught pianists" 9.5% CTR | Fix the accuracy problem (content-review.md §3 #26), but keep the phrase "self-taught pianists" in the title and body |
| **tom-brier** | "tom brier" 1,386 impr at pos 4.3 yields 8 clicks (0.58%) | The page ranks well for the name; people probably want his channel. The title wording still needs a fact check. No rewrite for CTR |

### 2.3 Pages that rank poorly (informational, not quick wins)

| Page | Impressions | Position |
|---|---|---|
| sight-reading-made-simple-guide | 2,610 (0 clicks) | 63.8 ("sight reading" is 66.5) |
| the-history-of-piano | 1,386 | 45.9 |
| piano-benefits-brain-wellbeing | 882 | 44.2 |
| 6-steps-to-becoming-a-piano-teacher | 470 (0 clicks) | 40.6 |
| piano-pedals | 2,698 | 38.8 |
| busking-street-performance | 1,772 | 31.2 |
| perfect-pitch-complete-explanation | 1,950 | 29.2 |
| the-best-sources-for-free-sheet-music | 4,100 | 27.4 |
| piano-vs-guitar-which-is-easier | 1,590 | 22.7 |
| what-is-the-best-age-to-learn-piano | 919 | 25.0 |

Retitling and rewriting descriptions won't fix a position of 30–60; those queries are hard and pages that compete for them need more depth and evidence than a metadata edit gives. I'd still do the cheap accuracy and metadata fixes from content-review.md, but I wouldn't expect traffic from them, and I wouldn't spend rewrite effort here ahead of 2.1 and 2.2. A few of these (sight-reading at 63.8, the history piece) may be worth a deliberate decision: invest in depth, or accept them as supporting pages.

### 2.4 Pages with accuracy flags but almost no traffic

`piano-masterclass-by-ridley-academy-review` (16 clicks), `piano-in-21-days-review` (8), `paul-barton-the-pianist-of-elephants` (3), `play-like-a-time-traveler` (3) and `qanon-looks-like-an-alternate-reality` (0 clicks, 25 impressions). The trust and accuracy issues still stand, but these are cheap to leave until the high-traffic pages are done. Two reasons they stay in the queue: the Ridley page makes claims about a named person, and the "testimonials" are unsourced.

### 2.5 Other things in the data

- **Comment-thread URLs appear in results:** `/p/piano-with-jonny-review/comments` (16 clicks, 279 impr, 5.7% CTR), `/p/piano-by-pictures-review/comments`, `/p/piano-masterclass-by-ridley-academy-review/comments`, and others. Substack's robots.txt blocks `/p/*/comment/*` but not `/comments`. That is a platform setting I can't change from here; just be aware that comments are public search surfaces.
- **Stray URLs:** `/p/the-best-sources-for-free-sheet_music` (underscore) and `/p/flowkey` each have 1 impression, which suggests a mistyped link somewhere. I haven't checked what they return.
- **The anchor query pattern "top 7 piano in 2024 / 2025"** (460 and 281 impressions, 0 clicks, pos ~7–9) is probably the older "7 best piano players" page title or a different page; if the owner recognises it, it shows year-in-query demand.

## 3. Revised order of work

1. **Affiliate disclosure** on the pages that carry traffic and tracked links first: 6-blind, best-piano-players, flowkey, 11-legendary, tom-brier, piano-by-pictures.
2. **6-blind page**: one careful edit as in 2.1, then a four-week hold.
3. **best-piano-players** title, criteria and description (2.2).
4. **flowkey** pricing table and "is it free" answer.
5. **Tuning/maintenance** page: title, description, cost section.
6. **best-keyboard** price refresh, dated.
7. Accuracy fixes on 11-legendary (keeping "self-taught" language) and tom-brier; dead links; the rest of content-decisions.md.
8. Everything else, in the order given in content-review.md, treating it as housekeeping rather than a growth lever.

## 4. How to measure

- Baseline is this export (2026-07-07 to 2026-10-06). Re-export at the same length after each batch, per page, and compare that page's own clicks, impressions, CTR and position. For the page-level change, filter by page in Search Console and keep the query export for that page, which would fix the "no query-by-page" limit above.
- Change one thing per page at a time, record the date, and wait at least 2–4 weeks before judging a change.
- Normal fluctuation is wide: daily clicks ranged from about 30 to over 50 with no change made. Don't read small moves as results.
- Nothing here promises a result. The estimate that matters is the owner's own before/after comparison.
