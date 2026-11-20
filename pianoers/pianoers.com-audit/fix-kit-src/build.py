"""Build the fix-kit data (JSON) from the hand-written tasks plus the tables in the audit findings."""
import json, re, sys, hashlib
sys.path.insert(0, sys.argv[1])
import tasks as T

AUD = sys.argv[2]
OUT = sys.argv[3]
F = AUD + '/findings/'
pages = {p['url'].replace('https://pianoers.com', ''): p for p in json.load(open(AUD + '/crawl/pages.json'))}
slugs = [u for u in pages if u.count('/') == 2 and u != '/']

def resolve(token):
    """Map a page reference from the findings ('/piano-dehumidifier-101.../', 'flowkey-review') to a URL path."""
    t = token.strip().strip('`').strip()
    t = t.replace('…', '...').rstrip('/').strip('/')
    if not t: return None
    t = t.replace('...', '')
    hits = [u for u in pages if u.strip('/') == t]
    if not hits: hits = [u for u in pages if u.strip('/').startswith(t)]
    return hits[0] if len(hits) == 1 else (hits[0] if hits else None)

def rows(md, header_start):
    """Yield the cells of each row of the first markdown table whose header starts with header_start."""
    lines = open(F + md).read().split('\n')
    for i, l in enumerate(lines):
        if l.startswith(header_start):
            for r in lines[i + 2:]:
                if not r.startswith('|'): return
                yield [c.strip() for c in r.strip().strip('|').split('|')]
    return

out = {}
def add(path, task):
    out.setdefault(path, []).append(task)

for path, ts in T.PAGES.items():
    for t in ts: add(path, dict(t))

# Internal link matrix
last_from = None
nlinks = 0
for c in rows('clusters-internal-links.md', '| # | Pri | FROM'):
    if len(c) < 6: continue
    num, pri, frm, sec, anchor, to = c[:6]
    frm_p = resolve(frm) if frm.lower() != 'same' else last_from
    to_p = resolve(to)
    if not frm_p or not to_p: continue
    last_from = frm_p
    add_sentence = '(add' in sec
    sec_clean = re.sub(r'\*\(add[^)]*\)\*', '', sec).strip().strip('"').strip()
    sec_txt = sec.replace('*', '')
    note = 'In the section ' + sec_txt + '.' if sec_clean else ''
    if add_sentence: note += ' There is no natural sentence yet, so write one short sentence there with this link.'
    add(frm_p, dict(pri={'P1': 2, 'P2': 3, 'P3': 3}.get(pri, 3), kind='link', where='In the post editor: select the words, press Ctrl/Cmd + K, paste the address',
                    title='Add a link to ' + to_p, note=note.strip(),
                    copy=[('Link text', anchor.strip('"')), ('Address', 'https://pianoers.com' + to_p)]))
    nlinks += 1

# Anchor text fixes (existing links)
for c in rows('clusters-internal-links.md', '| From | Current anchor'):
    if len(c) < 5: continue
    frm, cur, to, prob, new = c[:5]
    for f in frm.split(','):
        p = resolve(f)
        if not p: continue
        t = dict(pri=3, kind='link', where='In the post editor', title='Change the link text "' + cur.strip('"') + '"', note=prob + '. ' + ('New: ' + new if new else ''))
        if new.startswith('"') and new.count('"') == 2:
            t['copy'] = [('New link text', new.strip('"'))]
        add(p, t)

# Alt text fixes
nalt = 0
for c in rows('images.md', '| Page | Image | Current alt'):
    if len(c) < 4 or c[2] == '—': continue
    pg, img, cur, new = c[:4]
    if new.lower().startswith('ok'): continue
    cur = 'the post title' if cur.strip() == '= title' else cur
    new = new.strip('"')
    feature = img.startswith('feature')
    for f in re.split(r',\s*', pg):
        p = resolve(f)
        if not p: continue
        add(p, dict(pri=3, kind='image', where=(T.PS + ' → Feature image alt text') if feature else 'In the post editor: click the image, then the alt button',
                    title='Fix the alt text on ' + ('the feature image' if feature else 'image ' + img.replace('Unsplash photo-', 'Unsplash ')),
                    note='Now: ' + cur, copy=[('Alt text', new)]))
        nalt += 1

# Heavy images
nimg = 0
for c in rows('images.md', '| Image (original) | Page(s)'):
    if len(c) < 7: continue
    img, pg, orig, dims, served, webp, saving = c[:7]
    for f in re.split(r',\s*', pg):
        p = resolve(f)
        if not p: continue
        name = img.split('(')[0].strip().split('/')[-1]
        what = img[img.find('(') + 1:img.rfind(')')] if '(' in img else ''
        add(p, dict(pri=3, kind='image', where='In the post editor: click the image → Replace',
                    title='Replace the heavy image ' + name + (' (' + what + ')' if what else ''),
                    note='It is ' + orig + ' (' + dims + '). Save it as WebP or JPEG at the same size (an online converter such as squoosh.app works) and upload that instead. Saves ' + saving + '.'))
        nimg += 1

# Schema templates
schema = open(F + 'schema.md').read()
blocks = re.findall(r'### (Template [A-D][^\n]*)\n(.*?)```html\n(.*?)```', schema, re.S)
snippets = []
for title, intro, code in blocks:
    if title.startswith('Template C'): continue
    snippets.append(dict(title=title, intro=re.sub(r'\s+', ' ', intro).strip(), code=code.strip()))

def tid(path, t):
    h = hashlib.sha1((path + '|' + t['title'] + '|' + json.dumps(t.get('copy', ''), ensure_ascii=False) + t.get('find', '')).encode()).hexdigest()[:10]
    return h

site = []
for t in T.SITE:
    t = dict(t); t['id'] = tid('site', t); site.append(t)

page_list = []
for path, ts in out.items():
    p = pages.get(path, {})
    seen = set(); clean = []
    for t in ts:
        t['id'] = tid(path, t)
        if t['id'] in seen: continue
        seen.add(t['id']); clean.append(t)
    clean.sort(key=lambda t: (t['pri'], ['setting', 'text', 'heading', 'code', 'page', 'link', 'image'].index(t['kind'])))
    page_list.append(dict(path=path, title=(p.get('h1') or [p.get('title') or path])[0], kind=p.get('kind', 'posts'), tasks=clean))
page_list.sort(key=lambda g: (-sum(1 for t in g['tasks'] if t['pri'] == 1), -len(g['tasks'])))

data = dict(generated='8 October 2026', site=site, pages=page_list, snippets=snippets)
json.dump(data, open(OUT, 'w'), ensure_ascii=False)
total = len(site) + sum(len(g['tasks']) for g in page_list)
print('pages', len(page_list), 'tasks', total, 'links', nlinks, 'alts', nalt, 'heavy images', nimg, 'snippets', [s['title'][:12] for s in snippets])
missing = [s for s in slugs if s not in out]
print('pages with no tasks:', missing)
