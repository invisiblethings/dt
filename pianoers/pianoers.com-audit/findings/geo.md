# GEO / AI-Search Readiness: pianoers.com (7 Oct 2026)

## Score: 60 / 100

| Dimension | Weight | Score | Why |
|---|---|---|---|
| Citability | 25% | 55 | About 8 of the 38 posts open with a direct answer and include specific numbers and a FAQ. Most of the others start with a story or chatty intro, and very few link to their sources. |
| Structural readability | 20% | 65 | Ghost serves clean H2/H3 headings, tables and FAQ blocks. Many reviews reuse the same generic headings ("Pros", "Cons", "Bottom Line", "What Makes It Not Suck"), so a passage under one of them makes no sense when pulled out on its own. |
| Multi-modal | 15% | 55 | 16 posts have tables and some have embedded videos. 6 posts have no images (climate-control, piano-humidifier, piano-tuning, lang-lang, cole-lam, worship-music-academy). The site has no video channel of its own. |
| Authority & brand | 20% | 40 | Katarina has no surname, and her bio names an organisation that doesn't match a real one. Richard's sameAs is empty. The Organization schema has no sameAs and the site has no social profiles. Several Katarina posts make "concert pianist" claims that her bio doesn't support. Third-party mentions are few (2 Wikipedia links, 1 YouTube mention). |
| Technical accessibility | 20% | 85 | Pages are server-rendered, so the full article text is in the raw HTML. robots.txt lets every AI bot in, and all of them got HTTP 200. Weak spots: llms.txt has dead URLs and broken Markdown, the www hostname is dead, and there is no RSL licence. |

Weighted: 13.75 + 13 + 8.25 + 8 + 17 = **60**.

Platform estimates (my judgement from the on-page signals above; no live AI answers were checked): Google AI Overviews 58, ChatGPT Search 55, Perplexity 60, Bing Copilot 55. Perplexity tends to reward pages with an answer first plus a FAQ, which suits the ~8 rewritten posts. ChatGPT and Copilot depend more on third-party brand mentions, and this site has very few.

## What works

- **Server-side rendering.** Article text, headings, tables and JSON-LD are all in the raw HTML. I fetched all 38 posts with a plain HTTP client using the OAI-SearchBot user agent and every one returned 200 with the full text inside `.gh-content`. AI crawlers don't need to run JavaScript.
- **AI crawlers are not blocked.** robots.txt has only `User-agent: *` with admin and API paths disallowed. Requests sent with each AI bot's user agent all got 200. There is no CDN or WAF bot blocking (the server is Caddy).
- **llms.txt exists** (200, text/plain) and lists all 38 posts in the sitemap. None are missing.
- **The rewritten posts are strong extraction targets.** climate-control-and-your-piano, piano-basics, piano-practice, skoove-review, loog-piano, ahmad-jamal-biography and teach-yourself-piano all start with a direct, specific answer in the first 40-60 words. They have question-shaped H2/H3s, FAQ sections (9-10 Qs, with FAQPage JSON-LD) and tables.
- **Visible "Updated" dates** (`<time>` in the author box) and a dateModified that matches. 21 posts were modified in 2026.
- **Wikipedia already links to the site.** Special:LinkSearch shows "Lang Lang" linking to /lang-lang-the-biography/ and "Digital piano" linking to /acoustic-vs-digital-piano/. That is a high-trust entity signal.
- The known wrong specs are fixed in yamaha-p-145-review and best-beginner-pianos (both say CFIIIS).

## AI crawler access (robots.txt)

robots.txt names no AI bots, so every bot below is **allowed by default**. In the user-agent test each one received HTTP 200 for /best-digital-piano/.

| Bot | What it governs | Status |
|---|---|---|
| OAI-SearchBot | ChatGPT Search citations | Allowed (200) |
| ChatGPT-User | Fetches pages live when a ChatGPT user asks | Allowed (200) |
| GPTBot | OpenAI model **training** only (not ChatGPT Search) | Allowed (200) |
| Claude-SearchBot | Claude search citations | Allowed (200) |
| ClaudeBot | Anthropic **training** only | Allowed (200) |
| PerplexityBot | Perplexity search index | Allowed (200) |
| Google-Extended | Gemini/Vertex training and grounding. Has no effect on Google Search or AI Overviews, which follow Googlebot. | Allowed (no token needed; not testable by user agent) |
| Applebot-Extended | Apple Intelligence training only. Has no effect on Siri/Spotlight, which follow Applebot. | Allowed (not testable by user agent) |
| CCBot | Common Crawl (training datasets) | Allowed (200) |

Nothing here needs fixing for AI search visibility. Whether to block the training-only bots (GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended) is a business choice. Blocking them does not reduce citations in ChatGPT, Claude or Perplexity search, or in AI Overviews.

## Findings (ordered by severity)

| # | Severity | Finding | Evidence | Fix (where) |
|---|---|---|---|---|
| 1 | High | **AI-ready summaries on the money page contain wrong or contradictory facts.** These are the exact passages an AI lifts. | /best-digital-piano/: the "My Top Picks at a Glance" answer paragraph recommends the **Yamaha P-225**, and the intermediate summary names the **Kawai ES120**. Neither model is reviewed on the page; the list is FP-30X, PX-S1100, ES920, PX-S3100. The P-145BT card still says "Yamaha CFX-sampled piano voice" and "24 instrument voices" (known issue, **confirmed still live**). The section is headed "Beginners (Under $500)", but the summary says "FP-10 for best key action under $600". | Ghost Admin → Posts → Best Digital Pianos → edit. Make the two summary paragraphs name only models that are on the page, change the P-145BT card to CFIIIS / 10 voices, and use one budget band throughout. |
| 2 | High | **Persona and credential mismatch on Katarina's posts.** AI systems and Google's quality raters cross-check bylines against bios. | Katarina's bio (author box and /author/katarina/) says she is a piano teacher since 2001 with a B.A. Her posts claim more: /piano-tuning-when-and-why-its-needed/ says "performing Rachmaninoff's Piano Concerto No. 2 at Bridges Hall of Music" and "As a concert pianist". /how-to-clean-and-maintain-your-piano/ mentions "my Steinway" and "As a concert pianist". /piano-career-academy-review/ says "As a concert pianist". /pianoforall-review/ says "professional pianist who's paid my dues in conservatories and smoky jazz clubs". /piano-diy-repair-guide/ says "As a long-time pianist". | Either support these claims in the author bio (with something verifiable) or rewrite those lines in the teacher voice. Edit in each post; the bio is in Ghost Admin → Settings → Staff → Katarina. |
| 3 | High | **Weak author and organisation entity data.** | Katarina has no surname. Her JSON-LD sameAs is only onlinepianoteachers.com (I did not check whether that URL resolves). Her bio says "member of the **National Association of Music Teachers** since 1995". The US body is the Music Teachers National Association (MTNA), and joining in 1995 predates the 2001 teaching start, which reads like an error. Richard J. Abraham has `sameAs: []`. The homepage has only WebSite schema, and its Organization has no sameAs and no founder. I found no brand social profile links anywhere on the site. The /about/ JSON-LD is an `Article` authored by Katarina, while the text is written by Richard ("Hey. I'm Richard Abraham"). | Staff profiles: add a full name (or a consistent pen name), the exact organisation name, and a website or social links so Ghost outputs sameAs (Settings → Staff → each author). Site Settings → General → Social accounts: add any real profiles so Organization gets sameAs. Code injection on the About page: AboutPage + Organization schema with `founder` Richard J. Abraham, `employee` Katarina, and sameAs. |
| 4 | High | **llms.txt has 3 dead URLs (404).** | /ridley-academy-review/, /how-hard-is-it-to-learn-piano-as-an-adult/ and /stage-fright/ all return 404. | Remove them or point to live posts. The file is uploaded with the theme/static files, or via redirects if it is a routes file. Also check whether any old backlinks need 301s (Settings → Labs → Redirects). |
| 5 | Medium | **llms.txt titles are stale or wrong (19 of 41 entries differ from the live titles).** | Examples: it says "4 Best Piano Books…" but the post now has 5. Skoove, Worship Music Academy and Loog are listed as "(2025)" when live they say 2026. "Simply Piano Review: The Honest Truth…" is now "Decent Start, Expensive Habit". "HDpiano … Assesment" is a typo (also in the live title). The Best Free Apps entry says "7 Apps"; the live title is "Free & Paid". The climate-control entry still uses the old "Climate Control and Your Piano" title. The Best Beginner Pianos description is "$400 to $730" (check against the current article). | Regenerate llms.txt from the current post list. Short factual descriptions are better than generic "A review of X". |
| 6 | Medium | **llms.txt Markdown is malformed and padded.** | The Reviews and Guides sub-lists are indented 4 spaces after a heading, so CommonMark parsers read them as **code blocks**, not links. 3 lines mix in tab characters. Section 8 lists 6 raw Unsplash image URLs, which is noise. There are no facts about the authors, no affiliate disclosure, and no "best pages for X" guidance. The file sends Last-Modified: 7 Oct 2026 even though the content is stale. | Flatten to `## Section` plus `- [Title](url): one-line factual summary`. Delete the image section. Add a 3-line "About / authors / editorial and affiliate policy" block. /llms-full.txt currently 302s to the homepage; either remove that redirect or create the file. |
| 7 | Medium | **Duplicate, conflicting FAQPage schema on /yamaha-p-145-review/.** | Two FAQPage blocks are present. One asks "best … under $600 in **2025**?" and answers "Only Bluetooth audio + MIDI". The other asks the same about 2026 and says "Only Bluetooth audio". The corrected article (brief: not yet pasted live) is still pending. | When pasting the corrected article, delete the old FAQ JSON-LD from Post settings → Code injection, so only one FAQPage remains. |
| 8 | Medium | **About 20 posts are not answer-first.** The first 60 words are a story or hype, so there is nothing for an AI to quote. | Examples (intro word count): /best-digital-piano/ ("So you've decided… Smart move", 158 words before the first H2), /simply-piano-review…/ ("Let's cut the crap", 268), /pianoforall-review/ (266), /pianote-review/ (322), /piano-tuning…/ (Rachmaninoff anecdote, 249), /how-to-clean…/ (Steinway anecdote, 255), /open-studio-jazz-review/ (jam-session anecdote), /cole-lam…/ (585-word intro, only 1 H2), /how-to-tune-a-piano…/ (no intro text at all). | Add a 40-60 word answer paragraph as the first block of each post: verdict, price, who it's for, and one number. Keep the personality after it. This is the same pattern already used on Skoove and Loog. |
| 9 | Medium | **Specific claims rarely link to their sources.** | 12 posts link to no external non-affiliate source, including all 5 of the best rewrites (climate-control names "Steinway's own guidance" with no link; ahmad-jamal gives dates and sales figures with no links). /stephen-ridley/ makes serious allegations ("Fabricated Musical Prodigy", "Funneling Funds to Scientology", "Con Artist") supported only by links to Wikipedia and YouTube. | Link the named source inline (Steinway, PTG, manufacturer spec pages, price pages, news sources). For /stephen-ridley/, cite primary sources for every allegation, or soften them. AI engines avoid citing unsourced accusations, and the post carries legal risk. |
| 10 | Medium | **Generic repeated headings make passages lose their meaning when extracted.** | /best-piano-books-for-adult-beginners/ has "What Makes It Not Suck", "The Downsides…" and "Bottom Line" 5 times each. /best-free-piano-learning-apps/ has "Free vs Paid / Pros / Cons" 7 times (only 1 of 32 sections is 80-300 words). /pianoforall-review/ and /flowkey-review/ have numbered headings like "1. …" with no product name in them. | Put the product into the heading: "Faber Adult Piano Adventures: strengths", "Flowkey free vs paid". |
| 11 | Medium | **Overlapping humidity pages split the signal.** | /climate-control-and-your-piano/ (strong, answer-first, 9 FAQs), /piano-humidifier/ (1,268 words, 3 numbers, no sources, title "…Guide \| Pianoers") and /piano-dehumidifier-101…/ all target the same humidity queries. | Rewrite /piano-humidifier/ to cover only humidifier choice and link to climate-control for the ideal range. Or merge it into climate-control and 301 it. |
| 12 | Low | Stale years in titles. | /piano-career-academy-review/ "(2025)", /are-piano-keys-still-made-of-ivory/ "(2025)". | Post settings → Meta data: update the title, or drop the year. |
| 13 | Low | Review schema inconsistencies. | Synthesia's Review author is an `Organization` "Pianoers Editorial" while the byline is Katarina. Pianote and Synthesia rate out of 10; the others rate out of 5. | Use the byline Person as author and one rating scale (code injection per post). |
| 14 | Low | No RSL / AI licence file. | /license.xml and /rsl.xml return 404, and robots.txt has no License line. /.well-known/ai-catalog.json 301s to a trailing-slash URL. | Optional. Only needed if you want to state AI licensing terms. |
| 15 | Low (confirm) | Known site-wide items still open. | www.pianoers.com still gives 502 (site-level.txt). The best-beginner-pianos meta title is still missing ")" ("7 Best Beginner Keyboard & Digital Pianos (2026, Tested"). pages.json shows `has_disclosure: false` on all 38 posts (I did not verify this visually; it's for the trust/affiliate agent to confirm). | As in the earlier audits. |

## Brand mention signals

| Platform | Result |
|---|---|
| Wikipedia | **2 articles link to pianoers.com** (Special:LinkSearch): "Lang Lang" → /lang-lang-the-biography/ and "Digital piano" → /acoustic-vs-digital-piano/. There is no Wikipedia article about the brand or the authors. Note that the Digital piano citation points at a thin 681-word page that has no sources, so it is worth strengthening. |
| YouTube | Searching "pianoers.com" returns one third-party video: "Stephen Ridley and the Quick Fix Curse", Midlife Musician channel, about 1 year old, 3,874 views. Its snippet says "In the article below there is doubt cast over…", which most likely refers to /stephen-ridley/. I could not confirm the link (watch page returned 403). Searching "pianoers" returned only unrelated videos. Pianoers has no YouTube channel. YouTube mentions are the strongest correlate of AI citations, and this is the biggest gap. |
| Reddit | **Not checked.** reddit.com returned 403 and the Pullpush archive returned 429. |
| LinkedIn | **Not checked.** |
| Forums (Piano World etc.) | **Not checked.** Bing and DuckDuckGo returned bot or CAPTCHA pages. |

## Most and least likely to be cited

**Most likely (target query → why):**
1. /climate-control-and-your-piano/ → "what humidity should a piano be kept at". The first sentence answers it ("40 to 50 percent… 68 to 72°F"), there are 9 question FAQs plus tables, and it was updated Oct 2026. It would be stronger if the Steinway figure were linked to its source.
2. /piano-basics-a-beginners-guide-to-the-keyboard/ → "how many keys does a piano have / where is middle C". The definition comes first, it has 14 question headings, 5 tables and a FAQPage.
3. /skoove-review/ → "how much does Skoove cost / is Skoove worth it". Price is in the first 2 sentences (€12.49/mo, €149.99/yr), and it has a 10-question FAQ and a Review rating.
4. /loog-piano/ → "are Loog piano keys full size". It opens with "$249, 37-key… ages 3 to 8" and has specific comparisons and a FAQ.
5. /ahmad-jamal-biography/ → "who was Ahmad Jamal / real name". It opens with a definition (born Frederick Russell Jones, Pittsburgh, July 2 1930) and has a timeline and a 10-question FAQ. Lang Lang has the edge on authority because Wikipedia already cites it.

**Least likely:**
1. /how-to-tune-a-piano-a-simple-guide/: there is no text before the first heading, it mostly relies on embedded video, and it gives no steps you can extract.
2. /5-best-piano-methods-to-learn-quickly/: 0 numbers, 0 sources, written in 2022, and the intro is a question.
3. /worship-music-academy-review/: 731 words, 2 numbers, generic headings, no price or verdict up front.
4. /cole-lam-the-piano-prodigy/: one H2 and a 585-word narrative intro.
5. /piano-humidifier/: 3 numbers, no sources, and it is cannibalised by climate-control.
Also at risk: /best-digital-piano/. It is very likely to be fetched, but its summaries would make AI repeat the wrong models and specs (finding 1).

## Per-article citability scores (all 38 posts)

How I scored: answer-first intro (25), self-contained, question-shaped sections (20), specific numbers (15), linked sources (15), FAQ/tables (10), freshness and accuracy (15). Wc = words, Q = question-shaped headings / total H2+H3, Ext = external non-affiliate domains linked.

| # | Post | Author | Wc | Q/H | Ext | FAQ | Score | Main gap |
|---|---|---|---|---|---|---|---|---|
| 1 | climate-control-and-your-piano | Katarina | 1956 | 16/24 | 0 | Yes (no schema) | 88 | Sources named but not linked. No FAQPage schema. No images. |
| 2 | piano-basics-a-beginners-guide-to-the-keyboard | Katarina | 2848 | 14/24 | 0 | Yes | 86 | No sources |
| 3 | ahmad-jamal-biography | Katarina | 2982 | 13/28 | 0 | Yes | 85 | Dates and figures unsourced |
| 4 | piano-practice-4-tips-to-successful-sessions | Katarina | 2646 | 16/36 | 1 | Yes | 84 | Practice-time claims unsourced |
| 5 | skoove-review | Katarina | 1947 | 16/20 | 0 | Yes | 84 | No link to the pricing page |
| 6 | loog-piano | Katarina | 1879 | 13/21 | 0 | Yes | 84 | No links to spec or Kickstarter sources |
| 7 | teach-yourself-piano | Katarina | 2027 | 1/22 | 3 | No | 74 | Step headings aren't questions. No FAQ. |
| 8 | best-beginner-pianos | Katarina | 4074 | 2/16 | 0 | Yes | 72 | Answer is in an H2, but the intro starts with chatty filler. Title missing ")". |
| 9 | yamaha-p-145-review | Richard | 1267 | 8/15 | 1 | Yes | 70 | Duplicate, conflicting FAQPage. Corrected version not live. |
| 10 | best-piano-lessons-online | Katarina | 2205 | 8/20 | 9 | Yes | 70 | Intro isn't answer-first |
| 11 | best-digital-piano | Katarina (+Richard) | 5189 | 2/21 | 2 | Yes | 58 | Wrong specs and P-225/ES120 in the summaries. Chatty intro. |
| 12 | pianovision-review | Katarina | 1517 | 4/11 | 2 | No | 58 | Definition only arrives in sentence 3 |
| 13 | simply-piano-review-… | Richard (+Katarina) | 1739 | 8/18 | 1 | No | 55 | 268-word chatty intro. No FAQ. |
| 14 | best-piano-books-for-adult-beginners | Richard (+Katarina) | 2179 | 8/34 | 2 | Yes | 55 | Repeated generic headings. Chatty intro. |
| 15 | acoustic-vs-digital-piano | Katarina | 681 | 2/7 | 0 | No | 55 | Thin and unsourced, though Wikipedia cites it |
| 16 | lang-lang-the-biography | Katarina | 1528 | 0/10 | 7 | No | 55 | No question headings or FAQ. No images. |
| 17 | piano-with-jonny-review | Katarina | 729 | 4/8 | 1 | No | 55 | Short. No up-front verdict line. |
| 18 | pianote-review | Katarina | 1331 | 2/9 | 5 | No | 50 | 322-word intro. No FAQ. |
| 19 | best-free-piano-learning-apps | Richard | 1114 | 3/32 | 7 | No | 50 | Pros/Cons headings ×7, so passages don't stand alone |
| 20 | piano-dehumidifier-101-why-it-is-important | Katarina | 983 | 6/20 | 4 | No | 50 | Chatty intro. Thin sections. |
| 21 | are-piano-keys-still-made-of-ivory | Katarina | 740 | 2/6 | 0 | No | 50 | Answer not first. "(2025)". Ban dates unsourced. |
| 22 | pianoforall-review | Katarina | 2605 | 4/26 | 1 | No | 45 | Chatty intro. Unsupported "professional pianist" claim. |
| 23 | synthesia-piano-review | Katarina | 886 | 2/15 | 2 | No | 45 | Chatty intro. Schema author mismatch. |
| 24 | flowkey-review | Katarina | 1155 | 6/24 | 0 | No | 45 | Intro has no answer. Generic numbered headings. |
| 25 | hdpiano-review | Katarina | 997 | 9/17 | 1 | No | 45 | "Assesment" typo. No price up front. |
| 26 | piano-tuning-when-and-why-its-needed | Katarina | 1954 | 2/19 | 4 | No | 45 | Anecdote intro. Unsupported concert-pianist claim. No images. |
| 27 | how-to-clean-and-maintain-your-piano | Katarina | 1957 | 1/25 | 5 | No | 40 | Anecdote intro. Unsupported "my Steinway" claim. |
| 28 | piano-career-academy-review | Katarina | 1872 | 1/16 | 3 | No | 40 | "(2025)". 2 numbers. Unsupported persona claim. |
| 29 | stephen-ridley | Katarina | 1209 | 0/5 | 2 | No | 35 | Allegations with few sources. No answer-first summary. |
| 30 | open-studio-jazz-review | Richard | 868 | 2/7 | 2 | No | 35 | Anecdote intro. No price or verdict up front. |
| 31 | piano-diy-repair-guide | Katarina | 1872 | 2/12 | 1 | No | 35 | Jokey headings. 2 numbers. |
| 32 | how-the-piano-works | Katarina | 1019 | 2/3 | 1 | No | 35 | 3 headings. 483-word block. |
| 33 | piano-humidifier | Katarina | 1268 | 6/8 | 1 | No | 30 | Cannibalised by climate-control. 3 numbers. |
| 34 | worship-music-academy-review | Katarina | 731 | 0/9 | 1 | No | 30 | Thin. No verdict or price up front. |
| 35 | cole-lam-the-piano-prodigy | Katarina | 760 | 0/1 | 5 | No | 30 | 1 heading. Narrative only. |
| 36 | 5-best-piano-methods-to-learn-quickly | Katarina | 1036 | 2/9 | 0 | No | 30 | 0 numbers. 0 sources. |
| 37 | bastien-piano-method-is-it-the-right-one-for-you | Katarina | 975 | 1/3 | 0 | No | 30 | 3 headings. 0 numbers. |
| 38 | how-to-tune-a-piano-a-simple-guide | Katarina | 1480 | 4/5 | 2 | No | 25 | No intro text. Relies on video. |

Average: about 51.

## Top 5 highest-impact changes

1. **Fix the best-digital-piano summaries and specs** (finding 1). About 30 min. This stops AI repeating errors from the site's main commercial page.
2. **Add a 40-60 word answer-first block plus a short FAQ** to the 10 commercial reviews that lack one (Simply Piano, Pianoforall, Pianote, Flowkey, HDpiano, Synthesia, PianoVision, Piano With Jonny, Open Studio, Worship). About 20-30 min each.
3. **Fix the author entities** (finding 3, plus the persona claims in finding 2): surname or consistent pen name, the correct MTNA name, sameAs links, About page schema, Organization sameAs. About 1-2 hours, mostly in Settings → Staff and code injection.
4. **Rebuild llms.txt** (findings 4-6): remove 3 dead URLs, use current titles, fix the indentation, drop the image list, add an authors/policy block. About 30 min.
5. **Build off-site mentions**: start a YouTube channel (short P-145 / app demos that link back), and answer questions on r/piano and Piano World with links to the strong guides. Also add linked sources to the pages Wikipedia already cites (Lang Lang, acoustic-vs-digital). Ongoing; the first steps take 1-2 days.

## Not checked

Reddit, LinkedIn and forum mentions (blocked). Live answers from ChatGPT, Perplexity or AI Overviews (no DataForSEO tools). Whether onlinepianoteachers.com/teachers/p/katarina resolves. A visual check of the affiliate disclosure. Content accuracy of individual reviews beyond the items listed above.
