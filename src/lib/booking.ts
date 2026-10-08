import { randomBytes } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { buildAvailableSlots } from "@/lib/availability";
import { modalities } from "@/lib/booking-constants";

export { modalities } from "@/lib/booking-constants";

export const bookingSchema = z.object({
  serviceId: z.string().min(1),
  modality: z.enum(modalities),
  startsAt: z.iso.datetime(),
  clientName: z.string().trim().min(2).max(100),
  clientPhone: z.string().trim().regex(/^[+\d\s()-]{10,22}$/),
  clientEmail: z.union([z.email(), z.literal("")]).optional(),
  notes: z.string().trim().max(500).default(""),
  privacyAccepted: z.literal(true),
  turnstileToken: z.string().min(1)
});

export async function availableSlots(modality: (typeof modalities)[number]) {
  const now = new Date();
  const end = new Date(now.getTime() + 23 * 24 * 60 * 60 * 1000);
  const [rules, appointments, blocks] = await Promise.all([
    prisma.availabilityRule.findMany({ where: { modality, active: true } }),
    prisma.appointment.findMany({ where: { status: { in: ["PENDING", "CONFIRMED", "RESCHEDULED"] }, startsAt: { lt: end }, endsAt: { gt: now } }, select: { startsAt: true, endsAt: true } }),
    prisma.blockedSlot.findMany({ where: { startsAt: { lt: end }, endsAt: { gt: now } }, select: { startsAt: true, endsAt: true } })
  ]);
  return buildAvailableSlots({ rules, appointments, blocks, modality, now });
}

export function makeFolio() {
  return `GJ-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomBytes(8).toString("hex").toUpperCase()}`;
}
