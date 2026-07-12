# Local SEO Audit — proline-roofing.com

**Business:** ProLine Roofing (roofing contractor — residential/commercial roofing, repair/replacement, gutters)
**Business type detected:** Service Area Business (SAB) with a single staffed/registered address in Staten Island, NY, marketing to additional service areas (Brooklyn NY; Clifton, Elizabeth, Freehold, Jersey City, Newark, Old Bridge NJ). No evidence of genuinely staffed branch offices in any secondary market.
**Industry vertical detected:** Home Services — Roofing Contractor. Signals: "licensed, insured," free estimates, service-area language, storm-damage/emergency repair copy, "warranty," gutter services.

## Local SEO Score: 52 / 100

| Dimension | Weight | Score (0-100) | Weighted |
|---|---|---|---|
| GBP Signals | 25% | 45 | 11.25 |
| Reviews & Reputation | 20% | 72 | 14.4 |
| Local On-Page SEO | 20% | 55 | 11.0 |
| NAP Consistency & Citations | 15% | 30 | 4.5 |
| Local Schema Markup | 10% | 35 | 3.5 |
| Local Link & Authority Signals | 10% | 40 | 4.0 |
| **Total** | | | **~48.65 → 52 (rounded, qualitative adjustment for genuine location-page depth)** |

Scoring rationale is qualitative (no GBP API / DataForSEO / citation-crawl access — see Limitations). The dominant drag on the score is the schema/NAP layer: a sitewide address bug, two location pages carrying unexplained alternate addresses that appear nowhere in visible content, and a canonical tag that removes the primary market's location page from independent indexing.

---

## What Works

- Dedicated, human-written location pages exist for every stated target market: Staten Island (hub + roof-repair), Brooklyn, and all six NJ towns (Clifton, Elizabeth, Freehold, Jersey City, Newark, Old Bridge), plus an NJ hub — this satisfies the "dedicated service pages" best practice (Whitespark's #1 local-organic factor) at the coverage-breadth level.
- Each location page carries a unique `<title>`/H1 referencing the specific city ("Clifton, NJ Roofing Contractor," "Freehold NJ Roofing Pros," etc.) rather than a single generic template title.
- Genuine, live third-party review integration: a Trustindex widget on the homepage pulls real, named, dated Google reviews (4.9★, 97 reviews) with individual reviewer names/avatars/timestamps — this is authentic evidence of an active, reviewed Google Business Profile, not a fabricated widget.
- Review recency is healthy as of this crawl: the most recent visible review is dated ~13 days before the audit date, comfortably inside the "18-day rule" freshness window Sterling Sky flags as a ranking-cliff risk.
- Visible NAP on the homepage/contact footer is internally consistent with itself: "481 Mill Rd, Staten Island, NY 10306" and "(347) 323-9128" appear identically in the header click-to-call, the contact page body, and the sitewide footer.
- Main navigation correctly links to all location pages, including the Staten Island hub (`/locations/staten-island-ny/`), so internal discovery of that page is not broken — only its sitemap/canonical status is (see Critical findings).
- aggregateRating (4.9/97) is present in structured data sitewide, giving review-rich-result eligibility a technical (if not type-correct — see schema findings) footing.

---

## NAP Consistency Audit

| Source | Name | Address | Phone |
|---|---|---|---|
| Homepage visible footer/header | ProLine Roofing | 481 Mill Rd, Staten Island, NY 10306 | (347) 323-9128 |
| Contact page visible body | ProLine Roofing | 481 Mill Rd, Staten Island, NY 10306 | (347) 323-9128 |
| Sitewide `RoofingContractor`/`Organization` JSON-LD (home, contact, Brooklyn, Freehold, and other pages carrying this block) | ProLine Roofing | `streetAddress: "ProLine Roofing"`, Staten Island, NY 10306 — **the actual street ("481 Mill Rd") is missing; the business name is duplicated into the street-address field** | +1-347-323-9128 (matches) |
| `/locations/brooklyn-ny/` page-level `RoofingContractor` JSON-LD | ProLine Roofing | **225 Joralemon St, Brooklyn, NY 11201** — not shown anywhere in visible page content | not set in this block |
| `/locations/new-jersey/freehold/` page-level `RoofingContractor` JSON-LD | ProLine Roofing | **144 Tilton Dr, Freehold Township, NJ 07728** — not shown anywhere in visible page content | not set in this block |
| Clifton, Elizabeth, Jersey City, Newark, Old Bridge, SI hub/roof-repair, NJ hub/roof-repair pages | ProLine Roofing (no location-specific schema at all) | none (no `LocalBusiness`/`RoofingContractor` block; only `BreadcrumbList` + review `Product`) | none in schema |
| Location-page click-to-call numbers | — | — | Clifton, Freehold, Elizabeth, Old Bridge, NJ hub display a **second number, (848) 310-3977**, alongside the sitewide (347) 323-9128 (likely call-tracking, but creates a visible two-number NAP on the same pages) |

**Discrepancies found (highest to lowest severity):**
1. Sitewide structured data never states the real street address — it substitutes the business name. Any automated NAP-consistency/citation-matching tool (and Google's own entity resolution) will see this as a broken or missing address field, not merely an inconsistency.
2. Brooklyn and Freehold pages assert specific street addresses in hidden JSON-LD that are shown to no human visitor and are not reflected in the visible page, the footer, the contact page, or the site's own Google Maps embeds (which use generic city-level map queries, not these addresses). This is the classic pattern of a fake/undisclosed secondary-location listing, which risks a manual spam action if these are pushed to GBP, and is a genuine NAP-consistency failure regardless of GBP status.
3. Two phone numbers appear on the same rendered page for five of the eight location pages, with no visible explanation (no "or call the ___ office" framing) distinguishing them.

---

## GBP Optimization Checklist (on-page signals only — no GBP API access)

| Signal | Status |
|---|---|
| Live Google Maps embed of the actual verified place/pin | **Missing** — every location page embeds only a generic `maps.google.com/maps?q=<City>,<State>` query map (city-level, no business pin), not a GBP place embed |
| "Get Directions" link to a specific verified address | Present only on homepage/contact (points to 481 Mill Rd); absent as a direct-to-GBP link on location pages |
| Third-party review widget sourcing real Google reviews | **Present** (Trustindex, homepage) — did not verify presence on every location page in this pass |
| Visible owner responses to reviews in the widget sample | Not observed in the sampled reviews (widget template supports it; no replies rendered in the sample pulled) |
| GBP posts / "recently updated" indicators | Not detectable from on-page signals |
| Photo evidence tied to GBP (vs. generic stock hero images) | Location-page hero images are custom-named per city (e.g., "Who-choose-ProLine-Roofing-in-Freehold-NJ.jpg") — a positive signal of intent, but cannot confirm these are synced to/from the GBP photo library |
| Primary category correctness | **Cannot assess** — requires live GBP access. Flagged as the single highest-weighted ranking factor (Whitespark score 193) and highest-weighted negative factor if wrong (176); verify manually in GBP dashboard |

---

## Review Health Snapshot

- Rating: 4.9 / 5, 97 reviews (`AggregateRating`, consistent site-wide in schema and matching the visible Trustindex widget on the homepage).
- Source: reviews are explicitly labeled "Posted on Google" and "Verified by Trustindex," i.e., syndicated from an actual Google Business Profile — good authenticity signal.
- Velocity: newest visible review dated ~13 days before this audit; several more within the preceding 4–6 weeks. This sits inside, but close to the edge of, the 18-day freshness window — worth monitoring, not yet a red flag.
- Response rate: could not confirm any owner replies in the review sample rendered on the homepage widget. Recommend checking GBP directly and instituting a response cadence (Google rewards responded-to reviews, and it is best practice regardless of ranking impact).
- Schema type used for the rating (`Product` with `name: "Contractor"`) is **not a valid pairing** — `Product.aggregateRating` is intended for physical/purchasable products, not a service business; Google's own guidance is to attach `aggregateRating` to the `LocalBusiness`/`RoofingContractor` entity itself, not a generic `Product` stand-in. This is technically self-serving/organization review markup misuse risk, addressed further below.

---

## Citation Presence (Tier 1 directories)

Live citation crawling / directory search was not available in this environment (no DataForSEO or web-search tool access for this pass). This section is a **limitation**, not a clean bill of health — before treating citations as adequate, the team should manually verify NAP-identical listings (using **481 Mill Rd, Staten Island, NY 10306 / (347) 323-9128** as the canonical NAP) on:
- Yelp
- BBB
- Google Business Profile (primary + any secondary listings — specifically check whether "225 Joralemon St, Brooklyn" or "144 Tilton Dr, Freehold Township" have been submitted as GBP service-area or storefront addresses anywhere; if so, this is a policy-violation risk for a business with no genuine staffed presence there)
- Nextdoor, Angi/HomeAdvisor, Thumbtack (home-services-specific, per industry citation guidance)

Given the schema inconsistencies found on-site, there is elevated risk that any citation-building historically done for this business propagated the wrong/duplicated address, or that duplicate/unmanaged GBP listings exist for the Brooklyn and Freehold "addresses." This should be a priority manual check.

---

## Local Schema Validation

- **Correct subtype used where present:** `RoofingContractor` (extending `Organization`) is the right choice per the home-services schema pattern — this is correct.
- **Required properties:** `name` is present and consistent. `address` is present but **defective sitewide** (streetAddress field holds the business name instead of "481 Mill Rd").
- **Recommended properties:**
  - `geo`: present on homepage/contact/Brooklyn/Freehold blocks with 6-7 decimal precision (exceeds the 5-decimal minimum) — good where present.
  - `openingHoursSpecification`: present only on the Brooklyn and Freehold page-level `RoofingContractor` blocks (24/7, Mon–Sun 08:00–08:00 wraparound, which is a slightly unusual way to express "24 hours" — recommend `00:00`–`23:59` or the standard all-day pattern instead); **absent** from the sitewide Organization block and from every other location page.
  - `telephone`: present and correct on the sitewide block; absent from the Brooklyn/Freehold page-level blocks (odd, since those blocks otherwise duplicate the sitewide entity).
  - `url`: present and self-referential where the block exists.
  - `priceRange`: present ("$$") on the sitewide block.
  - `areaServed`: **not found** on any location page's schema — a real gap for an SAB; Google's schema.org support plus industry best practice recommends `areaServed` with named cities (ideally `sameAs`-linked to Wikipedia/Wikidata) on every location/service-area page. None of the seven location pages carry this property.
- **Coverage gap:** Only 2 of 8 dedicated location pages (Brooklyn, Freehold) carry any location-specific `LocalBusiness`/`RoofingContractor` schema at all. Clifton, Elizabeth, Jersey City, Newark, Old Bridge, the Staten Island hub, the Staten Island roof-repair page, and the NJ hub/roof-repair pages carry **only** `BreadcrumbList` and a `Product` aggregateRating block — no `LocalBusiness` entity, no `areaServed`, no `geo` for those markets at all.
- **Review schema type misuse:** `aggregateRating` is attached to a generic `Product` (`name: "Contractor"`) rather than the `RoofingContractor`/`Organization` entity. Recommend moving `aggregateRating` onto the `Organization`/`RoofingContractor` node directly and dropping the `Product` wrapper, which has no real justification here.

---

## Location Page Quality (multi-location assessment)

- **Content uniqueness:** After normalizing out the town name, pairwise text-similarity between NJ town pages (Clifton, Elizabeth, Jersey City, Newark, Old Bridge) ranged ~19–33%. That means roughly two-thirds to four-fifths of each page's body text is shared/templated boilerplate (nav, service list, trust badges, generic "why choose us" phrasing), with a real but thin layer of city-specific text on top. This is a moderate — not severe — doorway-page risk: pages are not byte-identical swaps, but the unique-content ratio is on the low side of acceptable and would benefit from materially more town-specific detail (local landmarks, permit/code notes specific to that municipality, project photos from that town, local testimonials).
- **Word counts vary widely** (Newark ~1,000 words vs. Old Bridge ~2,400 vs. Brooklyn ~2,900), suggesting inconsistent investment across markets rather than a deliberate content strategy.
- **Internal linking depth:** All location pages are one click from every other page via the persistent nav "Locations" menu and are cross-linked from the homepage — link depth is shallow (good) and not an issue.
- **Doorway-page swap test:** Confirmed the pages are not literal search-and-replace duplicates (similarity scores rule out a 1:1 template swap), but the Brooklyn/Freehold hidden-address schema anomaly (see Critical findings) is itself a doorway-page-adjacent red flag independent of visible content uniqueness.
- **Staten Island representation (primary market):** A dedicated hub page **does exist** at `/locations/staten-island-ny/` (confirmed via direct fetch, HTTP 200, unique ~2,800-word content, distinct title "#1 Roofer near Staten Island, NY"), and it is correctly linked from the main navigation on every page. However:
  - Its `<link rel="canonical">` points to the **homepage** (`https://www.proline-roofing.com/`), not to itself — despite the two pages sharing only ~12% text similarity. This tells Google to consolidate the page's ranking signals into the homepage rather than let it rank independently for "Staten Island roofer" queries.
  - It is **absent from the XML sitemap** (`page-sitemap.xml` lists the Staten Island *roof-repair* sub-page but not the hub itself) — consistent with, and likely caused by, the wrong canonical.
  - Net effect: the one market that should have the strongest, most authoritative location page (headquarters market) is the one whose location page is being told not to compete for its own rankings.

---

## Orphan Landing Pages — Cannibalization / Duplicate-NAP Risk

Five standalone pages outside `/locations/` target the same cities as proper location pages, each self-canonicalized (not merged into the location pages) and independently indexable:

| Orphan page | Title | Competes directly with |
|---|---|---|
| `/brooklyn-roofing-lp/` | "Brooklyn #1 Roofing Company" | `/locations/brooklyn-ny/` ("Roofer Brooklyn") |
| `/roofer-old-bridge-nj/` | "Top-Rated Roofer Old Bridge, NJ" | `/locations/new-jersey/old-bridge/` |
| `/roofing-services-nj/` | "Top-Rated Roofer - New Jersey" | `/locations/new-jersey/` (NJ hub) |
| `/affordable-roofing-in-brooklyn-ny/` | "Affordable Roofer in Brooklyn, NY" (tagged as `BlogPosting`) | `/locations/brooklyn-ny/` |
| `/asphalt-shingle-roofing-staten-island/` | Educational/blog content (has `BlogPosting` + `VideoObject` schema) — lower cannibalization risk, more of a genuine blog post | Staten Island hub/service pages, minor overlap only |

The first four are functionally duplicate location/offer pages for markets that already have a purpose-built page in `/locations/`, with different titles, different URLs, and (for `/brooklyn-roofing-lp/` and `/affordable-roofing-in-brooklyn-ny/`) no internal link back to the canonical `/locations/brooklyn-ny/` page observed. This splits ranking signals (links, engagement, potential reviews) across 2+ competing URLs per city instead of consolidating them onto one authoritative page, and risks Google choosing to rank the "wrong" (thinner, less-linked) page in the local pack/organic results. None of these orphan pages carry location-specific schema (`areaServed`, `geo`) beyond the generic sitewide/organization block, reinforcing that they were built as landing pages (likely for paid traffic) rather than as SEO-intended location pages — but they are fully crawlable/indexable and were found via sitemap, so they compete anyway.

---

## Top 10 Prioritized Actions

1. **[Critical]** Fix the Staten Island hub page canonical: change `<link rel="canonical">` on `/locations/staten-island-ny/` from the homepage URL to self-referencing (`https://www.proline-roofing.com/locations/staten-island-ny/`), then add it to the XML sitemap. This page is unique content for the primary market and is currently blocked from ranking on its own.
2. **[Critical]** Fix the sitewide `RoofingContractor`/`Organization` schema `streetAddress` field — it currently contains the business name ("ProLine Roofing") instead of the real street address ("481 Mill Rd"). This is present on every page carrying that block and is a required-property failure, not just a nice-to-have fix.
3. **[Critical]** Investigate and resolve the Brooklyn (225 Joralemon St) and Freehold (144 Tilton Dr) page-level schema addresses. Confirm whether these correspond to any real, staffed, or GBP-verified location. If not, remove them — undisclosed addresses in structured data that never appear in visible content are a NAP-integrity and potential spam-policy risk for an SAB.
4. **[High]** Add `LocalBusiness`/`RoofingContractor` schema with `areaServed` (named city + ideally `sameAs` to Wikipedia/Wikidata) and `geo` to the six location pages that currently have none at all (Clifton, Elizabeth, Jersey City, Newark, Old Bridge, NJ hub, SI hub, SI roof-repair, NJ roof-repair) — align all pages to one consistent template.
5. **[High]** Consolidate the four cannibalizing orphan landing pages (`/brooklyn-roofing-lp/`, `/roofer-old-bridge-nj/`, `/roofing-services-nj/`, `/affordable-roofing-in-brooklyn-ny/`) with their corresponding `/locations/` pages: either 301-redirect them into the proper location page, or noindex + internally link them clearly as PPC-only landing pages so they stop competing in organic/local results.
6. **[High]** Verify GBP primary category and confirm no duplicate/unverified GBP listings exist for "225 Joralemon St, Brooklyn" or "144 Tilton Dr, Freehold Township" — this cannot be checked without GBP access but is now a specific, named risk raised by the schema findings above.
7. **[Medium]** Increase unique, city-specific content on the NJ town pages (currently ~19–33% unique after removing town-name swaps) — add local landmarks, town-specific permitting/code notes, local project photos, and local testimonials to reduce doorway-page risk and strengthen topical relevance per town.
8. **[Medium]** Replace the generic city-level Google Maps embeds (`maps.google.com/maps?q=<City>,<State>`) with either a real GBP place embed (if/where a verified secondary presence exists) or drop the map widget on service-area-only pages in favor of a clear "service area" statement, since a city-level map with no pin adds little trust value and doesn't correspond to any address in the page's own schema.
9. **[Medium]** Move `aggregateRating` off the generic `Product`/"Contractor" node and onto the `RoofingContractor`/`Organization` entity directly; this is the schema.org/Google-supported pattern and avoids relying on an unrelated `Product` type for review rich-result eligibility.
10. **[Low]** Clarify the two phone numbers appearing together on Clifton/Elizabeth/Freehold/Old Bridge/NJ-hub pages ([347) 323-9128 and (848) 310-3977) with explicit labeling (e.g., call-tracking disclosure or "NJ line") so the dual-number display doesn't read as a NAP inconsistency to users or automated NAP-audit tools.

---

## Limitations Disclaimer

- No Google Business Profile API or DataForSEO access was available for this audit. GBP primary/secondary category, verification status, Q&A, Posts activity, photo-sync status, and live local-pack rank position **could not be checked** and must be verified directly in the GBP dashboard — this is especially important given the #1/#1-negative weight Whitespark assigns to correct/incorrect primary category.
- Tier-1 citation presence (Yelp, BBB, Nextdoor, Thumbtack, Angi) was **not directly verified** — no live web search or directory-fetch tool was used in this pass; the citation section above is a to-do list, not a clean audit result.
- Proximity (55.2% of local-pack ranking variance per Search Atlas) is outside this audit's or the site owner's direct control and is not reflected in this score.
- Review response-rate and full review history could only be sampled from the on-page Trustindex widget (homepage), not the full GBP review history.
- Findings are based on rendered/raw HTML fetched via the shared `render_page.py` tool in `auto` mode; if any GBP embeds, maps, or review widgets are injected only under specific viewport/interaction conditions not triggered here, they would not have been captured.

## Files referenced
- Crawled URL list: `/home/user/dt/proline-roofing.com-audit/crawled-urls.txt`
- Sitemaps: `/home/user/dt/proline-roofing.com-audit/page-sitemap.xml`, `/home/user/dt/proline-roofing.com-audit/local-sitemap.xml`, `/home/user/dt/proline-roofing.com-audit/sitemap_index.xml`
- This report: `/home/user/dt/proline-roofing.com-audit/findings/local.md`
