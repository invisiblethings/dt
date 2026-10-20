# AXE Contracting Group: axecontracting.org

Static, local-SEO-first website for AXE Contracting Group, a general contractor on
Staten Island, NY. Hosted on **DigitalOcean App Platform** (free static site) from this repo.

- **Site plan, keyword map and design concept:** [`SITE-STRUCTURE.md`](SITE-STRUCTURE.md)
- **Built site (what gets deployed):** `public/`. Committed, served as-is.
- **Source:** `src/`

## Editing

| What | Where |
|---|---|
| Phone, email, hours, address, license #, form endpoint | `src/config.py` |
| Service pages (copy, FAQs, titles, meta) | `src/content/services.py` |
| Area pages | `src/content/areas.py` |
| Guides | `src/content/guides.py` |
| Google reviews (verbatim) | `src/content/reviews.py` |
| Page templates, JSON-LD, sitemap | `src/build.py` |
| Technical drawings (SVG) | `src/drawings.py` |
| Styles / scripts | `src/static/site.css`, `src/static/site.js` |

Then rebuild and commit `public/`:

```bash
python3 src/build.py          # standard library only; Pillow optional (renders og-image + icons)
python3 -m http.server -d public 8080   # preview at http://localhost:8080
```

Pushing to `main` redeploys automatically (see `.do/app.yaml`).

## Launch checklist (open TODOs)

1. **License #:** set `hic_license` in `src/config.py` (NYC DCWP Home Improvement Contractor).
   It then appears in the footer, title block, About page and schema.
2. **Address:** set `street` / `postal_code` only if the client wants it public; otherwise the site
   stays marked up as a service-area business.
3. **Form:** create a Formspree form (or similar) and set `FORM_ENDPOINT`. Until then, the estimate
   form opens the visitor's email app with the request pre-filled to support@axecontracting.org.
4. **Photos:** add real project photos to `/projects/` and the service pages (WebP, ≤ 200 KB,
   descriptive file names and alt text).
5. **DigitalOcean:** create the app from `.do/app.yaml`, add `axecontracting.org` + `www`, update DNS.
6. **Google:** verify in Search Console and submit `https://axecontracting.org/sitemap.xml`;
   set the Google Business Profile website to `https://axecontracting.org/`; make the GBP
   services list match the service pages. Do the same in Bing Webmaster Tools.
7. **Redirects:** the old site used `/services`, `/about` and `/contact`, which all still exist here.
