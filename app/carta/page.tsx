import type { Metadata } from "next";
import { MenuItem } from "@/components/carta/MenuItem";
import { categoriesWithDishes } from "@/data/dishes";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Carta de La Concha del Gato, restaurante peruano en Alcorcón: entrantes, tríos, platos a la carta, pescados y mariscos.",
};

// Pensada sobre todo para móvil (QR en mesa): categorías fijas arriba y
// platos en lista, legibles de un vistazo.
export default function CartaPage() {
  const categories = categoriesWithDishes();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-8">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-turquoise">
          Cocina peruana
        </p>
        <h1 className="font-logo text-6xl tracking-[0.1em] text-brand-gold sm:text-7xl">
          Menú
        </h1>
        <span className="h-px w-24 bg-brand-gold" />
      </div>

      <nav
        aria-label="Categorías de la carta"
        className="sticky top-16 z-40 -mx-4 mb-10 border-y border-brand-gold/15 bg-background/90 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:border"
      >
        {/* El degradado del borde derecho indica que la barra se desliza. */}
        <div className="overflow-x-auto px-4 [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:px-3">
          <ul className="flex w-max gap-2 pr-10">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="block whitespace-nowrap rounded-full border border-brand-gold/30 px-4 py-1.5 text-sm text-foreground/80 transition-colors hover:border-brand-magenta hover:text-foreground"
                >
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="flex flex-col gap-16">
        {categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-36">
            <h2 className="mb-6 flex items-center gap-4 font-display text-3xl text-brand-gold">
              {category.label}
              <span className="h-px flex-1 bg-brand-gold/30" />
            </h2>
            <ul className="flex flex-col divide-y divide-brand-gold/10">
              {category.dishes.map((dish) => (
                <MenuItem key={dish.id} dish={dish} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-16 text-center text-sm text-foreground/45">
        Estamos pasando la carta completa a la web. Si no ves un plato, pregúntanos.
      </p>
    </main>
  );
}
