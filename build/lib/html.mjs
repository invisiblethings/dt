import { business as B } from '../data/business.mjs';
import { services } from '../data/services.mjs';
import { boroughs } from '../data/areas.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const abs = (path) => B.url + path;
export const tel = `tel:${B.phoneE164}`;
export const ASSET_VERSION = Date.now().toString(36);

// ---------- icons (inline SVG, stroke-based) ----------
const ICONS = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  camera: '<path d="M4 7h3l2-3h6l2 3h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="4"/>',
  clipboard: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  spore: '<circle cx="12" cy="12" r="3"/><circle cx="5" cy="7" r="1.6"/><circle cx="18.5" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="17.5" r="1.4"/><circle cx="12" cy="4" r="1"/>',
  shower: '<path d="M4 20V8a4 4 0 0 1 8 0"/><path d="M9 8h6"/><path d="M11 12v1M14 12v1M17 12v1M12 15v1M15 15v1M13 18v1M16 18v1"/>',
  basement: '<path d="M3 10l9-6 9 6"/><path d="M5 10v10h14V10"/><path d="M3 15h18"/><path d="M8 18h2M14 18h2"/>',
  roof: '<path d="M2 12l10-8 10 8"/><path d="M5 10v10h14V10"/><path d="M12 8v3M11 13l1 2 1-2"/>',
  wall: '<rect x="3" y="4" width="18" height="16"/><path d="M3 9h18M3 14h18M9 4v5M15 9v5M9 14v6"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  building: '<rect x="4" y="3" width="16" height="18"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
  hammer: '<path d="M14 4l6 6-3 3-6-6z"/><path d="M11 7L3 15l3 3 8-8"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 6l9 7 9-7"/>',
  google: '<path d="M20.5 12.2c0-.6-.1-1.2-.2-1.7H12v3.3h4.8a4.1 4.1 0 0 1-1.8 2.7v2.2h2.9c1.7-1.6 2.6-3.9 2.6-6.5z" fill="#4285F4" stroke="none"/><path d="M12 21c2.4 0 4.5-.8 5.9-2.2L15 16.5c-.8.5-1.8.9-3 .9-2.3 0-4.3-1.6-5-3.7H4v2.3A9 9 0 0 0 12 21z" fill="#34A853" stroke="none"/><path d="M7 13.7a5.4 5.4 0 0 1 0-3.4V8H4a9 9 0 0 0 0 8z" fill="#FBBC05" stroke="none"/><path d="M12 6.6c1.3 0 2.5.5 3.4 1.3l2.6-2.6A9 9 0 0 0 4 8l3 2.3c.7-2.1 2.7-3.7 5-3.7z" fill="#EA4335" stroke="none"/>',
};
export const icon = (name, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

export const stars = (n = 5) => `<span class="stars" aria-label="${n} out of 5 stars">${icon('star').repeat(n)}</span>`;

// ---------- images (pre-built WebP renditions in /images) ----------
export const IMAGES = {
  crew: { w: 1536, h: 1024, alt: 'Mold Remediation NYC technician in a protective suit and respirator treating mold on an apartment wall', sizes: [640, 1024, 1536] },
  'mold-wall': { w: 675, h: 1200, alt: 'Close-up of mold growth spreading across a white wall', sizes: [400, 675] },
  flood: { w: 768, h: 768, alt: 'Flooded basement stairwell with standing water', sizes: [400, 768] },
  pipe: { w: 1600, h: 900, alt: 'Water pouring from a broken pipe', sizes: [640, 1024, 1600] },
  brownstone: { w: 1600, h: 1076, alt: 'Row of Brooklyn brownstones and historic townhouses', sizes: [640, 1024, 1600] },
  brooklyn: { w: 1600, h: 1067, alt: 'Brooklyn street with red brick buildings framing the Manhattan Bridge', sizes: [640, 1024, 1600] },
  manhattan: { w: 908, h: 1200, alt: 'Manhattan skyline with the Empire State Building', sizes: [480, 908] },
  queens: { w: 1600, h: 989, alt: 'The Unisphere in Flushing Meadows–Corona Park, Queens', sizes: [640, 1024, 1600] },
  bronx: { w: 900, h: 1200, alt: 'Stepped street staircase between apartment buildings in the Bronx', sizes: [480, 900] },
  'staten-island': { w: 1600, h: 1067, alt: 'Staten Island Ferry terminal lit up at night', sizes: [640, 1024, 1600] },
};
export function img(name, { alt, cls = '', eager = false, sizes = '100vw' } = {}) {
  const im = IMAGES[name];
  if (!im) return '';
  const srcset = im.sizes.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  const fallback = `/images/${name}-${im.sizes[Math.min(1, im.sizes.length - 1)]}.webp`;
  return `<img class="${cls}" src="${fallback}" srcset="${srcset}" sizes="${sizes}" width="${im.w}" height="${im.h}" alt="${esc(alt ?? im.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

// ---------- structured data ----------
export const businessId = `${B.url}/#business`;
export function businessSchema() {
  return {
    '@type': 'HomeAndConstructionBusiness',
    '@id': businessId,
    name: B.name,
    legalName: B.legalName,
    alternateName: 'Mold Remediation & Water Restoration NYC',
    url: B.url + '/',
    telephone: B.phoneE164,
    email: B.email,
    logo: abs('/images/logo-512.png'),
    image: [abs('/images/crew-1536.webp'), abs('/og.png')],
    description:
      'NYS-licensed mold remediation company in Brooklyn serving all five NYC boroughs. Mold removal, containment, water damage drying and post-remediation rebuild. Free on-site estimates. Open 24 hours.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: B.address.street,
      addressLocality: B.address.city,
      addressRegion: B.address.region,
      postalCode: B.address.zip,
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: B.geo.lat, longitude: B.geo.lng },
    hasMap: `https://maps.google.com/?cid=${B.google.cid}`,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    priceRange: '$$',
    paymentAccepted: 'Cash, Check, Credit Card, Insurance',
    areaServed: boroughs.map((b) => ({ '@type': 'City', name: `${b.name.replace('The ', '')}, New York`, url: abs(`/${b.slug}/`) })),
    hasCredential: B.licenses.map((l) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      name: `${l.label} #${l.number}`,
      recognizedBy: { '@type': 'Organization', name: l.issuer },
    })),
    knowsAbout: ['Mold remediation', 'Black mold removal', 'Water damage mitigation', 'NYS Labor Law Article 32', 'NYC Local Law 55'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Mold remediation services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, url: abs(`/mold-removal/${s.slug}/`) },
      })),
    },
    sameAs: [...B.social.map((s) => s.url), `https://maps.google.com/?cid=${B.google.cid}`, B.sister.url],
    founder: { '@type': 'Person', name: B.owner },
  };
}
export function breadcrumbSchema(crumbs) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
  };
}
export function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

// ---------- chrome ----------
const nav = [
  { label: 'Mold Removal', href: '/mold-removal/', children: services.map((s) => [s.name, `/mold-removal/${s.slug}/`]) },
  { label: 'Areas', href: '/service-areas/', children: boroughs.map((b) => [b.name, `/${b.slug}/`]) },
  { label: 'Cost', href: '/cost/' },
  { label: 'NYC Mold Law', href: '/nyc-mold-law/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'About', href: '/about/' },
];

function header(path) {
  const items = nav
    .map((n) => {
      const active = path.startsWith(n.href) ? ' aria-current="page"' : '';
      if (!n.children) return `<li><a href="${n.href}"${active}>${n.label}</a></li>`;
      return `<li class="has-sub"><a href="${n.href}"${active}>${n.label}</a><ul class="sub">${n.children
        .map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`)
        .join('')}<li class="sub-all"><a href="${n.href}">All ${n.label.toLowerCase()} ${icon('arrow')}</a></li></ul></li>`;
    })
    .join('');
  return `
<a class="skip" href="#main">Skip to content</a>
<div class="topbar">
  <div class="wrap topbar-in">
    <span class="live"><i class="dot" aria-hidden="true"></i><span data-nyc-clock>Open 24 hours</span></span>
    <a class="tb-rating" href="${B.google.profileUrl}" target="_blank" rel="noopener">${stars(5)} <b>5.0</b> · ${B.google.reviewCount} Google reviews</a>
    <span class="tb-lic">NYS Mold Remediation Lic. #${B.licenses[0].number}</span>
  </div>
</div>
<header class="site-header">
  <div class="wrap header-in">
    <a class="brand" href="/" aria-label="${B.name} home">
      <span class="brand-mark" aria-hidden="true"><b>MOLD</b><b>REMEDIATION</b><b class="t">NYC</b></span>
    </a>
    <nav class="main-nav" id="main-nav" aria-label="Main">
      <ul>${items}</ul>
      <div class="nav-mobile-cta">
        <a class="btn btn-signal" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a>
        <a class="btn btn-ghost" href="/free-estimate/">Free estimate</a>
      </div>
    </nav>
    <div class="header-cta">
      <a class="hdr-phone" href="${tel}" data-track="call"><small>24/7 — tap to call</small>${B.phone}</a>
      <a class="btn btn-signal" href="/free-estimate/">Free Estimate</a>
    </div>
    <button class="nav-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="Open menu">${icon('menu', 'i-open')}${icon('close', 'i-close')}</button>
  </div>
</header>`;
}

function footer() {
  const lic = B.licenses.map((l) => `<li><span>${esc(l.label)}</span><b>#${esc(l.number)}</b></li>`).join('');
  return `
<footer class="site-footer">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap footer-grid">
    <div class="f-brand">
      <a class="brand" href="/"><span class="brand-mark"><b>MOLD</b><b>REMEDIATION</b><b class="t">NYC</b></span></a>
      <p>NYS-licensed mold remediation for NYC homes, apartments and buildings. We remove the mold, fix the moisture causing it, and rebuild the room.</p>
      <address>
        <b>${B.name}</b><br>
        ${B.address.street}<br>${B.address.city}, ${B.address.region} ${B.address.zip}<br>
        <a href="${tel}" data-track="call">${B.phone}</a><br>
        <a href="mailto:${B.email}">${B.email}</a><br>
        <span class="open">${icon('clock')} ${B.hours}</span>
      </address>
      <p class="f-links"><a href="${B.google.directions}" target="_blank" rel="noopener">Directions</a> · <a href="${B.google.profileUrl}" target="_blank" rel="noopener">Google profile</a></p>
    </div>
    <div>
      <h2>Mold removal</h2>
      <ul>${services.map((s) => `<li><a href="/mold-removal/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2>Service areas</h2>
      <ul>${boroughs.map((b) => `<li><a href="/${b.slug}/">${b.name}</a></li>`).join('')}<li><a href="/service-areas/">All neighborhoods</a></li></ul>
      <h2>Other restoration</h2>
      <ul>${B.sister.services.map((s) => `<li><a href="${s.url}" rel="noopener">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2>Resources</h2>
      <ul>
        <li><a href="/cost/">Mold removal cost in NYC</a></li>
        <li><a href="/mold-risk-check/">60-second mold risk check</a></li>
        <li><a href="/nyc-mold-law/">NYC mold law, explained</a></li>
        <li><a href="/how-it-works/">How remediation works</a></li>
        <li><a href="/property-managers/">For property managers</a></li>
        <li><a href="/insurance/">Mold & insurance</a></li>
        <li><a href="/guides/">Guides</a></li>
        <li><a href="/faq/">FAQ</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap f-lic">
    <ul class="lic-list">${lic}</ul>
  </div>
  <div class="wrap f-bottom">
    <p>© ${new Date().getFullYear()} ${B.legalName} d/b/a ${B.name}. Licensed &amp; insured. We do not perform mold testing or assessments; those are done by independent licensed assessors.</p>
    <p><a href="/privacy/">Privacy</a> · ${B.social.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`).join(' · ')}</p>
  </div>
</footer>
<div class="mobile-bar" role="navigation" aria-label="Quick actions">
  <a href="${tel}" class="mb-call" data-track="call">${icon('phone')}<span>Call 24/7</span></a>
  <a href="/photo-quote/">${icon('camera')}<span>Photo quote</span></a>
  <a href="/free-estimate/" class="mb-est">${icon('clipboard')}<span>Free estimate</span></a>
</div>`;
}

export function breadcrumbsNav(crumbs) {
  if (!crumbs || crumbs.length < 2) return '';
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${crumbs
    .map(([n, p], i) => (i === crumbs.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${p}">${esc(n)}</a></li>`))
    .join('')}</ol></nav>`;
}

// ---------- page shell ----------
export function page({ path, title, description, body, schema = [], crumbs, noindex = false, ogImage = '/og.png', preloadImage, type = 'WebPage' }) {
  const url = abs(path);
  const graph = [
    businessSchema(),
    { '@type': 'WebSite', '@id': `${B.url}/#website`, url: B.url + '/', name: B.name, publisher: { '@id': businessId }, inLanguage: 'en-US' },
    { '@type': type, '@id': `${url}#webpage`, url, name: title, description, isPartOf: { '@id': `${B.url}/#website` }, about: { '@id': businessId }, inLanguage: 'en-US' },
    ...(crumbs && crumbs.length > 1 ? [breadcrumbSchema(crumbs)] : []),
    ...schema,
  ];
  const ga = B.analytics.ga4
    ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${B.analytics.ga4}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${B.analytics.ga4}');</script>`
    : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#111210">
<meta name="geo.region" content="US-NY"><meta name="geo.placename" content="Brooklyn, New York"><meta name="geo.position" content="${B.geo.lat};${B.geo.lng}"><meta name="ICBM" content="${B.geo.lat}, ${B.geo.lng}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${B.name}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}"><meta property="og:image" content="${abs(ogImage)}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${abs(ogImage)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap">
${preloadImage ? `<link rel="preload" as="image" href="${preloadImage.href}" imagesrcset="${preloadImage.srcset}" imagesizes="${preloadImage.sizes}" fetchpriority="high">` : ''}
<link rel="stylesheet" href="/css/site.css?v=${ASSET_VERSION}">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
${ga}
</head>
<body>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script src="/js/site.js?v=${ASSET_VERSION}" defer></script>
</body>
</html>`;
}
