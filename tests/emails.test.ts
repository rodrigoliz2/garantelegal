import { describe, expect, it } from "vitest";
import { appointmentForClient, appointmentForFirm, leadForFirm } from "../src/lib/emails";
import { emailText, renderEmail } from "../src/lib/mail";
import { siteConfig } from "../src/site.config";

const data = { folio: "GJ-TEST", serviceName: "Amparo indirecto", modality: "VIDEO" as const, startsAt: new Date("2030-01-07T16:00:00Z"), clientName: "Ana <b>López</b>", clientPhone: "3312345678", clientEmail: "ana@ejemplo.com", notes: "Nota" };

describe("correos transaccionales", () => {
  it("escapa el texto del cliente y usa la fecha en español", () => {
    const html = renderEmail(appointmentForFirm(data).content);
    expect(html).toContain("Ana &lt;b&gt;López&lt;/b&gt;");
    expect(html).not.toContain("<b>López</b>");
    expect(html).toContain("Lunes 7 de enero de 2030, 10:00 h");
  });

  it("ofrece confirmar por WhatsApp al número del despacho", () => {
    const { content, subject } = appointmentForClient(data);
    expect(subject).toContain("GJ-TEST");
    expect(content.action?.href.startsWith(siteConfig.whatsappBase)).toBe(true);
    expect(emailText(content)).toContain("Confirmar por WhatsApp");
  });

  it("permite responder al prospecto por WhatsApp", () => {
    const { content } = leadForFirm({ clientName: "Luis", clientPhone: "3312345678", message: "Hola" });
    expect(content.action?.href).toContain("wa.me/523312345678");
  });
});
