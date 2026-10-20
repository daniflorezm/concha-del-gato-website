import Image from "next/image";
import { formatPrice, type Dish, type DishPhoto } from "@/data/dishes";

const PHOTO_RATIO = 3 / 2;

// object-position que deja el centro del plato (photo.centerY) en el centro
// del recorte apaisado. Solo aplica a fotos más altas que el recorte.
function photoPosition(photo: DishPhoto) {
  const visible = photo.width / photo.height / PHOTO_RATIO;
  if (photo.centerY === undefined || visible >= 1) return undefined;
  const offset = (photo.centerY / 100 - visible / 2) / (1 - visible);
  return `50% ${Math.min(Math.max(offset, 0), 1) * 100}%`;
}

// Altura aproximada (mm) de cada parte, para partir las categorías que no
// caben en una hoja. El reparto final en hojas se hace midiendo.
const TITLE_MM = 18;
const PHOTO_ROW_MM = 54;
const TEXT_ROW_MM = 11;
const MAX_BLOCK_MM = 236;

export type PrintPart = { photos: Dish[]; texts: Dish[] };

const pairs = <T,>(items: T[]) =>
  Array.from({ length: Math.ceil(items.length / 2) }, (_, i) => items.slice(i * 2, i * 2 + 2));

/**
 * Separa los platos de una categoría en los que llevan foto y los que no, y
 * si no caben en una hoja los reparte en tramos: primero filas de fotos y
 * después filas de texto, sin mezclar ni cambiar el orden dentro de cada grupo.
 */
export function splitForPrint(dishes: Dish[]): PrintPart[] {
  const photoRows = pairs(dishes.filter((dish) => dish.photo));
  const textRows = pairs(dishes.filter((dish) => !dish.photo));
  const parts: PrintPart[] = [];
  let current: PrintPart = { photos: [], texts: [] };
  let height = TITLE_MM;
  const push = (rowHeight: number, add: () => void) => {
    if (height + rowHeight > MAX_BLOCK_MM && (current.photos.length || current.texts.length)) {
      parts.push(current);
      current = { photos: [], texts: [] };
      height = TITLE_MM;
    }
    add();
    height += rowHeight;
  };
  photoRows.forEach((row) => push(PHOTO_ROW_MM, () => current.photos.push(...row)));
  textRows.forEach((row) => push(TEXT_ROW_MM, () => current.texts.push(...row)));
  parts.push(current);
  return parts;
}

function DishName({ dish }: { dish: Dish }) {
  return (
    <>
      <h3 className="font-logo text-[10.5pt] font-medium uppercase leading-snug tracking-[0.05em] text-foreground">
        {dish.name}
      </h3>
      {dish.price !== null && (
        <span className="mt-[0.6mm] text-[9pt] font-medium tracking-[0.12em] text-brand-gold">
          {formatPrice(dish.price)}
        </span>
      )}
    </>
  );
}

function PhotoEntry({ dish }: { dish: Dish }) {
  if (!dish.photo) return null;
  return (
    <div className="flex flex-col items-center px-[4mm] py-[2.5mm] text-center">
      {/* Nombre pegado a la foto: si en la pareja un nombre ocupa dos líneas,
          las fotos siguen a la misma altura. */}
      <div className="flex flex-1 flex-col items-center justify-end">
        <DishName dish={dish} />
      </div>
      {/* "eager": al imprimir, las imágenes diferidas pueden no llegar a cargar. */}
      <div className="relative mt-[2.5mm] aspect-[3/2] w-[55mm] overflow-hidden rounded-[3mm] border border-brand-gold/25">
        <Image
          src={dish.photo.src}
          alt=""
          fill
          sizes="700px"
          loading="eager"
          className="object-cover"
          style={{ objectPosition: photoPosition(dish.photo) }}
        />
      </div>
    </div>
  );
}

const rowClass = "grid grid-cols-2 [&>*+*]:border-l [&>*+*]:border-brand-gold/45";

// Una categoría con el estilo de la carta del restaurante: título grande en
// cursiva con líneas doradas y los platos centrados en dos columnas separadas
// por una línea dorada. Primero las fotos, por parejas alineadas (si sobra
// una, va centrada); debajo, el resto de platos en dos columnas.
export function CategoryBlock({ label, part }: { label: string; part: PrintPart }) {
  const half = Math.ceil(part.texts.length / 2);
  const textColumns = part.texts.length > 1 ? [part.texts.slice(0, half), part.texts.slice(half)] : [part.texts];
  return (
    <section className="carta-category">
      <header className="mb-[3mm] flex items-center gap-[4mm]">
        <span className="h-[0.35mm] min-w-[10mm] flex-1 bg-gradient-to-l from-brand-gold to-transparent" />
        <h2 className="text-center font-display text-[24pt] font-semibold uppercase italic leading-none text-foreground">
          {label}
        </h2>
        <span className="h-[0.35mm] min-w-[10mm] flex-1 bg-gradient-to-r from-brand-gold to-transparent" />
      </header>

      {pairs(part.photos).map((row) =>
        row.length === 2 ? (
          <div key={row[0].id} className={rowClass}>
            <PhotoEntry dish={row[0]} />
            <PhotoEntry dish={row[1]} />
          </div>
        ) : (
          <PhotoEntry key={row[0].id} dish={row[0]} />
        ),
      )}

      {part.texts.length > 0 && (
        <div className={textColumns.length === 2 ? `${rowClass} mt-[1mm]` : "mt-[1mm]"}>
          {textColumns.map((column, i) => (
            <ul key={i} className="flex flex-col">
              {column.map((dish) => (
                <li key={dish.id} className="flex flex-col items-center px-[4mm] py-[1.3mm] text-center">
                  <DishName dish={dish} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      )}
    </section>
  );
}
