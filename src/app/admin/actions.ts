"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fromZonedTime } from "date-fns-tz";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { availableSlots, modalities } from "@/lib/booking";
import { siteConfig } from "@/site.config";

export async function updateAppointmentStatus(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ id: z.string().min(1), status: z.enum(["CONFIRMED", "CANCELLED", "ATTENDED"]) }).safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) redirect("/admin/agenda?error=datos");
  await prisma.appointment.update({ where: { id: parsed.data.id }, data: { status: parsed.data.status } });
  revalidatePath("/admin/agenda");
}

export async function rescheduleAppointment(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ id: z.string().min(1), localStartsAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/) }).safeParse({ id: formData.get("id"), localStartsAt: formData.get("localStartsAt") });
  if (!parsed.success) redirect("/admin/agenda?error=fecha");
  const appointment = await prisma.appointment.findUnique({ where: { id: parsed.data.id } });
  if (!appointment) redirect("/admin/agenda?error=cita");
  if (!modalities.includes(appointment.modality as (typeof modalities)[number])) redirect("/admin/agenda?error=modalidad");
  const startsAt = fromZonedTime(parsed.data.localStartsAt, siteConfig.timeZone);
  const slots = await availableSlots(appointment.modality as (typeof modalities)[number]);
  if (!slots.some(slot => slot.startsAt === startsAt.toISOString())) redirect("/admin/agenda?error=ocupado");
  const endsAt = new Date(startsAt.getTime() + siteConfig.booking.durationMinutes * 60_000);
  try {
    await prisma.appointment.update({ where: { id: appointment.id }, data: { startsAt, endsAt, status: "RESCHEDULED" } });
  } catch { redirect("/admin/agenda?error=ocupado"); }
  revalidatePath("/admin/agenda");
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ id: z.string().min(1), status: z.enum(["NEW", "CONTACTED", "CLIENT", "DISCARDED"]) }).safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success) redirect("/admin/prospectos?error=datos");
  await prisma.lead.update({ where: { id: parsed.data.id }, data: { status: parsed.data.status } });
  revalidatePath("/admin/prospectos");
}

export async function saveAvailabilityRule(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ weekday: z.coerce.number().int().min(0).max(6), startMinute: z.coerce.number().int().min(0).max(1439), endMinute: z.coerce.number().int().min(1).max(1440), modality: z.enum(modalities) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success || parsed.data.startMinute >= parsed.data.endMinute) redirect("/admin/disponibilidad?error=horario");
  await prisma.availabilityRule.upsert({ where: { weekday_startMinute_endMinute_modality: parsed.data }, create: { ...parsed.data, active: true }, update: { active: true } });
  revalidatePath("/admin/disponibilidad");
}

export async function toggleAvailabilityRule(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const rule = await prisma.availabilityRule.findUnique({ where: { id } });
  if (!rule) redirect("/admin/disponibilidad?error=regla");
  await prisma.availabilityRule.update({ where: { id }, data: { active: !rule.active } });
  revalidatePath("/admin/disponibilidad");
}

export async function addBlockedSlot(formData: FormData) {
  await requireAdmin();
  const parsed = z.object({ startsAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/), endsAt: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/), reason: z.string().trim().min(2).max(120) }).safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/disponibilidad?error=bloqueo");
  const startsAt = fromZonedTime(parsed.data.startsAt, siteConfig.timeZone);
  const endsAt = fromZonedTime(parsed.data.endsAt, siteConfig.timeZone);
  if (startsAt >= endsAt) redirect("/admin/disponibilidad?error=bloqueo");
  await prisma.blockedSlot.create({ data: { startsAt, endsAt, reason: parsed.data.reason } });
  revalidatePath("/admin/disponibilidad");
}

export async function removeBlockedSlot(formData: FormData) {
  await requireAdmin();
  await prisma.blockedSlot.delete({ where: { id: String(formData.get("id") || "") } });
  revalidatePath("/admin/disponibilidad");
}
