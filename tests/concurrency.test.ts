import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { prisma } from "../src/lib/prisma";

describe("database reservation exclusion", () => {
  afterAll(() => prisma.$disconnect());
  it("allows only one of two concurrent reservations for the same interval", async () => {
    const service = await prisma.service.findFirst({ where: { published: true, isEmergency: false } });
    expect(service).not.toBeNull();
    const prefix = `TEST-${randomUUID()}`;
    const startsAt = new Date("2100-01-04T16:00:00.000Z");
    const endsAt = new Date("2100-01-04T16:30:00.000Z");
    const create = (suffix: number) => prisma.appointment.create({ data: { folio: `${prefix}-${suffix}`, serviceId: service!.id, modality: "VIDEO", startsAt, endsAt, status: "PENDING", clientName: "Prueba de concurrencia", clientPhone: "0000000000", privacyAcceptedAt: new Date() } });
    try {
      const outcomes = await Promise.allSettled([create(1), create(2)]);
      expect(outcomes.filter(item => item.status === "fulfilled")).toHaveLength(1);
      expect(outcomes.filter(item => item.status === "rejected")).toHaveLength(1);
    } finally {
      await prisma.appointment.deleteMany({ where: { folio: { startsWith: prefix } } });
    }
  });
});
