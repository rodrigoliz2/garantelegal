import { Resend } from "resend";
import { siteConfig } from "@/site.config";

export async function sendMail({ to, subject, text }: { to?: string | null; subject: string; text: string }) {
  if (!to || !process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.log("[DEV EMAIL]", JSON.stringify({ to: to || "[PENDIENTE: correo de contacto del despacho]", subject, text }));
    return { delivered: false };
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: `${siteConfig.name} <${process.env.EMAIL_FROM}>`, to, subject, text });
    if (error) {
      console.error("Email delivery failed:", error.message);
      return { delivered: false };
    }
    return { delivered: true };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { delivered: false };
  }
}
