import Link from "next/link";
import { categoriesWithDishes } from "@/data/dishes";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

// Índice de la carta con el aire de la carta impresa: número romano, nombre
// en serif y línea de puntos dorada. Solo lista categorías que ya tienen platos.
export function MenuIndex() {
  const categories = categoriesWithDishes();

  return (
    <section id="carta" className="mx-auto w-full max-w-3xl px-4 sm:px-8">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-turquoise">
          Carta digital
        </p>
        <h2 className="font-logo text-6xl tracking-[0.1em] text-brand-gold sm:text-7xl">
          Menú
        </h2>
        <span className="h-px w-24 bg-brand-gold" />
      </div>

      <ol className="flex flex-col">
        {categories.map((category, i) => (
          <li key={category.id}>
            <Link
              href={`/carta#${category.id}`}
              className="group flex items-baseline gap-4 py-3"
            >
              <span className="w-10 shrink-0 font-display text-sm text-brand-gold/70">
                {ROMAN[i]}
              </span>
              <span className="font-display text-2xl text-foreground transition-colors group-hover:text-brand-magenta sm:text-3xl">
                {category.label}
              </span>
              <span className="mb-1 flex-1 border-b border-dotted border-brand-gold/40" />
              <span className="text-sm text-foreground/50">
                {category.dishes.length} {category.dishes.length === 1 ? "plato" : "platos"}
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <Link
          href="/carta"
          className="rounded-full border border-brand-gold px-7 py-3 text-sm uppercase tracking-[0.2em] text-brand-gold transition-colors hover:bg-brand-gold hover:text-background"
        >
          Ver la carta
        </Link>
      </div>
    </section>
  );
}
