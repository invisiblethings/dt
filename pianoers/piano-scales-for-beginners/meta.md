# Piano Scales for Beginners: publishing notes

**New post.** URL slug: `piano-scales-for-beginners`

| Field | Value |
|---|---|
| Post title (H1) | Piano Scales for Beginners: The First 9 Scales to Learn (With Fingerings and a Free Chart) |
| Meta title (55 chars) | Piano Scales for Beginners: First 9 Scales + Free Chart |
| Meta description (157 chars) | The first 9 piano scales to learn, in order, with right- and left-hand fingerings, a play-along scale player, a 10-minute routine and a free printable chart. |
| Excerpt | Which piano scales to learn first, in what order, and with which fingers. A piano teacher's guide with a play-along scale player and a free printable chart. |
| Tags | Lessons (primary) |
| Author | Katarina |
| Feature image | `piano-scales-for-beginners-featured.webp`. Alt: Piano scales for beginners, the C major scale on a keyboard with right-hand finger numbers |
| Facebook / X image | `piano-scales-for-beginners-social.jpg` (JPG, so every social network accepts it) |
| Facebook / X title | Piano Scales for Beginners: The First 9 to Learn (Free Chart) |
| Code injection → Post header | paste `code-injection-header.html`: FAQPage (10 questions), HowTo (the 10-minute routine) and the PDF chart as a DigitalDocument |

## How to publish
1. **Images:** upload the 14 `.webp` images from `piano-scales-for-beginners-images.zip` in November 2026, so they live under `/content/images/2026/11/`. The easiest way: drag them all into an image card in the post, then delete the card. The featured image goes in the post settings, and the social `.jpg` goes in the Facebook and X card settings.
2. **PDF:** add a File card, upload `piano-scales-chart-for-beginners.pdf`, then delete the card. The download box links to `/content/files/2026/11/piano-scales-chart-for-beginners.pdf`. If Ghost renames the file (for example `-1.pdf`), change the link in the article (it appears once in `article.html`) and the `url` in `code-injection-header.html`.
3. **Article:** paste `article.html` into **one** HTML card. It includes the scale player, which runs inside the card: no theme update needed.
4. **Check after publishing:**
   - The scale player draws a keyboard and plays sound when you press Play (turn your phone's silent switch off to hear it on an iPhone).
   - The PDF downloads.
   - The three videos show their thumbnails and play when clicked.
   - Run the URL through [Google's Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org/).
5. **Request indexing** in Search Console.

## Links in (add these after publishing)
This page should be the site's main page for scales, so link to it from:
- `/piano-basics-a-beginners-guide-to-the-keyboard/`: wherever scales or the C major scale are mentioned, anchor **"piano scales for beginners"**
- `/teach-yourself-piano/`: the step that mentions warm-ups or scales, anchor **"which scales to learn first"**
- `/piano-practice-4-tips-to-successful-sessions/`: the warm-up tip, anchor **"a 10-minute scale routine"**
- `/hover-chords/`: one line under the chord section, anchor **"learn the scales the chords come from"**

## Keywords and where they sit
| Keyword (US monthly searches) | Placement |
|---|---|
| piano scales for beginners / scales for piano beginners / beginners piano scales (1,300 each, same intent) | H1, meta title, slug, quick answer, FAQ H2, image file names |
| beginner piano scales chart / piano scales chart for beginners (40) | H2 "Beginner piano scales chart: notes and fingerings", the table, the chart image, the PDF name |
| free printable piano scales for beginners (20) | download box ("Free printable"), PDF, DigitalDocument schema |
| learn piano scales / learning piano scales for beginners (140, 20) | H2 "The best order to learn piano scales", FAQ |
| best way to learn piano scales (20) | the practice section's first sentence |
| basic piano scales (110) | intro |
| piano arpeggios for beginners / beginner piano arpeggios chart (30, 20) | H2 "Piano arpeggios for beginners", the arpeggios chart image |
| learning piano chords and scales (20) | H2 "Should you learn scales or chords first?" |
| beginner piano scales sheet music (20) | partly covered by the printable chart. A sheet-music version (notation) would cover it fully: worth adding later |

## What this page has that the top results don't
- **Fingering diagrams for both hands** on every scale (most competitors show the right hand only, or just list numbers).
- **One clear learning order** with a reason for each step, plus the "one fingering covers 8 of 9 scales" shortcut.
- **A play-along scale player** with finger numbers, both hands, and adjustable speed.
- **A free one-page printable chart** with a practice tracker.
- **A practice routine and tempo ladder**, the hands-together contrary-motion tip, and arpeggios, pentatonic, blues and chromatic scales in one place.
- An answer-first structure (quick answer, question H2s, a table and 10 FAQs), which suits featured snippets and AI answers.

## Videos (all checked: live, and the channel names match)
| Video | Channel | Section |
|---|---|---|
| C Major Scale Fingering (1 Octave, Hands Separately) | eNovativePiano | C major |
| Thumb under technique in scales, right hand | MyPianoTutorial | Thumb under |
| Practicing scales can be FUN | Nahre Sol | Practice routine |

## Files
- `article.html`: paste into one HTML card
- `code-injection-header.html`: post header code injection
- `images/`: 14 WebP images, the social JPG, and the PDF
- `src/`: scale data (with a self-check that tests every note and fingering), image and PDF generators, and the scale player template
