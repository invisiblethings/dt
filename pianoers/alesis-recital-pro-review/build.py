import re, json, html as H
from PIL import Image
Y='2026/11'; B='https://pianoers.com/content/images'
AMZ='https://www.amazon.com/dp/B0G2YQP8KL'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
html=open('article.src.html').read().replace('{{AMZ}}',AMZ)
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html
open('article.html','w').write(html)
faq=html.split('id="faq"')[1]
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',faq,flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
items=lambda l:{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n} for i,n in enumerate(l)]}
prod={"@context":"https://schema.org","@type":"Product","name":"Alesis Recital Pro MKII","brand":{"@type":"Brand","name":"Alesis"},"model":"Recital Pro MKII",
 "image":[f"{B}/{Y}/alesis-recital-pro-mkii-review-featured.webp",f"{B}/{Y}/alesis-recital-pro-mkii-specs.webp"],
 "description":"88-key digital piano with weighted hammer-action keys, 25 sounds, 64-note polyphony, 2 x 10 W speakers, USB MIDI and audio, an included sustain pedal and optional battery power.",
 "review":{"@type":"Review","name":"Alesis Recital Pro MKII review","reviewRating":{"@type":"Rating","ratingValue":"3.4","bestRating":"5","worstRating":"1"},
  "author":{"@type":"Person","@id":"https://pianoers.com/#richard-abraham","name":"Richard J. Abraham"},
  "publisher":{"@id":"https://pianoers.com/#organization"},
  "reviewBody":"Not a great piano, but a fair price. The cheapest way to get 88 weighted keys and a pedal that won't feel like a toy, held back by a light, springy action and a flat piano sound. Best for occasional players on a budget of about $350.",
  "positiveNotes":items(["88 full-size weighted keys for about $350","Sustain pedal and music rest in the box","Runs on 6 AA batteries","USB audio and MIDI with one cable"]),
  "negativeNotes":items(["Light, springy keys with little grading","Flat, thin piano sound","Tiny footswitch pedal","No Bluetooth"])}}
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(prod,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'faqs',len(qs),'amazon',html.count(AMZ))
