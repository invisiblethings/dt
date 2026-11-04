#!/usr/bin/env python3
"""Course-finder quiz simulator for /best-piano-lessons-online/.

Plays every possible answer combination through the same scoring rules the
theme uses (pianoers theme 1.2.0, assets/js/main.js, "Course quiz") and
reports how often each course wins. Use it after every change to the
questions or the points, before you paste the quiz card into Ghost.

Usage:
  python3 quiz-simulate.py                         # reads quiz-data.json next to this file
  python3 quiz-simulate.py cards/02-course-quiz.html   # or the quiz HTML card itself
  python3 quiz-simulate.py --by-answer             # also: most common result for each answer
  python3 quiz-simulate.py --sweep                 # also: what different head starts would do
  python3 quiz-simulate.py --markdown              # all tables as Markdown (for QUIZ.md)
  python3 quiz-simulate.py --json winners.json     # write every combination's winner (for tests)

Scoring (identical to main.js):
  1. score(course) = sum of the points each chosen answer gives it,
     plus the head start for the favorite (Pianoforall).
  2. Must-haves: an answer with "requires" lists the only courses that offer it.
     Courses outside that list can't win (their score is still shown).
  3. Highest score wins. Ties go to the favorite, then to the course listed first.
"""
import itertools
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path


def load(path):
    raw = Path(path).read_text(encoding='utf-8')
    if path.endswith('.html'):
        m = re.search(r'<script type="application/json"[^>]*>(.*?)</script>', raw, re.S)
        if not m:
            sys.exit('No <script type="application/json"> block found in ' + path)
        raw = m.group(1)
    return json.loads(raw)


def score(data, chosen, head_start=None):
    """chosen: list of option dicts (one per question). Returns (scores, allowed set)."""
    hs = data.get('headStart', 0) if head_start is None else head_start
    ids = [c['id'] for c in data['courses']]
    s = {cid: 0 for cid in ids}
    s[data['favorite']] += hs
    allowed = set(ids)
    for opt in chosen:
        for cid, pts in opt.get('points', {}).items():
            s[cid] += pts
        if opt.get('requires'):
            allowed &= set(opt['requires'])
    if not allowed:          # conflicting must-haves: nobody qualifies, so everyone may win
        allowed = set(ids)
    return s, allowed


def ranking(data, s, allowed, favorite_breaks_ties=True):
    ids = [c['id'] for c in data['courses']]
    fav = data['favorite']
    return sorted(ids, key=lambda c: (c not in allowed, -s[c],
                                      0 if (favorite_breaks_ties and c == fav) else 1, ids.index(c)))


def run(data, head_start=None):
    qs = data['questions']
    ids = [c['id'] for c in data['courses']]
    fav = data['favorite']
    res = {'wins': Counter(), 'ties': Counter(), 'flagged': Counter(), 'neutral': Counter(),
           'by': defaultdict(Counter), 'example': {}, 'every': {}, 'total': 0}
    for chosen in itertools.product(*[q['options'] for q in qs]):
        s, allowed = score(data, chosen, head_start)
        r = ranking(data, s, allowed)
        w = r[0]
        margin = s[r[0]] - s[r[1]] if r[1] in allowed else 99
        res['wins'][w] += 1
        res['total'] += 1
        if margin == 0:
            res['ties'][w] += 1
        if any(w in o.get('flag', {}) for o in chosen):
            res['flagged'][w] += 1
        key = '|'.join(o['value'] for o in chosen)
        res['every'][key] = w
        if w not in res['example'] or margin > res['example'][w][0]:
            res['example'][w] = (margin, chosen)
        for q, o in zip(qs, chosen):
            res['by'][(q['id'], o['value'])][w] += 1
        # Neutral view: no head start, and a tie is shared equally
        s0, _ = score(data, chosen, 0)
        pool = [c for c in ids if c in allowed]
        top = max(s0[c] for c in pool)
        tied = [c for c in pool if s0[c] == top]
        for c in tied:
            res['neutral'][c] += 1 / len(tied)
    return res


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    if '--json' in sys.argv:
        args = [a for a in args if a != sys.argv[sys.argv.index('--json') + 1]]
    src = args[0] if args else str(Path(__file__).with_name('quiz-data.json'))
    data = load(src)
    ids = [c['id'] for c in data['courses']]
    names = {c['id']: c['name'] for c in data['courses']}
    for q in data['questions']:
        for o in q['options']:
            for cid in list(o.get('points', {})) + list(o.get('requires', [])) + list(o.get('flag', {})) + list(o.get('why', {})):
                assert cid in ids, f'unknown course id {cid!r} in {q["id"]}/{o["value"]}'

    qs = data['questions']
    fav = data['favorite']
    md = '--markdown' in sys.argv
    res = run(data)
    total = res['total']
    pct = lambda n, t=total: f'{100 * n / t:.1f}%'

    if md:
        print(f'{len(qs)} questions, {total} answer combinations, head start {data.get("headStart", 0)}.\n')
        print('| Course | Wins | Share | Won on a tie | Wins with a heads-up | Share with no head start, ties shared | Clearest example |')
        print('|---|---:|---:|---:|---:|---:|---|')
    else:
        print(f'Source: {src}')
        print(f'Questions: {len(qs)}   Answer combinations: {total}   Head start: {data.get("headStart", 0)}\n')
        print(f'{"Course":21} {"wins":>5} {"share":>6} {"tie":>4} {"flag":>5} {"neutral":>7}  clearest example')
    for cid in ids:
        n = res['wins'][cid]
        ex = ' / '.join(o['label'] for o in res['example'][cid][1]) if cid in res['example'] else '-'
        if md:
            print(f'| {names[cid]} | {n} | {pct(n)} | {res["ties"][cid]} | {res["flagged"][cid]} | {pct(res["neutral"][cid])} | {ex} |')
        else:
            print(f'{names[cid]:21} {n:5d} {pct(n):>6} {res["ties"][cid]:4d} {res["flagged"][cid]:5d} {pct(res["neutral"][cid]):>7}  {ex}')
    can_win = [c for c in ids if res['wins'][c]]
    print()
    print(f'{names[fav]} wins {res["wins"][fav]} of {total} combinations ({pct(res["wins"][fav])}).')
    print(f'Courses that can win: {len(can_win)} of {len(ids)} ({len([c for c in can_win if c != fav])} besides {names[fav]}).')
    print(f'{names[fav]} wins {res["ties"][fav]} combinations on the tie-break alone; with no head start and ties shared it would get {pct(res["neutral"][fav])}.')
    print(f'{names[fav]} wins {res["flagged"][fav]} combinations with a heads-up shown (an answer it is weak on).')

    if '--by-answer' in sys.argv or md:
        print()
        if md:
            print('| Question | Answer | Most common result | Next |')
            print('|---|---|---|---|')
        for q in qs:
            for o in q['options']:
                c = res['by'][(q['id'], o['value'])]
                n = sum(c.values())
                cells = [f'{names[k]} {100 * v / n:.0f}%' for k, v in c.most_common(3)]
                gate = ' (must-have)' if o.get('requires') else ''
                if md:
                    print(f'| {q["label"]} | {o["label"]}{gate} | {cells[0]} | {", ".join(cells[1:])} |')
                else:
                    print(f'  {q["id"]:10} {(o["label"] + gate)[:44]:44} ' + ', '.join(cells))

    if '--sweep' in sys.argv or md:
        print()
        if md:
            print(f'| Head start | {names[fav]} share | Courses that can win | {names[fav]} wins with a heads-up |')
            print('|---:|---:|---:|---:|')
        else:
            print('Head-start sweep (what the "headStart" setting would do):')
        for hs in range(0, 5):
            r2 = run(data, hs)
            n_can = len([c for c in ids if r2['wins'][c]])
            line = (hs, pct(r2['wins'][fav]), n_can, r2['flagged'][fav])
            if md:
                print(f'| {hs}{" (current)" if hs == data.get("headStart", 0) else ""} | {line[1]} | {line[2]} | {line[3]} |')
            else:
                print(f'  headStart {hs}: {names[fav]} {line[1]}, {line[2]} courses can win, {line[3]} heads-up wins')

    if '--json' in sys.argv:
        out = sys.argv[sys.argv.index('--json') + 1]
        Path(out).write_text(json.dumps(res['every']), encoding='utf-8')
        print(f'\nWrote every combination\'s winner to {out}')


if __name__ == '__main__':
    main()
