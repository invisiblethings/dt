# Social / OG share images: pianoers.com (7 Oct 2026)

Data source: Image Audit (static analysis). Every `og:image` was downloaded on 7 Oct 2026 and measured (pixel size, aspect ratio, file size). Meta tags were re-read from the live HTML of all 55 sitemap URLs. Crops show what Facebook/LinkedIn (1.91:1) and X (2:1) would display. They were simulated locally, not checked live in the platforms' debuggers.
Image generation: **no images were generated**. The nanobanana-mcp / banana extension is **not available** in this session, so the plan below is a prompt list only.

## Score: 52 / 100

| Metric | Value | Status |
|---|---|---|
| Pages with an og:image | 43/55 (all 43 posts/pages; 0 of 10 tags, 0 of 2 authors) | Fail |
| og:image at least 1200 px wide and 1.75-2.1:1 (near 1.91:1) | 8/55 | Fail |
| og:image at least 1200 px wide but 3:2 or similar (works, slight crop) | 12/55 | Partial |
| Portrait or square og:image (badly cropped) | 6/55 | Fail |
| Under 1200 px wide (non-shared) | 9/55 | Fail |
| Pages sharing the generic site banner (877x359) | 8/55 | Fail |
| twitter:card = summary_large_image | 43/55 (tags + authors = `summary`) | Partial |
| og:image:alt present | 0/55 | Fail |
| Schema `image` (ImageObject) in Article/WebSite | 35/43 posts/pages (missing on the 8 banner-fallback URLs) | Partial |
| Average og:image file size | 108 KB (range 9-594 KB) | Pass |
| WebP used as og:image | 5 pages | Low risk (JPEG is safest for sharing) |

## What works

- All 43 post/page URLs output `og:image`, `twitter:image`, `og:image:width/height` and `twitter:card=summary_large_image` (Ghost default head).
- All og:image URLs return HTTP 200 with correct content-types. No broken share images.
- 8 pages already have good 16:9 to 1.91:1 images at 1200 px or more: /stephen-ridley/, /piano-with-jonny-review/ (1200x628), /flowkey-review/ (1200x623), /acoustic-vs-digital-piano/, /cole-lam-the-piano-prodigy/, /piano-career-academy-review/, /pianoforall-review/, /are-piano-keys-still-made-of-ivory/.
- Recent money pages (/best-digital-piano/, /yamaha-p-145-review/, /best-free-piano-learning-apps/, /teach-yourself-piano/) use clean branded 1200x800 designs. These are readable after cropping. Only the very top line gets slightly clipped (see Low findings).
- File sizes are well under every platform limit (Facebook 8 MB, X 5 MB).
- A ready 1200x630 replacement for /best-beginner-pianos/ already exists in this repo: `/home/user/dt/pianoers/best-beginner-pianos/images/best-beginner-keyboard-piano-social.jpg` (1200x630, 57 KB). It has **not been uploaded yet**, and the live page still shows the portrait image.

## Findings (ordered by severity)

| # | Severity | Finding | Evidence | Fix (where in Ghost Admin) |
|---|---|---|---|---|
| 1 | High | **Portrait (2:3) share images on 4 posts, including 2 money pages.** Facebook/LinkedIn/X crop these to a strip from the middle, so the headline is cut off. | /best-piano-lessons-online/ (9 affiliate links), /best-beginner-pianos/ (8), /synthesia-piano-review/ (2), /best-piano-books-for-adult-beginners/. All are 1024x1536, `og:image:width=1024 height=1536`. Simulated crop: "BEST PIANOS FOR BEGINNERS" becomes only the bottom half of "BEGINNERS" plus a music stand. "8 BEST ONLINE PIANO LESSONS" becomes "...PIANO LESSONS" with the top word cut. | Keep the portrait image as the feature image (it suits Pinterest). Upload a separate 1200x630 image in **Post settings (gear icon) → Facebook card → image** and **X card → image** for each. For /best-beginner-pianos/ upload the ready file `best-beginner-keyboard-piano-social.jpg`. New images for the others: see generation plan. |
| 2 | High | **8 pages share one generic 877x359 banner** (yellow "PIANOERS.COM" logo only, 9 KB). It is too small and too wide (2.44:1), and it carries no topic or message. This includes the **homepage**. | og:image `/content/images/2025/05/PianoersBanner-1.png` (877x359) and twitter:image `/content/images/2025/05/PianoersBanner.png` (877x359, a second copy) on: /, /about/, /contact/, /privacy-policy/, /cookie-policy/, /piano-basics-a-beginners-guide-to-the-keyboard/, /piano-humidifier/, /how-the-piano-works/. The 3 posts have no feature image, so Ghost falls back to the site-wide card image. | (a) Replace the site-wide default in **Settings → General settings → Facebook card / X card (Meta data section)** with a 1200x630 branded image. (b) Give the 3 posts their own feature image, or set **Post settings → Facebook card / X card**. |
| 3 | High | **Square images on 2 course reviews** (cropped hard top and bottom). The WMA one is the vendor's own logo, with their typo "EQUIIPPING". | /hdpiano-review/ 1080x1080 (4 affiliate links). /worship-music-academy-review/ 900x900 (2 affiliate links, no other images on the page). | New 1200x630 image via **Post settings → Facebook card / X card** (plan rows 5-6). |
| 4 | Medium | **No share image at all on the 10 tag pages and 2 author pages.** Shares show a small `summary` card (twitter:card=summary, no og:image). | /tag/pianos/, /tag/apps/, /tag/buying-guides/, /tag/pianists/, /tag/care/, /tag/courses/, /tag/lessons/, /tag/books/, /tag/practice/, /tag/jazz-piano/, /author/richard/, /author/katarina/: no `og:image` or `twitter:image` meta. Authors have profile photos (Richard-Abraham-Pianoers.jpg, Katarina.jpg) but no cover image. | Tags: **Settings → Tags → (tag) → Facebook card / X card** (or the tag image) at 1200x630. Authors: **Settings → Staff → (user) → Cover picture**, 1200x630 or larger. Ghost uses it for the author page share image. Start with /tag/pianos/, /tag/courses/, /tag/apps/, /tag/buying-guides/ (money hubs). |
| 5 | Medium | **Low-resolution share images (under 1200 px wide).** Facebook shows a small thumbnail instead of a large card when the image is under 600x315, which applies to the tuning guide (299 px tall). | /how-to-tune-a-piano-a-simple-guide/ 640x299 (also a third-party "HAILUN" piano photo). /loog-piano/ 680x453. /open-studio-jazz-review/ 815x483 (file name `Case-study-hero-825x483-Open-studio...` suggests the vendor's own hero image). /ahmad-jamal-biography/ 951x535. /pianote-review/ 1000x650. /bastien-piano-method.../ 1000x650 (481 KB PNG). /piano-tuning-when-and-why-its-needed/ 1024x682. /pianovision-review/ 1032x478. /skoove-review/ 1079x564. | Re-export at 1200x630 (upscaling a sharp source is acceptable for the 1000-1080 px ones). Replace 640x299 and 680x453 first. |
| 6 | Medium | **Possible third-party / brand images used as share images** (not verified: check you have rights or that they come from an affiliate press kit). | WMA logo (/worship-music-academy-review/), Open Studio case-study hero (/open-studio-jazz-review/), Hailun piano photo (/how-to-tune-a-piano-a-simple-guide/), Loog product photo (/loog-piano/). | Use the vendor's affiliate/press kit, your own screenshots, or generated scenes (plan below). |
| 7 | Low | **Top line of text clipped** on several 3:2 (1200x800) designs when cropped to 1.91:1. | /best-digital-piano/: "Best" is half cut off. /teach-yourself-piano/: "LEARN PIANO" is cut at the top. /bastien-piano-method.../: "Bastien Piano Basics" is cut. /yamaha-p-145-review/: title sits right at the top edge but stays readable. | When next editing, export a 1200x630 version with text kept inside the middle 80% and upload it as the Facebook/X card image. No new artwork is needed. |
| 8 | Low | **Declared size ≠ actual size** on Unsplash and one PNG. The aspect ratio matches, so this is harmless today. | Unsplash images declare 1200x800 but serve 2000x1333 (348-594 KB): /climate-control-and-your-piano/, /piano-practice-4-tips.../, /5-best-piano-methods.../, /how-to-clean-and-maintain-your-piano/. /are-piano-keys.../ declares 1200x571 but is 2000x951. /acoustic-vs-digital-piano/ `size/w1200` URL serves 1600x900 PNG (279 KB). | Optional: download the Unsplash photo, crop to 1200x630 JPEG (~100 KB), and upload as the Facebook/X card image. |
| 9 | Low | **No og:image:alt / twitter:image:alt on any page.** | Not present in the head of any of the 55 URLs. | Ghost does not output it from post settings. It could be added in the theme (`default.hbs`) later. Low value, so leave for a theme release. |
| 10 | Low | **No twitter:site / twitter:creator.** | Absent on all 55 URLs. | If the site has an X account, add it in **Settings → General settings → Social accounts**. Ghost then outputs twitter:site. |
| 11 | Low | **WebP share images** may not show on some older apps/scrapers. JPEG is the safest choice. | /pianovision-review/, /ahmad-jamal-biography/, /piano-tuning-when-and-why-its-needed/, /how-to-tune-a-piano-a-simple-guide/, /piano-diy-repair-guide/. | When replacing (finding 5), upload JPEG for the Facebook/X card. |

Confirmed open items from the earlier /best-beginner-pianos/ audit: the portrait share image is still live (finding 1). The title is still missing ")" (`<title>`/og:title = "7 Best Beginner Keyboard & Digital Pianos (2026, Tested"). The **meta description still says "$350 to $730"**, while og:description says "$400 to $730".

## Worst 5 share images (looked at visually)

1. **Site banner, 877x359 (8 pages including the homepage).** It is only a flat yellow logo. It has no message, it is too small for a large card, and it is 2.44:1, so platforms add bars or crop the sides.
2. **/best-piano-lessons-online/ (1024x1536 portrait, money page).** An illustrated "8 BEST ONLINE PIANO LESSONS" poster. After cropping, only "...PIANO LESSONS" and part of a laptop remain.
3. **/best-beginner-pianos/ (1024x1536 portrait, money page).** A moody room with the title at the top. After cropping, only half of "BEGINNERS" and a music stand remain. A fix file is ready but not uploaded.
4. **/how-to-tune-a-piano-a-simple-guide/ (640x299).** A third-party photo of a Hailun grand being tuned. It is the smallest image on the site and likely shows as a small thumbnail on Facebook.
5. **/worship-music-academy-review/ (900x900).** The vendor's square logo with their spelling error "EQUIIPPING". Cropped, it reads "WORSHIP MUSIC ACADEMY" with nothing about a review or Pianoers. (Runner-up: /hdpiano-review/ 1080x1080, which is well designed but square, so "PIANOERS.COM" and "REVIEW" get cut.)

## Image generation plan (not generated)

Rules for all images: 1200x630 JPEG, quality ~80, under 150 KB. Keep text and faces inside the central 1100x560 "safe area" so X's 2:1 crop doesn't cut them. Use one consistent brand template: a small Pianoers logo bottom-left, and brand yellow (#EDB419-ish, from the banner) plus teal (#4A8A9C-ish) accents.
**Generate the background scene only, then add the text overlay in Canva/Figma.** AI image models still misspell words. Do not let the AI draw specific product models (Yamaha P-145, Roland FP-10, etc.) because it will invent wrong details. For product pages, use your own photos.

Prioritised by money value (affiliate link count from crawl/pages.json). No traffic data was available, so traffic ordering was **not checked**. Re-order with Search Console clicks if you have them.

| # | Page | Issue | Use case | Prompt idea (background only) | Text overlay | Priority |
|---|---|---|---|---|---|---|
| 1 | /best-piano-lessons-online/ | Portrait 1024x1536 | og | "Wide 1.91:1 photo, adult learner at a digital piano at home in the evening, laptop on the music stand showing an online piano lesson (blank screen, no logos), warm lamp light, shallow depth of field, empty dark space on the left third for text, photorealistic" | "8 Best Online Piano Lessons" / sub: "Tested by a piano teacher · 2026" | Critical |
| 2 | /best-beginner-pianos/ | Portrait 1024x1536 | og | Stopgap: upload the existing `best-beginner-keyboard-piano-social.jpg` now. Better version: "Wide photo of a generic black 88-key slim digital piano on a stand in a bright, tidy living room, headphones on the bench, morning light, generic unbranded keyboard, space on the left for text" | "7 Best Beginner Digital Pianos" / sub: "88 weighted keys · $400-$730 · 2026" | Critical |
| 3 | / (homepage) + site default card | Generic 877x359 banner | og (site-wide) | "Overhead close-up of piano keys with a pair of hands, a tablet showing a lesson and a pencil on sheet music, warm natural light, clean composition, negative space at the top" | Pianoers logo + "Honest piano reviews, lessons & guides" / sub: "From a piano teacher since 2001" | Critical |
| 4 | /best-digital-piano/ | 3:2, "Best" clipped | og | No generation needed. Re-export the existing artwork to 1200x630 with the title moved down. | "Best Digital Pianos (That I've Actually Tested)" | High |
| 5 | /hdpiano-review/ | Square 1080x1080 | og | Re-lay out the existing orange "HDPiano Review" design at 1200x630 (no generation needed), or: "Wide shot of a pianist's hands on keys with a laptop showing a close-up video piano lesson, bright orange accent lighting, modern" | "HDpiano Review" / sub: "Worth it in 2026? Honest verdict" | High |
| 6 | /synthesia-piano-review/ | Portrait 1024x1536 | og | "Wide dark background with falling coloured note bars (blue and orange, Synthesia style) landing on a lit-up keyboard along the bottom, no text, no logos" | "Synthesia Review" / sub: "Can falling notes really teach you piano?" | High |
| 7 | /worship-music-academy-review/ | Square vendor logo, typo | og | "Church worship setting, keyboardist's hands on a stage keyboard, soft stage lights and blurred congregation, warm tones, space on the right for text" | "Worship Music Academy Review" / sub: "Learn worship piano online" | High |
| 8 | /piano-humidifier/ | Generic banner, no feature image | og + feature | "Close-up inside an upright piano showing a humidity control unit mounted near the soundboard, with a small hygrometer reading ~45%, soft light" | "Piano Humidifiers & Humidity Control" / sub: "Protect your piano year-round" | Medium |
| 9 | /piano-basics-a-beginners-guide-to-the-keyboard/ | Generic banner | og + feature | "Clean top-down view of one octave of piano keys with soft shadows, white background, minimal" (labels C D E F G A B added in Canva) | "Piano Basics: Know Your Keyboard" | Medium |
| 10 | /how-the-piano-works/ | Generic banner | og + feature | "Cutaway-style view inside a grand piano: hammers, dampers and strings, warm wood tones, dramatic side light" | "How the Piano Works" / sub: "Hammers, strings & action explained" | Medium |
| 11 | /best-piano-books-for-adult-beginners/ | Portrait 1024x1536 | og | "Three generic, unbranded piano method books on a music stand above a keyboard, soft bokeh, landscape composition" (no real covers) | "Best Piano Books for Adult Beginners" | Medium |
| 12 | /how-to-tune-a-piano-a-simple-guide/ | 640x299, third-party photo | og + feature | "Hand holding a tuning lever on a tuning pin inside an upright piano, mutes between strings, close-up, sharp focus, generic piano (no brand name)" | "How to Tune a Piano" / sub: "A simple step-by-step guide" | Medium |
| 13 | /open-studio-jazz-review/ | 815x483, vendor image | og | "Moody black-and-white close-up of jazz pianist hands on keys, smoky club light, space on the left" | "Open Studio Jazz Review" | Medium |
| 14 | Tag hubs: /tag/pianos/, /tag/courses/, /tag/apps/, /tag/buying-guides/ | No image | og (tag) | One template, 4 backgrounds: digital piano in a living room / laptop lesson / phone app on a piano music stand / several keyboards side by side | Tag name + "Reviews & guides · Pianoers" | Medium |
| 15 | Other tags: /tag/pianists/, /tag/care/, /tag/lessons/, /tag/books/, /tag/practice/, /tag/jazz-piano/ | No image | og (tag) | Same template: concert stage / piano cleaning cloth and tools / teacher and student hands / stack of music books / metronome and timer / jazz club piano | Tag name | Low |
| 16 | /author/richard/, /author/katarina/ | No image | author cover | **No generation.** Use the real profile photo on a branded 1200x630 template (a real person must not be AI-generated). | Name + "Piano teacher since 2001" (Katarina) / "Pianist & founder of Pianoers" (Richard) | Low |
| 17 | /loog-piano/ | 680x453 | og | Prefer your own photo or the press kit. Otherwise "Small colourful kids' wooden mini keyboard on a wooden floor with toys, top-down" (generic, not the Loog design) | "Loog Piano Review" | Low |

Not in the generation plan (simple re-export to 1200x630, no new art): /teach-yourself-piano/, /bastien-piano-method-is-it-the-right-one-for-you/, /pianote-review/, /skoove-review/, /pianovision-review/, /ahmad-jamal-biography/, /piano-tuning-when-and-why-its-needed/, and the Unsplash pages.

### Cost and workflow

- About 22 backgrounds to generate (rows 1-3, 5-15, 17; rows 4 and 16 need none). With roughly 3 tries each, that is about 65 generations. At about USD 0.04 per image (Gemini image model list price: **check current pricing**), this is about USD 3. Text is added for free in Canva/Figma.
- Batch it: run all backgrounds in one session with the same style suffix ("photorealistic, warm natural light, 1.91:1 landscape, generous negative space, no text, no logos"), then apply one Canva template for all overlays.
- Export pipeline: generate as PNG, add the overlay, export **JPEG 1200x630** for the Facebook/X card fields (the safest format for scrapers), and **WebP** for any image also used on the page (the theme already converts feature images to WebP via `img_url`).
- After uploading, re-scrape each URL in the Facebook Sharing Debugger and LinkedIn Post Inspector so their caches update. X refreshes automatically.
- Generation requires the banana (nanobanana-mcp) extension, which is not installed in this session.

## Per-URL table (all 55)

| URL | og:image file | Actual px | Ratio | KB | twitter:card | Note |
|---|---|---|---|---|---|---|
| / | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | Generic, small |
| /about/ | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | Generic |
| /contact/ | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | Generic |
| /privacy-policy/ | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | Generic (fine for legal) |
| /cookie-policy/ | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | Generic (fine for legal) |
| /yamaha-p-145-review/ | Yamaha-p-145-review-pianoers.jpg | 1200x800 | 1.50 | 72 | large | OK, title near top edge |
| /climate-control-and-your-piano/ | Unsplash | 2000x1333 | 1.50 | 373 | large | OK, oversized |
| /best-beginner-pianos/ | best-beginner-piano.jpg | 1024x1536 | 0.67 | 111 | large | Portrait, fix file ready |
| /best-digital-piano/ | best-digital-piano-pianoers.jpg | 1200x800 | 1.50 | 70 | large | "Best" clipped |
| /stephen-ridley/ | Stephen-Ridley-Profile.jpg | 1200x675 | 1.78 | 36 | large | Good |
| /teach-yourself-piano/ | Learn-piano-by-yourself-online.jpg | 1200x800 | 1.50 | 110 | large | Title clipped at top |
| /skoove-review/ | Skoove-Review.jpeg | 1079x564 | 1.91 | 25 | large | Slightly small |
| /loog-piano/ | Loog-Piano.jpg | 680x453 | 1.50 | 56 | large | Small, likely vendor photo |
| /ahmad-jamal-biography/ | Ahmad-Jamal-Biography.webp | 951x535 | 1.78 | 32 | large | Small, WebP |
| /piano-basics-a-beginners-guide-to-the-keyboard/ | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | No feature image |
| /piano-practice-4-tips-to-successful-sessions/ | Unsplash | 2000x1333 | 1.50 | 348 | large | OK, oversized |
| /worship-music-academy-review/ | WMA.jpg | 900x900 | 1.00 | 36 | large | Square vendor logo |
| /hdpiano-review/ | HDPiano-Review-Pianoers.com.jpg | 1080x1080 | 1.00 | 36 | large | Square |
| /piano-dehumidifier-101-why-it-is-important/ | Piano-Dehumidifier-Pianoers.jpg | 1200x800 | 1.50 | 64 | large | OK |
| /open-studio-jazz-review/ | Case-study-hero-825x483-Open-studio...png | 815x483 | 1.69 | 125 | large | Small, vendor image |
| /best-piano-lessons-online/ | Best-Online-Piano-Lessons.jpg | 1024x1536 | 0.67 | 99 | large | Portrait |
| /simply-piano-review-the-honest-truth-about-learning-piano-with-an-app/ | Simply-Piano-Review.jpg | 1200x780 | 1.54 | 41 | large | OK |
| /best-piano-books-for-adult-beginners/ | best-piano-books-for-adult-beginners.jpg | 1024x1536 | 0.67 | 62 | large | Portrait |
| /acoustic-vs-digital-piano/ | Acoustic-vs-Digital-Piano.png | 1600x900 (declared 1200x675) | 1.78 | 279 | large | Good |
| /piano-humidifier/ | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | No feature image |
| /pianoforall-review/ | Pianoforall_Review.jpg | 1200x675 | 1.78 | 46 | large | Good |
| /pianote-review/ | Pianote-Review.png | 1000x650 | 1.54 | 76 | large | Slightly small |
| /pianovision-review/ | PianoVision-FI.webp | 1032x478 | 2.16 | 21 | large | Small, WebP |
| /best-free-piano-learning-apps/ | best-free-piano-learning-apps.jpg | 1200x800 | 1.50 | 75 | large | OK |
| /synthesia-piano-review/ | Synthesia-Piano-Review-Pianoers.jpg | 1024x1536 | 0.67 | 92 | large | Portrait |
| /piano-with-jonny-review/ | Piano-with-Jonny---In-Depth-Review.jpeg | 1200x628 | 1.91 | 52 | large | Good |
| /flowkey-review/ | Flowkey.jpg | 1200x623 | 1.93 | 68 | large | Good |
| /cole-lam-the-piano-prodigy/ | Cole-Lam.jpg | 1200x675 | 1.78 | 165 | large | Good |
| /lang-lang-the-biography/ | Lang-Lang-Biography.jpg | 1200x873 | 1.37 | 66 | large | OK (crop loses some top/bottom) |
| /5-best-piano-methods-to-learn-quickly/ | Unsplash | 2000x1333 | 1.50 | 445 | large | OK, oversized |
| /how-the-piano-works/ | PianoersBanner-1.png (shared) | 877x359 | 2.44 | 9 | large | No feature image |
| /bastien-piano-method-is-it-the-right-one-for-you/ | Bastien-Piano-Method.png | 1000x650 | 1.54 | 481 | large | Small, heavy PNG, title clipped |
| /are-piano-keys-still-made-of-ivory/ | Unsplash | 2000x951 | 2.10 | 189 | large | Good |
| /piano-tuning-when-and-why-its-needed/ | Tuning-a-Piano.webp | 1024x682 | 1.50 | 73 | large | Slightly small, WebP |
| /piano-career-academy-review/ | Piano-Career-Academy---Review.jpg | 1200x675 | 1.78 | 43 | large | Good |
| /how-to-tune-a-piano-a-simple-guide/ | piano-tuning-1.webp | 640x299 | 2.14 | 34 | large | Smallest, third-party |
| /piano-diy-repair-guide/ | DIY-Piano-Repairs.webp | 1200x780 | 1.54 | 63 | large | OK, WebP |
| /how-to-clean-and-maintain-your-piano/ | Unsplash | 2000x1333 | 1.50 | 594 | large | OK, heaviest |
| /tag/pianos/ … /tag/jazz-piano/ (10 tags) | none | n/a | n/a | n/a | summary | No image |
| /author/richard/, /author/katarina/ | none | n/a | n/a | n/a | summary | No cover image |

"large" = `summary_large_image`. On the 8 banner pages, `twitter:image` is `PianoersBanner.png` (a separate 877x359 copy) rather than the og file. That is harmless, but both should be replaced together in Settings.
