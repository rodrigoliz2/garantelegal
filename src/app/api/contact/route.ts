import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, requestIp, verifyTurnstile } from "@/lib/abuse";
import { leadSchema } from "@/lib/lead";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export async function POST(request: NextRequest) {
  const ip = requestIp(request);
  try {
    if (!await checkRateLimit(ip, "contact")) return NextResponse.json({ error: "Demasiados intentos. Prueba de nuevo más tarde." }, { status: 429 });
    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Revisa los datos y acepta el aviso de privacidad." }, { status: 400 });
    const input = parsed.data;
    if (!await verifyTurnstile(input.turnstileToken, ip)) return NextResponse.json({ error: "No pudimos verificar la protección del formulario." }, { status: 400 });
    const lead = await prisma.lead.create({ data: { origin: "CONTACT", clientName: input.clientName, clientPhone: input.clientPhone, clientEmail: input.clientEmail || null, message: input.message, privacyAcceptedAt: new Date() } });
    await sendMail({ to: process.env.CONTACT_EMAIL, subject: `Nuevo prospecto ${lead.id}`, text: `Nombre: ${input.clientName}\nTeléfono: ${input.clientPhone}\nCorreo: ${input.clientEmail || "No proporcionado"}\nMensaje: ${input.message}` });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Lead creation failed:", error);
    return NextResponse.json({ error: "No pudimos recibir el mensaje. Intenta de nuevo." }, { status: 500 });
  }
}
