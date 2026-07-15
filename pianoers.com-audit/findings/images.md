# Images — 75/100

## What works
- One homepage image already uses WebP
- In-article images generally use responsive width-suffixed URLs (/size/w720/...)
- Most in-article images are lazy-loaded

## Findings

### [Medium] 26 of 416 images (6%) missing alt text across 16 pages
Worst offenders: /ridley-academy-review/ (4/9 missing), /open-studio-jazz-review/ (3/11), /piano-dehumidifier-101-why-it-is-important/ (3/14).

**Recommendation:** Add descriptive alt text to all flagged images; prioritize the 3 pages above.

### [Low] Most sampled images are JPEG/PNG rather than WebP/AVIF
Of 8 homepage images sampled, 6 were JPEG, 1 PNG, and only 1 WebP, ranging 33-60KB each.

**Recommendation:** Serve images as WebP/AVIF with JPEG fallback to reduce payload; Ghost supports this via image optimization plugins/CDN transforms.
