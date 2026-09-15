/**
 * Preview the static export the way Netlify will serve it.
 *
 * `next start` cannot serve an `output: 'export'` build, and a plain file
 * server does not reproduce clean URLs, the 404.html fallback, the header
 * rules in netlify.toml (including the content-type rule that makes the
 * generated Open Graph image usable by social scrapers), or the compression
 * Netlify applies to text responses. This does all four, so a Lighthouse run
 * against it is broadly representative of the deployed site.
 *
 * Usage: npm run build && npm run preview
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
import { parse } from 'smol-toml';

const ROOT = 'out';
const cfg = parse(await readFile('netlify.toml', 'utf8'));
const rules = (cfg.headers ?? []).map((h) => ({
  re: new RegExp('^' + h.for.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'),
  values: h.values,
}));

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8', '.json': 'application/json' };

async function resolve(pathname) {
  const p = decodeURIComponent(pathname).replace(/\/+$/, '') || '/index';
  for (const cand of [p, p + '.html', join(p, 'index.html')]) {
    const full = join(ROOT, cand);
    try { if ((await stat(full)).isFile()) return full; } catch {}
  }
  return null;
}

const PORT = Number(process.env.PORT ?? 3000);

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://x');
  const file = await resolve(pathname);
  const target = file ?? join(ROOT, '404.html');
  let body = await readFile(target);
  const headers = { 'content-type': TYPES[extname(target)] ?? 'application/octet-stream' };
  for (const r of rules) if (r.re.test(pathname)) Object.assign(headers, r.values);

  // netlify.toml keys are canonical-cased; normalise so nothing is set twice.
  const out = {};
  for (const [k, v] of Object.entries(headers)) out[k.toLowerCase()] = v;

  // Netlify compresses text responses; match that so local timings are honest.
  const compressible = /^(text\/|application\/(javascript|json|xml)|image\/svg)/.test(
    out['content-type'],
  );
  if (compressible && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '')) {
    body = gzipSync(body);
    out['content-encoding'] = 'gzip';
    out.vary = 'Accept-Encoding';
  }

  out['content-length'] = String(body.length);
  res.writeHead(file ? 200 : 404, out);
  res.end(body);
}).listen(PORT, () => {
  console.log(`Serving out/ on http://localhost:${PORT} with netlify.toml rules applied.`);
});
