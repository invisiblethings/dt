import { business as B, reviews } from '../data/business.mjs';
import { services, serviceBySlug } from '../data/services.mjs';
import { boroughs } from '../data/areas.mjs';
import { esc, icon, stars, tel, faqSchema } from './html.mjs';

// ============ NETLIFY FORMS ============
// All instances of a form share the exact same field set (Netlify registers fields at deploy time).
const netlifyAttrs = (name, extra = '') =>
  `name="${name}" method="POST" action="/thank-you/" data-netlify="true" netlify-honeypot="bot-field" ${extra}`;
const honeypot = `<p class="hp" aria-hidden="true"><label>Leave this empty <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>`;
const hidden = (name, source) => `<input type="hidden" name="form-name" value="${name}"><input type="hidden" name="source" value="${esc(source)}">`;

const chip = (name, value, label, type = 'radio', checked = false) =>
  `<label class="chip"><input type="${type}" name="${name}" value="${esc(value)}"${checked ? ' checked' : ''}><span>${esc(label)}</span></label>`;

export function estimateForm({ source = 'website', title = 'Get your free on-site estimate', id = 'estimate-form', dark = false } = {}) {
  return `
<form class="form form-steps${dark ? ' on-dark' : ''}" id="${id}" ${netlifyAttrs('estimate')} data-steps>
  ${hidden('estimate', source)}<input type="hidden" name="details" value="">
  ${honeypot}
  <div class="form-head">
    <h2 class="form-title">${esc(title)}</h2>
    <p class="form-sub">Takes about 45 seconds. A real person calls you back, 24/7.</p>
    <ol class="stepper" aria-hidden="true"><li class="on">Problem</li><li>Property</li><li>Contact</li></ol>
  </div>
  <fieldset class="step" data-step="1">
    <legend>What are you dealing with?</legend>
    <div class="chips">
      ${chip('problem', 'Visible mold', 'I can see mold', 'radio', true)}
      ${chip('problem', 'Mold after leak or flood', 'Mold after a leak/flood')}
      ${chip('problem', 'Musty smell', 'Musty smell, no visible mold')}
      ${chip('problem', 'Active leak - emergency', 'Water leaking now 🚨')}
      ${chip('problem', 'Rebuild after remediation', 'Rebuild after remediation')}
    </div>
    <label class="field"><span>Where is it?</span>
      <select name="location">
        <option>Bathroom</option><option>Basement / cellar</option><option>Kitchen</option><option>Bedroom / living area</option>
        <option>Closet / behind furniture</option><option>Attic / top-floor ceiling</option><option>Multiple rooms / whole unit</option><option>Commercial space</option>
      </select>
    </label>
    <div class="field"><span>Roughly how big?</span>
      <div class="chips">
        ${chip('size', 'Small (under 10 sq ft)', 'Smaller than a doormat')}
        ${chip('size', 'Medium (10-30 sq ft)', 'About a door or two')}
        ${chip('size', 'Large (30+ sq ft)', 'Bigger than that')}
        ${chip('size', 'Not sure', 'Not sure', 'radio', true)}
      </div>
    </div>
    <button type="button" class="btn btn-signal btn-block" data-next>Continue ${icon('arrow')}</button>
  </fieldset>
  <fieldset class="step" data-step="2">
    <legend>Tell us about the property</legend>
    <label class="field"><span>ZIP code</span><input name="zip" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" autocomplete="postal-code" placeholder="e.g. 11230" required></label>
    <label class="field"><span>Property type</span>
      <select name="property_type">
        <option>Apartment I rent</option><option>Co-op / condo I own</option><option>House I own</option>
        <option>Building I own or manage</option><option>Commercial / business</option>
      </select>
    </label>
    <div class="field"><span>How soon?</span>
      <div class="chips">
        ${chip('urgency', 'Emergency - today', 'Today')}
        ${chip('urgency', 'This week', 'This week', 'radio', true)}
        ${chip('urgency', 'Just getting prices', 'Just pricing')}
      </div>
    </div>
    <div class="step-nav"><button type="button" class="btn btn-ghost" data-prev>Back</button><button type="button" class="btn btn-signal" data-next>Continue ${icon('arrow')}</button></div>
  </fieldset>
  <fieldset class="step" data-step="3">
    <legend>Where should we reach you?</legend>
    <label class="field"><span>Name</span><input name="name" autocomplete="name" required></label>
    <label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
    <label class="field"><span>Email <em>(optional)</em></span><input name="email" type="email" autocomplete="email"></label>
    <label class="field"><span>Anything else? <em>(optional)</em></span><textarea name="message" rows="3" placeholder="e.g. leak from upstairs last week, ceiling stain growing"></textarea></label>
    <div class="step-nav"><button type="button" class="btn btn-ghost" data-prev>Back</button><button type="submit" class="btn btn-signal">Request free estimate</button></div>
    <p class="form-fine">${icon('shield')} No spam, no obligation. Prefer to talk? <a href="${tel}" data-track="call">${B.phone}</a></p>
  </fieldset>
</form>`;
}

export function callbackForm({ source = 'website', title = 'Get a call back in minutes' } = {}) {
  return `
<form class="form form-callback" ${netlifyAttrs('callback')}>
  ${hidden('callback', source)}${honeypot}
  <h2 class="form-title">${esc(title)}</h2>
  <label class="field"><span>Name</span><input name="name" autocomplete="name" required></label>
  <label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel" required></label>
  <label class="field"><span>ZIP code</span><input name="zip" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" autocomplete="postal-code" required></label>
  <button class="btn btn-signal btn-block" type="submit">Call me back</button>
  <p class="form-fine">Or call now: <a href="${tel}" data-track="call">${B.phone}</a> · open 24 hours</p>
</form>`;
}

export function photoForm({ source = 'photo-quote' } = {}) {
  const drop = (n, label) => `
    <label class="drop" data-drop>
      <input type="file" name="photo${n}" accept="image/*"${n === 1 ? ' required' : ''} capture="environment">
      <span class="drop-in">${icon('camera')}<b>${label}</b><small>Tap to take or choose a photo</small></span>
      <img class="drop-preview" alt="" hidden>
    </label>`;
  return `
<form class="form form-photo" ${netlifyAttrs('photo-quote', 'enctype="multipart/form-data"')} data-photo-form>
  ${hidden('photo-quote', source)}${honeypot}
  <div class="drops">
    ${drop(1, 'Close-up')}
    ${drop(2, 'Whole wall / room')}
    ${drop(3, 'Leak or stain')}
  </div>
  <p class="form-fine" data-size-note>Up to 3 photos. Keep the total under 8&nbsp;MB (we shrink large phone photos automatically before sending).</p>
  <div class="grid-2">
    <label class="field"><span>Name</span><input name="name" autocomplete="name" required></label>
    <label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel" required></label>
    <label class="field"><span>Email <em>(optional)</em></span><input name="email" type="email" autocomplete="email"></label>
    <label class="field"><span>ZIP code</span><input name="zip" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" required></label>
  </div>
  <label class="field"><span>What happened? <em>(optional)</em></span><textarea name="message" rows="3" placeholder="How long has it been there? Any leak or flood?"></textarea></label>
  <button class="btn btn-signal btn-block" type="submit">${icon('camera')} Send photos for a quote</button>
  <p class="form-fine">${icon('shield')} Photos are only used to prepare your estimate.</p>
</form>`;
}

// ============ BLOCKS ============
export const sectionLabel = (code, text) => `<p class="label"><span>${esc(code)}</span>${esc(text)}</p>`;

export function reviewCards(list = reviews, { limit = 8 } = {}) {
  return list
    .slice(0, limit)
    .map(
      (r) => `
<figure class="review">
  <div class="review-top">${stars(5)}<span class="review-src">${icon('google')} Google</span></div>
  <blockquote><p>${esc(r.text)}</p></blockquote>
  <figcaption><span class="avatar" aria-hidden="true">${esc(r.author[0])}</span><span><b>${esc(r.author)}</b><small>${esc(r.tag)} · ${r.year}</small></span></figcaption>
</figure>`
    )
    .join('');
}

export function reviewsBand({ title = 'Rated 5.0 by every Google reviewer', list = reviews, limit = 8 } = {}) {
  return `
<section class="band band-paper reviews-band" aria-labelledby="rv-h">
  <div class="wrap">
    <div class="band-head split">
      <div>${sectionLabel('REV', 'Verified Google reviews')}<h2 id="rv-h">${esc(title)}</h2></div>
      <a class="g-score" href="${B.google.profileUrl}" target="_blank" rel="noopener">
        <span class="g-num">5.0</span><span>${stars(5)}<small>${B.google.reviewCount} reviews on Google</small></span>
      </a>
    </div>
    <div class="review-rail" tabindex="0" aria-label="Customer reviews">${reviewCards(list, { limit })}</div>
    <p class="center"><a class="btn btn-ghost" href="${B.google.profileUrl}" target="_blank" rel="noopener">${icon('google')} Read all ${B.google.reviewCount} reviews on Google ${icon('arrow')}</a></p>
  </div>
</section>`;
}

export function trustRow() {
  return `
<ul class="trust">
  <li>${icon('star')}<span><b>5.0 on Google</b><small>${B.google.reviewCount} reviews</small></span></li>
  <li>${icon('shield')}<span><b>NYS licensed</b><small>Lic. #${B.licenses[0].number}</small></span></li>
  <li>${icon('clock')}<span><b>Open 24 hours</b><small>7 days a week</small></span></li>
  <li>${icon('hammer')}<span><b>Remediate + rebuild</b><small>GC Lic. #${B.licenses[2].number}</small></span></li>
</ul>`;
}

export function ctaBand({ title = 'Mold doesn’t go away on its own.', text = 'Call now or send photos. We’ll tell you what you are dealing with and give you a free on-site estimate.' } = {}) {
  return `
<section class="band band-teal cta-band">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap cta-in">
    <div><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
    <div class="cta-actions">
      <a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a>
      <a class="btn btn-light btn-lg" href="/photo-quote/">${icon('camera')} Send photos</a>
    </div>
  </div>
</section>`;
}

export function faqBlock(faqs, { title = 'Questions people ask us', id = 'faq' } = {}) {
  return {
    html: `
<section class="band" aria-labelledby="${id}-h">
  <div class="wrap narrow">
    ${sectionLabel('FAQ', 'Straight answers')}
    <h2 id="${id}-h">${esc(title)}</h2>
    <div class="faq">${faqs.map(([q, a]) => `<details><summary>${esc(q)}</summary><div><p>${a}</p></div></details>`).join('')}</div>
  </div>
</section>`,
    schema: faqSchema(faqs.map(([q, a]) => [q, a.replace(/<[^>]+>/g, '')])),
  };
}

export function serviceCards(list = services) {
  return `<div class="svc-grid">${list
    .map(
      (s, i) => `
<a class="svc" href="/mold-removal/${s.slug}/">
  <span class="svc-no">${String(i + 1).padStart(2, '0')}</span>
  ${icon(s.icon, 'svc-ico')}
  <h3>${esc(s.name)}</h3>
  <p>${esc(s.card)}</p>
  <span class="svc-go">Learn more ${icon('arrow')}</span>
</a>`
    )
    .join('')}</div>`;
}

export const relatedServices = (slugs) => serviceCards(slugs.map((s) => serviceBySlug[s]).filter(Boolean));

export function licenseCard() {
  return `
<div class="lic-card">
  <p class="lic-card-h">${icon('shield')} Licenses you can verify</p>
  <ul>${B.licenses.map((l) => `<li><span>${esc(l.label)}</span><b>#${esc(l.number)}</b><small>${esc(l.issuer)}</small></li>`).join('')}</ul>
</div>`;
}

// ============ INTERACTIVE WIDGETS ============
export function zipData() {
  const hoods = [];
  for (const b of boroughs) for (const n of b.neighborhoods) hoods.push({ n: n.name, b: b.name, u: `/${b.slug}/${n.slug}/`, z: n.zips, lat: n.lat, lng: n.lng });
  const pre = boroughs.map((b) => ({ b: b.name, u: `/${b.slug}/`, p: b.zipPrefixes }));
  return `<script type="application/json" id="zip-data">${JSON.stringify({ hq: B.geo, hoods, pre })}</script>`;
}

export function zipChecker({ dark = true } = {}) {
  return `
<div class="zipcheck${dark ? ' on-dark' : ''}" data-zipcheck>
  <label for="zip-in">Do we cover your block? Enter your ZIP</label>
  <div class="zip-row">
    <input id="zip-in" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" placeholder="11230" autocomplete="postal-code">
    <button type="button" class="btn btn-signal">Check ${icon('arrow')}</button>
  </div>
  <p class="zip-out" aria-live="polite"></p>
</div>`;
}

const STAGES = [
  ['0–24 hrs', 'The dry-out window', 'Water is soaking into drywall, wood and carpet pad. Fast extraction and proper drying now can prevent mold completely. This is the cheapest point to call.', 'ok', '/mold-removal/water-damage-mold/'],
  ['24–48 hrs', 'Spores wake up', 'Mold can start growing on damp materials within 24–48 hours. You won’t see anything yet, but wet drywall, cardboard backing and carpet pad are where it starts.', 'warn', '/mold-removal/water-damage-mold/'],
  ['3–7 days', 'Colonies form', 'Musty smell, small spots at baseboards, on the back of drywall and under carpet. Water keeps wicking upward inside the wall.', 'bad', '/mold-removal/walls-and-ceilings/'],
  ['1–3 weeks', 'Spreading inside the walls', 'Growth spreads through wall cavities, insulation and subfloors. Many jobs pass 10 sq ft here, which means New York’s mold law applies (independent assessor + licensed remediator).', 'bad', '/nyc-mold-law/'],
  ['1 month +', 'Established mold', 'Structural materials are colonized. Paint and bleach won’t fix it; the affected material has to come out, the space has to be dried, then rebuilt.', 'crit', '/mold-removal/rebuild/'],
];
export function moldClock() {
  return `
<div class="clock" data-moldclock>
  <div class="clock-dial" aria-hidden="true">
    <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="86" class="clock-track"/><circle cx="100" cy="100" r="86" class="clock-fill" pathLength="100"/></svg>
    <div class="clock-read"><b data-mc-time>${STAGES[0][0]}</b><small>since the water</small></div>
    <div class="clock-spores">${Array.from({ length: 22 }, (_, i) => `<i style="--i:${i}"></i>`).join('')}</div>
  </div>
  <div class="clock-body">
    <label for="mc-range" class="clock-q">When did the leak, flood or spill happen?</label>
    <input id="mc-range" type="range" min="0" max="${STAGES.length - 1}" step="1" value="0" list="mc-ticks" aria-valuetext="${STAGES[0][0]}">
    <datalist id="mc-ticks">${STAGES.map((_, i) => `<option value="${i}"></option>`).join('')}</datalist>
    <div class="clock-ticks" aria-hidden="true">${STAGES.map((s) => `<span>${s[0]}</span>`).join('')}</div>
    <div class="clock-stages">
      ${STAGES.map(
        (s, i) => `<article class="stage stage-${s[3]}" data-stage="${i}"${i ? ' hidden' : ''}>
        <h3><span>${s[0]}</span>${esc(s[1])}</h3><p>${esc(s[2])}</p>
        <p class="stage-cta"><a class="btn btn-signal" href="${tel}" data-track="call">${icon('phone')} ${i < 2 ? 'Call now to dry it out' : 'Call for a free estimate'}</a><a class="lnk" href="${s[4]}">What this means ${icon('arrow')}</a></p>
      </article>`
      ).join('')}
    </div>
    <p class="fine">Based on EPA guidance that mold can begin growing on damp materials within 24–48 hours. Actual timing depends on temperature, material and humidity.</p>
  </div>
</div>`;
}

// Cross-section of a NYC walk-up / brownstone with mold hotspots.
const SPOTS = [
  { id: 'roof', x: 250, y: 146, t: 'Top-floor ceiling', s: 'attic-and-roof-leaks', d: 'Flat roofs and parapets leak into the top-floor ceiling cavity. Stains show up months after the leak starts.' },
  { id: 'upstairs', x: 200, y: 296, t: 'Under the upstairs bathroom', s: 'bathroom', d: 'The #1 NYC call: a tub overflow, shower pan or toilet seal upstairs soaks your ceiling. Mold grows on top of the drywall where you can’t see it.' },
  { id: 'window', x: 402, y: 212, t: 'Window returns & sills', s: 'walls-and-ceilings', d: 'Steam heat, single-pane windows and cold masonry mean condensation every winter, and black mold on the window returns.' },
  { id: 'riser', x: 324, y: 336, t: 'Inside the riser wall', s: 'walls-and-ceilings', d: 'Shared supply and drain risers leak inside the wall between floors. First sign: bubbling paint or a musty smell near the bathroom or kitchen.' },
  { id: 'radiator', x: 140, y: 346, t: 'Behind the radiator', s: 'walls-and-ceilings', d: 'Leaky steam valves drip for years behind radiator covers, rotting the floor and the wall behind it.' },
  { id: 'closet', x: 456, y: 352, t: 'Closet on an exterior wall', s: 'black-mold', d: 'Cold outside walls + no airflow + stored clothes = mold on the back wall of the closet and on whatever is stored there.' },
  { id: 'kitchen', x: 215, y: 498, t: 'Under the kitchen sink', s: 'water-damage-mold', d: 'Slow drips from supply lines and dishwasher hoses rot the cabinet floor and the wall behind it.' },
  { id: 'basement', x: 360, y: 572, t: 'Basement & cellar', s: 'basement', d: 'Groundwater, sewer backups in cloudbursts and boiler leaks. Finished basements hide it behind paneling and carpet.' },
];
export function buildingExplorer() {
  const drop = (x, y) => `<path d="M${x} ${y}c-2.5 5-5 7.5-5 10a5 5 0 0 0 10 0c0-2.5-2.5-5-5-10z" class="b-drop"/>`;
  const svg = `
<svg class="bx-svg" viewBox="0 0 560 640" role="img" aria-labelledby="bx-t">
  <title id="bx-t">Cross-section of a New York City row house showing eight places mold commonly grows</title>
  <defs>
    <pattern id="brick" width="24" height="12" patternUnits="userSpaceOnUse"><rect width="24" height="12" class="b-brick"/><path d="M0 12h24M12 0v6M0 6h24M24 6v6M0 6v6" class="b-mortar"/></pattern>
    <pattern id="earth" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" class="b-earth"/><circle cx="6" cy="6" r="0.8" class="b-earth"/></pattern>
  </defs>
  <!-- rain -->
  <g class="b-rain"><path d="M140 10l-10 22M200 4l-10 22M270 12l-10 22M340 2l-10 22M410 10l-10 22M480 4l-10 22"/></g>
  <rect x="0" y="530" width="560" height="110" fill="url(#earth)" class="b-ground"/>
  <rect x="60" y="60" width="440" height="470" fill="url(#brick)"/>
  <path d="M50 60h460v-14H50z" class="b-cornice"/>
  <rect x="80" y="108" width="400" height="422" class="b-inside"/>
  <rect x="80" y="108" width="400" height="12" class="b-slab"/>
  <rect x="80" y="257" width="400" height="8" class="b-slab"/>
  <rect x="80" y="402" width="400" height="8" class="b-slab"/>
  <rect x="80" y="522" width="400" height="8" class="b-slab"/>
  <rect x="80" y="530" width="400" height="90" class="b-base"/>
  <rect x="80" y="612" width="400" height="8" class="b-slab"/>
  <!-- riser -->
  <rect x="318" y="112" width="12" height="500" class="b-riser"/>
  <!-- F3: roof leak stain + bathroom -->
  <ellipse cx="250" cy="122" rx="38" ry="5" class="b-stain"/>${drop(250, 126)}
  <path d="M136 222h128v14a21 21 0 0 1-21 21h-86a21 21 0 0 1-21-21z" class="b-fix"/><path d="M146 222v-24h12" class="b-pipe"/>
  <rect x="276" y="236" width="26" height="21" rx="4" class="b-fix"/><rect x="280" y="208" width="18" height="28" rx="3" class="b-fix"/>
  <!-- F2: ceiling stain under the tub, radiator, closet -->
  <ellipse cx="200" cy="268" rx="54" ry="5" class="b-stain"/>${drop(186, 272)}${drop(214, 276)}
  <g class="b-fix-l">${Array.from({ length: 7 }, (_, i) => `<rect x="${112 + i * 9}" y="366" width="6" height="36" rx="2"/>`).join('')}</g>
  <rect x="436" y="318" width="44" height="84" class="b-closet"/><path d="M446 332h24" class="b-pipe"/><path d="M450 332v14l-6 8M464 332v14l6 8" class="b-hang"/>
  <!-- windows -->
  ${[[380, 150], [380, 295], [380, 440]].map(([x, y]) => `<rect x="${x}" y="${y - 22}" width="44" height="60" class="b-win"/><path d="M${x + 22} ${y - 22}v60M${x} ${y + 8}h44" class="b-winbar"/><rect x="${x - 4}" y="${y + 38}" width="52" height="5" class="b-sill"/>`).join('')}
  <!-- F1: kitchen -->
  <rect x="160" y="474" width="140" height="48" class="b-fix"/><path d="M160 482h140M206 482v40M254 482v40" class="b-line"/>
  <rect x="186" y="466" width="46" height="10" rx="2" class="b-fix-l"/><path d="M210 466v-14h10" class="b-pipe"/>
  <!-- basement: boiler + water -->
  <rect x="104" y="548" width="48" height="60" rx="6" class="b-fix"/><circle cx="128" cy="570" r="7" class="b-line"/>
  <ellipse cx="330" cy="608" rx="80" ry="5" class="b-water"/>
  <path d="M500 530h40v-20h-10v-20h-10v-20h-20z" class="b-stoop"/>
  ${SPOTS.map(
    (s, i) => `<g class="hot" data-spot="${i}" tabindex="-1"><circle cx="${s.x}" cy="${s.y}" r="22" class="hot-ring"/><circle cx="${s.x}" cy="${s.y}" r="13" class="hot-dot"/><text x="${s.x}" y="${s.y + 5}" class="hot-n">${i + 1}</text></g>`
  ).join('')}
</svg>`;
  return `
<div class="bx" data-explorer>
  <div class="bx-art">${svg}</div>
  <div class="bx-panel">
    <ol class="bx-list">
      ${SPOTS.map(
        (s, i) => `<li><button type="button" data-spot-btn="${i}" aria-expanded="${i === 1}"><span class="bx-n">${i + 1}</span>${esc(s.t)}</button>
        <div class="bx-detail"${i === 1 ? '' : ' hidden'}><p>${esc(s.d)}</p><a href="/mold-removal/${s.s}/">${esc(serviceBySlug[s.s].name)} ${icon('arrow')}</a></div></li>`
      ).join('')}
    </ol>
  </div>
</div>`;
}

export function lawDiagram() {
  return `
<ol class="law">
  <li class="law-step ext">
    <span class="law-tag">Independent</span>
    <h3><span>1</span>Licensed mold assessor</h3>
    <p>Inspects and tests, then writes the <b>mold remediation plan</b>: what has to be removed, how, and what counts as clean.</p>
  </li>
  <li class="law-step us">
    <span class="law-tag">That’s us</span>
    <h3><span>2</span>Licensed remediation contractor</h3>
    <p>Writes a work plan from the assessor’s plan, sets up containment, removes and cleans, dries, and treats the area.</p>
  </li>
  <li class="law-step ext">
    <span class="law-tag">Independent</span>
    <h3><span>3</span>Post-remediation assessment</h3>
    <p>An independent assessor checks our work. Walls stay open until it passes. Then we rebuild.</p>
  </li>
</ol>
<p class="law-note">${icon('shield')} <span><b>Why we don’t test your mold:</b> New York’s mold law (Labor Law Article 32) doesn’t let the same company assess and remediate the same project. A company that tests your home and then quotes you the removal has a conflict of interest. We only remediate, so our estimate is never inflated by our own test results.</span></p>`;
}
