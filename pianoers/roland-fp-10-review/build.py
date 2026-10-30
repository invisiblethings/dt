import re, json, html as H
from PIL import Image
Y='2026/10'; B='https://pianoers.com/content/images'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
def yt(vid,title,cap):
    return (f'<figure class="kg-card kg-embed-card kg-card-hascaption"><iframe width="560" height="315" src="https://www.youtube.com/embed/{vid}?feature=oembed" frameborder="0" loading="lazy" '
            f'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="{title}"></iframe>'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{yt:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:yt(m[1],m[2],m[3]),html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html
open('article.html','w').write(html)
faq=html.split('id="faq"')[1]
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',faq,flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
prod={"@context":"https://schema.org","@type":"Product","name":"Roland FP-10","brand":{"@type":"Brand","name":"Roland"},
 "image":[f"{B}/{Y}/roland-fp-10-digital-piano.webp",f"{B}/{Y}/roland-fp-10-being-played.webp",f"{B}/{Y}/roland-fp-10-review-featured.webp"],"description":"88-key digital piano with Roland's PHA-4 Standard action, SuperNATURAL Piano sound and Bluetooth MIDI.",
 "review":{"@type":"Review","name":"Roland FP-10 review","reviewRating":{"@type":"Rating","ratingValue":"4.3","bestRating":"5","worstRating":"1"},
  "author":{"@type":"Organization","name":"Pianoers.com","url":"https://pianoers.com/"},
  "positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n} for i,n in enumerate(["PHA-4 Standard keys with escapement and ivory feel","Expressive SuperNATURAL Piano sound","Bluetooth MIDI for learning apps","Twin Piano mode for lessons"])]},
  "negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n} for i,n in enumerate(["Small 2 x 6 W speakers","No Bluetooth audio","One 3.5 mm headphone jack only","Basic pedal switch included"])]}}}
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(prod,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'videos',html.count('kg-embed-card'),'faqs',len(qs))
