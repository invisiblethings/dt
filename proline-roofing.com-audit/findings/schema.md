# Schema / Structured Data Audit — proline-roofing.com

**Category Score: 42 / 100**

Pages sampled (raw HTML, server-rendered — this is a standard WordPress/Rank Math site, not an SPA, so raw fetch reflects what Googlebot sees): homepage, `/faq/`, `/contact/`, `/locations/`, `/locations/brooklyn-ny/`, `/locations/new-jersey/`, `/locations/new-jersey/clifton/`, `/locations/staten-island-ny/roof-repair/`, `/services/roof-replacement/`, `/services/residential-roofing/asphalt-shingle-roofing/`, `/services/commercial-roofing/`, `/services/gutter-services/gutter-cleaning/`.

Correction to the initial homepage scan: `RoofingContractor`/`Organization` schema **does** exist (Rank Math's Local SEO module), but it is broken/incomplete and only present on 3 of the 11+ URL types sampled (home, `/contact/`, `/locations/brooklyn-ny/`). It was likely missed by the earlier pass because it sits deep inside an `@graph` array alongside `Place`/`WebSite`/`AboutPage` nodes.

---

## What Works

- JSON-LD is used exclusively (no Microdata for the main entity graph; a few unrelated `itemscope` attributes on service/location pages are leftover from a widget, not real Product/Review markup).
- `@context` is consistently `https://schema.org` (correct, HTTPS) on the Rank Math-generated `@graph` blocks.
- `RoofingContractor` + `Organization` combined `@type` is present on the homepage, `/contact/`, and `/locations/brooklyn-ny/` — this is the correct roofing-specific subtype (not deprecated), and it correctly includes `telephone`, `email`, `legalName`, `logo` (as `ImageObject`), `sameAs` profiles, `priceRange`, and `openingHours`.
- `BreadcrumbList` is implemented sitewide (every sampled deep page: FAQ, services, locations, contact) with correct `ListItem`/`position`/`item` structure and absolute `@id` URLs — this part validates cleanly.
- `WebSite` + `SearchAction` on the homepage is correctly formed (`query-input`, absolute target URL).
- Dates (`datePublished`/`dateModified`) are in valid ISO 8601 format with timezone offsets.
- No deprecated types found (no `HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`, `LearningVideo`).
- The existing `FAQPage` gap is not a rich-result loss (Google retired FAQ rich results for all sites), so there's no SERP regression here — only an AI/GEO citation opportunity being left on the table.

---

## Findings

### 1. Sitewide `Product` + `AggregateRating` schema is misapplied and identically duplicated on every URL — CRITICAL

**Severity:** Critical

**Description:** Every single page sampled (homepage, FAQ, all four service pages, all location pages, contact) injects an **identical** second JSON-LD block:

```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Contractor",
  "brand": { "@type": "Organization", "name": "ProLine Roofing" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "reviewCount": "97"
  }
}
```

This is a serious structured-data misuse:
- `Product` is the wrong type for a roofing service business — there is no purchasable product named "Contractor." Google's guidelines require the `AggregateRating`/`Review` markup to be about the specific entity reviewed, on a page where that context is clear.
- The **exact same** `ratingValue`/`reviewCount` (4.9 / 97) is stamped on every URL, including blog posts and the FAQ page, with no supporting on-page review content. This pattern (identical fake-looking review counts blasted sitewide) is the textbook signature Google's spam/structured-data enforcement targets, and is a real risk factor for a manual action ("Structured data problem — reviews") or loss of all rich-result eligibility sitewide, not just for this one snippet.
- It is also disconnected from the actual `Organization`/`RoofingContractor` node (no shared `@id`), so it doesn't even correctly associate the rating with the business entity in cases where it would be valid.

**Recommendation:** Remove this block entirely (audit the theme/plugin — likely a "trust badge" or review-widget plugin injecting this on every template) and replace it with a single, real `AggregateRating` attached directly to the `RoofingContractor` entity, sourced from actual aggregated review data (Google Business Profile, BBB, etc.), placed **only** on pages where that context is legitimate (homepage, contact, location pages) — not on blog/FAQ pages:

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://www.proline-roofing.com/#organization",
  "name": "ProLine Roofing",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "97"
  }
}
```
Note: use `ratingCount` (or `reviewCount` only if actual `Review` objects are also included) per Google's Review Snippet requirements, and be able to show the underlying reviews if asked.

---

### 2. `RoofingContractor`/`Organization` NAP is invalid — no real street address — HIGH

**Severity:** High

**Description:** On the homepage, `/contact/`, and `/locations/brooklyn-ny/`, the primary `PostalAddress` node has the business **name** stuffed into the `streetAddress` field instead of an actual street address:

```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "ProLine Roofing",
  "addressLocality": "Staten Island",
  "addressRegion": "New York",
  "postalCode": "10306",
  "addressCountry": "US"
}
```
This fails Google's NAP consistency requirements for local business entity resolution (both for classic Local Pack matching and for AI/LLM grounding against Google Business Profile / data aggregators), since `streetAddress` should never equal the business name. Given this is a Local Service Area Business (no public storefront), the fix should either supply a real, correct address that matches the Google Business Profile exactly, or omit `streetAddress` and rely on `areaServed` (see Finding 3) if the address is intentionally suppressed for a home-based/non-public office.

**Recommendation:** Confirm with the client whether the Staten Island address is a real, publicly-listed office matching their Google Business Profile. If yes, fix `streetAddress` to the real value. If the business is home-based/service-area-only (common for roofers) and the address should not be published, remove `PostalAddress.streetAddress` entirely rather than faking it, and lean on `areaServed` instead:

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://www.proline-roofing.com/#organization",
  "name": "ProLine Roofing",
  "legalName": "Proline Contracting Inc.",
  "telephone": "+1-347-323-9128",
  "email": "support@proline-roofing.com",
  "url": "https://www.proline-roofing.com",
  "image": "https://www.proline-roofing.com/wp-content/uploads/2024/04/ProLine-Roofing-Square-Logo.png",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Staten Island",
    "addressRegion": "NY",
    "postalCode": "10306",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "40.5575794", "longitude": "-74.113845" },
  "areaServed": [
    { "@type": "City", "name": "Staten Island", "sameAs": "https://en.wikipedia.org/wiki/Staten_Island" },
    { "@type": "City", "name": "Brooklyn", "addressRegion": "NY" },
    { "@type": "City", "name": "Clifton", "addressRegion": "NJ" },
    { "@type": "City", "name": "Elizabeth", "addressRegion": "NJ" },
    { "@type": "City", "name": "Freehold", "addressRegion": "NJ" },
    { "@type": "City", "name": "Jersey City", "addressRegion": "NJ" },
    { "@type": "City", "name": "Newark", "addressRegion": "NJ" },
    { "@type": "City", "name": "Old Bridge", "addressRegion": "NJ" }
  ],
  "sameAs": [
    "https://www.facebook.com/ProLineRoofingInc/",
    "https://linkedin.com/company/proline-roofing-new-york/",
    "https://www.youtube.com/@ProLineRoofingNY",
    "https://g.co/kgs/iQXx3tY"
  ]
}
```

---

### 3. No `areaServed` anywhere — the multi-location service-area nature of the business is invisible to structured data — HIGH

**Severity:** High

**Description:** Despite the site explicitly serving Staten Island, Brooklyn, and six NJ towns (Clifton, Elizabeth, Freehold, Jersey City, Newark, Old Bridge) via dedicated `/locations/` pages, `areaServed` is absent from every `RoofingContractor` block found. This is exactly the property Google recommends for Local Service Area Businesses in place of (or in addition to) a public address, and it's what lets Search/AI understand the true service footprint instead of inferring it only from page titles.

**Recommendation:** See the `areaServed` array in the snippet above. Additionally, add a page-specific `RoofingContractor` (or `Service` with `areaServed`) node on each `/locations/*` page naming that specific town, e.g. for `/locations/new-jersey/clifton/`:

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://www.proline-roofing.com/locations/new-jersey/clifton/#localbusiness",
  "name": "ProLine Roofing",
  "telephone": "+1-347-323-9128",
  "url": "https://www.proline-roofing.com/locations/new-jersey/clifton/",
  "areaServed": { "@type": "City", "name": "Clifton", "addressRegion": "NJ" },
  "parentOrganization": { "@id": "https://www.proline-roofing.com/#organization" }
}
```

---

### 4. Duplicate/conflicting `RoofingContractor` entity on `/locations/brooklyn-ny/` with a property typo — HIGH

**Severity:** High

**Description:** `/locations/brooklyn-ny/` contains a **second**, disconnected `RoofingContractor` node (no `@id`, not linked to `#organization`) with a different, real street address (`225 Joralemon St, Brooklyn, NY 11201`), its own `geo`, `openingHoursSpecification`, and `paymentAccepted`. Problems:
- **Typo:** `"telePhone": "347-323-9128"` — the property name is `telephone` (lowercase p); as written, this key is not a recognized schema.org property and will be silently ignored by parsers.
- **Duplicate/conflicting entity:** having two different `RoofingContractor` nodes both named "ProLine Roofing" — one anchored in Staten Island, one in Brooklyn — with no relationship (`@id` reference, `subOrganization`, etc.) creates entity ambiguity for Google/AI: is this one business with two addresses, or two separate businesses? If 225 Joralemon St is not an actual staffed office, publishing it as a `RoofingContractor` address risks violating Google Business Profile / local-business guidelines against fabricated locations for service-area businesses.
- Inconsistent `openingHours` format across nodes (`"Monday,Tuesday,...,Sunday 24 Hours"` on the main entity vs. `"Mo,Tu,We,Th,Fr,Sa,Su 08:00-08:00"` on the Brooklyn node — the latter is a common bug pattern for encoding "24 hours" and should be `00:00`–`23:59` or use `"opens":"00:00","closes":"23:59"`).

**Recommendation:**
1. Fix `telePhone` → `telephone`.
2. Confirm whether 225 Joralemon St is a real, staffed Proline location. If not, remove this address entirely and instead express Brooklyn coverage via `areaServed` on the single canonical `#organization` entity (Finding 3), or mark this node as a `Service`/branch clearly related via `@id` and `parentOrganization` rather than a standalone duplicate business.
3. Standardize `openingHours` format sitewide.

---

### 5. No `Service` schema on any of the 20+ `/services/` pages — MEDIUM

**Severity:** Medium

**Description:** Sampled `/services/roof-replacement/`, `/services/residential-roofing/asphalt-shingle-roofing/`, `/services/commercial-roofing/`, and `/services/gutter-services/gutter-cleaning/` — none carry `Service` schema. Only the generic `BreadcrumbList` + the spammy `Product` block (Finding 1) are present. This is a significant missed opportunity given the site's deep service-page architecture (residential/commercial roofing, roof repair, roof replacement, gutter services, each with sub-service pages).

**Recommendation:** Add a `Service` node per service page, linked to the `Organization`/`RoofingContractor` `@id` as `provider`, with `areaServed` and `serviceType`. Example for `/services/roof-replacement/`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Roof Replacement",
  "serviceType": "Roof Replacement",
  "url": "https://www.proline-roofing.com/services/roof-replacement/",
  "description": "When your roof reaches the end of its lifespan or suffers extensive damage, a full roof replacement from ProLine Roofing is a wise investment in your home or business.",
  "provider": { "@id": "https://www.proline-roofing.com/#organization" },
  "areaServed": [
    { "@type": "City", "name": "Staten Island" },
    { "@type": "City", "name": "Brooklyn" },
    { "@type": "State", "name": "New Jersey" }
  ]
}
```
Repeat per service page with the corresponding `name`/`serviceType`/`description` (Residential Roofing, Commercial Roofing, Gutter Cleaning, Storm Damage Repair, etc.). For sub-service pages nested under a parent category (e.g., `asphalt-shingle-roofing` under `residential-roofing`), consider adding `isPartOf` or `category` pointing at the parent Service.

---

### 6. `FAQPage` schema absent on `/faq/` — INFO (no SERP impact; AI/GEO opportunity only)

**Severity:** Info

**Description:** `/faq/` has a dedicated Q&A UI (an accordion with visible questions, e.g. "Do you offer free estimates?") but ships no `FAQPage` JSON-LD — only `BreadcrumbList`. Per current guidance, Google retired FAQ rich results for all sites, so there is no SERP feature being lost here. However, since this content is genuine business-authored FAQ (not user-submitted Q&A, so `QAPage` is not the right type), adding `FAQPage` markup is still worthwhile purely as a structured, machine-readable signal for AI answer engines (ChatGPT/Perplexity/Google AI Overviews) to cite the content directly, and it's low-effort/no-downside.

**Recommendation:** Add `FAQPage` with the real Q&A pairs pulled from the accordion content (do not invent questions — extract the actual visible copy). Example structure (fill `text` with the real answer copy from the page, e.g. the visible "Do you offer free estimates? Yes, we provide..." pair confirmed on-page):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you offer free estimates?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide free, no-obligation estimates for roof repair, replacement, and inspection services."
      }
    }
  ]
}
```
(Populate `mainEntity` with all ~6 accordion Q&As present on the page; do not use placeholder text — copy exact on-page answer wording.)

---

### 7. No `Review`/`AggregateRating` tied to real testimonials — MEDIUM

**Severity:** Medium

**Description:** The homepage includes a "Ratings-ProLine-Roofing" badge image (`ImageObject`) implying third-party review scores (Google/BBB/etc.), but there is no legitimate `Review` or `AggregateRating` schema — only the disconnected, sitewide-duplicated fake `Product.aggregateRating` flagged in Finding 1. If genuine testimonials/reviews exist on the site (not confirmed in the pages sampled) they are not marked up at all.

**Recommendation:** If a testimonials section exists elsewhere on the site, mark up individual `Review` objects with `itemReviewed` pointing at the `RoofingContractor` `@id`, and roll them into a single accurate `AggregateRating` on the `Organization` node only (see Finding 1's fix) — do not duplicate it on every page.

---

### 8. `BreadcrumbList` present and structurally valid, but not fully consistent — LOW

**Severity:** Low

**Description:** `BreadcrumbList` validates on all sampled pages (correct `ListItem`/`position`/`item`), which is good. Minor issue: `position` values are encoded as strings (`"1"`, `"2"`) rather than integers. Schema.org/Google generally tolerate stringified integers here, so this is a low-severity nitpick, not a hard error.

**Recommendation:** Optional cleanup — emit `position` as integers (`1`, `2`, `3`) rather than strings when the Rank Math template is next touched.

---

## Summary of Priorities

| Priority | Finding | Effort |
|---|---|---|
| 1 | Remove sitewide fake `Product`/`AggregateRating` block | Low (delete plugin injection) |
| 2 | Fix `streetAddress` = business name bug | Low |
| 3 | Add `areaServed` to Organization + per-location pages | Medium |
| 4 | Resolve duplicate Brooklyn `RoofingContractor` entity + `telePhone` typo | Low |
| 5 | Add `Service` schema to all `/services/` pages | Medium (templated) |
| 6 | Add `FAQPage` schema to `/faq/` (AI/GEO only, no SERP impact) | Low |
| 7 | Add real `Review`/`AggregateRating` if testimonials exist | Medium |

**Score rationale (42/100):** Foundational plumbing (JSON-LD format, HTTPS context, `BreadcrumbList`, `WebSite`, dates) is solid and the correct `RoofingContractor` type is in use where present, but the business-critical Local Service Area Business signals (accurate NAP, `areaServed`, non-duplicated entities, real ratings) are broken or missing, `Service` schema is absent across the entire services section, and a sitewide fake-review `Product` block is a genuine spam-policy risk — these are heavyweight deductions on a roofing lead-gen site whose primary local/AI discoverability depends on exactly this markup.
