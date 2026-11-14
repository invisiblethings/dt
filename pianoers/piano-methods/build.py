import re, json, html as H
from PIL import Image
Y='2026/11'; B='https://pianoers.com/content/images'
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
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{yt:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:yt(m[1],m[2],m[3]),html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html
open('article.html','w').write(html)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
faq=html.split('id="faq"')[1]
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',faq,flags=re.S)
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'videos',html.count('kg-embed-card'),'faqs',len(qs))
