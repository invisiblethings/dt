# SEO Action Plan — proline-roofing.com

Prioritized by severity (Critical > High > Medium > Low). Category tags in parentheses map to the full findings in `findings/*.md`.

## Critical (fix immediately)

1. **Remove the sitewide fake `Product`/`AggregateRating` (4.9★/97) schema block** from every page and attach a real `AggregateRating` directly to the `RoofingContractor` entity instead, scoped only to pages where it's contextually appropriate. *(Schema, Technical, Local, SXO)*
2. **Fix the `streetAddress` field** in the main business schema — it currently holds the business name ("ProLine Roofing") instead of the real street address. *(Schema, Local)*
3. **Investigate the Brooklyn (225 Joralemon St) and Freehold (144 Tilton Dr) addresses** embedded in hidden page-level schema — confirm whether they're real, staffed, GBP-verified locations. If not, remove them; they currently appear nowhere in visible content and carry real policy risk. *(Local, Schema)*
4. **Fix the Staten Island hub page's canonical tag** — it currently points to the homepage despite the two pages sharing only ~12% text similarity, and add the page to the XML sitemap. This is the primary market's own page and is currently blocked from ranking on its own. *(Local, Sitemap, Technical)*
5. **Resolve the 5 orphan PPC landing pages** (`/brooklyn-roofing-lp/`, `/roofer-old-bridge-nj/`, `/roofing-services-nj/`, `/affordable-roofing-in-brooklyn-ny/`, `/asphalt-shingle-roofing-staten-island/`) — either 301-redirect each into its corresponding canonical `/locations/` or `/services/` page, or keep them live for active ad traffic with `noindex, follow` + a canonical pointing to the real page, and drop them from the sitemaps. *(Technical, Sitemap, Content, Local, SXO, Cluster)*
6. **Re-tag the 3 pages carrying `BlogPosting` schema on transactional local queries** (`roof-replacement-in-staten-island-made-easy`, `affordable-roofing-in-brooklyn-ny`, `asphalt-shingle-roofing-staten-island`) with `Service`/`RoofingContractor` schema, or fold their content into the correctly-typed page. *(SXO, Schema)*
7. **Build out the commercial-roofing page for the NJ property-manager persona** (currently scoring 31/100) — add case studies, bonding/insurance credentials, and warranty terms; remove the residential-framed copy ("Persistent Leaks Ruining Your Home?"). *(SXO, Content)*

## High (fix within 1 week)

8. Add security response headers (`Strict-Transport-Security`, `X-Content-Type-Options`, `Content-Security-Policy`, `X-Frame-Options`) via LiteSpeed config/`.htaccess`. *(Technical)*
9. Roll out consistent `RoofingContractor` + `areaServed` + `geo` schema to every location page using the Brooklyn page as the template. *(Schema, Local, SXO)*
10. Add `Service` schema (with `provider`, `serviceType`, `areaServed`) to all `/services/` pages. *(Schema, SXO)*
11. Fix the render-blocking jQuery core script (defer or remote-load) and exclude the true LCP hero image from lazy-loading so it can be discovered in initial HTML. *(Performance)*
12. Consolidate the three competing Brooklyn pages and the two competing Old Bridge pages into single authoritative pages, porting over the strongest conversion copy before redirecting. *(Content, Local, SXO, Sitemap)*
13. Add visible author bylines/bios and display the actual NY/NJ contractor license number in the site footer and on `/contact/`/`/faq/`. *(Content, GEO)*
14. Expand the gutter-installation page — currently ~7x thinner than the leading local competitor with zero location targeting. *(SXO)*
15. Add `FAQPage` schema to `/faq/` and convert the accordion questions into real `<h2>`/`<h3>` headings; expand thin answers to include actual numbers. *(GEO, Schema)*

## Medium (fix within 1 month)

16. Expand thin core service pages (`/services/`, `/services/residential-roofing/`, `/services/commercial-roofing/`, `/services/gutter-services/`) to 800+ words with material specs, process steps, and cost ranges. *(Content)*
17. Add materially more town-specific content to the NJ location pages (currently ~19-33% unique after normalizing town names) — local landmarks, permit notes, project photos, local testimonials. *(Local)*
18. Regenerate LiteSpeed's oversized 87KB inline critical-CSS block scoped to the true above-the-fold viewport. *(Performance)*
19. Add explicit `width`/`height` (or `aspect-ratio`) to homepage images missing intrinsic dimensions, and expand WebP/AVIF adoption sitewide. *(Performance)*
20. Publish an `/llms.txt` file and add explicit AI-crawler `Allow` directives (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) in `robots.txt`. *(GEO)*
21. Standardize the inconsistent `/locations/{state}/{city}/` URL taxonomy across all seven locations. *(Technical)*
22. Replace generic city-level Google Maps embeds with a real GBP place embed (or drop them) on location pages. *(Local)*
23. Build two content pillars — Roof Replacement Guide and Roofing Costs Guide — and restructure `/blog/` (currently hard-capped at 6 posts, hiding 68% of content) so every post is reachable. *(Cluster)*
24. Add hand-picked contextual internal links from blog posts to specific service subpages, replacing the generic 25-link nav menu as the only in-content link. *(Cluster, SXO)*
25. Add 2-4 outbound citations per long-form blog post and convert cost/lifespan data into comparison tables. *(GEO, Content)*
26. Vary the boilerplate testimonials/trust badges shown per page/location rather than reusing the same three verbatim everywhere. *(Content)*
27. Fix the duplicate/conflicting phone numbers shown together on the Clifton/Elizabeth/Freehold/Old Bridge/NJ-hub pages with explicit labeling. *(Content, Local)*
28. Verify and (if possible) surface any manufacturer/GAF/BBB certification badges — the top recurring competitor trust signal, currently absent everywhere on the site. *(SXO)*
29. Increase the mobile hamburger menu's tap target to at least 44x44px. *(Visual)*

## Low (backlog)

30. Install an IndexNow-compatible plugin so content updates push to Bing/Yandex immediately. *(Technical)*
31. Add 150-300 words of unique summary copy to the `/locations/` and `/services/` hub pages. *(Technical)*
32. Remove the duplicated "About Us" block on the homepage and verify the "Roofing Projects" stat counter renders for non-JS/crawler contexts. *(Content)*
33. Shorten sentence length across core pages/blog posts toward an 8th-9th grade reading level. *(Content)*
34. Fix the "Saten Island" title-tag typo and the construction-emoji in the location-page H1. *(Visual, SXO)*
35. Fix the `telePhone` schema property typo (should be `telephone`) on the Brooklyn location page. *(Schema)*
36. Assign the orphaned blog post (`5-types-of-roofing-you-should-consider`) to a category and include it in the Materials content cluster. *(Cluster)*
37. Sign up for the free Moz API and Bing Webmaster Tools to unlock real backlink/DA/spam-score data (currently unmeasured at Tier 0). *(Backlinks)*

## Ongoing / Monitoring

- Re-run PageSpeed Insights/Lighthouse and pull CrUX field data once Google API credentials are configured — all current Performance findings are structural estimates, not measurements.
- Capture desktop/mobile screenshots once browser access to the live site is confirmed working through this environment's proxy, to complete the Visual QA pass.
- Manually verify Google Business Profile primary category and confirm no duplicate/unverified GBP listings exist for the Brooklyn/Freehold addresses.
- Manually verify Tier-1 citation presence (Yelp, BBB, Angi, Thumbtack, Nextdoor) against the corrected canonical NAP once the schema fixes above are live.
- Monitor review velocity and institute an owner-response cadence on Google reviews.
- Establish a quarterly content-review cadence with genuine refreshes (updated pricing, current-year references), not cosmetic `dateModified` bumps.

---

*Backing data: `audit-data.json`. Full narrative: `FULL-AUDIT-REPORT.md`. Per-category detail: `findings/*.md`.*
