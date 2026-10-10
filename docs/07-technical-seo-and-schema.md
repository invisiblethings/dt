# Technical SEO checklist & structured data

## Status of this build

| Item | Status | Notes |
|---|---|---|
| Server-rendered HTML | ✅ | Astro static output. Every page ships complete HTML; the old `.academy` SPA shipped an empty `<div>`. |
| JavaScript | ✅ | No framework runtime. ~4 KB of site JS plus small per-tool scripts. All content readable without JS. |
| URL structure | ✅ | Lowercase, hyphenated, no trailing slash (matches old WordPress URLs), no dates, max two levels. |
| Canonical tags | ✅ | Absolute self-canonicals on every page from `SITE_URL`. |
| Indexability | ✅ | `index, follow, max-image-preview:large` by default; `noindex` on 404, thank-you page and categories with fewer than 3 posts. |
| XML sitemap | ✅ | `/sitemap.xml`, built from real pages; noindexed pages excluded; `lastmod` from post dates. |
| robots.txt | ✅ | Allows all crawlers including AI crawlers (the goal is to be cited); declares sitemap. |
| llms.txt | ✅ | `/llms.txt`: a plain-text summary of facts and key URLs. Low cost; no search engine has committed to using it, so treat it as optional. |
| RSS | ✅ | `/feed.xml`; old `/feed` redirects. |
| Breadcrumbs | ✅ | Visible on all inner pages plus `BreadcrumbList` schema. |
| Headings | ✅ | Exactly one H1 per page (enforced by `npm run check:links`). |
| Titles and descriptions | ✅ | Unique; checked for length and duplicates by the QA script. Full list: `04-page-inventory.md`. |
| Open Graph / X cards | ✅ | Per-page title, description and 1200×630 image. |
| Images | ✅ | Astro converts to WebP with `srcset`/`sizes`, sets width/height (no CLS), lazy-loads below the fold. Descriptive alt text on content images. Imported blog images had none, so the importer derives alt from file names: **replace these with real alt text over time.** |
| Video | ✅ | Click-to-load Vimeo (no third-party JS until clicked) and `VideoObject` schema. |
| Fonts | ✅ | Two self-hosted variable WOFF2 files, preloaded, `font-display: swap`. |
| Caching headers | ✅ | Hashed assets immutable for 1 year (`netlify.toml`). |
| HTTPS / HSTS | ✅ | Netlify certificates; HSTS header. |
| Security headers | ✅ | nosniff, referrer policy, frame options, permissions policy. |
| 404 | ✅ | Helpful 404 with links, `noindex`, fires `page_not_found`. |
| Redirects | ✅ | Single-hop 301s, no chains; see `05-migration-and-redirects.md`. |
| Hreflang | ➖ Not used | English-only site for an international audience; no language versions exist. Add only if translated pages are created. |
| Pagination | ➖ Not needed | 39 posts on one blog index. Add paginated archives once it passes ~60 posts. |
| Accessibility | ✅ | Skip link, focus styles, semantic landmarks, AA contrast, 44 px+ tap targets, reduced-motion support. Lighthouse accessibility 96–100 on tested pages. |

### Lighthouse (mobile, local build, Oct 2026)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 99 | 96 → fixed | 100 | 100 | 2.1 s | 0 |
| `/course` | 99 | 96 → fixed | 100 | 100 | 2.0 s | 0 |
| `/learn/piano-chords-for-beginners` | 100 | 93 → fixed | 100 | 100 | 1.7 s | 0 |
| `/reviews` | 100 | 96 → fixed | 100 | 100 | 1.7 s | 0 |

The flagged accessibility items (a low-contrast ghost button on dark backgrounds, video button labels, underline on footer links) were fixed after this run.

### QA commands
```bash
npm run build          # build the site
npm run check:links    # internal links, h1s, titles, descriptions, JSON-LD, alt attributes
node scripts/page-inventory.mjs   # regenerate docs/04-page-inventory.md
```

## Structured data

Every page carries one JSON-LD `@graph` linking entities by `@id`, so search engines and AI systems see one consistent organisation, founder and website.

| Type | Where | Why it's honest |
|---|---|---|
| `Organization` | All pages | Name, logo, founding year, founder, email: all on `/about` |
| `WebSite` | All pages | No `SearchAction`: the site has no search box |
| `Person` (Robin Hall) | All pages, `AboutPage` on `/about` | Facts from Robin's own about page |
| `WebPage` | All pages | |
| `BreadcrumbList` | Inner pages | Matches the visible breadcrumbs |
| `Course` + `Offer` + `CourseInstance` | `/`, `/course`, each Classics page | Price, workload (video hours) and syllabus visible on the page |
| `VideoObject` | Pages with a visible video | Vimeo metadata (duration, upload date) |
| `FAQPage` | Pages showing an FAQ | Answers come from the same data file as the visible text. Google now shows FAQ rich results only for authoritative government and health sites, so expect no rich result. It still clarifies Q&A pairs for other search engines and AI systems. |
| `Article` | Guides and blog posts | Author is Robin (his own articles) or the Pianoforall organisation (new guides until Robin reviews them) |
| `ItemList` | `/classics-by-ear` | |
| `CollectionPage`, `Blog` | `/learn`, `/blog` | |
| `ContactPage` + `ContactPoint` | `/contact` | |

**Intentionally not used**
- `AggregateRating` / `Review`: Google doesn't show review stars for an organisation's reviews of its own products, and the Udemy rating belongs to Udemy's page. The rating appears as linked text instead.
- `Product`: `Course` with `Offer` describes the thing better; adding both duplicates the entity.
- `HowTo`: Google retired HowTo rich results.

Validate with the Rich Results Test and the Schema.org validator after deployment.
