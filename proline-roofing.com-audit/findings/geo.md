# AI Search Readiness (GEO) — proline-roofing.com

**Category Score: 58 / 100**

Sampled: `/faq/`, `/roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj/`, `/roof-anatomy-101/`,
`/roofing-costs-decoded/`, `/5-signs-your-roof-is-signaling-for-a-replacement-before-disaster-strikes/`,
plus `robots.txt` and `llms.txt`.

## Dimension Breakdown

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 50/100 | 12.5 |
| Structural Readability | 20% | 62/100 | 12.4 |
| Multi-Modal Content | 15% | 40/100 | 6.0 |
| Authority & Brand Signals | 20% | 55/100 | 11.0 |
| Technical Accessibility | 20% | 85/100 | 17.0 |
| **Total** | | | **58.9 ≈ 58** |

## AI Crawler Access Status (robots.txt)

`https://www.proline-roofing.com/robots.txt`:
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://www.proline-roofing.com/sitemap_index.xml
```

| Crawler | Status |
|---|---|
| GPTBot | Not explicitly named — allowed by default (wildcard `*` only blocks `/wp-admin/`) |
| OAI-SearchBot | Not explicitly named — allowed by default |
| ClaudeBot | Not explicitly named — allowed by default |
| PerplexityBot | Not explicitly named — allowed by default |
| Google-Extended | Not explicitly named — allowed by default |
| CCBot | Not explicitly named — allowed by default |
| anthropic-ai | Not explicitly named — allowed by default |

No crawler is blocked, so the site is technically reachable by every major AI crawler. However, the file is **silent** rather than **intentional** — there are no dedicated user-agent blocks confirming the site owner has actively opted in to AI search crawling (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot) or made a deliberate choice about training-only crawlers (CCBot, anthropic-ai, Google-Extended). This is low-risk today but leaves the decision to default behavior rather than policy.

## llms.txt Status

**Missing (404).** `https://www.proline-roofing.com/llms.txt` returns a 404. No RSL 1.0 licensing file was found either. No structured, AI-crawler-facing summary of the business, service areas, or key pages exists.

## Technical Accessibility

All 5 sampled pages (and the homepage) are plain server-rendered WordPress/Elementor HTML — `is_spa=False`, content is fully present on the raw (pre-JS) fetch. This means GPTBot, ClaudeBot, and PerplexityBot (which largely do not execute JavaScript) can read full page content without a headless-rendering penalty. This is the strongest dimension in the audit.

## Brand Mention / Entity Signals

Organization JSON-LD (`RoofingContractor`/`Organization`) includes a `sameAs` array with:
- Facebook, Twitter/X, LinkedIn, Pinterest, YouTube channel, Google Business Profile (`g.co/kgs/...`)

Not present / not verifiable in this pass:
- **Wikipedia** entity — none (expected for a local SMB; low priority to fix)
- **Reddit** presence — not verifiable without live search/DataForSEO tooling in this environment
- **YouTube content correlation** — the YouTube reference found in every blog post is only the org's channel link inside schema `sameAs`; no embedded YouTube videos or channel content were found in the sampled articles themselves, so the (strongest, ~0.737 correlation) YouTube-mention signal is not being leveraged as actual on-page content
- Live ChatGPT/AI-Overview visibility checks were not run — no DataForSEO MCP tools were available in this session

## Citability Analysis (passage-level)

- Blog posts use proper semantic heading hierarchy (`H1` → `H2` → `H3`, WordPress `wp-block-heading`), and each sampled post carries `BlogPosting` schema with `datePublished`/`dateModified` and a `Person` author (`Lonnine from ProLine Roofing`).
- Paragraphs are consistently **short (20–65 words)**, well below the 134–167 word optimal-citation range. Content reads well for humans but is fragmented across many short lines rather than self-contained, quotable answer blocks — an LLM has to stitch 3–5 fragments together to get one full "answer."
- Headings are **declarative, not question-based** (e.g., "Sign #1: Approaching the Expiration Date," "5 Factors Affecting Roof Lifespan") rather than phrased as the questions users/AI assistants actually ask ("How do I know my roof needs replacing?", "What shortens a roof's lifespan?"). This reduces direct match with conversational queries in ChatGPT/Perplexity/AIO.
- `roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj/` includes a **"TL;DR" summary block** — a strong citability practice — but this pattern was found on only 1 of the 4 sampled posts.
- Specific, extractable facts do exist (e.g., asphalt shingles "generally last 15–20 years," metal roofs "40–70 years," roof-replacement timelines by project scope) — good raw material — but **zero outbound citations** to any authoritative third-party source (manufacturer specs, NY/NJ building code, NOAA/weather data, insurance data) were found across all 5 sampled pages. Every stat is asserted with no attribution, which weakens trust signals for citation-conscious engines (Perplexity in particular favors sourced claims).
- No comparison tables were found anywhere in the sampled content (e.g., cost-by-material, lifespan-by-material) — this is a missed opportunity, since tabular data is highly extractable and often surfaces directly in AI Overviews.

## FAQ Page (`/faq/`)

- Visually presents 6 clear Q&A pairs with direct, mostly single-sentence answers (good raw material).
- **No `FAQPage` schema markup** is present anywhere on the page — the JSON-LD on `/faq/` only contains `Organization`, `Product`, `AggregateRating`, and `BreadcrumbList` types.
- The questions themselves are **not marked up as semantic headings** — they are wrapped in decorative `<span>`/`<div class="elementor-icon-box-title">` elements from an Elementor accordion widget, not real `<h2>`/`<h3>` tags. A heading-tag scan of the page found only one true `H1`, one `H2`, and one `H3` on the entire page (none of them the actual FAQ questions).
- The "How much will my roof project cost?" answer gives no number or range at all ("get a personalized estimate") — a missed opportunity for a directly quotable, extractable answer.

## What Works

- All sampled pages are server-rendered (no SPA/JS-gating) — fully accessible to non-JS-executing AI crawlers.
- robots.txt does not block any AI crawler (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, CCBot are all implicitly allowed).
- `BlogPosting` schema with `datePublished`/`dateModified` and a named `Person` author is present on every blog post sampled.
- `Organization`/`RoofingContractor` schema includes a broad `sameAs` set (Facebook, X, LinkedIn, Pinterest, YouTube, Google Business Profile).
- Proper `H1` → `H2` → `H3` heading hierarchy on blog posts, making section structure crawlable.
- Content contains specific, factual, locally-relevant statistics (material lifespans, cost drivers, NY/NJ-specific context) that are good raw citation material once restructured.
- One sampled post (roof lifespan guide) already uses a "TL;DR" summary block — a template worth rolling out site-wide.
- Clean, single-purpose URLs and a submitted sitemap (`sitemap_index.xml`) referenced in robots.txt.

## Findings

### 1. No llms.txt file
- **Severity:** Medium
- **Description:** `https://www.proline-roofing.com/llms.txt` returns 404. There is no structured, AI-crawler-facing manifest describing the business, service areas (Staten Island, Brooklyn, NJ towns), and priority pages/content.
- **Recommendation:** Publish an `/llms.txt` at the domain root summarizing the business, service area, core service pages, and top blog guides in Markdown link format, per the emerging llms.txt convention. Low effort, one-time.

### 2. FAQ page has no FAQPage schema and questions aren't marked up as headings
- **Severity:** High
- **Description:** The `/faq/` page's 6 Q&A pairs are wrapped in decorative Elementor `<span>`/`<div>` elements rather than `<h2>`/`<h3>` tags, and there is no `FAQPage` JSON-LD anywhere on the page. This is the single highest-value, most template-content-matched page for AI-citation and Google AI Overview "People Also Ask" style pickup, and it currently has the weakest structural markup of any sampled page.
- **Recommendation:** Add `FAQPage` schema (`Question`/`Answer` pairs matching on-page copy exactly) and convert each question into a real `<h2>` or `<h3>`. Expand thin answers (e.g., the pricing FAQ) to include an actual number/range. Medium effort (schema + template change in the FAQ widget).

### 3. robots.txt is silent rather than explicit on AI crawlers
- **Severity:** Low
- **Description:** No named directives exist for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, or CCBot. Access is allowed only by default (wildcard `*` doesn't block `/`), not by deliberate policy.
- **Recommendation:** Add explicit `Allow: /` blocks for GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot to signal intentional AI-search visibility, and make a conscious decision (block or allow) for training-only crawlers (CCBot, anthropic-ai, Google-Extended) rather than leaving it to default behavior. Low effort.

### 4. Blog content is fragmented into sub-134-word paragraphs with no self-contained answer blocks
- **Severity:** Medium
- **Description:** Sampled posts average 20–65 words per paragraph, well under the 134–167 word range shown to correlate with AI citation. Direct answers are split across multiple short lines rather than consolidated into one extractable block per section.
- **Recommendation:** Under each H2/H3, add a single consolidated 120–170 word "answer paragraph" immediately after the heading (before bullets/sub-detail) that fully answers the heading's implicit question in a self-contained way. Roll out the "TL;DR" summary pattern (already used on the lifespan guide) to all blog posts. Medium effort — content rewrite, no dev work.

### 5. Headings are declarative, not question-phrased
- **Severity:** Medium
- **Description:** H2s like "5 Factors Affecting Roof Lifespan," "Sign #1: Approaching the Expiration Date," and "The Big Three Cost Factors" don't match the natural-language questions users type into ChatGPT/Perplexity/Google AI Overviews (e.g., "How long does a roof last in NY?", "How do I know if my roof needs replacing?").
- **Recommendation:** Rewrite H2/H3 headings as questions where natural, keeping one direct-answer sentence immediately below each. Low-medium effort, content-only change.

### 6. Zero outbound citations to authoritative third-party sources
- **Severity:** Medium
- **Description:** Across all 5 sampled pages, every statistic (material lifespans, cost ranges, timelines) is asserted with no attribution to manufacturer data, NY/NJ building code, insurance/industry data, or weather sources. Perplexity in particular favors and surfaces content that cites sources.
- **Recommendation:** Add 2–4 outbound citations per long-form post to recognized sources (GAF/CertainTeed/IKO manufacturer warranty data, NOAA climate data, NY/NJ building code references, NRCA). Low-medium effort.

### 7. No comparison/data tables for highly citable facts
- **Severity:** Low
- **Description:** No `<table>` elements were found in any sampled page. Cost-by-service and lifespan-by-material data is currently presented only as prose, even though it is inherently tabular.
- **Recommendation:** Convert the "Average Lifespan by Roofing Material" and "Average Costs for Roofing Services" sections into simple HTML tables. Tabular data is disproportionately picked up in Google AI Overviews and Perplexity answer boxes. Low-medium effort.

### 8. Weak individual-author E-E-A-T signal
- **Severity:** Low
- **Description:** The `Person` author schema on every post lists only a first name plus generic descriptor ("Lonnie from ProLine Roofing") with a Gravatar image, no last name, credentials, license number, or link to an author bio/archive page.
- **Recommendation:** Add a full name, role/title, years of experience, and a license number (NY/NJ contractor license) either in an author bio box or linked author page, and reference it in the `Person` schema (`jobTitle`, `url`). Low effort.

### 9. Content freshness is inconsistent / stale on some posts
- **Severity:** Low
- **Description:** `roof-anatomy-101` was published 2024-02-01 and last modified 2024-04-20 — over a year+ with no update as of this audit (2026-07-12). AI Overviews and freshness-sensitive queries favor recently reviewed content.
- **Recommendation:** Establish a quarterly/annual content-review cadence that bumps `dateModified` with a genuine content refresh (updated pricing, current-year references) rather than a cosmetic timestamp change. Low effort, ongoing.

### 10. YouTube signal present in schema only, not as on-page content
- **Severity:** Low
- **Description:** The YouTube channel link appears only inside `Organization.sameAs` schema; no embedded videos or channel content were found within the sampled blog articles, despite YouTube mentions having the strongest documented correlation (~0.737) with AI citation likelihood.
- **Recommendation:** Embed short, relevant YouTube videos (e.g., inspection walkthroughs, "how to spot roof damage") into the highest-traffic guides (roof lifespan, roof anatomy, 5 signs) to convert this schema-only signal into real content-level brand reinforcement. Medium effort.

## Top 5 Highest-Impact Changes

| # | Change | Impact | Effort |
|---|---|---|---|
| 1 | Add `FAQPage` schema + real heading markup to `/faq/` | High | Medium |
| 2 | Publish `/llms.txt` | Medium | Low |
| 3 | Add explicit `Allow` directives for GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot in robots.txt | Medium | Low |
| 4 | Consolidate fragmented paragraphs into 120–170 word self-contained answer blocks per section (roll out TL;DR pattern site-wide) | High | Medium |
| 5 | Add outbound citations + convert cost/lifespan data into tables | Medium | Medium |

## Platform-Specific Scores (estimated, qualitative — no live tooling available)

| Platform | Score (0-100) | Rationale |
|---|---|---|
| Google AI Overviews | 55 | Good factual raw material and clean HTML, but lacks FAQPage schema, question-phrased headings, and tables that AIO strongly favors |
| ChatGPT (search/browse) | 55 | Fully crawlable (SSR, unblocked robots.txt) but no llms.txt and fragmented passages reduce clean extraction |
| Perplexity | 45 | Weakest fit — Perplexity favors sourced, citation-backed claims; zero outbound citations found on any sampled page |
| Bing Copilot | 60 | Benefits most from existing schema (BlogPosting, Organization, sameAs) and clean SSR HTML; still limited by fragmented passages |

Note: these platform scores are directional/qualitative based on structural and schema analysis only — no DataForSEO or live LLM-scraper tools were available in this session to verify actual current citation rates on ChatGPT, Perplexity, or Google AI Overviews for proline-roofing.com.
