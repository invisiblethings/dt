# Visual / mobile rendering audit - pianoers.com (7 Oct 2026)

Tested with Chromium (Playwright): desktop 1366x850 and Pixel 7 (412 px wide). 12 URLs, each captured above the fold at 2 s and 10 s, plus full page. Extra phone shots of tables, the mid-article area, the open menu and a returning-visitor homepage.
Screenshots: /home/user/dt/pianoers/pianoers.com-audit/screenshots/ (named `<page>-<desktop|phone>-<fold-2s|fold-10s|full>.png`, plus `*-phone-table.png`, `*-phone-mid.png`, `home-phone-menu.png`, `home-phone-returning-visitor.png`).
Pages: home, beginner, digital, lessons, pianoforall, p145, diy, tag, author, about, contact, 404 (404 tested at /this-page-does-not-exist-xyz/).

## Score: 82 / 100

## What works
- No popup, Claspo overlay or cookie banner appeared on any page, on phone or desktop, at 2 s or at 10 s (fresh visitor, headless browser). Claspo and GTM scripts do load (scripts.claspo.io, googletagmanager) but nothing visible covered content. Not checked: behaviour after real scrolling/exit-intent, other countries (a consent banner might show in the EU), or a real device.
- Phone above the fold is clean on every page. The header is slim (65 px). The home page shows the H1 "Honest piano advice from a real teacher", the value line, the amber CTA "Find your piano" and the playable keyboard, all in the first screen. Article pages show breadcrumb, H1, author, date and the hero image.
- No horizontal page scroll on any page on phone except /contact/ (below). Wide comparison tables sit in their own scroll box (`pz-table-wrap`, overflow auto), so the page does not widen.
- Image frames are consistent: portrait covers (beginner, lessons) get a blurred-background frame instead of stretching, and other covers keep the rounded frame. No broken, stretched or missing images seen.
- No dark-on-dark text seen. Contrast of body text, labels and the amber buttons looks fine.
- Sticky stacking is under control: only the header and the buy bar are fixed on the pages checked. On desktop long posts also have a sticky side rail (contents list), with no overlap with the header.
- The 404 page is on-brand, has the H1, a homepage button and a search button, and returns the nav.
- The mobile menu opens cleanly with large (about 48 px tall) rows.
- Old posts (DIY guide, lessons, P-145) are free of broken inline-styled cards. The inline `style` attributes counted (up to 64 on /best-piano-lessons-online/) did not produce visible breakage in the screenshots.

## Findings (most serious first)

| # | Severity | Page(s) | What I saw | Fix |
|---|---|---|---|---|
| 1 | Medium | /contact/ (phone) | The form is wider than the screen. Page scroll width is 416 px against 412. The Name, Email and Message boxes and the orange "Send" button run past the right edge and are cut off (`contact-phone-fold-10s.png`). | The contact page is a Ghost page with an HTML card. Open Pages > Contact, open the HTML card and remove fixed widths (`width:100%` plus `box-sizing:border-box` on inputs, textarea and button, or remove the `width`/`min-width` values). Or ask whoever maintains the theme to add `.gh-content input, textarea, button {max-width:100%; box-sizing:border-box}`. |
| 2 | Medium | Homepage, phone, returning visitors | The "Continue reading" toast (theme class `.pz-resume`) renders as a tall dark circle about half the screen wide when the title is long: text wraps one or two words per line ("Continue reading: Piano For All Review: A Pro Pianist's Take on th... (13%)", `home-phone-menu.png`). It also sat on top of the open menu's CTA button. This only appears if you have visited an article before (stored in the browser), so it affects returning readers, the people most likely to convert. | Theme change (not doable in Ghost Admin): give `.pz-resume` a `width: calc(100% - 32px); max-width: 420px; border-radius: 16px` on phones, shorten the title to about 30 characters, and hide it while the menu is open. Check whether this is fixed in 1.1.2 (live theme version not checked). |
| 3 | Low | All pages, desktop | An empty white pill (the buy bar, `#pz-buybar`, 420 px wide, 22 px tall) peeks in from the bottom right corner on every desktop page even when it has nothing to show (`home-desktop-fold-10s.png`, `beginner-desktop-fold-10s.png`). On phone it sits just below the visible area, so it does not show there. | Theme fix: hide the bar completely (`visibility:hidden` or translate by its full height) until it has content. Not fixable in Ghost Admin. |
| 4 | Low | /best-piano-lessons-online/, /yamaha-p-145-review/, /pianoforall-review/ (phone) | Tables are wider than the 380 px box (560 px) and the last column (Price) is cut off mid-word ("$49 one-", "$17.90/m", "Free tier"), with no arrow, fade or hint that it scrolls (`lessons-phone-table.png`). The beginner page table (691 px) wraps better but still has a cut-off note line below. | Add a fade or "swipe" hint on the right edge of `.pz-table-wrap` (theme CSS), or shorten column text. In Ghost editor: keep the 3 column tables to 2 or 3 short columns. |
| 5 | Low | /author/richard/ (phone) | The author header lays out oddly: the avatar floats mid-left and the text starts about 45 percent across the screen, leaving a large empty block top left and a narrow text column (`author-phone-fold-10s.png`). | Theme CSS: stack the avatar above the name on screens under 600 px. |
| 6 | Low | Phone, all pages | Tap targets under 44 px: breadcrumb links (Home 36x16, Pianos 41x16, Care 29x16), category label (a 380x22 link), footer links (Sign up 51x18, Privacy Policy 97x18, "Pianoers.com" 116x20), inline links in the About page (73x23), the sound toggle (102x34), piano keys on the 404 (34x87 black keys, fine for keys). The header icons (search, menu) are 40x40, just under 48. | Theme CSS: add vertical padding (`padding: 12px 0`) to breadcrumbs, footer links and the category label; make the header icons 44-48 px. |
| 7 | Low | Phone and desktop | Some body-area text is under 16 px: 14.4 px (about 11-39 elements per page, such as meta, captions, card text), 13-13.6 px (card labels, table notes), 11.5 px (28 elements on the home page, 14 on the 404, probably piano key labels). Main article text is 16 px+ (serif, large). | Raise the small meta/caption text to 14-15 px minimum and anything meant to be read to 16 px. Piano key labels can stay small. |
| 8 | Low | /piano-diy-repair-guide/ (phone and desktop) | The full-width image template works: the hero photo runs edge to edge with no frame, so it is the only post without rounded corners (`diy-phone-fold-10s.png`). This is intended for the template but inconsistent with the other posts. Its post date is Jun 2024 and the hero has the pianist upside down in the reflection, which is how the photo is. | Optional: keep as is, or switch the post to the default image template (Post settings > Template) for a consistent look. |
| 9 | Info | All article pages | Buy bar (`#pz-buybar`): I never saw it visible in any screenshot, including after scrolling about 1500 px on the beginner page, where it carries "Yamaha P-145BT, Best all-around, about $500, Check price" and is positioned just off-screen at that point. Not checked: at which scroll position it slides in. | Confirm by hand on a phone that it appears when scrolling and does not cover the sticky header or content. |
| 10 | Info | Beginner page, mid-article | The verdict card (Yamaha P-145BT) looks good on phone: image, quote, verdict, "Check price on Amazon" CTA and "Full review" are all visible with large tap targets (`beginner-phone-mid.png`). Two of the post's images are not inside a `<figure>` (10 images on the page have no figure wrapper), but frames still render. | None needed. |

## Per-URL notes (phone, 412 px)
- / : H1, value line, both CTAs, keyboard in the first screen. Good. No overlay at 10 s.
- /best-beginner-pianos/ : the H1 is four lines long (long title with emoji); the cover image is portrait in a blurred frame. Table scrolls in a box. No overflow.
- /best-digital-piano/ : good. Cover has the product name inside the image. "On this page" contents box is collapsed by default.
- /best-piano-lessons-online/ : the table is cut off at the right (finding 4).
- /pianoforall-review/ : clean; the cover image is a gradient with a screenshot cropped at the bottom right.
- /yamaha-p-145-review/ : clean. The live version shows "Updated Oct 7, 2026" and the CFIIIS and "9 other voices" wording is already live (it was marked as not yet pasted live in the brief; this suggests it has now been pasted - the live text matches the corrected article).
- /piano-diy-repair-guide/ : full-bleed image works, no overflow.
- /tag/pianos/ : the tag description is very long (about 12 lines on phone) before the first post; a short description would put posts higher.
- /author/richard/ : finding 5. Mentions "no bullshit" in the author bio, which is a brand tone choice.
- /about/ : plain text page, no hero or CTA above the fold, readable. Links are underlined.
- /contact/ : finding 1. The newsletter signup box below the form is dark with white text and reads fine.
- 404 : good.

## Not checked
- Real-device rendering, iOS Safari, landscape phone, tablet widths.
- Claspo behaviour with real interaction/time on page, EU consent banner.
- Dark mode.
- Whether the live theme is 1.1.0, 1.1.1 or 1.1.2.
