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
app={"@context":"https://schema.org","@type":"SoftwareApplication","name":"Synthesia","applicationCategory":"GameApplication","operatingSystem":"Windows, macOS, iPadOS, Android, ChromeOS","softwareVersion":"10.9","author":{"@type":"Organization","name":"Synthesia LLC","url":"https://synthesia.app/"},
 "image":[f"{B}/{Y}/synthesia-app.webp",f"{B}/{Y}/synthesia-piano-review-featured.webp"],
 "description":"Falling-notes piano learning game that plays any MIDI or MusicXML song, listens to a MIDI keyboard and scores you in melody practice, rhythm practice and recital modes.",
 "offers":{"@type":"Offer","name":"Synthesia unlock key","price":"29.00","priceCurrency":"USD","url":"https://synthesia.app/unlock"},
 "review":{"@type":"Review","name":"Synthesia piano review","reviewRating":{"@type":"Rating","ratingValue":"3.9","bestRating":"5","worstRating":"1"},
  "author":{"@type":"Organization","name":"Pianoers.com","url":"https://pianoers.com/"},
  "positiveNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n} for i,n in enumerate(["Plays any MIDI or MusicXML song","Melody practice waits for the right note","One-time unlock that works on PC, Mac, iPad and Android","Optional sheet music, finger hints and key lights"])]},
  "negativeNotes":{"@type":"ItemList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n} for i,n in enumerate(["No lessons, theory or technique","Easy to rely on falling notes instead of reading","Needs a MIDI keyboard for feedback","Last major update in December 2022"])]}}}
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(app,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'videos',html.count('kg-embed-card'),'faqs',len(qs))
