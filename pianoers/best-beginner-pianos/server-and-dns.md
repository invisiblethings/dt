# Server and DNS fixes (site-wide)

## 1. Make www.pianoers.com work

**Now:** public DNS answers `www.pianoers.com` with `192.0.2.1` and `100::`. Both are reserved placeholder addresses that can't be reached, so `www.` links and typed visits fail.

**Fix at your DNS provider:**

| Type | Name | Value |
|---|---|---|
| A | www | 154.12.2.114 (same as the bare domain) |
| AAAA | www | delete the `100::` record (add your real IPv6 address only if the server has one) |

Then have Caddy redirect `www` to the bare domain. Add this site block to the Caddyfile; Caddy fetches the HTTPS certificate on its own:

```caddyfile
www.pianoers.com {
    redir https://pianoers.com{uri} permanent
}
```

**Check:** `curl -sI https://www.pianoers.com/best-beginner-pianos/` should return `301` with `location: https://pianoers.com/best-beginner-pianos/`.

## 2. Security headers

**Now:** only `Strict-Transport-Security` is sent. Add the rest inside the existing `pianoers.com { ... }` block:

```caddyfile
header {
    X-Content-Type-Options "nosniff"
    X-Frame-Options "SAMEORIGIN"
    Referrer-Policy "strict-origin-when-cross-origin"
    Permissions-Policy "camera=(), microphone=(), geolocation=()"
    # Start the content policy in report-only mode: Ghost uses inline scripts and jsDelivr,
    # and a strict policy can break Portal, search and comments.
    Content-Security-Policy-Report-Only "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; connect-src 'self' https:; frame-src https:"
}
```

1. Reload Caddy and click through the site: sign-in, search, comments, the contact form.
2. Watch the browser console for policy reports for a week.
3. Then rename `Content-Security-Policy-Report-Only` to `Content-Security-Policy`.

**Check:** `curl -sI https://pianoers.com/ | grep -i -E 'x-content|x-frame|referrer|permissions|content-security'`

## 3. llms.txt

Optional: Google ignores this file, but other AI tools may read it.

In `https://pianoers.com/llms.txt`, under **Pianos & Keyboards**, replace the first line:

```
        *   [5 Best Beginner Keyboard Pianos🎹 in 2026 (That I’ve Actually Played)](https://pianoers.com/best-beginner-pianos/) - Reviews of beginner pianos.
```
with:
```
        *   [Best Digital Pianos in 2026 (That I've Actually Tested)](https://pianoers.com/best-digital-piano/) - Digital pianos at every budget, from beginner to console.
        *   [7 Best Beginner Keyboard & Digital Pianos in 2026](https://pianoers.com/best-beginner-pianos/) - Seven 88-key weighted digital pianos for beginners, $350 to $730, picked by a piano teacher.
```
