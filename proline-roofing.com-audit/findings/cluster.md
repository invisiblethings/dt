# Semantic Content Clustering Audit — proline-roofing.com

## Category Score: 38 / 100

The blog has a nominal category taxonomy (5 categories) and some genuine post-to-post
contextual linking, but there is no real pillar/hub architecture, over two-thirds of
posts are unreachable from the main blog index, one post is orphaned from the category
system entirely, and the blog's links into the commercial `/services/` money pages are
template navigation menus rather than contextual, topic-matched CTAs. Whole service
lines (commercial roofing, gutters) and most of the NJ location footprint have zero
supporting blog content.

## Data Reviewed

- 19 blog posts (`post-sitemap.xml`), 5 category archives (`category-sitemap.xml`)
- Rendered HTML of `/blog/`, all 5 category archives, and 10 representative posts
  (roofing-costs-decoded, roof-replacement-in-staten-island-made-easy,
  5-types-of-roofing-you-should-consider, storm-damage-assesment-checklist,
  diy-roof-repairs, roofing-winter-guide, roof-lifespan-guide, roof-anatomy-101,
  the-real-cost-of-roof-repairs-in-staten-island, when-is-the-best-time-to-replace...)
- Full service hierarchy (residential/commercial roofing, roof-repair, roof-replacement,
  gutter-services) and location hierarchy (Staten Island, Brooklyn, 6 NJ towns)

## What Works

- A 5-category taxonomy exists (roofing, repairs-problem-solving, replacement,
  roofing-101, weather-roofing) that maps reasonably well to core funnel stages
  (informational → problem → replacement decision).
- Several posts already carry genuine in-body contextual links to sibling posts, not
  just boilerplate — e.g. `diy-roof-repairs` links to `roof-emergency-when-to-act-what-to-do`,
  `roof-leaking-common-causes-how-to-spot-them`, `storm-damage-assesment-checklist`,
  and `roofing-costs-decoded` from within the article body. This is a usable seed for
  a real hub-and-spoke rebuild.
- `roof-replacement-in-staten-island-made-easy` was refreshed July 2026 and is titled
  as a "2026 Cost & Guide," making it the strongest existing candidate to promote into
  a true Roof Replacement pillar.
- The repairs-problem-solving category (7 posts: DIY repairs, leak causes, storm
  checklist, roof emergency, shingle painting, plus two cost posts) is the most
  complete topical grouping on the site and is close to cluster-ready.
- Clear service/location URL hierarchies already exist on the commercial side, so the
  destination pages for a hub-and-spoke rebuild (specific `/services/...` subpages)
  are already built — the gap is purely on the content/linking side, not architecture.

## Findings

### 1. No true pillar pages exist — category archives are being used as false hubs
**Severity: High**
**Description:** None of the 19 posts is structured as a comprehensive 2,500+ word
"ultimate guide" that a spoke cluster can link into. The closest candidates —
`roofing-costs-decoded` and `roof-replacement-in-staten-island-made-easy` — are
standard-length blog posts, not pillar-depth content, and both are cross-tagged into
3-4 categories simultaneously (roofing, repairs-problem-solving, replacement,
roofing-101), which signals the site itself doesn't have a fixed opinion on which
post "owns" each topic. The category archive pages (`/category/roofing/`,
`/category/roofing/replacement/`, etc.) are auto-generated excerpt lists with no
original intro copy, no table of contents, and no synthesis — they cannot function
as pillar/hub content for topical authority purposes.
**Recommendation:** Select and rebuild two pillars: (1) "Roof Replacement Guide"
built from `roof-replacement-in-staten-island-made-easy`, and (2) "Roofing Costs
Guide" built from `roofing-costs-decoded`. Expand each to 2,500-4,000 words with a
TOC, cover every spoke subtopic in summary, and add a dedicated `ItemList`/ Article
schema. Remove the over-tagging (one post should live in one primary category) and
add manual "Related Guides" link blocks that mirror the intended hub-spoke structure
rather than relying on the category taxonomy to imply it.

### 2. 13 of 19 posts (68%) are not reachable from the main /blog/ index
**Severity: High**
**Description:** `/blog/` renders a hard-capped grid of only 6 posts with no
pagination, "load more," or "view all" control. The other 13 posts are only
discoverable via the 5 category archive pages or the XML sitemap. This materially
weakens the blog's function as a cluster hub and dilutes internal PageRank flow to
older/deeper posts.
**Recommendation:** Add pagination (or a "View All Posts" link) to `/blog/`, and/or
restructure `/blog/` itself into a curated hub page that groups posts by the 2-3
pillar clusters below with descriptive lead-ins, rather than a reverse-chronological
teaser grid.

### 3. One post is orphaned from the category system and the blog index entirely
**Severity: Medium**
**Description:** `5-types-of-roofing-you-should-consider` does not appear on any of
the 5 category archive pages (roofing, repairs-problem-solving, replacement,
roofing-101, weather-roofing) and is not among the 6 posts shown on `/blog/`. It is
only discoverable via the post-sitemap.xml or internal links from two other posts
(`roofing-winter-guide` and its own inbound link from `5-benefits-of-roof-inspections-maintenance`).
This is a real materials/roof-types topic (asphalt, metal, tile, cedar shake, flat)
that should be a spoke feeding the residential-roofing service subpages, but its poor
discoverability suppresses its ability to pass link equity or rank supportingly.
**Recommendation:** Assign it to the `roofing-101` category (and secondarily
`replacement`), and add it to the Roofing 101/Materials cluster described below.

### 4. "weather-roofing" category is a near-empty, thin archive page
**Severity: Medium**
**Description:** `/category/roofing/weather-roofing/` contains exactly one post
(`roofing-winter-guide`). A thin, single-item category archive is a weak indexable
page (duplicate/near-duplicate of the single post it contains) and signals to
crawlers that this cluster was abandoned. Notably, `storm-damage-assesment-checklist`
— which is fundamentally a weather-event post — is tagged only under
`repairs-problem-solving`, not `weather-roofing`, so the category doesn't even
capture the storm content that already exists.
**Recommendation:** Either retag `storm-damage-assesment-checklist` (and any new
storm/insurance content, see Finding 6) into `weather-roofing` to give it real
substance, or fold weather-roofing back into repairs-problem-solving as a tag rather
than a standalone category until there are 3+ posts to justify it.

### 5. Blog-to-service links are template navigation, not contextual hub-spoke CTAs
**Severity: High**
**Description:** Every post checked contains the identical, full 25-link services
mega-menu (all of residential/commercial roofing, roof-repair, roof-replacement, and
gutter-services subpages) appearing in the same order in the header/sidebar nav
markup — not as hand-placed, topically-matched in-paragraph links. For example,
`diy-roof-repairs` (a DIY-vs-hire-a-pro article, prime bottom-of-funnel content) does
not contain a single contextual sentence-level link to `/services/roof-repair/` or
`/services/roof-repair/roof-leak-repair/` in its article body — the only services
links present are the repeated 25-item static menu. Presenting 25 competing service
links with no hierarchy dilutes both the user's next-step CTA and the topical
relevance signal search engines use to associate a spoke post with a specific money
page.
**Recommendation:** Add exactly one or two hand-picked, keyword-anchored contextual
links per post to the single most relevant service page/subpage (e.g.
`diy-roof-repairs` → `/services/roof-repair/roof-leak-repair/`;
`storm-damage-assesment-checklist` → `/services/roof-repair/storm-damage-repair/`;
`roof-replacement-in-staten-island-made-easy` → `/services/roof-replacement/residential-roof-replacement/`),
placed near a clear CTA ("Get a free storm damage inspection"), independent of the
static nav menu.

### 6. Major content gaps versus a full local roofing content strategy
**Severity: Medium**
**Description:** Comparing the 19 existing posts against the service/location
footprint reveals several structural gaps:
- **Insurance claims / storm damage documentation:** only `storm-damage-assesment-checklist`
  exists, and it's a DIY checklist, not a guide to filing/documenting an insurance
  claim — a top intent for storm-damage-repair conversions.
- **Warranty comparisons:** no post explains manufacturer vs. workmanship warranties,
  despite this being a common differentiator/objection in the replacement decision.
- **Seasonal maintenance beyond winter:** `roofing-winter-guide` is the only seasonal
  post; no spring/summer/fall or hurricane-season prep content for a coastal
  Staten Island/NJ audience.
- **Commercial roofing cluster:** all 19 posts are residential-framed; there is zero
  blog support (flat roofing, TPO/EPDM, commercial maintenance contracts, roof
  inspections for property managers) for the entire `/services/commercial-roofing/`
  line (4 subpages).
- **Gutter cluster:** `/services/gutter-services/` has 3 subpages (cleaning, guards,
  installation) with no supporting blog content at all.
- **NJ-town-specific content:** location pages exist for Clifton, Elizabeth,
  Freehold, Jersey City, Newark, and Old Bridge, but no blog post targets any NJ town
  by name (cost/season/material content is Staten Island/Brooklyn/NYC-only) — the
  location pages are structurally isolated from the blog cluster.
- **Material spokes:** `/services/residential-roofing/metal-roofing/`,
  `cedar-shake-roofing/`, and `tile-roofing/` have no dedicated blog spoke driving
  informational search traffic toward them; only asphalt and rolled roofing are
  covered.
**Recommendation:** Prioritize new spokes in this order: (1) an insurance-claims
guide feeding `storm-damage-repair`, (2) a warranty-comparison guide feeding
`roof-replacement`, (3) one NJ-town cost/seasonal post per top 2 NJ markets (e.g.
Newark, Jersey City) linking to their location pages, (4) a commercial roofing
mini-cluster (2 posts) feeding `/services/commercial-roofing/`, (5) a gutter mini-cluster
(2 posts) feeding `/services/gutter-services/`.

### 7. Cannibalization risk from cost-related post overlap
**Severity: Low**
**Description:** `roofing-costs-decoded` and `the-real-cost-of-roof-repairs-in-staten-island`
both target overlapping "how much does roofing cost in Staten Island" intent and are
both tagged into `roofing` and `repairs-problem-solving`. Without a clear pillar/spoke
split (overview pillar vs. repair-specific cost spoke), these two posts are likely
competing for the same queries rather than reinforcing each other.
**Recommendation:** Formally designate `roofing-costs-decoded` as the Roofing Costs
pillar (broad: repair + replacement + material cost ranges) and narrow
`the-real-cost-of-roof-repairs-in-staten-island` into a repair-cost-specific spoke
that links up to the pillar for replacement/material cost detail, removing the
duplicated ground between them.

## Proposed Hub-and-Spoke Architecture (Top 3 Clusters)

### Cluster A — Roof Replacement Guide (pillar)
**Pillar:** `roof-replacement-in-staten-island-made-easy` (expand to 2,500-4,000 words)
**Spokes:** `when-is-the-best-time-to-replace-your-roof-in-nyc`,
`5-signs-your-roof-is-signaling-for-a-replacement-before-disaster-strikes`,
`roof-lifespan-guide-how-long-do-roofs-last-in-ny-nj`, `new-roof-upgrade`
**Mandatory service link:** `/services/roof-replacement/` and
`/services/roof-replacement/residential-roof-replacement/`

| From | To | Type |
|---|---|---|
| Pillar (replacement guide) | Each spoke above | Mandatory (pillar→spoke) |
| Each spoke above | Pillar | Mandatory (spoke→pillar) |
| when-is-best-time-to-replace | 5-signs-roof-signaling-replacement | Recommended |
| 5-signs-roof-signaling-replacement | roof-lifespan-guide | Recommended |
| roof-lifespan-guide | new-roof-upgrade | Recommended |
| Pillar + all spokes | /services/roof-replacement/residential-roof-replacement/ | Mandatory (contextual CTA) |
| new-roof-upgrade | /services/residential-roofing/metal-roofing/ (upgrade-material tie-in) | Optional |

### Cluster B — Roofing Costs Guide (pillar)
**Pillar:** `roofing-costs-decoded` (expand + de-duplicate vs. Finding 7)
**Spokes:** `the-real-cost-of-roof-repairs-in-staten-island`,
`affordable-roofing-in-brooklyn-ny`, `asphalt-shingle-roofing-staten-island`,
`rolled-roofing-guide`
**Mandatory service link:** `/services/roof-replacement/` and `/services/roof-repair/`

| From | To | Type |
|---|---|---|
| Pillar (costs guide) | Each spoke above | Mandatory (pillar→spoke) |
| Each spoke above | Pillar | Mandatory (spoke→pillar) |
| the-real-cost-of-roof-repairs | affordable-roofing-in-brooklyn-ny | Recommended |
| asphalt-shingle-roofing-staten-island | rolled-roofing-guide | Recommended |
| affordable-roofing-in-brooklyn-ny | /locations/brooklyn-ny/ | Mandatory (contextual CTA) |
| the-real-cost-of-roof-repairs | /services/roof-repair/ | Mandatory (contextual CTA) |
| Cluster B pillar | Cluster A pillar | Optional (cross-cluster) |

### Cluster C — Roof Repair & Storm Damage (new pillar needed)
**Pillar (new/promote):** rewrite `roof-leaking-common-causes-how-to-spot-them` or
commission a new "Complete Roof Repair & Storm Damage Guide for NY/NJ" pillar
**Spokes:** `diy-roof-repairs`, `roof-emergency-when-to-act-what-to-do`,
`storm-damage-assesment-checklist`, `can-roofing-shingles-be-painted-a-guide-for-homeowners`
**Mandatory service link:** `/services/roof-repair/`,
`/services/roof-repair/roof-leak-repair/`, `/services/roof-repair/storm-damage-repair/`

| From | To | Type |
|---|---|---|
| Pillar (repair/storm guide) | Each spoke above | Mandatory (pillar→spoke) |
| Each spoke above | Pillar | Mandatory (spoke→pillar) |
| diy-roof-repairs | roof-emergency-when-to-act-what-to-do | Recommended (already exists) |
| diy-roof-repairs | storm-damage-assesment-checklist | Recommended (already exists) |
| storm-damage-assesment-checklist | roof-emergency-when-to-act-what-to-do | Recommended |
| diy-roof-repairs | /services/roof-repair/roof-leak-repair/ | Mandatory (contextual CTA, currently missing) |
| storm-damage-assesment-checklist | /services/roof-repair/storm-damage-repair/ | Mandatory (contextual CTA, currently missing) |
| roof-emergency-when-to-act-what-to-do | /services/roof-repair/ | Mandatory (contextual CTA, currently missing) |

### Cluster D (secondary, lower priority) — Roofing 101 / Materials
**Pillar (light):** `roof-anatomy-101`
**Spokes:** `5-types-of-roofing-you-should-consider` (fix orphan status first —
Finding 3), `rolled-roofing-guide` (shared with Cluster B, interlink only),
`5-benefits-of-roof-inspections-maintenance`
**Mandatory service link:** relevant `/services/residential-roofing/` material
subpages (asphalt, metal, tile, cedar-shake) — currently unsupported by any spoke
content (Finding 6).

## Cannibalization Check Summary

| Pair | Overlap concern | Resolution |
|---|---|---|
| roofing-costs-decoded vs. the-real-cost-of-roof-repairs-in-staten-island | High — both target "roofing cost Staten Island" intent, both cross-tagged into roofing + repairs-problem-solving | Designate former as pillar, narrow latter to repair-cost-only spoke |
| roofing-costs-decoded vs. asphalt-shingle-roofing-staten-island | Medium — both cover asphalt shingle cost ranges | Keep material-specific detail in asphalt post; costs pillar should summarize + link out |
| new-roof-upgrade vs. roof-replacement-in-staten-island-made-easy | Medium — both cover "why/when to replace vs upgrade" | Reposition new-roof-upgrade as the "upgrade options" spoke (materials/features), not a competing replacement-decision post |
| roof-lifespan-guide vs. 5-signs-your-roof-is-signaling-for-a-replacement | Low — complementary (lifespan data vs. symptom checklist), keep as sibling spokes | No action needed beyond interlinking |

## Validation Checklist Results

- [FAIL] No two posts share the same primary keyword — roofing-costs-decoded and
  the-real-cost-of-roof-repairs-in-staten-island currently overlap (Finding 7)
- [FAIL] Every spoke has 3+ incoming internal links — most spokes currently have 0-2
  contextual inbound links; only the repairs-problem-solving posts have partial
  interlinking
- [FAIL] Every spoke links to a pillar — no formal pillar exists today (Finding 1)
- [FAIL] Pillar links to every spoke — no formal pillar exists today (Finding 1)
- [FAIL] No orphan pages — 5-types-of-roofing-you-should-consider is orphaned from
  categories/blog index (Finding 3); 13/19 posts unreachable from /blog/ (Finding 2)
- [PARTIAL] Template selection matches intent — categories broadly align to
  informational/commercial intent but individual posts aren't built as
  pillar-vs-spoke templates
- [UNVERIFIED] Word count targets — not measured in this pass; pillar candidates
  appear to be standard blog-post length, likely under the 2,500-4,000 word pillar
  target
- [FAIL] Total cluster size within constraints — 0 of 5 categories currently
  functions as a true 2-5 post cluster with a pillar; weather-roofing has only 1 post
- [FAIL] SERP overlap supports groupings — not independently re-verified in this
  pass beyond existing category tags, which are already inconsistent (4-category
  cross-tagging on roofing-costs-decoded, new-roof-upgrade)
