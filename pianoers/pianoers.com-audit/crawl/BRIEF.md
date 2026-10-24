# Shared brief for all audit agents (pianoers.com, 7 Oct 2026)

Site: https://pianoers.com — Ghost 6.x blog about learning piano (reviews of digital pianos, online courses/apps, care guides, pianist biographies). Affiliate publisher (Amazon amzn.to links, course affiliate redirects like /PFA, /pianoforall, /pbp). Authors: Richard J. Abraham and Katarina. English, US audience. Not a local business, not a store.

Theme: custom "Pianoers" theme built in this repo (source: /home/user/dt/pianoers/theme/pianoers/). It already provides: breadcrumbs + BreadcrumbList microdata, contents list, ItemList for verdict cards, affiliate rel="sponsored nofollow noopener" added by JS to links matching amzn.to/amazon.com, fixed image frame (CLS 0), WebP via img_url, lazy comments, font preload. Live may still run 1.1.0/1.1.1; latest is 1.1.2.

Already done earlier (don't re-report as new, but do confirm status):
- /best-beginner-pianos/ was fully audited and rewritten (see /home/user/dt/pianoers/best-beginner-pianos/). Open items there: meta title missing ")", old meta description mentioning $350, portrait share image.
- /yamaha-p-145-review/ audit + corrected article ready (see /home/user/dt/pianoers/yamaha-p-145-review/). Not yet pasted live.
- Known site-wide: /best-digital-piano/ still says "CFX-sampled" and "24 instrument voices" for the P-145BT (wrong: CFIIIS, 10 voices); www.pianoers.com DNS points to 100:: (dead, 502); security headers mostly missing (HSTS is present); phone Lighthouse ~50 due to third-party scripts (Ghost Portal/Search, GTM, Claspo).

Data already collected (use it; refetch only if you need something not in it):
- crawl/pages.json — all 55 sitemap URLs: status, title, desc, canonical, robots, OG, dates, author, h1, headings (tag, text), words, full article text, links (href/text/rel), images (src/alt/w/h/loading), parsed JSON-LD, has_disclosure (theme affiliate disclosure shown).
- crawl/links.json — status of all 169 unique outbound/internal links (403s from sweetwater/unsplash/termsfeed are bot blocks, not breakage).
- crawl/site-level.txt — robots.txt, llms.txt head, response headers, http->https, www, 404, RSS, well-known files.

Environment: outbound HTTPS works through a proxy; for Python use REQUESTS_CA_BUNDLE=/root/.ccr/ca-bundle.crt and the venv ~/.claude/skills/seo/.venv/bin/python (has requests, bs4, playwright). Chromium: /opt/pw-browsers/chromium-1194/chrome-linux/chrome. Lighthouse may be available via npx (Node at /home/ghostdev/node24/bin). Claude-seo scripts: "$HOME/.claude/skills/seo/scripts/claude-seo" run <script>.py.

Rules:
- Read-only: never change the live site or the theme source.
- Every finding needs evidence (URL + what you saw). Do not guess. Say "not checked" when you didn't check.
- Severity: Critical / High / Medium / Low. Give a specific fix for each, saying WHERE in Ghost Admin it's done when relevant (post settings, code injection, theme setting, Navigation, etc.).
- Plain English; the site owner is not a developer.
- Write your findings to the file path you are given, as Markdown: a 0-100 score for your category, "What works", then findings table(s) ordered by severity, then per-URL notes where useful. Overwrite it with the complete version before finishing.
