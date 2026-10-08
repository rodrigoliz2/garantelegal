import { MessageCircle } from "lucide-react";
import { emergencyWhatsAppHref } from "@/lib/contact";

// Barra de contacto inmediato. El despacho solo atiende por WhatsApp (llamada o mensaje),
// así que hay una sola acción. Sin animaciones: disponible desde el primer cuadro.
// En móvil ocupa --bar-h; el body reserva ese espacio para no tapar contenido.
export function UrgentBar() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-g-200 bg-white px-2 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 md:hidden" aria-label="Contacto inmediato" role="region">
        <a className="b b-urgent mx-auto flex w-full max-w-xl px-3" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="barra"><MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />Llamar o escribir por WhatsApp</a>
      </div>
      <a className="b b-solid fixed bottom-6 right-6 z-50 hidden border-g-600 md:inline-flex" href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" data-event="clic_whatsapp" data-origin="flotante"><MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />WhatsApp</a>
    </>
  );
}
