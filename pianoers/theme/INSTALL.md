# Pianoers theme: install and use

`pianoers.zip` is the theme. It's built on Ghost's Headline theme code and tested on Ghost 6.67. It passes gscan, Ghost's official theme checker, with no errors or warnings.

## What it changes

- **New design.** Your teal and amber, new fonts (hosted by the theme, not Google), a sticky header with a "Find your piano" button, and an optional dark mode.
- **Trust strip** under every post title: author, a one-line bio, the "Updated" date and reading time.
- **Contents list** built automatically from each post's H2 headings: a sidebar on desktop, a collapsible "On this page" box on phones.
- **Piano finder, verdict cards and Quick answer block** for buying guides, added with HTML cards (see "Writing buying guides").
- **Buy bar.** On posts with verdict cards, a slim bar keeps the top pick's button in reach once the reader scrolls past it. If the reader uses the finder, it shows their match instead.
- **Affiliate safety.** Every link to a domain in the "Affiliate domains" setting gets `rel="sponsored nofollow noopener"` automatically.
- **SEO built in:**
  - breadcrumbs with BreadcrumbList structured data
  - an automatic ItemList for pages with verdict cards
  - one H1 per page
  - a fixed image frame on every featured image, so the page doesn't jump
  - WebP images
  - a "load first" hint on the featured image
  - comments that load only when the reader scrolls near them
- **Featured images of any shape** sit whole inside a 16:9 frame on a soft blurred copy of themselves. Landscape images fill the frame. Nothing gets cropped.

Kept from your current setup: navigation, members and newsletter sign-up, Portal, search, comments, tag and author pages, pagination, all Ghost cards, the `custom-full-feature-image` template (5 posts use it), and your `llms.txt`, with its beginner-pianos entry corrected.

## New in 1.1: engagement features

| Feature | Where | What it does |
|---|---|---|
| Playable piano | Homepage hero, 404 page | Two octaves (one on phones) with a synthesized piano tone, amber key glow and floating notes. On computers, keys A–K play it too. |
| "Name that note" ear trainer | Homepage (and any post via snippet) | Plays a note, the reader taps the key. Streak and best score are saved in their browser. Black keys join after 5 in a row, then a message links to your lessons guide. |
| Singing finder | Buying guides | Each finder key plays a note, and the match arrives with a chord and a burst of notes. |
| Reading-progress keyboard | Top of every post | A row of piano keys under the header fills with amber as the reader scrolls. The contents list shows "N min left". |
| Continue reading | Homepage, posts | Returning readers get "Continue reading: …" on the homepage and "Pick up where you left off" on the post itself. |
| Read badges | All article cards | "42% read" or "Read ✓" on cards the reader has already opened. |
| Sortable tables | Any table in a post | Tap a column heading to sort by price, weight, polyphony and so on. |
| Share | Trust strip and after the article | Opens the phone's share sheet; on computers it copies the link. |
| Motion | Site-wide | Sections ease in as they scroll into view, and buttons press like keys. |

**Guardrails:**
- **Sound** plays only after the reader taps or presses a key, never on its own. Every piano has a "Sound on/off" switch, and the choice is remembered.
- **Motion** is skipped for anyone who has "reduce motion" turned on in their system.
- **No layout shift:** all of these features measure 0.
- **Privacy:** reading history and scores stay in the reader's own browser; nothing is sent anywhere.

New theme settings:
- **Site-wide:** Enable piano sounds, Enable animations.
- **Homepage:** Homepage ear game, Ear game link.
- **Post:** Show reading progress.

All are on by default.

To add the ear trainer to a post, use `snippets/ear-trainer.html`. It works like the other snippets.

## Before you install

1. **Back up:** Ghost Admin → **Settings → Advanced → Import/Export → Export**. Keep the file.
2. **Leave Headline installed.** Installing a new theme doesn't delete it, and it's your one-click way back.

## Install (about 2 minutes)

1. Ghost Admin → **Settings → Design & branding → Customize**, then **Change theme** (bottom left).
2. Click **Upload theme** and choose `pianoers.zip`.
3. Click **Activate**.

**To go back:** same screen, choose **Headline**, then **Activate**.

## Theme settings

In **Settings → Design & branding → Customize**, the **Site-wide**, **Homepage** and **Post** tabs have these settings:

| Setting | Default | Notes |
|---|---|---|
| Color scheme | Light | "Auto" follows the reader's phone or computer setting; "Dark" is always dark |
| Dark mode logo | — | Upload a light-coloured logo for dark mode. Without one, the theme brightens your normal logo. |
| Header button text / URL | Find your piano → `/best-beginner-pianos/#finder` | Clear the text to hide the button |
| Email signup title / text | Get beginner piano tips by email… | Shown in the footer and under posts, to non-members only |
| Footer text | — | Replaces "Pianoers.com © 2026" |
| Homepage heading | Honest piano advice from a real teacher | |
| Homepage sections | `pianos, courses, care` | Tag slugs, comma-separated, in order |
| Affiliate disclosure | Some links on this page are affiliate links… | Shown under the title of posts tagged `#affiliate` |
| Affiliate domains | `amzn.to, amazon.com` | Add other stores you earn from, e.g. `sweetwater.com` |
| Table of contents / Sticky buy bar / Author box / Related posts | On | |

**Internal tags** (type them in a post's Tags field, including the `#`):
- `#affiliate` shows the disclosure line under the title. If you use it, delete any disclosure paragraph inside the post, so it isn't there twice.
- `#verified` adds a "Specs checked with manufacturers" chip to the trust strip.

## Five-minute check after activating

Open each of these on your phone and on a computer:

1. **Homepage:** the hero, "Start here" (your 3 featured posts), Latest, and the Pianos / Courses / Care sections.
2. **/best-beginner-pianos/:** the trust strip, the contents list, and the buy bar after scrolling past pick #1.
3. **A full-image post,** e.g. /piano-diy-repair-guide/, with its image spanning the full width.
4. **/tag/pianos/** and **/author/katarina/.**
5. **Search, Sign in, Subscribe,** and comments at the bottom of a post.

## Update the beginner-pianos article to the new cards

The article works as it is, but switching it to the cards turns on the finder, the verdict cards and the buy bar. The ready-made cards are in `content/best-beginner-pianos-cards/`. They're built from your live article and keep your wording and corrected facts.

1. **Quick answer.** Delete the 🎹 "Quick answer" callout. In its place, type `/html` and paste `00-quick-answer.html`.
2. **Finder.** Right below it, add another HTML card with `01-piano-finder.html`.
3. **Each of the 7 products.** Delete these, in order:
   1. the "N. Name" heading
   2. the 💬 quote
   3. the "Verdict:" paragraph
   4. the product image
   5. the "Current Price on Amazon" button

   Insert one HTML card with the matching file (`02-…` for #1 through `08-…` for #7). Leave "Why I Recommend It", "What It Has", "Best For", "Downsides?" and "My Take" as they are, below the card.
4. **Post settings → Code injection:**
   - **Post header:** delete the whole `<style>…</style>` block and the `BreadcrumbList` script, because the theme now handles both. Keep the `ItemList` and `Person` scripts.
   - **Post footer:** delete the script, because the theme now adds `rel="sponsored"` itself.
5. Click **Update**.

**Check the "Why it's here / Watch out for" points.** I wrote them by condensing Katarina's own text from each section. She should still read them and adjust anything that isn't how she'd put it.

**Product images** in the cards use your existing uploads; Ghost serves them as small WebP files automatically. You no longer need to upload the WebP files from the earlier kit.

`content/best-beginner-pianos.html` is the whole article with the cards in place, if you'd rather paste everything at once.

## Writing buying guides with the snippets

Save each file in `snippets/` as a Ghost snippet once, then reuse it in any post:

1. In any draft, type `/html` and paste the snippet file's contents.
2. Hover the card, click the **snippet** icon (the bookmark in the card toolbar) and name it, e.g. "Pianoers: verdict card".
3. From then on, type `/` plus the snippet name in any post to insert it, and edit the text.

| Snippet | Use |
|---|---|
| `quick-answer.html` | 2–3 sentence answer near the top of a guide |
| `pick-card.html` | One per product. Give each a unique `id` and its `data-rank`. |
| `piano-finder.html` | Optional. Map each answer combination to a card `id` (instructions are inside the file). |
| `ear-trainer.html` | The "Name that note" game, for lesson or practice posts |

## Measured results (local copy of your site, same content, same scripts)

| Lighthouse | Headline (current) | Pianoers theme |
|---|---|---|
| Desktop performance | 76 | **95** |
| Desktop layout shift | 0.331 (poor) | **0.014** (good) |
| Phone performance | 38–48 | **50** |
| Accessibility | 91 | **100** |
| SEO | 100 | 100 |

Every page type was also checked in a browser at phone and desktop widths: no sideways scrolling, one H1 per page, no images without alt text, and no script errors from the theme.

**About the phone score:** most of what's left is JavaScript the theme doesn't control: Ghost's own Portal (members) and search apps, plus the Google Tag Manager and Claspo scripts in **Settings → Code injection → Site header**. In the actual phone trace, the article title renders after about 1.3 seconds; Lighthouse's lower score comes from its simulation charging those scripts to page load. Options to consider:
- remove Claspo if its pop-ups aren't earning their keep
- trim GTM to the tags you actually use

Real-visitor numbers (Core Web Vitals) appear in Search Console about four weeks after launch.

## Folder contents

| Path | What it is |
|---|---|
| `pianoers.zip` | The theme to upload |
| `pianoers/` | The theme's source, for future edits (re-zip the folder contents to upload changes) |
| `content/` | The converted beginner-pianos article and its cards |
| `snippets/` | Reusable Quick answer, verdict card and finder snippets |
| `design-preview-template.html` | The approved design preview |

## Changelog

- **1.1.0** (6 Oct 2026). Engagement features: playable piano, ear trainer, singing finder, reading-progress keyboard, Continue reading and resume, read badges, sortable tables, share buttons, scroll reveal and key-press buttons. Five new settings. Measured locally: layout shift 0 on all 18 page and device checks; Lighthouse desktop performance 100 (was 95); accessibility and SEO still 100.

- **1.0.1** (6 Oct 2026). Fixed the font preload: the fonts were being downloaded twice, and the late second copy made text jump on slow connections (live About page on phones: layout shift 0.278). Each font now downloads once, early. Also added size-matched fallback fonts, so text keeps its place while fonts load. Measured: layout shift 0 on About, beginner-pianos, tag and full-width pages, even with slowed requests.
- **1.0.0** (6 Oct 2026). First release.
