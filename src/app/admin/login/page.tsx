import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = { title: "Acceso del despacho", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <div className="wrap grid min-h-[calc(100dvh-var(--header-h)-var(--bar-h))] content-center gap-12 py-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h1 className="t-h1">Panel del despacho</h1>
        <p className="t-muted mt-6 max-w-[36ch]">Acceso privado. Solo usuarios autorizados; no existe registro público.</p>
      </div>
      <div className="lg:col-span-5 lg:col-start-8"><AdminLoginForm /></div>
    </div>
  );
}
