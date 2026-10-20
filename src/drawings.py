"""Technical-drawing SVGs for each service, plus the hero elevation.

Drawings use CSS classes instead of hard-coded colors so they follow the
vellum/blueprint theme:
  ln   stroked line that "draws in" (gets pathLength=1)
  lt   thin secondary line (also draws in)
  dsh  dashed line (fades in, it can't use the dash animation)
  acc  accent (safety orange) stroke
  af   accent fill
  ko   knockout fill (paper color), used to mask lines behind an object
  tx   mono annotation text
"""

import math

W, H = 480, 342


def _attrs(d):
    out = []
    for k, v in d.items():
        k = k.rstrip("_").replace("_", "-")
        out.append(f'{k}="{v}"')
    return " ".join(out)


def ln(x1, y1, x2, y2, c="ln"):
    pl = ' pathLength="1"' if c in ("ln", "lt", "ln acc", "lt acc") else ""
    return f'<line class="{c}" x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}"{pl}/>'


def rect(x, y, w, h, c="ln", **kw):
    pl = ' pathLength="1"' if c.split()[0] in ("ln", "lt") else ""
    extra = (" " + _attrs(kw)) if kw else ""
    return f'<rect class="{c}" x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}"{pl}{extra}/>'


def path(d, c="ln"):
    pl = ' pathLength="1"' if c.split()[0] in ("ln", "lt") else ""
    return f'<path class="{c}" d="{d}"{pl}/>'


def circ(cx, cy, r, c="ln"):
    pl = ' pathLength="1"' if c.split()[0] in ("ln", "lt") else ""
    return f'<circle class="{c}" cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}"{pl}/>'


def tx(x, y, s, anchor="start", c="tx"):
    return f'<text class="{c}" x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}">{s}</text>'


def leader(x1, y1, x2, y2, label, anchor="start"):
    """Annotation: dot at the object, line to the label."""
    dx = 4 if anchor == "start" else -4
    return (
        f'<circle class="af" cx="{x1:.1f}" cy="{y1:.1f}" r="2.5"/>'
        + ln(x1, y1, x2, y2, "lt")
        + tx(x2 + dx, y2 + 3, label, anchor)
    )


def dim_h(x1, x2, y, label):
    return (
        ln(x1, y, x2, y, "lt")
        + ln(x1, y - 5, x1, y + 5, "lt")
        + ln(x2, y - 5, x2, y + 5, "lt")
        + ln(x1 - 3, y + 3, x1 + 3, y - 3, "lt")
        + ln(x2 - 3, y + 3, x2 + 3, y - 3, "lt")
        + f'<rect class="ko" x="{(x1 + x2) / 2 - len(label) * 3.4 - 4:.1f}" y="{y - 6:.1f}" width="{len(label) * 6.8 + 8:.1f}" height="12"/>'
        + tx((x1 + x2) / 2, y + 3.5, label, "middle")
    )


def dim_v(x, y1, y2, label):
    cy = (y1 + y2) / 2
    return (
        ln(x, y1, x, y2, "lt")
        + ln(x - 5, y1, x + 5, y1, "lt")
        + ln(x - 5, y2, x + 5, y2, "lt")
        + ln(x - 3, y1 + 3, x + 3, y1 - 3, "lt")
        + ln(x - 3, y2 + 3, x + 3, y2 - 3, "lt")
        + f'<g transform="rotate(-90 {x:.1f} {cy:.1f})"><rect class="ko" x="{x - len(label) * 3.4 - 4:.1f}" y="{cy - 6:.1f}" width="{len(label) * 6.8 + 8:.1f}" height="12"/>'
        + tx(x, cy + 3.5, label, "middle")
        + "</g>"
    )


def hatch(x, y, w, h, uid, gap=8):
    """Diagonal hatch (section cut) inside a rect."""
    lines = []
    i = -h
    while i < w:
        lines.append(ln(x + i, y + h, x + i + h, y, "lt"))
        i += gap
    return (
        f'<clipPath id="{uid}"><rect x="{x}" y="{y}" width="{w}" height="{h}"/></clipPath>'
        f'<g clip-path="url(#{uid})">{"".join(lines)}</g>' + rect(x, y, w, h, "ln")
    )


def wrap(inner, title, n, uid, label):
    return (
        f'<svg class="drawing" viewBox="0 0 {W} {H}" role="img" aria-labelledby="{uid}-t" '
        f'xmlns="http://www.w3.org/2000/svg"><title id="{uid}-t">{label}</title>'
        f'<g class="drawing__art">{inner}</g>'
        f'<g class="drawing__title">'
        f'{circ(28, H - 22, 13, "lt")}{ln(15, H - 22, 41, H - 22, "lt")}'
        f'{tx(28, H - 25.5, str(n), "middle", "tx tx--b")}{tx(28, H - 11.5, "A", "middle", "tx tx--s")}'
        f'{tx(50, H - 24, title.upper(), "start", "tx tx--b")}'
        f'{tx(50, H - 11, "SCALE: NTS · AXE CONTRACTING GROUP", "start", "tx tx--s")}'
        f"</g></svg>"
    )


# ---------------------------------------------------------------- service details


def roofing(u):
    clip = f"{u}-c"
    tri = "60,225 240,62 420,225"
    rows = []
    y = 78
    r = 0
    while y < 225:
        rows.append(ln(40, y, 440, y, "lt"))
        off = 14 if r % 2 else 0
        x = 40 + off
        while x < 440:
            rows.append(ln(x, y, x, y + 13, "lt"))
            x += 28
        y += 13
        r += 1
    return (
        f'<clipPath id="{clip}"><polygon points="{tri}"/></clipPath>'
        f'<g clip-path="url(#{clip})">{"".join(rows)}</g>'
        + path("M60 225 L240 62 L420 225", "ln")
        + path("M48 236 L240 54 L432 236", "ln")
        + rect(96, 225, 288, 25, "ln")
        + ln(60, 225, 420, 225, "ln")
        + path("M222 70 L258 70", "ln acc")
        + path("M300 160 L340 160 L340 124", "lt")
        + tx(346, 148, "6", "start")
        + tx(318, 172, "12", "middle")
        + leader(258, 70, 330, 40, "RIDGE VENT")
        + leader(170, 150, 30, 112, "ARCH. SHINGLES")
        + leader(110, 214, 60, 262, "ICE &amp; WATER SHIELD @ EAVE", "start")
        + leader(380, 220, 440, 262, "DRIP EDGE + GUTTER", "end")
    )


def roof_repair(u):
    drops = "".join(
        path(f"M{x} {y} q4 7 0 10 q-4 -3 0 -10z", "ln acc") for x, y in [(118, 236), (124, 254), (112, 270)]
    )
    return (
        hatch(40, 60, 46, 172, f"{u}-h1", 10)
        + rect(32, 52, 62, 10, "ln")
        + hatch(86, 196, 360, 18, f"{u}-h2", 6)
        + rect(86, 214, 360, 10, "ln")
        + path("M86 194 L446 190", "ln acc")
        + path("M86 194 L86 120 L94 120", "ln acc")
        + path("M94 62 L94 120", "lt")
        + circ(92, 176, 30, "dsh acc")
        + drops
        + leader(120, 155, 200, 110, "RE-FLASH PARAPET + COUNTER-FLASHING")
        + leader(300, 192, 330, 150, "NEW MEMBRANE")
        + leader(260, 205, 300, 250, "TAPERED INSULATION")
        + leader(380, 219, 400, 270, "ROOF DECK")
        + tx(150, 252, "LEAK PATH", "start", "tx acc-t")
    )


def siding(u):
    lines = []
    y = 46
    while y < 248:
        lines.append(ln(60, y, 404, y, "lt"))
        y += 11
    return (
        "".join(lines)
        + rect(60, 40, 360, 210, "ln")
        + rect(404, 40, 16, 210, "ln")
        + rect(176, 84, 112, 104, "ko")
        + rect(176, 84, 112, 104, "ln")
        + rect(186, 94, 92, 86, "ln")
        + ln(232, 94, 232, 180, "lt")
        + rect(170, 188, 124, 8, "ln")
        + path("M172 80 L292 80", "ln acc")
        + leader(292, 80, 330, 26, "DRIP CAP + FLASHING TAPE")
        + leader(120, 145, 70, 270, "INSULATED LAP SIDING", "start")
        + leader(412, 236, 452, 292, "CORNER POST", "end")
        + leader(294, 192, 350, 270, "J-CHANNEL / SILL")
        + dim_v(40, 40, 250, "WALL HT. VARIES")
    )


def exterior_painting(u):
    lines = "".join(ln(50, y, 280, y, "lt") for y in range(52, 250, 12))
    bands = ""
    labels = [("PRIME", 0.18), ("COAT 1", 0.45), ("COAT 2", 0.9)]
    for i, (lab, op) in enumerate(labels):
        x = 316 + i * 46
        bands += f'<rect class="af" x="{x}" y="52" width="38" height="150" fill-opacity="{op}"/>' + rect(x, 52, 38, 150, "ln")
        bands += tx(x + 19, 218, lab, "middle")
    return (
        lines
        + rect(50, 46, 230, 204, "ln")
        + rect(110, 90, 70, 84, "ko")
        + rect(110, 90, 70, 84, "ln")
        + rect(104, 84, 82, 96, "ln acc")
        + path("M210 250 L262 40", "ln")
        + path("M236 250 L288 40", "ln")
        + "".join(ln(210 + 52 * (250 - y) / 210, y, 236 + 52 * (250 - y) / 210, y, "lt") for y in range(70, 250, 26))
        + bands
        + leader(186, 132, 222, 270, "SCRAPE · PRIME · CAULK TRIM", "start")
        + tx(362, 40, "2-COAT SYSTEM", "middle")
    )


def pavers(u):
    clip = f"{u}-c"
    x0, y0, s = 36, 40, 12
    bricks = []
    for m in range(-8, 8):
        for k in range(-6, 26):
            hx, hy = x0 + (k + 4 * m) * s, y0 + k * s
            bricks.append(rect(hx, hy, 2 * s, s, "lt"))
            bricks.append(rect(hx, hy + s, s, 2 * s, "lt"))
    layers = [
        ("PAVERS 2-3/8\"", 18, False),
        ("BEDDING SAND 1\"", 14, True),
        ("AGG. BASE 6-12\"", 50, True),
        ("SUBGRADE", 40, True),
    ]
    sec = ""
    y = 70
    for i, (lab, h, hat) in enumerate(layers):
        if hat:
            sec += hatch(286, y, 80, h, f"{u}-s{i}", 5 + i * 3)
        else:
            sec += "".join(rect(286 + j * 20, y, 20, h, "ln") for j in range(4))
        sec += tx(374, y + h / 2 + 3, lab)
        y += h
    return (
        f'<clipPath id="{clip}"><rect x="{x0}" y="{y0}" width="216" height="200"/></clipPath>'
        f'<g clip-path="url(#{clip})">{"".join(bricks)}</g>'
        + rect(x0, y0, 216, 200, "ln")
        + rect(x0 - 6, y0 - 6, 228, 212, "ln acc")
        + tx(144, 34 - 6, "PLAN · 90° HERRINGBONE", "middle")
        + tx(326, 60, "SECTION", "middle")
        + sec
        + leader(x0 + 216, 150, 286, 262, "EDGE RESTRAINT", "start")
    )


def decks(u):
    joists = "".join(ln(x, 64, x, 210, "ln") for x in range(60, 421, 30))
    boards = "".join(ln(240, y, 420, y, "lt") for y in range(68, 210, 7))
    posts = "".join(rect(x - 7, 203, 14, 14, "ln") + circ(x, 238, 11, "dsh") for x in (66, 240, 414))
    return (
        rect(52, 52, 376, 12, "ln acc")
        + joists
        + rect(52, 206, 376, 10, "ln")
        + f'<rect class="ko" x="240" y="66" width="182" height="140" fill-opacity=".75"/>'
        + boards
        + posts
        + leader(140, 58, 160, 26, "LEDGER: BOLTED + FLASHED")
        + leader(120, 140, 90, 270, "JOISTS @ 16\" O.C.", "start")
        + leader(330, 140, 380, 270, "DECK BOARDS", "start")
        + leader(414, 249, 440, 292, "FOOTING", "end")
        + dim_h(60, 90, 38, "16\"")
    )


def interior_painting(u):
    return (
        rect(40, 40, 400, 200, "ln")
        + ln(40, 58, 440, 58, "lt")
        + rect(40, 224, 400, 16, "ln")
        + rect(80, 90, 70, 134, "ln")
        + circ(140, 160, 3, "ln")
        + f'<rect class="af" x="210" y="58" width="90" height="166" fill-opacity=".35"/>'
        + f'<rect class="af" x="300" y="58" width="60" height="166" fill-opacity=".15"/>'
        + rect(300, 126, 70, 18, "ln")
        + path("M370 135 L392 135 L392 172 L386 172", "ln")
        + rect(382, 172, 8, 40, "ln")
        + rect(395, 196, 10, 8, "ln")
        + leader(250, 140, 250, 266, "2 FINISH COATS, EGGSHELL", "middle")
        + leader(420, 232, 452, 266, "SEMI-GLOSS TRIM", "end")
        + leader(330, 58, 330, 24, "FLAT CEILING")
        + leader(115, 120, 30, 24, "PATCH · SAND · PRIME", "start")
    )


def kitchen(u):
    uppers = "".join(rect(x, 50, 40, 70, "ln") + circ(x + 34, 108, 2, "ln") for x in (40, 80, 120))
    uppers2 = "".join(rect(x, 50, 40, 70, "ln") + circ(x + 6, 108, 2, "ln") for x in (320, 360, 400))
    lowers = "".join(rect(x, 176, 40, 60, "ln") + ln(x + 10, 184, x + 30, 184, "lt") for x in (40, 80, 120, 320, 360, 400))
    tile = "".join(ln(40, y, 440, y, "lt") for y in range(132, 166, 11)) + "".join(ln(x, 120, x, 166, "lt") for x in range(48, 440, 22))
    return (
        tile
        + rect(160, 50, 160, 74, "ko")
        + path("M200 50 L280 50 L300 110 L180 110 Z", "ln")
        + rect(180, 110, 120, 8, "ln")
        + uppers
        + uppers2
        + rect(34, 166, 412, 10, "ln acc")
        + rect(170, 176, 140, 60, "ln")
        + rect(180, 196, 120, 34, "ln")
        + "".join(circ(x, 186, 4, "lt") for x in (195, 225, 255, 285))
        + lowers
        + ln(34, 242, 446, 242, "ln")
        + leader(240, 66, 240, 30, "VENTED HOOD", "middle")
        + leader(60, 171, 30, 290, "QUARTZ COUNTERTOP", "start")
        + leader(100, 150, 150, 268, "TILE BACKSPLASH", "start")
        + leader(380, 210, 450, 270, "SOFT-CLOSE CABINETRY", "end")
    )


def bathroom(u):
    tile = "".join(ln(40, y, 440, y, "lt") for y in range(46, 236, 16)) + "".join(ln(x, 40, x, 236, "lt") for x in range(40, 441, 24))
    return (
        tile
        + rect(40, 40, 400, 196, "ln")
        + rect(76, 88, 56, 36, "ko")
        + rect(76, 88, 56, 36, "ln")
        + ln(76, 106, 132, 106, "lt")
        + path("M150 40 L150 236", "dsh")
        + path("M96 48 L96 60 L110 60", "ln")
        + circ(112, 62, 5, "ln")
        + rect(270, 70, 110, 70, "ko")
        + rect(270, 70, 110, 70, "ln")
        + rect(250, 160, 150, 70, "ko")
        + rect(250, 160, 150, 70, "ln")
        + rect(244, 152, 162, 8, "ln")
        + ln(325, 160, 325, 230, "lt")
        + path("M40 236 L40 40", "ln acc")
        + path("M40 236 L150 236", "ln acc")
        + leader(104, 106, 30, 270, "WATERPROOF MEMBRANE BEHIND TILE", "start")
        + leader(150, 150, 180, 22, "FRAMELESS GLASS")
        + leader(325, 105, 452, 22, "MIRROR / MED. CABINET", "end")
        + leader(380, 200, 452, 270, "VANITY", "end")
    )


def basement(u):
    return (
        hatch(30, 110, 60, 150, f"{u}-g", 10)
        + ln(30, 110, 160, 110, "ln")
        + rect(90, 60, 24, 200, "ln")
        + rect(114, 120, 10, 140, "ln acc")
        + rect(128, 120, 10, 140, "lt")
        + rect(140, 120, 6, 140, "ln")
        + rect(90, 260, 360, 14, "ln")
        + hatch(90, 274, 360, 10, f"{u}-s", 6)
        + ln(90, 60, 450, 60, "ln")
        + "".join(rect(x, 60, 8, 22, "lt") for x in range(150, 450, 40))
        + rect(146, 252, 304, 8, "ln")
        + path("M30 110 Q30 70 70 70 L90 70", "lt")
        + leader(119, 140, 190, 140, "RIGID FOAM @ FOUNDATION")
        + leader(133, 172, 190, 166, "STUD WALL (PT PLATE)")
        + leader(143, 200, 190, 192, "MOLD-RESISTANT DRYWALL")
        + leader(300, 254, 240, 232, "BELOW-GRADE-RATED FLOORING")
        + tx(60, 104, "GRADE", "middle")
        + tx(300, 100, "FINISHED BASEMENT", "middle", "tx tx--b")
    )


def flooring(u):
    planks = []
    import random

    rnd = random.Random(7)
    for i, y in enumerate(range(40, 180, 20)):
        x = 40 - rnd.randint(0, 100)
        while x < 440:
            w = rnd.choice([120, 150, 180])
            planks.append(ln(max(x, 40), y, max(x, 40), y + 20, "lt") if x > 40 else "")
            x += w
        planks.append(ln(40, y, 440, y, "lt"))
    return (
        "".join(planks)
        + rect(40, 40, 400, 140, "ln")
        + tx(240, 30, "PLAN · STAGGERED JOINTS", "middle")
        + rect(40, 200, 400, 10, "ln acc")
        + rect(40, 210, 400, 4, "lt")
        + rect(40, 214, 400, 12, "ln")
        + "".join(rect(x, 226, 10, 24, "ln") for x in range(60, 440, 64))
        + leader(120, 205, 60, 280, "WOOD / LVP / TILE", "start")
        + leader(250, 212, 200, 280, "UNDERLAYMENT", "start")
        + leader(400, 220, 452, 296, "SUBFLOOR: SCREWED + LEVEL", "end")
    )


def renovation(u):
    swing = lambda x, y, r, a: path(f"M{x} {y} L{x + r} {y} A{r} {r} 0 0 {a} {x} {y - r if a else y + r}", "lt")
    return (
        rect(40, 40, 400, 200, "ln")
        + rect(46, 46, 388, 188, "lt")
        + ln(220, 46, 220, 140, "ln")
        + ln(220, 170, 220, 234, "ln")
        + ln(46, 150, 150, 150, "ln")
        + ln(180, 150, 220, 150, "ln")
        + path("M320 46 L320 234", "dsh acc")
        + ln(220, 120, 320, 120, "ln")
        + swing(150, 150, 30, 0)
        + swing(220, 140, 30, 1)
        + tx(130, 100, "KITCHEN", "middle", "tx tx--b")
        + tx(100, 200, "BATH", "middle", "tx tx--b")
        + tx(380, 140, "LIVING", "middle", "tx tx--b")
        + tx(270, 90, "DINING", "middle", "tx tx--b")
        + leader(320, 190, 452, 270, "REMOVE WALL · NEW BEAM PER ENG.", "end")
        + dim_h(40, 440, 26, "EXISTING FOOTPRINT")
    )


def addition(u):
    return (
        rect(60, 120, 200, 130, "ln")
        + path("M50 122 L160 50 L270 122", "ln")
        + rect(90, 150, 40, 50, "ln")
        + rect(190, 150, 40, 50, "ln")
        + rect(140, 200, 34, 50, "ln")
        + path("M260 250 L260 150 L420 150 L420 250", "dsh acc")
        + path("M250 152 L340 100 L430 152", "dsh acc")
        + rect(310, 180, 60, 40, "dsh acc")
        + ln(30, 250, 450, 250, "ln")
        + tx(340, 140, "NEW ADDITION", "middle", "tx tx--b acc-t")
        + tx(160, 112, "EXISTING", "middle", "tx tx--b")
        + dim_h(260, 420, 270, "PER ZONING")
        + leader(262, 200, 300, 40, "TIE-IN: ROOF, SIDING, FLOORS")
    )


def condo(u):
    wins = []
    for r in range(10):
        for c in range(6):
            x, y = 60 + c * 28, 36 + r * 21
            cls = "ln acc" if (r, c) == (3, 3) else "lt"
            if (r, c) == (3, 3):
                wins.append(f'<rect class="af" x="{x}" y="{y}" width="18" height="13" fill-opacity=".6"/>')
            wins.append(rect(x, y, 18, 13, cls))
    return (
        rect(50, 26, 178, 236, "ln")
        + rect(44, 20, 190, 6, "ln")
        + "".join(wins)
        + rect(120, 246, 38, 16, "ln")
        + ln(20, 262, 300, 262, "ln")
        + leader(153, 105, 260, 60, "YOUR UNIT")
        + tx(264, 90, "✓ COI: BLDG + BOARD + AGENT")
        + tx(264, 106, "✓ ALTERATION AGREEMENT")
        + tx(264, 122, "✓ BUILDING WORK HOURS")
        + tx(264, 138, "✓ ELEVATOR BOOKED")
    )


def storefront(u):
    stripes = "".join(path(f"M{x} 128 L{x - 8} 150", "lt") for x in range(108, 380, 16))
    return (
        rect(70, 30, 340, 230, "ln")
        + "".join(rect(x, 44, 50, 40, "ln") for x in (100, 215, 330))
        + rect(80, 96, 320, 28, "ln acc")
        + tx(240, 115, "YOUR STORE", "middle", "tx tx--sign")
        + path("M90 128 L390 128 L380 150 L100 150 Z", "ln")
        + stripes
        + rect(90, 156, 300, 104, "ln")
        + ln(170, 156, 170, 260, "lt")
        + ln(310, 156, 310, 260, "lt")
        + rect(214, 170, 52, 90, "ln")
        + ln(240, 170, 240, 260, "lt")
        + ln(40, 260, 440, 260, "ln")
        + leader(380, 100, 452, 16, "SIGN BAND", "end")
        + leader(384, 140, 452, 292, "AWNING", "end")
        + leader(130, 200, 30, 292, "STOREFRONT GLAZING", "start")
    )


DRAWINGS = {
    "roofing": (roofing, "Roof assembly"),
    "roof_repair": (roof_repair, "Parapet leak repair"),
    "siding": (siding, "Siding + window flashing"),
    "exterior_painting": (exterior_painting, "Exterior paint system"),
    "pavers": (pavers, "Paver plan + section"),
    "decks": (decks, "Deck framing plan"),
    "interior_painting": (interior_painting, "Interior wall elevation"),
    "kitchen": (kitchen, "Kitchen elevation"),
    "bathroom": (bathroom, "Bathroom elevation"),
    "basement": (basement, "Basement wall section"),
    "flooring": (flooring, "Flooring plan + section"),
    "renovation": (renovation, "Renovation floor plan"),
    "addition": (addition, "Addition elevation"),
    "condo": (condo, "Building elevation"),
    "storefront": (storefront, "Storefront elevation"),
}


def drawing(key, uid, n=1, alt=None):
    fn, title = DRAWINGS[key]
    return wrap(fn(uid), title, n, uid, alt or f"Technical drawing: {title}")


# ---------------------------------------------------------------- hero elevation


def hero_house(mode):
    """Front elevation of a Staten Island two-family. mode = 'plan' | 'built'."""
    p = mode == "plan"
    u = "hp" if p else "hb"
    S = 'stroke="currentColor"' if p else 'stroke="#1b2733"'

    def f(color):
        return 'fill="none"' if p else f'fill="{color}"'

    sw = 'stroke-width="1.6"'
    sw_t = 'stroke-width="0.8"'
    o = []
    o.append(f'<svg class="build__svg build__svg--{mode}" viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">')
    if p:
        o.append('<rect width="800" height="520" class="bp-bg"/>')
        grid = "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="520" class="bp-grid"/>' for x in range(0, 801, 20))
        grid += "".join(f'<line x1="0" y1="{y}" x2="800" y2="{y}" class="bp-grid"/>' for y in range(0, 521, 20))
        o.append(grid)
    else:
        o.append(
            f'<defs><linearGradient id="{u}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfd8ee"/><stop offset="1" stop-color="#f1e9da"/></linearGradient></defs>'
            f'<rect width="800" height="520" fill="url(#{u}-sky)"/>'
            '<circle cx="660" cy="90" r="34" fill="#ffd38a" opacity=".85"/>'
        )
    g = f'<g {S} {sw} stroke-linejoin="round">'
    o.append(g)
    # neighbours
    o.append(f'<path d="M0 470 L0 230 L120 160 L215 215 L215 470" {f("#cfc6b6")} {sw_t} opacity="{0.55 if p else 1}"/>')
    o.append(f'<path d="M585 470 L585 225 L680 165 L800 235 L800 470" {f("#d6cfc0")} {sw_t} opacity="{0.55 if p else 1}"/>')
    for x in (40, 130):
        o.append(f'<rect x="{x}" y="270" width="44" height="56" {f("#9fb5c8")} {sw_t} opacity="{0.55 if p else 1}"/>')
    for x in (620, 710):
        o.append(f'<rect x="{x}" y="270" width="44" height="56" {f("#9fb5c8")} {sw_t} opacity="{0.55 if p else 1}"/>')
    # main body
    o.append(f'<rect x="230" y="200" width="340" height="180" {f("#7d9a8c")}/>')
    o.append(f'<rect x="230" y="380" width="340" height="90" {f("#a4553a")}/>')
    # siding laps
    o.append(f'<clipPath id="{u}-wall"><rect x="230" y="200" width="340" height="180"/></clipPath>')
    laps = "".join(f'<line x1="230" y1="{y}" x2="570" y2="{y}"/>' for y in range(210, 380, 10))
    o.append(f'<g clip-path="url(#{u}-wall)" {sw_t} opacity="{0.6 if p else 0.35}">{laps}</g>')
    # brick coursing on the garage level
    bricks = "".join(f'<line x1="230" y1="{y}" x2="570" y2="{y}"/>' for y in range(388, 470, 8))
    o.append(f'<g {sw_t} opacity="{0.45 if p else 0.3}">{bricks}</g>')
    # roof
    o.append(f'<clipPath id="{u}-roof"><polygon points="212,204 400,92 588,204"/></clipPath>')
    o.append(f'<polygon points="212,204 400,92 588,204" {f("#3a3f46")}/>')
    shing = "".join(f'<line x1="200" y1="{y}" x2="600" y2="{y}"/>' for y in range(104, 204, 9))
    o.append(f'<g clip-path="url(#{u}-roof)" {sw_t} opacity="{0.6 if p else 0.45}" stroke="{"currentColor" if p else "#9aa3ad"}">{shing}</g>')
    o.append(f'<path d="M206 206 L400 86 L594 206" fill="none" stroke-width="2.4"/>')
    # gable vent
    o.append(f'<circle cx="400" cy="156" r="16" {f("#f3efe6")}/>')
    o.append(f'<path d="M386 156 H414 M400 142 V170" {sw_t}/>')
    # windows
    for y in (220, 300):
        for x in (258, 374, 490):
            o.append(f'<rect x="{x - 6}" y="{y - 6}" width="64" height="72" {f("#f3efe6")}/>')
            o.append(f'<rect x="{x}" y="{y}" width="52" height="60" {f("#5b7e9e")}/>')
            o.append(f'<path d="M{x + 26} {y} V{y + 60} M{x} {y + 30} H{x + 52}" {sw_t} stroke="{"currentColor" if p else "#f3efe6"}"/>')
            if not p:
                o.append(f'<path d="M{x + 6} {y + 24} L{x + 20} {y + 6}" stroke="#ffffff" stroke-width="2" opacity=".5"/>')
    # garage door
    o.append(f'<rect x="248" y="392" width="150" height="78" {f("#ece6da")}/>')
    o.append("".join(f'<line x1="248" y1="{y}" x2="398" y2="{y}" {sw_t}/>' for y in (411, 431, 451)))
    # entry door + stoop
    o.append(f'<rect x="468" y="384" width="46" height="74" {f("#ff5a1f")}/>')
    o.append(f'<circle cx="506" cy="424" r="2.5" {f("#1b2733")}/>')
    o.append(f'<rect x="458" y="378" width="66" height="6" {f("#f3efe6")}/>')
    o.append(f'<path d="M454 458 H530 V464 H454 Z M448 464 H536 V470 H448 Z" {f("#c9c2b4")}/>')
    # ground + driveway
    o.append('<line x1="0" y1="470" x2="800" y2="470" stroke-width="2.4"/>')
    o.append(f'<path d="M248 470 L398 470 L430 520 L214 520 Z" {f("#b9a58b")}/>')
    pv = "".join(f'<line x1="214" y1="{y}" x2="430" y2="{y}"/>' for y in range(478, 520, 9))
    o.append(f'<clipPath id="{u}-drive"><path d="M248 470 L398 470 L430 520 L214 520 Z"/></clipPath>')
    o.append(f'<g clip-path="url(#{u}-drive)" {sw_t} opacity=".55">{pv}' + "".join(f'<line x1="{x}" y1="470" x2="{x + (x - 323) * 0.35}" y2="520"/>' for x in range(256, 400, 16)) + "</g>")
    # tree
    o.append(f'<path d="M680 470 V380" stroke-width="5" stroke="{"currentColor" if p else "#6b4b32"}"/>')
    o.append(f'<circle cx="680" cy="350" r="52" {f("#6f9a63")} {sw}/>')
    o.append(f'<circle cx="650" cy="372" r="30" {f("#5f8a55")} {sw_t}/>')
    # fence
    o.append("".join(f'<rect x="{x}" y="440" width="8" height="30" {f("#f3efe6")} {sw_t}/>' for x in range(30, 210, 14)))
    o.append("</g>")
    if p:
        o.append('<g class="bp-anno">')
        o.append(_hero_dims())
        o.append("</g>")
    o.append("</svg>")
    return "".join(o)


def _hero_dims():
    a = []
    a.append('<g stroke="currentColor" stroke-width="1" fill="none">')
    a.append('<path d="M230 492 H570 M230 486 V498 M570 486 V498 M226 496 L234 488 M566 496 L574 488"/>')
    a.append('<path d="M612 470 V86 M606 470 H618 M606 86 H618 M608 474 L616 466 M608 90 L616 82"/>')
    a.append('<path d="M250 120 L180 70 H90 M300 290 L160 250 H60 M330 500 L330 510 M520 420 L640 420 H700"/>')
    a.append("</g>")
    a.append('<g fill="currentColor" font-family="JetBrains Mono, monospace" font-size="12" letter-spacing=".06em">')
    a.append('<rect x="362" y="485" width="76" height="14" class="bp-bg" stroke="none"/><text x="400" y="496" text-anchor="middle">34\'-0"</text>')
    a.append('<g transform="rotate(-90 612 280)"><rect x="574" y="273" width="76" height="14" class="bp-bg" stroke="none"/><text x="612" y="284" text-anchor="middle">32\'-6"</text></g>')
    a.append('<text x="88" y="64" text-anchor="start">ARCH. SHINGLE ROOF</text>')
    a.append('<text x="58" y="244" text-anchor="start">VINYL LAP SIDING</text>')
    a.append('<text x="642" y="414" text-anchor="start">ENTRY</text>')
    a.append('<text x="24" y="508" text-anchor="start">FRONT ELEVATION · 1/4" = 1\'-0"</text>')
    a.append("</g>")
    return "".join(a)
