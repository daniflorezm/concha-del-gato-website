import { formatPrice, type Dish } from "@/data/dishes";

type DishDescriptionPanelProps = {
  dish: Dish;
};

export function DishDescriptionPanel({ dish }: DishDescriptionPanelProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-3xl text-foreground">{dish.name}</h1>
      {dish.price !== null && (
        <p className="font-display text-xl text-brand-gold">
          {formatPrice(dish.price)}
        </p>
      )}
      <p className="text-foreground/80">{dish.description}</p>
    </div>
  );
}
