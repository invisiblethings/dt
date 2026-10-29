# Google visibility drop: checks on 29 Oct 2026

## What the live Google data shows (DataForSEO, google.com, top 100)

The site is dropping out of Google **across the board**, not just on one keyword. The results flicker between checks a few minutes apart, which is typical while Google is removing or re-processing a site.

| Query | Earlier today | 10:03–10:05 UTC |
|---|---|---|
| best digital piano (US/UK, desktop/mobile) | not in top 100 | not in top 100 |
| electric piano (US desktop) | #2 | **not in top 100** |
| electric piano (US mobile) | – | #2 |
| best digital pianos (US mobile) | #4 | **not in top 100** |
| best portable digital piano (US) | #3 | **not in top 100** |
| simply piano review, yamaha p-145 review | – | **not in top 100** |
| **pianoers.com** (your own domain name) | – | **not in top 100**. Google shows only ~77 results for it |

A site that has only lost rankings still ranks for its own domain name. Not appearing for "pianoers.com" points to a **site-level problem**: removal, a manual action, crawling being blocked, or a security issue. It doesn't look like a normal ranking loss for one page.

Search Console daily data to 27 Oct showed no drop yet (75–100 clicks a day). So the drop started on about 27–29 Oct.

## What I ruled out from outside

- **Technical basics:** homepage and posts return 200. robots.txt allows everything except /ghost/, /members/ and /r/. No noindex tag or X-Robots-Tag header. The canonical URLs are correct. The sitemap lists 39 posts and 5 pages. Unknown URLs return 404.
- **Cloaking from my IP:** a normal browser, the Googlebot desktop user agent and the Googlebot mobile user agent with a Google referrer all get byte-identical pages. I can't test from Google's own IP addresses. Only Search Console can show what Googlebot really receives.
- **No announced Google update:** the Search Status Dashboard lists nothing after the September 2026 spam update, which ended on 8 Oct.
- **Your theme changes** (speed release 1.3.x: lazy Portal, prefetch, view transitions, image fix) don't touch indexing. There's no robots change, no canonical change, and the same head tags.

## Likely causes, in order. Check them in Search Console now

1. **Removals** (Indexing → Removals). A temporary removal of the prefix `https://pianoers.com/` hides the whole site within hours, including for brand searches. That matches what we see. If you find one, click **Cancel request**.
2. **Manual actions** (Security & Manual Actions → Manual actions), for example "Pure spam", "Thin content with little or no added value" or "Site reputation abuse".
3. **Security issues** (same menu): hacked content, cloaking or Japanese keyword spam. The spam links hitting the site ("japan_proxy_vpn" pages on bhs-links-*.xyz, 14 domains since August) are the pattern that often comes with a Japanese keyword hack.
4. **Google can't fetch the site.** Check Settings → Crawl stats → Host status (robots.txt fetch, server connectivity) and "By response" (a jump in 403, 429 or 5xx since about 20 Oct). Also look at Cloudflare:
   - Security → Bots (Bot Fight Mode or Super Bot Fight Mode)
   - Security → WAF custom rules and rate limiting
   - "Under Attack" mode
   - any country blocks

   Any of these can block real Googlebot while normal visitors see the site fine.
5. **URL Inspection** on the homepage and on /best-digital-piano/:
   - **Is it on Google?** It should say "URL is on Google".
   - **Last crawl, and the canonical Google picked:** these should be recent, and the canonical should be your own URL.
   - **Live test:** it should say "Page fetch: Successful", and the screenshot should show your real page.

## If nothing above shows a problem

- Check **Pages** (Indexing → Pages) for a sudden fall in indexed pages, and for reasons like "Crawled – currently not indexed" or "Excluded by 'noindex' tag".
- Resubmit the sitemap (Sitemaps → `sitemap.xml`), and request indexing for the homepage and the top posts.
- Re-check these queries daily for a week. Short drops of a whole site sometimes reverse within days, but a drop that hits the brand name shouldn't be left to wait.

## Not the cause (keep for later)

- The spam links are nofollow (the bhs-links-*.xyz network). Google says it ignores such links. A disavow file is optional and low priority. Do it only once the main cause is found.
- The content gaps in GSC-AUDIT.md and COMPETITOR-ANALYSIS.md are real. But content quality doesn't make a site vanish for its own domain name overnight.

## Update, later on 29 Oct: Search Console is clean, so the cause is most likely an unconfirmed Google update

- The owner checked Removals, Manual actions, Security issues, Crawl stats, Cloudflare and URL Inspection. **All of them were clean.** So the site isn't removed, penalised or blocked.
- Repeating the same DataForSEO queries gave **inconsistent results**:
  - "pianoers.com" ranked #1 in one of four runs and was missing in the other three.
  - The control domain, pianodreamers.com, ranked the same in every run.

  The "site gone" reading from that tool was overstated.
- Search Engine Roundtable reported an **unconfirmed Google ranking update starting about 26–27 Oct 2026**. That followed earlier volatility on 16, 20–21 and 24 Oct, and it noted that rank-tracking tools have been unreliable in the same period. That timing matches the drop for "best digital piano".
- **Working conclusion:** an algorithmic re-ranking, not a technical or manual problem. It hits "best digital piano" hardest. The results page now favours forums (Reddit, Piano World) and sites with a full review behind each pick (Pianodreamers, Pianist's Compass). See COMPETITOR-ANALYSIS.md.

### What to do
1. **No drastic changes for 7–10 days.** Don't change URLs, don't delete content, don't disavow. Updates often swing back partly while they roll out.
2. Watch **Search Console → Performance**, by day (the data lags 2–3 days):
   - the query "best digital piano"
   - the whole site
   - the Pages tab, in case another of your URLs starts ranking
3. Spot-check by hand: search Google in a private window, with no rank-tracker spending.
4. Then make the improvements that match what's winning now:
   - a trust and testing box at the top, with consistent author details
   - your own photos of the pianos
   - a full review behind each main pick
   - a comparison table and verdict cards
   - search-matching headings

   These are in GSC-AUDIT.md and COMPETITOR-ANALYSIS.md.
