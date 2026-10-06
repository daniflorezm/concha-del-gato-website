"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";
import { CAT_FORK_PATH } from "@/components/brand/logoPaths";
import {
  PERU_HEIGHT,
  PERU_TRUJILLO,
  PERU_PATH,
} from "@/components/brand/peruPath";
import { restaurant } from "@/data/restaurant";

// Ruta simbólica Trujillo → Alcorcón: contorno de Perú en línea dorada y un arco
// punteado hasta el tenedor-gato del restaurante. No es un mapa a escala.
// Contorno desplazado a la derecha para que quepa el rótulo "Trujillo".
const PERU_X = 110;
const PERU_Y = 20;
const ORIGIN = { x: PERU_X + PERU_TRUJILLO.x, y: PERU_Y + PERU_TRUJILLO.y };
const HOME = { x: 850, y: 150 };
const ARC = `M${ORIGIN.x} ${ORIGIN.y} Q 520 20 ${HOME.x} ${HOME.y}`;

export function PeruRoute() {
  const reduce = useReducedMotion();
  const maskId = useId().replace(/:/g, "");
  // Un solo observador para todo el dibujo: observar cada <g> por separado
  // fallaba en móvil con elementos pequeños.
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: inView ? 1 : 0 },
          transition: { duration: 0.8, delay },
        };

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 420"
      role="img"
      aria-label={`De Perú a ${restaurant.address.city}: cocina peruana en tu barrio`}
      className="mx-auto h-auto w-full max-w-3xl"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="420">
          <motion.path
            d={ARC}
            fill="none"
            stroke="white"
            strokeWidth={24}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: reduce || inView ? 1 : 0 }}
            transition={{ duration: 2.2, delay: 0.5, ease: "easeInOut" }}
          />
        </mask>
      </defs>

      <motion.path
        d={PERU_PATH}
        transform={`translate(${PERU_X} ${PERU_Y})`}
        fill="rgba(230,183,55,0.06)"
        stroke="var(--color-brand-gold)"
        strokeOpacity={0.7}
        strokeWidth={1.6}
        strokeLinejoin="round"
        {...fade(0)}
      />

      <path
        d={ARC}
        fill="none"
        stroke="var(--color-brand-gold)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="1 15"
        mask={`url(#${maskId})`}
      />

      <motion.g {...fade(0.3)}>
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r={7} fill="var(--color-brand-turquoise)" />
        <text
          x={ORIGIN.x - 20}
          y={ORIGIN.y + 10}
          textAnchor="end"
          className="fill-foreground font-display"
          fontSize={36}
        >
          Trujillo
        </text>
      </motion.g>

      <motion.g {...fade(2.4)}>
        <circle cx={HOME.x} cy={HOME.y} r={7} fill="var(--color-brand-magenta)" />
        <motion.circle
          cx={HOME.x}
          cy={HOME.y}
          fill="none"
          stroke="var(--color-brand-magenta)"
          strokeWidth={2}
          initial={{ r: 8, opacity: 0.8 }}
          animate={reduce ? { r: 14, opacity: 0.5 } : { r: 30, opacity: 0 }}
          transition={{ duration: 2.4, repeat: reduce ? 0 : Infinity, ease: "easeOut" }}
        />
        <svg
          viewBox="870 380 266 372"
          x={HOME.x - 32}
          y={HOME.y - 128}
          width={64}
          height={90}
        >
          <path d={CAT_FORK_PATH} fill="var(--color-brand-turquoise)" fillRule="evenodd" />
        </svg>
        <text
          x={HOME.x}
          y={HOME.y + 52}
          textAnchor="middle"
          className="fill-foreground font-display"
          fontSize={36}
        >
          {restaurant.address.city}
        </text>
      </motion.g>

      <motion.text
        x={500}
        y={360}
        textAnchor="middle"
        className="fill-brand-gold font-display italic"
        fontSize={34}
        {...fade(1.4)}
      >
        Del Perú a tu barrio
      </motion.text>
    </svg>
  );
}
