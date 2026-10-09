> **Replaced.** These edits were written for Ghost's Source theme, but the site runs Headline. Use the custom Pianoers theme in `../theme/` instead; it includes all of these fixes.

# Theme edits (site-wide)

These go in the Ghost theme (it looks like Ghost's "Source" theme), not in the post.

**Workflow:**
1. Download it from **Settings → Design → Change theme → Advanced → Download**.
2. Edit the files.
3. Zip the folder and upload it in the same place.

The snippets below are written against the HTML the theme outputs today. Search the theme's `.hbs` files for the "Find" text.

## 1. Featured image: load it first and serve WebP

This speeds up LCP and cuts image weight by about a third. The file is usually `post.hbs`. Search for `gh-article-image`.

**Find** (the `<img>` inside `<figure class="gh-article-image">`):
```hbs
<img
    srcset="{{img_url feature_image size="s"}} 300w,
            {{img_url feature_image size="m"}} 720w,
            {{img_url feature_image size="l"}} 960w,
            {{img_url feature_image size="xl"}} 1200w,
            {{img_url feature_image size="xxl"}} 2000w"
    sizes="(max-width: 1200px) 100vw, 1200px"
    src="{{img_url feature_image size="xl"}}"
```
The size names may differ in your copy; keep whatever names are there.

**Replace with:**
```hbs
<img
    srcset="{{img_url feature_image size="s" format="webp"}} 300w,
            {{img_url feature_image size="m" format="webp"}} 720w,
            {{img_url feature_image size="l" format="webp"}} 960w,
            {{img_url feature_image size="xl" format="webp"}} 1200w,
            {{img_url feature_image size="xxl" format="webp"}} 2000w"
    sizes="(max-width: 720px) 100vw, 720px"
    src="{{img_url feature_image size="xl" format="webp"}}"
    fetchpriority="high"
    decoding="async"
```
- `sizes` changes to 720px because the image never renders wider than 720px on desktop. Today's 1200px value makes browsers download a bigger file than needed.
- If your design does show it wider somewhere, keep the old `sizes`.

## 2. Name the mobile menu button

Usually in `partials/components/navigation.hbs` (or `default.hbs`).

**Find:** `<button class="gh-burger"></button>`

**Replace with:** `<button class="gh-burger" aria-label="Open menu"></button>`

## 3. Give the small theme images dimensions

This prevents small layout shifts from the logo, author photo and "Read next" thumbnails.

- **Logo** (`<img src="{{@site.logo}}" alt="{{@site.title}}">`): add the logo file's real `width` and `height`. PianoersLogo.png: check its pixel size and use those numbers.
- **Author photo** in the post header (`<img src="{{profile_image}}" alt="{{name}}">`): add `width="64" height="64" loading="lazy" decoding="async"`, matching the size the CSS shows it at.
- **"Read next" card images** (in `partials/post-card.hbs`): add `loading="lazy" decoding="async"`. The cards already have a fixed aspect ratio in CSS, so dimensions are optional.

## 4. Optional: AI-usage preferences in robots.txt

A `robots.txt` file in the theme's root folder replaces Ghost's default one. To state AI preferences, copy Ghost's current rules and add a Content-Signal line:

```
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=⟦yes or no — your choice⟧
Sitemap: https://pianoers.com/sitemap.xml
Disallow: /ghost/
Disallow: /email/
Disallow: /members/api/comments/counts/
Disallow: /r/
Disallow: /webmentions/receive/
Disallow: /.ghost/analytics/api/
```

Content-Signal is a draft proposal, and Google ignores it. Whether to allow AI training (`ai-train`) is a licensing choice, not an SEO one, so it's left for you to decide. Skip this section if you don't have a preference.
