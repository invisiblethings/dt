# Pianoers.com action plan

In priority order. Each item names where in Ghost Admin it's done. Exact sentences, values and sources are in the `findings/` files.

## Phase 1: this week (legal, trust and safety)

| # | Task | Where | Detail |
|---|---|---|---|
| 1 | Add the `#affiliate` tag to every post with affiliate links. Delete the old in-text disclosure on /best-beginner-pianos/ and /best-digital-piano/. Remove the "isn't full of affiliate links" line from the Pianoforall review. | Post settings → Tags | on-page.md #1 |
| 2 | Upload theme 1.1.3. Then set Affiliate domains to `amzn.to, amazon.com, sjv.io, clickbank.net, /PFA, /pianoforall, /pbp`. | Settings → Design & branding → Change theme; then Customize → Post | theme/INSTALL.md |
| 3 | **Unpublish /stephen-ridley/**, or rewrite it as a factual course review with no accusations. Set a redirect if you unpublish it. | Posts | content-learning-pianists-pages.md |
| 4 | Fix the dangerous instructions: the tuning-pin direction and the invented tools in the tuning guide, and "tilt the piano" in the DIY guide. Or unpublish both until they're rewritten. | Posts | content-pianos-care.md |
| 5 | Rewrite or unpublish the ivory post (its history is mostly wrong). | Posts | content-pianos-care.md |
| 6 | Make the authors consistent. Give Katarina a surname, real credentials (MTNA if that's what she means) and dates that add up, then remove "concert pianist", "my Steinway" and similar claims her bio doesn't support. Add social or profile links for both authors. | Settings → Staff; posts | geo.md, content files |
| 7 | Ask Piano by Pictures for a permanent affiliate URL. `/pbp` currently lands on a leftover funnel step. | Wherever `/pbp` is set up (Settings → Labs → Redirects) | technical.md #4 |
| 8 | Update the privacy and cookie policies. Name the data controller and address, and list GTM/GA4, Claspo, Ghost members and analytics, and Amazon Associates. Remove popupsmart and Flash cookies. | Pages | content-learning-pianists-pages.md |

## Phase 2: weeks 2–3 (accuracy and on-page)

| # | Task | Where | Detail |
|---|---|---|---|
| 9 | Choose one rating and price per product, and use the same verdicts in the round-ups, the reviews and their structured data (Simply Piano, Skoove, Pianote, Flowkey). | Posts + Code injection | content-courses-apps.md, schema.md |
| 10 | Correct the wrong prices and plans: Pianote, Piano With Jonny, Skoove, Worship Music Academy, Piano by Pictures, PianoVision, HDpiano trial, Hoffman and Open Studio lesson counts. Fix "Simply Piano by JoyTunes". | Posts | content-courses-apps.md |
| 11 | Apply the /best-digital-piano/ corrections. The P-145BT is CFIIIS with 10 voices; also fix the CLP-835, CLP-885, ES60, ES920 and KDP120 specs, and the summary that recommends pianos the page doesn't review. | Post | content-pianos-care.md, ../best-beginner-pianos/best-digital-piano-edits.md |
| 12 | Paste the corrected P-145 article settings (meta title, description, `#affiliate`) and delete the old FAQ script. | Post settings | ../yamaha-p-145-review/HOW-TO-PASTE.md |
| 13 | Beginner guide: fix the meta title ")" and the meta description, and upload the 1200×630 share image. | Post settings | social-images.md |
| 14 | Fix the heading structure on 18 posts (main sections H2, sub-points H3; delete empty headings). | Editor | on-page.md #5, #11 |
| 15 | Shorten the 12 long meta titles; add the missing meta descriptions; remove "(2025)". | Post settings → Meta data | on-page.md #4, #6–8 |
| 16 | Update Lang Lang (Ravinia 1999, Telarc debut, age 44, Olympics claims, recent work) and Cole Lam (now 19, Purcell School, Berklee). Remove the made-up quotes in /teach-yourself-piano/ and the copied text in /5-best-piano-methods/. | Posts | content-learning-pianists-pages.md |
| 17 | Replace the 19 heavy inline PNGs with WebP or JPEG versions (saves about 11 MB). Fix the empty or wrong alt text. | Editor → Replace image | images.md |
| 18 | Restore /how-hard-is-it-to-learn-piano-as-an-adult/ (it still ranks but returns 404), or redirect it to /teach-yourself-piano/. | Settings → Labs → Redirects | sxo.md |
| 19 | Fix the /best-piano-courses-online/ link on /piano-humidifier/. | Editor | technical.md #7 |
| 20 | Contact page: fix the form overflowing on phones and add real contact details. | Page (HTML card) | visual.md #1 |

## Phase 3: month 2 (content structure and authority)

| # | Task | Detail |
|---|---|---|
| 21 | Add the 93 internal links in the link matrix, P1 first. Make the round-ups link to every product they have reviewed. | clusters-internal-links.md |
| 22 | Merge the three humidity posts: climate-control becomes the hub, the humidifier post is merged into it and redirected, and the dehumidifier post is narrowed. | clusters-internal-links.md, content-pianos-care.md |
| 23 | Tidy the tags: merge buying-guides into pianos and practice into lessons; fill books and jazz-piano; add missing tags (apps on Flowkey, Simply Piano, Skoove, Pianote). | clusters-internal-links.md |
| 24 | Add a short answer (40–60 words) at the top of the 10 commercial reviews, plus Product/Course + Review structured data with a visible rating (templates ready in schema.md). | geo.md, schema.md |
| 25 | Expand /acoustic-vs-digital-piano/ (681 words vs 1,000–1,700 for the top results). Expand the thin Flowkey, Pianote and Piano With Jonny reviews. | sxo.md |
| 26 | New pages with confirmed demand: Roland FP-10 review, best piano for kids, Simply Piano vs Flowkey, Playground Sessions review, how long it takes to learn piano, piano tuning cost. | sxo.md, clusters-internal-links.md |
| 27 | Add a "How we test" or editorial policy page and an affiliate disclosure page, and link both from the footer. | content-learning-pianists-pages.md |
| 28 | Create new share images for the money pages, the homepage default and the tag pages. | social-images.md |
| 29 | Speed on phones: remove Claspo if it doesn't earn its keep; load GA4 once (it currently loads through GTM and directly); review whether the Portal button is needed. | performance.md |
| 30 | Server: add security headers in Caddy (CSP in report-only mode first) and fix the `www` DNS. | technical.md #1, #8 |

## Phase 4: ongoing

- Connect Google Search Console and Bing Webmaster Tools, and submit the sitemap. Rankings, indexing and real Core Web Vitals then become measurable.
- Earn mentions: answer questions on r/piano and Piano World as yourselves, and consider a YouTube channel for the hands-on tests (geo.md).
- Every 3 months: re-check prices and specs on the money pages and update the date.
- Decide your AI-training policy in robots.txt (allow or block training crawlers; search crawlers stay allowed). See agentic.md.
