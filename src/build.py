#!/usr/bin/env python3
"""Static site generator for axecontracting.org.

    python3 src/build.py

Writes the whole site to ./public (committed, served as-is by DigitalOcean).
No dependencies beyond the Python standard library (Pillow is optional and
only used to render og-image.png / icons).
"""

import datetime as dt
import html
import json
import shutil
import sys
from pathlib import Path

SRC = Path(__file__).resolve().parent
ROOT = SRC.parent
OUT = ROOT / "public"
sys.path.insert(0, str(SRC))

from config import BUSINESS as B, FORM_ENDPOINT, SITE_URL  # noqa: E402
from content.areas import AREAS, BY_SLUG as AREA, SHORES, SIR_STOPS, TRANSFERS  # noqa: E402
from content.guides import GUIDES, PUBLISHED  # noqa: E402
from content.reviews import REVIEWS, for_service  # noqa: E402
from content.services import BY_SLUG as SVC, GROUPS, SERVICES  # noqa: E402
from drawings import drawing, hero_house  # noqa: E402

BUILD_DATE = dt.date.today().isoformat()
ASSET_V = dt.datetime.now().strftime("%Y%m%d%H%M")
PAGES = []  # (path, priority) for the sitemap
TEL = f'tel:{B["phone_e164"]}'
e = html.escape

SVC_DRAW = {s["slug"]: s["drawing"] for s in SERVICES}


# ============================================================ schema.org


def business_node():
    addr = {"@type": "PostalAddress", "addressLocality": B["city"], "addressRegion": B["region"], "addressCountry": B["country"]}
    if B["street"]:
        addr["streetAddress"] = B["street"]
        addr["postalCode"] = B["postal_code"]
    node = {
        "@type": "GeneralContractor",
        "@id": f"{SITE_URL}/#business",
        "name": B["name"],
        "slogan": B["tagline"],
        "url": f"{SITE_URL}/",
        "telephone": B["phone_e164"],
        "email": B["email"],
        "image": f"{SITE_URL}/og-image.png",
        "logo": f"{SITE_URL}/assets/logo-512.png",
        "address": addr,
        "openingHoursSpecification": [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": B["hours_days"], "opens": B["opens"], "closes": B["closes"]}
        ],
        "areaServed": [
            {"@type": "City", "name": "Staten Island", "sameAs": "https://en.wikipedia.org/wiki/Staten_Island"},
            {"@type": "City", "name": "Brooklyn", "sameAs": "https://en.wikipedia.org/wiki/Brooklyn"},
            {"@type": "City", "name": "Manhattan", "sameAs": "https://en.wikipedia.org/wiki/Manhattan"},
        ],
        "sameAs": [B["google_profile"]],
        "knowsAbout": [s["service_type"] for s in SERVICES],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Construction and home improvement services",
            "itemListElement": [
                {"@type": "Offer", "itemOffered": {"@type": "Service", "name": s["name"], "url": f"{SITE_URL}/services/{s['slug']}/"}}
                for s in SERVICES
            ],
        },
    }
    if B["street"]:
        node["geo"] = {"@type": "GeoCoordinates", "latitude": B["lat"], "longitude": B["lng"]}
    if B["hic_license"]:
        node["hasCredential"] = {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "license",
            "name": f"NYC DCWP Home Improvement Contractor License #{B['hic_license']}",
            "recognizedBy": {"@type": "GovernmentOrganization", "name": "NYC Department of Consumer and Worker Protection"},
        }
    return node


def website_node():
    return {
        "@type": "WebSite",
        "@id": f"{SITE_URL}/#website",
        "url": f"{SITE_URL}/",
        "name": B["name"],
        "inLanguage": "en-US",
        "publisher": {"@id": f"{SITE_URL}/#business"},
    }


def breadcrumb_node(url, crumbs):
    return {
        "@type": "BreadcrumbList",
        "@id": f"{url}#breadcrumb",
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1, "name": name, "item": f"{SITE_URL}{href}"} for i, (name, href) in enumerate(crumbs)
        ],
    }


def faq_node(url, faqs):
    return {
        "@type": "FAQPage",
        "@id": f"{url}#faq",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs
        ],
    }


def service_node(url, s):
    return {
        "@type": "Service",
        "@id": f"{url}#service",
        "name": s["name"],
        "serviceType": s["service_type"],
        "description": s["description"],
        "url": url,
        "provider": {"@id": f"{SITE_URL}/#business"},
        "areaServed": [{"@type": "City", "name": n} for n in ("Staten Island", "Brooklyn", "Manhattan")],
    }


# ============================================================ fragments


def icon(name):
    paths = {
        "phone": '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
        "arrow": '<path d="M5 12h14M13 6l6 6-6 6"/>',
        "check": '<path d="M4 12l5 5L20 6"/>',
        "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
        "theme": '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16z" fill="currentColor"/>',
        "star": '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    }
    return f'<svg class="i" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{paths[name]}</svg>'


LOGO = (
    '<svg class="logo__mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">'
    '<rect x="1.5" y="1.5" width="45" height="45" fill="none" stroke="currentColor" stroke-width="3"/>'
    '<path d="M10 38 L24 10 L38 38" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="miter"/>'
    '<path d="M16 28 H32" stroke="var(--accent)" stroke-width="4"/>'
    "</svg>"
)

NAV = [
    ("Services", "/services/"),
    ("Areas", "/areas/"),
    ("Projects", "/projects/"),
    ("Reviews", "/reviews/"),
    ("Guides", "/guides/"),
    ("About", "/about/"),
]


def header(path):
    items = []
    for label, href in NAV:
        cur = ' aria-current="page"' if path == href or (href != "/" and path.startswith(href)) else ""
        items.append(f'<li><a href="{href}"{cur}>{label}</a></li>')
    return f"""
<a class="skip" href="#main">Skip to content</a>
<header class="hdr">
  <div class="hdr__in">
    <a class="logo" href="/" aria-label="{e(B['name'])} home">{LOGO}<span class="logo__word">AXE<small>Contracting Group</small></span></a>
    <nav class="nav" id="nav" aria-label="Main">
      <ul>{''.join(items)}</ul>
      <a class="nav__tel" href="{TEL}">{icon('phone')} {B['phone_display']}</a>
    </nav>
    <div class="hdr__act">
      <button class="iconbtn" type="button" data-theme-toggle aria-label="Switch between vellum and blueprint theme" title="Vellum / Blueprint">{icon('theme')}</button>
      <a class="btn btn--ghost hdr__tel" href="{TEL}">{icon('phone')}<span>{B['phone_display']}</span></a>
      <a class="btn" href="/contact/">Free estimate</a>
      <button class="iconbtn menu" type="button" aria-expanded="false" aria-controls="nav" aria-label="Open menu">{icon('menu')}</button>
    </div>
  </div>
</header>"""


def title_block(sheet, project):
    lic = f'<div class="tb__row"><span>LIC.</span><b>DCWP HIC #{e(B["hic_license"])}</b></div>' if B["hic_license"] else ""
    return f"""
<aside class="tb" aria-label="Contact {e(B['name'])}">
  <div class="tb__brand">{LOGO}<div><b>AXE</b><span>Contracting Group</span></div></div>
  <div class="tb__row"><span>PROJECT</span><b>{e(project)}</b></div>
  <div class="tb__grid">
    <div class="tb__row"><span>SHEET</span><b class="tb__sheet">{sheet}</b></div>
    <div class="tb__row"><span>REV.</span><b>{BUILD_DATE[:7]}</b></div>
  </div>
  <div class="tb__row"><span>BOROUGHS</span><b>Staten Island · Brooklyn · Manhattan</b></div>
  {lic}
  <div class="tb__cta">
    <span class="tb__label">Call the office</span>
    <a class="tb__phone" href="{TEL}">{B['phone_display']}</a>
    <span class="tb__hours">{B['hours_display']}</span>
    <a class="btn btn--block" href="/contact/">Request an estimate {icon('arrow')}</a>
  </div>
  <div class="tb__row tb__ins"><span>NOTE</span><b>Insured. COIs issued for condo &amp; co-op buildings.</b></div>
</aside>"""


def footer():
    svc_cols = ""
    for gkey, glabel, _ in GROUPS:
        links = "".join(f'<li><a href="/services/{s["slug"]}/">{e(s["short"])}</a></li>' for s in SERVICES if s["group"] == gkey)
        svc_cols += f'<div><h3>{glabel}</h3><ul>{links}</ul></div>'
    areas = "".join(f'<li><a href="{a["path"]}">{e(a["name"])}</a></li>' for a in AREAS)
    lic = f'<p>NYC DCWP Home Improvement Contractor License #{e(B["hic_license"])}</p>' if B["hic_license"] else ""
    addr = f'{e(B["street"])}, ' if B["street"] else ""
    return f"""
<section class="cta-band" aria-labelledby="cta-h">
  <div class="cta-band__in">
    <p class="kicker">Next sheet: yours</p>
    <h2 id="cta-h">Tell us what you're building.</h2>
    <p>Walkthrough, written quote, clear schedule. Staten Island, Brooklyn and Manhattan.</p>
    <div class="cta-band__act">
      <a class="btn btn--lg" href="/contact/">Request a free estimate {icon('arrow')}</a>
      <a class="btn btn--lg btn--ghost" href="{TEL}">{icon('phone')} {B['phone_display']}</a>
    </div>
  </div>
</section>
<footer class="ftr">
  <div class="ftr__in">
    <div class="ftr__brand">
      <a class="logo" href="/">{LOGO}<span class="logo__word">AXE<small>Contracting Group</small></span></a>
      <p>General contractor based on Staten Island, NY. Roofing, remodeling, painting, pavers and more.</p>
      <address>
        <a href="{TEL}">{B['phone_display']}</a><br>
        <a href="mailto:{B['email']}">{B['email']}</a><br>
        {addr}{B['city']}, {B['region']}<br>
        {B['hours_display']}
      </address>
      <p><a class="ftr__g" href="{B['google_profile']}" rel="noopener" target="_blank">{icon('star')} Read &amp; leave Google reviews</a></p>
    </div>
    {svc_cols}
    <div><h3>Areas</h3><ul>{areas}</ul></div>
    <div><h3>Company</h3><ul>
      <li><a href="/about/">About</a></li><li><a href="/projects/">Projects</a></li><li><a href="/reviews/">Reviews</a></li>
      <li><a href="/guides/">Guides</a></li><li><a href="/contact/">Contact</a></li><li><a href="/privacy/">Privacy</a></li>
    </ul></div>
  </div>
  <div class="ftr__base">
    <p>© {dt.date.today().year} {e(B['name'])}. All rights reserved.</p>
    {lic}
    <p class="mono">SHEET SET REV. {BUILD_DATE}</p>
  </div>
</footer>
<div class="mbar" aria-label="Quick contact">
  <a href="{TEL}">{icon('phone')} Call</a>
  <a href="/contact/" class="mbar__go">Free estimate {icon('arrow')}</a>
</div>"""


def crumbs_html(crumbs):
    lis = []
    for i, (name, href) in enumerate(crumbs):
        if i == len(crumbs) - 1:
            lis.append(f'<li aria-current="page">{e(name)}</li>')
        else:
            lis.append(f'<li><a href="{href}">{e(name)}</a></li>')
    return f'<nav class="crumbs" aria-label="Breadcrumb"><ol>{"".join(lis)}</ol></nav>'


class Sec:
    """Numbered section header: the circled callout bubble."""

    def __init__(self, sheet):
        self.n = 0
        self.sheet = sheet

    def __call__(self, title, kicker="", hid=None, intro=""):
        self.n += 1
        hid = hid or f"s{self.n}"
        k = f'<p class="kicker">{kicker}</p>' if kicker else ""
        i = f'<p class="sec__intro">{intro}</p>' if intro else ""
        return (
            f'<div class="sec__head"><span class="bub" aria-hidden="true"><b>{self.n:02d}</b><i>{self.sheet}</i></span>'
            f'<div>{k}<h2 id="{hid}">{title}</h2>{i}</div></div>'
        )


def page_head(sheet, kicker, h1, lede, extra=""):
    return f"""
<header class="ph">
  <p class="ph__sheet"><span>SHEET {sheet}</span><span>{kicker}</span></p>
  <h1>{h1}</h1>
  <p class="lede">{lede}</p>
  {extra}
</header>"""


def cta_pair(label="Get a free estimate"):
    return (
        f'<div class="btns"><a class="btn btn--lg" href="/contact/">{label} {icon("arrow")}</a>'
        f'<a class="btn btn--lg btn--ghost" href="{TEL}">{icon("phone")} {B["phone_display"]}</a></div>'
    )


def signoff(r, i=0):
    svc = next((SVC[s] for s in r["services"] if s in SVC), None)
    link = f'<a class="so__link" href="/services/{svc["slug"]}/">{e(svc["short"])} {icon("arrow")}</a>' if svc else ""
    rot = [-6, 4, -3, 7, -5, 3][i % 6]
    return f"""
<figure class="so">
  <div class="so__hole" aria-hidden="true"></div>
  <div class="so__meta"><span>ITEM</span><b>{e(r['tag'])}</b></div>
  <blockquote><p>{e(r['text'])}</p></blockquote>
  <figcaption><span class="so__by">SIGNED OFF BY</span> <cite>{e(r['name'])}</cite> <span class="so__src">· Google review</span></figcaption>
  {link}
  <span class="stamp" style="--r:{rot}deg" aria-hidden="true">APPROVED</span>
</figure>"""


def faq_html(faqs):
    items = "".join(
        f'<details class="faq__i"><summary><span class="faq__q">{e(q)}</span><span class="faq__x" aria-hidden="true"></span></summary><div class="faq__a"><p>{e(a)}</p></div></details>'
        for q, a in faqs
    )
    return f'<div class="faq">{items}</div>'


def sir_diagram(active=None):
    shores = {"north-shore": "North Shore", "east-shore": "East Shore", "south-shore": "South Shore", "mid-island": "Mid-Island"}
    lis = []
    prev = None
    for name, shore in SIR_STOPS:
        if shore != prev:
            lis.append(f'<li class="sir__sep" data-shore="{shore}" aria-hidden="true">{shores[shore]}</li>')
            prev = shore
        on = " is-on" if active == shore else ""
        lis.append(
            f'<li class="sir__stop{on}" data-shore="{shore}"><a href="/areas/staten-island/{shore}/"><i aria-hidden="true"></i><span>{e(name)}</span></a></li>'
        )
    # brackets under the line, desktop only
    spans, col = [], 1
    for shore in ("north-shore", "east-shore", "south-shore"):
        n = sum(1 for _, s in SIR_STOPS if s == shore)
        on = " is-on" if active == shore else ""
        spans.append(f'<a class="sir__br{on}" style="grid-column:{col} / span {n}" href="/areas/staten-island/{shore}/">{shores[shore]}</a>')
        col += n
    xfers = ""
    for shore, label, hoods in TRANSFERS:
        on = " is-on" if active == shore else ""
        xfers += f'<a class="sir__x{on}" href="/areas/staten-island/{shore}/"><span class="sir__xl">⇄ {label}</span><span>{" · ".join(e(h) for h in hoods)}</span></a>'
    return f"""
<div class="sir" data-active="{active or ''}">
  <p class="sir__title"><span class="sir__bul">SIR</span> St. George → Tottenville <span class="mono">· we stop at every station</span></p>
  <ol class="sir__line" aria-label="Staten Island Railway stations we serve">{''.join(lis)}</ol>
  <div class="sir__brs" style="grid-template-columns:repeat({len(SIR_STOPS)},1fr)">{''.join(spans)}</div>
  <div class="sir__xs">{xfers}</div>
</div>"""


def gantt():
    steps = [
        ("01", "Call &amp; walkthrough", "We visit, measure, and listen. Usually within a few days of your call.", 1, 2),
        ("02", "Written quote", "Itemized scope and price, typically a day or two after the visit.", 2, 2),
        ("03", "Paperwork &amp; scheduling", "Permits where required, condo/co-op COIs, materials ordered, dates locked.", 3, 3),
        ("04", "Build", "One crew lead, licensed trades where required, clean site every day.", 5, 5),
        ("05", "Walkthrough &amp; sign-off", "We walk the finished job with you and close out the punch list.", 9, 2),
    ]
    rows = ""
    for n, t, d, start, span in steps:
        rows += f"""
<li class="gantt__row">
  <div class="gantt__label"><span class="mono">{n}</span><b>{t}</b><p>{d}</p></div>
  <div class="gantt__track"><span class="gantt__bar" style="grid-column:{start} / span {span}"></span></div>
</li>"""
    cols = "".join(f"<span>{c}</span>" for c in ["WK 1", "", "", "WK 2", "", "", "WK 3", "", "", "→"])
    return f'<div class="gantt"><div class="gantt__cols" aria-hidden="true"><span></span><div>{cols}</div></div><ol>{rows}</ol><p class="gantt__note mono">Durations are illustrative. Your quote includes a schedule for your job.</p></div>'


def sheet_index(compact=False):
    out = ""
    for gkey, glabel, gdesc in GROUPS:
        rows = ""
        for s in (s for s in SERVICES if s["group"] == gkey):
            rows += f"""
<li><a class="idx__row" href="/services/{s['slug']}/">
  <span class="idx__no">{s['sheet']}</span>
  <span class="idx__t">{e(s['name'])}</span>
  <span class="idx__d">{e(s['lede'])}</span>
  <span class="idx__go" aria-hidden="true">{icon('arrow')}</span>
</a></li>"""
        out += f'<div class="idx__grp"><h3 class="idx__h"><span>{glabel}</span><small>{gdesc}</small></h3><ul class="idx">{rows}</ul></div>'
    return f'<div class="idx__wrap" role="region" aria-label="Services">{out}</div>'


def notes(items):
    lis = "".join(f'<li><b>{t}</b><p>{d}</p></li>' for t, d in items)
    return f'<ol class="notes">{lis}</ol>'


GENERAL_NOTES = [
    ("One contractor, every trade.", "Roofing, carpentry, tile, paint and pavers by our crew. Licensed electricians and plumbers coordinated under the same contract and schedule."),
    ("We answer the phone.", "“When I first called Angel answered to me and since then he has always been calling to make sure that everything is fine.” (Elvi J.)"),
    ("Paperwork handled.", "Condo and co-op COIs, building rules, and permits where the work requires them. “He handled all the condo COI insurance requirements smoothly.” (Ying L.)"),
    ("Fair, written pricing.", "Itemized quotes with no surprises. Reviewers call it “reasonable,” “super fair” and “within budget.”"),
    ("Clean, serious crews.", "“Very serious people, clean job.” (Donny S.) Job sites are protected while we work and swept when we leave."),
    ("Trusted by other trades.", "“When AXE is on the job, we know the project will run smoothly.” (Murra Electric, licensed electrical contractor)"),
]


def related_links(slugs):
    items = "".join(
        f'<li><a href="/services/{s}/"><span class="mono">{SVC[s]["sheet"]}</span> {e(SVC[s]["name"])} {icon("arrow")}</a></li>' for s in slugs
    )
    return f'<ul class="rel">{items}</ul>'


def area_links(current=None):
    items = "".join(
        f'<li><a href="{a["path"]}"{" aria-current=\"page\"" if a["slug"] == current else ""}><span class="mono">{a["sheet"]}</span> {e(a["name"])}</a></li>'
        for a in AREAS
    )
    return f'<ul class="chips">{items}</ul>'


# ============================================================ page writer


def write_page(path, *, title, description, body, sheet, project, crumbs=None, schema=None, noindex=False, priority=0.6, page_type="WebPage", og_type="website", body_class=""):
    url = f"{SITE_URL}{path}" if path != "/404.html" else f"{SITE_URL}/404.html"
    graph = [business_node(), website_node()]
    webpage = {
        "@type": page_type,
        "@id": f"{url}#webpage",
        "url": url,
        "name": title,
        "description": description,
        "isPartOf": {"@id": f"{SITE_URL}/#website"},
        "about": {"@id": f"{SITE_URL}/#business"},
        "inLanguage": "en-US",
        "dateModified": BUILD_DATE,
        "primaryImageOfPage": f"{SITE_URL}/og-image.png",
    }
    if crumbs:
        graph.append(breadcrumb_node(url, crumbs))
        webpage["breadcrumb"] = {"@id": f"{url}#breadcrumb"}
    graph.append(webpage)
    graph += schema or []
    ld = json.dumps({"@context": "https://schema.org", "@graph": graph}, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
    robots = "noindex, follow" if noindex else "index, follow, max-image-preview:large"
    crumbs_block = crumbs_html(crumbs) if crumbs else ""
    doc = f"""<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(description)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="{robots}">
<meta name="theme-color" content="#F3EFE6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0F2E52" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="{e(B['name'])}">
<meta property="og:locale" content="en_US">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(description)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{SITE_URL}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{e(B['name'])}: general contractor on Staten Island, NY">
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="US-NY">
<meta name="geo.placename" content="Staten Island">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap">
<link rel="stylesheet" href="/assets/site.css?v={ASSET_V}">
<script>try{{var t=localStorage.getItem('axe-theme');if(t)document.documentElement.dataset.theme=t}}catch(_){{}}</script>
<script src="/assets/site.js?v={ASSET_V}" defer></script>
<script type="application/ld+json">{ld}</script>
</head>
<body class="{body_class}">
{header(path)}
<div class="sheet">
  <main id="main" class="sheet__main">
    <div class="ruler" aria-hidden="true">{''.join(f'<span>{c}</span>' for c in '12345678')}</div>
    {crumbs_block}
    {body}
  </main>
  {title_block(sheet, project)}
</div>
{footer()}
</body>
</html>
"""
    target = OUT / (path.lstrip("/") if path.endswith(".html") else path.lstrip("/") + "index.html")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(doc, encoding="utf-8")
    if not noindex:
        PAGES.append((path, priority))


# ============================================================ pages


def build_home():
    sec = Sec("A-000")
    featured = [r for r in REVIEWS if r["featured"]]
    faqs = [
        ("What does AXE Contracting Group do?", "AXE is a general contractor based on Staten Island. We handle roofing and roof repair, interior and exterior painting, kitchen and bathroom remodeling, flooring, basements, additions, pavers and masonry, decks, siding, and commercial build-outs, plus condo and co-op renovations in Brooklyn and Manhattan."),
        ("Where do you work?", "All of Staten Island, from St. George to Tottenville, plus Brooklyn and Manhattan."),
        ("How do I get an estimate?", f"Call {B['phone_display']} (Mon–Sat, 8 AM–6 PM) or send the estimate form. We schedule a walkthrough and send a written quote, usually within a day or two of the visit."),
        ("Are you insured? Can you provide a COI for my building?", "Yes. We're insured and issue certificates of insurance naming your condo or co-op building, board and managing agent as required."),
        ("Do you handle electrical and plumbing?", "We coordinate licensed NYC electricians and plumbers for any work that requires them, under one contract and one schedule with us."),
    ]
    guides = "".join(
        f'<li><a class="gcard" href="/guides/{g["slug"]}/"><span class="mono">{g["sheet"]}</span><b>{e(g["h1"])}</b><span>{e(g["dek"])}</span></a></li>' for g in GUIDES
    )
    body = f"""
<section class="hero" aria-labelledby="h1">
  <div class="hero__copy">
    <p class="ph__sheet"><span>SHEET A-000</span><span>COVER · STATEN ISLAND, NY</span></p>
    <h1 id="h1">General contractor on <em>Staten Island</em></h1>
    <p class="lede">Roofs, remodels, paint and pavers, drawn up properly and built cleanly by a Staten Island crew that answers its phone. Also serving Brooklyn and Manhattan.</p>
    {cta_pair()}
    <ul class="ticks">
      <li>{icon('check')} Insured · COIs for condos &amp; co-ops</li>
      <li>{icon('check')} Written, itemized quotes</li>
      <li>{icon('check')} Licensed electrical &amp; plumbing partners</li>
    </ul>
  </div>
  <figure class="build" style="--pos:50%">
    <div class="build__stage">
      {hero_house('built')}
      <div class="build__plan">{hero_house('plan')}</div>
      <span class="build__tag build__tag--l">BUILT</span>
      <span class="build__tag build__tag--r">DRAWN</span>
      <span class="build__handle" aria-hidden="true"><i></i></span>
      <input class="build__range" type="range" min="0" max="100" value="50" aria-label="Slide to compare the drawing with the finished house">
    </div>
    <figcaption class="mono">Drag the handle · Front elevation, typical Staten Island two-family</figcaption>
  </figure>
</section>

<ul class="strip" aria-label="At a glance">
  <li><b>15</b><span>services, one contract</span></li>
  <li><b>3</b><span>boroughs: SI · BK · MN</span></li>
  <li><b>21</b><span>SIR stations, all covered</span></li>
  <li><b>6</b><span>days a week, 8–6</span></li>
</ul>

<section class="sec" aria-labelledby="idx-h">
  {sec('Sheet index: what we build', 'Services', 'idx-h', 'Every service has its own sheet. Pick one for scope, local details and FAQs.')}
  {sheet_index()}
</section>

<section class="sec" aria-labelledby="why-h">
  {sec('General notes', 'Why Staten Island hires AXE', 'why-h', 'The standards we work to on every job. The quotes come from our Google reviews.')}
  {notes(GENERAL_NOTES)}
</section>

<section class="sec" aria-labelledby="proc-h">
  {sec('Construction schedule', 'How a job runs', 'proc-h')}
  {gantt()}
</section>

<section class="sec" aria-labelledby="rev-h">
  {sec('Inspection sign-offs', 'Google reviews, quoted word for word', 'rev-h')}
  <div class="sos">{''.join(signoff(r, i) for i, r in enumerate(featured))}</div>
  <p class="more"><a class="btn btn--ghost" href="/reviews/">All {len(REVIEWS)} reviews {icon('arrow')}</a></p>
</section>

<section class="sec" aria-labelledby="area-h">
  {sec('Service route', 'Where we work', 'area-h', 'Based on Staten Island and on call across the whole island, plus Brooklyn and Manhattan. Tap a stop to see what we build on that shore.')}
  {sir_diagram()}
  {area_links()}
</section>

<section class="sec" aria-labelledby="g-h">
  {sec('Homeowner guides', 'Before you hire anyone', 'g-h')}
  <ul class="gcards">{guides}</ul>
</section>

<section class="sec" aria-labelledby="faq-h">
  {sec('Questions', 'FAQ', 'faq-h')}
  {faq_html(faqs)}
</section>
"""
    write_page(
        "/",
        title="General Contractor Staten Island, NY | AXE Contracting Group",
        description="Staten Island general contractor for roofing, remodeling, painting, pavers, additions and condo renovations. Free estimates: (347) 265-1229.",
        body=body,
        sheet="A-000",
        project="Your home · Staten Island, NY",
        schema=[faq_node(f"{SITE_URL}/", faqs)],
        priority=1.0,
        body_class="home",
    )


def build_services_hub():
    sec = Sec("S-000")
    crumbs = [("Home", "/"), ("Services", "/services/")]
    body = (
        page_head("S-000", "SERVICES", "Contracting services on Staten Island", "Fifteen services, one general contractor. Exterior, interior and specialty work, with licensed trades coordinated under one contract.", cta_pair())
        + f'<section class="sec" aria-labelledby="idx-h">{sec("Sheet index", "All services", "idx-h")}{sheet_index()}</section>'
        + f'<section class="sec" aria-labelledby="why-h">{sec("General notes", "How we work", "why-h")}{notes(GENERAL_NOTES)}</section>'
    )
    schema = [
        {
            "@type": "ItemList",
            "@id": f"{SITE_URL}/services/#list",
            "itemListElement": [
                {"@type": "ListItem", "position": i + 1, "url": f"{SITE_URL}/services/{s['slug']}/", "name": s["name"]} for i, s in enumerate(SERVICES)
            ],
        }
    ]
    write_page(
        "/services/",
        title="Contracting Services Staten Island | AXE Contracting Group",
        description="Roofing, painting, kitchens, baths, flooring, basements, additions, pavers, decks, siding, condo and commercial work from a Staten Island contractor.",
        body=body,
        sheet="S-000",
        project="Services index",
        crumbs=crumbs,
        schema=schema,
        priority=0.9,
        page_type="CollectionPage",
    )


def build_service(s):
    path = f"/services/{s['slug']}/"
    url = SITE_URL + path
    sec = Sec(s["sheet"])
    glabel = next(g[1] for g in GROUPS if g[0] == s["group"])
    crumbs = [("Home", "/"), ("Services", "/services/"), (s["short"], path)]
    revs = for_service(s["slug"])
    scope = "".join(f"<li>{icon('check')}<span>{x}</span></li>" for x in s["scope"])
    local = "".join(f"<p>{p}</p>" for p in s["local"])
    intro = "".join(f"<p>{p}</p>" for p in s["intro"])
    head = page_head(s["sheet"], glabel.upper() + " · " + s["short"].upper(), e(s["h1"]), s["lede"], cta_pair())
    top = f"""
<section class="sec" aria-labelledby="sc-h">
  {sec('Scope of work', s['name'], 'sc-h')}
  <div class="split">
    <div class="prose">{intro}</div>
    <figure class="detail">{drawing(s['drawing'], 'd-' + s['slug'], 1)}</figure>
  </div>
  <h3 class="spec__h">What's included</h3>
  <ul class="spec">{scope}</ul>
</section>
<section class="sec" aria-labelledby="loc-h">
  {sec(e(s['local_h']), 'Local conditions', 'loc-h')}
  <div class="prose prose--cols">{local}</div>
</section>
"""
    rev_block = ""
    if revs:
        rev_block = f'<section class="sec" aria-labelledby="rv-h">{sec("Sign-offs on this work", "From our Google reviews", "rv-h")}<div class="sos">{"".join(signoff(r, i) for i, r in enumerate(revs))}</div></section>'
    rest = f"""
<section class="sec" aria-labelledby="pr-h">
  {sec('Construction schedule', 'How the job runs', 'pr-h')}
  {gantt()}
</section>
<section class="sec" aria-labelledby="fq-h">
  {sec(e(s['short']) + ' questions', 'FAQ', 'fq-h')}
  {faq_html(s['faq'])}
</section>
<section class="sec" aria-labelledby="rl-h">
  {sec('Related sheets', 'Often done together', 'rl-h')}
  {related_links(s['related'])}
  <h3 class="spec__h">Where we do {e(s['short'].lower())}</h3>
  {area_links()}
</section>
"""
    body = head + top + rev_block + rest
    write_page(
        path,
        title=s["title"],
        description=s["description"],
        body=body,
        sheet=s["sheet"],
        project=f"{s['short']} · Staten Island, NY",
        crumbs=crumbs,
        schema=[service_node(url, s), faq_node(url, s["faq"])],
        priority=0.9,
    )


def build_areas_hub():
    sec = Sec("Z-000")
    crumbs = [("Home", "/"), ("Areas", "/areas/")]
    cards = "".join(
        f'<li><a class="gcard" href="{a["path"]}"><span class="mono">{a["sheet"]}</span><b>{e(a["name"])}</b><span>{e(a["lede"])}</span></a></li>' for a in AREAS
    )
    body = (
        page_head("Z-000", "SERVICE AREAS", "Service areas: Staten Island, Brooklyn &amp; Manhattan", "Based on Staten Island, on call from St. George to Tottenville, and across the bridge and the harbor to Brooklyn and Manhattan.", cta_pair())
        + f'<section class="sec" aria-labelledby="r-h">{sec("Service route", "Staten Island by shore", "r-h", "Every Staten Island Railway stop is a neighborhood we work in. Tap one to see what we build on that shore.")}{sir_diagram()}</section>'
        + f'<section class="sec" aria-labelledby="a-h">{sec("Area sheets", "All service areas", "a-h")}<ul class="gcards">{cards}</ul></section>'
    )
    write_page(
        "/areas/",
        title="Service Areas | Staten Island, Brooklyn, Manhattan | AXE",
        description="AXE Contracting Group serves every Staten Island neighborhood (North Shore, East Shore, Mid-Island, South Shore) plus Brooklyn and Manhattan.",
        body=body,
        sheet="Z-000",
        project="Service areas",
        crumbs=crumbs,
        priority=0.8,
        page_type="CollectionPage",
    )


def build_area(a):
    path = a["path"]
    url = SITE_URL + path
    sec = Sec(a["sheet"])
    crumbs = [("Home", "/"), ("Areas", "/areas/")]
    if a.get("shore"):
        crumbs.append(("Staten Island", "/areas/staten-island/"))
    crumbs.append((a["name"], path))
    intro = "".join(f"<p>{p}</p>" for p in a["intro"])
    cond = "".join(f"<li><b>{t}.</b><p>{d}</p></li>" for t, d in a["conditions"])
    hoods = ""
    if a["neighborhoods"]:
        hoods = '<h3 class="spec__h">Neighborhoods covered</h3><ul class="hoods">' + "".join(f"<li>{e(n)}</li>" for n in a["neighborhoods"]) + "</ul>"
    svc_cards = "".join(
        f'<li><a class="svc" href="/services/{sl}/"><span class="mono">{SVC[sl]["sheet"]}</span><b>{e(SVC[sl]["name"])}</b>{drawing(SVC_DRAW[sl], f"a{a["sheet"]}-{sl}", i + 1)}</a></li>'
        for i, sl in enumerate(a["top_services"])
    )
    revs = [r for r in REVIEWS if r["featured"]][:3]
    shore_cards = ""
    if a["slug"] == "staten-island":
        shore_cards = '<ul class="gcards">' + "".join(
            f'<li><a class="gcard" href="{AREA[sh]["path"]}"><span class="mono">{AREA[sh]["sheet"]}</span><b>{e(AREA[sh]["name"])}</b><span>{e(AREA[sh]["lede"])}</span></a></li>' for sh in SHORES
        ) + "</ul>"
    top = f"""
{page_head(a['sheet'], 'SERVICE AREA · ' + a['name'].upper(), e(a['h1']), a['lede'], cta_pair())}
<section class="sec" aria-labelledby="ov-h">
  {sec('Area overview', a['name'], 'ov-h')}
  <div class="prose prose--wide">{intro}</div>
  {shore_cards}
  {hoods}
</section>
"""
    route = ""
    if a["slug"] == "staten-island" or a.get("shore"):
        route = f'<section class="sec" aria-labelledby="rt-h">{sec("Service route", "Staten Island by shore", "rt-h")}{sir_diagram(a.get("shore"))}</section>'
    rest = f"""
<section class="sec" aria-labelledby="cd-h">
  {sec('Site conditions', 'What we plan for here', 'cd-h')}
  <ol class="notes">{cond}</ol>
</section>
<section class="sec" aria-labelledby="sv-h">
  {sec('Most-requested here', 'Services', 'sv-h')}
  <ul class="svcs">{svc_cards}</ul>
  <p class="more"><a class="btn btn--ghost" href="/services/">All services {icon('arrow')}</a></p>
</section>
<section class="sec" aria-labelledby="rv-h">
  {sec('Inspection sign-offs', 'Google reviews', 'rv-h')}
  <div class="sos">{''.join(signoff(r, i) for i, r in enumerate(revs))}</div>
  <p class="more"><a class="btn btn--ghost" href="/reviews/">All reviews {icon('arrow')}</a></p>
</section>
<section class="sec" aria-labelledby="fq-h">
  {sec(e(a['name']) + ' questions', 'FAQ', 'fq-h')}
  {faq_html(a['faq'])}
</section>
<section class="sec" aria-labelledby="ot-h">
  {sec('Other areas', 'Service areas', 'ot-h')}
  {area_links(a['slug'])}
</section>
"""
    body = top + route + rest
    place_type = "City" if a["slug"] in ("staten-island", "brooklyn", "manhattan") else "Place"
    schema = [
        faq_node(url, a["faq"]),
        {
            "@type": "Service",
            "@id": f"{url}#service",
            "name": f"General contracting in {a['name']}",
            "serviceType": "General contractor",
            "provider": {"@id": f"{SITE_URL}/#business"},
            "areaServed": {"@type": place_type, "name": a["name"] + (", Staten Island, NY" if a.get("shore") else ", NY")},
        },
    ]
    write_page(
        path,
        title=a["title"],
        description=a["description"],
        body=body,
        sheet=a["sheet"],
        project=f"{a['name']} · NYC",
        crumbs=crumbs,
        schema=schema,
        priority=0.8,
    )


def build_reviews():
    sec = Sec("R-000")
    crumbs = [("Home", "/"), ("Reviews", "/reviews/")]
    body = (
        page_head(
            "R-000",
            "REVIEWS",
            "AXE Contracting reviews",
            f"Every review below comes from our Google Business Profile, quoted word for word: homeowners, condo owners, businesses, and the trades we work alongside.",
            f'<div class="btns"><a class="btn btn--lg" href="{B["google_profile"]}" rel="noopener" target="_blank">{icon("star")} See us on Google</a><a class="btn btn--lg btn--ghost" href="/contact/">Get an estimate {icon("arrow")}</a></div>',
        )
        + f'<section class="sec" aria-labelledby="all-h">{sec("Inspection sign-offs", f"{len(REVIEWS)} Google reviews", "all-h")}<div class="sos sos--all">{"".join(signoff(r, i) for i, r in enumerate(REVIEWS))}</div></section>'
        + f'<section class="sec" aria-labelledby="lv-h">{sec("Worked with us?", "Leave a review", "lv-h")}<div class="prose"><p>Reviews that mention what we did and where (“new roof in Great Kills,” “condo painting in Bay Ridge”) help your neighbors find the right contractor. <a href="{B["google_profile"]}" rel="noopener" target="_blank">Leave a review on Google</a>. Thank you.</p></div></section>'
    )
    write_page(
        "/reviews/",
        title="AXE Contracting Group Reviews | Staten Island Contractor",
        description="Read Google reviews for AXE Contracting Group: roofing, painting, renovations, pavers and commercial work on Staten Island and across NYC, quoted verbatim.",
        body=body,
        sheet="R-000",
        project="Reviews",
        crumbs=crumbs,
        priority=0.7,
    )


def build_projects():
    sec = Sec("P-000")
    crumbs = [("Home", "/"), ("Projects", "/projects/")]
    log = [
        ("Roof replacement", "roofing", "Donny Skuka", "Full roof, clean job site."),
        ("Roof leak repair", "roof-repair", "sefit Maksudovski", "Leak traced and fixed quickly."),
        ("Condo repaint + COI", "condo-apartment-renovations", "Ying Li", "Condo painting with building COI handled."),
        ("Apartment repaint", "interior-painting", "Ellie Z", "Onsite assessment, quote the next day."),
        ("Lounge transformation", "commercial-construction", "Boulevard Lounge", "Commercial painting, finished on time."),
        ("Barbershop renovation", "commercial-construction", "Artisan Barbershop", "Storefront interior renovation."),
        ("Apartment floors + walls", "flooring", "Fitt", "Renovation on time and within budget."),
        ("Interior renovation", "home-renovations", "Valentin Bajro", "Full interior renovation project."),
        ("Paver installation", "pavers-masonry", "Tony Chini", "Pavers at a private home."),
    ]
    rows = ""
    for i, (t, sl, who, d) in enumerate(log):
        rows += f"""
<li class="plog__i">
  <a href="/services/{sl}/" class="plog__card">
    <div class="plog__art">{drawing(SVC_DRAW[sl], f'p{i}', i + 1)}</div>
    <div class="plog__txt"><span class="mono">P-{i + 1:03d} · {SVC[sl]['sheet']}</span><b>{e(t)}</b><span>{e(d)}</span><span class="plog__by">Client sign-off: {e(who)}</span></div>
  </a>
</li>"""
    # TODO(photos): when real project photos arrive, add a <picture> per entry above
    # (WebP, <=200 KB, descriptive file names like roof-replacement-great-kills.webp).
    body = (
        page_head("P-000", "PROJECT RECORD", "Project record", "A log of completed AXE jobs, each one backed by the client's own Google review. Open any entry for the full scope of that kind of work.", cta_pair())
        + f'<section class="sec" aria-labelledby="pl-h">{sec("Project log", "Completed work", "pl-h")}<ol class="plog">{rows}</ol></section>'
    )
    write_page(
        "/projects/",
        title="Projects | Roofing, Remodeling & Painting | AXE Contracting",
        description="Completed AXE Contracting Group projects: roof replacements and leak repairs, condo and apartment painting, commercial renovations, flooring and pavers.",
        body=body,
        sheet="P-000",
        project="Project record",
        crumbs=crumbs,
        priority=0.6,
        page_type="CollectionPage",
    )


def build_about():
    sec = Sec("G-001")
    crumbs = [("Home", "/"), ("About", "/about/")]
    lic_row = (
        f"<li><b>NYC DCWP Home Improvement Contractor License</b><p>#{e(B['hic_license'])}. Verify it on the DCWP website.</p></li>"
        if B["hic_license"]
        else ""
    )
    body = f"""
{page_head('G-001', 'ABOUT', 'About AXE Contracting Group', 'A Staten Island general contractor led by Angel, known to clients for picking up the phone, quoting fast, and leaving job sites clean.', cta_pair())}
<section class="sec" aria-labelledby="st-h">
  {sec('Who we are', 'The company', 'st-h')}
  <div class="prose prose--wide">
    <p>AXE Contracting Group is a general contractor based on Staten Island, working across the island and in Brooklyn and Manhattan. We take on residential and commercial work of almost every size: roofs and roof leaks, interior and exterior painting, kitchens and bathrooms, floors, basements, additions, pavers, decks and siding, and storefront renovations.</p>
    <p>Most of our clients find us the way people on Staten Island find any contractor: a neighbor, a coworker, a review. So we run the business to keep earning those referrals. Angel (Engjel to some clients) answers the phone, does the walkthroughs, writes the quotes and stays in touch through the job. Reviewers mention it again and again: <em>“responsive,” “easy to communicate with,” “always calling to make sure that everything is fine.”</em></p>
    <p>We're a general contractor, not a one-trade shop. Our crew does the carpentry, roofing, painting, tile, flooring and masonry. For work that NYC requires licensed trades to perform, we bring in licensed electricians and plumbers we work with regularly, and they've vouched for us too.</p>
  </div>
</section>
<section class="sec" aria-labelledby="gn-h">
  {sec('General notes', 'How we work', 'gn-h')}
  {notes(GENERAL_NOTES)}
</section>
<section class="sec" aria-labelledby="cr-h">
  {sec('Credentials', 'On file', 'cr-h')}
  <ol class="notes">
    <li><b>Insured</b><p>General liability and workers' compensation. We issue certificates of insurance (COIs) to homeowners and to condo and co-op buildings, naming additional insureds as required.</p></li>
    {lic_row}
    <li><b>Licensed trade partners</b><p>Electrical and plumbing work is performed by NYC-licensed electricians and plumbers.</p></li>
    <li><b>Reviewed publicly</b><p><a href="/reviews/">Read our Google reviews</a>, quoted verbatim on this site.</p></li>
  </ol>
</section>
"""
    write_page(
        "/about/",
        title="About AXE Contracting | Staten Island General Contractor",
        description="Meet AXE Contracting Group, a Staten Island general contractor led by Angel. Insured, COI-ready for condos and co-ops, working with licensed trades across NYC.",
        body=body,
        sheet="G-001",
        project="About AXE",
        crumbs=crumbs,
        priority=0.6,
        page_type="AboutPage",
    )


def build_guides_hub():
    sec = Sec("G-100")
    crumbs = [("Home", "/"), ("Guides", "/guides/")]
    cards = "".join(
        f'<li><a class="guide-card" href="/guides/{g["slug"]}/"><span class="mono">{g["sheet"]}</span><b>{e(g["h1"])}</b><p>{e(g["key_answer"][:220].rsplit(" ", 1)[0])}…</p><span class="guide-card__go">Read the guide {icon("arrow")}</span></a></li>'
        for g in GUIDES
    )
    body = page_head("G-100", "HOMEOWNER GUIDES", "Homeowner guides for NYC renovations", "Plain answers to the questions we hear on walkthroughs: permits, building paperwork, roofs, and how to vet any contractor, including us.") + f'<section class="sec" aria-labelledby="gl-h">{sec("Guides", "All guides", "gl-h")}<ul class="guide-cards">{cards}</ul></section>'
    write_page(
        "/guides/",
        title="NYC Renovation Guides for Homeowners | AXE Contracting",
        description="Guides for Staten Island and NYC homeowners: renovation permits, condo COIs and alteration agreements, flat vs. shingle roofs, and how to vet a contractor.",
        body=body,
        sheet="G-100",
        project="Homeowner guides",
        crumbs=crumbs,
        priority=0.6,
        page_type="CollectionPage",
    )


def build_guide(g):
    path = f"/guides/{g['slug']}/"
    url = SITE_URL + path
    crumbs = [("Home", "/"), ("Guides", "/guides/"), (g["h1"], path)]
    rel = related_links(g["related"])
    body = f"""
{page_head(g['sheet'], 'HOMEOWNER GUIDE', e(g['h1']), e(g['dek']), f'<p class="byline mono">By {e(B["name"])} · Updated <time datetime="{PUBLISHED}">{dt.date.fromisoformat(PUBLISHED).strftime("%B %-d, %Y")}</time></p>')}
<article class="article">
  <aside class="answer" aria-label="Short answer"><span class="answer__k">SHORT ANSWER</span><p>{e(g['key_answer'])}</p></aside>
  <div class="prose prose--article">
    {g['body']}
    <p class="disclaimer">This guide is general information, not legal advice. City rules change, so confirm requirements for your property with the relevant agency (NYC DOB, DCWP, LPC or your building's management) before work starts.</p>
  </div>
</article>
<section class="sec" aria-labelledby="rs-h">
  <div class="sec__head"><span class="bub" aria-hidden="true"><b>→</b><i>{g['sheet']}</i></span><div><p class="kicker">Related services</p><h2 id="rs-h">Put it to work</h2></div></div>
  {rel}
</section>
"""
    schema = [
        {
            "@type": "Article",
            "@id": f"{url}#article",
            "headline": g["h1"],
            "description": g["description"],
            "datePublished": PUBLISHED,
            "dateModified": PUBLISHED,
            "author": {"@id": f"{SITE_URL}/#business"},
            "publisher": {"@id": f"{SITE_URL}/#business"},
            "mainEntityOfPage": {"@id": f"{url}#webpage"},
            "image": f"{SITE_URL}/og-image.png",
            "inLanguage": "en-US",
        }
    ]
    write_page(path, title=g["title"], description=g["description"], body=body, sheet=g["sheet"], project="Homeowner guide", crumbs=crumbs, schema=schema, priority=0.6, og_type="article")


def build_contact():
    crumbs = [("Home", "/"), ("Contact", "/contact/")]
    opts = "".join(f'<option value="{e(s["name"])}">{e(s["name"])}</option>' for s in SERVICES)
    chip = lambda grp, vals: "".join(f'<button type="button" class="chip" data-group="{grp}" aria-pressed="false">{e(v)}</button>' for v in vals)
    nap = f"""<dl class="nap">
  <div><dt>Phone</dt><dd><a href="{TEL}">{B['phone_display']}</a></dd></div>
  <div><dt>Email</dt><dd><a href="mailto:{B['email']}">{B['email']}</a></dd></div>
  <div><dt>Hours</dt><dd>{B['hours_display']}</dd></div>
  <div><dt>Areas</dt><dd>Staten Island · Brooklyn · Manhattan</dd></div>
</dl>"""
    type_chips = "".join(f'<button type="button" class="chip" data-group="type" data-service="{e(s["name"])}" aria-pressed="false">{e(s["short"])}</button>' for s in SERVICES)
    action = FORM_ENDPOINT or f"mailto:{B['email']}"
    mode = "endpoint" if FORM_ENDPOINT else "mailto"
    body = f"""
{page_head('E-000', 'FREE ESTIMATE', 'Request a free estimate', 'Tell us about the job. We will call to schedule a walkthrough, then send a written quote.', nap)}
<section class="sec est" aria-labelledby="sb-h">
  <div class="sec__head"><span class="bub" aria-hidden="true"><b>01</b><i>E-000</i></span><div><p class="kicker">Optional · takes 20 seconds</p><h2 id="sb-h">Scope builder</h2><p class="sec__intro">Tap what applies and we'll write the project summary for you.</p></div></div>
  <div class="sb" data-scope-builder>
    <fieldset><legend>Project type</legend><div class="chips-sel">{type_chips}</div></fieldset>
    <fieldset><legend>Building</legend><div class="chips-sel">{chip('building', ['House', 'Two-family', 'Condo', 'Co-op', 'Rental apartment', 'Storefront / commercial'])}</div></fieldset>
    <fieldset><legend>Size</legend><div class="chips-sel">{chip('size', ['Repair / small job', 'One room', 'Several rooms', 'Whole house / unit', 'Exterior only'])}</div></fieldset>
    <fieldset><legend>Timing</legend><div class="chips-sel">{chip('timing', ['Emergency / active leak', 'Within a month', '1–3 months', 'Just planning'])}</div></fieldset>
    <fieldset><legend>Extras</legend><div class="chips-sel">{chip('extras', ['Building needs a COI', 'May need permits', 'Have drawings / architect', 'Occupied during work'])}</div></fieldset>
  </div>
</section>
<section class="sec est" aria-labelledby="fm-h">
  <div class="sec__head"><span class="bub" aria-hidden="true"><b>02</b><i>E-000</i></span><div><p class="kicker">Name and phone are enough to start</p><h2 id="fm-h">Your details</h2></div></div>
  <form class="form" action="{e(action)}" method="post" data-mode="{mode}" data-email="{B['email']}" novalidate>
    <div class="form__grid">
      <label>Name<input name="name" autocomplete="name" required></label>
      <label>Phone<input name="phone" type="tel" autocomplete="tel" required></label>
      <label>Email<input name="email" type="email" autocomplete="email"></label>
      <label>ZIP code<input name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="10" placeholder="103__"></label>
      <label class="form__wide">Service
        <select name="service"><option value="">Choose a service</option>{opts}<option value="Other">Other / not sure</option></select>
      </label>
      <label class="form__wide">Project summary
        <textarea name="message" rows="7" placeholder="What are we building? Rooms, sizes, timing, building requirements…" required></textarea>
      </label>
      <input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    </div>
    <p class="form__status" role="status" aria-live="polite"></p>
    <button class="btn btn--lg" type="submit">Send estimate request {icon('arrow')}</button>
    <p class="form__fine">We use your details only to reply about your project. See our <a href="/privacy/">privacy policy</a>.</p>
  </form>
</section>
"""
    write_page(
        "/contact/",
        title="Free Estimate | Contact AXE Contracting Group, Staten Island",
        description=f"Request a free estimate from AXE Contracting Group. Call {B['phone_display']} or use the scope builder. Serving Staten Island, Brooklyn and Manhattan.",
        body=body,
        sheet="E-000",
        project="Your estimate",
        crumbs=crumbs,
        priority=0.8,
        page_type="ContactPage",
    )


def build_misc():
    write_page(
        "/thank-you/",
        title="Thank You | AXE Contracting Group",
        description="Your estimate request was sent.",
        body=page_head("E-001", "RECEIVED", "Request received. Thank you.", f'We\'ll be in touch to set up a walkthrough. Urgent? Call <a href="{TEL}">{B["phone_display"]}</a>.', f'<div class="btns"><a class="btn btn--lg btn--ghost" href="/guides/">Read our homeowner guides {icon("arrow")}</a></div>'),
        sheet="E-001",
        project="Your estimate",
        noindex=True,
    )
    write_page(
        "/privacy/",
        title="Privacy Policy | AXE Contracting Group",
        description="How AXE Contracting Group handles information submitted through this website.",
        body=page_head("G-900", "PRIVACY", "Privacy policy", f"Updated {BUILD_DATE}.")
        + f"""<div class="prose prose--wide">
<p>When you submit the estimate form or email us, we receive the details you provide (name, phone, email, ZIP code and project description) and use them only to respond to you about your project.</p>
<p>We don't sell or rent your information. Form submissions may be processed by our form or email service provider solely to deliver your message to us.</p>
<p>This site does not use advertising cookies. Your theme choice (vellum or blueprint) is stored in your own browser only.</p>
<p>To ask us to delete your information, email <a href="mailto:{B['email']}">{B['email']}</a>.</p>
</div>""",
        sheet="G-900",
        project="Privacy",
        crumbs=[("Home", "/"), ("Privacy", "/privacy/")],
        priority=0.2,
    )
    write_page(
        "/404.html",
        title="Sheet Not Found | AXE Contracting Group",
        description="This page doesn't exist.",
        body=page_head("X-404", "NOT IN SET", "Sheet not found", "That page isn't in this drawing set. Try one of these:")
        + f'<div class="sec">{sheet_index()}</div>',
        sheet="X-404",
        project="Missing sheet",
        noindex=True,
    )


# ============================================================ static files


def write_static():
    assets = OUT / "assets"
    assets.mkdir(parents=True, exist_ok=True)
    for f in ("site.css", "site.js"):
        shutil.copy(SRC / "static" / f, assets / f)
    shutil.copy(SRC / "static" / "favicon.svg", OUT / "favicon.svg")

    urls = "\n".join(
        f"  <url><loc>{SITE_URL}{p}</loc><lastmod>{BUILD_DATE}</lastmod><priority>{pr:.1f}</priority></url>" for p, pr in PAGES
    )
    (OUT / "sitemap.xml").write_text(
        f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n', encoding="utf-8"
    )
    (OUT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: {SITE_URL}/sitemap.xml\n", encoding="utf-8")

    svc_lines = "\n".join(f"- [{s['name']}]({SITE_URL}/services/{s['slug']}/): {s['lede']}" for s in SERVICES)
    area_lines = "\n".join(f"- [{a['name']}]({SITE_URL}{a['path']}): {a['lede']}" for a in AREAS)
    guide_lines = "\n".join(f"- [{g['h1']}]({SITE_URL}/guides/{g['slug']}/): {g['dek']}" for g in GUIDES)
    (OUT / "llms.txt").write_text(
        f"""# {B['name']}

> General contractor based in Staten Island, New York. Residential and commercial roofing, painting, remodeling, flooring, additions, pavers, decks, siding, and condo/co-op renovations in Staten Island, Brooklyn and Manhattan.

- Phone: {B['phone_display']}
- Email: {B['email']}
- Hours: {B['hours_display']}
- Google Business Profile: {B['google_profile']}

## Services
{svc_lines}

## Service areas
{area_lines}

## Guides
{guide_lines}

## Company
- [About]({SITE_URL}/about/)
- [Reviews]({SITE_URL}/reviews/): Google reviews quoted verbatim
- [Free estimate]({SITE_URL}/contact/)
""",
        encoding="utf-8",
    )
    (OUT / "site.webmanifest").write_text(
        json.dumps(
            {
                "name": B["name"],
                "short_name": "AXE",
                "start_url": "/",
                "display": "standalone",
                "background_color": "#F3EFE6",
                "theme_color": "#14212D",
                "icons": [
                    {"src": "/assets/logo-192.png", "sizes": "192x192", "type": "image/png"},
                    {"src": "/assets/logo-512.png", "sizes": "512x512", "type": "image/png"},
                ],
            },
            indent=2,
        ),
        encoding="utf-8",
    )
    render_images()


def render_images():
    """og-image.png and PNG icons. Pillow is optional; the images are committed."""
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("Pillow not installed: skipping image render (existing PNGs kept).")
        return
    fonts = SRC / "static" / "fonts"

    def font(name, size):
        for cand in (fonts / name, Path("/usr/share/fonts/opentype/inter") / name):
            if cand.exists():
                return ImageFont.truetype(str(cand), size)
        return ImageFont.load_default()

    blue, white, orange, ink, paper = (15, 46, 82), (234, 242, 251), (255, 90, 31), (20, 33, 45), (243, 239, 230)
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), blue)
    d = ImageDraw.Draw(im)
    for x in range(0, W, 24):
        d.line([(x, 0), (x, H)], fill=(28, 62, 102), width=1)
    for y in range(0, H, 24):
        d.line([(0, y), (W, y)], fill=(28, 62, 102), width=1)
    d.rectangle([24, 24, W - 24, H - 24], outline=white, width=3)
    d.rectangle([36, 36, W - 36, H - 36], outline=white, width=1)
    # house linework
    ox, oy = 760, 140
    d.line([(ox, oy + 120), (ox + 150, oy), (ox + 300, oy + 120)], fill=white, width=5)
    d.rectangle([ox + 20, oy + 120, ox + 280, oy + 380], outline=white, width=4)
    for wx in (ox + 45, ox + 125, ox + 205):
        for wy in (oy + 150, oy + 240):
            d.rectangle([wx, wy, wx + 50, wy + 60], outline=white, width=2)
    d.rectangle([ox + 125, oy + 320, ox + 175, oy + 380], fill=orange)
    d.line([(ox + 20, oy + 400), (ox + 280, oy + 400)], fill=white, width=2)
    d.text((ox + 150, oy + 420), "34'-0\"", font=font("Inter-Medium.otf", 20), fill=white, anchor="mm")
    try:
        big = ImageFont.truetype(str(fonts / "BigShouldersDisplay.ttf"), 170)  # variable font (OFL)
        big.set_variation_by_name("Black")
    except (OSError, ValueError):
        big = font("InterDisplay-Black.otf", 120)
    d.text((80, 90), "AXE", font=big, fill=white)
    d.rectangle([84, 276, 300, 286], fill=orange)
    d.text((80, 306), "CONTRACTING GROUP", font=font("InterDisplay-Bold.otf", 46), fill=white)
    d.text((80, 372), "General Contractor · Staten Island, NY", font=font("Inter-Medium.otf", 32), fill=white)
    d.text((80, 418), "Roofing · Remodeling · Painting · Pavers", font=font("Inter-Regular.otf", 28), fill=(170, 200, 230))
    d.rectangle([80, 488, 470, 556], fill=orange)
    d.text((275, 522), B["phone_display"], font=font("InterDisplay-Bold.otf", 38), fill=ink, anchor="mm")
    im.save(OUT / "og-image.png", optimize=True)

    def logo(size):
        s = size / 48
        img = Image.new("RGB", (size, size), paper)
        g = ImageDraw.Draw(img)
        g.rectangle([1.5 * s, 1.5 * s, 46.5 * s, 46.5 * s], outline=ink, width=max(1, round(3 * s)))
        g.line([(10 * s, 38 * s), (24 * s, 10 * s), (38 * s, 38 * s)], fill=ink, width=max(2, round(4 * s)), joint="curve")
        g.line([(16 * s, 28 * s), (32 * s, 28 * s)], fill=orange, width=max(2, round(4 * s)))
        return img

    logo(512).save(OUT / "assets" / "logo-512.png", optimize=True)
    logo(192).save(OUT / "assets" / "logo-192.png", optimize=True)
    logo(180).save(OUT / "apple-touch-icon.png", optimize=True)
    logo(32).save(OUT / "favicon-32.png", optimize=True)


# ============================================================ main


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    build_home()
    build_services_hub()
    for s in SERVICES:
        build_service(s)
    build_areas_hub()
    for a in AREAS:
        build_area(a)
    build_reviews()
    build_projects()
    build_about()
    build_guides_hub()
    for g in GUIDES:
        build_guide(g)
    build_contact()
    build_misc()
    write_static()
    print(f"Built {len(PAGES)} indexable pages into {OUT.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()
