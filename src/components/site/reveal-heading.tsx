"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

type Props = { as?: "h1" | "h2" | "h3"; lines: string[]; className?: string; id?: string };

// Titular de sección que se revela por líneas al entrar en pantalla. Solo transform.
// Sin JavaScript (o con movimiento reducido) el texto se ve desde el inicio.
export function RevealHeading({ as = "h2", lines, className, id }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(true), []);
  return createElement(
    as,
    { ref, id, className: cn("reveal", className), "data-armed": armed, "data-shown": inView, "aria-label": lines.join(" ") },
    lines.map((line, index) => (
      <span className="line" aria-hidden="true" key={index} style={{ "--i": index } as React.CSSProperties}><span>{line}</span></span>
    ))
  );
}
