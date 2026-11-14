# keyboard SVG helper
WHITE=['C','D','E','F','G','A','B']
def white_seq(start='A0',end='C8'):
    names=[];o=int(start[-1]);i=WHITE.index(start[0])
    while True:
        n=WHITE[i]+str(o); names.append(n)
        if n==end: break
        i+=1
        if i==7: i=0;o+=1
    return names
BLACK_AFTER={'C':'C#','D':'D#','F':'F#','G':'G#','A':'A#'}
def keyboard(whites,x=0,y=0,ww=40,wh=200,bw=None,bh=None,fill=None,labels=None,blabels=None,bfill=None,wlabel_size=18,blabel_size=13,stroke='#9aa9ae',black='#1c2226',lastblack=False):
    fill=fill or {}; labels=labels or {}; blabels=blabels or {}; bfill=bfill or {}
    bw=bw or ww*0.6; bh=bh or wh*0.62
    s=[]
    for k,n in enumerate(whites):
        f=fill.get(n,'#ffffff')
        s.append(f'<rect x="{x+k*ww:.2f}" y="{y}" width="{ww:.2f}" height="{wh}" rx="{min(6,ww*0.15):.1f}" fill="{f}" stroke="{stroke}" stroke-width="1.5"/>')
        if n in labels:
            s.append(f'<text x="{x+k*ww+ww/2:.2f}" y="{y+wh-12}" text-anchor="middle" font-size="{wlabel_size}" font-weight="700" fill="#15191c">{labels[n]}</text>')
    for k,n in enumerate(whites):
        letter=n[0]
        if letter in BLACK_AFTER and (k<len(whites)-1 or lastblack):
            bn=BLACK_AFTER[letter]+n[-1]
            bx=x+(k+1)*ww-bw/2
            f=bfill.get(bn,black)
            s.append(f'<rect x="{bx:.2f}" y="{y}" width="{bw:.2f}" height="{bh:.1f}" rx="{min(4,bw*0.15):.1f}" fill="{f}" stroke="#0b0f11" stroke-width="1"/>')
            if bn in blabels:
                s.append(f'<text x="{bx+bw/2:.2f}" y="{y+bh-10:.1f}" text-anchor="middle" font-size="{blabel_size}" font-weight="700" fill="{"#15191c" if f!=black else "#ffffff"}">{blabels[bn]}</text>')
    return '\n'.join(s), len(whites)*ww
