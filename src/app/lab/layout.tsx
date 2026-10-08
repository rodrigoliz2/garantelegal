import type { Metadata } from "next";

export const metadata: Metadata = { title: "Laboratorio", robots: { index: false, follow: false } };

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return <div className="mono">{children}</div>;
}
