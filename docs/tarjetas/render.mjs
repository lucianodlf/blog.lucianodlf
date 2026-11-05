// Genera PDFs al corte (85 x 54 mm), PDFs de imprenta con sangrado (91 x 60 mm, *-sangrado.pdf) y previews PNG.
// Uso: node docs/tarjetas/render.mjs [ID ...]   (sin IDs: todos; requiere playwright y docs/tarjetas/index.html)
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const { chromium } = createRequire(import.meta.url)("playwright");
const url = pathToFileURL(join(here, "index.html")).href;
const all = ["S1", "S2", "S3", "S4", "D1", "D2", "D3", "D4", "D5", "R2", "R3", "R4", "R5", "QT"];
const ids = process.argv.length > 2 ? process.argv.slice(2) : all;
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
    await page.pdf({ path: join(outPdf, `${name}-sangrado.pdf`), preferCSSPageSize: true, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    // PDF al corte final 85 x 54 mm (sin sangrado)
    const trim = await browser.newPage();
    await trim.goto(`${url}#print=${id}&theme=${th}&bleed=0`);
    await trim.evaluate(() => document.fonts.ready);
    await trim.waitForTimeout(150);
    await trim.pdf({ path: join(outPdf, `${name}.pdf`), preferCSSPageSize: true, printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await trim.close();
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
