// Genera los recursos de marca monocromos (favicon, íconos PWA, Apple Touch Icon e
// imagen para compartir) con Host Grotesk. Requiere red para cargar la fuente.
//   node scripts/render-mono-brand.mjs
import { chromium } from "playwright";
import { join } from "node:path";

const out = join(process.cwd(), "public", "brand");
const font = "https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@300;400;500&display=block";
const page = (body, w, h) => `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${font}"><style>*{margin:0;box-sizing:border-box}html,body{width:${w}px;height:${h}px;overflow:hidden;font-family:'Host Grotesk',sans-serif;-webkit-font-smoothing:antialiased}</style></head><body>${body}</body></html>`;

const browser = await chromium.launch();

async function render(html, w, h, file) {
  const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await p.setContent(page(html, w, h), { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: join(out, file) });
  await p.close();
}

// Ícono: «G» de Host Grotesk en blanco sobre negro.
for (const [size, file] of [[16, "favicon-16.png"], [32, "favicon-32.png"], [48, "favicon-48.png"], [180, "apple-touch-icon.png"], [192, "pwa-192.png"], [512, "pwa-512.png"]]) {
  const glyph = Math.round(size * (size <= 32 ? 0.92 : 0.7));
  await render(`<div style="width:${size}px;height:${size}px;background:#0a0a0a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:${size <= 32 ? 500 : 400};font-size:${glyph}px;letter-spacing:-0.04em;line-height:1;padding-bottom:${Math.round(size * 0.04)}px">G</div>`, size, size, file);
}

// Imagen para compartir 1200 × 630.
await render(`<div style="width:1200px;height:630px;background:#0a0a0a;color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:72px 80px">
  <div style="font-size:34px;letter-spacing:-0.035em"><span style="font-weight:500">Garante</span> <span style="font-weight:300">Jurídico</span></div>
  <div><div style="font-weight:300;font-size:92px;line-height:.95;letter-spacing:-0.05em">Defensa jurídica<br>con criterio, desde<br>la primera llamada.</div>
  <div style="margin-top:36px;font-size:26px;color:#a3a3a3;letter-spacing:-0.01em">Guadalajara · Atención en todo México · WhatsApp 618 282 9873</div></div>
</div>`, 1200, 630, "og.png");

await browser.close();
console.log("Recursos monocromos generados en public/brand/");
