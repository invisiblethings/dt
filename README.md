# Baltimore Composers' Forum website

Static site for [baltimorecomposersforum.org](https://baltimorecomposersforum.org). Plain HTML, CSS and a little JavaScript. No build step and no dependencies.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | Home page: hero with the "hear your name" melody widget, about and timeline, concerts, composer roster, membership, founder, FAQ, sponsors, contact |
| `dawn-culbertson/` | Page about the founder, Dawn Culbertson (1951–2004) |
| `404.html` | Not-found page |
| `information/`, `members/`, `dawn/`, `lounge/` | Redirects from the old site's URLs, so existing links and search rankings carry over |
| `assets/` | Styles, script, self-hosted fonts, favicon and social share image |
| `robots.txt`, `sitemap.xml` | For search engines |
| `_redirects`, `_headers` | Netlify settings: 301 redirects for old URLs, caching and security headers |

## Common edits

- **New concert:** in `index.html`, replace the "Next concert: announced soon" card in `#concerts` with the details, and add or replace an `<article class="event">` under "Recent programs".
- **Composers:** add or remove `<li>` entries in `#roster` (keep them alphabetical by last name).
- **Sponsors:** copy the Pianoers `<a class="sponsor">` block in `#sponsors`. Keep `rel="sponsored"` on paid sponsor links, as Google requires.
- After editing, update `<lastmod>` in `sitemap.xml`.

## Preview locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Publishing on Netlify

1. Go to https://app.netlify.com/drop and drag in the site folder (or the zip). Netlify reads `_redirects` and `_headers` automatically.
2. **Domain management → Add a domain**: `baltimorecomposersforum.org`, then follow Netlify's DNS instructions at your registrar. HTTPS is issued automatically.
3. Submit `https://baltimorecomposersforum.org/sitemap.xml` in Google Search Console.

To update the site later, open the site in Netlify → **Deploys** and drag the new folder or zip onto the page.

## Publishing on GitHub Pages (alternative)

1. Repository **Settings → Pages**: deploy from this branch, root folder.
2. Set the custom domain to `baltimorecomposersforum.org` (this adds a `CNAME` file) and enable **Enforce HTTPS**.
3. At the domain registrar, point the apex domain to GitHub Pages' A records and `www` to `<user>.github.io`.
4. Submit `https://baltimorecomposersforum.org/sitemap.xml` in Google Search Console.
