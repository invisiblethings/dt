# Performance (Core Web Vitals)

**Score: 62/100.** Desktop is strong; phones are held back by third-party scripts.

The performance auditor was stopped partway through. This summary uses the 18 Lighthouse 13 runs it had already saved (`crawl/perf/`, 7 Oct 2026, local Chromium through a proxy, simulated slow 4G on mobile). These are lab numbers, not real-visitor (CrUX) data: no PageSpeed/CrUX key is configured.

## Results

| Page | Desktop score | Phone score (2 runs) | Phone LCP | CLS | Phone TBT |
|---|---|---|---|---|---|
| Home | 88 | 75 / 65 | 2.0 / 2.2 s | 0 | 1.1–1.6 s |
| /best-beginner-pianos/ | 91 | 68 / 41 | 1.9 / 12.2 s | ≤ 0.025 | 1.6–2.4 s |
| /best-piano-lessons-online/ | 85 | 55 / 62 | 3.4 / 2.5 s | 0.02 | 1.8 s |
| /pianoforall-review/ | 89 | 68 / 36 | 2.5 / 12.0 s | 0 | 1.1–1.5 s |
| /tag/pianos/ | 85 | 39 / 42 | 11.2 / 11.4 s | 0 | 0.6–0.8 s |
| /about/ | 99 | 43 / 43 | 11.4 / 11.1 s | 0 | 0.6–1.5 s |

## What works

- **Layout shift is essentially zero everywhere** (worst 0.025; "good" is under 0.1). The theme's fixed image frame and font fixes are doing their job.
- Desktop scores 85–99.
- When phone runs go well, the main content paints in about 2 seconds.

## Findings

| # | Severity | Finding | Fix |
|---|---|---|---|
| 1 | High | **Phone main-thread blocking of 0.6–2.4 s on every page** (Total Blocking Time; real-visitor equivalent is slow taps, INP). The biggest script costs per page load, in order: Ghost Portal (members popup, 0.7–1.2 s of CPU), Google Tag Manager (0.25–0.6 s), a **second** Google tag `gtag/js?id=G-4J8LKV62M8` (0.27–0.5 s), Claspo (0.2–0.34 s). | Settings → Code injection: remove Claspo if its pop-ups don't earn money; load GA4 only once (either through GTM or directly, not both). Check whether you need Portal on every page (Settings → Membership; if you don't sell memberships, the free signup forms still work without the popup button). |
| 2 | High | **Phone LCP sometimes 11–12 s** (about, tag, and one run each of beginner and Pianoforall). The same page loads in 2 s on another run, so this is the main thread being too busy to paint, made worse by the third-party scripts above. Lab runs through a proxy exaggerate it, but the pattern is real. | Same as #1. Then re-test with PageSpeed Insights (pagespeed.web.dev) on your own computer. |
| 3 | Medium | Pages weigh 1.4–2.7 MB; the lessons and Pianoforall pages are heaviest (2.3–2.7 MB), mostly images in old posts and YouTube embeds. | See the image findings; use Ghost's YouTube card (it lazy-loads) instead of raw iframes in HTML cards. |
| 4 | Low | The homepage's own inline work (the playable piano and sections) costs about 1.2 s of CPU on a simulated slow phone. | Theme-side; acceptable but can be deferred later if real-visitor INP turns out poor. |

**Not measured:** real-visitor data (needs Search Console's Core Web Vitals report or a CrUX key), INP directly, and pages other than these six.
