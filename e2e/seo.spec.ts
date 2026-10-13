import { expect, test } from "@playwright/test";
import sharp from "sharp";
import { siteConfig } from "../src/site.config";

test("canonical pages expose crawlable official favicons", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", siteConfig.url);
  for (const [path, size] of [["/favicon.png", 192], ["/favicon-512.png", 512]] as const) {
    await expect(page.locator(`link[rel="icon"][href="${path}"]`)).toHaveAttribute("sizes", `${size}x${size}`);
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const metadata = await sharp(await response.body()).metadata();
    expect([metadata.width, metadata.height]).toEqual([size, size]);
  }

  await expect(page.locator('link[rel="icon"][href="/favicon.ico"]')).toHaveAttribute("type", "image/x-icon");
  const icoResponse = await request.get("/favicon.ico");
  expect(icoResponse.status()).toBe(200);
  expect(icoResponse.headers()["content-type"]).toMatch(/image\/(x-icon|vnd\.microsoft\.icon)/);
  const ico = await icoResponse.body();
  expect(ico.readUInt16LE(2)).toBe(1);
  expect(ico.readUInt16LE(4)).toBe(4);
  expect([0, 1, 2, 3].map(index => ico.readUInt8(6 + index * 16) || 256)).toEqual([16, 32, 48, 256]);

  await page.goto("/servicios");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteConfig.url}/servicios`);
  await expect(page.locator('link[rel="icon"][href="/favicon.png"]')).toHaveCount(1);

  const manifest = await (await request.get("/manifest.webmanifest")).json();
  expect(manifest.icons.map((icon: { src: string }) => icon.src)).toEqual(["/favicon.png", "/favicon-512.png"]);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${siteConfig.url}/sitemap.xml`);
  expect(robots).not.toMatch(/Disallow: \/favicon/);
  expect(robots).not.toMatch(/Disallow: \/(?:admin|styleguide)/);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(`<loc>${siteConfig.url}</loc>`);
  expect(sitemap).not.toContain(`www.${siteConfig.domain}`);
});

test("home metadata and structured data identify the firm without a personal profile", async ({ page }) => {
  await page.goto("/");
  const commercialTitle = `${siteConfig.name} | ${siteConfig.tagline}`;
  await expect(page).toHaveTitle(commercialTitle);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", commercialTitle);
  await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", commercialTitle);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Guadalajara.*República Mexicana/);

  const graphs = await page.locator('script[type="application/ld+json"]').allTextContents();
  const nodes = graphs.flatMap(raw => {
    const value = JSON.parse(raw);
    return value["@graph"] ?? (Array.isArray(value) ? value : [value]);
  });
  const firm = nodes.find(node => node["@type"] === "LegalService");
  const website = nodes.find(node => node["@type"] === "WebSite");
  expect(firm).toMatchObject({ name: siteConfig.name, alternateName: siteConfig.alternateName, url: siteConfig.url });
  expect(website).toMatchObject({ name: siteConfig.name, alternateName: siteConfig.alternateName, publisher: { "@id": firm["@id"] } });
  expect(JSON.stringify(nodes)).not.toMatch(/Rodrigo|Liz[aá]rraga|founder|worksFor|employee|member/i);
  expect(await page.locator("body").innerText()).not.toMatch(/Rodrigo|Liz[aá]rraga/i);
});

test("private and design reference pages expose noindex to crawlers", async ({ page }) => {
  for (const path of ["/admin/login", "/styleguide"]) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
  }
});
