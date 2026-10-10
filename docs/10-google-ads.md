# Google Ads launch plan

Everything here is ready to import with **Google Ads Editor** (free desktop app). Files are in `docs/google-ads/` and are generated and length-checked by `python3 scripts/build-google-ads.py`. Edit the script, not the CSVs, then re-run it.

| File | What it holds |
|---|---|
| `campaigns.csv` | 3 Search campaigns, daily budgets, created **paused** |
| `ads.csv` | 9 responsive search ads (15 headlines, 4 descriptions each) |
| `keywords.csv` | 56 keywords × exact and phrase match = 112 |
| `negative-keywords.csv` | Searches to block (free, pdf, kids, jobs, piano for sale…) |
| `assets.csv` | Sitelinks, callouts, structured snippets, price assets |

## 1. Read this first: two checks before spending money

**Can you bid on "Pianoforall"?** The brand campaign bids on the name "Pianoforall" and uses it in ads. That's fine for the brand owner. If you sell through the `drilonnn` affiliate account, ClickBank vendors usually forbid affiliates from bidding on their brand name, and Google can disapprove ads that use a trademark without permission. The site's own affiliate page (`/affiliate-program`) says not to do it. **Only enable "Search - Brand" if you own Pianoforall or have Robin Hall's written OK.** The other two campaigns don't use the brand name.

**Does the maths work?** At $49 a sale, you earn about **$27 per sale as an affiliate** (60% commission after ClickBank fees, per the affiliate program page) or about **$40+ as the vendor**. That is your maximum cost per sale. Example: if 2% of ad visitors buy, you break even at about $0.54 per click as an affiliate. Clicks for "learn piano online" in the US often cost more than $1. So:
- start small ($30/day total) and measure before scaling;
- lean on cheaper, specific searches (older beginners, play by ear, Moonlight Sonata, no subscription) over broad ones;
- pause anything that spends 3× your target cost per sale without a sale.

## 2. Account setup (one time, ~30 minutes)

1. Create a Google Ads account at ads.google.com. Choose **Expert mode** and skip the guided "Smart" campaign. (Look for "Switch to Expert Mode" or "Create an account without a campaign".)
2. **Billing country/currency:** USD keeps the numbers in this plan correct.
3. **Create the conversion action** (Goals → Conversions → New → Website):
   - Name: `Checkout click`
   - Category: **Begin checkout**
   - Value: "Use different values for each conversion" (the site sends $49, $79 or $99)
   - Count: **One**
   - Click-through window: 30 days
   - Choose **"Install the tag yourself"**. Copy the **conversion ID** (`AW-…`) and **conversion label**.
4. Paste both into `src/data/site.ts`:
   ```ts
   export const ADS = {
     googleAdsId: 'AW-123456789',
     checkoutConversionLabel: 'AbC-D_efG-h12_34-567',
   };
   ```
   Commit and deploy. The site then loads the Google tag and sends a conversion (with the right price) each time someone clicks a buy button. With the fields empty, nothing loads.
5. **Sales, not just checkout clicks:** many people who click Buy don't complete the order. In your ClickBank account, look for the tracking-pixel / integrations settings and add a Google Ads purchase conversion if it's offered. Name it `Purchase`, set it as the **primary** goal, and set `Checkout click` to **secondary**. Until that's set up, optimise on checkout clicks.
6. **Privacy policy:** add one line saying the site uses Google Ads conversion tracking. Update `src/data/legal-privacy.html`.
7. **Link Google Ads to Search Console** (Tools → Linked accounts) to see paid and organic search side by side.

## 3. Import the campaigns

1. Install Google Ads Editor, sign in, and download your account.
2. Account → Import → From file. Import in this order: `campaigns.csv`, `ads.csv`, `keywords.csv`, `negative-keywords.csv`. Editor maps the columns automatically; check the preview.
3. Add the assets from `assets.csv` at account level (Shared library → Assets). Add the logo `public/brand/icon-512.png`, plus 2–3 images from `public/og/` as image assets.
4. Set the campaign settings below, review, then **Post**. Everything arrives paused, so you can check it in the web interface before turning it on.

## 4. Campaign settings

| Setting | Value |
|---|---|
| Campaign type | Search only. **Turn off the Display Network and Search Partners** for now. |
| Locations | United States, Canada, Australia, New Zealand. Choose **"Presence: people in or regularly in"** (not "interest in"). |
| Why not the UK and EU at launch | Ads tracking there legally needs a cookie-consent banner (Consent Mode). Add it before targeting those countries. |
| Language | English |
| Budgets | Core $20/day, Classics By Ear $5/day, Brand $5/day (only if allowed, see §1) |
| Bidding, weeks 1–3 | **Maximize clicks** with a maximum cost per click of **$1.20** (Core), **$0.80** (Classics), **$0.60** (Brand) |
| Bidding, after ~30 conversions | **Maximize conversion value**, then add a target ROAS once you know which products sell |
| Ad rotation | Optimize |
| Schedule | All day. Review by hour after 4 weeks. |
| Audiences | Add as **Observation** only: "Music lovers", "Hobbies & leisure", age 35–65+. Don't restrict yet. |

## 5. Structure

| Campaign | Ad group | Landing page | Example keywords |
|---|---|---|---|
| Search - Core | Learn Piano Online | `/` | [learn piano online], "online piano lessons" |
| | Adult Beginners | `/course` | [piano lessons for adults], "learn piano as an adult" |
| | Play By Ear & Chords | `/how-it-works` | [learn to play piano by ear], "learn piano chords" |
| | Older Beginners | `/am-i-too-old-to-learn-piano` | [piano lessons for seniors], "learn piano at 60" |
| | No Subscription | `/pricing` | [piano course no subscription], "piano lessons one time payment" |
| Search - Classics By Ear | Moonlight Sonata | `/classics-by-ear/moonlight-sonata` | [learn moonlight sonata], "moonlight sonata piano lessons" |
| | Satie Gnossiennes | `/classics-by-ear/erik-satie-gnossiennes` | [learn gnossienne no 1] |
| | Bach Preludes | `/classics-by-ear/bach-preludes` | [learn bach prelude in c major] |
| Search - Brand *(see §1)* | Pianoforall | `/` | [pianoforall], "pianoforall review" |

Exact and phrase match only. Broad match spends fast without conversion data; try it later in a separate test with smart bidding.

## 6. Ad copy rules (Google policy and honesty)

Every claim in the ads also appears on the landing page: $49 one-time, 60-day refund, 568 lessons, 25 hours, Robin Hall, 53,000+ ratings at 4.7/5. Keep it that way. Don't add:
- "Free" or "free lessons": they're switched off on the site.
- "Best", "#1", "fastest", or "learn piano in X days": these are unverifiable, and Google may limit or disapprove the ads.
- Fake urgency or sale prices ("was $79", "today only").
- Competitor names (Simply Piano, flowkey) in ad text: that's a trademark issue.

## 7. Before you switch on

- [ ] Conversion ID and label are in `site.ts` and deployed. On the live site, click a buy button, then check the conversion action's status in Google Ads ("Recording conversions" appears within a few hours).
- [ ] Brand campaign enabled only if allowed (§1).
- [ ] Display Network and Search Partners off.
- [ ] Locations set to "presence".
- [ ] Negative keywords imported in all three campaigns.
- [ ] Assets attached.
- [ ] Billing set up.

## 8. First 6 weeks

| When | Do |
|---|---|
| Days 1–3 | Check every day that ads are approved and spending, and that conversions are recording. |
| Weekly | **Search terms report:** add irrelevant searches as negatives, and add good converting searches as exact keywords. This is the most valuable 15 minutes of the week. |
| Weekly | Pause keywords that spent 3× your target cost per sale (about $80 as an affiliate) without a conversion. |
| Week 2 | Check the RSA "Asset details": replace headlines rated "Low" after 2,000+ impressions. |
| Week 3–4 | After ~30 conversions, switch to Maximize conversion value. Move budget to the best ad group. |
| Week 4+ | Test: Core landing page `/course` vs `/` for "Learn Piano Online". Consider a YouTube campaign using the trailer and sample lesson. Add UK/EU with a consent banner. |

## 9. Later ideas
- **Remarketing:** show ads to visitors who viewed `/pricing` but didn't buy. This needs a consent banner for the UK/EU and a remarketing audience in Google Ads.
- **Competitor campaign:** bid on "simply piano alternative" and "piano app without subscription", and send visitors to `/compare`. Don't use competitor names in the ad text.
- **Free backing tracks as an entry point:** a small campaign on "piano backing tracks" to `/learn/piano-backing-tracks` is cheap and builds an audience, but expect fewer direct sales.
