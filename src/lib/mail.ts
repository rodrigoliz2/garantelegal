import { Resend } from "resend";
import { siteConfig, whatsappHref } from "@/site.config";

// Plantilla de correo monocroma. Tablas y estilos en línea: es lo que Gmail, Outlook y
// Apple Mail interpretan igual. Sin fuentes web (los clientes de correo no las cargan).

export type EmailContent = {
  /** Texto corto que el cliente de correo muestra junto al asunto. */
  preheader: string;
  heading: string;
  paragraphs?: string[];
  details?: [label: string, value: string][];
  action?: { label: string; href: string };
  links?: { label: string; href: string }[];
  note?: string;
};

const font = "'Helvetica Neue',Helvetica,Arial,sans-serif";
const black = "#0A0A0A";
const gray = "#525252";
const line = "#E5E5E5";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const multiline = (value: string) => escapeHtml(value).replace(/\n/g, "<br>");

export function renderEmail(content: EmailContent): string {
  const paragraphs = (content.paragraphs || []).map(text => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${black}">${multiline(text)}</p>`).join("");
  const details = content.details?.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 28px;border-top:1px solid ${black}">${content.details.map(([label, value]) => `<tr><td style="padding:12px 16px 12px 0;border-bottom:1px solid ${line};font-size:13px;line-height:1.4;color:${gray};width:34%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:12px 0;border-bottom:1px solid ${line};font-size:15px;line-height:1.5;color:${black};vertical-align:top">${multiline(value)}</td></tr>`).join("")}</table>`
    : "";
  const action = content.action
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 24px"><tr><td style="background:${black}"><a href="${escapeHtml(content.action.href)}" style="display:inline-block;padding:15px 26px;font-family:${font};font-size:15px;font-weight:500;color:#FFFFFF;text-decoration:none">${escapeHtml(content.action.label)}</a></td></tr></table>`
    : "";
  const links = content.links?.length
    ? `<p style="margin:0 0 24px;font-size:15px;line-height:1.9">${content.links.map(link => `<a href="${escapeHtml(link.href)}" style="color:${black};text-decoration:underline">${escapeHtml(link.label)}</a>`).join("<br>")}</p>`
    : "";
  const note = content.note ? `<p style="margin:8px 0 0;padding-top:20px;border-top:1px solid ${line};font-size:14px;line-height:1.6;color:${gray}">${multiline(content.note)}</p>` : "";

  return `<!doctype html>
<html lang="es-MX"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${escapeHtml(content.heading)}</title></head>
<body style="margin:0;padding:0;background:#F5F5F5;font-family:${font};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#F5F5F5">${escapeHtml(content.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F5"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF">
  <tr><td style="background:${black};padding:26px 32px;font-family:${font};font-size:20px;letter-spacing:-0.3px;color:#FFFFFF">Garante <span style="font-weight:300">Jurídico</span></td></tr>
  <tr><td style="padding:40px 32px 32px;font-family:${font}">
    <h1 style="margin:0 0 20px;font-size:28px;line-height:1.15;font-weight:300;letter-spacing:-0.6px;color:${black}">${escapeHtml(content.heading)}</h1>
    ${paragraphs}${details}${action}${links}${note}
  </td></tr>
  <tr><td style="padding:24px 32px 32px;border-top:1px solid ${line};font-family:${font};font-size:13px;line-height:1.7;color:${gray}">
    WhatsApp, llamadas y mensajes: <a href="${whatsappHref("Hola, quiero información sobre sus servicios jurídicos.")}" style="color:${black};text-decoration:underline">${siteConfig.phoneDisplay}</a><br>
    <a href="mailto:${siteConfig.contactEmail}" style="color:${black};text-decoration:underline">${siteConfig.contactEmail}</a> · <a href="${siteConfig.url}" style="color:${black};text-decoration:underline">${siteConfig.domain}</a> · Instagram <a href="${siteConfig.instagram.url}" style="color:${black};text-decoration:underline">${siteConfig.instagram.handle}</a><br>
    Sede en ${escapeHtml(siteConfig.city)}. Atención en ${escapeHtml(siteConfig.coverage)}.
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

/** Versión de texto plano a partir del contenido estructurado. */
export function emailText(content: EmailContent): string {
  return [
    content.heading,
    ...(content.paragraphs || []),
    ...(content.details || []).map(([label, value]) => `${label}: ${value}`),
    ...(content.action ? [`${content.action.label}: ${content.action.href}`] : []),
    ...(content.links || []).map(link => `${link.label}: ${link.href}`),
    ...(content.note ? [content.note] : []),
    `${siteConfig.name} · WhatsApp ${siteConfig.phoneDisplay} · ${siteConfig.contactEmail}`
  ].join("\n\n");
}

export async function sendMail({ to, subject, text, content, replyTo }: { to?: string | null; subject: string; text?: string; content?: EmailContent; replyTo?: string | null }) {
  const plain = content ? emailText(content) : text || "";
  const html = renderEmail(content || { preheader: subject, heading: subject, paragraphs: [plain] });
  if (!to || !process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    console.log("[DEV EMAIL]", JSON.stringify({ to: to || "(sin destinatario)", subject, text: plain }));
    return { delivered: false };
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from: `${siteConfig.name} <${process.env.EMAIL_FROM}>`, to, subject, text: plain, html, ...(replyTo ? { replyTo } : {}) });
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
