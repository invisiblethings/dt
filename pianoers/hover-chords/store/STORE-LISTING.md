# Chrome Web Store listing (SEO-optimised)

The Web Store's search reads three things: the **name**, the **summary** (both come from `manifest.json`) and the **description**. Each one leads with the phrases people search for: piano chords, chord finder, chord chart, transpose chords, chord sheets. Keyword stuffing breaks Google's Web Store policy, so every keyword sits in a real sentence.

## Name (from the manifest, 45 of 75 characters)
Hover Chords: Piano Chord Finder & Transposer

## Summary (from the manifest, 120 of 132 characters)
See any chord on a piano keyboard. Hover chord names on chord sheets to view, hear and transpose piano chords instantly.

## Category
**Education.** Pianists and worship musicians looking for chord tools browse this category.

## Language
English

## Description (paste into the "Description" field)

Hover Chords is a free piano chord finder for Chrome. Hover any chord name on a chord sheet and a piano chord chart appears right on the page: the keys to press, the note names, and a button to hear the chord.

Chord sheets and song websites are written for guitar players. When you're at the piano, a chord like F#m7b5, Cadd9 or D/F# means stopping to look it up. Hover Chords turns every chord on the page into an instant piano chord diagram, so you can keep your hands on the keys and your eyes on the music.

★ WHAT YOU CAN DO
• See piano chords instantly: hover a chord to see it on a piano keyboard, with every note labelled
• Hear the chord: click to pin the chord diagram and play it with a piano-like sound
• Learn inversions: step through root position, 1st, 2nd and 3rd inversions to find smooth voicings
• Transpose chords: move every chord on the page up or down one semitone at a time, so you can play the song in any key
• Read slash chords: the bass note of chords like C/E and G/B is shown in its own colour
• Get the right note names: notes are spelled correctly for each chord, so C7 shows Bb, not A#

★ WORKS WITH THE CHORDS MUSICIANS REALLY WRITE
Major and minor chords, 7th chords, maj7, m7, diminished, half-diminished (m7b5), augmented, sus2 and sus4, 6 and m6, 6/9, 9th, 11th and 13th chords, add9, altered chords (b5, #5, b9, #9, #11, b13), power chords and slash chords.

★ WORKS ON THE PAGES YOU ALREADY USE
Song chord sheets, lyrics with chords, worship and church song sheets, guitar chord sites and tabs, and ChordPro text like [C]Let it [G]be. It also finds chords that load after the page opens. Normal text is left alone: a line only counts as chords when every word on it is a chord.

★ WHO IT'S FOR
• Pianists and keyboard players reading guitar chord sheets
• Beginners learning piano chords and chord shapes
• Worship team keyboardists who need to change the key quickly
• Singers who want to transpose a song to suit their voice
• Piano teachers and students building chord vocabulary

★ PRIVATE BY DESIGN
• No account and no sign-up
• No tracking and no data collected
• Works offline; the sound is made in your browser
• Turn it off for any website, or everywhere, from the toolbar

★ HOW TO USE IT
1. Open any chord sheet or song page.
2. Hover a chord name to see it on the piano keyboard.
3. Click the chord to pin it and hear it, then use ‹ › to change the inversion.
4. Click the Hover Chords icon to transpose the song, switch the sound off, or turn it off on a site.

★ QUESTIONS
Is it free? Yes, completely free, with no ads.
Does it work with guitar chord sites? Yes. It reads the chord names and shows them as piano chords.
Can I transpose a whole song? Yes. Use the + and − buttons in the toolbar popup; every chord on the page changes key at once.
Does it read my data? No. Everything happens on your computer, and nothing is sent anywhere.

Made by Pianoers.com, a piano teaching site with free lessons and chord guides for beginners and adult learners: https://pianoers.com/

## Graphic assets (all in `store/assets/`)
| Field | File | Spec |
|---|---|---|
| Store icon | `store-icon-128.png` | 128 × 128, 96 × 96 artwork with 16 px transparent padding (Google's icon guideline) |
| Screenshot 1 | `screenshot-1-see-any-chord.png` | 1280 × 800, 24-bit PNG, no alpha |
| Screenshot 2 | `screenshot-2-hover-click-hear.png` | 1280 × 800 |
| Screenshot 3 | `screenshot-3-inversions.png` | 1280 × 800 |
| Screenshot 4 | `screenshot-4-transpose.png` | 1280 × 800 |
| Screenshot 5 | `screenshot-5-real-chord-sheets.png` | 1280 × 800 |
| Small promo tile | `small-promo-tile-440x280.png` | 440 × 280, no alpha |
| Marquee promo tile | `marquee-promo-tile-1400x560.png` | 1400 × 560, no alpha |
| Global promo video | Optional. Leave it empty, or add a 30-second screen recording of hovering, pinning and transposing (YouTube link) |

Upload the screenshots in the order above: the first one appears as the main image. The screenshot song is "Amazing Grace", which is public domain, and the sheet is on a made-up example site, so it doesn't use anyone's lyrics or brand.

## Permission reasons (for the review form)
- **storage:** saves your settings (on or off per site, the transpose amount, sound) on your computer.
- **activeTab:** lets the toolbar popup show which website you're on, so you can switch Hover Chords on or off for that site.
- **Content script on http and https pages:** chord sheets can be on any website, so the script checks the page text for chord names. It only changes the page when it finds chords, and it never sends page content anywhere.

**Single purpose:** shows the chords on the page you're reading as piano chord diagrams that you can hear and transpose.

## Privacy practices answers
- Collects user data: **No** (none of the listed categories).
- Sells or transfers data: **No**.
- Uses or transfers data for unrelated purposes: **No**.
- Uses data for creditworthiness or lending: **No**.
- Remote code: **No** (all code ships inside the extension).
- Privacy policy URL: https://pianoers.com/hover-chords-privacy/

## Official URL and support
- **Homepage URL:** https://pianoers.com/hover-chords/
- **Support URL:** https://pianoers.com/contact/
