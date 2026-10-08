import Link from "next/link";
import { emergencyPhoneHref } from "@/lib/contact";
import { siteConfig } from "@/site.config";
import { IllustrationEntrada } from "@/components/site/illustrations";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[calc(100dvh-var(--header-h)-var(--bar-h))] content-center gap-12 py-20 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <h1 className="t-h1 max-w-[14ch]">Esta página no existe.</h1>
        <p className="t-lead t-muted mt-6 max-w-[44ch]">Puede que el enlace haya cambiado. Desde aquí puedes volver al inicio o ver los servicios.</p>
        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <Link href="/" className="b b-solid">Ir al inicio</Link>
          <Link href="/servicios" className="b b-line">Ver servicios</Link>
        </div>
        <p className="t-small t-muted mt-10">¿Es una urgencia? <a href={emergencyPhoneHref} className="u text-black" data-event="clic_llamar" data-origin="404">Llama al {siteConfig.phoneDisplay}</a></p>
      </div>
      <div className="hidden lg:col-span-4 lg:col-start-9 lg:block"><IllustrationEntrada className="w-full max-w-[320px]" /></div>
    </section>
  );
}
