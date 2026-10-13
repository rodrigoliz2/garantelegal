import sharp from "sharp";
import { copyFile, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const publicDir = join(process.cwd(), "public");
const brandDir = join(publicDir, "brand");
const source = join(brandDir, "pwa-512.png");
const sourceMetadata = await sharp(source).metadata();
if (sourceMetadata.width !== 512 || sourceMetadata.height !== 512) {
  throw new Error("The active brand isotype must be a square 512 × 512 PNG.");
}

await copyFile(join(brandDir, "pwa-192.png"), join(publicDir, "favicon.png"));
await copyFile(source, join(publicDir, "favicon-512.png"));

// ICO accepts embedded PNG images. Include common browser and high-DPI sizes.
const sizes = [16, 32, 48, 256];
const pngs = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
for (const [index, size] of sizes.entries()) {
  const entry = 6 + index * 16;
  header.writeUInt8(size === 256 ? 0 : size, entry);
  header.writeUInt8(size === 256 ? 0 : size, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(pngs[index].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += pngs[index].length;
}
await writeFile(join(publicDir, "favicon.ico"), Buffer.concat([header, ...pngs]));

// Keep the root PNG files byte-identical to the current PWA isotype assets.
const png192 = await readFile(join(publicDir, "favicon.png"));
const png192Metadata = await sharp(png192).metadata();
if (png192Metadata.width !== 192 || png192Metadata.height !== 192) {
  throw new Error("The active brand isotype must include a square 192 × 192 PNG.");
}
console.log("Generated favicon.ico, favicon.png (192 px), and favicon-512.png.");
