"""Generates Google Ads Editor import files in docs/google-ads/ and checks
every headline (<=30), description (<=90), path (<=15) and asset length.
Run: python3 scripts/build-google-ads.py"""
import csv, os, sys
OUT = 'docs/google-ads'
SITE = 'https://pianoforall.academy'

COMMON = ['$49 Once. No Subscription', '60-Day Money-Back Guarantee', '568 Step-by-Step Lessons',
          'Created by Robin Hall', 'Lifetime Access, Any Device', '53,000+ Student Ratings',
          'Pop, Blues, Jazz & Classical', 'Chords First, Reading Later', 'Pianoforall Piano Course']
COMMON_D = ['Start with chords and rhythm, play by ear, then learn to read music as you go.',
            'Nine books, 568 short video lessons and 25 hours of video. Pay once, keep it for life.',
            'Created by piano teacher Robin Hall. 4.7/5 from 53,000+ student ratings.',
            'Not for you? Ask for a full refund within 60 days. No subscription, ever.']
CLASSICS_COMMON = ['$49 Once, Lifetime Access', '60-Day Money-Back Guarantee', 'Created by Robin Hall',
                   'Keyboard Diagrams + Score', 'Learn the Patterns First', 'Short Video Lessons',
                   'Online and Offline Access', 'No Subscription', 'Classics By Ear Courses']

# campaign, ad group, final path, path1, path2, specific headlines, descriptions, keywords
GROUPS = [
 ('Search - Core', 'Learn Piano Online', '/', 'piano', 'lessons',
  ['Learn Piano Online', 'Online Piano Lessons', 'Online Piano Course', 'Learn Piano at Home', 'Play Music From Lesson One', 'Works Offline Too'], COMMON_D,
  ['learn piano online', 'online piano lessons', 'online piano course', 'piano course online', 'learn to play piano online', 'piano lessons online for beginners', 'best online piano course', 'best way to learn piano online']),
 ('Search - Core', 'Adult Beginners', '/course', 'piano', 'for-adults',
  ['Piano Lessons for Adults', 'Adult Beginner Piano Course', 'Never Too Late to Play Piano', 'No Children’s Songs', 'Short Lessons, Your Pace', 'Built for Adult Beginners'], COMMON_D,
  ['piano lessons for adults', 'adult piano lessons', 'adult beginner piano', 'learn piano as an adult', 'piano for adult beginners', 'online piano lessons for adults', 'beginner piano course for adults']),
 ('Search - Core', 'Play By Ear & Chords', '/how-it-works', 'play-by-ear', 'chords',
  ['Learn to Play Piano by Ear', 'Learn Piano Chords', 'Play First, Read Later', 'Play Songs From Chord Sheets', 'Learn to Improvise', 'No Sheet Music to Start'], COMMON_D,
  ['learn to play piano by ear', 'play piano by ear course', 'learn piano chords', 'piano chords course', 'chord piano lessons', 'learn piano without reading music', 'piano without sheet music']),
 ('Search - Core', 'Older Beginners', '/am-i-too-old-to-learn-piano', 'piano', 'any-age',
  ['Piano Lessons for Seniors', 'Learn Piano at 50, 60 or 70', 'You’re Not Too Old to Learn', 'Start Piano After Retirement', 'Gentle, Step-by-Step Lessons', 'Learn at Your Own Pace'], COMMON_D,
  ['piano lessons for seniors', 'learn piano at 60', 'learn piano at 50', 'learning piano later in life', 'am i too old to learn piano', 'piano lessons for retirees']),
 ('Search - Core', 'No Subscription', '/pricing', 'pricing', '49-once',
  ['Piano Course, No Subscription', 'One-Time Payment Piano Course', 'Pay Once, Keep It for Life', 'No Monthly Fees', 'Tired of App Subscriptions?', 'All 9 Books for $49'], COMMON_D,
  ['piano course no subscription', 'piano lessons one time payment', 'piano course lifetime access', 'piano lessons without subscription', 'one time payment piano app']),
 ('Search - Classics By Ear', 'Moonlight Sonata', '/classics-by-ear/moonlight-sonata', 'moonlight', 'sonata',
  ['Learn the Moonlight Sonata', 'Moonlight Sonata, Step by Step', '38 Lessons, 4 Hours of Video', 'No Need to Read Music', 'Beethoven, 1st Movement', 'Learn It Bar by Bar'] ,
  ['Learn Beethoven’s Moonlight Sonata (1st movement) a few bars at a time, by ear.', 'Video, keyboard diagrams and annotated sheet music. 38 lessons, 4 hours of video.', 'Created by piano teacher Robin Hall. $49 once, lifetime access, no subscription.', 'Not for you? Ask for a full refund within 60 days.'],
  ['learn moonlight sonata', 'moonlight sonata piano lessons', 'how to play moonlight sonata', 'moonlight sonata course', 'learn moonlight sonata 1st movement', 'moonlight sonata for beginners']),
 ('Search - Classics By Ear', 'Satie Gnossiennes', '/classics-by-ear/erik-satie-gnossiennes', 'satie', 'gnossiennes',
  ['Learn Satie’s Gnossiennes', 'Gnossienne No. 1, 2 and 3', '45 Lessons, 4.5 Hours of Video', 'No Need to Read Music', 'A Gentle First Classical Piece', 'Chords First, Then Melody'],
  ['Learn all three of Erik Satie’s Gnossiennes step by step: chords first, then melody.', 'Video, keyboard diagrams and annotated sheet music. 45 lessons, 4.5 hours of video.', 'Created by piano teacher Robin Hall. $49 once, lifetime access, no subscription.', 'Not for you? Ask for a full refund within 60 days.'],
  ['learn gnossienne no 1', 'gnossienne piano lessons', 'how to play gnossienne 1', 'satie gnossienne course', 'erik satie piano lessons']),
 ('Search - Classics By Ear', 'Bach Preludes', '/classics-by-ear/bach-preludes', 'bach', 'preludes',
  ['Learn Bach’s Prelude in C', 'Prelude in C Major & C Minor', '48 Lessons, 5 Hours of Video', 'No Need to Read Music', 'A Great First Classical Piece', 'Learn the Chord Shapes First'],
  ['Learn Bach’s Preludes in C major and C minor by learning the chord shapes first.', 'Video, keyboard diagrams and annotated sheet music. 48 lessons, 5 hours of video.', 'Created by piano teacher Robin Hall. $49 once, lifetime access, no subscription.', 'Not for you? Ask for a full refund within 60 days.'],
  ['learn bach prelude in c major', 'bach prelude in c piano lessons', 'how to play bach prelude in c', 'bach prelude c major course', 'bach prelude piano for beginners']),
]
BRAND = ('Search - Brand', 'Pianoforall', '/', 'pianoforall', 'official',
  ['Pianoforall', 'The Pianoforall Method', 'Learn Piano by Playing Piano', 'Robin Hall’s Piano Course', 'Classics By Ear Courses', 'Pianoforall Reviews'], COMMON_D,
  ['pianoforall', 'piano for all', 'pianoforall review', 'pianoforall reviews', 'pianoforall price', 'piano for all course', 'robin hall piano'])

NEG = ['free', 'download', 'pdf', 'torrent', 'crack', 'apk', 'mod', 'sheet music', 'midi file', 'near me', 'in person',
       'teacher job', 'jobs', 'salary', 'certification', 'degree', 'conservatory', 'abrsm', 'grade 1', 'grade 2',
       'kids', 'children', 'child', 'toddler', 'preschool', 'for sale', 'buy piano', 'used piano', 'piano price',
       'keyboard price', 'piano repair', 'piano tuning', 'piano tuner', 'piano movers', 'virtual piano', 'online piano keyboard',
       'piano tiles', 'game', 'roblox', 'synthesia', 'youtube', 'reddit', 'wikipedia', 'lyrics', 'chords chart pdf',
       'violin', 'guitar lessons', 'drum lessons', 'singing lessons', 'organ', 'accordion']

errs = []
def chk(kind, s, n):
    if len(s) > n: errs.append(f'{kind} too long ({len(s)}>{n}): {s}')
    return s

os.makedirs(OUT, exist_ok=True)
with open(f'{OUT}/ads.csv', 'w', newline='') as f:
    w = csv.writer(f)
    w.writerow(['Campaign', 'Ad group', 'Ad type'] + [f'Headline {i}' for i in range(1, 16)] + [f'Description {i}' for i in range(1, 5)] + ['Final URL', 'Path 1', 'Path 2'])
    for camp, grp, url, p1, p2, spec, desc, _ in [BRAND] + GROUPS:
        base = CLASSICS_COMMON if 'Classics' in camp else COMMON
        hl = (spec + [h for h in base if h not in spec])[:15]
        if len(set(hl)) != 15: errs.append(f'{grp}: need 15 unique headlines, have {len(set(hl))}')
        w.writerow([camp, grp, 'Responsive search ad'] + [chk('Headline', h, 30) for h in hl] + [chk('Description', d, 90) for d in desc] + [SITE + url, chk('Path', p1, 15), chk('Path', p2, 15)])
with open(f'{OUT}/keywords.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['Campaign', 'Ad group', 'Keyword', 'Criterion Type'])
    for camp, grp, *_, kws in [BRAND] + GROUPS:
        for k in kws:
            w.writerow([camp, grp, k, 'Exact']); w.writerow([camp, grp, k, 'Phrase'])
with open(f'{OUT}/negative-keywords.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['Campaign', 'Keyword', 'Criterion Type'])
    for camp in ['Search - Core', 'Search - Classics By Ear', 'Search - Brand']:
        for n in NEG:
            if camp == 'Search - Brand' and n in ('free',): continue
            w.writerow([camp, n, 'Negative Phrase'])
    # keep non-brand campaigns from competing with the brand campaign
    for camp in ['Search - Core', 'Search - Classics By Ear']:
        for n in ['pianoforall', 'piano for all']: w.writerow([camp, n, 'Negative Phrase'])
with open(f'{OUT}/campaigns.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['Campaign', 'Campaign Type', 'Networks', 'Budget', 'Budget type', 'Bid Strategy Type', 'Languages', 'Campaign Status'])
    for c, b in [('Search - Brand', 5), ('Search - Core', 20), ('Search - Classics By Ear', 5)]:
        w.writerow([c, 'Search', 'Google search', b, 'Daily', 'Maximize clicks', 'en', 'Paused'])

SITELINKS = [('The Course', 'All 9 books, 568 lessons', 'From first chord to jazz', '/course'),
             ('Pricing & Bundles', '$49 once, no subscription', 'Bundles from $79', '/pricing'),
             ('Student Reviews', 'Real messages from students', 'Beginners to returning players', '/reviews'),
             ('How It Works', 'Play first, read later', 'Chords and rhythm first', '/how-it-works'),
             ('Classics By Ear', 'Moonlight Sonata, Satie, Bach', 'Learn a piece by ear', '/classics-by-ear'),
             ('Free Backing Tracks', 'Drums and bass to play with', 'Any key, any tempo', '/learn/piano-backing-tracks')]
CALLOUTS = ['One-Time Payment', 'Lifetime Access', '60-Day Money Back', '568 Video Lessons', 'Since 2006', 'Works Offline', 'No Subscription', 'Any Age, Any Level']
with open(f'{OUT}/assets.csv', 'w', newline='') as f:
    w = csv.writer(f); w.writerow(['Asset type', 'Text', 'Description 1', 'Description 2', 'Final URL'])
    for t, d1, d2, u in SITELINKS: w.writerow(['Sitelink', chk('Sitelink text', t, 25), chk('Sitelink desc', d1, 35), chk('Sitelink desc', d2, 35), SITE + u])
    for c in CALLOUTS: w.writerow(['Callout', chk('Callout', c, 25), '', '', ''])
    w.writerow(['Structured snippet: Styles', 'Pop, Blues, Rock ’n’ Roll, Ballads, Jazz, Classical', '', '', ''])
    w.writerow(['Structured snippet: Courses', 'Pianoforall, Moonlight Sonata, Satie Gnossiennes, Bach Preludes', '', '', ''])
    for n, p, u in [('Pianoforall', 49, '/course'), ('Moonlight Sonata', 49, '/classics-by-ear/moonlight-sonata'), ('Classics Bundle', 79, '/pricing'), ('Complete Bundle', 99, '/pricing')]:
        w.writerow(['Price', chk('Price header', n, 25), f'${p} one-time', '', SITE + u])

if errs: print('\n'.join(errs)); sys.exit(1)
print('OK: all lengths within Google limits;', sum(len(g[-1]) for g in [BRAND] + GROUPS) * 2, 'keywords,', len(GROUPS) + 1, 'ads')
