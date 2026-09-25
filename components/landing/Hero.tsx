"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShellFrame } from "@/components/brand/ShellFrame";
import type { Dish } from "@/data/dishes";
import { restaurant } from "@/data/restaurant";

type HeroProps = {
  dish: Dish;
};

export function Hero({ dish }: HeroProps) {
  return (
    <section className="relative mx-auto grid min-h-[92svh] w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1fr_1.05fr]">
      <div className="relative z-10 flex flex-col gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 text-xs uppercase tracking-[0.25em] text-brand-turquoise sm:tracking-[0.4em]"
        >
          <span className="h-px w-10 bg-brand-turquoise" />
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
            className="text-sm uppercase tracking-[0.2em] text-brand-gold underline-offset-8 hover:text-brand-turquoise hover:underline"
          >
            Horario y dirección
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-[560px]"
      >
        <ShellFrame
          src={dish.photo!.src}
          alt={dish.name}
          priority
          objectPosition="40% 50%"
        />
        <p className="mt-3 text-right font-display text-sm italic text-foreground/60">
          {dish.name}
        </p>
      </motion.div>
    </section>
  );
}
