// Envía un correo de prueba con la configuración de Resend del entorno.
//   npm run mail:test -- destino@ejemplo.com
// Usa RESEND_API_KEY y EMAIL_FROM. Si no se indica destino, usa CONTACT_EMAIL.
import { sendMail } from "../src/lib/mail";

const to = process.argv[2] || process.env.CONTACT_EMAIL;
const missing = ["RESEND_API_KEY", "EMAIL_FROM"].filter(name => !process.env[name]);
if (missing.length || !to) {
  console.error(`Falta configurar: ${[...missing, ...(to ? [] : ["destino o CONTACT_EMAIL"])].join(", ")}`);
  process.exit(1);
}

sendMail({ to, subject: "Prueba de correo", text: "Este es un correo de prueba del sitio de Garante Jurídico.\n\nSi lo recibiste, el envío por Resend funciona." })
  .then(result => {
    console.log(result.delivered ? `Enviado a ${to}.` : "No se pudo enviar; revisa el mensaje de error anterior.");
    process.exit(result.delivered ? 0 : 1);
  });
