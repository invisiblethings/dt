# Maps Intelligence Report — proline-roofing.com (ProLine Roofing)

**Business:** ProLine Roofing — residential/commercial roofing, repair/replacement, gutter services
**Primary location:** 481 Mill Road, Staten Island, NY 10306
**Analysis date:** 2026-07-14
**Capability tier detected: Tier 0 (Free APIs only)** — no DataForSEO MCP tools are available in this session, so geo-grid rank tracking, live GBP profile data, and cross-platform review intelligence are not available. Everything below comes from OpenStreetMap (Overpass/Nominatim), a raw Bing Maps fetch, a direct resolution check of the Google Business link embedded in the site's own schema, and the on-page signals already gathered in the earlier full SEO audit (`findings/local.md`, `findings/schema.md`).

**Boundary note:** This report covers the business's presence on maps *platforms*. On-page local-SEO signals (NAP in HTML, location-page quality, on-site schema) were already covered in depth in `findings/local.md` and `findings/schema.md` from the earlier full audit — this report cross-references those findings rather than repeating them, and adds the platform-side view.

## Maps Health Score: 44/100

| Dimension | Score | Weight |
|---|---|---|
| Cross-Platform Presence | 40/100 | 25% |
| NAP Consistency Across Platforms | 55/100 | 25% |
| GBP Field Completeness (Tier 0 inferable subset) | 35/100 | 20% |
| Review Signals (on-page proxy only) | 55/100 | 15% |
| Schema Readiness for Maps/Local Pack | 30/100 | 15% |

*Competitive density is reported separately below as context, not scored numerically — OSM's `craft=roofer` tag has too little coverage in this market to produce a reliable density figure (see Competitor Landscape).*

## Critical Finding: The Google Business Profile link in the site's own schema returns HTTP 410 (Gone)

The site's `Organization`/`RoofingContractor` JSON-LD includes `"sameAs": [..., "https://g.co/kgs/iQXx3tY"]` — a Google short-link format used for Business Profile / Local Services Ads listings. Resolving it:

```
https://g.co/kgs/iQXx3tY
  → 302 → https://www.google.com/localservices/profile?spp=Cg0vZy8xMXZwZncyeWdu
  → 410 Gone (genuine Google error page, not a bot-block/consent page)
```

This was tested twice with a full browser user-agent and returned a clean, formatted "Error 410 (Bad Request)!!1" page both times — the pattern of a real deprecated/removed resource, not a scraping block (which would typically show a CAPTCHA or consent-wall page instead). This strongly suggests the Local Services Ads profile this link once pointed to has been removed, merged, or deactivated, and the site is now linking to a dead Google resource from its own structured data.

**I can't fully confirm this from outside** (Google's business tools require an authenticated dashboard view), but the signal is concrete enough to warrant an urgent manual check.

**Recommendation:** Log into the Google Business Profile / Local Services Ads dashboard for this business and confirm (a) the standard GBP listing is live, verified, and in good standing, and (b) whether Local Services Ads is still active or was intentionally discontinued. If the LSA program was dropped on purpose, update or remove this `sameAs` link so the site isn't citing a dead Google resource in its own entity data.

## Cross-Platform Presence

| Platform | Status | Evidence |
|---|---|---|
| **OpenStreetMap** | **Present and accurate** | A `craft=roofer` node named "ProLine Roofing" exists at exactly 481 Mill Road, Staten Island, NY 10306 (lat 40.5575319, lon -74.1137795), with phone `+1-347-323-9128` and website `https://www.proline-roofing.com` — both match the site's canonical NAP. Only one listing found for the business name (no duplicate/conflicting OSM node was found for the Brooklyn or Freehold addresses that appeared in the site's own hidden schema per `findings/schema.md` — reassuring, though it doesn't rule those out on Google/GBP specifically, which OSM can't see). |
| **Google (Business Profile / Local Services Ads)** | **Flagged — see Critical Finding above** | The link the site cites for itself is dead. Live GBP status itself is Unknown without dashboard/API access. |
| **Bing Maps** | Indicated, not confirmed | A raw fetch of `bing.com/maps?q=ProLine+Roofing+Staten+Island+NY` returned a page titled "ProLine Roofing Staten Island NY - Bing," suggesting Bing recognizes the query, but Bing Maps listing cards are rendered client-side by JavaScript, so the actual listing (address/phone/hours as Bing has them) could not be extracted from a raw fetch in this session. Recommend a manual check in Bing Places for Business. |
| **Apple Maps** | Unknown (no public API) | No automated check is possible. Recommend claiming/verifying via [Apple Business Connect](https://businessconnect.apple.com) if not already done — this is a common gap for SMBs and costs nothing. |

## NAP Consistency Across Platforms

| Source | Name | Address | Phone |
|---|---|---|---|
| OpenStreetMap | ProLine Roofing | 481 Mill Road, Staten Island, NY 10306 | +1-347-323-9128 |
| Website (visible footer/contact) | ProLine Roofing | 481 Mill Rd, Staten Island, NY 10306 | (347) 323-9128 |

OSM and the website agree exactly — a clean baseline. The risk to this consistency isn't cross-platform (nothing external contradicts it), it's **internal**: the earlier local-SEO audit found a second phone number, `(848) 310-3977`, displayed alongside the canonical `(347) 323-9128` on five NJ-town location pages with no explanation. If that second number, or either of the undisclosed Brooklyn (225 Joralemon St) / Freehold (144 Tilton Dr) addresses found in the site's hidden schema, was ever submitted to Google, Bing, or a data aggregator, it would break the clean NAP picture seen on OSM today. This is the same finding as `findings/local.md` Critical items 2-3 — repeated here because it's the single biggest threat to the cross-platform consistency this report otherwise confirms is currently intact.

## GBP Field Completeness (Tier 0 — inferable fields only)

Home Services multipliers applied where noted (per `maps-gbp-checklist.md`). Most of the 25-field checklist requires live GBP API access and is marked Unknown — this is not a full profile audit, only what's visible from outside.

| Field | Status | Note |
|---|---|---|
| Business name | Likely present, optimized | Matches real-world name on OSM and website |
| Physical address | **Flagged** | Real address is correct on OSM/website, but the site's own `RoofingContractor` schema has a broken `streetAddress` field (contains the business name instead of the address) — see `findings/schema.md` Critical #2. Whether this propagated to GBP is unknown; verify address field in the dashboard directly. |
| Phone number | Likely present | Matches (347) 323-9128 across known sources, but see the internal-consistency risk above |
| Website URL | Likely present | Site links to itself consistently |
| Service areas *(×2 weight, Home Services)* | Likely present on-site, GBP config Unknown | 8 named markets exist as location pages (Staten Island, Brooklyn, 6 NJ towns) — good raw material for GBP service-area configuration, but whether GBP itself lists all 8 as service areas can't be confirmed without dashboard access |
| Social profiles | Present | `sameAs` links to Facebook, X/Twitter, LinkedIn, Pinterest, YouTube |
| Verified status | **Unknown / questionable** | The dead LSA link above raises a real question mark here — prioritize confirming this first |
| Primary/additional categories, business hours completeness, photos, photo recency, attributes, Google Posts, booking link, owner response rate | Unknown | Requires live GBP API (DataForSEO Tier 1) or manual dashboard review |

## Review Signals (on-page proxy only — no live review API at this tier)

The homepage embeds a Trustindex widget syndicating real, named, dated Google reviews: **4.9/5 average, 97 reviews**, with the most recent visible review dated ~13 days before the earlier full-audit pass (comfortably inside the 18-day freshness window Sterling Sky flags as a ranking-risk threshold, though close to the edge). This was already documented in `findings/local.md` and is repeated here only as the maps-relevant takeaway: **the review signal itself looks healthy**, but review *velocity*, full rating distribution, and owner response rate can't be measured without live review API access (Tier 1+).

## Competitor Landscape (Tier 0 — Overpass API, 8km radius)

| Business | Distance | Phone | Website |
|---|---|---|---|
| ProLine Roofing (this business) | 0m | +1-347-323-9128 | proline-roofing.com |
| Armstrong Roofing Corp. | ~2.0 km | — | — |
| Alter Phase Roofing | ~4.7 km | +1 929-370-1552 | alterphaseroofing.com |
| Hylan Boulevard Building Material Supply | ~5.6 km | — | — (building materials supplier, not a direct roofing-contractor competitor) |
| Madison Roofing | ~8.0 km | — | — |

**Important limitation:** OSM's `craft=roofer` tag has sparse, volunteer-dependent coverage for service-area contractors (businesses without a public storefront are much less likely to be mapped at all). The earlier SXO audit's live SERP research surfaced several real, actively-ranking competitors — B&B Roofing & Gutters, Affordable Roofing & Gutters, All Pro Roofing, Eddy Roofing — none of which appear in this OSM query. **Do not treat this 5-business list as the actual competitive set** — it's a data-quality-limited snapshot, not a market map. A real competitor radius map (with 15-20 verified competitors, ratings, and review counts) requires DataForSEO's Maps SERP API (Tier 1).

## Schema Readiness for Maps / Local Pack

This carries over the Critical/High findings already detailed in `findings/schema.md`, restated here specifically for their maps-ranking relevance:

- No `areaServed` anywhere in the site's schema, despite the business explicitly serving 8 named markets — this is the single property Google most directly uses to understand a Service Area Business's footprint independent of a public address, and it's the highest-leverage schema fix for local-pack/Maps visibility.
- Only 2 of 8 location pages carry any `LocalBusiness`/`RoofingContractor` schema at all.
- The Brooklyn and Freehold pages assert specific street addresses in hidden schema that appear on no map platform checked in this session (not OSM, and Google/GBP status is unverifiable) — if these were ever submitted to GBP as service-area or storefront addresses, that's a policy-violation risk worth ruling out directly in the dashboard.

## Recommended Schema (Tier 0 — generated from collected data)

Per this skill's guidance, this does **not** include self-serving review markup (Google ignores `LocalBusiness` review data supplied by the business itself) — the real review signal already lives in the Trustindex-syndicated Google reviews, which don't need separate markup here.

```json
{
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "@id": "https://www.proline-roofing.com/#organization",
  "name": "ProLine Roofing",
  "telephone": "+1-347-323-9128",
  "url": "https://www.proline-roofing.com",
  "image": "https://www.proline-roofing.com/wp-content/uploads/2024/03/ProLine-Roofing-Icon-300x300.png",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "481 Mill Road",
    "addressLocality": "Staten Island",
    "addressRegion": "NY",
    "postalCode": "10306",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.5575319",
    "longitude": "-74.1137795"
  },
  "areaServed": [
    { "@type": "City", "name": "Staten Island", "addressRegion": "NY" },
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
    "https://twitter.com/ProLineRoofingN",
    "https://linkedin.com/company/proline-roofing-new-york/",
    "https://www.pinterest.com/ProLineRoofingNY/",
    "https://www.youtube.com/@ProLineRoofingNY"
  ]
}
```

Note: the dead `g.co/kgs/iQXx3tY` link has been dropped from `sameAs` in this recommended version pending manual GBP verification — re-add the correct, live GBP URL once confirmed.

## Top 10 Prioritized Actions

1. **[Critical]** Log into the Google Business Profile / Local Services Ads dashboard and confirm current listing/verification status — the site's own `sameAs` link to it currently returns a dead 410 page.
2. **[Critical]** Rule out whether the undisclosed Brooklyn (225 Joralemon St) or Freehold (144 Tilton Dr) addresses found in the site's schema were ever submitted as GBP locations — confirm no duplicate/unauthorized listings exist for either. *(carried over from `findings/local.md`)*
3. **[High]** Fix the site's `streetAddress` schema bug and add `areaServed` for all 8 markets — the highest-leverage schema change for Maps/local-pack visibility. *(carried over from `findings/schema.md`)*
4. **[High]** Resolve the internal two-phone-number inconsistency `(347) 323-9128` vs `(848) 310-3977` before it has a chance to propagate to any map platform. *(carried over from `findings/local.md`)*
5. **[High]** Verify Bing Places for Business listing manually (client-rendered content couldn't be checked automatically) — claim/update if not already active.
6. **[Medium]** Claim/verify Apple Business Connect if not already done — free, and commonly overlooked.
7. **[Medium]** Add `LocalBusiness`/`RoofingContractor` + `areaServed` schema to the 6 location pages currently missing it entirely.
8. **[Medium]** Once GBP access is confirmed, audit primary/additional categories, photo count/recency, Google Posts cadence, and owner-response rate — none of this was checkable at Tier 0.
9. **[Low]** Install the DataForSEO extension for a follow-up Tier 1 pass — this would unlock geo-grid rank tracking (Share of Local Voice across the Staten Island/Brooklyn/NJ footprint), a real 15-20-competitor Maps SERP comparison, and live review velocity/sentiment data, all of which are only partially inferable at Tier 0.
10. **[Low]** Re-run this Maps report after the schema and GBP fixes above land, to confirm the OSM/website NAP consistency (currently the one clean signal in this audit) is preserved.

## Cost Report

Tier 0 only — no DataForSEO credits available or consumed. All data sourced from free APIs (Nominatim, Overpass) and direct HTTP checks (Bing Maps raw fetch, Google short-link resolution).

## Limitations Disclaimer

- No DataForSEO MCP access this session — no geo-grid rank tracking, no live GBP profile data, no cross-platform review velocity/sentiment, no verified Maps SERP competitor set.
- Bing Maps listing content is JavaScript-rendered and could not be extracted from a raw HTTP fetch; only the page title (suggesting Bing recognizes the business name/location) was confirmed.
- Apple Maps has no public API; presence is entirely unverified in this report.
- The dead Google short-link finding is a strong signal but not a certainty — Google's business tools require dashboard access to confirm definitively.
- OSM competitor coverage for this niche (service-area roofing contractors) is known to be sparse; the 5-business list above should not be read as the real competitive set — see the earlier `findings/sxo.md` for a SERP-verified competitor list instead.
- This report cross-references `findings/local.md` and `findings/schema.md` from the earlier full audit rather than re-deriving on-page findings from scratch — see those files for full detail and evidence on the NAP/schema issues repeated here.

---

*Cross-skill: for website-level local SEO signals, see `findings/local.md`. For schema validation, see `findings/schema.md`. For a live Tier 1 re-run, install the DataForSEO extension.*
