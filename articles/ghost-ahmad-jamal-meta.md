# Ghost post settings: Ahmad Jamal

## Title field
Ahmad Jamal: Biography, Musical Style, and Essential Recordings

## URL / slug (do not change)
ahmad-jamal-biography

## Meta title (60 chars)
Ahmad Jamal: Biography, Musical Style & Key Recordings

## Meta description (156 chars)
The life of Ahmad Jamal (1930-2023): Pittsburgh prodigy, the Pershing trio, Poinciana, his influence on Miles Davis, and the albums hip-hop producers mined.

## Custom excerpt
He played the two notes that mattered and let the trio hold the rest. The life, the style and the essential recordings of Ahmad Jamal, 1930 to 2023.

## Tags
Pianists (primary), Jazz

## Feature image
Keep the existing Ahmad-Jamal-Biography.webp.

Feature image alt text:
Jazz pianist Ahmad Jamal seated at a grand piano

## Code injection -> Post header
Paste ghost-ahmad-jamal-schema.html. It contains two blocks:

- FAQPage, for the ten questions at the foot of the post
- Person, describing Ahmad Jamal with birth and death dates, birthplace,
  awards and sameAs links to Wikipedia and the NEA

The Person block is what helps an AI assistant connect this page to the
real-world entity. Ghost emits the Article schema itself, so there is no
Article block here and you should not add one.

VERIFY BEFORE PUBLISHING: the third sameAs URL in the Person block is a
MusicBrainz link I could not confirm. Either replace it with the correct
MusicBrainz artist URL or delete that line. Wikipedia and the NEA links are good.

---

# This was a rewrite, not an edit

The original had factual errors serious enough that fixing them meant starting
over. Corrections made:

| Original said | Correct |
|---|---|
| No mention of his death | He died 16 April 2023, aged 92. The old post was written in 2022 and still referred to him in the present tense. |
| NEA Jazz Masters award in 1970 | 1994. The NEA programme did not exist until 1982. The original contradicted itself, giving both 1970 and 1994. |
| "Mary Caldwell Dawson" | Mary Cardwell Dawson |
| "Israel Cosby" | Israel Crosby |
| "Vernell Fournier" | Vernel Fournier |
| "Johnny Mandal" | Johnny Mandel |
| Formed first trio 1950, performed at the Ember Club | The Three Strings formed in Chicago and were signed after John Hammond saw them at the Embers in New York; first Okeh sides in 1951 |
| "Ahmad's Blues" was his first album, on Okeh | "Ahmad's Blues" is a composition he first cut for Okeh around 1951-52. The album of that name is a September 1958 live date at the Spotlite Club in Washington. |
| Trio replaced Ray Crawford with a drummer in 1956, Fournier joined 1958 | Walter Perkins joined on drums in 1956; Fournier replaced the guitar chair in 1957, a year before the Pershing recording |
| "remained on the top ten best-selling hits for almost a hundred and eight weeks" | 108 weeks on the best-seller charts, and over a million copies sold |
| No birth name | Born Frederick Russell Jones |
| No mention of the name change or his conversion to Islam | Added, dated 1950 |
| No mention of the Grammy | Lifetime Achievement Grammy, 2017 |

Everything in the new version is sourced from his Wikipedia entry, the NEA's
Jazz Masters page, published obituaries, and the album documentation. Where
sources disagreed (107 vs 108 weeks on the chart) I used the figure the NEA and
most obituaries carry.

# What is new

- A fact box, so an AI assistant can lift the core facts as a unit
- A 16-entry career timeline, built in HTML and CSS rather than as an image, so
  the years and events are real text that crawlers read and phones reflow
- A section explaining why "Poinciana" works, covering Fournier's second-line
  drum pattern, Crosby's repeating bass figure and Jamal's use of silence
- The Miles Davis relationship, with the quote from his autobiography and the
  Red Garland instruction
- The Alhambra story, including the detail that it served no alcohol on
  principle and lasted about a year
- The hip-hop chapter: Pete Rock's use of "I Love Music" for Nas, J Dilla's use
  of "Swahililand" for De La Soul, and why his records sample so well
- "What pianists can learn from him", five practice ideas drawn from his playing.
  This section is the one no encyclopedia has, and it is why a search engine
  should prefer this page over Wikipedia for a pianist's query.
- An essential albums table and an awards table
- Ten FAQ entries with schema
- Captions for the three videos, which I confirmed are still live

Roughly 1,100 words to roughly 2,750.

---

# One line to check

I wrote that Jamal disliked the word "jazz" and called his music American
classical music. This is well documented across interviews and I am confident
in it, but it is a claim about a person's stated views, so read that paragraph
and confirm you are happy with how it is phrased.

---

# POST-PUBLICATION FIXES (checked live on 14 September 2026)

The published page is correct: all 16 timeline entries, the 9-row fact box, the
10 FAQ blocks, the FAQPage and Person schema, all three videos and all images
render, and none of the old errors survive. Two things need a re-paste.

## 1. Tables were running off the screen (fixed in ghost-ahmad-jamal.html)

Your theme sets `white-space: nowrap` on table cells, which assumes the table
sits in a scrolling container. It didn't, so the albums table rendered 1015px
wide inside a 720px column. On a 390px phone the "Why it matters" column started
at x=428 and ran to x=1035, entirely off screen and unreachable, because the page
itself does not scroll sideways. Readers on phones could not see that column at
all, and desktop readers lost the right-hand edge of it.

The updated HTML adds a small style block that lets the cells wrap and keeps a
scroll container as a fallback. Verified in a headless browser at 1280px and
390px: cells wrap, both tables fit, nothing sits off screen, and the page still
does not scroll sideways.

The same fix is in the updated ghost-piano-basics.html and
ghost-piano-practice.html, so apply it there too if you publish those.

## 2. The MusicBrainz URL was wrong (fixed in ghost-ahmad-jamal-schema.html)

The sameAs link I flagged before publishing is live and points at an artist ID
that does not exist. I pulled the real identifiers from Wikidata and rebuilt the
Person block. It now lists Wikipedia, Wikidata (Q379613), the correct MusicBrainz
ID, Discogs, and the NEA. Adding Wikidata is a genuine improvement: it is the
strongest single signal for tying the page to the real-world entity.

## 3. Internal links added

The published version links out to nothing on your own site, which wastes the
authority the page will earn. The updated HTML adds one sentence at the end of
"What pianists can learn from him" linking to the piano practice guide and the
piano basics guide. Both are natural in context rather than bolted on.

## To apply

Replace the HTML card contents with the updated ghost-ahmad-jamal.html, and
replace the post header code injection with the updated
ghost-ahmad-jamal-schema.html.
