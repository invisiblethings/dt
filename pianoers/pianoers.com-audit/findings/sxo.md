# Search Experience (SXO) findings: pianoers.com money pages

Audit date: 7 Oct 2026. Scope: the 14 pages listed below. Read-only.

## SXO Gap Score: 62 / 100

This score is separate from the SEO Health Score. It is the average of 14 per-page scores (66), minus 4 points for site-level problems: two cannibalization pairs that are still open, and a deleted page that still ranks but now returns a 404.

Each page was scored on 7 dimensions: Page type (15), Content depth (15), UX (15), Schema (15), Media (15), Authority/trust (15) and Freshness (10).

| Page | Main query | SXO Gap Score | Page-type match | Seen in search results? |
|---|---|---|---|---|
| /best-beginner-pianos/ | best beginner piano | 83 | ALIGNED | Yes, #2 (and /best-digital-piano/ at #6 in the same results) |
| /simply-piano-review-…/ | simply piano review | 78 | ALIGNED | #8 |
| /skoove-review/ | skoove review | 77 | ALIGNED | #4 |
| /best-piano-lessons-online/ | best online piano lessons | 75 | ALIGNED | Not in top 9 |
| /best-digital-piano/ | best digital piano | 74 | ALIGNED | #4 |
| /pianoforall-review/ | pianoforall review | 71 | ALIGNED | #7 |
| /best-piano-books-for-adult-beginners/ | best piano books for adult beginners | 69 | ALIGNED | #2 |
| /yamaha-p-145-review/ | yamaha p-145 review | 68 | ALIGNED (shares the results with shop pages) | Not in top 9 |
| /flowkey-review/ | flowkey review | 67 | ALIGNED, too thin | #6 (also #4 for "simply piano vs flowkey") |
| /pianote-review/ | pianote review | 67 | ALIGNED, too thin | #7 |
| /teach-yourself-piano/ | how to teach yourself piano | 64 | MEDIUM (steps are buried) | Not in top 9 |
| /best-free-piano-learning-apps/ | best free piano learning apps | 60 | MEDIUM (title says "Free & Paid") | #2 |
| /acoustic-vs-digital-piano/ | acoustic vs digital piano | 46 | MEDIUM (right page type, too shallow) | Not in top 9 |
| /how-to-tune-a-piano-a-simple-guide/ | how to tune a piano | 32 | **HIGH mismatch** | Not in top 9 |

"#" positions come from the WebSearch tool, not a live Google results page. See the Limitations section.

## What works

- **Page types match search intent on 12 of 14 pages.** "Best X" searches are answered by ranked lists with tables, and "X review" searches by single-product reviews. These match what ranks.
- **Three pages already sit at #2 in the results:** /best-beginner-pianos/, /best-free-piano-learning-apps/ and /best-piano-books-for-adult-beginners/. All five app/course reviews show up in the top 9 for their review query.
- **Things the competitors I checked mostly lack:**
  - the two-tap piano picker on /best-beginner-pianos/
  - the score table and "Last checked September 2026" note on /skoove-review/
  - the pricing breakdown on /simply-piano-review…/
  - links to Trustpilot and the BBB on /pianote-review/
- **Freshness is good on the commercial lists.** /best-beginner-pianos/ and /best-digital-piano/ were updated 6 Oct 2026, and /best-piano-lessons-online/ on 14 Jul 2026. Competitors in these results were updated between Mar and Jul 2026.
- **Review schema with a rating** is on the Simply Piano (3.5/5), Flowkey (4.2/5), Skoove (3.5/5) and Pianote (7.5/10) reviews. That matches what MusicRadar and Pianist's Compass use.

## Status of items already known (from the brief)

| Item | Status 7 Oct 2026 | Evidence |
|---|---|---|
| /best-beginner-pianos/ meta title missing ")" | **Still open** | Live `<title>` is `7 Best Beginner Keyboard &amp; Digital Pianos (2026, Tested` |
| /best-beginner-pianos/ old meta description mentioning $350 | **Still open** | Description says "my 7 picks from $350 to $730" |
| /best-beginner-pianos/ portrait share image | **Still open** | og:image best-beginner-piano.jpg is 1024×1536 (portrait) |
| /yamaha-p-145-review/ corrected article | **Body is live; meta title is not** | Live H2/H3s are identical to `yamaha-p-145-review/article-revised.html`, the text is about 93% the same, and the post was modified 7 Oct 09:30 UTC. But `<title>` is still the old 69-character "Yamaha P-145 / P-145BT Review in 2026: Still My #1 Pick for Beginners". No affiliate disclosure is shown. Two FAQPage schema blocks are still in the page. |
| /best-digital-piano/ "CFX-sampled" and "24 instrument voices" for the P-145BT | **Still open** | Live HTML contains `<li>Yamaha CFX-sampled piano voice</li><li>24 instrument voices</li>` and "sampled from Yamaha's legendary CFX concert grand" |
| Overlap between /best-digital-piano/ and /best-beginner-pianos/ (fix kit in `best-beginner-pianos/best-digital-piano-edits.md`) | **Not applied** | /best-digital-piano/ still has three full beginner H3 write-ups (P-145BT, FP-10, ES60). Both pages appear in the same results for "best beginner piano 2026" (#2 and #6). |

## Findings, ordered by severity

| # | Severity | Finding | Evidence | Fix (where in Ghost) |
|---|---|---|---|---|
| 1 | High | **The beginner list and the digital piano list compete for the same searches** (known, still open) | See the status table above. Both URLs rank for "best beginner piano 2026". /best-digital-piano/ has the H2 "Best Digital Pianos for Beginners (Under $500)" and the H3 "Yamaha P-145BT — Best Beginner Digital Piano". | Apply `best-beginner-pianos/best-digital-piano-edits.md` in the post editor for /best-digital-piano/. Fix the CFX and 24-voices errors at the same time. |
| 2 | High | **A deleted page still ranks but now leads to a 404** | The search tool returned `pianoers.com/how-hard-is-it-to-learn-piano-as-an-adult` ("How Hard is it to Learn Piano as an Adult? - A Realistic Look from a Pro Pianist") for "learn piano as an adult beginner how long". That URL 301-redirects to the trailing-slash version, which returns **404**. It is not in the sitemap. | If the post is still a draft or in Ghost Admin → Posts, republish it with the same slug. Otherwise add a 301 redirect to /teach-yourself-piano/ via Settings → Labs → Redirects (upload redirects.yaml). Restoring it is better because there is search demand for "how long does it take to learn piano as an adult". I could not check what the old page said (the Wayback Machine returned 429). |
| 3 | High | **Ratings and prices disagree between the online-lessons list and the individual reviews.** This hurts trust for every reader, most of all the budget shopper who compares pages. | Ratings in the /best-piano-lessons-online/ table vs each review page: **Simply Piano 4.7/5 vs 3.5/5** (the review's H1 even asks "Is This $170/Year App Worth It?" and its verdict is "Weak Value for Adults"). Flowkey 3.8 vs 4.2/5. Skoove 4.0 vs 7/10 (3.5/5 in schema). Pianote 3.9/5 vs 7.5/10. Pianoforall is rated 4.9/5 in the list but has no rating on its own review. Skoove's price is "$12.99/mo" in the list, "€12.49" in the review body and "$12.49/month" in the review's meta description; the audience is US. The list calls Pianote "Best for Live Teacher Feedback", but the review says "Zero real-time note detection or feedback". | Choose one scale (out of 5) and one currency (USD). In the post editor for /best-piano-lessons-online/, copy each review's rating into the "Top Picks at a Glance" table. Add a rating box to the Pianoforall review. Rename the Pianote label to "Best for video lessons + coach feedback". |
| 4 | High | **Missing page: Roland FP-10 review** (also Kawai ES60 and Roland FP-30X) | The FP-10 is your #4 beginner pick and your #2 in /best-digital-piano/. The "Roland FP-10 review" results are all single-product reviews or shop review pages (pianodreamers, keyboardkraze, thomann, pianoo, looria, a Substack). The same pattern shows for "Kawai ES60 review" (pianistscompass, thomann, pianoo) and "Roland FP-30X review" (bestbuy.ca, gear4music, music2me, pianistscompass). | Write a new post `/roland-fp-10-review/` using the P-145 review layout: spec table, "FP-10 vs P-145BT" section, video, Review schema with a rating. Link to it from both lists. Then do the ES60 and FP-30X reviews. |
| 5 | High | **Missing page: best piano/keyboard for kids.** The parent persona has no page aimed at them. | The results for "best piano for kids beginner keyboard" and "best digital piano for kids" are lists organized by age (gear4music, scarymommy, ktla, pianistscompass, donner, americansongwriter). Pianoers only covers this in the H2 "Just Want a Keyboard to Try? (Kids and Tight Budgets)" on /best-beginner-pianos/ and in the 37-key /loog-piano/ review. | Write a new post: "Best Piano for Kids (2026): by age, from 3 to 12+". Include an age/size/budget table, 61-key vs 88-key guidance, and links to Loog, the P-145 and Hoffman Academy. Link to it from the kids H2 on /best-beginner-pianos/. |
| 6 | High | **/how-to-tune-a-piano-a-simple-guide/ doesn't match what searchers want** | The top results (MusicRadar 1,847 words, updated Sep 2026; livingpianos 2,070 words with video; MasterClass; a Udemy course) give step-by-step instructions: tools, A440, temperament, unisons. The pianoers page (1,480 words) gives no steps. It mostly sends readers to a forum and to `http://piano.detwiler.us`. It has no meta description, was last updated 9 Jun 2024, and only a tag page links to it. It also overlaps /piano-tuning-when-and-why-its-needed/ and /piano-diy-repair-guide/. | Rewrite it as "Can You Tune a Piano Yourself? Tools, Steps, Risks and What a Tuner Costs". Include a numbered step list, a tool list, a "when to stop and call a tuner" box, and typical costs ($100–$250, from the cost results). Add a meta description in Post settings → Meta data. Link to it from /acoustic-vs-digital-piano/ ("tuning costs") and the two care posts. |
| 7 | High | **/acoustic-vs-digital-piano/ is too short for its search results** | 681 words. The top results I could fetch run 989–1,704 words: Adorama 1,088, Thomann 989, Steinert 1,704. These are mostly retailers and brands. The page has no meta description, only H3 headings, one image and one internal link (to /best-beginner-pianos/). It makes unsourced claims ("indistinguishable … in blind tests", "95% real"). It is not in the top 9. The page type (a comparison with 2 tables) is right; the problem is depth. | Add a meta description. Turn the H3s into H2s. Add these sections: "Total 10-year cost" table (purchase, tuning, moving, resale), "Digital piano vs keyboard" (a separate search with dedicated pages from Yamaha, hellosimply and pianistscompass), "Used acoustic: what to check", and "What if my child's teacher says acoustic?". Add photos. Cite a source for the action claims or remove them. Link to /best-digital-piano/ and the tuning page. Target about 1,600 words. |
| 8 | Medium | **The P-145 review targets list-page phrases and is shorter than its competitors** | Its meta description says "#1 best piano for beginners… best digital piano or best keyboard piano under $600". These are /best-beginner-pianos/ terms. The page is 1,267 words; competitors are MusicRadar 2,389, Pianist's Compass 1,755 and music2me 1,442. MusicRadar and Pianist's Compass use Review+Product schema with a rating; the P-145 review has Article plus two FAQPage blocks. Shop pages (Adorama, Thomann ×2) are also in the results. The page is not in the top 9. | In Post settings → Meta data, set the title to the one in the P-145 audit and change the description to review terms: "Yamaha P-145BT review after 3 years: action, sound, P-145 vs P-145BT vs P-45, and who should buy it." Add the H2s "P-145 vs Roland FP-10" and "P-145 vs P-225" (each has its own comparison results). Add Review/Product schema with a rating and remove the duplicate FAQPage, both in post Code injection. Add the #affiliate tag. |
| 9 | Medium | **The free-apps list overlaps the online-lessons list and has small breakages** | The title "Best Free **& Paid** Piano Learning Apps" overlaps /best-piano-lessons-online/: 5 of its 7 apps appear on both. The search for "Simply Piano cost per year 2026" surfaced this list rather than the Simply Piano review, which has a full pricing section. The contents link `#simply-piano-…-7-day-free-trial` is broken: the heading id is `…-14-day-free-trial`. The ItemList schema `mainEntityOfPage` points to `/best-free-piano-learning-app/` (missing "s"). The body says "Updated: January, 2026" but the post was modified Feb 2026. It is 1,114 words and has no internal links to the individual reviews. | Retitle it "Best Free Piano Learning Apps (2026): What You Really Get Free" and focus each entry on what the free tier includes. Fix the anchor link in the editor and the URL in the post's Code injection. Link each app to its pianoers review. |
| 10 | Medium | **Missing page: Simply Piano vs Flowkey** | /flowkey-review/ already shows at #4 for "Simply Piano vs Flowkey", with only an H3 on the topic. The other results are dedicated "vs" pages (musicianwave 1,557 words with 6 videos, guitarchalk). | Write a new comparison post: a side-by-side table (price, platforms, feedback, song library, kids/adults) and a verdict for each persona. Link to it from both reviews. |
| 11 | Medium | **The Flowkey and Pianote reviews are too thin** | Flowkey is 1,155 words against 1,225–5,770 in its results (Pianist's Compass 3,781, Learnopoly 5,770). Pianote is 1,331 words against 1,734–6,677. The Pianote review has no video even though Pianote is a video platform. Flowkey's Review schema headline still says "(2025)". | Add to each: a pricing table, a walkthrough of lesson 1 with screenshots or a short screen recording, and "who should pick X instead". Fix the year in the post Code injection. |
| 12 | Medium | **List pages don't link to the matching review pages** | /best-piano-lessons-online/ links to the Pianoforall and Simply Piano reviews but **not** to the Flowkey, Skoove or Pianote reviews. /best-free-piano-learning-apps/ links to no reviews. /pianote-review/ and /skoove-review/ each get only 3 internal links. The tuning guide gets 1 (a tag page). /best-free-piano-learning-apps/ gets 4. | Under each product section in the lists, add "Read my full [X] review →". |
| 13 | Medium | **The Pianoforall review reads like a sales page and has no rating** | It has Article schema only; Pianist's Compass uses Course+Review+Rating. Second half H2: "What Makes Pianoforall Different (and Why It Might Be Exactly What You Need)", H3 "One Payment. Lifetime Access. Endless Value.". Coupon buttons "39% OFF DEAL" and "Get Another 20% OFF with Code: SAVE20". One empty H3. The pianoers list rates it 4.9/5. | Add a rating box (out of 5) and Review schema with Course. Move the promo copy into one "Price and deal" section. Delete the empty H3. Add "Who should NOT buy it (kids, classical sight-readers)". |
| 14 | Medium | **/teach-yourself-piano/ puts its steps at the bottom** | The results lead with numbered steps: "7 Simple Steps", "10 Steps", "11 key principles". The pianoers page has its own 11 steps, but they start after 8 H2s of introduction ("More People Are Teaching Themselves", "The Myth of the 'Natural' Musician", …). The page is not in the top 9. | Change the title to "How to Teach Yourself Piano: 11 Steps (with a Daily Practice Plan)". Move "The Step-by-Step Guide" up to sit right after the TL;DR, and shorten the introduction sections. Add a free path (Hoffman Academy, the free tiers) next to Pianoforall. |
| 15 | Medium | **The returning adult player gets almost no attention on any page** | /about/ says the site targets "adults restarting after years away". Across the 14 pages, words like returning/rusty/years away appear 0–2 times per page. The Simply Piano results describe it as built for "those returning to piano". | Add a short "Coming back after years away?" box (Ghost Callout card) to the lessons list, the books list, the Flowkey and Pianote reviews, and /teach-yourself-piano/. |
| 16 | Medium | **No affiliate disclosure on 11 of 14 pages.** Not shown on any page by the theme, and mentioned in the article text only on /best-beginner-pianos/, /best-digital-piano/ and /pianoforall-review/. | `has_disclosure` is false for all 14 in crawl/pages.json. The Simply Piano review and the lists use `simplypiano.sjv.io/pianoers`, `/pianoforall`, `/pbp` and `/PFA`. | Add the internal tag #affiliate in Post settings → Tags on each affiliate post. The trust/E-E-A-T agent should handle the details. |
| 17 | Medium | **/best-digital-piano/ has no comparison table** | No `<table>` on the page. "My Top Picks at a Glance" is not a table. MusicRadar's list (8,965 words) has 10 spec tables plus ItemList+FAQ schema. /best-digital-piano/ has Article+FAQ only. | Add a 12-row table (model, action, sound, speakers, price, best for) and ItemList schema, as /best-beginner-pianos/ already has. |
| 18 | Low | Three tuning pages overlap | /how-to-tune-a-piano-a-simple-guide/, /piano-tuning-when-and-why-its-needed/ (1,954 words) and /piano-diy-repair-guide/ (H3 "Out-of-Tune Notes") | Rewrite the first as in finding 6. Make the other two link to it rather than repeat it. |
| 19 | Low | The search tool shows old titles for 3 pages | /best-beginner-pianos/ "7 Best Beginner Keyboard Pianos in 2026 🎹 (That I've Actually Played)", Simply Piano "(2024): The Truth About…", Skoove "(2025)". This may be the tool's own cache. | No action needed unless Search Console shows the same. |
| 20 | Low | The books page has no comparison table or ItemList | /best-piano-books-for-adult-beginners/ uses inline "Price \| Completion Time \| Rating" lines. Pianote's competing page has 7 tables. The H3 "Weighted Keys > Everything Else" sits oddly in a book guide. It mentions "CD/DVD". | Add a 5-row table (book, price, months to finish, best for, audio/video). Add ItemList (Book) schema in post Code injection. |
| 21 | Low | Old URL redirects in two hops | `/pianoforall-vs-alfreds-piano-book` → `/pianoforall-review` → `/pianoforall-review/` | Point the redirect straight at `/pianoforall-review/` in redirects.yaml. |

## Missing pages the search results show demand for (ordered by expected impact)

1. **Roland FP-10 review**, then **Kawai ES60 review** and **Roland FP-30X review**. Every result is a single-product review, and these are your own recommended models.
2. **Restore "How hard is it to learn piano as an adult"** (finding 2). It already ranks.
3. **Best piano/keyboard for kids, by age.** The parent persona has no page.
4. **Simply Piano vs Flowkey.** You already rank #4 with only an H3.
5. **Yamaha P-145 vs Roland FP-10** (dedicated pages from bajaao, lazada and merriammusic for the P-45 version). Start as an H2 in the P-145 review; make it a full page if it gets impressions.
6. **Digital piano vs keyboard.** Start as an H2 in /acoustic-vs-digital-piano/.
7. **Best digital piano under $500.** Do **not** create a new page; it would become a fourth page competing for beginner searches. Add an "Under $500" jump section to /best-beginner-pianos/.
8. **Best piano app for adults.** Cover it with a "Best for adults" column in the lessons list rather than a new page.

## Persona fit (each 0–100 = Relevance + Clarity + Trust + Action, 25 each; analyst estimates)

Personas, and the search signal each comes from:

- **Beginner adult:** the "for beginners" / "adult beginners" wording across the results.
- **Parent:** the kids-specific list results, plus Simply Piano described as "Parents Choice".
- **Returning adult:** the Simply Piano results ("those returning to piano") and the musicianwave note that Flowkey suits "those that know a little more".
- **Budget shopper:** "under $500", "free" and "cost per year" searches.

| Page | Beginner adult | Parent (child) | Returning adult | Budget shopper | Weakest → first fix |
|---|---|---|---|---|---|
| best-beginner-pianos | 88 | 62 | 65 | 82 | Parent: add a "for kids, by age" mini-table and a link to the new kids page |
| best-digital-piano | 70 | 45 | 72 | 66 | Parent: a one-line hand-off to the kids page. Budget: fix the spec errors (trust) and add the table |
| yamaha-p-145-review | 80 | 50 | 62 | 68 | Parent: a "Good for a child of 7+?" FAQ. Budget: compare with the FP-10 and Alesis Recital Pro |
| best-piano-lessons-online | 80 | 50 | 55 | 70 | Parent: a "Best for kids" column. Returning: a "coming back" box |
| best-free-piano-learning-apps | 70 | 68 | 45 | 72 | Returning: say which free tier skips the basics |
| pianoforall-review | 75 | 35 | 70 | 72 | Parent: state clearly that it is not for young kids and link to Hoffman/Simply |
| simply-piano-review | 78 | 75 | 55 | 75 | Returning: can you skip ahead? (placement test) |
| flowkey-review | 70 | 50 | 65 | 60 | Parent: age guidance. Budget: pricing table and free-tier limits |
| pianote-review | 60 | 55 | 72 | 62 | Beginner: put "not ideal for beginners" and the alternative near the top |
| skoove-review | 82 | 50 | 60 | 74 | Parent: age guidance. Budget: USD prices |
| acoustic-vs-digital-piano | 70 | 50 | 55 | 55 | Parent and Budget: the teacher-says-acoustic and 10-year cost sections |
| teach-yourself-piano | 72 | 20 (n/a) | 50 | 45 | Budget: add a free route and say what it costs |
| best-piano-books-for-adult-beginners | 82 | 30 (adult-only by design) | 70 | 75 | Returning: "which book if you once played" |
| how-to-tune-a-piano | 25 | 20 | 30 | 40 | All: rewrite (finding 6) |

What is pulling the Trust scores down across these pages: the missing disclosure (finding 16) and the conflicting ratings and prices (finding 3).

## User stories (from the search signals)

1. **Awareness.** *As an adult who has never played,* I want to know whether I can teach myself and how long it takes, *so that* I don't buy gear I'll abandon. Signal: "how to teach yourself piano" results are numbered step lists, and the deleted "how hard is it… as an adult" page ranks for "how long".
2. **Consideration.** *As a buyer choosing my first instrument,* I want acoustic, digital and keyboard compared on total cost and feel, *so that* I pick once. Signal: retailer comparison pages dominate "acoustic vs digital piano", and dedicated pages rank for "digital piano vs keyboard".
3. **Consideration.** *As a parent,* I want a piano matched to my child's age and hand size, *so that* they don't get frustrated. Signal: every "kids" result is organized by age.
4. **Decision.** *As someone choosing between two apps,* I want Simply Piano and Flowkey side by side with real prices, *so that* I don't pay for the wrong subscription. Signal: dedicated "vs" pages, plus "Simply Piano cost per year" searches.
5. **Decision.** *As a budget buyer looking at the FP-10,* I want a hands-on review comparing it with the P-145, *so that* I can trust the cheaper pick. Signal: the FP-10 review results are all single-product reviews, and comparison pages exist for P-145 vs FP-10.

## What the competing pages look like (formats)

- **"Best X" lists:** MusicRadar's digital piano list is 8,965 words with 10 tables and ItemList+FAQPage schema. hellomusictheory's online-lessons list has 12 embedded videos and VideoObject schema. Donner's is 2,747 words. Most were updated Mar–Jul 2026.
- **Reviews:** MusicRadar, TopTenReviews and Pianist's Compass use Review+Product (or Course) schema with a rating. Pianist's Compass was refreshed in Apr 2026. Word counts run roughly 1,200–6,700, with a median around 2,500. Forums and Trustpilot also rank for review searches.
- **How-tos:** numbered steps in the title; 960–2,100 words.
- **Quizzes and pickers:** not checked on competitor pages. The pianoers picker on /best-beginner-pianos/ was the only one I saw.

## Limitations

- The search results come from the WebSearch tool (US), not a live Google results page. Positions are approximate. I could not see SERP features (People Also Ask, AI Overview, video or shopping carousels, featured snippets). Several results were spam or scraper sites (e.g. csr.hdsupply.com, mayfairfarms.com) that may not show in real Google.
- No Search Console data. Cannibalization is judged from overlapping content plus both pages appearing in the same results, not from query-level impressions.
- `render_page.py` refused the configured local proxy ("blocked hostname 127.0.0.1"). Pages were fetched with requests through the proxy instead. Ghost renders on the server, so this HTML is what visitors see, apart from links and widgets the theme adds with JavaScript.
- Some competitor pages were blocked or empty: gear4music, musicnotes, masterclass (403), pianodreamers (202 challenge), oktav (404), americansongwriter best lessons (410). Word counts were measured with trafilatura and are approximate.
- The Wayback Machine was rate-limited (429), so the old content of the deleted page was not checked.
- Not checked: whether product photos are original, live competitor prices, Core Web Vitals (covered by another agent), and mobile layout above the fold.

## Structured findings (for audit-data.json, category "Search Experience")

```json
{"category":"Search Experience","score":62,"findings":[
{"id":"sxo-1","severity":"High","url":"/best-digital-piano/","title":"Cannibalizes /best-beginner-pianos/ (fix kit not applied)"},
{"id":"sxo-2","severity":"High","url":"/how-hard-is-it-to-learn-piano-as-an-adult/","title":"Ranking URL returns 404"},
{"id":"sxo-3","severity":"High","url":"/best-piano-lessons-online/","title":"Ratings/prices contradict individual reviews"},
{"id":"sxo-4","severity":"High","url":"(new)","title":"Missing Roland FP-10 / Kawai ES60 / FP-30X reviews"},
{"id":"sxo-5","severity":"High","url":"(new)","title":"Missing best piano for kids page"},
{"id":"sxo-6","severity":"High","url":"/how-to-tune-a-piano-a-simple-guide/","title":"Intent mismatch: no steps, link-out page, 2024"},
{"id":"sxo-7","severity":"High","url":"/acoustic-vs-digital-piano/","title":"681 words vs 989-1,704 in SERP; no meta description"},
{"id":"sxo-8","severity":"Medium","url":"/yamaha-p-145-review/","title":"Targets listicle phrases; old meta title; no Review schema; 2x FAQPage"},
{"id":"sxo-9","severity":"Medium","url":"/best-free-piano-learning-apps/","title":"Overlap with lessons list; broken anchor; wrong ItemList URL"},
{"id":"sxo-10","severity":"Medium","url":"(new)","title":"Missing Simply Piano vs Flowkey"},
{"id":"sxo-11","severity":"Medium","url":"/flowkey-review/, /pianote-review/","title":"Thin vs SERP"},
{"id":"sxo-12","severity":"Medium","url":"site","title":"List pages don't link to their review pages"},
{"id":"sxo-13","severity":"Medium","url":"/pianoforall-review/","title":"Sales tone, no rating/Review schema"},
{"id":"sxo-14","severity":"Medium","url":"/teach-yourself-piano/","title":"Steps buried below preamble"},
{"id":"sxo-15","severity":"Medium","url":"site","title":"Returning-adult persona unserved"},
{"id":"sxo-16","severity":"Medium","url":"site","title":"No affiliate disclosure on 11/14"},
{"id":"sxo-17","severity":"Medium","url":"/best-digital-piano/","title":"No comparison table/ItemList; P-145 spec errors still live"}]}
```

Generate a PDF report? Use `/seo google report`.
