"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { HotspotPhoto } from "@/components/dish/HotspotPhoto";
import { formatPrice, type Dish } from "@/data/dishes";

type MenuItemProps = {
  dish: Dish;
};

// Fila de la carta. Si el plato tiene foto, la miniatura (o "Ver qué lleva")
// la despliega aquí mismo con los ingredientes tocables.
export function MenuItem({ dish }: MenuItemProps) {
  const [open, setOpen] = useState(false);
  const price = formatPrice(dish.price);
  const photo = dish.photo;
  const panelId = `${dish.id}-foto`;

  return (
    <li id={dish.id} className="scroll-mt-36 py-5">
      <div className="flex gap-4 sm:gap-6">
        {photo && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? "Ocultar" : "Ver"} foto de ${dish.name}`}
            className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-brand-gold/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-turquoise sm:h-28 sm:w-28"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="112px"
              className="scale-[1.6] object-cover"
            />
          </button>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-baseline gap-3">
            <h3 className="font-display text-xl text-foreground sm:text-2xl">{dish.name}</h3>
            <span className="mb-1 flex-1 border-b border-dotted border-brand-gold/30" />
            {price && <span className="font-display text-lg text-brand-gold">{price}</span>}
          </div>
          {dish.description && (
            <p className="text-sm leading-relaxed text-foreground/65">{dish.description}</p>
          )}
          {dish.allergens && (
            <p className="text-xs text-foreground/45">
              Alérgenos: {dish.allergens.length ? dish.allergens.join(", ") : "ninguno"}
            </p>
          )}
          {photo?.hotspots && (
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls={panelId}
              className="-my-3 self-start py-3 text-left text-xs uppercase tracking-[0.2em] text-brand-turquoise/80 hover:text-brand-turquoise"
            >
              {open ? "Ocultar foto ↑" : "Ver qué lleva →"}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {photo && open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <HotspotPhoto
              photo={photo}
              alt={dish.name}
              sizes="(min-width: 640px) 460px, 92vw"
              className="mx-auto mt-5 max-w-[460px] rounded-[1.5rem] border border-brand-gold/30"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
