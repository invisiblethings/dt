# SEO Audit: pianoers.com

**Date:** 2026-07-15
**Business type:** Publisher / affiliate content site — piano learning reviews & guides
**Pages crawled:** 45 of 45 sitemap content URLs (7 pages + 38 posts), 100% success rate, 0 errors
**SEO Health Score: 80 / 100**

> **Method note:** This audit fetched pages via direct HTTP requests + HTML parsing (BeautifulSoup/lxml) from this session's sandboxed environment. The bundled `render_page.py` (Playwright-based) SSRF-hardening module has a bug that misidentifies this sandbox's own mandatory HTTP proxy as an unsafe DNS target, so it couldn't be used as-is; plain `requests` fetches worked fine and were used instead. No Core Web Vitals field/lab data (PageSpeed/CrUX) was available — see the Performance section. Port-80 (HTTP) and `www` subdomain behavior could not be reliably tested from this sandbox (see Technical SEO).

## Executive Summary

Pianoers.com is a well-built Ghost-powered content site with real strengths: clean technical foundations (sitemap, robots.txt, HTTPS/HSTS), consistent structured data on every page, and notably strong E-E-A-T signals — author bios with verified external profiles. It's also unusually well-prepared for AI search, with a hand-written `llms.txt` that most sites don't bother with.

The gaps are mostly on-page hygiene: a meaningful share of titles and meta descriptions are outside recommended length, six pages have no meta description at all, and one page has a duplicate-content/canonical conflict with another. None of these are difficult fixes.

**Top 5 issues:**
1. 13 titles (29% of pages) exceed 60 characters and will truncate in search results
2. `/pianoforall-vs-alfreds-piano-book/` is canonicalized to `/pianoforall-review/` but still listed in the sitemap, with an identical title and meta description to the target page
3. 6 pages have no meta description
4. 26 of 416 images (6%) are missing alt text, across 16 pages
5. 5 standard security response headers are absent

**Top 5 quick wins:**
1. Write meta descriptions for the 6 pages missing one
2. Trim the 13 over-long titles
3. Remove or fix `/pianoforall-vs-alfreds-piano-book/`'s duplicate title/description
4. Add alt text to the 26 flagged images
5. Add missing security headers at the Caddy/edge layer

---

## Technical SEO — 78/100

**What works:**
- `robots.txt` is clean, only disallows Ghost system paths, correctly points to the sitemap
- Sitemap index + 4 sub-sitemaps (pages/posts/authors/tags) all resolve and parse
- HSTS enabled, HTTP/2, served via Caddy
- All 45 crawled pages returned clean `200`s
- No `noindex` directives on any content page

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Medium | `/pianoforall-vs-alfreds-piano-book/` is in the sitemap despite being canonicalized to `/pianoforall-review/` | Remove from sitemap or give it unique content and self-canonicalize |
| Medium | Missing X-Content-Type-Options, X-Frame-Options, CSP, Referrer-Policy, Permissions-Policy headers | Add at the Caddy/CDN edge |
| Low | `x-powered-by: Express` discloses backend stack | Strip the header at the edge |
| Info | HTTP→HTTPS redirect and `www.pianoers.com` behavior not verifiable from this sandbox (port-80/DNS filtering in this session's environment) | Verify manually |

## Content Quality — 85/100

**What works:**
- 44/45 pages exceed 300 words (the one exception, `/contact/` at 73 words, is expected)
- Strong E-E-A-T: Article schema includes an author `Person` with photo, author-page URL, and an external `sameAs` verification link
- Author bylines link to `/author/{name}/` pages
- `dateModified` is current in schema (e.g. 2026-02-22), showing active maintenance

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Medium | Duplicate content between `/pianoforall-vs-alfreds-piano-book/` and `/pianoforall-review/` | Differentiate with unique comparison content, or fold into the main review |

## On-Page SEO — 72/100

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Medium | 13/45 titles exceed 60 characters | Trim, keep primary keyword near the front |
| Medium | 6 pages missing meta description | Write unique 120-160 char descriptions |
| Low | 14 meta descriptions exceed 160 characters (up to 224 on `/pianote-review/`) | Trim to ~150-160 chars |
| Medium | Duplicate title + meta description on 2 pages (see Technical/Content) | Resolve alongside canonical fix |
| Low | 2 H1s on `/privacy-policy/` | Demote second H1 to H2 |

## Schema & Structured Data — 92/100

**What works:**
- 100% of crawled pages carry valid JSON-LD
- Article schema consistently includes publisher, author (with photo + `sameAs`), headline, dates, `mainEntityOfPage`
- Review schema (6 pages), FAQPage (5), ItemList (2), WebSite (homepage)

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Info | Review schema not exhaustively validated against Google's rich-result requirements | Run all 6 review pages through Google's Rich Results Test |

## Performance (Core Web Vitals) — 65/100 (estimate)

**What works:**
- Lightweight homepage HTML (~66KB)
- Static server-rendered HTML, no SPA/hydration delay
- Most in-article images are lazy-loaded (13/20 sampled)

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Info | No PageSpeed/CrUX field or lab data available; score is a heuristic estimate | Run PageSpeed Insights manually with an API key |
| Medium | 5 render-blocking scripts + 2 blocking stylesheets in `<head>` | Add `defer` to non-critical scripts (comment-counts, ghost-stats, sodo-search) |
| Low | Homepage thumbnail images lack `loading="lazy"` | Add lazy-loading to below-the-fold thumbnails |

## AI Search Readiness (GEO) — 90/100

**What works:**
- `llms.txt` present and well-structured — summarizes site purpose, links every review/guide by category. Uncommon and genuinely useful.
- `robots.txt` has no disallow rules targeting GPTBot, ClaudeBot, Google-Extended, PerplexityBot, or CCBot
- Verified author entities (`sameAs`) give LLM systems clear attribution signals
- First-person, opinionated review style tends to perform well for AI citation extraction

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Info | No explicit per-bot AI crawler rules in robots.txt (functionally open via blanket rule) | Optional: add explicit GPTBot/ClaudeBot allow entries for clarity |

## Images — 75/100

**Findings:**

| Severity | Finding | Recommendation |
|---|---|---|
| Medium | 26/416 images (6%) missing alt text across 16 pages; worst: `/ridley-academy-review/` (4/9), `/open-studio-jazz-review/` (3/11), `/piano-dehumidifier-101-why-it-is-important/` (3/14) | Add descriptive alt text, prioritize these 3 pages |
| Low | Most sampled images are JPEG/PNG (6 of 8), only 1 WebP | Convert to WebP/AVIF with fallback |

---

See `ACTION-PLAN.md` for the prioritized rollout and `audit-data.json` for the structured data behind this report.
