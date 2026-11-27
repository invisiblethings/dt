import json
import gen
from gen import kbd,scale_marks,span,FONT,T,A,G,R,BL,V,INK,MU,LINE
from scales import SCALES,BY,is_white
ORDER=[('c-major',G),('a-minor',G),('g-major',BL),('e-minor',BL),('f-major',BL),('d-minor',BL),('d-major',A),('a-major',A),('e-major',A)]
STAGE={G:'Start here',BL:'Next',A:'Then'}
def card(sid,c):
    s=BY[sid]; lo,hi=span(s)
    svg,_=kbd(lo,hi,scale_marks(s,c if c!=A else '#d9921a',A if c!=A else '#b5651d'),ww=24,wh=74,fs=10)
    cells=lambda xs,col,w: ''.join(f'<td style="color:{col};font-weight:{w}">{x}</td>' for x in xs)
    return f'''<div class="c"><div class="h"><b style="color:{c if c!=A else '#b5791a'}">{s["name"]}</b><span>{s["sig"].split(" (")[0]}</span></div>{svg}
<table><tr><th></th>{cells(s["notes"],INK,800)}</tr><tr><th style="color:{T}">RH</th>{cells(s["rh"],T,700)}</tr><tr><th style="color:{V}">LH</th>{cells(s["lh"],V,700)}</tr></table></div>'''
def arp(name,midi,notes,c):
    mk={m:(c,n) for n,m in zip(notes,midi)}
    lo=midi[0]
    while lo%12 not in (0,5): lo-=1
    hi=midi[-1]
    while hi%12 not in (4,11): hi+=1
    svg,_=kbd(lo,hi,mk,ww=20,wh=60,fs=9)
    return f'<div class="c a"><div class="h"><b style="color:{c}">{name}</b></div>{svg}<div class="f"><span style="color:{T}">RH 1 2 3 5</span> &#183; <span style="color:{V}">LH 5 4 2 1</span></div></div>'
cards=''.join(card(i,c) for i,c in ORDER)
arps=arp('C major',[60,64,67,72],['C','E','G','C'],G)+arp('G major',[55,59,62,67],['G','B','D','G'],BL)+arp('F major',[53,57,60,65],['F','A','C','F'],R)+arp('A minor',[57,60,64,69],['A','C','E','A'],V)
CSS=f'''@page{{size:Letter;margin:0}}*{{box-sizing:border-box;margin:0}}html,body{{width:816px;height:1056px}}body{{font-family:"Schibsted Grotesk",Arial,sans-serif;color:{INK};background:#fff;padding:30px 34px 0;position:relative;-webkit-print-color-adjust:exact;print-color-adjust:exact}}
.top{{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:3px solid {T};padding-bottom:10px}}.ey{{font-size:11px;font-weight:800;letter-spacing:.16em;color:{T}}}h1{{font-size:30px;font-weight:800;line-height:1.05;margin-top:3px}}.key{{font-size:10.5px;color:{MU};font-weight:700;text-align:right;line-height:1.6}}
.lab{{font-size:11px;font-weight:800;letter-spacing:.12em;color:{MU};margin:12px 0 6px}}.g{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}}.g4{{grid-template-columns:repeat(4,minmax(0,1fr))}}
.c{{border:1px solid {LINE};border-radius:10px;padding:7px 9px 6px}}.a{{display:flex;flex-direction:column}}.a .f{{margin-top:auto;padding-top:4px}}.h{{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:3px}}.h b{{font-size:15px}}.h span{{font-size:9.5px;color:{MU};font-weight:700}}
table{{width:100%;table-layout:fixed;border-collapse:collapse;margin-top:3px;font-size:11px;text-align:center}}th{{width:22px;text-align:left;font-size:9.5px}}td{{padding:1px 0}}tr+tr td,tr+tr th{{border-top:1px solid #eef2f3}}
.f{{font-size:10px;font-weight:800;margin-top:3px;text-align:center}}.tips{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}}.tips div{{background:#f3f6f7;border-radius:10px;padding:8px 10px;font-size:10.5px;line-height:1.4}}.tips b{{display:block;font-size:11.5px;color:{T};margin-bottom:1px}}
.trk{{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}}.wk{{border:1px solid {LINE};border-radius:10px;padding:6px 9px}}.wk b{{font-size:10px;color:{MU};letter-spacing:.08em}}.days{{display:flex;justify-content:space-between;margin-top:4px}}.days span{{width:24px;text-align:center;font-size:9px;font-weight:700;color:{MU}}}.days i{{display:block;width:20px;height:20px;border:1.5px solid #9fb0b6;border-radius:5px;margin:0 auto 2px}}.foot{{position:absolute;left:34px;right:34px;bottom:20px;display:flex;justify-content:space-between;font-size:10px;color:{MU};font-weight:600;border-top:1px solid {LINE};padding-top:8px}}.foot b{{letter-spacing:.14em;color:{T}}}'''
trk=''.join('<div class="wk"><b>WEEK '+str(w)+' &#183; SCALE: ________</b><div class="days">'+''.join('<span><i></i>'+d+'</span>' for d in 'MTWTFSS')+'</div></div>' for w in range(1,5))
html=f'''<!doctype html><html><head><meta charset="utf-8"><title>Piano Scales for Beginners Chart</title>{FONT}<style>{CSS}</style></head><body>
<div class="top"><div><div class="ey">FREE PRINTABLE CHART</div><h1>Piano Scales for Beginners</h1></div><div class="key">1 thumb &#183; 2 index &#183; 3 middle &#183; 4 ring &#183; 5 pinky<br>RH = right hand &#183; LH = left hand<br>One octave, going up; reverse the fingers coming down</div></div>
<div class="lab" style="display:flex;justify-content:space-between"><span>THE FIRST 9 SCALES, IN THE ORDER I TEACH THEM</span><span><span style="color:{G}">&#9679;</span> Weeks 1&#8211;2 &#160; <span style="color:{BL}">&#9679;</span> Weeks 3&#8211;4 &#160; <span style="color:#d9921a">&#9679;</span> Weeks 5&#8211;8</span></div><div class="g">{cards}</div>
<div class="lab">BEGINNER ARPEGGIOS</div><div class="g g4">{arps}</div>
<div class="tips"><div><b>Thumb under, finger 3 over</b>Going up, the right thumb tucks under after finger 3. Coming down, finger 3 crosses over the thumb.</div><div><b>Only one exception</b>F major right hand is 1 2 3 4 1 2 3 4, so the thumb never lands on B&#9837;.</div><div><b>The tempo ladder</b>60 bpm, 1 note per click &#8594; 2 notes per click &#8594; 80 &#8594; 100. Move up after three clean runs.</div></div>
<div class="lab">MY PRACTICE TRACKER: TICK A BOX FOR EVERY DAY YOU PLAY YOUR SCALES</div><div class="trk">{trk}</div>
<div class="foot"><span>Major: W W H W W W H &#183; Natural minor: W H W W H W W &#183; Full guide and play-along keyboard online</span><b>PIANOERS.COM</b></div></body></html>'''
jobs=[dict(name='piano-scales-chart-for-beginners',w=816,h=1056,scale=1,html=html,pdf=True),dict(name='piano-scales-chart-for-beginners-preview',w=816,h=1056,scale=2,html=html)]
json.dump(jobs,open('chart_jobs.json','w'))
