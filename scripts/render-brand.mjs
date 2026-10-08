import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = join(process.cwd(), 'public', 'brand');
for (const name of ['logo-primary', 'logo-horizontal-dark', 'logo-header-negative', 'logo-negative', 'logo-mono-black', 'logo-mono-white', 'isotype', 'isotype-dark', 'og']) {
  const input = await readFile(join(root, `${name}.svg`));
  await sharp(input).png({ compressionLevel: 9 }).toFile(join(root, `${name}.png`));
}
const icon = await readFile(join(root, 'isotype-dark.svg'));
for (const size of [16, 32, 48, 180, 192, 512]) {
  const name = size === 180 ? 'apple-touch-icon' : size === 192 || size === 512 ? `pwa-${size}` : `favicon-${size}`;
  await sharp(icon).resize(size, size).png({ compressionLevel: 9 }).toFile(join(root, `${name}.png`));
}
for (const name of ['business-card', 'letterhead', 'proposal-cover', 'legal-cover', 'social-post', 'email-header']) {
  const input = await readFile(join(root, 'templates', `${name}.svg`));
  await sharp(input).png({ compressionLevel: 9 }).toFile(join(root, 'templates', `${name}.png`));
}
