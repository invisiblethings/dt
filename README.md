# bbroofingpros.com: Astro rebuild

Static site for B&B Roofing & Gutters, built with [Astro](https://astro.build) and hosted on Netlify. No database and no client framework: every page is plain HTML and CSS, with a few small scripts (before/after slider, roof check quiz, project filters).

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
| `src/data/projects.json` + `src/assets/projects/` | 19 before/after pairs from CompanyCam. Each pair was checked to be the same viewpoint. |
| `src/assets/projects/exif/` + `scripts/restore-exif.mjs` | Each photo's original CompanyCam metadata (date, camera, GPS where the original had it), written back into every generated WebP after the build. Kept at the owner's request; customers have agreed. |
| `src/data/zips.ts` | Job counts per Staten Island ZIP (counts only, no addresses). |
| `src/data/reviews.ts` | Verbatim Google review excerpts. |
| `src/data/services.ts` | All services; `built: false` ones link to the estimate form until their pages exist. |
| `src/data/schema.ts` | JSON-LD (RoofingContractor, WebSite, Service, BreadcrumbList). |
| `src/components/` | Skyline edges, BeforeAfter slider, RoofCheck quiz, ZipMap, ReviewSigns, ProcessRidge, EstimateForm, … |
| `src/components/EstimateForm.astro` | Estimate form, handled by Netlify Forms (`estimate` and `estimate-full`). |
| `netlify.toml` | Build command, publish folder and Node version. |
| `public/_redirects` | 301s from old WordPress URLs. Check against the full WP URL list before launch. |
| `public/_headers` | Security headers and long cache for hashed assets. |

## Netlify setup

- Connect the GitHub repo in Netlify. `netlify.toml` already sets the build (`npm run build`, publish `dist`, Node 22).
- **Forms:** Netlify detects the two forms (`estimate`, `estimate-full`) from the built HTML on each deploy. In **Site configuration → Forms**:
  - enable form detection if it's off;
  - add an email notification to the office inbox for both forms.
  - Spam: the hidden `website` field is a honeypot, and Netlify also filters spam. A reCAPTCHA can be added later with `data-netlify-recaptcha="true"`.
  - Visitors land on `/thank-you/` after submitting.
- **Indexing:** pages get `noindex` automatically unless the build is the production deploy on `bbroofingpros.com`. Deploy previews, branch deploys and the `*.netlify.app` address are therefore never indexed. No action is needed at launch beyond adding the custom domain, then triggering a fresh deploy.
- `public/_redirects` and `public/_headers` use Netlify's file formats.
- **DNS:** before pointing the domain at Netlify, copy every existing DNS record (especially email MX, SPF and DKIM) so email keeps working.

## Owner to-dos

- NJ HIC registration number → `business.njLicense`
- Founding year → `business.founded`
- Facebook URL → `business.social`
- Exact financing partner wording → `business.financing`
- Same-spot before/after photos for gutters, siding and skylights (none exist yet)

## Next phase

Pages for roof repair, emergency repair, commercial roofing, skylights, gutters, siding, soffit & fascia, plus individual neighborhood pages. Flip `built: true` and add `href` in `services.ts` when each goes live.
