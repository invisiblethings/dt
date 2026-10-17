# Technical SEO audit: pianoers.com (7 Oct 2026)

**Technical score: 76 / 100**

Scope: all 55 sitemap URLs (crawl/pages.json), 169 links (crawl/links.json), plus live header checks run on 7 Oct 2026. Read-only; nothing was changed.

Tooling note: the bundled `sitemap_discovery.py` helper failed ("URL safety validation failed", robots.txt could not be fetched safely) because of the proxy in this sandbox. I checked the sitemaps by hand instead (see Crawlability). The robots.txt declaration is valid because the sitemap it points to returns 200 and lists the right URLs.

## Category status

| Category | Status | Notes |
|---|---|---|
| Crawlability | Pass, minor issues | robots.txt and sitemaps fine; 1 internal 3xx link; AI-crawler rules are optional |
| Indexability | Pass, with decisions | Canonicals all self-referencing; no noindex anywhere; 8 pages with no meta description; 3 thin tag pages |
| Security | Weak | HTTPS + HSTS good; 5 of 5 other headers missing |
| URL structure | Pass | http->https, trailing slash and 404 all behave correctly; www is dead |
| Mobile | Pass | viewport present (checked on /best-digital-piano/); fuller mobile testing is in the performance audit |
| Core Web Vitals (source) | Not fully checked here | 7 external/deferred scripts on a post; see performance findings |
| Structured data | Pass | Article 42, FAQPage 11, Review 8, ItemList 3, Series 10, Person 5, WebSite 1; every post has JSON-LD |
| JS rendering | Pass with one risk | Server-rendered; affiliate rel added by JS |
| IndexNow | Not implemented | Optional |

## What works

- All 55 sitemap URLs return 200 with no redirects. Each has a self-referencing canonical that matches the URL exactly.
- No page carries a robots meta tag, so nothing is accidentally noindexed.
- robots.txt is clean: it blocks only Ghost admin/API paths (/ghost/, /email/, /members/api/comments/counts/, /r/, /webmentions/receive/, /.ghost/analytics/api/) and declares `https://pianoers.com/sitemap.xml`.
- The sitemap index (sitemap.xml, 632 bytes) lists pages, posts, authors and tags sub-sitemaps; all return 200.
- http://pianoers.com/about/ -> 308 -> https://pianoers.com/about/ in one hop. /yamaha-p-145-review (no slash) -> 301 -> with slash in one hop.
- Real 404s: /nonexistent-xyz/ and /tag/care/page/2/ return HTTP 404 with the styled error page (not soft 404s).
- HSTS present (max-age=31536000). No mixed content found: no http:// images or internal links in any of the 55 pages; no http:// resources in the /best-digital-piano/ HTML.
- Single-language `<html lang="en">`, no hreflang tags.
- RSS works at /rss/ (200, application/rss+xml, ~400 KB) and is auto-discovered via `<link rel="alternate">` in the page head.
- AMP is not used. /amp/ and /yamaha-p-145-review/amp/ 301 to the normal page (Ghost default). Nothing to fix.
- Homepage pagination is correct: /page/2/ has a self-canonical plus rel=prev / rel=next.
- Single H1 on every page except /privacy-policy/ (see Low).
- No duplicate titles across the 55 pages.

## Findings (ordered by severity)

| # | Severity | Finding | Evidence | Fix |
|---|---|---|---|---|
| 1 | High | Security headers missing: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options all absent. Only HSTS is set. | Response headers of / and /best-digital-piano/ list only alt-svc, cache-control, content-type, etag, strict-transport-security, vary, via (Caddy), x-ghost-analytics, x-powered-by. | Headers are set at the Caddy server, not in Ghost Admin, so ask whoever runs the server (or hosting support). Safe set to add: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Do CSP last and in Report-Only mode first, because Ghost Portal, GTM, Claspo and jsdelivr scripts would break under a strict policy. Also remove `x-powered-by: Express` (cosmetic). Not an SEO ranking factor, but a trust/hygiene item. |
| 2 | Medium | Affiliate links in the raw HTML have no rel attribute; rel="sponsored nofollow noopener" is added by JavaScript only. | Raw HTML of /best-digital-piano/: all 9 `<a href="https://amzn.to/...">` are `class="kg-btn kg-btn-accent"` with no rel. In the crawl, amzn.to links on /yamaha-p-145-review/ and /best-beginner-pianos/ do have rel (those pages were edited by hand); other pages have rel=None. theme assets/js/main.js step 4 adds rel to links in `.gh-content` that match the "affiliateDomains" theme setting. | Real risk, but small. Googlebot renders JS and will normally see the rel, so the main exposure is Bing, other crawlers, and any visit where JS fails or is slow. Fix at the source: in the post editor, click each Amazon button, open link settings is not available for rel in Ghost, so the reliable way is a Code Injection / HTML card with `rel="sponsored nofollow noopener"`, or batch-edit through the Admin API. Also confirm the theme setting "affiliateDomains" (Ghost Admin > Design > Customize) includes amzn.to, amazon.com, pianoforall/PFA paths. Note /PFA, /pianoforall, /pbp are same-domain redirects, so the JS cannot detect them as affiliate (see #4). |
| 3 | Medium | 8 pages have no meta description: /cookie-policy/, /contact/, /privacy-policy/, /acoustic-vs-digital-piano/, /how-to-tune-a-piano-a-simple-guide/, /tag/books/, /tag/practice/, /tag/jazz-piano/. | pages.json `desc` empty for these. | Ghost Admin > open the post/page/tag > Settings > Meta data. The two articles (acoustic-vs-digital, how-to-tune) matter most; write ~140-155 characters each. Legal pages and tags are low value. |
| 4 | Medium | Affiliate redirect paths /PFA, /pianoforall, /pbp are 302 (temporary) redirects, with no rel on most links, and are not blocked in robots.txt. | `curl -I`: /PFA -> 302 -> `https://931fcav7tfpgwl5fp4xmkyq6fe.hop.clickbank.net/?tid=pr` (lands on pianoforall.com). /pbp -> 302 -> `https://pianobypictures.gospelonthegopiano.com/copy-of-sms-fake-bfcm-recovery-angleeo4v4h9l?affiliate_id=4282845`. Links: /PFA used 11 times, /pianoforall 14 times (pianoforall-review has 16 links), /pbp 4 times. In pages.json most of these internal links have rel=None (a few only "noreferrer"). Where these redirects are configured was not checked (likely Ghost redirects.yaml/Labs or Caddy). | 302 is the correct type for affiliate links (do not change to 301). Add `Disallow: /PFA`, `/pianoforall`, `/pbp` to robots.txt via Ghost's robots.txt in the theme or server so crawlers do not treat them as pages. Make sure each link on the site has rel="sponsored nofollow" (these internal-looking links are not covered by the JS affiliate rule). This is the most important affiliate-disclosure compliance gap for Google. |
| 5 | Medium | /pbp redirect lands on a vendor page whose URL reads "copy-of-sms-fake-bfcm-recovery". | Followed the redirect: the 302 goes to `.../copy-of-sms-fake-bfcm-recovery-angleeo4v4h9l?affiliate_id=4282845`. Page content: ClickFunnels page titled "Piano By Pictures" (author Ryan Kelly), tagline "How to LEARN ANY SONG on the PIANO in UNDER 10 MINUTES", the page's own canonical/og:url is `.../lp-4930-free-gift`. So it is the Piano By Pictures sales landing page, but the redirect target is an internal funnel step name ("copy of SMS fake BFCM recovery", an old Black Friday / SMS recovery funnel copy), not the public landing URL. A bot-blocked check shows 403 in links.json for the final URL (the page loads with a normal user agent). | It is a working landing page now, but it is a leftover duplicate funnel step that the vendor can delete or rename at any time, which would silently kill the link. Ask the Piano By Pictures affiliate manager for the permanent affiliate link (usually of the form `.../lp-4930-free-gift?affiliate_id=4282845`), and update the /pbp redirect in Ghost Admin > Settings > Labs > Redirects. Re-test /pbp monthly. |
| 6 | Medium | Thin, near-empty tag pages are indexable and in the sitemap: /tag/books/, /tag/practice/, /tag/jazz-piano/ (1 post each, no description, generic title "Books - Pianoers.com"). | Each shows an H1 and 1 post card only; no meta robots; all listed in sitemap-tags.xml. | Yes, noindex these three. They add no content beyond one link, have no description, and compete with the post itself. Ghost Admin > Tags > open tag > Code injection / Meta data: Ghost 6 has no per-tag noindex toggle, so do it in the theme (`{{#is "tag"}}` with `{{#if @tag.count.posts}}` ... `<meta name="robots" content="noindex,follow">` when posts < 3) or simply delete the 3 tags and move those 3 posts to the closest larger tag (/tag/lessons/, /tag/pianists/). Deleting is simpler: Ghost then 404s the tag URL, so also add a redirect for each to a bigger tag. Keep the 7 larger tags (they have unique titles, descriptions and 2-12 posts). |
| 7 | Low | One internal link goes through a 301 chain: https://pianoers.com/best-piano-courses-online/ (linked from /piano-humidifier/) -> 301 `/best-piano-lessons-online` -> 301 `/best-piano-lessons-online/` -> 200. | `curl -IL`: two 301 hops (the first omits the trailing slash). links.json: hops=1, final https://pianoers.com/best-piano-lessons-online/. | Edit /piano-humidifier/ and change the link to https://pianoers.com/best-piano-lessons-online/. Then fix the redirect rule in Ghost Admin > Settings > Labs > Redirects so it points to `/best-piano-lessons-online/` with the trailing slash (removes the double hop for external links too). Keep the redirect itself. |
| 8 | Low | www.pianoers.com is dead: DNS resolves to `100::` (a discard address) and the proxy returns 502. | site-level.txt: "100:: www.pianoers.com", CONNECT 502. | Add a www DNS record (CNAME to pianoers.com) and a Caddy rule redirecting www -> https://pianoers.com{uri}. Otherwise anyone who links to or types www.pianoers.com gets an error and any www backlinks are wasted. Already known in the brief; status confirmed unchanged. |
| 9 | Low | Legal, author and tag pages are indexable (no noindex). | No robots meta on /privacy-policy/, /cookie-policy/, /contact/, /author/*, /tag/*. | Decision: keep author pages indexable (they carry author E-E-A-T and have descriptions and Person data). Legal pages: noindex is optional and low impact; /privacy-policy/ (2,406 words, generic template text) and /cookie-policy/ (1,642 words) are boilerplate, so noindex them if you want to keep the index lean. /contact/ is 24 words: noindex or add content. Do not noindex via robots.txt (that blocks crawling and still allows indexing). |
| 10 | Low | /privacy-policy/ has two H1s ("Privacy Policy" twice). | pages.json h1 count = 2. | Edit the page and change the second H1 to H2, or delete the duplicate heading. |
| 11 | Low | Long slugs: /simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/ (71 chars), also /piano-dehumidifier-101-why-it-is-important/, /how-to-clean-and-maintain-your-piano/, /bastien-piano-method-is-it-the-right-one-for-you/. | URL lengths from pages.json. | Do not change existing live URLs; the SEO gain is tiny and every change needs a 301. Keep slugs under ~60 characters for new posts. If you shorten, use Settings > Labs > Redirects. |
| 12 | Low | robots.txt has no AI-crawler directives and no explicit Allow for them. | robots.txt content in site-level.txt: single `User-agent: *` block. | Optional. Decide your policy for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot; the site already publishes /llms.txt, so allowing is consistent. Nothing is blocked today. |
| 13 | Low | IndexNow not set up. | /indexnow.txt 404; no key file found. | Optional. Bing and Yandex pick up the sitemap anyway. If wanted, use Ghost's Zapier/Make, or a small script on publish. Low value for a 55-page site. |
| 14 | Low | /.well-known/security.txt and /ai.txt return 404; /.well-known/ai-catalog.json redirects (301). | site-level.txt well-known section. | Optional. Add security.txt via a Ghost redirect or a Caddy static file. |
| 15 | Info | sitemap-tags.xml lastmod is 2025-12-04 while tag pages have been updated since; sitemap.xsl is referenced with a protocol-relative URL. | sitemap.xml head. | Ghost-generated; no action. |

## Answers to your specific questions

- **/best-piano-courses-online/**: only 1 internal link points to it (from /piano-humidifier/). It does a double 301 hop (missing slash then slash). Fix as in #7.
- **/PFA /pianoforall /pbp**: all three are 302 redirects off-site. /PFA goes to a ClickBank hop link then pianoforall.com; /pianoforall also ends at https://pianoforall.com/; /pbp goes to the Piano By Pictures ClickFunnels page. The "copy-of-sms-fake-bfcm-recovery" text is just the name of an internal funnel step at the vendor, not a Pianoers URL (#5).
- **Noindex**: nothing is noindexed today. Recommended: noindex or delete the 3 thin tags; keep author pages and the 7 bigger tags; legal pages optional.
- **Duplicate titles/descriptions**: no duplicate titles; no duplicate descriptions; 8 pages have none (#3).
- **Tag pagination**: the biggest tag (care) has 9 posts and renders on one page. /tag/care/page/2/ correctly returns 404 and there are no prev/next links, so pagination is not an issue. Homepage /page/2/ and /page/3/ exist with correct canonical and rel prev/next.
- **http/https/www**: http -> https works (308, one hop); www is broken (#8); trailing-slash redirect works (301).
- **404 behavior**: proper 404 status with a styled page, no-store cache headers.
- **Mixed content**: none found.
- **JS rendering**: content, headings, canonical, JSON-LD, breadcrumbs and Table of Contents markup (`pz-toc`) are in the raw HTML, so CSR is not an issue. Only the affiliate rel and the target=_blank are added by JS (#2). Deferred third-party scripts: Ghost Portal, sodo-search, comments-ui, cards, ghost-stats (jsdelivr/self-hosted); GTM/Claspo not seen in this fetch's script list.
- **RSS**: works. **AMP**: not used (301 off). **Hreflang**: not needed; single English-language site, no alternate-language pages.
- **Previously known items, status**: /best-beginner-pianos/ and /yamaha-p-145-review/ both return 200 with self-canonical and rel already present on their Amazon links in the live HTML; the www DNS problem and missing headers remain unfixed.

## Not checked

- Lighthouse/CWV numbers (covered by the performance audit).
- GTM and Claspo script presence on every template.
- External link health beyond links.json (403/429 results there are bot blocks).
