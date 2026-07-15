# Technical SEO — 78/100

## What works
- robots.txt is clean and correctly references the sitemap; only Ghost admin/system paths are disallowed
- XML sitemap index + 4 sub-sitemaps (pages, posts, authors, tags) all resolve and parse correctly
- HSTS is enabled (max-age=31536000)
- HTTP/2 in use, served via Caddy
- All 45 crawled pages returned clean 200s, no 4xx/5xx encountered
- No noindex directives found on any content page

## Findings

### [Medium] Sitemap includes a canonicalized-away URL
/pianoforall-vs-alfreds-piano-book/ has <link rel="canonical" href="https://pianoers.com/pianoforall-review/"> (it also duplicates that page's title and meta description exactly) but remains listed in sitemap-posts.xml. Sitemaps should only list canonical/indexable URLs.

**Recommendation:** Either remove this URL from the sitemap and rely on the canonical tag, or if it's meant to be a distinct comparison page, give it its own unique title/meta/content and self-canonical it.

### [Medium] Standard security headers absent
The homepage response (via Caddy) includes strict-transport-security but not X-Content-Type-Options, X-Frame-Options, Content-Security-Policy, Referrer-Policy, or Permissions-Policy.

**Recommendation:** Add these headers at the Caddy/CDN edge layer. Low engineering cost, standard hardening.

### [Low] x-powered-by header discloses stack
Response includes 'x-powered-by: Express', unnecessarily revealing backend technology.

**Recommendation:** Strip the X-Powered-By header at the edge/proxy layer.

### [Info] HTTP→HTTPS redirect and www subdomain not independently verifiable
This audit ran from a sandboxed session whose network egress filters non-proxied plain-HTTP (port 80) requests and returns synthetic responses for unresolved subdomains, so port-80 redirect behavior and any www.pianoers.com configuration could not be reliably tested from this environment. All HTTPS (443) checks above are reliable.

**Recommendation:** Manually verify http://pianoers.com redirects to https://pianoers.com/, and confirm whether www.pianoers.com is intentionally unused or should redirect to the apex domain.
