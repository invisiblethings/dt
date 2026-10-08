# Pianoforall: Website Rebuild Strategy & Findings

Research date: 8 October 2026. Every fact used on the new site traces back to one of the sources in "Sources" at the bottom, or is flagged in "Facts that need confirming".

---

## 1. What exists today

You currently run three sites that compete with each other for the same brand.

| Property | Platform | What it is | SEO state |
|---|---|---|---|
| **pianoforall.com** | WordPress + Yoast | The 20-year-old brand site. Home, Order, FAQs, Contact, Reviews, ~40 blog posts, legal. | Indexable, canonical tags, XML sitemap. The strongest asset by far. |
| **academy.pianoforall.com** | Thinkific | Course player (logins, enrolments, lessons) **plus** sales pages for Pianoforall, three Classics By Ear courses, two bundles, free Test Drive, gift page. | Indexable sales pages that duplicate pianoforall.com's message. Test Drive is `noindex`. |
| **pianoforall.academy** | Netlify, React SPA (Vite) | One long landing page. | Ships an empty `<div id="root">`. No meta description, no robots.txt, no sitemap, no structured data, no canonical. `/robots.txt` and `/sitemap.xml` return the SPA's 404 page. Google sees almost nothing. |

### Inventory: pianoforall.com (from its XML sitemaps)
- **Pages (17):** `/`, `/order`, `/pianoforall-faqs`, `/contact`, `/testimonials`, `/reviews/pianoforall`, `/reviews/classics-by-ear`, `/reviews/moonlight-sonata`, `/reviews/bach-preludes`, `/reviews/erik-satie`, `/am-i-too-old-to-learn-piano`, `/affiliate-program`, `/terms-of-use`, `/privacy-policy`, `/log-in`, `/thanks-for-joining`, `/exclusive-offer-classics-by-ear`
- **Posts (39)** at root-level slugs, e.g. `/learn-moonlight-sonata`, `/acoustic-piano-vs-digital-keyboard`, `/beginner-keyboard-setup`, `/if-you-play-guitar-you-can-play-piano`, `/how-to-improve-at-piano`, `/why-most-piano-courses-expect-too-much-from-beginners`
- **Archives:** 7 category pages, 12 tag pages, 2 author pages
- **Unlisted but live, all `noindex`:** `/learn-piano-online`, `/learn-piano-how-pianoforall-works`, `/choosing-a-keyboard-or-digital-piano`, `/pianoforall-vs-the-top-10-piano-learning-apps`, `/about-robin-pianoforall`, `/frequently-asked-questions`, `/reviews`, `/home-page` (a newer homepage draft)

### Inventory: academy.pianoforall.com (from its sitemap)
`/`, `/collections`, `/courses/pianoforall-learn-piano-by-ear-rhythm-style`, `/courses/erik-satie-gnossiennes-learn-piano-by-ear`, `/courses/bach-preludes-bwv-846-847-learn-piano-by-ear`, `/courses/moonlight-sonata-1st-movement-learn-piano-by-ear`, `/bundles/classics-by-ear-piano-bundle`, `/bundles/pianoforall-4-course-bundle`, `/pages/all-courses`, `/pages/7-days-free-trial`, `/pages/more-courses`, `/pages/gift-a-course`, plus thank-you pages. Checkout is ClickBank (vendor `piano4all`).

---

## 2. Verified facts (the site is built only on these)

**Pianoforall (main course)**
- Created by **Robin Hall** in **2006**. Robin says he has taught piano for **30+ years** and grew up in his father's piano shop.
- **568 step-by-step lessons**, **25 hours of video** (Thinkific page says "25+"), audio lessons, interactive ebooks and printable PDFs, online course player plus offline ebooks.
- Nine books: Party Time (Rhythm Style), Blues & Rock 'n' Roll, Chord Magic, Advanced Chords, Ballad Style, Jazz, Advanced Blues, Taming the Classics, Speed Learning.
- **$49 one-time** (shown against $79). No subscription. Lifetime access and free updates.
- **60-day money-back guarantee**, handled through **ClickBank** (email Robin or request it directly from ClickBank). ClickBank order support: 1-800-390-6035.
- Ebooks open in the Books app on Mac/iOS and the free Kotobee Reader on Windows/Android. Largest book file ~400 MB. Works offline once downloaded. Printable.
- Practice guidance: 20–30 minutes a day (FAQ); "fifteen or twenty minutes regularly" (adult-learner page).
- Not designed for pre-teen children unless a parent works through it with them (official FAQ).
- Keyboard requirements: 61 keys minimum (76/88 better), touch-sensitive keys, sustain-pedal input; weighted keys preferred.
- Support: robin@pianoforall.com, in-lesson questions in the course player, and **The Piano Lounge** student community.
- **Free Test Drive**: free lessons (a Broken Chord Ballad), the *Mindful Notes* ebook, Piano Lounge access. No card.
- Gifting: buy with your own details, then email the recipient's name and address.

**Classics By Ear** (each $49 one-time; 3-course bundle $79; 4-course bundle with Pianoforall $99)
- Moonlight Sonata, 1st movement: 38 lessons, 4 hours of video
- Erik Satie, Three Gnossiennes: 45 lessons, 4.5 hours of video
- Bach, two preludes (C major and C minor): 48 lessons, 5 hours of video
- Chopin Collections 1–3 announced as "coming soon"

**Robin Hall**: also a cartoonist, painter and therapist. Author of *The Cartoonist's Workbook*, which carries a back-cover quote from Charles Schulz. Robin includes mindfulness ideas in the courses.

**Third-party proof (independently checkable)**: Udemy lists the Pianoforall course at **4.7/5 from roughly 53,000 ratings, with about 421,000 students** (2026 snapshots). Classics By Ear: Bach Preludes 4.9 (577 ratings), Moonlight Sonata 4.9 (917 ratings).

---

## 3. Facts that need confirming before launch

| Claim | Where | Problem | What the new site does |
|---|---|---|---|
| "500,000+ students" | pianoforall.com | Plausible (Udemy alone shows ~421k) but not sourced | Uses "more than 500,000 students" only with "since 2006, across Udemy and our own site" wording. **Confirm the total.** |
| "30,000+" vs "35,000+ five-star reviews" | Home vs newer pages | Two different numbers; no source | Not used. Uses the checkable Udemy rating instead. |
| "18 years of experience" | pianoforall.academy | Contradicts Robin's own "30+ years" | Dropped. Uses "30+ years". |
| "Students from 12 to 90+" | pianoforall.academy | Not on any official page; contradicts the FAQ on children | Dropped. |
| "9 interactive books" vs "10 ebooks" | Various | Image alt text and one testimonial say 10; product shows nine | Lists the nine named books. **Confirm whether a tenth (bonus) book exists.** |
| Bach BWV numbers | URL says 846/847, gift page says 846/999 | Contradictory | Says "Prelude in C major and Prelude in C minor" with no catalogue numbers until confirmed. |
| "Over 9,000 students … Erik Satie" | Moonlight Sonata page | Copy-paste error | Not used. |
| Yamaha endorsement | One old testimonial | Unverifiable | Not used. |
| Strike-through "$79" | All sites | A permanent "sale" reference price is a consumer-protection risk (FTC Guides Against Deceptive Pricing; UK DMCC Act 2024) | Shows **$49, one-time**. No fake "was" price, no countdowns. |

### Ownership and checkout links: please read

The Buy buttons on **pianoforall.academy** point to `drilonnn_piano4all.pay.clickbank.net/?cbitems=60`. That URL carries an affiliate nickname in front of the vendor ID, and uses a different item number from the official checkout (`piano4all.pay.clickbank.net/?cbitems=71&template=PFA`). If you own the vendor account, that link pays a commission to the `drilonnn` account on every sale. If you are an affiliate rather than the vendor, the brand domains and the "I" voice of Robin Hall aren't yours to use, and the site would need an affiliate disclosure.

The new site keeps every checkout URL in one file (`src/data/site.ts`) and defaults to the **official vendor links**. Confirm which account should get paid before launch.

---

## 4. Keep / remove / rewrite / add

**Keep**
- Robin's own voice and teaching philosophy ("Play first, ask questions later"). It is the brand's best differentiator, and the newer pages already sound like a person.
- The named, located, specific testimonials (Bob Bowen, Ed Hoare, Daniel Ravagli, Derek aged 74…). Detailed stories beat star counts.
- One-time price, 60-day guarantee, free Test Drive, offline access, The Piano Lounge.
- The honest comparison stance ("for a young child, I'd look at Hoffman Academy first"). Few competitors say this, and it earns trust.
- The ~40 blog post URLs, unchanged.

**Remove**
- Duplicate home-page blocks (the current pianoforall.com home repeats the books, features and testimonials twice).
- "Life and soul of the party", "faster than any other method", "the most effective course online": superlatives nobody can verify.
- Permanent sale framing ($79 → $49, "Limited Time Offer", "Save 38/39%").
- Tag archives (12 thin pages) and author archives: `noindex` or redirect.
- Old dev hostname leaks (`pianoforall8634.live-website.com` in og:image, contact email, links).

**Rewrite**
- Homepage: lead with what you'll be able to do, who it's for, and proof. One clear primary action (Try free), one secondary (See the course).
- Course page: answer "what exactly do I get" with the real numbers (568 lessons, 25 hours, nine books) and a book-by-book curriculum.
- FAQ: merge the three FAQ versions into one, grouped by objection.
- Titles and meta descriptions: the current ones are generic ("Order - Pianoforall") or slogan-heavy ("Unlock your piano playing potential…").

**Add (missing today)**
- A real **How it works** page (indexable). The draft exists but is `noindex`.
- An indexable **comparison** page (draft exists, `noindex`).
- An indexable **keyboard buying guide** (draft exists, `noindex`).
- A **/learn** hub of cornerstone guides that answer the questions beginners type into Google and AI assistants.
- **Tools** that let a visitor feel the method before paying: an interactive chord explorer that plays sound, and a 60-second "Where should I start?" quiz.
- Structured data: Organization, WebSite, Person (Robin), Course ×4 with offers, FAQPage, BreadcrumbList, Article.
- A single, crawlable, server-rendered site. Every page ships full HTML.

---

## 5. Recommended primary domain: **pianoforall.com**

You asked for the new site to become the canonical hub, and the instinct is right. The domain choice is where I'd push back. **Build the new site on pianoforall.com, not pianoforall.academy.**

- pianoforall.com has 20 years of links, brand searches, Udemy/YouTube profile links and review-site citations. pianoforall.academy has close to nothing indexed.
- Search engines and AI assistants already associate the entity "Pianoforall" with pianoforall.com.
- Moving to a new domain means a site move: weeks to months of ranking volatility, for no gain.
- People type "pianoforall.com". The `.academy` TLD reads as a sub-brand.

So the plan is: **the new site *replaces* the WordPress site on pianoforall.com**; pianoforall.academy 301s into it; academy.pianoforall.com stays as the **course player** with its marketing pages redirected. Full URL map in `docs/05-migration-and-redirects.md`.

If you still want `.academy` as primary, change `SITE_URL` in `src/data/site.ts`, swap the redirect direction, and run a Change of Address in Search Console. The code handles either.

---

## 6. Recommended architecture

```
/                               Home
/course                         The Pianoforall course (product page)
/how-it-works                   The method
/classics-by-ear                Classical series hub
  /classics-by-ear/moonlight-sonata
  /classics-by-ear/erik-satie-gnossiennes
  /classics-by-ear/bach-preludes
/pricing                        All courses, bundles, guarantee, gifting
/free-lessons                   Free Test Drive (lead magnet)
/reviews                        Student reviews + third-party ratings
/about                          Robin Hall
/faq                            One FAQ, grouped by objection
/compare                        Pianoforall vs piano apps (honest)
/learn                          Guides hub
  /learn/learn-piano-online
  /learn/how-long-does-it-take-to-learn-piano
  /learn/play-piano-by-ear
  /learn/piano-chords-for-beginners    (with interactive chord explorer)
  /learn/piano-practice-routine
  /learn/choosing-a-keyboard
/am-i-too-old-to-learn-piano    Adult-learner guide (existing URL kept)
/start                          "Where should I start?" quiz
/blog                           Existing posts, same URLs at root
/contact
/privacy-policy  /terms-of-use  /refund-policy  /affiliate-program
```

Why this shape:
- **Three layers**: money pages (course, pricing, classics), trust pages (how it works, reviews, about, FAQ, compare), and the learning layer (guides, tools, blog) that pulls in search traffic and passes visitors up.
- Every money page is ≤1 click from the home page; every guide is ≤2.
- URLs stay short, have no dates and no trailing slash, matching today's WordPress format so old links don't pick up a redirect hop.

---

## 7. SEO strategy (summary)

1. **Own the brand SERP.** "pianoforall", "piano for all", "pianoforall review", "pianoforall price", "is pianoforall worth it", "robin hall piano". Today these queries split across three domains and third-party affiliate reviews. One canonical site plus `/reviews`, `/pricing`, `/compare` and complete Organization/Course/Person markup.
2. **Win the method queries the course answers best**: play piano by ear, piano chords for beginners, learn piano without reading music, chord piano for adults. These match the product.
3. **Capture adult-learner intent**: am I too old to learn piano, learn piano as an adult, how long does it take to learn piano. High purchase intent, sympathetic audience, weaker competition than "learn piano".
4. **Compete selectively for head terms** (learn piano online, online piano lessons, best online piano course) through the home page, the course page and `/compare`. Apps with huge budgets dominate these SERPs; don't build thin pages chasing them.
5. **Answer-first formatting** for snippets and AI answers: each guide opens with a 40–60 word direct answer, then detail; question-shaped H2s; tables where readers compare.
6. **Entity clarity**: consistent name, founder, founding year, `sameAs` links (Udemy, YouTube), and identical facts on every page so AI systems quote them correctly.

Keyword map: `docs/02-keyword-and-content-map.md`.

---

## 8. Conversion strategy (summary)

- **Primary action everywhere: "Try it free"** (no card). Today's sites push a $49 purchase at cold visitors. The free Test Drive already exists and is the lower-risk first step, especially for adults who've quit piano before.
- **Secondary action: buy**, shown with the guarantee and "one payment" right next to the button.
- **Objections handled in place**: each money page answers "complete beginner?", "can't read music?", "too old?", "what do I need?", "vs YouTube/apps?", "what if it's not for me?" before the final CTA.
- **Proof that can be checked**: Udemy rating with a link, named testimonials with places, Robin's real background.
- **Self-selection**: the `/start` quiz routes people to Pianoforall, Classics By Ear, or (honestly) to a different product when Pianoforall isn't the fit. Fewer refunds, more trust.
- **No dark patterns**: no fake timers, no fake scarcity, no exit-intent pop-ups.

Full journeys and event plan: `docs/06-conversion-and-analytics.md`.

---

## 9. Sources

- pianoforall.com: `/`, `/order`, `/pianoforall-faqs`, `/contact`, `/about-robin-pianoforall`, `/am-i-too-old-to-learn-piano`, `/reviews/pianoforall`, `/pianoforall-vs-the-top-10-piano-learning-apps`, `/choosing-a-keyboard-or-digital-piano`, sitemaps (fetched 8 Oct 2026)
- academy.pianoforall.com: `/pages/all-courses`, all four `/courses/…` pages, `/courses/pianoforall-academy-test-drive`, `/pages/gift-a-course`, `/bundles/…`, `robots.txt`, `sitemap.xml`
- pianoforall.academy: HTML shell and JS bundle `assets/index-CLoygXz1.js`
- Udemy course listing for "Pianoforall – Incredible New Way To Learn Piano & Keyboard" and Classics By Ear listings (via search snapshots; Udemy blocks direct fetches)
- Independent reviews: pianoers.com/pianoforall-review, pianistscompass.com Pianoforall review, toptenreviews.com Pianoforall review
- Competitor/pricing context: pianote.com/lifetime, pianoers.com/pianote-review, musicianwave.com/best-online-piano-lessons
