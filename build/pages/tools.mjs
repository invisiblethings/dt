import { business as B } from '../data/business.mjs';
import { priceTable, estimator, money } from '../data/pricing.mjs';
import { page, icon, tel, esc, breadcrumbsNav, img } from '../lib/html.mjs';
import { estimateForm, photoForm, reviewsBand, ctaBand, faqBlock, sectionLabel, licenseCard, trustRow } from '../lib/components.mjs';

const hero = (crumbs, h1, lede, extra = '') => `
<section class="page-hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap">
    ${breadcrumbsNav(crumbs)}
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>
    ${extra}
  </div>
</section>`;

export function freeEstimate() {
  const crumbs = [['Home', '/'], ['Free Estimate', '/free-estimate/']];
  const body = `
${hero(crumbs, 'Free on-site mold removal estimate', 'Tell us what’s going on and a real person calls you back. Water coming in right now? Don’t fill out a form. Call us.', `<div class="hero-cta"><a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} Emergency? Call ${B.phone}</a></div>`)}
<section class="band">
  <div class="wrap est-grid light">
    ${estimateForm({ source: 'free-estimate-page', title: 'Request your free estimate' })}
    <div class="est-copy">
      <h2 class="h3">What happens next</h2>
      <ol class="mini-steps">
        <li><b>We call you back</b>, usually within minutes, 24/7.</li>
        <li><b>A few quick questions</b> about the leak, the size of the area and access to the building.</li>
        <li><b>On-site visit.</b> We find the moisture source, measure, photograph and scope the job.</li>
        <li><b>Written estimate</b>, with remediation and rebuild priced separately. No pressure.</li>
      </ol>
      ${licenseCard()}
      <p class="fine">Note: we give free estimates for mold removal. We don’t do mold testing or formal assessments; under NY law those are done by independent licensed assessors. <a href="/nyc-mold-law/">Why?</a></p>
    </div>
  </div>
  <div class="wrap">${trustRow()}</div>
</section>
${reviewsBand({ limit: 4 })}`;
  return page({
    path: '/free-estimate/',
    title: 'Free Mold Removal Estimate NYC | Call Back in Minutes, 24/7',
    description: 'Request a free on-site mold remediation estimate anywhere in NYC. 45-second form, real person calls back 24/7. NYS-licensed. Or call (347) 369-1545.',
    body,
    crumbs,
  });
}

export function photoQuote() {
  const crumbs = [['Home', '/'], ['Photo Quote', '/photo-quote/']];
  const body = `
${hero(crumbs, 'Get a mold removal quote from your photos', 'Send 1–3 photos from your phone. We will look at them, call you with a first read and a ballpark, and book a free on-site estimate if you want one.')}
<section class="band">
  <div class="wrap two-col">
    <div>${photoForm()}</div>
    <aside class="side">
      <div class="side-box">
        <p class="h4">${icon('camera')} How to take useful photos</p>
        <ol class="mini-steps">
          <li><b>One close-up</b> of the worst spot, in focus, with the flash on.</li>
          <li><b>One wide shot</b> of the whole wall or ceiling so we can see the size.</li>
          <li><b>The source</b>, if you know it: a stain from upstairs, a leak, a window.</li>
          <li>Put a <b>common object</b> (a phone, a dollar bill) in the frame to show scale.</li>
        </ol>
      </div>
      ${licenseCard()}
    </aside>
  </div>
</section>
${ctaBand({ title: 'Rather talk it through?', text: 'Call and describe it. We answer 24 hours a day.' })}`;
  return page({
    path: '/photo-quote/',
    title: 'Mold Removal Quote From Photos | Mold Remediation NYC',
    description: 'Upload photos of your mold and get a fast ballpark quote from NYS-licensed mold remediators. Free, no obligation, anywhere in NYC.',
    body,
    crumbs,
  });
}

export function thankYou() {
  const body = `
<section class="page-hero ty">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap narrow center">
    <p class="ty-check">${icon('check')}</p>
    <h1>Got it. We’re on it.</h1>
    <p class="lede">Your request is in. A member of our team will call you shortly, day or night. Keep your phone nearby. The call may come from ${B.phone}.</p>
    <div class="hero-cta center"><a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} Urgent? Call ${B.phone}</a></div>
  </div>
</section>
<section class="band">
  <div class="wrap narrow">
    <h2 class="h3">While you wait</h2>
    <ul class="ticks">
      <li>${icon('check')} If water is still coming in, shut off the supply valve or tell your super.</li>
      <li>${icon('check')} Don’t scrub, sand or dry-brush moldy material. It spreads spores.</li>
      <li>${icon('check')} Keep the door to the affected room closed and run a fan <b>out</b> a window if you can.</li>
      <li>${icon('check')} Take photos now for your landlord or insurance claim.</li>
    </ul>
    <p>Meanwhile: <a href="/nyc-mold-law/">know your rights under NYC mold law</a> · <a href="/insurance/">mold &amp; insurance</a> · <a href="/how-it-works/">how remediation works</a></p>
  </div>
</section>`;
  return page({ path: '/thank-you/', title: 'Thank You | Mold Remediation NYC', description: 'Your request was received.', body, noindex: true });
}

export function costPage() {
  const crumbs = [['Home', '/'], ['Mold Removal Cost', '/cost/']];
  const faqs = [
    ['Why do mold removal prices vary so much?', 'Size is the biggest factor, but not the only one. Mold behind walls means more demolition and rebuild. Basements and attics are harder to contain and work in. Co-op and condo buildings add insurance, scheduling and access requirements. And rebuilding a finished room costs more than an unfinished one.'],
    ['Does the price include the mold assessor?', 'No. For jobs over 10 sq ft, New York law requires an independent licensed assessor, who bills you directly. That separation is intentional: it keeps the company removing the mold from also deciding how much needs removing.'],
    ['Is the rebuild included?', 'Your estimate lists remediation and rebuild as separate lines. The estimator on this page shows both.'],
    ['Will insurance pay for it?', 'Sometimes. If the mold came from a sudden, covered water event (like a burst pipe), mold remediation is often part of the claim. Long-term leaks and humidity are commonly excluded. See <a href="/insurance/">mold &amp; insurance</a>.'],
    ['Is the estimate really free?', 'Yes. On-site estimates for mold removal are free, with no obligation, in all five boroughs.'],
  ];
  const faq = faqBlock(faqs, { title: 'Mold removal cost: FAQ' });
  const opt = (name, arr, first) => arr.map((o, i) => `<label class="chip"><input type="radio" name="${name}" value="${o.id}"${i === first ? ' checked' : ''}><span>${esc(o.label)}${o.hint ? `<small> ${esc(o.hint)}</small>` : ''}</span></label>`).join('');
  const body = `
${hero(crumbs, 'How much does mold removal cost in NYC?', 'Typical price ranges for mold remediation in New York City, what affects the price, and an estimator that gives you a range in about 10 seconds.')}
<section class="band">
  <div class="wrap">
    <div class="band-head">${sectionLabel('EST', 'Instant range')}<h2>Mold remediation cost estimator</h2><p>Pick what fits. You’ll get a typical NYC range, and you can send it to us for an exact on-site price.</p></div>
    <div class="estimator" data-estimator>
      <script type="application/json" id="est-data">${JSON.stringify(estimator)}</script>
      <div class="est-inputs">
        <fieldset><legend>1. How big is the affected area?</legend><div class="chips">${opt('e-size', estimator.sizes, 1)}</div></fieldset>
        <fieldset><legend>2. Where is it?</legend><div class="chips">${opt('e-loc', estimator.locations, 0)}</div></fieldset>
        <fieldset><legend>3. What’s the situation?</legend><div class="chips">${opt('e-cond', estimator.conditions, 0)}</div></fieldset>
        <label class="toggle"><input type="checkbox" id="e-rebuild" checked> <span>Include rebuild (drywall, paint, trim)</span></label>
      </div>
      <div class="est-out" aria-live="polite">
        <p class="est-k">Typical NYC range</p>
        <p class="est-num" data-est-total>—</p>
        <dl class="est-break">
          <div><dt>Mold remediation</dt><dd data-est-rem>—</dd></div>
          <div><dt>Rebuild</dt><dd data-est-reb>—</dd></div>
        </dl>
        <p class="fine">This is a range, not a quote. Independent assessor fees (required over 10 sq ft) are billed separately by the assessor.</p>
        <a class="btn btn-signal btn-block" href="#estimate" data-est-send>Get my exact price, free ${icon('arrow')}</a>
      </div>
    </div>
  </div>
</section>

<section class="band band-paper">
  <div class="wrap">
    <div class="band-head">${sectionLabel('TBL', 'Typical ranges')}<h2>Typical mold removal prices in NYC</h2></div>
    <div class="table-wrap"><table class="price-table">
      <thead><tr><th scope="col">Job</th><th scope="col">Typical range</th></tr></thead>
      <tbody>${priceTable.map((r) => `<tr><td>${esc(r.job)}</td><td><b>${money(r.low)} – ${money(r.high)}${r.plus ? '+' : ''}</b></td></tr>`).join('')}</tbody>
    </table></div>
    <p class="fine">Ranges are for remediation only (containment, removal, HEPA cleaning, antimicrobial treatment, drying) and reflect typical NYC jobs. Rebuild, independent assessment and unusual access conditions are extra. Your on-site estimate is the real number.</p>
  </div>
</section>

<section class="band">
  <div class="wrap narrow prose">
    ${sectionLabel('WHY', 'Price drivers')}
    <h2>What makes mold removal cost more (or less)</h2>
    <h3>1. How much material has to come out</h3><p>Mold on tile and glass can be cleaned. Mold in drywall, insulation and carpet pad has to be cut out and replaced. The more porous material involved, the more demolition and rebuild.</p>
    <h3>2. Where it is</h3><p>A bathroom ceiling in a walk-up is simpler than a crawl space, a finished basement or a Manhattan co-op with freight elevator bookings and weekday-only work hours.</p>
    <h3>3. Whether the water is fixed</h3><p>We won’t remediate over an active leak; the mold would come back. Plumbing, roof or façade repairs are part of the real cost of the job, whether we do them or someone else does.</p>
    <h3>4. The 10 sq ft line</h3><p>Over 10 square feet, New York requires an independent assessor’s plan and clearance, which adds the assessor’s fee and some time. Catching mold early often keeps a job under that line.</p>
    <h3>5. Rebuild quality</h3><p>Basic drywall and paint versus matching prewar plaster, tile or millwork. We price rebuild separately so you can see exactly what you are paying for.</p>
    <p class="callout">${icon('clock')} <span><b>The cheapest mold job is the one that never happens.</b> If you just had a leak, drying it properly in the first 24–48 hours costs a fraction of remediation. <a href="/mold-removal/water-damage-mold/">Call about water damage</a>.</span></p>
  </div>
</section>
${faq.html}
<section class="band band-ink" id="estimate"><div class="spores" aria-hidden="true"></div><div class="wrap narrow">${estimateForm({ source: 'cost-page', title: 'Get your exact price, free', dark: true })}</div></section>`;
  return page({
    path: '/cost/',
    title: 'Mold Removal Cost NYC (2026) | Price Ranges + Instant Estimator',
    description: 'How much does mold remediation cost in NYC? Typical price ranges by room and size, what drives the price, and a free instant estimator from NYS-licensed pros.',
    body,
    crumbs,
    schema: [faq.schema],
    type: 'WebPage',
  });
}

const QUIZ = [
  ['What are you seeing?', [['Nothing, just a musty smell', 2], ['A few spots on grout or caulk', 0], ['Patches on a wall or ceiling', 3], ['A large area or several rooms', 5]]],
  ['Roughly how big is it, all together?', [['Smaller than a doormat', 0], ['About the size of a door', 3], ['Bigger than a door', 5], ['Not sure / can’t see all of it', 2]]],
  ['Has there been water?', [['No leak that I know of', 0], ['A leak or flood in the last few days', 3], ['A leak weeks or months ago', 4], ['It keeps leaking / keeps coming back', 5]]],
  ['Has it come back after cleaning?', [['I haven’t cleaned it yet', 1], ['No, it stayed gone', 0], ['Yes, it came back', 3]]],
  ['What is it growing on?', [['Tile, glass or the tub', 0], ['Painted drywall or plaster', 2], ['Wood, flooring or carpet', 3], ['Not sure', 1]]],
  ['How is the smell?', [['No smell', 0], ['Sometimes, e.g. when it rains', 1], ['Strong or constant', 3]]],
  ['Does anyone in the home have asthma, allergies, or a weakened immune system, or is there a baby or older adult?', [['No', 0], ['Yes', 2]]],
];
export function riskCheck() {
  const crumbs = [['Home', '/'], ['Mold Risk Check', '/mold-risk-check/']];
  const body = `
${hero(crumbs, 'Mold Risk Check: cleaning job or remediation job?', '7 questions, about 60 seconds. You’ll find out whether you can handle it yourself or whether it needs a professional, with no sales pitch.')}
<section class="band">
  <div class="wrap narrow">
    <div class="quiz" data-quiz>
      <div class="quiz-bar"><span data-quiz-bar></span></div>
      ${QUIZ.map(
        ([q, opts], i) => `<fieldset class="q" data-q="${i}"${i ? ' hidden' : ''}>
        <legend><span class="q-n">${i + 1}/${QUIZ.length}</span>${esc(q)}</legend>
        <div class="q-opts">${opts.map(([t, p]) => `<button type="button" class="q-opt" data-pts="${p}" data-label="${esc(t)}">${esc(t)}</button>`).join('')}</div>
        ${i ? '<button type="button" class="lnk" data-quiz-back>← Back</button>' : ''}
      </fieldset>`
      ).join('')}
      <div class="q-result" data-quiz-result hidden>
        <p class="label"><span>RES</span>Your result</p>
        <h2 data-r-title></h2>
        <div class="meter" aria-hidden="true"><span data-r-meter></span></div>
        <p data-r-text></p>
        <div data-r-tips></div>
        <div class="hero-cta"><a class="btn btn-signal" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a><a class="btn btn-ghost" href="#estimate">Send my answers for a free estimate</a> <button type="button" class="lnk" data-quiz-restart>Start over</button></div>
      </div>
    </div>
    <p class="fine">This check is general guidance, not a mold assessment or medical advice. If anyone has health symptoms, talk to a doctor. For lab testing, contact an independent licensed mold assessor.</p>
  </div>
</section>
<section class="band band-ink" id="estimate"><div class="spores" aria-hidden="true"></div><div class="wrap narrow">${estimateForm({ source: 'risk-check', title: 'Send your results, get a free estimate', dark: true })}</div></section>`;
  return page({
    path: '/mold-risk-check/',
    title: 'Mold Risk Check: Do I Need Mold Remediation? (60-Second Quiz)',
    description: 'Is it mildew you can clean, or mold that needs professional remediation? Take the free 60-second Mold Risk Check from NYC’s licensed mold removal pros.',
    body,
    crumbs,
  });
}
