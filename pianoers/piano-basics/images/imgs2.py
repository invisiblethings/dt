from kb import *; from page import page
import json
imgs={}
# 4 grand staff: diatonic steps from C4=0; line spacing 24 -> step=12
L=24; S=L/2
def staff(y0):  # five lines top y0
    return ''.join(f'<line x1="60" y1="{y0+i*L}" x2="1030" y2="{y0+i*L}" stroke="#15191c" stroke-width="2"/>' for i in range(5))
TOP=110; BOT=TOP+4*L+ 5*L  # gap
# treble: bottom line E4 at TOP+4L. step index rel C4: E4=2. y(step)= (TOP+4L) - (step-2)*S
def yt(st): return (TOP+4*L)-(st-2)*S
# bass: top line A3 = step -2 at BOT. y(step)= BOT - (st+2)*S... A3 is step -2
def yb(st): return BOT+(-2-st)*S
def note(x,y,label,fill='#15191c',ledger=False,col='#2e6475'):
    s=''
    if ledger: s+=f'<line x1="{x-24}" y1="{y}" x2="{x+24}" y2="{y}" stroke="#15191c" stroke-width="2"/>'
    s+=f'<ellipse cx="{x}" cy="{y}" rx="13" ry="10" transform="rotate(-20 {x} {y})" fill="{fill}"/>'
    return s
names='C D E F G A B'.split()
def nm(st): return names[st%7]+str(4+st//7)
els=[staff(TOP),staff(BOT)]
# brace & clefs
els.append(f'<text x="66" y="{TOP+4*L+16}" class="mus" font-size="132" fill="#15191c">𝄞</text>')
els.append(f'<text x="68" y="{BOT+3*L+14}" class="mus" font-size="96" fill="#15191c">𝄢</text>')
els.append(f'<line x1="60" y1="{TOP}" x2="60" y2="{BOT+4*L}" stroke="#15191c" stroke-width="3"/>')
# treble notes E4..F5 (steps 2..10) + middle C (0)
xs=210
tre=list(range(2,11)); bas=list(range(-12,-3))  # G2(-10)? bass bottom line G2 = step -10 ; range -10..-2 lines/spaces
bas=list(range(-10,-1))
for i,st in enumerate(tre):
    x=715+i*39; y=yt(st)
    els.append(note(x,y,''));els.append(f'<text x="{x}" y="{TOP-22}" text-anchor="middle" font-size="19" font-weight="800" fill="#2e6475">{names[st%7]}</text>')
for i,st in enumerate(bas):
    x=180+i*52; y=yb(st)
    els.append(note(x,y,''));els.append(f'<text x="{x}" y="{BOT+4*L+44}" text-anchor="middle" font-size="19" font-weight="800" fill="#2e6475">{names[st%7]}</text>')
# middle C between staves (ledger), at x ~ 760? place in centre gap column
xm=655; ym=yt(0)
els.append(note(xm,ym,'',fill='#b86a0a',ledger=True))
els.append(f'<text x="{xm}" y="{ym+46}" text-anchor="middle" font-size="18" font-weight="800" fill="#b86a0a">Middle C</text>')
svg=f'<svg width="1080" height="{BOT+4*L+60}" viewBox="0 0 1080 {BOT+4*L+60}">{"".join(els)}</svg>'
cards=[('Treble clef lines','E G B D F','"Every Good Boy Does Fine"'),('Treble clef spaces','F A C E','spells "FACE"'),('Bass clef lines','G B D F A','"Good Boys Do Fine Always"'),('Bass clef spaces','A C E G','"All Cows Eat Grass"')]
c=''.join(f'<div class="card" style="flex:1;padding:16px 18px"><div style="font-size:16px;font-weight:700;color:#56666e;text-transform:uppercase;letter-spacing:.06em">{a}</div><div style="font-size:30px;font-weight:800;margin:4px 0">{b}</div><div style="font-size:19px;font-family:Lora,serif;color:#33424a">{d}</div></div>' for a,b,d in cards)
body=f'<div class="card" style="padding:10px 20px 6px">{svg}</div><div style="display:flex;gap:14px;margin-top:18px">{c}</div>'
imgs['grand-staff-treble-bass-clef-notes']=(940,page(940,'Reading music','The grand staff, note by note',body,'Treble clef: right hand. Bass clef: left hand.'))
# 5 note values
rows=[('𝅝','𝄻','Whole note','4 beats'),('𝅗𝅥','𝄼','Half note','2 beats'),('𝅘𝅥','𝄽','Quarter note','1 beat'),('𝅘𝅥𝅮','𝄾','Eighth note','½ beat'),('𝅘𝅥𝅯','𝄿','Sixteenth note','¼ beat')]
r=''.join(f'<div class="row"><span class="mus g">{n}</span><span class="nm">{a}</span><span class="bt">{b}</span><span class="mus g r">{rr}</span><span class="rn">{a.split()[0]} rest</span></div>' for n,rr,a,b in rows)
body2=f'''<style>.tb{{padding:10px 28px}}.row{{display:grid;grid-template-columns:110px 1fr 160px 110px 1fr;align-items:center;gap:10px;padding:10px 0;border-top:1px solid #d9e2e5}}.row:first-child{{border-top:0}}
.g{{font-size:66px;line-height:1;text-align:center}}.r{{font-size:56px}}.nm{{font-size:28px;font-weight:800}}.bt{{font-size:26px;font-weight:800;color:#2e6475}}.rn{{font-size:22px;color:#56666e}}</style>
<div class="card tb">{r}</div><div class="card" style="margin-top:18px;padding:18px 24px;font-size:22px;line-height:1.4">In <b>4/4 time</b> (the most common), each bar holds 4 beats: one whole note, two halves, four quarters or eight eighths. A <b>dot</b> adds half the note's value: a dotted half note lasts 3 beats.</div>'''
imgs['note-values-and-rests']=(1000,page(1000,'Rhythm','Note values and rests',body2))
# 6 chords C F G Am
def mini(chord,notes,name,formula):
    W=white_seq('C4','B5') ; ww=24
    f={n:'#f6b31e' for n in notes}
    sv,_=keyboard(W,x=8,y=10,ww=ww,wh=120,fill=f,labels={n:n[0] for n in notes},wlabel_size=13)
    return f'<div class="card" style="padding:16px 18px"><div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:30px;font-weight:800">{name}</span><span style="font-size:20px;color:#2e6475;font-weight:700">{formula}</span></div><svg width="{14*24+16}" height="140" viewBox="0 0 {14*24+16} 140">{sv}</svg></div>'
ch=[('C',['C4','E4','G4'],'C major','C – E – G'),('F',['F4','A4','C5'],'F major','F – A – C'),('G',['G4','B4','D5'],'G major','G – B – D'),('Am',['A4','C5','E5'],'A minor','A – C – E')]
grid='<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">'+''.join(mini(*c) for c in ch)+'</div>'
body3=grid+'''<div style="display:flex;gap:16px;margin-top:16px"><div class="card" style="flex:1;padding:16px 20px;font-size:21px;line-height:1.4"><b>Major chord</b> = root, then up <b>4 half steps</b>, then up <b>3 more</b>. Sounds bright.</div><div class="card" style="flex:1;padding:16px 20px;font-size:21px;line-height:1.4"><b>Minor chord</b> = root, up <b>3</b>, then up <b>4</b>. Sounds darker. C, G, Am and F play thousands of pop songs.</div></div>'''
imgs['first-piano-chords-c-f-g-am']=(900,page(900,'Your first chords','Four chords, hundreds of songs',body3))
# 7 C major scale fingering
W=white_seq('C4','C5'); ww=130
rh=dict(zip(W,['1','2','3','1','2','3','4','5'])); lh=dict(zip(W,['5','4','3','2','1','3','2','1']))
sv,_=keyboard(W,x=20,y=60,ww=ww,wh=280,labels={n:n[0] for n in W},wlabel_size=30)
fx=''.join(f'<circle cx="{20+i*ww+ww/2}" cy="34" r="22" fill="#f6b31e"/><text x="{20+i*ww+ww/2}" y="43" text-anchor="middle" font-size="26" font-weight="800">{rh[n]}</text><circle cx="{20+i*ww+ww/2}" cy="378" r="22" fill="#2e6475"/><text x="{20+i*ww+ww/2}" y="387" text-anchor="middle" font-size="26" font-weight="800" fill="#fff">{lh[n]}</text>' for i,n in enumerate(W))
body4=f'''<div class="card" style="padding:18px 30px 10px"><svg width="1080" height="410" viewBox="0 0 1080 410">{fx}{sv}</svg>
<div style="display:flex;gap:30px;font-size:20px;font-weight:700;margin:6px 0 10px"><span><span style="color:#b86a0a">●</span> Right hand fingers (top)</span><span><span style="color:#2e6475">●</span> Left hand fingers (bottom)</span></div></div>
<div class="card" style="margin-top:18px;padding:18px 24px;font-size:22px;line-height:1.4">Right hand going up: after finger 3 on E, tuck the <b>thumb under</b> to play F. Left hand going up: after the thumb on G, cross <b>finger 3 over</b> to A. Reverse it on the way down.</div>'''
imgs['c-major-scale-fingering']=(860,page(860,'Your first scale','C major scale with fingering',body4))
json.dump(imgs,open('imgs2.json','w'))
