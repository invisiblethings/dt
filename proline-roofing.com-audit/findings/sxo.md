# Search Experience Optimization (SXO) — proline-roofing.com

## SXO Gap Score: 41/100
(Separate from SEO Health Score. Scale = alignment between page and SERP expectations, 0-100 where higher = better alignment. Scored across 7 dimensions: Page Type /15, Content Depth /15, UX Signals /15, Schema /15, Media /15, Authority /15, Freshness /10.)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 5/15 | 3 pages targeting transactional local queries carry `BlogPosting` schema (see Finding 1); core `/services/` pages are thin Service Pages competing against deep Local Pages in the SERP. |
| Content Depth | 6/15 | `/services/roof-replacement/` (585 words), `/services/commercial-roofing/` (574 words), `/services/gutter-services/gutter-installation/` (518 words) vs. SERP/competitor norm of 1,300–3,800 words (B&B Roofing 1,512 words; Staten Island Gutter Pros 3,778 words). |
| UX Signals | 8/15 | Click-to-call and "free estimate" CTAs present sitewide; undercut by a title-tag typo ("Saten Island") and duplicate meta descriptions across NJ pages. |
| Schema | 3/15 | Only `/locations/brooklyn-ny/` carries `RoofingContractor` + `GeoCoordinates` + `OpeningHoursSpecification`. Every other page checked (homepage included) has only `BreadcrumbList`/`ListItem` — no `LocalBusiness`, no `AggregateRating`/`Review`. |
| Media | 8/15 | Images present throughout (6–24/page); no before/after galleries; no certification badge imagery (GAF/BBB) found on any page despite being a near-universal competitor trust signal. |
| Authority | 6/15 | Shared testimonial widget (~28 mentions) appears on most core pages, but no GAF/BBB/manufacturer-certification badges, no commercial case studies/portfolio anywhere on the site. |
| Freshness | 5/10 | Several landing/blog pages updated 2025–2026, but the core `/services/roof-repair/`, `/roof-replacement/`, `/commercial-roofing/`, `/gutter-installation/` pages carry older 2024 publish signals while competing against fresher competitor content. |

---

## What Works

- **`/locations/brooklyn-ny/` is a template proof-of-concept.** It is the only page site-wide with full `RoofingContractor` schema, `GeoCoordinates`, `OpeningHoursSpecification`, 2,628 words, 13 H2s, and ~28 testimonial mentions — this shows the CMS/theme is fully capable of producing a SERP-aligned Local Page; it just isn't applied consistently.
- **A shared testimonial/trust widget** appears on most `/services/` and `/locations/` pages (~28 mentions each), giving a consistent social-proof baseline across the core site architecture (not present on the orphan landing pages).
- **Click-to-call and "free estimate" CTAs are present almost everywhere checked**, giving low-friction next steps for ready-to-convert visitors.
- **The `/locations/` hub architecture** (NY + dedicated NJ town pages for Clifton, Elizabeth, Freehold, Jersey City, Newark, Old Bridge) structurally matches what Google rewards for these queries (Local Page type) — the foundation is right, execution/schema/depth parity is what's missing.
- **Active content maintenance is happening**: several pages show 2025–2026 publish/update dates (`/roof-replacement-in-staten-island-made-easy/` 2026-07-04, `/brooklyn-roofing-lp/` 2026-07-09, `/locations/new-jersey/` 2025-07-09), indicating the team is not neglecting the site.

---

## SERP-Backwards Analysis by Query Cluster

### 1. "roof repair staten island" — SERP dominant type: **Local Page (~90% confidence)**
Non-directory competitors (B&B Roofing & Gutters, Affordable Roofing & Gutters, All Pro Roofing, Eddy Roofing) are all deep local-trust pages (1,000–1,500+ words) leading with GAF/Owens Corning certifications, one-day-install claims, and lifetime warranties. Directories (Yelp, GAF contractor finder, Thumbtack, BBB) round out the top 10, reinforcing that Google treats this as high local/trust intent, not informational.

**Target pages:** `/services/roof-repair/` (1,353 words, `BreadcrumbList`-only schema) and `/locations/staten-island-ny/roof-repair/` (613 words, `BreadcrumbList`-only schema, title reads "Roof Repair **Saten** Island, NY").
**Verdict:** MEDIUM-HIGH mismatch. Depth is closer to par on the services page, but two internal pages compete for the same query, neither has local business schema, and neither shows a GAF/BBB-style certification badge that every ranking competitor displays.

### 2. "roof replacement staten island ny" — SERP dominant type: **Local Page (~85% confidence)**
B&B Roofing, Gorman & Carbone (same-day installs), Eddy Roofing all rank with deep trust-building pages; BBB/Yelp/Angi directories fill remaining slots.

**Target pages:** `/services/roof-replacement/` (585 words, 4 H2s — thin) vs. `/roof-replacement-in-staten-island-made-easy/` (1,609 words, 9 H2s, but marked up as **`BlogPosting`** schema, not a service/local type).
**Verdict:** CRITICAL mismatch. The deeper, more useful, more current (2026-07-04) content lives on a page schema-tagged as a blog article, while the "official" service page is thin. Google has no clean signal for which page is the authoritative local-service page for this query.

### 3. "roofing contractor brooklyn ny" — SERP dominant type: **Local Page (~90% confidence)**
All non-directory competitors (Rocco's All Type Roofing, NY Roofing since 1988, United Roofing & Waterproofing, Skyward Roofing, Roman Roofing, Royal Roofing & Siding) are established local contractor pages, several citing decades in business.

**Target pages:** THREE competing pages — `/locations/brooklyn-ny/` (2,628 words, `RoofingContractor` schema, 28 testimonial mentions — the strongest page on the entire site), `/brooklyn-roofing-lp/` (1,515 words, urgency/financing/before-after copy but `BreadcrumbList`-only schema), and `/affordable-roofing-in-brooklyn-ny/` (1,194 words, `BlogPosting` schema).
**Verdict:** HIGH mismatch via cannibalization — the site's single best local page is diluted by two lower-quality/lower-schema duplicates chasing the same intent.

### 4. "commercial roofing contractor nj" — SERP dominant type: **Service Page / Local hybrid (~80% confidence)**
Competitors (CentiMark, Patriot Roofing — "35 years," licensed/bonded, large-project focus, H. Recinos Roofing — 17 years, 25-year-to-lifetime warranties, Badger Roofing) all lead with B2B credentials, project scale, and warranty terms — a distinctly commercial-buyer framing, not residential.

**Target pages:** `/services/commercial-roofing/` (574 words, 3 H2s, one H2 literally reads **"Persistent Leaks Ruining Your **Home**?"** — residential copy bleeding into the commercial page) and `/locations/new-jersey/` (889 words, 2 H1 tags, generic repair/replacement framing, not commercial-specific).
**Verdict:** CRITICAL mismatch. No case studies, portfolio, bonding/insurance credentials, or property-manager-specific language exist anywhere on the site. Neither candidate page resembles what is ranking.

### 5. "gutter installation staten island" — SERP dominant type: **Local Page (~90% confidence)**
Competitor Staten Island Gutter Pros' homepage runs 3,778 words across 23 H2s with `Organization` schema and heavy review language; Gino's Roofing, Christian Construction, Spotless Gutter also appear as dedicated gutter-trust pages.

**Target page:** `/services/gutter-services/gutter-installation/` (518 words, 4 H2s, zero Staten Island/location terms, `BreadcrumbList`-only schema).
**Verdict:** CRITICAL mismatch — roughly 7x thinner than the leading local competitor, with no location-specific proof points despite gutters being a core, named service line.

---

## User Stories (derived from SERP signals)

**Cluster: Emergency Repair (Staten Island)**
1. As a **panicked homeowner with an active leak**, I want to see fast, verifiable proof this contractor answers emergencies today, because water damage is compounding by the hour, but I'm blocked by a **trust gap** — no GAF/BBB badge or emergency-response guarantee is visible on `/services/roof-repair/` or `/locations/staten-island-ny/roof-repair/`. *(Source: competitor pattern — B&B Roofing, Eddy Roofing lead with GAF Master Elite/emergency tarping; target pages show "Emergency"/"Same-day" copy but no certification schema or badge.)*
2. As that same homeowner scanning quickly on a phone, I want to instantly confirm this is a real local Staten Island company, but I'm blocked by a **credibility gap** — the localized page's title tag reads "Saten Island," which reads as unprofessional/possibly-fake at the exact moment trust matters most. *(Source: title tag audit of `/locations/staten-island-ny/roof-repair/`.)*

**Cluster: Replacement Comparison Shopper (Staten Island)**
3. As a **homeowner comparison-shopping a full roof replacement**, I want a clear cost range and process breakdown before I call anyone, because I don't want to be pressured into a sales call blind, but I'm blocked by an **information gap** on `/services/roof-replacement/` (only 585 words, 4 H2s) — the cost/process detail I need actually lives on a different URL tagged as a blog post. *(Source: competitor depth 1,000–1,500+ words; target `/roof-replacement-in-staten-island-made-easy/` has the cost content but wrong schema type.)*
4. As that shopper, I want confidence this isn't a fly-by-night operator before a five-figure purchase, because replacement costs $11K–$17K in this market, but I'm blocked by a **trust gap** — no manufacturer certification (GAF/Owens Corning) or warranty-length claim appears on either candidate page. *(Source: market pricing surfaced in SERP; competitor warranty/certification claims.)*

**Cluster: Commercial Property Manager (NJ)**
5. As a **commercial property/facility manager**, I want proof this contractor has handled buildings like mine (multi-tenant, minimal downtime, bonded/insured), because a bad commercial roof job creates tenant liability, but I'm blocked by a **relevance gap** — `/services/commercial-roofing/` has no case studies, portfolio, or property-manager language, and one heading literally addresses "your home." *(Source: competitor framing — Patriot Roofing "35 years," CentiMark 24-hour emergency service; target page H2 text.)*
6. As that manager comparing vendors for an RFP, I want warranty terms and licensing/bonding details up front, because procurement requires documentation, but I'm blocked by a **technical confusion/information gap** — none of this is present on `/services/commercial-roofing/` or `/locations/new-jersey/`. *(Source: H. Recinos Roofing's "25-year to lifetime warranty" claim; absence of equivalent on target pages.)*

**Cluster: Brooklyn Comparison Shopper**
7. As a **Brooklyn homeowner narrowing down 3 roofers**, I want one clear, trustworthy page for this company, because comparing several sites is exhausting, but I'm blocked by **comparison fatigue created by the site itself** — three internal pages (`/locations/brooklyn-ny/`, `/brooklyn-roofing-lp/`, `/affordable-roofing-in-brooklyn-ny/`) present overlapping but inconsistent trust signals (schema, testimonials, certifications vary between them). *(Source: schema/testimonial-count comparison across the three URLs.)*

---

## Persona Scores (Relevance / Clarity / Trust / Action — 25 pts each)

| Persona | Primary Page(s) | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Emergency Repair Homeowner (SI) | `/services/roof-repair/`, `/locations/staten-island-ny/roof-repair/` | 18 | 14 | 10 | 18 | 60/100 | Good (weak) |
| Replacement Comparison Shopper (SI) | `/services/roof-replacement/`, `/roof-replacement-in-staten-island-made-easy/` | 19 | 14 | 13 | 15 | 61/100 | Good (weak) |
| Commercial Property Manager (NJ) | `/services/commercial-roofing/`, `/locations/new-jersey/` | 8 | 7 | 6 | 10 | 31/100 | **Critical Mismatch** |
| Brooklyn Comparison Shopper | `/locations/brooklyn-ny/`, `/brooklyn-roofing-lp/`, `/affordable-roofing-in-brooklyn-ny/` | 17 | 16 | 15 | 19 | 67/100 | Good |
| Gutter Homeowner (SI) | `/services/gutter-services/gutter-installation/` | 10 | 10 | 8 | 12 | 40/100 | Needs Work |
| NJ Homeowner (Old Bridge) | `/roofer-old-bridge-nj/`, `/locations/new-jersey/old-bridge/` | 16 | 14 | 19 | 16 | 65/100 | Good |

### Weakest Persona: Commercial Property Manager (NJ) — 31/100
**Top issue:** The commercial roofing page uses residential copy ("Persistent Leaks Ruining Your Home?") and has no case studies, portfolio, bonding/insurance credentials, or warranty terms — the exact evidence B2B buyers and every ranking competitor lead with.
**Recommended fix:** Build a dedicated commercial-roofing + NJ local hybrid page with a "Commercial Projects We've Completed" section (3+ photos/case studies), bonding/insurance/licensing badges, and warranty-term callouts, linked directly from `/locations/new-jersey/`.

### Systemic Issues
- **Schema:** Every persona except the Brooklyn one is undermined by missing `LocalBusiness`/`RoofingContractor` schema — only one page site-wide has it.
- **Authority:** No persona sees a GAF/BBB/manufacturer certification badge, despite this being the #1 recurring trust signal among every ranking competitor across all 5 query clusters.
- **Action clarity fragmented by cannibalization:** Three of six personas (Brooklyn, Old Bridge, Replacement) are served by 2-3 competing internal pages instead of one authoritative page, which dilutes both ranking signals and the user's confidence they found "the" page.

### Priority Actions
1. Fix the Commercial Property Manager gap first (31/100, highest-value B2B query with zero qualifying content).
2. Add `LocalBusiness`/`RoofingContractor` + `AggregateRating` schema and a GAF/BBB-style certification badge sitewide (systemic issue affecting every persona).
3. Consolidate the Brooklyn and Old Bridge duplicate pages into single authoritative pages (see orphan landing page verdict below).

---

## Orphan Landing Pages: Helping or Hurting?

**Verdict: Net hurting.** The five orphan landing pages (`/brooklyn-roofing-lp/`, `/roofer-old-bridge-nj/`, `/roofing-services-nj/`, `/affordable-roofing-in-brooklyn-ny/`, `/asphalt-shingle-roofing-staten-island/`) each duplicate a topic already covered by a `/services/` or `/locations/` page, and in every case they carry **weaker or wrong-type schema** than their `/locations/`/`/services/` counterpart:

- `/brooklyn-roofing-lp/` vs `/locations/brooklyn-ny/`: LP has stronger conversion copy (financing, before/after, 24/7 urgency) but only `BreadcrumbList` schema vs. the location page's full `RoofingContractor`/`GeoCoordinates`/`OpeningHoursSpecification`.
- `/roofer-old-bridge-nj/` (1,061 words) vs `/locations/new-jersey/old-bridge/` (1,867 words, more review language): near-identical intent, split authority, and `/roofing-services-nj/` and `/roofer-old-bridge-nj/` share the **literal identical meta description** ("Expert repairs, quality roof replacements, honest advice...") — a template-duplication signal that actively hurts differentiation in the SERP.
- `/affordable-roofing-in-brooklyn-ny/` and `/asphalt-shingle-roofing-staten-island/` and `/roof-replacement-in-staten-island-made-easy/` are all marked up with **`BlogPosting` schema** while targeting transactional local-service queries — the single most severe page-type mismatch found in this audit (CRITICAL per the taxonomy: "Blog Post targeting '[service] in [city]'").

**Recommendation:** Consolidate. Migrate the best-performing conversion elements from each orphan page (financing mentions, before/after language, urgency/same-day copy, cost-guide content) into the corresponding canonical `/services/` or `/locations/` page, then 301-redirect the orphan URL to the canonical page. This resolves the schema mismatch, stops internal cannibalization, and concentrates link equity/trust signals onto one authoritative page per query cluster.

---

## Findings

1. **Title: Three pages carry `BlogPosting` schema for transactional local-service queries**
   Severity: CRITICAL
   Description: `/roof-replacement-in-staten-island-made-easy/`, `/affordable-roofing-in-brooklyn-ny/`, and `/asphalt-shingle-roofing-staten-island/` are structured-data-tagged as blog articles even though they target commercial, local "[service] in [city]" intent where every SERP competitor is a Local/Service page. Per the page-type taxonomy this is a CRITICAL mismatch ("Blog Post targeting '[service] in [city]'").
   Recommendation: Re-tag these pages with `Service`/`RoofingContractor` (or fold their content into the matching `/services/` or `/locations/` page) so schema matches the transactional intent Google is rewarding.

2. **Title: Sitewide absence of `LocalBusiness`/`RoofingContractor` schema (only 1 of 16 pages checked has it)**
   Severity: CRITICAL
   Description: The homepage and nearly every `/services/` and `/locations/` page (including `/locations/new-jersey/`, `/roofer-old-bridge-nj/`, `/roofing-services-nj/`) carry only `BreadcrumbList`/`ListItem` schema. Only `/locations/brooklyn-ny/` has full `RoofingContractor` + `GeoCoordinates` + `OpeningHoursSpecification`. No page anywhere has `AggregateRating`/`Review` schema despite visible testimonial content.
   Recommendation: Roll out the `/locations/brooklyn-ny/` schema template (already proven to work) sitewide, and add `AggregateRating`/`Review` schema wherever testimonials appear. Hand off to `/seo schema` for generation.

3. **Title: Commercial roofing page fails the NJ property-manager persona**
   Severity: CRITICAL
   Description: `/services/commercial-roofing/` is 574 words with no case studies, portfolio, bonding/insurance credentials, or warranty terms — the core trust elements every ranking "commercial roofing contractor nj" competitor leads with. One H2 heading reads "Persistent Leaks Ruining Your Home?", bleeding residential copy into a B2B page. Persona score: 31/100 (Critical Mismatch), the weakest of all personas assessed.
   Recommendation: Build a dedicated commercial + NJ hybrid page with 3+ project case studies, bonding/insurance/licensing badges, and warranty-term callouts, linked from `/locations/new-jersey/`.

4. **Title: Gutter installation page is ~7x thinner than the SERP norm and has zero location targeting**
   Severity: HIGH
   Description: `/services/gutter-services/gutter-installation/` is 518 words / 4 H2s with no Staten Island or NJ town references, while the leading local competitor (Staten Island Gutter Pros) ranks with 3,778 words / 23 H2s of location-specific proof content.
   Recommendation: Expand to a full local-service page (pricing ranges, materials, process, Staten Island + NJ town mentions, gutter-guard cross-sell) and add `Service` + local schema.

5. **Title: Brooklyn query cluster is cannibalized across three internal pages**
   Severity: HIGH
   Description: `/locations/brooklyn-ny/` (strongest page site-wide), `/brooklyn-roofing-lp/`, and `/affordable-roofing-in-brooklyn-ny/` all target "roofing contractor brooklyn ny" / "affordable roofing brooklyn" intent with inconsistent schema and trust-signal depth, splitting authority instead of concentrating it.
   Recommendation: Consolidate the two orphan Brooklyn pages into `/locations/brooklyn-ny/`, porting over the strongest conversion copy (financing, before/after, urgency messaging), then 301-redirect.

6. **Title: Old Bridge, NJ query cluster is duplicated across two pages with identical boilerplate meta descriptions**
   Severity: HIGH
   Description: `/roofer-old-bridge-nj/` and `/locations/new-jersey/old-bridge/` both target the same query. Additionally, `/roofer-old-bridge-nj/` and `/roofing-services-nj/` share the exact same meta description ("Expert repairs, quality roof replacements, honest advice. Get a free, no-pressure estimate today."), signaling templated, non-differentiated content to Google.
   Recommendation: Pick `/locations/new-jersey/old-bridge/` as canonical (it has more content and more review language), redirect `/roofer-old-bridge-nj/`, and write unique meta descriptions per NJ town page.

7. **Title: Title tag typo damages trust at the highest-intent emergency-repair moment**
   Severity: MEDIUM
   Description: `/locations/staten-island-ny/roof-repair/`'s title tag reads "Roof Repair **Saten** Island, NY" — a misspelling visible directly in the SERP snippet for a query where the searcher is actively deciding whether this is a legitimate, trustworthy local business.
   Recommendation: Fix the typo immediately; it is a one-line change with outsized trust impact given the emergency intent of this query.

8. **Title: `/services/roof-replacement/` is far thinner than the deeper content that actually exists on the site for this topic**
   Severity: MEDIUM
   Description: The "official" service page is 585 words / 4 H2s, while `/roof-replacement-in-staten-island-made-easy/` (1,609 words, 9 H2s, cost/guide framing) covers the topic in far more SERP-competitive depth — but under the wrong page type/schema (see Finding 1).
   Recommendation: Merge the cost/guide content from the blog-tagged page into `/services/roof-replacement/` (or its Staten Island location variant) so depth and schema live on the same, correctly-typed page.

9. **Title: No GAF/BBB/manufacturer certification badges found on any page, despite being the top recurring competitor trust signal**
   Severity: MEDIUM
   Description: Across all 5 query clusters, ranking competitors (B&B Roofing "GAF Master Elite & Owens Corning Preferred," H. Recinos Roofing "25-year to lifetime warranty," Patriot Roofing "35 years") lead with certification/warranty proof. No such badge or claim was found on any Proline page checked.
   Recommendation: If Proline holds any manufacturer certifications, surface them prominently (badge + schema) on all `/services/` and `/locations/` pages; if not currently certified, prioritize obtaining at least one recognized certification given how consistently competitors use this signal.

10. **Title: Asphalt shingle content duplicated across a service subpage and a standalone blog-schema page**
    Severity: MEDIUM
    Description: `/services/residential-roofing/asphalt-shingle-roofing/` (561 words, generic, no location) and `/asphalt-shingle-roofing-staten-island/` (1,321 words, `BlogPosting` schema, Staten-Island-specific) cover overlapping ground with different depth and different (mismatched) page types.
    Recommendation: Consolidate into the residential-roofing subpage with Staten Island-specific content added, and drop the standalone blog-schema duplicate (redirect).

---

## Limitations

- WebSearch was used in place of a dedicated SERP API; explicit PAA question lists, featured-snippet text, and AI Overview citations could not be directly extracted — SERP dominant-type and confidence percentages are inferred from the composition and content style of the visible organic results rather than raw SERP-feature data.
- Several competitor sites blocked direct fetch/render (`patriotroof.com` returned HTTP 406, `gormancarbone.com` returned 404 on the fetched path, and `WebFetch` was blocked by bot protection on multiple domains); competitor depth/schema figures are based on the subset that could be rendered (B&B Roofing, Staten Island Gutter Pros) plus WebSearch summaries for the rest.
- No mobile-specific rendering or above-the-fold screenshot capture was performed (screenshots directory was empty at analysis time); UX Signal scoring relies on HTML structure/order rather than visual verification.
- No access to Google Search Console or rank-tracking data — mismatch severity is inferred from SERP composition and page structure, not confirmed ranking positions or click-through data.
- Not all ~19 blog posts or all NJ town pages (Clifton, Elizabeth, Freehold, Jersey City, Newark) were individually fetched; findings on those are extrapolated from the closely analogous Old Bridge and Brooklyn pages and should be spot-checked before large-scale consolidation work.

Offer: Generate a PDF report? Use `/seo google report`
