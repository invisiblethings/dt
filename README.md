# tom-brier.com

Static website for ragtime pianist and composer Tom Brier. Plain HTML, CSS and a little JavaScript: no build step, no frameworks, no third-party scripts. Hosted on Render (static site).

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home |
| `about/` | Biography, timeline, FAQ |
| `music/` | Discography and streaming links |
| `videos/` | Video gallery (click-to-load YouTube players) |
| `compositions/` | Searchable composition list |
| `contact/` | Contact details (email) |
| `404.html` | Not-found page |
| `sitemap.xml`, `robots.txt`, `llms.txt` | Search and AI-crawler discovery |
| `render.yaml` | Render config: redirects, security and cache headers |
| `css/`, `js/`, `img/` | Assets |

## Common edits

- **Add a video:** copy a `.video-card` block in `videos/index.html` and change the YouTube ID (the part after `v=`), the title and the description (three places: link, `data-yt`, thumbnail URL).
- **Add an album:** copy an `<article class="album">` block in `music/index.html`. Also add it to the `ItemList` JSON-LD in the page `<head>`.
- **Add a composition:** add a `<tr>` to the table in `compositions/index.html`.
- **After any page change:** update the `<lastmod>` date for that URL in `sitemap.xml`.

## Deploy (Render)

1. In Render, create a **Static Site** from the Git repository (GitLab works directly).
2. Leave the build command empty and set the publish directory to `.`.
3. Under **Settings → Custom Domains**, add `tom-brier.com` and `www.tom-brier.com`; Render redirects www to the apex domain automatically.
4. Security and cache headers live in `render.yaml`. If the service wasn't created from that Blueprint, copy the headers into **Settings → Headers** in the dashboard.

Every push to the connected branch redeploys the site.
