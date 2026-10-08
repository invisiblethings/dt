# Keyword & content map

**About the volumes.** I had no access to a keyword tool (Search Console, Keyword Planner, Ahrefs or Semrush) for this project, so this map uses relative demand tiers based on SERP observation, autocomplete patterns and competitor targeting, not invented numbers. Before launch, export 16 months of Search Console queries for pianoforall.com and check each tier. That export also shows which existing URLs already rank, and those must keep their URLs (they do: see `05-migration-and-redirects.md`).

Tiers: **H** = high-volume head term, heavily contested · **M** = solid mid-volume · **L** = long-tail, low volume, high intent.

Each search need maps to **one** canonical page. If two pages could target the same query, one is primary and the other links to it.

## 1. Brand & navigational (own these first)

| Query cluster | Tier | Intent | Page | Notes |
|---|---|---|---|---|
| pianoforall, piano for all, pianoforall.com | M | Navigational | `/` | Organization + WebSite schema, consistent entity facts |
| pianoforall review(s), is pianoforall good, is pianoforall worth it | M | Commercial investigation | `/reviews` | Named testimonials, Udemy rating with link, honest "what students find hard" section. Affiliate review sites currently own much of this SERP. |
| pianoforall price, pianoforall cost, pianoforall discount, pianoforall coupon | L–M | Transactional | `/pricing` | No fake coupons. A clear "$49, no subscription" answer beats coupon sites. |
| pianoforall login, pianoforall sign in | L | Navigational | Header link → Thinkific sign-in; `/log-in` redirects | |
| pianoforall free, pianoforall free download | L | Transactional / risk of piracy intent | `/free-lessons` | Captures the legitimate version of this query |
| robin hall piano | L | Navigational / entity | `/about` | Person schema |
| pianoforall vs simply piano / flowkey / pianote / piano in 21 days | L | Commercial investigation | `/compare` | One page with H2 per competitor. Don't split into thin vs-pages until Search Console shows demand per pair. |
| pianoforall classics by ear, robin hall moonlight sonata | L | Navigational | `/classics-by-ear` | |

## 2. Commercial: online course & lessons

| Query cluster | Tier | Intent | Page | Angle |
|---|---|---|---|---|
| learn piano online, online piano lessons, online piano course | H | Commercial / informational mix | `/` (primary), `/learn/learn-piano-online` (informational support) | Home targets the commercial version; the guide answers "how". Apps dominate. Win on adult-specific and method angles rather than the bare head term. |
| best online piano course for adults, best way to learn piano as an adult | M | Commercial investigation | `/compare` + `/learn/learn-piano-online` | Honest comparison earns links and AI citations |
| piano lessons for adults, adult beginner piano course | M | Commercial | `/course` | "for adults" appears in title, H1 copy and FAQ |
| piano course one time payment, piano course no subscription, piano lessons lifetime access | L | Transactional | `/pricing` | A real differentiator vs app subscriptions |
| chord based piano course, learn piano chords course | L | Commercial | `/course`, `/how-it-works` | |
| learn piano by ear course | L | Commercial | `/how-it-works` | |
| free piano lessons for beginners, free online piano lessons | H | Transactional (free) | `/free-lessons` | |
| piano lessons gift | L | Transactional | `/gift` | Seasonal (Nov–Dec), see roadmap |

## 3. Commercial: classical pieces (Classics By Ear)

| Query cluster | Tier | Page | Notes |
|---|---|---|---|
| how to play moonlight sonata, learn moonlight sonata piano, moonlight sonata 1st movement tutorial | M | `/classics-by-ear/moonlight-sonata` | Blog post `/learn-moonlight-sonata` covers history/story intent and links to the course page. Watch for cannibalisation in GSC; if the post outranks the course page for "learn…", retitle the post towards "history of". |
| gnossienne no 1 piano tutorial, how to play gnossienne, satie gnossienne easy | L–M | `/classics-by-ear/erik-satie-gnossiennes` | Blog `/erik-satie-piano-music` supports |
| bach prelude in c major tutorial, how to play bach prelude c major | M | `/classics-by-ear/bach-preludes` | Confirm BWV numbers, then add "BWV 846" to title (catalogue numbers are searched) |
| learn classical piano by ear, classical piano for adult beginners | L | `/classics-by-ear` | |

## 4. Informational: beginner questions (the learning layer)

| Query cluster | Tier | Page | Snippet target |
|---|---|---|---|
| am i too old to learn piano, learn piano at 50 / 60 / 70, learning piano as an adult | M | `/am-i-too-old-to-learn-piano` (existing URL) | Answer box: "No…" |
| how long does it take to learn piano, how long to learn piano as an adult, can I learn piano in 3 months | M | `/learn/how-long-does-it-take-to-learn-piano` | Milestone table |
| piano chords for beginners, easy piano chords, basic piano chords, how to play piano chords | H | `/learn/piano-chords-for-beginners` | Chord table, interactive explorer |
| how to play piano by ear, play piano by ear for beginners, can you learn to play by ear | M | `/learn/play-piano-by-ear` | Numbered 5-step list |
| piano practice routine, how long should I practise piano, what to practise on piano | M | `/learn/piano-practice-routine` | 20-minute plan list |
| best keyboard for beginners, digital piano for beginners, 61 vs 88 keys, weighted keys | H | `/learn/choosing-a-keyboard` | Comparison table. Supporting: `/beginner-keyboard-setup`, `/acoustic-piano-vs-digital-keyboard` |
| can you teach yourself piano, can you learn piano online, is learning piano online effective | M | `/learn/learn-piano-online` | |
| learn piano without reading music, do I need to read music to play piano | M | `/how-it-works` + FAQ `read-music` | Candidate for its own guide (roadmap P1) |
| guitar to piano, piano for guitar players | L | `/if-you-play-guitar-you-can-play-piano` (existing post) | Linked from `/course#for-guitarists` |
| how to sing and play piano at the same time | L | `/singer-pianists`, `/sing-better-at-the-piano` (existing posts) | |

## 5. Not targeted, on purpose

- **"piano" / "piano lessons near me"**: local intent this site can't satisfy.
- **"free piano sheet music", "virtual piano"**: high volume, wrong intent, served by tools Pianoforall doesn't make.
- **Programmatic song pages** ("how to play [song] on piano" × 1,000): copyright exposure, thin content, and Google's scaled-content policies. Not worth it.
- **Separate city/country pages**: no local service.

## 6. Internal-linking rules

1. **Money pages** (`/course`, `/pricing`, `/classics-by-ear/*`, `/free-lessons`) are linked from the global header/footer and from every guide's end-of-article CTA box.
2. **Guides link sideways** to 2–3 related guides (the "Related" sidebar) and **up** to one money page, with descriptive anchors ("How Pianoforall teaches by ear", not "click here").
3. **Blog posts** inherit links by category (`src/data/blog-map.ts`): practice posts → practice guide; classical posts → Classics By Ear; gear posts → keyboard guide.
4. **Money pages link down** to the guide that handles the objection: course → guitarists post, compare; home → chords, adults, how long.
5. **Anchors vary.** The same target gets 3–5 natural variants across the site. No exact-match anchor appears more than a few times.

## 7. Topic clusters

```
Learning piano as an adult (pillar: /learn/learn-piano-online)
 ├─ /am-i-too-old-to-learn-piano
 ├─ /learn/how-long-does-it-take-to-learn-piano
 ├─ /learn/piano-practice-routine ── practice & psychology blog posts
 ├─ /learn/choosing-a-keyboard ── /beginner-keyboard-setup, /acoustic-piano-vs-digital-keyboard
 └─ /compare
        ↓
 /course  ←→  /how-it-works  ←→  /free-lessons

Chord-first method (pillar: /how-it-works)
 ├─ /learn/piano-chords-for-beginners
 ├─ /learn/play-piano-by-ear
 └─ /if-you-play-guitar-you-can-play-piano, /singer-pianists
        ↓
 /course

Classical by ear (pillar: /classics-by-ear)
 ├─ /classics-by-ear/{moonlight-sonata, erik-satie-gnossiennes, bach-preludes}
 └─ /learn-moonlight-sonata, /erik-satie-piano-music, classical blog posts
```
