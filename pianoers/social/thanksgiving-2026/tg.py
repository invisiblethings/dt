import json,random
from kb import keyboard, white_seq
F='<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,500&family=Schibsted+Grotesk:wght@500;700;800&family=Caveat+Brush&display=swap" rel="stylesheet">'
LEAF='M12 2l1.6 3.9 2.6-1.3-.4 3.4 3.7-.9-1.6 3.1 3.1 1.3-3.3 1.6 1.1 2.4-3.6-.4.4 3.4-3.1-1.9L12 20l-.5-3.4-3.1 1.9.4-3.4-3.6.4 1.1-2.4L3 11.5l3.1-1.3-1.6-3.1 3.7.9-.4-3.4 2.6 1.3z'
COL=['#c8501e','#e0892a','#f6b31e','#9c3d17','#b8621b']
def leaves(W,H,n,seed,avoid):
    r=random.Random(seed); s=''
    for i in range(n):
        for _ in range(60):
            x=r.uniform(-20,W-20); y=r.uniform(-20,H*0.62)
            if not any(ax<x<bx and ay<y<by for ax,ay,bx,by in avoid): break
        sz=r.uniform(34,78); rot=r.uniform(-50,50); c=r.choice(COL); o=r.uniform(.55,.95)
        s+=f'<svg style="position:absolute;left:{x:.0f}px;top:{y:.0f}px;width:{sz:.0f}px;height:{sz:.0f}px;transform:rotate({rot:.0f}deg);opacity:{o:.2f}" viewBox="0 0 24 24"><path fill="{c}" d="{LEAF}"/><path d="M12 13v9" stroke="{c}" stroke-width="1.4" stroke-linecap="round"/></svg>'
    return s
def piano(width):
    ws=white_seq('C3','C6'); ww=width/len(ws)
    fill={'C4':'#f6b31e','E4':'#e0892a','G4':'#c8501e'}
    svg,_=keyboard(ws,ww=ww,wh=ww*5.2,fill=fill,stroke='#c9bfae',black='#1d2327',labels={'C4':'C','E4':'E','G4':'G'},wlabel_size=ww*.42)
    return f'<svg viewBox="0 0 {width} {ww*5.2}" style="width:100%;display:block">{svg}</svg>'
BASE='''*{margin:0;box-sizing:border-box}body{overflow:hidden;position:relative;background:#f6efe3;font-family:"Schibsted Grotesk",sans-serif;color:#2a1a10}
body:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgb(246 179 30/.16),transparent 60%)}
.e{font-weight:800;letter-spacing:.2em;color:#9c3d17}
h1{font-family:Fraunces,serif;font-weight:800;line-height:.92;letter-spacing:-.02em;color:#2a1a10}
h1 em{font-style:italic;font-weight:500;color:#c8501e}
p.s{font-family:Fraunces,serif;font-weight:600;color:#5a3a22;line-height:1.3}
.sig{font-family:"Caveat Brush",cursive;color:#9c3d17}
.kb{position:absolute;filter:drop-shadow(0 14px 22px rgb(60 30 10/.22))}
.chord{font-weight:700;color:#6b4a30}
.chord b{color:#c8501e}
.foot{position:absolute;font-weight:800;letter-spacing:.18em;color:#2e6475}'''
def fb():
    W,H=1080,1350
    return f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>{BASE}
body{{width:{W}px;height:{H}px}}.t{{position:absolute;left:0;right:0;top:250px;text-align:center}}
.e{{font-size:22px}}h1{{font-size:150px;margin-top:22px}}p.s{{font-size:42px;margin:34px auto 0;width:820px}}.sig{{font-size:46px;margin-top:26px}}
.kb{{left:70px;right:70px;bottom:190px}}.chord{{position:absolute;left:0;right:0;bottom:130px;text-align:center;font-size:24px}}
.foot{{left:0;right:0;bottom:58px;text-align:center;font-size:20px}}</style></head><body>
{leaves(W,H,16,7,[(150,230,930,900)])}
<div class="t"><div class="e">FROM ALL OF US AT PIANOERS</div><h1>Happy<br><em>Thanksgiving</em></h1>
<p class="s">Thank you for every note you played with us this year.</p><div class="sig">— Katarina &amp; Richard</div></div>
<div class="kb">{piano(940)}</div><div class="chord">Today's chord: <b>C major</b>, the sound of a warm, happy home.</div>
<div class="foot">PIANOERS.COM</div></body></html>'''
def x():
    W,H=1600,900
    return f'''<!doctype html><html><head><meta charset="utf-8">{F}<style>{BASE}
body{{width:{W}px;height:{H}px}}.t{{position:absolute;left:110px;top:110px;width:820px}}
.e{{font-size:22px}}h1{{font-size:140px;margin-top:18px}}p.s{{font-size:40px;margin-top:28px}}.sig{{font-size:44px;margin-top:20px}}
.kb{{right:90px;width:600px;top:330px}}.chord{{position:absolute;right:60px;width:660px;top:560px;text-align:center;font-size:22px}}
.foot{{left:110px;bottom:50px;font-size:20px}}</style></head><body>
{leaves(W,H,14,11,[(40,30,1000,860),(940,200,1600,760)])}
<div class="t"><div class="e">FROM ALL OF US AT PIANOERS</div><h1>Happy<br><em>Thanksgiving</em></h1>
<p class="s">Thank you for every note you played with us this year.</p><div class="sig">— Katarina &amp; Richard</div></div>
<div class="kb">{piano(600)}</div><div class="chord">Today's chord: <b>C major</b>, the sound of a warm, happy home.</div>
<div class="foot">PIANOERS.COM</div></body></html>'''
json.dump([{'name':'pianoers-thanksgiving-facebook','w':1080,'h':1350,'scale':2,'html':fb()},{'name':'pianoers-thanksgiving-x','w':1600,'h':900,'scale':1.5,'html':x()}],open('jobs.json','w'))
