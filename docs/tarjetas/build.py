#!/usr/bin/env python3
"""Genera docs/tarjetas/index.html a partir de template.html.

Datos editables abajo (DOMAIN, WSP_*). Los QR se generan como SVG vectorial
con segno (pip install segno). Despues: `node docs/tarjetas/render.mjs` para
PDFs de imprenta y previews PNG.
"""
from pathlib import Path
import json
import segno

HERE = Path(__file__).resolve().parent

# --- Datos ----------------------------------------------------------------
DOMAIN = "lucianodlf.com.ar"            # se imprime como link web
QR_PATH = "/pbcard"                      # destino del QR principal
WSP_DIGITS = "5493425133628"            # formato wa.me: 54 9 <area> <numero>, sin + ni espacios
WSP_TEXT = "+54 9 3425 13-3628"         # como se imprime
LINKEDIN = "lucianodelfino"
GITHUB = "lucianodlf"
LINKEDIN_PATH = f"in/{LINKEDIN}"          # D5 (con iconos)
GITHUB_URL = f"github.com/{GITHUB}"

MAIN_URL = f"https://{DOMAIN}{QR_PATH}"
WSP_URL = f"https://wa.me/{WSP_DIGITS}"
BORDER = 4  # quiet zone en modulos (regla del DS)


def icon(name):
    """Icono Phosphor (MIT) inline, monocromo (currentColor)."""
    svg = (HERE / "icons" / f"{name}-bold.svg").read_text().strip()
    return svg.replace(' xmlns="http://www.w3.org/2000/svg"', ' aria-hidden="true"')


def qr(data, error):
    q = segno.make(data, error=error, micro=False)
    rows = [list(r) for r in q.matrix]
    n = len(rows)
    size = n + 2 * BORDER
    d = []
    for y, row in enumerate(rows):
        x = 0
        while x < n:
            if row[x]:
                s = x
                while x < n and row[x]:
                    x += 1
                d.append(f"M{s + BORDER} {y + BORDER}h{x - s}v1h-{x - s}z")
            else:
                x += 1
    svg = (
        f'<svg viewBox="0 0 {size} {size}" shape-rendering="crispEdges" aria-hidden="true">'
        f'<rect width="{size}" height="{size}" fill="var(--qr-ground)"/>'
        f'<path fill="var(--qr-ink)" d="{"".join(d)}"/></svg>'
    )
    return q, size, svg


def main():
    qm, nm, svg_main = qr(MAIN_URL, "m")
    qw, nw, svg_wsp = qr(WSP_URL, "l")
    meta = {
        "main": {"data": MAIN_URL, "version": qm.version, "error": qm.error, "modules": nm},
        "wsp": {"data": WSP_URL, "version": qw.version, "error": qw.error, "modules": nw},
    }
    html = (HERE / "template.html").read_text(encoding="utf-8")
    repl = {
        "{{QR_MAIN}}": svg_main,
        "{{QR_WSP}}": svg_wsp,
        "{{DOMAIN}}": DOMAIN,
        "{{MAIN_URL}}": MAIN_URL,
        "{{WSP_TEXT}}": WSP_TEXT,
        "{{LINKEDIN}}": LINKEDIN,
        "{{GITHUB}}": GITHUB,
        "{{LINKEDIN_PATH}}": LINKEDIN_PATH,
        "{{GITHUB_URL}}": GITHUB_URL,
        "{{I_WEB}}": icon("globe"),
        "{{I_IN}}": icon("linkedin-logo"),
        "{{I_GH}}": icon("github-logo"),
        "{{I_WSP}}": icon("whatsapp-logo"),
        "{{MAIN_V}}": f"v{qm.version}-{qm.error}",
        "{{WSP_V}}": f"v{qw.version}-{qw.error}",
        "{{MAIN_N}}": str(nm),
        "{{WSP_N}}": str(nw),
        "{{META}}": json.dumps(meta),
    }
    for k, v in repl.items():
        html = html.replace(k, v)
    (HERE / "index.html").write_text(html, encoding="utf-8")
    print(json.dumps(meta, indent=2))


if __name__ == "__main__":
    main()
