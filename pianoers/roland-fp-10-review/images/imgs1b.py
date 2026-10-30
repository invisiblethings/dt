import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
grad=''.join(f'<div style="flex:1;height:{150-i*9}px;background:{INK};opacity:{1-i*0.06:.2f};border-radius:4px 4px 0 0"></div>' for i in range(10))
feat=[('Graded weight','Heavier in the bass, lighter in the treble, like an acoustic piano.',A),('Escapement','A tiny notch you feel when you press a key slowly, copying the hammer release of a grand.',T),('Ivory feel','Moisture-absorbing key tops that grip slightly, so fingers slip less.','#5b4a8a'),('Fast repetition','High-resolution sensing lets you repeat a note quickly and evenly.','#b86a0a')]
fc=''.join(f'<div class="card" style="padding:16px 18px;border-top:6px solid {c}"><div style="font-size:21px;font-weight:800">{a}</div><div style="font-size:16.5px;font-family:Lora,serif;line-height:1.4;color:#33424a;margin-top:5px">{b}</div></div>' for a,b,c in feat)
key=(f'<svg viewBox="0 0 520 230" width="100%"><rect x="20" y="150" width="380" height="34" rx="6" fill="#fff" stroke="{INK}" stroke-width="3"/><rect x="20" y="150" width="120" height="34" rx="6" fill="#f3efe6" stroke="{INK}" stroke-width="3"/>'
 f'<text x="80" y="207" text-anchor="middle" font-size="15" font-weight="700" fill="{MU}">Ivory-feel key top</text>'
 f'<circle cx="330" cy="167" r="6" fill="{INK}"/><path d="M400 167 L470 95" stroke="{INK}" stroke-width="6" stroke-linecap="round"/><circle cx="478" cy="86" r="22" fill="{A}"/><text x="420" y="60" text-anchor="middle" font-size="15" font-weight="700" fill="{MU}">Hammer weight</text>'
 f'<path d="M60 90 v40 M45 115 l15 15 l15 -15" stroke="{T}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="88" y="118" font-size="15" font-weight="700" fill="{T}">You press down here</text>'
 f'<rect x="250" y="186" width="40" height="14" rx="3" fill="{T}"/><text x="270" y="224" text-anchor="middle" font-size="15" font-weight="700" fill="{T}">Escapement notch</text></svg>')
body=(f'<div style="display:grid;grid-template-columns:1.1fr 1fr;gap:18px"><div class="card" style="padding:20px 22px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{T}">INSIDE A KEY (SIMPLIFIED)</div>{key}</div>'
 f'<div class="card" style="padding:20px 22px"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{T}">KEY WEIGHT, LOW TO HIGH</div><div style="display:flex;gap:6px;align-items:flex-end;height:160px;margin-top:20px">{grad}</div><div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:{MU};margin-top:8px"><span>Bass: heavier</span><span>Treble: lighter</span></div></div></div>'
 f'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:16px">{fc}</div>'
 f'<div class="card" style="margin-top:14px;padding:13px 20px;font-size:17px;background:#fff8e6">The same PHA-4 Standard action is in Roland\'s pricier FP-30X. Simplified illustration, not to scale.</div>')
imgs['roland-pha-4-standard-action-explained']=(800,page(800,'The keys','PHA-4 Standard action, explained',body))
def box(t,s,c): return f'<div class="card" style="padding:14px 16px;border-left:6px solid {c}"><div style="font-size:19px;font-weight:800">{t}</div><div style="font-size:15.5px;color:{MU};margin-top:3px;line-height:1.35">{s}</div></div>'
left=box('Phone or tablet (Bluetooth MIDI)','Roland Piano App, GarageBand and learning apps. No cable needed.',T)+box('Computer (USB Type B)','USB MIDI for apps, notation and recording software.',T)+box('USB Type A port','For system updates.',MU)
right=box('Headphones (3.5 mm mini jack)','Use a 6.3 mm adapter for studio headphones.',A)+box('Same jack as an output','Connect powered speakers or an amp with a cable.',A)+box('Pedal','On/off pedal switch included. Optional DP-10 adds half-pedalling.',A)
fp='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"><img src="file:///home/user/dt/pianoers/roland-fp-10-review/images/fp10-crop.png" style="width:100%;border-radius:14px"><div style="font-size:22px;font-weight:800">Roland FP-10</div></div>'
body=(f'<div style="display:grid;grid-template-columns:1fr 1.05fr 1fr;gap:16px;align-items:center"><div style="display:flex;flex-direction:column;gap:10px">{left}</div>{fp}<div style="display:flex;flex-direction:column;gap:10px">{right}</div></div>'
 '<div class="card" style="margin-top:16px;padding:14px 20px;font-size:17px;background:#fbe4dd"><b>Not on the FP-10:</b> Bluetooth audio (playing music from your phone through its speakers), a separate line out, a second headphone jack, or a three-pedal unit.</div>')
imgs['roland-fp-10-connections']=(700,page(700,'Connections','What you can plug into the FP-10',body,'Based on Roland FP-10 specifications'))
json.dump(imgs,open('imgs1b.json','w'))
