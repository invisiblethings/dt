from kb import *; from page import page
imgs={}
# 1. full 88 keys
W=white_seq('A0','C8'); ww=1080/len(W)
fill={'C4':'#f6b31e'}; labels={n:n for n in W if n[0]=='C'}; labels['A0']='A0'
svg,width=keyboard(W,x=0,y=70,ww=ww,wh=190,fill=fill,labels=labels,wlabel_size=11)
# octave brackets
br=[]
for k,n in enumerate(W):
    if n[0]=='C' and k+7<len(W):
        x0=k*ww; x1=(k+7)*ww
        br.append(f'<path d="M{x0+2:.1f} 56 V44 H{x1-2:.1f} V56" fill="none" stroke="#2e6475" stroke-width="2"/><text x="{(x0+x1)/2:.1f}" y="34" text-anchor="middle" font-size="15" font-weight="700" fill="#2e6475">Octave {n[-1]}</text>')
mi=W.index('C4')*ww+ww/2
body=f'''<div class="card" style="padding:26px 30px 24px"><svg width="1080" height="380" viewBox="0 0 1080 380">{''.join(br)}{svg}
<path d="M{mi:.1f} 268 V300" stroke="#b86a0a" stroke-width="3"/><text x="{mi:.1f}" y="326" text-anchor="middle" font-size="22" font-weight="800" fill="#15191c">Middle C (C4)</text>
<text x="0" y="300" font-size="18" font-weight="700" fill="#56666e">← Lower notes (left hand)</text><text x="1080" y="300" text-anchor="end" font-size="18" font-weight="700" fill="#56666e">Higher notes (right hand) →</text>
<text x="0" y="364" font-size="18" fill="#15191c">Lowest key: <tspan font-weight="800">A0</tspan></text><text x="1080" y="364" text-anchor="end" font-size="18" fill="#15191c">Highest key: <tspan font-weight="800">C8</tspan></text></svg></div>
<div style="display:flex;gap:18px;margin-top:22px">{''.join(f'<div class="card" style="flex:1;padding:18px 22px"><div style="font-size:40px;font-weight:800;color:#2e6475">{a}</div><div style="font-size:21px;font-weight:500">{b}</div></div>' for a,b in [('88','keys on a full-size piano'),('52','white keys'),('36','black keys'),('7+','octaves, A0 to C8')])}</div>'''
imgs['piano-keyboard-88-keys-map']=(850,page(850,'The piano keyboard','All 88 keys, mapped',body))
# 2. one octave names
W2=white_seq('C4','C5'); ww2=1000/8
lab={n:n[0] for n in W2}
bl={'C#4':'C♯ D♭','D#4':'D♯ E♭','F#4':'F♯ G♭','G#4':'G♯ A♭','A#4':'A♯ B♭'}
svg2,_=keyboard(W2,x=40,y=80,ww=ww2,wh=330,labels=lab,blabels=bl,wlabel_size=40,blabel_size=17,fill={'C4':'#fff3d1','C5':'#fff3d1'})
def brk(x0,x1,t):
    return f'<path d="M{x0} 64 V50 H{x1} V64" fill="none" stroke="#2e6475" stroke-width="3"/><text x="{(x0+x1)/2}" y="38" text-anchor="middle" font-size="20" font-weight="700" fill="#2e6475">{t}</text>'
b1=brk(40+ww2*0.62,40+ww2*2.38,'Group of 2'); b2=brk(40+ww2*3.62,40+ww2*6.38,'Group of 3')
body2=f'''<div class="card" style="padding:20px 30px 18px"><svg width="1080" height="440" viewBox="0 0 1080 440">{b1}{b2}{svg2}</svg></div>
<div style="display:flex;gap:18px;margin-top:22px">
<div class="card" style="flex:1;padding:20px 22px;font-size:22px;line-height:1.35"><b style="color:#b86a0a">C</b> is always the white key just left of the <b>two</b> black keys.</div>
<div class="card" style="flex:1;padding:20px 22px;font-size:22px;line-height:1.35">White keys repeat <b>C D E F G A B</b>. After B comes C again.</div>
<div class="card" style="flex:1;padding:20px 22px;font-size:22px;line-height:1.35">Each black key has two names: <b>♯ sharp</b> (up) or <b>♭ flat</b> (down).</div></div>'''
imgs['piano-keys-note-names']=(860,page(860,'Note names','Every key in one octave',body2))
# 3. half and whole steps
W3=white_seq('C4','G4'); ww3=150
svg3,_=keyboard(W3,x=15,y=40,ww=ww3,wh=300,labels={n:n[0] for n in W3},wlabel_size=34,fill={'C4':'#fff3d1','E4':'#e2eef1','F4':'#e2eef1'},bfill={'C#4':'#f6b31e'},blabels={'C#4':'C♯'})
def row(x0,x1,y,t,c):
    return f'<path d="M{x0} {y} H{x1-10}" stroke="{c}" stroke-width="5" marker-end="url(#ah)"/><circle cx="{x0}" cy="{y}" r="7" fill="{c}"/><text x="{x1+18}" y="{y+8}" font-size="23" font-weight="800" fill="{c}">{t}</text>'
xC=15+ww3*0.5; xCs=15+ww3; xD=15+ww3*1.5; xE=15+ww3*2.5; xF=15+ww3*3.5
arcs=row(xC,xCs,395,'Half step: C to C♯','#b86a0a')+row(xC,xD,450,'Whole step: C to D (two half steps)','#2e6475')+row(xE,xF,505,'Half step: E to F (no black key between)','#2e6475')
body3=f'''<div class="card" style="padding:16px 30px 6px"><svg width="1080" height="520" viewBox="0 0 1080 520"><defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="context-stroke"/></marker></defs>{svg3}{arcs}</svg></div>
<div class="card" style="margin-top:20px;padding:20px 24px;font-size:22px;line-height:1.4">A <b>half step</b> is the very next key, black or white. A <b>sharp ♯</b> raises a note by a half step, and a <b>flat ♭</b> lowers it by one. E–F and B–C are half steps with no black key between them.</div>'''
imgs['piano-half-steps-whole-steps']=(880,page(880,'Sharps, flats and steps','Half steps and whole steps',body3))
import json;json.dump({k:v for k,v in imgs.items()},open('imgs1.json','w'))
