import html as H, sys
sys.path.insert(0,'images')
from days import DAYS
WH=[(60,'C','1'),(62,'D','2'),(64,'E','3'),(65,'F','4'),(67,'G','5'),(69,'A',''),(71,'B',''),(72,'C','')]
BL=[(61,1),(63,2),(66,4),(68,5),(70,6)]
NM={61:'C sharp',63:'E flat',66:'F sharp',68:'G sharp',70:'B flat'}
def song():
    w=''.join(f'<button class="ty-k" type="button" data-n="{n}" aria-label="{l}{" (finger "+f+")" if f else ""}"><span class="ty-fn" aria-hidden="true">{f}</span><span class="ty-kl">{l}</span></button>' for n,l,f in WH)
    b=''.join(f'<button class="ty-b" type="button" data-n="{n}" style="left:calc({p} * 12.5% - 3.75%)" aria-label="{NM[n]}"></button>' for n,p in BL)
    return f'''<section class="ty-tool ty-song" data-ty-song tabindex="-1" aria-labelledby="ty-song-h">
<p class="pz-eyebrow">Try it now</p>
<p class="ty-title" id="ty-song-h">Play your first song in 60 seconds</p>
<p class="ty-sub">Pick a song, then tap the glowing key each time. The small numbers are the fingers to use, with your right thumb on C. On a computer, click a key once, then play with A S D F G H J K.</p>
<div class="ty-row" role="group" aria-label="Choose a song"><button class="ty-btn" type="button" data-song="ode" aria-pressed="true">Ode to Joy</button><button class="ty-btn" type="button" data-song="mary" aria-pressed="false">Mary Had a Little Lamb</button><button class="ty-btn" type="button" data-song="twinkle" aria-pressed="false">Twinkle, Twinkle</button></div>
<div class="ty-chips" aria-hidden="true"></div>
<div class="ty-kb" role="group" aria-label="Piano keys from middle C up to the next C">{w}{b}</div>
<div class="ty-row"><button class="ty-btn is-primary" type="button" data-hear>Hear it</button><button class="ty-btn" type="button" data-restart>Start over</button></div>
<p class="ty-msg" aria-live="polite">Your first note is glowing. Use finger 3.</p>
</section>'''
def metro():
    return '''<section class="ty-tool ty-metro" data-ty-metro aria-labelledby="ty-metro-h">
<p class="pz-eyebrow">Free online metronome</p>
<p class="ty-title" id="ty-metro-h">Practise with a click</p>
<p class="ty-sub">Set a speed you can play perfectly, press Start, and count out loud. Use the +4 button to climb the tempo ladder.</p>
<div class="ty-metro-main"><div><span class="ty-bpm" aria-live="off">80</span> <span class="ty-unit">bpm</span><div class="ty-tname">Andante</div></div><div class="ty-dots" aria-hidden="true"></div></div>
<label class="ty-lab" for="ty-bpm-range">Tempo</label>
<input class="ty-range" id="ty-bpm-range" type="range" min="40" max="208" step="1" value="80">
<div class="ty-row"><button class="ty-btn is-primary" type="button" data-start aria-pressed="false">Start</button><button class="ty-btn" type="button" data-step="-1" aria-label="Slower by 1 bpm">−1</button><button class="ty-btn" type="button" data-step="1" aria-label="Faster by 1 bpm">+1</button><button class="ty-btn" type="button" data-step="4" aria-label="Tempo ladder: faster by 4 bpm">+4 ladder</button><button class="ty-btn" type="button" data-tap>Tap tempo</button>
<label class="ty-inline">Beats per bar <select data-beats><option value="2">2</option><option value="3">3</option><option value="4" selected>4</option></select></label></div>
</section>'''
def calc():
    return '''<section class="ty-tool ty-calc" data-ty-calc aria-labelledby="ty-calc-h">
<p class="pz-eyebrow">Your personal estimate</p>
<p class="ty-title" id="ty-calc-h">How long will it take you to learn piano?</p>
<p class="ty-sub">Move the sliders to match the time you can really give. The dates update as you go.</p>
<div class="ty-calc-grid"><div><label class="ty-lab" for="ty-min">Minutes a day: <output data-min-out>20 min</output></label><input class="ty-range" id="ty-min" type="range" min="5" max="60" step="5" value="20"></div>
<div><label class="ty-lab" for="ty-days">Days a week: <output data-days-out>6 days</output></label><input class="ty-range" id="ty-days" type="range" min="1" max="7" step="1" value="6"></div></div>
<div class="ty-ms-list" aria-live="polite"></div>
<div class="ty-row"><button class="ty-btn is-primary" type="button" data-share>Share my plan</button><span class="ty-note" data-share-msg aria-live="polite"></span></div>
<p class="ty-fine">Rough estimates, not promises. They scale the first-year roadmap in this guide (built on 20 minutes, five to six days a week) to your schedule. Practice beyond 30 minutes a day counts at half value, because focus fades. Everyone learns at a different pace.</p>
</section>'''
def challenge():
    cells=''.join(f'<button class="ty-day" type="button" data-day="{i+1}" data-title="{H.escape(t)}" data-detail="{H.escape(d)}" aria-pressed="false"><b>Day {i+1}</b>{H.escape(t)}</button>' for i,(t,d) in enumerate(DAYS))
    return f'''<section class="ty-tool ty-challenge" data-ty-challenge aria-labelledby="ty-ch-h">
<p class="pz-eyebrow">Track your progress</p>
<p class="ty-title" id="ty-ch-h">The 30-day teach-yourself piano challenge</p>
<p class="ty-sub">Tick off each day after you practise. Your progress is saved in this browser, so you can come back tomorrow.</p>
<div class="ty-prog" aria-hidden="true"><span></span></div>
<p class="ty-count" aria-live="polite">0 of 30 days done</p>
<p class="ty-next"></p>
<div class="ty-days">{cells}</div>
<div class="ty-row"><button class="ty-btn is-primary" type="button" data-share>Share my progress</button><button class="ty-btn" type="button" data-reset>Reset</button><span class="ty-note" data-share-msg aria-live="polite"></span></div>
</section>'''
CSS='''<style>
.ty-tool{background:var(--surface,#f3f6f7);border:1px solid var(--line,#d9e2e5);border-radius:var(--radius,14px);padding:22px;margin:32px 0;font-family:var(--f-display,Arial,sans-serif);color:var(--ink,#15191c)}
.ty-tool:focus{outline:none}
.ty-tool .pz-eyebrow{margin:0}
.ty-title{font-size:1.3rem;line-height:1.2;font-weight:800;margin:4px 0 6px}
.ty-sub{font-family:var(--f-body,Georgia,serif);color:var(--muted,#56666e);margin:0 0 14px;font-size:1rem;line-height:1.5}
.ty-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0 0}
.ty-btn{font:inherit;font-size:.95rem;font-weight:700;border:1px solid var(--line,#d9e2e5);background:var(--paper,#fff);color:var(--ink,#15191c);border-radius:10px;padding:9px 14px;min-height:44px;cursor:pointer;transition:background .15s,border-color .15s}
.ty-btn:hover{border-color:var(--teal,#2e6475)}
.ty-btn:focus-visible,.ty-k:focus-visible,.ty-b:focus-visible,.ty-day:focus-visible{outline:3px solid var(--teal,#2e6475);outline-offset:2px}
.ty-btn[aria-pressed="true"],.ty-btn.is-primary{background:var(--amber,#f6b31e);color:var(--amber-ink,#1b1400);border-color:transparent}
.ty-btn:disabled{opacity:.55;cursor:default}
.ty-chips{display:flex;flex-wrap:wrap;gap:6px;margin:16px 0 14px;min-height:34px}
.ty-chip{min-width:32px;padding:5px 8px;border-radius:8px;background:var(--paper,#fff);border:1px solid var(--line,#d9e2e5);font-weight:800;text-align:center;font-variant-numeric:tabular-nums}
.ty-chip.is-done{background:var(--teal,#2e6475);border-color:var(--teal,#2e6475);color:var(--paper,#fff)}
.ty-chip.is-now{border-color:var(--amber,#f6b31e);box-shadow:0 0 0 2px var(--amber,#f6b31e)}
.ty-sep{align-self:center;color:var(--muted,#56666e);font-weight:800}
.ty-kb{position:relative;display:flex;height:180px;user-select:none;-webkit-user-select:none;touch-action:manipulation}
.ty-k{flex:1;position:relative;border:1px solid var(--key-edge,#c9d3d7);background:var(--key,#fff);border-radius:0 0 10px 10px;margin:0 -1px 0 0;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;padding:0 0 12px;cursor:pointer;font:inherit;color:#15191c;transition:background .1s}
.ty-kl{font-weight:800;font-size:1rem}
.ty-fn{position:absolute;bottom:42px;font-size:.78rem;font-weight:800;color:#b86a0a}
.ty-b{position:absolute;top:0;width:7.5%;height:60%;z-index:2;border:0;border-radius:0 0 7px 7px;background:var(--ebony,#1c2226);cursor:pointer;padding:0}
.ty-k.is-target{background:var(--amber,#f6b31e);animation:ty-glow 1.1s ease-in-out infinite}
.ty-k.is-down{background:var(--key-press,#fff7e0)}
.ty-b.is-down{background:#3b474d}
@keyframes ty-glow{50%{box-shadow:inset 0 -14px 24px rgb(255 255 255/55%)}}
@media (prefers-reduced-motion:reduce){.ty-k.is-target{animation:none}}
.ty-msg{margin:12px 0 0;font-weight:700;min-height:1.5em}
.ty-song.is-win .ty-msg{color:var(--good,#1f7a4d)}
.ty-metro-main{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:6px 0 10px}
.ty-bpm{font-size:3.4rem;font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
.ty-unit{font-weight:800;color:var(--muted,#56666e)}
.ty-tname{font-family:var(--f-body,Georgia,serif);font-style:italic;color:var(--muted,#56666e);margin-top:4px}
.ty-dots{display:flex;gap:12px}
.ty-dot{width:22px;height:22px;border-radius:50%;background:var(--line,#d9e2e5);transition:transform .08s}
.ty-dot.is-on{background:var(--teal,#2e6475);transform:scale(1.2)}
.ty-dot.is-accent.is-on{background:var(--amber,#f6b31e)}
.ty-lab{display:block;font-weight:700;font-size:.95rem;margin:6px 0 4px}
.ty-lab output{color:var(--teal,#2e6475);font-weight:800}
.ty-range{width:100%;accent-color:var(--teal,#2e6475);min-height:32px}
.ty-inline{display:flex;align-items:center;gap:8px;font-weight:700;font-size:.95rem}
.ty-inline select{font:inherit;min-height:44px;border-radius:10px;border:1px solid var(--line,#d9e2e5);background:var(--paper,#fff);color:var(--ink,#15191c);padding:0 10px}
.ty-calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px}
.ty-ms-list{margin-top:14px}
.ty-ms{display:grid;grid-template-columns:28px 1fr auto;gap:2px 12px;align-items:baseline;padding:11px 0;border-top:1px solid var(--line,#d9e2e5)}
.ty-ms i{font-style:normal;font-weight:800;color:var(--muted,#56666e)}
.ty-ms span{font-family:var(--f-body,Georgia,serif);line-height:1.4}
.ty-ms b{text-align:right;color:var(--teal,#2e6475);white-space:nowrap}
.ty-ms small{grid-column:3;text-align:right;color:var(--muted,#56666e);font-size:.82rem}
.ty-note{font-weight:700;color:var(--good,#1f7a4d);font-size:.92rem}
.ty-fine{font-size:.85rem;color:var(--muted,#56666e);margin:14px 0 0;line-height:1.5}
.ty-prog{height:12px;border-radius:99px;background:var(--line,#d9e2e5);overflow:hidden;margin-top:4px}
.ty-prog span{display:block;height:100%;width:0;background:var(--amber,#f6b31e);transition:width .3s}
.ty-count{font-weight:800;margin:8px 0 2px}
.ty-next{font-family:var(--f-body,Georgia,serif);margin:0 0 12px;line-height:1.5}
.ty-days{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.ty-day{font:inherit;text-align:left;font-size:.84rem;line-height:1.3;font-weight:600;padding:10px;border-radius:10px;border:1px solid var(--line,#d9e2e5);background:var(--paper,#fff);color:var(--ink,#15191c);min-height:88px;cursor:pointer}
.ty-day b{display:block;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--teal,#2e6475);margin-bottom:4px}
.ty-day[aria-pressed="true"]{background:var(--teal-soft,#e2eef1);border-color:var(--teal,#2e6475)}
.ty-day[aria-pressed="true"] b::after{content:" ✓";color:var(--good,#1f7a4d)}
@media (max-width:620px){.ty-tool{padding:18px 14px}.ty-days{grid-template-columns:repeat(2,1fr)}.ty-calc-grid{grid-template-columns:1fr}.ty-kb{height:160px}.ty-bpm{font-size:2.8rem}}
</style>'''
JS=r'''<script>
(function(){
var AC=window.AudioContext||window.webkitAudioContext,ctx=null,master=null;
function audio(){if(!AC)return null;if(!ctx){ctx=new AC();var comp=ctx.createDynamicsCompressor();master=ctx.createGain();master.gain.value=.6;master.connect(comp);comp.connect(ctx.destination);}if(ctx.state==='suspended')ctx.resume();return ctx;}
function tone(m,t,len){var c=audio();if(!c)return;t=t||c.currentTime;var f=440*Math.pow(2,(m-69)/12),d=len||1.5,g=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.setValueAtTime(Math.min(6000,f*8),t);lp.frequency.exponentialRampToValueAtTime(Math.max(500,f*2.5),t+.7);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.45,t+.008);g.gain.exponentialRampToValueAtTime(.16,t+.3);g.gain.exponentialRampToValueAtTime(.0001,t+d);[[1,'triangle',1],[2,'sine',.22],[3,'sine',.07]].forEach(function(p){var o=c.createOscillator(),og=c.createGain();o.type=p[1];o.frequency.value=f*p[0];og.gain.value=p[2];o.connect(og);og.connect(lp);o.start(t);o.stop(t+d+.05);});lp.connect(g);g.connect(master);}
function each(sel,fn){Array.prototype.forEach.call(document.querySelectorAll(sel),fn);}
function shareText(text,anchor,msg){var url=location.href.split('#')[0]+anchor;function show(s){if(msg){msg.textContent=s;setTimeout(function(){msg.textContent='';},4000);}}
if(navigator.share){navigator.share({title:document.title,text:text,url:url}).catch(function(){});return;}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text+' '+url).then(function(){show('Copied. Paste it anywhere to share.');},function(){show(text+' '+url);});return;}
show(text+' '+url);}
var NAMES={60:'C',62:'D',64:'E',65:'F',67:'G',69:'A',71:'B',72:'C'};
var SONGS={ode:{name:'Ode to Joy',bars:[4,8,12],n:[[64,1],[64,1],[65,1],[67,1],[67,1],[65,1],[64,1],[62,1],[60,1],[60,1],[62,1],[64,1],[64,1.5],[62,.5],[62,2]]},
mary:{name:'Mary Had a Little Lamb',bars:[4,7,10],n:[[64,1],[62,1],[60,1],[62,1],[64,1],[64,1],[64,2],[62,1],[62,1],[62,2],[64,1],[67,1],[67,2]]},
twinkle:{name:'Twinkle, Twinkle, Little Star',bars:[4,7,11],n:[[60,1],[60,1],[67,1],[67,1],[69,1],[69,1],[67,2],[65,1],[65,1],[64,1],[64,1],[62,1],[62,1],[60,2]]}};
var FING={60:'1',62:'2',64:'3',65:'4',67:'5',69:'5'};
var MAP={a:60,w:61,s:62,e:63,d:64,f:65,t:66,g:67,y:68,h:69,u:70,j:71,k:72};
each('[data-ty-song]',function(root){
var keys=Array.prototype.slice.call(root.querySelectorAll('[data-n]')),chips=root.querySelector('.ty-chips'),msg=root.querySelector('.ty-msg'),hear=root.querySelector('[data-hear]'),cur='ode',i=0,busy=false;
function render(){var s=SONGS[cur];chips.innerHTML='';s.n.forEach(function(p,k){if(s.bars.indexOf(k)>-1){var sep=document.createElement('span');sep.className='ty-sep';sep.textContent='|';chips.appendChild(sep);}var c=document.createElement('span');c.className='ty-chip'+(k<i?' is-done':'')+(k===i?' is-now':'');c.textContent=NAMES[p[0]];chips.appendChild(c);});keys.forEach(function(k){k.classList.toggle('is-target',!busy&&i<s.n.length&&+k.getAttribute('data-n')===s.n[i][0]);});}
function flash(n){var k=root.querySelector('[data-n="'+n+'"]');if(!k)return;k.classList.add('is-down');setTimeout(function(){k.classList.remove('is-down');},200);}
function press(n){if(busy)return;tone(n);flash(n);var s=SONGS[cur];if(i>=s.n.length)return;if(n===s.n[i][0]){i++;if(i===s.n.length){root.classList.add('is-win');msg.textContent='You just played '+s.name+'! Press Hear it to compare, then try it again without looking at the glowing keys.';}else{var nx=s.n[i][0];msg.textContent='Next: '+NAMES[nx]+', finger '+FING[nx]+'.';}}else{msg.textContent='Not quite. Look for the glowing key.';}render();}
keys.forEach(function(k){k.addEventListener('pointerdown',function(e){if(e.button>0)return;e.preventDefault();k._pd=true;root.focus({preventScroll:true});press(+k.getAttribute('data-n'));});k.addEventListener('click',function(){if(k._pd){k._pd=false;return;}press(+k.getAttribute('data-n'));});});
root.addEventListener('keydown',function(e){if(e.metaKey||e.ctrlKey||e.altKey||e.repeat)return;var n=MAP[(e.key||'').toLowerCase()];if(n){e.preventDefault();press(n);}});
Array.prototype.forEach.call(root.querySelectorAll('[data-song]'),function(b){b.addEventListener('click',function(){if(busy)return;cur=b.getAttribute('data-song');i=0;root.classList.remove('is-win');Array.prototype.forEach.call(root.querySelectorAll('[data-song]'),function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});var f=SONGS[cur].n[0][0];msg.textContent='Your first note is glowing. Use finger '+FING[f]+'.';render();});});
root.querySelector('[data-restart]').addEventListener('click',function(){if(busy)return;i=0;root.classList.remove('is-win');var f=SONGS[cur].n[0][0];msg.textContent='Your first note is glowing. Use finger '+FING[f]+'.';render();});
hear.addEventListener('click',function(){var c=audio();if(!c||busy)return;busy=true;hear.disabled=true;render();var s=SONGS[cur],beat=.6,t=c.currentTime+.1,ms=0;s.n.forEach(function(p){tone(p[0],t,Math.max(.8,p[1]*beat+.4));(function(n,delay){setTimeout(function(){flash(n);},delay);})(p[0],ms+100);t+=p[1]*beat;ms+=p[1]*beat*1000;});setTimeout(function(){busy=false;hear.disabled=false;render();},ms+300);});
render();});
each('[data-ty-metro]',function(root){
var bpm=80,beats=4,on=false,next=0,beat=0,timer=null,raf=null,queue=[],taps=[];
var out=root.querySelector('.ty-bpm'),nm=root.querySelector('.ty-tname'),range=root.querySelector('.ty-range'),btn=root.querySelector('[data-start]'),dots=root.querySelector('.ty-dots'),sel=root.querySelector('[data-beats]');
function tname(b){return b<60?'Largo (very slow)':b<76?'Adagio (slow)':b<108?'Andante (walking pace)':b<120?'Moderato (moderate)':b<168?'Allegro (fast)':'Presto (very fast)';}
function setBpm(v){bpm=Math.max(40,Math.min(208,Math.round(v)));out.textContent=bpm;range.value=bpm;nm.textContent=tname(bpm);}
function drawDots(){dots.innerHTML='';for(var k=0;k<beats;k++){var d=document.createElement('span');d.className='ty-dot'+(k===0?' is-accent':'');dots.appendChild(d);}}
function click(t,acc){var o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=acc?1760:1175;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(acc?1:.7,t+.002);g.gain.exponentialRampToValueAtTime(.0001,t+.055);o.connect(g);g.connect(master);o.start(t);o.stop(t+.07);}
function sched(){while(next<ctx.currentTime+.12){click(next,beat===0);queue.push([beat,next]);next+=60/bpm;beat=(beat+1)%beats;}}
function draw(){var t=ctx.currentTime;while(queue.length&&queue[0][1]<=t){var b=queue.shift()[0];Array.prototype.forEach.call(dots.children,function(d,k){d.classList.toggle('is-on',k===b);});}raf=requestAnimationFrame(draw);}
function start(){if(!audio())return;on=true;beat=0;queue=[];next=ctx.currentTime+.08;timer=setInterval(sched,25);sched();draw();btn.textContent='Stop';btn.setAttribute('aria-pressed','true');}
function stop(){on=false;clearInterval(timer);cancelAnimationFrame(raf);Array.prototype.forEach.call(dots.children,function(d){d.classList.remove('is-on');});btn.textContent='Start';btn.setAttribute('aria-pressed','false');}
btn.addEventListener('click',function(){on?stop():start();});
range.addEventListener('input',function(){setBpm(+range.value);});
Array.prototype.forEach.call(root.querySelectorAll('[data-step]'),function(b){b.addEventListener('click',function(){setBpm(bpm+(+b.getAttribute('data-step')));});});
sel.addEventListener('change',function(){beats=+sel.value;beat=0;drawDots();});
root.querySelector('[data-tap]').addEventListener('click',function(){var now=performance.now();if(taps.length&&now-taps[taps.length-1]>2000)taps=[];taps.push(now);if(taps.length>5)taps.shift();if(taps.length>1){setBpm(60000/((taps[taps.length-1]-taps[0])/(taps.length-1)));}});
document.addEventListener('visibilitychange',function(){if(document.hidden&&on)stop();});
drawDots();setBpm(80);});
each('[data-ty-calc]',function(root){
var m=root.querySelector('#ty-min'),d=root.querySelector('#ty-days'),mo=root.querySelector('[data-min-out]'),dout=root.querySelector('[data-days-out]'),list=root.querySelector('.ty-ms-list'),msg=root.querySelector('[data-share-msg]'),both='';
var MS=[['Play your first melody with one hand',2],['Read notes in C position and play C, F and G chords',8],['Play easy songs with both hands',24],['Play easy classics, such as Minuet in G',48],['Play early-intermediate pieces, and pop songs from a chord sheet',95]];
function eff(x){return x<=30?x:30+(x-30)/2;}
function when(w){if(w<9)return 'about '+w+(w===1?' week':' weeks');if(w<104)return 'about '+Math.round(w/4.345)+' months';return 'about '+(Math.round(w/52*10)/10)+' years';}
function calc(){var mins=+m.value,days=+d.value,per=eff(mins)*days/60;mo.textContent=mins+' min';dout.textContent=days+(days===1?' day':' days');list.innerHTML='';MS.forEach(function(p,k){var w=Math.max(1,Math.ceil(p[1]/per)),dt=new Date(Date.now()+w*7*864e5),ds=dt.toLocaleDateString(undefined,{month:'short',year:'numeric'});if(k===2)both=ds;var row=document.createElement('div');row.className='ty-ms';var a=document.createElement('i');a.textContent=k+1;var s=document.createElement('span');s.textContent=p[0];var b=document.createElement('b');b.textContent=when(w);var sm=document.createElement('small');sm.textContent='by '+ds;row.appendChild(a);row.appendChild(s);row.appendChild(b);row.appendChild(sm);list.appendChild(row);});}
m.addEventListener('input',calc);d.addEventListener('input',calc);
root.querySelector('[data-share]').addEventListener('click',function(){shareText('At '+m.value+' minutes a day, '+d.value+' days a week, I could be playing easy piano songs with both hands by '+both+'. Work out your own piano plan:','#how-long-does-it-take-to-learn-piano-by-yourself',msg);});
calc();});
each('[data-ty-challenge]',function(root){
var KEY='pz-30-day-piano-challenge',btns=Array.prototype.slice.call(root.querySelectorAll('[data-day]')),bar=root.querySelector('.ty-prog span'),count=root.querySelector('.ty-count'),nextEl=root.querySelector('.ty-next'),msg=root.querySelector('[data-share-msg]'),done=[];
try{var v=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(v))done=v.filter(function(x){return x>=1&&x<=30;});}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(done));}catch(e){}}
function render(){btns.forEach(function(b){b.setAttribute('aria-pressed',done.indexOf(+b.getAttribute('data-day'))>-1?'true':'false');});var c=done.length;count.textContent=c+' of 30 days done';bar.style.width=(c/30*100)+'%';var nx=0;for(var k=1;k<=30;k++){if(done.indexOf(k)<0){nx=k;break;}}nextEl.textContent='';if(nx){var b=btns[nx-1],s=document.createElement('strong');s.textContent='Next up, day '+nx+': '+b.getAttribute('data-title')+'. ';nextEl.appendChild(s);nextEl.appendChild(document.createTextNode(b.getAttribute('data-detail')));}else{nextEl.textContent='All 30 days done. You have taught yourself piano for a whole month. Share it, then choose your next course below.';}}
btns.forEach(function(b){b.addEventListener('click',function(){var n=+b.getAttribute('data-day'),k=done.indexOf(n);if(k>-1)done.splice(k,1);else done.push(n);save();render();});});
root.querySelector('[data-reset]').addEventListener('click',function(){if(window.confirm('Clear your 30-day progress?')){done=[];save();render();}});
root.querySelector('[data-share]').addEventListener('click',function(){var c=done.length;shareText(c?'I have done '+c+' of 30 days of the 30-day teach-yourself piano challenge.':'I am starting the 30-day teach-yourself piano challenge.','#the-30-day-teach-yourself-piano-plan',msg);});
render();});
})();
</script>'''
