# Sitemap audit: pianoers.com (7 Oct 2026)

**Score: 86 / 100**

Ghost's sitemap is technically clean. Every URL returns 200, is self-canonical and has no noindex. The only real issues are a few low-value URLs Ghost insists on listing, one orphan tag page, and some posts with very few internal links. Most of what's left cannot be edited in Ghost.

## What was checked (live fetch 7 Oct 2026, plus crawl/pages.json)
- sitemap.xml (index), sitemap-pages.xml, sitemap-posts.xml, sitemap-tags.xml, sitemap-authors.xml. All return 200, `content-type: text/xml`, `cache-control: public, max-age=3600`. `xmllint --noout` reports no errors on all five files.
- The index lists 4 child sitemaps (pages 5, posts 38, tags 10, authors 2 = 55 URLs). 55 unique URLs, none duplicated. This is far below the 50,000 URL / 50 MB limits (posts file is 12 KB).
- Every one of the 55 URLs: HTTP 200 with no redirect, canonical equals the URL itself, no `<meta name="robots">` tag at all (so indexable by default). Re-verified from fresh HTML, not only from the crawl.
- robots.txt: `Sitemap: https://pianoers.com/sitemap.xml` is present. It blocks only /ghost/, /email/, /r/, /webmentions/receive/ and similar. Nothing in the sitemap is blocked.
- No `<priority>` or `<changefreq>` tags (good, Google ignores them anyway).

## What works
- Valid XML, correct namespaces, absolute https URLs, trailing slashes matching the canonical URLs.
- **lastmod accuracy: all 38 posts and all 4 pages' lastmod match `article:modified_time` in the crawl exactly** (checked every one, e.g. yamaha-p-145-review 2026-10-07T09:30:32Z, how-to-clean-and-maintain-your-piano 2024-05-24T07:40:27Z). Dates are not all identical, and they are valid W3C datetimes (UTC with milliseconds).
- Image entries exist for 35 URLs (35 `image:image` entries, one per URL), pointing at the post's feature image.
- No staging or www URLs, no paginated /page/2/ URLs, no draft URLs, no /rss/ in the sitemap.
- Every internal link target that is missing from the sitemap is correctly absent (see below).

## Findings

| # | Severity | Finding | Evidence | Fix (where) |
|---|---|---|---|---|
| 1 | Medium | `/tag/jazz-piano/` is an orphan: it is in the sitemap but no other page on the site links to it (0 links, checked in full HTML including nav, footer and cards). It also has no description and a default title "Jazz Piano - Pianoers.com". Only 1 post (open-studio-jazz-review) is presumably in it. | Sitemap-tags.xml; fetched all 55 pages and counted internal links. Tag title/desc from crawl/pages.json. | Easiest: Ghost Admin > Tags > Jazz Piano, then either add a description and link to it from the post, or delete the tag (post keeps working; it just loses the tag). Deleting the tag removes it from the sitemap automatically. |
| 2 | Medium | Three thin tag pages are in the sitemap with an empty meta description and a default title: `/tag/books/`, `/tag/practice/`, `/tag/jazz-piano/`. They list only a post or two and add nothing Google doesn't already get from the posts. The 7 other tags have proper descriptions and titles. | crawl/pages.json: desc is empty for these 3. Also lastmod 2022-2023 (never updated). `/tag/books/` and `/tag/practice/` are linked only from their own post(s)' tag chips (1 link each). | Choose per tag in Ghost Admin > Tags: (a) fill in Meta description + a 2-3 sentence intro in the tag's Description, which makes them worthwhile; or (b) merge posts into a bigger tag and delete the empty one. Only deleting the tag removes it from the sitemap (see "What can't be changed"). |
| 3 | Low | Legal and thin pages are in the sitemap: `/cookie-policy/` (1,642 words), `/privacy-policy/` (2,406 words), `/contact/` (24 words). All three have empty meta descriptions. None get search traffic, and /contact/ is effectively empty. They are not harmful. Google will mostly ignore them, but they dilute the sitemap a little. | crawl/pages.json (words, desc empty). They are linked from the footer on all 54 pages so they're not orphans. | Leave the two policy pages in (harmless, and they are useful as trust signals). For /contact/, add real content (email address / form, 100+ words) and a meta description (Ghost Admin > Pages > Contact > settings). Don't try to hide them; see below. |
| 4 | Low | Tag pages' lastmod is stale and tells Google nothing: all tags show 2022-2025 dates although posts in them were updated through Oct 2026. Ghost uses the tag's own edit date, not the newest post's. The homepage lastmod always equals "now" (2026-10-07T09:31:48Z) whenever any post changes. | sitemap-tags.xml vs posts. Index/pages lastmod also moves with every edit. | Cannot be changed. Google tends to treat distrusted lastmod values as noise, but posts (the important URLs) are accurate, so no action. |
| 5 | Low | Image entries: 5 posts list a hotlinked Unsplash image URL (images.unsplash.com) as their image, with a `caption` that is just the filename/query string. 8 URLs have no image entry (pages, home, plus 3 posts: piano-basics-a-beginners-guide-to-the-keyboard, piano-humidifier, how-the-piano-works, which have no feature image). | sitemap-posts.xml. Affected posts: climate-control-and-your-piano, piano-practice-4-tips-to-successful-sessions, 5-best-piano-methods-to-learn-quickly, are-piano-keys-still-made-of-ivory, how-to-clean-and-maintain-your-piano. | Ghost Admin > each post > Feature image: upload your own image (replaces Unsplash hotlinks and also fixes social previews). For the 3 posts with none, add a feature image. Captions are Ghost-generated and Google ignores them, so ignore the captions. |
| 6 | Low | Low internal linking: 9 posts have only 1 internal link pointing to them (generally just a tag page or "latest" card), e.g. hdpiano-review, worship-music-academy-review, piano-with-jonny-review, piano-career-academy-review, how-the-piano-works, how-to-tune-a-piano-a-simple-guide, how-to-clean-and-maintain-your-piano, 5-best-piano-methods-to-learn-quickly, are-piano-keys-still-made-of-ivory. They are not true orphans (the tag pages link to them) but Google gets weak signals that they matter. `/stephen-ridley/` has 2. | Full-HTML inbound link count across all 55 pages (my own count, nav/footer included). Note: pages.json `links` contains only in-article links, so it understates this. | Add contextual links in the body from related posts (e.g. from /best-piano-lessons-online/ to each course review, and /how-to-clean-and-maintain-your-piano/ from /climate-control-and-your-piano/). Done in the Ghost editor. |
| 7 | Info | Internal links to non-sitemap URLs, all correctly excluded: `/PFA`, `/pianoforall`, `/pbp` (affiliate redirects, go off-site via 4 hops to pianoforall.com), `/page/2/` and `/author/katarina/page/2/` (pagination, 200), `/rss/` (feed), and `/best-piano-courses-online/` (301 to /best-piano-lessons-online/, linked from piano-humidifier). | crawl/links.json | Only the last needs action: in Ghost Admin > piano-humidifier, change that link to `/best-piano-lessons-online/` to save a redirect hop. |
| 8 | Info | The sitemap files reference an XSL stylesheet (`//pianoers.com/sitemap.xsl`, 200 text/xsl) so browsers show them as a table. This is Ghost's normal output and does not affect Google. | sitemap.xml head | None. |
| 9 | Info | No `<lastmod>` problems, no broken URLs, no redirects, no noindexed URLs, no canonical mismatches. www.pianoers.com is dead (DNS 100::, 502) but is not referenced in the sitemap. | See BRIEF known site-wide items. | The www fix is a DNS issue (separate finding). |

## Pages in the sitemap vs pages linked on the site
- In sitemap, linked from other pages: 54 of 55.
- In sitemap but not linked from anywhere: **1** (`/tag/jazz-piano/`).
- Linked internally but missing from sitemap: 5 non-content URLs listed in #7 (redirects, pagination, feed) plus the bare domain `https://pianoers.com` (same page as `/`). Nothing important is missing.
- Pages-only count: sitemap lists all 38 live posts. I did not check for published posts hidden from Ghost's listing (members-only/unlisted); not checked, since Ghost excludes those.

## What can and can't be changed on Ghost
**Can't change (built into Ghost; there is no setting for any of this):**
- You can't edit sitemap.xml or its child files by hand, remove a single URL, add a URL, set priority/changefreq, or edit lastmod.
- Ghost always lists every published post, every public page, every tag that has at least one public post, and every author with a post. The 5 "pages" (about, contact, cookie-policy, privacy-policy, home) are always listed.
- Adding noindex (per-page, or site-wide via Code Injection) does **not** remove a URL from the sitemap. Ghost would then list a noindexed URL, which Search Console flags as "Submitted URL marked noindex". So: **do not noindex the policy or tag pages** just to tidy them up. It would create a sitemap conflict and gains nothing.
- You also can't change the sitemap URL, and robots.txt in Ghost is a theme file. (It is already correct, so there is no need to touch it.)

**Can change (these do remove or improve what the sitemap lists):**
- Delete a tag (Admin > Tags): it disappears from sitemap-tags.xml.
- Unpublish or delete a page/post: it disappears.
- A tag with no published posts disappears automatically.
- Improving the content of a listed page (descriptions, text, images, links) is the only way to make a thin entry "belong".
- Post lastmod updates automatically when you click Update on the post, so only publish real edits. Don't re-save posts just for the date.
- Submit https://pianoers.com/sitemap.xml in Google Search Console and Bing Webmaster Tools (not checked whether it already is. Check in Search Console > Sitemaps).

## Recommended order
1. Decide the fate of /tag/jazz-piano/, /tag/books/, /tag/practice/ (describe them or delete them). Medium.
2. Add a real body to /contact/ and a meta description to /contact/, /cookie-policy/, /privacy-policy/. Low.
3. Replace the 5 Unsplash feature images and add images to 3 posts with none. Low.
4. Add contextual links to the 9 weakly linked posts. Low.
5. Fix the one link to the redirected /best-piano-courses-online/ in piano-humidifier. Info.
