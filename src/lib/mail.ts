import { Resend } from "resend";
import { siteConfig } from "@/site.config";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function mailHtml(subject: string, body: string) {
  return `<div style="margin:0;background:#F5F5F5;padding:24px;font-family:'Helvetica Neue',Helvetica,sans-serif;color:#0A0A0A"><div style="max-width:640px;margin:auto;background:#FFFFFF"><div style="background:#0A0A0A;padding:24px 28px;color:#FFFFFF;font-size:20px;letter-spacing:-0.02em">Garante <span style="font-weight:300">Jurídico</span></div><div style="padding:28px"><h1 style="font-size:24px;font-weight:400;letter-spacing:-0.02em;margin:0 0 18px">${escapeHtml(subject)}</h1><p style="white-space:pre-line;line-height:1.6">${escapeHtml(body)}</p></div><div style="border-top:1px solid #E5E5E5;padding:18px 28px;font-size:12px;color:#525252">${escapeHtml(siteConfig.tagline)}. Contenido informativo.</div></div></div>`;
}

export async function sendMail({ to, subject, text }: { to?: string | null; subject: string; text: string }) {
  if (!to || !process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.log("[DEV EMAIL]", JSON.stringify({ to: to || "[PENDIENTE: correo de contacto del despacho]", subject, text }));
    return { delivered: false };
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: `${siteConfig.name} <${process.env.EMAIL_FROM}>`, to, subject, text, html: mailHtml(subject, text) });
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
