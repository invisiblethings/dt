# moldremediation.nyc

Static website for **Mold Remediation NYC**, hosted on Netlify. There are no dependencies: a small Node script builds 70 pages into `dist/`.

```bash
npm run build   # → dist/
npm run serve   # build + preview at http://localhost:8080
```

## Deploying on Netlify

1. Connect this repo in Netlify. `netlify.toml` already sets the build command (`node build/build.mjs`) and the publish folder (`dist`).
2. **Enable forms:** go to Site configuration → Forms and turn on **form detection**, then redeploy. Netlify will find three forms:
   | Form | Used on | Fields |
   |---|---|---|
   | `estimate` | Home, estimate page, every service/area page, cost estimator, risk check | problem, location, size, zip, property type, urgency, name, phone, email, message, `details` (estimator or quiz answers), `source` (the page it came from) |
   | `callback` | Sidebars on service, area and guide pages | name, phone, zip, source |
   | `photo-quote` | `/photo-quote/` | up to 3 photos (8 MB total; the page shrinks phone photos first), name, phone, email, zip, message |
3. **Lead alerts:** go to Forms → Form notifications and add an **email notification** (e.g. info@moldremediation.nyc) for *each* form. You can also add Slack or SMS through a webhook.
4. Add the domain `moldremediation.nyc` and set www to redirect to the apex.
5. After launch, submit `https://moldremediation.nyc/sitemap.xml` in Google Search Console.

Spam is filtered with Netlify's honeypot field (`bot-field`). Every submission redirects to `/thank-you/`, which is set to noindex. Point your conversion tracking at that page.

## Editing content

| What | File |
|---|---|
| Phone, address, licenses, Google rating and review count, social links, GA4 ID | `build/data/business.mjs` |
| Google reviews shown on the site | `build/data/business.mjs` → `reviews` |
| **Prices** (the `/cost/` page and estimator only) | `build/data/pricing.mjs` |
| Services (8 pages) | `build/data/services.mjs` |
| Boroughs + neighborhood pages | `build/data/areas.mjs` |
| Guides | `build/pages/guides.mjs` |
| Styles / scripts | `static/css/site.css`, `static/js/site.js` |
| Photos | `static/images/` (WebP, several sizes each; see `IMAGES` in `build/lib/html.mjs`) |

To turn on analytics, put your GA4 ID in `business.analytics.ga4`. The site already sends events for phone clicks, form steps, leads, ZIP checks, the estimator and the risk check.

## Site map

- `/`: home, with the ZIP checker, Mold Clock, "Where mold hides" building explorer, the NY-law explainer, reviews, estimate form and map
- `/mold-removal/` + 8 service pages
- `/service-areas/`, 5 borough pages (`/brooklyn/` …) + 34 neighborhood pages (`/brooklyn/park-slope/` …)
- Tools: `/free-estimate/`, `/photo-quote/`, `/cost/` (estimator), `/mold-risk-check/` (quiz)
- Authority pages: `/nyc-mold-law/`, `/how-it-works/`, `/property-managers/`, `/insurance/`, `/guides/` + 4 articles
- `/reviews/`, `/about/`, `/contact/`, `/faq/`, `/privacy/`, `/thank-you/`, `404`
- Also generated: `sitemap.xml`, `robots.txt`, `llms.txt` (a summary for AI search tools)
