# Black Friday piano deals: publishing notes

**New page** (Pages → New page). URL slug: `black-friday-piano-deals`. The slug has no year, so you can update the same page next November and keep its rankings.

| Field | Value |
|---|---|
| Page title | Black Friday Piano Deals 2026: 6 Digital Pianos Worth Buying |
| Meta title (55 chars) | Black Friday Piano Deals 2026: 6 Pianos Worth Buying |
| Meta description (152 chars) | The 6 digital pianos a piano teacher recommends this Black Friday, the price that makes each a real deal, and a quick checker for today's price. |
| Excerpt | Six tested digital pianos, the price that makes each one a real deal, and a deal checker that tells you if today's price is worth it. |
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

## Amazon prices
As I understand Amazon's Associates Program Policies, you can't type Amazon prices or discounts ("‑24%", "$419.99") into your site by hand. Prices may only appear if they come from Amazon's Product Advertising API, refreshed at least every 24 hours, with a timestamp and Amazon's price disclaimer. Check the current wording in Associates Central under **Program Policies** and **Operating Agreement** before you add any.

So this page shows no Amazon prices. Instead:
- **"Deal if under":** your own target price for each piano, which is editorial advice, not an Amazon price.
- **The deal checker:** readers type in the price they see on Amazon and get a verdict.
- **Buttons:** every card's button opens the live Amazon price.

Your checks today: FP-10 $419, Kawai ES60 $449, Alesis MKII $285 and Casio PX-S1100 $599 are all under target, so they're real deals. Yamaha P-145BT $499 and Roland FP-30X $799 are over target. I raised the FP-30X target from $620 to $700 to match today's market.

**Your other guides:** cards like "Street price about $500, checked Oct 6" on /best-beginner-pianos/ are a grey area under the same rule. The safest wording is the maker's list price (e.g. "List price $499.99") or no price at all.

## Links in
- **Homepage:** a card or link near the top until Cyber Monday.
- **/best-beginner-pianos/:** one line under the quick answer, "Shopping this weekend? See this year's **Black Friday piano deals**."
- **/yamaha-p-145-review/, /roland-fp-10-review/, /alesis-recital-pro-review/:** "Black Friday price check: see what counts as a good deal."

## After Cyber Monday
The countdown switches to "Deals have ended" on its own. Change the title to "Best Time to Buy a Digital Piano (and What's a Good Price)" and the hero line to match. The deal checker and target prices stay useful all year, and you can switch the title back next November.
