import re,sys
src,out=sys.argv[1],sys.argv[2]
s=open(src).read()
log=[]
def rep(a,b,count=1,all_=False):
    global s
    n=s.count(a)
    assert n>=count if not all_ else n>0, (a,n)
    s=s.replace(a,b) if all_ else s.replace(a,b,count)
    log.append(a[:60])
def nth(a,b,k):
    global s
    i=-1
    for _ in range(k): i=s.index(a,i+1)
    s=s[:i]+b+s[i+len(a):]
# Top picks summary
rep("For intermediate players, the Yamaha P-225 and Roland FP-30X deliver","For intermediate players, the Roland FP-30X and Kawai ES920 deliver")
# P-145BT
rep("sampled from Yamaha's legendary CFX concert grand","sampled from Yamaha's CFIIIS concert grand")
rep("<li>Yamaha CFX-sampled piano voice</li>","<li>Yamaha CFIIIS concert grand piano voice</li>")
rep("<li>24 instrument voices</li>","<li>10 instrument voices</li><li>Bluetooth audio (stream music through the speakers)</li>")
rep("<li>Super lightweight at just 24 lbs</li>","<li>Lightweight at about 24.5 lbs (11.1 kg)</li>")
# FP-10
rep("(which costs $200 more)","(which costs about $150 more)")
rep("<li>15 tones</li>","<li>15 tones on the panel (36 in total with the app)</li>")
rep("<li>Bluetooth MIDI (via Roland Piano Partner app)</li>","<li>Bluetooth MIDI (works with the Roland Piano App)</li>")
rep(" No headphone 3D ambience like the FP-30X.","")
# ES60
rep("The new kid on the block that sounds like a $250,000 concert grand.","The new kid on the block, with the sound of a hand-built concert grand.")
rep("Kawai finally entered the under-$500 game, and they didn't mess around.","The ES60 is the most affordable model in Kawai's ES series, and they didn't mess around.")
rep("sound in a $499 piano.","sound in a piano that sells for about $450 to $550 (list price $599).")
rep("And at just 24 lbs, it's one","And at about 24 lbs (11 kg), it's one")
# Intermediate intro
rep("Standout options include the Yamaha P-225, Roland FP-30X, and Kawai ES120, which add graded hammer actions, improved speakers, and Bluetooth or app support.","Standout options include the Roland FP-30X, Casio PX-S1100 and Kawai ES920, which add better hammer actions, stronger speakers, and Bluetooth or app support.")
rep("typically priced from $700 to $2,000","typically priced from about $600 to $2,000")
rep("Best Intermediate Digital Pianos ($700–$2,000)","Best Intermediate Digital Pianos ($600–$2,000)",all_=True)
# FP-30X
rep("At around $695, the FP-30X","At about $650 to $700, the FP-30X")
rep("<li>56 instrument voices</li>","<li>56 tones on the panel</li>")
rep("<li>Built-in recorder and metronome</li>","<li>Built-in MIDI recorder and metronome</li>")
nth("<li>Headphone 3D ambience</li>","<li>11W + 11W speakers</li>",1)
rep("At $695–$700, it's a step up","At about $650 to $700, it's a step up")
# PX-S1100
rep("We're talking world's thinnest digital piano territory.","It's only about 9 inches deep.")
rep("<li>Bluetooth audio</li>","<li>Bluetooth audio and MIDI (via the included WU-BT10 adapter)</li>")
rep("<li>Incredibly slim and light (25 lbs)</li>","<li>Incredibly slim and light (about 24.7 lbs / 11.2 kg)</li>")
# ES920
rep("typically around $1,950.","with a list price of $1,799 (often on sale for about $1,700).")
rep("Responsive Hammer III action with 88 keys with triple-sensor detection","Responsive Hammer III action, with triple-sensor detection")
# PX-S3100
rep("now with 700+ tones, 200 rhythms","now with 700 tones, 200 rhythms")
rep("<li>700+ tones","<li>700 tones")
rep("<li>Pitch bend wheel and 2 assignable knobs</li>","<li>Pitch bend wheel and assignable knobs</li>")
nth("<li>Bluetooth MIDI + audio</li>","<li>Bluetooth MIDI + audio (via the included WU-BT10 adapter)</li>",2)
rep("<li>Mic input with vocal effects</li>","")
rep("<li>USB audio recording</li>","<li>Built-in MIDI and audio recorder</li>",1)
rep("And it still weighs about 24 lbs.","And it still weighs only about 25 lbs (11.4 kg).")
rep("with 700+ sounds","with 700 sounds")
# KDP120
rep("<li>USB to Host</li>\n","<li>USB to Host</li>\n") if "<li>USB to Host</li>\n" in s else None
i=s.index("Kawai KDP120"); j=s.index("Yamaha CLP-835",i+2000)
k=s[i:j]
k2=k.replace("<li>Headphone jacks x 2</li>","<li>Headphone jacks x 2</li><li>Bluetooth MIDI for piano apps</li><li>3-song recorder</li><li>Dual and Four Hands modes</li><li>Lesson songs (Alfred, Burgmüller, Czerny, Beyer)</li>")
k2=k2.replace("No Bluetooth. The feature set is intentionally minimal: no recorder, no split/layer modes, no fancy connectivity.","Bluetooth is MIDI only (for apps), so you can't stream music through the speakers. The feature set is intentionally simple: a 3-song recorder and Dual and Four Hands modes, but no audio recording or USB stick.")
assert k2!=k and k2.count('Four Hands')==2, 'kdp'
s=s[:i]+k2+s[j:]
# CLP-835
rep("The GrandTouch-S keyboard has long, wooden keys that move and feel remarkably close to a concert grand.","The GrandTouch-S keyboard (plastic keys on the CLP-835; the CLP-845 adds wooden keys) moves and feels remarkably close to a concert grand.")
rep("<li>88 keys with GrandTouch-S action (wooden keys)</li>","<li>88 keys with GrandTouch-S action (plastic keys)</li>")
# FP-90X
rep("The sound engine is Roland's PureAcoustic Piano Modeling","The sound engine is Roland's Pure Acoustic Piano Modeling")
rep("<li>PureAcoustic Piano Modeling sound engine</li>","<li>Pure Acoustic Piano Modeling sound engine</li>")
i=s.index("PHA-50 hybrid action (wood")
j=s.index("</ul>",i)
blk=s[i:j]
blk2=blk.replace("<li>256-note polyphony</li>","<li>Unlimited polyphony for the modeled pianos (256 for other sounds)</li>").replace("<li>Headphone 3D ambience</li>","<li>Headphones Acoustic Projection</li>")
assert blk2.count('Unlimited')==1 and 'Acoustic Projection' in blk2,'fp90'
s=s[:i]+blk2+s[j:]
rep("at around 51 lbs","at about 52 lbs (23.6 kg)")
# Brand and guide
rep("Instead, they use <em>modeling</em> technology rather than samples to create sound. Their PureAcoustic Modeling engine","Their top models use <em>modeling</em> rather than plain samples to create sound. The Pure Acoustic Piano Modeling engine in the FP-90X")
rep("Aim for at least <strong>128 notes</strong>. Ideally 256.","64 notes is enough for beginner pieces; 128 or more helps with heavy pedalling and layered sounds, and 256 is plenty.")
rep("Incredible customer service, no tax in most states, and they have","Incredible customer service, and they have")
# FAQ and TL;DR
rep("the Roland FP-30X at around $695 is even better","the Roland FP-30X at about $650 to $700 is even better",all_=True)
rep("FP-30X at ~$695.","FP-30X at about $650 to $700.")
rep("Kawai ES920 (~$1,950)","Kawai ES920 (about $1,700 to $1,800)")
open(out,'w').write(s)
print(len(log),'edits')
