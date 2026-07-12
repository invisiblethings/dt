# Full SEO Audit — proline-roofing.com

**Audit date:** 2026-07-12
**Business type:** Local Service Area Business — Roofing Contractor (residential + commercial roofing, roof repair/replacement, gutter services), headquartered in Staten Island, NY, also serving Brooklyn, NY and six New Jersey towns (Clifton, Elizabeth, Freehold, Jersey City, Newark, Old Bridge).
**Platform:** WordPress + Elementor + Rank Math SEO, hosted behind LiteSpeed cache.
**Scope:** All 74 URLs across the site's 4 XML sitemaps were catalogued; 11 specialist audits sampled a representative cross-section of the homepage, service pages, location pages, blog posts, and 5 standalone landing pages, plus sitemap/robots.txt/schema extraction across the full URL set.

## SEO Health Score: 53 / 100

This score is a custom weighted blend across all 11 audit categories run (the standard 7-category weighting in the base skill framework was extended to explicitly include Local SEO, Search Experience Optimization, Content Clustering, and Backlinks — all highly material for a multi-location local service business):

| Category | Score | Weight |
|---|---|---|
| Technical SEO | 61/100 | 16% |
| Content Quality | 54/100 | 16% |
| Local SEO | 52/100 | 14% |
| Schema & Structured Data | 42/100 | 11% |
| Search Experience Optimization (SXO) | 41/100 | 8% |
| Performance (Core Web Vitals) | 60/100 | 8% |
| AI Search Readiness (GEO) | 58/100 | 8% |
| Sitemap Architecture | 72/100 | 6% |
| Visual & Mobile | 58/100 | 5% |
| Content Clustering & Strategy | 38/100 | 4% |
| Backlinks & Domain Authority | 40/100 (data-capped) | 4% |

## Known Data Limitations (read before acting on any Performance/Backlink figures)

- **No Google API credentials configured.** CrUX field data, PageSpeed Insights, Search Console, and GA4 were all unavailable — Performance findings are static/structural estimates, not measured LCP/INP/CLS.
- **No Chrome-based lab tooling worked in this sandbox.** The environment's mandatory egress proxy re-terminates TLS with a CA that Chromium's own trust store rejects for this host, so no Lighthouse trace or Playwright screenshot could be captured. Visual findings are inferred from raw HTML/CSS, not rendered pixels.
- **No Moz/Bing/DataForSEO credentials configured.** Backlink data is Tier 0 (Common Crawl only) and is explicitly a confidence-capped placeholder, not a real link-authority score.
- **No Google Business Profile API access.** All Local SEO findings on GBP category, verification status, and live map-pack position are on-page inferences only and need manual GBP-dashboard confirmation.

---

## Top 5 Critical Issues

1. **A fake-looking review schema block — identical `Product`/`AggregateRating` (4.9★, 97 reviews) — is duplicated verbatim on every single page**, including the FAQ, contact, and legal pages, disconnected from the real business entity. This is the textbook pattern Google's structured-data spam enforcement targets and risks a sitewide rich-result penalty.
2. **Five orphan PPC-style landing pages cannibalize the site's real `/locations/` and `/services/` pages** — flagged independently by 6 of the 11 specialist audits (Technical, Content, Sitemap, Local, SXO, Cluster). Brooklyn alone has three competing indexable pages; Old Bridge and New Jersey overall each have two.
3. **The main business schema's `streetAddress` field contains the business name** ("ProLine Roofing") instead of a real address — an invalid NAP that breaks entity resolution for local search and AI grounding.
4. **Two location pages (Brooklyn, Freehold) assert specific street addresses in hidden JSON-LD that appear nowhere in visible content, the footer, or the site's own map embeds** — a classic undisclosed-secondary-location pattern that carries real GBP policy risk if these were ever submitted as listings.
5. **The Staten Island hub page — the primary market's own location page — canonicalizes to the homepage and is missing from the sitemap**, actively suppressing the one market that should have the strongest, most authoritative page from ranking independently.

## Top 5 Quick Wins

1. Fix the "Saten Island" typo in the location page `<title>` tag (visible in every SERP snippet for an emergency-repair query).
2. Add `FAQPage` schema to `/faq/` and convert the accordion questions into real `<h2>`/`<h3>` headings.
3. Publish an `/llms.txt` file summarizing the business, service area, and key pages.
4. Fix the `telePhone` (should be `telephone`) typo in the Brooklyn location schema.
5. Add explicit `robots.txt` `Allow` directives for GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot.

---

## Technical SEO (61/100)

**What works:** Clean robots.txt; valid, well-formed sitemap structure; no broken links or redirect chains across 29 sampled URLs; correct, self-referencing canonical tags; consistent meta robots directives; working non-www→www redirect; universal mobile viewport; server-side rendered (not an SPA).

**Key findings:** Two orphan PPC pages (`/roofer-old-bridge-nj/`, `/roofing-services-nj/`) are near-duplicate, thin (65-66 words), and indexable — direct keyword cannibalization (Critical). Zero security response headers site-wide across all 29 URLs checked (High). The sitewide fake review schema appears here too (High). Local schema is inconsistent — only Brooklyn's location page has full markup (High). Three more orphan landing pages create additional duplicate-content/crawl-budget risk (High). A likely LCP-risk image lazy-loading pattern and low WebP adoption (Medium). Inconsistent location-page URL taxonomy (Medium). No IndexNow implementation (Low). Thin `/locations/` and `/services/` hub pages (Low).

*Full detail: `findings/technical.md`*

## Content Quality (54/100)

**What works:** Genuine, AI-citation-ready numeric claims (cost ranges, lifespans); clean FAQ structure; legitimate external citations in at least one blog post; real named testimonials; solid schema foundation (Organization, BlogPosting, BreadcrumbList); local specificity on Brooklyn pages.

**Key findings:** Three separate URLs compete for "Brooklyn roofing" intent with near-identical FAQ blocks (High). Duplicate "Old Bridge, NJ" pages, one of which displays two different phone numbers on the same page (High). No visible author identity, credentials, or license number anywhere on the site — only invisible schema (High). An orphan landing page duplicates the official asphalt-shingle service page (Medium). Core service pages fall well short of the 800-word floor (Medium). Boilerplate trust badges and testimonials are copy-pasted verbatim across nearly every page (Medium). A duplicated "About Us" block sits within the homepage itself (Low). Readability sits at college level (grade 11-13) versus the recommended 8th-9th grade (Low).

*Full detail: `findings/content.md`*

## Schema & Structured Data (42/100)

**What works:** JSON-LD used exclusively with correct `@context`; `RoofingContractor`+`Organization` is the right, non-deprecated type where present; `BreadcrumbList` implemented sitewide; `WebSite`+`SearchAction` correctly formed; valid ISO 8601 dates; no deprecated schema types.

**Key findings:** The sitewide fake `Product`/`AggregateRating` block is a Critical spam-policy risk. `streetAddress` holds the business name instead of a real address (High). No `areaServed` anywhere despite the explicit 8-town service area (High). A duplicate/conflicting `RoofingContractor` entity on the Brooklyn page carries a `telePhone` typo (High). No `Service` schema on any of the 20+ `/services/` pages (Medium). `FAQPage` schema is absent on `/faq/` (Info — AI/GEO opportunity, no SERP loss). No real `Review`/`AggregateRating` tied to actual testimonials (Medium).

*Full detail: `findings/schema.md`*

## Sitemap Architecture (72/100)

**What works:** All 5 sitemap files are valid, well-formed XML; all 74 URLs return clean 200s with zero redirects; well under scale limits; no deprecated tags; realistic `lastmod` history; category sitemap matches the live taxonomy; location-page volume is far below doorway-page-risk thresholds.

**Key findings:** Duplicate/competing location pages cannibalize the canonical location pages for Brooklyn, Old Bridge, and NJ-overall (High). The Staten Island hub is missing from the sitemap with a conflicting canonical (Medium). `local-sitemap.xml` is a single-entity KML file, not an index of the 7 secondary towns (Medium). The `.kml` sitemap entry may confuse manual reviewers (Low).

*Full detail: `findings/sitemap.md`*

## Performance / Core Web Vitals (60/100 — lab estimate only, no field data)

**What works:** LiteSpeed full-page cache active with gzip; non-render-blocking CSS delivery pattern; combined/deferred JS; `preload_check.py` scored 100/100 on modern navigation hints; sane cache-control headers.

**Key findings:** A render-blocking jQuery core script loads on every page (High). The LCP-candidate hero image is lazy-loaded via JS swap despite carrying `fetchpriority="high"`, defeating the hint entirely (High). An oversized 87KB inline "critical CSS" block (Medium). Homepage images mostly missing intrinsic width/height (Medium). Low WebP/AVIF adoption (Medium). Unverified third-party embed cost — YouTube iframe and Trustindex widget (Medium). No CrUX or working lab tooling was available in this environment, so all figures are structural estimates (Informational).

*Full detail: `findings/performance.md`*

## Visual & Mobile (58/100 — screenshots not obtainable in this environment)

**What works:** Correct responsive viewport meta tag on every page checked; phone number and "FREE ESTIMATE" CTA present in the global nav (structurally above the fold); exactly one H1 per page; hero images carry explicit dimensions.

**Key findings:** Screenshots could not be captured due to a proxy-level TLS/connection issue specific to Chromium in this sandbox — visual verification is incomplete and should be re-run (High). The mobile hamburger menu toggle appears under the 48x48px touch-target guideline (Medium). A placeholder-style construction emoji sits in a location page H1 (Low). The location page `<title>` has a "Saten Island" typo (Low).

*Full detail: `findings/visual.md`*

## AI Search Readiness / GEO (58/100)

**What works:** All sampled pages are server-rendered and fully accessible to non-JS AI crawlers; robots.txt doesn't block any AI crawler; `BlogPosting` schema with dates and author present on every post; broad `sameAs` entity signals; proper heading hierarchy; genuinely quotable factual statistics; one post already uses a "TL;DR" pattern.

**Key findings:** The FAQ page — the single most template-matched page type for AI/PAA pickup — has no `FAQPage` schema and its questions aren't marked up as headings (High). No `llms.txt` file exists (Medium). Blog paragraphs are fragmented well below the optimal citation length, with no self-contained answer blocks (Medium). Headings are declarative rather than question-phrased (Medium). Zero outbound citations to authoritative sources anywhere (Medium). robots.txt is silent rather than explicit on AI crawlers (Low). No comparison/data tables for inherently tabular facts (Low).

*Full detail: `findings/geo.md`*

## Local SEO (52/100)

**What works:** Dedicated location pages exist for every stated market; genuine, actively-reviewed Trustindex/Google integration with healthy recency; internally-consistent visible NAP on the homepage/contact footer; full nav coverage of all location pages.

**Key findings:** The Staten Island hub's canonical points to the homepage and it's missing from the sitemap (Critical). The sitewide schema `streetAddress` bug (Critical). Undisclosed Brooklyn/Freehold addresses in hidden schema (Critical). Only 2 of 8 location pages carry any `LocalBusiness` schema (High). Orphan landing pages create cannibalization/duplicate-NAP risk (High). NJ town pages are only ~19-33% unique content after normalizing town names (Medium). Location pages use generic city-level map embeds rather than a verified GBP pin (Medium).

*Full detail: `findings/local.md`*

## Search Experience Optimization / SXO (41/100)

**What works:** The Brooklyn location page proves the CMS/theme can produce a fully SERP-aligned Local Page; a shared testimonial widget gives a consistent baseline; CTAs are present almost everywhere; the `/locations/` hub architecture structurally matches what Google rewards; active content maintenance is evident.

**Key findings:** Three pages carry `BlogPosting` schema for transactional local-service queries — the most severe page-type mismatch in the audit (Critical). Sitewide absence of `LocalBusiness` schema, present on only 1 of 16 pages checked (Critical). The commercial roofing page fails the NJ property-manager persona at 31/100 — the weakest persona score found (Critical). The gutter installation page is ~7x thinner than the SERP norm (High). The Brooklyn query cluster is cannibalized across three internal pages (High). No GAF/BBB/manufacturer certification badges anywhere despite being the top recurring competitor trust signal (Medium). The Staten Island title typo damages trust at the highest-intent moment (Medium).

*Full detail: `findings/sxo.md`*

## Content Clustering & Strategy (38/100)

**What works:** A 5-category taxonomy maps reasonably well to funnel stages; genuine contextual blog-to-blog links already exist in one category; a strong pillar candidate was recently refreshed; the service/location destination pages for a hub-and-spoke rebuild already exist.

**Key findings:** No true pillar pages exist — category archives function only as thin excerpt lists (High). 68% of blog posts (13 of 19) are unreachable from the main `/blog/` index, which hard-caps at 6 posts with no pagination (High). Blog-to-service links are template navigation, not contextual hub-spoke CTAs (High). One post is orphaned from the category system and blog index entirely (Medium). Major content gaps exist versus a full local roofing content strategy — no insurance-claims, warranty-comparison, commercial, or NJ-town-specific content (Medium). Cannibalization risk between two cost-focused posts (Low).

*Full detail: `findings/cluster.md`*

## Backlinks & Domain Authority (40/100 — data-confidence-capped, Tier 0 only)

**What works:** The domain is present in the Common Crawl web graph and clears the ranking-inclusion threshold; no spam/toxic-link signals found in any available data source; outbound social citations are real and consistent.

**Key findings:** Referring-domain count, Domain Authority, and Spam Score are completely unmeasured at this data tier — this is a data gap, not a clean bill of health (High). Domain registration heritage could not be verified due to sandbox network restrictions (Medium). Only 4 inbound-link candidates were identifiable, all owned social profiles rather than third-party editorial links (Medium).

*Full detail: `findings/backlinks.md`*

---

## Cross-Cutting Pattern

The single most consequential issue in this audit is not any one category's top finding — it's that **the same five orphan landing pages and the same schema/NAP defects were independently flagged by 6-9 of the 11 specialist audits.** This convergence (Technical, Sitemap, Content, Local, SXO, and Cluster all separately identified the Brooklyn/Old Bridge/NJ cannibalization; Schema, Local, and SXO all separately flagged the missing `LocalBusiness` schema and NAP defects) is strong evidence these are the highest-leverage fixes available: resolving the orphan-page consolidation and the schema/NAP cleanup in Phase 1 will move the needle across Technical, Content, Sitemap, Local, and SXO scores simultaneously.

See `ACTION-PLAN.md` for the phased roadmap and `audit-data.json` for the structured data backing this report.
