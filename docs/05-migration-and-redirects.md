# Domain migration & redirect plan

## Decision: pianoforall.com is the primary domain

| Factor | pianoforall.com | academy.pianoforall.com | pianoforall.academy |
|---|---|---|---|
| Age / history | Live since ~2006 | Thinkific school, recent | New |
| Content indexed | ~60 pages + 39 posts, Yoast sitemaps | ~12 sales pages | Effectively none (empty SPA shell) |
| Links pointing in | Udemy, affiliates, review sites, 20 years of mentions (verify in GSC → Links and Ahrefs/Semrush) | Links from pianoforall.com nav | Negligible |
| Brand match | Exact | Subdomain | Different TLD |
| Role after migration | **Marketing site (this build)** | **Course player / LMS (unchanged)** | **301 → pianoforall.com** |

Moving the brand to `pianoforall.academy` would throw away pianoforall.com's history for no benefit. Replace the WordPress site **on the same domain** instead. Because most URLs stay identical, Google treats this as a site redesign, not a site move, which is far lower risk.

> **Before anything else:** confirm who controls the ClickBank vendor account `piano4all`, the Thinkific school and the DNS for all three domains. See "Ownership and checkout links" in `01-strategy-and-findings.md`.

## Do not redirect academy.pianoforall.com wholesale

The subdomain hosts the **course player**: student logins, enrolments, lesson pages, the free Test Drive and the community. Redirecting it would lock paying students out. Instead:

1. Keep Thinkific on `academy.pianoforall.com`.
2. In Thinkific, simplify the site pages so they stop competing with the main site:
   - Replace the Thinkific home page and `/pages/all-courses` with a short "Sign in to your courses / Go to pianoforall.com" page, or redirect them if your Thinkific plan supports custom redirects.
   - Course landing pages (`/courses/...`) double as enrolment pages, so keep them, but point their header/footer links and "Find out more" buttons to the matching pianoforall.com page. Where Thinkific's SEO settings allow, hide them from search engines (noindex) so pianoforall.com is the version that ranks.
   - Remove links to `pianoforall8634.live-website.com` (the old dev hostname) from all Thinkific templates.
3. Leave `robots.txt` on the subdomain as Thinkific sets it.

| academy.pianoforall.com URL | Action | Main-site equivalent |
|---|---|---|
| `/` | Repoint links / redirect if possible | `https://pianoforall.com/` |
| `/pages/all-courses`, `/collections`, `/collections/products`, `/pages/more-courses` | Repoint links / redirect if possible | `/pricing` |
| `/courses/pianoforall-learn-piano-by-ear-rhythm-style` | Keep (enrolment); noindex if possible | `/course` |
| `/courses/moonlight-sonata-1st-movement-learn-piano-by-ear` | Keep; noindex if possible | `/classics-by-ear/moonlight-sonata` |
| `/courses/erik-satie-gnossiennes-learn-piano-by-ear` | Keep; noindex if possible | `/classics-by-ear/erik-satie-gnossiennes` |
| `/courses/bach-preludes-bwv-846-847-learn-piano-by-ear` | Keep; noindex if possible | `/classics-by-ear/bach-preludes` |
| `/bundles/*` | Keep; noindex if possible | `/pricing#bundles` |
| `/courses/pianoforall-academy-test-drive` | **Keep** (free-lesson enrolment, the main CTA target) | `/free-lessons` explains it |
| `/pages/7-days-free-trial` | Check if any funnel uses it; otherwise retire | `/free-lessons` |
| `/pages/gift-a-course` | Repoint | `/gift` |
| `/users/sign_in`, `/enrollments`, lessons | **Untouched** | Linked from header "Sign in" |

## pianoforall.academy → pianoforall.com

Add `pianoforall.academy` and `www.pianoforall.academy` as domain aliases on the Netlify site that serves this build. `netlify.toml` already contains:

| From | To | Code |
|---|---|---|
| `pianoforall.academy/terms.html` | `/terms-of-use` | 301 |
| `pianoforall.academy/privacy.html` | `/privacy-policy` | 301 |
| `pianoforall.academy/*` (everything else, incl. `#pricing` anchors) | `https://pianoforall.com/` | 301 |

The old site was a single page, so a page-to-home redirect is the correct mapping here.

## pianoforall.com: page-by-page

**Kept at the same URL (no redirect):** `/`, `/contact`, `/privacy-policy`, `/terms-of-use`, `/affiliate-program`, `/am-i-too-old-to-learn-piano`, `/blog`, `/thanks-for-joining`, all 7 `/category/*` pages, and **all 39 blog posts** (imported with identical slugs by `scripts/import-wordpress.mjs`). Images keep their `/wp-content/uploads/…` paths too, so image search traffic and hotlinks survive.

**Redirected (all in `netlify.toml`):**

| Old URL | New URL | Code | Why |
|---|---|---|---|
| `/order` | `/pricing` | 301 | Clearer name; same intent |
| `/pianoforall-faqs`, `/frequently-asked-questions` | `/faq` | 301 | Three FAQ versions merged into one |
| `/testimonials`, `/reviews/pianoforall` | `/reviews` | 301 | Merged |
| `/reviews/classics-by-ear` | `/classics-by-ear` | 301 | Reviews live on the course pages |
| `/reviews/moonlight-sonata` | `/classics-by-ear/moonlight-sonata` | 301 | |
| `/reviews/bach-preludes` | `/classics-by-ear/bach-preludes` | 301 | |
| `/reviews/erik-satie` | `/classics-by-ear/erik-satie-gnossiennes` | 301 | |
| `/about-robin-pianoforall` | `/about` | 301 | Was noindex; now indexable |
| `/contact-support` | `/contact` | 301 | |
| `/home-page` | `/` | 301 | Draft homepage |
| `/learn-piano-online` | `/learn/learn-piano-online` | 301 | Was noindex draft |
| `/learn-piano-how-pianoforall-works` | `/how-it-works` | 301 | Was noindex draft |
| `/choosing-a-keyboard-or-digital-piano` | `/learn/choosing-a-keyboard` | 301 | Was noindex draft |
| `/pianoforall-vs-the-top-10-piano-learning-apps` | `/compare` | 301 | Was noindex draft |
| `/exclusive-offer-classics-by-ear` | `/classics-by-ear` | **302** | Funnel page. Confirm whether an email sequence or ClickBank upsell still uses it, then make it 301 or rebuild it |
| `/log-in` | Thinkific sign-in | 301 | |
| `/tag/*` (12 thin archives) | `/blog` | 301 | Thin duplicate listings |
| `/author/*` | `/about` | 301 | |
| `/feed`, `/comments/feed` | `/feed.xml` | 301 | Keeps RSS subscribers |
| `/sitemap_index.xml`, `/post-sitemap.xml`, `/page-sitemap.xml`, `/category-sitemap.xml` | `/sitemap.xml` | 301 | |
| `/wp-admin/*`, `/wp-login.php`, `/xmlrpc.php` | — | 410 | Gone for good; cuts bot noise |

**No redirect chains.** Every redirect points at a final 200 URL. `www` → apex is a single hop. Run `npm run check:links` after any change; it fails the build if an internal link points at a missing page.

## Launch checklist

**Two weeks before**
- [ ] Export Search Console data for pianoforall.com (Performance: 16 months of queries and pages; Links; Indexing). Save it. This is the baseline.
- [ ] Crawl the live WordPress site (Screaming Frog or similar) and save the URL list. Diff it against this build's sitemap plus the redirect table. Any URL that has clicks or links and isn't covered gets a redirect.
- [ ] Re-run `npm run import:blog` so posts published since this build are included.
- [ ] Confirm checkout links in `src/data/site.ts` (vendor account, item numbers) by making a test purchase and refunding it.
- [ ] Confirm the facts flagged in `01-strategy-and-findings.md` §3.
- [ ] Add analytics (see `06-conversion-and-analytics.md`) and update the privacy policy to name the tool.
- [ ] Lower the DNS TTL for pianoforall.com to 300 seconds.

**Launch day**
- [ ] Deploy to Netlify; attach `pianoforall.com`, `www.pianoforall.com`, `pianoforall.academy`, `www.pianoforall.academy`. Netlify issues HTTPS certificates.
- [ ] Point DNS at Netlify. Keep the WordPress server running (unlinked) for 30 days as a fallback.
- [ ] Spot-check 30 old URLs, every row of the redirect table, and 10 blog posts, with `curl -I`.
- [ ] Search Console: submit `https://pianoforall.com/sitemap.xml`; use URL Inspection on the home, course, pricing and three guide pages.
- [ ] Bing Webmaster Tools: import from GSC, submit the sitemap.
- [ ] Add a Search Console property for `pianoforall.academy` (if not present) and verify the 301s. **Don't** use Change of Address for it: it had no meaningful presence.
- [ ] Update links you control: Udemy course descriptions and instructor bio, YouTube descriptions, email templates, Thinkific templates, ClickBank marketplace listing, affiliate resources page.

**First 8 weeks**
- [ ] Weekly: GSC Pages report (new "Not found (404)" or "Page with redirect" spikes), crawl stats, top queries vs baseline.
- [ ] Watch the `page_not_found` analytics event (fires with the requested path and referrer) and add redirects for anything with traffic.
- [ ] Expect some ranking movement for 2–6 weeks. Investigate any page that loses more than 30% of clicks for 3 weeks running.
- [ ] Keep every redirect permanently. Never remove them.
