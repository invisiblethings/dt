# Why /best-digital-piano/ is losing rankings, and what competitors do better (4 Nov 2026)

## 1. What happened

| Search (Google US) | Late Oct | Today |
|---|---|---|
| best digital piano | #1 (manual check, 29 Oct); GSC average 3.6 | Desktop: not in the top 20. Mobile: #18 |
| electric piano | #2 | **Not in the top 30** |
| site:pianoers.com | — | 134 results; posts still indexed |

So this is **not** a penalty or deindexing: the site is indexed and the page is technically fine. Two head terms fell at the same time, starting around Google's unconfirmed update of 26–27 Oct. That is the pattern of a **re-ranking of review content**, not a problem with one page. Confirm the dates in Search Console (Performance → the query → by day).

## 2. Who wins now, and why

**Top results for "best digital piano" today:**
1. Pianodreamers, "Best Beginner Digital Pianos Under $500"
2. Pianodreamers, "Best Digital Pianos with Weighted Keys (Under $1000)"
3. MusicRadar, "Best pianos 2026"
4. Pianodreamers, "Best Home Digital Pianos on a Budget"
5. Reddit
6. Pianist's Compass, "The 9 best digital pianos…"

Then come shops (Best Buy, Guitar Center), Merriam Music and Piano World. For "electric piano" the winners are Pianodreamers, azpianoreviews, then shops.

| | Pianoers | Pianist's Compass | MusicRadar | Pianodreamers (29 Oct measure) |
|---|---|---|---|---|
| Words | 5,268 | 4,303 | 4,887 | 10,000–11,000 |
| Images | 15: **makers' press photos in a Pianoers frame**, file names say "Reviewed" | 10, credited honestly ("Image by Yamaha") | 27 | 100+ of its **own** photos |
| Own videos | 0 | 0 | 1 | 9–10 of its own demos |
| Links to its own model reviews | 3 (only P-145 is a piano review) | **14** | 10 | 7–10 |
| Trust section | "How I Tested", near the end | "Why you should trust me" and "How I chose and tested", **at the top** | "How we test pianos" and "Why trust us?" | "How Did We Choose?", at the top |
| Per-model spec box | Bullet lists | "Award / Keys / Polyphony / Presets / Speakers" box under each H2 | Spec boxes, ItemList schema | Product boxes with specs and price |
| Stage pianos | None | RD-2000 EX, CP88, Nord Stage 4, Numa X | Yes ("Best stage piano") | Separate pages |
| Freshness | Updated 3 Nov | **Republished 22 Oct, updated 2 Nov** | Updated Mar 2026 | Refreshed often since 2017 |
| Schema | Article, FAQPage | Article, Person | Article, **ItemList**, FAQPage, Breadcrumb, Speakable | BlogPosting, Person |

## 3. The reasons, most important first

### 1. Google now prefers one clear intent per page, and your page tries to cover everything
Pianodreamers holds three of the top 4 spots with **separate, price-capped pages**: beginner under $500, weighted keys under $1,000, home on a budget. Google reads "best digital piano" as "which one should I buy for my budget". It's answering with focused pages.

Your page spans $500 to $5,000+, beginner to premium console. Its beginner part also duplicates your own /best-beginner-pianos/, so two of your pages compete for the same searches.

### 2. No proof that the testing happened
The page says "I tested 30+ digital pianos" and "I've physically sat down at every piano on this list". Yet the evidence a reader or a Google quality rater can see points the other way:
- **Every image is a manufacturer press photo** with a frame added, and the file names say "Reviewed".
- There's no photo or video of Katarina at any of these pianos.
- There's no detail about where, when or how long each one was played.
- Until today's fix, there were spec errors anyone can spot in seconds (the P-145's sample and voice count, the CLP-835's "wooden keys", the KDP120's "no Bluetooth").

Google's product-review guidance asks for exactly this evidence: your own photos, audio or video, and measurements. Competitors either show it (Pianodreamers) or are careful to credit press images and anchor their opinions in specific experience. Pianist's Compass, for example, compares the CLP-835 with the Yamaha B1 the author played for years.

### 3. No supporting reviews
Pianist's Compass links 14 of its own model reviews and Pianodreamers 7–10. Google sees a site that has covered each instrument in depth. You have one piano review (the P-145) behind 11 picks.

### 4. Trust comes last, not first
Every winner opens with who's writing and how the picks were chosen. Yours is near the bottom, after 4,000 words. The opening is also generic ("Smart move", "Spoiler: it won't", "the best damn piano"), with no credentials and no concrete experience.

### 5. Hard to scan, and missing what searchers want
- There's no comparison table and no spec box per model.
- The pick headings ("1. Roland FP-30X — Best for Long-Term Growth") don't match searches the way Pianodreamers' headings do ("Best Intermediate Digital Piano Under $1000 – Roland FP-30X").
- There are no stage pianos, although Pianist's Compass's #6 page leads with them.

### 6. Site authority (slow to change)
- Pianoers has 254 referring domains. Pianodreamers has 1,352 and MusicRadar 20,915.
- Your **page** has more links than the competitors' individual pages. It's the **site** that's lighter.

## 4. What to do, in order

**This week**
1. Publish the fact-corrected version (`article-corrected.html`).
2. **Make the testing claims true and visible, or soften them.**
   - If Katarina has played these pianos, say where and when ("I've taught on a CLP-835 at …", "I played the FP-90X at Guitar Center in …").
   - Add at least one real photo per model you've actually played.
   - Credit press photos as "Image: Yamaha", and rename the "…-Reviewed.jpg" files.
   - Remove "I tested 30+" from the meta description unless it's literally true.
3. Move a short **"Why trust me / how I chose"** box to the top: teaching since 2001, what you look for, and which models you've played yourself.
4. **Cut the beginner section to 3 lines plus a link to /best-beginner-pianos/** (see `best-digital-piano-edits.md`), so the two pages stop competing.

**Next 2–4 weeks**

5. Add a **comparison table** (model, price, action, speakers, best for) and a **spec box under each pick**, plus ItemList schema.
6. Rename the pick headings to match searches, e.g. "Best Digital Piano Under $1,000: Roland FP-30X", "Best Console Digital Piano Under $2,000: Kawai KDP120".
7. Add a short **stage piano** section: RD-88 or RD-2000 EX, CP73/CP88, Nord Piano 5, Numa X.

**Next 1–3 months (what keeps competitors ahead)**

8. **Model reviews behind the picks**, linked from each card. Start with the FP-30X, FP-10 and PX-S1100, then the ES920, KDP120 and CLP-835.
9. **Price-tier pages** that match how Google now answers: "best digital piano under $1,000" (forum-heavy results, so winnable) and "best console digital piano". The hub then links to them.
10. Your own **media**: a 30–60 second phone video per model you play, embedded from YouTube.
11. Links: a linkable asset such as a "digital piano action and weight chart", and outreach to teacher blogs and directories.

**What not to do:** don't change the URL, don't delete the page, and don't make daily edits. Updates often partly reverse over 1–3 weeks. Judge the changes after 4–6 weeks in Search Console.
