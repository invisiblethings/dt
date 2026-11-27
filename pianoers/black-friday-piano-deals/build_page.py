import re, json, html as H, sys
sys.path.insert(0,'images')
from PIL import Image
from kb import keyboard, white_seq
Y='2026/11'; B='https://pianoers.com/content/images'; U='https://pianoers.com/black-friday-piano-deals/'
P=json.load(open('picks.json'))
def img(path,alt):
    return f'<img src="{B}/size/w600/format/webp/{path}" srcset="{B}/size/w600/format/webp/{path} 600w, {B}/size/w1000/format/webp/{path} 1000w" sizes="(min-width: 640px) 220px, calc(100vw - 80px)" alt="{alt}" width="600" height="600" loading="lazy" decoding="async">'
def card(p):
    rev=f'<a class="pz-btn pz-btn-ghost" href="https://pianoers.com{p["rev"]}">Full review</a>' if p['rev'] else ''
    plate=''.join(f'<div><dt>{a}</dt><dd>{b}</dd></div>' for a,b in p['plate'])
    pros=''.join(f'<li>{x}</li>' for x in p['pros']); cons=''.join(f'<li>{x}</li>' for x in p['cons'])
    return (f'<section class="pz-pick" id="{p["id"]}" data-rank="{p["rank"]}" data-price="deal under {p["target"]}" data-name="{p["name"]}"><div class="pz-pick-head"><span class="pz-rank" aria-hidden="true">{p["rank"]}</span><span class="pz-best">{p["best"]}</span><h2>{p["name"]}</h2></div><div class="pz-pick-body"><div class="pz-pick-top">{img(*p["img"])}'
     f'<div class="pz-pick-main"><p class="pz-quote">Good deal under <strong>{p["target"]}</strong></p><p class="pz-verdict"><strong>Verdict:</strong> {p["verdict"]}</p>'
     f'<div class="pz-buy"><a class="pz-btn pz-btn-buy" href="{p["amz"]}" rel="sponsored nofollow noopener" target="_blank">Check price on Amazon</a>{rev}</div></div></div>'
     f'<dl class="pz-plate">{plate}</dl><div class="pz-pc"><div class="pz-pros"><p class="pz-pc-title">Why it\'s here</p><ul>{pros}</ul></div><div class="pz-cons"><p class="pz-pc-title">Watch out for</p><ul>{cons}</ul></div></div></div></section>')
short={'Alesis Recital Pro MKII':'Alesis MKII','Casio Privia PX-S1100':'Casio PX-S1100'}
chips=''.join(f'<button type="button" aria-pressed="false" data-name="{p["name"]}" data-target="{p["target"][1:]}" data-buy="{p["amz"]}" data-card="{p["id"]}">{short.get(p["name"],p["name"])}</button>' for p in P)
rows=''.join(f'<tr><td><a href="{U}#{p["id"]}"><strong>{p["name"]}</strong></a></td><td>{p["best"]}</td><td><strong>{p["target"]}</strong></td></tr>' for p in P)
fd={"prompt":"Press one key in each row and your match appears here.","questions":[
 {"id":"budget","label":"What's your budget?","options":[{"value":"low","label":"Up to $350","hint":"tight budget"},{"value":"mid","label":"About $450","hint":"the sweet spot"},{"value":"high","label":"Up to $700","hint":"buy once"}]},
 {"id":"need","label":"What matters most?","options":[{"value":"feel","label":"Key feel","hint":"like a real piano"},{"value":"sound","label":"Sound","hint":"tone first"},{"value":"apps","label":"Bluetooth","hint":"apps & songs"},{"value":"space","label":"Small space","hint":"slim & light"}]}],
 "matches":{"low|feel":{"pick":"alesis-recital-pro-mkii","why":"The cheapest weighted keys I'd recommend. Deal if under $320."},
 "low|sound":{"pick":"alesis-recital-pro-mkii","why":"Fine for occasional playing; for better sound, stretch to the Kawai ES60."},
 "low|apps":{"pick":"alesis-recital-pro-mkii","why":"USB audio and MIDI for apps. Bluetooth costs more."},
 "low|space":{"pick":"alesis-recital-pro-mkii","why":"23 lbs and runs on batteries."},
 "mid|feel":{"pick":"roland-fp-10","why":"Roland's PHA-4 keys. Deal if under $450."},
 "mid|sound":{"pick":"kawai-es60","why":"Shigeru Kawai concert grand samples. Deal if under $470."},
 "mid|apps":{"pick":"yamaha-p-145bt","why":"Bluetooth audio for lessons and songs. Deal if under $450."},
 "mid|space":{"pick":"yamaha-p-145bt","why":"Compact and only 24 lbs. Deal if under $450."},
 "high|feel":{"pick":"roland-fp-30x","why":"PHA-4 keys plus Bluetooth and bigger speakers. Deal if under $700."},
 "high|sound":{"pick":"kawai-es60","why":"Still the best piano sound here, with money left for a stand."},
 "high|apps":{"pick":"roland-fp-30x","why":"Bluetooth audio and MIDI built in."},
 "high|space":{"pick":"casio-privia-px-s1100","why":"About 9 inches deep. Deal if under $650."}}}
fb=('<div class="pz-finder" id="finder" data-finder="'+H.escape(json.dumps(fd,ensure_ascii=False),quote=True)+'"><p class="pz-eyebrow">Piano finder</p><h2>Not sure which one? Find yours in two taps</h2><ul class="pz-finder-fallback">'
    +''.join(f'<li><a href="#{p["id"]}">{p["best"]}: {p["name"]}</a></li>' for p in P)+'</ul></div>')
ws=white_seq('C2','C6'); kbs,kw=keyboard(ws,ww=20,wh=92,fill={'C4':'#f6b31e','E4':'#f6b31e','G4':'#f6b31e'},stroke='#c9c3b6',black='#0e1214')
keys=f'<svg viewBox="0 0 {kw} 92" preserveAspectRatio="none">{kbs}</svg>'
def fig(name,alt,cap):
    w,h=Image.open(f'images/{name}.webp').size
    return (f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{B}/{Y}/{name}.webp" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" '
            f'srcset="{B}/size/w600/{Y}/{name}.webp 600w, {B}/size/w1000/{Y}/{name}.webp 1000w, {B}/size/w1600/{Y}/{name}.webp 1600w, {B}/{Y}/{name}.webp {w}w" sizes="(min-width: 720px) 720px, 100vw">'
            f'<figcaption><span>{cap}</span></figcaption></figure>')
s=open('page.src.html').read()
s=s.replace('{{CARDS}}','\n'.join(card(p) for p in P)).replace('{{ROWS}}',rows).replace('{{CHIPS}}',chips).replace('{{FINDER}}',fb).replace('{{KEYS}}',keys)
s=re.sub(r'\{\{fig:([^|]+)\|([^|]+)\|([^}]+)\}\}',lambda m:fig(m[1],m[2],m[3]),s)
s=re.sub(r'\n\s*\n','\n',s).strip()+'\n'
assert '{{' not in s and '<!--' not in s
open('article.html','w').write(s)
qs=re.findall(r'<h3>(.*?)</h3>\s*<p>(.*?)</p>',s.split('id="faq"')[1].split('<script>')[0],flags=re.S)
st=lambda t:H.unescape(re.sub(r'<[^>]+>','',t)).strip()
il={"@context":"https://schema.org","@type":"ItemList","name":"Black Friday piano deals 2026: digital pianos worth buying","numberOfItems":len(P),
 "itemListElement":[{"@type":"ListItem","position":p['rank'],"name":p['name'],"url":U+'#'+p['id']} for p in P]}
faq={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":st(q),"acceptedAnswer":{"@type":"Answer","text":st(a)}} for q,a in qs]}
open('code-injection-header.html','w').write('<script type="application/ld+json">\n'+json.dumps(il,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faq,ensure_ascii=False,indent=1)+'\n</script>\n')
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',s,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('words',len(txt.split()),'faqs',len(qs),'cards',s.count('class="pz-pick"'),'size',len(s))
