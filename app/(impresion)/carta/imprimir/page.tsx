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
                    <li key={dish.id} className="carta-dish border-b border-brand-gold/15 py-[2mm] last:border-b-0">
                      {dish.photo && (
                        // Foto a todo el ancho de la columna. "eager": al
                        // imprimir, las imágenes diferidas pueden no llegar a cargar.
                        <div className="relative mb-[2mm] aspect-[4/3] w-full overflow-hidden rounded-[3mm] border border-brand-gold/30">
                          <Image
                            src={dish.photo.src}
                            alt=""
                            fill
                            sizes="1000px"
                            loading="eager"
                            className="object-cover"
                          />
                        </div>
                      )}
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
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </section>

      {/* Contraportada */}
      <section className="carta-sheet carta-cover carta-back relative flex flex-col items-center justify-center gap-[10mm] overflow-hidden text-center">
        <LineTexture className="text-foreground/[0.05]" />
        <PrintFrame className="carta-frame--screen" />
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
