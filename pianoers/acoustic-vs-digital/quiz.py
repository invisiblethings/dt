Q=[('When will you usually practise?',[('Daytime, in a house','a1'),('Evenings or at night, or I share walls','d2h1')]),
('What is your budget?',[('Under $1,000','d3'),('$1,000 to $4,000','d1a1'),('More than $4,000','a2h2')]),
('Where will the piano live?',[('A small space, or I may move soon','d2'),('A roomy space with steady humidity','a2h1')]),
('What is your main goal?',[('Learning for fun, and playing songs','d1'),('Serious classical study or exams','a2h1'),('Recording, apps and other sounds','d2')]),
('Who will play it most?',[('An adult beginner','d1'),('A child starting lessons','d1a1'),('An experienced pianist','a1h1')])]
def html():
    fs=''
    for i,(q,opts) in enumerate(Q):
        o=''.join(f'<label class="av-opt"><input type="radio" name="av-q{i}" value="{v}"><span>{t}</span></label>' for t,v in opts)
        fs+=f'<fieldset class="av-q"><legend><b>{i+1}.</b> {q}</legend><div class="av-opts">{o}</div></fieldset>'
    return f'''<section class="av-quiz" data-av-quiz aria-labelledby="av-quiz-h">
<p class="pz-eyebrow">Interactive</p>
<p class="av-title" id="av-quiz-h">Acoustic or digital? Find your piano in 5 questions</p>
<form class="av-form">{fs}<button class="pz-btn pz-btn-buy av-go" type="submit">Show my answer</button></form>
<div class="av-result" aria-live="polite" hidden></div>
</section>'''
CSS='''<style>
.av-quiz{background:var(--surface,#f3f6f7);border:1px solid var(--line,#d9e2e5);border-radius:var(--radius,14px);padding:22px;margin:32px 0;font-family:var(--f-display,Arial,sans-serif);color:var(--ink,#15191c)}
.av-quiz .pz-eyebrow{margin:0}
.av-title{font-size:1.3rem;line-height:1.2;font-weight:800;margin:4px 0 14px}
.av-form{display:grid;gap:14px;margin:0}
.av-q{border:0;padding:0;margin:0;min-width:0}
.av-q legend{font-weight:700;font-size:1rem;margin-bottom:8px;padding:0}
.av-opts{display:flex;flex-wrap:wrap;gap:8px}
.av-opt{position:relative;display:inline-flex}
.av-opt input{position:absolute;opacity:0;width:1px;height:1px}
.av-opt span{display:inline-flex;align-items:center;min-height:44px;padding:8px 14px;border:1px solid var(--line,#d9e2e5);border-radius:999px;background:var(--paper,#fff);font-size:.95rem;font-weight:600;cursor:pointer;transition:background .15s,border-color .15s}
.av-opt span:hover{border-color:var(--teal,#2e6475)}
.av-opt input:checked+span{background:var(--ink,#15191c);border-color:var(--ink,#15191c);color:var(--paper,#fff)}
.av-opt input:focus-visible+span{outline:3px solid var(--teal,#2e6475);outline-offset:2px}
.av-go{justify-self:start}
.av-result{margin-top:16px;padding:18px;border-radius:12px;background:var(--paper,#fff);border:2px solid var(--teal,#2e6475)}
.av-result h3{margin:0 0 6px;font-size:1.25rem}
.av-result p{margin:0 0 10px;font-family:var(--f-body,Georgia,serif);line-height:1.55}
.av-result a{font-weight:800}
.av-warn{color:var(--bad,#b0442d);font-weight:700;margin:10px 0 0}
@media (max-width:620px){.av-quiz{padding:18px 14px}}
</style>'''
JS=r'''<script>
(function(){
Array.prototype.forEach.call(document.querySelectorAll('[data-av-quiz]'),function(root){
var form=root.querySelector('.av-form'),out=root.querySelector('.av-result'),n=root.querySelectorAll('.av-q').length;
var R={d:['A digital piano','A weighted 88-key digital piano fits your life best: no tuning, headphones for quiet practice, and a much lower price. For most beginners, about $400 to $700 buys an instrument that lasts for years.',[['/best-beginner-pianos/','See the best beginner digital pianos'],['/best-digital-piano/','Compare digital pianos at every level']]],
a:['An acoustic piano','You have the space, the budget and the goals that make an acoustic worth it. A good upright will reward you for decades. If you buy used, have a technician inspect it first.',[['#piano-buying-checklist','Use the buying checklist'],['/piano-tuning-when-and-why-its-needed/','Learn what tuning involves']]],
h:['A hybrid or silent piano','You want real acoustic touch, but need to practise quietly. A hybrid (real action, digital sound) or a silent acoustic (a real piano with a headphone system) gives you both, at a higher price.',[['#hybrid-and-silent-pianos','Read about hybrids and silent pianos'],['/best-digital-piano/','See high-end digital and hybrid options']]]};
form.addEventListener('submit',function(e){e.preventDefault();var s={d:0,a:0,h:0},done=0;
for(var i=0;i<n;i++){var c=form.querySelector('input[name="av-q'+i+'"]:checked');if(!c)continue;done++;c.value.replace(/([dah])(\d)/g,function(_,k,v){s[k]+=+v;});}
out.hidden=false;out.textContent='';
if(done<n){var w=document.createElement('p');w.className='av-warn';w.textContent='Answer all '+n+' questions to see your result ('+(n-done)+' to go).';out.appendChild(w);return;}
var k=s.d>=s.a&&s.d>=s.h?'d':s.a>=s.h?'a':'h',night=form.querySelector('input[name="av-q0"]:checked').value==='d2h1',low=form.querySelector('input[name="av-q1"]:checked').value==='d3';if(low)k='d';else if(night&&k==='a')k='h';var r=R[k];
var h=document.createElement('h3');h.textContent='Your best fit: '+r[0];var p=document.createElement('p');p.textContent=r[1];out.appendChild(h);out.appendChild(p);
r[2].forEach(function(l,i){var a=document.createElement('a');a.href=l[0];a.textContent=l[1]+' →';out.appendChild(a);if(i<r[2].length-1)out.appendChild(document.createTextNode('  ·  '));});
out.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest'});});
});
})();
</script>'''
