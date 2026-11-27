# Black Friday piano deals: publishing notes

**New page** (Pages → New page). URL slug: `black-friday-piano-deals`. The slug has no year, so you can update the same page next November and keep its rankings.

| Field | Value |
|---|---|
| Page title | Black Friday Piano Deals 2026: Up to 25% Off Roland, Kawai & More |
| Meta title (54 chars) | Black Friday Piano Deals: Up to 25% Off Roland & Kawai |
| Meta description (155 chars) | 🔥 Up to 25% off the digital pianos a piano teacher actually recommends: Roland FP-10 24% off, Kawai ES60 25% off. Picked and checked. Ends Cyber Monday. |
| Excerpt | Up to 25% off the digital pianos a piano teacher recommends: Roland FP-10 24% off, Kawai ES60 25% off, Alesis Recital Pro MKII 19% off. |
| Author | Katarina |
| Feature image | `black-friday-piano-deals-featured.webp`. It's used for search and share previews only (see step 3). Alt: Black Friday piano deals 2026 |
| Facebook / X image | `black-friday-piano-deals-social.webp` |
| Code injection → Page header | `code-injection-header.html` (ItemList of the 6 pianos + FAQPage, 7 questions, matching the visible FAQ word for word) |

## How to publish
1. **Images:** upload the 3 images from `black-friday-piano-deals-images.zip` this month.
2. **Content:** paste `article.html` into **one** HTML card. It contains:
   - the dark hero, with the page's H1, a live countdown to the end of Cyber Monday and two buttons
   - the affiliate disclosure (pages don't show the theme's automatic one)
   - the deal checker
   - the piano finder
   - the target price table
   - the 6 verdict cards
   - the checklist, the FAQ and the small scripts that run the countdown and checker
3. **Page settings → turn OFF "Show title and feature image".** The hero already has the title. Leaving it on shows the title twice.
4. Fill in the meta and social fields, paste the code injection and publish.
5. Install theme **1.7.6**, so the site banner links here until Cyber Monday ends.
6. Request indexing in Search Console straight away.

## Discounts (checked November 27)
The page shows **percentages only, no dollar prices**. It covers all **14 digital pianos** your site recommends, grouped by budget, with a switcher under the hero.

| Budget | On sale | No deal |
|---|---|---|
| Under $500 | Kawai ES60 −25%, Roland FP-10 −24%, Donner DEP-20 −22%, Alesis Recital Pro MKII −19%, Yamaha P-45 −11% | Yamaha P-145BT |
| Under $1,000 | Casio PX-S1100 −18%, Yamaha P-225 −16% | Roland FP-30X, Kawai ES120 |
| $1,000 and up | (none) | Kawai ES920, Roland FP-90X, Kawai KDP120, Yamaha CLP-835 |

- **Full verdict cards:** the 4 teacher picks on sale (FP-10, ES60, Alesis MKII, PX-S1100).
- **Compact cards:** the other 10. Each has a "Get the deal" button (on sale) or "View on Amazon" (no deal), plus a link to its review or its section in Best Digital Pianos.
- **Left out:** Kawai CN301 and Yamaha CLP-885 (no Amazon link yet), the Korg B2 (sold out) and the Loog (kids).

**Keep it accurate:** check the discounts daily until Cyber Monday, and send me changes; the percentages live in `all.json`. Amazon expects price and discount claims to be current.

## Links in
- **Homepage:** a card or link near the top until Cyber Monday.
- **/best-beginner-pianos/:** one line under the quick answer, "Shopping this weekend? See this year's **Black Friday piano deals**."
- **/yamaha-p-145-review/, /roland-fp-10-review/, /alesis-recital-pro-review/:** "Black Friday price check: see what counts as a good deal."

## After Cyber Monday
The countdown switches to "Deals have ended" on its own. Change the title to "Best Time to Buy a Digital Piano (and What's a Good Price)" and the hero line to match. The deal checker and target prices stay useful all year, and you can switch the title back next November.
