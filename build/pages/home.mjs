import { business as B } from '../data/business.mjs';
import { services } from '../data/services.mjs';
import { boroughs } from '../data/areas.mjs';
import { page, icon, img, tel, esc, stars, IMAGES } from '../lib/html.mjs';
import {
  estimateForm, reviewsBand, trustRow, ctaBand, faqBlock, serviceCards, sectionLabel,
  zipChecker, zipData, moldClock, buildingExplorer, lawDiagram, licenseCard,
} from '../lib/components.mjs';

const homeFaqs = [
  ['Do you offer free mold inspections?', 'We offer <b>free on-site estimates</b> for mold removal. We look at the damage, find the moisture source and give you a written price. We don’t do lab testing or formal mold assessments. Under New York law those are done by independent licensed assessors, which keeps the process honest.'],
  ['How much does mold removal cost in NYC?', 'It depends on the size of the area, what materials are affected and how easy it is to get to. Small jobs cost far less than whole-unit work. See our <a href="/cost/">NYC mold remediation cost guide</a> for typical ranges and an instant estimate.'],
  ['Are you licensed for mold remediation in New York?', `Yes. We hold NYS Mold Remediation License #${B.licenses[0].number}, GC License #${B.licenses[2].number}, and EPA Lead-Safe firm certification #${B.licenses[1].number}. We are fully insured.`],
  ['Do you work with insurance?', 'Yes. We work with all insurance carriers and give you the photos, moisture readings and itemized scope your adjuster needs. Coverage depends on your policy and how the water got in; see <a href="/insurance/">mold &amp; insurance</a>.'],
  ['Which areas do you serve?', 'All five boroughs: Brooklyn, Manhattan, Queens, the Bronx and Staten Island. We are based at 1138 Ocean Ave in Flatbush, Brooklyn and answer the phone 24 hours a day.'],
  ['My landlord won’t fix the mold. Can you help?', 'If you rent, the building owner is responsible for fixing mold and the leak causing it under NYC Local Law 55. Our <a href="/nyc-mold-law/">NYC mold law guide</a> explains how to report it through 311. If you are a landlord or manager, we can do the work and give you the documentation.'],
];

export function home() {
  const hero = IMAGES.crew;
  const faq = faqBlock(homeFaqs);
  const body = `
<section class="hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow"><span class="pill-live"><i class="dot"></i> Crew on call now</span> All 5 boroughs · Based in Flatbush, Brooklyn</p>
      <h1>We remove the mold.<br><span class="hl">And the reason it grew.</span></h1>
      <p class="hero-lede">NYS-licensed mold remediation for NYC apartments, brownstones, houses and commercial spaces. Full containment, removal and drying, then we rebuild the room. Free on-site estimate, 24/7.</p>
      <div class="hero-cta">
        <a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} Call ${B.phone}</a>
        <a class="btn btn-light btn-lg" href="/photo-quote/">${icon('camera')} Get a quote from photos</a>
      </div>
      ${zipChecker()}
    </div>
    <div class="hero-media">
      <figure class="hero-photo">
        ${img('crew', { eager: true, sizes: '(min-width: 1000px) 560px, 100vw' })}
        <figcaption class="tag-card">
          <span class="tag-k">Specimen report</span>
          <span class="tag-row"><b>Company</b><span>${B.name}</span></span>
          <span class="tag-row"><b>Google</b><span>${stars(5)} 5.0 (${B.google.reviewCount})</span></span>
          <span class="tag-row"><b>NYS Lic.</b><span>${B.licenses[0].number}</span></span>
          <span class="tag-row"><b>Status</b><span class="ok">Open 24 hours</span></span>
        </figcaption>
      </figure>
    </div>
  </div>
  <div class="wrap">${trustRow()}</div>
</section>

<section class="band band-paper" aria-labelledby="clock-h">
  <div class="wrap">
    <div class="band-head">
      ${sectionLabel('01', 'The mold clock')}
      <h2 id="clock-h">Had a leak? Here is what is happening inside your walls right now.</h2>
      <p>Drag the slider to when the water came in. The sooner we dry it, the less gets torn out and the smaller the bill.</p>
    </div>
    ${moldClock()}
  </div>
</section>

<section class="band" aria-labelledby="bx-h">
  <div class="wrap">
    <div class="band-head">
      ${sectionLabel('02', 'Field guide')}
      <h2 id="bx-h">Where mold hides in New York buildings</h2>
      <p>New York buildings are old, crowded and stacked on top of each other, and water travels between units. Tap a hotspot to see the eight places we find mold most often.</p>
    </div>
    ${buildingExplorer()}
  </div>
</section>

<section class="band band-ink" aria-labelledby="svc-h">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap">
    <div class="band-head split">
      <div>${sectionLabel('03', 'What we do')}<h2 id="svc-h">Mold remediation, start to finish</h2></div>
      <a class="btn btn-light" href="/mold-removal/">All services ${icon('arrow')}</a>
    </div>
    ${serviceCards(services)}
    <p class="sister-note">Fire, smoke, storm, sewage or a major water loss? Our sister company <a href="${B.sister.url}" rel="noopener">${B.sister.name}</a> handles full restoration.</p>
  </div>
</section>

<section class="band" aria-labelledby="law-h">
  <div class="wrap">
    <div class="band-head">
      ${sectionLabel('04', 'The honest process')}
      <h2 id="law-h">We don’t test your mold. On purpose.</h2>
      <p>For jobs over 10 square feet, New York State requires three separate steps, and the company that tests can’t be the company that removes. Here is how it works:</p>
    </div>
    ${lawDiagram()}
    <p class="center"><a class="btn btn-ghost" href="/how-it-works/">See the full process, day by day ${icon('arrow')}</a></p>
  </div>
</section>

${reviewsBand()}

<section class="band" aria-labelledby="area-h">
  <div class="wrap">
    <div class="band-head split">
      <div>${sectionLabel('05', 'Service area')}<h2 id="area-h">Every borough. Every building type.</h2></div>
      <a class="btn btn-ghost" href="/service-areas/">All neighborhoods ${icon('arrow')}</a>
    </div>
    <div class="boro-grid">
      ${boroughs
        .map(
          (b) => `<a class="boro" href="/${b.slug}/">
        ${img(b.image, { sizes: '(min-width: 900px) 20vw, 50vw', alt: `${b.name}, New York` })}
        <span class="boro-txt"><b>${b.name}</b><small>${esc(b.tagline)}</small><span class="boro-go">${b.neighborhoods.length} neighborhood pages ${icon('arrow')}</span></span>
      </a>`
        )
        .join('')}
    </div>
  </div>
</section>

<section class="band band-paper" aria-labelledby="tools-h">
  <div class="wrap">
    <div class="band-head">${sectionLabel('06', 'Free tools')}<h2 id="tools-h">Not ready to call? Start here.</h2></div>
    <div class="tools">
      <a class="tool" href="/mold-risk-check/"><span class="tool-k">60 seconds</span><h3>Mold Risk Check</h3><p>Answer 7 quick questions and find out if what you have is a cleaning job or a remediation job.</p><span class="svc-go">Take the check ${icon('arrow')}</span></a>
      <a class="tool" href="/photo-quote/"><span class="tool-k">From your couch</span><h3>Photo quote</h3><p>Snap 1–3 photos. We will review them and call you with a ballpark before anyone comes out.</p><span class="svc-go">Upload photos ${icon('arrow')}</span></a>
      <a class="tool" href="/cost/"><span class="tool-k">Transparent pricing</span><h3>Cost estimator</h3><p>Typical NYC price ranges by room and size, plus what makes a job cost more or less.</p><span class="svc-go">See the ranges ${icon('arrow')}</span></a>
      <a class="tool" href="/nyc-mold-law/"><span class="tool-k">Tenants & landlords</span><h3>NYC mold law</h3><p>Local Law 55 and NY Article 32 in plain English: who has to fix it, who pays, and how to report it.</p><span class="svc-go">Read the guide ${icon('arrow')}</span></a>
    </div>
  </div>
</section>

<section class="band band-ink estimate-band" id="free-estimate" aria-label="Free estimate">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap est-grid">
    <div class="est-copy">
      ${sectionLabel('07', 'Free on-site estimate')}
      <h2>Tell us what’s going on. We’ll call you back fast.</h2>
      <ul class="ticks">
        <li>${icon('check')} Free, no-obligation on-site estimate</li>
        <li>${icon('check')} Written scope: remediation and rebuild priced separately</li>
        <li>${icon('check')} Photos and moisture readings for your insurer or landlord</li>
        <li>${icon('check')} Owner-led crew. Reviewers mention Vinny by name.</li>
      </ul>
      ${licenseCard()}
    </div>
    ${estimateForm({ source: 'home', dark: true })}
  </div>
</section>

${faq.html}

<section class="band band-paper" aria-labelledby="map-h">
  <div class="wrap map-grid">
    <div>
      ${sectionLabel('HQ', 'Find us')}
      <h2 id="map-h">${B.name}, Flatbush, Brooklyn</h2>
      <p class="nap"><b>${B.address.street}</b><br>${B.address.city}, ${B.address.region} ${B.address.zip}<br><a href="${tel}" data-track="call">${B.phone}</a><br><span class="open">${icon('clock')} ${B.hours}</span></p>
      <p><a class="btn btn-ghost" href="${B.google.directions}" target="_blank" rel="noopener">${icon('pin')} Directions</a> <a class="btn btn-ghost" href="${B.google.profileUrl}" target="_blank" rel="noopener">${icon('google')} Google profile</a></p>
    </div>
    ${mapEmbed()}
  </div>
</section>

${ctaBand()}
${zipData()}`;
  return page({
    path: '/',
    title: 'Mold Remediation NYC | NYS-Licensed Mold Removal · Open 24 Hours',
    description:
      'NYS-licensed mold removal in Brooklyn, Manhattan, Queens, the Bronx & Staten Island. Containment, removal, drying and rebuild. 5.0★ on Google. Free estimate: (347) 369-1545.',
    body,
    schema: [faq.schema],
    preloadImage: { href: '/images/crew-1024.webp', srcset: hero.sizes.map((w) => `/images/crew-${w}.webp ${w}w`).join(', '), sizes: '(min-width: 1000px) 560px, 100vw' },
  });
}

export function mapEmbed() {
  // Click-to-load facade keeps Google Maps' ~1MB of JS off the critical path.
  return `
<div class="map" data-map="${B.google.mapsEmbed}">
  <button type="button" class="map-facade" aria-label="Load interactive Google map of ${esc(B.name)}">
    <span class="map-grid-bg" aria-hidden="true"></span>
    <span class="map-pin">${icon('pin')}</span>
    <span class="map-label"><b>${B.name}</b><small>${B.address.street}, ${B.address.city} · ${stars(5)} 5.0</small><em>Tap to load map</em></span>
  </button>
</div>`;
}
