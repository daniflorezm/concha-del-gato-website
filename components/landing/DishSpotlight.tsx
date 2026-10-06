"use client";

import { motion } from "framer-motion";
import { HotspotPhoto } from "@/components/dish/HotspotPhoto";
import { categoryLabels, formatPrice, type Dish } from "@/data/dishes";

type DishSpotlightProps = {
  dish: Dish;
  index: number;
};

// Plato destacado de la landing: foto con ingredientes tocables (HotspotPhoto)
// y, al lado, nombre, descripción y precio.
export function DishSpotlight({ dish, index }: DishSpotlightProps) {
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto w-full ${landscape ? "" : "max-w-[460px]"} ${reversed ? "lg:order-2" : ""}`}
      >
        <HotspotPhoto
          photo={photo}
          alt={dish.name}
          sizes={landscape ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 460px, 90vw"}
          className="rounded-[2rem] border border-brand-gold/30"
        />
      </motion.div>

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

        {price && (
          <p className="font-display text-2xl text-brand-gold">{price}</p>
        )}
      </motion.div>
    </article>
  );
}
