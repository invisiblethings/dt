# Design & UX notes

## Direction
A piano brand for adults should feel like a good music room: warm, calm, unhurried. That rules out the bright gradients and bouncing cards of SaaS and app marketing.

- **Palette**: ivory paper (`#faf7f2`), ebony (`#14130f`), brass (`#c8962e`, taken from the existing logo's gold). Brass is the action colour, so every primary button reads as "the next step". Text uses `#7a5310` for links on ivory (6.5:1 contrast). All tokens live in `src/styles/global.css` `:root`.
- **Type**: Fraunces (a soft, slightly old-style serif) for headings, Inter for body text at 17–18 px with 1.65 line height. Both are self-hosted variable fonts, about 130 KB together, preloaded.
- **Imagery**: the existing course screenshots, book covers, Robin's photos and cartoons. Real product images beat stock photos for trust. Robin's cartoons are an underused asset; use more of them.
- **Restraint**: cards only where items are clickable or truly parallel (books, pricing). No scroll animations, no parallax. Motion respects `prefers-reduced-motion`.

## Page flow principles
1. **Answer first.** Every guide opens with a boxed short answer. Every money page says what it is, who it's for and the next step above the fold.
2. **One primary action per screen.** Brass buttons only for the main action; ghost or text links for secondary.
3. **Proof sits next to claims.** Numbers link to their source (Udemy), testimonials carry names and towns, and the guarantee appears beside every price.
4. **Let people test before trusting.** The chord explorer and sample-lesson video appear before any price on the home page.

## Mobile
- Designed at 390 px first; checked at 390 and 1366 px. No horizontal scrolling on any page (tested; wide tables scroll inside their own container).
- Tap targets ≥ 44 px; buttons go full width where it helps.
- A sticky bottom CTA appears on long money pages after the hero scrolls away and hides at the footer. Desktop doesn't get it.
- The mobile menu is a simple disclosure (no off-canvas animation), closes on Escape, with the primary CTA at the bottom.
- Hero video comes after the headline and CTA on mobile, so the action is visible without scrolling.
- Videos load only on tap (saves about 500 KB of Vimeo JS per page).

## Accessibility
Skip link, visible focus rings, semantic landmarks (`header`, `nav`, `main`, `footer`), one H1 per page, logical heading order, `aria-current` on navigation, `aria-live` on tool results, keyboard-operable tools (all buttons), alt text on content images, no information conveyed by colour alone (the chord explorer also prints note names).

## Components (in `src/components`)
`Header`, `Footer`, `Breadcrumbs`, `Video` (click-to-load Vimeo), `Quote` (testimonial), `FaqList`, `Guarantee`, `BuyButton`, `RatingBadge`, `FinalCta`, `ChordExplorer` (SVG + Web Audio), `PostCard`, `Check`.

## Ideas for later
- Short looping hand-cam clips (muted, MP4, under 1 MB) of a rhythm pattern beside each book on `/course`.
- Audio snippets ("hear Book 2's boogie bass") using the same Web Audio approach as the chord explorer, so nothing extra to download.
- A dark-mode theme. Low priority; the audience skews older and daytime.
