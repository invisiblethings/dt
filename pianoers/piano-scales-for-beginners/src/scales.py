STD_RH=[1,2,3,1,2,3,4,5]
STD_LH=[5,4,3,2,1,3,2,1]
SCALES=[
 dict(id='c-major',name='C major',kind='major',notes=['C','D','E','F','G','A','B','C'],midi=[60,62,64,65,67,69,71,72],rh=STD_RH,lh=STD_LH,sig='No sharps or flats'),
 dict(id='g-major',name='G major',kind='major',notes=['G','A','B','C','D','E','F♯','G'],midi=[55,57,59,60,62,64,66,67],rh=STD_RH,lh=STD_LH,sig='1 sharp: F♯'),
 dict(id='d-major',name='D major',kind='major',notes=['D','E','F♯','G','A','B','C♯','D'],midi=[62,64,66,67,69,71,73,74],rh=STD_RH,lh=STD_LH,sig='2 sharps: F♯, C♯'),
 dict(id='a-major',name='A major',kind='major',notes=['A','B','C♯','D','E','F♯','G♯','A'],midi=[57,59,61,62,64,66,68,69],rh=STD_RH,lh=STD_LH,sig='3 sharps: F♯, C♯, G♯'),
 dict(id='e-major',name='E major',kind='major',notes=['E','F♯','G♯','A','B','C♯','D♯','E'],midi=[64,66,68,69,71,73,75,76],rh=STD_RH,lh=STD_LH,sig='4 sharps: F♯, C♯, G♯, D♯'),
 dict(id='f-major',name='F major',kind='major',notes=['F','G','A','B♭','C','D','E','F'],midi=[65,67,69,70,72,74,76,77],rh=[1,2,3,4,1,2,3,4],lh=STD_LH,sig='1 flat: B♭'),
 dict(id='a-minor',name='A minor',kind='minor',notes=['A','B','C','D','E','F','G','A'],midi=[57,59,60,62,64,65,67,69],rh=STD_RH,lh=STD_LH,sig='No sharps or flats (relative of C major)'),
 dict(id='e-minor',name='E minor',kind='minor',notes=['E','F♯','G','A','B','C','D','E'],midi=[64,66,67,69,71,72,74,76],rh=STD_RH,lh=STD_LH,sig='1 sharp: F♯ (relative of G major)'),
 dict(id='d-minor',name='D minor',kind='minor',notes=['D','E','F','G','A','B♭','C','D'],midi=[62,64,65,67,69,70,72,74],rh=STD_RH,lh=STD_LH,sig='1 flat: B♭ (relative of F major)'),
]
BY={s['id']:s for s in SCALES}
WHITE={0,2,4,5,7,9,11}
def is_white(m): return m%12 in WHITE
def check():
    import itertools
    names='C C♯ D D♯ E F F♯ G G♯ A A♯ B'.split()
    flat={'D♭':1,'E♭':3,'G♭':6,'A♭':8,'B♭':10}
    sharp={'C♯':1,'D♯':3,'F♯':6,'G♯':8,'A♯':10}
    base={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}
    for s in SCALES:
        steps=[b-a for a,b in zip(s['midi'],s['midi'][1:])]
        want=[2,2,1,2,2,2,1] if s['kind']=='major' else [2,1,2,2,1,2,2]
        assert steps==want,(s['id'],steps)
        for n,m in zip(s['notes'],s['midi']):
            pc=base.get(n, flat.get(n, sharp.get(n)))
            assert pc==m%12,(s['id'],n,m)
        letters=[n[0] for n in s['notes'][:7]]
        assert len(set(letters))==7,(s['id'],letters)
        for f,m in zip(s['rh'],s['midi']):
            assert not (f==1 and not is_white(m)),(s['id'],'RH thumb on black')
        for f,m in zip(s['lh'],s['midi']):
            assert not (f==1 and not is_white(m)),(s['id'],'LH thumb on black')
    return True
if __name__=='__main__': print(check())
