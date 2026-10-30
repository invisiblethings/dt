import re
from PIL import Image
import widgets
Y='2026/10'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    b='https://pianoers.com/content/images'
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{b}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{b}/size/w600/{Y}/{name}.webp 600w, {b}/size/w1000/{Y}/{name}.webp 1000w, {b}/size/w1600/{Y}/{name}.webp 1600w, {b}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
W={'song':widgets.song(),'metro':widgets.metro(),'calc':widgets.calc(),'challenge':widgets.challenge()}
html=re.sub(r'\{\{w:(\w+)\}\}',lambda m:W[m[1]],html)
html=html.replace('{{assets}}',widgets.CSS+'\n'+widgets.JS)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html and '/*' not in html
open('article.html','w').write(html)
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal links',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('<figure'))
