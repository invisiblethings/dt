// Generates docs/04-page-inventory.md from the built site: every URL with its
// title, meta description, H1, H2 outline and structured-data types.
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = path.join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk('dist');
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const rows = files.map((f) => {
  const h = readFileSync(f, 'utf8');
  const url = '/' + path.relative('dist', f).replace(/\.html$/, '').replace(/^index$/, '');
  const types = [...h.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
  return {
    url,
    title: strip(h.match(/<title>([^<]*)/)?.[1] ?? ''),
    desc: h.match(/name="description" content="([^"]*)"/)?.[1] ?? '',
    noindex: /content="noindex/.test(h),
    h1: strip(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''),
    h2: [...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1])).filter(Boolean),
    schema: [...new Set(types)].filter((t) => !['ImageObject', 'ListItem', 'Offer', 'Question', 'Answer', 'Syllabus', 'CourseInstance', 'ContactPoint'].includes(t)),
  };
});
const order = (u) => (u.match(/^\/(learn|classics)/) ? 1 : u.split('/').length > 2 || rows.find((r) => r.url === u)?.schema.includes('Article') ? 3 : 0);
rows.sort((a, b) => order(a.url) - order(b.url) || a.url.localeCompare(b.url));
let md = `# Page inventory: titles, descriptions, headings, schema\n\nGenerated from the build by \`node scripts/page-inventory.mjs\`. ${rows.length} pages. Re-run after content changes.\n\n`;
md += `| URL | Title (chars) | Meta description (chars) | Index | Schema |\n|---|---|---|---|---|\n`;
md += rows.map((r) => `| \`${r.url}\` | ${r.title} (${r.title.length}) | ${r.desc} (${r.desc.length}) | ${r.noindex ? 'noindex' : 'index'} | ${r.schema.join(', ')} |`).join('\n');
md += `\n\n## Heading outlines (non-blog pages)\n\n`;
for (const r of rows.filter((r) => !r.schema.includes('Article') || r.url.startsWith('/learn') || r.url === '/am-i-too-old-to-learn-piano' || r.url === '/compare' || r.url === '/how-it-works')) {
  md += `### \`${r.url}\`\n- **H1:** ${r.h1}\n${r.h2.map((x) => `  - H2: ${x}`).join('\n')}\n\n`;
}
writeFileSync('docs/04-page-inventory.md', md);
console.log(`wrote ${rows.length} pages`);
