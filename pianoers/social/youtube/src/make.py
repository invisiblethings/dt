import json
T='#2e6475';A='#f6b31e'
FONT='<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&display=swap" rel="stylesheet">'
def keys(n,wk,h,lit=()):
    o=''
    for i in range(n): o+=f'<rect x="{i*wk}" y="0" width="{wk-4}" height="{h}" rx="8" fill="{A if i in lit else "#f8f5ee"}"/>'
    for i in range(n-1):
        if i%7 in (2,6): continue
        o+=f'<rect x="{i*wk+wk*0.62}" y="0" width="{wk*0.6}" height="{h*0.62}" rx="6" fill="#0b1114"/>'
    return o
W,H=2560,1440
kb=keys(40,66,330,lit=(14,16,18))
body=f'''<div style="position:absolute;inset:0;background:radial-gradient(circle at 70% 35%,#25596d,#0f1a20 70%)"></div>
<svg style="position:absolute;left:0;bottom:0;opacity:.95" width="2640" height="330" viewBox="0 0 2640 330">{kb}</svg>
<div style="position:absolute;left:507px;width:1546px;top:509px;height:423px;display:flex;align-items:center;justify-content:center;gap:56px">
<div style="background:#f3f6f7;border-radius:22px;padding:26px 36px;flex:none"><img src="pianoers-logo.png" width="560" height="87" style="display:block"></div>
<div style="color:#fff;max-width:760px"><div style="font-size:64px;font-weight:800;line-height:1.04;letter-spacing:-.01em">Honest piano reviews &amp; easy lessons</div>
<div style="font-size:34px;font-weight:600;color:#cfe3ea;margin-top:16px">Digital pianos · apps · tips from a teacher since 2001</div></div></div>'''
doc=f'<!doctype html><html><head><meta charset="utf-8">{FONT}<style>*{{margin:0;box-sizing:border-box}}body{{width:{W}px;height:{H}px;overflow:hidden;position:relative;font-family:"Schibsted Grotesk",Arial,sans-serif}}</style></head><body>{body}</body></html>'
guide=doc.replace('</body>','<div style="position:absolute;left:507px;top:509px;width:1546px;height:423px;outline:6px dashed #ff3b3b"></div><div style="position:absolute;left:0;right:0;top:509px;height:423px;outline:4px dashed #ffd400"></div></body>')
json.dump([dict(name='pianoers-youtube-banner',w=W,h=H,html=doc,type='jpeg'),dict(name='banner-safe-area-check',w=W,h=H,html=guide,type='jpeg')],open('jobs.json','w'))
