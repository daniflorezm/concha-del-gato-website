import { categoryLabels, type DishCategory } from "@/data/dishes";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

// Índice de la carta con el aire de la carta impresa: número romano, nombre
// en serif y línea de puntos dorada.
export function MenuIndex() {
  const categories = Object.entries(categoryLabels) as [DishCategory, string][];

  return (
    <section id="carta" className="mx-auto w-full max-w-3xl px-4 sm:px-8">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-turquoise">
          Carta digital
        </p>
        <h2 className="font-display text-6xl tracking-[0.15em] text-brand-gold sm:text-7xl">
          MENÚ
        </h2>
        <span className="h-px w-24 bg-brand-gold" />
      </div>

      <ol className="flex flex-col">
        {categories.map(([id, label], i) => (
          <li
            key={id}
            className="group flex items-baseline gap-4 border-b border-transparent py-3"
          >
            <span className="w-10 shrink-0 font-display text-sm text-brand-gold/70">
              {ROMAN[i]}
            </span>
            <span className="font-display text-2xl text-foreground transition-colors group-hover:text-brand-magenta sm:text-3xl">
              {label}
            </span>
            <span className="mb-1 flex-1 border-b border-dotted border-brand-gold/40" />
          </li>
        ))}
      </ol>

      <p className="mt-10 text-center text-sm text-foreground/50">
        La carta completa, plato a plato y en 3D, está en preparación.
      </p>
    </section>
  );
}
