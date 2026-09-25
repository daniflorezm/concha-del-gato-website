import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Dish } from "@/data/dishes";

type MenuItemProps = {
  dish: Dish;
};

export function MenuItem({ dish }: MenuItemProps) {
  const price = formatPrice(dish.price);

  return (
    <li className="flex gap-4 py-5 sm:gap-6">
      {dish.photo && (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-brand-gold/25 sm:h-28 sm:w-28">
          <Image
            src={dish.photo.src}
            alt={dish.name}
            fill
            sizes="112px"
            className="scale-[1.6] object-cover"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-xl text-foreground sm:text-2xl">{dish.name}</h3>
          <span className="mb-1 flex-1 border-b border-dotted border-brand-gold/30" />
          {price && <span className="font-display text-lg text-brand-gold">{price}</span>}
        </div>
        <p className="text-sm leading-relaxed text-foreground/65">{dish.description}</p>
        {dish.photo?.hotspots && (
          <Link
            href={`/#${dish.id}`}
            className="mt-1 text-xs uppercase tracking-[0.2em] text-brand-turquoise/80 hover:text-brand-turquoise"
          >
            Ver qué lleva →
          </Link>
        )}
      </div>
    </li>
  );
}
