# Pianoers.com: full-site SEO audit

**Date:** 7 October 2026
**Scope:** all 55 URLs in the sitemap: the homepage, 38 posts, 4 pages, 10 tags and 2 authors, plus all 169 unique links on the site.
**Site type:** affiliate publisher (piano gear and online-course reviews) on Ghost 6.67 with the custom Pianoers theme.

## Overall score: 62 / 100

| Category | Weight | Score | Detail file |
|---|---|---|---|
| Technical SEO | 22% | 76 | `findings/technical.md`, `findings/sitemap.md` (86) |
| Content quality | 23% | 51 | `findings/content-pianos-care.md` (46), `content-courses-apps.md` (52), `content-learning-pianists-pages.md` (54) |
| On-page SEO | 20% | 58 | `findings/on-page.md` |
| Schema / structured data | 10% | 58 | `findings/schema.md` |
| Performance (Core Web Vitals) | 10% | 62 | `findings/performance.md` |
| AI search readiness | 10% | 66 | `findings/geo.md` (60), `findings/agentic.md` (82) |
| Images | 5% | 58 | `findings/images.md`, `findings/social-images.md` (52) |

Also in `findings/`:
- `sxo.md`: search intent, 62
- `clusters-internal-links.md`: content structure and internal links, 35
- `visual.md`: phone and desktop rendering, 82

**What the score means:** the site is technically healthy and fast on desktop. Google can crawl and index every page, and the layout doesn't jump. The score is held down by trust and accuracy problems in the content: missing affiliate disclosures, wrong facts, author claims that contradict each other, and one article with a legal risk. Those matter most for a review site under Google's quality guidelines.

## The 10 most important problems

| # | Severity | Problem | Where |
|---|---|---|---|
| 1 | Critical | **No affiliate disclosure on any post.** 20 posts carry affiliate links (Amazon, ClickBank via `/PFA` and `/pianoforall`, `/pbp`, the Simply Piano Impact link). Only 2 have a disclosure, and those are written into the text. The Pianoforall review even says it *isn't* "full of affiliate links" while it has 6. This breaks FTC rules and the Amazon Associates agreement. | 20 posts |
| 2 | Critical | **Defamation risk on /stephen-ridley/.** It calls a named person a "scam" and a "con artist" and links his money to Scientology. The article itself admits there's "no concrete paper trail". | /stephen-ridley/ |
| 3 | Critical | **Advice that could cause harm.** The tuning guide gives the wrong direction for tightening a string. The DIY repair guide says to tilt a piano. | /how-to-tune-a-piano-a-simple-guide/, /piano-diy-repair-guide/ |
| 4 | Critical | **The ivory article's history is mostly wrong.** Cristofori used hammers. Érard, not Pape, invented double escapement. CITES banned the ivory trade, not "ivory in pianos". | /are-piano-keys-still-made-of-ivory/ |
| 5 | High | **Author credentials contradict each other.** Katarina's bio: piano teacher since 2001, "member of the National Association of Music Teachers since 1995" (no such organisation; the real one is MTNA, and 1995 is before she started teaching). Her posts call her a touring concert pianist with her own Steinway. The About page's structured data credits Katarina, but the text is by Richard. | author bio, 5+ posts, /about/ |
| 6 | High | **Ratings and verdicts disagree between the round-ups and the reviews.** Simply Piano is 4.7/5 in the round-up and 3.5/5 in its own review. Skoove, Pianote and Flowkey don't match either, and two "best for" labels contradict the reviews. | /best-piano-lessons-online/, /best-free-piano-learning-apps/, 4 reviews |
| 7 | High | **Wrong prices and specs**, with about 40 confirmed errors across the site. Examples: Pianote is now sold through Musora at $30/month or $279/year; Piano With Jonny annual is $299.50; Skoove is $12.49 or $29.99; on /best-digital-piano/, the CLP-885, ES60, ES920 and KDP120 specs and the P-145BT "CFX / 24 voices". Lang Lang's career facts and Cole Lam's age are out of date. | see the content findings files |
| 8 | High | **Affiliate links that go through your own redirects aren't marked `sponsored`.** 29 links on 15 posts. **Fixed in theme 1.1.3**; you also need to update one setting. | 15 posts |
| 9 | High | **Internal links are thin.** 16 of 38 posts get no links from other posts, and the round-ups don't link to their own product reviews. A ready list of 93 links to add is in `clusters-internal-links.md`. | site-wide |
| 10 | High | **Weak headings and metadata.** 18 posts have sections built from H3s or start below H2. 12 titles are over 60 characters. 4 content pages have no meta description. "(2025)" still appears in 2 titles. | see on-page.md |

## Quick wins (under an hour each)

1. **Disclosure:** add the internal tag `#affiliate` to the 20 affiliate posts (Post settings → Tags). The theme then shows the disclosure under each title.
2. **Theme:** upload theme 1.1.3, then paste the new Affiliate domains value (see `../theme/INSTALL.md`).
3. **P-145 review:** delete the old FAQ script in its Code injection, and shorten its meta title and description.
4. **Beginner guide:** fix the meta title's ")" and the "$350" meta description, and upload the ready 1200×630 share image (`../best-beginner-pianos/images/best-beginner-keyboard-piano-social.jpg`).
5. **Broken links:** change the one link to `/best-piano-courses-online/` (on /piano-humidifier/) to `/best-piano-lessons-online/`.
6. **Thin tags:** add descriptions to the Books, Practice and Jazz Piano tags, or delete them.
7. **Privacy policy:** delete the duplicate "Privacy Policy" heading on that page.

## What already works

- Every URL returns 200 with a correct self-canonical. robots.txt and the sitemaps are clean, http→https is a single redirect, and 404 pages work.
- Layout shift is about 0 on every page tested. Desktop Lighthouse scores 85–99.
- Every AI crawler can reach and read the site, and it passes all of Lighthouse's agent-browsing checks.
- Two Wikipedia articles link to the site: Lang Lang → /lang-lang-the-biography/ and Digital piano → /acoustic-vs-digital-piano/.
- The strongest posts are piano-basics (88), Ahmad Jamal (90), Loog (88), practice tips (85), climate control (85), Skoove (84) and the rebuilt beginner guide (82).
- No popups or cookie banners cover content on phones.

## Changes made in this audit (theme 1.1.3)

These are in `../theme/pianoers.zip`, tested on the live pages and a local Ghost copy, and passed by gscan:

- **Affiliate tagging:** the Affiliate domains setting accepts redirect paths (`/PFA`, `/pianoforall`, `/pbp`), and `sjv.io` and `clickbank.net` are added. Every affiliate link on the tested pages got `sponsored`; normal internal links didn't.
- **Continue reading pill:** fixed on phones (one line, 380px wide on a 412px screen) and hidden while the menu is open.
- **First card image:** on tag, author and paginated pages it now loads immediately, because it's the main image on those pages.
- **`llms.txt`:** rebuilt with all 38 posts and current titles. The three 404 links and the image URL list are gone.
- **Earlier today (1.1.1–1.1.2):** contents-list fallback for H3 posts; empty sidebar box and buy-bar sliver removed.

## Limits of this audit

- **No real-visitor data.** Search Console, GA4 and CrUX aren't connected, so performance numbers are lab tests and rankings come from search samples, not Google's own data.
- **Backlinks not measured.** You stopped the backlink auditor; only the two Wikipedia links were found incidentally.
- **Performance auditor stopped early.** Its 18 saved Lighthouse runs on 6 pages were summarized; other pages weren't tested.
- **Drift baseline not saved.** The baseline tool refuses this container's network proxy.
- **Partial fact checks.** Some were blocked by sites (Casio, Sweetwater, Kawai pages, kjos.com) and are marked "Not checked" in the content files. A few fact calls rely on the auditor's own knowledge where no source could be fetched (e.g. tuning-pin direction); these are flagged in the files.
- **Not covered:** local SEO, maps, e-commerce and hreflang. They don't apply to an English-only online publisher.
