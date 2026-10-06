# Fixes for pianoers.com/best-beginner-pianos/

Ghost can't be edited from this repo, so every fix below is something to paste or apply in Ghost Admin.
Work top to bottom. Each step says where in Ghost it goes.
Search the editor for the **Find** text (Ctrl/Cmd+F) and replace it with the **Replace with** text.

Items marked **VERIFY** are specs I believe are wrong but couldn't confirm against a manufacturer page. Check them before publishing.
Items marked **YOU WRITE** need first-hand details only the author has. I've given a structure, not invented facts.

---

## 1. Mark affiliate links as sponsored (audit #1)

Ghost's native button card can't carry a `rel` attribute, so swap each one for an HTML card.

- Under each of the 7 product headings, delete the **Current Price on Amazon** button card.
- Insert an HTML card (`/html`) in the same spot and paste the matching block from `affiliate-buttons.html`.
  Every link keeps the same `amzn.to` URL and gains `rel="sponsored nofollow noopener"`.

If you'd rather keep the native buttons, paste `code-injection-footer.html` into **Post settings → Code injection → Post footer**. It adds the same `rel` with JavaScript. That's a weaker fix, so only use it as a fallback.

## 2. Move the affiliate disclosure above the first link (audit #2)

Add a new paragraph directly after the intro paragraph that ends "…won't kill your budget." and before the "How to Choose…" heading. Italic matches the existing footer line.

> *Heads-up: some links on this page are Amazon affiliate links. If you buy through one, we may earn a small commission at no extra cost to you. It never decides which pianos make this list.*

Keep the Amazon Associates sentence at the bottom too. Amazon requires that exact wording somewhere on the page.

## 3. Fix the FP-10 / FP-30X key-action contradiction (audit #3)

Section **6. Roland FP-30X**, first paragraph.

**Find:**
> The PHA-4 Standard key action with escapement and Ivory Feel keytops is a *massive* step up from anything else on this list. You actually feel a subtle "click" when you press the keys. That's the escapement mechanism mimicking what happens inside a grand piano.

**Replace with:**
> It uses the same PHA-4 Standard action as the FP-10 (escapement, Ivory Feel keytops), so you're not paying extra for better keys. You're paying for everything around them: Bluetooth audio, 256-note polyphony, 56 voices and much bigger speakers. That escapement, by the way, is the subtle "click" you feel when you press a key. It mimics what happens inside a grand piano.

## 4. Use one budget range everywhere (audit #4)

**a) Buying guide**, the "Budget sweet spot" paragraph. Keep the bold label bold.

**Find:**
> **Budget sweet spot: $400–$700.** Under $400, you're making real compromises on key feel. Over $700, you're into intermediate territory (which is great if you can swing it, but not necessary to start).

**Replace with:**
> **Budget sweet spot: $350–$500.** That's where you get fully weighted keys and a good piano sound. Below about $350, you're making real compromises on key feel. From $500 to $750 you're paying for extras like Bluetooth audio and better speakers (great if you can swing it, but not necessary to start). Spending more than that? See my [best digital pianos](https://pianoers.com/best-digital-piano/) guide.

That last sentence also adds the missing in-body link to `/best-digital-piano/` (audit #8).

**b) FAQ, visible answer** to "How much should a beginner spend on a digital piano?"

**Find:**
> $400 to $500 is the sweet spot for most beginners. That gets you a solid instrument with fully weighted keys and good sound. If you can stretch to $700, the Roland FP-30X is a fantastic long-term investment. Under $350, the Alesis Recital Pro is your best bet.

**Replace with:**
> $350 to $500 covers most beginners. That gets you fully weighted keys and a good piano sound. Under $350 you start compromising on key feel, and the Alesis Recital Pro is about as low as I'd go. If you can stretch to around $700, the Roland FP-30X adds Bluetooth audio, better speakers and more voices on the same keys as the Roland FP-10.

**c) FAQ schema.** Replace the contents of the HTML card holding the FAQPage JSON-LD (just above the visible FAQ) with `faq-schema.html`. Only the first answer changed, so schema and page text stay in sync.

## 5. Back up the "tested" claim (audit #5) — YOU WRITE

Add a short H2 section right after the comparison table, before "1. Yamaha P-145BT". Fill the brackets with real details and delete any line you can't back up.

> ## How I Tested These Pianos
>
> I'm Katarina, a piano teacher with [X] years of teaching experience ([link to your onlinepianoteachers.com profile]). I played every piano on this list [where: at home / in-store at ___ / students' instruments] between [month] and [month] 2026.
>
> For each one I:
> - played the same pieces ([e.g. a Czerny étude, a pop ballad, scales]) to compare key feel and repetition speed
> - listened through the built-in speakers and through headphones
> - connected it to Simply Piano and Flowkey to check app setup
> - [anything else you actually did]
>
> [One sentence on what you weighted most, e.g. "Key feel counted most, then piano tone, then price."]

Then add at least one real photo of you playing one of these pianos (ideally one per pick). The current images are product renders, and the featured image looks AI-generated. Neither shows hands-on use.

Also fill in **Staff → Katarina → Bio** with your teaching credentials. Ghost shows it in the author box and author page.

## 6. Bridge "keyboard" vs "digital piano" in the intro (audit #6)

Add one sentence at the end of the intro paragraph that ends "…won't kill your budget.":

> Quick note on wording: lots of people search for a "keyboard piano," but what a beginner really wants is a digital piano, meaning a keyboard with 88 fully weighted keys. Every pick below is one.

## 7. Make the title and H1 match, and fix the meta (audit #7, #12)

| Ghost field | Set to |
|---|---|
| Post title (this is the H1) | `7 Best Beginner Keyboard Pianos in 2026 🎹 (Tested & Ranked)` |
| Post settings → Meta data → Meta title | `7 Best Beginner Keyboard Pianos in 2026 (Tested & Ranked)` (no emoji) |
| Post settings → Meta data → Meta description | `I've played every piano on this list. My 7 beginner picks from $350 to $730, with specs, pros, cons and honest opinions on each.` |
| Post settings → Excerpt | Same text as the meta description. Ghost puts the excerpt into the Article schema `description`, which right now is the first paragraph of the intro. |

Change "I've played every piano on this list" only if it stops being true. The old wording ("I tested every major beginner keyboard piano") claimed more than the page shows.

## 8. Trim duplicate internal links (audit #9)

Keep the **first** link to each of these, in the "App connectivity" paragraph of the buying guide, and remove the link (keep the text) from every later mention:

- **Simply Piano**: unlink in Korg B2 ("Why I Recommend It"), Roland FP-30X ("Connect to Simply Piano or Flowkey…") and Bonus tip 4.
- **Flowkey**: unlink in the same three places.

That takes each from 4 links to 1. Bonus tip 4's link to Pianoforall stays.

## 9. Show an update date and re-check prices (audit #10)

- Re-check every price and stock note, especially "Sweetwater has already delisted the B2."
- Add a line directly under the H1 / byline (first line of the post body):

> *Last updated [Month Day, 2026]. Prices checked [Month Day, 2026].*

Publishing the edits also bumps `dateModified` in the schema automatically.

## 10. Spec corrections (audit #11) — VERIFY first

| Section | Find | Replace with | Source to check |
|---|---|---|---|
| 1. Yamaha P-145BT → What It Has | `24 instrument voices` | `10 instrument voices` | Yamaha P-145 spec page (24 is the P-225's count) |
| 4. Roland FP-10 → What It Has | `31 lbs` | `27 lbs` | Roland FP-10 spec page (about 12.3 kg). Leave the FP-30X's 31 lbs as is. |

Also confirm the model name **P-145BT** and the claim that the ES60 is **Kawai's first ever sub-$500 digital piano** on Yamaha's and Kawai's own sites.

## 11. Comparison table: add Weight and a price date (audit #15)

Replace the contents of the comparison-table HTML card with `comparison-table.html`. Fill in the date in the caption. The FP-10 weight there already uses the corrected 27 lbs, so change it back if step 10 doesn't check out.

## 12. ItemList schema (audit #12)

Paste `code-injection-header.html` into **Post settings → Code injection → Post header**. It lists the 7 ranked pianos in order, each pointing to its section anchor (`#1-yamaha-p-145bt` and so on). If you rename a product heading, Ghost changes its anchor, so update the matching `url` here too.

## 13. Social share image (audit #13)

Upload `best-beginner-piano-social-1200x630.jpg` (the current featured image centred on a blurred fill, 1200×630) under **Post settings → X card** and **Facebook card**. The featured image itself can stay portrait.

## 14. Alt text (audit #14)

Replace the 7 product image alt texts with the ones in `alt-text.md`.

---

## Not covered here

- **New single reviews** for the FP-10, ES60, FP-30X and so on (audit #9). That's new content, so link each from its section once it's live.
- **Overlap with `/best-digital-piano/`** (audit #8). Step 4a adds the link. Also check that page's title and intro target "best digital piano" broadly, not beginners.
