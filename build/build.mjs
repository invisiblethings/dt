// Zero-dependency static site generator: `node build/build.mjs` → ./dist
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { business as B } from './data/business.mjs';
import { services } from './data/services.mjs';
import { boroughs } from './data/areas.mjs';
import { home } from './pages/home.mjs';
import { servicesHub, servicePage, areasHub, boroughPage, neighborhoodPage } from './pages/services.mjs';
import { freeEstimate, photoQuote, thankYou, costPage, riskCheck } from './pages/tools.mjs';
import { moldLaw, howItWorks, propertyManagers, insurance, reviewsPage, about, contact, faqPage, privacy, notFound } from './pages/content.mjs';
import { guides, guidesHub, guidePage } from './pages/guides.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');

// [path, html, sitemap priority | null to exclude]
const pages = [
  ['/', home(), 1.0],
  ['/free-estimate/', freeEstimate(), 0.9],
  ['/photo-quote/', photoQuote(), 0.8],
  ['/mold-removal/', servicesHub(), 0.9],
  ...services.map((s) => [`/mold-removal/${s.slug}/`, servicePage(s), 0.9]),
  ['/service-areas/', areasHub(), 0.8],
  ...boroughs.map((b) => [`/${b.slug}/`, boroughPage(b), 0.9]),
  ...boroughs.flatMap((b) => b.neighborhoods.map((n) => [`/${b.slug}/${n.slug}/`, neighborhoodPage(b, n), 0.7])),
  ['/cost/', costPage(), 0.9],
  ['/mold-risk-check/', riskCheck(), 0.7],
  ['/nyc-mold-law/', moldLaw(), 0.8],
  ['/how-it-works/', howItWorks(), 0.7],
  ['/property-managers/', propertyManagers(), 0.8],
  ['/insurance/', insurance(), 0.7],
  ['/reviews/', reviewsPage(), 0.7],
  ['/about/', about(), 0.6],
  ['/contact/', contact(), 0.7],
  ['/faq/', faqPage(), 0.6],
  ['/guides/', guidesHub(), 0.6],
  ...guides.map((g) => [`/guides/${g.slug}/`, guidePage(g), 0.6]),
  ['/privacy/', privacy(), 0.2],
  ['/thank-you/', thankYou(), null],
  ['/404.html', notFound(), null],
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'static'), out, { recursive: true });

for (const [path, html] of pages) {
  const file = path.endsWith('.html') ? join(out, path) : join(out, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

const today = new Date().toISOString().slice(0, 10);
const urls = pages.filter((p) => p[2] != null);
await writeFile(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(([p, , pr]) => `  <url><loc>${B.url}${p}</loc><lastmod>${today}</lastmod><priority>${pr.toFixed(1)}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${B.url}/sitemap.xml\n`);

// llms.txt: a plain-language summary for AI assistants and answer engines.
await writeFile(
  join(out, 'llms.txt'),
  `# ${B.name}

> NYS-licensed mold remediation company based at ${B.address.street}, ${B.address.city}, ${B.address.region} ${B.address.zip}, serving all five New York City boroughs. Open 24 hours. Phone ${B.phone}. Rated 5.0 on Google (${B.google.reviewCount} reviews).

- Legal name: ${B.legalName}
- Licenses: ${B.licenses.map((l) => `${l.label} #${l.number}`).join('; ')}
- Offers free on-site estimates for mold removal. Does NOT perform mold testing or assessments (done by independent licensed assessors per NY Labor Law Article 32).
- Also rebuilds after remediation (drywall, insulation, paint, trim).
- Sister company for water, fire, storm and biohazard restoration: ${B.sister.url}

## Services
${services.map((s) => `- [${s.name}](${B.url}/mold-removal/${s.slug}/): ${s.description}`).join('\n')}

## Service areas
${boroughs.map((b) => `- [${b.name}](${B.url}/${b.slug}/): ${b.neighborhoods.map((n) => n.name).join(', ')}`).join('\n')}

## Key resources
- [Mold removal cost in NYC](${B.url}/cost/)
- [NYC mold law: Local Law 55 & NY Article 32](${B.url}/nyc-mold-law/)
- [How remediation works](${B.url}/how-it-works/)
- [Reviews](${B.url}/reviews/)
- [Free estimate](${B.url}/free-estimate/)
`
);

console.log(`Built ${pages.length} pages → dist/`);
