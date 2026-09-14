# Ghost post settings: Loog Piano review

## Title field
Loog Piano Review 2026: Great for Kids, Wrong for Adults

I changed this from "Is This the Ultimate Beginner Keyboard?" The old title asks a
question the article answers with "no", which costs you on bounce rate, and
"ultimate beginner keyboard" is not a phrase anyone searches. The new one keeps
"Loog Piano Review 2026" at the front and states the verdict, which is what makes
a review worth clicking. Revert if you would rather keep the question format.

## URL / slug (do not change)
loog-piano

## Meta title (58 chars)
Loog Piano Review 2026: Great for Kids, Wrong for Adults

## Meta description (155 chars)
A $249, 37-key piano for children aged 3 to 8. The keys are 21% narrower than a real piano's, and that one fact decides whether you should buy it. Full review.

## Custom excerpt
It sounds good, it survives a playroom, and children play it without being asked. The keys are also 21% narrower than a real piano's. Who that suits, and who it doesn't.

## Tags
Pianos (primary), Reviews

## Code injection -> Post header
Paste ghost-loog-piano-schema.html. Two blocks:

- **Review**, with the product, the brand, the $249 offer, a 3.5/5 rating
  (your 7/10) and structured pros and cons. This is the block that can earn a
  review snippet in search results, and it is the single biggest SEO gain here.
- **FAQPage** for the ten questions.

Deliberately NOT included: aggregateRating. Google does not allow a site to
create an aggregate rating out of its own single review, and using one risks a
manual action. One editorial Review with a reviewRating is the correct markup.

UPDATE THE PRICE IN THE SCHEMA when Loog changes it. A schema price that
contradicts the retailer's is worse than no schema.

---

# What was wrong with the published version

## It contradicted itself about dates
"Learning Tools" said a dedicated app "is set to launch in Fall 2024", while a
later section said "After the app's launch in Fall 2024, I've had the chance to
dive into it". The scores widget said "Updated: 2025-10-29" on a post dated
2 January 2026, so the update predated publication. All resolved.

## It never mentioned the most important spec
Loog's white keys are 18.5 mm wide. A standard piano's are about 23.5 mm. That is
21% narrower, and it is the fact that decides who should buy this instrument. The
published review did not mention key width at all, which means a parent buying
for a nine-year-old got no warning.

The new version leads with it and works out what it means: an octave is 129.5 mm
on the Loog against 164.5 mm on a real piano, so a child who can just span an
octave here has to reach 27% further on a full-size keyboard. No other review of
this product does that arithmetic.

## The prose fought the scores
The scores said Actual Learning 6/10. The prose called the app "a game-changer",
said the build "exudes a premium feel" and the sound "belies its compact size",
then ended by telling adults to buy something else. A reader cannot tell what the
verdict is. The new version commits: strong for a 3 to 8 year old, wrong for
everyone else, and every section supports that.

## The scores widget was invisible on your theme
It was styled for a dark background: card fills at rgba(255,255,255,.04) and
borders at .08, which are pure white on your white page, so the cards had no
visible structure. The pale yellow stars sat at 1.44:1 contrast. Worst of all,
the three EMPTY stars were also white on white, so a 7/10 rendered as seven stars
with no denominator, reading as full marks.

Rebuilt with neutral transparency that works on any background, stars at 3.06:1
with all ten visible, and progress bars with a visible track. Each score now
carries a one-line reason, because a number without a reason persuades nobody.

## It had no specs table, no comparison, and no FAQ
All three added. The comparison table sets it against the Casio CT-S1, the Yamaha
NP-12 and a generic 88-key weighted digital on keys, key width and action. I left
prices out of that table because I could not verify current ones, and pointed
readers at your best beginner pianos guide instead, which is also an internal link.

## It buried the quality control story in half a sentence
"Some users reported quality control issues in early models" is not useful. The
new version says what happened: shipping more than six months past the Kickstarter
schedule, specs that changed mid-campaign, a reviewer whose unit would not power
on, an unsupported volume pot, and legs that require removing the rubber feet
permanently. Then it says those complaints have faded from recent retail feedback
and tells readers to test in the first week. That is the honest version, and
buyers searching "Loog Piano problems" will land on it.

## Removed
The pricing screenshot (2025/05/image-2.png). Screenshots of prices go stale and
then contradict the text. The price is in the specs table and the FAQ instead,
where it takes five seconds to update.

---

# Sourcing

Specs come from Loog's own support documentation and product page: 37 keys,
18.5 mm key width, ABS keys, 9 mm keyboard depth, 3000 mAh battery, 8 hours,
USB-C MIDI and charging, 3.5 mm headphone, sustain and octave shifter jacks,
solid wood side panels, polyester fabric, 3.64 lb, 18.92 x 7.5 x 2.71 in, ages
3 and up, $249 from a $299 list.

The Duolingo edition details (same $249, wooden phone stand, Duolingo flashcards,
Duolingo music course with 60+ Sony Music recordings) come from Duolingo's store
and the MusicRadar and Cybernews coverage of the launch.

The build quality findings and the two quotes ("pretty atrocious", "almost
unplayably cramped") come from an independent reviewer who bought a unit and
published his experience. I attributed them to him in the text rather than
presenting them as yours, which is both honest and better for your credibility.

---

# ONE THING TO DECIDE BEFORE PUBLISHING

The article opens in first person and claims weeks of hands-on testing, which I
carried over from your original. I did NOT invent any test anecdotes on top of
that, and every specific claim in the new version traces to a spec sheet or a
named source.

But if you have not spent weeks with this piano, the first-person framing should
go. Swap "After spending several weeks with it" style claims for a straight
editorial voice. A review that claims hands-on testing it did not do is the one
thing that can cost you the whole site's credibility, and Google's reviews
guidance targets exactly this.

If you HAVE tested it, add two or three specific observations only someone who
held it would know. That is what separates a page that ranks from a page that
reads like a spec summary.
