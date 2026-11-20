import json
from page import page
from kb import keyboard, white_seq
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';BL='#3b6fd1';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'

rows=[('Fun and motivation',4.7),('Song choice (any MIDI file)',4.8),('Value for money',4.6),('Practice tools',4.4),('Setup and ease of use',4.0),('Teaching reading and theory',2.2)]
bars=''
for n,s in rows:
    col=G if s>=4 else ('#b07a00' if s>=3 else '#b3261e')
    bars+=f'<div style="display:grid;grid-template-columns:400px minmax(0,1fr) 70px;align-items:center;gap:18px;padding:12px 0;border-top:1px solid {LINE}"><span style="font-size:22px;font-weight:700">{n}</span><span style="height:18px;border-radius:9px;background:#e8eef0;overflow:hidden"><span style="display:block;height:100%;width:{s/5*100:.0f}%;background:{col};border-radius:9px"></span></span><span style="font-size:24px;font-weight:800;text-align:right">{s:.1f}</span></div>'
body=f'''<div style="display:grid;grid-template-columns:300px minmax(0,1fr);gap:22px">
<div class="card" style="padding:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:{T};border-color:{T};color:#fff">
<div style="font-size:20px;font-weight:700;letter-spacing:.12em;opacity:.85">OVERALL</div>
<div style="font-size:120px;font-weight:800;line-height:1">3.9</div>
<div style="font-size:24px;font-weight:700;opacity:.9">out of 5</div>
<div style="margin-top:18px;font-size:19px;text-align:center;line-height:1.35;opacity:.95">A great practice tool, not a complete method</div></div>
<div class="card" style="padding:14px 28px 10px">{bars}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px">
<div class="card" style="padding:18px 22px"><div style="font-size:20px;font-weight:800;color:#1f7a4d">Best part</div><div style="font-size:19px;{SER};margin-top:4px;line-height:1.4">Any song you can find as a MIDI file becomes a lesson, for a one-time price.</div></div>
<div class="card" style="padding:18px 22px"><div style="font-size:20px;font-weight:800;color:#b3261e">Weakest part</div><div style="font-size:19px;{SER};margin-top:4px;line-height:1.4">It doesn&#39;t teach you to read music or why chords work, unless you make it.</div></div></div>'''
imgs['synthesia-review-score']=(760,page(760,'Synthesia review','My Synthesia score',body,'Scores are the reviewer&#39;s own ratings'))

IDX={'C4':0,'D4':1,'E4':2,'F4':3,'G4':4}
mel=[('E4',1),('E4',1),('F4',1),('G4',1),('G4',1),('F4',1),('E4',1),('D4',1),('C4',1),('C4',1),('D4',1),('E4',1),('E4',1.5),('D4',0.5),('D4',2)]
Wk=white_seq('C4','G4'); ww=70; U=21
sv,kw=keyboard(Wk,0,0,ww,120,40,74,{},{n:n[0] for n in Wk},None,None,22,12)
blocks='';t=0
for n,d in mel:
    k=Wk.index(n); y=-(t+d)*U-3; h=d*U-4
    blocks+=f'<rect x="{k*ww+8}" y="{y:.1f}" width="{ww-16}" height="{h:.1f}" rx="5" fill="{G}"/>'
    if h>=16: blocks+=f'<text x="{k*ww+ww/2}" y="{y+h/2+6:.1f}" text-anchor="middle" font-size="15" font-weight="800" fill="#fff">{n[0]}</text>'
    t+=d
for b in [4,8,12]:
    blocks+=f'<line x1="0" x2="{kw}" y1="{-b*U-1}" y2="{-b*U-1}" stroke="#c5d2d6" stroke-width="1.5" stroke-dasharray="5 5"/>'
fall=f'<svg viewBox="-4 {-16*U-10} {kw+8} {16*U+136}" width="100%">{blocks}{sv}<line x1="0" y1="-1" x2="{kw}" y2="-1" stroke="{A}" stroke-width="4"/></svg>'
top=40; sp=16; X0=120
SPC={1:44,1.5:58,0.5:34,2:62}
W=X0+sum(SPC[d] for n,d in mel)+3*14+30
def ny(n): return top+4*sp-(IDX[n]-2)*sp/2
st=''.join(f'<line x1="0" x2="{W}" y1="{top+i*sp}" y2="{top+i*sp}" stroke="{INK}" stroke-width="1.6"/>' for i in range(5))
st+=f'<line x1="1" x2="1" y1="{top}" y2="{top+4*sp}" stroke="{INK}" stroke-width="1.6"/>'
st+=f'<text x="4" y="{top+4*sp+18}" class="mus" font-size="96" fill="{INK}">&#119070;</text>'
st+=f'<text x="76" y="{top+2*sp-2}" font-size="34" font-weight="800" fill="{INK}">4</text><text x="76" y="{top+4*sp-2}" font-size="34" font-weight="800" fill="{INK}">4</text>'
t=0; x=X0+14
for n,d in mel:
    y=ny(n); filled=d<2
    if n=='C4': st+=f'<line x1="{x-15}" x2="{x+15}" y1="{y}" y2="{y}" stroke="{INK}" stroke-width="1.6"/>'
    st+=f'<ellipse cx="{x}" cy="{y}" rx="9.5" ry="7" transform="rotate(-20 {x} {y})" fill="{INK if filled else "#fff"}" stroke="{INK}" stroke-width="2"/>'
    st+=f'<line x1="{x+8.6}" x2="{x+8.6}" y1="{y-2}" y2="{y-50}" stroke="{INK}" stroke-width="1.8"/>'
    if d==1.5: st+=f'<circle cx="{x+18}" cy="{y-4}" r="3" fill="{INK}"/>'
    if d==0.5: st+=f'<path d="M{x+8.6} {y-50} q 3 12 14 20 q 2 8 -2 16 q 2 -10 -12 -18z" fill="{INK}"/>'
    st+=f'<text x="{x}" y="{top+4*sp+52}" text-anchor="middle" font-size="16" font-weight="800" fill="{G}">{n[0]}</text>'
    t+=d; x+=SPC[d]
    if t in (4,8,12):
        xb=x-14; st+=f'<line x1="{xb}" x2="{xb}" y1="{top}" y2="{top+4*sp}" stroke="{INK}" stroke-width="1.6"/>'; x+=14
st+=f'<line x1="{W-8}" x2="{W-8}" y1="{top}" y2="{top+4*sp}" stroke="{INK}" stroke-width="1.6"/><line x1="{W-2}" x2="{W-2}" y1="{top}" y2="{top+4*sp}" stroke="{INK}" stroke-width="5"/>'
sheet=f'<svg viewBox="0 0 {W+2} 172" width="100%">{st}</svg>'
body=f'''<div style="display:grid;grid-template-columns:420px minmax(0,1fr);gap:20px;align-items:stretch">
<div class="card" style="padding:18px 20px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">IN SYNTHESIA</div><div style="font-size:24px;font-weight:800;margin-bottom:10px">Falling notes</div>{fall}</div>
<div style="display:grid;gap:16px;align-content:start">
<div class="card" style="padding:18px 22px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{MU}">ON PAPER</div><div style="font-size:24px;font-weight:800;margin-bottom:6px">The same melody as sheet music</div>{sheet}</div>
<div class="card" style="padding:16px 22px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
<div><div style="font-size:20px;font-weight:800;color:{G}">Falling notes show</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">which key, when, and for how long. Instantly readable on day one.</div></div>
<div><div style="font-size:20px;font-weight:800;color:{T}">Sheet music also shows</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:4px">the beat, the key, phrasing and dynamics, and it works on any piano and in any book.</div></div></div></div>
<div class="card" style="padding:14px 22px;font-size:18.5px;line-height:1.45">Synthesia can show both at once. Turn on sheet music (F2 on a computer) and read the staff while the falling notes check you.</div>
</div></div>'''
imgs['synthesia-vs-sheet-music']=(830,page(830,'Synthesia vs sheet music','One melody, two ways to read it',body,'Example: the opening of Beethoven&#39;s &#8220;Ode to Joy&#8221;'))

def tier(name,price,sub,items,col,bg,badge=''):
    li=''.join(f'<div style="display:flex;gap:12px;padding:9px 0;border-top:1px solid {LINE}"><span style="flex:none;width:26px;height:26px;border-radius:50%;background:{c if c else col};color:#fff;display:grid;place-items:center;font-size:15px;font-weight:800">{m}</span><span style="font-size:19px;line-height:1.35">{x}</span></div>' for x,m,c in items)
    b=f'<span style="position:absolute;top:-16px;right:20px;background:{A};color:#1b1400;font-size:15px;font-weight:800;letter-spacing:.08em;padding:6px 12px;border-radius:999px">{badge}</span>' if badge else ''
    return f'<div class="card" style="padding:24px 26px;background:{bg};position:relative;border-top:8px solid {col}">{b}<div style="font-size:26px;font-weight:800">{name}</div><div style="font-size:58px;font-weight:800;color:{col};margin:6px 0 2px">{price}</div><div style="font-size:19px;color:{MU};font-weight:700;margin-bottom:12px">{sub}</div>{li}</div>'
Y='&#10003;';N='&#10005;';R='#b3261e'
free=[('20+ of the 150+ included songs, fully playable',Y,''),('The first 20 seconds of any other song',Y,''),('All MIDI keyboard features, including key lights',Y,''),('Every feature on those songs: practice modes, sheet music, hints',Y,''),('All 150+ included songs',N,R),('Full length of your own MIDI files',N,R),('Multi-track recorder in Free Play',N,R)]
paid=[('All 150+ included songs',Y,''),('Any MIDI or MusicXML file, full length',Y,''),('Multi-track recorder in Free Play',Y,''),('All future updates included',Y,''),('One key for PC, Mac, iPad and Android',Y,''),('Not a subscription',Y,''),('Refunds: 180 days (PayPal) or 120 days',Y,'')]
body=f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
{tier('Free download','$0','try before you buy',free,MU,'#fff')}
{tier('Unlock key','$29','one-time, usually $39',paid,G,'#f2faf5','SALE PRICE')}</div>
<div style="margin-top:16px;font-size:18px;color:{MU};line-height:1.4">Prices from synthesia.app, checked October 2026. Unlocking inside the iPad or Android app costs less but only works on that store&#39;s devices. Music Store songs are sold separately.</div>'''
imgs['synthesia-free-vs-unlocked']=(930,page(930,'Price','Synthesia free vs unlocked',body,'Source: synthesia.app unlock and download pages'))

modes=[('Melody practice','Synthesia waits for you to play the right note before moving on. Coloured dots show the keys to press.',G),('Rhythm practice','Slow the tempo down, but you are judged on timing against the beat.',BL),('Recital','The full performance: notes, rhythm and duration at the song&#39;s speed.',T),('Hands separately','Pick the left or right hand. Synthesia plays the other part for you.',G),('Speed and loops','Slow a song with + and &#8722;, jump on the timeline, and loop a few bars.',BL),('Labels and hints','Finger numbers, note names, solf&#232;ge or scale degrees on the keys and notes.',T)]
mc=''.join(f'<div class="card" style="padding:18px 20px;border-left:8px solid {c}"><div style="font-size:23px;font-weight:800">{a}</div><div style="font-size:18px;{SER};line-height:1.42;margin-top:6px">{b}</div></div>' for a,b,c in modes)
body=f'<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px">{mc}</div><div class="card" style="padding:16px 22px;margin-top:16px;font-size:19px;line-height:1.45"><b>Progress points:</b> each song is scored out of 100. To reach 100 you need to play it with both hands, almost flawlessly, several times, in all three modes.</div>'
imgs['synthesia-practice-modes']=(680,page(680,'Features','Synthesia practice modes, explained',body,'Based on Synthesia&#39;s official guides'))
json.dump(imgs,open('imgs1.json','w'))
