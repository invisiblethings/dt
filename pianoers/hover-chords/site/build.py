import re, json, os
HERE=os.path.dirname(os.path.abspath(__file__))
LIB=open(os.path.join(HERE,'..','extension','chords.js')).read().strip()
STORE='CHROME_WEB_STORE_URL'
IMG='https://pianoers.com/content/images/2026/10/'

SONG=[('[Verse 1]',None),('G              G7        C        G',True),('Amazing grace, how sweet the sound',None),('G                        D',True),('That saved a wretch like me',None),('G             G7         C        G',True),('I once was lost, but now am found',None),('Em        D          G',True),('Was blind, but now I see',None),('',None),('[Verse 2]',None),('G              G7          C          G',True),("'Twas grace that taught my heart to fear",None),('G                     D7',True),('And grace my fears relieved',None),('G             G/B        C       G',True),('How precious did that grace appear',None),('Em          D7       G',True),('The hour I first believed',None)]
def line(t,ch):
    if not ch: return t.replace('&','&amp;').replace('<','&lt;')
    return re.sub(r'\S+',lambda m:f'<span class="hcd-c" tabindex="0" role="button" data-c="{m.group(0)}">{m.group(0)}</span>',t)
sheet='\n'.join(line(t,c) for t,c in SONG)

CSS='''
.hcd{position:relative;margin:1.6em 0;border:1px solid var(--line,#d9e2e5);border-radius:16px;background:var(--paper,#fff);box-shadow:0 1px 2px rgb(21 25 28/6%),0 8px 24px rgb(21 25 28/6%);overflow:visible}
.hcd-top{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line,#d9e2e5);font-family:var(--f-display,system-ui,sans-serif)}
.hcd-title{font-weight:800;font-size:1rem}
.hcd-title small{display:block;font-weight:600;font-size:.82rem;color:var(--muted,#56666e)}
.hcd-tp{display:flex;align-items:center;gap:6px;font-weight:700;font-size:.9rem}
.hcd-tp button,.hcd-pop button{appearance:none;border:1px solid var(--line,#d9e2e5);background:var(--surface,#f3f6f7);color:var(--ink,#15191c);border-radius:9px;height:32px;min-width:32px;padding:0 10px;font:700 .9rem var(--f-display,system-ui,sans-serif);cursor:pointer}
.hcd-tp button:hover,.hcd-pop button:hover{border-color:var(--teal,#2e6475)}
.hcd-tp output{min-width:2.4em;text-align:center;font-weight:800}
.hcd-sheet{margin:0;padding:16px 18px;overflow-x:auto;font:15px/1.6 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;color:var(--ink,#15191c);background:transparent;white-space:pre}
.hcd-c{cursor:pointer;border-radius:3px;font-weight:700;text-decoration:underline dotted;text-decoration-color:#f6b31e;text-decoration-thickness:2px;text-underline-offset:3px}
.hcd-c:hover,.hcd-c:focus-visible,.hcd-c.is-on{background:rgb(246 179 30/22%);outline:none}
.hcd-pop{position:absolute;z-index:30;width:max-content;max-width:calc(100% - 16px);padding:12px 14px 10px;border-radius:14px;background:var(--paper,#fff);color:var(--ink,#15191c);border:1px solid var(--line,#d9e2e5);box-shadow:0 10px 30px rgb(21 25 28/18%);font:500 14px/1.35 var(--f-display,system-ui,sans-serif)}
.hcd-pop[hidden]{display:none}
.hcd-head{display:flex;align-items:baseline;gap:10px;margin-bottom:8px;padding-right:26px}
.hcd-name{font-size:22px;font-weight:800}
.hcd-notes{color:var(--muted,#56666e);font-size:13.5px;font-weight:600}
.hcd-pop .hcd-x{position:absolute;top:8px;right:8px;width:28px;height:28px;min-width:0;padding:0;border:0;border-radius:50%;background:transparent;font-size:18px}
.hcd-pop svg{display:block;max-width:100%;height:auto}
.hcd-row{display:flex;align-items:center;gap:6px;margin-top:9px}
.hcd-pop .hcd-play{background:#f6b31e;border-color:#f6b31e;color:#1b1400}
.hcd-inv{flex:1;text-align:center;color:var(--muted,#56666e);font-size:12.5px;font-weight:600;white-space:nowrap}
.hcd-hint{padding:0 18px 14px;margin:0;color:var(--muted,#56666e);font:600 .85rem var(--f-display,system-ui,sans-serif)}
.hcd-cta{display:flex;flex-wrap:wrap;gap:12px;align-items:center;margin:1.4em 0}
.hcd-cta .hcd-note{font:600 .9rem var(--f-display,system-ui,sans-serif);color:var(--muted,#56666e)}
.hcd-btn{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:12px;background:#f6b31e;color:#1b1400!important;font:800 1rem var(--f-display,system-ui,sans-serif);text-decoration:none!important;box-shadow:0 3px 0 #c98f0c}
.hcd-btn:hover{filter:brightness(1.05)}
.hcd-steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:1.2em 0;padding:0;list-style:none;counter-reset:s}
.hcd-steps li{position:relative;padding:16px 16px 16px 58px;border:1px solid var(--line,#d9e2e5);border-radius:14px;background:var(--surface,#f3f6f7);font-family:var(--f-display,system-ui,sans-serif);font-size:.95rem;line-height:1.4;counter-increment:s;margin:0}
.hcd-steps li::before{content:counter(s);position:absolute;left:14px;top:14px;width:32px;height:32px;border-radius:50%;background:var(--teal,#2e6475);color:#fff;display:grid;place-items:center;font-weight:800}
.hcd-steps b{display:block;font-size:1.02rem;margin-bottom:2px}
@media (max-width:560px){.hcd-sheet{font-size:13px}}
'''

JS='''(function(){'use strict';var root=document.getElementById('hcd-demo');if(!root||root.dataset.ready)return;root.dataset.ready='1';
LIB
var H=window.HoverChords,pop=root.querySelector('.hcd-pop'),cur=null,inv=0,shift=0,ac=null;
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function kb(v){var all=v.notes.slice();if(v.bass!==null)all.push(v.bass);var lo=Math.floor(Math.min.apply(null,all)/12)*12,hi=Math.floor(Math.max.apply(null,all)/12)*12+12;if(hi-lo<24)hi=lo+24;var W=[0,2,4,5,7,9,11],ww=22,wh=84,bw=14,bh=52,width=(hi-lo)/12*7*ww,lit={};v.notes.forEach(function(n){lit[n]='c';});if(v.bass!==null)lit[v.bass]='b';var s='<svg viewBox="-1 -1 '+(width+2)+' '+(wh+2)+'" width="'+(width+2)+'" role="img" aria-label="Piano keyboard">',wi=0,b='';for(var n=lo;n<hi;n++){var p=n%12;if(W.indexOf(p)!==-1){var x=wi*ww,f=lit[n]==='c'?'#f6b31e':lit[n]==='b'?'#7fc3d4':'#ffffff';s+='<rect x="'+x+'" y="0" width="'+ww+'" height="'+wh+'" rx="3" fill="'+f+'" stroke="#9aa9ae"/>';if(lit[n])s+='<text x="'+(x+ww/2)+'" y="'+(wh-8)+'" text-anchor="middle" font-size="10" font-weight="800" fill="#15191c" font-family="system-ui,Arial">'+esc(v.label(n))+'</text>';wi++;}else{var bx=wi*ww-bw/2,bf=lit[n]==='c'?'#d18f00':lit[n]==='b'?'#2e8fa8':'#1c2226';b+='<rect x="'+bx+'" y="0" width="'+bw+'" height="'+bh+'" rx="2.5" fill="'+bf+'"/>';if(lit[n])b+='<text x="'+(bx+bw/2)+'" y="'+(bh-6)+'" text-anchor="middle" font-size="7.5" font-weight="800" fill="#fff" font-family="system-ui,Arial">'+esc(v.label(n))+'</text>';}}return s+b+'</svg>';}
function render(){var ch=H.parse(cur.textContent);if(!ch)return;var v=H.voicing(ch,inv),k=Math.max(1,v.inversions);pop.querySelector('.hcd-name').textContent=ch.name;pop.querySelector('.hcd-notes').textContent=H.toneNames(ch).join(' \\u00B7 ')+(ch.bassName?'  (bass '+ch.bassName+')':'');pop.querySelector('.hcd-kb').innerHTML=kb(v);pop.querySelector('.hcd-inv').textContent=H.inversionLabel(((inv%k)+k)%k);}
function place(){var r=cur.getBoundingClientRect(),R=root.getBoundingClientRect(),w=pop.offsetWidth,left=r.left-R.left+r.width/2-w/2;left=Math.max(8,Math.min(left,root.clientWidth-w-8));pop.style.left=left+'px';pop.style.top=(r.bottom-R.top+8)+'px';}
function show(s){if(cur)cur.classList.remove('is-on');if(cur!==s)inv=0;cur=s;s.classList.add('is-on');pop.hidden=false;render();place();}
function play(){if(!cur)return;var ch=H.parse(cur.textContent);if(!ch)return;var v=H.voicing(ch,inv);try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();var notes=(v.bass!==null?[v.bass]:[]).concat(v.notes),m=ac.createGain();m.gain.value=0.32/Math.sqrt(notes.length);m.connect(ac.destination);var t0=ac.currentTime+0.02;notes.forEach(function(n,i){var f=440*Math.pow(2,(48+n-69)/12),t=t0+i*0.028;[[1,1,'triangle'],[2,0.35,'sine'],[3,0.12,'sine']].forEach(function(h){var o=ac.createOscillator(),g=ac.createGain();o.type=h[2];o.frequency.value=f*h[0];g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(h[1],t+0.008);g.gain.exponentialRampToValueAtTime(0.0001,t+2.4/h[0]);o.connect(g);g.connect(m);o.start(t);o.stop(t+2.5);});});}catch(e){}}
var spans=[].slice.call(root.querySelectorAll('.hcd-c'));
spans.forEach(function(s){s.addEventListener('mouseenter',function(){show(s);});s.addEventListener('click',function(){show(s);play();});s.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();show(s);play();}});});
pop.querySelector('.hcd-play').addEventListener('click',play);
pop.querySelector('.hcd-prev').addEventListener('click',function(){inv--;render();play();});
pop.querySelector('.hcd-next').addEventListener('click',function(){inv++;render();play();});
pop.querySelector('.hcd-x').addEventListener('click',function(){pop.hidden=true;if(cur)cur.classList.remove('is-on');});
function tp(d){shift=((shift+d+18)%12)-6;if(shift===-6)shift=6;root.querySelector('.hcd-tp output').textContent=shift>0?'+'+shift:String(shift);spans.forEach(function(s){s.textContent=H.transposeName(s.getAttribute('data-c'),shift);});if(cur&&!pop.hidden){render();place();}}
root.querySelector('.hcd-up').addEventListener('click',function(){tp(1);});
root.querySelector('.hcd-down').addEventListener('click',function(){tp(-1);});
window.addEventListener('resize',function(){if(cur&&!pop.hidden)place();});
show(spans[1]);})();'''.replace('LIB',LIB)

DEMO=f'''<section class="hcd" id="hcd-demo" aria-label="Hover Chords live demo">
<div class="hcd-top"><div class="hcd-title">Try it right here<small>Hover or tap a chord. Click to hear it.</small></div>
<div class="hcd-tp"><span>Transpose</span><button class="hcd-down" type="button" aria-label="Transpose down a semitone">&minus;</button><output>0</output><button class="hcd-up" type="button" aria-label="Transpose up a semitone">+</button></div></div>
<pre class="hcd-sheet">{sheet}</pre>
<p class="hcd-hint">Amazing Grace (traditional, public domain). This demo works just like the extension.</p>
<div class="hcd-pop" hidden role="dialog" aria-label="Piano chord"><button class="hcd-x" type="button" aria-label="Close">&times;</button><div class="hcd-head"><span class="hcd-name"></span><span class="hcd-notes"></span></div><div class="hcd-kb"></div>
<div class="hcd-row"><button class="hcd-play" type="button">&#9654; Play</button><button class="hcd-prev" type="button" aria-label="Previous inversion">&lsaquo;</button><span class="hcd-inv"></span><button class="hcd-next" type="button" aria-label="Next inversion">&rsaquo;</button></div></div>
</section>'''

def cta(note): return f'<div class="hcd-cta"><a class="hcd-btn" href="{STORE}" target="_blank" rel="noopener">Add to Chrome, it&#39;s free</a><span class="hcd-note">{note}</span></div>'
def fig(name,w,h,alt,cap): return f'<figure class="kg-card kg-image-card kg-card-hascaption"><img src="{IMG}{name}" class="kg-image" alt="{alt}" loading="lazy" width="{w}" height="{h}" srcset="https://pianoers.com/content/images/size/w600/2026/10/{name} 600w, https://pianoers.com/content/images/size/w1000/2026/10/{name} 1000w, {IMG}{name} {w}w" sizes="(min-width: 720px) 720px, 100vw"><figcaption><span>{cap}</span></figcaption></figure>'

FAQ=[('Is Hover Chords free?','Yes. Hover Chords is completely free, with no ads, no account and no paid upgrade.'),
('Which websites does it work on?','It works on chord sheets on any website: song and lyrics sites with chords, worship and church song sheets, guitar chord and tab sites, and ChordPro text such as [C]Let it [G]be. It leaves pages without chord sheets alone.'),
('Can it transpose a song?','Yes. Click the Hover Chords icon in the Chrome toolbar and use the + and − buttons. Every chord on the page moves up or down one semitone at a time, and the setting is remembered for that website.'),
('Does it work with guitar chord sheets?','Yes. Chord names are the same for guitar and piano, so Hover Chords reads any guitar chord sheet and shows each chord as a piano chord.'),
('Which chords does it understand?','Major and minor chords, 7th chords, maj7, m7, diminished, half-diminished (m7b5), augmented, sus2, sus4, 6, m6, 6/9, 9th, 11th and 13th chords, add9, altered chords such as b9 and #11, power chords and slash chords like C/E.'),
('What are chord inversions?','An inversion is the same chord with a different note at the bottom. C major in root position is C-E-G; the 1st inversion is E-G-C and the 2nd inversion is G-C-E. Hover Chords lets you step through them so you can pick the shape that moves most smoothly to the next chord.'),
('Does Hover Chords collect my data?','No. It collects nothing. It reads the page in your browser to find chord names and never sends anything anywhere. Your settings are saved on your own computer.'),
('Does it work in Edge, Brave or other browsers?','It is built for Google Chrome. Browsers based on Chromium, such as Microsoft Edge and Brave, can usually install Chrome Web Store extensions too.')]
faq_html=''.join(f'<h3>{q}</h3><p>{a}</p>' for q,a in FAQ)

BODY=f'''<p><strong>Hover Chords is a free Chrome extension that shows any chord on a piano keyboard.</strong> Hover a chord name on a chord sheet and a piano chord chart appears right where you're reading: the keys to press, the note names, and a button to hear it. It can also transpose every chord on the page in one click.</p>
<p>Chord sheets are written for guitar players. At the piano, a chord like F#m7b5, Cadd9 or D/F# usually means stopping to look it up. I'm a piano teacher, and that's the moment my students lose the flow of a song. Hover Chords puts the answer under your cursor.</p>
{cta('Free · No account · No tracking')}
{DEMO}
<h2 id="how-it-works">How it works</h2>
<ol class="hcd-steps"><li><b>Open a chord sheet</b>Any song page with chords: lyrics sites, worship sets, guitar chord sites or your own sheets.</li><li><b>Hover a chord</b>A piano keyboard pops up with the chord's keys lit and every note named.</li><li><b>Click to hear it</b>The chord plays, and the diagram stays pinned while you play along.</li></ol>
{fig('hover-chords-piano-chord-finder.png',1280,800,'Hover Chords Chrome extension showing a G7 piano chord chart over an Amazing Grace chord sheet','Hover a chord on a chord sheet to see it on a piano keyboard.')}
<h2 id="features">Features</h2>
<ul>
<li><strong>Instant piano chord diagrams:</strong> hover any chord to see the keys and the note names.</li>
<li><strong>Hear every chord:</strong> click to play it with a piano-like sound made in your browser.</li>
<li><strong>Chord inversions:</strong> step through root position, 1st, 2nd and 3rd inversions with the arrow buttons or your arrow keys.</li>
<li><strong>Transpose chords:</strong> move every chord on the page up or down to play the song in any key.</li>
<li><strong>Slash chords:</strong> the bass note of chords like C/E and G/B is shown in its own colour.</li>
<li><strong>Correct note names:</strong> notes are spelled for the chord, so C7 shows B&#9837;, not A#.</li>
<li><strong>Light and dark mode,</strong> and full keyboard support.</li>
<li><strong>Your control:</strong> turn it off for any website, or everywhere, from the toolbar.</li>
</ul>
{fig('hover-chords-chord-inversions.png',1280,800,'Hover Chords showing a C major chord in root position, 1st inversion and 2nd inversion on a piano keyboard','Step through every inversion of a chord.')}
<h2 id="transpose">Transpose a whole song in one click</h2>
<p>Singing a song that's too high? Playing with a band in a different key? Click the Hover Chords icon in the toolbar and press + or &minus;. Every chord on the page changes key at once, and Hover Chords remembers your choice for that website. Press "Reset to the original key" to go back.</p>
{fig('hover-chords-transpose-chords.png',1280,800,'Hover Chords transposing a chord sheet from the key of G to the key of A, with the toolbar popup showing +2','Transpose every chord on the page from the toolbar.')}
<h2 id="chords">Chords Hover Chords understands</h2>
<table><thead><tr><th>Type</th><th>Examples</th></tr></thead><tbody>
<tr><td>Triads</td><td>C, Am, Bdim, Caug, Gsus2, Dsus4, C5</td></tr>
<tr><td>Sixth and seventh chords</td><td>C6, Am6, G7, Cmaj7, Dm7, F#m7b5 (B&oslash;), Bdim7, Cm(maj7)</td></tr>
<tr><td>Extended chords</td><td>C9, Cmaj9, C11, C13, C6/9, Cadd9</td></tr>
<tr><td>Altered chords</td><td>C7b9, E7#9, G7b5, C7#11, A7b13</td></tr>
<tr><td>Slash chords</td><td>C/E, G/B, D/F#, Am/C</td></tr>
<tr><td>Chord sheet formats</td><td>Chords above lyrics, bar lines like | Am7 | Fmaj7 |, ChordPro [C]brackets, repeat marks like x2</td></tr>
</tbody></table>
<h2 id="privacy">Private by design</h2>
<p>Hover Chords collects no data. There's no account, no tracking and no analytics. It reads the page in your browser to find chord names, and nothing ever leaves your computer. It only asks Chrome for two permissions: <strong>storage</strong> (to remember your settings) and <strong>activeTab</strong> (so the toolbar popup knows which website you're on). Read the full <a href="/hover-chords-privacy/">Hover Chords privacy policy</a>.</p>
{cta('Works on Chrome, and usually Edge and Brave')}
<h2 id="learn-chords">Learn the chords, not just the shapes</h2>
<p>Hover Chords shows you the notes, but understanding why chords work is what makes you fluent. If you're starting out, my <a href="/piano-basics-a-beginners-guide-to-the-keyboard/">piano basics guide</a> explains the keyboard and your first chords, and <a href="/teach-yourself-piano/">how to teach yourself piano</a> has a 30-day plan. To compare courses that teach chords properly, see <a href="/best-piano-lessons-online/">the best online piano lessons</a>.</p>
<h2 id="faq">Hover Chords FAQ</h2>
{faq_html}'''

OUT_HTML=f'<style>{CSS}</style>\n{BODY}\n<script>{JS}</script>\n'
assert '<!--' not in OUT_HTML
open(os.path.join(HERE,'hover-chords.html'),'w').write(OUT_HTML)

st=lambda t:re.sub(r'<[^>]+>','',t)
app={"@context":"https://schema.org","@type":"SoftwareApplication","name":"Hover Chords: Piano Chord Finder & Transposer","applicationCategory":"BrowserApplication","applicationSubCategory":"Music education","operatingSystem":"Google Chrome","url":"https://pianoers.com/hover-chords/","downloadUrl":STORE,"image":IMG+"hover-chords-piano-chord-finder.png","description":"Free Chrome extension that shows any chord on a chord sheet as a piano chord diagram, plays it, shows its inversions and transposes the whole song.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"},"author":{"@type":"Organization","name":"Pianoers.com","url":"https://pianoers.com/"},"softwareVersion":"1.0.0"}
faqld={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":st(a)}} for q,a in FAQ]}
open(os.path.join(HERE,'hover-chords-code-injection.html'),'w').write('<script type="application/ld+json">\n'+json.dumps(app,ensure_ascii=False,indent=1)+'\n</script>\n<script type="application/ld+json">\n'+json.dumps(faqld,ensure_ascii=False,indent=1)+'\n</script>\n')

PRIV='''<p><strong>Last updated: October 31, 2026</strong></p>
<p>This privacy policy explains how the <a href="/hover-chords/">Hover Chords</a> Chrome extension ("Hover Chords", "the extension") handles information. Hover Chords is made by Pianoers.com.</p>
<h2 id="summary">The short version</h2>
<p><strong>Hover Chords does not collect, store, send, share or sell any personal data or browsing data.</strong> Everything it does happens inside your own browser.</p>
<h2 id="what-it-does">What the extension does on the pages you visit</h2>
<p>To find chord names, Hover Chords reads the text of the web page you're viewing, inside your browser. When it finds a chord sheet, it adds the chord diagrams to that page on your screen. Page content is never copied, saved or sent anywhere, and Hover Chords does not record which pages you visit.</p>
<h2 id="stored">Information saved on your computer</h2>
<p>Hover Chords saves only your settings, using Chrome's own extension storage on your device:</p>
<ul><li>whether Hover Chords is switched on overall,</li><li>the websites where you switched it off,</li><li>how far you transposed the chords on a website,</li><li>whether chord sound is switched on.</li></ul>
<p>These settings never leave your computer. You can delete them at any time by removing the extension from Chrome.</p>
<h2 id="permissions">Permissions and why they're needed</h2>
<ul><li><strong>storage:</strong> to save the settings listed above.</li><li><strong>activeTab:</strong> so the toolbar popup can show which website you're on and switch Hover Chords on or off for it.</li><li><strong>Access to web pages:</strong> chord sheets can be on any website, so the extension checks page text for chord names. It only changes a page when it finds chords.</li></ul>
<h2 id="third-parties">Third parties</h2>
<p>Hover Chords uses no analytics, advertising, tracking or outside servers, and it loads no code from the internet. The sound of each chord is generated in your browser. The only outside link is a "Pianoers.com" link, which opens our website only if you click it; our website has its own <a href="/privacy-policy/">privacy policy</a>.</p>
<h2 id="children">Children</h2>
<p>Hover Chords collects no information from anyone, including children.</p>
<h2 id="changes">Changes to this policy</h2>
<p>If this policy changes, we'll update this page and the date at the top. Any change that would collect data would be announced in the extension's Chrome Web Store listing before it takes effect.</p>
<h2 id="contact">Contact</h2>
<p>Questions about this policy? <a href="/contact/">Contact us</a>.</p>
'''
open(os.path.join(HERE,'hover-chords-privacy.html'),'w').write(PRIV)
txt=re.sub(r'<(script|style)[^>]*>.*?</\1>','',OUT_HTML,flags=re.S); txt=re.sub(r'<[^>]+>',' ',txt)
print('landing words',len(txt.split()),'privacy words',len(re.sub(r'<[^>]+>',' ',PRIV).split()))
