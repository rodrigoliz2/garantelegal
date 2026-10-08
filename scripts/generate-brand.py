"""Generate portable SVG masters from locally licensed OFL font outlines."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'brand'
NAVY = '#101F32'
GOLD = '#B9955B'
IVORY = '#F5F0E6'
WHITE = '#FFFFFF'
BLACK = '#000000'

class OutlineFont:
    def __init__(self, filename):
        self.font = TTFont(ROOT / 'src' / 'fonts' / filename)
        self.glyphs = self.font.getGlyphSet()
        self.cmap = self.font.getBestCmap()
        self.units = self.font['head'].unitsPerEm
        self.metrics = self.font['hmtx'].metrics
    def text(self, content, size, center_x, baseline, spacing, color):
        scale = size / self.units
        names = [self.cmap[ord(ch)] for ch in content]
        width = sum(self.metrics[name][0] * scale for name in names) + spacing * (len(names) - 1)
        cursor = center_x - width / 2
        paths = []
        for name in names:
            pen = SVGPathPen(self.glyphs)
            self.glyphs[name].draw(pen)
            if pen.getCommands():
                paths.append(f'<path d="{pen.getCommands()}" fill="{color}" transform="translate({cursor:.2f} {baseline:.2f}) scale({scale:.6f} {-scale:.6f})"/>')
            cursor += self.metrics[name][0] * scale + spacing
        return ''.join(paths)

cinzel = OutlineFont('cinzel-600.woff2')
cormorant = OutlineFont('cormorant-garamond-600.woff2')
manrope = OutlineFont('manrope-600.woff2')

def svg(w, h, content, background=None):
    bg = f'<rect width="{w}" height="{h}" fill="{background}"/>' if background else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-label="Garante Jurídico">{bg}{content}</svg>'

def monogram(cx, top, size, main=NAVY, accent=GOLD):
    # The approved raster uses a custom serif G. This vector approximation uses
    # a Cormorant outline and reconstructs the central column at matching scale.
    g = cormorant.text('G', size * .94, cx, top + size * .82, 0, main)
    left = cx - size * .052
    beam = f'<path d="M {left-size*.11:.2f} {top+size*.31:.2f} H {left+size*.19:.2f} V {top+size*.35:.2f} H {left-size*.11:.2f} Z" fill="{accent}"/>'
    shafts = ''.join(f'<path d="M {left+i*size*.063:.2f} {top+size*.375:.2f} h {size*.038:.2f} v {size*.38:.2f} l {-size*.019:.2f} {size*.07:.2f} l {-size*.019:.2f} {-size*.07:.2f} Z" fill="{accent}"/>' for i in range(3))
    return g + beam + shafts

def full_wordmark(cx, baseline, scale, main=NAVY, accent=GOLD):
    return (cinzel.text('GARANTE', 93*scale, cx, baseline, 3*scale, main)
            + f'<path d="M {cx-280*scale:.2f} {baseline+34*scale:.2f} h {65*scale:.2f} M {cx+215*scale:.2f} {baseline+34*scale:.2f} h {65*scale:.2f}" stroke="{accent}" stroke-width="{2*scale}"/>'
            + manrope.text('JURÍDICO', 35*scale, cx, baseline+48*scale, 14*scale, accent)
            + manrope.text('SOLUCIONES LEGALES ESTRATÉGICAS', 15*scale, cx, baseline+91*scale, 4*scale, main))

OUT.mkdir(exist_ok=True)
files = {
 'logo-primary.svg': svg(800, 600, monogram(400, 30, 275) + full_wordmark(400, 420, 1.0), IVORY),
 'logo-horizontal-dark.svg': svg(1200, 350, monogram(175, 31, 285, WHITE) + f'<path d="M 350 48 V 302" stroke="{GOLD}" stroke-width="2"/>' + full_wordmark(780, 157, .77, WHITE), NAVY),
 'logo-header-negative.svg': svg(500, 120, monogram(65, 2, 112, WHITE) + cinzel.text('GARANTE', 51, 315, 62, 2, WHITE) + manrope.text('JURÍDICO', 16, 315, 99, 7, GOLD)),
 'logo-negative.svg': svg(1200, 350, monogram(175, 31, 285, WHITE) + f'<path d="M 350 48 V 302" stroke="{GOLD}" stroke-width="2"/>' + full_wordmark(780, 157, .77, WHITE)),
 'logo-mono-black.svg': svg(800, 600, monogram(400, 30, 275, BLACK, BLACK) + full_wordmark(400, 420, 1.0, BLACK, BLACK)),
 'logo-mono-white.svg': svg(800, 600, monogram(400, 30, 275, WHITE, WHITE) + full_wordmark(400, 420, 1.0, WHITE, WHITE)),
 'isotype.svg': svg(512, 512, monogram(256, 56, 420), IVORY),
 'isotype-dark.svg': svg(512, 512, monogram(256, 56, 420, WHITE), NAVY),
 'og.svg': svg(1200, 630, monogram(600, 30, 280, WHITE) + full_wordmark(600, 438, .93, WHITE) + manrope.text('GUADALAJARA · ATENCIÓN NACIONAL', 21, 600, 590, 3, WHITE), NAVY),
}
for name, content in files.items():
    (OUT / name).write_text(content, encoding='utf-8')
    print(name)

TEMPLATES = OUT / 'templates'
TEMPLATES.mkdir(exist_ok=True)
templates = {
 'business-card.svg': svg(1050, 600, monogram(245, 75, 430, WHITE) + full_wordmark(740, 245, .57, WHITE) + f'<path d="M 530 365 H 960" stroke="{GOLD}" stroke-width="2"/><text x="535" y="420" fill="{WHITE}" font-family="sans-serif" font-size="25">[PENDIENTE: nombre y cargo]</text><text x="535" y="465" fill="{WHITE}" font-family="sans-serif" font-size="22">[PENDIENTE: correo y dirección]</text>', NAVY),
 'letterhead.svg': svg(816, 1056, full_wordmark(260, 105, .38) + f'<path d="M 50 195 H 766 M 50 975 H 766" stroke="{GOLD}" stroke-width="2"/><text x="50" y="1015" fill="{NAVY}" font-family="sans-serif" font-size="15">[PENDIENTE: dirección y correo] · Guadalajara, Jalisco</text>', WHITE),
 'proposal-cover.svg': svg(816, 1056, monogram(408, 85, 340, WHITE) + full_wordmark(408, 570, .63, WHITE) + f'<path d="M 90 760 H 726" stroke="{GOLD}" stroke-width="3"/><text x="90" y="835" fill="{WHITE}" font-family="sans-serif" font-size="34">[Título de propuesta]</text><text x="90" y="890" fill="{WHITE}" font-family="sans-serif" font-size="20">[Cliente] · [Fecha]</text>', NAVY),
 'legal-cover.svg': svg(816, 1056, full_wordmark(408, 220, .60) + f'<path d="M 90 390 H 726" stroke="{GOLD}" stroke-width="3"/><text x="90" y="490" fill="{NAVY}" font-family="sans-serif" font-size="32">[Título del documento jurídico]</text><text x="90" y="545" fill="{NAVY}" font-family="sans-serif" font-size="20">[Asunto] · [Fecha]</text><path d="M 90 950 H 726" stroke="{GOLD}" stroke-width="2"/>', IVORY),
 'social-post.svg': svg(1080, 1080, monogram(540, 80, 300, WHITE) + full_wordmark(540, 510, .70, WHITE) + f'<path d="M 130 740 H 950" stroke="{GOLD}" stroke-width="2"/><text x="130" y="825" fill="{WHITE}" font-family="sans-serif" font-size="44">[Titular institucional]</text><text x="130" y="895" fill="{WHITE}" font-family="sans-serif" font-size="24">[Texto breve revisado por el despacho]</text>', NAVY),
 'email-header.svg': svg(1200, 260, monogram(130, 15, 230, WHITE) + full_wordmark(740, 115, .57, WHITE), NAVY),
}
for name, content in templates.items():
    (TEMPLATES / name).write_text(content, encoding='utf-8')
    print('templates/' + name)
