// Genera los derivados del isotipo a partir de static/brand/isotipo.svg (fuente unica).
// Uso: node scripts/build-brand.mjs
// Requiere un chrome headless: variable CHROME o ~/.cache/ms-playwright/chromium_headless_shell-*/.
// Salida: static/favicon.svg, static/favicon-16x16.png, static/favicon-32x32.png, static/apple-touch-icon.png
import { readFileSync, writeFileSync, readdirSync, mkdtempSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { homedir, tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(join(root, "static/brand/isotipo.svg"), "utf8");

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const base = join(homedir(), ".cache/ms-playwright");
  for (const d of existsSync(base) ? readdirSync(base).sort().reverse() : []) {
    if (!d.startsWith("chromium_headless_shell")) continue;
    for (const sub of readdirSync(join(base, d))) {
      const bin = join(base, d, sub, "chrome-headless-shell");
      if (existsSync(bin)) return bin;
    }
  }
  throw new Error("No se encontro chrome headless; definir CHROME=/ruta/al/binario");
}

// favicon.svg: mismo archivo (con esquinas redondeadas)
writeFileSync(join(root, "static/favicon.svg"), src);

// PNG: cuadrado sin esquinas redondeadas (los iconos de plataforma las aplican solos)
const square = src.replace(' rx="4"', "");
const tmp = mkdtempSync(join(tmpdir(), "brand-"));
const chrome = findChrome();
for (const [size, out] of [[16, "favicon-16x16.png"], [32, "favicon-32x32.png"], [180, "apple-touch-icon.png"]]) {
  const f = join(tmp, `${size}.svg`);
  writeFileSync(f, square.replace("<svg ", `<svg width="${size}" height="${size}" `));
  execFileSync(chrome, ["--no-sandbox", "--hide-scrollbars", `--screenshot=${join(root, "static", out)}`, `--window-size=${size},${size}`, "--force-device-scale-factor=1", "file://" + f], { stdio: "ignore" });
  console.log("ok", out);
}
