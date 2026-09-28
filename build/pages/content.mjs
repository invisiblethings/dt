import { business as B, reviews } from '../data/business.mjs';
import { services } from '../data/services.mjs';
import { boroughs } from '../data/areas.mjs';
import { page, icon, tel, esc, breadcrumbsNav, img, abs, businessId } from '../lib/html.mjs';
import {
  estimateForm, callbackForm, reviewsBand, reviewCards, ctaBand, faqBlock, sectionLabel, lawDiagram, licenseCard, trustRow, serviceCards,
} from '../lib/components.mjs';
import { mapEmbed } from './home.mjs';

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
const callBtns = `<div class="hero-cta"><a class="btn btn-signal btn-lg" href="${tel}" data-track="call">${icon('phone')} ${B.phone}</a><a class="btn btn-light btn-lg" href="/free-estimate/">Free estimate</a></div>`;

// ---------------- NYC MOLD LAW ----------------
export function moldLaw() {
  const crumbs = [['Home', '/'], ['NYC Mold Law', '/nyc-mold-law/']];
  const faqs = [
    ['Is my landlord required to fix mold in NYC?', 'Yes. Under NYC’s housing code and Local Law 55 of 2018, owners of residential rental buildings must fix mold and the underlying moisture problem, using safe work practices. Tenants can report unaddressed mold by calling 311.'],
    ['Does New York require a license for mold removal?', 'Yes. Under New York State Labor Law Article 32, mold projects larger than 10 square feet must be handled by a NYS-licensed mold assessor and a separate NYS-licensed remediation contractor.'],
    ['Can the same company test and remove mold?', 'Not on the same project. Article 32 prohibits a licensee from performing both the assessment and the remediation on the same project, to prevent conflicts of interest.'],
    ['What about mold under 10 square feet?', 'Article 32 licensing requirements apply to projects over 10 square feet. Smaller areas must still be cleaned properly, and in NYC rental buildings the landlord must still address the mold and its cause.'],
    ['Who pays for mold caused by the upstairs apartment?', 'It depends on ownership and leases, but responsibility generally follows the source of the leak and the governing documents (lease, co-op proprietary lease or condo bylaws). Document everything with photos. See our <a href="/guides/mold-from-upstairs-neighbor-leak/">upstairs-leak guide</a>.'],
  ];
  const faq = faqBlock(faqs, { title: 'NYC mold law FAQ' });
  const body = `
${hero(crumbs, 'NYC mold law, in plain English', 'Who has to fix it, who is allowed to fix it, and how to report it. What New York State Article 32 and NYC Local Law 55 mean for tenants, owners and landlords.')}
<section class="band">
  <div class="wrap two-col">
    <article class="prose">
      <nav class="toc" aria-label="On this page"><p class="h4">On this page</p><ol>
        <li><a href="#article-32">NY Article 32: the licensing law</a></li>
        <li><a href="#local-law-55">NYC Local Law 55: landlord duties</a></li>
        <li><a href="#tenants">If you rent: what to do</a></li>
        <li><a href="#owners">If you own or manage: how to comply</a></li>
      </ol></nav>

      <h2 id="article-32">New York State Labor Law Article 32 (the mold licensing law)</h2>
      <p>Since 2016, New York State has licensed the people who assess and remove mold. For any mold project <b>larger than 10 square feet</b>, the law sets up three separate steps:</p>
      ${lawDiagram()}
      <ul class="ticks">
        <li>${icon('check')} The <b>mold assessor</b> (NYS-licensed) inspects and writes a <b>remediation plan</b>: the scope, the containment, and the clearance criteria.</li>
        <li>${icon('check')} The <b>remediation contractor</b> (NYS-licensed, like us: Lic. #${B.licenses[0].number}) prepares a work plan and does the work according to the plan.</li>
        <li>${icon('check')} After remediation, an assessor performs a <b>post-remediation assessment</b> to confirm the work passed.</li>
        <li>${icon('check')} The same licensee can’t be both the assessor and the remediator on the same project.</li>
      </ul>
      <p>That last rule is why we don’t sell testing. A company that finds the problem and then quotes the removal has a financial reason to find more of it.</p>

      <h2 id="local-law-55">NYC Local Law 55 of 2018 (landlord duties)</h2>
      <p>NYC’s Asthma-Free Housing Act, Local Law 55 of 2018, requires owners of most residential rental buildings to deal with indoor allergens, including mold. In general, owners must:</p>
      <ul class="dots">
        <li>Inspect apartments for mold and pests at least once a year, and when a tenant complains.</li>
        <li>Fix mold <b>and the moisture that caused it</b>. Painting over it isn’t enough.</li>
        <li>Use safe work practices: contain the area, clean up dust and debris, and avoid spreading spores.</li>
        <li>Prepare vacant apartments before a new tenant moves in.</li>
        <li>Give tenants information about indoor allergen hazards with their lease.</li>
      </ul>
      <p>In larger buildings (10 or more units), NYC rules also require that mold assessment and remediation be done by NYS-licensed contractors (Local Law 61 of 2018).</p>

      <h2 id="tenants">If you rent: what to do about mold</h2>
      <ol class="mini-steps">
        <li><b>Photograph it</b> with the date. Include any leak, stain or source you can see.</li>
        <li><b>Notify your landlord or super in writing</b> (email or text is fine) and keep a copy.</li>
        <li><b>If it isn’t fixed, call 311</b> or file online at <a href="https://portal.311.nyc.gov/" rel="noopener" target="_blank">portal.311.nyc.gov</a>. HPD can inspect and issue violations.</li>
        <li><b>Don’t pay a contractor to fix your landlord’s building</b> unless you’ve agreed on reimbursement in writing. It’s the owner’s responsibility.</li>
      </ol>
      <p class="callout">${icon('shield')} <span>Renting and the mold is from <b>your own belongings or a spill you caused</b>? We can help directly. <a href="/free-estimate/">Get a free estimate</a>.</span></p>

      <h2 id="owners">If you own or manage: how we help you comply</h2>
      <ul class="ticks">
        <li>${icon('check')} NYS-licensed remediation that follows the assessor’s plan.</li>
        <li>${icon('check')} We fix the moisture source and rebuild. Walls get closed properly, not painted over.</li>
        <li>${icon('check')} Photos, scope and completion documentation for HPD, boards and insurers.</li>
        <li>${icon('check')} Certificates of insurance and scheduling around tenants.</li>
      </ul>
      <p><a class="btn btn-ghost" href="/property-managers/">Working with property managers ${icon('arrow')}</a></p>
      <p class="fine">This page is general information, not legal advice. Rules change; check the <a href="https://dol.ny.gov/mold-program" rel="noopener" target="_blank">NYS Department of Labor Mold Program</a> and <a href="https://www.nyc.gov/site/hpd/index.page" rel="noopener" target="_blank">NYC HPD</a> for current requirements.</p>
    </article>
    <aside class="side sticky">${callbackForm({ source: 'nyc-mold-law' })}${licenseCard()}</aside>
  </div>
</section>
${faq.html}
${ctaBand()}`;
  return page({
    path: '/nyc-mold-law/',
    title: 'NYC Mold Law Explained: Local Law 55 & NY Article 32 (2026)',
    description: 'Who must fix mold in NYC and who is allowed to? Local Law 55 landlord duties, NY Article 32 licensing, the 10 sq ft rule, and how tenants report mold via 311.',
    body,
    crumbs,
    schema: [faq.schema],
  });
}

// ---------------- HOW IT WORKS ----------------
export function howItWorks() {
  const crumbs = [['Home', '/'], ['How It Works', '/how-it-works/']];
  const steps = [
    ['Call or send photos', 'Any hour. We ask what happened, when, and where, and tell you right away if it sounds like an emergency (active water) or something that can be scheduled.', 'Day 0'],
    ['Free on-site estimate', 'We find the moisture source, take moisture readings and photos, measure the affected area, and explain what has to come out and why. You get a written estimate with remediation and rebuild priced separately.', 'Day 0–2'],
    ['Independent assessment (if over 10 sq ft)', 'A NYS-licensed assessor you hire directly writes the remediation plan. We can recommend independent assessors. We build our work plan around their plan.', 'Day 1–5'],
    ['Stop the water', 'The leak gets fixed first, by us, your plumber, roofer or the building. Remediating over an active leak is money wasted.', 'Before work'],
    ['Containment & negative air', 'Plastic walls, zipper doors, sealed vents and HEPA air scrubbers. The rest of your home stays clean and usable.', 'Work day 1'],
    ['Removal, HEPA cleaning & treatment', 'Contaminated porous materials are cut out and bagged inside the containment. Framing and surfaces are HEPA-vacuumed, wiped and treated with an EPA-registered antimicrobial.', 'Work day 1–3'],
    ['Drying & verification', 'Dehumidifiers and air movers until materials are back to normal moisture readings. Then the independent post-remediation assessment when the law requires it.', 'Day 3–7'],
    ['Rebuild & final clean', 'We close walls and ceilings with moisture-resistant materials, tape, prime and paint, reinstall trim, remove containment and clean up. You get your room back.', 'After clearance'],
  ];
  const body = `
${hero(crumbs, 'How mold remediation works, step by step', 'What happens from your first call until the room is rebuilt, with a realistic timeline for a typical single-room NYC job.', callBtns)}
<section class="band">
  <div class="wrap narrow">
    <ol class="timeline">${steps.map(([h, p, t], i) => `<li><span class="tl-n">${String(i + 1).padStart(2, '0')}</span><div><p class="tl-t">${t}</p><h2 class="h3">${h}</h2><p>${p}</p></div></li>`).join('')}</ol>
  </div>
</section>
<section class="band band-paper"><div class="wrap"><div class="band-head">${sectionLabel('LAW', 'Why three parties')}<h2>The NY mold law process</h2></div>${lawDiagram()}</div></section>
${reviewsBand({ limit: 6 })}
${ctaBand()}`;
  return page({
    path: '/how-it-works/',
    title: 'How Mold Remediation Works in NYC | Step-by-Step Process',
    description: 'The mold remediation process in NYC from first call to rebuild: estimate, independent assessment, containment, HEPA removal, drying, clearance and repairs. Typical timelines.',
    body,
    crumbs,
    schema: [{ '@type': 'HowTo', name: 'How professional mold remediation works in NYC', step: steps.map(([h, p], i) => ({ '@type': 'HowToStep', position: i + 1, name: h, text: p })) }],
  });
}

// ---------------- PROPERTY MANAGERS ----------------
export function propertyManagers() {
  const crumbs = [['Home', '/'], ['Property Managers', '/property-managers/']];
  const pmReviews = reviews.filter((r) => /Property|Commercial|Real estate/.test(r.tag));
  const body = `
${hero(crumbs, 'Mold remediation for NYC property managers & landlords', 'Tenant complaints, HPD violations, unit turnovers, leaks between floors. One licensed vendor who answers at 2 a.m., works around your tenants and gives you documentation you can file.', callBtns)}
<section class="band">
  <div class="wrap">
    <div class="problem-grid four">
      <div class="problem"><h3>${icon('clock')} 24/7 response</h3><p>We answer day and night. Emergency leaks get a crew; routine complaints get scheduled fast.</p></div>
      <div class="problem"><h3>${icon('clipboard')} Documentation</h3><p>Before/after photos, moisture readings, scope and completion notes for HPD, your board and insurers.</p></div>
      <div class="problem"><h3>${icon('shield')} Licensed & insured</h3><p>NYS mold license, GC license and EPA Lead-Safe firm certification. COIs naming your entities on request.</p></div>
      <div class="problem"><h3>${icon('hammer')} Remediate + rebuild</h3><p>No second contractor to chase. We close it up so the unit is back in service.</p></div>
    </div>
  </div>
</section>
<section class="band band-paper">
  <div class="wrap">
    <div class="band-head">${sectionLabel('PM', 'In their words')}<h2>Trusted by owners and managers across NYC</h2></div>
    <div class="review-rail">${reviewCards(pmReviews)}</div>
  </div>
</section>
<section class="band">
  <div class="wrap two-col">
    <div class="prose">
      <h2>What we handle for buildings</h2>
      <ul class="ticks">
        <li>${icon('check')} Mold complaints and HPD mold violations (Local Law 55)</li>
        <li>${icon('check')} Unit-to-unit and riser leaks, with the affected ceilings and walls rebuilt</li>
        <li>${icon('check')} Vacant unit turnovers: remediate, rebuild, rent-ready</li>
        <li>${icon('check')} Basements, boiler rooms, storage and common areas</li>
        <li>${icon('check')} Commercial tenants: after-hours scheduling</li>
      </ul>
      <h2>How we work with you</h2>
      <p>One point of contact, clear scopes and invoices your accounting team can process. For portfolios, ask us about priority response and standing pricing for common scopes.</p>
    </div>
    <aside class="side">${licenseCard()}</aside>
  </div>
</section>
<section class="band band-ink"><div class="spores" aria-hidden="true"></div><div class="wrap narrow">${estimateForm({ source: 'property-managers', title: 'Set up a site visit or first job', dark: true })}</div></section>`;
  return page({
    path: '/property-managers/',
    title: 'Mold Remediation for NYC Property Managers & Landlords',
    description: 'Licensed mold remediation vendor for NYC landlords, property managers, co-ops and condos. 24/7 response, HPD/LL55 documentation, COIs, remediation + rebuild.',
    body,
    crumbs,
  });
}

// ---------------- INSURANCE ----------------
export function insurance() {
  const crumbs = [['Home', '/'], ['Mold & Insurance', '/insurance/']];
  const faqs = [
    ['Does homeowners insurance cover mold in New York?', 'Often only when the mold results from a sudden, covered water event, like a burst pipe or appliance failure. Mold from long-term leaks, humidity or lack of maintenance is commonly excluded, and many policies cap mold coverage. Check your policy’s water damage and mold sections.'],
    ['Does renters insurance cover mold?', 'Renters insurance may cover your damaged belongings from a covered water event. Mold in the building itself is usually the landlord’s responsibility.'],
    ['Do you bill insurance directly?', 'We work with all insurance carriers and provide the documentation adjusters need. Payment arrangements depend on your claim; we explain the options at the estimate.'],
  ];
  const faq = faqBlock(faqs, { title: 'Insurance FAQ' });
  const body = `
${hero(crumbs, 'Mold, water damage & insurance in NYC', 'When mold is covered, when it isn’t, and how to document your loss so your claim has the best chance. We work with all insurance carriers.', callBtns)}
<section class="band">
  <div class="wrap two-col">
    <article class="prose">
      <h2>The short version</h2>
      <p>Insurers usually care about <b>how the water got there</b>. Mold caused by a <b>sudden and accidental</b> water event is often covered as part of that water loss. Mold from <b>slow leaks, humidity or deferred maintenance</b> usually isn’t. Coverage limits for mold are often low, so good documentation matters.</p>
      <h2>Do this right away</h2>
      <ol class="mini-steps">
        <li><b>Stop the water</b> and prevent further damage. Most policies require you to do this.</li>
        <li><b>Photograph and video everything</b> before anything is removed.</li>
        <li><b>Call us for mitigation.</b> Drying quickly limits the loss (and what insurers can argue about).</li>
        <li><b>Open the claim</b> and keep a log of every call, name and claim number.</li>
      </ol>
      <h2>What we give your adjuster</h2>
      <ul class="ticks">
        <li>${icon('check')} Date-stamped photos of the damage and the source</li>
        <li>${icon('check')} Moisture readings and drying logs</li>
        <li>${icon('check')} Itemized scope: remediation and rebuild separated</li>
        <li>${icon('check')} Independent assessor documents, when the job requires them</li>
      </ul>
      <h2>If the leak came from a neighbor</h2>
      <p>In co-ops, condos and rentals, the neighbor’s or building’s insurance may be responsible. We document the source so you (or your insurer) can pursue it. More in our <a href="/guides/mold-from-upstairs-neighbor-leak/">upstairs-neighbor leak guide</a>.</p>
      <p class="fine">General information only. Your policy language controls. Ask your agent or a public adjuster about your specific coverage.</p>
    </article>
    <aside class="side sticky">${callbackForm({ source: 'insurance' })}</aside>
  </div>
</section>
${faq.html}
${ctaBand()}`;
  return page({ path: '/insurance/', title: 'Does Insurance Cover Mold Removal in NYC? | Claims Guide', description: 'When homeowners, condo and renters insurance covers mold in New York, what is excluded, and how to document water damage for a stronger claim. We work with all carriers.', body, crumbs, schema: [faq.schema] });
}

// ---------------- REVIEWS ----------------
export function reviewsPage() {
  const crumbs = [['Home', '/'], ['Reviews', '/reviews/']];
  const body = `
${hero(crumbs, '5.0 stars on Google. All of them.', `Every one of our ${B.google.reviewCount} Google reviews is five stars. Here are some of them in the customers’ own words; the full, unedited set is on our Google Business Profile.`, `<div class="hero-cta"><a class="btn btn-signal btn-lg" href="${B.google.profileUrl}" target="_blank" rel="noopener">${icon('google')} Read all ${B.google.reviewCount} reviews on Google</a></div>`)}
<section class="band">
  <div class="wrap">
    <div class="review-grid">${reviewCards(reviews, { limit: 20 })}</div>
    <p class="center fine">Reviews are shown as posted on Google; longer reviews are shortened here. <a href="${B.google.profileUrl}" target="_blank" rel="noopener">See them in full on Google</a>.</p>
  </div>
</section>
<section class="band band-paper">
  <div class="wrap narrow center">
    <h2>Already worked with us?</h2>
    <p>Reviews help other New Yorkers find a contractor they can trust. It takes a minute.</p>
    <a class="btn btn-ghost" href="${B.google.profileUrl}" target="_blank" rel="noopener">${icon('google')} Leave a Google review</a>
  </div>
</section>
${ctaBand()}`;
  return page({ path: '/reviews/', title: `Mold Remediation NYC Reviews | 5.0★ on Google (${B.google.reviewCount} Reviews)`, description: `Read what NYC homeowners, property managers and businesses say about Mold Remediation NYC. 5.0 stars across ${B.google.reviewCount} Google reviews.`, body, crumbs });
}

// ---------------- ABOUT ----------------
export function about() {
  const crumbs = [['Home', '/'], ['About', '/about/']];
  const body = `
${hero(crumbs, 'A Brooklyn crew that picks up the phone', `${B.name} is operated by ${B.legalName} from ${B.address.street} in Flatbush. We are locally owned, licensed, and open 24 hours, and our reviewers mention the owner, ${B.owner}, by name.`)}
<section class="band">
  <div class="wrap two-col">
    <article class="prose">
      <h2>What we believe</h2>
      <p><b>Fix the cause, not just the stain.</b> Mold is a moisture problem. If we remove mold and the leak is still there, we haven’t done the job. Every estimate starts with finding where the water comes from.</p>
      <p><b>Stay in our lane.</b> We don’t sell mold testing. New York separates the assessor from the remediator for a reason, and we think that protects you. We remove mold, dry buildings and rebuild rooms, and we do it well.</p>
      <p><b>Leave it better than we found it.</b> Our reviewers mention the same things over and over: we showed up on time, explained the work, and cleaned up. That is how we want to work.</p>
      <h2>Who we work for</h2>
      <ul class="dots cols">
        <li>Homeowners & co-op/condo owners</li><li>Landlords & property managers</li><li>Building owners & supers</li><li>Restaurants, retail & offices</li>
        <li>Schools & daycares</li><li>Healthcare facilities</li><li>General contractors</li><li>Real estate agents</li>
      </ul>
      <h2>Our sister company</h2>
      <p>For water, fire, smoke, storm and biohazard restoration, the same team runs <a href="${B.sister.url}" rel="noopener">${B.sister.name}</a>. This site is focused on mold.</p>
    </article>
    <aside class="side">${licenseCard()}<figure class="side-img">${img('crew', { sizes: '360px' })}</figure></aside>
  </div>
  <div class="wrap">${trustRow()}</div>
</section>
${reviewsBand({ limit: 6 })}
${ctaBand()}`;
  return page({ path: '/about/', title: 'About Mold Remediation NYC | Licensed, Local, Open 24 Hours', description: `Locally owned mold remediation company in Flatbush, Brooklyn (${B.legalName}). NYS-licensed, EPA Lead-Safe certified, 5.0★ on Google. Serving all five boroughs 24/7.`, body, crumbs, type: 'AboutPage' });
}

// ---------------- CONTACT ----------------
export function contact() {
  const crumbs = [['Home', '/'], ['Contact', '/contact/']];
  const body = `
${hero(crumbs, 'Contact Mold Remediation NYC', 'Call, send photos or request an estimate. We are open 24 hours a day, 7 days a week.')}
<section class="band">
  <div class="wrap contact-grid">
    <div class="contact-cards">
      <a class="c-card" href="${tel}" data-track="call">${icon('phone')}<span><small>Call 24/7</small><b>${B.phone}</b></span></a>
      <a class="c-card" href="mailto:${B.email}">${icon('mail')}<span><small>Email</small><b>${B.email}</b></span></a>
      <a class="c-card" href="${B.google.directions}" target="_blank" rel="noopener">${icon('pin')}<span><small>Office</small><b>${B.address.street}, ${B.address.city}, ${B.address.region} ${B.address.zip}</b></span></a>
      <div class="c-card">${icon('clock')}<span><small>Hours</small><b>${B.hours}</b></span></div>
      ${mapEmbed()}
    </div>
    ${estimateForm({ source: 'contact' })}
  </div>
</section>`;
  return page({ path: '/contact/', title: 'Contact Mold Remediation NYC | (347) 369-1545 · Open 24 Hours', description: `Contact Mold Remediation NYC at ${B.address.street}, Brooklyn, NY ${B.address.zip}. Call ${B.phone} any time, send photos, or request a free on-site estimate.`, body, crumbs, type: 'ContactPage' });
}

// ---------------- FAQ ----------------
export function faqPage() {
  const crumbs = [['Home', '/'], ['FAQ', '/faq/']];
  const groups = [
    ['Getting started', [
      ['Do you offer free mold inspections or testing?', 'We offer free on-site <b>estimates</b> for mold removal. We don’t do mold testing or formal assessments. Under New York law, jobs over 10 sq ft need an independent licensed assessor, and the same company can’t assess and remediate the same project. We can recommend independent assessors.'],
      ['How fast can you come out?', 'We answer 24/7. Emergencies with active water get priority; call and we will give you an arrival time.'],
      ['Can I get a quote from photos?', 'Yes. Use our <a href="/photo-quote/">photo quote</a> page. We review your photos and call with a ballpark, then confirm the price on site.'],
    ]],
    ['During the job', [
      ['Do I need to leave my home during remediation?', 'Usually not. The work area is sealed and kept under negative air pressure. We will tell you ahead of time if a room will be unusable, or if anyone in the household is especially sensitive and should stay elsewhere during demolition.'],
      ['How long does mold remediation take?', 'Most single-room jobs are done in 1–3 working days, plus drying and any required clearance. Larger jobs are scheduled in your estimate.'],
      ['Do you use chemicals?', 'We use EPA-registered antimicrobials on cleaned surfaces. Most of the work is physical: removing contaminated material and HEPA-cleaning what is left.'],
      ['Will the mold come back?', 'Not if the moisture source is fixed and materials are dried. That is why we start every job by finding the source.'],
    ]],
    ['Money & paperwork', [
      ['How much does it cost?', 'It depends on size, location and what has to be rebuilt. See our <a href="/cost/">cost guide and estimator</a> for typical NYC ranges.'],
      ['Do you work with insurance?', 'Yes, with all carriers. See <a href="/insurance/">mold &amp; insurance</a>.'],
      ['Are you licensed and insured?', `Yes. NYS Mold Remediation License #${B.licenses[0].number}, GC License #${B.licenses[2].number}, EPA Lead-Safe firm #${B.licenses[1].number}, and fully insured. COIs available for buildings.`],
    ]],
    ['Renters & buildings', [
      ['I rent. Who is responsible for mold?', 'Generally the building owner, under NYC Local Law 55. See our <a href="/nyc-mold-law/">NYC mold law guide</a> for how to report it.'],
      ['Do you work in co-ops and condos?', 'All the time. We handle alteration agreements, COIs and building work-hour rules.'],
    ]],
  ];
  const all = groups.flatMap((g) => g[1]);
  const schema = faqBlock(all).schema;
  const body = `
${hero(crumbs, 'Mold removal FAQ', 'Straight answers about mold remediation in New York City: process, pricing, law, insurance and what to expect.')}
<section class="band">
  <div class="wrap narrow">
    ${groups.map(([t, qs]) => `<h2 class="h3 faq-group">${esc(t)}</h2><div class="faq">${qs.map(([q, a]) => `<details><summary>${esc(q)}</summary><div><p>${a}</p></div></details>`).join('')}</div>`).join('')}
  </div>
</section>
${ctaBand({ title: 'Still have a question?', text: 'Call us. You’ll talk to someone who has done this for years, not a call center.' })}`;
  return page({ path: '/faq/', title: 'Mold Remediation FAQ | NYC Mold Removal Questions Answered', description: 'Answers about mold removal in NYC: free estimates, testing, how long it takes, cost, insurance, tenant rights, co-ops and condos, and NY licensing.', body, crumbs, schema: [schema], type: 'FAQPage' });
}

export function privacy() {
  const crumbs = [['Home', '/'], ['Privacy', '/privacy/']];
  const body = `
${hero(crumbs, 'Privacy policy', 'Short and plain.')}
<section class="band"><div class="wrap narrow prose">
  <p><b>What we collect.</b> When you submit a form, we receive what you type (name, phone, email, ZIP, details) and any photos you upload. Forms are processed by our host, Netlify.</p>
  <p><b>How we use it.</b> Only to contact you about your request, prepare your estimate, and do the work. We don’t sell or rent your information.</p>
  <p><b>Photos.</b> Uploaded photos are used only to prepare your estimate and document your job.</p>
  <p><b>Analytics.</b> We may use privacy-respecting analytics to understand which pages help people. No data is sold.</p>
  <p><b>Your choices.</b> To have your information deleted, email <a href="mailto:${B.email}">${B.email}</a>.</p>
  <p class="fine">${B.legalName} d/b/a ${B.name}, ${B.address.street}, ${B.address.city}, ${B.address.region} ${B.address.zip}.</p>
</div></section>`;
  return page({ path: '/privacy/', title: 'Privacy Policy | Mold Remediation NYC', description: 'How Mold Remediation NYC handles information you submit through this website.', body, crumbs });
}

export function notFound() {
  const body = `
<section class="page-hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap narrow center">
    <p class="label center"><span>404</span>Page not found</p>
    <h1>This page got remediated.</h1>
    <p class="lede">We couldn’t find what you were looking for. Try one of these:</p>
    <div class="hero-cta center"><a class="btn btn-signal btn-lg" href="/">Home</a><a class="btn btn-light btn-lg" href="/mold-removal/">Services</a><a class="btn btn-light btn-lg" href="${tel}">${icon('phone')} ${B.phone}</a></div>
  </div>
</section>`;
  return page({ path: '/404.html', title: 'Page Not Found | Mold Remediation NYC', description: 'Page not found.', body, noindex: true });
}
