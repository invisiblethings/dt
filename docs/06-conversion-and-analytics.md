# Conversion strategy & analytics plan

## Funnel

```
Search / AI answer / referral / Udemy / YouTube
        │
        ▼
Landing page  ── guide, home, course, classics, compare, reviews
        │   answers the question, shows the method, removes one objection
        ▼
Free lessons (primary CTA, no card)        Buy now (secondary CTA)
        │                                         │
Thinkific Test Drive ──► Mindful Notes ebook,     ClickBank checkout ($49 / bundles)
email nurture, Piano Lounge                       │
        │                                         ▼
        └────────────► Upgrade to course ──► Thinkific course player
```

Why free-first: the visitor's biggest fear is "I'll fail again". A free lesson that ends with them playing a broken-chord ballad answers that fear far better than copy can. Buyers who already know what they want still get a buy button on every money page, plus a sticky mobile bar on course and pricing pages.

## Visitor types and their paths

| Visitor | Typical entry | What they need to see | Path |
|---|---|---|---|
| Complete beginner, adult | "learn piano online", "piano chords for beginners" | It starts from zero; no reading; 20 minutes a day | Guide → chord explorer → free lessons → course |
| Older beginner (55+) | "am I too old to learn piano" | Robin's reassurance, students aged 59–74, stiff-hands answer | Adult article → reviews (filter "Started later in life") → free lessons |
| Returning player (quit lessons as a kid) | Home, "learn piano as an adult" | This isn't like childhood lessons | Home "who it's for" card → how it works → free lessons |
| Reads music, can't play by ear | "play piano by ear" | Chords, improvising, testimonials from classically trained players | By-ear guide → how it works → course |
| Guitarist / singer | "guitar to piano" | Chords transfer, rhythm style | Guitar post → `/course#for-guitarists` → course |
| Comparing courses | "best online piano course", "pianoforall vs simply piano" | Honest table, who should *not* buy | Compare → start quiz → free lessons / course |
| Already knows Pianoforall | "pianoforall", "pianoforall price" | Price, what's included, guarantee, buy button | Pricing → checkout |
| Recommended by a friend | Direct / brand search | Proof it's legit; Udemy rating | Home → reviews → pricing |
| Classical goal | "how to play moonlight sonata" | A course for that piece, difficulty level | Classics page → buy single or bundle |

## Objection handling map

| Objection | Where it's answered |
|---|---|
| Can I really learn online? | `/learn/learn-piano-online`, FAQ `vs-youtube`, testimonial (Rosalind Smith) |
| Complete beginner? | Home "who it's for", FAQ `beginner`, course "good fit" panel |
| Can't read music | Hero copy, how it works, FAQ `read-music` |
| Too old | `/am-i-too-old-to-learn-piano`, FAQ `age`, reviews filter |
| How long? | Home "where the course takes you", how-long guide |
| What exactly do I get? | Course stats, nine-book curriculum, "two ways to use it" |
| Why not YouTube or an app? | FAQ `vs-youtube`, `vs-apps`, `/compare` |
| Is it for my learning style? | `/start` quiz, course "probably not the best fit" panel |
| Is it worth $49? | One-time vs subscription framing, Udemy rating, 60-day guarantee next to every buy button |
| Is the checkout safe? | ClickBank explanation near buy buttons, "review your order before paying", order-support phone number |

## Deliberately absent
No countdown timers, no permanent "sale" strike-through prices, no exit-intent pop-ups, no fake scarcity, no auto-playing video. Each erodes trust with the older, sceptical audience this course serves, and the reference-price tactic carries regulatory risk (FTC Guides Against Deceptive Pricing; UK DMCC Act 2024).

## Tests worth running after launch (one at a time, ≥2 weeks or ~1,000 visitors per arm)
1. Home hero primary CTA: "Try the free lessons" vs "Play your first chord" (scrolls to the chord explorer).
2. Course page: buy button first vs free lessons first.
3. Pricing: complete bundle in the middle (current) vs Pianoforall alone.
4. Video poster: the trailer vs the sample lesson as the home hero video.

---

## Analytics

### Setup
The site ships a vendor-neutral tracking layer (`src/scripts/site.ts`). Every `data-track` click and every tool interaction calls `window.pfaTrack(event, props)`, which pushes to `window.dataLayer` and forwards to `gtag` or `plausible` if either is loaded. **No analytics script is loaded by default.** Pick one:

- **Plausible or Fathom** (recommended): cookieless, no consent banner needed in most jurisdictions, roughly a 1 KB script. Add the script tag in `src/layouts/Base.astro` `<head>`.
- **GA4 via Google Tag Manager**: richer attribution, needs a consent banner for UK/EU visitors. Add GTM in `<head>`; the dataLayer events are already there.

Whichever you choose, name it in the privacy policy.

### Cross-domain journey
Checkout happens on ClickBank and learning on Thinkific. To see the full funnel:
- Pass a tracking ID into ClickBank pay links (`&tid=…`, ClickBank supports a `tid` parameter) and read sales by `tid` in ClickBank reporting.
- Add the same analytics property to Thinkific (Settings → Code & analytics) to track Test Drive sign-ups and course starts.
- Set ClickBank's thank-you page to a URL that fires a `purchase` event with value.

### Events

| Event | Fires when | Key props | Use |
|---|---|---|---|
| `cta_click` | Any "Try free", "See course" button | `location` | Which placements work |
| `trial_start_click` | Click to the Thinkific Test Drive | `location` | **Primary micro-conversion** |
| `begin_checkout` | Click any ClickBank buy link | `product`, `location` | **Primary macro-conversion proxy** |
| `purchase` | ClickBank thank-you page (to configure) | `product`, `value` | Revenue |
| `pricing_view_click` | Click to /pricing | `location` | Intent signal |
| `video_play` | Click to load any Vimeo video | `video` | Content engagement |
| `tool_use` / `tool_complete` | Chord explorer, practice timer, calculator | `tool`, `chord` | Value of interactive content |
| `quiz_start` / `quiz_complete` / `quiz_result_click` | `/start` | `result`, `answers` | Audience mix, routing |
| `review_filter` | Reviews page filter | `filter` | Which segments look for proof |
| `faq_open` | FAQ item opened | `question` | Objections that matter most |
| `scroll_depth` | 25/50/75/100% | `percent` | Long-page engagement |
| `outbound_click` | Udemy rating link etc. | `link_url` | Trust-check behaviour |
| `contact_click`, `sign_in_click` | Email / sign in | | Support load, returning students |
| `page_not_found` | 404 page | `path`, `referrer` | Post-migration redirect gaps |

### KPIs

| Area | KPI | Source | Review |
|---|---|---|---|
| Visibility | Clicks, impressions, average position for brand and non-brand queries (separate them) | Search Console | Weekly in first 8 weeks, then monthly |
| | CTR by page against position | Search Console | Monthly; rewrite titles on low-CTR pages |
| | Indexed pages vs sitemap | Search Console | Monthly |
| | Mentions/citations in AI answers for 20 tracked prompts (e.g. "best online piano course for adults") | Manual or a monitoring tool | Monthly |
| Engagement | Engaged sessions by landing page; scroll depth on guides; tool use rate | Analytics | Monthly |
| Conversion | Visitor → `trial_start_click` rate (target to beat: baseline month 1) | Analytics | Weekly |
| | Visitor → `begin_checkout` rate; checkout → purchase rate | Analytics + ClickBank | Weekly |
| | Trial → paid upgrade rate | Thinkific + ClickBank | Monthly |
| | Assisted conversions from `/learn` and blog (first touch) | GA4 attribution | Quarterly |
| Quality | Refund rate | ClickBank | Monthly |
| | Core Web Vitals (LCP < 2.5 s, INP < 200 ms, CLS < 0.1) on mobile | GSC CWV report / CrUX | Monthly |
| Segments | Mobile vs desktop conversion; landing page × device | Analytics | Monthly |
