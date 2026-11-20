import re
from PIL import Image
import quiz
Y='2026/10'; B='https://pianoers.com/content/images'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
def img(path,w,h,alt,cap):
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}{path}" class="kg-image" alt="{alt}" fetchpriority="high" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600{path} 600w, {B}/size/w1000{path} 1000w, {B}{path} {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{img:([^|]+)\|(\d+)\|(\d+)\|([^|]+)\|([^}]+)\}\}',lambda m:img(m[1],m[2],m[3],m[4],m[5]),html)
html=html.replace('{{quiz}}',quiz.html()).replace('{{assets}}',quiz.CSS+'\n'+quiz.JS)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html
open('article.html','w').write(html)
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('<figure'))
