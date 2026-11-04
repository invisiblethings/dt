# Synthesia piano review: publishing notes

**Rewrite of an existing post.** Keep the URL slug: `synthesia-piano-review`

| Field | Value |
|---|---|
| Post title (H1) | Synthesia Piano Review (2026): Is the Piano Game Worth It? |
| Meta title (56 chars) | Synthesia Piano Review 2026: Is the Piano App Worth It? |
| Meta description (154 chars) | Synthesia piano review by a teacher: how the falling-notes game works, the $29 one-time price, free vs unlocked, keyboard setup, and if it teaches you piano. |
| Excerpt | The falling-notes piano game behind every YouTube tutorial. My honest Synthesia review: features, the $29 one-time price, setup, and whether it can teach you piano. |
| Tags | Apps (primary). Add the internal tag `#affiliate`, because the Pianoforall button is an affiliate link |
| Author | Katarina, as now. The text is in first person by a piano teacher |
| Feature image | `synthesia-piano-review-featured.webp`. Alt: Synthesia piano review 2026, falling notes landing on a piano keyboard, rated 3.9 out of 5, $29 one-time |
| Facebook / X image | `synthesia-piano-review-social.webp` |
| Code injection → Post header | **Delete the old code** (its Article + SoftwareApplication schema has the old 6/10 rating) and paste `code-injection-header.html`: SoftwareApplication + Review (3.9/5, $29 offer) and an FAQPage with 12 questions |

## Search Console: queries and where they're targeted
| Query (impressions) | Where it's targeted |
|---|---|
| synthesia piano (6,415), piano synthesia (314) | title, H1, intro, quick answer, image alt text |
| synthesia app (880), synthesia piano app (170), synthesia piano software (171) | "What is Synthesia?", the at-a-glance table, platforms section |
| synthesia game (501), synthesia (video game) (360), synthesia the game (148), synthesia piano game (140), piano game synthesia (82) | "What is Synthesia?" (with the Piano Hero / Guitar Hero history), FAQ "Is Synthesia a game?" |
| synthesia music (416) | "What is Synthesia?" |
| is synthesia worth it (209) | quick answer box (H2 "Is Synthesia worth it?") and "Is Synthesia worth the money?" |
| synthesia keyboard (153) | "How to connect a keyboard to Synthesia", plus light-up keyboards |
| synthesia midi (104) | "How does Synthesia work?", songs section, FAQ about MIDI files |
| is synthesia good for learning piano (94) | its own H2 with a skills chart, plus an FAQ |
| synthesia vs sheet music (85) | its own H2 with a side-by-side diagram |

**Why CTR was so low:** "synthesia app" ranks around position 5 with 0 clicks. The old title ("Fun Piano Game or Fast Track to Nowhere?") and description didn't say what searchers get. The new snippet promises the price, free vs paid, setup and a teacher's verdict.

The article also clears up the name clash with Synthesia, the AI video company, in the text and in an FAQ. Some "synthesia app" searches are probably about that company, so some impressions will never click, and that's normal.

## GEO / AEO structure (for AI Overviews, ChatGPT, Perplexity)
- A quick-answer box directly under the intro, and every H2 answered in its first sentence
- A "Synthesia at a glance" fact table with dates and sources, so it can be quoted
- Question-style H2s that match real queries, plus a 12-question FAQ with FAQPage schema
- Precise, dated facts (version 10.9 from December 21, 2022; prices checked October 31, 2026) with links to the official sources
- SoftwareApplication schema with developer, version, offer and review

## How to publish
1. **Images:** upload the 13 new images from `synthesia-piano-review-images.zip` in **October 2026**, so they live under `/content/images/2026/10/`. If you upload later, find and replace `2026/10` in `article.html` and in `code-injection-header.html`.
   - 11 inline images, the verdict-card image `synthesia-app.webp`, and the social image.
2. **Reused (already on your site):**
   - `2025/05/Synthesia-Example.jpg`
   - `2025/05/Synthesia-Functions-2.jpg`
   - the Pianoforall video `content/media/2025/04/Pianoforall-eBook-Example.mp4`
3. **Article:** delete the old content and paste `article.html` into one HTML card. The verdict card turns on the sticky bar ("Try it free" → the official free download).
4. **Links:**
   - The Synthesia buttons go to the official site. They're not affiliate links, so they use `nofollow noopener`.
   - The Pianoforall button uses your `/pianoforall` link with `rel="sponsored nofollow noopener"`. The old post used `/PFA`, so check which one you want to keep.
5. **Date:** update the post so the new "updated" date shows, then request indexing.

## Facts checked (October 31, 2026)
| Fact | Source |
|---|---|
| Unlock key $29, struck-through $39 ("18th Anniversary Sale" banner); one-time, "NOT a subscription", all future updates included | synthesia.app home and /unlock |
| A website key works on PC, Mac, iPad and Android at the same time; in-app purchases only on that store's devices; Google Family Library not supported | synthesia.app/unlock |
| Refunds up to 180 days (PayPal) or 120 days (other payment methods) for website purchases | synthesia.app/unlock |
| Free: 20+ of the 150+ songs fully playable; all MIDI device features, including key lights | synthesia.app/unlock |
| Free: the first 20 seconds of any song | Synthesia news, 10.3; the unlock page mentions the "time limit on outside songs" |
| iPad in-app purchase "Play Any Song" $7.99; App Store 3.9 (3.6K ratings); version 10.9.2 (Feb 14, 2023); iPad and Apple Vision only (no iPhone) | Apple App Store listing |
| Google Play 3.9 (93.5K reviews), 10M+ downloads, updated Feb 11, 2025 | Google Play listing |
| Version 10.9, Dec 21, 2022; Windows 7 (64-bit)+, macOS 10.9+, Android 5.0+, iPad | synthesia.app/download and /news |
| 10.8 (Oct 31, 2021): MusicXML and Apple silicon | synthesia.app/news |
| History: Piano Hero in 2006, the Activision request and the rename in 2007, Learning Pack 2008, iPad 2012, Music Store 2013, Android 2014, Chromebook 2018, recorder 2021 | synthesia.app/About |
| Original author Nicholas Piegdon; developer Synthesia LLC | Wikipedia; App Store |
| Melody, rhythm and recital modes; 100-point song scores | Synthesia guide "Choosing a song" |
| Melody practice waits for the correct note; left hand blue, right hand green; finger hints 1 to 5; speed + and −; timeline jump; loops | synthesia.app home and the "Playing your first song" guide |
| Sheet music toggle F2, falling notes off F5 | Synthesia guide "Enabling sheet music" |
| Labels: finger hints, note names, fixed and movable do, scale numbers, virtual piano mapping | Synthesia guide "Showing labels" |
| Recorder: up to 6 tracks, unlocked only | Synthesia guide "Recording" |
| Music Store songs mostly $0.99 to $2.99, plus bundles | synthesia.app/store |
| Windows 10 Bluetooth MIDI (2017); Chromebooks need ChromeOS 65+ for USB MIDI | synthesia.app/About |

**Microphone:** Synthesia only describes MIDI input, so the article says "I found no microphone mode in its official material".

**Corrected from the old article:**
- "$39 Learning Pack": it's now called an unlock key, and it's on sale for $29.
- "unlocking hand separation and practice modes": the free version includes every feature on 20+ songs, and the unlock is about songs and the recorder.
- "No sheet music": Synthesia does show sheet music.
- "No music theory at all": still true, and it stays in the article.

## Videos (each uploader checked with YouTube oEmbed)
| Video | Channel |
|---|---|
| Synthesia `sDIkjYKIsVg` (kept from the old post) | Synthesia LLC (official) |
| Synthesia product review - Awesome way to learn piano pieces! `yz7BPe1g9iY` | PianoManChuck |
| Why I Hate Synthesia (Don't Learn Piano Like This!) `7c4sHbcHss4` | Peterson Piano Academy |

**Removed:** "Oboedire (Synthesia Piano Tutorial)" `0mrkc3VbvTY`. It was just a tutorial video and didn't explain the app.

**Swap options:**
- `4jJTsWQHmEg`: Synthesia Pianist, "Everything You Need to Start…"
- `l6dQHpzsEMU`: how to connect a keyboard (2025)

## Internal links
**Out (14):** the articles below, all returning 200. /pianoforall is the affiliate redirect.
- /pianoforall-review/
- /piano-marvel-review/
- /teach-yourself-piano/
- /piano-basics-a-beginners-guide-to-the-keyboard/
- /best-beginner-pianos/
- /yamaha-p-145-review/
- /simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/
- /flowkey-review/
- /pianovision-review/
- /best-free-piano-learning-apps/
- /best-piano-lessons-online/

**In:** link to this review from:
- /best-free-piano-learning-apps/
- /pianovision-review/ (it already links here)
- /teach-yourself-piano/ (in the apps or tools section)
