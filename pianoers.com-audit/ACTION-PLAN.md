# Action Plan: pianoers.com

## Phase 1: Critical Fixes (Week 1)
- [ ] Resolve `/pianoforall-vs-alfreds-piano-book/` vs `/pianoforall-review/`: duplicate title, duplicate meta description, and a canonical tag pointing away from a URL that's still in the sitemap. Either remove the page from `sitemap-posts.xml`, or rewrite it as genuinely distinct comparison content and self-canonicalize it.
- [ ] Add meta descriptions to the 6 pages missing one: `/cookie-policy/`, `/contact/`, `/privacy-policy/`, `/acoustic-vs-digital-piano/`, `/how-to-tune-a-piano-a-simple-guide/`, `/ahmad-jamal-biography/`

## Phase 2: High-Impact Improvements (Weeks 2-3)
- [ ] Trim the 13 titles over 60 characters (list below)
- [ ] Trim the 14 meta descriptions over 160 characters
- [ ] Add missing security headers at the Caddy edge: `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`, `Permissions-Policy`
- [ ] Add `defer` to non-critical render-blocking scripts: `comment-counts.min.js`, `ghost-stats.min.js`, `sodo-search.min.js`
- [ ] Add alt text to the 26 images missing it — start with `/ridley-academy-review/`, `/open-studio-jazz-review/`, `/piano-dehumidifier-101-why-it-is-important/`

## Phase 3: Content & Authority (Month 2)
- [ ] Run all 6 Review-schema pages through Google's Rich Results Test
- [ ] Convert remaining JPEG/PNG images to WebP/AVIF
- [ ] Manually verify HTTP→HTTPS redirect and `www.pianoers.com` behavior (not testable from this sandbox — see report method note)

## Phase 4: Monitoring & Iteration (Ongoing)
- [ ] Set up PageSpeed Insights / CrUX API access for real Core Web Vitals field data (this audit's Performance score is a heuristic estimate, not measured LCP/INP/CLS)
- [ ] Re-run this audit after Phase 1-2 to confirm fixes and re-score

---

### Titles over 60 characters (Phase 2 detail, longest first)
- `/how-to-clean-and-maintain-your-piano/` — 86 chars — "How to Clean and Maintain Your Piano: A Concert Pianist's Guide to a Lifetime of Sound"
- `/best-free-piano-learning-apps/` — 80 chars — "Best Free & Paid Piano Learning Apps in 2026 (Tested & Ranked for Real Learning)"
- `/piano-dehumidifier-101-why-it-is-important/` — 78 chars — "Piano Dehumidifier: Why Your Piano Needs One (And How to Choose the Right One)"
- `/are-piano-keys-still-made-of-ivory/` — 77 chars — "Are Piano Keys Still Made of Ivory? History, Ban & Modern Alternatives (2025)"
- `/synthesia-piano-review/` — 71 chars — "Synthesia Piano Review (2026): Fun Piano Game or Fast Track to Nowhere?"
- `/yamaha-p-145-review/` — 69 chars — "Yamaha P-145 / P-145BT Review in 2026: Still My #1 Pick for Beginners"
- `/climate-control-and-your-piano/` — 69 chars — "Climate Control and Your Piano: A Guide to Protecting Your Instrument"
- `/acoustic-vs-digital-piano/` — 66 chars — "Acoustic vs Digital Piano: Which Is Actually Better for Beginners?"
- `/piano-career-academy-review/` — 65 chars — "Piano Career Academy Review: A Pianist's Honest Assessment (2025)"
- `/flowkey-review/` — 64 chars — "Flowkey Review: Is It Really the Best App to Learn Piano Online?"
- `/loog-piano/` — 63 chars — "Loog Piano Review 2026: Is This the Ultimate Beginner Keyboard?"
- `/piano-with-jonny-review/` — 62 chars — "Piano With Jonny Review: Honest Pros, Cons & Best Alternatives"
- `/piano-humidifier/` — 61 chars — "Piano Humidifiers & Humidity Control Systems Guide | Pianoers"

### Priority definitions
- **Critical**: Blocks indexing or causes penalties — fix immediately
- **High**: Significantly impacts rankings — fix within 1 week
- **Medium**: Optimization opportunity — fix within 1 month
- **Low**: Nice to have — backlog
