# Pianoforall website

The rebuilt marketing site for Pianoforall: a static [Astro](https://astro.build) site for **pianoforall.academy**. **pianoforall.com** redirects into it page by page. The Thinkific course player at **academy.pianoforall.com** stays where it is.

Start with **[docs/01-strategy-and-findings.md](docs/01-strategy-and-findings.md)**. It covers what exists today, what was kept and cut, and the facts that need confirming.

## Run it

```bash
npm install
npm run dev            # http://localhost:4321
npm run build          # static output in dist/
npm run check:links    # QA: links, h1s, titles, descriptions, JSON-LD, alt text
npm run import:blog    # re-import posts from the live WordPress site
```

Node 22. Deploys to Netlify as-is (`netlify.toml` holds the build settings and headers; the build generates `dist/_redirects`).

## Where to change things

| You want to change… | Edit |
|---|---|
| Prices, checkout links (`/go/...` → ClickBank), Udemy rating, contact email, primary domain | `src/data/site.ts` |
| Turn the free lessons back on | `FEATURES.freeLessons` in `src/data/site.ts`, then rename `src/pages/_free-lessons.astro` to `free-lessons.astro` (the temporary `/free-lessons` redirect switches off by itself) |
| FAQ answers (also feed FAQ schema) | `src/data/faqs.ts` |
| Testimonials | `src/data/testimonials.ts` |
| Book descriptions | `src/data/books.ts` |
| Classics By Ear course copy | `src/data/classics.ts` |
| Learn hub listing | `src/data/guides.ts` |
| Which guide each blog category links to | `src/data/blog-map.ts` |
| Colours, fonts, spacing | `src/styles/global.css` (`:root` tokens) |
| Blog posts | `src/content/blog/*.md` (front matter + HTML) |
| Redirects (old URLs, old domains) | `src/data/redirects.ts` (the build writes `dist/_redirects`) |
| Security and cache headers | `netlify.toml` |

## Structure

```
src/
  pages/            one file per URL (index, course, pricing, learn/…, classics-by-ear/…)
  pages/[slug].astro   blog posts at the site root, same URLs as WordPress
  layouts/          Base (head, SEO, schema), Article (guides and posts), Legal
  components/       Header, Footer, ChordExplorer, Video, Quote, FaqList, …
  data/             facts, prices, FAQs, testimonials (single source of truth)
  lib/schema.ts     structured-data builders
  scripts/site.ts   menu, sticky CTA, click-to-load video, analytics events
public/
  wp-content/uploads/  blog images at their original WordPress paths
  og/, brand/, fonts/
scripts/            WordPress importer, link checker, page inventory
docs/               strategy and plans (below)
```

## Docs

1. [Strategy & findings](docs/01-strategy-and-findings.md)
2. [Keyword & content map](docs/02-keyword-and-content-map.md)
3. [Competitor analysis](docs/03-competitor-analysis.md)
4. [Page inventory: titles, descriptions, headings, schema](docs/04-page-inventory.md) (generated)
5. [Domain migration & redirect plan](docs/05-migration-and-redirects.md)
6. [Conversion strategy & analytics plan](docs/06-conversion-and-analytics.md)
7. [Technical SEO checklist & structured data](docs/07-technical-seo-and-schema.md)
8. [Content roadmap](docs/08-content-roadmap.md)
9. [Design & UX notes](docs/09-design-and-ux.md)
10. [Google Ads launch plan](docs/10-google-ads.md) (import files in `docs/google-ads/`)
