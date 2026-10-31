# Hover Chords: Piano Chord Finder (Chrome extension)

Hover any chord name on a chord sheet to see it on a piano keyboard. Click a chord to pin it and hear it, step through its inversions, and transpose the whole song up or down. Free, no account, no tracking. Made by Pianoers.com.

## Try it in Chrome (2 minutes)
1. Open `chrome://extensions` and switch on **Developer mode** (top right).
2. Click **Load unpacked** and choose the `extension` folder.
3. Open any chord sheet (Ultimate Guitar, a church song sheet, a ChordPro file in the browser…) and hover a chord.
4. Click the Hover Chords icon in the toolbar for the switches: on/off for this site, transpose, sound, and on/off for all websites.

To test chord sheets saved on your computer, also turn on **Allow access to file URLs** on the extension's Details page.

## What it recognises
- **Chord lines:** chord lines in chord sheets (`C   G   Am   F`), bar lines (`| Am7 | Fmaj7 |`), repeat marks (`x2`), `N.C.`
- **ChordPro brackets:** inline chords in brackets (`[C]Let it [G]be`)
- **Chord-site markup:** sites that wrap each chord in its own element, like Ultimate Guitar
- **Chord types:** majors, minors, 7ths, maj7, m7, dim, dim7, half-diminished (ø, m7b5), aug, sus2, sus4, 6, m6, 6/9, 9, 11, 13, add9, altered notes (b5, #5, b9, #9, #11, b13), power chords (C5) and slash chords (C/E)
- **Correct spelling:** notes are spelled from the chord, so C7 shows Bb, not A#

It leaves normal sentences alone. A line only counts as chords when every word on it is a chord or a bar line. A single letter on its own (like "A" or "B" in a quiz) only counts on pages that clearly have chord sheets, and only when several chords sit together. Tested on: a chord sheet, ChordPro text, Ultimate-Guitar-style markup, chords added after the page loads, and pages of normal prose and quizzes (0 false matches).

## Files
| File | What it does |
|---|---|
| `manifest.json` | Manifest V3, permissions `storage` and `activeTab` only |
| `chords.js` | Chord parser, spelling, inversions, transposition |
| `content.js` | Finds chords on the page, the tooltip (in a shadow DOM, so the page's CSS can't break it), sound and transposing |
| `popup.html`, `popup.css`, `popup.js` | The toolbar popup |
| `icons/` | 16, 32, 48 and 128 px icons |

Sound is made in the browser with Web Audio (no audio files). Settings are saved with `chrome.storage.local` on the user's own computer.

## Publish on the Chrome Web Store
1. Register a developer account at https://chrome.google.com/webstore/devconsole (one-time $5 fee).
2. Click **New item** and upload `hover-chords-1.0.0.zip`.
3. Copy the listing text, permission reasons and privacy answers from `store/STORE-LISTING.md`.
4. Upload the screenshots from `store/` (1280 × 800) and the 128 px icon.
5. Put `https://pianoers.com/` in the **Official URL / Homepage** fields. Publish the privacy policy (`store/PRIVACY.md`) at `https://pianoers.com/hover-chords-privacy/` and paste that URL.
6. Submit for review. Reviews usually take from a few days to a couple of weeks.

## Getting real backlinks from it
- Make a page on pianoers.com (for example `/hover-chords/`) with a short demo, the screenshots and the Web Store button. That's the page blogs, forums and "best extensions for musicians" lists will link to.
- Share it where pianists ask for chord help: r/piano, r/WorshipMusic, piano forums, Product Hunt.
- The tooltip's "Learn more piano chords at Pianoers.com" link and the popup credit send users to your site. A page of chord guides would be the ideal place for them to land.

## Version 1.0.0 ideas for later
- Left-hand bass patterns and voicings beyond close position
- A "play along" mode with a USB MIDI keyboard (Web MIDI)
- A capo setting for guitar chord sheets
