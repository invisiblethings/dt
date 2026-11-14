# Pianoers.com: topical map and site structure (Semantic SEO)

Date: 16 Oct 2026. Built on Koray Tuğberk GÜBÜR's Semantic SEO framework (source context, central entity, core and outer sections, contextual bridges, topical coverage plus historical data).

Inputs: the crawl of all 38 posts, 10 tags and 5 pages (`pianoers.com-audit/crawl/pages.json`), the cluster and internal-link audit (`pianoers.com-audit/findings/clusters-internal-links.md`) and the content audits.

**Limits:** I had no search-volume or Google Search Console data for this map. The priorities below rest on how each topic fits the site, on whether it earns money, and on the searches run for the earlier audit. Before you delete anything, look at its clicks for the last 12 months in GSC (Performance > Pages). Any post with real clicks gets rewritten, not removed.

---

## 1. The frame: what the site is about

| Concept | Pianoers.com |
|---|---|
| **Source context** (why the site exists and how it earns) | A piano teacher and pianist helps adults and parents **start playing the piano**: which instrument to buy and which course to learn with. Revenue comes from Amazon (instruments and gear) and course affiliate programs (ClickBank, Impact and others). |
| **Central entity** | Piano (the instrument and the skill of playing it) |
| **Central search intent** | "I want to learn piano: what do I buy and how do I learn?" |
| **Core section** (money, needs most depth) | 1. Digital pianos and keyboards. 2. Online piano courses and apps. |
| **Outer section** (builds authority and history, feeds the core) | 3. Learning to play. 4. Piano care. 5. The instrument itself. 6. Pianists (bridges only). |

The rule in this framework: every page has to serve the source context. Outer pages are there to prove the site knows the whole subject, and each one passes readers on to the core through a **contextual bridge**: a sentence and link that come naturally from that page's topic. An example is "if your room is dry, a digital piano avoids the problem entirely" pointing to /best-digital-piano/. Pages that can't make that bridge, like a viral-kid biography, dilute the topic.

### What a search engine sees today

- The **core is strong but incomplete**. Two of the eight courses ranked on /best-piano-lessons-online/ have no review (Playground Sessions and Piano Marvel), and neither does the Piano by Pictures affiliate. No comparison ("X vs Y") or alternatives pages exist. On the piano side there is only one model review.
- The **instrument entity itself is barely covered**: no page on types of piano, parts, pedals or how many keys. That is the root of the whole topic, and nearly every competitor with authority covers it.
- The **learning cluster is missing its most-searched node**, "how long does it take to learn piano", plus the skills between "first lesson" and "playing songs" (reading music, chords, scales, using both hands).
- **Internal links don't follow the clusters**: 16 posts have no in-article links pointing at them.
- **Tags don't match the clusters**: apps, courses and lessons overlap, and three tags have one post each.
- **Author trust signals contradict each other**: the Katarina bio versus the posts, and the About page versus its schema. In this framework the author is part of the source context, so this caps how much authority the site can earn.

---

## 2. Target structure

```
Home (root: links to the 5 hubs and "Start here")
│
├── Start here: "How to start learning piano" (new path page: choose piano → choose course → practice)
│
├── CORE 1  Digital pianos & keyboards  ── tag: pianos            hub: /best-digital-piano/
│     ├── /best-beginner-pianos/ (sub-hub, "beginner")
│     ├── model reviews, model vs model, budget/audience lists, accessories
│     └── bridge ← Instrument knowledge, Care
│
├── CORE 2  Online courses & apps  ── tags: courses, apps         hub: /best-piano-lessons-online/
│     ├── /best-free-piano-learning-apps/ (sub-hub, "free / app")
│     ├── one review per product, X vs Y, alternatives, audience lists
│     └── jazz sub-cluster (tag: jazz-piano)
│
├── OUTER 3  Learn to play  ── tag: lessons (renamed "Learn Piano")   hub: /teach-yourself-piano/
│     ├── skills (reading, chords, scales, hands), practice, timelines
│     └── books & methods sub-cluster (tag: books)
│
├── OUTER 4  Piano care  ── tag: care                             hub: /how-to-clean-and-maintain-your-piano/ (expand)
│     ├── humidity sub-hub /climate-control-and-your-piano/
│     └── tuning, repair, moving, cost
│
├── OUTER 5  The piano (instrument)  ── new tag: the-piano         hub: new "Types of pianos"
│     └── parts, pedals, keys, how it works, ivory, history, brands
│
└── OUTER 6  Pianists  ── tag: pianists                           hub: tag page
      └── only biographies that bridge to learning or jazz
```

Ghost has flat URLs and no nested categories, so keep the current slugs. In Ghost, the structure comes from the **primary tag** (the first tag drives breadcrumbs and related posts), from the hub posts and from in-article links. Don't change slugs unless this file says so. Every change needs a 301 in Settings > Labs > Redirects.

---

## 3. Every existing post: keep, rewrite, merge or remove

Key: **Keep** = small fixes only. **Expand** = add the missing attributes listed. **Rewrite** = same URL, new angle. **Remove** = 301 redirect (check GSC first).

### Core 1: Digital pianos

| Post | Role | Action |
|---|---|---|
| /best-digital-piano/ | Hub | Keep. Cut the "beginner under $500" section to a summary that links to /best-beginner-pianos/ (the two pages split the "best digital piano for beginners" results). Link down to every model review and every "vs" page. |
| /best-beginner-pianos/ | Sub-hub | Keep. Owns every "beginner" query. |
| /yamaha-p-145-review/ | Spoke | Keep. |
| /loog-piano/ | Spoke | Keep. Becomes a spoke of the new "best keyboard for kids". |
| /acoustic-vs-digital-piano/ | Spoke (681 words, thin) | **Expand** to 1,800 words or more. Cover sound, touch, cost over 10 years, upkeep, space, volume, resale and lessons. This is a root comparison for the central intent. Move it to the `pianos` tag. |

### Core 2: Courses and apps

Give every review the same attribute set, in the same order. A consistent template is a strong signal in this framework:

**What it is → Who it's for → How lessons work → Levels covered → Song library/genres → Devices & keyboard needed → Price (monthly/yearly/lifetime) → Free trial & refund → What I liked → What's missing → vs top alternatives → Verdict.**

| Post | Action |
|---|---|
| /best-piano-lessons-online/ | Keep (revised). Link to every review. |
| /best-free-piano-learning-apps/ | **Rewrite** around "free": what is truly free and what is a trial. Drop "& Paid" from the title, because the paid side belongs to the hub. Link every app to its review. |
| /pianoforall-review/, /simply-piano-review-…/, /flowkey-review/, /skoove-review/, /pianote-review/ | Keep. Apply the review template and check prices against the lessons page. |
| /synthesia-piano-review/ (886), /pianovision-review/, /hdpiano-review/ (997) | **Expand** to the full template. Fix the "Assesment" typo in the HDpiano title. |
| /piano-with-jonny-review/ (729), /open-studio-jazz-review/ (868) | **Expand**, then make them the jazz sub-cluster with Ahmad Jamal and the new "best jazz piano courses". |
| /piano-career-academy-review/ | Keep. Change "(2025)" in the title. |
| /worship-music-academy-review/ (731) | **Expand** (niche: church and worship pianists), or leave it at low priority. Give it at least 2 internal links. |
| /stephen-ridley/ "The Disturbing Truth" | **Rewrite** as a neutral, evidence-based "Stephen Ridley Piano Academy Review", keeping the URL. The audit flagged the current version as a defamation risk. In a fair review, criticism still fits. |

### Outer 3: Learn to play

| Post | Action |
|---|---|
| /teach-yourself-piano/ | Hub. Keep. Link to every skill post below as it gets published. |
| /piano-basics-a-beginners-guide-to-the-keyboard/ | Keep. |
| /piano-practice-4-tips-to-successful-sessions/ | Keep. Retitle it "How to practice piano: …" so it targets the query instead of the "4 tips" listicle. Move it to the `lessons` tag. |
| /best-piano-books-for-adult-beginners/ | Keep (Amazon money page inside the outer section). |
| /5-best-piano-methods-to-learn-quickly/ | **Rewrite** as "Piano teaching methods compared: Faber, Alfred, Bastien, Suzuki, Simply Music". The "learn quickly" promise doesn't fit what the post covers. Optionally move it to /piano-methods-compared/ with a 301. |
| /bastien-piano-method-is-it-the-right-one-for-you/ | Keep. Move it to the `books` tag. |

### Outer 4: Care

| Post | Action |
|---|---|
| /how-to-clean-and-maintain-your-piano/ | **Expand into the care hub**: "Piano care and maintenance: the complete guide", with one section per spoke and a link to each. |
| /climate-control-and-your-piano/ | Humidity sub-hub. Keep. |
| /piano-humidifier/ | **Rewrite** as the dry-room product guide: Dampp-Chaser versus room humidifiers, and how to choose. It dates from 2022 and has only one H2. |
| /piano-dehumidifier-101-why-it-is-important/ | Keep (damp-room product guide). |
| /piano-tuning-when-and-why-its-needed/ | Keep. Link to the new "piano tuning cost" post. |
| /how-to-tune-a-piano-a-simple-guide/ | Keep, after the safety fixes from the audit. |
| /piano-diy-repair-guide/ | **Retitle** as "Piano DIY repair: sticky keys, squeaky pedals, buzzing strings". The "keeping it in tune" title pulls the post towards tuning. |

### Outer 5: The instrument (new tag `the-piano`)

| Post | Action |
|---|---|
| /how-the-piano-works/ | Move from `care` to `the-piano`. Expand it, with a diagram. |
| /are-piano-keys-still-made-of-ivory/ | Move to `the-piano`. Fix the history errors from the audit. Bridge to digital "ivory-feel" keys on /best-digital-piano/. |

### Outer 6: Pianists

| Post | Action |
|---|---|
| /lang-lang-the-biography/ | Keep. Add a bridge to learning: how he practised, and a link to the practice guide. |
| /ahmad-jamal-biography/ | Keep. Bridge to the jazz courses. |
| /cole-lam-the-piano-prodigy/ (760 words) | **Remove** (301 to /tag/pianists/) unless GSC shows real clicks. A viral-kid profile has no bridge to buying a piano or picking a course, so it is outside the source context. |

**Net result: 0 to 1 posts removed, 4 rewritten, about 10 expanded, and the rest kept.** The site doesn't have a pruning problem. It has a coverage problem and a linking problem.

---

## 4. Tags: final list

| Tag (slug) | Name to show | Cluster | Action |
|---|---|---|---|
| `pianos` | Digital Pianos & Keyboards | Core 1 | Keep. Add acoustic-vs-digital. |
| `courses` | Piano Course Reviews | Core 2 | Keep. Add pianote-review. Fix the double space in the meta title. |
| `apps` | Piano Learning Apps | Core 2 | Keep. Add flowkey, simply-piano, skoove and pianote as second tags. |
| `jazz-piano` | Jazz Piano | Core 2 sub-cluster | Keep and fill: open-studio, piano-with-jonny, ahmad-jamal, and the new jazz posts. |
| `lessons` | **Learn Piano** (rename; keep the slug) | Outer 3 | Keep for guides only. Remove it from reviews (pianote, open-studio, stephen-ridley, best-piano-lessons-online). |
| `books` | Piano Books & Methods | Outer 3 sub-cluster | Keep and fill: bastien, the methods comparison, best-piano-books. |
| `care` | Piano Care | Outer 4 | Keep. Remove "2025" from the description. |
| **`the-piano`** (new) | The Piano: How It Works | Outer 5 | **Create.** Add how-the-piano-works, ivory and the new instrument posts. |
| `pianists` | Famous Pianists | Outer 6 | Keep. |
| `buying-guides` | | | **Delete.** It duplicates `pianos`. Remove it from 2 posts, then delete it. Add a 301 from /tag/buying-guides/ to /tag/pianos/. |
| `practice` | | | **Delete.** Move piano-practice to `lessons`. Add a 301 from /tag/practice/ to /tag/lessons/. |
| `#hash-import-2023-10-02-09-28` | | | **Delete** (leftover internal tag). |
| `#affiliate` (internal) | | | Keep, on every post with an affiliate link (it shows the disclosure). |

Rules:
- **First tag = cluster tag.** For example, flowkey-review gets `courses`, then `apps`.
- Every tag needs at least 3 posts, a 1 to 2 sentence description that links its hub post, and a meta title that doesn't compete with the hub. Use "Piano Course Reviews", not "Best Online Piano Lessons".

---

## 5. New posts to write (the topical map)

Query templates are what make a topical map complete. For each entity type, cover the same set of questions, then fill the slots.

- **Course:** `[course] review` · `[course] vs [course]` · `[course] alternatives` · (price, trial and "is it worth it" stay as H2s inside the review, not separate pages)
- **Piano model:** `[model] review` · `[model] vs [model]`
- **Lists:** `best [instrument/course] for [audience]` · `best [instrument] under [$]`
- **Skill:** `how to [skill] on piano` · `how long to [skill]`
- **Care:** `how to [task]` · `[task] cost`

Priority: **P1** = core money gaps, or the biggest outer gap; write these first. **P2** = next. **P3** = depth and history.

### Core 1: Digital pianos (tag `pianos`)

| # | Title (working) | Template | Bridges to | P |
|---|---|---|---|---|
| 1 | Roland FP-10 review | model review | best-beginner, P-145 vs FP-10 | P1 |
| 2 | Yamaha P-145 vs Roland FP-10 | model vs model | both reviews, best-beginner | P1 |
| 3 | Best keyboard for kids (by age) | audience list | loog-piano, best-beginner | P1 |
| 4 | Do you need 88 keys? Weighted vs unweighted keys explained (answer: 88 weighted) | attribute explainer | best-beginner, best-digital | P1 |
| 5 | Best digital piano under $1,000 | budget list | best-digital | P2 |
| 6 | Casio PX-S1100 review | model review | best-digital | P2 |
| 7 | Kawai ES120 review | model review | best-digital | P2 |
| 8 | Yamaha vs Roland vs Kawai vs Casio: which brand? | brand comparison | all reviews | P2 |
| 9 | Best piano bench / best sustain pedal / best headphones for digital piano (3 posts) | accessory lists (Amazon) | best-beginner | P2 |
| 10 | Best digital piano for small spaces and apartments | audience list | best-digital, climate-control (bridge from care) | P3 |
| 11 | Digital piano buying checklist (what specs mean: polyphony, action, speakers, MIDI) | attribute explainer | hub | P3 |

### Core 2: Courses and apps (tags `courses`, `apps`, `jazz-piano`)

| # | Title (working) | Template | P |
|---|---|---|---|
| 12 | Playground Sessions review | course review (ranked on the hub; prices already gathered) | P1 |
| 13 | Piano Marvel review | course review (ranked on the hub) | P1 |
| 14 | Piano by Pictures review | course review (/pbp affiliate) | P1 |
| 15 | Simply Piano vs Flowkey | vs | P1 |
| 16 | Pianoforall vs Simply Piano | vs (the course to favour honestly; matches the quiz) | P1 |
| 17 | Simply Piano alternatives | alternatives | P2 |
| 18 | Skoove vs Simply Piano | vs | P2 |
| 19 | Pianote vs Playground Sessions | vs | P2 |
| 20 | Best online piano lessons for adults | audience list (adults are the core audience) | P2 |
| 21 | Best online piano lessons for kids | audience list (parents) | P2 |
| 22 | Best jazz piano courses online | jazz sub-hub | P2 |
| 23 | Best piano apps for iPad | device list | P3 |
| 24 | Are online piano lessons worth it? (vs a private teacher, with costs) | decision explainer | P3 |

### Outer 3: Learn to play (tags `lessons`, `books`)

| # | Title (working) | P |
|---|---|---|
| 25 | How long does it take to learn piano? (by goal, with a realistic timeline) | P1 |
| 26 | How to read sheet music for piano | P1 |
| 27 | Piano chords for beginners (with the theme's chord-taste component) | P1 |
| 28 | Learning piano as an adult: what's different (and why it's not too late) | P1 |
| 29 | Piano scales for beginners | P2 |
| 30 | How to play piano with both hands (hand independence) | P2 |
| 31 | Easy piano songs for beginners | P2 |
| 32 | Piano finger numbers and hand position | P3 |
| 33 | How much should you practice piano each day? | P3 |
| 34 | Best piano books for kids | P3 (books) |

### Outer 4: Care (tag `care`)

| # | Title (working) | P |
|---|---|---|
| 35 | How much does piano tuning cost? (the audit found the results full of low-quality pages) | P1 |
| 36 | How to move a piano (and when to hire movers) | P2 |
| 37 | How to clean a digital piano and its keys (care bridge into Core 1) | P2 |
| 38 | Buying a used piano: inspection checklist | P2 (bridges to acoustic-vs-digital) |

### Outer 5: The instrument (tag `the-piano`)

| # | Title (working) | P |
|---|---|---|
| 39 | Types of pianos: grand, upright, digital, hybrid and keyboard (hub) | P1 |
| 40 | Parts of a piano (labelled diagram) | P2 |
| 41 | Piano pedals explained: what each one does | P2 |
| 42 | How many keys does a piano have? (88, and why) | P2 (links to post 4) |
| 43 | Upright vs grand piano | P3 |
| 44 | History of the piano (short, accurate, with sources) | P3 |

### Outer 6: Pianists (only with a bridge)

| # | Title (working) | Bridge | P |
|---|---|---|---|
| 45 | Famous jazz pianists and what to learn from each | jazz courses | P3 |
| 46 | Famous pianists who started late | adult learners, course hub | P3 |

**Totals: 46 new posts (16 P1, 19 P2, 11 P3).** With the existing 38, that's about 84 posts. This is a realistic size for authority in a niche this size, and every post has a clear place in the structure.

---

## 6. Rules for each page

1. **One macro context per page.** URL, title, H1 and first sentence all name the same thing.
2. **Answer first.** The first sentence under the H1, and under each H2, gives the direct answer. Explanation and nuance come after.
3. **Headings follow the order of the reader's questions.** Definition → who it's for → how it works → price → pros and cons → alternatives → verdict. Use the question form when it reads naturally ("How much does Skoove cost?").
4. **Same attributes, same order** across every page of a type (reviews, model reviews, care how-tos). Engines learn the pattern, and readers can compare.
5. **Information gain.** Every page needs something only you have: your own test notes, photos, a recorded comparison, a real timeline from a student. This matters most against big competitors.
6. **Internal links come from the body text**, from the sentence where the topic comes up, using descriptive anchors ("our Roland FP-10 review", not "here"). Use about 3 to 8 contextual links per post:
   - spoke to hub,
   - hub to every spoke,
   - spoke to its 1 or 2 siblings,
   - outer to core through a bridge.
   Don't link core pages out to unrelated outer pages.
7. **Consistent terms**: "digital piano" for 88-key weighted instruments, "keyboard" for the others. Always recommend 88 weighted keys.
8. **Update with real changes only** (prices, versions), then change the "Updated" date. Moving a date without changing content wastes the historical signal.

---

## 7. Missing site-level pieces

| Missing | Why it matters | Action |
|---|---|---|
| **One real, consistent author** | The author is part of the source context. Today the bio, the posts and the About schema contradict each other. | Settle who writes and what their real credentials are. Use one bio everywhere, a proper author page (photo, teaching history, verifiable links) and matching Person schema. |
| **"How we test" page** | Backs up every "tested" claim in titles. | New page: how instruments and courses are tested, for how long, and that companies can't pay for placement. Link it from every review's trust strip. |
| **Affiliate disclosure page** | Trust, and FTC compliance. | New /affiliate-disclosure/ page. Link it from the footer and the #affiliate notice. |
| **"Start here" path page** | Lays out the central search intent as a path. | New page: choose a piano → choose a course → first 30 days → practice. Link it in the main menu. |
| **Navigation by cluster** | The menu should show the map. | Header menu: Digital Pianos · Lessons & Apps · Learn Piano · Piano Care · Start here. Footer: the 5 tag pages plus About, How we test and Disclosure. |
| **Homepage as root** | The root page should show the whole map. | One section per cluster, each with its hub plus 3 to 4 spokes. The theme already supports sections. |
| **Tag pages as hubs** | Thin tag pages waste crawl. | A description that links the hub post. Optionally, show the tag description above the list (theme). |
| **Glossary** (P3) | Defines terms consistently (action, polyphony, hammer action, voicing) and gives easy internal links. | One /piano-glossary/ page, linked wherever a term first appears. |

---

## 8. Order of work

Topical authority comes from coverage plus history. So finish clusters one at a time, publish at a steady pace, and link each post into the network the day it goes live.

1. **Weeks 1–2: fix the base (no new posts yet).**
   - Tag changes (section 4) and author consistency.
   - The Stephen Ridley rewrite.
   - The Cole Lam decision (check GSC first).
   - The internal-link matrix from the audit (`clusters-internal-links.md`, section 3).
   - The How-we-test and Disclosure pages, and the menu.
2. **Weeks 3–8: Core 2 P1** (posts 12–16), then **Core 1 P1** (1–4). These earn money and fill gaps the hubs already point at.
3. **Weeks 9–12: Outer P1**:
   - learning: 25–28,
   - care: 35, plus the care hub expansion,
   - the instrument: 39 and the new tag.
4. **Months 4–6: P2**, cluster by cluster. Finish one cluster before starting the next.
5. **Months 6+: P3**, and refresh the reviews whenever a price or app changes.

A steady pace of 2 to 3 posts a week, kept up, is worth more than 15 posts in one week and then silence.

---

## 9. How to tell it's working

In GSC, filter Performance by page groups (each hub and its spokes):

- impressions and queries per cluster growing month over month,
- the hub ranking for its head term, and spokes ranking for long-tail terms without swapping places (if two of your URLs alternate for one query, that's cannibalization: merge or differentiate),
- new posts getting impressions within 2 to 4 weeks (a sign the cluster is trusted).

There's no guarantee of rankings. The plan improves coverage, consistency and trust signals, and its effect shows over months, not weeks.
