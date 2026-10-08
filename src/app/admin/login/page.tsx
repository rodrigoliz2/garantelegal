import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata: Metadata = { title: "Acceso del despacho", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return <div className="container-page section-pad"><p className="eyebrow text-brass">Acceso privado</p><h1 className="display mt-3 text-5xl">Panel del despacho</h1><p className="mt-4">Solo usuarios autorizados. No existe registro público.</p><AdminLoginForm /></div>;
}
