import Image from "next/image";
import { Ornament } from "@/components/print/PrintFrame";
import { formatPrice, type Dish, type DishPhoto } from "@/data/dishes";

const PHOTO_RATIO = 4 / 3;

// object-position que deja el centro del plato (photo.centerY) en el centro
// del recorte 4:3. Solo aplica a fotos más altas que el recorte.
function photoPosition(photo: DishPhoto) {
  const visible = photo.width / photo.height / PHOTO_RATIO;
  if (photo.centerY === undefined || visible >= 1) return undefined;
  const offset = (photo.centerY / 100 - visible / 2) / (1 - visible);
  return `50% ${Math.min(Math.max(offset, 0), 1) * 100}%`;
}

const nameClass = "font-display text-[12pt] font-semibold leading-tight text-foreground";
const priceClass = "whitespace-nowrap font-display text-[12pt] font-semibold text-brand-gold";

/** Ficha de plato con foto: foto 4:3, nombre y precio centrados debajo. */
function DishCard({ dish, photo }: { dish: Dish; photo: DishPhoto }) {
  return (
    <li className="carta-card flex flex-col items-center text-center">
      {/* "eager": al imprimir, las imágenes diferidas pueden no llegar a cargar. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5mm] border border-brand-gold/40">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="700px"
          loading="eager"
          className="object-cover"
          style={{ objectPosition: photoPosition(photo) }}
        />
      </div>
      <h3 className={`mt-[2mm] ${nameClass}`}>{dish.name}</h3>
      {dish.price !== null && <span className={`mt-[0.5mm] ${priceClass}`}>{formatPrice(dish.price)}</span>}
    </li>
  );
}

/** Platos sin foto: nombre, línea de puntos y precio, en filas iguales. */
function DishList({ dishes, columns }: { dishes: Dish[]; columns: 1 | 2 }) {
  return (
    <ul
      className={`grid grid-flow-col gap-x-[10mm] ${columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}
      style={{ gridTemplateRows: `repeat(${Math.ceil(dishes.length / columns)}, auto)` }}
    >
      {dishes.map((dish) => (
        <li key={dish.id} className="flex items-baseline gap-[2mm] border-b border-brand-gold/15 py-[1.1mm]">
          <h3 className={nameClass}>{dish.name}</h3>
          <span className="mb-[1mm] min-w-[6mm] flex-1 border-b border-dotted border-brand-gold/50" />
          {dish.price !== null && <span className={priceClass}>{formatPrice(dish.price)}</span>}
        </li>
      ))}
    </ul>
  );
}

type CategoryBlockProps = {
  numeral: string;
  label: string;
  dishes: Dish[];
};

// Bloque de una categoría con una de dos composiciones fijas:
// - una sola foto: la ficha a la izquierda y la lista al lado;
// - varias fotos: fichas de tres en tres (última fila centrada) y la lista
//   a dos columnas debajo.
export function CategoryBlock({ numeral, label, dishes }: CategoryBlockProps) {
  const withPhoto = dishes.flatMap((dish) => (dish.photo ? [{ dish, photo: dish.photo }] : []));
  const listed = dishes.filter((dish) => !dish.photo);

  return (
    <section className="carta-category">
      <header className="mb-[4mm] flex flex-col items-center text-center text-brand-gold">
        <span className="font-logo text-[8pt] tracking-[0.3em] opacity-70">{numeral}</span>
        <h2 className="font-display text-[17pt] leading-tight">{label}</h2>
        <Ornament className="mt-[1mm] w-[50mm]" />
      </header>

      {withPhoto.length === 1 && listed.length > 0 ? (
        <div className="flex items-center gap-[8mm]">
          <ul className="contents">
            <DishCard dish={withPhoto[0].dish} photo={withPhoto[0].photo} />
          </ul>
          <div className="flex-1">
            <DishList dishes={listed} columns={1} />
          </div>
        </div>
      ) : (
        <>
          {withPhoto.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-[6mm] gap-y-[5mm]">
              {withPhoto.map(({ dish, photo }) => (
                <DishCard key={dish.id} dish={dish} photo={photo} />
              ))}
            </ul>
          )}
          {listed.length > 0 && (
            // Un único plato va centrado, con el ancho de una columna.
            <div className={`${withPhoto.length > 0 ? "mt-[5mm]" : ""} ${listed.length === 1 ? "mx-auto w-[calc((100%-10mm)/2)]" : ""}`}>
              <DishList dishes={listed} columns={listed.length === 1 ? 1 : 2} />
            </div>
          )}
        </>
      )}
    </section>
  );
}
