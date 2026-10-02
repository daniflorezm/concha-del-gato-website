"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CAT_FORK_PATH } from "@/components/brand/logoPaths";

// El tenedor-gato del logo dibujado a línea dorada fina, grande y muy tenue,
// para usarlo como fondo. El trazo se "dibuja" una vez al cargar.
// Lienzo recortado al icono (el logo completo mide 2000×1800).
export function CatForkLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="870 380 266 372"
      className={className}
      fill="none"
      aria-hidden
    >
      <motion.path
        d={CAT_FORK_PATH}
        stroke="var(--color-brand-gold)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fillRule="evenodd"
        initial={reduce ? false : { pathLength: 0, fill: "rgba(230,183,55,0)" }}
        animate={{ pathLength: 1, fill: "rgba(230,183,55,0.05)" }}
        transition={{
          pathLength: { duration: 4, ease: [0.45, 0, 0.2, 1], delay: 0.3 },
          fill: { duration: 1.5, delay: 3.6 },
        }}
      />
    </svg>
  );
}
