import re, json, html as H
from PIL import Image
Y='2026/10'; B='https://pianoers.com/content/images'
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
SEP_DT='<span class="pz-visually-hidden">: </span>'
SEP_DD='<span class="pz-visually-hidden">. </span>'
def plate_seps(h):
    h=re.sub(r'</dt>',SEP_DT+'</dt>',h)
    return re.sub(r'</dd>',SEP_DD+'</dd>',h)
PR={
'pianoforall':[('Free trial','7 days'),('One-time price','$49 for lifetime access (normally $79)'),('Money-back guarantee','60 days')],
'simply-piano':[('Monthly plan','$17.90 a month'),('Yearly plan','$169.90 a year'),('Family monthly plan','$23.90 a month'),('Family yearly plan','$209.90 a year')],
'piano-marvel':[('Free plan','$0'),('Monthly plan','$17.99 a month'),('Yearly plan','$129.99 a year (works out to $10.84 a month)')],
'playground-sessions':[('Monthly plan','$19.99 a month'),('Yearly plan','$149.99 a year (the first year is often $99.99)'),('Lifetime plan','$219.99 to $349.99, one-time')],
'skoove':[('Free plan','Skoove Basic, with selected lessons'),('Monthly plan','$29.99 a month'),('3-month plan','$59.99 every 3 months (works out to $19.99 a month)'),('Yearly plan','$149.99 a year (works out to $12.49 a month)')],
'pianote':[('Monthly plan','$30 a month'),('Yearly plan','$279 a year (works out to $23.25 a month)'),('Lessons-only plan','$25 a month, or $229 a year')],
'flowkey':[('Free account','a few songs and lessons'),('Premium monthly plan','$24.99 a month'),('Premium yearly plan','$149.99 a year'),('Classic plan','$16.49 a month, or $99.99 a year')],
'piano-by-pictures':[('Free trial','the first month'),('Monthly plan','$49 a month after the free month')]}
CELL={'pianoforall':['One-time: $49'],'simply-piano':['Monthly: $17.90','Yearly: $169.90'],'piano-marvel':['Free plan: $0','Monthly: $17.99','Yearly: $129.99'],'playground-sessions':['Monthly: $19.99','Yearly: $149.99','Lifetime: $219.99 to $349.99'],'skoove':['Free plan: Basic','Monthly: $29.99','Yearly: $149.99'],'pianote':['Monthly: $30','Yearly: $279'],'flowkey':['Free account','Monthly: $24.99','Yearly: $149.99'],'piano-by-pictures':['First month: free','Monthly: $49']}
PLATE={'pianoforall':'One-time $49','simply-piano':'Monthly $17.90 · Yearly $169.90','piano-marvel':'Free plan · Monthly $17.99 · Yearly $129.99','playground-sessions':'Monthly $19.99 · Yearly $149.99','skoove':'Monthly $29.99 · Yearly $149.99','pianote':'Monthly $30 · Yearly $279','flowkey':'Monthly $24.99 · Yearly $149.99','piano-by-pictures':'Monthly $49 after the free month'}
def prices(pid):
    li=''.join(f'<li><strong>{a}:</strong> {b}</li>' for a,b in PR[pid])
    return f'<p><strong>{NAME[pid]} prices</strong> (US):</p><ul class="pz-prices">{li}</ul>'
def cell(pid):
    return ''.join(f'<span style="display:block">{x}</span>'+('<span class="pz-visually-hidden">; </span>' if i<len(CELL[pid])-1 else '') for i,x in enumerate(CELL[pid]))
H2={'pianoforall':'Pianoforall: best online piano course for adult beginners','simply-piano':'Simply Piano: best piano app for kids and game-style practice','piano-marvel':'Piano Marvel: best for sight-reading and exam prep','playground-sessions':'Playground Sessions: best guided path of popular songs','skoove':'Skoove: best for instant note feedback on a budget','pianote':'Pianote: best video-lesson library with teacher support','flowkey':'Flowkey: best for learning popular songs on any piano','piano-by-pictures':'Piano by Pictures: best for visual learners'}
NAME={'pianoforall':'Pianoforall','simply-piano':'Simply Piano','piano-marvel':'Piano Marvel','playground-sessions':'Playground Sessions','skoove':'Skoove','pianote':'Pianote','flowkey':'Flowkey','piano-by-pictures':'Piano by Pictures'}
PRICE={'simply-piano':'$169.90 a year','playground-sessions':'$149.99 a year'}
picks={}
for sec in re.findall(r'<section class="pz-pick".*?</section>',open('live-picks.html').read(),re.S):
    pid=re.search(r'id="([^"]+)"',sec).group(1)
    sec=re.sub(r'<h2>[^<]*</h2>',f'<h2>{H2[pid]}</h2>',sec,1)
    sec=re.sub(r'\.?\s*[Cc]hecked Oct (?:11|19), 2026','',sec)
    sec=sec.replace('https://pianoers.com/content/images/','/content/images/')
    sec=sec.replace(f'id="{pid}"',f'id="{pid}" data-name="{NAME[pid]}"',1)
    if pid in PRICE: sec=re.sub(r'data-price="[^"]*"',f'data-price="{PRICE[pid]}"',sec,1)
    sec=re.sub(r'(<dt>Price</dt><dd>)[^<]*(</dd>)',lambda m:m.group(1)+PLATE[pid]+m.group(2),sec)
    if pid!='pianoforall': sec=re.sub(r'(<span class="pz-price-note">)[^<]*(</span>)',lambda m:m.group(1)+PLATE[pid]+m.group(2),sec)
    sec=plate_seps(sec)
    if pid=='pianoforall': sec=sec.replace('data-name="Pianoforall"','data-name="Pianoforall" data-bar-label="Try free for 7 days"',1)
    picks[pid]=sec
raw={'quiz':open('parts/quiz.html').read(),'taste':open('parts/taste.html').read()}
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{yt:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:yt(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{raw:([a-z]+)\}\}',lambda m:raw[m[1]],html)
html=re.sub(r'\{\{pick:([a-z-]+)\}\}',lambda m:picks[m[1]],html)
html=re.sub(r'\{\{prices:([a-z-]+)\}\}',lambda m:prices(m[1]),html)
html=re.sub(r'\{\{cell:([a-z-]+)\}\}',lambda m:cell(m[1]),html)
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
