# Sitemap Architecture Audit — proline-roofing.com

**Category Score: 72 / 100**

## Methodology Note
`sitemap_index.xml` references 4 sub-sitemaps (post: 19, page: 49, category: 5, local: 1 = 74 URLs). The provided `crawled-urls.txt` (74 URLs) is the deduped union of these same 4 sitemaps, so a sitemap-vs-crawl diff produced zero discrepancies by construction. To find real gaps, each sub-sitemap was re-fetched and validated directly (XML well-formedness, HTTP status of all 74 `<loc>` values, lastmod sanity), and the live `/locations/` navigation and individual location pages were checked against sitemap membership and canonical tags.

## What Works
- All 5 sitemap files (`sitemap_index.xml`, `post-sitemap.xml`, `page-sitemap.xml`, `category-sitemap.xml`, `local-sitemap.xml`) are valid, well-formed XML (verified with `xmllint --noout`).
- All 74 URLs across all sitemaps return HTTP 200 with no redirects (`curl -L --max-redirs 0` check) — no dead links, no redirect chains needing cleanup.
- Well under the 50,000 URL per-file limit (74 total); a sitemap index is already correctly used even at this small scale.
- No `priority` or `changefreq` tags present anywhere — Rank Math already omits these deprecated/ignored tags, so there's nothing to strip.
- `lastmod` timestamps are realistic and varied (range from 2024-04-04 to 2026-07-09), not a suspicious "all-identical" batch-generated pattern — they track real edit history (e.g., homepage 2025-12-20, most recently touched page `brooklyn-roofing-lp/` 2026-07-09).
- `category-sitemap.xml`'s 5 entries (`category/roofing/`, `roofing-101`, `repairs-problem-solving`, `replacement`, `weather-roofing`) match the live taxonomy structure with no orphaned or missing categories.
- Location-page volume is low (roughly 9-12 location-related URLs total: `locations/`, `locations/new-jersey/`, 7 city pages, 2 service sub-pages). This is far below the 30-page WARNING threshold and 50-page HARD STOP for programmatic doorway-page risk — the site is not mass-producing thin city-swap pages at scale.

## Findings

### 1. Duplicate/competing location landing pages cannibalize the canonical location pages
**Severity:** High
**Description:** Multiple indexable, self-canonicalized, sitemap-included pages target the same city/state as the "real" `/locations/...` pages, creating direct keyword overlap instead of one canonical URL per location:
- Brooklyn is covered by three separate sitemapped pages: `/locations/brooklyn-ny/` (real location page), `/brooklyn-roofing-lp/` (title "Brooklyn #1 Roofing Company", clearly a PPC-style landing page — it is also the single most recently modified URL sitewide, lastmod 2026-07-09, matching the whole page-sitemap's lastmod), and `/affordable-roofing-in-brooklyn-ny/` (a post-sitemap entry also fully about Brooklyn roofing).
- Old Bridge, NJ is covered by both `/locations/new-jersey/old-bridge/` (lastmod 2025-05-21, actively maintained) and `/roofer-old-bridge-nj/` (lastmod 2024-11-25, stale, title "Top-Rated Roofer Old Bridge, NJ").
- New Jersey overall is covered by both `/locations/new-jersey/` (real hub) and `/roofing-services-nj/` (title "Top-Rated Roofer - New Jersey", a near-duplicate hub page).
All of these return 200, are `robots: index, follow`, and self-canonicalize (i.e., none defer to the "real" page), so Google must pick a winner among duplicates rather than being told which URL is canonical.
**Recommendation:** Pick one canonical URL per location (the `/locations/...` pages, since they're structurally organized and linked from the location hub). For each duplicate (`brooklyn-roofing-lp`, `affordable-roofing-in-brooklyn-ny`, `roofer-old-bridge-nj`, `roofing-services-nj`): either 301-redirect it to the canonical location page and remove it from the sitemap, or if it must stay live for active PPC campaigns, add `noindex` + canonical pointing to the true location page and exclude it from `page-sitemap.xml`/`post-sitemap.xml` (Rank Math: mark as "noindex" in the post edit screen so it's auto-excluded).

### 2. Home-base location page (`/locations/staten-island-ny/`) is missing from the sitemap and has a conflicting canonical tag
**Severity:** Medium
**Description:** `/locations/staten-island-ny/` is a real, live, 200-status page prominently linked from the `/locations/` hub navigation (alongside all 7 other city pages), and its `<meta name="robots">` says `index, follow` — yet it does not appear in `page-sitemap.xml` at all. Inspecting the page shows why: its `<link rel="canonical">` points to `https://www.proline-roofing.com/` (the homepage), not to itself. This is likely because the homepage is already Staten-Island-optimized (title "Roofing Staten Island | Free Estimates & Affordable Pricing"), so someone tried to de-duplicate it — but left the page indexable and nav-linked while excluding it from the sitemap, producing an inconsistent signal (crawlers may still find and index it via the nav link despite the sitemap omission and canonical pointing elsewhere).
**Recommendation:** Make the signals consistent. Either (a) 301-redirect `/locations/staten-island-ny/` to `/` and remove the nav link, since the homepage already serves this purpose, or (b) if the page should exist as the "home base" location entry to match the other 7 city pages structurally, self-canonicalize it, add it to `page-sitemap.xml`, and differentiate its content from the homepage. Don't leave an indexable, nav-linked page silently excluded from the sitemap with a canonical pointing elsewhere.

### 3. `local-sitemap.xml` is a single-entity KML file, not a location-page index — insufficient signal for a 7-town service area
**Severity:** Medium
**Description:** `local-sitemap.xml` contains exactly one `<url>`, pointing to `/locations.kml`. Fetching that KML shows it is Rank Math's Local SEO module output containing a single `<Placemark>` — the one registered NAP (Name/Address/Phone) entity for the Staten Island HQ (lat/long, phone, address). It is not, and was never intended to be, an index of the Brooklyn/Clifton/Elizabeth/Freehold/Jersey City/Newark/Old Bridge location pages (those already live correctly in `page-sitemap.xml`). However, this means there is no structured geo/local-business signal at all for the 7 secondary service-area towns — only the HQ address is machine-readable via KML/LocalBusiness data. For a multi-location Local Service business, this is a real gap, just not a "sitemap" defect per se.
**Recommendation:** This is not fixable by adding more URLs to `local-sitemap.xml` (that file's schema is for one business entity). Instead: (a) confirm each of the 7 city location pages carries its own `LocalBusiness`/`Service`/`areaServed` structured data (separate from the sitemap — flag for the Schema/Structured Data audit), and (b) if multi-location NAP consistency matters for local pack rankings, consider a dedicated multi-location plugin/GBP location group rather than relying on Rank Math's single-entity Local SEO module.

### 4. `/locations.kml` sitemap entry may confuse sitemap consumers
**Severity:** Low
**Description:** `local-sitemap.xml` lists a `.kml` (Google Earth/Maps geo format) file as if it were a regular sitemap `<url>` entry with `lastmod`. This is valid per Rank Math's design and doesn't break parsing, but it's easy to mistake for a broken/irrelevant URL during manual sitemap review since it isn't an HTML page.
**Recommendation:** No action required structurally; note it in internal documentation so future audits don't flag it as an erroneous inclusion.

### 5. No deprecated `priority`/`changefreq` tags present
**Severity:** Info
**Description:** Confirmed absent across all sitemaps (Google ignores both regardless).
**Recommendation:** None needed — nothing to remove.

### 6. All 74 sitemap URLs verified healthy
**Severity:** Info
**Description:** 0 non-200 responses, 0 redirects among all sitemap URLs (post/page/category/local combined).
**Recommendation:** None needed. Re-run this status check periodically (e.g., monthly) since 2 of the flagged duplicate landing pages (Finding #1) are being actively edited and could drift.

## Quality Gate Assessment
- **30+ location pages WARNING:** Not triggered — only ~9-12 location-related URLs sitewide.
- **50+ location pages HARD STOP:** Not triggered.
- **One canonical URL per real location:** FAILED for Brooklyn, Old Bridge, and New Jersey-overall (Finding #1) — each has 2-3 competing indexable/sitemapped URLs instead of one canonical page. This is the primary quality-gate issue for this audit, distinct from raw volume: the risk here is keyword cannibalization and diluted authority per location rather than mass doorway-page thinness.

## Files Referenced
- /home/user/dt/proline-roofing.com-audit/sitemap_index.xml
- /home/user/dt/proline-roofing.com-audit/post-sitemap.xml
- /home/user/dt/proline-roofing.com-audit/page-sitemap.xml
- /home/user/dt/proline-roofing.com-audit/category-sitemap.xml
- /home/user/dt/proline-roofing.com-audit/local-sitemap.xml
- /home/user/dt/proline-roofing.com-audit/sitemap-urls.txt (deduped list extracted from all 4 sub-sitemaps)
- /home/user/dt/proline-roofing.com-audit/status-check.txt (HTTP status of all 74 sitemap URLs)
- /home/user/dt/proline-roofing.com-audit/crawled-urls.txt
