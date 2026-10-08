"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type TestimonialItem = { id: string; author: string; text: string; date: string; source: string };

const ease = [0.23, 1, 0.32, 1] as const;
const INTERVAL = 8000;

const monthYear = (iso: string) => new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

// Carrusel de testimonios: avanza solo, se pausa al pasar el cursor, al enfocar con
// teclado o si la pestaña no está visible. Con movimiento reducido no avanza solo.
export function Testimonials({ items, tone = "dark" }: { items: TestimonialItem[]; tone?: "dark" | "light" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const many = items.length > 1;
  const autoplay = many && !reduce && !paused;

  const go = useCallback((step: number) => setIndex(current => (current + step + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => go(1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [autoplay, index, go]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.visibilityState !== "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (!items.length) return null;
  const item = items[index];
  const fromGoogle = /google/i.test(item.source);

  return (
    <div
      role="region"
      aria-roledescription="carrusel"
      aria-label="Testimonios de clientes"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative min-h-[16rem] md:min-h-[18rem]" aria-live={autoplay ? "off" : "polite"}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={item.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(14px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: 0.4, ease }}
          >
            <blockquote>
              <p className="t-quote max-w-[30ch] text-[clamp(1.625rem,3vw,2.75rem)] leading-[1.15]">«{item.text}»</p>
            </blockquote>
            <figcaption className="mt-8 text-[.9375rem]">
              <span className="font-medium">{item.author}</span>
              <span className={cn("block", tone === "dark" ? "text-g-400" : "text-g-600")}>{fromGoogle ? "Reseña en Google" : item.source}, {monthYear(item.date)}. Publicado con autorización.</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {many && (
        <div className="mt-10">
          <div className={cn("h-px w-full overflow-hidden", tone === "dark" ? "bg-g-900" : "bg-g-200")} aria-hidden="true">
            <motion.div
              key={`${item.id}-${autoplay}`}
              className={cn("h-px origin-left", tone === "dark" ? "bg-white" : "bg-black")}
              initial={{ transform: "scaleX(0)" }}
              animate={{ transform: autoplay ? "scaleX(1)" : "scaleX(0)" }}
              transition={{ duration: autoplay ? INTERVAL / 1000 : 0.2, ease: "linear" }}
            />
          </div>
          <div className="mt-5 flex items-center gap-6 text-[.9375rem]">
            <button type="button" className="u u-hover tap min-h-11" onClick={() => go(-1)}>Anterior</button>
            <button type="button" className="u u-hover tap min-h-11" onClick={() => go(1)}>Siguiente</button>
            <span className={cn("ml-auto t-small", tone === "dark" ? "text-g-400" : "text-g-600")} aria-live="polite">{index + 1} de {items.length}</span>
          </div>
        </div>
      )}
    </div>
  );
}
