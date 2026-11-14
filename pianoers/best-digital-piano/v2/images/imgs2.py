import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';R='#c2412d';BL='#3b6fd1';V='#7a4fc2';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'
BR={'Yamaha':V,'Roland':R,'Kawai':T,'Casio':BL}

tiers=[('Under $500','Beginners',G,[('Yamaha P-145BT','$500','Yamaha'),('Roland FP-10','$500','Roland'),('Kawai ES60','$450–$599','Kawai')]),
('$500 to $1,000','Best value',BL,[('Roland FP-30X','$650','Roland'),('Casio PX-S1100','$600–$730','Casio'),('Yamaha P-225','$770','Yamaha'),('Kawai ES120','$899–$999','Kawai')]),
('$1,000 to $2,500','Serious players',A,[('Kawai ES920','$1,699–$1,799','Kawai'),('Kawai KDP120','$1,899','Kawai'),('Roland FP-90X','$2,300','Roland')]),
('$2,500 and up','Home consoles',R,[('Yamaha CLP-835','about $3,200','Yamaha'),('Kawai CN301','$3,199–$3,499','Kawai'),('Yamaha CLP-885','about $6,700','Yamaha')])]
cols=''
for t,s,c,ms in tiers:
    it=''.join(f'<div style="display:flex;justify-content:space-between;gap:8px;padding:10px 0;border-top:1px solid {LINE}"><span style="font-size:18px;font-weight:800;color:{BR[b]}">{n}</span><span style="font-size:16px;font-weight:700;white-space:nowrap">{p}</span></div>' for n,p,b in ms)
    cols+=f'<div class="card" style="padding:14px 16px;border-top:8px solid {c}"><div style="font-size:22px;font-weight:800">{t}</div><div style="font-size:15px;color:{MU};font-weight:700;margin-bottom:6px">{s}</div>{it}</div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px">{cols}</div>
<div style="display:flex;gap:18px;margin-top:14px;font-size:16px;font-weight:700">{''.join(f'<span style="color:{c}">&#9632; {b}</span>' for b,c in BR.items())}</div>'''
imgs['best-digital-piano-by-budget']=(640,page(640,'By budget','Best digital pianos 2026 by budget',body,'US prices from retailers and the makers&#39; stores; they change often'))

q=lambda t,c: f'<div style="background:{c};color:#fff;border-radius:14px;padding:12px 16px;font-size:20px;font-weight:800;text-align:center">{t}</div>'
a=lambda t,s,c: f'<div class="card" style="padding:12px 14px;border-left:6px solid {c}"><div style="font-size:19px;font-weight:800">{t}</div><div style="font-size:15.5px;{SER};line-height:1.35;margin-top:2px">{s}</div></div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px">
<div style="display:grid;gap:10px;align-content:start">{q('Just starting out',G)}{a('Yamaha P-145BT','The safest first piano.',V)}{a('Roland FP-10','Best key feel at the price.',R)}{a('Kawai ES60','Best piano sound at the price.',T)}</div>
<div style="display:grid;gap:10px;align-content:start">{q('Want one that lasts',BL)}{a('Roland FP-30X','My pick for most people.',R)}{a('Kawai ES920','For intermediate to advanced players.',T)}{a('Roland FP-90X','The best portable, with the best speakers.',R)}</div>
<div style="display:grid;gap:10px;align-content:start">{q('It stays at home',T)}{a('Kawai KDP120','A real console under $2,000.',T)}{a('Yamaha CLP-835','The sweet spot of the Clavinova range.',V)}{a('Yamaha CLP-885','If budget is no object.',V)}</div></div>
<div class="card" style="padding:12px 20px;margin-top:14px;font-size:17.5px;{SER}"><b style="font-family:Schibsted Grotesk,Arial,sans-serif">Short on space?</b> Casio PX-S1100: about 9 inches deep and 11.2 kg.</div>'''
imgs['which-digital-piano-should-i-buy']=(660,page(660,'Choose in 10 seconds','Which digital piano should you buy?',body,'A piano teacher&#39;s shortlist for 2026'))

ft='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet"><style>*{margin:0;box-sizing:border-box}body{width:1200px;height:HHpx;background:radial-gradient(circle at 78% 22%,#21485a,#0f1a20 70%);font-family:"Schibsted Grotesk",Arial,sans-serif;color:#fff;overflow:hidden;position:relative}</style></head><body>
<div style="position:absolute;left:64px;top:T1px;width:580px"><div style="font-size:22px;font-weight:800;letter-spacing:.16em;color:#f6b31e">A PIANO TEACHER&#39;S PICKS &#183; 2026</div><div style="font-size:88px;font-weight:800;line-height:.96;margin:12px 0 18px">Best Digital Pianos</div><div style="font-size:28px;font-weight:500;line-height:1.3;color:#cfe3ea">Weighted-key picks for every budget, from $500 to console</div>
<div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">TILES</div></div>
<div style="position:absolute;right:40px;top:T2px;width:440px">KB</div>
<div style="position:absolute;left:64px;bottom:34px;font-size:20px;font-weight:800;letter-spacing:.14em;color:#8fd0a8">PIANOERS.COM</div></body></html>'''
tiles=''.join(f'<span style="background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:10px;padding:8px 12px;font-size:19px;font-weight:700">{t}</span>' for t in ['Under $500','Under $1,000','Under $2,500','Consoles'])
wk=''.join(f'<rect x="{i*30}" y="250" width="28" height="170" rx="4" fill="#f4f1ea"/>' for i in range(16))
bk=''.join(f'<rect x="{i*30+19}" y="250" width="18" height="105" rx="3" fill="#0b1114"/>' for i in range(15) if i%7 not in (2,6))
kb=f'''<svg viewBox="0 0 480 460" width="100%"><rect x="-10" y="200" width="500" height="56" rx="10" fill="#15191c"/><rect x="10" y="214" width="120" height="10" rx="5" fill="#2e6475"/><circle cx="440" cy="226" r="8" fill="#f6b31e"/>{wk}{bk}
<g font-family="Schibsted Grotesk,Arial" font-weight="800"><rect x="10" y="40" width="210" height="120" rx="16" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.2)"/><text x="30" y="88" font-size="40" fill="#f6b31e">88</text><text x="30" y="128" font-size="20" fill="#cfe3ea">weighted keys</text>
<rect x="240" y="40" width="230" height="120" rx="16" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.2)"/><text x="260" y="88" font-size="40" fill="#8fd0a8">13</text><text x="260" y="128" font-size="20" fill="#cfe3ea">models compared</text></g></svg>'''
ft=ft.replace('TILES',tiles).replace('KB',kb)
imgs['best-digital-pianos-featured']=(675,ft.replace('HH','675').replace('T1','130').replace('T2','90'))
imgs['best-digital-pianos-social']=(630,ft.replace('HH','630').replace('T1','108').replace('T2','70'))
json.dump(imgs,open('imgs2.json','w'))
