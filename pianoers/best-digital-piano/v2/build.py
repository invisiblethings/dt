import re, json, html as H
from PIL import Image
from picks import PICKS
Y='2026/11'; B='https://pianoers.com/content/images'
U='https://pianoers.com/best-digital-piano/'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
def yt(vid,title,cap):
    return (f'<figure class="kg-card kg-embed-card kg-card-hascaption pz-yt-card"><a class="pz-yt" href="https://www.youtube.com/watch?v={vid}" data-yt="{vid}" target="_blank" rel="noopener">'
            f'<img src="https://i.ytimg.com/vi/{vid}/hqdefault.jpg" alt="Video: {title}" width="480" height="360" loading="lazy" decoding="async">'
            f'<span class="pz-yt-play" aria-hidden="true"></span><span class="pz-visually-hidden">Play video: {title} (YouTube)</span></a>'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
SDT='<span class="pz-visually-hidden">: </span>'; SDD='<span class="pz-visually-hidden">. </span>'
def card(i,p):
    href,label,rel=p['buy']
    note='Affiliate link' if 'sponsored' in rel else 'Manufacturer page'
    plate=''.join(f'<div><dt>{a}{SDT}</dt><dd>{b}{SDD}</dd></div>' for a,b in p['plate'] if a!='Price')
    pros=''.join(f'<li>{x}</li>' for x in p['pros']); cons=''.join(f'<li>{x}</li>' for x in p['cons'])
    return (f'<section class="pz-pick" id="{p["id"]}" data-rank="{i}" data-price="{p["price"]}" data-name="{p["name"]}">'
            f'<div class="pz-pick-head"><span class="pz-rank" aria-hidden="true">{i}</span><span class="pz-best">{p["best"]}</span><h2>{p["h2"]}</h2></div>'
            f'<div class="pz-pick-body"><div class="pz-pick-top pz-pick-top-solo"><div class="pz-pick-main"><p class="pz-verdict"><strong>Verdict:</strong> {p["verdict"]}</p>'
            f'<div class="pz-buy"><a class="pz-btn pz-btn-buy" href="{href}" rel="{rel}" target="_blank">{label}</a><span class="pz-price-note">{p["price"]} · {note}</span></div></div></div>'
            f'<dl class="pz-plate">{plate}</dl>'
            f'<div class="pz-pc"><div class="pz-pros"><p class="pz-pc-title">What I like</p><ul>{pros}</ul></div><div class="pz-cons"><p class="pz-pc-title">Drawbacks</p><ul>{cons}</ul></div></div></div></section>')
cards={p['id']:card(i+1,p) for i,p in enumerate(PICKS)}
ROWS=[('Yamaha P-145BT','$499.99','GHC','CFIIIS sample','7 W + 7 W','11.1 kg','Beginners','under-500'),
('Roland FP-10','$499.99','PHA-4 Standard','SuperNATURAL Piano','6 W + 6 W','12.6 kg','Best feel on a budget','under-500'),
('Kawai ES60','$450 to $599','Responsive Hammer Lite','SK-EX sample','10 W + 10 W','11 kg','Best sound on a budget','under-500'),
('Roland FP-30X','$649.99','PHA-4 Standard','SuperNATURAL Piano','11 W + 11 W','14.8 kg','Most people','roland-fp-30x'),
('Casio PX-S1100','$599.99 to $729.99','Smart Scaled Hammer','AiR','not listed','11.2 kg','Small spaces','casio-px-s1100'),
('Yamaha P-225','$769.99','GHC','CFX sample','7 W + 7 W','11.5 kg','Yamaha fans','yamaha-p-225'),
('Kawai ES120','$899 to $999','Responsive Hammer Compact','Kawai sample','not listed','12 kg','Kawai fans','kawai-es120'),
('Kawai ES920','$1,699 to $1,799','Responsive Hammer III','SK-EX and more','20 W + 20 W','17 kg','Intermediate to advanced','kawai-es920'),
('Kawai KDP120','$1,899','Responsive Hammer Compact II','88-key sampling','20 W + 20 W','37 kg','Home, on a budget','kawai-kdp120'),
('Roland FP-90X','$2,299.99','PHA-50','Modeling','60 W total','23.6 kg','Best portable','roland-fp-90x'),
('Yamaha CLP-835','about $3,200','GrandTouch-S','CFX and Bösendorfer','30 W + 30 W','console','Serious home players','yamaha-clp-835'),
('Kawai CN301','$3,199 to $3,499','Responsive Hammer III','Kawai sample','40 W total','console','Kawai console','kawai-cn301'),
('Yamaha CLP-885','about $6,700','GrandTouch','CFX and Bösendorfer','300 W total','console','No-compromise home','yamaha-clp-885')]
th=''.join(f'<th>{x}</th>' for x in ['Model','Price (US)','Key action','Piano sound','Speakers','Weight','Best for'])
tr=''.join(f'<tr><td><a href="#{r[7]}"><strong>{r[0]}</strong></a></td>'+''.join(f'<td>{x}</td>' for x in r[1:7])+'</tr>' for r in ROWS)
table=f'<div class="pz-table-wrap"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div><p><small>Prices checked in November 2026. Weights are for the piano alone.</small></p>'
html=open('article.src.html').read()
html=html.replace('{{table}}',table)
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{yt:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:yt(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{pick:([a-z0-9-]+)\}\}',lambda m:cards[m[1]],html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html
used=re.findall(r'class="pz-pick" id="([^"]+)"',html); assert len(used)==len(PICKS)==len(set(used)),used
open('article.html','w').write(html)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',html.split('id="faq"')[1],flags=re.S)
il={"@context":"https://schema.org","@type":"ItemList","name":"Best digital pianos 2026","itemListOrder":"https://schema.org/ItemListOrderAscending","numberOfItems":len(PICKS),
 "itemListElement":[{"@type":"ListItem","position":i+1,"name":p['name'],"url":f"{U}#{p['id']}"} for i,p in enumerate(PICKS)]}
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(il,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'videos',html.count('kg-embed-card'),'faqs',len(qs),'picks',len(used))
