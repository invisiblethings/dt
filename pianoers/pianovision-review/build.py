import re, json, html as H
from PIL import Image
Y='2026/10'; B='https://pianoers.com/content/images'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
def img(path,w,h,alt,cap):
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{path}" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{path} 600w, {B}/{path} {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
def yt(vid,title,cap):
    return (f'<figure class="kg-card kg-embed-card kg-card-hascaption"><iframe width="560" height="315" src="https://www.youtube.com/embed/{vid}?feature=oembed" frameborder="0" loading="lazy" '
            f'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="{title}"></iframe>'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{img:([^|]+)\|([^|]+)\|([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:img(m[1],m[2],m[3],m[4],m[5]),html)
html=re.sub(r'\{\{yt:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:yt(m[1],m[2],m[3]),html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html
open('article.html','w').write(html)
faq=html.split('id="faq"')[1]
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',faq,flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
app={"@context":"https://schema.org","@type":"SoftwareApplication","name":"PianoVision","applicationCategory":"EducationalApplication","operatingSystem":"Meta Horizon OS (Meta Quest 3, Quest 3S, Quest Pro, Quest 2)",
 "image":[f"{B}/{Y}/pianovision-app.webp",f"{B}/{Y}/pianovision-review-featured.webp"],
 "description":"Mixed reality piano learning app for Meta Quest that shows falling notes on your real keyboard, with MIDI keyboard support, hand tracking and an optional PianoVision Plus song library.",
 "offers":{"@type":"Offer","name":"PianoVision Basic","price":"9.99","priceCurrency":"USD","url":"https://www.meta.com/experiences/pianovision/5271074762922599/"},
 "review":{"@type":"Review","name":"PianoVision review","reviewRating":{"@type":"Rating","ratingValue":"4.1","bestRating":"5","worstRating":"1"},
  "author":{"@type":"Organization","name":"Pianoers.com","url":"https://pianoers.com/"},
  "positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n} for i,n in enumerate(["Notes fall onto your real keys in mixed reality","Accurate feedback and Wait mode with a MIDI keyboard","Basic costs $9.99 one-time","MIDI song uploads with the free desktop app"])]},
  "negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n} for i,n in enumerate(["Needs a Meta Quest headset","Popular songs require the Plus subscription","Does not build sight-reading on its own","No note detection on an acoustic piano without MIDI"])]}}}
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(app,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'videos',html.count('kg-embed-card'),'faqs',len(qs))
