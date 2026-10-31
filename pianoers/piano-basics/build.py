import re
from PIL import Image
Y='2026/10'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    b=f'https://pianoers.com/content/images'
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{b}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{b}/size/w600/{Y}/{name}.webp 600w, {b}/size/w1000/{Y}/{name}.webp 1000w, {b}/size/w1600/{Y}/{name}.webp 1600w, {b}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
def snip(f,**rep):
    s=open(f'../theme/snippets/{f}').read()
    s=re.sub(r'<!--.*?-->\s*','',s,flags=re.S).strip()
    for a,b in rep.items(): s=s.replace(a,b)
    return s
taste=snip('chord-taste.html',**{'<p class="pz-taste-note">A taste of the chord-first approach, made by Pianoers. It isn’t a lesson from Pianoforall itself.</p>':''})
taste=taste.replace('30-second chord taste','Try it now')
ear=snip('ear-trainer.html').replace('data-link="/best-piano-lessons-online/"','data-link="/teach-yourself-piano/"')
L=lambda slug,text:f'<a href="/{slug}/">{text}</a>'
html=open('article.src.html').read()
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=html.replace('{{taste}}',taste).replace('{{ear}}',ear)
html=re.sub(r'\[\[([^|\]]+)\|([^\]]+)\]\]',lambda m:L(m[1],m[2]),html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html and '[[' not in html
open('article.html','w').write(html)
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'links',len(re.findall(r'href="/',html)),'figs',html.count('<figure'))
