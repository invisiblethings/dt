import json
from page import page
imgs={}
T='#2e6475';A='#f6b31e';G='#2f9e5b';R='#c2412d';BL='#3b6fd1';V='#7a4fc2';INK='#15191c';MU='#56666e';LINE='#d9e2e5'
SER='font-family:Lora,serif;color:#33424a'
BR={'Yamaha':V,'Roland':R,'Kawai':T,'Casio':BL}

acts=[('Yamaha',[('GHC (Graded Hammer Compact)','P-145BT, P-225','Entry'),('GrandTouch-S','CLP-835 (plastic keys), CLP-845 (wooden keys)','Upper'),('GrandTouch','CLP-885: the top Clavinova action','Top')]),
('Roland',[('PHA-4 Standard','FP-10, FP-30X: escapement, Ivory Feel keytops','Entry'),('PHA-50','FP-90X: wood and plastic hybrid, escapement','Top')]),
('Kawai',[('Responsive Hammer Lite (RHL)','ES60','Entry'),('Responsive Hammer Compact (RHC / RHC II)','ES120, KDP120','Entry'),('Responsive Hammer III (RHIII)','ES920, CN301: triple sensor, counterweights, let-off','Upper')]),
('Casio',[('Smart Scaled Hammer Action','PX-S1100, PX-S3100','Entry')])]
lv={'Entry':('Entry',G),'Upper':('Step up',A),'Top':('Flagship',R)}
rows=''
for b,lst in acts:
    for i,(a,m,l) in enumerate(lst):
        rows+=f'<tr style="border-top:1px solid {LINE}"><td style="padding:11px 10px;width:110px;font-size:19px;font-weight:800;color:{BR[b]}">{b if i==0 else ""}</td><td style="padding:11px 10px;font-size:19px;font-weight:800">{a}</td><td style="padding:11px 10px;font-size:16.5px;{SER}">{m}</td><td style="padding:11px 10px;width:120px"><span style="background:{lv[l][1]};color:#fff;border-radius:999px;padding:4px 11px;font-size:14px;font-weight:800">{lv[l][0]}</span></td></tr>'
body=f'''<div class="card" style="padding:8px 18px"><table style="width:100%;border-collapse:collapse"><tr>{''.join(f'<th style="text-align:left;padding:10px;font-size:14px;letter-spacing:.08em;color:{MU}">{x}</th>' for x in ['BRAND','KEY ACTION','IN THESE MODELS','TIER'])}</tr>{rows}</table></div>
<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px">
<div class="card" style="padding:14px 18px"><b style="font-size:19px">Graded</b><div style="font-size:16px;{SER};line-height:1.38;margin-top:3px">Heavier in the bass, lighter in the treble, like an acoustic piano.</div></div>
<div class="card" style="padding:14px 18px"><b style="font-size:19px">Escapement / let-off</b><div style="font-size:16px;{SER};line-height:1.38;margin-top:3px">A tiny notch felt when you press slowly, copied from a grand piano action.</div></div>
<div class="card" style="padding:14px 18px"><b style="font-size:19px">Triple sensor</b><div style="font-size:16px;{SER};line-height:1.38;margin-top:3px">Three sensors per key catch fast repeated notes more reliably than two.</div></div></div>'''
imgs['digital-piano-weighted-key-actions']=(820,page(820,'Weighted keys','Digital piano key actions by brand, decoded',body,'Action names from Yamaha, Roland, Kawai and Casio'))

wts=[('Kawai ES60',11.0,'Kawai'),('Yamaha P-145BT',11.1,'Yamaha'),('Casio PX-S1100',11.2,'Casio'),('Yamaha P-225',11.5,'Yamaha'),('Kawai ES120',12.0,'Kawai'),('Roland FP-10',12.6,'Roland'),('Roland FP-30X',14.8,'Roland'),('Kawai ES920',17.0,'Kawai'),('Roland FP-90X',23.6,'Roland')]
mx=25
bars=''.join(f'<div style="display:grid;grid-template-columns:190px 1fr 150px;align-items:center;gap:12px;margin:9px 0"><div style="font-size:18px;font-weight:800">{n}</div><div style="height:30px;background:#eef3f4;border-radius:8px;position:relative"><div style="position:absolute;inset:0 auto 0 0;width:{w/mx*100:.1f}%;background:{BR[b]};border-radius:8px"></div></div><div style="font-size:17px;font-weight:700">{w:.1f} kg &#183; {w*2.20462:.1f} lb</div></div>' for n,w,b in wts)
body=f'''<div class="card" style="padding:16px 24px">{bars}</div>
<div style="margin-top:14px;font-size:17px;color:{MU}">Weights without stand or pedal unit, from the makers&#39; spec sheets (P-225 from a dealer listing). Anything under about 12 kg is easy for one adult to carry.</div>'''
imgs['portable-digital-piano-weights']=(700,page(700,'Portable and slim','How heavy are portable digital pianos?',body,'Body weight only; a stand adds 6 to 10 kg'))

def col(title,c,items,icon):
    li=''.join(f'<div style="padding:9px 0;border-top:1px solid {LINE};font-size:18px;line-height:1.35">{t}</div>' for t in items)
    return f'<div class="card" style="padding:16px 20px;border-top:8px solid {c}"><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{c}">{icon}</div><div style="font-size:25px;font-weight:800;margin:2px 0 6px">{title}</div>{li}</div>'
body=f'''<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px">
{col('Digital piano',G,['88 weighted, hammer-action keys','Built to feel and sound like an acoustic piano','Sustain pedal (consoles have three pedals)','Usually 10 to 40 voices','Best for: learning and playing piano'],'WHAT MOST PEOPLE MEAN BY')}
{col('&#8220;Electric piano&#8221;',A,['In everyday use: the same thing as a digital piano','Strictly: vintage instruments like the Rhodes and Wurlitzer','Stage pianos are the modern pro version','Shops use the term for all of the above','Best for: knowing what you&#39;re searching for'],'A NAME, TWO MEANINGS')}
{col('Keyboard',BL,['Usually 61 keys, often unweighted','Hundreds of sounds and rhythms','Light and cheap, runs on batteries','Not enough for classical technique','Best for: fun, songwriting, small kids'],'PORTABLE KEYBOARD')}</div>
<div class="card" style="padding:14px 22px;margin-top:14px;font-size:18.5px;{SER};line-height:1.45"><b style="font-family:Schibsted Grotesk,Arial,sans-serif">My rule as a teacher:</b> if you want to learn piano, buy 88 weighted keys. Everything on this page qualifies.</div>'''
imgs['digital-piano-vs-electric-piano-vs-keyboard']=(700,page(700,'What to call it','Digital piano vs electric piano vs keyboard',body,'Pianoers.com'))

def side(title,c,pros,cons,ex):
    p=''.join(f'<li style="margin:5px 0">{x}</li>' for x in pros); n=''.join(f'<li style="margin:5px 0">{x}</li>' for x in cons)
    return f'<div class="card" style="padding:16px 22px;border-top:8px solid {c}"><div style="font-size:27px;font-weight:800">{title}</div><div style="font-size:15px;color:{MU};font-weight:700;margin:2px 0 8px">{ex}</div><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{G}">GOOD</div><ul style="font-size:18px;line-height:1.35;padding-left:20px;margin:4px 0 10px">{p}</ul><div style="font-size:15px;font-weight:800;letter-spacing:.1em;color:{R}">LESS GOOD</div><ul style="font-size:18px;line-height:1.35;padding-left:20px;margin:4px 0 0">{n}</ul></div>'
body=f'''<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
{side('Portable (slab)',BL,['Cheaper for the same key action','Fits on a desk or X-stand, moves easily','Easy to sell or upgrade later'],['Smaller speakers aimed up or down','Single sustain pedal unless you add a unit','Stand and bench sold separately'],'FP-30X, P-225, ES920, PX-S1100')}
{side('Console (home)',T,['Speakers built into a cabinet, fuller sound','Three pedals with half-pedalling','Looks like furniture; stays in tune with the room'],['Costs more for the same action','Heavy: 36 kg and up','Hard to move once set up'],'KDP120, CLP-835, CLP-885, CN301')}</div>'''
imgs['portable-vs-console-digital-piano']=(660,page(660,'Portable or console?','Portable vs console digital pianos',body,'Pianoers.com'))
json.dump(imgs,open('imgs1.json','w'))
