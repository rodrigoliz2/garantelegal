import { MessageCircle, Phone } from "lucide-react";
import { emergencyPhoneHref, emergencyWhatsAppHref } from "@/lib/contact";

// Barra de contacto inmediato. Sin animaciones: debe estar disponible desde el primer cuadro.
// En móvil ocupa --bar-h; el body reserva ese espacio para no tapar contenido.
export function UrgentBar() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-g-200 bg-white px-2 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 md:hidden" aria-label="Contacto inmediato" role="region">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
          <a className="b b-urgent px-3" href={emergencyPhoneHref} data-event="clic_llamar" data-origin="barra"><Phone size={18} strokeWidth={1.75} aria-hidden="true" />Llamar ahora</a>
          <a className="b b-solid px-3" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="barra"><MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />WhatsApp</a>
        </div>
      </div>
      <a className="b b-solid fixed bottom-6 right-6 z-50 hidden border-g-600 md:inline-flex" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="flotante"><MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />WhatsApp</a>
    </>
  );
}
