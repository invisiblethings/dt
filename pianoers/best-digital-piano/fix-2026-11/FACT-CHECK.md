# /best-digital-piano/: fact check and ranking check (4 Nov 2026)

## 1. Rankings: what the data shows

| Check | Result |
|---|---|
| Search Console, 28 days to 27 Oct | "best digital piano" average position **3.6**; whole page 7.3 |
| Manual private-window check, 29 Oct | **#1** organic |
| Google US today (DataForSEO, 4 Nov) | Desktop: **not in the top 20**. Mobile: **#18** |
| Who holds the top spots now | Pianodreamers has **#1, #2 and #4**; then MusicRadar, Reddit, Pianist's Compass, Best Buy, Guitar Center, Merriam, Piano World |

Treat the tracker figures with care. On 29 Oct the same tool wrongly showed the site missing, while a manual check showed #1. Confirm in **Search Console → Performance → query "best digital piano"**, by day, for 28 Oct to today.

**The page itself didn't break.** It returns 200, the canonical is correct, there's no noindex, both schema blocks are valid, and the headings are the same as on 6 Oct. The 3 Nov edit changed only about 70 words.

### Likely causes, most likely first

1. **Google re-ranking this query since about 26 Oct.** The results now favour specialist review sites, with a full review behind each pick (Pianodreamers has three spots), and forums. Your page is a 5,000-word roundup with no tables, no own photos and no individual reviews. This matches the unconfirmed update noted on 29 Oct.
2. **Factual errors that a reader, or a quality rater, can check in seconds.** For example, the P-145 sample and voice count, the CLP-835's "wooden keys", and the KDP120's "No Bluetooth, no recorder". Fixed below. A buying guide that contradicts the makers' spec sheets is exactly what Google's reviews guidance downgrades.
3. **Two of your pages compete for the same searches.** The beginner section duplicates /best-beginner-pianos/, nearly word for word for the FP-10. The two pages even disagree: the beginner page has the correct P-145 facts, this one has the wrong ones. See `../../best-beginner-pianos/best-digital-piano-edits.md`, which was never applied.
4. **Experience claims with no proof.** "I tested 30+ digital pianos" (meta description) and "I've physically sat down at every piano on this list". There are no photos of Katarina with any of them. Google's product-review guidance asks for evidence of hands-on testing. Either add the evidence (your own photos, a short note on where and when each was played) or soften the claims to what's true.
5. **Downtime on 3 Nov.** Cloudflare returned 502 for at least 30 minutes. A short outage rarely moves rankings, but check **Settings → Crawl stats → Host status** in Search Console for server errors on 3 Nov.

## 2. Corrections made in `article-corrected.html` (43 edits)

Sources: manufacturer spec pages (Roland, Kawai), Yamaha's P-145BT spec page (checked 6 Oct for the beginner article), the Kawai KDP120 owner's manual, and dealer listings where makers block automated access.

| Model | Page said | Correct | Source |
|---|---|---|---|
| Yamaha P-145BT | "sampled from Yamaha's legendary CFX" | **CFIIIS** sample (CFX is the P-225) | [Yamaha P-145BT specs](https://usa.yamaha.com/products/musical_instruments/pianos/p_series/p-145bt/specs.html) |
| Yamaha P-145BT | 24 instrument voices | **10** (24 is the P-225) | same |
| Yamaha P-145BT | Bluetooth not listed | Bluetooth **audio** (the BT in the name) | same |
| Yamaha P-145BT | 24 lbs | 24.5 lbs (11.1 kg) | same |
| Summary box | "Yamaha P-225 and Roland FP-30X" for intermediates | The P-225 isn't reviewed on the page. Changed to FP-30X and ES920 | — |
| Roland FP-10 | FP-30X "costs $200 more" | About $150 more ($499.99 vs $649.99) | Sweetwater, 6 Oct |
| Roland FP-10 | 15 tones | 15 on the panel, 36 in total | [Roland FP-10 specs](https://www.roland.com/us/products/fp-10/specifications/) |
| Roland FP-10 | "via Roland Piano Partner app" | Works with the **Roland Piano App** | [Roland FP-10 features](https://www.roland.com/us/products/fp-10/features/) |
| Roland FP-10 | "No headphone 3D ambience like the FP-30X" | Neither has it (it's an FP-60X feature). Removed | [Roland FP-30X](https://www.roland.com/us/products/fp-30x/) |
| Kawai ES60 | "$499", "finally entered the under-$500 game" | List price **$599**, street about $450–$550. Kawai's wording: the most affordable ES model | [Kawai US ES60](https://kawaius.com/products/kawai-es60-digital-piano) |
| Kawai ES60 | "sounds like a $250,000 concert grand" | No source for the price. Reworded | — |
| Intermediate H2 and intro | "$700–$2,000"; names the P-225 and ES120, which aren't reviewed | "$600–$2,000"; names the FP-30X, PX-S1100 and ES920, which are | — |
| Roland FP-30X | ~$695 (5 places, including the FAQ schema) | About $650–$700 | Sweetwater, 6 Oct |
| Roland FP-30X | "Headphone 3D ambience" | Not on the FP-30X. Replaced with 11 W + 11 W speakers | [Roland FP-30X specs](https://www.roland.com/us/products/fp-30x/specifications/) |
| Roland FP-30X | "Built-in recorder"; "56 instrument voices" | MIDI recorder; 56 tones on the panel (321 in total) | same |
| Casio PX-S1100 | "world's thinnest digital piano territory" | Casio doesn't claim this. Now "about 9 inches deep" | Guitar Center listing, 6 Oct |
| Casio PX-S1100 | "Bluetooth audio" | Audio **and MIDI**, through the included WU-BT10 adapter | same |
| Casio PX-S1100 | 25 lbs | 24.7 lbs (11.2 kg) | same |
| Kawai ES920 | around $1,950 (2 places) | List price **$1,799**, on sale at $1,699 | [Kawai US price list](https://kawaius.com/pianos/digital) |
| Casio PX-S3100 | "Mic input with vocal effects" | Not found in any spec listing. Removed | — |
| Casio PX-S3100 | "USB audio recording"; "700+ tones" | Built-in MIDI and audio recorder; 700 tones | dealer listings |
| Casio PX-S3100 | Bluetooth MIDI + audio | Via the included WU-BT10 adapter | dealer listings |
| **Kawai KDP120** | "No Bluetooth… no recorder, no split/layer modes" | **Bluetooth MIDI, a 3-song recorder, Dual and Four Hands modes, and lesson songs** (Alfred, Burgmüller, Czerny, Beyer) | KDP120 owner's manual, spec page 54 |
| **Yamaha CLP-835** | "long, wooden keys" | **Plastic keys** (GrandTouch-S). The CLP-845 has the wooden keys | Retailer listings ([pianoo.com](https://pianoo.com/test/yamaha-clp-835/), [1st-note](https://1st-note.pages.dev/en/digital-pianos/yamaha-clp-845)) |
| Roland FP-90X | 256-note polyphony | **Unlimited** for the modeled pianos, 256 for other sounds | [Roland FP-90X](https://www.roland.com/us/products/fp-90x/) |
| Roland FP-90X | "Headphone 3D ambience" | Roland calls it **Headphones Acoustic Projection** | same |
| Roland FP-90X | ~51 lbs | 52 lbs (23.6 kg) | same |
| Roland FP-90X | "PureAcoustic Piano Modeling" | Roland's spelling: Pure Acoustic Piano Modeling | same |
| Brand showdown | Roland "use modeling technology rather than samples" | True only of the top models; the FP-10 and FP-30X use SuperNATURAL Piano. Reworded | Roland spec pages |
| Buyer's guide | "at least 64-note polyphony", then "Aim for at least 128" | Made consistent: 64 is enough for beginners (the P-145 has 64) | — |
| Where to buy | Sweetwater: "no tax in most states" | Removed. Sweetwater collects sales tax in most states | — |

Already correct and kept: the ES60's specs (RHL action, SK-EX, 17 voices, 192 notes, 10 W × 2, no Bluetooth, no recorder), all of the ES920's specs, the FP-10's and FP-30X's actions and polyphony, and the FP-90X's PHA-50, 60 W, mic input and USB audio.

## 3. Still unverified (Yamaha and Casio block automated checks)

Check these in a browser before publishing, or soften them:
- **CLP-835:** 38 voices, 256 notes, 30 W × 2, Bluetooth MIDI and audio, price "$3,200–$3,500".
- **CLP-885:** "three sensors per key", "six speakers", weight "168 lbs" (one dealer says 82 kg / 181 lbs), "53 + 480 XG voices", lesson songs, price "$5,000+". The 300 W total is confirmed by dealers.
- **PX-S3100:** "2 assignable knobs", battery operation, weight (sources give 10.9 to 11.4 kg).
- **FP-90X price** (~$2,300) and **KDP120's 15 voices** (the manual lists 15 sounds, which matches).

## 4. How to apply

1. Ghost → the post → replace the content with `article-corrected.html`. The easiest way is one HTML card: delete the existing content, add an HTML card and paste the file. Or use it as a reference and edit the changed lines by hand. The FAQ schema is inside the article's HTML card, and it's corrected there too.
2. Change the meta description. It claims "I tested 30+ digital pianos", so use it only if that's true.
3. Then, in this order: apply `best-digital-piano-edits.md` (shrink the beginner section), add a comparison table, and add your own photos. Those address causes 1, 3 and 4.
