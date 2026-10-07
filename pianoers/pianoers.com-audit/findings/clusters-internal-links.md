# pianoers.com: topic clusters and internal linking audit

Date: 7 Oct 2026. Scope: the 38 posts in the sitemap. Data: `crawl/pages.json` (body links only), `crawl/links.json` (redirect status), theme source `/home/user/dt/pianoers/theme/pianoers/` (read only), plus a few live checks (curl of one redirect, 17 web searches for SERP overlap).

## Score: 35 / 100 (Content Architecture)

Why it's low: 16 of 38 posts (42%) get no in-article links from any other post, and 9 more get only one. Together that's 25 of 38 posts (66%). Most of the links that do exist point at four pages (best-beginner-pianos, best-piano-lessons-online, pianoforall-review, simply-piano). The two "best of" money pages hardly link down to the reviews of the products they rank. The care cluster (9 posts) has no hub, and 5 of its posts link nowhere. What keeps the score above 25: the money pages already get plenty of inbound links, the anchors on newer posts are mostly descriptive, and the topics fall into clean clusters, so the fixes are mostly a matter of adding links.

## What works

- The money pages are well linked: /best-beginner-pianos/ has 19 linking posts, /best-piano-lessons-online/ 16, /pianoforall-review/ 12, /simply-piano-review.../ 11.
- The newest rewrites link well, with descriptive anchors: /best-beginner-pianos/ (11 posts linked), /best-digital-piano/, /yamaha-p-145-review/, /piano-basics.../, /piano-practice.../ (it has a "What to read next" block) and /climate-control-and-your-piano/.
- Clusters are easy to see and mostly separate. Search results confirm that the two tuning posts and the humidifier/dehumidifier posts target different results (see the SERP table).
- The theme has a related-posts block (`partials/related-posts.hbs`: 3 posts that share a tag). That gives orphan posts *some* crawl path, but these are not in-article links and pass much less topical signal.
- The theme adds `rel="sponsored nofollow noopener"` to links on configured affiliate domains (`assets/js/main.js` lines 52-64).

## Findings, by severity

| # | Severity | Finding | Evidence | Fix (where) |
|---|---|---|---|---|
| 1 | Critical | 16 posts have **0** in-article inbound links, and 9 more have only 1 (66% of posts). | Zero inbound: climate-control-and-your-piano, stephen-ridley, ahmad-jamal-biography, worship-music-academy-review, hdpiano-review, pianovision-review, synthesia-piano-review, piano-with-jonny-review, cole-lam-the-piano-prodigy, 5-best-piano-methods-to-learn-quickly, how-the-piano-works, are-piano-keys-still-made-of-ivory, piano-career-academy-review, how-to-tune-a-piano-a-simple-guide, piano-diy-repair-guide, how-to-clean-and-maintain-your-piano. One inbound: loog-piano, piano-practice, open-studio-jazz-review, best-piano-books-for-adult-beginners, piano-humidifier, pianote-review, lang-lang-the-biography, bastien, piano-tuning-when-and-why. Full table below. | Add the links in the Link Matrix (section 3). Each post is edited in Ghost Admin > Posts > (post) > select text > link icon. After the matrix, every post has at least 2 inbound links, and every money page at least 6. |
| 2 | High | The two "best of" pages don't link to the reviews of the products they rank. | /best-piano-lessons-online/ ranks 8 products but links only to the Pianoforall and Simply Piano reviews. Its Skoove (#5), Pianote (#6) and Flowkey (#7) sections have no review link, even though those reviews exist. /best-free-piano-learning-apps/ has 7 app sections (Simply Piano, Flowkey, Skoove, Pianote...) and links to **none** of the reviews, only to anchors on its own page. | Matrix rows 1-10. Put one "Read our full X review" link at the end of each product section. |
| 3 | High | 5 posts have **0 internal outbound links** (dead ends), and all but one are in the care cluster. | how-the-piano-works, piano-tuning-when-and-why-its-needed, how-to-tune-a-piano-a-simple-guide, piano-diy-repair-guide, how-to-clean-and-maintain-your-piano have no internal body links. worship-music-academy-review links only to the /PFA affiliate redirect. piano-career-academy-review has no internal links. | Care rows 56-71 in the matrix. Add a short "Related care guides" line at the end of each care post. |
| 4 | High | 29 affiliate links go through same-domain redirects (/PFA, /pianoforall, /pbp) and carry **no `rel="sponsored"`** in the HTML. The theme JS only marks links whose *hostname* is on the affiliate domain list, and these are pianoers.com URLs. | /PFA gives a 302 to hop.clickbank.net (checked live). The 29 links are on teach-yourself (5), best-piano-lessons-online (8), pianoforall-review (5), simply-piano (4), hdpiano (2), worship (2), skoove (1), synthesia (1), best-free-apps (1). None has `sponsored` in `rel`. The theme's `isAffiliate()` matches on host only (`main.js` line 54). | Have your developer extend the theme's affiliate check to match the paths `/PFA`, `/pianoforall` and `/pbp` (theme change, done in the theme repo, not in Admin). A quicker option: use Ghost Admin > Settings > Labs > Redirects to move these redirects under `/r/` (e.g. `/r/pianoforall`). `/r/` is already blocked in robots.txt, but the rel attribute still needs the theme fix. |
| 5 | High | /best-digital-piano/ and /best-beginner-pianos/ compete for the same search ("best digital piano for beginners"). | A web search for "best digital piano for beginners 2026" returned **both** pianoers URLs (positions 3 and 8 in the result set). /best-digital-piano/ has a full "Best Digital Pianos for Beginners (Under $500)" section with P-145BT, FP-10 and ES60, the same models as the beginner page. | Cut that section on /best-digital-piano/ down to a short summary (one line per model) plus a prominent link: "See all 7 in my **best digital pianos for beginners** guide" pointing to /best-beginner-pianos/ (matrix row 44). Leave "beginner" phrasing out of /best-digital-piano/'s meta title (Post settings > Meta data). |
| 6 | Medium | Internal link to an old URL goes through a 2-hop redirect. | /piano-humidifier/ links to `/best-piano-courses-online/` (anchor "piano playing"). Live check: 301 to `/best-piano-lessons-online` (no slash), then 301 to `/best-piano-lessons-online/`, then 200. | In the post, change the link to point at /climate-control-and-your-piano/ with a relevant anchor (row 54); the current anchor and target don't fit a humidifier post. Separately, in Ghost Admin > Settings > Labs > Redirects, download redirects.yaml and change the target to `/best-piano-lessons-online/` (with the trailing slash) so it takes one hop. |
| 7 | Medium | Anchor text is vague or misleading on about 20 links (details in section 1.3). | e.g. "Piano sales" (teach-yourself to best-beginner-pianos, inside a sentence about pandemic sales figures); "piano" x3; "established competitors?"; "too many good options"; "learning apps" pointing to a *lessons* page; "classical piano lessons" pointing to a page that isn't classical. | Rewrite anchors as listed in table 1.3. |
| 8 | Medium | The care cluster (9 posts) has no hub page. Humidity is split across 3 posts. | climate-control (1,956 words, updated 7 Oct 2026, covers humidifiers *and* dehumidifiers in "How to control humidity"); piano-humidifier (1,268 words, a single H2, published 2022); piano-dehumidifier-101 (983 words). | Make /how-to-clean-and-maintain-your-piano/ the care hub and /climate-control-and-your-piano/ the humidity sub-hub. Differentiate the humidifier post (section 2.2). |
| 9 | Medium | 5-best-piano-methods overlaps with best-piano-books and the Bastien review. | 5-best-piano-methods reviews Faber Piano Adventures, Alfred, Bastien, Simply Music and Suzuki. best-piano-books covers Faber, Alfred and Bastien for adults. The Bastien review covers Bastien alone. | Reposition 5-best-piano-methods as "piano teaching methods compared" (section 2.2) and cross-link all three. |
| 10 | Medium | Some links are Ghost bookmark cards that still show **stale 2025 titles**. | Anchor text in the dehumidifier post: "Best Beginner Pianos🎹 in 2025 (That I've Actually Played)...". In open-studio-jazz: "8 Best Online Piano Lessons🎹 for 2025 (Ranked & Reviewed by...". | In the editor, delete each bookmark card and replace it with an inline text link (bookmark cards don't refresh their title). |
| 11 | Medium | Tag taxonomy overlaps, and 3 tags are thin (section 4). | apps/courses/lessons overlap. Flowkey, Simply Piano and Skoove are *not* tagged apps. Pianote is not tagged courses. books, practice and jazz-piano have 1 post each and no meta description. | See section 4. |
| 12 | Low | Ambiguous brand anchors: the same anchor "Pianoforall" sometimes goes to the review and sometimes straight to the affiliate site. | In teach-yourself, "Pianoforall" links to /pianoforall-review/ twice and to /PFA four times. | Use this pattern: brand-name text links go to the review; buttons and "Get Pianoforall / 39% off" links go to the affiliate redirect. |
| 13 | Low | Tag pages compete with the money pages on their head term. | /tag/lessons/ title "Online Piano Lessons – Reviews, Rankings & Guides"; /tag/apps/ "Best Piano Apps Reviewed..."; /tag/pianos/ "Digital Pianos & Keyboards...". | Ghost Admin > Tags > (tag) > Meta data: use navigational titles ("Piano course reviews – Pianoers"), and add a link to the money page in each tag description. |
| 14 | Low | Missing spokes (content gaps) that searches confirm. | See section 2.3. | Brief new posts in this order: Playground Sessions review, Piano Marvel review, piano tuning cost, how long to learn piano. |

---

## 1. Current internal link graph

### 1.1 Method

I counted links inside the article body (the `links` field for posts), kept only links to other posts (not same-page #anchors, not the /PFA, /pianoforall or /pbp affiliate redirects), and mapped `/best-piano-courses-online/` to its final URL. Result: 100 unique post-to-post links across 38 posts. The theme's related-posts block, the homepage and tag pages are *not* counted, because the brief asked for in-article (contextual) links only.

### 1.2 Inbound/outbound per post (sorted by inbound)

"In" = number of other posts linking to it. "Inst." = total link instances. "Home" = linked from the homepage (non-contextual).

| Post | Words | Out | In | Inst. | Home | Linked from |
|---|---|---|---|---|---|---|
| /climate-control-and-your-piano/ | 1956 | 3 | **0** | 0 | Y | none |
| /stephen-ridley/ | 1209 | 2 | **0** | 0 | | none |
| /ahmad-jamal-biography/ | 2982 | 2 | **0** | 0 | | none |
| /worship-music-academy-review/ | 731 | 0 | **0** | 0 | | none |
| /hdpiano-review/ | 997 | 1 | **0** | 0 | | none |
| /pianovision-review/ | 1517 | 4 | **0** | 0 | | none |
| /synthesia-piano-review/ | 886 | 3 | **0** | 0 | | none |
| /piano-with-jonny-review/ | 729 | 5 | **0** | 0 | | none |
| /cole-lam-the-piano-prodigy/ | 760 | 1 | **0** | 0 | | none |
| /5-best-piano-methods-to-learn-quickly/ | 1036 | 3 | **0** | 0 | | none |
| /how-the-piano-works/ | 1019 | 0 | **0** | 0 | | none |
| /are-piano-keys-still-made-of-ivory/ | 740 | 1 | **0** | 0 | | none |
| /piano-career-academy-review/ | 1872 | 0 | **0** | 0 | | none |
| /how-to-tune-a-piano-a-simple-guide/ | 1480 | 0 | **0** | 0 | | none |
| /piano-diy-repair-guide/ | 1872 | 0 | **0** | 0 | Y | none |
| /how-to-clean-and-maintain-your-piano/ | 1957 | 0 | **0** | 0 | | none |
| /loog-piano/ | 1879 | 1 | 1 | 1 | | best-beginner-pianos |
| /piano-practice-4-tips-to-successful-sessions/ | 2646 | 4 | 1 | 1 | | ahmad-jamal |
| /open-studio-jazz-review/ | 868 | 2 | 1 | 1 | | 5-best-piano-methods |
| /best-piano-books-for-adult-beginners/ | 2179 | 4 | 1 | 1 | Y | bastien |
| /piano-humidifier/ | 1268 | 2 | 1 | 1 | | climate-control |
| /pianote-review/ | 1331 | 5 | 1 | 1 | | piano-with-jonny |
| /lang-lang-the-biography/ | 1528 | 2 | 1 | 1 | | flowkey-review |
| /bastien-piano-method-is-it-the-right-one-for-you/ | 975 | 2 | 1 | 1 | | 5-best-piano-methods |
| /piano-tuning-when-and-why-its-needed/ | 1954 | 0 | 1 | 1 | | climate-control |
| /skoove-review/ | 1947 | 2 | 2 | 2 | | pianoforall-review, pianote-review |
| /piano-dehumidifier-101-why-it-is-important/ | 983 | 2 | 2 | 2 | Y | climate-control, piano-humidifier |
| /best-free-piano-learning-apps/ | 1114 | 2 | 2 | 2 | | best-beginner-pianos, pianovision |
| /yamaha-p-145-review/ | 1267 | 4 | 3 | 4 | Y | best-beginner-pianos, best-digital-piano, best-piano-lessons-online |
| /piano-basics-a-beginners-guide-to-the-keyboard/ | 2848 | 5 | 3 | 3 | Y | ahmad-jamal, best-beginner-pianos, piano-practice |
| /acoustic-vs-digital-piano/ | 681 | 1 | 3 | 5 | | best-beginner-pianos, best-digital-piano, yamaha-p-145 |
| /best-digital-piano/ | 5189 | 7 | 4 | 4 | Y | best-beginner-pianos, best-piano-books, dehumidifier, yamaha-p-145 |
| /teach-yourself-piano/ | 2027 | 4 | 6 | 6 | Y | 5-best-methods, bastien, best-beginner-pianos, best-digital-piano, piano-basics, piano-practice |
| /flowkey-review/ | 1155 | 5 | 8 | 9 | Y | best-beginner-pianos, best-digital-piano, best-piano-books, piano-with-jonny, pianoforall-review, pianote, pianovision, teach-yourself |
| /simply-piano-review-.../ | 1739 | 2 | 11 | 13 | Y | 11 posts |
| /pianoforall-review/ | 2605 | 4 | 12 | 15 | | 12 posts |
| /best-piano-lessons-online/ | 2205 | 4 | 16 | 19 | Y | 16 posts (one of them via the redirect) |
| /best-beginner-pianos/ | 4074 | 11 | 19 | 25 | Y | 19 posts |

Notes:
- /best-digital-piano/ is the broadest money page, but only 4 posts link to it, against 19 for /best-beginner-pianos/. Many generic "piano/keyboard" anchors across the site point at the beginner page by default.
- /pianoforall-review/ (12 posts) is not linked from the homepage. The affiliate redirect gets about as much in-content prominence as the review.
- The only pianist post linking into the learning cluster is ahmad-jamal (to practice and basics). Nothing links *to* the pianist posts except flowkey linking to lang-lang.

### 1.3 Anchor-text problems (existing links: fix in place)

| From | Current anchor | To | Problem | New anchor |
|---|---|---|---|---|
| teach-yourself-piano | "Piano sales" | best-beginner-pianos | The sentence is about pandemic market data, so the anchor misleads | Unlink it; add a link in Step 1 instead (row 31) |
| stephen-ridley | "piano" | best-beginner-pianos | Single generic word | "a beginner digital piano" |
| pianoforall-review | "piano" (2nd link) | best-beginner-pianos | Generic | "best beginner digital pianos" |
| are-piano-keys-still-made-of-ivory | "piano" | best-beginner-pianos | Generic; best-digital-piano fits better (Ivory Feel keys) | see row 69 |
| lang-lang-the-biography | "began playing the piano" | best-beginner-pianos | Off-topic in a biography | Remove; add the pianist links (rows 74-75) |
| lang-lang-the-biography | "learning piano", "taking lessons" | best-piano-lessons-online | Vague, and two links to the same page | Keep one: "online piano lessons" |
| best-piano-books-for-adult-beginners | "keyboard" | best-digital-piano | Generic; for adult beginners the beginner page fits better | "a beginner keyboard with weighted keys", to best-beginner-pianos |
| acoustic-vs-digital-piano | "good digital" | best-beginner-pianos | Partial phrase | "good beginner digital piano" |
| flowkey-review | "learning piano" | best-piano-lessons-online | Vague | "best online piano lessons" |
| flowkey-review | "piano I was using" | best-beginner-pianos | Vague | "the beginner digital piano I used" |
| pianote-review | "too many good options" | best-piano-lessons-online | No keyword | "best online piano lessons ranked" |
| pianovision-review | "established competitors?" | best-free-piano-learning-apps | No keyword | "best piano learning apps" |
| best-free-piano-learning-apps | "lessons" | best-piano-lessons-online | One word | "online piano lessons" |
| best-beginner-pianos, best-digital-piano | "learning apps" | best-piano-lessons-online | Anchor says apps, page is lessons | Point "learning apps" to /best-free-piano-learning-apps/, or change the anchor to "online piano lessons" |
| cole-lam-the-piano-prodigy | "classical piano lessons" | best-piano-lessons-online | Target isn't classical-focused | "online piano lessons" |
| simply-piano-review | "keyboard or piano" | best-beginner-pianos | Vague | "beginner keyboard" |
| pianovision-review | "piano keyboard" | best-beginner-pianos | Vague | "MIDI-ready beginner keyboard" |
| piano-humidifier | "piano playing" | /best-piano-courses-online/ (2-hop redirect) | Generic, off-topic, redirects | Retarget (row 54) |
| piano-dehumidifier-101 | bookmark card "Best Beginner Pianos🎹 in 2025..." | best-beginner-pianos | Stale year, off-topic for a care post | Replace with an inline link: "humidity matters less for a digital piano" pointing to best-digital-piano (keep), and remove this card |
| open-studio-jazz-review | bookmark card "8 Best Online Piano Lessons🎹 for 2025..." | best-piano-lessons-online | Stale year | Inline link: "best online piano lessons" |
| bastien | bookmark card "How to learn piano by yourself..." | teach-yourself-piano | Long title used as anchor | Inline: "how to teach yourself piano" |
| teach-yourself-piano, pianoforall-review, best-piano-lessons-online | empty anchor (image links) | /PFA, /pianoforall, /pbp | Image links with no text; acceptable if the image has alt text (not checked here) | Make sure the images have alt text, e.g. "Pianoforall course" |

### 1.4 Redirected internal links

| Link | On | Chain (live check 7 Oct) | Fix |
|---|---|---|---|
| /best-piano-courses-online/ | /piano-humidifier/ | 301 to /best-piano-lessons-online, 301 to /best-piano-lessons-online/, then 200 (2 hops) | Edit the link (row 54) and fix the redirects.yaml target to include the trailing slash |
| /PFA, /pianoforall | 9 posts | 302 to hop.clickbank.net, then pianoforall.com (4 hops) | Intended affiliate cloaks; add sponsored (finding 4) |
| /pbp | /best-piano-lessons-online/ | Ends in 403 at the merchant (`...copy-of-sms-fake-bfcm-recovery-angle...?affiliate_id=4282845`) | The 403 may just be a bot block; open it in a browser to confirm. The destination slug looks like a Black-Friday "recovery" funnel page, so ask the affiliate program for the evergreen landing URL |

---

## 2. Clusters

### 2.1 Cluster map

**A. Digital pianos and buying** (money: Amazon)
- Pillar: **/best-digital-piano/** (broadest; all budgets)
- Sub-pillar: **/best-beginner-pianos/** (owns "beginner" queries)
- Spokes: /yamaha-p-145-review/, /acoustic-vs-digital-piano/ (681 words: thin, expand), /loog-piano/ (kids)
- Bridge spokes into care: /how-the-piano-works/, /are-piano-keys-still-made-of-ivory/
- Missing spokes: Roland FP-10 review; Yamaha P-145 vs Roland FP-10; best keyboard for kids (searches show a separate listicle results page, and pianoers is absent); weighted vs unweighted / 61 vs 88 keys; best digital piano under $1,000. Lower priority: Kawai ES60 review, Casio PX-S1100 review.

**B. Online courses and apps** (money: ClickBank/affiliate)
- Pillar: **/best-piano-lessons-online/**
- Sub-pillar: **/best-free-piano-learning-apps/** (owns "free" and "app")
- Spokes (reviews): pianoforall, simply-piano, flowkey, skoove, pianote, synthesia, pianovision, hdpiano, piano-with-jonny, open-studio-jazz, piano-career-academy, worship-music-academy, stephen-ridley (exposé)
- Missing spokes: **Playground Sessions review** and **Piano Marvel review** (both ranked #3/#4 on the pillar and both have affiliate programs; the search for "Playground Sessions review" shows a reviews results page and no pianoers URL), **Piano by Pictures review** (ranked #8, /pbp affiliate), Simply Piano vs Flowkey, best jazz piano courses (a natural hub for Open Studio, Piano With Jonny and the Ahmad Jamal tie-in).

**C. Learning method and practice**
- Pillar: **/teach-yourself-piano/**
- Spokes: /piano-basics.../, /piano-practice.../, /best-piano-books-for-adult-beginners/ (Amazon money page), /5-best-piano-methods.../, /bastien-piano-method.../
- Missing spokes: how long does it take to learn piano (searches show an informational results page, pianoers absent); basic piano chords for beginners; how to read sheet music; learning piano as an adult.

**D. Piano care and maintenance** (no hub today)
- Proposed hub: **/how-to-clean-and-maintain-your-piano/** (broadest scope: cleaning, environment, servicing). Expand it into "Piano care and maintenance: the complete guide" and update the H1/meta. The Ghost slug can stay.
- Humidity sub-hub: **/climate-control-and-your-piano/**, with spokes /piano-humidifier/ and /piano-dehumidifier-101.../
- Tuning sub-group: /piano-tuning-when-and-why-its-needed/ (when and how often) and /how-to-tune-a-piano-a-simple-guide/ (DIY procedure)
- Other spokes: /piano-diy-repair-guide/, /how-the-piano-works/, /are-piano-keys-still-made-of-ivory/
- Missing spoke: **piano tuning cost**. The results page is full of low-quality spam domains (see the SERP table), so a credible page from a concert pianist should do well there. Also: how to move a piano.

**E. Pianists / biographies** (informational, low commercial value)
- Hub: none. /tag/pianists/ acts as the hub.
- Spokes: lang-lang, cole-lam, ahmad-jamal
- Recommendation: don't build more here until A to D are linked. Use the bios as bridges: Ahmad Jamal to the jazz courses, Lang Lang and Cole Lam to lessons and practice.

### 2.2 Cannibalization pairs and decisions

SERP overlap was measured with the WebSearch tool, whose result sets have about 9-10 URLs and some spam/mirror domains. It is not a clean Google top 10, so treat the overlap counts as rough signals. Thresholds: 7-10 shared = same post, 4-6 = same cluster, 2-3 = interlink, 0-1 = separate.

| Query pair | Shared URLs | Read |
|---|---|---|
| "piano humidifier" vs "piano dehumidifier" | 3 (key-notes.com/blog/piano-humidifier, patents.google.com/patent/US6133519, esteypiano.com/?p=720) | Interlink, keep separate. pianoers appears in both with **different** URLs, which is a good sign |
| "piano humidifier" vs "ideal humidity for piano" | 2 (key-notes.com, old.hellosimply.com) | Interlink |
| "piano dehumidifier" vs "ideal humidity for piano" | 1 | Separate |
| "how to tune a piano" vs "how often should a piano be tuned" | 0 | Separate intents |
| "best online piano lessons" vs "best piano learning apps" | 0 exact (americansongwriter.com on both, different URLs) | Separate pages, but heavy product overlap |
| "how to teach yourself piano" vs "piano basics for beginners keyboard layout" | 0 | Separate |
| "best piano method books" vs "best piano books for adult beginners" | 1 (pianote.com/blog/best-piano-books-for-beginners) | Separate, interlink |
| "best digital piano 2026" vs "best digital piano for beginners 2026" | 1 (pianoers.com/best-digital-piano/), and **both** pianoers URLs show for the beginner query | Intra-site split (finding 5) |

Decisions:

1. **piano-humidifier vs piano-dehumidifier-101 vs climate-control: differentiate, don't merge.**
   - climate-control is the humidity hub (ideal range, measuring, seasonal routine). Its "How to control humidity" section should cut product detail down to one paragraph each, linking to the two product posts.
   - piano-humidifier (2022, one H2, 1,268 words) becomes the *product* guide for dry rooms: tube humidifiers vs Dampp-Chaser vs room units, evaporative vs ultrasonic, how to choose. Remove the general "why humidity matters" text that duplicates climate-control. Update the meta title (Post settings > Meta data); the current SEO title is "Piano Humidifiers & Humidity Control Systems Guide", and "Humidity Control Systems" overlaps with dehumidifier and Dampp-Chaser.
   - piano-dehumidifier-101 stays the damp-room product guide. Merge only if the humidifier post can't be refreshed. In that case, 301 piano-humidifier to climate-control (Ghost Admin > Settings > Labs > Redirects), but you would lose the URL that currently shows in results for "piano humidifier".
2. **how-to-tune vs piano-tuning-when-and-why: differentiate.** 0 shared URLs means different intents. piano-tuning owns "how often / signs / what tuning involves" (add a cost section, or link to a new cost post). how-to-tune owns the DIY procedure and "should you do it yourself". Cross-link them (rows 61-62). Also retitle piano-diy-repair-guide. Its current title "Piano SOS: DIY Hacks for Keeping Your Instrument in Tune (Literally)" pulls toward tuning; something like "Piano DIY Repair: Sticky Keys, Squeaky Pedals, Buzzing Strings" fits what the post covers.
3. **best-piano-lessons-online vs best-free-piano-learning-apps vs 5-best-piano-methods: differentiate all three.**
   - best-piano-lessons-online is the pillar for paid courses and apps.
   - best-free-piano-learning-apps should be clearly about *free* options. Its title "Best Free & Paid Piano Learning Apps" collides with the pillar, so drop "& Paid" (Post settings > Meta data and the H1). Each app section should send readers to its full review and to the pillar for paid plans.
   - 5-best-piano-methods is **not** about online lessons. It covers teaching method books and systems (Faber, Alfred, Bastien, Simply Music, Suzuki). Retitle it toward "Piano teaching methods compared: Faber vs Alfred vs Bastien vs Suzuki", move it into cluster C, and link it to best-piano-books (adult editions) and the Bastien review. Its current slug says "learn quickly" and it has only 2 H2s and 1,036 words, so expand it to compare the methods side by side.
4. **teach-yourself-piano vs piano-basics: differentiate.** Searches show no overlap, but teach-yourself "Step 1: Get to Know the Instrument" repeats basics (88 keys, 12-key pattern, white = A-G). Cut Step 1 to 2-3 sentences plus a link to piano-basics (row 29).
5. **best-digital-piano vs best-beginner-pianos: differentiate** (finding 5).

### 2.3 Gap checks (SERP)

| Query | pianoers in result set? | Type of results | Suggestion |
|---|---|---|---|
| Playground Sessions review | No | Single-product reviews (musicradar, toptenreviews, learnopoly) | New spoke in B; it's ranked #4 on the pillar |
| how long does it take to learn piano | No | Informational guides (roland.com, hoffmanacademy) | New spoke in C; link it from teach-yourself and the books post "Real Talk: How Long..." |
| piano tuning cost | No | Mostly spam/mirror domains | New spoke in D; easy opportunity |
| best piano for kids beginners | No | Listicles | New spoke in A; link it with loog-piano and the "Just Want a Keyboard to Try? (Kids...)" section |

---

## 3. Internal link matrix (add these links)

Priority: P1 = links to or from money pages or affiliate reviews, do these first. P2 = cluster integrity. P3 = nice to have. "Section" is the H2 or paragraph where the sentence already exists, checked against the article text. Where it says *(add sentence)*, there's no natural sentence yet, so write one short sentence there. Every row is an in-body text link added in the Ghost editor.

| # | Pri | FROM | Section / paragraph | Anchor text | TO |
|---|---|---|---|---|---|
| 1 | P1 | /best-piano-lessons-online/ | "5. Skoove : Best for AI Feedback on Technique", end of the paragraph | full Skoove review | /skoove-review/ |
| 2 | P1 | /best-piano-lessons-online/ | "6. Pianote : Best for Live Teacher Feedback", end of the section | Pianote review | /pianote-review/ |
| 3 | P1 | /best-piano-lessons-online/ | "7. Flowkey : Best for Song Library Size", end of the section | Flowkey review | /flowkey-review/ |
| 4 | P1 | /best-piano-lessons-online/ | "How to Choose the Right One", "Always try before you commit" bullet | best free piano apps | /best-free-piano-learning-apps/ |
| 5 | P1 | /best-piano-lessons-online/ | "The Starter Pack: What You Actually Need" | beginner piano books | /best-piano-books-for-adult-beginners/ |
| 6 | P2 | /best-piano-lessons-online/ | "The Starter Pack", same list | how to teach yourself piano | /teach-yourself-piano/ |
| 7 | P2 | /best-piano-lessons-online/ | "Final Thoughts" *(add sentence: "Into jazz? ...")* | Open Studio Jazz review | /open-studio-jazz-review/ |
| 8 | P2 | /best-piano-lessons-online/ | "Final Thoughts", same sentence | Piano With Jonny | /piano-with-jonny-review/ |
| 9 | P1 | /best-free-piano-learning-apps/ | "Simply Piano: Best for Fast, Fun Learning", first paragraph | our full Simply Piano review | /simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/ |
| 10 | P1 | /best-free-piano-learning-apps/ | "Flowkey: Best for Song Lovers" | Flowkey review | /flowkey-review/ |
| 11 | P1 | /best-free-piano-learning-apps/ | "Skoove: Best for Guided Learning with Feedback" | Skoove review | /skoove-review/ |
| 12 | P1 | /best-free-piano-learning-apps/ | "Pianote: Best for Visual Learners (Free on YouTube)" | Pianote review | /pianote-review/ |
| 13 | P1 | /best-free-piano-learning-apps/ | "Final Thoughts", "or in Pianoforall if you're an adult" (currently /PFA) | why I recommend Pianoforall for adults | /pianoforall-review/ |
| 14 | P2 | /best-free-piano-learning-apps/ | "How to Choose the Right Free Piano App" *(add a row/sentence for falling-notes apps)* | Synthesia review | /synthesia-piano-review/ |
| 15 | P2 | /best-free-piano-learning-apps/ | same spot | PianoVision VR review | /pianovision-review/ |
| 16 | P2 | /best-free-piano-learning-apps/ | "Hoffman Academy: Best for Kids" *(add sentence)* | Loog Piano review | /loog-piano/ |
| 17 | P1 | /simply-piano-review-.../ | "A Better Alternative?" paragraph, where Pianoforall is named (keep the affiliate button) | my full Pianoforall review | /pianoforall-review/ |
| 18 | P1 | /simply-piano-review-.../ | "Simply Piano Pricing: The Math Gets Ugly", end | free piano apps worth trying first | /best-free-piano-learning-apps/ |
| 19 | P1 | /simply-piano-review-.../ | "Who Should (and Shouldn't) Use Simply Piano" *(add: "Want real songs over games? ...")* | Flowkey | /flowkey-review/ |
| 20 | P1 | /flowkey-review/ | "How It Compares to Other Piano Apps" *(add a "Flowkey vs Skoove" line)* | Skoove | /skoove-review/ |
| 21 | P2 | /flowkey-review/ | "How It Compares..." *(HDpiano also teaches songs)* | HDpiano review | /hdpiano-review/ |
| 22 | P1 | /skoove-review/ | "How Skoove compares" table, Flowkey row | Flowkey | /flowkey-review/ |
| 23 | P1 | /skoove-review/ | "How Skoove compares" table, Simply Piano row | Simply Piano | /simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/ |
| 24 | P1 | /pianoforall-review/ | "Alternatives to Pianoforall" | Simply Piano | /simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/ |
| 25 | P1 | /pianoforall-review/ | "Alternatives to Pianoforall" | Pianote | /pianote-review/ |
| 26 | P1 | /hdpiano-review/ | "Is HDPiano Worth It?" | best online piano lessons | /best-piano-lessons-online/ |
| 27 | P1 | /worship-music-academy-review/ | "not intended for absolute piano beginners ... consider a foundational course" | Pianoforall review | /pianoforall-review/ |
| 28 | P1 | /worship-music-academy-review/ | same paragraph | best online piano lessons for beginners | /best-piano-lessons-online/ |
| 29 | P2 | /teach-yourself-piano/ | "Step 1: Get to Know the Instrument", "Read the keyboard" (cut it down; see 2.2) | beginner's guide to the piano keyboard | /piano-basics-a-beginners-guide-to-the-keyboard/ |
| 30 | P2 | /teach-yourself-piano/ | "Practice That Works", first paragraph | 4 tips for piano practice sessions that work | /piano-practice-4-tips-to-successful-sessions/ |
| 31 | P1 | /teach-yourself-piano/ | "Step 1" *(add: "You need 88 weighted keys...")*, replacing the "Piano sales" link | best beginner keyboard pianos | /best-beginner-pianos/ |
| 32 | P1 | /teach-yourself-piano/ | "Build the Foundation" (reading a staff) | best piano books for adult beginners | /best-piano-books-for-adult-beginners/ |
| 33 | P1 | /teach-yourself-piano/ | "Apps and Online Courses", "A phone app can hear your notes..." | best online piano lessons | /best-piano-lessons-online/ |
| 34 | P2 | /piano-basics-.../ | "A ten-minute first practice session" | how to structure a practice session | /piano-practice-4-tips-to-successful-sessions/ |
| 35 | P1 | /piano-basics-.../ | "What to learn next", "reading the notes on a staff" | piano method books for adults | /best-piano-books-for-adult-beginners/ |
| 36 | P2 | /best-piano-books-for-adult-beginners/ | "3. Bastien Piano for Adults Book 1" | Bastien Piano Method review | /bastien-piano-method-is-it-the-right-one-for-you/ |
| 37 | P2 | /best-piano-books-for-adult-beginners/ | "Real Talk: How Long Does This Take?" | how to practice piano | /piano-practice-4-tips-to-successful-sessions/ |
| 38 | P2 | /best-piano-books-for-adult-beginners/ | "What Actually Matters When Choosing" | piano teaching methods compared | /5-best-piano-methods-to-learn-quickly/ |
| 39 | P2 | /best-piano-books-for-adult-beginners/ | "What Else You Need (Don't Skip This)" | how to teach yourself piano | /teach-yourself-piano/ |
| 40 | P1 | /5-best-piano-methods-.../ | "Piano Adventures" / "Alfred's Piano Method" sections, the adult books mention | best piano books for adult beginners | /best-piano-books-for-adult-beginners/ |
| 41 | P1 | /5-best-piano-methods-.../ | "Best for You?" (closing) | online piano lessons | /best-piano-lessons-online/ |
| 42 | P2 | /bastien-piano-method-.../ | intro *(compare with other methods)* | how Bastien compares with Faber and Alfred | /5-best-piano-methods-to-learn-quickly/ |
| 43 | P2 | /piano-practice-4-tips-.../ | "What to read next" block | best piano books for adult beginners | /best-piano-books-for-adult-beginners/ |
| 44 | P1 | /best-digital-piano/ | "Best Digital Pianos for Beginners (Under $500)", section intro (upgrade the existing "beginner pianos" link) | best digital pianos for beginners | /best-beginner-pianos/ |
| 45 | P2 | /best-digital-piano/ | Roland FP-30X, "Ivory Feel keytops" | why piano keys aren't ivory anymore | /are-piano-keys-still-made-of-ivory/ |
| 46 | P2 | /best-digital-piano/ | Console section, "without the tuning, maintenance, and space requirements" | what piano tuning involves | /piano-tuning-when-and-why-its-needed/ |
| 47 | P1 | /best-beginner-pianos/ | "Bonus: Don't Ignore These Tips" *(add a tip: get a method book)* | piano books for adult beginners | /best-piano-books-for-adult-beginners/ |
| 48 | P1 | /acoustic-vs-digital-piano/ | "Is a Digital Piano as Good as a Real (Acoustic) Piano?" (Clavinova, Roland LX, Kawai CA) | best digital pianos, including consoles | /best-digital-piano/ |
| 49 | P1 | /acoustic-vs-digital-piano/ | "Digital or Acoustic Piano for Beginners: My Real Answer", "start on a good digital" | Yamaha P-145 review | /yamaha-p-145-review/ |
| 50 | P2 | /acoustic-vs-digital-piano/ | Cheat sheet, "Never tuning again" row / "tuning bills" | how often an acoustic piano needs tuning | /piano-tuning-when-and-why-its-needed/ |
| 51 | P2 | /acoustic-vs-digital-piano/ | "...a dedicated, climate-controlled room" | ideal piano humidity and temperature | /climate-control-and-your-piano/ |
| 52 | P2 | /acoustic-vs-digital-piano/ | "Acoustic piano = real strings and hammers" | how an acoustic piano works | /how-the-piano-works/ |
| 53 | P2 | /yamaha-p-145-review/ | "Who the P-145 Is Best For", "Adults returning to piano" | how to teach yourself piano | /teach-yourself-piano/ |
| 54 | P2 | /piano-humidifier/ | intro, replacing the redirected "piano playing" link | ideal humidity range for a piano | /climate-control-and-your-piano/ |
| 55 | P2 | /piano-dehumidifier-101-.../ | "Why Humidity Destroys Pianos" | ideal piano humidity and temperature | /climate-control-and-your-piano/ |
| 56 | P3 | /piano-dehumidifier-101-.../ | "What Type of Dehumidifier Should You Buy?" (for dry winters) | piano humidifier guide | /piano-humidifier/ |
| 57 | P2 | /climate-control-and-your-piano/ | "A seasonal routine" / dust-cover line | how to clean and maintain your piano | /how-to-clean-and-maintain-your-piano/ |
| 58 | P2 | /climate-control-and-your-piano/ | "Signs your piano has a humidity problem" (sticky keys) | DIY fixes for sticky keys | /piano-diy-repair-guide/ |
| 59 | P2 | /how-to-clean-and-maintain-your-piano/ | "Maintaining Your Piano's Environment", "ideal humidity range ... 40-50%" | piano humidity and temperature guide | /climate-control-and-your-piano/ |
| 60 | P2 | /how-to-clean-and-maintain-your-piano/ | "Cleaning the Keys" | ivory or plastic keytops | /are-piano-keys-still-made-of-ivory/ |
| 61 | P2 | /piano-tuning-when-and-why-its-needed/ | "How Often Should You Tune Your Piano?" (consult a technician) | how to tune a piano yourself | /how-to-tune-a-piano-a-simple-guide/ |
| 62 | P2 | /how-to-tune-a-piano-a-simple-guide/ | "How to Tune a Piano - Learn from a Professional" | how often a piano should be tuned | /piano-tuning-when-and-why-its-needed/ |
| 63 | P2 | /piano-tuning-when-and-why-its-needed/ | "Environmental Factors", "Humidity fluctuations are a major culprit" | keep humidity steady at 40-50% | /climate-control-and-your-piano/ |
| 64 | P2 | /how-to-tune-a-piano-a-simple-guide/ | "How to Tune a Piano without Tools", "weather to the humidity" | controlling piano humidity | /climate-control-and-your-piano/ |
| 65 | P2 | /piano-diy-repair-guide/ | "1. Sticky Keys", "Clean it up" | how to clean piano keys safely | /how-to-clean-and-maintain-your-piano/ |
| 66 | P2 | /piano-diy-repair-guide/ | "When to Wave the White Flag and Call in the Pros" | when a piano needs professional tuning | /piano-tuning-when-and-why-its-needed/ |
| 67 | P2 | /how-to-clean-and-maintain-your-piano/ | "Regular Maintenance Tasks" (tune, regulate, voice) | how the piano action works | /how-the-piano-works/ |
| 68 | P2 | /how-the-piano-works/ | regulation paragraph ("piano tuner tell you your piano needs to be regulated") | how often to tune a piano | /piano-tuning-when-and-why-its-needed/ |
| 69 | P1 | /are-piano-keys-still-made-of-ivory/ | "Ivorite" paragraph (replace the "piano" link) | digital pianos with ivory-feel keys | /best-digital-piano/ |
| 70 | P2 | /open-studio-jazz-review/ | intro / "The Brains" *(add a comparison line)* | Piano With Jonny review | /piano-with-jonny-review/ |
| 71 | P2 | /piano-with-jonny-review/ | "What Piano With Jonny Actually Is" (jazz, gospel) | Open Studio Jazz | /open-studio-jazz-review/ |
| 72 | P3 | /piano-with-jonny-review/ | same paragraph, "gospel" | Worship Music Academy | /worship-music-academy-review/ |
| 73 | P2 | /ahmad-jamal-biography/ | "What pianists can learn from him" | Open Studio Jazz | /open-studio-jazz-review/ |
| 74 | P3 | /lang-lang-the-biography/ | "Legacy and Contribution" *(add: today's young prodigies)* | Cole Lam | /cole-lam-the-piano-prodigy/ |
| 75 | P3 | /cole-lam-the-piano-prodigy/ | prodigy paragraph ("At the tender age of 12...") | Lang Lang | /lang-lang-the-biography/ |
| 76 | P3 | /lang-lang-the-biography/ | "Musical Style and Performance" *(contrast with a jazz great)* | Ahmad Jamal | /ahmad-jamal-biography/ |
| 77 | P2 | /synthesia-piano-review/ | "Who Is Synthesia Actually For?" | PianoVision | /pianovision-review/ |
| 78 | P2 | /pianovision-review/ | "PianoVision vs. Other Piano Apps" table | Synthesia | /synthesia-piano-review/ |
| 79 | P2 | /stephen-ridley/ | final paragraph, "legitimate online courses" (keep the lessons link; add a second) | Pianoforall, a one-time course | /pianoforall-review/ |
| 80 | P2 | /best-piano-lessons-online/ | "How I Evaluated These" *(add: "courses I left out, and why")* | Stephen Ridley's Piano Academy | /stephen-ridley/ |
| 81 | P2 | /piano-career-academy-review/ | "Is it worth money?" | best online piano lessons | /best-piano-lessons-online/ |
| 82 | P2 | /best-piano-lessons-online/ | "6. Pianote", "classical training isn't the focus here" | Piano Career Academy | /piano-career-academy-review/ |
| 83 | P2 | /loog-piano/ | "How it compares" | Yamaha P-145 review | /yamaha-p-145-review/ |
| 84 | P3 | /loog-piano/ | "The app, the flashcards..." | free piano apps for kids | /best-free-piano-learning-apps/ |
| 85 | P2 | /5-best-piano-methods-.../ | "Classical Piano Methods" intro *(add: online classical option)* | Piano Career Academy review | /piano-career-academy-review/ |
| 86 | P2 | /how-to-clean-and-maintain-your-piano/ | "Regular Maintenance Tasks", tuning mention | can you tune a piano yourself? | /how-to-tune-a-piano-a-simple-guide/ |
| 87 | P2 | /how-to-clean-and-maintain-your-piano/ | "The Importance of Regular Cleaning", "leading to sticking keys or sluggish movement" | fix sticky piano keys | /piano-diy-repair-guide/ |
| 88 | P2 | /open-studio-jazz-review/ | "The Good" section *(add: learn the style of greats like...)* | Ahmad Jamal | /ahmad-jamal-biography/ |
| 89 | P2 | /best-piano-lessons-online/ | "Final Thoughts", same jazz sentence as rows 7-8 *(add: "Play in church? ...")* | Worship Music Academy review | /worship-music-academy-review/ |
| 90 | P3 | /pianoforall-review/ | "Alternatives to Pianoforall" *(add: one course to avoid)* | Stephen Ridley's Piano Academy | /stephen-ridley/ |
| 91 | P2 | /best-piano-lessons-online/ | "7. Flowkey", song library sentence *(add: song-tutorial alternative)* | HDpiano | /hdpiano-review/ |
| 92 | P3 | /teach-yourself-piano/ | "The Myth of the "Natural" Musician" | Lang Lang | /lang-lang-the-biography/ |
| 93 | P3 | /teach-yourself-piano/ | same paragraph | Cole Lam | /cole-lam-the-piano-prodigy/ |

Inbound links after the matrix (existing + new): every former orphan reaches at least 2. Examples: climate-control 0 to 6, piano-tuning 1 to 6, how-the-piano-works 0 to 3, are-piano-keys 0 to 2, how-to-clean 0 to 2, how-to-tune 0 to 2, diy-repair 0 to 2, piano-career-academy 0 to 2, stephen-ridley 0 to 2, ahmad-jamal 0 to 2, worship 0 to 2, hdpiano 0 to 2, cole-lam 0 to 2, synthesia 0 to 2, pianovision 0 to 2, piano-with-jonny 0 to 2, 5-best-methods 0 to 2. Money pages: best-piano-books 1 to 7, pianote 1 to 4, skoove 2 to 5, flowkey 8 to 12, best-free-apps 2 to 5, best-digital-piano 4 to 6, pianoforall-review 12 to 17. To get every spoke to 3 or more, link the new posts in section 2.3 (care hub expansion, jazz-courses page, tuning cost) back to the posts that are still at 2.

---

## 4. Tag taxonomy

Current tags and post counts (from the tag pages and post body classes):

| Tag | Posts | Description? | Assessment | Action (Ghost Admin > Tags) |
|---|---|---|---|---|
| pianos | 4 | Yes | Good. Its description promises "holiday steals, ivory myths", but the ivory post is tagged care | Keep. Also tag are-piano-keys and acoustic-vs-digital |
| buying-guides | 2 (best-digital-piano, acoustic-vs-digital) | Yes | Overlaps pianos. **best-beginner-pianos is missing**. The description promises "Black Friday deals, console pianos" posts that don't exist as separate posts | Merge into pianos (remove the tag from the 2 posts, then delete it). Or keep it and add best-beginner-pianos, so it's at least 3 posts |
| apps | 4 | Yes | Incomplete: flowkey, simply-piano and skoove are apps but tagged only courses | Add apps to flowkey, simply-piano, skoove, pianote |
| courses | 12 | Yes (title has a double space: "Online Piano Courses  –  First-Hand Reviews") | Core review tag. pianote-review is missing | Add courses to pianote-review; fix the double space in the meta title |
| lessons | 7 | Yes | Mixed bag: guides (teach-yourself, basics, methods) plus reviews (pianote, open-studio, stephen-ridley) plus the pillar. Its title competes with /best-piano-lessons-online/ | Repurpose as **"Learn Piano"** (keep slug `lessons` to avoid a redirect): teach-yourself, piano-basics, piano-practice, 5-best-methods, bastien, best-piano-books. Remove it from reviews that already have courses |
| care | 9 | Yes ("in 2025" in the description is stale) | Good scope | Update the description year; link the future care hub from the description |
| pianists | 3 | Yes | Fine | Keep |
| books | 1 | **No** | Thin, but has real candidates | **Fill**: add bastien-piano-method and 5-best-piano-methods (3 posts). Write a description and meta title such as "Piano method books for beginners – honest reviews" |
| practice | 1 | **No** | Thin, overlaps "Learn Piano" | **Merge**: move piano-practice to lessons/"Learn Piano", then delete the practice tag |
| jazz-piano | 1 (ahmad-jamal) | **No** | Thin, though 2 jazz course reviews exist untagged | **Fill**: add open-studio-jazz-review and piano-with-jonny-review (3 posts) and write a description. Delete it if you won't add jazz content |
| #hash-import-2023-10-02-09-28 (internal) | 3 | n/a | Internal tag, not public; harmless leftover | Optional: delete it |

The result: 8 public tags (pianos, apps, courses, lessons/"Learn Piano", care, pianists, books, jazz-piano), each with at least 3 posts and a description. Ghost uses the *first* tag as the primary tag (breadcrumbs, related posts), so order matters. Put the cluster tag first (e.g. flowkey-review: courses, apps).

---

## 5. Structured findings (for audit-data.json, Content Architecture)

```json
{
  "category": "Content Architecture",
  "score": 35,
  "metrics": {
    "posts": 38,
    "unique_post_to_post_links": 100,
    "orphans_0_inbound": 16,
    "near_orphans_1_inbound": 9,
    "dead_ends_0_outbound": 5,
    "affiliate_redirect_links_without_sponsored": 29,
    "redirected_internal_links": 1
  },
  "clusters": [
    {"name": "Digital pianos & buying", "pillar": "/best-digital-piano/", "sub_pillar": "/best-beginner-pianos/", "spokes": ["/yamaha-p-145-review/", "/acoustic-vs-digital-piano/", "/loog-piano/"], "missing": ["roland-fp-10-review", "yamaha-p145-vs-roland-fp10", "best-piano-for-kids", "weighted-vs-unweighted-keys"]},
    {"name": "Online courses & apps", "pillar": "/best-piano-lessons-online/", "sub_pillar": "/best-free-piano-learning-apps/", "spokes": ["/pianoforall-review/", "/simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/", "/flowkey-review/", "/skoove-review/", "/pianote-review/", "/synthesia-piano-review/", "/pianovision-review/", "/hdpiano-review/", "/piano-with-jonny-review/", "/open-studio-jazz-review/", "/piano-career-academy-review/", "/worship-music-academy-review/", "/stephen-ridley/"], "missing": ["playground-sessions-review", "piano-marvel-review", "piano-by-pictures-review", "best-jazz-piano-courses"]},
    {"name": "Learning method & practice", "pillar": "/teach-yourself-piano/", "spokes": ["/piano-basics-a-beginners-guide-to-the-keyboard/", "/piano-practice-4-tips-to-successful-sessions/", "/best-piano-books-for-adult-beginners/", "/5-best-piano-methods-to-learn-quickly/", "/bastien-piano-method-is-it-the-right-one-for-you/"], "missing": ["how-long-to-learn-piano", "piano-chords-for-beginners", "how-to-read-sheet-music"]},
    {"name": "Piano care & maintenance", "pillar": "/how-to-clean-and-maintain-your-piano/ (to be expanded)", "sub_pillar": "/climate-control-and-your-piano/", "spokes": ["/piano-humidifier/", "/piano-dehumidifier-101-why-it-is-important/", "/piano-tuning-when-and-why-its-needed/", "/how-to-tune-a-piano-a-simple-guide/", "/piano-diy-repair-guide/", "/how-the-piano-works/", "/are-piano-keys-still-made-of-ivory/"], "missing": ["piano-tuning-cost", "how-to-move-a-piano"]},
    {"name": "Pianists", "pillar": "/tag/pianists/ (tag page)", "spokes": ["/lang-lang-the-biography/", "/cole-lam-the-piano-prodigy/", "/ahmad-jamal-biography/"], "missing": []}
  ],
  "cannibalization": [
    {"pages": ["/piano-humidifier/", "/piano-dehumidifier-101-why-it-is-important/", "/climate-control-and-your-piano/"], "serp_shared": "3 / 2 / 1", "decision": "differentiate; climate-control = hub, humidifier rewritten as product guide"},
    {"pages": ["/how-to-tune-a-piano-a-simple-guide/", "/piano-tuning-when-and-why-its-needed/"], "serp_shared": 0, "decision": "differentiate + cross-link"},
    {"pages": ["/best-piano-lessons-online/", "/best-free-piano-learning-apps/", "/5-best-piano-methods-to-learn-quickly/"], "serp_shared": 0, "decision": "differentiate; apps page = free; methods page moves to learning cluster"},
    {"pages": ["/teach-yourself-piano/", "/piano-basics-a-beginners-guide-to-the-keyboard/"], "serp_shared": 0, "decision": "differentiate; trim Step 1 and link"},
    {"pages": ["/best-digital-piano/", "/best-beginner-pianos/"], "serp_shared": "both rank for 'best digital piano for beginners 2026'", "decision": "differentiate; shrink beginner section on best-digital-piano"}
  ],
  "link_matrix_rows": 93
}
```

## Not checked

- Google Search Console data (real impressions per query, which page Google picks). The SERP overlap here comes from a search tool, not GSC.
- The rendered DOM: the rel attributes above come from the crawled HTML. The theme JS may add rel to *external* affiliate hosts at runtime, but by its code it won't touch /PFA, /pianoforall or /pbp.
- Image alt text on the empty-anchor affiliate image links.
- Search volumes for the gap keywords.

Sources (SERP checks): [key-notes.com piano humidifier](https://www.key-notes.com/blog/piano-humidifier), [pianoers piano-humidifier in SERP](https://pianoers.com/piano-humidifier/), [pianoers dehumidifier in SERP](https://pianoers.com/piano-dehumidifier-101-why-it-is-important/), [pianoers climate-control in SERP](https://pianoers.com/climate-control-and-your-piano/), [hellomusictheory how often tune](https://hellomusictheory.com/learn/how-often-should-you-tune-piano/), [masterclass how to tune](https://www.masterclass.com/articles/how-to-tune-a-piano-explained), [americansongwriter best online piano lessons](https://americansongwriter.com/best-online-piano-lessons/), [americansongwriter best piano learning apps](https://americansongwriter.com/best-piano-learning-apps), [pianote best piano books](https://www.pianote.com/blog/best-piano-books-for-beginners/), [musicradar Playground Sessions review](https://musicradar.com/reviews/playground-sessions-review), [roland how long to learn piano](https://www.roland.com/ca/learning-piano/finding-time/), [pianoers best-digital-piano in SERP](https://pianoers.com/best-digital-piano/), [pianoers best-beginner-pianos in SERP](https://pianoers.com/best-beginner-pianos/), [musicradar best digital pianos](https://musicradar.com/news/best-digital-pianos).
