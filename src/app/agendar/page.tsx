import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "@/components/booking-form";
import { turnstileSiteKey } from "@/lib/abuse";
import { emergencyWhatsAppHref } from "@/lib/contact";
import { provided, siteConfig } from "@/site.config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMetadata({ title: "Agendar consulta", path: "/agendar", description: "Agenda una consulta jurídica presencial en Guadalajara, por videollamada o por llamada de WhatsApp. Elige día y hora y recibe tu folio." });

export default async function BookingPage({ searchParams }: { searchParams: Promise<{ servicio?: string }> }) {
  const params = await searchParams;
  const services = await prisma.service.findMany({ where: { published: true }, include: { area: true }, orderBy: [{ area: { sortOrder: "asc" } }, { sortOrder: "asc" }] });
  const cost = provided(siteConfig.consultationCost);
  const address = provided(siteConfig.address);
  return (
    <div className="wrap grid gap-14 pb-24 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
          <h1 className="t-h1 max-w-[12ch] lg:text-[clamp(3rem,4.4vw,4.75rem)]">Agenda una conversación.</h1>
          <p className="t-lead t-muted mt-6 max-w-[38ch]">Elige un horario disponible. La solicitud queda pendiente hasta que el despacho la confirme.</p>
          <dl className="mt-10 grid gap-0 border-t border-g-200 text-[.9375rem]">
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-g-200 py-4"><dt className="t-muted">Modalidad</dt><dd>Presencial en Guadalajara, videollamada o llamada por WhatsApp</dd></div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-g-200 py-4"><dt className="t-muted">Duración</dt><dd>{siteConfig.booking.durationMinutes} minutos</dd></div>
            {cost && <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-g-200 py-4"><dt className="t-muted">Costo</dt><dd>{cost}</dd></div>}
            {address && <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-g-200 py-4"><dt className="t-muted">Oficina</dt><dd>{address}</dd></div>}
          </dl>
          <p className="t-small t-muted mt-8">Las urgencias no se agendan: <a href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" className="u text-black" data-event="clic_whatsapp" data-origin="agendar">llámanos o escríbenos por WhatsApp al {siteConfig.phoneDisplay}</a>.</p>
        </div>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <BookingForm services={services.map(item => ({ id: item.id, name: item.name, areaId: item.areaId, areaName: item.area.name, isEmergency: item.isEmergency }))} initialServiceId={params.servicio} turnstileSiteKey={turnstileSiteKey()} />
      </div>
    </div>
  );
}
