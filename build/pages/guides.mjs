import { business as B } from '../data/business.mjs';
import { page, icon, tel, esc, breadcrumbsNav, abs, businessId } from '../lib/html.mjs';
import { callbackForm, ctaBand, sectionLabel } from '../lib/components.mjs';

const PUBLISHED = '2026-09-28';

export const guides = [
  {
    slug: 'mold-after-water-leak-timeline',
    title: 'Mold After a Leak: The 48-Hour Timeline (and What to Do Each Hour)',
    h1: 'Mold after a water leak: what happens in the first 48 hours',
    description: 'How fast does mold grow after a leak or flood? A timeline from hour 0 to week 3, and exactly what to do at each stage to avoid mold remediation.',
    kicker: 'Water damage',
    read: 5,
    html: `
<p>Most mold jobs we see started as a water problem that looked handled. Someone mopped the floor, ran a fan, and the wall looked dry by the weekend. Three weeks later there was a musty smell and spots along the baseboard. Here is what is happening inside your walls, and what to do at each stage.</p>
<h2>Hour 0–6: stop the water, protect the evidence</h2>
<ul><li>Shut the supply valve (under the sink, behind the toilet, or the apartment’s main), or get the super to.</li><li>Turn off power to wet areas if it is safe to do so.</li><li>Photograph and video everything: the source, the water line, damaged items. Your insurer and landlord will want it.</li><li>Move furniture, rugs and boxes off wet floors.</li></ul>
<h2>Hour 6–24: extraction and real drying</h2>
<p>Surface water is the easy part. The problem is the water that soaked into drywall, insulation, subfloor and carpet pad. Household fans dry the surface and leave the inside wet. Professional drying uses <b>commercial dehumidifiers, air movers and moisture meters</b> to bring materials back to normal readings, and sometimes small holes at the bottom of walls to vent the cavity.</p>
<h2>Hour 24–48: the window closes</h2>
<p>The EPA’s guidance is that mold can start growing on damp materials within <b>24 to 48 hours</b>. Paper-faced drywall, cardboard, carpet pad and dusty wood are ideal food. You won’t see anything yet. If materials aren’t drying by now, they probably need to come out.</p>
<h2>Day 3–7: colonies</h2>
<p>A musty smell, small spots at baseboards and inside cabinets. Water wicks upward in drywall, so growth often shows up higher than you expect. This is now a mold job, but still a small one if you act.</p>
<h2>Week 1–3: hidden spread</h2>
<p>Growth moves through cavities, behind cabinets and under flooring. Many jobs pass <b>10 square feet</b> at this stage, which in New York means an independent licensed assessor and a licensed remediator are required (<a href="/nyc-mold-law/">here’s why</a>).</p>
<h2>The takeaway</h2>
<p>Drying costs a fraction of remediation. If you had water in the last 48 hours, <a href="${tel}">call us at ${B.phone}</a>. We answer 24 hours a day. Or try the interactive <a href="/#clock-h">mold clock</a> on our homepage.</p>`,
  },
  {
    slug: 'black-mold-vs-mildew',
    title: 'Black Mold vs. Mildew: How to Tell the Difference (NYC Guide)',
    h1: 'Black mold vs. mildew: how to tell what you have',
    description: 'Is it mildew you can wipe off or mold that needs remediation? How to tell the difference by look, smell, surface and whether it comes back, plus when to call a pro.',
    kicker: 'Identification',
    read: 4,
    html: `
<p>“Mildew” and “mold” are both fungi. What matters for you is where it is growing and how deep it goes. Here’s a practical way to tell a cleaning job from a remediation job.</p>
<h2>Mildew usually…</h2>
<ul><li>Is flat and powdery, gray, white or light brown.</li><li>Sits on the <b>surface</b> of non-porous or sealed materials: tile, grout, glass, tub caulk, shower curtains.</li><li>Wipes off with a household cleaner and stays gone for a while if you ventilate.</li></ul>
<h2>Mold that needs remediation usually…</h2>
<ul><li>Is fuzzy, slimy or blotchy, black, green, or sometimes orange or pink.</li><li>Grows <b>in</b> porous materials: drywall, plaster paint, wood, carpet, insulation.</li><li>Comes back in the same place after cleaning or painting.</li><li>Comes with a musty smell, stains, bubbling paint or soft drywall.</li></ul>
<h2>What about “toxic black mold”?</h2>
<p>You can’t identify a mold species by color. Many dark molds aren’t <i>Stachybotrys</i>, and some light ones are problems too. For health and property, the advice is the same: indoor mold growth should be removed and the moisture fixed. If you need the species identified, an <b>independent mold assessor</b> can sample it. We don’t test (<a href="/nyc-mold-law/">here’s why</a>).</p>
<h2>A quick test you can do</h2>
<p>Dab a drop of diluted household bleach on the spot (with ventilation and gloves). If it lightens within a minute or two and doesn’t come back after cleaning, it is likely surface mildew. If it returns, or the material underneath is soft or stained, there is moisture in the material.</p>
<h2>When to call</h2>
<p>If it’s bigger than a doormat, keeps coming back, or follows a leak, it’s a remediation job. Try our <a href="/mold-risk-check/">60-second Mold Risk Check</a> or <a href="/photo-quote/">send us photos</a>.</p>`,
  },
  {
    slug: 'mold-from-upstairs-neighbor-leak',
    title: 'Mold From an Upstairs Neighbor’s Leak (NYC): Who Pays?',
    h1: 'Mold from an upstairs neighbor’s leak: who pays and what to do',
    description: 'Ceiling stain from the apartment above? What NYC renters, co-op and condo owners should do, who is usually responsible, and how to document the leak and mold.',
    kicker: 'Co-ops, condos & rentals',
    read: 6,
    html: `
<p>It’s the most New York mold problem there is. A tub overflows, a shower pan fails or a toilet seal leaks upstairs, and a brown ring shows up on your bathroom ceiling. Mold grows on the top side of your ceiling drywall, where you can’t see it. Here’s how to handle it.</p>
<h2>Step 1: stop the source</h2>
<p>Knock on the door, then call the super or managing agent. Until the leak upstairs is fixed, any work on your ceiling will just get wet again.</p>
<h2>Step 2: document everything</h2>
<ul><li>Date-stamped photos and video of the stain, any dripping, and damaged belongings.</li><li>Written notice (email or text) to your landlord, managing agent or board, and the upstairs owner if you know them.</li><li>A log of who you spoke to and when.</li></ul>
<h2>Step 3: who is responsible?</h2>
<p><b>If you rent:</b> repairs to the building, including your ceiling and mold remediation, are generally the <b>landlord’s</b> responsibility. If it isn’t fixed, call 311 (see our <a href="/nyc-mold-law/">NYC mold law guide</a>).</p>
<p><b>Co-ops:</b> the proprietary lease and house rules usually split responsibility between the co-op (building elements, common pipes) and shareholders (fixtures and anything inside their unit). The upstairs shareholder or their HO-6 policy may be responsible if their fixture leaked.</p>
<p><b>Condos:</b> the bylaws define what is common element and what is unit. Often the unit owner whose fixture leaked, or their insurer, is responsible for damage below.</p>
<p>In practice, your own insurer may pay and then go after the responsible party. Talk to your agent early.</p>
<h2>Step 4: remediation and repair</h2>
<p>We contain the room, open the ceiling where it is wet, remove moldy drywall and insulation, dry and treat the framing, and rebuild with moisture-resistant board and paint. We give you photos and a scope showing the source, which is what every party’s insurer will ask for. <a href="/mold-removal/bathroom/">More on bathroom mold removal</a>.</p>`,
  },
  {
    slug: 'stay-home-during-mold-remediation',
    title: 'Can You Stay Home During Mold Remediation? (What to Expect)',
    h1: 'Can you stay home during mold remediation?',
    description: 'Most NYC families can stay home during mold remediation. How containment works, who should leave, noise and dust expectations, and how to prepare your apartment.',
    kicker: 'What to expect',
    read: 4,
    html: `
<p>In most cases, yes. Professional remediation is designed so the rest of your home stays clean while the affected area is worked on. Here’s what that looks like and when leaving makes sense.</p>
<h2>How containment protects the rest of your home</h2>
<ul><li><b>Plastic walls and zipper doors</b> seal the work area off.</li><li><b>HEPA air scrubbers</b> run inside, venting filtered air, so air flows <i>into</i> the containment, not out.</li><li>Debris is bagged inside the containment before it’s carried out.</li></ul>
<h2>Who should consider staying elsewhere during demolition</h2>
<p>People with asthma, severe allergies or weakened immune systems, newborns, and anyone a doctor has advised to avoid dust. Usually this only matters on the day or two of removal. We will tell you in advance which days those are.</p>
<h2>What to expect day to day</h2>
<ul><li><b>Noise:</b> air scrubbers and dehumidifiers run around the clock during drying. Cutting drywall happens during building-permitted hours.</li><li><b>Access:</b> the contained room is off-limits until we remove the containment.</li><li><b>Bathrooms & kitchens:</b> if it’s your only bathroom, we plan around it.</li></ul>
<h2>How to prepare</h2>
<ol><li>Clear a path from the door to the work area.</li><li>Remove valuables and fragile items from the room if you can do so without disturbing the moldy area.</li><li>Tell your super or managing agent; many buildings need a COI and elevator booking.</li><li>Keep pets away from the work area.</li></ol>
<p>Questions? <a href="${tel}">Call ${B.phone}</a>, 24/7, or read <a href="/how-it-works/">how remediation works</a>.</p>`,
  },
];

export function guidesHub() {
  const crumbs = [['Home', '/'], ['Guides', '/guides/']];
  const body = `
<section class="page-hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap">${breadcrumbsNav(crumbs)}<h1>Mold guides for New Yorkers</h1><p class="lede">Practical, specific, no scare tactics. Written by the people who open up NYC walls every week.</p></div>
</section>
<section class="band">
  <div class="wrap">
    <div class="tools">
      ${guides.map((g) => `<a class="tool" href="/guides/${g.slug}/"><span class="tool-k">${esc(g.kicker)} · ${g.read} min</span><h2 class="h3">${esc(g.h1)}</h2><p>${esc(g.description)}</p><span class="svc-go">Read ${icon('arrow')}</span></a>`).join('')}
      <a class="tool" href="/nyc-mold-law/"><span class="tool-k">Law · 7 min</span><h2 class="h3">NYC mold law in plain English</h2><p>Local Law 55 and NY Article 32: tenant rights, landlord duties and the 10 sq ft rule.</p><span class="svc-go">Read ${icon('arrow')}</span></a>
      <a class="tool" href="/cost/"><span class="tool-k">Pricing · 5 min</span><h2 class="h3">How much does mold removal cost in NYC?</h2><p>Typical ranges, what drives the price, and an instant estimator.</p><span class="svc-go">Read ${icon('arrow')}</span></a>
    </div>
  </div>
</section>
${ctaBand()}`;
  return page({ path: '/guides/', title: 'Mold Guides for NYC Homes & Apartments | Mold Remediation NYC', description: 'Practical mold guides for New Yorkers: leaks and the 48-hour window, mold vs. mildew, upstairs-neighbor leaks, staying home during remediation, costs and NYC mold law.', body, crumbs });
}

export function guidePage(g) {
  const path = `/guides/${g.slug}/`;
  const crumbs = [['Home', '/'], ['Guides', '/guides/'], [g.h1, path]];
  const others = guides.filter((x) => x.slug !== g.slug);
  const body = `
<section class="page-hero">
  <div class="spores" aria-hidden="true"></div>
  <div class="wrap narrow">${breadcrumbsNav(crumbs)}<p class="eyebrow">${esc(g.kicker)} · ${g.read} min read</p><h1>${esc(g.h1)}</h1><p class="byline">By the ${B.name} crew · Updated <time datetime="${PUBLISHED}">September 2026</time></p></div>
</section>
<section class="band">
  <div class="wrap two-col">
    <article class="prose">${g.html}</article>
    <aside class="side sticky">${callbackForm({ source: `guide:${g.slug}`, title: 'Talk to a licensed pro' })}
      <div class="side-box"><p class="h4">More guides</p><ul class="stack-links">${others.map((o) => `<li><a href="/guides/${o.slug}/">${esc(o.h1)}</a></li>`).join('')}</ul></div>
    </aside>
  </div>
</section>
${ctaBand()}`;
  return page({
    path,
    title: g.title,
    description: g.description,
    body,
    crumbs,
    schema: [{
      '@type': 'Article', headline: g.h1, description: g.description, datePublished: PUBLISHED, dateModified: PUBLISHED,
      author: { '@type': 'Organization', name: B.name, url: B.url + '/' }, publisher: { '@id': businessId },
      mainEntityOfPage: abs(path), image: abs('/og.png'),
    }],
  });
}
