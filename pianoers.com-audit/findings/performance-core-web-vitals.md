# Performance (Core Web Vitals) — 65/100

## What works
- Homepage HTML payload is lightweight (~66KB)
- Static server-rendered HTML (Ghost/Caddy), no client-side rendering framework or SPA hydration delay
- Lazy-loading (loading="lazy") is used on the majority of in-article images (13/20 sampled)

## Findings

### [Info] No field or lab Core Web Vitals data — estimate only
This audit ran without PageSpeed Insights/CrUX API credentials and without a working headless-Chromium pipeline in this sandbox, so LCP/INP/CLS could not be measured directly. The score below is a heuristic estimate based on render-blocking resource count only, not real user or lab timing data.

**Recommendation:** Run scripts/pagespeed_check.py or PageSpeed Insights manually with a Google API key for real LCP/INP/CLS numbers.

### [Medium] 5 render-blocking scripts and 2 blocking stylesheets in <head>
Homepage <head> loads 5 scripts without async/defer (Ghost portal.min.js, sodo-search.min.js, cards.min.js, comment-counts.min.js, ghost-stats.min.js) plus 2 blocking stylesheets, which can delay First Contentful Paint.

**Recommendation:** Add defer to non-critical scripts (comment-counts, ghost-stats, sodo-search) so they don't block initial render.

### [Low] Homepage thumbnail images not lazy-loaded
The 8 card-thumbnail images sampled on the homepage lack loading="lazy", unlike in-article images elsewhere on the site.

**Recommendation:** Add loading="lazy" to below-the-fold homepage thumbnails; leave the first 1-2 above-the-fold images eager.
