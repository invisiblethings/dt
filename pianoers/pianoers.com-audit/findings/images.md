# Image SEO and performance: pianoers.com (7 Oct 2026)

**Score: 58 / 100**

Scope: all 55 sitemap URLs. I re-fetched every page live (Ghost 6.67, behind Caddy, self-hosted). I parsed every `<img>`: 478 tags in total, which is 123 inline content images, 35 feature images, 172 post-card thumbnails, 7 product-pick images, plus logo, author images and bookmark icons. I downloaded all 155 original files under `/content/images/` and every srcset size to measure bytes and pixel dimensions. I loaded every page in headless Chromium twice (phone 390px @3x, desktop 1366px @1x), scrolled to the bottom, recorded the image bytes actually transferred and found the LCP element. I looked at 98 images (contact sheets) before writing the alt suggestions below.

Note: `crawl/pages.json` leaves out the theme's feature images, post cards and the `<img>` tags inside HTML cards. This report uses the fresh parse, so its counts differ from that file.

## What works

- **Feature images (theme):** WebP at five widths (300 to 2000) via `img_url`, `width`/`height` set, `fetchpriority="high"`, not lazy-loaded. On all 35 posts that have one, the feature image is the LCP image, or the H1 is, and it is never lazy. This is correct.
- **Post cards, product picks and author images** are all WebP with width/height set. Cards are lazy-loaded with `decoding="async"`.
- **Inline images are mostly fine:** most JPG originals are already small (40 to 210 KB, max 2000px wide, because Ghost resizes on upload). Ghost adds a 600/1000/1600 srcset and `loading="lazy"` to most image cards.
- **Caching:** originals are served with `cache-control: public, max-age=31536000`.
- **No camera-style filenames:** no IMG_/DSC_ names, and no camera make/model found in EXIF on any original.
- **Good alt text already** on /best-beginner-pianos/ product picks, the Yamaha P-145 inline photos, /loog-piano/, /skoove-review/ inline, and /pianote-review/.

## Findings, ordered by severity

| # | Severity | Finding | Evidence | Fix (where) |
|---|---|---|---|---|
| 1 | **High** | **Huge PNG files inside articles.** Ghost's srcset keeps the original format, so the "resized" PNGs are still huge. A 600px PNG is often 300 to 700 KB. | 19 inline PNGs are 150 KB to 1.07 MB. Worst: `/2026/03/image-3.png` 1,065 KB (the w600 copy is still 889 KB), `2024/05/Ilnica-Vartic-PianoCareerAcademy.png` 770 KB, `2026/03/image-6.png` 744 KB, `2025/05/image-10.png` 706 KB, `2026/03/image-4.png` 682 KB, `2025/04/image.png` 664 KB, `2026/03/image-5.png` 537 KB, `2025/05/image-8.png` 490 KB, `2024/09/image-1.png` 468 KB, `2024/11/image-1.png` 467 KB, `2026/03/image-2.png` 458 KB, `2025/05/image-7.png` 437 KB, `2024/01/Skoove-*.png` 282 to 376 KB, `2024/11/image-6.png` 316 KB. Measured image weight per page (phone): /best-piano-books-for-adult-beginners/ **3.6 MB**, /teach-yourself-piano/ **3.0 MB**, /piano-dehumidifier-101.../ 1.9 MB, /best-piano-lessons-online/ 1.8 MB, /open-studio-jazz-review/ 1.2 MB, /piano-career-academy-review/ 1.2 MB, /skoove-review/ 1.1 MB. The same files as WebP (measured from Ghost's own `/size/w720/format/webp/` URLs) are 16 to 91 KB: image-3.png goes from 1,065 KB to 91 KB, and Ilnica-Vartic from 770 KB to 30 KB. | **Quick fix in the Ghost editor:** for each image in table A below, re-export as JPG (photos, book covers) or WebP (screenshots) at ≤1200px wide, under 150 KB, with a descriptive filename. Then replace the image in the card (click image, Replace) and re-enter the alt text. **Site-wide option (server):** in Caddy, rewrite `/content/images/size/wNNN/<file>.(png\|jpg)` to `/content/images/size/wNNN/format/webp/<file>` when the request's `Accept` header contains `image/webp`, and add `Vary: Accept`. That converts every inline srcset to WebP without touching posts. Test it on staging first. |
| 2 | **High** | **Oversized Unsplash photos inline.** Unsplash cards request `fm=jpg` at up to 2000px, and phones (@3x) pick the biggest size. | Phone transfers: /how-to-tune-a-piano-a-simple-guide/ `photo-1576487236230` **897 KB**. /how-the-piano-works/ `photo-1670592970162` 710 KB + `photo-1609707955926` 456 KB (1.9 MB images in total on phone). /are-piano-keys-still-made-of-ivory/ elephant `photo-1574241298650` 519 KB. /5-best-piano-methods-to-learn-quickly/ 456 KB. /how-to-clean-and-maintain-your-piano/ 286 + 281 KB. /piano-practice-4-tips.../ 293 KB. | In each post, delete the Unsplash card, download the photo, export it at 1200px as WebP or JPG (~100 to 150 KB), and upload it as a normal image card. You also host it yourself (no third-party request) and get a descriptive filename. |
| 3 | **High** | **Alt text missing or wrong on content images.** Three are empty, and four Unsplash photos still carry Unsplash's auto-caption, which describes the wrong thing. | Empty: /pianoforall-review/ Book 5 cover, /are-piano-keys-still-made-of-ivory/ `photo-1612077216809`, /how-to-tune-a-piano-a-simple-guide/ `photo-1576487236230`. Wrong: /5-best-piano-methods.../ "Taken during a party of a choir." (the photo is a close-up of piano keys). /how-the-piano-works/ "a large group of people sitting in a large room with a large clock" (it is the inside of an upright piano), "a metal object with two handles on a tile floor" (it is piano pedals), "white piano keys" (it is upright hammers and strings). See table B. | Ghost editor: click the image, then edit the alt field under the image. Use the suggestions in table B. |
| 4 | **Medium** | **About 60 alts are too short or generic** (1 to 3 words, just a product or brand name, or a heading repeated). | Examples: "Avoid It", "Flowkey", "Skoove", "Pianote review", "Mixed Reality", "Worn felt", "Open Studio Cost", "Roland FP-10 Reviewed". Full list with suggestions in table B. | Same place (image alt field). Describe what the image shows plus the product name. Keep it under 125 characters and don't stuff keywords. |
| 5 | **Medium** | **Feature-image alt falls back to the post title.** The theme uses `{{title}}` when the post has no feature-image alt, so the alt says nothing about the picture. It is also repeated on every card that links to the post (home, tag, author, "Read next"). | About 20 posts, e.g. "Skoove Review", "Lang Lang", "Pianovision VR", "8 Best Online Piano Lessons", "Simply Piano Review", "Tuning a piano" (used on two posts), "Synthesia Piano Review 2025" (stale year), "Pianote review 2025 …" (stale year), "Stephen Ridley's Piano Academy Scam" (a legal-risk phrase in alt). | Post settings (gear icon), feature image, then the **Alt text** field under the image. Suggestions in table B (rows marked "feature"). |
| 6 | **Medium** | **LCP image lazy-loaded on short tag/author pages.** | On /tag/books/, /tag/practice/ and /tag/jazz-piano/ (desktop and phone), and on /author/katarina/ (phone), the LCP element is the first post card, and it has `loading="lazy"`. /how-the-piano-works/ has no feature image, so its desktop LCP is a lazy-loaded inline Unsplash image (1000px JPG). | Theme `partials/post-card.hbs`: give the first card on tag, author and home pages `loading="eager" fetchpriority="high"` (e.g. pass `eager=true` from the first `{{#foreach}}` iteration with `{{#if @first}}`). For /how-the-piano-works/, add a feature image (finding 8). |
| 7 | **Medium** | **Missing width/height on inline images (layout shift).** | No `width`/`height` on: /skoove-review/ (3 images: Skoove-Overview.png, Skoove-Learning-Experience-1.png, Skoove-Features.png), /loog-piano/ (2), /ahmad-jamal-biography/ (2). These come from HTML cards or pasted markup, not Ghost image cards. Bookmark-card icons and thumbnails also have none (minor). | Re-insert them as normal Ghost image cards (Ghost adds width, height, srcset and sizes automatically), or add `width`/`height` to the HTML card markup. |
| 8 | **Medium** | **3 posts have no feature image.** | /piano-basics-a-beginners-guide-to-the-keyboard/, /how-the-piano-works/, /piano-humidifier/: no hero image. og:image falls back to the generic `PianoersBanner-1.png`, and there is no image in the image sitemap for these URLs. | Post settings: add a feature image (1200×675 or larger, WebP/JPG) with alt text. |
| 9 | **Medium** | **Inline images on /yamaha-p-145-review/ bypass Ghost's image handling.** | `Yamaha-p-145-testing.jpg` (44 KB) and `Yamaha-p-145-from-above.jpg` (86 KB) are in an HTML card: original JPG, no srcset, no `loading="lazy"`, no `decoding`. Alt text is good. | When the corrected article is pasted, insert these two as image cards instead of HTML. |
| 10 | **Medium** | **Image sitemap covers feature images only, and its captions are filenames.** | `sitemap-posts.xml`: 38 URLs, 35 `<image:image>`, none of the ~120 inline content images. `<image:caption>` holds the filename (`Yamaha-p-145-review-pianoers.jpg`) or a full Unsplash URL. `sitemap-pages.xml` has 0 images. This is Ghost core behaviour. | Not fixable from Ghost Admin. Google finds inline images through the `<img>` tags, so the impact is limited. Make sure every post has a feature image (finding 8) and real alt text (findings 3 to 5). Google ignores `image:caption` anyway (deprecated in 2022), so there is nothing to change there. |
| 11 | **Low** | **Logo is a 44 KB PNG on every page.** | `/content/images/2023/10/PianoersLogo.png` is 703×109 and is shown about 28px tall. It is the single largest image on 15 text-only pages. It has a height but no width attribute. | Upload an SVG logo (Settings, Design, Brand), or have the theme output it via `img_url @site.logo size="xs" format="webp"` with width and height. Saves about 40 KB per page view. |
| 12 | **Low** | **Non-descriptive filenames.** | 17 files named `image.png` / `image-1…10.png` (teach-yourself, hdpiano, dehumidifier, open-studio, best-piano-lessons-online, best-piano-books). 11 UUID filenames on /pianoforall-review/ (`08df4883-d90f-….png` etc.). `Depositphotos_101129746_s-2019-1-.jpg` (bookmark thumbnail, which shows the stock-photo source). `Case-study-hero-825x483-Open-studio-min-1--3fe065efa807efbf.png`. Typo `The-power-of-deliberate-pracitce-pianoers.jpg`. | Rename the files before upload when replacing images for finding 1, e.g. `faber-adult-piano-adventures-book-1-cover.webp`, `pianoforall-book-5-advanced-chords.webp`, `open-studio-jazz-pricing-plans.webp`. Old URLs don't need redirects. |
| 13 | **Low** | **Hotlinked third-party images.** | /simply-piano-review…/ uses `media.sweetwater.com/...png` (Simply Piano logo). /pianovision-review/ uses 2 images from `assets-global.website-files.com`. /how-to-tune-a-piano-a-simple-guide/ uses `web.archive.org/.../how-to-tune-a-piano01.jpg`: the connection was reset when I fetched it, so it may already be broken for visitors. | Download (if licence allows), compress and upload to Ghost, or remove. |
| 14 | **Low** | **Mislabelled file.** | `2023/10/hand-piano-chord.webp` is really a JPEG served as `content-type: image/webp`. Browsers cope, but some tools and crawlers don't. | Re-export as a real WebP and replace. |
| 15 | **Low** | **Duplicate images.** | `piano-tuning.webp` and `piano-tuning-1.webp` are the same photo (/piano-diy-repair-guide/ inline + /how-to-tune.../ feature). Unsplash `photo-1479118013749` is the feature of /how-to-clean-and-maintain-your-piano/ and also inline on /how-the-piano-works/. The Skoove banner appears on both /skoove-review/ and /best-piano-lessons-online/. | Optional: use unique images on the main posts. Low impact. |
| 16 | Info | **Inline images often missing `sizes`.** | 36 of 123 inline images have a srcset but no `sizes`, so the browser assumes 100vw and picks larger files on phones. Ghost omits `sizes` on images narrower than the content width. | Not fixable from Admin. It matters only for the large PNGs (fixed by finding 1). |

## Table A: image files to compress or replace (largest savings first)

The "WebP size" column is measured from Ghost's own `/size/w720/format/webp/` version of the same file. For rows marked "est.", I did not fetch the WebP version and the figure is an estimate.

| Image (original) | Page(s) | Original | Dimensions | Typical served (phone) | WebP size | Saving |
|---|---|---|---|---|---|---|
| /content/images/2026/03/image-3.png (Alfred's Adult All-in-One cover) | /best-piano-books-for-adult-beginners/ | 1,065 KB PNG | 758×1000 | 1,065 KB | 91 KB | ~970 KB |
| 2024/05/Ilnica-Vartic-PianoCareerAcademy.png | /piano-career-academy-review/ | 770 KB PNG | 1058×1002 | 770 KB | 30 KB | ~740 KB |
| 2026/03/image-6.png (John Thompson cover) | /best-piano-books-for-adult-beginners/ | 744 KB PNG | 750×1000 | 744 KB | 51 KB | ~690 KB |
| 2025/05/image-10.png (silica gel) | /piano-dehumidifier-101.../ | 706 KB PNG | 750×430 | 706 KB | 46 KB | ~660 KB |
| 2026/03/image-4.png (Bastien Adults cover) | /best-piano-books-for-adult-beginners/ | 682 KB PNG | 740×1000 | 682 KB | est. ~50 KB | ~630 KB |
| 2025/04/image.png (Open Studio courses) | /open-studio-jazz-review/ | 664 KB PNG | 1279×704 | 611 KB (w1000) | 42 KB | ~600 KB |
| 2026/03/image-5.png (Accelerated cover) | /best-piano-books-for-adult-beginners/ | 537 KB PNG | 754×1000 | 537 KB | est. ~50 KB | ~490 KB |
| 2025/05/image-8.png (room dehumidifier) | /piano-dehumidifier-101.../ | 490 KB PNG | 750×500 | 490 KB | est. ~40 KB | ~450 KB |
| 2024/09/image-1.png (Pianoforall features) | /teach-yourself-piano/ | 468 KB PNG | 1000×1000 | 468 KB | est. ~45 KB | ~420 KB |
| 2024/11/image-1.png (Pianoforall site) | /best-piano-lessons-online/ | 467 KB PNG | 899×558 | 467 KB | est. ~40 KB | ~420 KB |
| 2026/03/image-2.png (Faber Adult Book 1) | /best-piano-books-for-adult-beginners/ | 458 KB PNG | 864×1152 | 458 KB | est. ~60 KB | ~400 KB |
| 2025/05/image-7.png (Flowkey app) | /best-piano-lessons-online/ | 437 KB PNG | 815×727 | 437 KB | est. ~45 KB | ~390 KB |
| 2024/01/Skoove-Overview.png | /skoove-review/ | 376 KB PNG | 1080×1080 | 376 KB (no srcset) | 31 KB | ~345 KB |
| 2024/01/Skoove-Features.png | /skoove-review/ | 336 KB PNG | 1080×1080 | 336 KB (no srcset) | est. ~30 KB | ~300 KB |
| 2024/11/image-6.png (HDPiano lesson) | /hdpiano-review/ | 316 KB PNG | 1379×707 | 314 KB | est. ~40 KB | ~275 KB |
| 2024/03/scientology-stephen-ridley.jpg | /stephen-ridley/ | 319 KB JPG | 2000×1000 | 218 KB (w1600) | est. ~60 KB | ~160 KB |
| 2024/01/Skoove-Learning-Experience-1.png | /skoove-review/ | 282 KB PNG | 1080×1080 | 282 KB (no srcset) | est. ~30 KB | ~250 KB |
| 2025/05/image-9.png (Dampp-Chaser diagram) | /piano-dehumidifier-101.../ | 236 KB PNG | 430×528 | 236 KB (no srcset) | 16 KB | ~220 KB |
| 2025/04/image-1.png (Open Studio pricing) | /open-studio-jazz-review/ | 236 KB PNG | 955×574 | 236 KB | est. ~30 KB | ~200 KB |
| 2025/05/image-3.png, 2024/11/image-3.png, image-2.png | /best-piano-lessons-online/ | 155–172 KB PNG each | ~1000 wide | 155–185 KB | est. 20–30 KB | ~400 KB total |
| Pianoforall-Approach.png + 11 book-cover PNGs (38–62 KB each) | /pianoforall-review/ | ~700 KB total | 679×568 | ~700 KB | est. ~200 KB | ~500 KB |
| 2024/05/Beginners-Course-PianoCareerAcademy.png | /piano-career-academy-review/ | 119 KB PNG | 503×438 | 119 KB | est. ~20 KB | ~100 KB |
| Unsplash photo-1576487236230 (grand piano, B&W) | /how-to-tune-a-piano-a-simple-guide/ | jpg | 2000×3000 | **897 KB** | est. ~120 KB | ~770 KB |
| Unsplash photo-1670592970162 (upright interior) | /how-the-piano-works/ | jpg | 2916×5184 | **710 KB** | est. ~120 KB | ~590 KB |
| Unsplash photo-1574241298650 (elephant) | /are-piano-keys-still-made-of-ivory/ | jpg | 4116×6219 | 519 KB | est. ~90 KB | ~430 KB |
| Unsplash photo-1609707955926 (grand piano interior) | /how-the-piano-works/, /5-best-piano-methods.../ | jpg | 4000×6000 | 456 KB | est. ~90 KB | ~370 KB |
| Unsplash photo-1628199699161 | /piano-practice-4-tips.../ | jpg | 2000×1333 | 293 KB | est. ~80 KB | ~210 KB |
| Unsplash photo-1547631785 / photo-1648948303220 | /how-to-clean-and-maintain-your-piano/ | jpg | 6000×4000 / 5433×3637 | 286 + 281 KB | est. ~80 KB each | ~400 KB |
| PianoersLogo.png | every page | 44 KB PNG | 703×109 | 44 KB | SVG / WebP ~5 KB | ~40 KB × every view |

Altogether, replacing the files in this table removes roughly **11 MB** across the site and takes the worst pages from 2 to 3.6 MB of images down to under 600 KB.

## Table B: alt text to fix (I looked at every image listed)

"feature" means the post's feature image; it is set in post settings. All other rows are in the post body.

| Page | Image | Current alt | Suggested alt |
|---|---|---|---|
| /pianoforall-review/ | 08df4883-…png | *(empty)* | Pianoforall Book 5 cover: Advanced Chords |
| /are-piano-keys-still-made-of-ivory/ | Unsplash photo-1612077216809 | *(empty)* | Close-up of worn ivory-coloured keys on an old wooden piano |
| /how-to-tune-a-piano-a-simple-guide/ | Unsplash photo-1576487236230 | *(empty)* | Black grand piano with the lid open on a checkered floor, black-and-white photo |
| /5-best-piano-methods-to-learn-quickly/ | Unsplash photo-1520523839897 | "Taken during a party of a choir." | Close-up of piano keys with a shallow depth of field |
| /how-the-piano-works/ | Unsplash photo-1670592970162 | "a large group of people sitting in a large room with a large clock" | Inside an upright piano: hammers, strings and keys from the side |
| /how-the-piano-works/ | Unsplash photo-1646090479934 | "a metal object with two handles on a tile floor" | Two brass piano pedals on a tile floor |
| /how-the-piano-works/ | Unsplash photo-1479118013749 | "white piano keys" | Open upright piano showing the row of hammers above the keyboard |
| /how-the-piano-works/, /5-best-piano-methods.../ | Unsplash photo-1609707955926 | "Piano through store window" | Inside a grand piano: the cast-iron plate and strings under warm light |
| /are-piano-keys-still-made-of-ivory/ | Unsplash photo-1574241298650 | "A mother elephant with all the elegance…" | Close-up of an elephant's face in black and white, the animal ivory once came from |
| /are-piano-keys-still-made-of-ivory/ | feature (Unsplash photo-1577383896998) | = title | Row of yellowed ivory piano keys on an antique upright |
| /how-to-clean-and-maintain-your-piano/ | feature (photo-1479118013749) | = title | Open upright piano with hammers and keys visible, ready for cleaning |
| /how-to-clean-and-maintain-your-piano/ | photo-1547631785 | "silhouette of grand piano inside building" | OK. Optional: "Grand piano silhouetted against tall windows, away from direct sun" |
| /climate-control-and-your-piano/ | feature (Unsplash photo-1615414046707) | = title | Ornate concert hall auditorium with a red stage curtain |
| /5-best-piano-methods-to-learn-quickly/ | feature (photo-1593697821178) | = title | Student playing a keyboard with a laptop piano-lesson app open on the desk |
| /stephen-ridley/ | Ridley-Avoid.jpg | "Avoid It" | Stephen Ridley's "4 Chords" video thumbnail crossed out with a red X |
| /stephen-ridley/ | feature | "Stephen Ridley's Piano Academy Scam" | Stephen Ridley, founder of Piano Academy (check image) |
| /teach-yourself-piano/ | feature | "How to learn piano by yourself" | Illustration of a person playing an upright piano with "Learn piano by yourself" title |
| /teach-yourself-piano/ | image.png | "Piano sales statistics" | Bar chart of the global piano market size 2018–2028 with 2.77% growth (Technavio) |
| /teach-yourself-piano/ | the-basics-of-piano-pianoers.jpg | "The basics of piano" | Piano basics infographic: music theory, posture and finger exercises |
| /teach-yourself-piano/ | image-1.png | "Pianoforall piano course" | Pianoforall course features: offline access, any device, lifetime updates, one-time payment |
| /teach-yourself-piano/ | Sample-Piano-Practice-Schedule.jpg | "Sample Daily Practice Schedule" | Sample 60-minute piano practice schedule: warm-up, technique, song practice, review |
| /best-digital-piano/ | Roland-FP10-Reviewed-1.jpg | "Roland FP-10 Reviewed" | Roland FP-10 88-key digital piano in black with music rest |
| /best-digital-piano/ | Kawai-ES60-Reviewed-1.jpg | "Kawai ES60 Reviewed" | Kawai ES60 88-key portable digital piano in black, angled view |
| /best-digital-piano/ | Roland-FP-30X-Reviewed.jpg | "Roland FP-30X Reviewed" | Roland FP-30X 88-key digital piano in black with music rest |
| /best-digital-piano/ | Kawai-ES920, Casio PX-S3100, Kawai KDP120, Yamaha CLP-835, CLP-885, FP-90X, Yamaha P-145, PX-S1100 | "Model - Best for X" | Acceptable. Better: "Model, colour, type" as on /best-beginner-pianos/ (check images; not viewed individually) |
| /skoove-review/ | feature | "Skoove Review" | Skoove logo with the tagline "The best way to learn piano?" |
| /loog-piano/ | feature | = title | Red Loog Piano three-octave keyboard on a wooden floor next to guitars |
| /worship-music-academy-review/ | feature | = title | Worship Music Academy logo on a blue background |
| /hdpiano-review/ | feature | "HDPiano Review by Pianoers.com" | HDPiano review title graphic with a keyboard under a light bulb |
| /hdpiano-review/ | image-6.png | "HDPiano Example" | HDPiano lesson video for "River Flows in You" with falling-note keyboard view |
| /hdpiano-review/ | image-7.png | "HDPiano Song Library" | HDPiano "Find a song" library with filters for artist, genre and difficulty |
| /piano-dehumidifier-101.../ | Piano-in-humid-conditions.jpg | "Piano in Humid Conditions" | Pianist playing a grand piano in heavy rain, illustrating humidity damage |
| /piano-dehumidifier-101.../ | image-9.png | "Dampp-Chaser system" | Cutaway of an upright piano showing where Dampp-Chaser parts are installed |
| /piano-dehumidifier-101.../ | Plug-In-Rod-Dehumidifier-Piano.webp | "Rod Dehumidifier" | Three plug-in dehumidifier rods for placing inside a piano |
| /piano-dehumidifier-101.../ | image-8.png | "Room Dehumidifier/Humidifier" | White portable room dehumidifier next to an armchair |
| /piano-dehumidifier-101.../ | image-10.png | "Silica Gel humidity absorber" | Silica gel desiccant packet with loose beads on a blue surface |
| /open-studio-jazz-review/ | feature | "Open Studio Jazz Review" | Hand on piano keys in black and white with the Open Studio logo |
| /open-studio-jazz-review/ | Open-Studio-Jazz-Portal.jpg | "Open Studio Jazz Portal" | Open Studio lesson page with Peter Martin video, sheet music and lesson list |
| /open-studio-jazz-review/ | image-1.png | "Open Studio Cost" | Open Studio pricing: $39/month standard vs $97/month Open Studio Pro |
| /best-piano-lessons-online/ | feature | "8 Best Online Piano Lessons" | Illustration of a student playing a grand piano with a laptop, "8 best online piano lessons" |
| /best-piano-lessons-online/ | image-1.png | "Pianoforall" | Pianoforall homepage: hands on piano keys, "Discover the easiest way to learn piano" |
| /best-piano-lessons-online/ | image-3.png (2024/11) | "Simply Piano" | Simply Piano app icon and logo |
| /best-piano-lessons-online/ | Piano-Marvel-Overview.jpg | "Piano Marvel Overview" | Piano Marvel dashboard on a tablet: Library, Method, Sight Reading and Technique |
| /best-piano-lessons-online/ | image-3.png (2025/05) | "Skoove" | Skoove logo with the tagline "The best way to learn piano?" |
| /best-piano-lessons-online/ | image-6.png | "Pianote review" | Pianote logo, red banner: "What makes it unique?" |
| /best-piano-lessons-online/ | image-7.png | "Flowkey" | Flowkey app song library on a tablet: most popular songs and new releases |
| /best-piano-lessons-online/ | image-2.png | "Piano by Pictures" | Piano by Pictures sales page with testimonial and three free printed books offer |
| /simply-piano-review…/ | feature | "Simply Piano Review" | Simply Piano app icon on a purple-to-teal gradient, "Simply Piano review" |
| /simply-piano-review…/ | sweetwater PNG | "What is Simply Piano?" | Simply Piano app icon and logo |
| /simply-piano-review…/ | Simply-Piano-Pricing.jpg | "Simply Piano Cost" | Simply Piano prices: $17.90/month, $169.90/year, family $23.90/month or $209.90/year |
| /best-piano-books-for-adult-beginners/ | feature | = title | Blurred stack of adult beginner piano books on a piano |
| /best-piano-books-for-adult-beginners/ | image-3.png | "Alfred's Basic Adult All-in-One" | Cover of Alfred's Basic Adult All-in-One Course, Level 1 |
| /best-piano-books-for-adult-beginners/ | image-5.png | "Piano Adventures Accelerated" | Cover of Faber Accelerated Piano Adventures for the Older Beginner, Lesson Book 1 |
| /best-piano-books-for-adult-beginners/ | image-2, image-4, image-6 | book titles | Fine. Add "Cover of …" (e.g. "Cover of Bastien Piano for Adults, Book 1") |
| /pianoforall-review/ | Books 1–4, 6–10 | "Book 6: Ballad Style" etc. | "Pianoforall Book 6 cover: Ballad Style" (add the product name; fix typo "Rythm" to "Rhythm" in the Book 1 alt) |
| /pianoforall-review/ | PianoForAll-Features.jpg | "Pianoforall features" | Pianoforall features: offline access, any device, learn anytime, free updates, one-time payment, support |
| /pianovision-review/ | feature | "Pianovision VR" | PianoVision mixed-reality app showing sheet music above a real keyboard |
| /pianovision-review/ | Mixed-Reality.webp | "Mixed Reality" | Illustration of the PianoVision headset view with falling notes onto a keyboard |
| /pianovision-review/ | Personalized-Learning.png | "Personalized Learning" | PianoVision practice screen with score history per section and a loop slider |
| /pianovision-review/ | 1000-Songs.webp | "Over 1000 songs" | PianoVision song list screen with a Play Song button |
| /pianovision-review/ | Multiplayer.webp (hotlinked) | "Multiplayer Mode" | Illustration of several PianoVision headset users playing together |
| /pianovision-review/ | Memory.webp (hotlinked) | "Memory Engine" | Illustration of a PianoVision user with headset and memory blocks |
| /best-free-piano-learning-apps/ | 7 app tiles | "Simply Piano", "Flowkey", "Skoove", … | "Simply Piano app logo" → better: "Simply Piano app icon on a Pianoers.com tile", same pattern for Hoffman Academy, Flowkey, Piano Marvel, Yousician, Skoove (shows the app on tablet and laptop), Pianote |
| /best-free-piano-learning-apps/ | feature | "Best Free Piano Learning Apps" | check image |
| /synthesia-piano-review/ | feature | "Synthesia Piano Review 2025" | Synthesia review title over a keyboard with falling note bars (remove the year) |
| /synthesia-piano-review/ | Synthesia-Functions-2.jpg | "Synthesia functions and options" | Synthesia features: play at your own speed, track progress, sheet music, finger hints, lit keyboards |
| /piano-with-jonny-review/ | feature | "Piano with Jonny Review" | Piano with Jonny logo with "In-Depth Review" text |
| /piano-with-jonny-review/ | PianoWithJonny-1.webp | "PianoWithJonny iPad" | Piano with Jonny lessons on two iPads: course list and video with keyboard overlay |
| /flowkey-review/ | Flowkey-Library.jpg | "Flowkey song library" | Flowkey song library with level picker and free songs like Bella Ciao and Perfect |
| /flowkey-review/ | Flowkey-Skill-Progression.jpg | "Flowkey skill progression" | Flowkey scales course: B minor, F major and D minor lessons with progress |
| /flowkey-review/ | Flowkey-Example-1.jpg | "Flowkey lesson" | Flowkey lesson on a tablet on a digital piano's music rest |
| /flowkey-review/ | Flowkey-Visual-Learning.jpg | "Flowkey visual learning" | Flowkey on a phone: video of hands on keys above the matching sheet music |
| /cole-lam-the-piano-prodigy/ | feature | = title | Young Cole Lam playing a public piano at a train station as a crowd watches |
| /lang-lang-the-biography/ | feature | "Lang Lang" | Pianist Lang Lang smiling on stage in a patterned jacket |
| /bastien-piano-method-is-it-the-right-one-for-you/ | feature | "Bastien Piano Method" | Cover of Bastien Piano Basics: Piano Method, with colourful keyboard cubes |
| /piano-tuning-when-and-why-its-needed/ | feature | "Tuning a piano" | Technician tuning a grand piano with a tuning lever on the pins |
| /how-to-tune-a-piano-a-simple-guide/ | feature | "Tuning a piano" | Tuning hammer on the pins inside a grand piano, red felt mutes visible |
| /how-to-tune-a-piano-a-simple-guide/ | web.archive.org image | "how to tune a piano" | check image (it failed to load) |
| /piano-career-academy-review/ | Ilnica-Vartic-…png | "Ilnica Vartic" | Ilnica Vartic, founder of Piano Career Academy, in front of a white grand piano |
| /piano-career-academy-review/ | Pricing-…png | "Piano Career Academy Pricing" | Piano Career Academy pricing: $470 per year or $47 per month |
| /piano-diy-repair-guide/ | feature | = title | Pianist leaning over an open grand piano to inspect the strings |
| /piano-diy-repair-guide/ | piano-anatomy-parts.webp | "Piano anatomy/parts" | Labelled diagram of grand piano parts: strings, action, soundboard, pedals, lid |
| /piano-diy-repair-guide/ | sticky-piano-keys-1.webp | "Sticky piano keys" | Close-up of uneven, sticking ivory piano keys |
| /piano-diy-repair-guide/ | worn-felt-piano.webp | "Worn felt" | Close-up of worn felt on piano hammers |
| /piano-diy-repair-guide/ | piano-pedal-issues.webp | "Piano pedal issues" | Three pedals on a black grand piano lyre |
| /piano-diy-repair-guide/ | soundboard-crack-piano.webp | "Soundboard crack on piano" | Crack running along a piano soundboard |
| /piano-diy-repair-guide/ | piano-technician.webp | "Piano tuner/technician" | Older piano technician working on the action of an open piano |
| /piano-diy-repair-guide/ | piano-tuning.webp | "Regular piano tuning" | Tuning hammer on the pins of a grand piano |
| /pianote-review/, /ahmad-jamal-biography/, /yamaha-p-145-review/, /loog-piano/, /skoove-review/ (inline), /best-beginner-pianos/, /acoustic-vs-digital-piano/ | — | — | Alt OK; no change needed. /pianote-review/ alts and feature still say "2025": drop the year. |

Bookmark-card icons and thumbnails (/piano-dehumidifier-101.../, /open-studio-jazz-review/, /bastien-piano-method.../) have `alt=""`. That is correct for decorative images next to linked text, so no change is needed.

## Per-page table

"Img KB (phone)" is the total image bytes transferred on a phone after scrolling the full page. "LCP" is measured on the phone.

| URL | Content imgs | Alt issues | Heaviest image | Img KB (phone) | LCP (phone) | Other |
|---|---|---|---|---|---|---|
| / | 0 (17 cards) | card alts = post titles | Unsplash card 68 KB | 426 | H1 text | — |
| /about/, /contact/, /cookie-policy/, /privacy-policy/ | 0 | — | logo 44 KB | 44 | text | logo PNG |
| /yamaha-p-145-review/ | 2 | OK | from-above.jpg 86 KB | 386 | text | HTML-card images: no srcset or lazy |
| /climate-control-and-your-piano/ | 0 | feature = title | Unsplash feature 155 KB | 310 | feature img | — |
| /best-beginner-pianos/ | 7 picks | OK | feature 70 KB | 461 | text | already done |
| /best-digital-piano/ | 12 | 3 weak ("Reviewed") | where-to-buy 96 KB | 940 | feature img | many images, but all JPGs ≤100 KB |
| /stephen-ridley/ | 3 | "Avoid It", feature alt | scientology.jpg 218 KB served | 464 | feature img | — |
| /teach-yourself-piano/ | 9 | 5 weak, feature = title | image-1.png 468 KB | **2,997** | feature img | image.png names |
| /skoove-review/ | 3 | feature "Skoove Review" | Skoove-Overview.png 376 KB | **1,143** | feature img | no width/height |
| /loog-piano/ | 2 | feature = title | Loog-from-above 152 KB | 491 | feature img | no width/height |
| /ahmad-jamal-biography/ | 2 | OK | 39 KB | 344 | feature img | no width/height |
| /piano-basics-a-beginners-guide-to-the-keyboard/ | 1 | OK | 16 KB (JPEG named .webp) | 169 | text | **no feature image** |
| /piano-practice-4-tips-to-successful-sessions/ | 3 | OK | Unsplash 293 KB | 498 | text | — |
| /worship-music-academy-review/ | 0 | feature = title | 36 KB | 155 | text | — |
| /hdpiano-review/ | 3 | 2 weak + feature | image-6.png 316 KB | 730 | text | — |
| /piano-dehumidifier-101-why-it-is-important/ | 6 | 5 weak | image-10.png 706 KB | **1,890** | feature img | image-N.png names |
| /open-studio-jazz-review/ | 3 | 3 weak | image.png 664 KB | **1,237** | feature img | ugly hero filename |
| /best-piano-lessons-online/ | 8 | 7 weak + feature | image-1.png 467 KB | **1,826** | text | image-N.png names |
| /simply-piano-review-the-honest-truth-…/ | 2 | 3 weak | 132 KB | 516 | feature img | hotlinked Sweetwater image |
| /best-piano-books-for-adult-beginners/ | 5 | covers OK-ish, feature = title | image-3.png **1,065 KB** | **3,578** | H1 | worst page |
| /acoustic-vs-digital-piano/ | 1 | OK | 208 KB | 389 | feature img | — |
| /piano-humidifier/ | 0 | — | — | 174 | text | **no feature image** |
| /pianoforall-review/ | 12 | **1 empty**, 10 weak | Approach.png 153 KB | 940 | feature img | 11 UUID filenames |
| /pianote-review/ | 3 | OK (stale "2025") | 119 KB | 455 | feature img | — |
| /pianovision-review/ | 5 | 6 weak | hotlinked 75 KB | 406 | feature img | 2 hotlinked |
| /best-free-piano-learning-apps/ | 7 | 7 weak | 60 KB | 473 | feature img | — |
| /synthesia-piano-review/ | 2 | 2 weak | 68 KB | 440 | text | — |
| /piano-with-jonny-review/ | 2 | 2 weak | Jonny-May 98 KB | 299 | text | — |
| /flowkey-review/ | 5 | 4 weak | 84 KB | 484 | feature img | — |
| /cole-lam-the-piano-prodigy/ | 0 | feature = title | feature 137 KB | 369 | feature img | — |
| /lang-lang-the-biography/ | 0 | "Lang Lang" | 47 KB | 172 | feature img | — |
| /5-best-piano-methods-to-learn-quickly/ | 2 | **1 wrong**, feature | Unsplash 456 KB | 943 | feature img | — |
| /how-the-piano-works/ | 4 | **3 wrong** | Unsplash **710 KB** | **1,910** | text (desktop: lazy img) | **no feature image** |
| /bastien-piano-method-is-it-the-right-one-for-you/ | 0 | feature weak | 52 KB | 257 | text | Depositphotos filename |
| /are-piano-keys-still-made-of-ivory/ | 2 | **1 empty**, 1 auto | Unsplash 519 KB | 998 | feature img | — |
| /piano-tuning-when-and-why-its-needed/ | 0 | "Tuning a piano" | 73 KB | 252 | feature img | — |
| /piano-career-academy-review/ | 4 | 2 weak | Ilnica PNG **770 KB** | **1,171** | feature img | — |
| /how-to-tune-a-piano-a-simple-guide/ | 2 | **1 empty** + 1 weak | Unsplash **897 KB** | **1,141** | feature img | archive.org hotlink unreliable |
| /piano-diy-repair-guide/ | 7 | 7 weak + feature | 68 KB | 465 | feature img | duplicate tuning photo |
| /how-to-clean-and-maintain-your-piano/ | 2 | feature = title | Unsplash 286 KB | 1,048 | feature img | — |
| /tag/pianos/, /tag/apps/, /tag/buying-guides/, /tag/pianists/, /tag/care/, /tag/courses/, /tag/lessons/ | cards | card alt = feature alt | ≤116 KB | 129–414 | text | — |
| /tag/books/, /tag/practice/, /tag/jazz-piano/ | 1 card | — | ≤28 KB | 64–76 | **lazy card image** | eager first card |
| /author/richard/ | cards | — | 24 KB | 197 | text | — |
| /author/katarina/ | cards | — | 38 KB | 378 | **lazy card image** | eager first card |

## Prioritized fix list

1. **Replace the 12 biggest PNGs** (Table A, top rows) on /best-piano-books-for-adult-beginners/, /piano-career-academy-review/, /piano-dehumidifier-101.../, /open-studio-jazz-review/, /teach-yourself-piano/, /best-piano-lessons-online/ and /skoove-review/. Use compressed JPG/WebP under 150 KB with descriptive filenames. This saves about 7 MB. Do the alt text at the same time (Table B).
2. **Fill the 3 empty alts and fix the 4 wrong Unsplash auto-captions** (Table B, top rows).
3. **Replace the oversized Unsplash cards** on /how-to-tune-a-piano.../, /how-the-piano-works/, /are-piano-keys.../, /5-best-piano-methods.../ and /how-to-clean.../ with self-hosted 1200px images.
4. **Write feature-image alt text** in post settings for the ~20 posts listed. This also fixes every card on the home, tag and author pages.
5. **Add feature images** to /piano-basics…/, /how-the-piano-works/ and /piano-humidifier/.
6. **Theme:** load the first post card eagerly with `fetchpriority="high"` on tag, author and home pages, and serve the logo as SVG or WebP.
7. **Optional server change:** a Caddy WebP rewrite for `/content/images/size/…` so future PNG uploads are served as WebP automatically.
8. **Re-insert HTML-card images as image cards** on /skoove-review/, /loog-piano/, /ahmad-jamal-biography/ and /yamaha-p-145-review/ (gives width/height, srcset and lazy-loading).
9. **Tidy-up:** improve the remaining short alts, rename image-N/UUID files when you replace them, self-host or remove hotlinked images, and fix the fake .webp.

## Not checked

- AVIF support: Ghost's `format/avif` URL was not tested.
- IPTC/XMP creator and copyright metadata: not audited. Only EXIF make/model was checked, and none was found.
- Image licence and rights for the Depositphotos, Sweetwater and Webflow images: not checked.
- Google Images rankings and image search traffic: not checked (no DataForSEO/GSC access).
- I did not view the 8 remaining /best-digital-piano/ product images or the /best-free-piano-learning-apps/ feature image individually, so their suggestions are marked "check image".
