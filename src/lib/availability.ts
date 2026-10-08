import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { siteConfig } from "@/site.config";

export type AvailabilityRuleInput = { weekday: number; startMinute: number; endMinute: number; modality: string; active: boolean };
export type Interval = { startsAt: Date; endsAt: Date };
export type Slot = { startsAt: string; endsAt: string; date: string; time: string; dayLabel: string };

export function intervalsOverlap(a: Interval, b: Interval): boolean {
  return a.startsAt < b.endsAt && a.endsAt > b.startsAt;
}

function localDateAtOffset(now: Date, dayOffset: number): string {
  const today = formatInTimeZone(now, siteConfig.timeZone, "yyyy-MM-dd");
  const date = new Date(`${today}T12:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + dayOffset);
  return date.toISOString().slice(0, 10);
}

function minuteTime(minutes: number): string {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function buildAvailableSlots({ rules, appointments, blocks, modality, now = new Date(), days = 21 }: {
  rules: AvailabilityRuleInput[];
  appointments: Interval[];
  blocks: Interval[];
  modality: string;
  now?: Date;
  days?: number;
}): Slot[] {
  const result: Slot[] = [];
  const minimum = now.getTime() + siteConfig.booking.minimumNoticeHours * 60 * 60 * 1000;
  const duration = siteConfig.booking.durationMinutes;
  for (let offset = 0; offset < days; offset++) {
    const date = localDateAtOffset(now, offset);
    const weekday = new Date(`${date}T00:00:00.000Z`).getUTCDay();
    for (const rule of rules) {
      if (!rule.active || rule.modality !== modality || rule.weekday !== weekday) continue;
      for (let minute = rule.startMinute; minute + duration <= rule.endMinute; minute += duration) {
        const startsAt = fromZonedTime(`${date} ${minuteTime(minute)}:00`, siteConfig.timeZone);
        const endsAt = new Date(startsAt.getTime() + duration * 60 * 1000);
        if (startsAt.getTime() < minimum) continue;
        const interval = { startsAt, endsAt };
        if (appointments.some(item => intervalsOverlap(interval, item)) || blocks.some(item => intervalsOverlap(interval, item))) continue;
        result.push({ startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString(), date, time: minuteTime(minute), dayLabel: formatInTimeZone(startsAt, siteConfig.timeZone, "EEEE d 'de' MMMM") });
      }
    }
  }
  return result.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}
