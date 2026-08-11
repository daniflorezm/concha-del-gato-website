export type DishCategory =
  | "entrantes"
  | "caldos"
  | "trios"
  | "a-la-carta"
  | "pescados-mariscos"
  | "pollo-brasa"
  | "chifas"
  | "fast-food"
  | "bebidas"
  | "cocteles"
  | "postres";

export type Dish = {
  id: string;
  name: string;
  category: DishCategory;
  price: number;
  description: string;
  modelPath: string;
  ingredientAnchors?: string[];
};

// Placeholder — pendiente de poblar con los ~80 platos reales de
// "LA CONCHA DEL GATO.pdf" y sus descripciones (ver CLAUDE.md).
export const dishes: Dish[] = [
  {
    id: "lomo-saltado",
    name: "Lomo Saltado",
    category: "a-la-carta",
    price: 14.5,
    description: "Descripción por escribir.",
    modelPath: "/models/lomo-saltado.glb",
  },
];
