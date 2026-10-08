import { describe, expect, it } from "vitest";
import { buildAvailableSlots, intervalsOverlap } from "../src/lib/availability";

describe("availability", () => {
  const rules = [{ weekday: 3, startMinute: 540, endMinute: 600, modality: "VIDEO", active: true }];
  const now = new Date("2026-10-07T12:00:00.000Z");
  it("stores Guadalajara-local times as UTC and enforces lead time", () => {
    const slots = buildAvailableSlots({ rules, appointments: [], blocks: [], modality: "VIDEO", now, days: 1 });
    expect(slots.map(slot => slot.startsAt)).toEqual(["2026-10-07T15:00:00.000Z", "2026-10-07T15:30:00.000Z"]);
  });
  it("removes blocked and reserved intervals", () => {
    const slots = buildAvailableSlots({ rules, appointments: [{ startsAt: new Date("2026-10-07T15:00:00Z"), endsAt: new Date("2026-10-07T15:30:00Z") }], blocks: [{ startsAt: new Date("2026-10-07T15:30:00Z"), endsAt: new Date("2026-10-07T16:00:00Z") }], modality: "VIDEO", now, days: 1 });
    expect(slots).toHaveLength(0);
  });
  it("treats adjacent appointments as non-overlapping", () => {
    expect(intervalsOverlap({ startsAt: new Date("2026-01-01T10:00Z"), endsAt: new Date("2026-01-01T10:30Z") }, { startsAt: new Date("2026-01-01T10:30Z"), endsAt: new Date("2026-01-01T11:00Z") })).toBe(false);
  });
});
