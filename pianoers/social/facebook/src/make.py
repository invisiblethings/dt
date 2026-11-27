import json
T='#2e6475';TD='#1f4a58';A='#f6b31e';INK='#15191c';MU='#56666e';G='#2f9e5b'
FONT='<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;700;800&family=Lora:ital,wght@0,500;1,500&display=swap" rel="stylesheet">'
def doc(w,h,body,bg='#f3f6f7'):
    return f'<!doctype html><html><head><meta charset="utf-8">{FONT}<style>*{{margin:0;box-sizing:border-box}}body{{width:{w}px;height:{h}px;overflow:hidden;position:relative;background:{bg};font-family:"Schibsted Grotesk",Arial,sans-serif;color:{INK}}}</style></head><body>{body}</body></html>'
NOTE='<path fill="#fff" d="M54 18v48.5a13 13 0 1 1-6-11V30l22 6v-10z" transform="translate(0,0)"/>'
RING='<circle cx="50" cy="50" r="46" fill="none" stroke="#ffffff" stroke-opacity=".14" stroke-width="2"/>'
NOTEP='<path fill="#fff" d="M45 24 L45 62 A11 11 0 1 1 39 52.5 L39 22 Q52 26 62 34 Q66 39 62 44 Q58 38 45 34 Z"/>'
def mark(size,ring=True):
    r=RING if ring else ''
    return f'<svg width="{size}" height="{size}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="{T}"/>{r}{NOTEP}</svg>'
def keys(n,wk=46,h=200,y=0,x=0,lit=()):
    out=''
    for i in range(n):
        out+=f'<rect x="{x+i*wk}" y="{y}" width="{wk-3}" height="{h}" rx="6" fill="{A if i in lit else "#f8f5ee"}"/>'
    for i in range(n-1):
        if i%7 in (2,6): continue
        out+=f'<rect x="{x+i*wk+wk*0.62}" y="{y}" width="{wk*0.6}" height="{h*0.62}" rx="4" fill="#0b1114"/>'
    return out
jobs=[]
jobs.append(dict(name='pianoers-facebook-profile-picture',w=720,h=720,html=doc(720,720,f'<div style="position:absolute;inset:0;display:grid;place-items:center">{mark(560)}</div>',bg=A)))
kb=keys(26,48,250,0,0,lit=(9,11,13))
cover=f'''<div style="position:absolute;inset:0;background:radial-gradient(circle at 80% 30%,#24566a,#0f1a20 72%)"></div>
<svg style="position:absolute;right:-30px;bottom:-40px;opacity:.9" width="1240" height="290" viewBox="0 0 1250 260">{kb}</svg>
<div style="position:absolute;left:0;right:0;top:120px;text-align:center">
<div style="display:inline-block;background:#f3f6f7;border-radius:18px;padding:22px 34px"><img src="pianoers-logo.png" width="560" height="87"></div>
<div style="font-size:46px;font-weight:800;color:#fff;margin-top:30px;letter-spacing:-.01em">Piano gear, lessons and tips you can trust</div>
<div style="font-size:28px;font-weight:600;color:#cfe3ea;margin-top:12px">Honest guides from a piano teacher since 2001</div></div>'''
jobs.append(dict(name='pianoers-facebook-cover',w=1640,h=624,html=doc(1640,624,cover)))
def post(name,eyebrow,title,sub,visual,cta='pianoers.com',bg=None,more='Read the full guide &#8594;'):
    body=f'''<div style="position:absolute;inset:0;background:{bg or 'linear-gradient(160deg,#f3f6f7,#e6eef0)'}"></div>
<div style="position:absolute;left:80px;right:80px;top:80px">
<div style="display:flex;align-items:center;gap:16px">{mark(64,False)}<div style="font-size:26px;font-weight:800;letter-spacing:.18em;color:{T}">PIANOERS.COM</div></div>
<div style="font-size:30px;font-weight:800;letter-spacing:.14em;color:{A};margin-top:56px">{eyebrow}</div>
<div style="font-size:84px;line-height:1.02;font-weight:800;letter-spacing:-.015em;margin-top:14px">{title}</div>
<div style="font-family:Lora,serif;font-size:36px;line-height:1.35;color:#33424a;margin-top:26px">{sub}</div>
<div style="margin-top:80px">{visual}</div></div>
<div style="position:absolute;left:80px;right:80px;bottom:80px;display:flex;justify-content:space-between;align-items:center"><span style="background:{T};color:#fff;border-radius:999px;padding:18px 32px;font-size:30px;font-weight:800">{cta}</span><span style="font-size:24px;color:{MU};font-weight:700">{more}</span></div>'''
    jobs.append(dict(name=name,w=1080,h=1080,html=doc(1080,1080,body),type='jpeg'))
chip=lambda t,c: f'<span style="display:inline-block;background:#fff;border:2px solid {c};color:{INK};border-radius:20px;padding:22px 30px;font-size:40px;font-weight:800;margin:0 16px 20px 0">{t}</span>'
post('fb-post-welcome','WELCOME','Hi, we&#39;re Pianoers','Honest reviews of piano apps, courses and digital pianos, plus practice tips from a teacher who has taught since 2001.',
 f'<svg width="920" height="300" viewBox="0 0 920 300">{keys(19,48,300,0,0,lit=(7,9,11))}</svg>',more='Guides, reviews and tips &#8594;')
post('fb-post-best-digital-pianos','BUYING GUIDE','Best digital pianos for every budget','From $500 beginner pianos to home consoles, with the specs checked against the makers&#39; own sheets.',
 ''.join(chip(t,c) for t,c in [('Under $500',G),('Under $1,000','#3b6fd1'),('Under $2,500',A),('Consoles','#c2412d')]),cta='pianoers.com/best-digital-piano')
post('fb-post-tune-a-piano','HOW TO','Can you tune a piano yourself?','Yes, with a lever, mutes and an app. Here are the 8 steps, and when to call a technician instead.',
 ''.join(chip(t,c) for t,c in [('Tuning lever',T),('Mutes','#c2412d'),('A tuning app',G),('3&#8211;4 hours',A)]),cta='pianoers.com')
post('fb-post-piano-methods','FOR PARENTS AND ADULTS','Faber, Alfred&#39;s or Suzuki?','The five most popular piano methods compared: ages, approach, and which one fits you.',
 ''.join(chip(t,c) for t,c in [('Faber Piano Adventures',T),('Alfred&#39;s','#3b6fd1'),('Bastien','#7a4fc2'),('Suzuki',G),('Simply Music',A)]),cta='pianoers.com')
BARS=''.join('<div style="flex:1;height:170px;background:%s;border-radius:16px;color:#fff;display:grid;place-items:center;font-size:30px;font-weight:800;line-height:1;text-align:center">15<br>min</div>'%G for _ in range(7))
DAYS=''.join('<span>%s</span>'%d for d in ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"])
VIS='<div style="display:flex;gap:16px">'+BARS+'</div><div style="display:flex;justify-content:space-between;font-size:26px;font-weight:800;color:%s;margin-top:12px">'%MU+DAYS+'</div>'
post('fb-post-practice-tip','PRACTICE TIP','15 minutes a day beats 2 hours on Sunday','Short, daily practice is how fingers learn. Set a timer, play slowly, stop while it still feels good.',VIS,cta='pianoers.com',more='More practice tips &#8594;')
json.dump(jobs,open('jobs.json','w'))
