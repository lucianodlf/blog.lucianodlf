# Tarjetas personales

Diseños de tarjeta 85 x 54 mm (250 g) sobre el design system lucianodlf.
Diez diseños (S1-S4 simple faz, D1-D6 doble faz) en light y dark, más la tarjeta de prueba QT.

- `index.html`: galería (generada, no editar a mano).
- `template.html`: diseños (HTML/CSS en mm).
- `build.py`: datos (dominio, WhatsApp) y QR vectoriales. Requiere `pip install segno`.
- `render.mjs`: PDFs de imprenta en `print/` (91 x 60 mm, 3 mm de sangrado) y PNG en `preview/`. Requiere Playwright.
- `verify.py`: decodifica los QR de `preview/`. Requiere `pip install zxing-cpp pillow`.

Para cambiar dominio o número: editar `DOMAIN`, `WSP_DIGITS` y `WSP_TEXT` en `build.py`, luego:

```bash
python3 docs/tarjetas/build.py && node docs/tarjetas/render.mjs && python3 docs/tarjetas/verify.py
```

Los iconos de `icons/` son de [Phosphor Icons](https://phosphoricons.com) (MIT), peso bold, usados en D5.
