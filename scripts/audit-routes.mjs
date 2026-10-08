import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import 'dotenv/config';

const base = process.env.BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ headless: true });
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
const publicRoutes = [...new Set([...urls, '/styleguide', '/admin/login', '/no-existe'])];
const adminRoutes = ['/admin', '/admin/agenda', '/admin/prospectos', '/admin/disponibilidad', '/admin/contenido'];
const results = [];
const expectedStatus = route => (route === '/no-existe' ? 404 : 200);
for (const viewport of [{ name: '390', width: 390, height: 844 }, { name: '768', width: 768, height: 1024 }, { name: '1440', width: 1440, height: 900 }]) {
  const dir = join('docs', 'screenshots', viewport.name);
  await mkdir(dir, { recursive: true });
  // Movimiento reducido: capturas deterministas (sin revelados pendientes ni paralaje).
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  async function capture(route) {
    const response = await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
    await page.locator('main').first().waitFor();
    const layout = await page.evaluate(() => ({
      overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
      clipped: [...document.querySelectorAll('h1,h2,h3,p,a,button,label')].filter(el => {
        const style = getComputedStyle(el);
        return el.scrollWidth > el.clientWidth + 4 && !['auto','scroll'].includes(style.overflowX) && style.whiteSpace !== 'nowrap';
      }).slice(0, 5).map(el => (el.textContent || '').trim().slice(0, 60))
    }));
    const file = route === '/' ? 'inicio' : route.slice(1).replaceAll('/', '--').replaceAll(/[^a-z0-9-]/g, '-');
    const path = join(dir, `${file}.jpg`);
    await page.screenshot({ path, fullPage: true, type: 'jpeg', quality: 65 });
    const item = { viewport: viewport.name, route, status: response?.status(), ...layout, screenshot: path };
    results.push(item);
    if (item.status !== expectedStatus(route) || item.overflow || item.clipped.length) console.log(JSON.stringify(item));
  }
  for (const route of publicRoutes) await capture(route);
  await page.goto(`${base}/admin/login`);
  await page.getByLabel('Correo del administrador').fill(process.env.ADMIN_EMAIL || '');
  await page.getByLabel('Contraseña').fill(process.env.ADMIN_PASSWORD || '');
  await page.getByRole('button', { name: 'Entrar al panel' }).click();
  await page.waitForURL('**/admin');
  for (const route of adminRoutes) await capture(route);
  await context.close();
}
await browser.close();
await writeFile(join('docs', 'screenshots', 'audit.json'), JSON.stringify(results, null, 2));
console.log(`Audited ${results.length} viewport/route combinations; ${results.filter(item => item.status !== expectedStatus(item.route) || item.overflow).length} status/overflow failures.`);
