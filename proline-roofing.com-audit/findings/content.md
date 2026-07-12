# Content Quality Audit — proline-roofing.com
Category: Content Quality (E-E-A-T, depth, duplication, AI-citation readiness)
Date: 2026-07-12

## Category Score: 54 / 100

Rationale: Copy is generally fluent, mostly free of literal keyword-stuffing, and several blog posts and location pages contain genuinely useful, specific detail (cost ranges, timelines, material comparisons). However, the site is undermined by (1) at least three separate URLs competing for the same "Brooklyn roofing" intent and two competing for "Old Bridge, NJ roofing" with heavily overlapping template copy, (2) templated trust-badge/testimonial blocks copy-pasted verbatim across dozens of pages with no page-specific evidence, (3) no visible author bios, credentials, or license numbers anywhere on the site (author identity only exists in invisible schema markup), and (4) a NAP/phone-number inconsistency on at least one live page. These are exactly the doorway-page and thin-E-E-A-T patterns the Sept 2025 QRG update flags.

## E-E-A-T Breakdown

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 50 | Real, named testimonials with specific stories (e.g., "Sarah T.," "Dr. Louis Vastola," "Chris W.") appear on nearly every page — good first-hand signal. But the same 3 testimonials are reused verbatim across home, services, and multiple location pages rather than page-specific proof; no photos of actual completed jobs found in extracted content; "Projects" section shows an unresolved animated counter ("Roofing Projects 0 +") on the homepage. |
| Expertise | 25% | 40 | Blog posts carry `BlogPosting` schema with an `author` object ("Lonnie from ProLine Roofing"), but this byline is **not rendered anywhere in the visible page** (confirmed via text-extraction of `/5-benefits-of-roof-inspections-maintenance/`) — no bio, no years of experience, no certifications (e.g., GAF Master Elite, CertainTeed SELECT ShingleMaster, NRCA) are stated anywhere, only brand names the company "trusts" (GAF, Owens Corning, CertainTeed, Atlas) listed as if they were credentials on `/services/residential-roofing/asphalt-shingle-roofing/`. |
| Authoritativeness | 25% | 45 | `Organization`/`RoofingContractor` schema links out to Facebook, Twitter/X, LinkedIn, Pinterest, YouTube, and a Google Business profile (`sameAs`), and an aggregate rating of 4.9/97 reviews is embedded via a `Product` schema node (semantically incorrect use of `Product` for a service business — should be `Service`/`LocalBusiness` — this looks spammy to a strict rater). No third-party citations, press mentions, association memberships, or awards were found in any sampled page beyond a generic, unlinked "Accredited Company" badge that never names the accrediting body. |
| Trustworthiness | 30% | 42 | `/contact/` gives phone, physical address (481 Mill Rd, Staten Island, NY 10306), email, and hours — good baseline. But: (a) the FAQ states "we are fully licensed and insured... We can provide you with proof of both our licensure and insurance coverage upon request" — no license number is ever displayed proactively anywhere on the site, which is a real trust gap for a licensed-trade business; (b) `/locations/new-jersey/old-bridge/` displays **two different phone numbers on the same page** — "CALL: (848) 310-3977" in the hero and "📞 Call us at (347) 323-9128" further down — a NAP-consistency red flag; (c) generic, unverifiable trust badges ("Accredited Company," "Quality Materials," "Complete Inspection") are pasted identically across virtually every page in the crawl with no specificity. |

Weighted E-E-A-T score: **~44/100**, blended with readability/structure/citation-readiness signals below into the overall 54/100 category score.

## Word Counts vs. Minimums (sampled pages)

Note: counts below are from boilerplate-stripped body text (nav/footer removed) but still include repeated on-page CTA/testimonial widgets, so true *unique* editorial copy is materially lower than shown, especially on the service pages.

| URL | Page type | Extracted words | Minimum | Verdict |
|---|---|---|---|---|
| `/` | Homepage | ~2,200 (incl. duplicated "About Us" block, see Finding 6) | 500 | Meets on paper, but ~40% is repeated boilerplate |
| `/services/` | Service hub | ~230 | 800 | Thin |
| `/services/residential-roofing/` | Service | ~560 | 800 | Thin |
| `/services/commercial-roofing/` | Service | ~560 | 800 | Thin |
| `/services/gutter-services/` | Service | ~520 | 800 | Thin |
| `/services/residential-roofing/asphalt-shingle-roofing/` | Service (child) | ~550 | 800 | Thin |
| `/services/roof-repair/` | Service | ~1,320 | 800 | Meets |
| `/locations/` | Location hub | ~130 (city name list only) | 500–600 | Thin |
| `/locations/brooklyn-ny/` | Location | ~2,560 | 500–600 | Exceeds — but overlaps two other Brooklyn URLs (Finding 1) |
| `/locations/new-jersey/old-bridge/` | Location | ~1,800 | 500–600 | Exceeds — overlaps `/roofer-old-bridge-nj/` (Finding 2) |
| `/locations/new-jersey/roof-repair/` | Location | ~1,220 | 500–600 | Meets |
| `/locations/staten-island-ny/roof-repair/` | Location | ~590 | 500–600 | Meets, borderline |
| `/brooklyn-roofing-lp/` (orphan LP) | Location-style LP | ~1,520 | 500–600 | Duplicate intent (Finding 1) |
| `/roofer-old-bridge-nj/` (orphan LP) | Location-style LP | ~1,040 | 500–600 | Duplicate intent (Finding 2) |
| `/affordable-roofing-in-brooklyn-ny/` (orphan LP) | Blog/LP hybrid | ~1,180 | 1,500 (blog) | Thin for a blog post, and a 3rd Brooklyn page (Finding 1) |
| `/asphalt-shingle-roofing-staten-island/` (orphan LP) | Blog/LP hybrid | ~1,280 | 1,500 (blog) | Slightly thin, overlaps `/services/.../asphalt-shingle-roofing/` (Finding 3) |
| `/roofing-services-nj/` (orphan LP) | Service-style LP | ~1,040 | 800 | Meets, but overlaps `/locations/new-jersey/` scope (Finding 4) |
| `/5-benefits-of-roof-inspections-maintenance/` | Blog | ~1,770 | 1,500 | Meets |
| `/roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj/` | Blog | ~1,820 | 1,500 | Meets |
| `/the-real-cost-of-roof-repairs-in-staten-island/` | Blog | ~720 | 1,500 | Thin for a blog post |
| `/roof-emergency-when-to-act-what-to-do/` | Blog | ~930 | 1,500 | Thin for a blog post |
| `/faq/` | FAQ | ~360 (7 Q&As) | — | Thin relative to the 8-question FAQ block embedded in `/brooklyn-roofing-lp/` (Finding 7) |
| `/contact/` | Contact | ~65 | — | Minimal, as expected for a contact page, but no license number shown here either |

## Readability (Flesch Reading Ease / Grade Level, sampled)

| Page | Flesch Reading Ease | Grade level |
|---|---|---|
| `/` | 44.0 | 11.4 |
| `/services/residential-roofing/` | 38.8 | 11.6 |
| `/5-benefits-of-roof-inspections-maintenance/` | 41.0 | 13.1 |
| `/roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj/` | 36.7 | 13.4 |
| `/brooklyn-roofing-lp/` | 54.7 | 9.7 |
| `/faq/` | 54.1 | 8.7 |

Most core pages sit in "difficult" (college-level, grade 11-13) territory for a homeowner-facing local-service audience that should be targeting an 8th-9th grade reading level (`/faq/` and `/brooklyn-roofing-lp/` are the readability high points — likely because they use shorter FAQ-style sentences).

## What Works

- **Genuine, specific numeric claims that are AI-citation-ready.** Several pages state concrete, quotable facts an LLM/AI Overview could lift directly, e.g. `/asphalt-shingle-roofing-staten-island/`: "A new asphalt shingle roof typically costs between $5,994 and $18,791... approximately $3.71–$9.12 per square foot" and "Generally, you're looking at 15-30 years" for asphalt shingle lifespan; `/` FAQ: "The average roof replacement costs $7,000 to $15,000+"; `/brooklyn-roofing-lp/` FAQ: "Flat roof replacements typically run $8,000 to $25,000+."
- **FAQ sections with clean Q&A structure** on `/faq/`, `/`, `/brooklyn-roofing-lp/`, and `/locations/new-jersey/old-bridge/` are well-formatted for FAQPage-style extraction and voice/AI-answer quotability (short, direct answers to "How much does...", "Do you offer...", "Are you licensed and insured?").
- **Legitimate external citations in at least one blog post.** `/5-benefits-of-roof-inspections-maintenance/` cites "the U.S. Department of Energy" (10-20% energy savings claim) and "Remodeling Magazine's Cost vs. Value report" (60%+ resale recoup) — genuine third-party sourcing that supports trustworthiness and is rare elsewhere on the site.
- **Real, named customer testimonials** (Sarah T., Dr. Louis Vastola, Chris W., with city attached) recur across the site and read as authentic rather than fabricated.
- **Structured data foundation is present**: `Organization`/`RoofingContractor`, `PostalAddress`, `GeoCoordinates`, `BlogPosting` with `author`/`datePublished`/`dateModified`, and `BreadcrumbList` are implemented site-wide via Rank Math, giving AI crawlers/LLMs machine-readable entity and publication-date signals to work with.
- **Local specificity on some location pages.** `/locations/brooklyn-ny/` and `/brooklyn-roofing-lp/` list dozens of real Brooklyn neighborhoods and ZIP codes and discuss borough-specific issues (parapet walls, flat-roof ponding, brownstone chimneys) rather than generic filler.

## Findings

### Finding 1 — Three separate URLs compete for the same "Brooklyn roofing" query intent
**Severity: High**
**Description:** `/locations/brooklyn-ny/`, `/brooklyn-roofing-lp/`, and `/affordable-roofing-in-brooklyn-ny/` are all standalone pages targeting Brooklyn homeowners/roof repair-replacement intent. All three repeat the same core claims ("100% free estimate," "Licensed, Insured, and Certified," "Up To 50 Years Warranty," phone `(347) 323-9128`) and two of the three (`/locations/brooklyn-ny/` and `/brooklyn-roofing-lp/`) both include an almost identical 8-question FAQ block ("Do you offer free roof estimates in Brooklyn?", "How much does a new roof cost in Brooklyn?", "Do you handle emergency roof leaks?", etc.) with near-verbatim answers. This is a classic doorway-page pattern the Sept 2025 QRG explicitly penalizes, and it forces Google/AI systems to choose one canonical answer, diluting all three.
**Recommendation:** Pick one canonical Brooklyn page (likely `/locations/brooklyn-ny/`, the one integrated into the site's location hierarchy and internal-link structure) and 301-redirect `/brooklyn-roofing-lp/` and `/affordable-roofing-in-brooklyn-ny/` into it, folding any unique content (e.g., the "affordable roofing" cost-focused FAQs) into the canonical page as new sections rather than new URLs.

### Finding 2 — Duplicate "Old Bridge, NJ" pages with an inconsistent phone number
**Severity: High**
**Description:** `/locations/new-jersey/old-bridge/` and `/roofer-old-bridge-nj/` both target "Old Bridge, NJ roofer" intent with overlapping structure (hero badges, "Why ProLine is the top choice in Old Bridge" section, matching FAQ questions like "Are you licensed and insured?" and "Do you offer emergency roof repair?"). Worse, `/locations/new-jersey/old-bridge/` itself displays **two different phone numbers on the same page**: the hero CTA reads "CALL: (848) 310-3977" while a later CTA reads "📞 Call us at (347) 323-9128" — a NAP-consistency failure that undermines trust and can create duplicate/conflicting entities in Google's understanding of the business.
**Recommendation:** Consolidate into a single Old Bridge URL (redirect the other), and immediately fix the phone-number inconsistency — audit all pages for the `(848) 310-3977` string (likely a call-tracking number injected by a plugin/redirect) versus the primary `(347) 323-9128` and standardize on one per NAP best practice.

### Finding 3 — Orphan "asphalt shingle" landing page duplicates the official service page
**Severity: Medium**
**Description:** `/asphalt-shingle-roofing-staten-island/` (a dated, blog-styled page: "May 10, 2024," ~1,280 words, cost breakdown, pros/cons) and `/services/residential-roofing/asphalt-shingle-roofing/` (~550 words, the "official" service page in the site's nav hierarchy) both target the same "asphalt shingle roofing" keyword for Staten Island and are never cross-linked to each other in the extracted content. This splits ranking signal and link equity between two competing URLs and confuses which is meant to be the canonical service page vs. an educational article.
**Recommendation:** Treat `/asphalt-shingle-roofing-staten-island/` explicitly as a blog/buyer's-guide asset (link it from the service page as "Read our full cost guide") rather than a competing landing page, or merge its unique cost/pros-cons content into the service page and 301 the standalone URL.

### Finding 4 — `/roofing-services-nj/` overlaps `/locations/new-jersey/` and `/locations/new-jersey/roof-repair/`
**Severity: Medium**
**Description:** `/roofing-services-nj/` is a ~1,040-word orphan page (not present in the site's `/services/` or `/locations/` URL hierarchy) covering the same NJ-wide service list and the same "roof repair," "roof replacement," "gutter services" categories already covered by `/locations/new-jersey/` and `/locations/new-jersey/roof-repair/`. It is not in either navigational hierarchy, suggesting it was built for a specific ad campaign or landing-page test and left indexed.
**Recommendation:** Decide whether this page is a live PPC landing page (in which case `noindex` it so it doesn't compete in organic/AI-citation results) or a content page (in which case merge it into `/locations/new-jersey/` and redirect).

### Finding 5 — Core service pages fall well short of the 800-word service-page floor
**Severity: Medium**
**Description:** `/services/` (~230 words), `/services/residential-roofing/` (~560), `/services/commercial-roofing/` (~560), `/services/gutter-services/` (~520), and `/services/residential-roofing/asphalt-shingle-roofing/` (~550) all fall short of the 800-word topical-coverage floor for service pages, and much of what is there is generic ("Protect your greatest investment... Our team of experienced roofing professionals delivers superior craftsmanship") rather than differentiated detail (process steps, material specs, warranty terms, permit/code notes, financing details). Compare this to `/services/roof-repair/` (~1,320 words), which is measurably deeper and includes a "Consequences of Neglecting Roof Repair" section with specific risk detail — proof the template can support more depth.
**Recommendation:** Bring `/services/`, `/services/residential-roofing/`, `/services/commercial-roofing/`, `/services/gutter-services/`, and the material sub-pages up to the depth level of `/services/roof-repair/`: add material specs, install/repair process steps, typical cost ranges, warranty terms, and locally relevant code/permit notes unique to Staten Island/Brooklyn/NJ.

### Finding 6 — No visible author identity, credentials, or license number anywhere on the site
**Severity: High**
**Description:** Blog posts carry `BlogPosting` schema with `"author": {"name": "Lonnie from ProLine Roofing"}` (confirmed on `/5-benefits-of-roof-inspections-maintenance/`), but this byline is not rendered anywhere in the visible page content — no "Written by," no bio, no photo (the schema points to a blank Gravatar placeholder), no stated years of experience or certifications. Separately, the FAQ states: "We can provide you with proof of both our licensure and insurance coverage upon request" (`/faq/`) rather than displaying an actual license number, and `/services/residential-roofing/asphalt-shingle-roofing/` lists brand names the company "trusts" (GAF, Owens Corning, CertainTeed, Atlas) in a way that reads like certifications but names no actual installer certification (e.g., GAF Master Elite, CertainTeed SELECT ShingleMaster). For a licensed home-improvement trade, this is a meaningful expertise/trust gap under the Sept 2025 QRG's emphasis on verifiable, on-page E-E-A-T signals (not just structured-data-only signals invisible to human visitors).
**Recommendation:** Add a visible byline + short bio block to every blog post ("Written by Lonnie, [title], X years in roofing"), publish an About/Team page with named staff and any actual certifications held, and display the NY/NJ contractor license number(s) directly in the site footer and on `/contact/` and `/faq/` rather than "available upon request."

### Finding 7 — Boilerplate trust badges and testimonial blocks are copy-pasted verbatim across nearly every page
**Severity: Medium**
**Description:** The identical "Accredited Company / Quality Materials / Affordable Pricing / Free Estimates" trust-badge paragraph, and the identical 3 testimonials (Sarah T. / Dr. Louis Vastola / Chris W.), appear verbatim on `/`, `/services/roof-repair/`, `/services/residential-roofing/asphalt-shingle-roofing/`, `/locations/new-jersey/old-bridge/`, `/roofer-old-bridge-nj/`, and others sampled — with the only change being the city name attached to a testimonial (e.g., the same reviewer appears as both "Staten Island, NY" and "Old Bridge, NJ" across different pages). "Accredited Company" never states which body accredited them. This is repetitive-structure, low-specificity boilerplate the QRG treats as a low-quality-AI-content marker even when the underlying sentences are grammatically fine.
**Recommendation:** Vary testimonial selection per page/location so each location page shows a review actually left by a customer in that city, name the specific accreditation/association behind "Accredited Company" (or remove the badge if there isn't one), and reduce reliance on the same 4-icon trust block as a substitute for page-specific proof.

### Finding 8 — Homepage contains a duplicated "About Us" block within a single page
**Severity: Low**
**Description:** The homepage (`/`) extracted text contains two near-identical "About Us... Quality & Reliability With 100% Satisfaction" paragraphs back-to-back with slightly different wording ("your home or business is our top priority" vs. "we are dedicated to addressing roofing issues swiftly and affordably"), each followed by its own repeated trust-badge list ("Licensed, Insured, and Certified / Free Site Visit.../100% Satisfaction Guaranteed / Up To 50 Years Warranty"). This reads as a leftover from a template/page-builder duplication rather than intentional copy, and it also displays an unrendered stat counter ("Roofing Projects 0 +") in the extracted content.
**Recommendation:** Audit the homepage builder layout (likely Elementor/WPBakery sections) for the duplicated About block and remove the redundant instance; verify the "900+" project counter renders correctly for non-JS/crawler contexts.

### Finding 9 — Several blog posts fall short of the 1,500-word blog-post floor
**Severity: Low**
**Description:** `/the-real-cost-of-roof-repairs-in-staten-island/` (~720 words) and `/roof-emergency-when-to-act-what-to-do/` (~930 words) are noticeably thinner than comparable posts like `/5-benefits-of-roof-inspections-maintenance/` (~1,770) and `/roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj/` (~1,820), despite covering topics (repair cost breakdowns, emergency triage steps) that could support more comprehensive treatment (e.g., insurance-claim process detail, seasonal cost variation, a repair-vs-replace decision framework).
**Recommendation:** Expand these two posts with additional original detail (e.g., a cost table by repair type, a step-by-step emergency checklist) rather than treating 1,500 words as a hard target — the goal is closing topical gaps, not padding.

### Finding 10 — Readability sits at college level (grade 11-13) on core pages, high for a homeowner audience
**Severity: Low**
**Description:** Flesch-Kincaid grade level measured at 11.4 (`/`), 11.6 (`/services/residential-roofing/`), 13.1 (`/5-benefits-of-roof-inspections-maintenance/`), and 13.4 (`/roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj/`) — all above the ~8th-9th grade level generally recommended for consumer home-services content. `/faq/` (grade 8.7) and `/brooklyn-roofing-lp/` (grade 9.7) are notably easier to read, correlating with their shorter, FAQ-style sentence structure.
**Recommendation:** Shorten sentence length and break up long compound sentences in the blog posts and core service copy; use the FAQ/`/brooklyn-roofing-lp/` writing style (short direct sentences, bolded lead-ins) as the house style going forward.

### Finding 11 — `Product` schema misapplied to represent aggregate review rating
**Severity: Low**
**Description:** Multiple pages (`/`, `/faq/`, `/5-benefits-of-roof-inspections-maintenance/`) embed a `"@type": "Product"` node named `"Contractor"` purely to carry an `AggregateRating` (4.9/97 reviews). This is a semantically incorrect and somewhat spammy use of `Product` schema for a roofing service business, and could be filtered or ignored by Google's rich-result validation, or read as a manipulative structured-data pattern by a strict rater/reviewer.
**Recommendation:** Move the `AggregateRating` onto the existing `RoofingContractor`/`Organization` node (which schema.org supports directly) instead of a fabricated `Product` wrapper — this is a schema-implementation fix that should be coordinated with the technical/schema audit workstream.

## Evidence Sources
All findings are based on rendered/extracted text and raw HTML pulled 2026-07-12 from: `/`, `/services/`, `/services/residential-roofing/`, `/services/commercial-roofing/`, `/services/gutter-services/`, `/services/residential-roofing/asphalt-shingle-roofing/`, `/services/roof-repair/`, `/locations/`, `/locations/brooklyn-ny/`, `/locations/new-jersey/old-bridge/`, `/locations/new-jersey/roof-repair/`, `/locations/staten-island-ny/roof-repair/`, `/brooklyn-roofing-lp/`, `/roofer-old-bridge-nj/`, `/roofing-services-nj/`, `/affordable-roofing-in-brooklyn-ny/`, `/asphalt-shingle-roofing-staten-island/`, `/5-benefits-of-roof-inspections-maintenance/`, `/roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj/`, `/the-real-cost-of-roof-repairs-in-staten-island/`, `/roof-emergency-when-to-act-what-to-do/`, `/faq/`, and `/contact/`.
