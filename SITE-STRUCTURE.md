# AXE Contracting Group — Website Structure

Rebuild of https://axecontracting.org/ as a fast, static, local-SEO-first site for a
Staten Island general contractor. Hosting: **DigitalOcean App Platform (free static site)**
deployed from this GitHub repo.

---

## 1. Business facts (source of truth)

| Field | Value | Status |
|---|---|---|
| Name | AXE Contracting Group | confirmed (current site) |
| Phone | (347) 265-1229 | confirmed |
| Email | support@axecontracting.org | confirmed |
| Hours | Mon–Sat, 8:00 AM – 6:00 PM | confirmed (current site) |
| Base | Staten Island, NY | confirmed |
| Also serves | Brooklyn, Manhattan | confirmed |
| Owner / lead | Angel (Engjel) | from Google reviews |
| Insurance | Insured; provides COIs for condo/co-op boards | from Google reviews |
| Street address | — | **TODO** (treated as a service-area business until supplied) |
| NYC DCWP HIC license # | — | **TODO** (not displayed until supplied) |
| Project photos | — | **TODO** (SVG technical drawings used meanwhile) |
| Google Business Profile URL | https://share.google/VGBW093pRHXSenrR7 | confirmed |

All of this lives in one config block (`src/config.py`), so filling a TODO there updates every page,
the JSON-LD and the footer together.

---

## 2. Design concept: "The Drawing Set"

Most contractor sites use a hero photo, three service cards and a testimonial carousel.
This one is styled as a **construction drawing set**, the kind of document a GC works from every day.

- **Every page is a "sheet."** Each page gets a sheet number (`A-000` Home, `S-101` Roofing,
  `Z-201` South Shore…) and a fixed **title block** on the right edge, like a real drawing. The
  title block holds the call-to-action: phone, hours, and *Request an estimate*. On mobile it
  becomes a bottom bar.
- **Vellum and blueprint.** Light mode is warm drafting vellum with a faint grid. Dark mode is a
  cyanotype blueprint with white linework.
- **Linework, not stock photos.** Each service has its own technical "detail" drawing as an SVG
  (shingle courses, herringbone pavers, a tile grid, a cabinet elevation…). The drawings
  draw themselves in as they scroll into view.
- **Hero "Drawing ↔ Built" slider.** An elevation of a Staten Island two-family home; drag the
  handle to go from blueprint linework to the finished, painted house.
- **Services as a Sheet Index.** A drawing-set index table (Sheet / Title / Scope) replaces the
  usual card grid.
- **Reviews as inspection sign-offs.** Every Google review is shown as a stamped "APPROVED" sign-off
  slip, quoted verbatim.
- **Process as a construction schedule.** The 5 steps are shown as a Gantt chart.
- **Service area as a Staten Island Railway line diagram.** "We stop at every station": the SIR
  stops from St. George to Tottenville, plus North Shore and Mid-Island "transfers." Every stop
  links to its shore's area page. It's a local reference most Staten Islanders will recognize.
- **Scope Builder.** On the contact page, tap your project type, rooms, timeline and building
  type (house / condo / co-op / storefront). It writes a structured estimate request into the form.

**Type:** Big Shoulders Display (headings, industrial signage feel) · Public Sans (body) ·
JetBrains Mono (dimension callouts, sheet numbers).
**Color:** Vellum `#F3EFE6`, ink `#14212D`, blueprint blue `#1C4E86`, safety orange `#FF5A1F` (the AXE accent).

---

## 3. URL map / sitemap

Every page has one canonical URL ending in a trailing slash (`/path/index.html`).

```
/                                         A-000  Home
├── /services/                            S-000  Services hub (Sheet Index)
│   ├── EXTERIOR
│   │   ├── /services/roofing/            S-101  Roofing & roof replacement
│   │   ├── /services/roof-repair/        S-102  Roof repair & leak repair
│   │   ├── /services/siding/             S-103  Siding installation
│   │   ├── /services/exterior-painting/  S-104  Exterior painting
│   │   ├── /services/pavers-masonry/     S-105  Pavers, patios, driveways & masonry
│   │   └── /services/decks/              S-106  Decks & porches
│   ├── INTERIOR
│   │   ├── /services/interior-painting/  S-201  Interior painting
│   │   ├── /services/kitchen-remodeling/ S-202  Kitchen remodeling
│   │   ├── /services/bathroom-remodeling/S-203  Bathroom remodeling
│   │   ├── /services/basement-finishing/ S-204  Basement finishing
│   │   ├── /services/flooring/           S-205  Flooring installation
│   │   ├── /services/home-renovations/   S-206  Whole-home & gut renovations
│   │   └── /services/home-additions/     S-207  Home additions & extensions
│   └── SPECIALTY
│       ├── /services/condo-apartment-renovations/ S-301 Condo, co-op & apartment renovations
│       └── /services/commercial-construction/     S-302 Commercial & storefront build-outs
├── /areas/                               Z-000  Service-area hub (SIR line diagram)
│   ├── /areas/staten-island/             Z-100  Staten Island (primary geo page)
│   │   ├── /areas/staten-island/north-shore/  Z-101
│   │   ├── /areas/staten-island/east-shore/   Z-102
│   │   ├── /areas/staten-island/mid-island/   Z-103
│   │   └── /areas/staten-island/south-shore/  Z-104
│   ├── /areas/brooklyn/                  Z-200
│   └── /areas/manhattan/                 Z-300
├── /projects/                            P-000  Project record (review-backed project log)
├── /reviews/                             R-000  All Google reviews (verbatim)
├── /about/                               G-001  About AXE
├── /guides/                              G-100  Homeowner guides hub
│   ├── /guides/nyc-renovation-permits/          G-101
│   ├── /guides/condo-coi-alteration-agreement/  G-102
│   ├── /guides/flat-roof-vs-shingle-roof/       G-103
│   └── /guides/how-to-vet-a-contractor-nyc/     G-104
├── /contact/                             E-000  Free estimate + Scope Builder
├── /thank-you/                           (noindex) form confirmation
├── /privacy/                             privacy policy
└── /404.html                             (noindex) "Sheet not found"
+ /sitemap.xml  /robots.txt  /llms.txt  /favicon.svg  /og-image.png  /site.webmanifest
```

**Why shores instead of 30 neighborhood pages:** dozens of near-identical "contractor in
[neighborhood]" pages are thin, templated content that Google's spam policies target. Staten
Island's four shores have genuinely different housing stock and conditions (North Shore
Victorians and landmark districts, East/South Shore flood zones and post-Sandy raised homes,
Mid-Island larger detached homes). That supports real, distinct content. Each shore page names
and covers all of its neighborhoods, so those neighborhood queries still have a relevant page.

---

## 4. Keyword → page map (one primary intent per URL, no cannibalization)

> Targets are local-intent query patterns, not measured volumes. Validate them in Google Search
> Console after launch (and Google Ads Keyword Planner if available), then refine titles.

| Page | Primary query | Secondary / long-tail |
|---|---|---|
| `/` | general contractor Staten Island | Staten Island contractor, home improvement contractor Staten Island, renovation company Staten Island NY |
| `/services/roofing/` | roofing contractor Staten Island | roof replacement Staten Island, roofers Staten Island NY, flat roof installation Staten Island |
| `/services/roof-repair/` | roof repair Staten Island | roof leak repair Staten Island, emergency roof repair, flat roof leak repair |
| `/services/siding/` | siding contractor Staten Island | vinyl siding installation Staten Island, siding replacement |
| `/services/exterior-painting/` | exterior painting Staten Island | house painters Staten Island, exterior house painting NYC |
| `/services/pavers-masonry/` | pavers Staten Island | paver driveway Staten Island, patio installation, stoop repair Staten Island, masonry contractor |
| `/services/decks/` | deck builder Staten Island | deck installation, composite deck, porch repair |
| `/services/interior-painting/` | painters Staten Island | interior painting Staten Island, apartment painting NYC, house painting contractor |
| `/services/kitchen-remodeling/` | kitchen remodeling Staten Island | kitchen renovation Staten Island, kitchen contractor |
| `/services/bathroom-remodeling/` | bathroom remodeling Staten Island | bathroom renovation Staten Island, tub-to-shower conversion |
| `/services/basement-finishing/` | basement finishing Staten Island | basement renovation, basement remodel |
| `/services/flooring/` | flooring installation Staten Island | hardwood floor installation, LVP flooring, tile installation |
| `/services/home-renovations/` | home renovation Staten Island | gut renovation Staten Island, full house remodel, interior renovation contractor |
| `/services/home-additions/` | home additions Staten Island | room addition, second-story addition, home extension NYC |
| `/services/condo-apartment-renovations/` | condo renovation contractor NYC | co-op renovation Manhattan, apartment renovation Brooklyn, contractor with COI for condo |
| `/services/commercial-construction/` | commercial contractor Staten Island | storefront renovation, retail build-out, barbershop / restaurant renovation |
| `/areas/staten-island/` | contractor Staten Island NY | Staten Island renovation contractor (hub for all shores) |
| `/areas/staten-island/north-shore/` | contractor St. George / West Brighton | Port Richmond, Stapleton, Mariners Harbor, Westerleigh… |
| `/areas/staten-island/east-shore/` | contractor Midland Beach / South Beach | Dongan Hills, Grant City, New Dorp, Grasmere… |
| `/areas/staten-island/mid-island/` | contractor Todt Hill / New Springville | Willowbrook, Bulls Head, Heartland Village… |
| `/areas/staten-island/south-shore/` | contractor Tottenville / Great Kills | Eltingville, Annadale, Huguenot, Prince's Bay… |
| `/areas/brooklyn/` | general contractor Brooklyn | Bay Ridge, Dyker Heights, Bensonhurst renovation |
| `/areas/manhattan/` | apartment renovation contractor Manhattan | condo/co-op contractor Manhattan |
| `/reviews/` | AXE Contracting reviews | branded |
| `/guides/nyc-renovation-permits/` | do I need a permit to renovate in NYC | DOB permit Staten Island, permit for kitchen remodel NYC |
| `/guides/condo-coi-alteration-agreement/` | condo COI requirements NYC | alteration agreement co-op, certificate of insurance contractor |
| `/guides/flat-roof-vs-shingle-roof/` | flat roof vs shingle roof | best roof for Staten Island homes |
| `/guides/how-to-vet-a-contractor-nyc/` | how to check contractor license NYC | DCWP home improvement contractor lookup |

---

## 5. Page templates

### Home (`/`)
1. Hero: H1 "General Contractor on Staten Island" + Drawing↔Built slider + phone/estimate CTAs
2. Trust strip: insured, COI for buildings, Mon–Sat, Staten Island · Brooklyn · Manhattan
3. Sheet Index of all 15 services (grouped Exterior / Interior / Specialty)
4. "Why AXE" in the form of general notes (numbered drawing notes)
5. Construction schedule (5-step process Gantt)
6. Inspection sign-offs (6 featured reviews) → /reviews/
7. SIR line diagram (service area) → /areas/
8. Guides teaser → /guides/
9. FAQ (visible, with FAQPage JSON-LD)
10. Estimate CTA band

### Service page (`/services/*/`)
Breadcrumbs → H1 "[Service] in Staten Island, NY" → intro + detail drawing →
"What's included" (scope list) → "Staten Island specifics" (local conditions) → process notes →
matching review(s) when one exists → related services → areas served → FAQ (3–5) → CTA.

### Area page (`/areas/*/`)
H1 "[Area] General Contractor" → neighborhoods covered (list of stops) → housing stock & local
conditions → most-requested services there (links) → reviews → FAQ → CTA.

### Guide (`/guides/*/`)
Article layout with a "Key answer" box at the top (for answer engines), H2/H3 sections, a
disclaimer that rules change and should be verified with the agency, and links to the related service.

---

## 6. Technical SEO spec

- **Static HTML** generated by `src/build.py` into `public/`. The output is committed, so DigitalOcean
  serves it without running a build step (see `.do/app.yaml`).
- **Per page:** unique `<title>` (≤ 60 chars) and meta description (≤ 155), `rel=canonical`, Open
  Graph and Twitter tags, `lang="en-US"`, one H1, logical H2/H3, descriptive internal anchors.
- **Structured data (JSON-LD, one `@graph` per page):**
  - `GeneralContractor` (a LocalBusiness subtype) with `@id` `https://axecontracting.org/#business`,
    telephone, email, hours, `areaServed` (Staten Island, Brooklyn, Manhattan as `City`/
    `AdministrativeArea`), `sameAs` → Google profile, `hasOfferCatalog` of services.
    No street address until one is supplied (service-area business).
  - `WebSite` + `WebPage` on every page; `BreadcrumbList` on every inner page.
  - `Service` on every service page (`provider` → business `@id`, `areaServed`, `serviceType`).
  - `FAQPage` wherever FAQs are visible. Google now limits FAQ rich results, but the markup still
    gives answer engines clean Q&A to read.
  - `Article` on guides.
  - **No self-served `aggregateRating`/`Review` markup.** Google does not show review stars for
    reviews a business publishes about itself, and adding them risks a manual action. Reviews
    stay visible on the page and verbatim.
- **Performance:** one CSS file (~25 KB), one deferred JS file, no frameworks, inline SVG art
  (no image weight), Google Fonts with `preconnect` + `display=swap`. Target: Lighthouse 95+.
- **Accessibility:** skip link, visible focus, a keyboard-operable slider (arrow keys), `prefers-reduced-motion`
  respected, AA contrast in both themes.
- **Crawl:** `sitemap.xml` (all indexable URLs), `robots.txt` with a sitemap reference, `noindex` on
  `/thank-you/` and the 404 page, and `llms.txt` with a plain-language summary for AI crawlers.
- **NAP consistency:** the name, phone and hours in the footer and schema must match the Google Business
  Profile exactly. Update the GBP website link to `https://axecontracting.org/` after launch.

## 7. Off-site follow-ups (not code)
1. Add the street address (if they want it public) and the DCWP license # to `src/config.py`.
2. Replace drawings with real project photos (WebP, ≤ 200 KB, descriptive alt text and file names).
3. In the GBP, make sure each service listed matches a service page, and link the profile's
   "services" to those URLs.
4. Connect the contact form to Formspree (or similar) by setting `FORM_ENDPOINT` in the config.
5. Verify the site in Google Search Console and Bing Webmaster Tools and submit the sitemap.
6. Keep asking for reviews that mention the service and the neighborhood.
