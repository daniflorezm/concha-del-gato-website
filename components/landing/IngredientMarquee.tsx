const INGREDIENTS = [
  "ají amarillo",
  "leche de tigre",
  "cancha serrana",
  "camote",
  "choclo",
  "rocoto",
  "cebolla morada",
  "culantro",
  "limón",
  "papa amarilla",
  "ají panca",
  "plátano",
];

export function IngredientMarquee() {
  const row = [...INGREDIENTS, ...INGREDIENTS];
  return (
    <div
      className="relative overflow-hidden border-y border-brand-gold/25 py-5"
      aria-label="Ingredientes de la cocina peruana"
    >
      <ul className="marquee flex w-max gap-10 font-display text-3xl italic text-transparent sm:text-4xl">
        {row.map((item, i) => (
          <li
            key={i}
            className="outline-text flex items-center gap-10 whitespace-nowrap"
            aria-hidden={i >= INGREDIENTS.length}
          >
            {item}
            <span className="text-base not-italic text-brand-magenta">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
