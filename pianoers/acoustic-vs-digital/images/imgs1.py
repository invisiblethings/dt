import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5';G='#1f7a4d'
rows=[('Sound','Strings and soundboard resonate together','Sampled or modelled sound through speakers','a'),
('Touch','Real hammer action, very fine control','Weighted hammer action; good models feel close','a'),
('Starting price','Good new upright: about $3,500 to $10,000','Good beginner digital: about $400 to $700','d'),
('Upkeep','Tuning about twice a year, steady humidity','Dusting. No tuning, ever','d'),
('Volume','Loud; some uprights have a practice mute','Volume control and headphones','d'),
('Size and weight','Upright: about 300 to 800 lb','Portable: about 25 to 40 lb','d'),
('Moving','Needs professional piano movers','One or two people','d'),
('Extras','None (it is just a piano)','Metronome, recording, Bluetooth, apps','d'),
('Lifespan and resale','Decades with care; keeps more value','Electronics age; resale drops fast','a')]
TICK=' <span style="color:#1f7a4d;font-family:Schibsted Grotesk;font-weight:800">✓</span>'
def cell(t,win):
    st='background:#eaf5ef;font-weight:600' if win else ''
    return f'<td style="padding:11px 14px;font-size:17px;font-family:Lora,serif;line-height:1.35;{st}">{t}{TICK if win else ""}</td>'
tr=''.join(f'<tr style="border-top:1px solid {LINE}"><td style="padding:11px 14px;font-size:17px;font-weight:800;width:190px">{f}</td>{cell(a,w=="a")}{cell(d,w=="d")}</tr>' for f,a,d,w in rows)
body=f'''<div class="card" style="overflow:hidden"><table style="width:100%;border-collapse:collapse"><thead><tr style="background:{INK};color:#fff"><th style="text-align:left;padding:12px 14px;font-size:16px">Factor</th><th style="text-align:left;padding:12px 14px;font-size:19px">Acoustic piano</th><th style="text-align:left;padding:12px 14px;font-size:19px">Digital piano</th></tr></thead><tbody>{tr}</tbody></table></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px"><div class="card" style="padding:14px 18px;font-size:18px"><b style="color:{T}">Acoustic wins 3:</b> sound, touch, lifespan.</div><div class="card" style="padding:14px 18px;font-size:18px"><b style="color:{T}">Digital wins 6:</b> price, upkeep, volume, size, moving, extras.</div></div>'''
imgs['acoustic-vs-digital-piano-comparison-chart']=(900,page(900,'Side by side','Acoustic vs digital piano at a glance',body,'Typical ranges; prices in US dollars, October 2026'))

def chain(steps,col):
    out=''
    for i,(t,s) in enumerate(steps):
        out+=f'<div style="display:flex;gap:14px;align-items:center"><div style="flex:none;width:46px;height:46px;border-radius:50%;background:{col};color:{"#1b1400" if col==A else "#fff"};display:grid;place-items:center;font-weight:800;font-size:20px">{i+1}</div><div><div style="font-size:21px;font-weight:800">{t}</div><div style="font-size:16.5px;font-family:Lora,serif;color:#33424a;line-height:1.35">{s}</div></div></div>'
        if i<len(steps)-1: out+=f'<div style="width:3px;height:16px;background:{col};margin-left:22px;opacity:.5"></div>'
    return out
ac=[('Key','You press the key, which works as a lever.'),('Hammer','A felt hammer flies up and strikes the strings.'),('Strings','Steel strings vibrate; the damper lifts to let them ring.'),('Soundboard','A large wooden board amplifies the vibration.'),('Your ears','Sound fills the room, with real resonance from every string.')]
dg=[('Key','A weighted key copies the feel of a hammer action.'),('Sensors','Two or three sensors per key measure how fast it moved.'),('Sound engine','Chooses the matching recording, or models the string.'),('Amplifier','Turns the signal into sound at the volume you set.'),('Speakers or headphones','The room, or only you, hears it.')]
body=f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
<div class="card" style="padding:22px 24px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:#b86a0a">ACOUSTIC PIANO</div><div style="font-size:26px;font-weight:800;margin:4px 0 16px">Wood, felt and steel</div>{chain(ac,A)}</div>
<div class="card" style="padding:22px 24px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{T}">DIGITAL PIANO</div><div style="font-size:26px;font-weight:800;margin:4px 0 16px">Sensors and samples</div>{chain(dg,T)}</div></div>
<div class="card" style="margin-top:16px;padding:14px 20px;font-size:18px;background:#fff8e6">The difference you hear: an acoustic's untouched strings vibrate in sympathy. Better digitals simulate this "string resonance"; cheaper ones don't.</div>'''
imgs['how-acoustic-and-digital-pianos-make-sound']=(860,page(860,'How they work','How each piano makes its sound',body))

bars=[('Digital, beginner','$500 piano + $150 stand, bench and pedal',650,T),('Digital, console','$2,000, no upkeep',2000,T),('Used upright','$2,000 + $300 move + 20 tunings',5300,A),('New upright','$6,000 + $300 move + 22 tunings',9600,A)]
mx=10000
br=''.join(f'<div style="display:grid;grid-template-columns:230px 1fr;gap:16px;align-items:center;margin:14px 0"><div><div style="font-size:20px;font-weight:800">{n}</div><div style="font-size:15px;color:{MU}">{s}</div></div><div style="display:flex;align-items:center;gap:12px"><div style="height:46px;width:{v/mx*100:.1f}%;min-width:8px;background:{c};border-radius:10px"></div><b style="font-size:24px;white-space:nowrap">${v:,}</b></div></div>' for n,s,v,c in bars)
body=f'''<div class="card" style="padding:22px 26px">{br}</div>
<div class="card" style="margin-top:16px;padding:16px 20px;font-size:17px;line-height:1.5"><b>Assumptions:</b> tuning at $150 a visit; 3 to 4 tunings in a new piano's first year, then 2 a year (Piano Technicians Guild guidance); one local move. Not included: repairs, humidity control, or resale, where a well-kept acoustic gets more back.</div>'''
imgs['acoustic-vs-digital-piano-10-year-cost']=(770,page(770,'Cost of ownership','What each piano costs over 10 years',body,'Example totals in US dollars; your prices will vary'))

items=[('Portable digital','25–40 lb','About 12 in deep',120,38,T),('Console digital','75–150 lb','About 16–19 in deep',150,90,T),('Upright','300–800 lb','About 23–26 in deep',190,150,A),('Baby grand','500–600 lb','About 5 ft long',260,190,A)]
SUB=' <span style="font-size:14px;color:#56666e;font-weight:600">(from above)</span>'
cards=''
for n,w,dpt,bw,bh,c in items:
    if n=='Baby grand':
        shape=f'<svg width="100%" viewBox="0 0 260 200"><path d="M10 40 H130 C200 40 250 70 250 120 C250 170 210 190 160 190 H10 Z" fill="{c}"/><rect x="10" y="40" width="40" height="150" fill="#15191c" opacity=".25"/></svg>'
    elif n=='Upright':
        shape=f'<svg width="100%" viewBox="0 0 260 200"><rect x="35" y="20" width="190" height="150" rx="8" fill="{c}"/><rect x="25" y="105" width="210" height="22" rx="4" fill="#fff" stroke="#15191c" stroke-width="2"/><rect x="45" y="170" width="12" height="25" fill="{c}"/><rect x="203" y="170" width="12" height="25" fill="{c}"/></svg>'
    elif n=='Console digital':
        shape=f'<svg width="100%" viewBox="0 0 260 200"><rect x="55" y="80" width="150" height="90" rx="8" fill="{c}"/><rect x="45" y="104" width="170" height="18" rx="4" fill="#fff" stroke="#15191c" stroke-width="2"/><rect x="62" y="170" width="10" height="25" fill="{c}"/><rect x="188" y="170" width="10" height="25" fill="{c}"/></svg>'
    else:
        shape=f'<svg width="100%" viewBox="0 0 260 200"><rect x="40" y="138" width="180" height="22" rx="5" fill="{c}"/><rect x="48" y="138" width="164" height="10" rx="2" fill="#fff" stroke="#15191c" stroke-width="1.5"/><line x1="70" y1="160" x2="60" y2="195" stroke="#15191c" stroke-width="5"/><line x1="190" y1="160" x2="200" y2="195" stroke="#15191c" stroke-width="5"/></svg>'
    sub=SUB if n=='Baby grand' else ''
    cards+=f'<div class="card" style="padding:16px 14px;text-align:center">{shape}<div style="font-size:22px;font-weight:800;margin-top:6px">{n}{sub}</div><div style="font-size:26px;font-weight:800;color:{"#b86a0a" if c==A else T}">{w}</div><div style="font-size:16px;color:{MU}">{dpt}</div></div>'
body=f'<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px">{cards}</div><div class="card" style="margin-top:16px;padding:14px 20px;font-size:17.5px">Typical ranges. Check the exact model: a full-size upright can pass 800 lb, and a concert grand weighs up to about 1,200 lb.</div>'
imgs['piano-size-and-weight-comparison']=(640,page(640,'Size and weight','How much room each piano needs',body))
json.dump(imgs,open('imgs1.json','w'))
