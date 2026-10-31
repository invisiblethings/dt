# The course-finder quiz: how it works

The quiz sits right after the Quick answer (`id="quiz"`). It's the HTML card `cards/01-course-quiz.html`; the theme (Pianoers 1.2.0) turns it into seven questions whose answers are piano keys. Without JavaScript, readers see a plain list of links to the 8 course sections.

## The transparency statement (shown above the quiz)

> **How this quiz scores:** each answer gives points to the courses that fit it, and the most points wins. Pianoforall is our top pick and an affiliate partner, so it starts with 1 point and wins ties. Any of the 8 courses can win, and your result shows every course's score.

Every result also shows: the reasons it won (from the reader's own answers), a **Heads-up** when the winner is weak on something the reader asked for (with the best alternative named), a **Watch out** line, the **match score for all 8 courses** as bars, **"The $49 option"** panel for Pianoforall (or, when Pianoforall wins, the **runner-up**), and the **12-month cost race**.

## Scoring rules (the theme and `quiz-simulate.py` use the same rules)

1. Each answer adds the points in the table below. Pianoforall adds a **head start of 1**.
2. **Must-haves.** Two answers name the only courses that offer them: "an app must hear my notes" (Pianoforall, Pianote and Piano by Pictures can't win) and "answers from a real teacher" (only Pianote, Skoove and Pianoforall, which answers questions by email, can win). Their scores are still shown, greyed out.
3. Highest score wins. **Ties go to Pianoforall**, then to the course listed first.

## Full scoring table

| Question | Answer | Points |
|---|---|---|
| What do you most want to play? | Pop songs by chords | Pianoforall +4, Piano by Pictures +1, Simply Piano +1, Playground Sessions +1 |
| What do you most want to play? | A bit of everything | Pianoforall +3, Simply Piano +1, Pianote +1, Skoove +1 |
| What do you most want to play? | Blues, jazz, improvising | Pianoforall +3, Pianote +2 |
| What do you most want to play? | Specific songs, note for note | Flowkey +4, Playground Sessions +3, Simply Piano +2, Pianoforall -1 |
| What do you most want to play? | Classical, from the score | Piano Marvel +4, Skoove +1, Flowkey +1, Pianoforall -1 |
| How do you like to learn? | Watch, then copy | Pianoforall +2, Pianote +1, Flowkey +1 |
| How do you like to learn? | Step by step, like a book | Pianoforall +2, Piano Marvel +1, Skoove +1 |
| How do you like to learn? | Like a game | Simply Piano +4, Playground Sessions +3, Skoove +1 |
| How do you like to learn? | Pictures, not notes | Piano by Pictures +7, Flowkey +1, Skoove -1, Piano Marvel -2 |
| Do you want something to check your playing? | No, I'll check myself | Pianoforall +3, Piano by Pictures +1, Pianote +1 |
| Do you want something to check your playing? | Nice to have | Simply Piano +1, Skoove +1, Flowkey +1, Playground Sessions +1, Piano Marvel +1 |
| Do you want something to check your playing? | Not sure yet | none |
| Do you want something to check your playing? | Yes: an app must hear my notes | Skoove +3, Simply Piano +2, Flowkey +2, Playground Sessions +2, Piano Marvel +2 **Must-have:** only Simply Piano, Skoove, Flowkey, Playground Sessions, Piano Marvel can win. |
| Do you want something to check your playing? | Yes: answers from a real teacher | Pianote +6, Skoove +1 **Must-have:** only Pianote, Skoove, Pianoforall can win. |
| What will you practice on? | A keyboard, no cable | Pianoforall +1, Simply Piano +1, Flowkey +1, Skoove +1, Piano by Pictures +1, Playground Sessions -1 |
| What will you practice on? | A keyboard with USB | Playground Sessions +2, Piano Marvel +2, Skoove +1, Simply Piano +1, Flowkey +1 |
| What will you practice on? | An acoustic piano | Flowkey +2, Simply Piano +1, Skoove +1, Pianoforall +1, Pianote +1, Piano Marvel -1, Playground Sessions -2 |
| How does practice fit your week? | Short bursts | Flowkey +1, Simply Piano +1, Skoove +1 |
| How does practice fit your week? | Set sessions | Piano Marvel +1, Pianote +1, Playground Sessions +1 |
| How does practice fit your week? | On and off | Pianoforall +3 |
| How would you rather pay? | Once, then it's mine | Pianoforall +4 |
| How would you rather pay? | As little as possible | Pianoforall +2, Piano Marvel +1, Skoove +1, Flowkey +1 |
| How would you rather pay? | Monthly is fine | Simply Piano +1, Playground Sessions +1, Pianote +1, Flowkey +1, Piano by Pictures +1, Skoove +1, Piano Marvel +1 |
| Where are you starting from? | Total beginner | Pianoforall +2, Skoove +1 |
| Where are you starting from? | I know a little | Pianoforall +1, Flowkey +1, Pianote +1 |
| Where are you starting from? | Coming back | Pianoforall +1, Pianote +1, Flowkey +1, Playground Sessions +1 |
| Where are you starting from? | Working toward an exam | Piano Marvel +6, Skoove +1, Pianoforall -4 |

## Win-rate table (computed by `quiz-simulate.py`, every combination)

7 questions, 10800 answer combinations, head start 1.

| Course | Wins | Share | Won on a tie | Wins with a heads-up | Share with no head start, ties shared | Clearest example |
|---|---:|---:|---:|---:|---:|---|
| Pianoforall | 4905 | 45.4% | 628 | 2212 | 36.7% | Pop songs by chords / Watch, then copy / No, I'll check myself / A keyboard, no cable / On and off / Once, then it's mine / Total beginner |
| Simply Piano | 758 | 7.0% | 293 | 0 | 6.5% | Pop songs by chords / Like a game / Yes: an app must hear my notes / A keyboard, no cable / Short bursts / Once, then it's mine / I know a little |
| Piano Marvel | 1713 | 15.9% | 202 | 250 | 16.8% | Classical, from the score / Watch, then copy / No, I'll check myself / A keyboard with USB / Set sessions / As little as possible / Working toward an exam |
| Playground Sessions | 234 | 2.2% | 71 | 0 | 2.7% | Specific songs, note for note / Like a game / No, I'll check myself / A keyboard with USB / Set sessions / As little as possible / Coming back |
| Skoove | 427 | 4.0% | 161 | 51 | 3.9% | A bit of everything / Step by step, like a book / Yes: an app must hear my notes / A keyboard, no cable / Short bursts / As little as possible / Total beginner |
| Pianote | 1156 | 10.7% | 0 | 0 | 13.6% | Blues, jazz, improvising / Watch, then copy / Yes: answers from a real teacher / An acoustic piano / Set sessions / Monthly is fine / Working toward an exam |
| Flowkey | 1070 | 9.9% | 67 | 0 | 12.4% | Specific songs, note for note / Watch, then copy / Yes: an app must hear my notes / An acoustic piano / Short bursts / As little as possible / I know a little |
| Piano by Pictures | 537 | 5.0% | 0 | 209 | 7.5% | Pop songs by chords / Pictures, not notes / No, I'll check myself / A keyboard, no cable / Short bursts / Monthly is fine / Working toward an exam |

Pianoforall wins 4905 of 10800 combinations (45.4%).
Courses that can win: 8 of 8 (7 besides Pianoforall).
Pianoforall wins 628 combinations on the tie-break alone; with no head start and ties shared it would get 36.7%.
Pianoforall wins 2212 combinations with a heads-up shown (an answer it is weak on).

| Question | Answer | Most common result | Next |
|---|---|---|---|
| What do you most want to play? | Pop songs by chords | Pianoforall 62% | Piano Marvel 10%, Simply Piano 6% |
| What do you most want to play? | A bit of everything | Pianoforall 57% | Piano Marvel 12%, Pianote 9% |
| What do you most want to play? | Blues, jazz, improvising | Pianoforall 55% | Piano Marvel 13%, Pianote 11% |
| What do you most want to play? | Specific songs, note for note | Flowkey 32% | Pianoforall 24%, Pianote 15% |
| What do you most want to play? | Classical, from the score | Piano Marvel 35% | Pianoforall 29%, Pianote 14% |
| How do you like to learn? | Watch, then copy | Pianoforall 52% | Piano Marvel 18%, Flowkey 14% |
| How do you like to learn? | Step by step, like a book | Pianoforall 54% | Piano Marvel 22%, Skoove 9% |
| How do you like to learn? | Like a game | Pianoforall 40% | Simply Piano 28%, Piano Marvel 14% |
| How do you like to learn? | Pictures, not notes | Pianoforall 36% | Piano by Pictures 20%, Flowkey 18% |
| Do you want something to check your playing? | No, I'll check myself | Pianoforall 74% | Piano Marvel 11%, Piano by Pictures 8% |
| Do you want something to check your playing? | Nice to have | Pianoforall 52% | Piano Marvel 20%, Flowkey 10% |
| Do you want something to check your playing? | Not sure yet | Pianoforall 57% | Piano Marvel 18%, Piano by Pictures 9% |
| Do you want something to check your playing? | Yes: an app must hear my notes (must-have) | Piano Marvel 30% | Flowkey 28%, Skoove 18% |
| Do you want something to check your playing? | Yes: answers from a real teacher (must-have) | Pianote 54% | Pianoforall 45%, Skoove 2% |
| What will you practice on? | A keyboard, no cable | Pianoforall 48% | Piano Marvel 14%, Pianote 9% |
| What will you practice on? | A keyboard with USB | Pianoforall 41% | Piano Marvel 24%, Pianote 11% |
| What will you practice on? | An acoustic piano | Pianoforall 47% | Flowkey 15%, Pianote 12% |
| How does practice fit your week? | Short bursts | Pianoforall 39% | Flowkey 14%, Piano Marvel 13% |
| How does practice fit your week? | Set sessions | Pianoforall 38% | Piano Marvel 21%, Pianote 14% |
| How does practice fit your week? | On and off | Pianoforall 59% | Piano Marvel 14%, Flowkey 8% |
| How would you rather pay? | Once, then it's mine | Pianoforall 60% | Piano Marvel 12%, Flowkey 7% |
| How would you rather pay? | As little as possible | Pianoforall 47% | Piano Marvel 18%, Flowkey 12% |
| How would you rather pay? | Monthly is fine | Pianoforall 29% | Piano Marvel 18%, Pianote 16% |
| Where are you starting from? | Total beginner | Pianoforall 62% | Skoove 9%, Simply Piano 7% |
| Where are you starting from? | I know a little | Pianoforall 53% | Flowkey 15%, Pianote 10% |
| Where are you starting from? | Coming back | Pianoforall 53% | Flowkey 14%, Pianote 10% |
| Where are you starting from? | Working toward an exam | Piano Marvel 49% | Pianote 16%, Pianoforall 14% |

| Head start | Pianoforall share | Courses that can win | Pianoforall wins with a heads-up |
|---:|---:|---:|---:|
| 0 | 39.6% | 8 | 1724 |
| 1 (current) | 45.4% | 8 | 2212 |
| 2 | 51.0% | 8 | 2740 |
| 3 | 56.6% | 8 | 3268 |
| 4 | 61.7% | 8 | 3757 |

### What this means

- **Pianoforall wins 45.4% of all 10,800 answer combinations**, far more than any other course (next: Piano Marvel 15.9%). **All 7 other courses can win**, each for a defensible reason.
- **This is below the 55–65% target, on purpose.** I measured the trade-off rather than guess it: the only ways to push Pianoforall higher were to let it win for readers who said they need an app that hears their notes, who want live teacher help, or who are preparing for an exam. That would mislead those readers, so I didn't. The table above shows what the `headStart` setting would do: 2 gives 53%, 3 gives 59%, but each step adds a few hundred more Pianoforall wins that need a "Heads-up" because it doesn't fit an answer. **Owner decision:** keep 1 (my recommendation) or raise it. If you raise it, change the "starts with 1 point" sentence in the card too.
- "Wins with a heads-up": these results still win on points, but the result box says plainly what the winner lacks and names the best alternative.

## How to edit questions and points

The quiz is the JSON inside `<script type="application/json" class="pz-quiz-data">` in the quiz card (the same as `quiz-data.json` in this folder).

- `headStart`: the favorite's extra points. `favorite`: the course id that gets it and wins ties.
- `courses`: one entry per course. `pick` must equal the `id` of its verdict card on the page. `year1` is the 12-month cost for the cost race (`null` shows "check price"). `cta` is the result button (`"sponsored": true` adds `rel="sponsored nofollow noopener"`). `summary`, `watch`, `best` are the result texts.
- `questions[].options[]`: `label`/`hint` (the key), `points` (course id → points, negatives allowed), `why` (course id → reason shown when that course wins), `flag` (course id → heads-up text), `requires` (list of course ids that can win if this answer is picked) and `requireLabel`.
- `pricesChecked`: the date shown under the cost race.

After any edit: (1) check the JSON at jsonlint.com, (2) run `python3 quiz-simulate.py cards/01-course-quiz.html --by-answer --sweep` and read the numbers, (3) paste the card.

## Tracking

If Google Tag Manager's `window.dataLayer` exists, the quiz pushes `{"event": "quiz_complete", "quiz_id", "quiz_result"}` and, on a result button, `{"event": "quiz_cta_click", "quiz_id", "quiz_result", "cta_course"}`. No personal data. Answers are saved only in the reader's own browser (localStorage) so a reload shows "Welcome back"; "Share my result" copies a link ending `#quiz=…` that opens a "shared result" view.

## Tested (local Ghost, Chromium)

All 10,800 combinations were clicked through the real quiz in the browser: 0 mismatches with the simulator, all 8 courses appeared as results. Keyboard-only completion works; layout shift 0 on load and after finishing (desktop, 360 px light and dark); no sideways scroll at 360 px; no sound before a tap; reduced-motion run used for the full sweep; no-JS shows the 8 links.
