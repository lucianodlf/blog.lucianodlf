// Genera PDFs de imprenta (91 x 60 mm, 3 mm de sangrado) y previews PNG.
// Uso: node docs/tarjetas/render.mjs   (requiere playwright y docs/tarjetas/index.html)
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const { chromium } = createRequire(import.meta.url)("playwright");
const url = pathToFileURL(join(here, "index.html")).href;
const ids = ["S1", "S2", "S3", "S4", "D1", "D2", "D3", "D4", "QT"];
const themes = ["light", "dark"];
const outPdf = join(here, "print");
const outPng = join(here, "preview");
mkdirSync(outPdf, { recursive: true });
mkdirSync(outPng, { recursive: true });

const browser = await chromium.launch();
for (const id of ids) {
  for (const th of themes) {
    const page = await browser.newPage({ deviceScaleFactor: 4 });
    await page.goto(`${url}#print=${id}&theme=${th}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const name = `${id}-${th}`;
    await page.pdf({ path: join(outPdf, `${name}.pdf`), width: "91mm", height: "60mm", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    // PNG por cara, recortado al formato final (sin sangrado)
    const cards = await page.$$(".sheet .card");
    for (let i = 0; i < cards.length; i++) {
      const box = await cards[i].boundingBox();
      const side = cards.length > 1 ? (i === 0 ? "-frente" : "-dorso") : "";
      await page.screenshot({ path: join(outPng, `${name}${side}.png`), clip: box });
    }
    await page.close();
  }
}
await browser.close();
console.log("ok");
