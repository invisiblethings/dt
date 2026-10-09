# Content quality: pianos and piano care (group 1), pianoers.com, 7 Oct 2026

Scope: 14 posts (2 audited earlier, status check only). Data: `crawl/pages.json` (text, headings, dates, author, links, `has_disclosure`) and `crawl/links.json`. Fact checks used manufacturer spec pages (Yamaha USA, Roland US, Kawai US/global), Amazon US product pages (prices seen 7 Oct 2026, Dallas delivery location), Guitar Center, PTG, Steinway, EPA, AAAAI, Loog and Wikipedia. Casio, Sweetwater, Dampp-Chaser (pianolifesaver.com) and Mayo Clinic blocked automated fetches, so checks that needed them are marked **Not checked**. I stopped early at the coordinator's request, so some checks are still open.

## Category score: 46 / 100

The newest pages are good: Loog, the climate-control rewrite and the two pages audited earlier. The older care guides (2022–2024) pull the average down. They have clear factual errors, AI-sounding filler, H3-only outlines, and a "concert pianist" persona that doesn't match the author bio.

## What works

- **/loog-piano/** and **/climate-control-and-your-piano/** are model pages. They open with a direct answer, give specific numbers that check out against sources, use clean H2/H3 outlines, have question-style FAQs, and show a "last checked" date (Loog).
- **/best-digital-piano/** has real structure (H2 per budget, H3 per product, "How I tested", FAQ, FAQPage schema). Most Roland and Kawai ES920 specs are right.
- Most care posts link to the Piano Technicians Guild (PTG) technician finder, which is a good trust signal.
- Katarina's author page lists real credentials: teaching since 2001 and a B.A. in Music (University of Missouri).

## Findings by severity

| Sev | Finding | Evidence | Fix (where) |
|---|---|---|---|
| Critical | **Wrong and unsafe how-to instructions** | /how-to-tune-a-piano-a-simple-guide/: "To tighten the string, turn the tuning pin counterclockwise… To loosen it, turn the tuning pin clockwise." /piano-diy-repair-guide/: "If you suspect a foreign object, gently tilt the piano". Tilting a 400–1,000 lb piano can crush someone. | Rewrite or unpublish the tuning post (see per-URL notes). Delete the tilt advice and replace it with: "Remove the bottom board or fallboard and look with a torch; if you can't reach it, call a technician." Do this in Ghost post editor. |
| Critical | **Ivory post is mostly false** | /are-piano-keys-still-made-of-ivory/: says Cristofori's piano "had a plectrum that plucked a string" (it used hammers; that was the whole invention), says "Jean Henri Pape invented the double-escapement action" (it was Sébastien Érard, patent 1821), and says "CITES banned the use of ivory in pianos in 1989". | Full rewrite (see per-URL notes). Until then, consider setting it to draft. |
| High | **Author persona conflicts with author bio** | Katarina's author page and /about/ say piano teacher since 2001. Three posts by Katarina claim to be a touring concert pianist: "As a concert pianist, my piano is tuned before every performance" (tuning post), "a pro pianist's survival guide" (DIY), "the first time I laid eyes on my Steinway… across the concert hall stage" (cleaning). The Rachmaninoff 2 story has a technician tuning "during intermission" in the middle of a concerto, which is implausible. | Remove the concert-pianist anecdotes, or replace them with true teacher experience (studio piano, student homes). Fabricated experience is the worst E-E-A-T signal a site can send. Edit in each post. |
| High | **Spec and price errors on the money page /best-digital-piano/** | See the fact-check table: CLP-835 does not have wooden keys or 2-way speakers; CLP-885 weight, wattage and price are wrong; KDP120 does have Bluetooth and a recorder; ES60 and ES920 prices are wrong; Sweetwater "no tax" is out of date. | Correct each line (see per-URL notes). |
| High | **Affiliate disclosure missing or too late** | `has_disclosure` is false on all 14 posts. /best-digital-piano/ has 10 amzn.to links and only an Amazon Associates sentence at the very bottom. /yamaha-p-145-review/ has 2 amzn.to links and no disclosure anywhere. | Add the internal tag `#affiliate` in Post settings → Tags on both. The theme then shows the disclosure under the title, which the FTC wants placed before the links. |
| High | **Thin, AI-padded humidifier page with an unsafe health claim** | /piano-humidifier/: "Humidifiers can be useful for people who have asthma, as they can help to relieve the symptoms of asthma and reduce the number of flare-ups." AAAAI says humidifier dust and mold "may cause more harm than good" for people with indoor allergies, and EPA warns about microorganisms and minerals from ultrasonic and impeller units. Two paragraphs are repeated word for word. | Merge into /climate-control-and-your-piano/ and 301-redirect (Settings → Labs → Redirects), or rewrite (see per-URL notes). |
| High | **"How the piano works" has mechanics errors** | "the whippen moves down, which pushes the jack down" (it is lifted up: Wikipedia, Piano action). "The action of a piano is actually two actions, one for each half of the keyboard. Each half of the keyboard has 88 keys". "When each part of the action is precisely adjusted, the piano will be in tune" (that is regulation; tuning is separate). | Rewrite the "Pressing a Key" section. |
| Medium | **H3-only outlines (same problem as the old P-145)** | H1 followed straight by H3s, with no H2: /acoustic-vs-digital-piano/ (7 × H3), /are-piano-keys-still-made-of-ivory/ (6 × H3), /how-the-piano-works/ (3 × H3). H3 before the first H2: /piano-humidifier/, /how-to-tune-a-piano-a-simple-guide/, /piano-diy-repair-guide/. Empty headings: /piano-dehumidifier-101…/ has 3 empty H3s; /piano-diy-repair-guide/ has an H3 that is just "...". Emoji headings ("✅ If using…"). | In the editor, turn the top-level sections into H2 (toolbar "H" button) and delete the empty headings. |
| Medium | **Outdated years** | Ivory title and description say "(2025)". Dehumidifier post embeds a bookmark card "Best Beginner Pianos🎹 in 2025". /yamaha-p-145-review/ meta description says "2 years of daily use" while the H2 says "Three Years". | Update the title, meta description and bookmark card (post settings → Meta data). |
| Medium | **Missing meta descriptions** | /acoustic-vs-digital-piano/ and /how-to-tune-a-piano-a-simple-guide/: `desc` is None. | Add them in Post settings → Meta data. |
| Medium | **Contradictory numbers across care posts** | String count: "around 200" (how-it-works), "roughly 230" (tuning-when), "about 250" (how-to-tune). Dampp-Chaser cost: "$50-$400 on a proper dehumidifier" (dehumidifier post) vs "$650 to $900 installed" (climate post). | Standardise: about 220–240 strings. Quote the Dampp-Chaser price the same way everywhere. |
| Medium | **Heavy AI-typical phrasing** | Tuning post: "a symphony of chaos… a harmonious melody of advantages", "sonic splendor", "a testament to". DIY post: "a fascinating symphony of wood, metal, and felt". Cleaning post: "a lifetime of sound". Humidifier post: generic buyer checklist unrelated to pianos. | Cut the flourishes and replace them with specifics (numbers, costs, what a technician actually does). |
| Low | Embedded "Best Beginner Pianos 2025" bookmark card in the dehumidifier post; unlinked "Piano Tuning Video" recommendation in the tuning post (looks like a leftover affiliate) | page text | Remove or update. |

## Per-post notes

### /yamaha-p-145-review/: 78/100 (already audited; status check)
- **Status:** the corrected article is now live (modified 7 Oct 2026 09:30). It has the H2 outline, no battery claim, CFIIIS, and "Three Years".
- **Still open:**
  1. No affiliate disclosure (2 amzn.to links, `has_disclosure` false). Add tag `#affiliate`.
  2. The meta description still says "Hands-on review after 2 years of daily use". Change it to "three years".

### /best-beginner-pianos/: 82/100 (already audited; status check)
- The rewritten version is live (H2 per product; the in-text "Heads-up: some links on this page are Amazon affiliate links" is present).
- **Still open, as the brief says:**
  1. The meta title "7 Best Beginner Keyboard & Digital Pianos (2026, Tested" is missing ")".
  2. The meta description still says "$350".
  3. Portrait share image.
- Also: `has_disclosure` is false. Add `#affiliate` so the theme line shows as well.

### /best-digital-piano/: 55/100
- **E-E-A-T:**
  - The byline is Katarina, but the post also appears on Richard's author page, and the voice ("I've spent the last few years…", "I tested 30+ digital pianos") doesn't say whose tests these were.
  - 30+ tested but only 11 listed.
  - No photos of the writer with the instruments.
  - The "How I tested" section is good but has no dates.
- **Top fixes:**
  1. CLP-835: "The GrandTouch-S keyboard has long, wooden keys" and "88 keys with GrandTouch-S action (wooden keys)". Yamaha's spec table shows wooden keys only on the CLP-845 and up; the CLP-835 has "GrandTouch-S keyboard: synthetic ebony and ivory key tops, escapement". Also "Powerful 2-way speaker system (30W + 30W)" should be "30 W × 2, one 16 cm speaker with diffuser per side".
  2. CLP-885:
     - "6-speaker system with diffusers (300W total)" should be "(45 W + 30 W + 40 W) × 2 = 230 W".
     - "it weighs around 168 lbs" should be "87 kg / 191 lb (polished 198 lb)".
     - "You're looking at $5,000+" should be "about $7,500 (Guitar Center $7,499.99 black; polished up to $8,999.99)".
     - "plus a collection of historical pianos and fortepianos" isn't in Yamaha's spec table (Not checked in detail; remove unless confirmed).
  3. KDP120: "No Bluetooth. The feature set is intentionally minimal: no recorder, no split/layer modes". Kawai's specs list Bluetooth MIDI (Ver. 4.1), a 3-song recorder, Dual and Four Hands. Rewrite the Downsides line. ("192-note polyphony" is correct. "20W speakers" is correct; Kawai says 40 W total.)
  4. Prices:
     - Kawai ES60 "You're getting that sound in a $499 piano": Kawai MSRP is $599; Amazon showed $449 on 7 Oct 2026.
     - ES920 "typically around $1,950": MSRP $1,799; Amazon $1,549.
     - FP-30X "around $695": Amazon $649.99.
     - The H2 "Best Digital Pianos for Beginners (Under $500)" vs the intro "Roland FP-10 for best key action under $600".
     - Use ranges plus "price checked [month]" everywhere.
  5. Disclosure: add tag `#affiliate`. Move the Amazon Associates sentence to the top.
- **Smaller fixes:**
  - The intro and "Intermediate" summary recommend the "Yamaha P-225" and "Kawai ES120", which have no review section. Add them or remove them.
  - "Sweetwater… no tax in most states". Sweetwater collects sales tax in most states since the 2018 Wayfair ruling (Not checked against Sweetwater: their help page returned 403). Delete the claim.
  - Casio PX-S3100 "Mic input with vocal effects": Not checked (Casio blocked). The Amazon listing mentions no mic input. Confirm or remove.
  - Casio Bluetooth on both PX-S models comes via the included WU-BT10 adapter (Amazon listing). Say so.
  - FP-10 "Bluetooth MIDI (via Roland Piano Partner app)": Roland now names the Roland Piano App. Update.
  - Kawai ES60 "the new kid… sounds like a $250,000 concert grand": the price figure is unsourced. Drop it.
- **Headings:** fine (H2 per tier, H3 per product). Numbering restarts at "1." in each tier, which is fine.

### /loog-piano/: 88/100
- **E-E-A-T:** cites an independent reviewer and Loog's own demo, and has "Last checked September 2026". It's not clear whether the writer handled a unit. Add one sentence about hands-on time, or say plainly that it wasn't tested.
- **Verified against loogguitars.com:** $249 (regular $299), 37 keys, 18.5 mm white keys, 3.64 lb / 1.65 kg, 18.92 × 7.5 × 2.71 in, 8 h battery. "21% narrower" is correct (18.5 vs 23.5 mm) and "27% further" is correct.
- **Not checked:** 3000 mAh, the 2024 Good Design Award, and the Duolingo/Sony "60 recordings" claim.
- **Fixes:**
  1. The H3 "Loog Piano review scores" sits before the first H2. Make it H2.
  2. No affiliate links, so no disclosure is needed.
  3. Add internal links to /acoustic-vs-digital-piano/ and /best-digital-piano/.

### /acoustic-vs-digital-piano/: 50/100
- **E-E-A-T:** "I've taught hundreds of students" fits Katarina's bio. Good voice. No sources at all, and the post is only 681 words for a core comparison topic.
- **Fixes:**
  1. Headings: all 7 sections are H3 with no H2. Make them H2.
  2. Add a meta description (none set).
  3. "Top actions (Roland PHA-50, Yamaha NWX, Kawai GFIII) are indistinguishable from most uprights in blind tests". There is no source, so cut "in blind tests". Also check the action names: Yamaha's current flagship digital action is GrandTouch (Not checked for NWX).
  4. "Digital piano = modern weighted 88-key instrument that samples acoustic pianos" contradicts /best-digital-piano/, which says Roland models rather than samples. Change it to "samples or models".
  5. "Keyboard = 61 semi-weighted keys" should be "usually 61 unweighted (synth-action) keys".
- **Not checked:** tuning costs "$150–$250 every 6 months" and moving cost "$300–$800". Add a source or a "typical US prices, 2026" note. The post was last modified Mar 2026 and has no year in the title, which is fine.

### /climate-control-and-your-piano/: 85/100
- **The best care page.** Specific, consistent, FAQ-led.
- **Verified:** PTG says "optimally at a temperature of 68 degrees F and 42 percent relative humidity" (ptg.org/ptgmain/piano/care/servicing), which matches "in-piano climate systems hold 42 percent" and the 68–72°F advice.
- **Not checked:** "Steinway's own guidance allows… 40 to 60 percent and 68 to 78°F" (the Steinway care page wasn't found) and the Dampp-Chaser costs "$650 to $900 installed" (site blocked).
- **Fixes:**
  1. "Steinway recommends two to four tunings a year for a piano played about an hour a day". The Steinway text quoted on PTG's page says "at least three or four times a year". Change it to match, and link the source.
  2. Link Steinway and PTG directly where they're cited. There are currently no outbound source links.
  3. Add Article `dateModified` visibility ("Updated October 2026") near the top.
- **Headings:** fine.

### /piano-dehumidifier-101-why-it-is-important/: 50/100
- **E-E-A-T:** no first-hand experience. The product types are generic. The "TheSpruce" source link returns 402.
- **Fixes:**
  1. Delete the 3 empty H3s, and turn the "✅ If using…" H3s into bold text.
  2. "Pianos are 80-90% wood" has no source and is unlikely by weight (the cast-iron plate is a large share of the weight). Change it to "Most of a piano's working parts are wood and felt".
  3. "spending $50-$400 on a proper dehumidifier is a no-brainer" conflicts with the Dampp-Chaser "$650 to $900 installed" on the climate post. Give separate ranges for room units, rods and Dampp-Chaser.
  4. "Whether you've got a grand, upright, or digital piano… a piano dehumidifier isn't optional. It's essential" overstates the case for digital pianos and contradicts the climate post's FAQ. Soften it.
  5. Replace the "Best Beginner Pianos🎹 in 2025" bookmark card.
- **Not checked:** "Refill the water tank every 1-2 weeks" (Dampp-Chaser site blocked).

### /piano-humidifier/: 30/100
- **E-E-A-T:** one real experience line ("I used to teach for our local chain of piano stores… master technician… 45%"). The rest is generic humidifier copy and health claims.
- **Fixes:**
  1. Remove the asthma and allergy paragraph ("Humidifiers can be useful for people who have asthma…"). AAAAI: "if you have indoor allergies, dust and mold from the humidifier may cause more harm than good". Add EPA's advice instead: use distilled water and clean every third day (epa.gov/indoor-air-quality-iaq/use-and-care-home-humidifiers).
  2. Delete the duplicated paragraph "The type of humidifier you use will depend on the severity of dry air…" (it appears twice).
  3. "my house can go as low as 20% relative humidity - that's half of what's recommended!" 20% is less than half of 45%. Change it to "less than half".
  4. Headings: H1, then 2 H3s before the first H2. "Humidifiers will also help you!" is off-topic.
  5. Better option: merge into /climate-control-and-your-piano/ and redirect, because the two pages compete for "piano humidity". Also: "pinboard" should be "pinblock". The Venta claim "you won't have filters to change" is Not checked.

### /piano-tuning-when-and-why-its-needed/: 45/100
- **E-E-A-T:** the concert story is likely fabricated (see the High finding). Last modified Apr 2025.
- **Verified:**
  - "tune a new piano four times within the first year": the NPMA recommendation, quoted on PTG's servicing page.
  - "at least twice a year": Baldwin, Kawai, Pearl River and Samick minimums on the same PTG page.
- **Fixes:**
  1. Remove or rewrite the opening anecdote ("performing Rachmaninoff's Piano Concerto No. 2 at Bridges Hall of Music… A quick touch-up by the piano technician during intermission… the second half of the concerto"). A concerto has no mid-piece intermission.
  2. "Conversely, as the temperature drops, the frame contracts, potentially causing the pitch to rise." This reverses the main mechanism; humidity drives seasonal drift (see the climate post). Replace it with the climate post's explanation and link it.
  3. "Visual Cues… If the tuning pins… appear loose" isn't something an owner can see. Change it to "a note that won't stay in tune after tuning, or a broken string".
  4. Cut the filler sections ("A Symphony of Clarity", the conclusion) by about 40%, and add a cost range and how long a tuning takes.
  5. Correct the meta description: it says "explained by an accomplished concert pianist", which doesn't match the author bio.
- **"over 20 tons":** Wikipedia (Piano) says tension "can exceed 20 tons… for a modern grand", so the wording is fine.

### /how-to-tune-a-piano-a-simple-guide/: 20/100
- **E-E-A-T:** none. The text reads as machine-generated (the "demagnetized tuning lever" camps, the "string cutter… cut the strings to about half of the string's length"). Last modified Jun 2024.
- **Fixes (or unpublish and redirect to /piano-tuning-when-and-why-its-needed/):**
  1. "To tighten the string, turn the tuning pin counterclockwise… To loosen it, turn the tuning pin clockwise." This is reversed: clockwise raises tension on standard pianos. **Wrong**, from my own knowledge; I didn't fetch a source in this run.
  2. Delete the whole string-cutter and "demagnetized tuning lever" passages. Tuners don't cut strings to tune, and these "two camps" don't exist. Wikipedia (Piano tuning) lists the tools as tuning lever, mutes, and a tuning fork or electronic tuning device.
  3. "If you want to tune a piano without tools, you need a tuning lever" contradicts itself, and "you can buy one for about $10 or rent one for a day for about $5" is not credible. The H2 "How to Tune a Piano without Tools" should go.
  4. The electronic tuner paragraph ("consists of a pick, a pair of electronic ears, a speaker, and a computer") is nonsense. Replace it with "a tuning app or strobe tuner shows how far each note is from pitch".
  5. Fix the outline and add a meta description (none set). The link to the "Tuner Technicians Forum" is described as "inexpensive advice" (it's a free forum), and there are 2 http:// links (piano.detwiler.us). The "Piano Tuning Video" is recommended but not linked.
- **Verified:** tuning fork invented in 1711 by John Shore (Wikipedia, Tuning fork).

### /piano-diy-repair-guide/: 35/100
- **Fixes:**
  1. Delete "gently tilt the piano and try to dislodge it" (safety).
  2. "Gently remove the keytop (if possible) and use compressed air". Keytops are glued to the key. Change it to "remove the fallboard and key slip".
  3. "A tiny bit of graphite powder (pencil lead works in a pinch) applied to the key pins". Owners shouldn't lubricate key pins; sticking keys from swollen bushings need a technician to ease them. Remove it.
  4. "turn it very slightly (less than 1/8 of a turn)". Remove DIY tuning advice, or link to a proper guide with a warning.
  5. Headings: the H3 "The Basics of Piano Anatomy" comes before the first H2, and there's an H3 "...". The title "Keeping Your Instrument in Tune" doesn't match the content. Remove "a pro pianist's survival guide" (persona).

### /how-to-clean-and-maintain-your-piano/: 50/100
- **Sources:** good links to Steinway and PTG. Steinway's page advises "a clean piece of fine knit cloth, lightly dampened with plain water" and a microfiber cloth for high-polish finishes, which is consistent with the post.
- **Fixes:**
  1. Remove the persona opener ("the first time I laid eyes on my Steinway… across the concert hall stage") and "As a concert pianist… my livelihood".
  2. "do not attempt to open your piano or clean its internal components yourself" is directly followed by advice to vacuum the soundboard and wipe the strings. Pick one. The safer advice is to leave strings and soundboard to the technician.
  3. "consider using mothballs" is commonly discouraged by technicians because of the fumes and the risk to finishes and felts (Not checked against a source). Replace it with "ask your technician about moth-proofing the felts".
  4. "High-gloss finish… Always wipe in the direction of the wood grain". Polyester gloss has no grain. Follow Steinway's "microfiber polishing cloth" wording.
  5. "68-72 degrees Fahrenheit or 20-23 degrees Celsius" should be 20–22°C.
- **Headings:** fine.

### /how-the-piano-works/: 30/100
- **Fixes:**
  1. "When you press the key, the whippen moves down, which pushes the jack down." It should read: the capstan lifts the wippen, which lifts the jack into the hammer (Wikipedia, Piano action).
  2. Delete "The action of a piano is actually two actions, one for each half of the keyboard. Each half of the keyboard has 88 keys".
  3. "When each part of the action is precisely adjusted, the piano will be in tune" and "that's how we tune a piano". That is regulation, not tuning.
  4. "Each piano also has 88 dampers". The top treble notes have no dampers. Say "most notes have a damper; the highest notes don't need one".
  5. "There are around 200 strings": use about 220–240. Wikipedia: "Most notes have three strings, except for the bass, which graduates from one to two".
- **Headings and description:** H1, then only 3 H3s (no H2). The meta description promises "grand vs upright differences", which the post never covers.

### /are-piano-keys-still-made-of-ivory/: 15/100
- **Fixes (full rewrite recommended):**
  1. Cristofori: "a plectrum that plucked a string". **Wrong.** His invention was the hammer action (Wikipedia, Bartolomeo Cristofori). Padua and c. 1700 are correct.
  2. "In 1821, Jean Henri Pape invented the double-escapement action". **Wrong:** Sébastien Érard (English patent 1821; Wikipedia, Piano and Sébastien Érard).
  3. "CITES banned the use of ivory in pianos in 1989… The ban took effect in 1990". CITES banned *international commercial trade* in African elephant ivory, agreed at the October 1989 meeting. It said nothing about "use in pianos", and the piano industry had already abandoned ivory keytops by the 1980s (Wikipedia, Ivory trade). Add the US 2016 USFWS rule on antique and de minimis ivory (Not checked: the Federal Register blocked the fetch).
  4. "Ivory keys were made by boiling the ivory in oil and then pressing it into the shape of a piano key". **Wrong.** Ivory was sawn into thin head and tail veneers and glued onto wooden keys (from my own knowledge; I didn't fetch a source).
  5. "Ivorite is now the standard material used for the white keys of pianos" and the "soft resin… hard resin" description. Ivorite is Yamaha's premium keytop material (Wikipedia, Piano: "Yamaha developed a plastic called Ivorite"); most keytops are acrylic or other plastics. Also "This was the standard… mid-18th century to the mid-19th century" (ivory was used well into the 20th century) and "caused the near extinction of elephants" (overstated).
- **Outdated:** the title and meta description say "(2025)". Outline: H1, then only H3s.

## Fact-check log

| # | Claim (page) | Result | Source |
|---|---|---|---|
| 1 | P-145BT "CFX-sampled", "24 instrument voices" (/best-digital-piano/) | **Wrong** (already known): CFIIIS, 10 voices | usa.yamaha.com P-145BT specs |
| 2 | P-145BT 7W+7W speakers, 24 lbs | Verified (11.1 kg) | same |
| 3 | FP-10: PHA-4 Standard, 15 tones, 96 polyphony, 6W+6W, BT MIDI | Verified | roland.com/us/products/fp-10/specifications/ |
| 4 | FP-10 "same PHA-4 as FP-30X" | Verified | Roland FP-10/FP-30X specs |
| 5 | FP-30X: 256 polyphony, 56 voices, BT audio+MIDI, escapement + Ivory Feel | Verified | roland.com/us/products/fp-30x/specifications/ |
| 6 | FP-30X "around $695" | **Slightly off**: Amazon $649.99 (7 Oct 2026) | amazon.com search |
| 7 | FP-90X: 362 voices, 60 W 4-speaker, mic input, ~51 lbs, ~$2,300 | Verified (52 lb 1 oz; Amazon bundle $2,299.99) | roland.com/us/products/fp-90x/specifications/ |
| 8 | FP-90X "256-note polyphony" | Partly: piano tones unlimited, others 256 | same |
| 9 | ES60: RHL, SK-EX, 17 voices, 192 poly, 30 rhythms, line out, 10W+10W, no BT, no recorder, 24 lbs | Verified | kawai-global.com/product/es60/, kawaius.com/product/es60/ |
| 10 | ES60 "$499 piano" / "under-$500" | **Wrong**: MSRP $599 (Kawai US); Amazon $449 | kawaius.com/product/es60/ |
| 11 | ES920: RH III, HI-XL SK-EX, 256, 38 voices, BT MIDI+audio, 20W+20W | Verified | kawaius.com/product/es920/, kawai-global |
| 12 | ES920 "around $1,950" | **Wrong**: MSRP $1,799; Amazon $1,549 | same; amazon.com/dp/B0DPBFCCS5 |
| 13 | KDP120 "No Bluetooth… no recorder, no split/layer modes" | **Wrong**: Bluetooth MIDI, 3-song recorder, Dual + Four Hands | kawai-global.com/product/kdp120/ |
| 14 | KDP120 RHC II, 15 voices, 192 poly, 20W x2 | Verified (40 W total) | same |
| 15 | CLP-835 wooden keys | **Wrong**: synthetic keytops; wooden keys from CLP-845 up | usa.yamaha.com Clavinova specs |
| 16 | CLP-835 38 voices, 256 poly, BT audio+MIDI, 30W+30W | Verified | same |
| 17 | CLP-835 "2-way speaker system" | **Wrong**: 16 cm with diffuser × 2 | same |
| 18 | CLP-835 "$3,200–$3,500" | Not checked | |
| 19 | CLP-885 GrandTouch wooden keys, counterweights, escapement, 53+480 XG+14 kits, 256, GP Response Damper | Verified | same |
| 20 | CLP-885 "300W total" | **Wrong**: (45+30+40) W × 2 = 230 W | same |
| 21 | CLP-885 "around 168 lbs" | **Wrong**: 87 kg / 191 lb 13 oz | same |
| 22 | CLP-885 "$5,000+" | **Wrong**: Guitar Center $7,499.99 (black) | guitarcenter.com CLP-885 page |
| 23 | CLP-885 "three sensors per key", "historical pianos and fortepianos", lesson library | Not checked | |
| 24 | PX-S1100: 18 tones, BT audio, <25 lb, black/white/red | Verified via Amazon listing (BT via included WU-BT10) | amazon.com/dp/B0BQCS8BVJ |
| 25 | PX-S1100 192 polyphony | Not checked (casio.com 403) | |
| 26 | PX-S3100: 700 tones, 200 rhythms, pitch bend, 2 knobs, BT, battery | Verified via Amazon listing | amazon.com/dp/B0B5FFMYVN |
| 27 | PX-S3100 "Mic input with vocal effects" | Not checked (likely wrong; not in Amazon listing) | |
| 28 | Sweetwater "no tax in most states" | Not checked (403); very likely outdated | |
| 29 | Affiliate links on /best-digital-piano/ go to the right products | Verified: all 9 amzn.to resolve to the named model (some are bundles) | links.json + Amazon |
| 30 | Loog price, keys, key width, weight, size, battery hours | Verified | loogguitars.com/products/loog-piano |
| 31 | 42% RH / 68°F optimum (climate, cleaning) | Verified | ptg.org/ptgmain/piano/care/servicing |
| 32 | Steinway 40–60% and 68–78°F (climate) | Not checked | |
| 33 | Steinway "two to four tunings a year" (climate) | **Partly wrong**: Steinway quoted as "at least three or four times a year" | PTG servicing page |
| 34 | New piano 4 tunings in year one; at least 2/yr after (tuning post) | Verified | PTG servicing page (NPMA, Kawai, Baldwin) |
| 35 | Dampp-Chaser holds 42%, costs $650–$1,000 | Not checked (site blocked) | |
| 36 | String tension "over 20 tons" / "18 tons" | Verified (approx.): "can exceed 20 tons" for a modern grand | Wikipedia, Piano |
| 37 | String count 200 / 230 / 250 | 230 is about right; 200 and 250 are off | Wikipedia, Piano (stringing) |
| 38 | Tuning pin counterclockwise tightens | **Wrong** (from my own knowledge; no source fetched) | |
| 39 | Tuning fork invented 1711 | Verified | Wikipedia, Tuning fork |
| 40 | Wippen "moves down" | **Wrong** | Wikipedia, Piano action |
| 41 | Cristofori piano used a plectrum | **Wrong** | Wikipedia, Bartolomeo Cristofori |
| 42 | Pape invented double escapement 1821 | **Wrong**: Érard | Wikipedia, Piano; Sébastien Érard |
| 43 | CITES "banned the use of ivory in pianos in 1989" | **Wrong framing**: trade ban agreed Oct 1989; industry had already dropped ivory by the 1980s | Wikipedia, Ivory trade |
| 44 | Yamaha developed Ivorite | Verified | Wikipedia, Piano |
| 45 | "Ivorite is now the standard material" | **Wrong**: makers use plastics almost exclusively | Wikipedia, Piano |
| 46 | Humidifiers relieve asthma and reduce flare-ups | **Wrong / unsafe** | aaaai.org humidifiers page; epa.gov use-and-care page |
| 47 | Ultrasonic humidifier white dust; use distilled water (climate) | Verified | epa.gov use-and-care page |
| 48 | Kawai making pianos since 1927 | Not checked (Kawai's site says "over 95 years", which is consistent) | kawaius.com footer |

## Structured findings (for audit-data.json, Content Quality)

```json
{"category":"Content Quality","scope":"pianos-care group 1","score":46,
 "findings":[
  {"severity":"Critical","url":"/how-to-tune-a-piano-a-simple-guide/","issue":"Tuning direction reversed; fabricated tool descriptions","fix":"Rewrite or unpublish + redirect"},
  {"severity":"Critical","url":"/piano-diy-repair-guide/","issue":"Advises tilting the piano","fix":"Delete; add safe alternative"},
  {"severity":"Critical","url":"/are-piano-keys-still-made-of-ivory/","issue":"Cristofori plectrum, Pape double escapement, CITES framing, ivory process, Ivorite standard all wrong","fix":"Full rewrite"},
  {"severity":"High","url":"/piano-tuning-when-and-why-its-needed/, /how-to-clean-and-maintain-your-piano/, /piano-diy-repair-guide/","issue":"Concert-pianist persona conflicts with Katarina's teacher bio","fix":"Remove fabricated-looking anecdotes"},
  {"severity":"High","url":"/best-digital-piano/","issue":"CLP-835/885, KDP120, ES60/ES920 spec and price errors; P-145BT CFX/24 voices","fix":"Correct per fact-check log"},
  {"severity":"High","url":"/best-digital-piano/, /yamaha-p-145-review/","issue":"Affiliate links without top-of-page disclosure","fix":"Add #affiliate internal tag"},
  {"severity":"High","url":"/piano-humidifier/","issue":"Asthma health claim; duplicated paragraphs; thin","fix":"Merge into climate-control and redirect"},
  {"severity":"High","url":"/how-the-piano-works/","issue":"Action mechanics wrong","fix":"Rewrite Pressing a Key section"},
  {"severity":"Medium","url":"6 posts","issue":"H3-only or H3-before-H2 outlines; empty headings","fix":"Promote to H2; delete empties"},
  {"severity":"Medium","url":"/are-piano-keys-still-made-of-ivory/, /piano-dehumidifier-101-why-it-is-important/, /yamaha-p-145-review/","issue":"Outdated 2025 / '2 years' wording","fix":"Update meta and cards"},
  {"severity":"Medium","url":"/acoustic-vs-digital-piano/, /how-to-tune-a-piano-a-simple-guide/","issue":"No meta description","fix":"Add in Post settings"}
 ]}
```
