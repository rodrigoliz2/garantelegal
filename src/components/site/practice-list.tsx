"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export type PracticeItem = { slug: string; name: string; description: string; services: string[]; image: { src: string; alt: string } };

const ease = [0.23, 1, 0.32, 1] as const;

// Escritorio: lista de nombres grandes. Al pasar el cursor el nombre se desplaza y la
// fotografía del área sigue al puntero (con resorte, solo transform y opacity).
function HoverList({ items }: { items: PracticeItem[] }) {
  const list = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.6 });

  function move(event: React.PointerEvent) {
    const box = list.current?.getBoundingClientRect();
    if (!box) return;
    x.set(event.clientX - box.left);
    y.set(event.clientY - box.top);
  }

  return (
    <div className="relative">
      <ul ref={list} className="border-t border-g-200" onPointerMove={move} onPointerLeave={() => setActive(null)}>
        {items.map(item => (
          <li key={item.slug} className="border-b border-g-200">
            <Link
              href={`/servicios/${item.slug}`}
              className="group grid grid-cols-12 items-center gap-6 py-7 lg:py-9"
              onPointerEnter={() => setActive(item.slug)}
              onFocus={() => setActive(item.slug)}
              onBlur={() => setActive(null)}
            >
              <span className={cn("t-h2 col-span-7 transition-[transform,opacity] duration-[260ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-6 group-focus-visible:translate-x-6", active && active !== item.slug && "opacity-30")}>{item.name}</span>
              <span className={cn("t-muted col-span-5 max-w-[42ch] transition-opacity duration-200 xl:col-span-4 xl:col-start-9", active && active !== item.slug && "opacity-30")}>{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 ml-12 -mt-[170px] h-[340px] w-[272px]"
        style={{ x: reduce ? x : springX, y: reduce ? y : springY }}
      >
        {items.map(item => (
          <motion.div
            key={item.slug}
            className="absolute inset-0 overflow-hidden"
            initial={false}
            animate={{ opacity: active === item.slug ? 1 : 0, scale: active === item.slug || reduce ? 1 : 0.94 }}
            transition={{ duration: 0.22, ease }}
          >
            <Image src={item.image.src} alt="" fill sizes="272px" quality={60} className="object-cover" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Móvil y pantallas táctiles: acordeón con altura animada.
function Accordion({ items }: { items: PracticeItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const id = useId();
  return (
    <ul className="border-t border-g-200">
      {items.map(item => {
        const expanded = open === item.slug;
        const panel = `${id}-${item.slug}`;
        return (
          <li key={item.slug} className="border-b border-g-200">
            <h3>
              <button type="button" className="tap flex w-full min-h-[72px] items-center justify-between gap-4 py-4 text-left" aria-expanded={expanded} aria-controls={panel} onClick={() => setOpen(expanded ? null : item.slug)}>
                <span className="t-h2">{item.name}</span>
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                  <span className={cn("absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-200", expanded && "scale-y-0")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panel}
                  className="overflow-hidden"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                >
                  <div className="grid gap-5 pb-8">
                    <p className="t-muted">{item.description}</p>
                    <div className="relative aspect-[16/10] overflow-hidden bg-g-50">
                      <Image src={item.image.src} alt={item.image.alt} fill sizes="100vw" quality={60} className="object-cover" />
                    </div>
                    {item.services.length > 0 && <ul className="grid gap-1 text-[.9375rem]">{item.services.slice(0, 4).map(name => <li key={name}>{name}</li>)}</ul>}
                    <Link href={`/servicios/${item.slug}`} className="u self-start">Ver {item.name.toLocaleLowerCase("es-MX")}</Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

export function PracticeList({ items }: { items: PracticeItem[] }) {
  return (
    <>
      <div className="hidden [@media(hover:hover)_and_(min-width:768px)]:block"><HoverList items={items} /></div>
      <div className="[@media(hover:hover)_and_(min-width:768px)]:hidden"><Accordion items={items} /></div>
    </>
  );
}
