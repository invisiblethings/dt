# Agent readiness: pianoers.com (checked 7 Oct 2026)

**Score: 82 / 100** (my own judgement, not the Lighthouse number and not the Agent-UX heuristic).

Plain-English summary: AI agents that browse the web for a person (ChatGPT, Gemini in Chrome, Claude in Chrome, Comet) can read and use this site well. Lighthouse's new "Agentic Browsing" check gives **3/3 on both mobile and desktop**. No bot is blocked. The top pick and its buy link are easy to find. What is left is small: no policy text for AI in robots.txt, no Markdown version of pages, and a broken `/.well-known/ai-catalog.json` that is not worth fixing by creating a file.

## Tool notes (what I could and could not run)

| Tool | Result |
|---|---|
| `lighthouse_agentic.py` (PageSpeed Insights) | Failed: Google quota error (HTTP 429, shared anonymous quota). I ran Lighthouse 13.5.0 locally instead (Chromium 141, headless) and fed the saved reports to the same script with `--from-json`. Same audits, same maths. |
| `agentic_check.py` and `agent_ux_check.py` | Both refused to run: their safety guard blocks the sandbox's local proxy address (`127.0.0.1`). This is a limit of my environment, not a site problem. I did not bypass the guard. The Agent-UX 0-100 score is therefore **unavailable**. I replaced it with my own Playwright accessibility-tree review (below) and with curl checks of the same items. |
| Agent user-agent test | The requester asked for it, so I sent single homepage and one article requests with the GPTBot, ClaudeBot, PerplexityBot and ChatGPT-User tokens. These are unverified look-alikes, so the result shows how the site treats unknown traffic, not what the real bots would get. |

## Lighthouse Agentic Browsing

**Mobile: 3/3. Desktop: 3/3.** Lighthouse 13.5.0, run 7 Oct 2026 09:36 UTC, URL https://pianoers.com/ (homepage only, local run, not PSI).

| Audit | Mobile | Desktop |
|---|---|---|
| agent-accessibility-tree (33 axe rules) | pass | pass |
| cumulative-layout-shift | pass (0) | pass (0) |
| llms-txt | pass | pass |
| webmcp-form-coverage / registered-tools / schema-validity | N/A (no WebMCP) | N/A |
| ard-schema (ai-catalog.json) | N/A (none published) | N/A |

Paths that would add a counted audit (options, not goals): publish an `ai-catalog.json` (adds `ard-schema`), or register WebMCP tools or annotate forms (adds the three WebMCP audits where the testing browser supports it). The fraction would then read X/4 to X/7. With no resources to list, staying at 3/3 is fine. Only the homepage was scored; I did not run Lighthouse on the other pages.

## What works

- 3/3 Lighthouse, CLS 0, zero accessibility-tree failures on the homepage.
- Content is in the server HTML, not built by JavaScript. The homepage and articles return full HTML to a plain client (homepage 51 KB).
- Clean landmarks on all three pages: header, `Main` nav, main, `Breadcrumb` nav, "On this page" aside, footer nav, and a "Skip to content" link. One H1 per page. No unnamed buttons or links, no unlabelled inputs, no duplicate ids, no images without alt (checked in the rendered page).
- **Top pick and its buy link on /best-beginner-pianos/ are findable four ways**: the "Quick answer" heading names the Yamaha P-145BT in text; the Yamaha card is a heading plus a link named "Check price on Amazon" (https://amzn.to/4oClMcI, `rel="sponsored nofollow noopener"`); the side rail says "Top pick" with the same link; and a sticky bar (region "Recommended piano") repeats it. All four point to the same URL, so an agent will not get conflicting answers.
- **Verdict cards are well structured**: each has an H2 with the model name, the verdict sentence, a label ("Best all-around"), specs as term/definition pairs, and "Why it's here" / "Watch out for" lists. Price and check date are in plain text ("about $500, checked Oct 6, 2026").
- **Piano finder works for agents.** Buttons are grouped with the question as the group name, they report pressed state (`aria-pressed`, verified by clicking "About $500" then "Sound"), and the result announces itself in a polite live region. After two clicks it returned "Your match: Kawai ES60" with a named Amazon link and a "Read the verdict" link whose target (`#3-kawai-es60`) exists. All seven card anchors (`#1-...` to `#7-...`) exist.
- Newsletter form: real `<form>`, visible label "Email address", named "Sign up" button, repeated in the sidebar and footer. I did not submit it.
- Search: the "Search this site" button has a name; it opens a dialog with a textbox named "Search posts, tags and authors".
- No WAF or CDN treatment of agents (see access policy). Real 404s for unknown URLs (no catch-all 200).
- robots.txt is reachable and keeps private paths (`/ghost/`, `/email/`, `/members/api/comments/counts/`, `/r/`, `/webmentions/receive/`, `/.ghost/analytics/api/`) out.
- llms.txt exists (200, `text/plain`, 12 KB, about 100 lines, 58 links) and passes Lighthouse's rules. It is `llms.txt` in the theme folder, byte-identical to the live file.

## Findings (by priority)

No P0 failures measured. The one P0 item I could not test is the real-bot WAF behaviour (only look-alike user agents were sent, and there are no CDN logs).

| # | Priority | Finding | Evidence | Fix |
|---|---|---|---|---|
| 1 | P2 (Medium) | No Content-Signal in robots.txt, and one anonymous `User-agent: *` group, so there is no stated position on AI training vs search vs live "agent" use. Absence is "info", not a defect, but the site has not chosen. | robots.txt has only `User-agent: *`, a Sitemap line and six Disallow lines. | The owner must decide the training policy first (I will not decide it). Then add a custom `robots.txt` at the theme root (my understanding is that Ghost serves a theme-supplied robots.txt instead of its default; I did not test this). Draft below. Content-Signal is a draft proposal (see standards notes). |
| 2 | P3 (Low) | `/.well-known/ai-catalog.json` 301-redirects to `/.well-known/ai-catalog.json/` (same path plus trailing slash), which then returns **404** "File not found". It is not a redirect to a real catalog. | `curl -I`: 301, `location: /.well-known/ai-catalog.json/`, cache-control `max-age=31536000`. Following it gives 404 `text/plain`. | Ghost adds a trailing slash to every unknown path (`/nonexistent-xyz` also goes 301 then 404, and `/.well-known/mcp.json`, `api-catalog`, `agent-card.json`, `ucp` all behave the same). Nothing to fix unless you publish a catalog. Lighthouse treats this as N/A, which is why the score is 3/3. Only P1 if you start advertising a catalog URL. Note the 301 is cached for a year by browsers. |
| 3 | P3 (Low, opportunity) | No Markdown version of pages. `Accept: text/markdown` returns HTML (`content-type: text/html`, `vary: Accept-Encoding` only). `/index.md` is 404 and `/best-beginner-pianos.md` 302s back to the HTML page. No `rel="alternate" type="text/markdown"` link. | curl checks on / and /best-beginner-pianos/. | Optional. Ghost cannot do content negotiation on its own; it would need a rule in Caddy (the `via: 1.1 Caddy` header shows Caddy fronts the site) plus a converter. No consumer agent is confirmed to request Markdown. Not recommended as a priority. |
| 4 | P3 (Low) | `/llms-full.txt` 302-redirects to the homepage (HTML), a soft substitute for a missing file. Not part of the Lighthouse llms-txt rules, which passed. | `curl -I /llms-full.txt`: 302 `location: /`. | Leave, or add a real file only if you want one. |
| 5 | P3 (Low) | llms.txt is a hand-kept list of titles and can go stale. I did not compare every title with the live page, so I cannot say it is stale today. | Live llms.txt equals the theme `llms.txt`. | Refresh the file in the theme when titles change. Lighthouse's rules do not require this. |
| 6 | P3 (Low) | Affiliate links to course sellers on /best-piano-lessons-online/ are inconsistent for agents: the in-text and image links to `/pianoforall`, `/pbp` and `simplypiano.sjv.io` have no `rel`, while the button links carry `nofollow noopener noreferrer` and no `sponsored`. The internal `/pianoforall` (302 to a clickbank.net hop link) and `/pbp` (302 to gospelonthegopiano.com with an affiliate id) hide the real destination from an agent. | Page links in `crawl/pages.json`; `curl -I` on both paths. Theme JS only adds `sponsored` to amzn.to and amazon.com. | Theme-side suggestion (not edited): extend the affiliate-link selector in `assets/js/main.js` to include `/pianoforall`, `/pbp`, `sjv.io` and `/PFA`. Note: this is also a disclosure matter, not only an agent matter. |
| 7 | P3 (Low) | Search opens in an iframe whose title is the generic `portal-popup`, not a descriptive name. The field inside is correctly named. | Playwright: `iframe[title=portal-popup]`. | Comes from Ghost's built-in search/Portal script. Not fixable in the theme without overriding it. Skip. |
| 8 | P3 (Low) | Homepage has 19 piano-key buttons in the accessibility tree (names like "A 4", "C sharp 4", with the computer-key letter as description). Valid and named, but they add noise to an agent's view of the page. | `snap_home` snapshot, lines 50-75. | Optional: wrap the key group in a labelled group (`role="group" aria-label="Playable piano keyboard"`) so agents can skip it as one unit. |
| 9 | Info | WebMCP: no tools, no `toolname`/`tooldescription` form attributes, no `modelContext` calls in the homepage source. This is an opportunity, not a defect. | Source grep on /; Lighthouse WebMCP audits N/A. | Not recommended. The finder and the newsletter form are the only candidates; the finder already works through ordinary buttons. WebMCP is a draft and only ChatGPT desktop is documented as calling tools (vendor matrix, 23 Sep 2026). |

### Draft robots.txt additions (for the owner to approve, nothing deployed)

Content-Signal values are the owner's call. Example only, with training left to the owner:

```
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=<owner decides>
```

Keep all existing Disallow and Sitemap lines unchanged. Ghost's default robots.txt is what is live now; to change it, add a `robots.txt` file at the theme root (Ghost Admin > Settings > Design > Change theme > upload) or edit the file Ghost reads from the theme.

## Access policy

| Purpose | Result | Evidence |
|---|---|---|
| Training bots (GPTBot, ClaudeBot, Google-Extended and similar) | **Allowed.** No named group and no Content-Signal; the `*` group disallows only private paths. | robots.txt. Requests with GPTBot and ClaudeBot user agents to `/` and `/best-beginner-pianos/` returned 200 with a body identical to the normal browser request (same size and checksum: 51,272 bytes on `/`). |
| Search bots (PerplexityBot, OAI-SearchBot, Claude-SearchBot and similar) | **Allowed.** Same as above. PerplexityBot token got 200, identical body. | Same test. |
| User-triggered agents (ChatGPT-User, Claude-User, Perplexity-User, Google-Agent) | **Allowed**, and no robots.txt rule would stop the ones that ignore it anyway. Nothing private depends on robots.txt: `/ghost/` is protected by Ghost login. ChatGPT-User token got 200, identical body. | Same test. |
| WAF / CDN | **No bot-specific treatment seen.** No challenge page, no CAPTCHA, no 403/429, no `cf-*` headers. Caddy reverse proxy in front of Ghost (Express). Only response headers: `alt-svc`, `cache-control`, `strict-transport-security`, `via: 1.1 Caddy`, `x-powered-by: Express`. | Five identical responses. Caveat: look-alike user agents from one IP, not real bot IPs or signed requests, so I can't say what the real bots would get. Check host logs if you want proof. |

## Standards status (dated)

Facts below come from the vendor matrix in the seo-agentic skill, last fully checked **23 Sep 2026** (14 days ago, inside the 60-day limit). I did not re-verify them.

- WebMCP: draft. Chrome origin trial M149 to M156, no ship date. WebKit opposes, Mozilla is neutral.
- Content-Signal: Cloudflare policy; the IETF individual draft expired 4 Apr 2026. Not a Google Search signal. A Google statement was not found.
- ai-catalog.json (Agentic Resource Discovery 1.0): a proposal, checked by Lighthouse 13.5 `ard-schema`. Not needed without agent resources to list.
- Web Bot Auth: `draft-ietf-webbotauth-httpsig-protocol-00` (1 Sep 2026). Not needed for a site that only publishes content.
- llms.txt: a community convention. Lighthouse checks it; Google Search ignores it. No consumer agent is confirmed to read it.
- Markdown delivery: no consumer agent is confirmed to send `Accept: text/markdown`.
- Lighthouse: 13.5.0 is the current version in the matrix (18 Sep 2026); my local run was 13.5.0.

None of these items is promised to change ranking, citations or traffic.

## Per-URL notes

- `/` : Lighthouse 3/3 both form factors. Newsletter form labelled. Search button named. Playable keyboard adds 19 buttons (finding 8).
- `/best-beginner-pianos/` : this is the rewritten page (shows "Updated Oct 6, 2026"; prices checked Oct 6). Quick answer, finder, comparison table with sortable column header buttons, seven cards, FAQ and TL;DR are all exposed. Nine "Check price" links, all `amzn.to`, all `sponsored nofollow noopener`, all `target=_blank`. The earlier open items (meta title ")", old $350 description, portrait share image) are not agent-readiness items and I did not recheck them here.
- `/best-piano-lessons-online/` : 8 ranked H2 sections, one primary link per course. No Amazon links here, only course affiliate redirects (finding 6). No verdict-card rail comparable to the pianos page, so an agent finds the "top pick" from the "Our Top Picks at a Glance" section and the first H2 ("1. Pianoforall: Best for Adults"), which is clear.
- Newsletter signup (all pages): three copies on the pianos page (inline, sidebar, footer), each with a unique input id; no duplicate ids. Not submitted.
- Not checked: pages other than these three, Lighthouse on non-home pages, real-bot IPs, host logs, Agent-UX 0-100 heuristic (tool blocked), WebMCP in a WebMCP-capable Chrome build.

## Recommendations in order

1. Decide the AI training policy and, if wanted, add a Content-Signal line (finding 1). Rerun `agentic_check.py` and look at `content-signal`.
2. Make affiliate rel handling consistent for `/pianoforall`, `/pbp`, `sjv.io` (finding 6). Confirm with the Playwright link audit above.
3. Leave the ai-catalog.json 301/404 alone unless you publish a catalog (finding 2).
4. Skip Markdown and WebMCP unless there is a specific reason.

Raw data (scratchpad, not deliverables): Lighthouse JSON `lh_mobile.json` and `lh_desktop.json`, accessibility snapshots `snap_*.txt` in `/tmp/claude-0/-home-user-dt/264ebcbd-ccda-5595-866c-f65d1d0f3d43/scratchpad/`.

## Structured findings (for audit-data.json, category "AI Search Readiness")

```json
[
  {"title": "No Content-Signal or AI-specific robots.txt groups", "severity": "Medium", "description": "robots.txt has a single wildcard group; no stated position on AI training, search or user-triggered use. Content-Signal is a draft proposal.", "recommendation": "Owner decides training policy, then add a Content-Signal line via a theme robots.txt."},
  {"title": "/.well-known/ai-catalog.json redirects to a 404", "severity": "Low", "description": "301 to /.well-known/ai-catalog.json/ then 404. Ghost adds a trailing slash to all unknown paths. Lighthouse ard-schema is N/A.", "recommendation": "No action unless a catalog is published."},
  {"title": "No Markdown delivery or llms-full.txt", "severity": "Low", "description": "Accept: text/markdown returns HTML; /llms-full.txt 302s to the homepage. llms.txt itself passes Lighthouse.", "recommendation": "Optional; would need a Caddy rule. Not a priority."},
  {"title": "Course affiliate links lack rel=sponsored", "severity": "Low", "description": "On /best-piano-lessons-online/ the /pianoforall, /pbp and sjv.io links have no rel or only nofollow; theme JS covers only amzn.to and amazon.com.", "recommendation": "Extend the theme affiliate selector to the redirect paths."},
  {"title": "Lighthouse Agentic Browsing 3/3 (mobile and desktop)", "severity": "Info", "description": "Lighthouse 13.5.0, homepage, run locally 7 Oct 2026 because PSI quota was exhausted. Accessibility tree and CLS pass, llms.txt passes, WebMCP and ARD N/A.", "recommendation": "Keep as is."}
]
```
