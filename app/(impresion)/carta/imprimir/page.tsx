import type { Metadata } from "next";
import Image from "next/image";
import { Logo } from "@/components/brand/Logo";
import { LineTexture } from "@/components/brand/LineTexture";
import { ROMAN } from "@/components/landing/MenuIndex";
import { Ornament, PrintFrame } from "@/components/print/PrintFrame";
import { PrintToolbar } from "@/components/print/PrintToolbar";
import { categoriesWithDishes, formatPrice } from "@/data/dishes";
import { formatSlots, openingHours, restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Carta para imprimir",
  robots: { index: false },
};

// Carta física en A4 generada desde dishes.ts: mismo contenido y orden que
// /carta, con la miniatura de cada plato que tiene foto. "?fondo=claro" da una
// versión para impresora doméstica.
export default async function CartaImprimirPage({ searchParams }: PageProps<"/carta/imprimir">) {
  const light = (await searchParams).fondo === "claro";
  const categories = categoriesWithDishes();
  const { address } = restaurant;

  return (
    <div className={`carta-print ${light ? "carta-print--light" : ""}`}>
      <PrintToolbar light={light} />
      {/* Al imprimir, este marco se repite en cada hoja (position: fixed). */}
      <PrintFrame className="carta-frame--print" />

      {/* Portada */}
      <section className="carta-sheet carta-cover relative flex flex-col items-center justify-between overflow-hidden text-center">
        <LineTexture className="text-foreground/[0.05]" />
        <PrintFrame className="carta-frame--screen" />
        <p className="relative text-[9pt] uppercase tracking-[0.4em] text-brand-turquoise">
          Cocina peruana
        </p>
        <div className="relative flex flex-col items-center gap-[10mm]">
          <Logo variant="full" className="w-[120mm]" />
          <h1 className="font-logo text-[44pt] tracking-[0.1em] text-brand-gold">Menú</h1>
          <Ornament className="w-[60mm]" />
        </div>
        <div className="relative flex flex-col items-center gap-[2mm] text-[9.5pt] text-foreground/70">
          <p>
            {address.street} · {address.postalCode} {address.city}, {address.region}
          </p>
          <p className="font-display text-[13pt] text-brand-gold">Tel. {restaurant.phone}</p>
        </div>
      </section>

      {/* Platos: dos columnas que fluyen de una página a otra */}
      <section className="carta-sheet carta-body relative">
        <PrintFrame className="carta-frame--screen" />
        <div className="carta-columns">
          {categories.map((category, i) => (
            <section key={category.id} className="carta-category">
              <header className="carta-category-title mb-[2mm] flex flex-col items-center text-center text-brand-gold">
                <span className="font-logo text-[8pt] tracking-[0.3em] opacity-70">{ROMAN[i]}</span>
                <h2 className="font-display text-[16pt] leading-tight">{category.label}</h2>
                <Ornament className="mt-[1mm] w-[45mm]" />
              </header>
              <ul>
                {category.dishes.map((dish) => {
                  const price = formatPrice(dish.price);
                  return (
                    <li key={dish.id} className="carta-dish flex gap-[3mm] border-b border-brand-gold/15 py-[1.7mm] last:border-b-0">
                      {dish.photo && (
                        // Mismo recorte que la miniatura de /carta. "eager": al
                        // imprimir, las imágenes diferidas pueden no llegar a cargar.
                        <div className="relative h-[20mm] w-[20mm] shrink-0 overflow-hidden rounded-[3mm] border border-brand-gold/25">
                          <Image
                            src={dish.photo.src}
                            alt=""
                            fill
                            sizes="480px"
                            loading="eager"
                            className="scale-[1.6] object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-[2mm]">
                          <h3 className="font-display text-[12pt] font-semibold leading-snug text-foreground">
                            {dish.name}
                          </h3>
                          <span className="mb-[1mm] flex-1 border-b border-dotted border-brand-gold/50" />
                          {price && (
                            <span className="whitespace-nowrap font-display text-[12pt] font-semibold text-brand-gold">
                              {price}
                            </span>
                          )}
                        </div>
                        {dish.description && (
                          <p className="mt-[0.6mm] text-[8.5pt] leading-[1.35] text-foreground/75">
                            {dish.description}
                          </p>
                        )}
                        {dish.allergens && (
                          <p className="mt-[0.4mm] text-[7pt] text-foreground/55">
                            Alérgenos: {dish.allergens.length ? dish.allergens.join(", ") : "ninguno"}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <footer className="carta-footer mt-[8mm] flex flex-col items-center gap-[2.5mm] text-center text-[8pt] text-foreground/65">
          <Ornament className="mb-[2mm] w-[80mm]" />
          <p>
            Los alérgenos marcados con * pueden variar según la elaboración. Si tienes alguna
            alergia o intolerancia, avísanos antes de pedir.
          </p>
          <p className="flex flex-wrap justify-center gap-x-[4mm]">
            {openingHours.map((day) => (
              <span key={day.day}>
                <span className="text-brand-gold">{day.label}</span> {formatSlots(day.slots)}
              </span>
            ))}
          </p>
          <p className="flex items-center gap-[2mm]">
            <Logo className="h-[6mm] w-[7mm]" />
            <span className="font-logo text-brand-gold">{restaurant.name}</span> ·{" "}
            {address.street}, {address.city} · {restaurant.phone}
          </p>
        </footer>
      </section>
    </div>
  );
}
