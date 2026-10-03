"""Builds the 1200x630 link-preview images in public/og/ from the case covers.
Run it by hand when a cover or a title changes: python scripts/make_og.py
The home page keeps public/og-image.jpg."""
from PIL import Image, ImageDraw, ImageFont, ImageOps
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = os.path.join(ROOT, 'scripts', 'fonts', 'BricolageGrotesque.ttf')
OUT = os.path.join(ROOT, 'public', 'og')
os.makedirs(OUT, exist_ok=True)
W, H = 1200, 630

def font(size, weight):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_axes([min(max(size, 12), 96), weight, 100])   # optical size, weight, width
    return f

def wrap(draw, text, f, width):
    lines, cur = [], ''
    for word in text.split():
        t = (cur + ' ' + word).strip()
        if draw.textlength(t, font=f) <= width: cur = t
        else: lines.append(cur); cur = word
    if cur: lines.append(cur)
    return lines

cases = [
    dict(slug='wijha', cover='public/case/wijha/cover.webp', bg=(15, 59, 52), eyebrow='UX concept · B2B SaaS', title='Wijha: the dispatch engine that explains every assignment', focus=(0.72, 0.5)),
    dict(slug='stc-inspector', cover='public/case/stc-inspector/cover.webp', bg=(58, 0, 104), eyebrow='UX case study · Field inspection · 2025', title='STC Inspector: one workflow for the inspector and the admin', focus=(0.3, 0.62)),
    dict(slug='fan-id', cover='public/case/fan-id/cover.webp', bg=(24, 58, 142), eyebrow='UX case study · Digital identity · 2025', title='Fan-ID for the AFC Asian Cup', focus=(0.5, 0.3)),
    dict(slug='smart-book-fair', cover='public/case/book-fair/cover.webp', bg=(11, 61, 74), eyebrow='Experience design · Book fair · 2025', title='Smart Book Fair: a complete digital visitor experience', focus=(0.3, 0.95)),
    dict(slug='film-saudi', cover='public/case/film-saudi/cover.webp', bg=(23, 58, 86), eyebrow='UX audit · Heuristic evaluation · 2025', title='Film Saudi: a UX audit of the platform', focus=(0.5, 0.5)),
]

for c in cases:
    img = Image.new('RGB', (W, H), c['bg'])
    d = ImageDraw.Draw(img, 'RGBA')
    # cover, right side, rounded
    size = 474
    cover = Image.open(os.path.join(ROOT, c['cover'])).convert('RGB')
    cover = ImageOps.fit(cover, (size, size), Image.LANCZOS, centering=c['focus'])
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), 30, fill=255)
    cx, cy = W - 72 - size, (H - size) // 2
    d.rounded_rectangle((cx - 1, cy - 1, cx + size, cy + size), 31, outline=(255, 255, 255, 60), width=2)
    img.paste(cover, (cx, cy), mask)
    # text, left side
    left, width = 72, cx - 72 - 56
    d.text((left, 84), c['eyebrow'].upper(), font=font(22, 600), fill=(255, 255, 255, 170))
    tf = font(70, 760)
    lines = wrap(d, c['title'], tf, width)
    while len(lines) > 4 or max(d.textlength(l, font=tf) for l in lines) > width:
        tf = font(tf.size - 4, 760); lines = wrap(d, c['title'], tf, width)
    y = 150
    for line in lines:
        d.text((left, y), line, font=tf, fill=(255, 255, 255, 255))
        y += int(tf.size * 1.08)
    d.text((left, H - 120), 'Mohamed Higazy', font=font(34, 700), fill=(255, 255, 255, 255))
    d.text((left, H - 76), 'CX / UX Designer', font=font(26, 500), fill=(255, 255, 255, 190))
    path = os.path.join(OUT, c['slug'] + '.jpg')
    img.save(path, 'JPEG', quality=88, optimize=True, progressive=False)
    print(c['slug'], img.size, os.path.getsize(path) // 1024, 'KB')
