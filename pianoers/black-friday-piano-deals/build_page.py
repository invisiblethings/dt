import re, json, html as H
from PIL import Image
Y='2026/11'; B='https://pianoers.com/content/images'; U='https://pianoers.com/black-friday-piano-deals/'
P=json.load(open('picks.json'))
on=[p for p in P if p['off']]; off=[p for p in P if not p['off']]
def src(path,w=600): return f'{B}/size/w{w}/format/webp/{path}'
def card(p):
    rev=f'<a class="pz-btn pz-btn-ghost" href="https://pianoers.com{p["rev"]}">Full review</a>' if p['rev'] else ''
    plate=''.join(f'<div><dt>{a}</dt><dd>{b}</dd></div>' for a,b in p['plate'])
    pros=''.join(f'<li>{x}</li>' for x in p['pros']); cons=''.join(f'<li>{x}</li>' for x in p['cons'])
    quote=f'<span class="bfp-pill on">{p["off"]}% off</span> right now' if p['off'] else '<span class="bfp-pill off">Not on sale</span> this week'
    price=f'{p["off"]}% off' if p['off'] else 'not on sale this week'
    path,alt=p['img']
    return (f'<section class="pz-pick" id="{p["id"]}" data-rank="{p["rank"]}" data-price="{price}" data-name="{p["name"]}"><div class="pz-pick-head"><span class="pz-rank" aria-hidden="true">{p["rank"]}</span><span class="pz-best">{p["best"]}</span><h2>{p["name"]}</h2></div><div class="pz-pick-body"><div class="pz-pick-top">'
     f'<img src="{src(path)}" srcset="{src(path)} 600w, {src(path,1000)} 1000w" sizes="(min-width: 640px) 220px, calc(100vw - 80px)" alt="{alt}" width="600" height="600" loading="lazy" decoding="async">'
     f'<div class="pz-pick-main"><p class="pz-quote">{quote}</p><p class="pz-verdict"><strong>Verdict:</strong> {p["verdict"]}</p>'
     f'<div class="pz-buy"><a class="pz-btn pz-btn-buy" href="{p["amz"]}" rel="sponsored nofollow noopener" target="_blank">Check price on Amazon</a>{rev}</div></div></div>'
     f'<dl class="pz-plate">{plate}</dl><div class="pz-pc"><div class="pz-pros"><p class="pz-pc-title">Why it\'s here</p><ul>{pros}</ul></div><div class="pz-cons"><p class="pz-pc-title">Watch out for</p><ul>{cons}</ul></div></div></div></section>')
why={'roland-fp-10':'Best key feel under $500','kawai-es60':'Best piano sound','alesis-recital-pro-mkii':'Cheapest pick, pedal included','casio-privia-px-s1100':'Slimmest, for small spaces'}
tiles=''.join(f'<div class="bfp-deal"><span class="bfp-off">-{p["off"]}%</span><img src="{src(p["img"][0])}" alt="{p["img"][1]}" width="600" height="600" loading="eager" decoding="async"><div class="bfp-n">{p["name"]}</div><div class="bfp-w">{why[p["id"]]}</div><a class="bfp-go" href="{p["amz"]}" rel="sponsored nofollow noopener" target="_blank">Get the deal</a></div>' for p in sorted(on,key=lambda x:-x['off']))
rows=''.join(f'<tr><td><a href="{U}#{p["id"]}"><strong>{p["name"]}</strong></a></td><td>'+(f'<span class="bfp-pill on">{p["off"]}% off</span>' if p['off'] else '<span class="bfp-pill off">No deal</span>')+f'</td><td>{p["best"]}</td></tr>' for p in P)
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
s=open('page.src.html').read()
s=s.replace('{{TILES}}',tiles).replace('{{ROWS}}',rows).replace('{{CARDS_ON}}','\n'.join(card(p) for p in on)).replace('{{CARDS_OFF}}','\n'.join(card(p) for p in off))
s=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),s)
s=re.sub(r'\n\s*\n','\n',s).strip()+'\n'
assert '{{' not in s and '<!--' not in s
open('article.html','w').write(s)
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',s.split('id="faq"')[1].split('<script>')[0],flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
il={"@context":"https://schema.org","@type":"ItemList","name":"Black Friday piano deals 2026","numberOfItems":len(P),"itemListElement":[{"@type":"ListItem","position":p['rank'],"name":p['name'],"url":U+'#'+p['id']} for p in P]}
faq={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(a)}} for q,a in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(il,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faq,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',s,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'faqs',len(qs),'cards',s.count('class="pz-pick"'),'tiles',s.count('class="bfp-deal"'))
