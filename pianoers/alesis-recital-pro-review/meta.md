# Alesis Recital Pro MKII review: publishing notes

**New post.** URL slug: `alesis-recital-pro-review`. The slug drops "MKII" on purpose: "alesis recital pro review" is what people search for, and the page covers both models.

| Field | Value |
|---|---|
| Post title (H1) | Alesis Recital Pro MKII Review (2026): Good Enough for $350? |
| Meta title (55 chars) | Alesis Recital Pro MKII Review: Good Enough for $350? |
| Meta description (155 chars) | I bought the Alesis Recital Pro MKII and played it for two months. The keys, the sound, the pedal, how it compares with the P-145BT, and who should buy it. |
| Excerpt | 88 weighted keys and a pedal for about $350. My honest Recital Pro MKII review after two months: not a great piano, but fair value for occasional players. |
| Tags | Pianos (primary), and the internal tag `#affiliate` |
| Author | Richard J. Abraham |
| Feature image | `alesis-recital-pro-mkii-review-featured.webp`. Alt: Alesis Recital Pro MKII review, an 88-key digital piano with a 3.4 out of 5 score |
| Facebook / X image | `alesis-recital-pro-mkii-review-social.webp` |
| Code injection → Post header | paste `code-injection-header.html`: Product + Review schema (3.4/5, Richard as author) and FAQPage (9 questions, matching the visible FAQ word for word) |

## Before you publish: 2 things only you can do
1. **Your Amazon link.** Both buttons point to `https://www.amazon.com/dp/B0G2YQP8KL`, the MKII's Amazon page, with **no affiliate tag**. Get your link for the MKII from SiteStripe and replace it in `article.html` (it appears twice). Your current Alesis link (`link.amazon/B01br0vWw`, used in the best-beginner-pianos guide) goes to the original model, not the MKII.
2. **Check the hands-on lines.** The article is written from your two months with the piano and your verdict: *not that good, but enough for the price for someone who doesn't care about sound and plays rarely*. These sentences describe how it plays. They match what other owners and reviewers report, but please read them and change anything that doesn't match your piano:
   - Keys: "light and a bit springy", "I struggle to feel much difference from one end to the other" (the grading), soft playing is harder to control.
   - Sound: German Grand "doesn't change as much" between soft and loud, "a bit flat and electronic" with the pedal down, speakers "a little boxy" when turned up but no distortion, better through headphones.
   - Pedal: "light, slides across the floor".
   - Verdict: "Two months in, nothing has broken", "light enough that I move it around the house".

## How to publish
1. **Images:** upload the 7 images from `alesis-recital-pro-review-images.zip` this month, so they live under `/content/images/2026/11/`. Five appear in the article; the featured and social images go in post settings.
2. **Article:** paste `article.html` into **one** HTML card. The verdict card turns on the sticky buy bar and the theme's "My verdict" box at the top.
3. Fill in the post settings above, paste the code injection, and publish.
4. **Request indexing** in Search Console.

## Strongly recommended: your own photos and a short video
Right now every image is a graphic. You own the piano, so 3 or 4 phone photos would make this the most convincing Recital Pro MKII review online. Google and AI answers favor visible proof of hands-on testing.
- The piano in your room, wide shot (also a better featured image).
- The keys close up, at an angle.
- The control panel.
- The included footswitch pedal next to your foot or a ruler.

I found **no YouTube video of the MKII**, only of the original Recital Pro, so the article has no video. A 30 to 60 second clip of you playing it would be unique. Upload it to YouTube and embed it after "How it sounds".

## Links in (add after publishing)
- **/best-beginner-pianos/**: the "Best on a budget" pick is the *original* Recital Pro (about $300, 128-note polyphony, its own Amazon link). Two options:
  - Keep it, and add "Read my full Alesis Recital Pro MKII review" under the card. The card already mentions the MKII.
  - Or switch the pick to the MKII (about $350, 64 polyphony, pedal included, 23 lb). It's the current model, and the original is being phased out (Sweetwater has stopped selling it). I can update that card if you want.
- **/yamaha-p-145-review/**: one line in the Downsides or Verdict section, for example "On a tighter budget? See my Alesis Recital Pro MKII review."
- **/best-digital-piano/**: wherever budget pianos under $400 are mentioned.

## Sources checked
- Alesis Recital Pro MKII product page and tech specs (alesis.com)
- Alesis support FAQ for the Recital Pro MKII: pedal in the box, 6 AA batteries, weight, the list of 25 sounds, graded action, headphone notes
- Owner and reviewer comments on the original Recital Pro (Pianote, Piano Dreamers, Sound & Signal, retailer reviews): light, springy keys, little grading, average piano sound
- Piano Chronicles' budget guide, which lists the MKII with the same specs
