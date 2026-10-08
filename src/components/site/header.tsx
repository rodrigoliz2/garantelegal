"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Phone } from "lucide-react";
import { Wordmark } from "./wordmark";
import { emergencyPhoneHref, emergencyWhatsAppHref } from "@/lib/contact";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Urgencias", href: "/urgencias" },
  { label: "Áreas de práctica", href: "/servicios" },
  { label: "La firma", href: "/nosotros" },
  { label: "Guías", href: "/guias" },
  { label: "Contacto", href: "/contacto" }
] as const;

const ease = [0.23, 1, 0.32, 1] as const;

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useMotionValueEvent(scrollY, "change", latest => {
    const previous = scrollY.getPrevious() ?? 0;
    setAtTop(latest < 24);
    if (latest < 120) setHidden(false);
    else if (latest > previous + 4) setHidden(true);
    else if (latest < previous - 4) setHidden(false);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const trigger = menuButton.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const transparent = overlay && atTop && !open;

  return (
    <>
      <header
        data-hidden={hidden && !open}
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color,border-color] duration-[240ms] ease-[cubic-bezier(0.23,1,0.32,1)] data-[hidden=true]:-translate-y-full motion-reduce:transition-none",
          transparent ? "border-b border-transparent bg-transparent text-[var(--white)]" : "border-b border-[var(--g-200)] bg-[var(--white)] text-[var(--black)]"
        )}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6 lg:h-[72px]">
          <Link href="/" aria-label={`${siteConfig.name}, inicio`} className="flex min-h-12 items-center"><Wordmark /></Link>
          <nav aria-label="Navegación principal" className="hidden items-center gap-7 text-[0.9375rem] lg:flex">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={cn("u", pathname?.startsWith(link.href) && "u-on")} aria-current={pathname?.startsWith(link.href) ? "page" : undefined}>{link.label}</Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/agendar" className={cn("b b-line !min-h-11 px-4 text-[0.9375rem]")}>Agendar consulta</Link>
            <a href={emergencyPhoneHref} className="b b-urgent !min-h-11 px-4 text-[0.9375rem]" data-event="clic_llamar" data-origin="encabezado"><Phone size={16} strokeWidth={1.75} aria-hidden="true" />Llamar ahora</a>
          </div>
          <button
            ref={menuButton}
            type="button"
            className="-mr-3 flex h-12 min-w-12 items-center justify-center px-3 text-[0.9375rem] font-medium md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen(value => !value)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="mono fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col overflow-y-auto bg-[var(--black)] text-[var(--white)] md:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, ease }}
          >
            <nav aria-label="Navegación móvil" className="wrap flex flex-1 flex-col pt-6">
              {[...navLinks, { label: "Agendar consulta", href: "/agendar" }].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={reduce ? false : { opacity: 0, transform: "translateY(18px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ duration: 0.25, ease, delay: reduce ? 0 : 0.04 + index * 0.04 }}
                >
                  <Link ref={index === 0 ? firstLink : undefined} href={link.href} className="flex min-h-14 items-center border-b border-[var(--g-900)] py-2 text-[2.125rem] font-light leading-none tracking-[-0.04em]">{link.label}</Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="wrap grid gap-2 pb-[calc(var(--bar-h)+24px)] pt-8"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: reduce ? 0 : 0.3 }}
            >
              <p className="t-small text-[var(--g-400)]">Línea directa y WhatsApp</p>
              <a href={emergencyPhoneHref} className="text-[1.75rem] font-light tracking-[-0.03em]" data-event="clic_llamar" data-origin="menu">{siteConfig.phoneDisplay}</a>
              <a href={emergencyWhatsAppHref} target="_blank" rel="noopener noreferrer" className="u self-start" data-event="clic_whatsapp" data-origin="menu">Escribir por WhatsApp</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
