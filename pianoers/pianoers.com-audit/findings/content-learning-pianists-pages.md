# Content quality: learning/method/book posts, pianist biographies, site pages (group 3)

Audit date: 7 Oct 2026. Sources: `crawl/pages.json` (extracted text, headings, links, JSON-LD), live HTML fetched for 8 URLs (homepage, about, contact, privacy, stephen-ridley, ahmad-jamal, lang-lang, cole-lam), and web fact checks. Wikipedia was read through its API. Other sources were found through DuckDuckGo and publisher pages. The search engine started rate-limiting partway through, so some checks are marked **Not checked**.

## Category score: 54 / 100

| Area | Score | Comment |
|---|---|---|
| Learning posts (basics, practice, teach-yourself) | 78 | Rewritten in 2026. Clear, specific and well structured. Teach-yourself has invented-looking quotes. |
| Method/book posts | 52 | Prices and features are wrong, the two authors contradict each other, and one post contains text copied from another website |
| Biographies | 58 | Ahmad Jamal is excellent (90). Lang Lang has many wrong facts. Cole Lam is three years out of date and full of filler. |
| Stephen Ridley | 20 | Serious defamation risk: it calls him a "con artist" and a "scam" and alleges money goes to Scientology, with no evidence |
| Site pages (E-E-A-T trust) | 35 | No affiliate disclosure, policies out of date, no data controller, contact page is 24 words, author credentials don't add up |

E-E-A-T (this skill's own weighting, not Google's): Experience 14/20, Expertise 14/25, Authoritativeness 8/25, Trustworthiness 12/30 = **48/100**.
AI-citation readiness: **62/100**. Basics, Practice and Jamal have FAQ/answer-first blocks, tables and specific numbers. The other posts have no extractable facts or sources.
Templated metadata (`metadata_template.py`, all 55 URLs): `site_risk: low`, `templated_ratio: 0.0`, `shared_cta_phrases: {}`. Seven pages have **no meta description**: /contact/, /privacy-policy/, /cookie-policy/, /tag/books/, /tag/practice/, /tag/jazz-piano/, plus /acoustic-vs-digital-piano/ and /how-to-tune-a-piano-a-simple-guide/, which are outside this group.

## What works

- /piano-basics-a-beginners-guide-to-the-keyboard/, /piano-practice-4-tips-to-successful-sessions/ and /ahmad-jamal-biography/ are model pages. They open with the answer, have spec tables and FAQ blocks with FAQPage schema, use specific numbers (A0 = 27.5 Hz, C8 = 4,186 Hz, middle C is key 40, the metronome ladder), and include first-hand teaching notes ("Students I teach do this…", "I use the Pershing recording with students who over-play").
- The Ahmad Jamal biography checked out almost completely. It covers his April 2023 death correctly and adds the Emerald City Nights releases.
- Every post has Article JSON-LD with an author `url`. Katarina's markup has `sameAs` pointing to onlinepianoteachers.com, which returns 200.
- The meta descriptions are written by hand, with no templating.

---

## Findings, ordered by severity

| # | Severity | URL | Finding (evidence) | Fix (where) |
|---|---|---|---|---|
| 1 | **Critical** | /stephen-ridley/ | Defamation and YMYL risk. The meta description says the course "is a scam". The body says he is "the Con Artist", that money is "funneling… to the controversial Church of Scientology", and that he has "undisclosed ties to groups exhibiting cultish behaviors and insatiable greed". The article itself admits: "no concrete paper trail of Ridley's payments to Scientology exists". The only evidence given is that he "resides near the international headquarters". The quote "I studied at… the Royal College of Music… and the Juilliard School" has no source, and his own About page (stephenridleypiano.com/about) says nothing like it. That page says he has a PPE degree and worked in investment banking. The image is captioned "Scientology Church with Money Pile". | Unpublish today (Ghost Admin > Posts > Unpublish), or rewrite it as a plain course review. Delete the whole Scientology section and the image. Delete "scam", "con artist" and "fabricated", and the unsourced Juilliard quote. Keep the criticism you can check: the four-chord method, the price, the upsell structure, and no refund or payment-plan information, each with a source link. Get legal advice before republishing. |
| 2 | **Critical** | Site-wide (footer, privacy, every post with /PFA or amzn.to links) | **No affiliate disclosure anywhere.** `has_disclosure` is False on all 10 posts in this group. /teach-yourself-piano/ links to the /PFA affiliate redirect five times. The privacy and cookie policies never mention Amazon Associates. Amazon's Operating Agreement requires the statement "As an Amazon Associate I earn from qualifying purchases", and the FTC requires disclosure close to the links. The footer only links to Privacy, Cookie and RSS. | Create an **/affiliate-disclosure/** page (Ghost Admin > Pages). Add it to the footer (Settings > Navigation > Secondary). Turn on the theme's disclosure box for every post with affiliate links. Add the Amazon sentence to the footer text. |
| 3 | **High** | /author/katarina/, /about/ | The credentials don't hold up. "Teaching piano since 2001" sits next to "member of the National Association of Music Teachers since 1995", which is six years *before* she started teaching. No US body called the "National Association of Music Teachers" seems to exist; the real ones are MTNA (Music Teachers National Association) and NAfME. She has no surname. Other Katarina posts call her "an accomplished concert pianist" (/piano-tuning…/) and "a professional concert pianist" (/how-to-clean…/). /5-best-piano-methods…/ says she moved all her students to Simply Music. | Correct the bio (Ghost Admin > Staff > Katarina). Use the exact organisation name and year, or remove it. Add a surname or a stated pen-name policy, a real photo, the instrument and teaching location, and a link to a verifiable profile (MTNA directory, studio site). Pick one identity (teacher or concert pianist) and use it on every post. |
| 4 | **High** | /teach-yourself-piano/ | The quotes look invented and none has a source: "Sarah Chen, CEO of an online piano learning platform" ("300% increase in new users"), "Dr. Elena R., a music education researcher at Berklee College of Music" (quoted twice, once praising **Pianoforall, the affiliate product**), and "Michael Chang, a software engineer". This is a classic marker of low-quality AI content under the QRG. The Berklee attribution is the most dangerous one. | Delete all three quotes, or replace them with real, linked sources. Keep the Ericsson quote, but cite *Peak* (2016) with a page or chapter. |
| 5 | **High** | /lang-lang-the-biography/ | Several facts are wrong (see the fact-check table). The worst: his breakthrough was the 1999 Ravinia gala with the Chicago Symphony, not the "1999 Grammy Awards". His first album was on Telarc in 2000, not "1998 at 15… The Carnegie Hall Concert" on DG. The page says "At 40 years old currently" (he is 44). It claims he "composed the official Winter Olympics theme" for 2022. It leaves out Curtis and Gary Graffman. The three "Career Highlights / Selected Discography / Influence & Outreach" links point to #career, #discography and #influence, which don't exist on the page (checked in the live HTML). | Rewrite using the corrected facts below. Add 2023–2026 activity (Piano Book 2 on DG, 17 Oct 2025; judge on The Piano in 2023–24; Hollywood Walk of Fame star, Apr 2024; Milan–Cortina 2026 opening ceremony, 6 Feb 2026). Remove the dead anchor links. Remove or source the "$37 million" net worth, which is also in the Person schema. |
| 6 | **High** | /cole-lam-the-piano-prodigy/ | The article is frozen at age 12 ("At the tender age of 12", "for someone his age"). He was born 8 Feb 2007 (famousbirthdays.com), so he is now 19. He studied at The Purcell School, is now at Berklee College of Music, and composed the Commonwealth Dance Relay track (commonwealthresounds.com/news/introducing-cole-lam/). The "Performances and Recognition" section is entirely generic AI-style filler with no names, dates or awards: "Media features have highlighted his incredible performances… Lam has also received awards…". The page has one H3 and no H2. It also misspells the station: "London Street Pancras Station". | Rewrite to about 1,000 words with dated facts: School of Rock as Lawrence (West End, 2017), the St Pancras video (100M+ views), Purcell, Berklee, MusicNotes signature artist, YouTube with 1M+ subscribers. Delete the filler paragraph. Add H2 sections and a "last updated" note. |
| 7 | **High** | /5-best-piano-methods-to-learn-quickly/ | The post contains text copied from another site: "Let's hear your story! Share it here and you'll have your own page on my website… You can even include a picture if you like!" There is no form or page for this on Pianoers. It promises "5 methods", but the H2s split them into "Classical" and "Alternative" with no ranking. It is 1,036 words of opinion with no prices, ages or editions. Its Bastien verdict ("dull and uninspiring") contradicts finding 8. | Delete the copied paragraph. Check that the rest is original; the Simply Music anecdote reads like a Simply Music teacher's site. Rewrite it as a comparison table (method, ages, pace, reading-first or not, cost per level), or merge it into /best-piano-books-for-adult-beginners/ and 301 the URL. |
| 8 | **High** | /best-piano-books-for-adult-beginners/ vs /bastien-…/ and /5-best-…/ | The authors contradict each other. Richard says Bastien Piano for Adults has "song arrangements [that] are actually beautiful", with simplified "Chopin's Fantasie Impromptu" and Mozart sonatas. Katarina says of the same book: "the music itself feels flat and uninspired". Richard's FAQ says you need "88 weighted keys", while Basics says "A 61-key keyboard covers everything in this guide". | Agree one house view and edit both posts. Check whether Bastien Piano for Adults Book 1 really contains a Fantasie-Impromptu arrangement (**Not checked**); remove the claim if you can't confirm it. Align the advice on key count. |
| 9 | **High** | /best-piano-books-for-adult-beginners/ | Prices and features are wrong (see the fact-check table). John Thompson has a $15.99 edition with online audio, so "No videos. No play-along tracks" is wrong. "$12.99… literally half the price of competitors" is wrong because $12.99 is 65% of $19.99. Accelerated costs $11.99, not $12.99. Alfred's has 160 pages, not 143. Faber's book includes "online access to audio and video", but "QR codes everywhere" is unconfirmed. Unsourced stats: "Working with a teacher accelerates progress by ~30%", "assumes 45+ minutes of daily practice". The H1 says "I've Tested Them All" but the post shows no photos of the author using the books. | Correct the prices with "as of [month 2026]" next to each one. Remove the made-up stats. Add your own photos of the books on a piano stand and one concrete student anecdote per book. Put the Last updated date in the visible byline; it was modified on 2 Apr 2026. |
| 10 | **High** | /privacy-policy/ (last updated 18 Jan 2024) | It is a TermsFeed generator template ("created with the help of the Privacy Policy Generator"). It names no data controller beyond "Pianoers.com" and gives no postal address. "Country: District Of Columbia", but Richard's profile says "San Francisco, USA". There is no mention of Google Tag Manager (GTM-52XDQB4S is live), Claspo popups (live), Ghost Members/newsletter or Ghost native analytics (ghost-stats.min.js is live), Amazon Associates or course affiliates, Ghost Portal sign-in or comments, or CCPA/CPRA rights for US readers. It lists "purchase contract" and "Affiliates include Our parent company", which are boilerplate and wrong for this site. | Rewrite the policy. Name the controller (person or company, postal address, email). List each processor (Ghost(Pro) or host, Ghost Analytics/Tinybird, GTM and whatever it loads, Claspo, YouTube embeds, Amazon Associates, course affiliate networks, the email provider). Add the legal basis, retention and California rights. Ghost Admin > Pages > Privacy Policy. |
| 11 | **High** | /cookie-policy/ (last updated 16 May 2024) | It is out of date. It lists **popupsmart** cookies, but the site now runs Claspo. It lists "_gcl_au… Google AdSense", which is wrong (that cookie is the Google Ads conversion linker). It has a whole section on **Flash cookies** with macromedia.com links. It says a "Cookie Consent Manager can be found in the notification banner", but no consent banner appears in the homepage HTML. A banner loaded via GTM was **Not checked**. The postal address is blank ("by post to: Pianoers.com __________ __________"). Claspo, Ghost members cookies and the GTM container are missing. | Rescan the site's cookies (for example with Cookiebot's free scan) and rewrite the list. Delete the Flash section. Fill in or remove the address. Either add a real consent tool or remove the sentence that claims one exists. |
| 12 | **High** | /contact/ | 24 words: "We're here to help! Our friendly team…" and a form. No email address, no named person, no response time, no business details, and no meta description. Its Article schema names Richard as author. | Add the named owner, info@pianoers.com, the response time, a link to the affiliate disclosure and corrections policy, and a mailing address or registered business name. Add a meta description (Page settings > Meta data). |
| 13 | **High** | Site-wide | **No editorial policy or "how we test" page.** Posts claim "I tested every major…", "We buy the gear, we take the courses" (About), and "I've personally tested… Playground Sessions" (/tag/courses/), but there is no Playground Sessions review on the site, no testing method, no corrections policy, and no statement that affiliate commissions don't affect rankings. | Create **/how-we-test/** (what was bought, how long it was used, who tested it, how scores are set, conflicts of interest, corrections email). Link it from every review byline and from the About page. |
| 14 | Medium | /about/ | 297 words with no headings and no photos. It says "since 2021", but the earliest posts in this group are dated 2022. It names no business entity or location, links to no external profiles, and has no affiliate or funding statement. The Article schema names Katarina as author, but the page is written by Richard. | Expand to 600+ words with headings: Who we are (photos, real names, verifiable credentials), How we make money, How we test, Corrections, Contact. Add Organization/AboutPage schema via the theme. |
| 15 | Medium | /author/richard/ | The bio says "Playing since age 8, gigged everywhere, taught hundreds… no bullshit". There are no verifiable credentials (no school, band, venues or studio), `sameAs: []` and no social links. The profanity in the meta description weakens trust. "Hundreds" here conflicts with "over 400 adult beginners" in the books post. | Add 2–3 checkable credentials and links (YouTube, Instagram, a gig listing, a studio page) in Staff > Richard > Website/Social. Remove the profanity from the bio. Use one student number everywhere. |
| 16 | Medium | /piano-basics-…/ | A factual slip: "Pass G and reach the next A, and the frequency has doubled". The frequency doubles from A to the next A (one octave), not from G to A. This appears in both the body text and the FAQ schema. "Shares a tendon with the middle finger" is a simplification. | Change it to "Go from one A to the next A and the frequency has doubled". |
| 17 | Medium | /teach-yourself-piano/ | The 2024 image "Piano sales statistics" (image.png) and the Technavio link sit under the "pandemic" claim with no figure in the text. Under "Key signatures" it says "Tell major from minor by ear", which is a different skill. The H1 is in sentence case and doesn't match the title. | Quote one Technavio figure with its year, or drop the chart. Fix the Step 2 wording. |
| 18 | Medium | /bastien-piano-method-…/ | The meta description promises "Updated 2025… how it compares to Alfred, Faber, and Suzuki", but the article has no comparison. There is no H2; it starts with H3s. A bookmark card's text has leaked into the body ("How to learn piano by yourself… Pianoers.com Katarina"). There are two images with empty alt text and no dimensions. The article mentions "Accompaniment CDs"; Kjos now uses online audio (**Not checked**). | Add the promised comparison table, or change the description. Promote the H3s to H2. Replace the bookmark card with a normal link. |
| 19 | Medium | /ahmad-jamal-biography/ | Minor nuance: "In 1957 Jamal swapped Crawford's guitar for a drum kit". His first drummer album was *Count 'Em 88* (1956, Walter Perkins); Fournier joined in 1957. The page says Fournier left "then" after Crosby died, but Wikipedia says Crosby and Fournier had *already* joined Shearing. The two in-body images have no width/height. The first heading is an H3 ("at a glance") placed before the H2s. | Small edits only. Add a sources line linking NEA Jazz Masters, the NYT obituary and the Wikipedia page. |
| 20 | Medium | /piano-practice-4-tips-…/ | The 2002 sleep study is real (Walker et al., *Neuron* 2002, "Practice with sleep makes perfect") but has no citation. The page states without support that "Practicing through wrist tension is the most common cause of injury in adult beginners", and gives the unattributed cliché "Amateurs practice until they get it right…". The OG image is hotlinked from Unsplash. | Link to the Walker study. Soften the injury claim or cite a source. Upload the OG image to Ghost. |
| 21 | Medium | Tag pages /tag/books/, /tag/practice/, /tag/jazz-piano/ | Each has one post, no description and no meta description, and the title follows the "Books - Pianoers.com" pattern. These are thin archive pages. | Either write a 100–150-word description plus a meta description (Ghost Admin > Tags > [tag]), or remove the tag and merge it (Books→Lessons, Practice→Lessons, Jazz Piano→Pianists). |
| 22 | Medium | /tag/pianists/ | The description has errors: "Lang Lang's… ride from Beijing basements" (he grew up in Shenyang), "Ahmad Jamal's **smooth jazz** blueprint" (wrong genre; Jamal called his music "American classical music"), and "Cole Lam's street-corner" (it was a station piano). | Rewrite it accurately. |
| 23 | Low | /tag/care/ | The meta description says "Real piano care in 2025". | Change it to 2026, or remove the year. |
| 24 | Low | /tag/apps/, /tag/courses/ | They promise reviews of Playground Sessions ("secretly brilliant for theory", "I've personally tested… Playground Sessions"), but no review exists. | Remove the claim, or publish the review. |
| 25 | Low | Homepage | The H1 is "Honest piano advice from a real teacher" (singular), but there are two authors. There is no who-we-are or trust block, and there are no About/Contact links in the footer; they are in the header only. The WebSite schema has no `potentialAction` or `sameAs`. | Add a short "Who writes Pianoers" strip with photos, credentials and links to /about/ and /how-we-test/. |
| 26 | Low | /lang-lang-…/, /cole-lam-…/ | Biographies have no visible sources list and no "last updated" date in the body. | Add a "Sources" list (3–6 links) at the end of each biography. |

---

## Per-post notes

### /stephen-ridley/ — 20/100
- E-E-A-T: there is no first-hand evidence that the author bought or took the course. The reviews it quotes are unattributed. The tone is hostile and the claims about Scientology and a "scam" cannot be checked. The page has a Review schema with `price: 2997` while the body says "$1,400"; the schema and body don't match.
- Top fixes, quoted exactly:
  1. "…his Piano Masterclass is little more than a scam to extract money from unwitting students on behalf of the controversial Church of Scientology." Delete it.
  2. "Online sleuths discovered that Ridley resides near the international headquarters for Scientology." Delete the whole H2 section.
  3. "\"I studied at some of the best music schools in the world, including the Royal College of Music in London and the Juilliard School in New York,\" boasts Ridley." There is no source for this; delete it or link a source.
  4. "Is it worth $1,400? Absolutely not." The price is out of date. Current pricing (ridleyacademy.net/packages, via search snippet) lists tiers up to $13,994, and a bundle page lists "The Ridley Piano Academy ($3,997)". Re-check the price before quoting it.
  5. The title "The Disturbing Truth": change it to "Stephen Ridley Piano Academy Review (2026): Price, Method, Who It's For".
- Headings: the H4 "TL;DR" comes before any H2. "Protect Your Wallet, Not the Con Artist" (H3) needs to go.
- Outdated years: the $1,400 price, and the "(2024)" wording in the schema.

### /teach-yourself-piano/ — 70/100
- Clear 11-step structure, good practical detail, published Feb 2026.
- Fixes: (1) delete the "Sarah Chen", "Dr. Elena R., … Berklee" and "Michael Chang" quotes; (2) "a beginner in 2026 progresses faster than one in 2006" is a fine opinion, but frame it as one; (3) disclose the affiliate links next to the first "Pianoforall" link; (4) "Key signatures: Tell major from minor by ear and on the page" needs rewording.
- Headings are fine (H2/H3), but the H1 casing differs from the title.

### /piano-basics-a-beginners-guide-to-the-keyboard/ — 88/100
- Facts checked (my own check against standard piano range data): 88 keys, 52 white and 36 black, A0 = 27.5 Hz, C8 = 4,186 Hz, middle C = key 40, C4 = 261.63 Hz, middle-C positions on 25/49/61/76-key boards. All Verified.
- Fixes: (1) "Pass G and reach the next A, and the frequency has doubled" is wrong (see finding 16); (2) the OG image is the generic banner (PianoersBanner-1.png), so make a page-specific one; (3) add an author line, such as "Katarina, piano teacher since 2001", with a link to /how-we-test/.

### /piano-practice-4-tips-to-successful-sessions/ — 85/100
- Strong first-hand detail ("grinding through Liszt's Hungarian Rhapsody No. 2"), with a ladder method and journal template.
- Fixes: (1) cite Walker et al. 2002 for "In a 2002 study of motor-sequence learning… about 20 percent faster" (Verified as a real study, Neuron 35:205–211); (2) "Practicing through wrist tension is the most common cause of injury in adult beginners" has no source; (3) the slug still says "4-tips-to-successful-sessions" and was published in 2022, which is fine to keep.

### /best-piano-books-for-adult-beginners/ — 55/100
- Strong voice, but the first-hand claims ("After teaching over 400 adult beginners", "This is the book I hand to 80% of my beginner students") have no evidence on the page, and several product facts are wrong.
- Fixes, quoted exactly: (1) "And at $12.99, it's literally half the price of competitors."; (2) "No videos. No play-along tracks. No apps." (the Thompson online-audio edition exists); (3) "Alfred's packs more music theory into 143 pages" (it has 160); (4) "Price: $12.99 | Completion Time: 6-9 months" for Accelerated (it costs $11.99); (5) "Working with a teacher accelerates progress by ~30%" has no source. Also: "You'll play simplified versions of Chopin's 'Fantasie Impromptu'" (**Not checked**, likely wrong), and "The Practice Studio app… listens to you play" for Bastien (**Not checked**).
- Headings: the five repeated H3s "What Makes It Not Suck" and "The Downsides (Because Nothing's Perfect)" are a repetitive template. Name them per book, for example "Faber: what works".
- AI-phrasing markers: "chef's kiss", "Here's the thing", "Trust me", "game changer", and the "You've got this" ending. These are not fatal, but they make the post sound generic.

### /5-best-piano-methods-to-learn-quickly/ — 40/100
- Fixes: (1) delete "Let's hear your story! Share it here and you'll have your own page on my website…"; (2) delete "Which Piano Method Do You Love?… share your experiences here", unless comments are enabled and you mean it; (3) the title promises speed ("Learn Quickly") but the text never compares speed; (4) typo: "Many of them are composed and improvised on their own"; (5) the images are 4000×6000 and 5472×3648 hotlinked from Unsplash, and one has the alt text "Taken during a party of a choir."
- Headings: "Best for You?" and "Which Piano Method Do You Love?" are H3s under "Alternative Piano Methods", so they are nested wrongly. Make them H2s.

### /bastien-piano-method-is-it-the-right-one-for-you/ — 60/100
- Real teaching opinion (the fixed-hand-position critique is good expertise).
- Fixes: (1) the description says "Updated 2025… compares to Alfred, Faber, and Suzuki", but the article has no comparison; (2) "Accompaniment CDs are available" (**Not checked**); (3) promote the H3s to H2s; (4) remove the leaked bookmark-card text; (5) add prices and the age range per series. "The Very Young Pianist (Ages 4-7)" and the "Sight Reading" book in Basics are **Not checked**.

### /ahmad-jamal-biography/ — 90/100
- See the fact-check table: almost everything is Verified. Three YouTube embeds are present in the live HTML.
- Fixes: (1) add a sources list; (2) "Duke Ellington Fellow, Yale University (1994)" is not in Wikipedia's awards list (**Not checked**; confirm with the NEA or Yale source, or drop it); (3) the 1956/1957 drummer nuance; (4) add image dimensions.

### /cole-lam-the-piano-prodigy/ — 35/100
- Fixes, quoted exactly: (1) "At the tender age of 12, Cole Lam defies the conventions of expectation" (he is now 19); (2) "Media features have highlighted his incredible performances… Lam has also received awards and recognition" (generic filler with no facts); (3) "If Freddie Mercury could have been present, one can only imagine the pride he would feel" (speculative fluff); (4) "London Street Pancras Station" should be St Pancras; (5) "Cole emerges as a true maestro, effortlessly weaving his magic across a spectrum of instruments with epic flair" (AI-typical phrasing).
- Headings: one H3 and no H2s.

### /lang-lang-the-biography/ — 45/100
- Fixes, quoted exactly: (1) "His breakout moment came when he performed at the Grammy Awards in 1999 at age 17"; (2) "In 1998 at age 15, he released his first album, The Carnegie Hall Concert"; (3) "At 40 years old currently"; (4) "watched by over 5 billion people globally"; (5) "For the 2022 Beijing Winter Olympics, Lang Lang composed the official 'Winter Olympics Theme Song'".
- Headings: the "Quick Facts" H3 comes before the first H2, and "Lang Lang Net Worth" is an H3 under "Legacy".
- The Person schema `@id` is the article URL, so it clashes with the Article entity. Change it to `…/#person`.

---

## Fact-check list

| Claim (page) | Status | Correct value / source |
|---|---|---|
| Jamal born Frederick Russell Jones, 2 Jul 1930, Pittsburgh | Verified | https://en.wikipedia.org/wiki/Ahmad_Jamal |
| Jamal died 16 Apr 2023, Ashley Falls MA, prostate cancer, aged 92 | Verified | same |
| Lessons at 7 with Mary Cardwell Dawson; also James Miller; Tatum called him "a coming great" | Verified | same |
| Westinghouse HS 1948; George Hudson orchestra; Four Strings ended when Joe Kennedy Jr. left | Verified | same |
| Converted and changed name in 1950; "re-establish my original name" | Verified | same |
| Three Strings with Ray Crawford and Eddie Calhoun; John Hammond at the Embers; Okeh 1951; Richard Davis then Israel Crosby (1954–62) | Verified | same |
| Fournier joined 1957, replacing the guitar | Verified, with a nuance: first drummer album was *Count 'Em 88* (1956, Walter Perkins) | same |
| Pershing recorded 16 Jan 1958, 43 tracks, 8 chosen | Verified | https://en.wikipedia.org/wiki/At_the_Pershing:_But_Not_for_Me |
| Sold over a million; 108 weeks on the charts | Verified (Wikipedia gives 108 weeks on the "Ten Best-selling" chart, and 107 weeks on Billboard on the album page) | same |
| Alhambra opened 1959, lasted about a year | Verified | Ahmad_Jamal Wikipedia |
| Crosby died Aug 1962; Village Gate 1964 | Verified | same |
| Garner, Strayhorn and Mary Lou Williams were also at Westinghouse | Verified | https://en.wikipedia.org/wiki/Westinghouse_High_School_(Pittsburgh) |
| "All four ended up in the DownBeat Hall of Fame" | Not checked | — |
| Miles Davis quote, Red Garland, "New Rhumba" on *Miles Ahead* | Verified | Ahmad_Jamal Wikipedia |
| NEA Jazz Master 1994; Kennedy Center Living Jazz Legend 2007; Ordre des Arts et des Lettres 2007; DownBeat HoF 2011 (76th Readers Poll); NEC honorary doctorate 2015; Grammy Lifetime Achievement 2017 | Verified | Ahmad_Jamal Wikipedia, Awards section |
| Duke Ellington Fellow, Yale 1994 | Not checked (not in Wikipedia's list) | — |
| Marseille 2017, Ballades 2019 (last album); Emerald City Nights, three volumes 1963–68 | Verified | same (discography) |
| Mentored Hiromi | Verified | same |
| Nas "The World Is Yours" samples "I Love Music"; "Stakes Is High" samples "Swahililand" | Not checked (believed correct) | — |
| Lang Lang born 14 Jun 1982, Shenyang | Verified | https://en.wikipedia.org/wiki/Lang_Lang |
| Tom & Jerry / Liszt HR2 inspired him | Verified (at age 2) | same |
| "entering the prestigious Shenyang Conservatory of Music at just 5"; "won his first piano competition at age 6"; "By age 7… first public recital… a Mozart piano concerto" | **Wrong** | He began lessons with Zhu Yafen at 3, and at **5** won the Shenyang Piano Competition and gave his first public recital. He moved to Beijing's Central Conservatory at **9**. (Wikipedia) |
| Studied at Curtis with Gary Graffman from 1997 | Omitted from the article | Wikipedia |
| Won the Tchaikovsky Competition for Young Musicians in Japan, 1995 | Verified | Wikipedia |
| "At 15… signed by Deutsche Grammophon… 1998… first album, The Carnegie Hall Concert" | **Wrong** | First album: *Live at Seiji Ozawa Hall, Tanglewood*, **Telarc, 30 Nov 2000**. First DG album: Tchaikovsky/Mendelssohn concertos, **Jul 2003**. https://en.wikipedia.org/wiki/Lang_Lang_discography |
| Breakthrough "at the 1999 Grammy Awards, playing HR2" | **Wrong** | Aug 1999 **Ravinia "Gala of the Century"**, standing in for André Watts, Tchaikovsky Concerto No. 1 with the Chicago Symphony. https://www.chicagotribune.com/1999/08/16/17-year-old-sub-steals-the-show-at-ravinia-gala/ ; https://chicagosymphony.org/about/performers/visiting-artists/keyboard/lang-lang/ . His first Grammy-telecast performance was in **2008** (Rhapsody in Blue with Herbie Hancock). |
| *Live at Carnegie Hall* in 2004 | Verified (DG, released 2 Mar 2004) | discography page |
| First Chinese pianist engaged by the Berlin Phil, Vienna Phil and "all of the top five American orchestras" | Partly verified: Wikipedia says "many of the top American orchestras" | Wikipedia |
| Beijing 2008 opening "watched by over 5 billion people" | **Wrong** | Estimated **1 to 4 billion** (Wikipedia, Lang Lang article) |
| Time 100 in 2009 | Verified | Wikipedia |
| Sesame Street appearance | Verified | https://muppet.fandom.com/wiki/Lang_Lang (Episode 4084) |
| Appearance in *Arthur* | Not checked | — |
| Autobiography *Journey of a Thousand Miles* 2008 | Verified | Wikipedia |
| UNICEF Goodwill Ambassador 2004 | Verified | https://news.un.org/en/story/2004/05/104262 ; Wikipedia |
| Foundation launched 2008 | Verified (Oct 2008) | Wikipedia |
| "Lang Lang Piano Academy" book 2016 | Not checked | — |
| "composed the official 'Winter Olympics Theme Song'" (2022) | **Wrong / unsupported** | He recorded the promotional song "Forever You and Me" with Andrea Bocelli and Lei Jia (https://www.udiscovermusic.com/classical-news/andrea-bocelli-lang-lang-lei-jia-forever-you-and-me/). The official theme song was "Together for a Shared Future". |
| "At 40 years old currently" | **Wrong** | He is 44 (born June 1982) |
| Married Gina Alice Redlinger in 2019, Paris | Verified (June 2019); the article omits their child, born Jan 2021 | Wikipedia |
| Endorsements (Adidas, Mercedes, Nike, Rolex, Audi, Armani) | Not checked | — |
| Net worth ≈ $37M | Not checked (unsourced; also in the schema) | — |
| Recent activity 2023–2026 (missing from the article) | Verified | *Piano Book 2*, DG, 17 Oct 2025 (https://www.deutschegrammophon.com/en/artists/lang-lang/biography); judge on *The Piano* 2023–24; Hollywood Walk of Fame star 10 Apr 2024; Milan–Cortina 2026 opening ceremony 6 Feb 2026; Honorary Fellow, Homerton College, Cambridge, 19 May 2026 (Wikipedia) |
| Cole Lam: Lawrence in *School of Rock*, West End | Verified | https://www.broadwayworld.com/people/character/Lawrence-331448/ |
| Cole Lam: age 12 at the St Pancras "Bohemian Rhapsody" | Verified | https://www.commonwealthresounds.com/news/introducing-cole-lam/ |
| St Pancras piano donated by Elton John | Verified (Feb 2016) | https://www.theguardian.com/music/2016/feb/04/st-pancras-elton-john-surprises-london-commuters-with-piano-performance |
| Cole Lam's current age and achievements | **Out of date** | Born 8 Feb 2007, so 19 now (https://www.famousbirthdays.com/people/cole-lam.html). Studied at The Purcell School, now at Berklee; St Pancras video 100M+ views; composed the Commonwealth Dance Relay soundtrack (commonwealthresounds.com) |
| Cole Lam is a MusicNotes Signature Artist | Not checked (musicnotes.com returns 403 to bots) | — |
| Ridley "studied at RCM and Juilliard" (claimed quote) | **Unsupported** | His own About page says triple first in PPE, then investment banking, and does not mention RCM or Juilliard (https://www.stephenridleypiano.com/about) |
| Ridley course "$1,400" (body) / $2,997 (schema) | **Outdated / inconsistent** | Packages up to $13,994 (https://ridleyacademy.net/packages); "The Ridley Piano Academy ($3,997)" on the bundle page (from a search snippet; the page's SSL certificate has expired and it was not opened) |
| Ridley–Scientology funding | **Unsupported** (the article itself says there is "no concrete paper trail") | — |
| Faber Adult Piano Adventures All-in-One Book 1, $19.99 | Verified ($19.99, 184 pp., "online access to audio and video") | https://pianoadventures.com/product/adult-piano-adventures-all-in-one-course-book-1/ |
| Faber "QR codes everywhere" | Not checked (the publisher says "online access") | — |
| Alfred's Basic Adult All-in-One Book 1, $19.99 / $24.99 with DVD | Verified | https://www.alfred.com/alfreds-basic-adult-all-in-one-course-book-1/p/00-5753/ |
| Alfred's "143 pages" | **Wrong**: 160 pages | same |
| Bastien Piano for Adults Book 1, $19.99; Fantasie-Impromptu arrangement; "Practice Studio app" | Not checked (kjos.com returned 403) | — |
| Accelerated Piano Adventures Lesson Book 1, $12.99 | **Wrong**: $11.99 (96 pp., "For the Older Beginner") | https://pianoadventures.com/product/accelerated-piano-adventures-lesson-book-1/ |
| John Thompson's Adult Piano Course Book 1, $12.99 | Verified for the book-only edition; a **$15.99 edition with online audio** also exists | https://www.halleonard.com/feature/11750004/john-thompsons-adult-piano-course |
| Thompson "No videos. No play-along tracks." | **Wrong** (an online-audio edition exists) | same |
| Playground Sessions co-created by Quincy Jones (teach-yourself) | Not checked | — |
| Walker 2002 sleep/motor study, about 20% faster (practice post) | Verified from memory of the paper (Walker et al., *Neuron* 2002); link not fetched | — |

---

## Site pages: trust gaps and what to add

| Gap | Evidence | What to add |
|---|---|---|
| No affiliate disclosure page | Footer has Privacy, Cookie, RSS only; `has_disclosure` False on all 10 posts | /affiliate-disclosure/ page, footer link, Amazon Associates sentence, per-post disclosure box near the first affiliate link |
| No editorial or testing policy | "We buy the gear, we take the courses" (About) with no method | /how-we-test/ plus a corrections policy, linked from bylines and About |
| No business or physical details | Privacy: "Country refers to: District Of Columbia"; Cookie: address "__________"; author page says "San Francisco, USA" | Legal owner name (person or LLC), mailing address, consistent state, email |
| No data controller identity | Privacy: "Company… refers to Pianoers.com" | Name the controller and how to contact them about privacy |
| Policies out of date | Privacy dated 18 Jan 2024, Cookie dated 16 May 2024; no GTM (GTM-52XDQB4S), Claspo, Ghost Members/Portal, Ghost Analytics (ghost-stats.min.js), Amazon or course affiliates; popupsmart and Flash sections are obsolete | Rewrite both. List each processor. Add CCPA/CPRA rights. State the consent mechanism truthfully. |
| Contact page thin | 24 words, no meta description | Named contact, email, response time, links to disclosure and corrections, business details |
| Author credentials weak or inconsistent | Katarina: 2001 vs 1995, an organisation that seems not to exist, no surname, "concert pianist" in other posts. Richard: no verifiable credentials, `sameAs: []` | Fix and verify the bios. Add photos, links and real affiliations. Add `sameAs` links. |
| About page thin | 297 words, no headings, schema author mismatch | 600+ words: team, credentials, money, testing, corrections |
| Thin tag pages | /tag/books/, /tag/practice/, /tag/jazz-piano/ each have 1 post and no description | Add descriptions or merge the tags |
| Homepage trust block missing | No author or credentials strip; footer has no About/Contact | Add a "Who writes Pianoers" strip and footer links |

## Not checked (time / rate limits)
Bastien product facts (kjos.com 403), MusicNotes (403), the Jamal Yale fellowship, DownBeat HoF for the other Westinghouse alumni, Lang Lang's *Arthur* appearance, endorsements, net worth and the Piano Academy book, Playground Sessions/Quincy Jones, the Jamal hip-hop samples, and whether a consent banner loads via GTM or Claspo.
