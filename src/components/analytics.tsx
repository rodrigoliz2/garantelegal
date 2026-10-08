"use client";

import { useEffect } from "react";
import { init } from "@plausible-analytics/tracker";
import { trackEvent } from "@/lib/analytics";

export function Analytics() {
  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    if (!domain) return;
    init({ domain, autoCapturePageviews: true });
    const listener = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest<HTMLElement>("[data-event]");
      if (element?.dataset.event) trackEvent(element.dataset.event, element.dataset.origin);
    };
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);
  return null;
}
