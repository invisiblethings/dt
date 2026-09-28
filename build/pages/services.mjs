import { business as B, reviews } from '../data/business.mjs';
import { services } from '../data/services.mjs';
import { boroughs } from '../data/areas.mjs';
import { page, icon, img, tel, esc, breadcrumbsNav, abs, businessId } from '../lib/html.mjs';
import {
  estimateForm, callbackForm, reviewsBand, ctaBand, faqBlock, serviceCards, relatedServices, sectionLabel, lawDiagram, licenseCard,
} from '../lib/components.mjs';

export function servicesHub() {
  const crumbs = [['Home', '/'], ['Mold Removal', '/mold-removal/']];
  const body = `
<section class="page-hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap">
    ${breadcrumbsNav(crumbs)}
    <h1>Mold removal services in NYC</h1>
    <p class="lede">Eight services, one licensed crew. Whatever the mold is growing on, the job is the same: contain it, remove it, dry the area, fix the moisture source and put the room back together.</p>
    <div class="hero-cta"><a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a><a class="btn btn-light btn-lg" href="/free-estimate/">Free estimate</a></div>
  </div>
</section>
<section class="band"><div class="wrap">${serviceCards(services)}</div></section>
<section class="band band-paper">
  <div class="wrap">
    <div class="band-head">${sectionLabel('STD', 'Every job, every time')}<h2>What’s included in every remediation</h2></div>
    <ol class="proc">
      <li><b>Containment</b><p>Poly sheeting, zipper doors and sealed vents to isolate the work area from the rest of your home.</p></li>
      <li><b>Negative air</b><p>HEPA air scrubbers keep the work area under negative pressure so spores are pulled in, not pushed out.</p></li>
      <li><b>Removal</b><p>Moldy drywall, insulation, carpet and trim are removed and bagged inside the containment.</p></li>
      <li><b>HEPA cleaning</b><p>Every surface in the work area is HEPA-vacuumed and wiped, then treated with an EPA-registered antimicrobial.</p></li>
      <li><b>Drying</b><p>Dehumidifiers and moisture readings until the materials are back to normal dry levels.</p></li>
      <li><b>Clearance & rebuild</b><p>Independent clearance when the law requires it, then we close up, paint and clean up.</p></li>
    </ol>
  </div>
</section>
<section class="band"><div class="wrap">${lawDiagram()}</div></section>
${reviewsBand({ limit: 6 })}
${ctaBand()}`;
  return page({
    path: '/mold-removal/',
    title: 'Mold Removal Services NYC | Black Mold, Bathroom, Basement & More',
    description:
      'Every mold remediation service NYC homes and buildings need: black mold, bathrooms, basements, attics, hidden mold behind walls, water damage, commercial, and rebuild. NYS-licensed.',
    body,
    crumbs,
    schema: [{ '@type': 'ItemList', itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/mold-removal/${s.slug}/`), name: s.name })) }],
  });
}

export function servicePage(s) {
  const path = `/mold-removal/${s.slug}/`;
  const crumbs = [['Home', '/'], ['Mold Removal', '/mold-removal/'], [s.name, path]];
  const faq = faqBlock(s.faqs, { title: `${s.name}: common questions` });
  const body = `
<section class="page-hero has-img">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap ph-grid">
    <div>
      ${breadcrumbsNav(crumbs)}
      <p class="eyebrow">${icon(s.icon)} ${esc(s.name)} · All 5 boroughs</p>
      <h1>${esc(s.h1)}</h1>
      <p class="lede">${esc(s.lede)}</p>
      <div class="hero-cta"><a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a><a class="btn btn-light btn-lg" href="/photo-quote/">${icon('camera')} Photo quote</a></div>
    </div>
    <div class="ph-side">${callbackForm({ source: `service:${s.slug}` })}</div>
  </div>
</section>

<section class="band">
  <div class="wrap two-col">
    <div class="prose">
      <div class="checklists">
        <div class="cl"><h2 class="h3">Signs you need this</h2><ul class="ticks">${s.signs.map((x) => `<li>${icon('check')} ${esc(x)}</li>`).join('')}</ul></div>
        ${s.causes.length ? `<div class="cl"><h2 class="h3">What usually causes it in NYC</h2><ul class="dots">${s.causes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
      </div>
      ${s.body.map(([h, p]) => `<h2>${esc(h)}</h2><p>${esc(p)}</p>`).join('')}
      ${s.audienceLink ? `<p><a class="btn btn-ghost" href="${s.audienceLink}">Property managers: see how we work with you ${icon('arrow')}</a></p>` : ''}
    </div>
    <aside class="side">
      <figure class="side-img">${img(s.image, { sizes: '(min-width: 900px) 360px, 100vw' })}</figure>
      ${licenseCard()}
      <div class="side-box">
        <p class="h4">Serving all 5 boroughs</p>
        <ul class="inline-links">${boroughs.map((b) => `<li><a href="/${b.slug}/">${b.name}</a></li>`).join('')}</ul>
      </div>
    </aside>
  </div>
</section>

<section class="band band-paper">
  <div class="wrap">
    <div class="band-head">${sectionLabel('LAW', 'NY Article 32')}<h2>Over 10 square feet? Here’s how it has to be done</h2></div>
    ${lawDiagram()}
  </div>
</section>

${reviewsBand({ limit: 6, title: 'What NYC customers say' })}
${faq.html}

<section class="band band-paper">
  <div class="wrap">
    <div class="band-head">${sectionLabel('REL', 'Related')}<h2>Related services</h2></div>
    ${relatedServices(s.related)}
  </div>
</section>

<section class="band band-ink" id="estimate"><div class="spores" aria-hidden="true"></div>
  <div class="wrap narrow">${estimateForm({ source: `service:${s.slug}`, title: `Free estimate: ${s.name.toLowerCase()}`, dark: true })}</div>
</section>`;
  return page({
    path,
    title: s.title,
    description: s.description,
    body,
    crumbs,
    schema: [
      {
        '@type': 'Service',
        '@id': abs(path) + '#service',
        name: s.name,
        serviceType: 'Mold remediation',
        description: s.description,
        provider: { '@id': businessId },
        areaServed: boroughs.map((b) => ({ '@type': 'City', name: `${b.name.replace('The ', '')}, NY` })),
        url: abs(path),
      },
      faq.schema,
    ],
  });
}

// ---------- AREAS ----------
const toRad = (d) => (d * Math.PI) / 180;
export function milesFromHQ(lat, lng) {
  const R = 3958.8, dLat = toRad(lat - B.geo.lat), dLng = toRad(lng - B.geo.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(B.geo.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function areasHub() {
  const crumbs = [['Home', '/'], ['Service Areas', '/service-areas/']];
  const body = `
<section class="page-hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap">
    ${breadcrumbsNav(crumbs)}
    <h1>Mold remediation across all five NYC boroughs</h1>
    <p class="lede">Based at ${B.address.street} in Flatbush, Brooklyn, and working across all five boroughs. Find your neighborhood below to see what we usually run into there.</p>
  </div>
</section>
<section class="band">
  <div class="wrap">
    ${boroughs
      .map(
        (b) => `
    <div class="area-block">
      <div class="area-head"><h2><a href="/${b.slug}/">${b.name}</a></h2><p>${esc(b.tagline)}</p></div>
      <ul class="hood-list">${b.neighborhoods
        .map((n) => `<li><a href="/${b.slug}/${n.slug}/">${esc(n.name)}<small>${milesFromHQ(n.lat, n.lng).toFixed(1)} mi from HQ</small></a></li>`)
        .join('')}</ul>
      <p class="more-hoods"><b>Also serving:</b> ${b.moreNeighborhoods.map(esc).join(', ')}.</p>
    </div>`
      )
      .join('')}
  </div>
</section>
${ctaBand()}`;
  return page({
    path: '/service-areas/',
    title: 'Mold Remediation Service Areas | All 5 NYC Boroughs',
    description: 'Mold removal in every NYC borough and neighborhood: Brooklyn, Manhattan, Queens, the Bronx and Staten Island. Based in Flatbush, Brooklyn. Open 24 hours.',
    body,
    crumbs,
  });
}

export function boroughPage(b) {
  const path = `/${b.slug}/`;
  const crumbs = [['Home', '/'], ['Service Areas', '/service-areas/'], [b.name, path]];
  const bn = b.name.replace('The ', 'the ');
  const local = reviews.filter((r) => r.borough === b.slug);
  const list = [...local, ...reviews.filter((r) => r.borough !== b.slug)];
  const faqs = [
    [`How quickly can you get to ${bn}?`, `We answer 24 hours a day and dispatch from ${B.address.street} in Brooklyn. Call ${B.phone} and we will give you an arrival time for your address right away.`],
    [`Do you charge for estimates in ${bn}?`, `No. On-site estimates for mold removal are free anywhere in ${bn}.`],
    [`Do you need a licensed mold assessor in ${bn}?`, 'For projects over 10 square feet, New York State law requires an independent licensed assessor to write the remediation plan and check the work afterward. That applies in every borough. We can recommend independent assessors.'],
    [`Do you work with landlords and managing agents in ${bn}?`, 'Yes. We regularly work with owners, supers and management companies and provide the documentation for HPD, boards and insurers.'],
  ];
  const faq = faqBlock(faqs, { title: `Mold removal in ${bn}: FAQ` });
  const body = `
<section class="page-hero has-bg">
  ${img(b.image, { cls: 'ph-bg', eager: true, sizes: '100vw', alt: '' })}
  <div class="wrap ph-grid">
    <div>
      ${breadcrumbsNav(crumbs)}
      <p class="eyebrow">${icon('pin')} ${esc(b.tagline)}</p>
      <h1>Mold remediation in ${b.name === 'The Bronx' ? 'the Bronx' : b.name}, NY</h1>
      <p class="lede">${esc(b.intro)}</p>
      <div class="hero-cta"><a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a><a class="btn btn-light btn-lg" href="/photo-quote/">${icon('camera')} Photo quote</a></div>
    </div>
    <div class="ph-side">${callbackForm({ source: `borough:${b.slug}`, title: `Free estimate in ${bn}` })}</div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="band-head">${sectionLabel(b.slug.slice(0, 3).toUpperCase(), 'Local knowledge')}<h2>How mold shows up in ${bn}</h2></div>
    <div class="problem-grid">${b.problems.map(([h, p]) => `<div class="problem"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
  </div>
</section>

<section class="band band-paper">
  <div class="wrap">
    <div class="band-head">${sectionLabel('NBH', 'Neighborhoods')}<h2>${b.name} neighborhoods we serve</h2></div>
    <div class="hood-cards">${b.neighborhoods
      .map(
        (n) => `<a class="hood" href="/${b.slug}/${n.slug}/"><b>${esc(n.name)}</b><small>${n.zips.join(' · ')}</small><span>${esc(n.housing.split(',')[0])}</span><em>${milesFromHQ(n.lat, n.lng).toFixed(1)} mi from our base ${icon('arrow')}</em></a>`
      )
      .join('')}</div>
    <p class="more-hoods"><b>Also serving:</b> ${b.moreNeighborhoods.map(esc).join(', ')} and every other ${bn} neighborhood.</p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    <div class="band-head split"><div>${sectionLabel('SVC', 'Services')}<h2>Mold services in ${bn}</h2></div></div>
    ${serviceCards(services)}
  </div>
</section>

${reviewsBand({ list, limit: 6, title: local.length ? `Reviews from ${bn} and across NYC` : 'Reviews from across NYC' })}
${faq.html}
<section class="band band-ink"><div class="spores" aria-hidden="true"></div><div class="wrap narrow">${estimateForm({ source: `borough:${b.slug}`, title: `Free mold removal estimate in ${bn}`, dark: true })}</div></section>`;
  return page({
    path,
    title: `Mold Remediation ${b.name.replace('The ', '')} NY | Mold Removal · Open 24/7`,
    description: `NYS-licensed mold removal in ${bn}: ${b.problems.map((p) => p[0].toLowerCase()).join(', ')}. Free on-site estimate. 5.0★ on Google. Call ${B.phone}.`,
    body,
    crumbs,
    schema: [
      {
        '@type': 'Service',
        name: `Mold remediation in ${b.name.replace('The ', '')}, NY`,
        serviceType: 'Mold remediation',
        provider: { '@id': businessId },
        areaServed: { '@type': 'City', name: `${b.name.replace('The ', '')}, New York` },
        url: abs(path),
      },
      faq.schema,
    ],
  });
}

export function neighborhoodPage(b, n) {
  const path = `/${b.slug}/${n.slug}/`;
  const crumbs = [['Home', '/'], ['Service Areas', '/service-areas/'], [b.name, `/${b.slug}/`], [n.name, path]];
  const miles = milesFromHQ(n.lat, n.lng);
  const bn = b.name.replace('The ', 'the ');
  const siblings = b.neighborhoods.filter((x) => x.slug !== n.slug);
  const local = reviews.filter((r) => r.borough === b.slug);
  const body = `
<section class="page-hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap ph-grid">
    <div>
      ${breadcrumbsNav(crumbs)}
      <p class="eyebrow">${icon('pin')} ${esc(n.name)}, ${b.name} · ZIP ${n.zips.join(', ')}</p>
      <h1>Mold removal in ${esc(n.name)}</h1>
      <p class="lede">${esc(n.note)}</p>
      <div class="hero-cta"><a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a><a class="btn btn-light btn-lg" href="/photo-quote/">${icon('camera')} Photo quote</a></div>
    </div>
    <div class="ph-side">${callbackForm({ source: `hood:${b.slug}/${n.slug}`, title: `Free estimate in ${n.name}` })}</div>
  </div>
</section>

<section class="band">
  <div class="wrap two-col">
    <div class="prose">
      <div class="fact-strip">
        <div><small>Distance from our base</small><b>${miles.toFixed(1)} mi</b></div>
        <div><small>ZIP codes</small><b>${n.zips.join(', ')}</b></div>
        <div><small>Phone answered</small><b>24/7</b></div>
      </div>
      <h2>${esc(n.name)} buildings and where mold starts</h2>
      <p><b>Typical housing:</b> ${esc(n.housing)}</p>
      <p><b>Where we find mold here:</b> ${esc(n.risk)}</p>
      <h2>How a ${esc(n.name)} mold job works</h2>
      <ol class="mini-steps">
        <li><b>Call or send photos.</b> We answer 24 hours a day and give you a first read over the phone.</li>
        <li><b>Free on-site estimate.</b> We find the moisture source, measure the affected area and give you a written scope.</li>
        <li><b>Assessor if required.</b> Over 10 sq ft, an independent licensed assessor writes the remediation plan (<a href="/nyc-mold-law/">why</a>).</li>
        <li><b>Contain, remove, dry, treat.</b> Usually 1–3 days for a single room.</li>
        <li><b>Clearance, then rebuild.</b> We close up walls, paint and clean up so the room is usable again.</li>
      </ol>
      <h2>Mold services available in ${esc(n.name)}</h2>
      <ul class="inline-links big">${services.map((s) => `<li><a href="/mold-removal/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <aside class="side">
      ${licenseCard()}
      <div class="side-box">
        <p class="h4">Nearby in ${b.name}</p>
        <ul class="inline-links">${siblings.map((x) => `<li><a href="/${b.slug}/${x.slug}/">${esc(x.name)}</a></li>`).join('')}</ul>
        <p><a href="/${b.slug}/">All of ${bn} ${icon('arrow')}</a></p>
      </div>
    </aside>
  </div>
</section>
${reviewsBand({ list: [...local, ...reviews.filter((r) => r.borough !== b.slug)], limit: 4, title: 'Neighbors trust us' })}
<section class="band band-ink"><div class="spores" aria-hidden="true"></div><div class="wrap narrow">${estimateForm({ source: `hood:${b.slug}/${n.slug}`, title: `Free mold estimate in ${n.name}`, dark: true })}</div></section>`;
  return page({
    path,
    title: (() => { const t = `Mold Removal ${n.name}, ${b.name.replace('The ', '')} | Licensed · 24/7`; return t.length <= 64 ? t : `Mold Removal ${n.name} | Licensed · 24/7`; })(),
    description: `Mold remediation in ${n.name} (${n.zips.join(', ')}), ${bn}. ${n.risk.split(',')[0]}. NYS-licensed, free estimate, ${miles.toFixed(1)} mi from our Flatbush base. ${B.phone}.`,
    body,
    crumbs,
    schema: [
      {
        '@type': 'Service',
        name: `Mold remediation in ${n.name}, ${b.name.replace('The ', '')}`,
        serviceType: 'Mold remediation',
        provider: { '@id': businessId },
        areaServed: { '@type': 'Place', name: `${n.name}, ${b.name.replace('The ', '')}, NY`, geo: { '@type': 'GeoCoordinates', latitude: n.lat, longitude: n.lng }, address: { '@type': 'PostalAddress', postalCode: n.zips[0], addressRegion: 'NY', addressCountry: 'US' } },
        url: abs(path),
      },
    ],
  });
}
