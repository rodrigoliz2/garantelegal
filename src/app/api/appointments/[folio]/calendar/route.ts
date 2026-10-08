import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/site.config";

function icsTime(date: Date) { return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
function escapeIcs(value: string) { return value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n"); }

export async function GET(_request: NextRequest, { params }: { params: Promise<{ folio: string }> }) {
  const { folio } = await params;
  const appointment = await prisma.appointment.findUnique({ where: { folio }, include: { service: true } });
  if (!appointment || appointment.status === "CANCELLED") return new NextResponse("No encontrada", { status: 404 });
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Garante Juridico//Citas//ES", "CALSCALE:GREGORIAN", "BEGIN:VEVENT", `UID:${appointment.id}@${siteConfig.domain}`, `DTSTAMP:${icsTime(appointment.createdAt)}`, `DTSTART:${icsTime(appointment.startsAt)}`, `DTEND:${icsTime(appointment.endsAt)}`, `SUMMARY:${escapeIcs(`Consulta ${siteConfig.name}: ${appointment.service.name}`)}`, `DESCRIPTION:${escapeIcs(`Folio ${appointment.folio}. Pendiente de confirmación del despacho.`)}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  return new NextResponse(ics, { headers: { "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": `attachment; filename="${appointment.folio}.ics"`, "Cache-Control": "private, no-store" } });
}
