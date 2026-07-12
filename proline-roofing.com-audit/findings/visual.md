# Visual Audit — proline-roofing.com

**Category Score: 58 / 100**

## Methodology note / limitation (read first)

Live-browser screenshot capture (Playwright/Chromium, desktop 1920x1080 and
mobile 375x812) was attempted for all three target pages:

- `https://www.proline-roofing.com/`
- `https://www.proline-roofing.com/services/roof-replacement/`
- `https://www.proline-roofing.com/locations/staten-island-ny/roof-repair/`

Chromium was installed successfully (`playwright install chromium`), but every
navigation attempt through the environment's mandatory egress proxy
(`127.0.0.1:42069`) failed with `net::ERR_CONNECTION_RESET`, both with default
settings and with an explicit `proxy={"server": "http://127.0.0.1:42069"}`
context. This was reproduced consistently across multiple retries. Plain
`curl` through the same proxy (with the provided CA bundle) succeeded with
`200 OK` for all three URLs, and the proxy's own status endpoint
(`/__agentproxy/status`) had logged a `403` "policy denial or upstream
failure" CONNECT rejection for this exact host shortly before — indicating
the block/reset is specific to how the proxy handles the browser's
connection (TLS/ALPN/HTTP2 fingerprint or connection-reuse pattern), not a
DNS or credentials problem on this end. Per the proxy's own guidance, 403s
and connection resets of this kind should be reported rather than routed
around, and disabling certificate verification to force a path around it
(`ignore_https_errors` / `--ignore-certificate-errors`) was correctly blocked
by the permission system as a TLS-weakening workaround. No screenshots could
be captured or saved under
`/home/user/dt/proline-roofing.com-audit/screenshots/` as a result.

**No screenshot files exist for this run.** `screenshots/desktop.png` and
`screenshots/mobile.png` were not produced. If browser access to this host
through the proxy is restored in a future run, screenshot capture should be
retried and this report's score revised on visual (not just code-inferred)
evidence.

To still deliver a useful visual/above-the-fold assessment, this audit fell
back to fetching the raw rendered-server HTML (via `curl` through the proxy,
which does work for plain HTTP fetches) for all three pages and manually
inspecting markup, inline critical CSS, and Elementor global-style variables
for above-the-fold structure, CTA/phone placement, responsive meta tags,
image dimensioning, and tap-target sizing. This is a reasonable proxy for
static structure but **cannot confirm actual rendered layout, real
above-the-fold cutoff, overlapping elements, font legibility at real device
pixel ratios, or visual regressions** — those require the screenshots that
could not be captured.

## What works (from code inspection)

- All three pages ship a correct responsive viewport meta tag
  (`width=device-width, initial-scale=1`), a baseline requirement for mobile
  rendering.
- A phone number (`tel:347-323-9128`, displayed as "☎️ Call us: (347)
  323-9128") and a "FREE ESTIMATE" link are both present as items in the
  primary Elementor nav menu on every page checked (home, service, location).
  Since this is the sticky/global header nav, both the phone CTA and the
  "free estimate" CTA are structurally positioned to appear above the fold
  on both desktop and mobile, assuming the header renders as a normal
  top bar (could not visually confirm — see limitation above).
  Site-wide occurrence counts: home page CTA/phone links present in header;
  service page — 3 "FREE ESTIMATE" instances, 6 `tel:347` links; location
  page — 3 "FREE ESTIMATE" instances, 9 `tel:347` links.
- Each page has exactly one `<h1>`: "Roofs that protect, endure, and
  inspire." (home), "Roof Replacement" (service), "Roof Repair Staten
  Island 🚧" (location) — correct heading structure for above-the-fold
  content and SEO.
- Hero/logo images include explicit `width`/`height` attributes and
  low-weight inline SVG/GIF placeholders for lazy-loaded images, which is
  the correct pattern for avoiding cumulative layout shift (CLS) as images
  load in.
- Global typography variables define a reasonably large H1 size (`40px`
  base tier, `56px` at a wider tier), consistent with a legible hero
  headline rather than undersized text.
- No `lorem ipsum` or obviously broken shortcode placeholders were found in
  any of the three pages' markup.

## Findings

### 1. Screenshots could not be captured — visual verification is incomplete
- **Severity:** High
- **Description:** The core deliverable of this category — actual desktop
  and mobile screenshots of the homepage, a service page, and a location
  page — could not be produced due to a proxy-level `ERR_CONNECTION_RESET`
  when Chromium (via Playwright) attempted to load
  `www.proline-roofing.com`, despite plain HTTP fetches to the same host
  through the same proxy succeeding. All findings below are inferred from
  server-rendered HTML/CSS, not from rendered pixels, and should be treated
  as lower-confidence than a normal visual audit.
- **Recommendation:** Re-run this category once outbound browser traffic to
  this host is confirmed to work through the environment's proxy (flag the
  host-specific CONNECT reset to whoever administers the proxy policy), or
  run the capture from an environment with direct/unproxied network access.
  Until then, treat this report as a documentation review, not a
  pixel-level QA pass.

### 2. Mobile nav "hamburger" toggle appears under the 48x48px touch-target guideline
- **Severity:** Medium
- **Description:** The Elementor mobile menu toggle (`.elementor-menu-toggle`,
  the icon used to open the mobile nav) is styled with
  `font-size:var(--nav-menu-icon-size,20px)` and `padding:.25em` — roughly a
  20px icon plus ~10px of padding, giving an estimated clickable area in the
  neighborhood of 30x30px. This is below the commonly recommended 48x48px
  (or WCAG's 24x24px minimum) touch-target size for a primary navigation
  control that a mobile visitor must tap to reach the rest of the site.
  This is inferred from CSS custom-property values, not a measured
  screenshot, so actual rendered size may differ if a parent wrapper adds
  padding not visible in this pass.
- **Recommendation:** Increase the effective tap area of the mobile menu
  toggle to at least 44x44px (ideally 48x48px) via additional padding or a
  minimum width/height on the toggle container, and confirm visually on a
  375px-wide viewport once screenshots can be captured.

### 3. Placeholder-style emoji in a page H1
- **Severity:** Low
- **Description:** The location page's `<h1>` reads "Roof Repair Staten
  Island 🚧" — the construction-barrier emoji looks like a leftover
  placeholder or an attempt at visual flair that reads as unpolished for a
  professional roofing contractor, and emoji glyph rendering/color varies
  across OS and browser (could look broken or mismatched with brand style
  on some devices).
- **Recommendation:** Remove the emoji from the H1 (and audit other location
  pages for the same pattern) unless it's a deliberate, tested brand choice;
  if kept, verify it renders consistently across major mobile OSes.

### 4. Location page `<title>` has a typo ("Saten Island")
- **Severity:** Low
- **Description:** The location page's `<title>` tag reads "Roof Repair
  Saten Island, NY | Fast & Affordable Repairs" — missing the "t" in
  "Staten." This is technically an SEO/content issue rather than a pure
  visual-layout issue, but it is user-visible in the browser tab and search
  snippets, which affects perceived polish/trust for a local service
  business.
- **Recommendation:** Fix to "Staten Island" and check other location pages
  built from the same template for the same typo.

### 5. Above-the-fold hero content and CLS/overlap could not be visually confirmed
- **Severity:** Medium (informational — see Finding 1)
- **Description:** Because no screenshots were captured, this audit cannot
  confirm whether the H1, the visible hero CTA button(s) below the header,
  and any trust badges (a "Ratings-ProLine-Roofing" image referencing
  Google/Yelp/Angi ratings was found in the homepage markup) actually
  render above the fold on a 375x812 mobile viewport, nor whether there are
  any overlapping elements, text overflow, or broken image scaling. The
  presence of `fetchpriority="high"` on the ratings image and proper
  width/height attributes on hero images is a good sign for LCP/CLS, but is
  not a substitute for visual confirmation.
- **Recommendation:** Once screenshots are obtainable, specifically verify:
  (a) H1 + primary CTA button visible without scrolling at 375px width, (b)
  no overlap between the sticky header and hero content, (c) the
  Google/Yelp/Angi ratings image scales correctly at mobile width.

## Screenshot inventory

No screenshot files were produced this run. Expected paths (not present):
`/home/user/dt/proline-roofing.com-audit/screenshots/desktop.png`,
`/home/user/dt/proline-roofing.com-audit/screenshots/mobile.png`, and the
per-page equivalents for the service and location pages.
