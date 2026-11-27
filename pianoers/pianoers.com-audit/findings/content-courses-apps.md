# Content quality: online courses & apps reviews (group 2)

Audit date: 7 Oct 2026. Sources: `crawl/pages.json` (text, headings, links, dates, JSON-LD, `has_disclosure`), `crawl/links.json`, and live vendor pages fetched on 7 Oct 2026 with headless Chromium (US locale). This audit only read the site and changed nothing.

## Category score: 52 / 100

| Factor (internal weight) | Score | Why |
|---|---|---|
| Experience (20%) | 45 | Some first-person testing claims. Almost none are backed by proof: no dated screenshots of the reviewer's own account, no practice logs, no recordings. Several posts read as desk research (Worship Music Academy, Piano Career Academy, PianoVision). |
| Expertise (25%) | 50 | Author bios exist. Katarina's bio cites a "National Association of Music Teachers", which doesn't match any organization we know of (the US body is the Music Teachers National Association, MTNA). The posts also give her different backgrounds: "concert pianist", "professional pianist… conservatories and smoky jazz clubs", "teacher since 2001", "PWJ member since 2019". Some posts contain factual errors (see below). |
| Authoritativeness (25%) | 55 | Some good outbound sourcing (Trustpilot, BBB, Trinity, vendor FAQs). The two round-ups contradict the individual reviews. |
| Trust (30%) | 50 | **No affiliate disclosure on any of the 14 posts** (`has_disclosure` is false on all of them), even though every post links to /PFA, /pianoforall, /pbp, simplypiano.sjv.io or a promo code. Many prices are wrong. Two posts say they aren't affiliate content while carrying affiliate links. |

## What works

- **/skoove-review/** (updated Sept 2026) is the model for the rest of the group. Its prices match Skoove's live pricing page exactly. It has a dated "Last checked" box and a clear scored rubric, and it says plainly what the app can and can't hear. It has a solid FAQ and makes honest refund and trial caveats.
- /simply-piano-review/ and /pianote-review/ give strong, specific "who it's for / not for" verdicts and link to outside complaint sources (Pianote: Trustpilot and BBB).
- Most review posts have Review or ItemList JSON-LD and a visible verdict box, which makes them easy for AI answers to quote.
- None of the reviewed products has shut down (details in the next section).

## Product status: shut down or rebranded? (checked live 7 Oct 2026)

| Product | Status | Evidence |
|---|---|---|
| HDpiano | **Live.** Not shut down. | hdpiano.com returns 200 with "© 2026 HD Piano LLC", "1,500+ songs", "Free for 7 days". Onboarding shows "Save $98 on annual plan with code: PIANO2026". |
| Piano With Jonny | **Live** | pianowithjonny.com/membership: "Start your Free 14-Day Trial", "over 2,440 in-depth HD Piano Lessons". |
| Worship Music Academy | **Live** | The linked offer page loads: "Worship Piano: Beginner to Pro 2.0", $49 one-time (struck-through $99), 30-day guarantee, founder Jared Messer. |
| Piano Career Academy | **Live** and active | pianocareeracademy.com lists new tutorials added up to 6 Oct 2026. Prices: $47/month or $470/year. |
| Pianote | **Live, but now sold as a Musora membership.** The brand remains; the separate Pianote plans are gone. | pianote.com: "right now you'll get it free when you try Musora". musora.com/choose-plan shows one all-instrument plan: $30/month or $279/year ($23.25/month), a 7-day free trial, a 90-day guarantee, and a "lessons only" option at 17% off. The review's separate "Basic $25 / Pianote+ $30" plans are no longer shown. |
| Simply Piano | The company was renamed from JoyTunes to Simply (hellosimply.com) | /best-free-piano-learning-apps/ still says "by JoyTunes", and its schema links to joytunes.com. |
| Open Studio, Synthesia, PianoVision, Skoove, flowkey, Pianoforall | Live | Vendor pages load (200). |

## Price and plan checks (vendor pages, 7 Oct 2026, US view)

| Post | Claim | Result |
|---|---|---|
| skoove-review | €/$12.49/month yearly (149.99), $19.99/month quarterly, $29.99/month monthly, free tier, 7-day trial, 1,000+ songs and lessons, 3M+ learners | **Verified.** skoove.com/en/pricing |
| best-piano-lessons-online | Skoove "$12.99/mo (billed yearly)" | **Wrong.** $12.49/month billed yearly. skoove.com/en/pricing |
| best-free-piano-learning-apps | Skoove "$19.99/mo or $119.99/yr", "Free: 25 lessons" | **Wrong.** $29.99/month, or $149.99/year ($12.49/month). The free tier is "limited access to lessons, courses and songs", with no lesson count given. skoove.com/en/pricing |
| worship-music-academy-review | "$39" one-time lifetime, 30-day guarantee | **Price wrong:** $49 (shown as reduced from $99). The 30-day guarantee and lifetime access are verified. The page also says "Nearly 400 videos and 80+ PDFs" and "67,000+ students", neither of which the review mentions. worshipmusicacademy.com/worship-piano-beginner-to-pro-2-0-homepage-offer/ |
| piano-career-academy-review | $47/month, $470/year | **Verified.** pianocareeracademy.com |
| open-studio-jazz-review | Open Studio $39/month, Pro $97/month | **Verified** (monthly billing). Yearly billing is $33/month and $47/month. The site also offers a 14-day free trial and a 30-day guarantee, and says "2,500+ lessons", not the review's "500+". openstudiojazz.com |
| piano-with-jonny-review | Monthly $39.95 | **Verified** |
| piano-with-jonny-review | Annual "$179 / year (~$14.92/mo)" and "$15.00/month (paid upfront at $179.95)" | **Wrong.** "2 weeks free, then $299.50 / year". pianowithjonny.com/register/annual-plan/ |
| piano-with-jonny-review | Holiday special "$19.95 first month", "through December 1" | **Wrong / outdated.** No such offer is shown now. |
| piano-with-jonny-review | "Over 2,200 video lessons", "30-day guarantee" | Lesson count **out of date** (now 2,440+). 30-day guarantee **verified**. The post doesn't mention the 14-day free trial. |
| piano-with-jonny-review | Founder's lifetime "$294" | Not checked (not shown on the register pages) |
| hdpiano-review | "$27/month", "$196.92/year", "Free trial: a few teaser lessons" | Prices: **not checked** (only visible after creating an account). Trial: **wrong**. The site offers a 7-day full-access free trial ("Free for 7 days… full access to our entire song library"). hdpiano.com |
| hdpiano-review | "over 1,500 songs" | **Verified** |
| pianote-review | Basic $25/month or $200/year; Pianote+ $30/month or $240/year; 7-day trial; 90-day guarantee; lifetime about $997 | **Partly wrong.** $30/month verified. Annual is **$279/year**, not $240. Lessons-only is 17% off, about $25/month. 7-day trial and 90-day guarantee **verified**. Lifetime: not offered on the plan page. musora.com/choose-plan |
| best-piano-lessons-online | Pianote "$19.99/month" | **Wrong.** $30/month (or $279/year). |
| best-free-piano-learning-apps | Pianote "$30/mo or $200/yr" | Annual **wrong** ($279/year) |
| piano-with-jonny-review | Pianote annual "$149" | **Wrong** ($279/year) |
| pianoforall-review / round-up / HDpiano / Synthesia | $49 one-time, "39% off", lifetime | **Verified.** "Normally $79 – SAVE 39% – $49", lifetime access, 1000+ audio lessons, 60-day money-back guarantee. pianoforall.com/order |
| pianoforall-review | "Get another 20% OFF with code SAVE20" | Not checked (the code isn't shown on the order page). It may be stale. |
| best-piano-lessons-online | Pianoforall "nine interactive eBooks", "over 300 video lessons" | **Inconsistent.** The Pianoforall review and Skoove review both say ten eBooks. The vendor page has customer comments mentioning "all 10 books". The video count is not given on the vendor page. |
| best-piano-lessons-online | Piano by Pictures "30 days free, then $37/month" | **Wrong.** "Free access for the first month, and then a $49 a month subscription". pianobypictures.gospelonthegopiano.com/free-gift-4930-4 |
| best-piano-lessons-online / free apps | Piano Marvel $17.99/month; free tier | **Verified.** pianomarvel.com/en/pricing |
| best-free-piano-learning-apps | Piano Marvel "$129/yr" (table) and "$129.99/year" (body); free tier "150+ songs, 200+ exercises, 25 lessons" | Body **verified** ($129.99). Table rounds to $129, a small error. Free-tier counts **verified**. "3 sight-reading tests": not checked. |
| best-free-piano-learning-apps | Hoffman "300+ free lessons", "$24/mo or $239/yr" | Prices **verified**. Lesson count **out of date**: 400+ free video lessons. hoffmanacademy.com/premium |
| pianovision-review | $10 (Basic) one-time | **Verified** as $9.99 (pianovision.com and the Meta store) |
| pianovision-review | "Plus subscription pricing hasn't been finalized yet" | **Wrong.** Plus costs $9.99/month or $99.99/year, with 10,000+ songs. pianovision.com |
| pianovision-review | Headset support "Quest 2, Quest 3, or Quest Pro" | **Incomplete.** The Meta store also lists Quest 3S. |
| pianovision-review | "Ludwig AI" | Not checked. The vendor page says only "Basic AI assistant" and "Contextual AI assistant". |
| pianovision-review | Schema aggregateRating 4.2 from 400 ratings | **Wrong / stale.** The Meta store shows 1.2K ratings. Remove it (see the schema row below). |
| synthesia-piano-review | Learning Pack "$39" one-time | **Verified.** "Unlock for $39". synthesiagame.com |
| synthesia-piano-review | "It Won't Teach You to Read Music… completely bypasses reading sheet music" | **Factually wrong.** The vendor says "Enable musical notation for any song", and Synthesia has a sheet-music view. Rewrite the claim as "Notation is optional and nothing forces you to read it". |
| simply-piano review / free apps / round-up | $17.90/month, $169.90/year, Family $23.90/month and $209.90/year, 14-day trial | Not checked (Simply shows prices only inside the app or checkout funnel) |
| pianovision-review | "Simply Piano at $180 per year" | **Inconsistent** with the site's own Simply Piano review ($169.90) |
| piano-with-jonny-review | Simply Piano "$120" annual | **Inconsistent** ($169.90 in the Simply Piano review) |
| best-free-piano-learning-apps (schema) | Simply Piano lowPrice 19.99 / highPrice 24.99, url joytunes.com | **Inconsistent** with the visible text ($17.90–$23.90) |
| flowkey-review / free apps / round-up | $19.99/month, $83.99 for 6 months, $119.99/year, 7-day trial, 1,500+ songs | Not checked (pricing only shows inside app.flowkey.com after signup). The homepage currently advertises "Get 8 months free" and "Thousands of songs". |
| best-free-piano-learning-apps | Yousician $29.99/month or $139.99/year | Not checked (yousician.com/pricing and /plans return 404) |
| best-piano-lessons-online | Playground Sessions $24.99/month | Not checked (the plans page requires login) |

## Site-wide findings (ordered by severity)

| # | Severity | Finding | Evidence | Fix (where) |
|---|---|---|---|---|
| 1 | **Critical** | No affiliate disclosure on any of the 14 posts | `has_disclosure: false` on all 14. Affiliate links present: /PFA or /pianoforall (12 posts), /pbp, simplypiano.sjv.io/pianoers (Impact link), pianomarvel `?promoCode=PIANOERS` | Ghost Admin, Post settings, Tags: add the `#affiliate` internal tag to every post in this group so the theme shows its disclosure. Check one live afterwards. |
| 2 | **Critical** | Posts deny affiliate intent while carrying affiliate links | pianoforall-review: "This isn't your average review full of affiliate links and empty praise." (the post has 6 /pianoforall or /PFA links). piano-with-jonny-review: "This is not a sponsored post" (true for PWJ, but the post links to Pianoforall reviews elsewhere). | Delete the Pianoforall sentence. Keep the PWJ sentence and add "We earn a commission on some links on this site (e.g., Pianoforall)". |
| 3 | **High** | Round-up verdicts contradict the individual reviews | Simply Piano is #2 at 4.7/5 in /best-piano-lessons-online/ and recommended for "a distractible adult", but its own review gives 3.5/5 with "Weak Value for Adults". The round-up calls Skoove "Best for AI Feedback on Technique" and praises its ear training, but the Skoove review says it "cannot hear… your hand shape" and its theory is "thin". The round-up calls Pianote "Best for Live Teacher Feedback", but the Pianote review's top con is "Zero real-time note detection or feedback". The round-up gives Flowkey 3.8/5; the Flowkey review gives 4.2/5. Skoove's schema says 3.5/5 while the page says 7/10. | Pick one rating per product and use it everywhere. Rename the labels: Skoove "Best for beginners who need instant note feedback", Pianote "Best video-lesson library". |
| 4 | **High** | Wrong prices across the group (see the table). The same product has 3–4 different prices across posts. | Skoove: $12.49 / $12.99 / $19.99. Pianote: $19.99 / $25 / $30, annual $149 / $200 / $240 vs actual $279. Simply Piano annual: $120 / $169.90 / $180. | Keep one "price as of [month]" for each product and update all posts from that source. Add a "Prices checked Oct 2026" line to each. |
| 5 | **High** | Author credentials don't match each other | Bio: "teaching piano since 2001… member of the National Association of Music Teachers since 1995" (member six years before she started teaching; the organization name doesn't match MTNA). Posts: "concert pianist" (PCA), "professional pianist who's paid my dues in conservatories and smoky jazz clubs" (Pianoforall), "played piano for over 20 years" (Pianote), "As someone with a background in music, I've always been interested in developing my skills" (Worship Music Academy). | Ghost Admin, Staff, Katarina: make one accurate bio (correct organization name and dates), then edit each post to match it. Don't call her a "concert pianist" unless that can be shown. |
| 6 | **High** | Testing claims without proof | "I signed up, practiced religiously" (Open Studio), "after spending a few weeks with PianoVision on my Quest 3", "I spent several weeks inside Pianote". Images are mostly vendor marketing images: PianoVision's are hotlinked from the vendor's Webflow CDN and dated 2023/10. | Add 2–3 of your own dated screenshots (account dashboard, progress screen) plus one sentence on hours spent and what was learned, to each review. |
| 7 | **Medium** | Schema doesn't match the page | pianovision: an `aggregateRating` (4.2, ratingCount 400) inside the publisher's own review is not allowed for self-serving reviews, and the figures don't match the Meta store. The Review dates show 2025-02-14, but the Article was published 2026-01-05. synthesia: Review author is "Pianoers Editorial" with datePublished 2025-10-27, while the Article shows Katarina, 2025-05-06. best-free-apps: ItemList `numberOfItems: 8` for 7 apps, and `mainEntityOfPage` points to the wrong URL ".../best-free-piano-learning-app/". flowkey: Review headline says "(2025)". | Edit the per-post code injection (Post settings, Code injection, Post header). |
| 8 | **Medium** | Empty headings and broken in-page anchors | Empty `<h3>` in pianoforall-review and pianovision-review. The free-apps contents box links to `#simply-piano-best-for-fast-fun-learning-7-day-free-trial`, but the heading now says "14-Day", so the jump link is dead. | Delete the empty heading blocks in the editor. Update the contents link. |
| 9 | **Medium** | Outdated years | PCA title and H1 say "(2025)". Open Studio links to "8 Best Online Piano Lessons for 2025" (the old title in the bookmark card). PWJ says "one of the stronger options available in 2025" and "as of late 2025". The Pianote image alt says "pricing 2025". | Change to 2026 or remove the year. Refresh the bookmark card. |

## Per-post notes

### /skoove-review/: 84/100
- **E-E-A-T:** dated "Last checked September 2026", a clear rubric, and prices that match the vendor. It leans on "one independent reviewer" and "independent testing" instead of its own testing. There are no screenshots of the author's own progress, and the 3 images are generic 2024 screenshots.
- **Fixes:**
  1. Meta description: "Skoove costs $12.49/month on the annual plan" is fine. In the body, add one line under "What Skoove costs" giving the US price first ("$12.49/month, $149.99 billed yearly"), because the audience is US.
  2. Replace "One independent reviewer who tested it at length called the detection 'virtually perfect'" with your own test result (e.g., "In our X hours on a [piano] over USB…").
  3. Add the `#affiliate` tag (it links to /PFA).
  4. Make the schema rating (3.5/5) match the visible 7/10.
- **Headings:** "Skoove review scores" is an H3 that comes before any H2. Make it an H2.

### /worship-music-academy-review/: 38/100
- **E-E-A-T:** no testing evidence, no images, no screenshots, 731 words. The text reads as a generic AI summary ("This specialization has potential benefits and drawbacks", "holds significant potential").
- **Fixes:**
  1. "lifetime access to their entire course for a one-time price of $39" → "$49 one-time (shown as reduced from $99), lifetime access" (checked 7 Oct 2026).
  2. Name the course ("Worship Piano: Beginner to Pro 2.0") and the instructor (Jared Messer), and add the size ("nearly 400 videos, 80+ PDFs").
  3. Add first-hand proof, or reframe the post as an overview.
  4. Add the `#affiliate` tag (/PFA ×2).
  5. H1 "Worship Piano Music Academy" doesn't match the product name "Worship Music Academy". Pick one.
- **Headings:** there are no H2s; every section is an H3. Promote the main sections to H2.

### /hdpiano-review/: 55/100
- HDpiano is **still live**.
- **Fixes:**
  1. "Free trial : A few teaser lessons to see what it's like" → "7-day free trial with full access".
  2. Re-check the $27/month and $196.92/year prices after signing up (not checked). The vendor currently offers code PIANO2026 to save $98 on the annual plan.
  3. Title typo: "A Pianist's Assesment" → "Assessment". Title says "HDpiano" but the H1 says "HDPiano"; use the vendor's spelling, "HDpiano".
  4. Add the `#affiliate` tag (/pianoforall ×2).
  5. "after a few hours of testing" is the only experience signal. Add your own screenshots.
- **Headings:** emoji in H3s, and a "TL;DR:" H2 at the end. These are fine but low value. Move the TL;DR near the top.

### /open-studio-jazz-review/: 40/100
- **Accuracy (High):** "an online platform co-founded by bass legend Christian McBride". As far as we know, Open Studio was founded by pianists Peter Martin and Adam Maness, and McBride is an instructor. We couldn't confirm the founders on the vendor's site (its About page returned 404), so check before publishing. "500+ lessons" → the vendor says "2,500+ lessons". The quotes credited to McBride ("If you're not making mistakes…") and to Peter Martin ("This scale is your KNIFE…"), plus the "How to Survive a Tour Bus" course and the "Jazz Tree" method, could not be traced. They look invented; remove them or source them.
- Prices $39 and $97 are **verified** (monthly). Add the yearly prices ($33 and $47 per month) and the 14-day trial.
- The jam-session story ("Bro, are you… counting?") is unverifiable. Keep it only if it's true and add proof (a practice clip).
- **Headings:** H3/H4 only with no H2. Numbered joke headings ("Besides Christian McBride's Side Hustle") repeat the false founder claim.
- Add the `#affiliate` tag (/pianoforall-review → /PFA in body).

### /best-piano-lessons-online/: 50/100
- **Fixes:**
  1. "Piano by Pictures offers 30 days free, then runs $37 a month" → "$49 a month".
  2. "Skoove runs $12.99 a month on a yearly plan" → "$12.49". Rename "Best for AI Feedback on Technique", because the Skoove review says it can't judge technique.
  3. "Pianote is $19.99 a month" → "Pianote is now part of a Musora membership: $30 a month or $279 a year".
  4. "Simply Piano: Best for Gamified Beginners… Our Rating: 4.7/5": make this match the 3.5/5 in the Simply Piano review, or explain the difference. Re-rank if needed.
  5. "It's the priciest subscription here" (Playground Sessions) contradicts "the priciest subscription here" (Piano by Pictures). The FAQ "Monthly subscriptions on this list run $12.99 to $24.99" is also wrong (it should be $12.49 to $49).
- "nine interactive eBooks" → "ten". "We spent a month testing" has no proof: add per-product screenshots and test notes.
- Add the `#affiliate` tag (it has the most affiliate links in the group).

### /simply-piano-review-…/: 68/100
- Strong, opinionated, and specific. Prices not checked.
- **Fixes:**
  1. Ranking conflict: "Note: Simply Piano is currently ranked #2 on our list" while this post rates it 3.5/5 and "Weak Value for Adults". Align the two.
  2. "14-day free trial on annual plans": re-verify inside the app (not checked). Other posts say 7 days (the free-apps contents anchor).
  3. Typos: "less than the marketing implie", "TL:DR" (H4) → "TL;DR".
  4. Add the `#affiliate` tag (Impact link and /pianoforall ×5).
  5. "I've been playing for years, and teaching too": add an author box with specifics.
- **Headings:** the TL;DR is an H4 before the first H2. "TL;DR" appears twice.
- **Slug:** very long (it repeats the old title). Leave it unless you set up a 301 redirect.

### /pianoforall-review/: 48/100
- **Fixes:**
  1. Delete "This isn't your average review full of affiliate links and empty praise." The post has 6 affiliate links and no disclosure.
  2. "As a professional pianist who's paid my dues in conservatories and smoky jazz clubs": make this match Katarina's real bio.
  3. The book order may be wrong. The post lists Book 3 Incredible Inversions, Book 4 Chord Magic, Book 5 Advanced Chords, 6–9 Styles, Book 10 Speed Learning. The vendor page puts inversions with speed learning, and a customer comment cites "scales… in Book 9". Check against the course itself (not fully checked).
  4. "Pianoforall Academy does a great job of drilling these rhythms": this links to pianoforall.academy, a different product. Use "Pianoforall".
  5. "Get Another 20% OFF with Code: SAVE20": not verified on the order page. Remove it or check it.
- About half the post is sales copy ("What Makes Pianoforall Different…", "Endless Value"). This weakens the reviewer's voice. The "60-day money-back guarantee" (verified) is missing; add it.
- **Headings:** one empty H3. The image alt has the typo "Rythm".

### /pianote-review/: 66/100
- Good outside sourcing, but there's no testing evidence beyond "I spent several weeks".
- **Fixes:**
  1. "Basic Pianote (lessons only): $25/month or $200/year. Pianote+: $30/month or $240/year" → "Musora membership (includes Pianote): $30/month or $279/year; lessons-only about 17% less" (musora.com/choose-plan, 7 Oct 2026).
  2. "Lifetime option occasionally available (~$997)": not on the plan page. Remove it or source it.
  3. "Launched in 2012 by Musora Media": not checked. Source it or remove it.
  4. "Trustpilot sits at a middling 3.2/5 from 22 reviews": add an "as of" date (not checked; Trustpilot blocks bots).
  5. Explain that Pianote now lives inside the Musora app and covers all instruments.
- **Headings:** the TL;DR is an H4 before the H2s. There are two final-verdict H2s ("Final Verdict" and "Pianote Review 2026 Verdict"). Merge them.

### /pianovision-review/: 58/100
- **Fixes:**
  1. "The Plus subscription pricing hasn't been finalized yet" → "PianoVision Plus costs $9.99/month or $99.99/year and adds 10,000+ licensed songs".
  2. "PianoVision runs exclusively on Meta Quest headsets (Quest 2, Quest 3, or Quest Pro)" → add Quest 3S.
  3. "Compare this to Simply Piano at $180 per year": use the site's own figure ($169.90).
  4. "The app also includes Ludwig AI": not verified. The vendor says "AI assistant".
  5. Remove the `aggregateRating` from the JSON-LD and fix its 2025 dates.
- **E-E-A-T:** images are vendor marketing images (some hotlinked from the vendor's CDN, others dated 2023/10). "I've seen Reddit threads" and "The consensus from music educators" are unsourced. One empty H3. The Meta store link includes a `srsltid` tracking parameter; use the clean URL.

### /best-free-piano-learning-apps/: 52/100
- **Fixes:**
  1. Skoove "$19.99/month or $119.99/year", "Free: 25 lessons" → "$29.99/month or $149.99/year; free tier with limited lessons".
  2. Pianote "$30/month or $200/year" → "$30/month or $279/year (Musora)".
  3. Hoffman "300+ video lessons" → "400+".
  4. "Simply Piano, by JoyTunes" → "by Simply (formerly JoyTunes)". Fix the schema URL as well.
  5. The contents anchor `#…-7-day-free-trial` doesn't match the "(14-Day Free Trial)" heading.
- The title promises "Free & Paid… Tested & Ranked" but there's no testing evidence and no ranking criteria. "Tested, fact-checked, and ranked" has nothing to back it up. The post says "Updated: January, 2026"; refresh it. The "Final Thoughts" push Pianoforall (/PFA) with no disclosure.

### /synthesia-piano-review/: 55/100
- **Fixes:**
  1. "It Won't Teach You to Read Music. Like, at all. Synthesia completely bypasses reading sheet music." → Synthesia can show sheet music ("Enable musical notation for any song"). Rewrite as "Notation is optional, and nothing makes you use it."
  2. "unlocking hand separation, practice modes, and most songs… Learning Pack for $39": price verified. The list of free vs paid features was not checked. The vendor says the unlock gives "all 150 included songs".
  3. "Pair it with something deeper (like Simply Piano…)" contradicts the Simply Piano review's verdict. Use "a teacher or a structured course".
  4. Fix the schema author ("Pianoers Editorial" vs Katarina) and the dates.
  5. Add the `#affiliate` tag (/PFA).
- "Scores reflect our hands-on testing of Synthesia (v2025)": the current version is 10.9+. State the version you tested.

### /piano-with-jonny-review/: 45/100
- PWJ is **live**.
- **Fixes:**
  1. The whole pricing table is wrong or stale. Replace it with "Monthly $39.95; Annual $299.50/year; 14-day free trial; 30-day refund" (pianowithjonny.com/register/…, 7 Oct 2026). Remove "Holiday Special… through December 1".
  2. "Over 2,200 video lessons (as of late 2025)" → "2,440+ (Oct 2026)".
  3. "Piano With Jonny is one of the stronger options available in 2025" → 2026.
  4. Comparison table: Simply Piano $120, Pianote $149 and flowkey $120 don't match the site's own reviews or vendor prices.
  5. "I've been a paying member… since 2019": add proof (a screenshot of the member dashboard) or soften it, because it's at odds with the bio.
- 729 words is thin for a subscription review; add lesson-level examples. H1 "Piano With Jonny - In-Depth Review" doesn't match the title. The "Quick Comparison (2026)" table is an H3 under "What It Actually Is"; make it an H2.

### /flowkey-review/: 60/100
- **Fixes:**
  1. Prices ($19.99, $83.99 for 6 months, $119.99/year) and the 7-day trial are **not checked** (shown only inside the app). The homepage now pushes "Get 8 months free". Re-verify and add an "as of" date.
  2. "Best For: Self-motivated learners… Not Ideal For: Complete beginners" conflicts with "Who Flowkey Is Best For: Adults who want to finally play piano at their own pace". Clarify.
  3. "the app might still move on as if everything's fine" contradicts "Wait Mode, which pauses until you hit the correct note". Explain which mode you mean.
  4. "As a piano teacher who's personally used Flowkey… with my students": add one concrete student example.
  5. The rating (4.2/5) differs from the round-up (3.8/5). Align them. Schema headline says "(2025)".
- **Headings:** "Verdict Box" as an H2 plus "Flowkey Review: Verdict" H2 is redundant; "Final Rating" and "Final Thoughts" make a third and fourth closing H2.

### /piano-career-academy-review/: 35/100
- Prices ($47/month, $470/year) **verified**, and PCA is live.
- **Problems:** heavy generic AI-style prose ("a testament to", "digital disruption", "where passion meets innovation", "keyboard warriors"). It also makes claims we couldn't back up from the vendor page: "Repertoire… including classical, jazz, pop, and improvisation" (PCA is a classical Russian-school course), "collaborative projects", and "Limited Performance Opportunities".
- **Fixes:**
  1. Title and H1 "(2025)" → 2026, or no year.
  2. Remove "jazz, pop, and improvisation" unless a source shows PCA teaches them.
  3. "So, if you're ready to ditch the metronome…": delete it. It contradicts the method and is filler.
  4. "As a concert pianist with years of experience" and "As a professional pianist myself, I've seen firsthand how Vartic's method can unlock…": make these match the real bio, and add real usage proof.
  5. Image alt and filename typo "Ilnica" → "Ilinca".
- Last modified Jan 2025, so it's the stalest post in the group. Cut it by a third and add what you actually did (which courses, which pieces, what feedback you got).

## AI-citation readiness (group): 58/100
Good: verdict boxes, FAQs (Skoove, round-up), and dated "Last checked" lines (Skoove, Synthesia). Weak: conflicting prices across posts mean AI answers will pick inconsistent numbers. There are few "as of [date]" stamps on price claims. Several unsourced numbers (Pianote "100,000 students", "Launched in 2012"; PWJ "44,500+ members"). Fix: one dated price line per product, used in every post.

## Not checked
Simply Piano, flowkey, Yousician and Playground Sessions prices (behind app or login); HDpiano dollar prices; PWJ lifetime price; Synthesia free-tier limits; Pianote Trustpilot figure; the PianoVision "Ludwig" name; Open Studio founders on the vendor's own About page (it returned 404); the Pianoforall book order inside the course.
