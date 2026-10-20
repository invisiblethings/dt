# bbroofingpros.com: Astro rebuild

Static site for B&B Roofing & Gutters, built with [Astro](https://astro.build) and meant to be hosted on Cloudflare Pages. No database and no client framework: every page is plain HTML and CSS, with a few small scripts (before/after slider, roof check quiz, project filters).

## Commands

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs dist/
npm run preview   # serve dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/data/business.ts` | Name, address, phone, hours, license, stats, warranty. **Single source of truth for NAP**: edit here, not in pages. |
| `src/data/projects.json` + `src/assets/projects/` | 19 before/after pairs from CompanyCam. Each pair was checked to be the same viewpoint; EXIF/GPS stripped. |
| `src/data/zips.ts` | Job counts per Staten Island ZIP (counts only, no addresses). |
| `src/data/reviews.ts` | Verbatim Google review excerpts. |
| `src/data/services.ts` | All services; `built: false` ones link to the estimate form until their pages exist. |
| `src/data/schema.ts` | JSON-LD (RoofingContractor, WebSite, Service, BreadcrumbList). |
| `src/components/` | Skyline edges, BeforeAfter slider, RoofCheck quiz, ZipMap, ReviewSigns, ProcessRidge, EstimateForm, … |
| `functions/api/estimate.js` | Cloudflare Pages Function that emails estimate requests. |
| `public/_redirects` | 301s from old WordPress URLs. Check against the full WP URL list before launch. |
| `public/_headers` | Security headers and long cache for hashed assets. |

## Cloudflare Pages setup

- Build command `npm run build`, output directory `dist`, Node 20+.
- Environment variables for the form:
  - `RESEND_API_KEY`: API key from resend.com (free tier is enough).
  - `LEAD_TO`: inbox that receives leads, e.g. `info@bbroofingpros.com`.
  - `LEAD_FROM`: verified sender, e.g. `B&B Website <leads@bbroofingpros.com>`.
  - `TURNSTILE_SECRET` (optional): enables Cloudflare Turnstile verification. If set, add the Turnstile widget to `EstimateForm.astro`.
- Without `RESEND_API_KEY` the function logs the lead and still shows the thank-you page (preview mode).

## Owner to-dos

- NJ HIC registration number → `business.njLicense`
- Founding year → `business.founded`
- Facebook URL → `business.social`
- Exact financing partner wording → `business.financing`
- Same-spot before/after photos for gutters, siding and skylights (none exist yet)

## Next phase

Pages for roof repair, emergency repair, commercial roofing, skylights, gutters, siding, soffit & fascia, plus individual neighborhood pages. Flip `built: true` and add `href` in `services.ts` when each goes live.
