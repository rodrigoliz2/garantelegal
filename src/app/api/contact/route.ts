import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, requestIp, verifyTurnstile } from "@/lib/abuse";
import { leadSchema } from "@/lib/lead";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";
import { leadForFirm } from "@/lib/emails";

export async function POST(request: NextRequest) {
  const ip = requestIp(request);
  try {
    if (!await checkRateLimit(ip, "contact")) return NextResponse.json({ error: "Demasiados intentos. Prueba de nuevo más tarde." }, { status: 429 });
    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Revisa los datos y acepta el aviso de privacidad." }, { status: 400 });
    const input = parsed.data;
    if (!await verifyTurnstile(input.turnstileToken, ip)) return NextResponse.json({ error: "No pudimos verificar la protección del formulario." }, { status: 400 });
    await prisma.lead.create({ data: { origin: "CONTACT", clientName: input.clientName, clientPhone: input.clientPhone, clientEmail: input.clientEmail || null, message: input.message, privacyAcceptedAt: new Date() } });
    const forFirm = leadForFirm({ clientName: input.clientName, clientPhone: input.clientPhone, clientEmail: input.clientEmail || null, message: input.message });
    await sendMail({ to: process.env.CONTACT_EMAIL, subject: forFirm.subject, content: forFirm.content, replyTo: input.clientEmail || null });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead creation failed:", error);
    return NextResponse.json({ error: "No pudimos recibir el mensaje. Intenta de nuevo." }, { status: 500 });
  }
}
