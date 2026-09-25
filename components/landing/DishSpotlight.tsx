"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { categoryLabels, formatPrice, type Dish } from "@/data/dishes";

type DishSpotlightProps = {
  dish: Dish;
  index: number;
};

// Foto real del plato con los ingredientes señalados sobre la imagen, a modo
// de "carta anotada". Los puntos salen de `dish.photo.hotspots` (dishes.ts).
export function DishSpotlight({ dish, index }: DishSpotlightProps) {
  const [active, setActive] = useState<number | null>(null);
  const photo = dish.photo;
  if (!photo) return null;

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
        className={`relative mx-auto w-full overflow-hidden rounded-[2rem] border border-brand-gold/30 ${
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/50" />

        {photo.hotspots?.map((spot, i) => (
          <button
            key={spot.label}
            type="button"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(active === i ? null : i)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            aria-label={spot.label}
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.12, type: "spring", stiffness: 260 }}
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold backdrop-blur-sm transition-colors ${
                active === i
                  ? "border-brand-turquoise bg-brand-turquoise text-background"
                  : "border-foreground/80 bg-background/50 text-foreground"
              }`}
            >
              {i + 1}
            </motion.span>
            <span
              className={`pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-background/85 px-3 py-1 text-xs text-foreground transition-opacity ${
                active === i ? "opacity-100" : "opacity-0"
              }`}
            >
              {spot.label}
            </span>
          </button>
        ))}
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
          <ol className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-brand-gold/25 pt-5 text-sm">
            {photo.hotspots.map((spot, i) => (
              <li
                key={spot.label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`flex cursor-default items-center gap-3 transition-colors ${
                  active === i ? "text-brand-turquoise" : "text-foreground/60"
                }`}
              >
                <span className="font-display text-brand-gold">{i + 1}</span>
                {spot.label}
              </li>
            ))}
          </ol>
        )}

        {price && (
          <p className="font-display text-2xl text-brand-gold">{price}</p>
        )}
      </motion.div>
    </article>
  );
}
