# Domain migration & redirect plan

## Decision: pianoforall.academy is the primary domain

| Domain | Role after launch |
|---|---|
| **pianoforall.academy** | **The new site (this build)** |
| pianoforall.com, www.pianoforall.com | 301 → pianoforall.academy, path by path |
| www.pianoforall.academy | 301 → pianoforall.academy |
| academy.pianoforall.com | Course player / LMS on Thinkific (unchanged) |

pianoforall.com is the older domain with the links and rankings, so this is a **domain move**. What keeps it safe:

- **Same paths.** The new site keeps pianoforall.com's URL format, so `pianoforall.com/beginner-keyboard-setup` becomes `pianoforall.academy/beginner-keyboard-setup`. All 39 blog posts, the categories and the image paths carry over unchanged.
- **One hop.** URLs that changed (e.g. `/order`) go straight from pianoforall.com to their final page on pianoforall.academy, with no chains.
- **Change of Address** in Search Console tells Google the move is deliberate.

> Confirm who controls the DNS for all three domains and the Thinkific school before launch.

## Do not redirect academy.pianoforall.com wholesale

The subdomain hosts the **course player**: student logins, enrolments, lesson pages, the free Test Drive and the community. Redirecting it would lock paying students out. Instead:

1. Keep Thinkific on `academy.pianoforall.com`.
2. In Thinkific, simplify the site pages so they stop competing with the main site:
   - Replace the Thinkific home page and `/pages/all-courses` with a short "Sign in to your courses / Go to pianoforall.academy" page, or redirect them if your Thinkific plan supports custom redirects.
   - Course landing pages (`/courses/...`) double as enrolment pages, so keep them, but point their header/footer links and "Find out more" buttons to the matching pianoforall.academy page. Where Thinkific's SEO settings allow, hide them from search engines (noindex) so pianoforall.academy is the version that ranks.
   - Remove links to `pianoforall8634.live-website.com` (the old dev hostname) from all Thinkific templates.
3. Leave `robots.txt` on the subdomain as Thinkific sets it.

| academy.pianoforall.com URL | Action | Main-site equivalent |
|---|---|---|
| `/` | Repoint links / redirect if possible | `https://pianoforall.academy/` |
| `/pages/all-courses`, `/collections`, `/collections/products`, `/pages/more-courses` | Repoint links / redirect if possible | `/pricing` |
| `/courses/pianoforall-learn-piano-by-ear-rhythm-style` | Keep (enrolment); noindex if possible | `/course` |
| `/courses/moonlight-sonata-1st-movement-learn-piano-by-ear` | Keep; noindex if possible | `/classics-by-ear/moonlight-sonata` |
| `/courses/erik-satie-gnossiennes-learn-piano-by-ear` | Keep; noindex if possible | `/classics-by-ear/erik-satie-gnossiennes` |
| `/courses/bach-preludes-bwv-846-847-learn-piano-by-ear` | Keep; noindex if possible | `/classics-by-ear/bach-preludes` |
| `/bundles/*` | Keep; noindex if possible | `/pricing#bundles` |
| `/courses/pianoforall-academy-test-drive` | **Keep** (free lessons are switched off on the main site for now) | `/free-lessons` when re-enabled |
| `/pages/7-days-free-trial` | Check if any funnel uses it; otherwise retire | `/pricing` |
| `/pages/gift-a-course` | Repoint | `/gift` |
| `/users/sign_in`, `/enrollments`, lessons | **Untouched** | Linked from header "Sign in" |

## How the redirects are set up

All redirects come from **`src/data/redirects.ts`** (old paths) and **`src/data/site.ts`** (checkout links). The build writes them to `dist/_redirects`, which Netlify reads. Order matters, and the generated file follows it:

1. `/go/...` checkout links → ClickBank (302)
2. `pianoforall.com/<changed path>` and `www.` → final page on pianoforall.academy (301)
3. Changed paths on pianoforall.academy itself (301), WordPress system paths (410)
4. `pianoforall.com/*`, `www.pianoforall.com/*`, `www.pianoforall.academy/*` → same path on pianoforall.academy (301)

For step 2 and 4 to work, **pianoforall.com and www.pianoforall.com must be added as domain aliases on the same Netlify site** and their DNS pointed at Netlify. Until then, WordPress keeps serving pianoforall.com.

The old pianoforall.academy single-page site had only `/`, `/terms.html` and `/privacy.html`. The last two redirect to `/terms-of-use` and `/privacy-policy`; `/` is the new home page.

## pianoforall.com → pianoforall.academy: page by page

**Same path on the new domain:** `/`, `/contact`, `/privacy-policy`, `/terms-of-use`, `/affiliate-program`, `/am-i-too-old-to-learn-piano`, `/blog`, `/thanks-for-joining`, all 7 `/category/*` pages, and **all 39 blog posts** (imported with identical slugs by `scripts/import-wordpress.mjs`). Images keep their `/wp-content/uploads/…` paths too, so image search traffic and hotlinks survive.

**Changed paths (in `src/data/redirects.ts`):**

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

**No redirect chains.** Every redirect points at a final 200 URL. `www` → apex is a single hop. Run `npm run check:links` after any change; it fails if an internal link points at a missing page. Links inside imported blog posts that point at old paths are rewritten to the new page at build time.

## Launch checklist

**Two weeks before**
- [ ] Export Search Console data for pianoforall.com (Performance: 16 months of queries and pages; Links; Indexing). Save it. This is the baseline.
- [ ] Crawl the live WordPress site (Screaming Frog or similar) and save the URL list. Diff it against this build's sitemap plus the redirect table. Any URL that has clicks or links and isn't covered gets a redirect.
- [ ] Re-run `npm run import:blog` so posts published since this build are included.
- [ ] Click each `/go/...` link on the deployed preview and confirm the right ClickBank order form and price opens (checked locally on 8 Oct 2026: all six OK).
- [ ] Confirm the facts flagged in `01-strategy-and-findings.md` §3.
- [ ] Add analytics (see `06-conversion-and-analytics.md`) and update the privacy policy to name the tool.
- [ ] Lower the DNS TTL for pianoforall.com and pianoforall.academy to 300 seconds.

**Launch day**
- [ ] Deploy to Netlify with `pianoforall.academy` as the primary domain; add `www.pianoforall.academy`, `pianoforall.com` and `www.pianoforall.com` as aliases. Netlify issues HTTPS certificates.
- [ ] Point DNS for all four hostnames at Netlify. Keep the WordPress server running (unlinked) for 30 days as a fallback.
- [ ] Spot-check with `curl -I`: 30 old pianoforall.com URLs (each must return one 301 to the matching pianoforall.academy page), every row of the redirect table, 10 blog posts, and all `/go/` links.
- [ ] Search Console: verify the `pianoforall.academy` property (domain property recommended), submit `https://pianoforall.academy/sitemap.xml`, and use URL Inspection on the home, course, pricing and three guide pages.
- [ ] Bing Webmaster Tools: import from GSC, submit the sitemap.
- [ ] In the **pianoforall.com** Search Console property, run **Settings → Change of Address** to pianoforall.academy. Google checks that the home page and a sample of URLs 301 to the new domain, so do this after DNS has switched.
- [ ] Keep the pianoforall.com property verified and watch it; it should drain to zero indexed pages over the following months.
- [ ] Update links you control to pianoforall.academy: Udemy course descriptions and instructor bio, YouTube descriptions, email templates, Thinkific templates, ClickBank marketplace listing, affiliate resources page.

**First 8 weeks**
- [ ] Weekly: GSC Pages report (new "Not found (404)" or "Page with redirect" spikes), crawl stats, top queries vs baseline.
- [ ] Watch the `page_not_found` analytics event (fires with the requested path and referrer) and add redirects for anything with traffic.
- [ ] Domain moves usually see ranking movement for several weeks. Investigate any page that loses more than 30% of clicks for 3 weeks running.
- [ ] Keep every redirect permanently. Never remove them.
