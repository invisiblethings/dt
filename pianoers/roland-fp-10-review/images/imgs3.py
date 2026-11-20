import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
P='file:///home/user/dt/pianoers/roland-fp-10-review/images/'
def marker(n,x,y,c=A): return f'<div style="position:absolute;left:{x}%;top:{y}%;transform:translate(-50%,-50%);width:38px;height:38px;border-radius:50%;background:{c};color:{"#1b1400" if c==A else "#fff"};display:grid;place-items:center;font-weight:800;font-size:20px;box-shadow:0 0 0 4px #fff,0 4px 10px rgb(0 0 0/30%)">{n}</div>'
def legend(items,cols=4):
    return f'<div style="display:grid;grid-template-columns:repeat({cols},1fr);gap:12px;margin-top:16px">'+''.join(f'<div class="card" style="padding:14px 16px;display:flex;gap:12px"><div style="flex:none;width:32px;height:32px;border-radius:50%;background:{A};display:grid;place-items:center;font-weight:800">{i+1}</div><div><div style="font-size:18px;font-weight:800">{a}</div><div style="font-size:15px;color:{MU};margin-top:2px;line-height:1.35">{b}</div></div></div>' for i,(a,b) in enumerate(items))+'</div>'
photo=lambda f,ms,pad='0': f'<div class="card" style="padding:{pad};overflow:hidden"><div style="position:relative"><img src="{P}{f}" style="width:100%;display:block">{"".join(ms)}</div></div>'
ms=[marker(1,48.7,37.5),marker(2,55.8,37.5),marker(3,63,37.5),marker(4,20,60)]
body=photo('panel-top.png',ms)+legend([('Power','Turns the piano on and off.'),('Volume','Two buttons, with a five-light level meter above.'),('Piano / Function','Back to the main piano, and the key to settings.'),('15 tones','Names printed above the keys: piano, e-piano, harpsichord, vibraphone, organ, strings, pad, jazz scat.')])
imgs['roland-fp-10-control-panel-explained']=(800,page(800,'Controls','The FP-10 control panel, explained',body,'Photo: Roland. Annotations: Pianoers'))
ms=[marker(1,12.5,48,T),marker(2,35,48,T),marker(3,86.5,48,T)]
body=photo('rear-crop.png',ms)+legend([('DC IN','Power from the included AC adaptor.'),('USB','Type A for updates and Type B to connect a computer.'),('Headphones and pedal','The 3.5 mm headphone jack (also an output) and the pedal jack.')],3)+f'<div class="card" style="margin-top:14px;padding:13px 20px;font-size:17px;background:#fff8e6">All the connections are on the back panel, so plug in your headphones before you sit down.</div>'
imgs['roland-fp-10-rear-panel']=(620,page(620,'Back panel','Every connection on the FP-10',body,'Photo: Roland. Annotations: Pianoers'))
body=f'''<div class="card" style="padding:40px 70px 30px 40px"><div style="position:relative"><img src="{P}top-view.png" style="width:100%;display:block">
<div style="position:absolute;right:-46px;top:0;bottom:0;width:2px;background:{T}"></div><div style="position:absolute;right:-56px;top:0;width:22px;height:2px;background:{T}"></div><div style="position:absolute;right:-56px;bottom:0;width:22px;height:2px;background:{T}"></div></div>
<div style="position:relative;height:2px;background:{T};margin-top:24px"><div style="position:absolute;left:0;top:-10px;width:2px;height:22px;background:{T}"></div><div style="position:absolute;right:0;top:-10px;width:2px;height:22px;background:{T}"></div></div>
<div style="display:flex;justify-content:space-between;margin-top:12px"><div style="font-size:26px;font-weight:800">1,284 mm wide <span style="color:{MU};font-size:20px;font-weight:600">(50 9/16 in)</span></div><div style="font-size:26px;font-weight:800">258 mm deep <span style="color:{MU};font-size:20px;font-weight:600">(10 3/16 in)</span></div></div></div>
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px">
<div class="card" style="padding:16px 18px"><div style="font-size:14px;font-weight:800;letter-spacing:.1em;color:{T}">HEIGHT</div><div style="font-size:26px;font-weight:800">140 mm <span style="color:{MU};font-size:18px">(5 9/16 in)</span></div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:14px;font-weight:800;letter-spacing:.1em;color:{T}">WEIGHT</div><div style="font-size:26px;font-weight:800">12.6 kg <span style="color:{MU};font-size:18px">(27 lb 13 oz)</span></div></div>
<div class="card" style="padding:16px 18px"><div style="font-size:14px;font-weight:800;letter-spacing:.1em;color:{T}">WITH MUSIC REST</div><div style="font-size:26px;font-weight:800">298 mm deep</div></div></div>'''
imgs['roland-fp-10-dimensions']=(700,page(700,'Size','How big is the Roland FP-10?',body,'Measurements without the music rest unless noted. Source: Roland'))
def ped(f,t,s,c,tag,hh=230):
    return f'<div class="card" style="padding:20px;text-align:center"><div style="height:300px;display:grid;place-items:center;background:#fff"><img src="{P}{f}" style="height:{hh}px;width:auto;max-width:90%"></div><div style="display:inline-block;margin-top:10px;font-size:14px;font-weight:800;letter-spacing:.08em;padding:4px 12px;border-radius:99px;background:{c[0]};color:{c[1]}">{tag}</div><div style="font-size:24px;font-weight:800;margin-top:8px">{t}</div><div style="font-size:17px;font-family:Lora,serif;color:#33424a;margin-top:4px;line-height:1.4">{s}</div></div>'
p1=ped("pedal-1125097-tight.png","Pedal switch","A small on/off switch. It works, but it slides around and can’t half-pedal.",("#e2eef1",T),"IN THE BOX",130)
p2=ped("pedal-1125096-tight.png","Roland DP-10","Shaped like a real piano pedal, and supports half-pedalling on the FP-10.",("#fff3d1","#8a5a00"),"UPGRADE")
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{p1}{p2}</div>'
imgs['roland-fp-10-pedal-switch-vs-dp-10']=(740,page(740,'Pedals','The included pedal vs the DP-10',body,'Photos: Roland'))
def st(f,t,s):
    return f'<div class="card" style="padding:20px"><div style="height:380px;display:grid;place-items:center;background:#fff"><img src="{P}{f}" style="max-height:370px;max-width:100%"></div><div style="font-size:24px;font-weight:800;margin-top:10px">{t}</div><div style="font-size:17px;font-family:Lora,serif;color:#33424a;margin-top:4px;line-height:1.4">{s}</div></div>'
body=f'<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">{st("stand-kscfp10.png","Dedicated stand (KSCFP10)","Gives the FP-10 a furniture look. 20.0 kg (44 lb 2 oz) all together, with the music rest.")}{st("stand-legs.png","A simple keyboard stand","Lighter and easy to fold away, but less like a real piano.")}</div>'
imgs['roland-fp-10-stand-options']=(780,page(780,'Stands','Two ways to set up the FP-10',body,'Photos: Roland'))
json.dump(imgs,open('imgs3.json','w'))
