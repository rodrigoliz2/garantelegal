"use client";

import { usePathname } from "next/navigation";

// Temporal durante la fase 1 del rediseño: el laboratorio de variantes se ve sin el encabezado anterior.
export function LegacyChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/lab")) return null;
  return <>{children}</>;
}
