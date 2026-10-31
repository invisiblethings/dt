import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';BL='#3b6fd1';V='#7a4fd0';R='#c2412d';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

ways=[('1','Apps that listen','Notes on screen; the app hears you through the mic or a MIDI cable and reacts instantly.','$100–$170 a year','Instant, automatic','Simply Piano, Skoove, Flowkey, Piano Marvel, Playground Sessions',BL),
('2','Video courses','Step-by-step lessons you watch and copy, at your own pace. Some are one-time purchases.','$49 once to $279 a year','None, or teacher Q&As','Pianoforall, Pianote (Musora), Piano by Pictures',G),
('3','Live online teachers','A real teacher on a video call watches your hands, posture and sound.','About $20–$30+ a lesson','A human, every lesson','Online Piano Teachers and other teacher marketplaces',V),
('4','Free resources','YouTube channels and free lesson sites. Great for extras, but no plan or feedback.','$0','None','Hoffman Academy (kids), YouTube channels',A)]
cards=''.join(f'''<div class="card" style="padding:20px 22px;border-top:8px solid {c}">
<div style="display:flex;align-items:center;gap:12px"><span style="width:42px;height:42px;border-radius:50%;background:{c};color:#fff;display:grid;place-items:center;font-size:22px;font-weight:800">{n}</span><span style="font-size:25px;font-weight:800;line-height:1.1">{t}</span></div>
<div style="font-size:18px;{SER};line-height:1.42;margin:10px 0 12px">{d}</div>
<div style="display:grid;grid-template-columns:110px minmax(0,1fr);gap:6px 10px;font-size:17px;border-top:1px solid {LINE};padding-top:10px"><b style="color:{MU}">Cost</b><span style="font-weight:700">{p}</span><b style="color:{MU}">Feedback</b><span style="font-weight:700">{f}</span><b style="color:{MU}">Examples</b><span>{e}</span></div></div>''' for n,t,d,p,f,e,c in ways)
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">{cards}</div><div class="card" style="padding:14px 22px;margin-top:16px;font-size:19px;line-height:1.45"><b>My advice as a teacher:</b> most adults do best with a course or app for daily practice, plus an occasional live lesson to check technique.</div>'
imgs['4-ways-to-learn-piano-online']=(930,page(930,'The big picture','4 ways to take piano lessons online',body,'Prices in US dollars'))

costs=[('Pianoforall','$49 once, lifetime',49,G),('Piano Marvel','Premium, yearly',129.99,BL),('Skoove','12-month plan',149.99,BL),('Flowkey','Premium, yearly',149.99,BL),('Playground Sessions','yearly (first year often $99.99)',149.99,BL),('Simply Piano','Individual, yearly',169.90,BL),('Pianote (Musora)','yearly, with songs',279,G),('Piano by Pictures','free month, then 11 x $49',539,G),('Live teacher, 30 min a week','from $20 a lesson, 52 lessons',1040,V),('Live teacher, 60 min a week','from $30 a lesson, 52 lessons',1560,V)]
mx=1560
rows=''
for n,s,v,c in costs:
    w=max(v/mx*100,1.2)
    rows+=f'<div style="display:grid;grid-template-columns:330px minmax(0,1fr) 110px;align-items:center;gap:14px;padding:7px 0;border-top:1px solid {LINE}"><span><b style="font-size:20px">{n}</b><br><span style="font-size:15px;color:{MU}">{s}</span></span><span style="height:22px;border-radius:7px;background:#eef2f3"><span style="display:block;height:100%;width:{w:.1f}%;background:{c};border-radius:7px"></span></span><b style="font-size:21px;text-align:right">${v:,.2f}</b></div>'
leg=''.join(f'<span style="display:inline-flex;align-items:center;gap:8px;margin-right:22px"><span style="width:16px;height:16px;border-radius:4px;background:{c}"></span>{t}</span>' for t,c in [('App that listens',BL),('Video course',G),('Live teacher',V)])
body=f'<div class="card" style="padding:10px 26px 14px">{rows}</div><div style="margin-top:14px;font-size:18px;color:{MU};display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px"><span>{leg}</span><span>US prices. Live lesson rates: Online Piano Teachers &#8220;starting from&#8221;.</span></div>'
imgs['online-piano-lessons-cost-per-year']=(920,page(920,'Cost','What online piano lessons cost in year one',body,'Cheapest plan you would actually keep for 12 months'))

hdr=['Hears your notes','Works on an acoustic piano','A human checks you','No subscription']
Y='<span style="color:#1f7a4d;font-size:26px;font-weight:800">&#10003;</span>';N='<span style="color:#b3261e;font-size:24px;font-weight:800">&#10005;</span>';P=lambda t:f'<span style="font-size:15px;font-weight:700;color:#8a6100">{t}</span>'
mat=[('Pianoforall',N,Y,P('email questions'),Y),('Simply Piano',Y,Y,N,N),('Piano Marvel',Y,P('MIDI best'),N,P('free plan')),('Playground Sessions',Y,P('MIDI best'),N,P('lifetime plan')),('Skoove',Y,Y,P('instructor support'),N),('Pianote (Musora)',N,Y,P('Q&amp;As, support'),N),('Flowkey',Y,Y,N,N),('Piano by Pictures',N,Y,P('none stated'),N),('Live online teacher',Y,Y,Y,Y)]
th=''.join(f'<th style="padding:10px 8px;font-size:16px;color:{MU};text-align:center;width:180px">{h}</th>' for h in hdr)
tr=''.join(f'<tr style="border-top:1px solid {LINE};{"background:#f6f2ff" if a.startswith("Live") else ""}"><td style="padding:11px 10px;font-size:20px;font-weight:800">{a}</td>'+''.join(f'<td style="text-align:center;padding:8px">{x}</td>' for x in r)+'</tr>' for a,*r in mat)
body=f'<div class="card" style="padding:8px 18px"><table style="width:100%;border-collapse:collapse"><tr><th></th>{th}</tr>{tr}</table></div><div style="margin-top:12px;font-size:17px;color:{MU}">&#8220;Hears your notes&#8221; means the app detects what you play, through the microphone or a MIDI cable. Based on each company&#39;s own pages.</div>'
imgs['who-listens-online-piano-lessons-feedback']=(800,page(800,'Feedback','Who actually listens to you play?',body,'Pianoers.com comparison'))

tri=[('Pianoforall','7-day free trial',7,'then $49 once; 60-day money-back guarantee',60,G),('Pianote (Musora)','7-day free trial',7,'90-day money-back guarantee',90,G),('Flowkey','7-day trial on yearly plans',7,'14-day money-back guarantee',14,BL),('Simply Piano','free trial',0,'length shown in the app',0,BL),('Skoove','free Basic lessons, no time limit',90,'plus a Premium free trial',0,BL),('Piano Marvel','free plan, no time limit',90,'150+ songs, 200+ exercises',0,BL),('Piano by Pictures','first month free',30,'then $49 a month',0,G)]
rows=''
for n,a,d,b,g,c in tri:
    tw=d/90*100; gw=g/90*100
    bar=f'<div style="position:relative;height:26px;border-radius:7px;background:#eef2f3">'
    if g: bar+=f'<div style="position:absolute;left:0;top:0;bottom:0;width:{gw:.1f}%;background:repeating-linear-gradient(45deg,#f6b31e55,#f6b31e55 8px,#f6b31e99 8px,#f6b31e99 16px);border-radius:7px"></div>'
    if d: bar+=f'<div style="position:absolute;left:0;top:0;bottom:0;width:{tw:.1f}%;background:{G};border-radius:7px"></div>'
    if not d and not g: bar+=f'<div style="position:absolute;left:12px;top:3px;font-size:15px;font-weight:700;color:{MU}">trial length shown in the app at sign-up</div>'
    bar+='</div>'
    rows+=f'<div style="display:grid;grid-template-columns:250px minmax(0,1fr);gap:16px;align-items:center;padding:9px 0;border-top:1px solid {LINE}"><span><b style="font-size:20px">{n}</b><br><span style="font-size:15px;color:{MU}">{a}; {b}</span></span>{bar}</div>'
ticks=''.join(f'<span style="position:absolute;left:{d/90*100:.1f}%;transform:translateX(-50%);font-size:15px;color:{MU};font-weight:700">{d}d</span>' for d in [0,7,14,30,60,90])
body=f'''<div class="card" style="padding:8px 26px 16px">{rows}<div style="display:grid;grid-template-columns:250px minmax(0,1fr);gap:16px;margin-top:8px"><span></span><div style="position:relative;height:20px">{ticks}</div></div></div>
<div style="display:flex;gap:26px;margin-top:14px;font-size:18px;color:{MU}"><span style="display:inline-flex;gap:8px;align-items:center"><span style="width:18px;height:18px;border-radius:4px;background:{G}"></span>Free to use</span><span style="display:inline-flex;gap:8px;align-items:center"><span style="width:18px;height:18px;border-radius:4px;background:repeating-linear-gradient(45deg,#f6b31e55,#f6b31e55 4px,#f6b31e99 4px,#f6b31e99 8px)"></span>Money-back guarantee (after you pay)</span><span>Playground Sessions shows its trial terms after sign-up.</span></div>'''
imgs['online-piano-lessons-free-trials']=(880,page(880,'Try before you pay','Free trials and guarantees, side by side',body,'Set a reminder before any trial ends.'))

def box(t,c,w=230,sub=''):
    s=f'<div style="font-size:14px;color:#ffffffcc;margin-top:2px">{sub}</div>' if sub else ''
    return f'<div style="background:{c};color:#fff;border-radius:14px;padding:12px 14px;text-align:center;width:{w}px;font-weight:800;font-size:19px;line-height:1.2">{t}{s}</div>'
def q(t): return f'<div style="background:#fff;border:2px solid {INK};border-radius:14px;padding:12px 16px;text-align:center;font-weight:800;font-size:20px;line-height:1.2;width:300px">{t}</div>'
arrow=f'<div style="font-size:15px;font-weight:800;color:{MU};display:flex;align-items:center;gap:6px">YES &#8594;</div>'
rowsF=[('Do you want a real person to watch you play?',box('A live online teacher',V,260,'from about $20 a lesson')),
('Is the learner a child under 10?',box('Simply Piano, or free Hoffman Academy',BL,260)),
('Is reading sheet music or an exam the goal?',box('Piano Marvel',BL,260,'free plan or $129.99/yr')),
('Do you want songs fast with chords, and to pay once?',box('Pianoforall',G,260,'7 days free, then $49 once')),
('Do you want an app that hears every note?',box('Skoove or Flowkey',BL,260,'$149.99/yr each')),
('Do you want a big video library and teacher Q&amp;As?',box('Pianote (Musora)',G,260,'$279/yr'))]
fl=''
for i,(qq,b) in enumerate(rowsF):
    fl+=f'<div style="display:grid;grid-template-columns:320px 70px 280px;align-items:center;gap:6px">{q(qq)}{arrow}{b}</div>'
    if i<len(rowsF)-1: fl+=f'<div style="width:320px;text-align:center;font-size:15px;font-weight:800;color:{MU};line-height:1.6">NO &#8595;</div>'
side=f'''<div class="card" style="padding:20px 22px;align-self:start"><div style="font-size:22px;font-weight:800">Still not sure?</div><div style="font-size:18px;{SER};line-height:1.45;margin-top:6px">Take the 30-second quiz on this page. It asks seven questions and shows how every course scores for you.</div>
<div style="margin-top:14px;font-size:22px;font-weight:800">Most adults</div><div style="font-size:18px;{SER};line-height:1.45;margin-top:6px">start well with a one-time course plus an occasional live check-in. See &#8220;the hybrid plan&#8221;.</div></div>'''
body=f'<div style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:28px"><div style="display:grid;gap:4px;justify-items:start">{fl}</div>{side}</div>'
imgs['which-online-piano-lessons-flowchart']=(900,page(900,'Decision guide','Which online piano lessons are right for you?',body,'Start at the top and stop at your first YES'))
json.dump(imgs,open('imgs1.json','w'))
