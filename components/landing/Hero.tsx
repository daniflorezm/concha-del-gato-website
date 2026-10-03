"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CatForkLine } from "@/components/brand/CatForkLine";
import type { Dish } from "@/data/dishes";
import { restaurant } from "@/data/restaurant";

type HeroProps = {
  dish: Dish;
};

export function Hero({ dish }: HeroProps) {
  return (
    <section className="relative mx-auto grid min-h-[92svh] w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
      {/* Fondo: el tenedor-gato del logo a línea dorada, con un halo magenta
          muy suave. Recortado a la sección para no ensanchar la página. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-magenta/10 blur-[120px] lg:left-[44%]" />
        <CatForkLine className="absolute left-1/2 top-1/2 h-[88%] -translate-x-1/2 -translate-y-1/2 opacity-[0.13] lg:left-[44%] lg:opacity-25" />
      </div>
      <div className="relative z-10 flex flex-col gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-brand-turquoise sm:tracking-[0.4em]"
        >
          <span className="hidden h-px w-10 bg-brand-turquoise sm:block" />
          {restaurant.tagline} · {restaurant.address.city}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-logo text-5xl leading-[1.05] text-brand-gold sm:text-6xl lg:text-7xl"
        >
          La concha
          <br />
          del gato
        </motion.h1>

        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-[2px] w-40 origin-left bg-brand-gold"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-md text-lg leading-relaxed text-foreground/70"
        >
          Ceviches, causas, saltados, chifa y pollo a la brasa. Cocina peruana
          de siempre en Alcorcón.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center gap-6"
        >
          <Link
            href="/carta"
            className="rounded-full bg-brand-magenta px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-foreground shadow-[0_0_30px_-6px_var(--color-brand-magenta)] transition hover:shadow-[0_0_40px_-2px_var(--color-brand-magenta)]"
          >
            Ver la carta
          </Link>
          <a
            href="#visitanos"
            className="inline-flex h-11 items-center text-sm uppercase tracking-[0.2em] text-brand-gold underline-offset-8 hover:text-brand-turquoise hover:underline"
          >
            Horario y dirección
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-[480px]"
      >
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-magenta/10 blur-3xl"
          />
          <div className="relative overflow-hidden rounded-2xl ring-1 ring-brand-gold/25">
            <Image
              src={dish.photo!.src}
              alt={dish.name}
              width={dish.photo!.width}
              height={dish.photo!.height}
              priority
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="h-auto w-full"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent"
            />
            <p className="absolute bottom-4 left-5 right-5 font-display text-lg italic text-foreground/90">
              {dish.name}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
