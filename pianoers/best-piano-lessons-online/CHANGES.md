# Fix kit: pianoers.com/best-piano-lessons-online/

Work through this in order. Each step says where in Ghost it goes. Everything was tested on the local copy of the site first, never on the live one.

**Placeholders:** none left. The only open items are the decisions in Step 6.

## What changed and why

- **New: a course-finder quiz** right under the Quick answer. Seven questions; each answer is a piano key that plays a note, and the result arrives with a chord. The result shows why the course fits, a "Watch out" line, every course's score as bars, a "$49 option" panel for Pianoforall (or the runner-up when Pianoforall wins) and a **12-month cost race** built from verified prices. It's favorable to Pianoforall in the open: a 1-point head start and the tie-break, stated above the quiz. Pianoforall wins 45% of all answer combinations; all 8 courses can win. Details and the reason it isn't higher: `QUIZ.md`.
- **New: a 30-second chord taste** right before Pianoforall's card: the reader plays C, E, G and hears the chord. It's labelled as a taste of the chord-first idea, not Pianoforall's own lesson.
- **Every wrong price fixed** from vendor pages (Skoove $12.49, Pianote now Musora at $30/$279, Flowkey $24.99/$149.99, Piano by Pictures $49 after the free month). Simply Piano ($17.90/mo or $169.90/yr; Family $23.90/mo or $209.90/yr) and Playground Sessions ($19.99/mo or $149.99/yr, first year often $99.99; lifetime $219.99 to $349.99) use the prices you supplied on 12 Oct 2026. All 30 changes with sources: `SOURCES.md`.
- **Ratings removed.** The round-up said Simply 4.7, Skoove 4.0, Pianote 3.9, Flowkey 3.8; the reviews say 3.5/5, 7/10, 7.5/10 and 4.2/5, and Pianoforall's review has no number. No single number could be defended on every page, so each course now has a "best for" label and a one-line **Verdict** instead, and the page carries no Review/rating schema. **Katarina must confirm this choice** (and the order of the 8, which is unchanged).
- **Labels that contradicted the reviews are fixed:** Simply Piano "Best for kids and game-style practice" (its review calls it weak value for adults), Skoove "Best for instant note feedback on a budget" (it can't judge technique), Pianote "Best video-lesson library" (no note detection; the "submit a recording" claim couldn't be confirmed, so it's gone).
- **Top of the page:** "Last updated / prices checked" line, a disclosure naming the affiliate links (above the first link), and a Quick answer naming Pianoforall first with its honest catch and the alternatives.
- **Comparison table** now has Price model, Free trial, Feedback and Best for, with the prices-checked date. Course names jump to the cards.
- **8 verdict cards** (price, trial, format, feedback, works with, What I like / Drawbacks in Katarina's own words, verdict, button). Affiliate buttons (Pianoforall, Simply Piano, Piano Marvel, Piano by Pictures) carry `rel="sponsored nofollow noopener"`; the other four link to the vendor with `rel="noopener noreferrer"`.
- **"How I Evaluated These"** keeps the seven criteria and now states exactly what each recommendation rests on: full reviews of five courses (linked), and for Piano Marvel, Playground Sessions and Piano by Pictures a plain note that the details come from each company's own pages. It makes no claims about hours or dates.
- **88-key advice:** the Starter pack and FAQ now say an 88-key weighted digital piano, matching the best beginner pianos guide.
- **Internal links added:** the Skoove, Pianote, Flowkey, Pianoforall and Simply Piano reviews, HDpiano, Piano Career Academy, Stephen Ridley, best free piano apps, best piano books, teach yourself piano, best beginner pianos, Yamaha P-145, and (new closing line) Open Studio, Piano With Jonny and Worship Music Academy.
- **FAQ** cost answer corrected; FAQ schema now matches the visible FAQ word for word.
- **Only tracking added:** if Google Tag Manager is on the page, the quiz sends `quiz_complete` (which course won) and `quiz_cta_click` to `dataLayer`. No personal data. Nothing else is sent anywhere.

## Step 1. Update the theme to 1.2.0 (2 minutes)

Ghost Admin > Settings > Design & branding > Customize > Change theme > Upload theme > `/home/user/dt/pianoers/theme/pianoers.zip` > Activate. Without 1.2.0 the quiz and chord taste show only their plain fallback. It passes gscan (compatible with Ghost 6.x, no errors or warnings). The other pages are unchanged; I checked the homepage and /best-beginner-pianos/ (finder, contents list, buy bar).

## Step 2. Replace the article body

1. Open the post in the editor. Select all the body content and delete it.
2. Open `article-revised.html` in a browser, copy everything between the two COPY markers, paste.
3. If a block didn't come across (the quiz, the chord taste, the table or a verdict card), insert an HTML card (`/html`) in its place and paste the matching file from `cards/`: `00` Quick answer, `01` quiz, `02` table, `03` chord taste, `04`–`11` the eight cards. Each course's text paragraphs go right below its card.
4. Keep the Playground Sessions YouTube embed (it's inside the Playground text).

## Step 3. Post settings

Use `meta.md` for the meta title (55 characters), meta description (148), excerpt, tags (add `#affiliate`) and the 1200 × 630 share-image brief. The `#affiliate` tag shows the theme's general disclosure under the title; the specific "Which links pay us" line in the body names the partners, so keep both.

## Step 4. Code injection (Post settings > Code injection > Post header)

Delete the old ItemList script there (it put Product, Review and price data on affiliate redirect URLs). Also make sure the old FAQ schema HTML card at the end of the body is gone (Step 2 removes it). Then paste `code-injection-header.html`: a plain ItemList pointing at the course cards, and the FAQPage.

## Step 5. Alt text and images

All alt text is in the cards already; the How to Choose image's alt text is in `alt-text.md`, with the list of images worth compressing or replacing.

## Step 6. Decisions only you can make

- Confirm the "no ratings" decision and the order of the 8.
- Confirm you're happy with the `headStart` of 1 (see `QUIZ.md`).
- Count the Pianoforall eBooks in your copy once: the article says ten, taken from the site's own reviews.
- Ask Piano by Pictures for an evergreen landing URL for `/pbp` (the audit found it lands on a "bfcm-recovery" funnel page).
- Optional: if you have dated screenshots or hours logged for any course, add one line to the "How I Evaluated These" list. The H1 says "Tested by a Teacher"; if you'd rather not claim testing for the three courses without a full review, use "Picked by a Teacher" (the meta title already does).

## Step 7. Check after publishing

1. Open the page on a phone: answer the quiz; the result, score bars and cost race appear, and the buy bar switches to your match.
2. Reload: the quiz says "Welcome back".
3. Search the editor for `⟦`: none should be there.
4. Test the structured data at https://search.google.com/test/rich-results : ItemList and FAQPage, no errors.
5. Search Console > URL Inspection > Request indexing.
6. Every 3 months: re-check prices, update the date line, the table caption and `pricesChecked` in the quiz.

## Files

| File | What it is |
|---|---|
| `article-revised.html` | Full body, ready to paste |
| `cards/` | Each HTML card on its own |
| `QUIZ.md`, `quiz-data.json`, `quiz-simulate.py` | How the quiz scores, the win-rate tables, the data and the simulator |
| `SOURCES.md` | Every changed fact, old and new, with source and Verified / Not checked |
| `FACTS.md` | The fact-checker's full notes |
| `meta.md`, `code-injection-header.html`, `alt-text.md` | Post settings, schema, alt text |
| `preview/` | Screenshots from the local site: quiz question, result and cost race on desktop and phone (light and dark), chord taste |
