# Backlink Profile Audit — proline-roofing.com

**Category Score: 40 / 100 (Data-Confidence-Capped — Tier 0/Basic)**

## Methodology Note
`backlinks_auth.py --check` confirmed **Tier 0 (Basic)**: only the Common Crawl Web Graph and the local Verification Crawler are available. No Moz API key or Bing Webmaster API key is configured, so **Domain Authority/Page Authority, Spam Score, full referring-domain lists, anchor-text distribution, link velocity, and follow/nofollow ratios cannot be measured at all** — those are Moz/Bing/DataForSEO-only data points.

Per the confidence-weighted scoring model, only 1 of 7 standard scoring factors (referring-domain signal, via Common Crawl in-degree/PageRank — and even that returned effectively empty) had any data source available. **A true, defensible 0-100 Backlink Health Score cannot be calculated at this tier** — running `validate_backlink_report.py` against the collected data confirmed this (`factors_with_data: 1/7`, which the validator flags as an error if paired with a numeric score). The **40/100 shown above is not a link-quality score** — it is a capped placeholder reflecting "mostly unmeasured, no red flags found in what little is visible," provided only so this category can be aggregated into the full-site audit total. Treat it as **INSUFFICIENT DATA** for any decision-making purpose until Tier 1 (Moz) or Tier 2 (Bing) is enabled.

Sources used:
- `commoncrawl_graph.py proline-roofing.com --json` — domain-level graph metrics, confidence 0.50, quarterly refresh (release `cc-main-2026-jan-feb-mar`)
- `verify_backlinks.py` — live-crawled 4 candidate source pages (the site's own linked-out social profiles: Facebook, LinkedIn, X/Twitter, Pinterest), confidence 0.95 for pages that could be fetched
- `domain_history.py proline-roofing.com --topic "roofing contractor Staten Island"` — WHOIS heritage check. First pass had no `whois` binary installed (installed mid-session); the re-run against port 43 then timed out, consistent with restricted TCP/43 egress in this environment. **No creation date, registrar, or age could be obtained — domain heritage risk is UNKNOWN, not "clean."**
- `parse_html.py` against the saved homepage (`si-check.html`) — used only to cross-check outbound social links against verified inbound links (reciprocal-link check)

## What Works
- Domain **is present in the Common Crawl web graph** (`in_crawl: true`) and does clear the ranking-inclusion threshold (`in_rankings: true`) — it is not an unindexed or newly-seen domain from CC's perspective. (Common Crawl, confidence 0.50)
- No evidence of manual-action-style spam signals in any data source that was checked (no toxic-pattern flags from the verify crawler, no negative WHOIS/heritage findings — though heritage is unverifiable rather than confirmed clean).
- The site's outbound social citations (Facebook, LinkedIn, X, Pinterest, plus a Google Maps CID link) are consistent, real business profiles rather than placeholder/broken links — the Pinterest profile was live-verified to link back to `proline-roofing.com` with a real anchor. (Verify crawler, confidence 0.95)
- No reciprocal-link scheme risk beyond the expected owned-profile pattern: the only reciprocal domain found (site → Pinterest → site) is the business's own Pinterest profile, which is normal/expected for an owned social account, not a link-exchange red flag.
- The domain resolves cleanly to 2 hosts in the CC graph (apex + `www`), consistent with a standard single-domain small-business setup — no evidence of a shadow/parked mirror domain from this data.

## Findings

### 1. Referring-domain count, Domain Authority, and Spam Score are completely unmeasured at this tier
**Severity:** High
**Description:** Common Crawl's domain-level graph returned `top_referring_domains: []` and `referring_domains_sample: 0` for proline-roofing.com — CC's crawl sample did not surface any inbound links to this domain. This must **not** be read as "the site has zero backlinks" (Common Crawl only samples a fraction of the web and has notably thin coverage of small local-business sites); it means **no usable referring-domain data exists at Tier 0**, full stop. Without Moz or Bing, there is no way to see the actual list of linking domains, total link count, DA/PA, or spam score for this site or its competitors.
**Recommendation:** Sign up for the free Moz API tier (moz.com/products/api — 2,500 rows/month, no cost) to unlock DA/PA, referring-domain counts, spam score, and anchor-text distribution (confidence 0.85). This is the single highest-value upgrade for this category — it converts 4 of the 7 scoring factors from "no data" to "measured."

### 2. Domain registration heritage could not be verified — cannot rule out an expired-domain-abuse pattern
**Severity:** Medium
**Description:** `domain_history.py` requires WHOIS data to compute registration age and compare it against topical drift (Google's Jan-2025 QRG §4.6.7 expired-domain-abuse pattern: an old domain that changed subject matter is a red flag). In this environment, the `whois` binary was missing on first attempt and, after installing it, the live WHOIS query to port 43 timed out (network egress to TCP/43 appears restricted here). **Result: `risk: unknown`, no creation/updated/expiry date, no registrar.** This is a genuine gap, not a clean bill of health — a domain that was previously used for an unrelated topic and repurposed for roofing content would not be caught by any check that ran successfully in this audit.
**Recommendation:** Re-run `python3 domain_history.py proline-roofing.com --topic "roofing contractor Staten Island" --baseline-topic "<earliest Wayback Machine topic>"` from a network path where TCP/43 egress is permitted, or pull registration data directly from a registrar-facing WHOIS/RDAP web lookup (e.g., ICANN Lookup) and supply it manually. Cross-reference against the earliest Wayback Machine snapshot's subject matter to confirm this has always been a roofing-related domain.

### 3. Only 4 inbound-link candidates could be identified and verified, all owned-profile citations rather than third-party editorial backlinks
**Severity:** Medium
**Description:** No third-party backlink list was available at Tier 0 (no Moz/Bing referring-domains API), so verification was limited to the social-profile URLs the site itself links out to from its homepage (Facebook, LinkedIn, X/Twitter, Pinterest). Live-crawl results:
| Source | HTTP Status | Link back to site found? | Note |
|---|---|---|---|
| facebook.com/ProLineRoofingInc | 400 | Unknown | Meta blocks unauthenticated bot fetches; cannot confirm or deny |
| linkedin.com/company/proline-roofing-new-york | 200 | Not found in raw HTML | **Likely false negative** — LinkedIn company pages are largely JS-rendered/require auth to show the full profile including website link; a 200 response with no link found should be treated as unverifiable, not as evidence the link is absent |
| x.com (twitter.com)/@ProLineRoofingN | 403 | Unknown | X blocks unauthenticated scraping |
| pinterest.com/prolineroofingny | 200 | **Yes, verified** | Anchor text "proline-roofing.com", `rel="noopener noreferrer"` (not `nofollow`, but profile links carry negligible ranking weight regardless) |
This is a very thin sample (n=4, all owned properties) and says nothing about the size or quality of the genuine third-party referring-domain base, which remains completely unknown.
**Recommendation:** Do not treat this as a backlink-profile assessment — it only confirms the business's own social citations are live and self-consistent, which is a baseline local-SEO/NAP hygiene check, not a link-authority signal. For real backlink discovery (guest posts, local directories, supplier/partner links, press mentions), Tier 1 (Moz) or Tier 2 (Bing Webmaster "inbound links" report) is required.

### 4. Anchor-text naturalness, link velocity, and follow/nofollow ratio: no data source at this tier
**Severity:** Low
**Description:** These three scoring factors (15%, 10%, and 5% of the standard weighting model respectively) have zero available data sources under Tier 0 per the scoring-factor table (anchor text needs Moz/Bing/DataForSEO; link velocity needs DataForSEO specifically — no free-tier source exists for it at all; follow/nofollow ratio needs DataForSEO or Bing link details). Their weight has been redistributed onto the single measurable factor (referring-domain presence), which is why no meaningful composite score can be produced.
**Recommendation:** Bing Webmaster Tools (free signup, near-real-time data, confidence 0.70) is the fastest path to unlocking follow/nofollow and basic anchor data alongside its unique competitor-gap comparison tool. Moz adds anchor-text distribution and DA-based quality distribution. Full link-velocity trend analysis requires the paid DataForSEO extension (`./extensions/dataforseo/install.sh`).

### 5. Geographic relevance of the (unknown) referring-domain base cannot be assessed
**Severity:** Low
**Description:** For a hyper-local Staten Island/NJ roofing contractor, geographic relevance of referring domains (e.g., links from NY/NJ local directories, chambers of commerce, local news vs. generic global spam domains) is a meaningful quality signal, but it requires either DataForSEO or Bing's country-level link data — neither is available at Tier 0.
**Recommendation:** Once Bing Webmaster Tools or Moz is connected, prioritize checking for presence of standard local-contractor citation sources (BBB, Angi, HomeAdvisor, Google Business Profile-linked citations, local Staten Island/NJ chamber-of-commerce or news sites) as part of the Tier 1/2 follow-up pass.

## Recommended Tier Upgrade Path
1. **Moz free API** (moz.com/products/api, 2,500 rows/month, no cost) — unlocks DA/PA, referring-domain counts and list, spam score, anchor-text distribution. Highest single-item ROI for this category.
2. **Bing Webmaster Tools** (bing.com/webmasters, free) — unlocks inbound-link report and the unique competitor-gap comparison tool, near-real-time freshness.
3. **DataForSEO extension** (paid, `./extensions/dataforseo/install.sh`) — only source for link-velocity trend; highest-fidelity cross-validation for everything else (confidence 1.00).
4. Re-run this audit after any of the above are configured — the category score will become a genuine numeric Backlink Health Score rather than the current data-confidence placeholder.

## Cross-Skill References
- E-E-A-T / content trust signals: run `/seo content <url>` (not duplicated here)
- Crawlability/technical link-health (broken internal links, redirect chains): run `/seo technical <url>` (not duplicated here)

## Files Referenced
- /home/user/dt/proline-roofing.com-audit/si-check.html (homepage sample used for outbound-link/reciprocal-link cross-check)
- /home/user/dt/proline-roofing.com-audit/locations-page.html
- /home/user/dt/proline-roofing.com-audit/crawled-urls.txt
- /home/user/dt/proline-roofing.com-audit/sitemap-urls.txt
