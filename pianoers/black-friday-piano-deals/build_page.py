import re, json, html as H
from PIL import Image
Y='2026/11'; B='https://pianoers.com/content/images'; U='https://pianoers.com/black-friday-piano-deals/'
D=json.load(open('all.json')); FULL=D['full']; MINI=D['compact']
def src(path,w=600): return f'{B}/size/w{w}/format/webp/{path}'
def pill(o): return f'<span class="bfp-pill on">{o}% off</span>' if o else '<span class="bfp-pill off">No deal</span>'
def card(p,rank):
    rev=f'<a class="pz-btn pz-btn-ghost" href="https://pianoers.com{p["rev"]}">Full review</a>' if p['rev'] else ''
    plate=''.join(f'<div><dt>{a}</dt><dd>{b}</dd></div>' for a,b in p['plate'])
    pros=''.join(f'<li>{x}</li>' for x in p['pros']); cons=''.join(f'<li>{x}</li>' for x in p['cons'])
    path,alt=p['img']
    return (f'<section class="pz-pick" id="{p["id"]}" data-rank="{rank}" data-price="{p["off"]}% off" data-name="{p["name"]}"><div class="pz-pick-head"><span class="pz-rank" aria-hidden="true">{rank}</span><span class="pz-best">{p["best"]}</span><h2>{p["name"]}</h2></div><div class="pz-pick-body"><div class="pz-pick-top">'
     f'<img src="{src(path)}" srcset="{src(path)} 600w, {src(path,1000)} 1000w" sizes="(min-width: 640px) 220px, calc(100vw - 80px)" alt="{alt}" width="600" height="600" loading="lazy" decoding="async">'
     f'<div class="pz-pick-main"><p class="pz-quote">{pill(p["off"])} right now</p><p class="pz-verdict"><strong>Verdict:</strong> {p["verdict"]}</p>'
     f'<div class="pz-buy"><a class="pz-btn pz-btn-buy" href="{p["amz"]}" rel="sponsored nofollow noopener" target="_blank">Check price on Amazon</a>{rev}</div></div></div>'
     f'<dl class="pz-plate">{plate}</dl><div class="pz-pc"><div class="pz-pros"><p class="pz-pc-title">Why it\'s here</p><ul>{pros}</ul></div><div class="pz-cons"><p class="pz-pc-title">Watch out for</p><ul>{cons}</ul></div></div></div></section>')
def mini(c):
    on=c['off']>0
    more=f'<a class="bfp-more" href="{c["read"][0]}">{c["read"][1]}</a>' if c['read'] else ''
    btn=f'<a class="bfp-btn {"on" if on else "off"}" href="{c["amz"]}" rel="sponsored nofollow noopener" target="_blank">{"Get the deal" if on else "View on Amazon"}</a>'
    return (f'<div class="bfp-mini{" is-on" if on else ""}" id="{c["id"]}"><div><h3>{c["name"]} {pill(c["off"])}</h3><p class="bfp-best">{c["best"]}</p><p class="v">{c["verdict"]}</p></div>'
            f'<div class="bfp-act">{btn}{more}</div></div>')
G=[('u500','under-500','Under $500','Beginner piano deals under $500'),('u1000','under-1000','Under $1,000','Digital piano deals under $1,000'),('u2000','over-1000','$1,000 and up','Intermediate, advanced and console pianos')]
allp=[dict(id=p['id'],name=p['name'],off=p['off'],best=p['best'],group=p['group']) for p in FULL]+[dict(id=c['id'],name=c['name'],off=c['off'],best=c['best'],group=c['group']) for c in MINI]
cnt={g:sum(1 for p in allp if p['group']==g and p['off']) for g,*_ in G}
jump=''.join(f'<a href="#{gid}"><b>{lab}</b>'+(f'<span>{cnt[g]} on sale</span>' if cnt[g] else '<span class="n">No deals yet</span>')+'</a>' for g,gid,lab,_ in G)
rows=''
for g,gid,lab,_ in G:
    rows+=f'<tr class="bfp-grp"><th colspan="3">{lab}</th></tr>'
    for p in sorted([p for p in allp if p['group']==g],key=lambda x:-x['off']):
        rows+=f'<tr><td><a href="{U}#{p["id"]}"><strong>{p["name"]}</strong></a></td><td>{pill(p["off"])}</td><td>{p["best"]}</td></tr>'
rank=0; secs=''
for g,gid,lab,title in G:
    n=cnt[g]
    secs+=f'<h2 id="{gid}" class="bfp-sec">{title} '+(f'<span class="bfp-pill on">{n} deal{"s" if n>1 else ""}</span>' if n else '<span class="bfp-pill off">no deals yet</span>')+'</h2>\n'
    if g=='u2000': secs+='<p>None of the higher-end pianos I recommend are discounted this week. If you\'re shopping in this range, the Yamaha P-225 at 16% off is the closest deal, or keep an eye on these through Cyber Monday.</p>\n'
    for p in [p for p in FULL if p['group']==g]:
        rank+=1; secs+=card(p,rank)+'\n'
    ms=sorted([c for c in MINI if c['group']==g],key=lambda x:-x['off'])
    if ms: secs+='<div class="bfp-minis">'+''.join(mini(c) for c in ms)+'</div>\n'
why={'roland-fp-10':'Best key feel under $500','kawai-es60':'Best piano sound','alesis-recital-pro-mkii':'Cheapest pick, pedal included','casio-privia-px-s1100':'Slimmest, for small spaces'}
tiles=''.join(f'<div class="bfp-deal"><span class="bfp-off">-{p["off"]}%</span><span class="bfp-img"><img src="{src(p["img"][0])}" alt="{p["img"][1]}" width="600" height="600" loading="eager" decoding="async"></span><div class="bfp-n">{p["name"]}</div><div class="bfp-w">{why[p["id"]]}</div><a class="bfp-go" href="{p["amz"]}" rel="sponsored nofollow noopener" target="_blank">Get the deal</a></div>' for p in sorted(FULL,key=lambda x:-x['off']))
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
s=open('page.src.html').read()
s=s.replace('{{TILES}}',tiles).replace('{{ROWS}}',rows).replace('{{JUMP}}',jump).replace('{{SECTIONS}}',secs)
s=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),s)
s=re.sub(r'\n\s*\n','\n',s).strip()+'\n'
assert '{{' not in s and '<!--' not in s
open('article.html','w').write(s)
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',s.split('id="faq"')[1].split('<script>')[0],flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
order=[p for g,*_ in G for p in sorted([p for p in allp if p['group']==g],key=lambda x:-x['off'])]
il={"@context":"https://schema.org","@type":"ItemList","name":"Black Friday piano deals 2026","numberOfItems":len(order),"itemListElement":[{"@type":"ListItem","position":i+1,"name":p['name'],"url":U+'#'+p['id']} for i,p in enumerate(order)]}
faq={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(a)}} for q,a in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(il,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faq,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',s,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'faqs',len(qs),'full',s.count('class="pz-pick"'),'mini',s.count('class="bfp-mini'),'on sale',sum(cnt.values()),'amazon',len(set(re.findall(r'https://(?:amzn\.to|link\.amazon)/\w+',s))))
