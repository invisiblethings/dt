import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
steps=[('Pick your goal','Songs, reading or ear'),('Get a keyboard','88 weighted keys'),('Set up a space','Piano out, ready to go'),('Learn the keys','C D E F G A B'),('Sit and shape','Posture and fingers'),('Play a melody','C position, one hand'),('Feel the beat','Count with a click'),('Read music','Five minutes a day'),('Play chords','C, G, Am, F'),('Hands together','One level at a time')]
TW,TH,GAP=200,150,20
pos=[]
for i in range(10):
    r=i//5; c=i%5 if r==0 else 4-i%5
    pos.append((c*(TW+GAP),r*250))
pts=' '.join(f'{x+TW/2},{y+TH/2}' for x,y in pos)
svg=f'<svg width="1080" height="440" viewBox="0 0 1080 440"><polyline points="{pts}" fill="none" stroke="{A}" stroke-width="8" stroke-dasharray="2 16" stroke-linecap="round" stroke-linejoin="round"/>'
svg+=f'<path d="M{pos[4][0]+TW/2},{pos[4][1]+TH/2} C{pos[4][0]+TW+60},{pos[4][1]+TH/2} {pos[5][0]+TW+60},{pos[5][1]+TH/2} {pos[5][0]+TW/2},{pos[5][1]+TH/2}" fill="none" stroke="{A}" stroke-width="8" stroke-dasharray="2 16" stroke-linecap="round"/>'
for i,((x,y),(t,s)) in enumerate(zip(pos,steps)):
    fill=INK if i==9 else '#fff'; tc='#fff' if i==9 else INK; sc='#c9d4d8' if i==9 else MU
    svg+=f'<rect x="{x}" y="{y}" width="{TW}" height="{TH}" rx="18" fill="{fill}" stroke="{LINE}" stroke-width="1.5"/>'
    svg+=f'<circle cx="{x+34}" cy="{y+36}" r="20" fill="{A if i==9 else T}"/><text x="{x+34}" y="{y+44}" text-anchor="middle" font-size="21" font-weight="800" fill="{INK if i==9 else "#fff"}">{i+1}</text>'
    svg+=f'<text x="{x+18}" y="{y+94}" font-size="21" font-weight="800" fill="{tc}">{t}</text><text x="{x+18}" y="{y+124}" font-size="16" fill="{sc}">{s}</text>'
svg+='</svg>'
body=f'{svg}<div style="margin-top:6px;display:flex;justify-content:center"><div style="background:{A};color:#1b1400;font-weight:800;font-size:24px;padding:12px 26px;border-radius:99px">Finish line: play the songs you love</div></div>'
imgs['how-to-learn-piano-by-yourself-10-step-roadmap']=(740,page(740,'Teach yourself piano','How to play piano in 10 steps',body))

myths=[("I'm too old to learn piano.","Adults aged 60 to 85 with no musical background took six months of piano lessons and improved on attention and working-memory tests.","Bugos et al., Aging &amp; Mental Health, 2007"),
("You need 10,000 hours.","10,000 hours was the average practice of top violin students at an elite music academy by age 20: future soloists, not hobbyists.","Ericsson, Krampe &amp; Tesch-Römer, 1993"),
("More hours means more progress.","Among 17 advanced pianists, how long they practised didn't predict who played best. How they practised did.","Duke, Simmons &amp; Cash, 2009"),
("You need an acoustic piano to start.","A digital piano with 88 weighted, touch-sensitive keys is a fine first instrument, and it never needs tuning.","Pianoers buying guides"),
("An app can teach you everything.","Apps hear your notes and timing. They can't see your wrists or fingers, so film your hands once a month.","Pianoers teaching advice"),
("You must read music before playing songs.","Many players start with chords and play real songs in weeks. Reading opens more music, so add it a few minutes a day.","Pianoers teaching advice")]
cards=''.join(f'''<div class="card" style="padding:20px 22px;display:flex;flex-direction:column;gap:10px">
<div style="display:flex;gap:10px;align-items:center"><span style="background:#fbe4dd;color:#b0442d;font-weight:800;font-size:15px;letter-spacing:.1em;padding:4px 10px;border-radius:8px">MYTH</span><span style="font-size:22px;font-weight:800;color:#7a8a91;text-decoration:line-through;text-decoration-thickness:2px">{m}</span></div>
<div style="display:flex;gap:10px;align-items:flex-start"><span style="flex:none;background:#dcefe5;color:#1f7a4d;font-weight:800;font-size:15px;letter-spacing:.1em;padding:4px 10px;border-radius:8px;margin-top:3px">FACT</span><span style="font-size:20px;font-family:Lora,serif;line-height:1.42">{f}</span></div>
<div style="font-size:14.5px;color:{MU};margin-left:68px">{s}</div></div>''' for m,f,s in myths)
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">{cards}</div>'
imgs['learning-piano-myths-vs-facts']=(910,page(910,'Myths vs facts','Six piano myths that stop beginners',body))

stats=[('85%','of Americans who don’t play an instrument wish they had learned.','Gallup survey for NAMM, 2009',A),
('~20%','faster on a practised finger sequence after a night’s sleep. Twelve hours awake brought no significant gain.','Walker et al., Neuron, 2002',T),
('17','advanced pianists were studied: <b>how</b> they practised, not how long, predicted who played best.','Duke, Simmons &amp; Cash, J. of Research in Music Education, 2009',T),
('6 mo','of piano lessons improved attention and working memory in adults aged 60 to 85.','Bugos et al., Aging &amp; Mental Health, 2007',A)]
tiles=''.join(f'<div class="card" style="padding:26px 28px"><div style="font-size:84px;line-height:1;font-weight:800;color:{"#b86a0a" if c==A else c};letter-spacing:-.03em">{n}</div><div style="font-size:23px;font-family:Lora,serif;line-height:1.4;margin-top:14px">{t}</div><div style="font-size:15px;color:{MU};margin-top:14px">{s}</div></div>' for n,t,s,c in stats)
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{tiles}</div><div class="card" style="margin-top:18px;padding:16px 22px;font-size:20px;background:#fff8e6"><b>What it means:</b> practise a little most days, fix mistakes slowly, then sleep on it.</div>'
imgs['science-of-learning-piano-statistics']=(870,page(870,'The research','The science of teaching yourself piano',body))

def node(t,s,p,top=False,dark=False):
    bg=INK if dark else '#fff'; c='#fff' if dark else INK; sc='#c9d4d8' if dark else MU
    pp=f'<div style="margin-top:10px;font-size:15px;font-weight:800;color:#2e6475;background:#e2eef1;border-radius:8px;padding:5px 8px;display:inline-block">{p}</div>' if p else ''
    return f'<div class="card" style="padding:16px 16px;background:{bg};color:{c};text-align:center"><div style="font-size:21px;font-weight:800">{t}</div><div style="font-size:16px;color:{sc};margin-top:5px;line-height:1.35">{s}</div>{pp}</div>'
ans=[('Pop songs and chords','Play along with real songs fast','Pianoforall','$49 once · 7-day trial'),('Classical and reading','Sight-read and level up','Piano Marvel','Free tier · $129.99/yr'),('Songs, with app feedback','The app listens as you play',None,None),('Spend nothing yet','Try before you pay','Free apps + a method book','$0 to start')]
cols=''
for i,(a,s,r,p) in enumerate(ans):
    stub='<div style="width:3px;height:26px;background:#9fbcc5;margin:0 auto"></div>'
    pill=f'<div style="background:{A};color:#1b1400;font-weight:800;font-size:19px;border-radius:12px;padding:10px 8px;text-align:center">{a}</div>'
    if r: inner=stub+node(r,s,p)
    else:
        inner=stub+f'<div class="card" style="padding:12px;text-align:center;font-size:18px;font-weight:800;background:#e2eef1">Huge song library, or a guided course?</div>'+f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:0">{stub}{stub}</div>'+f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">'+node('Flowkey','Library','$149.99/yr')+node('Skoove','Guided','$149.99/yr')+'</div>'
    cols+=f'<div>{stub}{pill}{inner}</div>'
body=f'''<div style="display:flex;justify-content:center"><div class="card" style="background:{INK};color:#fff;padding:18px 34px;font-size:27px;font-weight:800;border:0">What do you want to play first?</div></div>
<div style="position:relative;margin-left:129px;width:822px;height:3px;background:#9fbcc5;top:26px"></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">{cols}</div>
<div class="card" style="margin-top:20px;padding:14px 20px;font-size:19px;display:flex;justify-content:space-between"><span><b>For kids or game-style practice:</b> Simply Piano, $169.90/yr</span><span style="color:{MU}">Prices checked October 2026</span></div>'''
imgs['how-to-choose-a-way-to-learn-piano-flowchart']=(740,page(740,'Choose your path','Which way should you learn piano?',body))
json.dump(imgs,open('imgsA.json','w'))
