// Prueba los correos transaccionales con datos de ejemplo.
//   npm run mail:test -- destino@ejemplo.com           envía los tres correos (requiere Resend)
//   npm run mail:test -- --preview                     solo genera los HTML en docs/email/
// Usa RESEND_API_KEY y EMAIL_FROM. Si no se indica destino, usa CONTACT_EMAIL.
import { mkdirSync, writeFileSync } from "node:fs";
import { appointmentForClient, appointmentForFirm, leadForFirm } from "../src/lib/emails";
import { renderEmail, sendMail } from "../src/lib/mail";

const sample = { folio: "GJ-PRUEBA", serviceName: "Amparo indirecto", modality: "VIDEO" as const, startsAt: new Date(Date.now() + 2 * 86_400_000), clientName: "Nombre de Prueba", clientPhone: "3312345678", clientEmail: "cliente@ejemplo.com", notes: "Texto de ejemplo para revisar el diseño del correo." };
const emails = {
  "cita-despacho": appointmentForFirm(sample),
  "cita-cliente": appointmentForClient(sample),
  "contacto-despacho": leadForFirm({ clientName: sample.clientName, clientPhone: sample.clientPhone, clientEmail: sample.clientEmail, message: "Mensaje de ejemplo para revisar el diseño del correo de contacto." })
};

if (process.argv.includes("--preview")) {
  mkdirSync("docs/email", { recursive: true });
  for (const [name, email] of Object.entries(emails)) writeFileSync(`docs/email/${name}.html`, renderEmail(email.content));
  console.log("Vistas previas en docs/email/");
  process.exit(0);
}

const to = process.argv[2] || process.env.CONTACT_EMAIL;
const missing = ["RESEND_API_KEY", "EMAIL_FROM"].filter(name => !process.env[name]);
if (missing.length || !to) {
  console.error(`Falta configurar: ${[...missing, ...(to ? [] : ["destino o CONTACT_EMAIL"])].join(", ")}`);
  process.exit(1);
}

(async () => {
  let ok = true;
  for (const email of Object.values(emails)) {
    const result = await sendMail({ to, subject: `[Prueba] ${email.subject}`, content: email.content });
    ok &&= result.delivered;
  }
  console.log(ok ? `Enviados 3 correos de prueba a ${to}.` : "Algún correo no se pudo enviar; revisa el error anterior.");
  process.exit(ok ? 0 : 1);
})();
