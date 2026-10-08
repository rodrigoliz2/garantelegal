import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { availableSlots, bookingSchema, makeFolio } from "@/lib/booking";
import { checkRateLimit, requestIp, verifyTurnstile } from "@/lib/abuse";
import { sendMail } from "@/lib/mail";
import { appointmentForClient, appointmentForFirm } from "@/lib/emails";
import { siteConfig } from "@/site.config";

export async function POST(request: NextRequest) {
  const ip = requestIp(request);
  try {
    if (!await checkRateLimit(ip, "appointment")) return NextResponse.json({ error: "Demasiados intentos. Prueba de nuevo más tarde." }, { status: 429 });
    const parsed = bookingSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Revisa los datos y acepta el aviso de privacidad.", details: parsed.error.flatten() }, { status: 400 });
    const input = parsed.data;
    if (!await verifyTurnstile(input.turnstileToken, ip)) return NextResponse.json({ error: "No pudimos verificar la protección del formulario. Intenta de nuevo." }, { status: 400 });
    const service = await prisma.service.findUnique({ where: { id: input.serviceId }, include: { area: true } });
    if (!service || !service.published) return NextResponse.json({ error: "Selecciona un servicio disponible." }, { status: 400 });
    if (service.isEmergency) return NextResponse.json({ error: "Las urgencias no se agendan: se atienden de inmediato por WhatsApp." }, { status: 400 });
    const slots = await availableSlots(input.modality);
    const selected = slots.find(slot => slot.startsAt === input.startsAt);
    if (!selected) return NextResponse.json({ error: "Ese horario ya no está disponible. Elige otro." }, { status: 409 });
    const appointment = await prisma.appointment.create({ data: { folio: makeFolio(), serviceId: service.id, modality: input.modality, startsAt: new Date(selected.startsAt), endsAt: new Date(selected.endsAt), status: "PENDING", clientName: input.clientName, clientPhone: input.clientPhone, clientEmail: input.clientEmail || null, notes: input.notes, privacyAcceptedAt: new Date() } });
    const emailData = { folio: appointment.folio, serviceName: service.name, modality: input.modality, startsAt: appointment.startsAt, clientName: input.clientName, clientPhone: input.clientPhone, clientEmail: input.clientEmail || null, notes: input.notes };
    const forFirm = appointmentForFirm(emailData);
    const forClient = appointmentForClient(emailData);
    await Promise.all([
      sendMail({ to: process.env.CONTACT_EMAIL, subject: forFirm.subject, content: forFirm.content, replyTo: input.clientEmail || null }),
      sendMail({ to: input.clientEmail, subject: forClient.subject, content: forClient.content, replyTo: process.env.CONTACT_EMAIL || siteConfig.contactEmail })
    ]);
    return NextResponse.json({ folio: appointment.folio, startsAt: appointment.startsAt.toISOString(), endsAt: appointment.endsAt.toISOString(), service: service.name, modality: input.modality }, { status: 201 });
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && error.code === "P2004") return NextResponse.json({ error: "Ese horario ya fue reservado. Elige otro." }, { status: 409 });
    console.error("Appointment creation failed:", error);
    return NextResponse.json({ error: "No pudimos guardar la cita. Intenta de nuevo." }, { status: 500 });
  }
}
