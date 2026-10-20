import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { LineTexture } from "@/components/brand/LineTexture";
import { CategoryBlock, splitForPrint } from "@/components/print/CategoryBlock";
import { Ornament, PrintFootArt, PrintFrame } from "@/components/print/PrintFrame";
import { PrintPages } from "@/components/print/PrintPages";
import { PrintToolbar } from "@/components/print/PrintToolbar";
import { categoriesWithDishes } from "@/data/dishes";
import { formatSlots, openingHours, restaurant } from "@/data/restaurant";

export const metadata: Metadata = {
  title: "Carta para imprimir",
  robots: { index: false },
};

// Carta física en A4 generada desde dishes.ts, en el mismo orden que /carta:
// solo nombre y precio, con foto grande en los platos que la tienen. Las
// descripciones y alérgenos quedan en la carta digital. "?fondo=claro" da una
// versión para impresora doméstica.
export default async function CartaImprimirPage({ searchParams }: PageProps<"/carta/imprimir">) {
  const light = (await searchParams).fondo === "claro";
  const categories = categoriesWithDishes();
  const { address } = restaurant;

  return (
    <div className={`carta-print ${light ? "carta-print--light" : ""}`}>
      <PrintToolbar light={light} />

      {/* Portada */}
      <section className="carta-sheet carta-cover relative flex flex-col items-center justify-between overflow-hidden text-center">
        <LineTexture className="text-foreground/[0.05]" />
        <PrintFrame />
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

      {/* Platos: cada categoría (o cada tramo, si no cabe en una hoja) es un
          bloque que PrintPages coloca entero en las hojas. */}
      <PrintPages
        blocks={categories.flatMap((category) =>
          splitForPrint(category.dishes).map((part, i) => (
            <CategoryBlock key={`${category.id}-${i}`} label={category.label} part={part} />
          )),
        )}
      />

      {/* Contraportada */}
      <section className="carta-sheet carta-cover relative flex flex-col items-center justify-center gap-[10mm] overflow-hidden text-center">
        <PrintFootArt />
        <PrintFrame />
        <div className="relative flex flex-col items-center gap-[4mm]">
          <Logo className="h-[28mm] w-[32mm]" />
          <p className="font-logo text-[20pt] tracking-[0.08em] text-brand-gold">{restaurant.name}</p>
          <p className="text-[8pt] uppercase tracking-[0.4em] text-brand-turquoise">{restaurant.tagline}</p>
        </div>
        <Ornament className="relative w-[60mm]" />
        <div className="relative flex flex-col items-center gap-[2mm]">
          <p className="font-logo text-[11pt] tracking-[0.2em] text-brand-gold">Horario</p>
          <dl className="grid grid-cols-[auto_auto] gap-x-[8mm] gap-y-[1.2mm] text-left text-[10pt]">
            {openingHours.map((day) => (
              <div key={day.day} className="contents">
                <dt className="font-display text-[12pt] text-brand-gold">{day.label}</dt>
                <dd className="text-foreground/80">{formatSlots(day.slots)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Ornament className="relative w-[60mm]" />
        <div className="relative flex flex-col items-center gap-[1.5mm] text-[10pt] text-foreground/80">
          <p>
            {address.street} · {address.postalCode} {address.city}, {address.region}
          </p>
          <p className="font-display text-[14pt] text-brand-gold">Tel. {restaurant.phone}</p>
        </div>
        <p className="relative max-w-[120mm] text-[8.5pt] leading-relaxed text-foreground/60">
          Consulta los ingredientes y alérgenos de cada plato con nuestro personal o en la
          carta digital. Si tienes alguna alergia o intolerancia, avísanos antes de pedir.
        </p>
      </section>
    </div>
  );
}
