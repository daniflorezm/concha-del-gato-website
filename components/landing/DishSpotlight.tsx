"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type MouseEvent } from "react";
import { categoryLabels, formatPrice, type Dish } from "@/data/dishes";

type DishSpotlightProps = {
  dish: Dish;
  index: number;
};

// Foto real del plato, limpia. Al tocar cualquier punto aparece el componente
// principal más cercano (`dish.photo.hotspots`, dishes.ts), sin números encima.
export function DishSpotlight({ dish, index }: DishSpotlightProps) {
  const [active, setActive] = useState<number | null>(null);
  const photo = dish.photo;
  if (!photo) return null;

  const activeSpot = active === null ? null : (photo.hotspots?.[active] ?? null);

  // Toque en cualquier punto de la foto: se muestra el componente más cercano.
  // Si no hay ninguno a menos de ~14% del ancho, se cierra la etiqueta.
  const handlePhotoClick = (e: MouseEvent<HTMLElement>) => {
    const spots = photo.hotspots;
    if (!spots?.length) return;
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

  const landscape = photo.width > photo.height;
  const reversed = index % 2 === 1;
  const price = formatPrice(dish.price);

  return (
    <article
      id={dish.id}
      className={`mx-auto grid w-full max-w-6xl scroll-mt-24 items-center gap-10 px-4 sm:px-8 ${
        landscape ? "lg:grid-cols-[1.6fr_1fr]" : "lg:grid-cols-[1fr_1fr]"
      }`}
    >
      <motion.figure
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onClick={handlePhotoClick}
        className={`relative mx-auto w-full overflow-hidden rounded-[2rem] border border-brand-gold/30 ${
          photo.hotspots?.length ? "cursor-pointer" : ""
        } ${
          landscape ? "" : "max-w-[460px]"
        } ${reversed ? "lg:order-2" : ""}`}
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={dish.name}
          fill
          sizes={landscape ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 460px, 90vw"}
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/50" />

        {/* Botones invisibles: acceso por teclado y lectores de pantalla. */}
        {photo.hotspots?.map((spot, i) => (
          <button
            key={spot.label}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActive(active === i ? null : i);
            }}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-turquoise"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            aria-label={spot.label}
          />
        ))}

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
      </motion.figure>

      <motion.div
        initial={{ opacity: 0, x: reversed ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="flex flex-col gap-6"
      >
        <div className="flex items-baseline gap-4 text-brand-gold">
          <span className="font-display text-5xl italic">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-xs uppercase tracking-[0.35em]">
            {categoryLabels[dish.category]}
          </span>
        </div>

        <h3 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
          {dish.name}
        </h3>

        <p className="max-w-md leading-relaxed text-foreground/70">
          {dish.description}
        </p>

        {photo.hotspots && (
          <p className="border-t border-brand-gold/25 pt-5 text-xs uppercase tracking-[0.25em] text-foreground/50">
            Toca la foto para descubrir los ingredientes
          </p>
        )}

        {price && (
          <p className="font-display text-2xl text-brand-gold">{price}</p>
        )}
      </motion.div>
    </article>
  );
}
