#!/usr/bin/env python3
"""Decodifica los QR de cada preview PNG (zxing-cpp) a resolución completa y
degradada (simula una cámara a ~150 y ~100 dpi con desenfoque)."""
from pathlib import Path
import zxingcpp
from PIL import Image, ImageFilter

prev = Path(__file__).resolve().parent / "preview"
MM = 85.0
for png in sorted(prev.glob("*.png")):
    im = Image.open(png).convert("L")
    res = []
    for dpi in (None, 150, 100):
        t = im
        if dpi:
            w = round(MM / 25.4 * dpi)
            t = im.resize((w, round(w * im.height / im.width)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.6))
        found = sorted({b.text for b in zxingcpp.read_barcodes(t)})
        res.append(f"{dpi or 'full'}:{len(found)}")
        if dpi is None:
            urls = found
    print(f"{png.name:28} {' '.join(res):24} {' | '.join(urls)}")
