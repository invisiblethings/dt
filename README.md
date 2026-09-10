# Brooklyn Roof Repair — brooklynroof.repair

A semantic-SEO-first marketing site for a Brooklyn roof repair business, built with [Astro](https://astro.build) as a fast, fully static site.

## Stack

- **Astro 7** — static output, per-page meta/schema, fast Core Web Vitals
- **@astrojs/sitemap** — auto-generated `sitemap-index.xml`
- **@fontsource-variable/montserrat** — self-hosted brand typeface (no third-party font request)
- No client-side framework — plain HTML/CSS/a few inline `<script>` tags for the mobile menu

## Structure

```
src/
  components/       Header, Footer, Logo/icons, cards, FAQ accordion, SEO + JSON-LD helpers
  data/             site.js (NAP/contact), services.js (12 services), neighborhoods.js (10 areas)
  content/blog/     Markdown articles (long-tail semantic content)
  layouts/Layout.astro   Shared shell: head tags, header, footer, sitewide LocalBusiness schema
  lib/schema.js     JSON-LD builders (LocalBusiness, Service, FAQPage, BreadcrumbList)
  pages/
    index.astro
    services/[slug]/       12 service pages, generated from data/services.js
    service-areas/[slug]/  10 neighborhood pages, generated from data/neighborhoods.js
    blog/[slug]/            Articles, generated from content/blog/*.md
    about/, contact/, faq/, privacy-policy/, terms/, 404.astro
public/
  favicon.svg, favicon.ico, favicon-*.png, apple-touch-icon.png, site.webmanifest, og-image.jpg
  robots.txt
```

## Content architecture (why it's built this way)

This is a **semantic SEO** build, not a single page stuffed with keywords:

- **Service pillar pages** (`/services/*`) cover every major roof-repair topic in depth — each with its own unique intro, signs/symptoms, process, benefits, and FAQ (with `FAQPage` schema).
- **Neighborhood pages** (`/service-areas/*`) cover the 10 largest Brooklyn neighborhoods, each with a genuinely unique intro tied to that neighborhood's actual building stock and landmarks — not a templated "city name swapped in" doorway page.
- **Blog articles** (`/blog/*`) target long-tail informational queries (cost, repair-vs-replace, storm damage signs, flat vs. shingle, maintenance checklist) and internally link back to the relevant service pages.
- Every page carries `BreadcrumbList` schema, and the sitewide `RoofingContractor` (LocalBusiness) schema is injected on every page via `Layout.astro`.

To add a new service or neighborhood, add one object to `src/data/services.js` or `src/data/neighborhoods.js` — the corresponding page, nav entries, sitemap entry, and schema are generated automatically. Write a genuinely unique intro/FAQ for each entry; don't copy-paste between entries, since near-duplicate content across a large page set is exactly what semantic SEO is trying to avoid.

## Before launch — things to swap out

1. **Testimonials on the homepage are placeholder text**, not real customer quotes. Replace `src/pages/index.astro`'s `TestimonialCard` entries with real reviews before launch — do not add review/rating schema markup to fabricated quotes.
2. **Phone number, email, and hours** live in `src/data/site.js` — update once, it flows everywhere (header, footer, schema, contact page).
3. **Logo/icons were redrawn as SVG** (`src/components/LogoMark.astro`, `Logo.astro`, `Icon.astro`) based on the brand kit reference sheet you provided, not extracted from the flat PNG. If you have the original vector/Illustrator files from whoever designed the brand kit, a designer should sanity-check these against the source.
4. **Contact form** (`src/pages/contact/index.astro`) is wired for **Netlify Forms** (`data-netlify="true"`) — this works automatically with zero backend if you deploy to Netlify. If you deploy elsewhere (Vercel, Cloudflare Pages, etc.), swap in a form backend like Formspree, or a serverless function.
5. **Social links** (`site.social` in `src/data/site.js`) point to placeholder URLs — update to your real Facebook/Instagram/Google Business Profile.
6. **`og-image.jpg`** was generated programmatically from the logo composition — regenerate it if the logo changes (source SVG is in the git history / can be regenerated from `LogoMark.astro`'s markup).

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Deployment

This is a static site — deploy the `dist/` output (or connect the repo directly) to Netlify, Vercel, Cloudflare Pages, or any static host. Point `brooklynroof.repair` at whichever host you choose via DNS.

`astro.config.mjs` has `site: 'https://brooklynroof.repair'` set, which the sitemap and canonical URLs depend on — update this first if the domain ever changes.

After launch: submit `https://brooklynroof.repair/sitemap-index.xml` to Google Search Console and Bing Webmaster Tools, and connect a Google Business Profile for the local-pack (map) results — this site's on-page SEO supports organic search, but the Business Profile is what surfaces you in Google Maps/local-pack results, and is a separate, free setup outside this codebase.
