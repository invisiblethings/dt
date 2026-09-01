# Grid Press — printable sudoku PDF generator

A free printable-sudoku site: pick a difficulty, a puzzle count and a page
layout, and download a print-ready PDF with an optional answer key. Puzzles are
generated and verified in the browser; there is no backend and no database.

Built with Next.js (App Router) + TypeScript + Tailwind CSS, deployed to Vercel.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run build`     | Production build (all routes prerender to static HTML)    |
| `npm start`         | Serve the production build                                |
| `npm run typecheck` | `tsc --noEmit`                                            |
| `npm run lint`      | ESLint with `next/core-web-vitals` + `next/typescript`    |
| `npm run samples`   | Regenerate the baked-in sample puzzles (see below)        |

## How it fits together

```
src/
  lib/sudoku.ts        Engine: solved-grid generator, uniqueness solver, puzzle builder
  lib/pdf.ts           jsPDF layout — pages, grids, labels, footers, answer key
  lib/samples.ts       Pre-generated sample puzzles (generated file — see npm run samples)
  lib/site.ts          Site identity + the route list the sitemap is built from
  lib/seo.ts           Per-page metadata, JSON-LD builders
  workers/             Web Worker wrapping the engine for batch generation
  components/          UI, including the client-side <Generator />
  content/             Page copy: difficulty landing pages, FAQs, guide metadata
  app/                 Routes, sitemap.ts, robots.ts, opengraph-image.tsx
```

### Puzzle generation

Ported from the original prototype and unchanged in behaviour:

1. Build a complete valid grid by randomised backtracking.
2. Remove clues one at a time in random order.
3. After each removal, run a bitmask solver with an MRV heuristic that counts
   solutions and stops at two. If a second solution exists, put the clue back.

So every puzzle that reaches a PDF is solver-verified to have exactly one
solution. This check is the expensive part of generation and it is not skipped.
Difficulty is a clue-count target: easy 38–45, medium 30–37, hard 25–29,
expert 20–24.

Batch generation runs in a Web Worker (`src/workers/sudoku.worker.ts`), so a
60-puzzle run never blocks the UI. Progress is streamed back one puzzle at a
time.

### Code splitting

The generator UI renders immediately; the heavy parts load on first use:

- the worker bundle (~2 KB) is fetched when Generate is first pressed,
- `jspdf` (~335 KB) is `await import()`-ed only when a PDF is actually built.

First Load JS is ~110 KB on generator pages. If you add an import of `@/lib/pdf`
or `@/lib/sudoku` at the top level of a client component, that split is lost —
keep them behind dynamic imports.

### Sample puzzles

`src/lib/samples.ts` is a generated file holding one puzzle per difficulty.
They are baked in so every page ships a real, crawlable puzzle grid in its
server-rendered HTML rather than computing one on the client. Regenerate with
`npm run samples` (uses Node's `--experimental-strip-types`, so Node 22.6+).

## SEO

- **Routes** live in `ROUTES` in `src/lib/site.ts`. `app/sitemap.ts` builds
  `sitemap.xml` from that list, so adding a page there is all that is needed.
- **Metadata** comes from `pageMetadata()` in `src/lib/seo.ts`: unique title
  (absolute, so nothing runs past ~60 characters), description, canonical, Open
  Graph and Twitter card tags.
- **Structured data**: `WebApplication` on the tool pages, `FAQPage` wherever
  there is an FAQ, `BreadcrumbList` on the difficulty pages and guides,
  `Article` on the guides.
- **OG image** is generated at build time by `app/opengraph-image.tsx` from the
  medium sample puzzle, and applies site-wide.
- **robots.txt** (`app/robots.ts`) allows all crawling and points at the sitemap.
- All page content is server-rendered. Nothing SEO-critical is injected by
  client JS — the generator is interactive, but its surrounding copy, FAQs and
  sample grid are in the HTML on first load.

## Manual follow-ups before launch

These are the things that are deliberately left for you:

1. **Set the production domain.** `NEXT_PUBLIC_SITE_URL` defaults to
   `https://gridpress.app`. Set it in Vercel → Settings → Environment Variables
   (all environments) to your real origin, no trailing slash. It drives every
   canonical, the sitemap, Open Graph URLs and the footer printed inside
   generated PDFs. Nothing else needs changing.
2. **Submit the sitemap to Google Search Console** and Bing Webmaster Tools:
   verify the domain, then submit `https://your-domain/sitemap.xml`. Also worth
   running the difficulty pages through the Rich Results Test to confirm the
   FAQ and breadcrumb markup is picked up.
3. **Twitter handle.** `SITE.twitter` in `src/lib/site.ts` is a placeholder
   (`@gridpress`). Either point it at a real account or drop it — it is not
   currently emitted, so this only matters if you add `twitter.site` to the
   metadata.
4. **The OG image is generated, not a placeholder** — it renders the real sample
   puzzle. Swap `app/opengraph-image.tsx` only if you want different art
   direction. If you do, keep the 1200×630 size and the exported `alt` string.
5. **Analytics.** None is installed, and `/privacy` says so explicitly. If you
   add any, update that page in the same commit — it makes a specific promise.
6. **Verify a real print.** The PDF is laid out for A4 and US Letter with 16 mm
   margins. Print one page on the printer you care about before announcing the
   site.

## Licence / content

Puzzles are machine-generated. The site makes no ownership claim over the grids
a visitor produces.
