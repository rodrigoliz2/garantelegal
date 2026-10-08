import { MessageCircle, Phone } from "lucide-react";
import { emergencyPhoneHref, emergencyWhatsAppHref } from "@/lib/contact";
import { siteConfig } from "@/site.config";

export function EmergencyBar() {
  return <>
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#721d22] bg-paper p-2 shadow-[0_-5px_22px_#15263428] md:hidden" aria-label="Contacto inmediato">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
        <a className="btn btn-emergency" href={emergencyPhoneHref} data-event="clic_llamar" data-origin="barra"><Phone size={18} aria-hidden="true" />Llamar ahora</a>
        <a className="btn btn-primary" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="barra"><MessageCircle size={18} aria-hidden="true" />WhatsApp</a>
      </div>
    </div>
    <a className="btn btn-primary fixed bottom-5 right-5 z-50 hidden shadow-xl md:inline-flex" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="flotante"><MessageCircle size={19} aria-hidden="true" />WhatsApp</a>
    <span className="sr-only">Horario de la línea: {siteConfig.emergencyHours}</span>
  </>;
}
