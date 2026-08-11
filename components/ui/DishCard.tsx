import Link from "next/link";
import type { Dish } from "@/data/dishes";

type DishCardProps = {
  dish: Dish;
};

export function DishCard({ dish }: DishCardProps) {
  return (
    <Link
      href={`/carta/${dish.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-brand-gold/30 bg-white/[0.03] transition-colors hover:border-brand-gold"
    >
      <div className="aspect-square bg-black/40" />
      <div className="flex items-center justify-between gap-4 p-4">
        <h3 className="font-display text-lg text-foreground">{dish.name}</h3>
        <span className="font-display text-brand-gold">
          {dish.price.toFixed(2)} €
        </span>
      </div>
    </Link>
  );
}
