"use client";

import { track } from "@plausible-analytics/tracker";

export function trackEvent(name: string, origin?: string) {
  if (!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) return;
  track(name, { props: origin ? { origen: origin } : {} });
}
