import re, json, html as H, sys
from PIL import Image
sys.path.insert(0,'src')
from scales import SCALES
assert __import__('scales').check()
Y='2026/11'; B='https://pianoers.com/content/images'
U='https://pianoers.com/piano-scales-for-beginners/'
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
ORDER=['c-major','a-minor','g-major','e-minor','f-major','d-minor','d-major','a-major','e-major']
BY={s['id']:s for s in SCALES}
th=''.join(f'<th>{x}</th>' for x in ['Scale','Notes','Sharps or flats','Right hand','Left hand'])
tr=''
for i in ORDER:
    s=BY[i]; rh=' '.join(map(str,s['rh'])); lh=' '.join(map(str,s['lh']))
    if i=='f-major': rh=f'<strong>{rh}</strong>'
    tr+=f'<tr><td style="white-space:nowrap"><strong>{s["name"]}</strong></td><td style="white-space:nowrap">{" ".join(s["notes"])}</td><td>{s["sig"].split(" (")[0]}</td><td style="white-space:nowrap">{rh}</td><td style="white-space:nowrap">{lh}</td></tr>'
data=[dict(name=s['name'],notes=s['notes'],midi=s['midi'],rh=s['rh'],lh=s['lh'],sig=s['sig']) for s in (BY[i] for i in ORDER)]
player=open('src/player.tpl.html').read().replace('%DATA%',json.dumps(data,ensure_ascii=False,separators=(',',':')))
table=f'<div class="pz-table-wrap"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>'
html=open('article.src.html').read()
html=html.replace('{{player}}',player).replace('{{table}}',table)
html=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),html)
html=re.sub(r'\{\{yt:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:yt(m[1],m[2],m[3]),html)
html=re.sub(r'\n\s*\n','\n',html).strip()+'\n'
assert '<!--' not in html and '{{' not in html and '%DATA%' not in html
open('article.html','w').write(html)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',html.split('id="faq"')[1],flags=re.S)
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(x)}} for q,x in qs]}
howto={"@context":"https://schema.org","@type":"HowTo","name":"How to practise piano scales in 10 minutes a day","description":"A daily scale routine for beginner pianists, with a tempo ladder for building speed.",
 "image":f"{B}/{Y}/how-to-practice-piano-scales-routine.webp","totalTime":"PT10M",
 "tool":[{"@type":"HowToTool","name":"Piano or keyboard"},{"@type":"HowToTool","name":"Metronome"}],
 "step":[{"@type":"HowToStep","position":i+1,"name":n,"text":t,"url":U+"#how-to-practice"} for i,(n,t) in enumerate([
  ("Hands separately, slowly (2 minutes)","Play today's scales without a metronome, hands separately, and say the finger numbers out loud."),
  ("Your focus scale (3 minutes)","Turn on the metronome. After three clean runs in a row, move up one rung of the tempo ladder: 60 bpm one note per click, 60 bpm two notes per click, 80 bpm, 100 bpm, then hands together back at 60 bpm."),
  ("Review one older scale (3 minutes)","Rotate through the scales you already know so they don't fade."),
  ("Play with it (2 minutes)","Improvise with the pentatonic scale over a chord, or play your scale in a rhythm such as long-short or groups of three.")])]}
pdf={"@context":"https://schema.org","@type":"DigitalDocument","name":"Piano Scales for Beginners: Free Printable Chart","encodingFormat":"application/pdf",
 "url":"https://pianoers.com/content/files/2026/11/piano-scales-chart-for-beginners.pdf","isAccessibleForFree":True,"inLanguage":"en",
 "about":"The first 9 piano scales for beginners with right- and left-hand fingerings, beginner arpeggios and a practice tracker",
 "author":{"@id":"https://pianoers.com/#katarina"},"publisher":{"@id":"https://pianoers.com/#organization"},"isPartOf":{"@type":"WebPage","@id":U}}
out=''.join('<script type="application/ld+json">\n'+json.dumps(x,ensure_ascii=False,indent=1)+'\n</script>\n' for x in (faqld,howto,pdf))
open('code-injection-header.html','w').write(out)
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',html,flags=re.S); txt=re.sub(r'<noscript>.*?</noscript>','',txt,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'internal',len(re.findall(r'href="/[a-z0-9]',html)),'figs',html.count('kg-image-card'),'videos',html.count('kg-embed-card'),'faqs',len(qs),'h2',html.count('<h2'))
