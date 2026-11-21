"""Turn the rendered PNGs into web JPGs with SEO and rights metadata.

Usage: python3 scripts/design-images/make-jpgs.py <dir from render.mjs>

Each JPG gets EXIF (description, artist, copyright, Windows title and
keywords) and XMP (Dublin Core title/description/creator/rights/keywords,
IPTC alt text, Photoshop credit, rights URL). Google Images reads the
creator, credit and copyright fields for its image-credit display.
"""
import json, sys
from html import escape
from PIL import Image

out = sys.argv[1]
SITE = 'https://pianoforall.academy'
OWNER = 'Pianoforall Academy Limited'
RIGHTS = f'© 2026 {OWNER}. All rights reserved.'
# EXIF text fields are ASCII-only; XMP keeps the full Unicode text.
ascii = lambda t: t.replace('©', 'Copyright').replace('–', '-').replace('’', "'").encode('ascii', 'replace').decode()


def xmp(m):
    li = lambda v: f'<rdf:Alt><rdf:li xml:lang="x-default">{escape(v)}</rdf:li></rdf:Alt>'
    kw = ''.join(f'<rdf:li>{escape(k)}</rdf:li>' for k in m['keywords'])
    return f'''<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<rdf:Description rdf:about=""
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
 xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
 xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"
 photoshop:Credit="{OWNER}" photoshop:Source="{SITE}{m['page']}" photoshop:Headline="{escape(m['title'])}"
 xmpRights:Marked="True" xmpRights:WebStatement="{SITE}/terms-of-use">
<dc:title>{li(m['title'])}</dc:title>
<dc:description>{li(m['description'])}</dc:description>
<dc:creator><rdf:Seq><rdf:li>{OWNER}</rdf:li></rdf:Seq></dc:creator>
<dc:rights>{li(RIGHTS)}</dc:rights>
<dc:subject><rdf:Bag>{kw}</rdf:Bag></dc:subject>
<Iptc4xmpCore:AltTextAccessibility>{li(m['alt'])}</Iptc4xmpCore:AltTextAccessibility>
</rdf:Description></rdf:RDF></x:xmpmeta>
<?xpacket end="w"?>'''.encode('utf-8')


for m in json.load(open(f'{out}/manifest.json')):
    im = Image.open(f"{out}/{m['file']}.png").convert('RGB').resize((1200, 630), Image.LANCZOS)
    exif = Image.Exif()
    exif[0x010E] = ascii(m['description'])          # ImageDescription
    exif[0x013B] = OWNER                     # Artist
    exif[0x8298] = ascii(RIGHTS)                    # Copyright
    exif[0x0131] = 'Pianoforall design script'  # Software
    exif[0x9C9B] = m['title'].encode('utf-16-le') + b'\0\0'                 # XPTitle
    exif[0x9C9E] = '; '.join(m['keywords']).encode('utf-16-le') + b'\0\0'   # XPKeywords
    path = f"{out}/{m['file']}.jpg"
    im.save(path, 'JPEG', quality=84, optimize=True, progressive=True, exif=exif, xmp=xmp(m))
    print(path)
