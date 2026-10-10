# Content Decisions and Action Handoff

**Status:** Draft, awaiting owner decisions. Nothing here has been published or approved.
**Companion:** [content-review.md](content-review.md) holds the evidence and the per-article candidate titles and descriptions.
**Owner for all actions:** site owner (Dan Hon), unless stated. No `seo-action-plan` IDs exist yet for these items.

## Decisions the owner needs to make

1. **Affiliate disclosure.** Add a standing statement to `/about` and a short one near the top of each page that carries the ClickBank, Gospel on the Go, Simply Piano or Ridley tracked links. Wording and placement are the owner's call, with whoever handles advertising rules where the owner operates. *(Evidence: content-review.md §1.1.)*
2. **What to do with `/p/qanon-looks-like-an-alternate-reality`.** Options: (a) rebuild it as a hub with a new slug, (b) unpublish it. Check what Substack lets you do with a published slug and whether the old URL will redirect before choosing. Until decided, its title and description should at least say what the page is.
3. **One canonical PianoForAll page.** Confirm `pianoforall-honest-review-2022` is the canonical page, and that other reviews will compare against it but not end on it as a default recommendation.
4. **Voice.** Is this a single author ("I") or a team ("we")? Use one consistently, and make `/about` support whichever is true.
5. **The three narrative pieces** (`play-like-a-time-traveler`, the "John" story in `piano-benefits-brain-wellbeing`, the testimonials in `piano-in-21-days-review`): are they real, illustrative or fictional? Label or source accordingly.
6. **Overlapping beginner-advice posts** (`5-common-mistakes`, `6-things-i-wish-id-known`): keep both with clear different angles and cross-links, or merge. Do not merge before checking which has traffic in Search Console.

## Action list, in order

| # | Action | Articles | Owner | Verify when done | Rollback |
|---|---|---|---|---|---|
| 1 | Check the fact questions in the claim ledger (content-review.md §4) against primary sources and correct or remove. | `11-legendary`, `6-blind`, `paul-barton`, `tom-brier`, `ridley`, `21-days`, `time-traveler` | Owner | Each corrected claim has a cited source; owner signs off | Substack version history |
| 2 | Add affiliate disclosure (decision 1). | All pages with tracked links; `/about` | Owner | Search each page for the disclosure text; view on mobile | Edit/remove text |
| 3 | Repair or remove the 9 dead links. | See §1.8 of content-review.md | Owner | Re-run link check; all return 200 (bot-blocked 403s are not failures) | n/a |
| 4 | Fix `/p/qanon-...` per decision 2. | 1 | Owner | URL, title, description and H1 describe the same page | Keep the old URL live until the new one is checked |
| 5 | Re-verify prices and add "Prices checked [date]" to every pricing page. | `best-keyboard`, `hoffman`, `flowkey`, `playground`, `pianoforall`, `piano-in-21-days`, `pwj`, `ridley`, `caring-for-your-piano` (tuning cost) | Owner | Every price has a date and a source; no price older than 6 months | Revert text |
| 6 | Paste in the candidate titles and descriptions from content-review.md §3 after editing for accuracy. Do the 10 P1/P2 pages first. | All 32 | Owner | Titles ≤ ~60 chars; descriptions describe the page and don't repeat the intro; no two identical | Substack SEO fields keep the previous value in version history |
| 7 | Fix heading structure on `6-steps-to-becoming-a-piano-teacher`, `best-piano-players`, `how-technology`, `caring-for-your-piano`, `playground-sessions` (stray H4), and the "Rythm" typo. | 6 | Owner | One H1 per page; headings in order | Revert |
| 8 | Add the missing pricing section to `piano-with-jonny-review`; add the verdict near the top of `piano-vs-guitar`, `piano-in-21-days`, `flowkey`. | 4 | Owner | The reader's main question is answered in the first screen | Revert |
| 9 | Add internal links between related pairs: tuning ↔ piano-vs-guitar; pedals ↔ sight-reading ↔ 5-mistakes ↔ 6-things; the course reviews ↔ each other (alternatives); free-sheet-music ↔ sight-reading. Only to pages that exist. | 11 pages with none | Owner | Each link opens the intended article | Remove link |
| 10 | Add alt text to all images that lack it (19 articles). | 19 | Owner | Every content image has a description; decorative images are skipped | n/a |
| 11 | Add "Last reviewed" lines and review the year in titles. | All review and buying pages | Owner | Visible date matches the last real check | n/a |

Avoid bulk-editing: the sitemap `lastmod` already differs from on-page dates for 23 of 32 pages, and a mass re-save would blur which pages were truly refreshed.

## Platform constraints to check before promising any fix

- Substack lets you set a per-post SEO title and description and edit the slug, but I did not test whether changing a published slug keeps the old URL working.
- Substack controls the sitemap, robots rules and structured data. The `dateModified` field equals the publish date on every post; confirm whether Substack updates it on edit.
- There is no native table block, so comparison tables need to be images (with alt text) or lists.

## Measurement plan (once access exists)

- **Baseline** (Search Console, if the site is verified): impressions, clicks, CTR and average position by page and by query for the 90 days before changes, so title and description rewrites can be compared later.
- **Change log:** record the date each page's title, description or body was changed. Compare each page with its own earlier period. Changes in clicks are observations, not proof the edit caused them.
- **Link health:** re-run the external link check quarterly.
- **No ranking or traffic outcome is promised by any item here.**

## Open questions for the owner

- Are Search Console and Bing Webmaster Tools set up for this Substack? If so, the review can be re-run with real query data, which would change the priorities above.
- Which pages produce affiliate revenue? That decides which pages need the most careful claim review.
- Is `danhonmusic.com` / `danhonmusic.one` the owner's own domain (used only as redirect shortlinks), or a separate site?
- Is this one author or several?
- Does the owner want a full rewrite brief for any single article (reader task, claim ledger, outline, evidence needed)? I can produce those for the P1 pages next.
