"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import type { DishPhoto } from "@/data/dishes";

type HotspotPhotoProps = {
  photo: DishPhoto;
  alt: string;
  sizes: string;
  /** Clases del contenedor (bordes, ancho máximo…). */
  className?: string;
};

// Foto real del plato, limpia. Al tocar cualquier punto aparece el componente
// principal más cercano (`photo.hotspots`, dishes.ts), sin números encima.
// La usan la landing (DishSpotlight) y la carta (MenuItem).
export function HotspotPhoto({ photo, alt, sizes, className = "" }: HotspotPhotoProps) {
  const [active, setActive] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);

  const activeSpot = active === null ? null : (photo.hotspots?.[active] ?? null);

  // Toque en cualquier punto de la foto: se muestra el componente más cercano.
  // Si no hay ninguno a menos de ~14% del ancho, se cierra la etiqueta.
  const handlePhotoClick = (e: MouseEvent<HTMLElement>) => {
    const spots = photo.hotspots;
    if (!spots?.length) return;
    setTouched(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    let best = -1;
    let bestDist = rect.width * 0.14;
    spots.forEach((spot, i) => {
      const d = Math.hypot(
        px - (spot.x / 100) * rect.width,
        py - (spot.y / 100) * rect.height,
      );
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best === -1 || best === active ? null : best);
  };

  return (
    <div
      onClick={handlePhotoClick}
      className={`relative w-full overflow-hidden ${
        photo.hotspots?.length ? "cursor-pointer" : ""
      } ${className}`}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <Image src={photo.src} alt={alt} fill sizes={sizes} className="object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/50" />

      {/* Botones invisibles: acceso por teclado y lectores de pantalla. */}
      {photo.hotspots?.map((spot, i) => (
        <button
          key={spot.label}
          type="button"
          onClick={(e) => {
            // Sin alternar: en escritorio el foco ya lo ha abierto justo antes
            // y alternar lo cerraría. Se cierra tocando fuera del punto.
            e.stopPropagation();
            setTouched(true);
            setActive(i);
          }}
          onFocus={() => setActive(i)}
          onBlur={() => setActive(null)}
          className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-turquoise"
          style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          aria-label={spot.label}
        />
      ))}

      {photo.hotspots?.length ? (
        <AnimatePresence>
          {!touched && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-brand-gold/40 bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-brand-gold backdrop-blur-sm"
            >
              Toca para ver ingredientes
            </motion.p>
          )}
        </AnimatePresence>
      ) : null}

      <AnimatePresence>
        {activeSpot && (
          <motion.div
            key={activeSpot.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute"
            style={{ left: `${activeSpot.x}%`, top: `${activeSpot.y}%` }}
          >
            <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-brand-turquoise shadow-[0_0_14px_var(--color-brand-turquoise)]" />
            <span
              className={`absolute bottom-3 whitespace-nowrap rounded-full border border-brand-gold/40 bg-background/90 px-3 py-1 font-display text-sm text-foreground ${
                // Se abre hacia el lado con más sitio para no salirse de la foto.
                activeSpot.x > 60
                  ? "right-[-6px]"
                  : activeSpot.x < 40
                    ? "left-[-6px]"
                    : "left-1/2 -translate-x-1/2"
              }`}
            >
              {activeSpot.label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
