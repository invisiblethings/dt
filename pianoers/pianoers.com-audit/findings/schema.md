# Structured Data (Schema) Audit: pianoers.com

Audited 7 Oct 2026. Scope: all 55 sitemap URLs (parsed JSON-LD from crawl/pages.json, raw HTML of all 55 re-fetched to check microdata, where each block sits, and YouTube embeds). Ghost 6.67 is live (meta generator). Nothing was changed on the live site. Rich-result eligibility judged against Google's current docs as I know them; I did not run Google's Rich Results Test (not checked).

## Score: 58 / 100

Solid base (Ghost Article on every post, valid JSON-LD everywhere, breadcrumbs on all posts, some well-built hand-written blocks). Points lost for conflicting ratings between pages, three different styles of hand-pasted Review blocks (some invalid or mismatched), a stale duplicate FAQPage on the Yamaha review, an ItemList whose URLs are affiliate redirects, wrong author on /about/, empty Person sameAs for Richard, and no Organization/author entity tying the site together.

## What works

- All 55 pages return parseable JSON-LD with `@context: https://schema.org` (https, not http). No parse errors. No placeholder text like "[Business Name]" anywhere.
- Every post has a Ghost `Article` with headline, url, datePublished, dateModified (ISO 8601), image (with width/height on most), author with url, publisher with logo, mainEntityOfPage.
- Home has a `WebSite` block with publisher Organization + logo. Tag pages emit Ghost's `Series`; author pages emit `Person`.
- BreadcrumbList microdata is on all 43 posts (Home > primary tag > post, 3 ListItems with name/item/position). Not on pages, tags, authors or home (normal).
- Hand-written blocks that are good: `ItemList` + `Person` (Katarina, with credentials) on /best-beginner-pianos/ (anchors resolve to real section ids); the `Review` > `SoftwareApplication` on /skoove-review/ and `Review` > `Product` on /loog-piano/ (names, prices, rating, pros/cons all match visible text); `Person` on /ahmad-jamal-biography/ (Wikipedia/Wikidata sameAs).
- The theme's JS ItemList (main.js, section 7) correctly skips posts that already have one, so there is no duplicate ItemList on /best-beginner-pianos/ (only 1 ItemList found in raw HTML; the JS list is added at render time and I did not render-check it).
- No deprecated types recommended or found (no HowTo, SpecialAnnouncement, etc.).

## Findings

| # | Severity | Finding | Evidence | Fix (where) |
|---|---|---|---|---|
| 1 | High | Two FAQPage blocks on the Yamaha review; the first is stale and wrong | /yamaha-p-145-review/: block 1 sits in `<head>` (code injection / post header) with 5 older questions, including "best digital piano under $600 in 2025" and "Are the speakers good enough or do I need headphones?" - 2 of its 5 questions are not on the page. Block 2 (in the body) matches the page's 5 FAQ headings. Two FAQPage blocks on one URL is invalid. | Delete the head FAQPage block (Yamaha post > Settings > Code injection > Post header, or Site code injection if pasted there; the one starting with "Yes. 100%. Hands down"). Keep the body one. Since Google retired FAQ rich results (7 May 2026) there is no search benefit either way, so it is also fine to remove both. |
| 2 | High | Same product/app gets different ratings on different pages | Simply Piano: review page JSON-LD and text 3.5/5, but /best-piano-lessons-online/ ItemList + visible table 4.7/5. Skoove: review 3.5/5 (text says 7/10), roundup 4.0/5. Pianote: review 7.5/10, roundup 3.9/5. Flowkey: review 4.2/5, roundup 3.8/5. | Pick one score per product and use it everywhere (post editor text, and the pasted JSON-LD). Conflicting self-published scores look manipulative to Google and to readers. |
| 3 | High | Roundup ItemList (/best-piano-lessons-online/) nests Product+Review with affiliate/redirect URLs | `item.url` values: `https://pianoers.com/pianoforall` (302 to a clickbank hop link), `simplypiano.sjv.io/pianoers`, `pianomarvel.com/?promoCode=PIANOERS`, `https://pianoers.com/pbp` (302 to an affiliate URL). Reviews have only author + rating, no name/date/body. | Make the ItemList plain: each ListItem = position, name, url pointing at your own review page (e.g. /skoove-review/, /flowkey-review/) or the section anchor. Remove inline Product/Review/Offer (Google does not give review stars from a roundup list, and Google's carousel rules want each item to be its own page on your site). Edit in Code injection > Post header for that post. |
| 4 | High | Wrong author on /about/ | /about/ Ghost Article author = Katarina, but visible copy says "I'm Richard Abraham, the guy behind Pianoers". | Ghost Admin > Pages > About > Settings > Authors: set to Richard J. Abraham. Also review contact, privacy and cookie pages (they say Richard, fine) so authors are consistent. |
| 5 | Medium | Review blocks use three different styles and some are incomplete | Skoove/Loog: full (name, body, notes, publisher), but no datePublished. Simply Piano: no `name`/`reviewBody`; SoftwareApplication has offers but no description. Pianote, Flowkey: no `offers` (SoftwareApplication rich result needs name + offer price + review/aggregateRating) and publisher without logo. Synthesia: author is `Organization "Pianoers Editorial"` (page author is Katarina), no publisher, `reviewBody` is a one-line stub, extra `additionalProperty` and `keywords` are not valid Review properties. Stephen Ridley: Course offer price `2997` but visible price is $1,400; no visible rating found on the page for the 2/5 in schema. | Standardise every review page on one template (see Template A/B below). Use the same author as the byline. Prices must equal what the page shows. |
| 6 | Medium | PianoVision review: invented-looking aggregateRating and wrong logo | `itemReviewed.aggregateRating` = 4.2 from 400 ratings (not on the page; I found no rating on the visible page at all). Publisher logo is `/favicon.ico`, which is a 302 redirect, not an image. | Remove `aggregateRating` (you cannot claim ratings the page does not show; also the "review" must be yours). Remove the favicon logo or use the real logo. Show your rating on the page if you want markup. |
| 7 | Medium | Review dates conflict with Ghost article dates | Synthesia: Review datePublished 2025-10-27, article published 2025-05-06, text says "Updated 2026-01-03". Flowkey: Review 2025-01-02 vs article published 2025-04-10. PianoVision: Review 2025-02-14 vs article published 2026-01-05 (review pre-dates article). Skoove, Loog: no date. | Use the Ghost post dates, or drop the dates from hand-pasted Review blocks. |
| 8 | Medium | Review ratings on a different scale than the page | Pianote 7.5 with bestRating 10; Synthesia 6 of 10; Skoove/Loog schema 3.5/5 while visible "7/10". Mathematically equal, but best practice is schema scale = visible scale. | Use `ratingValue 7`, `bestRating 10` where the page shows /10. |
| 9 | Medium | /best-free-piano-learning-apps/ ItemList has errors | `itemListOrder: "ItemListOrderAscending"` (not a valid URL value; must be `https://schema.org/ItemListOrderAscending`, and the list is best-first so Descending matches the sibling lists). `mainEntityOfPage @id` = `https://pianoers.com/best-free-piano-learning-app/` (singular), a 301 redirect, not the canonical URL. Simply Piano price 19.99-24.99 conflicts with $17.90/month on other pages. Block is in `<body>`, fine. | Fix the three values in that post's code injection. |
| 10 | Medium | Person sameAs is empty for Richard | /author/richard/ and every post by Richard (Yamaha, Simply Piano, Open Studio Jazz, best-free-apps, best-piano-books, best-digital-piano contributor) show `"sameAs": []`. Katarina has one link (onlinepianoteachers.com). | Ghost Admin > Settings > Staff > Richard > Website / Social links: add his LinkedIn/X/YouTube etc. Ghost fills sameAs from those fields. |
| 11 | Medium | No Organization entity site-wide; publisher is an unnamed stub | Home has `WebSite` with publisher Organization (name + logo) but no sameAs/social profiles; hand-pasted reviews use publisher "Pianoers" or "Pianoers.com" (inconsistent names). | Add a single Organization block on the home page via Code injection > Site Header, with `@id` and sameAs (Template D). Reuse the `@id` in pasted blocks. |
| 12 | Medium | Person block on /lang-lang-the-biography/ uses the page URL as the Person `@id` and url; contains `netWorth` | `@id` = `https://pianoers.com/lang-lang-the-biography/` (same URL as the Article page, so it claims the page IS Lang Lang). `netWorth` $37,000,000 is an unsourced claim. | Change to `@id` `https://pianoers.com/lang-lang-the-biography/#person`, drop `url`, drop netWorth or add a source. Better: make it the Article's `about`. Ahmad Jamal block is fine but also should be linked as `about`. |
| 13 | Medium | FAQ wording differs from visible page on /best-piano-books-for-adult-beginners/ | Schema has 8 Qs, only 1 matches visible text exactly; visible FAQ has paraphrased versions (e.g. "How much should I practice daily?" vs schema "How much should I practice piano daily?"). Answers also differ in length. | Low practical impact (no FAQ rich results since 7 May 2026), but if you keep it, make question and answer text identical to the page, or delete the block. |
| 14 | Low | Existing FAQPage blocks (info only) | FAQPage present on 11 posts: Yamaha (x2), best-beginner-pianos, best-digital-piano, skoove, loog, ahmad-jamal, piano-basics, piano-practice, best-piano-lessons-online, best-piano-books. Question texts match visible headings on all except the Yamaha stale block and the books page. | Google no longer shows FAQ results for any site. Keep only if you are happy with an unconfirmed AI-visibility benefit; it costs nothing but is not a ranking tool. Do not add new ones to chase SERP features. |
| 15 | Low | Ghost Article description contains raw article text with line breaks | Yamaha, /about/, best-digital-piano, climate-control, privacy, cookie, how-to-tune and others where no custom excerpt/meta description is set: `description` starts with "\n\n\n\n" and is 500+ chars. /acoustic-vs-digital-piano/ and /how-to-tune-a-piano-a-simple-guide/ have no meta description at all. | Post settings > Meta data > add a 120-155 char description, or a custom excerpt. |
| 16 | Low | Article headline truncated on /best-beginner-pianos/ | Headline (and title) = "7 Best Beginner Keyboard & Digital Pianos (2026, Tested" (missing ")"). Already known from the earlier audit; still live. | Post settings > Meta data > Meta title: add ")". |
| 17 | Low | Publisher logo block has no width/height | Ghost emits `logo: {@type: ImageObject, url}` only. The file is 703 x 109 (checked) so dimensions exist but are not in the markup. | Ghost does not allow editing this from Admin; add `width/height` only if you override via theme. Low value: Google no longer requires publisher logo for Article. |
| 18 | Low | 7 pages have no Article image | /about/, /cookie-policy/, /contact/, /privacy-policy/, /piano-basics-a-beginners-guide-to-the-keyboard/, /piano-humidifier/, /how-the-piano-works/: no `image` in Article. Posts using Unsplash URLs (climate-control, piano-practice, methods, ivory, clean-and-maintain) give image URLs with no width/height. | Add a feature image to the posts (Post settings > Feature image). Policy pages: ignore. |
| 19 | Low | Breadcrumb tag link is relative | Theme partial breadcrumbs.hbs: `href="{{url}}"` renders `/tag/pianos/`. Google resolves it, but absolute is preferred. Not on pages/tags. | In the theme use `{{url absolute="true"}}` (change in next theme version; I did not touch the theme). |
| 20 | Low | Tag pages typed `Series` | Ghost default on 10 tag pages. Google ignores `Series`; harmless. Two tag pages (books, practice, jazz-piano) have no description. | Tag settings > Description; no schema change needed. |
| 21 | Low | Review rel on affiliate link | /pianoforall-review/ links to `https://pianoers.com/pianoforall` (redirect to affiliate) with `rel="noreferrer"` only, no sponsored. Not schema, but affects the same review snippet trust. | Add rel sponsored (Link editor or theme JS). |

## Per-type notes

**Posts with only the Ghost Article block (no extra schema).** Fine for guides. Opportunity pages (reviews with no review markup): /pianoforall-review/, /worship-music-academy-review/, /hdpiano-review/, /open-studio-jazz-review/, /piano-with-jonny-review/, /piano-career-academy-review/, /yamaha-p-145-review/ (Product). The comparison/guide posts (/best-digital-piano/, /teach-yourself-piano/, /5-best-piano-methods-to-learn-quickly/) have no ItemList; /best-digital-piano/ has no pick-card ItemList yet.

**Review rules (Google, current):** star snippets work for third-party items such as products, apps and courses that you review, as long as the rating is visible on the page and is a real editorial rating by the named author. Do not use Review/AggregateRating on Organization or LocalBusiness that you own (self-serving), and do not mark up another site's ratings (PianoVision aggregateRating, 400 ratings) as if they were yours. Keep one Review per page about one item; do not stack ratings in a roundup list. Affiliate status is not a barrier but keep the disclosure visible (the theme already shows it).

**Videos (embeds found):** YouTube embeds on yamaha-p-145-review (1), loog-piano (2), ahmad-jamal-biography (3), hdpiano-review (1), best-piano-lessons-online (1), simply-piano-review (2), synthesia-piano-review (2), cole-lam (3), how-the-piano-works (1), how-to-tune-a-piano (2), how-to-clean-and-maintain-your-piano (2). They are all third-party videos. VideoObject on a page that merely embeds someone else's video rarely earns a video result and is not worth the upkeep. Recommend VideoObject only if Pianoers ever publishes its own videos. Priority: Low / skip.

**Person with credentials:** the Katarina Person block exists only on /best-beginner-pianos/ and it is good. Better: put one Person block for each author on the home or author page (Ghost already does /author/*), then reference by `@id`. Richard has no credentials in markup; the author page bio says "playing since age 8, gigged everywhere, taught hundreds"; add `jobTitle` and sameAs once you decide what to publish.

**Home page:** WebSite is present. Add Organization (Template D) and optionally `potentialAction` SearchAction (Ghost has search; only add if the search URL works as `?q=` which I did not verify).

## Recommended order of work

1. Delete stale FAQPage on /yamaha-p-145-review/ (#1).
2. Fix /about/ author (#4).
3. Reconcile ratings across review pages and roundups (#2), then rewrite the roundup ItemList (#3).
4. Standardise Review blocks (#5-#8) using Templates A/B.
5. Richard's social links (#10), Organization block (#11).
6. Everything marked Low.

## Ready-to-paste JSON-LD templates

Paste each in the post's Settings > Code injection > Post header (wrapped in a `<script type="application/ld+json">` tag). Replace only the `RATING` placeholders. A rating must also appear visibly on the page (for example "Rating: 4.5/5") before you add the markup. Ghost already outputs the Article block, so do not add another Article.

### Template A: Single product review (Yamaha P-145BT, page /yamaha-p-145-review/)

Values from the page: name, $499.99 list price, price shown as "often on sale", author Richard J. Abraham, image, Yamaha USA product URL. Availability and GTIN are not on the page and left out on purpose. `ratingValue` placeholder: use the number you show on the page.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://pianoers.com/yamaha-p-145-review/#product",
  "name": "Yamaha P-145BT",
  "alternateName": "Yamaha P-145",
  "description": "88-key portable digital piano with fully weighted GHC keys, 64-note polyphony, the CFIIIS grand piano sound, USB audio and MIDI, and Bluetooth audio on the BT model.",
  "brand": { "@type": "Brand", "name": "Yamaha" },
  "category": "Digital piano",
  "image": [
    "https://pianoers.com/content/images/size/w1200/2025/11/Yamaha-p-145-review-pianoers.jpg",
    "https://pianoers.com/content/images/2025/11/Yamaha-p-145-testing.jpg"
  ],
  "offers": {
    "@type": "Offer",
    "price": "499.99",
    "priceCurrency": "USD",
    "url": "https://shop.usa.yamaha.com/en/p/instruments/keyboards-synthesizers/digital-pianos/p-145bt-88-key-portable-digital-piano"
  },
  "review": {
    "@type": "Review",
    "name": "Yamaha P-145 / P-145BT Review in 2026: Still My #1 Pick for Beginners",
    "url": "https://pianoers.com/yamaha-p-145-review/",
    "datePublished": "2026-01-02T14:45:00.000Z",
    "dateModified": "2026-10-07T09:30:32.000Z",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "RATING",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": "Richard J. Abraham",
      "url": "https://pianoers.com/author/richard/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pianoers.com",
      "url": "https://pianoers.com/"
    },
    "reviewBody": "The Yamaha P-145BT is my top beginner pick: quiet, forgiving, fully weighted GHC keys, a CFIIIS grand piano sound, and Bluetooth audio, usually under $600.",
    "positiveNotes": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "88 fully weighted GHC keys" },
        { "@type": "ListItem", "position": 2, "name": "Light, portable at 24.5 lbs" },
        { "@type": "ListItem", "position": 3, "name": "Bluetooth audio on the P-145BT" }
      ]
    }
  }
}
</script>
```

Before pasting: confirm the "Downsides" section of the post and add 2-3 matching `negativeNotes` ListItems in the same format. Only add `positiveNotes`/`negativeNotes` if each item appears on the page. The "datePublished" and "dateModified" values come from the live Ghost Article block; if you edit the post again, update dateModified or delete the property.

### Template B: Course / app review (Pianoforall, page /pianoforall-review/)

Values from the page: price $49 one-time, lifetime access, ten eBooks and 24+ hours of video, Mac/PC/iOS/Android, author Katarina, image, official site pianoforall.academy (from the page's own link). The page currently shows no numeric rating, so add one visibly first (for example "Our rating: x/5" under the intro) or do not add `reviewRating`. For apps (Simply Piano, Flowkey, Pianote, Skoove) swap in `"@type": "SoftwareApplication"` with `applicationCategory`, `operatingSystem` and `offers` (all three are needed for the software rich result), as already done on /skoove-review/.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "@id": "https://pianoers.com/pianoforall-review/#course",
  "name": "Pianoforall",
  "description": "Online piano course that starts with chords and rhythm instead of sheet music: ten eBooks and 24+ hours of video lessons, from absolute beginner to intermediate.",
  "url": "https://pianoforall.academy",
  "provider": {
    "@type": "Organization",
    "name": "Pianoforall",
    "sameAs": "https://pianoforall.academy"
  },
  "educationalLevel": "Beginner to intermediate",
  "inLanguage": "en",
  "offers": {
    "@type": "Offer",
    "category": "Paid",
    "price": "49",
    "priceCurrency": "USD",
    "url": "https://pianoforall.academy"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "online",
    "courseWorkload": "PT24H"
  },
  "image": "https://pianoers.com/content/images/size/w1200/2024/06/Pianoforall_Review.jpg",
  "review": {
    "@type": "Review",
    "name": "Piano For All Review: A Pro Pianist's Take (2026)",
    "url": "https://pianoers.com/pianoforall-review/",
    "datePublished": "2025-02-06T06:13:00.000Z",
    "dateModified": "2026-02-22T11:56:02.000Z",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "RATING",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": "Katarina",
      "url": "https://pianoers.com/author/katarina/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pianoers.com",
      "url": "https://pianoers.com/"
    },
    "reviewBody": "Pianoforall teaches piano through chords and rhythm rather than sheet music. At $49 one-time with lifetime access it is good value for adults who want to play songs fast, with limits on classical technique and reading music."
  }
}
</script>
```

Note: `courseWorkload PT24H` is taken from "24+ hours of video"; remove it if you prefer not to state a workload. The price is the page's $49 (the page also advertises a 39% off deal; keep the list price). If Google's Course list features no longer apply to an externally hosted course, nothing is lost: this still marks up the reviewed item correctly for review snippets.

### Template C: "Best X" list (page /best-beginner-pianos/, improved version of what is live)

The current block is valid; the improvements below add `url` as a real on-page anchor (already so), a `description`, `mainEntityOfPage`, and an `image`. Do not nest Product/Review/Offer inside list items (see #3). Position order is best first; `ItemListOrderDescending` is correct for a ranked list. Replace the existing ItemList in code injection, do not add a second one.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": "https://pianoers.com/best-beginner-pianos/#list",
  "name": "Best Beginner Keyboard & Digital Pianos in 2026",
  "description": "Seven weighted 88-key digital pianos for beginners, ranked by a piano teacher, from about $400 to $730.",
  "url": "https://pianoers.com/best-beginner-pianos/",
  "mainEntityOfPage": "https://pianoers.com/best-beginner-pianos/",
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "numberOfItems": 7,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Yamaha P-145BT", "url": "https://pianoers.com/best-beginner-pianos/#1-yamaha-p-145bt" },
    { "@type": "ListItem", "position": 2, "name": "Alesis Recital Pro", "url": "https://pianoers.com/best-beginner-pianos/#2-alesis-recital-pro" },
    { "@type": "ListItem", "position": 3, "name": "Kawai ES60", "url": "https://pianoers.com/best-beginner-pianos/#3-kawai-es60" },
    { "@type": "ListItem", "position": 4, "name": "Roland FP-10", "url": "https://pianoers.com/best-beginner-pianos/#4-roland-fp-10" },
    { "@type": "ListItem", "position": 5, "name": "Korg B2", "url": "https://pianoers.com/best-beginner-pianos/#5-korg-b2" },
    { "@type": "ListItem", "position": 6, "name": "Roland FP-30X", "url": "https://pianoers.com/best-beginner-pianos/#6-roland-fp-30x-stretch-pick" },
    { "@type": "ListItem", "position": 7, "name": "Casio Privia PX-S1100", "url": "https://pianoers.com/best-beginner-pianos/#7-casio-privia-px-s1100-stretch-pick" }
  ]
}
</script>
```

Honest note: this is the same content as live with minor additions. A ranked roundup earns no review stars; its value is clear structure. For a real gain, link each ListItem to the product's own review page where one exists (e.g. /yamaha-p-145-review/ for item 1), which is the pattern Google's list carousel guidance expects. That is also why Template A matters.

### Template D: Home Organization (Code injection > Site Header, home only is not possible in Ghost, so keep it small and site-wide)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://pianoers.com/#organization",
  "name": "Pianoers.com",
  "url": "https://pianoers.com/",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pianoers.com/content/images/2023/10/PianoersLogo.png",
    "width": 703,
    "height": 109
  },
  "description": "Unfiltered reviews of piano apps, courses and beginner keyboards, plus guides for learning piano.",
  "sameAs": [ "ADD_REAL_PROFILE_URLS_HERE" ]
}
</script>
```

Replace the sameAs placeholder with the real social/YouTube profile URLs, or delete the `sameAs` line entirely if there are none (I did not find any in the data collected, so I cannot supply them). Note: site-wide injection will repeat this block on every page next to Ghost's own publisher Organization; that is acceptable as long as the content matches. If you do not want a duplicate, skip this template.

## Not checked

- Google Rich Results Test / Search Console enhancement reports (no access).
- The runtime ItemList generated by main.js on pages with pick cards other than what raw HTML shows (only /best-beginner-pianos/ has pick cards in raw HTML; its manual ItemList suppresses the JS one).
- Visible prices on /best-free-piano-learning-apps/ versus its AggregateOffer values.
- Whether the live site is on theme 1.1.2 (generator shows Ghost 6.67 only).
