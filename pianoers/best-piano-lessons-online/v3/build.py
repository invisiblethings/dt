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
H2={'pianoforall':'Pianoforall: best online piano course for adult beginners','simply-piano':'Simply Piano: best piano app for kids and game-style practice','piano-marvel':'Piano Marvel: best for sight-reading and exam prep','playground-sessions':'Playground Sessions: best guided path of popular songs','skoove':'Skoove: best for instant note feedback on a budget','pianote':'Pianote: best video-lesson library with teacher support','flowkey':'Flowkey: best for learning popular songs on any piano','piano-by-pictures':'Piano by Pictures: best for visual learners'}
NAME={'pianoforall':'Pianoforall','simply-piano':'Simply Piano','piano-marvel':'Piano Marvel','playground-sessions':'Playground Sessions','skoove':'Skoove','pianote':'Pianote','flowkey':'Flowkey','piano-by-pictures':'Piano by Pictures'}
PRICE={'simply-piano':'$169.90 a year','playground-sessions':'$149.99 a year'}
picks={}
for sec in re.findall(r'<section class="pz-pick".*?</section>',open('live-picks.html').read(),re.S):
    pid=re.search(r'id="([^"]+)"',sec).group(1)
    sec=re.sub(r'<h2>[^<]*</h2>',f'<h2>{H2[pid]}</h2>',sec,1)
    sec=re.sub(r'([Cc])hecked Oct (?:11|19), 2026',r'\1hecked Oct 31, 2026',sec)
    sec=sec.replace('https://pianoers.com/content/images/','/content/images/')
    sec=sec.replace(f'id="{pid}"',f'id="{pid}" data-name="{NAME[pid]}"',1)
    if pid in PRICE: sec=re.sub(r'data-price="[^"]*"',f'data-price="{PRICE[pid]}"',sec,1)
    if pid=='pianoforall': sec=sec.replace('data-name="Pianoforall"','data-name="Pianoforall" data-bar-label="Try free for 7 days"',1)
    picks[pid]=sec
raw={'quiz':open('parts/quiz.html').read(),'taste':open('parts/taste.html').read()}
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{yt:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:yt(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{raw:([a-z]+)\}\}',lambda m:raw[m[1]],html)
html=re.sub(r'\{\{pick:([a-z-]+)\}\}',lambda m:picks[m[1]],html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html
open('article.html','w').write(html)
faq=html.split('id="faq"')[1]
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',faq,flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
U='https://pianoers.com/best-piano-lessons-online/'
il={"@context":"https://schema.org","@type":"ItemList","name":"Best online piano lessons 2026","itemListOrder":"https://schema.org/ItemListOrderAscending","numberOfItems":8,
 "itemListElement":[{"@type":"ListItem","position":i+1,"name":NAME[p],"url":f"{U}#{p}"} for i,p in enumerate(H2)]}
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(il,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'videos',html.count('kg-embed-card'),'faqs',len(qs),'picks',len(picks))
