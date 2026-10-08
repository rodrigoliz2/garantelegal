"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = Omit<ImageProps, "fill" | "className"> & { className?: string; imageClassName?: string; strength?: number; settle?: boolean };

// Imagen a sangre con paralaje sutil. El contenedor recorta; la imagen se desplaza
// un porcentaje pequeño de su altura mientras la sección cruza la pantalla.
export function ParallaxImage({ className, imageClassName, strength = 8, settle = false, alt, ...image }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute inset-x-0 -inset-y-[10%]" style={reduce ? undefined : { y }}>
        <div className={cn("absolute inset-0", settle && "seq-img")}>
          <Image fill alt={alt} className={cn("object-cover", imageClassName)} {...image} />
        </div>
      </motion.div>
    </div>
  );
}
