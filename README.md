# tom-brier.com

Static website for ragtime pianist and composer Tom Brier. Plain HTML, CSS and a little JavaScript: no build step, no frameworks, no third-party scripts. Hosted on Netlify.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Home |
| `about/` | Biography, timeline, FAQ |
| `music/` | Discography and streaming links |
| `videos/` | Video gallery (click-to-load YouTube players) |
| `compositions/` | Searchable composition list |
| `contact/` | Contact form (Netlify Forms) and thank-you page |
| `404.html` | Not-found page |
| `sitemap.xml`, `robots.txt`, `llms.txt` | Search and AI-crawler discovery |
| `netlify.toml` | Redirects, security and cache headers |
| `css/`, `js/`, `img/` | Assets |

## Common edits

- **Add a video:** copy a `.video-card` block in `videos/index.html` and change the YouTube ID (the part after `v=`), the title and the description (three places: link, `data-yt`, thumbnail URL).
- **Add an album:** copy an `<article class="album">` block in `music/index.html`. Also add it to the `ItemList` JSON-LD in the page `<head>`.
- **Add a composition:** add a `<tr>` to the table in `compositions/index.html`.
- **After any page change:** update the `<lastmod>` date for that URL in `sitemap.xml`.

## Deploy

Netlify: connect this repository, leave the build command empty and set the publish directory to `.` (already set in `netlify.toml`). Enable **Forms** in the Netlify site settings so the contact form works and set an email notification for submissions.
