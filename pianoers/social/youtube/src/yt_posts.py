import json,sys,os
sys.path.insert(0,'/home/user/dt/pianoers/social/facebook/src')
cwd=os.getcwd(); os.chdir('/tmp/claude-0/-home-user-dt/264ebcbd-ccda-5595-866c-f65d1d0f3d43/scratchpad')
import tips
os.chdir(cwd)
from tips import kb,H,mark,T,A,INK,MU,G,R,BL,V,LINE,FONT
def doc(body):
    return f'<!doctype html><html><head><meta charset="utf-8">{FONT}<style>*{{margin:0;box-sizing:border-box}}body{{width:1080px;height:1080px;overflow:hidden;position:relative;background:linear-gradient(160deg,#f3f6f7,#e6eef0);font-family:"Schibsted Grotesk",Arial,sans-serif;color:{INK}}}.card{{background:#fff;border:1px solid {LINE};border-radius:28px;box-shadow:0 10px 30px rgb(21 25 28/7%)}}.ser{{font-family:Lora,serif;color:#33424a}}</style></head><body>{body}</body></html>'
jobs=[]
def post(name,eyebrow,title,inner,foot='@Pianoers'):
    b=f'''<div style="position:absolute;left:70px;right:70px;top:60px">
<div style="display:flex;align-items:center;gap:14px">{mark(52)}<div style="font-size:23px;font-weight:800;letter-spacing:.18em;color:{T}">PIANOERS</div></div>
<div style="font-size:27px;font-weight:800;letter-spacing:.14em;color:{A};margin-top:34px">{eyebrow}</div>
<div style="font-size:62px;line-height:1.04;font-weight:800;letter-spacing:-.015em;margin-top:8px">{title}</div>
<div style="margin-top:34px">{inner}</div></div>
<div style="position:absolute;left:70px;right:70px;bottom:50px;display:flex;justify-content:space-between;font-size:25px;font-weight:800;color:{MU}"><span>{foot}</span><span style="color:{T}">pianoers.com</span></div>'''
    jobs.append(dict(name=name,w=1080,h=1080,html=doc(b),type='jpeg'))
# 1 name this chord (F major)
hl={'F3':H(R,'?'),'A5':H(R,'?'),'C7':H(R,'?')}
post('yt-quiz-name-this-chord','QUIZ','Name this chord',f'<div class="card" style="padding:30px">{kb("C",1,104,330,hl,labels="none")}</div><div class="ser" style="font-size:32px;margin-top:28px">Three white keys, one famous chord. Name it in the comments 👇</div>')
# 2 which key is middle C
hl={'C0':H(A,'1'),'E2':H(BL,'2'),'G4':H(G,'3'),'A5':H(V,'4')}
post('yt-quiz-find-the-c','QUIZ','Which key is C?',f'<div class="card" style="padding:30px">{kb("C",1,104,330,hl,labels="none")}</div><div class="ser" style="font-size:32px;margin-top:28px">Hint: look at the black keys. Is it 1, 2, 3 or 4? Answer in the comments 👇</div>')
# 3 name this note on the staff (treble, G line)
y0=70;gap=40
st=''.join(f'<line x1="170" x2="880" y1="{y0+i*gap}" y2="{y0+i*gap}" stroke="{INK}" stroke-width="4"/>' for i in range(5))
st+=f'<text x="70" y="{y0+4*gap+12}" font-size="178" font-family="Noto Music" fill="{INK}">&#119070;</text>'
st+=f'<ellipse cx="560" cy="{y0+3*gap}" rx="26" ry="19" fill="{T}" transform="rotate(-18 560 {y0+3*gap})"/><line x1="583" x2="583" y1="{y0+3*gap-4}" y2="{y0+3*gap-140}" stroke="{T}" stroke-width="5"/>'
post('yt-quiz-name-this-note','QUIZ','Name this note',f'<div class="card" style="padding:26px 30px"><svg viewBox="0 0 960 300" width="100%">{st}</svg></div><div class="ser" style="font-size:32px;margin-top:28px">Treble clef, second line from the bottom. Answer in the comments 👇</div>')
# 4 four chords square
four=[('C','C0','E2','G4',G),('G','G4','B6','D8',BL),('Am','A5','C7','E9',V),('F','F3','A5','C7',R)]
cards=''.join(f'<div class="card" style="padding:12px 20px;display:flex;align-items:center;gap:18px"><div style="width:96px;font-size:46px;font-weight:800;color:{col}">{n}</div><div style="flex:1">{kb("C",2,42,92,{a:H(col,a[0]),b:H(col,b[0]),c:H(col,c[0])},labels="none")}</div></div>' for n,a,b,c,col in four)
post('yt-tip-four-chords','CHORDS','4 chords, hundreds of songs',f'<div style="display:grid;gap:12px">{cards}</div>',foot='Save this · @Pianoers')
# 5 major scale formula square
hl={k:H(G,k[0]) for k in ['C0','D1','E2','F3','G4','A5','B6','C7']}
stp=''.join(f'<div style="flex:1;text-align:center;font-size:46px;font-weight:800;color:{A if s=="H" else T}">{s}</div>' for s in 'WWHWWWH')
post('yt-tip-major-scale','SCALES','Every major scale: W W H W W W H',f'<div class="card" style="padding:28px"><div style="padding:0 30px">{kb("C",1,104,280,hl,labels="none")}</div><div style="display:flex;margin:12px 64px 0">{stp}</div></div><div class="ser" style="font-size:30px;margin-top:24px">W = skip one key · H = the very next key. Start anywhere!</div>',foot='Save this · @Pianoers')
# 6 practice routine square
blocks=[('2 min','Warm up',G),('5 min','The hard part, slowly',R),('5 min','Review a piece you know',BL),('3 min','Play for fun',A)]
bl=''.join(f'<div class="card" style="padding:20px 26px;display:flex;gap:24px;align-items:center;border-left:14px solid {c}"><div style="width:140px;font-size:44px;font-weight:800;color:{c}">{m}</div><div style="font-size:38px;font-weight:800">{t}</div></div>' for m,t,c in blocks)
post('yt-tip-15-minute-practice','PRACTICE','The 15-minute practice routine',f'<div style="display:grid;gap:14px">{bl}</div>',foot='Save this · @Pianoers')
json.dump(jobs,open('yjobs.json','w'))
