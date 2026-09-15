# Printable Sudoku — puzzle PDF generator

A free printable-sudoku site: pick a difficulty, a puzzle count and a page
layout, and download a print-ready PDF with an optional answer key. Puzzles are
generated and verified in the browser; there is no backend and no database.

Built with Next.js (App Router) + TypeScript + Tailwind CSS, deployed to
Netlify as a static export. Live at <https://printablesudoku.org>.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Script              | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run build`     | Static export of every route into `out/`                  |
| `npm run preview`   | Serve `out/` the way Netlify will (clean URLs + headers)  |
| `npm run typecheck` | `tsc --noEmit`                                            |
| `npm run lint`      | ESLint with `next/core-web-vitals` + `next/typescript`    |
| `npm run samples`   | Regenerate the baked-in sample puzzles (see below)        |

### Previewing the build

`next start` cannot serve an `output: 'export'` build, so there is no `start`
script. `npm run preview` serves `out/` through `scripts/preview.mjs`, which
reproduces what Netlify does: clean URLs, `404.html` on a miss, and the header
rules from `netlify.toml` — including the content-type fix for the generated
Open Graph image.

## Deploying to Netlify

`netlify.toml` holds the whole deploy config:

- **Build command** `npm run build`, **publish directory** `out`.
- Content-type headers for `/opengraph-image` and `/apple-icon`. Next writes
  those generated PNGs without a file extension, so Netlify cannot infer their
  type and social scrapers would reject them. Do not remove those two rules.
- Long-lived cache headers for `/_next/static/*` (content-hashed by Next).
- The security headers, which live here rather than in `next.config.mjs`
  because a static export has no Next server left to run `headers()`.

Because `next.config.mjs` sets `output: 'export'`, no Netlify Next.js Runtime
and no serverless functions are involved — Netlify just publishes files. If you
later add something that needs a server (an API route, ISR, `next/image`
optimisation), remove `output: 'export'`, change `publish` to `.next`, and add
the `@netlify/plugin-nextjs` plugin.

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

1. Build a complete valid grid by randomised backtracking.
2. Remove clues one at a time in random order.
3. After each removal, run a bitmask solver with an MRV heuristic that counts
   solutions and stops at two. If a second solution exists, put the clue back.

So every puzzle that reaches a PDF is solver-verified to have exactly one
solution. This check is the expensive part of generation and it is not skipped.
Difficulty is a clue-count target: easy 38–45, medium 30–37, hard 25–29,
expert 20–24. A run may mix levels; they are dealt out round-robin so the split
is even, then ordered easiest first.

### The puzzle code, and why `src/lib/sudoku.ts` is a published format

Every puzzle prints a six-character code under its grid, e.g. `#K7M2A9`. That
code is not a key into a database — there is no database. It carries the
difficulty and the seed the puzzle was generated from, and `/sudoku-answers`
recomputes the whole puzzle, and therefore its solution, from those two things.

That only works because generation is **deterministic**: a puzzle is a pure
function of `(difficulty, seed)`. Two consequences for anyone editing the
engine:

- Nothing in `src/lib/sudoku.ts` may use `Math.random()`, the clock, or
  anything else that differs between machines. All randomness comes from the
  seeded PRNG. (The prototype's wall-clock bail-out in the removal loop was
  removed for exactly this reason; measurement showed the full loop costs about
  1ms for an easy puzzle and 9ms for an expert one, so it was protecting
  against nothing.)
- **Changing the order of PRNG calls, the fill order, or the removal loop
  changes what every code already printed on paper resolves to.** Codes would
  silently start returning a different grid. Treat that file as a published
  format rather than ordinary code.

`src/lib/puzzle-code.ts` holds the encoding: 30 bits of Crockford base32 as
seed (22) + difficulty (2) + checksum (6). Crockford's alphabet omits I, L, O
and U so nothing is confusable with 1 and 0, and the checksum rejects about
98.4% of single-character typos. The rest are caught by eye, because the lookup
page shows the puzzle grid beside the solution and it will not match the
reader's sheet.

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

## Naming and SEO

The site is called **Printable Sudoku**, which is also the primary target
keyword. That shapes two decisions worth knowing before you edit metadata:

- **Page titles carry no `| Printable Sudoku` suffix.** Appending the brand to
  every title would repeat the keyword in all fifteen of them, which reads as
  stuffing. Instead the homepage emits `WebSite` JSON-LD naming the site, which
  is what lets Google show the site name beside a result.
- **Body copy says "this site" rather than the brand name** in most places, so
  sentences read naturally instead of like "Printable Sudoku makes printable
  sudoku". The name appears in the wordmark, the footer, the PDF header and the
  structured data.

The rest:

- **Routes** live in `ROUTES` in `src/lib/site.ts`. `app/sitemap.ts` builds
  `sitemap.xml` from that list, so adding a page there is all that is needed.
- **Metadata** comes from `pageMetadata()` in `src/lib/seo.ts`: unique absolute
  title, description, canonical, Open Graph and Twitter card tags.
- **Structured data**: `WebSite` on the homepage, `WebApplication` on the tool
  pages, `FAQPage` wherever there is an FAQ, `BreadcrumbList` on the difficulty
  pages and guides, `Article` on the guides.
- **Two answer pages, deliberately distinct.** `/printable-sudoku-with-answers`
  is about printing a key at the back of the PDF and targets "printable sudoku
  with answers"; `/sudoku-answers` is the code lookup and targets "sudoku
  answers". They cross-link rather than repeat each other. Keep the intent
  separate if you edit either, or they will compete for the same query.
- **robots.txt** (`app/robots.ts`) allows all crawling and points at the sitemap.
- **`public/google*.html`** is the Google Search Console verification file. It
  is served verbatim at the root and must stay there — deleting it un-verifies
  the property.
- All page content is prerendered. Nothing SEO-critical is injected by client
  JS — the generator is interactive, but its surrounding copy, FAQs and sample
  grid are in the HTML on first load.

## Manual follow-ups before launch

1. **Only if the site moves again:** set `NEXT_PUBLIC_SITE_URL` under
   Netlify → Site configuration → Environment variables (all deploy contexts)
   to the new origin, no trailing slash, then redeploy. The default in
   `src/lib/site.ts` is `https://printablesudoku.org`, so canonicals, the
   sitemap, Open Graph URLs and the PDF footer are correct as deployed. The
   origin is not written down anywhere else.

   `netlify.toml` already carries a redirect from `printable-sudoku.netlify.app`
   to `printablesudoku.org` with `force = true`, so the old subdomain 301s to
   the real domain regardless of which one is set as primary in Netlify's
   dashboard. If the domain changes again, update that redirect's `to` (and
   add a new rule redirecting the previous domain, so old links and any
   accumulated search ranking keep following through) rather than relying on
   the primary-domain setting alone.
2. **Submit the sitemap to Google Search Console** and Bing Webmaster Tools:
   verify the domain, then submit `https://your-domain/sitemap.xml`. Also worth
   running the difficulty pages through the Rich Results Test to confirm the FAQ
   and breadcrumb markup is picked up.
3. **Open Graph image is confirmed serving** as `image/png` from the deployed
   site, which is the part that usually breaks. Worth one sanity check in a
   real link-preview debugger (Slack, X, LinkedIn) since each caches
   separately.
4. **The OG image is generated, not a placeholder** — `app/opengraph-image.tsx`
   renders the real sample puzzle at build time. Swap it only if you want
   different art direction; keep the 1200×630 size and the exported `alt`.
5. **Analytics.** None is installed, and `/privacy` says so explicitly, along
   with naming Netlify as the host. If you add analytics, or move hosts, update
   that page in the same commit — it makes specific promises.
6. **Verify a real print.** The PDF is laid out for A4 and US Letter with 16 mm
   margins. Print one page on the printer you care about before announcing.

## Licence / content

Puzzles are machine-generated. The site makes no ownership claim over the grids
a visitor produces.
