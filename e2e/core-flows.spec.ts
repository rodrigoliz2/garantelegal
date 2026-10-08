import { expect, test } from "@playwright/test";
import { prisma } from "../src/lib/prisma";
import { siteConfig } from "../src/site.config";
import { formatInTimeZone } from "date-fns-tz";

test("persistent emergency action opens WhatsApp in one tap", async ({ page }) => {
  // El despacho solo atiende llamadas y mensajes por WhatsApp: no debe existir ningún enlace tel:.
  await page.goto("/servicios");
  const bar = page.locator('[aria-label="Contacto inmediato"]');
  const whatsapp = bar.getByRole("link", { name: "Llamar o escribir por WhatsApp" });
  await expect(whatsapp).toHaveAttribute("href", new RegExp(`^${siteConfig.whatsappBase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await page.goto("/urgencias");
  await expect(page.getByRole("heading", { name: /Ante una detención/i })).toBeVisible();
  await expect(whatsapp).toBeVisible();
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
});

test("admin panel requires a seeded administrator", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await page.getByLabel("Correo del administrador").fill(process.env.ADMIN_EMAIL || "");
  await page.getByLabel("Contraseña").fill(process.env.ADMIN_PASSWORD || "");
  await page.getByRole("button", { name: "Entrar al panel" }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: /Hola,/ })).toBeVisible();
});

test("appointment can be requested and appears in the protected agenda", async ({ page }) => {
  let folio = "";
  try {
    await page.goto("/agendar");
    await expect(page.getByRole("heading", { name: "Agenda una conversación." })).toBeVisible();
    const firstSlot = page.locator('input[name="slot"]').first();
    await expect(firstSlot).toBeAttached();
    await firstSlot.locator("..").click();
    await page.getByLabel("Nombre completo").fill("Prueba automatizada");
    await page.getByLabel("Teléfono", { exact: true }).fill("3312345678");
    await page.locator('input[name="privacyAccepted"]').check();
    await page.waitForFunction(() => { const input = document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]'); return Boolean(input?.value); }, undefined, { timeout: 15_000 });
    await page.getByRole("button", { name: "Solicitar cita" }).click();
    const heading = page.getByRole("heading", { name: /Tu folio es/ });
    await expect(heading).toBeVisible();
    folio = (await heading.textContent() || "").replace("Tu folio es ", "").trim();
    await expect(page.getByRole("link", { name: "Descargar calendario (.ics)" })).toHaveAttribute("href", new RegExp(folio));
    await page.goto("/admin/login");
    await page.getByLabel("Correo del administrador").fill(process.env.ADMIN_EMAIL || "");
    await page.getByLabel("Contraseña").fill(process.env.ADMIN_PASSWORD || "");
    await page.getByRole("button", { name: "Entrar al panel" }).click();
    await expect(page).toHaveURL(/\/admin$/);
    const appointment = await prisma.appointment.findUnique({ where: { folio } });
    expect(appointment).not.toBeNull();
    const localDate = formatInTimeZone(appointment!.startsAt, siteConfig.timeZone, "yyyy-MM-dd");
    await page.goto(`/admin/agenda?date=${localDate}`);
    await expect(page.getByText(folio)).toBeVisible();
  } finally {
    if (folio) await prisma.appointment.deleteMany({ where: { folio } });
  }
});
