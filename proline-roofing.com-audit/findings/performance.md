# Performance (Core Web Vitals) — proline-roofing.com

## Category Score: 60 / 100

## Method & Limitations (read first)

- **No CrUX/PSI field data available.** `google_auth.py --check` confirms no Google API
  credentials are configured. `pagespeed_check.py --psi-only` returned
  `PSI rate limit exceeded (240 QPM / 25,000 QPD)` on the unauthenticated public quota, and
  `--crux-only` returned `CrUX API requires an API key`. Real 75th-percentile LCP/INP/CLS
  values for actual visitors are **not available** for this audit.
- **No Chrome-based lab run was possible in this sandbox.** Both `npx lighthouse` (against
  the Playwright-bundled Chromium at `/opt/pw-browsers/chromium-1194`) and `render_page.py
  --mode always` (Playwright navigation) failed to load the live site:
  Lighthouse reported *"Chrome prevented page load with an interstitial"* and Playwright
  reported `net::ERR_CONNECTION_RESET`. Direct `--dump-dom` runs showed repeated
  `SSL error code 1, net_error -202/-101` handshake failures. This is because the sandbox's
  outbound-HTTPS agent proxy re-terminates TLS with a custom CA that plain HTTP clients
  (curl, Python `requests`/`httpx`) trust via `SSL_CERT_FILE`/`REQUESTS_CA_BUNDLE`, but
  Chromium's own NSS trust store does not trust for this host in this environment. Plain
  HTTP fetches (curl, `render_page.py --mode never`) worked fine and returned real `200`
  responses with real headers.
- **Every measurement below is therefore a static/structural estimate** derived from: raw
  HTML source of 6 pages, HTTP response headers, `preload_check.py` (regex/header analysis,
  no browser needed), and direct `curl` HEAD/GET requests against key assets (CSS/JS bundle,
  a sample image). No millisecond-level LCP/INP/CLS numbers were measured. Treat all
  pass/fail calls as **estimated risk levels**, not measured Lighthouse scores.
- Pages analyzed: homepage (`/`), 3 service pages (`/services/residential-roofing/`,
  `/services/roof-repair/`, `/services/commercial-roofing/`), 2 location pages
  (`/locations/brooklyn-ny/`, `/locations/new-jersey/newark/`).

## What Works

- **LiteSpeed full-page cache is active and hitting.** Homepage returned
  `x-litespeed-cache: hit` with gzip (`content-encoding: gzip`, `vary: Accept-Encoding`) and
  a fast total response time (~0.3s including TLS handshake) — TTFB for cached HTML is not a
  concern here.
- **CSS delivery uses a non-render-blocking pattern.** All page CSS is combined by LiteSpeed
  into a single bundle and loaded via `<link rel="preload" as="style"
  onload="this.rel='stylesheet'">` (the loadCSS pattern), avoiding a classic render-blocking
  `<link rel="stylesheet">`. The bundle carries `cache-control: public, max-age=604800` (7
  days).
- **JS is combined/minified and mostly deferred.** LiteSpeed combines optimizable scripts
  into one bundle loaded with `defer`; third-party tags observed (GTM Kit engagement
  events, Trustindex reviews widget) are also loaded with `defer`/async strategy attributes.
- **Modern LCP/navigation hints are present.** `preload_check.py` scored the homepage
  **100/100**: an inline `<script type="speculationrules">` block (prefetch), a
  `fetchpriority="high"` hint on 2 elements, an active `<link rel="preload">`, no
  `Cache-Control: no-store` / `unload` bfcache killers, and no deprecated `rel=prerender`.
  This is unusually modern for a small-business WordPress/Elementor site.
- **No literal Elementor/wp-content CSS or JS file sprawl in markup.** LiteSpeed's CSS/JS
  optimizer has combined per-plugin files into single bundles, so the classic
  "20+ individual Elementor/plugin `<link>`/`<script>` tags" anti-pattern is not visible in
  the delivered HTML (though see finding on bundle size below — combination hid the count
  but not the byte weight).
- Static asset caching headers are sane: sample hero image and the LiteSpeed CSS/JS bundles
  all return `cache-control: public, max-age=604800`.

## Findings

### 1. Render-blocking jQuery core script on every page
**Severity: High**
`<script id="jquery-core-js" src=".../wp-includes/js/jquery/jquery.min.js?ver=3.7.1">` is
present with no `async` or `defer` attribute on the homepage and all 5 sampled inner pages
(87.5KB per the `content-length` header). This is a classic synchronous, parser-blocking
script sitting ahead of LiteSpeed's own deferred bundle, and it is the one
consistently-render-blocking script found on every template.
**Recommendation:** Enable LiteSpeed Cache's "Load JQuery Remotely"/defer option for core
jQuery, or move the enqueue to `wp_enqueue_script` with `strategy => 'defer'` (WP 6.3+ script
loading strategies). Confirm no inline scripts depend on jQuery being synchronously available
before testing.

### 2. Oversized inline "critical CSS" block
**Severity: Medium**
Every page ships an inline `<style id="litespeed-ccss">` block that is **87KB** on the
homepage alone (present on all 6 sampled pages). Critical-path CSS is meant to cover only
above-the-fold styles (typically under ~14KB, one TCP round trip); an 87KB inline block
suggests LiteSpeed's automatic Critical CSS generator is capturing near-full-page CSS rather
than a true above-the-fold subset. This adds parse/style-recalc cost to every HTML response
before first paint and can be a meaningful LCP/FCP tax, especially on mobile CPUs.
**Recommendation:** Regenerate Critical CSS scoped tighter to the actual above-the-fold
viewport (LiteSpeed Cache → Page Optimization → CSS Settings → re-run Critical CSS
generation per template/URL group), or hand-author a smaller critical CSS for the
homepage/service/location templates.

### 3. LCP-candidate hero image is lazy-loaded via JS swap while also marked fetchpriority="high"
**Severity: High**
On the homepage, the "Ratings-ProLine-Roofing" image (likely the LCP element in the hero
area) is rendered as `<img data-lazyloaded="1" src="data:image/svg+xml;base64,..."
fetchpriority="high" data-src="https://.../Ratings-ProLine-Roofing-768x120.png" ...>`. The
real image URL only exists in `data-src` and requires LiteSpeed's lazy-load JS to run before
the browser ever discovers the real source — this defeats the purpose of
`fetchpriority="high"` and the preload hint, because the browser's preload scanner cannot see
the real image URL in the initial HTML. The same pattern applies to the below-the-fold
residential-roofing photo (`qn-t-py17vc-768x526.jpg`).
**Recommendation:** Exclude the true LCP candidate image (whichever renders largest
above-the-fold on mobile viewport) from LiteSpeed's lazy-load feature (LiteSpeed Cache →
Page Optimization → Media → "Excludes" list), and keep the real `src`/`srcset` inline with
`fetchpriority="high"` so the browser can start the fetch immediately, before any JS runs.

### 4. Homepage images mostly missing intrinsic width/height, relying on CSS sizing
**Severity: Medium**
30 of 40 `<img>` tags on the homepage rely on `style="width:100%; height:100%;
object-fit:cover"` rather than HTML `width`/`height` attributes (or an equivalent
`aspect-ratio` CSS rule). Without a reserved intrinsic size, these images can cause layout
shift as they load, particularly on the initial viewport before any container CSS has
applied. By contrast, the sampled service pages (3 of 9 images missing dimensions) and the
Brooklyn/Newark location pages (0 of 20 and 0 of 6 missing) are meaningfully better-behaved,
suggesting the homepage template is the primary CLS risk.
**Recommendation:** Add explicit `width`/`height` attributes (or `aspect-ratio` in CSS) to
every homepage `<img>`, matching the intrinsic dimensions of the source file, so the browser
reserves layout space before the image downloads.

### 5. Low adoption of modern image formats (WebP/AVIF)
**Severity: Medium**
Across every sampled page, only ~2 image references use `.webp`/`.avif` (icons/favicons)
while the bulk of content images (7–38 per page depending on template) are `.jpg`/`.png`.
Uploads are WordPress default sizes (e.g. `-768x526.jpg`, `-300x68.png`) with no evidence of
a modern-format pipeline (no `<picture>`/`srcset` entries pointing to `.webp`/`.avif`
variants were found).
**Recommendation:** Enable LiteSpeed Cache's or a dedicated plugin's (ShortPixel, Imagify,
WP Rocket Imagify, etc.) automatic WebP/AVIF generation with `<picture>` fallback, and
re-encode existing hero/gallery JPEGs. Typical savings are 25–50% in transferred bytes per
image, which directly reduces LCP resource-load-time on the largest images.

### 6. Heavy/uncertain third-party embeds: YouTube iframe + Trustindex reviews widget
**Severity: Medium**
The homepage and the Brooklyn location page both reference `www.youtube.com` (a video
embed) and every sampled page loads `cdn.trustindex.io/loader.js` for the Google-reviews
carousel seen in the extracted page text ("Posted on Google... Trustindex verifies..."). YouTube
iframes and third-party review widgets are common INP/main-thread offenders (they inject their
own DOM, CSS, and often synchronous XHR/analytics calls) but this could not be measured
directly in this sandbox (no working browser). The Trustindex script does carry `defer`,
which is good practice, but its downstream network/DOM cost is unverified here.
**Recommendation:** Verify the YouTube embed uses a lightweight facade (thumbnail + click-to-
load, e.g. `lite-youtube-embed`) rather than an eager iframe; confirm Trustindex's actual
main-thread cost with a real Lighthouse trace (from an unrestricted environment) since it is
the largest unverified third-party risk on this site. Consider deferring the reviews carousel
render until it scrolls into view (`IntersectionObserver`) rather than loading at initial
paint.

### 7. Combined LiteSpeed CSS/JS bundles are large in absolute bytes
**Severity: Low**
The single combined CSS bundle is 752,712 bytes (uncompressed; served with
`content-encoding` compression at the edge) and the combined JS bundle is 254,245 bytes.
Combining/minifying is good practice and avoids connection-count overhead, but a
three-quarter-megabyte CSS file (likely including every Elementor widget's CSS regardless of
whether that widget is used on the current page) still has to be downloaded, parsed, and
retained in memory on every page view, and contributes to the oversized critical-CSS problem
in Finding #2.
**Recommendation:** Investigate LiteSpeed's CSS "Unique CSS" / per-post-type combination
settings so unused Elementor widget CSS isn't bundled into every page's asset; consider
splitting the bundle by template type (home vs. service vs. location) instead of one
sitewide combination.

### 8. INP cannot be measured or estimated with confidence from static analysis
**Severity: Informational**
FID has been fully removed from Chrome tooling since September 2024; INP is the only
interactivity metric that matters now. Because no browser-based trace could be captured in
this environment and no CrUX field data is available, this audit has **no INP signal at
all** — not even a lab-based Total Blocking Time proxy. The 254KB main JS bundle size and the
presence of jQuery + GTM Kit + Trustindex are risk indicators only, not measurements.
**Recommendation:** Re-run this audit's Performance category from an environment with either
(a) a working Chrome/Lighthouse install that can reach the live site, or (b) a configured
`GOOGLE_API_KEY` so CrUX field INP/LCP/CLS at the 75th percentile can be pulled directly —
this is the single highest-priority follow-up to turn these estimates into measured pass/fail
verdicts against the Good/Needs-Improvement/Poor thresholds.

## Estimated Core Web Vitals Status (lab-inference only — not measured)

| Metric | Homepage | Service pages | Location pages | Confidence |
|---|---|---|---|---|
| LCP | Needs Improvement (hero image lazy-load conflict + 87KB critical CSS) | Likely Good (smaller payload, no lazy-load conflict observed) | Likely Good (Brooklyn) / Good (Newark) | Low — structural inference only |
| INP | Unknown | Unknown | Unknown | None — no measurement possible |
| CLS | Needs Improvement (75% of images missing intrinsic dimensions) | Likely Good (only ~33% missing dimensions) | Good (0% missing dimensions observed) | Low-Medium — structural inference only |

## Structured Data (for audit-data.json)

```json
{
  "category": "performance",
  "score": 60,
  "field_data_available": false,
  "lab_tooling_available": false,
  "measurement_method": "static_html_and_header_analysis",
  "limitations": [
    "No Google API credentials configured; PSI unauthenticated quota rate-limited; CrUX requires API key",
    "Chrome/Playwright could not complete TLS handshake to the live site inside this sandbox (agent proxy CA not trusted by Chromium NSS store); no Lighthouse or Playwright trace was obtainable",
    "All findings are derived from raw HTML source, HTTP response headers, and preload_check.py static analysis, not measured paint timing"
  ],
  "pages_tested": [
    "https://www.proline-roofing.com/",
    "https://www.proline-roofing.com/services/residential-roofing/",
    "https://www.proline-roofing.com/services/roof-repair/",
    "https://www.proline-roofing.com/services/commercial-roofing/",
    "https://www.proline-roofing.com/locations/brooklyn-ny/",
    "https://www.proline-roofing.com/locations/new-jersey/newark/"
  ],
  "what_works": [
    "LiteSpeed page cache HIT + gzip on homepage",
    "Non-render-blocking CSS delivery via preload+onload swap pattern",
    "Combined/deferred JS bundle for most scripts",
    "preload_check.py score 100/100 (speculation rules, fetchpriority=high, preload hint, no bfcache killers, no deprecated prerender)",
    "7-day cache-control on static assets"
  ],
  "findings": [
    {"title": "Render-blocking jQuery core script on every page", "severity": "high", "recommendation": "Defer or remotely-load jQuery core so it no longer blocks the parser"},
    {"title": "Oversized inline critical CSS (87KB)", "severity": "medium", "recommendation": "Regenerate LiteSpeed Critical CSS scoped to true above-the-fold content per template"},
    {"title": "LCP hero image lazy-loaded via JS swap despite fetchpriority=high", "severity": "high", "recommendation": "Exclude the true LCP image from LiteSpeed lazy-load; keep real src/srcset inline"},
    {"title": "Homepage images missing intrinsic width/height", "severity": "medium", "recommendation": "Add width/height or aspect-ratio to all homepage <img> tags"},
    {"title": "Low WebP/AVIF adoption", "severity": "medium", "recommendation": "Enable automatic WebP/AVIF generation with picture-element fallback"},
    {"title": "Unverified third-party embed cost (YouTube, Trustindex)", "severity": "medium", "recommendation": "Use a facade/lazy pattern for YouTube; verify Trustindex main-thread cost with a real trace"},
    {"title": "Large absolute-byte combined CSS/JS bundles", "severity": "low", "recommendation": "Split/trim combined bundles so unused Elementor widget CSS isn't shipped sitewide"},
    {"title": "INP has no measurable signal in this audit", "severity": "informational", "recommendation": "Re-run with working Chrome/Lighthouse or a configured GOOGLE_API_KEY to obtain real CrUX/Lighthouse INP data"}
  ]
}
```
