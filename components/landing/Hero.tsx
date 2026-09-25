"use client";

import { motion } from "framer-motion";
import { ShellFrame } from "@/components/brand/ShellFrame";
import type { Dish } from "@/data/dishes";

type HeroProps = {
  dish: Dish;
};

export function Hero({ dish }: HeroProps) {
  return (
    <section className="relative mx-auto grid min-h-[92svh] w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-28 sm:px-8 lg:grid-cols-[1.05fr_1fr]">
      <div className="relative z-10 flex flex-col gap-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-brand-gold"
        >
          <span className="h-px w-10 bg-brand-gold" />
          Cocina peruana
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-6xl leading-[0.9] text-foreground sm:text-7xl lg:text-8xl"
        >
          La <span className="neon-text italic text-brand-magenta">Concha</span>
          <br />
          del Gato
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="max-w-md text-lg leading-relaxed text-foreground/70"
        >
          Ceviches, causas, saltados y chifa. Antes de pedir, mira cada plato
          de cerca: lo que lleva, cómo llega a la mesa y a qué sabe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center gap-6"
        >
          <a
            href="#platos"
            className="rounded-full bg-brand-magenta px-7 py-3 text-sm font-medium uppercase tracking-[0.2em] text-foreground shadow-[0_0_30px_-6px_var(--color-brand-magenta)] transition hover:shadow-[0_0_40px_-2px_var(--color-brand-magenta)]"
          >
            Ver platos
          </a>
          <a
            href="#carta"
            className="text-sm uppercase tracking-[0.2em] text-brand-gold underline-offset-8 hover:text-brand-turquoise hover:underline"
          >
            La carta
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto w-full max-w-[520px]"
      >
        <ShellFrame
          src={dish.photo!.src}
          alt={dish.name}
          priority
          objectPosition="40% 50%"
        />
        <p className="absolute -bottom-2 right-0 font-display text-sm italic text-foreground/60">
          {dish.name}
        </p>
      </motion.div>
    </section>
  );
}
