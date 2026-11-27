import re, json, html as H
from PIL import Image
Y='2026/11'; B='https://pianoers.com/content/images'; U='https://pianoers.com/black-friday-piano-deals/'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
html=open('article.src.html').read().replace('{{CARDS}}',open('cards.html').read().strip()).replace('{{ROWS}}',open('rows.html').read().strip())
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '{{' not in html and '<!--' not in html
open('article.html','w').write(html)
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',html.split('id="faq"')[1],flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
P=json.load(open('picks.json'))
il={"@context":"https://schema.org","@type":"ItemList","name":"Black Friday piano deals 2026: digital pianos worth buying","itemListOrder":"https://schema.org/ItemListOrderAscending","numberOfItems":len(P),
 "itemListElement":[{"@type":"ListItem","position":p['rank'],"name":p['name'],"url":U+'#'+p['id']} for p in P]}
faq={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(a)}} for q,a in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(il,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faq,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<[^>]+>',' ',html)
print('words',len(txt.split()),'faqs',len(qs),'cards',html.count('class="pz-pick"'),'amazon',len(re.findall(r'amzn\.to|link\.amazon',html)),'internal',len(set(re.findall(r'href="https://pianoers\.com/[^"#]+',html))))
