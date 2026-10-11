# Notes: best-keyboard-piano-for-beginners rewrite

Rewrite file: `seo-content-audit/rewrites/best-keyboard-piano-for-beginners.md`
Checked on: 2026-10-11 (all sources below checked that day; "fetched" means I read the page itself with curl or WebFetch, "search" means I relied on search-result extracts).
URL: unchanged (`/p/best-keyboard-piano-for-beginners`).

## Title and description

Title (60 characters): `Best Keyboard Pianos for Beginners (2026): 5 Picks by Budget`. The audit's candidate. It keeps "keyboard", "piano", "beginners" and "2026". I tried fitting "88-key" and "weighted" (`Best Keyboard Piano for Beginners (2026): 5 Weighted 88-Key Picks`, 65 characters) but it runs over 60. The body carries "88 keys", "weighted", "students" and "digital piano" in headings and FAQ questions instead.

Meta description (141 characters): `Five beginner keyboard pianos for 2026, all 88 weighted keys, from $500 to $730 in the US. Specs, pros, cons and prices checked October 2026.`

It drops "We tested" and the "under $700" claim (two picks cost more than $700 in February and one still does). The `$500 to $730` span goes stale with prices; update it together with the price lines.

## The big change: Korg B2 replaced by Korg B2+

- Korg announced the B2+ and B2+SP on 30 June 2025 as an update of the B2 (USB-C audio and MIDI, audio input, revised speaker system): https://audiomediainternational.com/korg-unveils-b2-and-b2sp-digital-pianos/ and https://mmrmagazine.com/korg-expands-digital-piano-lineup-with-the-introduction-of-the-b2-and-b2sp/ (both fetched). Both quote a US MAP of $799.99 at launch.
- korg.com/us still lists the original B2 among its digital pianos, with no discontinuation notice. But Korg's own US store (korgusshop.com/products/b2bk, Shopify JSON, fetched) offers the B2 only in white at $499.99 with `available: false`, and Guitar Center's B2 white page shows "Sold Out ... no longer available"; the black GC URL from search returns 404.
- Korg's US store sells the B2+ (black and white) at $599.99, available (korgusshop.com/products/b2-digital-piano, fetched).
- I replaced the B2 with the B2+. Its specs match the B2 on action (NH), polyphony (120), amp (15 W x 2), weight (11.4 kg / 25.13 lb) and dimensions, so the original pick's reasoning (biggest speakers on a budget) still holds. I did not call the B2 "discontinued", because Korg has not said so; the article says the B2 showed as sold out.

The other four models are current: each maker's US site lists them and Guitar Center shows each in stock (avlStatus `in_stock`) on 11 Oct 2026.

## Yamaha naming: P-145 vs P-145BT

Yamaha USA's P Series page lists the P-121, P-125a, P-143 and P-145BT, with no plain P-145 (the old `/p-145/` URL redirects to the P Series index). The article names the P-145BT and calls it "the P-145 with Bluetooth audio". Retailer and review pages outside the US describe the P-145BT as a P-145 plus Bluetooth audio.

## Claim ledger (claims kept)

| # | Claim in rewrite | Source | Checked |
|---|---|---|---|
| 1 | Roland FP-10: PHA-4 Standard keyboard with escapement and ivory feel; SuperNATURAL Piano; 96-voice polyphony; 6 W x 2; 12 cm x 2 speakers; Bluetooth MIDI (Ver 4.0, no Bluetooth audio); Twin Piano mode; 1,284 x 258 x 140 mm (50-9/16 x 10-3/16 x 5-9/16 in) without music rest; 12.6 kg / 27 lb 13 oz; included: music rest, AC adaptor, pedal switch; options DP-10 (half pedal), KSCFP10 stand, KS-13 | https://www.roland.com/us/products/fp-10/specifications/ (fetched, spec table read) | 2026-10-11 |
| 2 | FP-10 works with Roland Piano App; Twin Piano lets student and teacher play side by side in the same octave ranges | https://www.roland.com/us/products/fp-10/ (fetched) | 2026-10-11 |
| 3 | Roland FP-30X: PHA-4 Standard with escapement and ivory feel; 256 max polyphony; 11 W x 2; Bluetooth audio (Ver 3.0) and MIDI (Ver 4.0); USB audio/MIDI; two phones jacks; 14.8 kg / 32 lb 11 oz with music rest; 321 tones (56 from panel); included: music rest, DP-2 pedal switch; options KSC-70 stand, KPD-70 three-pedal unit, DP-10 | https://www.roland.com/us/products/fp-30x/specifications/ (fetched) | 2026-10-11 |
| 4 | Yamaha P-145BT: GHC with matte black keytops; Yamaha CFIIIS; damper resonance; 64 polyphony; 7 W x 2; 11.1 kg / 24 lb 8 oz; Bluetooth audio; USB audio interface (44.1 kHz, 16 bit); Duo mode; included: music rest, footswitch, AC adaptor; separately sold: L-100 stand, FC3A pedal, LP-5A pedal unit, UD-BT01 wireless MIDI adaptor | https://usa.yamaha.com/products/musical_instruments/pianos/p_series/p-145bt/specs.html (fetched) | 2026-10-11 |
| 5 | P-145BT works with Smart Pianist and Rec'n'Share; USB to Host carries MIDI and audio; Bluetooth audio streaming | https://usa.yamaha.com/products/musical_instruments/pianos/p_series/p-145bt/index.html (fetched) | 2026-10-11 |
| 6 | Yamaha P-225: CFX, 192 polyphony | Same Yamaha specs page (comparison column) | 2026-10-11 |
| 7 | Casio PX-S1100: Smart Scaled Hammer Action; ebony and ivory texture; AiR sound source; 232 mm deep; "world's slimmest" per Casio's own September 2022 survey; included wireless MIDI and audio adaptor (same as WU-BT10); colours black, white and red | https://music.casio.com/us/electronic-musical-instruments/privia/px-s1100-px-s3100-px-s5000/ and .../Comprehensive-Breakdown/ (fetched) | 2026-10-11 |
| 8 | PX-S1100: 192-note polyphony; 8 W + 8 W; 24.7 lb (11.2 kg); 52 x 9.1 x 4 in; six AA batteries, about 4 hours (Casio claim as reported); included: music rest, SP-3 damper pedal, AC adaptor, WU-BT10; capacitive touch buttons; no screen makes navigation harder (reviewer opinion) | https://www.pianodreamers.com/casio-px-s1100-review/ (fetched; "Last Updated: August 19, 2026"). Polyphony and batteries also in search extracts of the Casio User's Guide (manualslib, zzounds copy) | 2026-10-11 |
| 9 | Korg B2+: NH keyboard, 88 notes; 120 polyphony; 12 sounds; USB-C; audio in; 15 W x 2; 11.4 kg / 25.13 lb; included AC adapter, music stand, damper pedal; options STB1 stand, PU-2 pedal unit (half-pedaling); three touch settings; German and Italian piano sounds; three-month Skoove premium trial | https://www.korg.com/us/products/digitalpianos/b2_plus/specifications.php and https://www.korg.com/us/products/digitalpianos/b2_plus/ (fetched) | 2026-10-11 |
| 10 | Korg B2+ launched June 2025 as an update of the B2 | Audio Media International and MMR articles of 30 June 2025 (fetched) | 2026-10-11 |
| 11 | Price: Roland FP-10 $499.99, in stock | https://www.guitarcenter.com/Roland/FP-10-Digital-Piano-1500000263663.gc (fetched; JSON-LD Offer price 499.99, InStock). Musician's Friend shows the same $499.99, in stock: https://www.musiciansfriend.com/keyboards-midi/roland-fp-10-digital-piano/l47800000000000 (fetched; same parent company as GC) | 2026-10-11 |
| 12 | Price: Yamaha P-145BT $529.99, in stock | https://www.guitarcenter.com/Yamaha/P-145BT-88-Key-Digital-Piano-With-Bluetooth-1500000459733.gc (fetched, JSON-LD) | 2026-10-11 |
| 13 | Price: Casio PX-S1100 black $729.99, "IN STOCK & READY TO SHIP" | https://www.guitarcenter.com/Casio/PX-S1100-Privia-Digital-Piano-Black-1500000356587.gc (fetched, page data) | 2026-10-11 |
| 14 | Price: Roland FP-30X black $649.99, in stock | https://www.guitarcenter.com/Roland/FP-30X-88-Key-Digital-Piano-Black-1500000335932.gc (fetched, JSON-LD) | 2026-10-11 |
| 15 | Price: Korg B2+ $599.99, black and white available | https://korgusshop.com/products/b2-digital-piano (fetched; Shopify product JSON) | 2026-10-11 |
| 16 | Price: Yamaha P-225 black $769.99, in stock | https://www.guitarcenter.com/Yamaha/P-225-88-Key-Digital-Piano-Black-1500000407523.gc (fetched) | 2026-10-11 |
| 17 | US tuning $121 to $231 a visit, about $240 to $460 for two a year, Thumbtack, October 2025 | Sibling rewrite `caring-for-your-piano-tuning-essentials.md` (its notes cite Thumbtack, updated 20 Oct 2025) | 2026-10-11 |
| 18 | Tune about twice a year | Same sibling guide (Baldwin, Kawai, Yamaha via PTG; Steinway UK) | 2026-10-11 |
| 19 | Flowkey and Simply Piano listen through MIDI or the microphone | Flowkey review notes (claims 13, 21), checked 2026-10-10 | 2026-10-10 |
| 20 | Sustain pedal and layering consume polyphony | Piano Dreamers review, polyphony section (fetched) | 2026-10-11 |
| 21 | Arithmetic: FP-30X 11 W vs FP-10 6 W ("almost twice"); 32 lb 11 oz minus 27 lb 13 oz = 4 lb 14 oz ("about 5 lb"); $649.99 minus $499.99 = $150 | Rows 1, 3, 11, 14 | 2026-10-11 |

Price range note: the brief asked for US street price ranges. I could fetch only one live price per model (Guitar Center, or Korg's own store for the B2+). Sweetwater, Amazon (captcha), B&H, Adorama and Thomann blocked automated fetches, so the article gives one dated price per model with its retailer, not a range.

Opinions in the rewrite carried over from the original as the author's judgment: FP-10 as the first pick for most beginners; "Roland wins on feel" (original: "Roland usually wins on feel"); the polyphony comment ("64 notes will carry a beginner"); the practice advice (30 minutes a day, warm-up/new song/review, timer); the time-to-songs estimate (original: "Simple songs in 1-2 months ...; recognizable pieces in 6 months").

## Original claims dropped or changed

| Original claim | Action | Reason |
|---|---|---|
| "updated with my latest testings, other user reviews and real prices" | Replaced by "How I chose" | No testing evidence; methodology now states only verifiable criteria and sources |
| "Our 2026-tested top 5" / "We tested" (meta) | Removed | Unverifiable testing claim; single author ("I/my") |
| "95%+ of beginners should start with a digital piano" / "Digital for 95% of beginners" | Removed | No source; replaced by "suits most new players" with reasons |
| "Most quit in the first month" | Removed | No source |
| "the one most teachers and users would buy" | Removed | No source |
| "shockingly close to a real grand piano" | Removed | Hype, no source |
| "61-key toys teach bad habits", "a nightmare for beginners", "the volume and bass king", "wow, this actually sounds like a piano", "never feels like a toy", "world-class", "legendary", "built like a tank" | Removed | Hype |
| Tuning "$100-200/year" | Changed | Contradicted the sibling guide; now $121 to $231 per tuning, about $240 to $460 a year (US, Thumbtack, Oct 2025), linked |
| "$3,000+ for anything decent" acoustic; "budget >$5k" | Removed | No source |
| Prices "as of February 2026" and ranges (FP-10 $400-500, P-145 $500-550, PX-S1100 $650-750, FP-30X $650-750, B2 $500-600) | Changed | Replaced with single fetched prices dated 11 Oct 2026 |
| "Bundles with stand/pedal are $150-250 extra" | Removed | Not verified; bundle contents and prices vary |
| "Get the BT version ... only ~$30-50 more" | Removed | No plain P-145 on Yamaha USA's lineup to compare |
| FP-10 "triple-sensor" and "ivory/ebony key tops" | Changed | Roland's FP-10 page lists escapement and ivory feel, not three sensors or ebony |
| FP-10 "6W + 6W", "96-note", "27.8 lbs", "50.6 x 10.2 x 5.5 in" | Kept, made exact | Roland: 6 W x 2, 96, 27 lb 13 oz, 50-9/16 x 10-3/16 x 5-9/16 in |
| FP-10 "Proven reliability (bestseller for years)" | Removed | No source |
| FP-10 "Speakers are just okay"; "Beginners love it" | Changed | Replaced with spec fact (smallest speakers, 6 W) |
| P-145 "direct successor to the legendary P-45 and still the best-selling beginner piano worldwide" | Removed | No source for sales rank; successor claim not needed |
| P-145 "updated CFIIIS sampling (with added damper resonance)" | Kept | Yamaha spec: CFIIIS, Damper Resonance yes |
| P-145 "GHC", "64-note", "7W + 7W", "24.5 lbs", "USB audio/MIDI" | Kept | Yamaha spec confirms |
| P-145 "Bluetooth audio" | Kept, clarified | Bluetooth is audio only; wireless MIDI needs the UD-BT01 adaptor |
| P-145 "Action feels slightly lighter/softer than Roland PHA-4" | Changed | Hands-on comparison I cannot verify; replaced by spec difference (no escapement listed for GHC) |
| P-145 "Reliable and built like a tank" | Removed | No source |
| PX-S1100 "only ~4 inches deep" | Corrected | 4 inches is the height; depth is 232 mm (about 9.1 in) |
| PX-S1100 "Bluetooth audio + MIDI" | Kept, clarified | Through an included plug-in adaptor (WU-BT10 type), not built in |
| PX-S1100 "AiR sound engine's German grand piano" | Changed | Kept "AiR sound source"; German grand sample not on a page I could fully read from Casio |
| PX-S1100 "Action is lighter and less grand-like than Roland"; "speakers punch above their weight" | Removed | Hands-on claims |
| PX-S1100 "Controls are a bit fiddly without the Casio Music Space app" | Kept, sourced | Attributed to Piano Dreamers (no screen, navigation) |
| FP-30X "256-note polyphony in practice" | Corrected | 256 is Roland's spec figure |
| FP-30X "support for an optional triple-pedal unit" | Kept, named | KPD-70 is Roland's three-pedal unit for the FP-30X |
| FP-30X "~33 lbs" | Made exact | 32 lb 11 oz |
| FP-30X "Many players who start on an FP-10 eventually wish they'd bought the FP-30X"; "keep for 5-10 years" | Removed | No source |
| Korg B2 pick | Replaced by B2+ | See "big change" above |
| Korg B2 "German & Austrian grands" | Corrected | Korg lists German and Italian pianos |
| Korg B2 "~25-30 lbs" | Made exact | 25.13 lb |
| Korg "15W + 15W" | Kept | Korg spec 15 W x 2 (B2 and B2+) |
| Korg "Best onboard speakers in the entire budget category (no distortion)" | Changed | Now "most speaker power of the five" (spec watts) |
| Korg "Fewer advanced features/app polish than Yamaha or Roland" | Changed | Replaced with fact: no Bluetooth |
| Budget list "Kawai ES120" | Removed | Not checked |
| Final takeaway "Alesis Recital Pro (~$400)" | Removed | Not checked, and it falls outside the graded hammer action rule I could verify |
| Accessories "X- or Z-stand ($50-90)" | Price removed | Not verified |
| Headphones "Sony MDR-7506, Audio-Technica ATH-M20x" | Names removed | Manufacturer pages blocked (403); could not confirm current production |
| Retailer home-page links (sweetwater.com, thomannmusic.com, amazon.com) | Replaced | Product-page links at Guitar Center and Korg's US store |
| "Ready to buy? Check current prices and bundles." (no link) | Removed | Each pick now ends with a dated price and a product-page link |
| r/pianolearning link | Removed | reddit.com returned 403 to my check; I kept the internal links within the limit of five |
| Footnotes 1 (GHC) and 2 (Smart Scaled Hammer) | Inlined | Folded into "Graded hammer action" bullet and the pick sections; no footnote markers |
| "Yamaha on tone/reliability" | Removed | Reliability unsourced |
| FAQ in bold run-in style | Changed | Seven H3 questions in searchers' phrasing |

## First-person and testing claims: owner must confirm or delete

The rewrite adds no testing claims. The remaining first-person statements are opinions carried from the original:

1. "my first pick for most beginners" / "is my pick for most beginners" (original: "Still my #1", "our #1 recommendation").
2. "In my view Roland's PHA-4 action wins on feel" (original FAQ: "Roland usually wins on feel"). If you have not played both, delete the sentence.
3. "The 64 notes on the Yamaha will carry a beginner" (original: "64-note is acceptable for beginners").
4. "My rough guide: simple songs within one or two months of regular practice, and recognizable pieces in about six months" (original FAQ).
5. "The buying rule I use" and "How I chose": confirm these criteria match how you picked the five.

Claims from the original that I removed and that you could restore only with evidence (photos, notes, dates of hands-on use):

- "updated with my latest testings"; "Our 2026-tested top 5"; "We tested the top digital pianos under $700" (meta).
- "most teachers and users would buy [the FP-10]"; "Beginners love it".
- Feel comparisons: P-145 "slightly lighter/softer than PHA-4"; PX-S1100 "lighter and less grand-like than Roland"; Korg "comfortable but not as refined"; FP-10 hammer "drop away" description.
- Sound judgments: FP-10 "speakers just okay"; PX-S1100 "speakers punch above their weight"; Korg "no distortion".

## Open items for the owner

1. **Confirm the first-person opinions** above, or cut them.
2. **Product images vs models.** See the media table. IMAGE-2 to IMAGE-5 match their models as far as I can see. **IMAGE-6 shows the original Korg B2 with a "KORG B2" caption, now under the Korg B2+ heading.** Korg gives the B2+ the same dimensions and weight, but I cannot confirm from the image that the B2+ looks the same. Replace it with a B2+ image (Korg press kit) or relabel the card. Alt text describes what the image shows (the B2).
3. **Image licensing.** IMAGE-2 to IMAGE-6 look like manufacturers' product photos placed on a DanHon Music card. Confirm you have permission (most makers allow press-kit images for editorial use, but check each). IMAGE-1 looks AI-generated; confirm the tool's terms allow publication.
4. **No affiliate links.** The page has none, and I added none. If you add tracked retailer links later (Guitar Center, Sweetwater, Amazon), add a plain disclosure near the top before the first link.
5. **Price upkeep.** Prices move often. Recheck the six product pages before each edit, then update the opening list, quick picks, each "Price:" line, the budget section, the FAQ, the "Prices checked on" line and the meta description together.
6. **Korg B2 status.** If Korg confirms the B2 is discontinued, you could say so; I kept to "sold out" because Korg's US site still lists the B2.
7. **Casio product link.** Casio's US product page (casio.com/us/.../product.PX-S1100BK/) returned 403 to every automated fetch, so I linked Casio's US Privia series page (HTTP 200, covers the PX-S1100). Swap in the product page if it opens for you.
8. **Front block.** Paste the title into Substack's title field and the description into the SEO description field. Drop the `# Title` line if Substack renders the title itself.
9. **Internal links** (5 of 5): tuning guide, piano pedals, Flowkey review, Hoffman Academy review, best age to learn piano. All returned HTTP 200 on 11 Oct 2026.
10. **Church keyboard query.** As the brief says, I did not stretch the page for "best musical keyboards for small churches".

## Media

No videos on the original page; none added. Six images kept in the original slots and sequence (IMAGE-1 hero; IMAGE-2 to IMAGE-6 under each pick, in the original pick order).

| # | Slot | Alt text | What it appears to be | Model match | Licensing note |
|---|---|---|---|---|---|
| 1 | Hero, top | A black 88-key digital piano on an X-stand with open sheet music, a padded bench and headphones in a warm living room, under the words "Best keyboard piano for beginners" | Title graphic with DanHon Music logo over a staged room scene. The keyboard has no visible brand, model or control panel detail; the candles, plant and lamp have the smooth look of an AI-generated image | Names no model, so it does not mislead a buyer. I could not count the keys | Probably AI-generated; confirm the tool's licence |
| 2 | Pick 1 | Roland FP-10 88-key digital piano in black, seen from above at an angle, on a DanHon Music card labelled Roland FP-10 | Clean product photo on white, framed on a branded card | Matches: Roland logo at left, "FP-10" mark at top right, slim black body, button cluster at left; music rest not fitted | Looks like Roland's product photo; confirm permission |
| 3 | Pick 2 | Yamaha P-145BT 88-key digital piano in black with its music rest raised, on a DanHon Music card labelled Yamaha P-145BT | Product photo on white, branded card | Consistent with the P-145 family: Yamaha logo on the music rest and body, few buttons at left. The P-145 and P-145BT look alike, so I cannot tell from the image which one it shows | Looks like Yamaha's product photo; confirm permission |
| 4 | Pick 3 | Casio Privia PX-S1100 88-key digital piano in red, a slim body seen from above, on a DanHon Music card labelled Casio Privia PX-S1100 | Product photo on white, branded card | Consistent with the PX-S1100: slim glossy body, touch controls and dial-like ring near the centre, no screen (the PX-S3100 has a display). Casio sells the PX-S1100 in red | Looks like Casio's product photo; confirm permission |
| 5 | Pick 4 | Roland FP-30X 88-key digital piano in white with its music rest raised, on a DanHon Music card labelled Roland FP-30X | Product photo on white, branded card | Consistent with the FP-30X in white: Roland logo, row of buttons at left. Roland sells a white FP-30X | Looks like Roland's product photo; confirm permission |
| 6 | Pick 5 | Korg B2 88-key digital piano in black with its music rest raised, on a DanHon Music card labelled Korg B2 | Product photo on white, branded card | Shows the original **Korg B2** (Korg logo, label "KORG B2"). The heading now names the **B2+**. Replace or relabel | Looks like Korg's product photo; confirm permission |

I saw no garbled text, extra keys or impossible controls in IMAGE-2 to IMAGE-6, the usual signs of AI-made product shots. Image resolution (1152x768) did not allow a key count.

## Stop-slop self-check

Checks run on the final article (`grep` on the file):

- Em dashes: 0. En dashes: 0.
- `\b[a-z]+ly\b`: one hit, "Simply" in "Simply Piano" (product name). Earlier hits fixed: "separately" (rewritten as "costs extra").
- Banned words (really, just, actually, truly, very, always, never, every, everyone, nobody, literally, simply, honestly, basically, toy, nightmare, king, wow, shockingly): 0 after fixing one "never" ("it needs no tuning").
- Wh-/So/Look/Here sentence openers in body text: 0. FAQ H3 headings keep searchers' phrasing ("What is the best keyboard piano for beginners in 2026?", "What is the best digital piano for beginners with weighted keys?", "What is the best piano for students?", "How long until I can play real songs?"). One "Where I compare..." opener in "How I chose" was rewritten. Section names from the brief were renamed to avoid Wh- openers ("Digital or acoustic for a beginner", "The pick for your budget", "Other gear you need").
- Passive scan (`is/are/was/were/be/been/get + -ed/-en`): 0.
- Throat-clearing, "not X, it's Y" contrasts, negative listing: none found on read-through. Lists of three or more remain where the facts come that way (specs, pros and cons).

| Dimension | Score |
|---|---|
| Directness | 8 |
| Rhythm | 7 |
| Trust | 8 |
| Authenticity | 7 |
| Density | 7 |
| **Total** | **37/50** |

Word count: about 1,890 for the article from the H1 down, including headings and list text, excluding front block, image markers and URLs. That sits at the top of the 1,500 to 1,900 range; the five spec blocks take the space.

## Limitations

- Sweetwater (403), Amazon (captcha), B&H (403), Adorama (403) and Thomann (404/redirect) blocked automated fetches. Prices come from Guitar Center (and Musician's Friend for one cross-check, same parent company) and Korg's own US store. Search extracts quoted Sweetwater prices (FP-10 $499.99; B2+ $799.99) that I could not open, so I did not use them.
- Casio's US product page returned 403. PX-S1100 polyphony, speaker watts, weight, batteries and included pedal come from Piano Dreamers (updated 19 Aug 2026), Guitar Center's listing and search extracts of the Casio User's Guide, not a Casio page I read in full. Casio's own series pages confirm the action, depth, colours, AiR source and the included adaptor.
- I did not verify that the FP-10's Bluetooth is present on US units beyond Roland's note that it "may not be included depending on the country"; Guitar Center's US listing (search extract) mentions Bluetooth MIDI.
- Guitar Center prices can differ by colour and change daily; one GC category page in search extracts showed other prices.
- I could not check Kawai ES120, Alesis Recital Pro, Sony MDR-7506 or Audio-Technica ATH-M20x, so they are out.
- I viewed all six images but could not trace their source or licence.
