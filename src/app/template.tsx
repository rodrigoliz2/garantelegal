"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

// Transición entre páginas: breve y siempre la misma. No corre en la primera carga
// (no retrasa el LCP) ni en /urgencias, que debe mostrarse al instante.
let firstPaint = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [initial] = useState(firstPaint);
  useEffect(() => { firstPaint = false; }, []);
  const skip = initial || reduce || pathname?.startsWith("/urgencias");
  return (
    <motion.div
      initial={skip ? false : { opacity: 0, transform: "translateY(10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)", transitionEnd: { transform: "none" } }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
