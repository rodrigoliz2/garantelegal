// Aplica el tratamiento fotográfico de la marca: blanco y negro, misma curva
// de contraste y el mismo grano a todas las fotos. Uso:
//   node scripts/process-photos.mjs <carpeta-de-originales>
// Los originales se descargan de Pexels (ver CREDITOS.md) y no se versionan.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Indica la carpeta con los originales.");
const output = path.resolve("public/fotos");
fs.mkdirSync(output, { recursive: true });

const MAX = 2000;
const GRAIN = 14;

function grain(width, height) {
  const data = Buffer.alloc(width * height);
  let seed = 7;
  const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < data.length; i++) {
    const n = (random() + random() + random() - 1.5) * GRAIN;
    data[i] = Math.max(0, Math.min(255, Math.round(128 + n)));
  }
  return sharp(data, { raw: { width, height, channels: 1 } }).png().toBuffer();
}

for (const file of fs.readdirSync(source).filter(name => /\.jpe?g$/i.test(name))) {
  const base = sharp(path.join(source, file)).rotate().resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true }).grayscale().normalise({ lower: 1, upper: 99 }).linear(1.12, -14).gamma(1.08);
  const { data, info } = await base.raw().toBuffer({ resolveWithObject: true });
  const noise = await grain(info.width, info.height);
  await sharp(data, { raw: info })
    .composite([{ input: noise, blend: "overlay" }])
    .toColourspace("b-w")
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(path.join(output, file.replace(/\.jpe?g$/i, ".jpg")));
  console.log(file, `${info.width}x${info.height}`);
}
