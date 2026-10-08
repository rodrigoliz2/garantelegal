import { Resend } from "resend";
import { siteConfig } from "@/site.config";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function mailHtml(subject: string, body: string) {
  return `<div style="margin:0;background:#F5F0E6;padding:24px;font-family:Arial,sans-serif;color:#101F32"><div style="max-width:640px;margin:auto;background:#FFFFFF"><div style="background:#101F32;padding:24px"><img src="${siteConfig.url}/brand/templates/email-header.png" width="320" height="69" alt="${escapeHtml(siteConfig.name)} — ${escapeHtml(siteConfig.tagline)}" style="display:block;max-width:100%;height:auto" /></div><div style="padding:28px"><h1 style="font-size:24px;margin:0 0 18px">${escapeHtml(subject)}</h1><p style="white-space:pre-line;line-height:1.6">${escapeHtml(body)}</p></div><div style="border-top:1px solid #B9955B;padding:18px 28px;font-size:12px">${escapeHtml(siteConfig.tagline)} · Contenido informativo.</div></div></div>`;
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
