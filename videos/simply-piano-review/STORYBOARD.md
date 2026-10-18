---
format: 1920x1080
duration: 75s
message: "Simply Piano is fun for kids, but weak value for adults"
arc: listicle (verdict-first: verdict → evidence items → price → who it's for → landing)
audience: "Adults and parents considering Simply Piano before paying for a subscription"
mode: autonomous
music: none
---

## Video direction

- palette system: broadside two-register system from frame.md. DARK register (ink-black ground, cream type, fire-orange accent) is the default; ORANGE register (fire-orange ground, ink-black type) is reserved for the two verdict punches: Frame 2's "adults → no" payoff and Frame 9's closing line. Right/wrong semantics never use green/red (off-palette): "right" = cream fill + check mark, "wrong" = fire-orange fill + cross. Single accent only.
- type: Barlow lowercase 900 as graphic primitive (display / fadelist-title / stat-value ramps) for heroes and numbers; IBM Plex Mono uppercase label for chrome, kickers and footnotes; numbers use tabular figures.
- motion grammar + reveal model: power3 long-tail settles, no overshoot/bounce. Every frame reveals each element on its spoken cue (VO-paced), with most reveals in the back half; nothing front-loaded. Holds stay still; at most subtle jitter (sine-wave-loop, low amplitude) on one held hero.
- recurring motifs: a thin piano-key strip (alternating cream/ink keys, 1px hairlines) is the film's ambient ground layer at low opacity (~15%) along the top edge of dark frames; a mono chrome rail "SIMPLY PIANO REVIEW · NN/09" top-left on body frames (suppressed on frames 1, 2, 9 per frame.md declarative rule).
- rhythm / held frames: Frame 2 (verdict) and Frame 7's "$340" landing are the deliberate held beats; Frame 9 holds on the end card for the last ~2s. Frames 4–6 are the busiest reveal run.
- negative list: no Simply Piano logos, app UI or screenshots; no stock photos; no purple-blue AI gradients or bokeh; no green/red; no bouncy entrances; no lazy breathing, no back-half slow pan/push; no front-load-then-freeze slideshow; no screensaver floating elements; nothing in the bottom ~17% caption band.

## Frame 1 — Three and a half stars

- scene: Five big star outlines; 3.5 fill in fire-orange one by one, then "$169.90 / YEAR" counts up beneath and a question lands
- voiceover: "Simply Piano. Three and a half stars. A hundred and seventy dollars a year. Is it worth it?"
- duration: 5.739s
- transition_in: cut
- status: outline
- src: compositions/frames/01-three-and-a-half-stars.html
- type: hook
- persuasion: Shocking statistic + rhetorical question
- beat: Curiosity and skepticism

narrativeRole: Opens the gap: the rating and the price side by side make "worth it?" the only question that matters.
keyMessage: This is a mid-rated app with a premium price, so value is the question.
- blueprint: dataviz-countup (Adapt)
- focal: five-star rating row filling to 3.5 (registry component star-rating-fill)
- roles: star row = foreground subject · "$169.90 / year" counter (registry component count-up) = supporting hero · piano-key strip = background (dim ~15%) · question line = supporting
- sfx: click-soft, impact-bass-2

Adapt: keep the cold-open statistic signature (one hero number lands and dominates); stars then price in one stack instead of a chart push-through.
Scene 1 (0.0–1.4s): dark register, piano-key strip faint at top. Mono kicker "SIMPLY PIANO" types in upper-left as the VO says the name. Centered, nothing else yet.
Scene 2 (1.4–3.0s): on "three and a half stars", five huge outline stars spring in as one staggered beat across the upper-middle (~55% width), then the fire-orange fill sweeps left→right and stops halfway through star four (star-rating-fill → stat-bars-and-fills star wipe); "3.5 / 5" lands beside in stat-value.
Scene 3 (3.0–5.2s): on "a hundred and seventy dollars a year", "$169.90" counts up from $0 below the stars in display weight (count-up → counting-dynamic-scale), "/ year" in mono label; stars dim to 60% so the price takes hierarchy.
Scene 4 (5.2–end): on "is it worth it?", "worth it?" enters via per-word staggered reveal in fire-orange under the price; hold still, subtle jitter on the question mark only.


## Frame 2 — The short answer

- scene: Verdict split in two lines on a black plane: "KIDS → MAYBE" lands, then "ADULTS → NO" slams in larger, in orange
- voiceover: "Short answer: for kids — maybe. For adults who want to really play — no."
- duration: 4.629s
- transition_in: cut
- status: outline
- src: compositions/frames/02-the-short-answer.html
- type: branding
- persuasion: Distillation + comparison of two options
- beat: Surprise + clarity

narrativeRole: Lands the thesis by beat 2 so everything after is evidence.
keyMessage: Fine for kids, weak value for adults.
- blueprint: kinetic-type-beats (Reproduce)
- focal: the word "no"
- roles: "kids → maybe" line = supporting · "adults → no" = foreground subject · register flip to orange = background
- sfx: whoosh-short, impact-bass-1

Scene 1 (0.0–1.2s): dark register, empty. Mono kicker "SHORT ANSWER" enters top-left on the VO.
Scene 2 (1.2–2.8s): on "for kids — maybe", "kids → maybe" slams in at h1 scale, left-aligned upper third (kinetic-beat-slam, side-snap), cream.
Scene 3 (2.8–4.4s): on "for adults who want to really play", "adults →" slides in on the line below; then on "no" the whole frame hard-cuts to the ORANGE register and "no." lands at display scale (~45% of frame height) in ink-black, right of the arrow (kinetic-beat-slam scale-slam, smooth settle). "kids → maybe" stays, recolored to 55% ink.
Scene 4 (4.4–end): held beat — completely still.


## Frame 3 — A note-checker

- scene: A phone with a microphone wave listens to a row of piano keys; one key lights green (right), the next red (wrong)
- voiceover: "Here's what it is: an app that listens through your phone's mic — and checks if you hit the right note, at the right time."
- duration: 7.168s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/03-a-note-checker.html
- type: product_intro
- persuasion: Demonstration (show the mechanism running)
- beat: Orientation

narrativeRole: Names the thing plainly — a mic-based note-checker — which sets up every limitation later.
keyMessage: Simply Piano judges notes and timing by listening, nothing more.
- blueprint: compose
- focal: a row of 8 invented piano keys being "listened to"
- roles: piano keys = foreground subject (~60% width, upper-middle) · minimal phone outline with a mic waveform = supporting (left third) · "NOTE-CHECKER" coined-term label = supporting · key strip ground = background
- sfx: key-press, ping

Compose: a mechanism demo — sound travels from keys to a phone, the phone judges.
Scene 1 (0.0–2.0s): on "here's what it is", the coined term "a note-checker" enters as h2 top-left via per-word reveal; mono chrome rail "03/09".
Scene 2 (2.0–4.2s): on "listens through your phone's mic", a flat phone outline self-draws on the left (svg-path-draw) and a mic waveform inside it draws as a polyline (svg-path-draw), connected to the key row on the right by a dashed hairline.
Scene 3 (4.2–6.2s): on "the right note", one key presses (press-release-spring, no overshoot) and fills cream with a small check above it.
Scene 4 (6.2–end): on "at the right time", a second key presses and fills fire-orange with a cross; a mono label "RIGHT / WRONG — THAT'S IT" fades in under the row and holds.


## Frame 4 — What actually works

- scene: Three cards stack in on a consistent stage: "EASY START", "STREAKS & POINTS", "5,000+ SONGS" (the number counts up)
- voiceover: "Credit where it's due. The onboarding is easy. Streaks and points keep you coming back. And there are over five thousand songs."
- duration: 8.235s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/04-what-actually-works.html
- type: benefit_highlight
- persuasion: Rule of three + numbered enumeration
- beat: Fairness and momentum

narrativeRole: Gives the app its due so the criticism that follows reads as honest, not a hit piece.
keyMessage: It's genuinely good at motivation and song choice.
- blueprint: grid-card-assemble (Adapt)
- focal: three top-border stat-cards in a triptych
- roles: three cards = foreground subjects · "5,000+" number = hero within card 3 · kicker "CREDIT WHERE IT'S DUE" = supporting · key strip = background
- sfx: click-soft, click-soft, click-soft

Adapt: keep the staggered self-assemble signature but stagger each card to its own VO cue (three cues, not one cascade).
Scene 1 (0.0–1.6s): on "credit where it's due", kicker types in top-left; three empty 1px top-border rules draw in left→right as a triptych across the upper 70% (svg-path-draw / stat-card).
Scene 2 (1.6–3.6s): on "the onboarding is easy", card 1 fills: mono label "01 · ONBOARDING", h2 "easy start".
Scene 3 (3.6–6.0s): on "streaks and points", card 2 fills: "02 · MOTIVATION", h2 "streaks & points", a row of seven small orange streak ticks fills left→right (stat-bars-and-fills).
Scene 4 (6.0–end): on "over five thousand songs", card 3 fills: "03 · LIBRARY", "5,000+" counts up in stat-value fire-orange (counting-dynamic-scale), "songs" under it; hold.


## Frame 5 — It can't see you

- scene: Same card stage flips dark: "IT CAN'T SEE YOUR HANDS" with a crossed-out eye over a hand silhouette, then a binary GREEN / RED pill pair with "no fingering, no dynamics, no musicality" striking through beneath
- voiceover: "But here's the catch. It can't see your hands — so bad habits slip right through. And the feedback is just green or red. No fingering. No dynamics. No musicality."
- duration: 11.307s
- transition_in: cut
- status: outline
- src: compositions/frames/05-it-cant-see-you.html
- type: feature_showcase
- persuasion: Common-belief vs reality + progressive disclosure
- beat: Unease

narrativeRole: The first two problems: the app's blind spot (technique) and its shallow feedback.
keyMessage: A mic can check notes, but it can't teach technique.
- blueprint: kinetic-type-beats (Adapt)
- focal: "it can't see your hands" headline, then the binary right/wrong pill pair
- roles: headline = foreground subject · simple hand outline with crossed-out eye glyph = supporting · right/wrong pills = foreground subject (second half) · three struck "no ___" lines = supporting · key strip = background
- sfx: whoosh-short, click-soft, click-soft, click-soft

Adapt: keep the multi-beat statement build; the second half swaps the headline for the pill pair via a velocity-matched cut instead of a token swap.
Scene 1 (0.0–1.6s): on "but here's the catch", mono kicker "THE CATCH" top-left; chrome rail "05/09".
Scene 2 (1.6–4.6s): on "it can't see your hands", h1 "it can't see your hands." per-word reveal, left 60%; a hand outline self-draws on the right 40% and a crossed-out eye stamps over it (svg-path-draw); on "bad habits slip right through" a mono line "BAD HABITS: UNCHECKED" appears under the headline.
Scene 3 (4.6–7.4s): cut-the-curve seam: headline and hand slide up and out together; on "just green or red", two big pills "right" (cream) and "wrong" (orange) spring into the center as one beat — "that's the whole conversation."
Scene 4 (7.4–end): on each of "no fingering" / "no dynamics" / "no musicality", one lead-scale line appears beneath the pills and is struck through by an orange line (css-marker-patterns sketchout-strike), three cues, three reveals; hold.


## Frame 6 — The ceiling

- scene: Simplified-song strip: a dense full score thins out to a few notes ("SIMPLIFIED"), then a vertical skill ladder BEGINNER → EARLY INTERMEDIATE → INTERMEDIATE → ADVANCED fills in orange and hits a hard ceiling line at early intermediate, tagged "≈ 1–2 YEARS OF LESSONS"
- voiceover: "The songs are simplified sketches, not what you hear on Spotify. And the ceiling? Early intermediate. About one to two years of lessons."
- duration: 9.259s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/06-the-ceiling.html
- type: feature_showcase
- persuasion: Concretization (ladder with a lid) + before/after
- beat: Concern

narrativeRole: Problems three and four: watered-down arrangements and a low skill ceiling.
keyMessage: You will outgrow it within a year or two.
- blueprint: dataviz-countup (Adapt)
- focal: vertical skill ladder with a hard ceiling line
- roles: simplified-score strip = supporting (Scene 1–2) · four-rung ladder = foreground subject · ceiling line + "≈ 1–2 years of lessons" tag = foreground · key strip = background
- sfx: whoosh-short, impact-bass-2

Adapt: keep the chart-that-fills-to-one-hero-reading signature; the chart is a skill ladder that fills and hits a lid.
Scene 1 (0.0–3.2s): on "the songs are simplified sketches", a wide staff strip across the upper third shows a dense cluster of ~24 note heads; on "simplified" 18 of them fade away leaving 6 (deterministic index order), label "SIMPLIFIED ARRANGEMENT" in mono; on "not what you hear on Spotify" a struck mono tag "≠ THE RECORD".
Scene 2 (3.2–5.4s): the staff strip slides left and out (cut-the-curve); on "and the ceiling?", a four-rung vertical ladder rises from the bottom of the safe area (left-center, 60/40): BEGINNER · EARLY INTERMEDIATE · INTERMEDIATE · ADVANCED in label type.
Scene 3 (5.4–7.4s): on "early intermediate", an orange fill climbs the ladder (stat-bars-and-fills scaleY) and stops dead at rung 2; a hard cream ceiling line slams across at that height with "THE CEILING" mono tag; rungs 3–4 dim to 25%.
Scene 4 (7.4–end): on "one to two years of lessons", h2 "≈ 1–2 years of lessons" enters on the right 40% beside the ceiling; hold.


## Frame 7 — The math

- scene: "$169.90 / YEAR" counts up, a "× 2 YEARS" multiplier slides in, total counts to "$340" in huge orange numerals with "to reach early intermediate" beneath; small chrome footnote "Prices as of July 2026 · USD"
- voiceover: "Now the math. A hundred and seventy dollars a year. Two years to hit that ceiling — about three hundred and forty dollars — with no technique coaching."
- duration: 9.749s
- transition_in: cut
- status: outline
- src: compositions/frames/07-the-math.html
- type: social_proof
- persuasion: Worked example with real numbers
- beat: Conviction

narrativeRole: Turns the ceiling into dollars, which is the core of the "weak value" verdict.
keyMessage: You pay about $340 to reach a level a subscription never takes you past.
- blueprint: dataviz-countup (Reproduce)
- focal: "$340" hero total
- roles: "$169.90 / year" (count-up component) = supporting · "× 2 years" = supporting · "$340" = foreground subject (display scale, fire-orange) · footnote "PRICES AS OF JULY 2026 · USD" = supporting chrome · key strip = background
- sfx: click-soft, click-soft, impact-bass-1

Scene 1 (0.0–1.4s): on "now the math", mono kicker "THE MATH"; chrome rail "07/09"; nothing else.
Scene 2 (1.4–3.6s): on "a hundred and seventy dollars a year", "$169.90" counts up in stat-value at upper-left (count-up → counting-dynamic-scale), "/ year" label beside it.
Scene 3 (3.6–5.6s): on "two years to hit that ceiling", "× 2 years" slides in under it; a 1px rule draws beneath (stat-card total line).
Scene 4 (5.6–7.6s): on "about three hundred and forty dollars", "$340" counts from $0 to $340 at display scale in fire-orange, center-right, value-scaled so the climb escalates (counting-dynamic-scale); "to reach early intermediate" in lead type beneath.
Scene 5 (7.6–end): on "with no technique coaching", mono line "+ $0 OF TECHNIQUE COACHING" appears; footnote "PRICES AS OF JULY 2026 · USD" sits bottom-right of the safe area from Scene 2 on; held beat — still, subtle jitter on "$340" only.


## Frame 8 — Who should buy it

- scene: Split screen: left "KIDS / CASUAL" with "TRY THE FREE TRIAL" check, right "SERIOUS ADULTS" with "SKIP THE SUBSCRIPTION" and a small line "a one-time course like Pianoforall"
- voiceover: "Buying for a kid who needs motivation? Try the free trial. An adult who wants to actually play? Skip the subscription — a one-time course like Pianoforall will take you further."
- duration: 12.075s
- transition_in: push-slide LEFT
- status: outline
- src: compositions/frames/08-who-should-buy-it.html
- type: cta
- persuasion: Comparison of two options
- beat: Resolve

narrativeRole: Turns the verdict into a decision for each viewer type.
keyMessage: Kids: trial it. Adults: buy a one-time course instead.
- blueprint: comparison-split (Adapt)
- focal: two equal panels, "kids" vs "serious adults"
- roles: left panel (dark, cream type) = foreground · right panel (dark with orange top-border) = foreground · verdict pills "try the free trial" / "skip the subscription" = supporting payoffs · Pianoforall line = supporting
- sfx: whoosh-short, whoosh-short, ping

Adapt: keep the two equal items entering from opposite wings with mirrored tilts and an inner-edge pill pop; flat register, no extreme 3D (split-tilt-cards, small tilt).
Scene 1 (0.0–2.6s): on "buying for a kid who needs motivation?", left panel enters from the left wing (split-tilt-cards) with mono label "KIDS & CASUAL PLAYERS" and h2 "need motivation".
Scene 2 (2.6–4.2s): on "try the free trial", a cream pill "✓ try the free trial" pops on the left panel's inner edge (spring-pop-entrance, smooth settle).
Scene 3 (4.2–6.6s): on "an adult who wants to actually play?", right panel enters from the right wing, label "SERIOUS ADULTS", h2 "want to actually play".
Scene 4 (6.6–8.6s): on "skip the subscription", an orange pill "✕ skip the subscription" pops on the right panel's inner edge.
Scene 5 (8.6–end): on "a one-time course like Pianoforall", lead line "→ a one-time course like Pianoforall goes further" types under the right panel; hold.


## Frame 9 — Appetizer

- scene: "AN APPETIZER" then "PRICED LIKE A MAIN COURSE" in massive lowercase type, callback 3.5 stars small above, then end card "Full review at pianoers.com"
- voiceover: "Simply Piano: an appetizer, priced like a main course. Full review at pianoers dot com."
- duration: 6.656s
- transition_in: crossfade
- status: outline
- src: compositions/frames/09-appetizer.html
- type: branding
- persuasion: Callback + distillation (the article's own metaphor)
- beat: Satisfaction

narrativeRole: Compresses the whole review to one memorable line and points to the full article.
keyMessage: Good starter, overpriced for what it is.
- blueprint: kinetic-type-beats (Adapt)
- focal: the line "an appetizer, priced like a main course"
- roles: small 3.5-star callback row = supporting · two-line closing statement = foreground subject · end card "full review at pianoers.com" = foreground (final beat) · orange register = background
- sfx: impact-bass-2

Adapt: statement builds across beats then resolves into a held URL end card (relaxed relay into end card variant).
Scene 1 (0.0–1.0s): ORANGE register; on "Simply Piano", a small ink-black star row at 3.5 (static, callback to frame 1) and mono label "SIMPLY PIANO" top-left.
Scene 2 (1.0–2.4s): on "an appetizer", "an appetizer," lands at display scale, ink-black, left-aligned upper half (kinetic-beat-slam rise).
Scene 3 (2.4–4.2s): on "priced like a main course", "priced like a main course." enters line two via per-word reveal at fadelist-title scale.
Scene 4 (4.2–end): on "full review at pianoers dot com", the statement lifts and dims to 55% ink while a 1px ink rule draws and "full review at pianoers.com" types in mono label scale-up (h3) below; hold still on the end card ~2s; final frame's own exit is a soft fade to black over the last 0.4s.

