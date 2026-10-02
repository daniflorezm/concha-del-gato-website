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

export const categoryLabels: Record<DishCategory, string> = {
  entrantes: "Entrantes",
  caldos: "Caldos",
  trios: "Los Tríos de la Concha",
  "a-la-carta": "Platos a la Carta",
  "pescados-mariscos": "Pescados y Mariscos",
  "pollo-brasa": "Pollo a la Brasa",
  chifas: "Chifas",
  "fast-food": "Fast Food",
  bebidas: "Bebidas",
  cocteles: "Cócteles",
  postres: "Postres",
};

/**
 * Punto sobre la foto (en % del ancho/alto) que señala un componente principal.
 * Solo los ingredientes clave: el detalle va en la descripción del plato.
 */
export type IngredientHotspot = {
  label: string;
  x: number;
  y: number;
};

export type DishPhoto = {
  src: string;
  width: number;
  height: number;
  hotspots?: IngredientHotspot[];
};

export type Dish = {
  id: string;
  name: string;
  category: DishCategory;
  /** En euros. `null` mientras no se confirme contra la carta impresa. */
  price: number | null;
  description: string;
  photo?: DishPhoto;
};

// Primeros platos con foto real. Nombres, textos y ubicación de ingredientes
// están redactados a partir de las fotos: BORRADOR pendiente de revisar con el
// restaurante, igual que los precios (null = sin confirmar). Falta poblar el
// resto de los ~80 platos de "LA CONCHA DEL GATO.pdf".
export const dishes: Dish[] = [
  {
    id: "trio-de-la-concha",
    name: "Trío de la Concha",
    category: "trios",
    price: null,
    description:
      "Tres clásicos en una bandeja: causa enrollada con salsa de ají amarillo, ceviche de pescado con cebolla morada y chicharrón de calamar crujiente con chifle y cancha.",
    photo: {
      src: "/images/platos/trio-de-la-concha.webp",
      width: 1600,
      height: 901,
      hotspots: [
        { label: "Causa enrollada", x: 31, y: 34 },
        { label: "Ceviche de pescado", x: 44, y: 47 },
        { label: "Cancha serrana", x: 33, y: 60 },
        { label: "Chicharrón de calamar", x: 62, y: 72 },
      ],
    },
  },
  {
    id: "causa-acevichada",
    name: "Causa Acevichada",
    category: "entrantes",
    price: null,
    description:
      "Causa de papa amarilla con capa de palta, coronada con ceviche de pescado y bañada en leche de tigre. Con choclo, cancha y camote.",
    photo: {
      src: "/images/platos/causa-acevichada.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Ceviche de pescado", x: 55, y: 46 },
        { label: "Causa amarilla", x: 48, y: 53 },
        { label: "Choclo", x: 58, y: 60 },
        { label: "Leche de tigre", x: 33, y: 62 },
      ],
    },
  },
  {
    id: "lomo-saltado",
    name: "Lomo Saltado",
    category: "a-la-carta",
    price: 14.5,
    description:
      "Tiras de lomo salteadas al wok con cebolla morada, tomate y ají amarillo, en su jugo. Con papas fritas y arroz blanco.",
    photo: {
      src: "/images/platos/lomo-saltado.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Papas fritas", x: 15, y: 52 },
        { label: "Cebolla morada", x: 45, y: 48 },
        { label: "Lomo al wok", x: 40, y: 57 },
        { label: "Arroz blanco", x: 70, y: 53 },
      ],
    },
  },
  {
    id: "causa-limena",
    name: "Causa Limeña de Pollo",
    category: "entrantes",
    price: null,
    description:
      "Capas de papa amarilla prensada rellenas de pollo deshilachado, con palta, huevo, aceituna de botija y un trazo de crema de ají amarillo.",
    photo: {
      src: "/images/platos/causa-limena.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Palta", x: 37, y: 45 },
        { label: "Huevo", x: 54, y: 55 },
        { label: "Pollo deshilachado", x: 37, y: 57 },
        { label: "Crema de ají amarillo", x: 80, y: 73 },
      ],
    },
  },
  {
    id: "tacu-tacu-mariscos",
    name: "Tacu Tacu con Mariscos",
    category: "pescados-mariscos",
    price: null,
    description:
      "Tacu tacu dorado de arroz y frejol, cubierto con salsa cremosa de mariscos, langostinos y conchas, terminado con parmesano.",
    photo: {
      src: "/images/platos/tacu-tacu-mariscos.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Conchas", x: 30, y: 42 },
        { label: "Tacu tacu", x: 22, y: 51 },
        { label: "Langostinos", x: 38, y: 62 },
        { label: "Salsa de mariscos", x: 65, y: 62 },
      ],
    },
  },
];

/** Categorías que tienen al menos un plato, en el orden de la carta. */
export function categoriesWithDishes() {
  return (Object.keys(categoryLabels) as DishCategory[])
    .map((id) => ({ id, label: categoryLabels[id], dishes: dishes.filter((d) => d.category === id) }))
    .filter((group) => group.dishes.length > 0);
}

export function formatPrice(price: number | null) {
  return price === null ? null : `${price.toFixed(2).replace(".", ",")} €`;
}
