export type DishCategory =
  | "entrantes"
  | "ceviches"
  | "crocantes"
  | "arroces"
  | "sopas"
  | "duos-trios"
  | "tacu-tacus"
  | "criollos"
  | "brasas"
  | "fast-food"
  | "guarniciones"
  | "bebidas";

export const categoryLabels: Record<DishCategory, string> = {
  entrantes: "Entradas",
  ceviches: "Ceviches",
  crocantes: "Los Crocantes",
  arroces: "Arroces Criollos y Marinos",
  sopas: "Nuestras Sopas",
  "duos-trios": "Dúos, Tríos y Barcos Marinos",
  "tacu-tacus": "Los Tacu Tacus",
  criollos: "Criollos y Especiales de la Casa",
  brasas: "Brasas y Broasters",
  "fast-food": "Fast Food",
  guarniciones: "Guarniciones",
  bebidas: "Bebidas y Licores",
};

/** Punto sobre la foto (en % del ancho/alto) que señala un ingrediente. */
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
  /** Alérgenos de la carta (un * final = según elaboración). Vacío = ninguno; ausente = sin dato. */
  allergens?: string[];
  photo?: DishPhoto;
};

// Carta completa de "CARTA CON DESCRIPCION Y ALERGENOS.docx". Los platos con
// puntos de ingredientes salen también en la landing; el resto de fotos, solo en /carta.
export const dishes: Dish[] = [
  {
    id: "papa-a-la-huancaina",
    name: "Papa a la Huancaína",
    category: "entrantes",
    price: 8,
    description:
      "Rodajas de papa sancochadas bañadas en cremosa salsa de ají amarillo y queso, acompañadas de huevo y aceituna.",
    allergens: ["leche", "huevo"],
    photo: { src: "/images/platos/papa-a-la-huancaina.webp", width: 1200, height: 1500 },
  },
  {
    id: "yuquitas-fritas-con-huancaina",
    name: "Yuquitas Fritas con Huancaína",
    category: "entrantes",
    price: 8,
    description:
      "Crujientes yucas fritas acompañadas de nuestra cremosa salsa huancaína.",
    allergens: ["leche", "huevo"],
  },
  {
    id: "leche-de-tigre",
    name: "Leche de Tigre",
    category: "entrantes",
    price: 10.5,
    description:
      "Concentrado de leche de tigre peruana, cítricos, ají, cilantro, pescado y un toque de base cevichera de la casa.",
    allergens: ["pescado", "crustáceos*"],
    photo: { src: "/images/platos/leche-de-tigre.webp", width: 1200, height: 1500 },
  },
  {
    id: "causa-limena",
    name: "Causa Limeña",
    category: "entrantes",
    price: 12,
    description:
      "Suave masa de papa saborizada con ají amarillo, sal y punto de limón, rellena y coronada de pollo deshilachado con mayonesa y aguacate.",
    allergens: ["huevo"],
    photo: {
      src: "/images/platos/causa-limena.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Camote frito", x: 45, y: 37 },
        { label: "Chifle", x: 65, y: 43 },
        { label: "Palta", x: 37, y: 45 },
        { label: "Aceituna de botija", x: 58, y: 49 },
        { label: "Huevo", x: 54, y: 55 },
        { label: "Pollo deshilachado", x: 37, y: 57 },
        { label: "Crema de ají amarillo", x: 80, y: 73 },
      ],
    },
  },
  {
    id: "causa-acevichada",
    name: "Causa Acevichada",
    category: "entrantes",
    price: 17,
    description:
      "Deliciosa masa de causa, rellena de aguacate y coronada con un fresco ceviche clásico.",
    allergens: ["pescado", "huevo"],
    photo: {
      src: "/images/platos/causa-acevichada.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Chifle", x: 37, y: 33 },
        { label: "Camote frito", x: 58, y: 36 },
        { label: "Ceviche de pescado", x: 55, y: 46 },
        { label: "Causa amarilla", x: 48, y: 53 },
        { label: "Cancha", x: 73, y: 52 },
        { label: "Choclo", x: 58, y: 60 },
        { label: "Leche de tigre", x: 33, y: 62 },
      ],
    },
  },
  {
    id: "tiradito-al-aji-amarillo",
    name: "Tiradito al Ají Amarillo",
    category: "entrantes",
    price: 16,
    description:
      "Finas láminas de pescado fresco bañadas en cremosa salsa de ají amarillo y limón.",
    allergens: ["pescado", "leche*"],
    photo: { src: "/images/platos/tiradito-al-aji-amarillo.webp", width: 1200, height: 1500 },
  },
  {
    id: "anticucho-clasico",
    name: "Anticucho Clásico",
    category: "entrantes",
    price: 12,
    description:
      "Pinchos de corazón de ternera marinado en salsa anticuchera, acompañados de papas doradas, choclo y salsa de huancaína.",
  },
  {
    id: "anticucho-mixto-de-rachi-o-librillo",
    name: "Anticucho Mixto de Rachi o Librillo",
    category: "entrantes",
    price: 15,
    description:
      "Pinchos de corazón de ternera y rachi (librillo), marinadas en salsa anticuchera y acompañado de papas doradas, choclo y salsa.",
    allergens: [],
    photo: { src: "/images/platos/anticucho-mixto-de-rachi-o-librillo.webp", width: 1200, height: 1500 },
  },
  {
    id: "porcion-de-rachi-o-librillo",
    name: "Porción de Rachi o Librillo",
    category: "entrantes",
    price: 11,
    description:
      "Rachi o librillo de ternera, sazonado en salsa anticuchera y preparado a la parrilla, acompañado de papas doradas, choclo y salsas.",
    allergens: [],
  },
  {
    id: "conchas-a-la-chalaca-8-uds",
    name: "Conchas a la Chalaca (8 uds.)",
    category: "entrantes",
    price: 12.5,
    description:
      "Frescas conchas de abanico marinadas con cebolla, tomate, maíz, cilantro, ají limo y limón.",
    allergens: ["moluscos"],
  },
  {
    id: "choritos-a-la-chalaca-12-uds",
    name: "Choritos a la Chalaca (12 uds.)",
    category: "entrantes",
    price: 12,
    description:
      "Mejillones marinados con cebolla, tomate, maíz, cilantro, ají y limón.",
    allergens: ["moluscos"],
  },
  {
    id: "ceviche-clasico",
    name: "Ceviche Clásico",
    category: "ceviches",
    price: 17,
    description:
      "Gajos de pescado fresco marinado en limón, cebolla roja, ají y cilantro, acompañado de camote en almíbar, choclo y maíz.",
    allergens: ["pescado", "crustáceos*"],
    photo: { src: "/images/platos/ceviche-clasico.webp", width: 1200, height: 1500 },
  },
  {
    id: "ceviche-mixto",
    name: "Ceviche Mixto",
    category: "ceviches",
    price: 19.5,
    description:
      "Pescado fresco, conchas de abanico y mariscos seleccionados marinado con limón, cebolla roja, ají y cilantro.",
    allergens: ["pescado", "crustáceos", "moluscos"],
    photo: { src: "/images/platos/ceviche-mixto.webp", width: 1200, height: 1500 },
  },
  {
    id: "ceviche-del-gato",
    name: "Ceviche “del Gato”",
    category: "ceviches",
    price: 21.5,
    description:
      "Pescado fresco, conchas de abanico y mariscos seleccionados marinado con limón, cebolla roja, ají y cilantro, coronado con ceviche de conchas negras y acompañado de chicharrón de pota, yuca, camote y maíz.",
    allergens: ["pescado", "crustáceos", "moluscos"],
    photo: { src: "/images/platos/ceviche-del-gato.webp", width: 1200, height: 1500 },
  },
  {
    id: "ceviche-de-conchas-negras",
    name: "Ceviche de Conchas Negras",
    category: "ceviches",
    price: 25,
    description:
      "Deliciosas conchas negras marinadas con cebolla roja, limón, cilantro y punto de picante, acompañado de yuca, camote, zarandaja y maíz.",
    allergens: ["moluscos"],
  },
  {
    id: "chicharron-de-pescado",
    name: "Chicharrón de Pescado",
    category: "crocantes",
    price: 16.5,
    description:
      "Crujientes trozos de pescado dorados acompañados de yuca frita, salsa criolla y salsa tártara.",
    allergens: ["pescado", "gluten*"],
  },
  {
    id: "chicharron-de-pota",
    name: "Chicharrón de Pota",
    category: "crocantes",
    price: 15,
    description:
      "Crujientes tiras de pota doradas, acompañadas de yuca frita, salsa criolla y salsa tártara.",
    allergens: ["moluscos", "gluten*"],
  },
  {
    id: "jalea-mixta",
    name: "Jalea Mixta",
    category: "crocantes",
    price: 21.5,
    description:
      "Crocantes trozos de pescado, mariscos y conchas de abanico, acompañada de yuca frita y coronado con salsa criolla y salsa tártara.",
    allergens: ["pescado", "crustáceos", "moluscos", "gluten", "huevo"],
  },
  {
    id: "jalea-del-gato",
    name: "Jalea del Gato",
    category: "crocantes",
    price: 23.5,
    description:
      "Un especial de la casa: dorada frita y mariscos crocantes, acompañados de yuca, salsa criolla, tártara, chifles y maíz cancha.",
    allergens: ["pescado", "crustáceos", "moluscos", "gluten*"],
    photo: { src: "/images/platos/jalea-del-gato.webp", width: 1200, height: 1500 },
  },
  {
    id: "pescado-frito",
    name: "Pescado Frito",
    category: "crocantes",
    price: 15.5,
    description:
      "Dorada frita hasta quedar crujiente, acompañada de yuca, salsa criolla y guarnición de arroz blanco.",
    allergens: ["pescado"],
  },
  {
    id: "arroz-chaufa-de-pollo",
    name: "Arroz Chaufa de Pollo",
    category: "arroces",
    price: 14,
    description:
      "Arroz salteado al wok con pollo, huevo, cebolla china y salsa de soja.",
    allergens: ["soja", "huevo"],
  },
  {
    id: "arroz-chaufa-de-ternera",
    name: "Arroz Chaufa de Ternera",
    category: "arroces",
    price: 16,
    description:
      "Arroz salteado al wok con ternera, huevo, cebolla china y salsa de soja.",
    allergens: ["soja", "huevo"],
  },
  {
    id: "arroz-chaufa-mixto",
    name: "Arroz Chaufa Mixto",
    category: "arroces",
    price: 17,
    description:
      "Arroz salteado con pollo, ternera, huevo, cebolla china y salsa de soja.",
    allergens: ["soja", "huevo"],
  },
  {
    id: "arroz-chaufa-de-mariscos",
    name: "Arroz Chaufa de Mariscos",
    category: "arroces",
    price: 18,
    description:
      "Arroz salteado al wok con mariscos seleccionados, huevo, cebolla china y salsa de soja.",
    allergens: ["crustáceos", "moluscos", "soja", "huevo"],
    photo: { src: "/images/platos/arroz-chaufa-de-mariscos.webp", width: 1200, height: 1500 },
  },
  {
    id: "arroz-chaufa-de-langostinos",
    name: "Arroz Chaufa de Langostinos",
    category: "arroces",
    price: 18,
    description:
      "Arroz salteado con langostinos, huevo, cebolla china y salsa de soja.",
    allergens: ["crustáceos", "soja", "huevo"],
  },
  {
    id: "aeropuerto-de-pollo",
    name: "Aeropuerto de Pollo",
    category: "arroces",
    price: 17,
    description:
      "Arroz salteado con pollo, tallarín chino, frejol chino, huevo, cebolla china y salsa de soja.",
    allergens: ["gluten", "soja", "huevo"],
  },
  {
    id: "arroz-con-mariscos",
    name: "Arroz con Mariscos",
    category: "arroces",
    price: 18.5,
    description:
      "Arroz cremoso con mariscos seleccionados flambeados con vino blanco y bañado en salsa madre de la casa.",
    allergens: ["crustáceos", "moluscos*"],
  },
  {
    id: "arroz-con-langostinos",
    name: "Arroz con Langostinos",
    category: "arroces",
    price: 18.5,
    description:
      "Arroz cremoso con langostinos, salsa madre de la casa, ajíes y punto especial de quesos. Acompañado de salsa criolla.",
    allergens: ["crustáceos"],
  },
  {
    id: "caldo-de-gallina",
    name: "Caldo de Gallina",
    category: "sopas",
    price: 12,
    description:
      "Tradicional y concentrado caldo peruano de gallina con fideos, huevo y papa, acompañados de cebolla china.",
    allergens: ["gluten", "huevo"],
  },
  {
    id: "caldo-de-mote",
    name: "Caldo de Mote",
    category: "sopas",
    price: 12,
    description:
      "Caldo tradicional con mote, carne, pata de res y mondongo (callos) preparado al estilo peruano con hierbas aromáticas.",
    allergens: ["apio*"],
  },
  {
    id: "sudado-de-pescado",
    name: "Sudado de Pescado",
    category: "sopas",
    price: 18,
    description:
      "Pescado cocinado en un sabroso concentrado de pescado y saborizado con chicha de jora, salsa madre de la casa, yuca, tomate, cebolla y punto de cilantro, acompañado de arroz blanco.",
    allergens: ["pescado"],
  },
  {
    id: "parihuela-de-mariscos",
    name: "Parihuela de Mariscos",
    category: "sopas",
    price: 22.5,
    description:
      "Potente caldo marino con pescado entero, mariscos seleccionados, cangrejo, mejillón, conchas, yuca, salsa madre de la casa, chicha de jora y punto de limón.",
    allergens: ["pescado", "crustáceos", "moluscos"],
    photo: { src: "/images/platos/parihuela-de-mariscos.webp", width: 1200, height: 1500 },
  },
  {
    id: "chupe-de-pescado",
    name: "Chupe de Pescado",
    category: "sopas",
    price: 18,
    description:
      "Sopa tradicional peruana hecha a base de filete de pescado, pasta de ají amarillo, queso, leche, papa, arroz, guisantes, huevo escalfado y saborizado con huacatay.",
    allergens: ["pescado", "leche", "huevo"],
    photo: { src: "/images/platos/chupe-de-pescado.webp", width: 1200, height: 1500 },
  },
  {
    id: "chupe-de-langostinos",
    name: "Chupe de Langostinos",
    category: "sopas",
    price: 19.5,
    description:
      "Sopa tradicional peruana hecha con langostinos, pasta de ají amarillo, queso, leche, papa, arroz, guisantes, huevo escalfado y saborizado con huacatay.",
    allergens: ["crustáceos", "leche", "huevo"],
  },
  {
    id: "arma-tu-duo",
    name: "Arma tu Dúo",
    category: "duos-trios",
    price: 20,
    description:
      "Combina dos de tus favoritos entre ceviches, chicharrones, causa y arroces marinos para crear tu propio dúo.",
    allergens: ["según los platos elegidos"],
  },
  {
    id: "arma-tu-trio",
    name: "Arma tu Trío",
    category: "duos-trios",
    price: 25,
    description:
      "Combina tres de tus favoritos entre ceviches, chicharrones, causa y arroces marinos para crear tu propio trío.",
    allergens: ["según los platos elegidos"],
    photo: {
      src: "/images/platos/trio-de-la-concha.webp",
      width: 1600,
      height: 901,
      hotspots: [
        { label: "Causa enrollada", x: 31, y: 34 },
        { label: "Crema de ají amarillo", x: 22, y: 47 },
        { label: "Ceviche de pescado", x: 44, y: 47 },
        { label: "Cancha serrana", x: 33, y: 60 },
        { label: "Camote glaseado", x: 58, y: 42 },
        { label: "Chicharrón de calamar", x: 62, y: 72 },
        { label: "Chifle de plátano", x: 53, y: 80 },
      ],
    },
  },
  {
    id: "barco-marino",
    name: "Barco Marino",
    category: "duos-trios",
    price: 75,
    description:
      "Una selección completa de sabores peruanos: ceviche clásico, tiradito de ají amarillo, arroz con mariscos, chaufa de mariscos, causa de pollo, chicharrón de pescado, jalea mixta, sudado de pescado y leche de tigre. Incluye 4 chops de pisco sour y 2 cervezas o gaseosas.",
    allergens: ["pescado", "crustáceos", "moluscos", "leche", "huevo", "gluten", "soja*"],
  },
  {
    id: "barco-marino-del-gato",
    name: "Barco Marino del Gato",
    category: "duos-trios",
    price: 85,
    description:
      "Nuestra selección especial con ceviche clásico, tiradito de ají amarillo, ceviche de conchas negras, arroz con mariscos, chaufa de mariscos, causa de pollo, chicharrón de pescado, jalea mixta y leche de tigre. Incluye 4 chops de pisco sour, 2 cervezas o gaseosas y 1 tinto de verano. Preguntar por nombre.",
    allergens: ["pescado", "crustáceos", "moluscos", "leche", "huevo", "gluten", "soja*"],
  },
  {
    id: "tacu-tacu-con-lomo-saltado",
    name: "Tacu Tacu con Lomo Saltado",
    category: "tacu-tacus",
    price: 18.5,
    description:
      "Cremosa mezcla de frejoles y arroz cocido, dorado y roleado en sartén, con lomo saltado.",
    allergens: ["soja*"],
  },
  {
    id: "tacu-tacu-con-saltado-de-pollo",
    name: "Tacu Tacu con Saltado de Pollo",
    category: "tacu-tacus",
    price: 17.5,
    description:
      "Cremosa mezcla de frejoles y arroz cocido, dorado y roleado en sartén, con saltado de pollo.",
    allergens: ["soja*"],
  },
  {
    id: "tacu-tacu-con-seco-de-ternera-a-la-nortena",
    name: "Tacu Tacu con Seco de Ternera a la Norteña",
    category: "tacu-tacus",
    price: 18.5,
    description:
      "Cremosa mezcla de frejoles y arroz cocido, dorado y roleado en sartén, con seco de ternera a la norteña.",
    allergens: ["gluten*"],
  },
  {
    id: "tacu-tacu-con-salsa-de-langostinos",
    name: "Tacu Tacu con Salsa de Langostinos",
    category: "tacu-tacus",
    price: 19.5,
    description:
      "Cremosa mezcla de frejoles y arroz cocido, dorado y roleado en sartén, con salsa de langostinos.",
    allergens: ["crustáceos", "leche*"],
  },
  {
    id: "tacu-tacu-mariscos",
    name: "Tacu Tacu con Salsa de Mariscos",
    category: "tacu-tacus",
    price: 19,
    description:
      "Cremosa mezcla de frejoles y arroz cocido, dorado y roleado en sartén, con salsa de mariscos.",
    allergens: ["crustáceos", "moluscos", "leche*"],
    photo: {
      src: "/images/platos/tacu-tacu-mariscos.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Conchas", x: 30, y: 42 },
        { label: "Arvejas", x: 56, y: 42 },
        { label: "Tacu tacu", x: 22, y: 51 },
        { label: "Parmesano", x: 57, y: 52 },
        { label: "Langostinos", x: 38, y: 62 },
        { label: "Salsa de mariscos", x: 65, y: 62 },
      ],
    },
  },
  {
    id: "tacu-tacu-con-bistec-a-lo-pobre",
    name: "Tacu Tacu con Bistec a lo Pobre",
    category: "tacu-tacus",
    price: 19.5,
    description:
      "Cremosa mezcla de frejoles y arroz cocido, dorado y roleado en sartén, con bistec a lo pobre.",
    allergens: ["huevo"],
  },
  {
    id: "lomo-saltado",
    name: "Lomo Saltado",
    category: "criollos",
    price: 16,
    description:
      "Tiernas tiras de ternera salteadas con cebolla, tomate, ají y salsa de soja, acompañadas de patatas fritas y arroz.",
    allergens: ["soja*"],
    photo: {
      src: "/images/platos/lomo-saltado.webp",
      width: 1200,
      height: 1500,
      hotspots: [
        { label: "Papas fritas", x: 15, y: 52 },
        { label: "Cebolla morada", x: 45, y: 48 },
        { label: "Lomo al wok", x: 40, y: 57 },
        { label: "Ají amarillo", x: 30, y: 51 },
        { label: "Tomate", x: 53, y: 62 },
        { label: "Jugo del saltado", x: 30, y: 66 },
        { label: "Arroz blanco", x: 70, y: 53 },
      ],
    },
  },
  {
    id: "saltado-de-pollo",
    name: "Saltado de Pollo",
    category: "criollos",
    price: 15,
    description:
      "Tiernas tiras de pollo salteadas con cebolla, tomate, ají y salsa de soja, acompañadas de patatas fritas y arroz.",
    allergens: ["soja*"],
  },
  {
    id: "tallarin-saltado-de-pollo",
    name: "Tallarín Saltado de Pollo",
    category: "criollos",
    price: 15,
    description:
      "Tallarines salteados al wok con pollo, cebolla, tomate y salsa oriental.",
    allergens: ["gluten", "soja"],
  },
  {
    id: "tallarin-saltado-de-ternera",
    name: "Tallarín Saltado de Ternera",
    category: "criollos",
    price: 16,
    description:
      "Tallarines salteados al wok con ternera, cebolla, tomate y salsa oriental.",
    allergens: ["gluten", "soja"],
  },
  {
    id: "pollo-a-la-plancha",
    name: "Pollo a la Plancha",
    category: "criollos",
    price: 15,
    description:
      "Pechuga de pollo a la plancha, acompañada de arroz, ensalada y patatas cocidas o fritas.",
    allergens: [],
  },
  {
    id: "bistec-a-la-plancha",
    name: "Bistec a la Plancha",
    category: "criollos",
    price: 16,
    description:
      "Jugoso bistec de ternera a la plancha acompañado de arroz, patatas y ensalada.",
    allergens: [],
  },
  {
    id: "lomo-chaufa",
    name: "Lomo Chaufa",
    category: "criollos",
    price: 17,
    description:
      "Clásico lomo saltado acompañado con arroz chaufa a base de huevo, cebolla china y salsa oriental.",
    allergens: ["soja", "huevo"],
  },
  {
    id: "bistec-a-lo-pobre",
    name: "Bistec a lo Pobre",
    category: "criollos",
    price: 18,
    description:
      "Bistec al grill acompañado de arroz, patatas, huevo frito y plátano frito.",
    allergens: ["huevo"],
  },
  {
    id: "lomo-a-lo-pobre",
    name: "Lomo a lo Pobre",
    category: "criollos",
    price: 18.5,
    description:
      "Tradicional lomo saltado acompañado de arroz, patatas, huevo frito y plátano frito.",
    allergens: ["huevo"],
  },
  {
    id: "pechuga-a-lo-pobre",
    name: "Pechuga a lo Pobre",
    category: "criollos",
    price: 17,
    description:
      "Pechuga de pollo acompañada de arroz, patatas, huevo frito y plátano frito.",
    allergens: ["huevo"],
  },
  {
    id: "fetuccini-a-la-huancaina-con-lomo-saltado",
    name: "Fetuccini a la Huancaína con Lomo Saltado",
    category: "criollos",
    price: 18,
    description:
      "Fetuccini bañados en salsa huancaína, acompañados de nuestro clásico lomo saltado.",
    allergens: ["gluten", "leche", "huevo*", "soja*"],
    photo: { src: "/images/platos/fetuccini-a-la-huancaina-con-lomo-saltado.webp", width: 1200, height: 1500 },
  },
  {
    id: "fetuccini-en-salsa-de-langostinos",
    name: "Fetuccini en Salsa de Langostinos",
    category: "criollos",
    price: 18,
    description:
      "Fetuccini con cremosa salsa de langostinos al estilo de la casa.",
    allergens: ["gluten", "crustáceos", "leche", "huevo*"],
    photo: { src: "/images/platos/fetuccini-en-salsa-de-langostinos.webp", width: 1200, height: 1500 },
  },
  {
    id: "pescado-a-lo-macho",
    name: "Pescado a lo Macho",
    category: "criollos",
    price: 20,
    description:
      "Dorada frita bañada en salsa cremosa de mariscos y ajíes peruanos, acompañada de arroz blanco.",
    allergens: ["pescado", "crustáceos", "moluscos", "leche*"],
  },
  {
    id: "aji-de-gallina",
    name: "Ají de Gallina",
    category: "criollos",
    price: 17,
    description:
      "Cremosa salsa a base de ají amarillo, saborizada con nueces, queso y leche, acompañada de arroz, papa cocida, huevo y aceituna.",
    allergens: ["leche", "huevo*", "frutos secos*"],
    photo: { src: "/images/platos/aji-de-gallina.webp", width: 1200, height: 1500 },
  },
  {
    id: "seco-de-ternera-a-la-nortena",
    name: "Seco de Ternera a la Norteña",
    category: "criollos",
    price: 17,
    description:
      "Clásico del norte del Perú: tierna ternera guisada lentamente con cilantro, especias, loche y chicha de jora, acompañada de arroz, frejoles y salsa criolla.",
    allergens: ["apio*"],
    photo: { src: "/images/platos/seco-de-ternera-a-la-nortena.webp", width: 1200, height: 1500 },
  },
  {
    id: "arroz-con-pato",
    name: "Arroz con Pato",
    category: "criollos",
    price: 18,
    description:
      "Tradicional arroz peruano cocinado con pato, cilantro, ajíes y especias, servido sobre un espejo de salsa huancaína y salsa criolla.",
    allergens: ["apio*"],
    photo: { src: "/images/platos/arroz-con-pato.webp", width: 1200, height: 1500 },
  },
  {
    id: "chicharron-de-chancho-al-plato",
    name: "Chicharrón de Chancho al Plato",
    category: "criollos",
    price: 12,
    description:
      "Crujiente panceta de cerdo acompañada de mote, camote y salsa criolla con hierba buena.",
    allergens: [],
  },
  {
    id: "combinado-criollo",
    name: "Combinado Criollo",
    category: "criollos",
    price: 15,
    description:
      "Una selección de clásicos: chanfainita, papa a la huancaína, ceviche y tallarines rojos.",
    allergens: ["según composición"],
    photo: { src: "/images/platos/combinado-criollo.webp", width: 1200, height: 1500 },
  },
  {
    id: "pollo-a-la-brasa-1-pollo",
    name: "Pollo a la Brasa (1 pollo)",
    category: "brasas",
    price: 28,
    description:
      "Nuestro clásico pollo marinado y cocinado a la brasa, acompañado de patatas y ensalada.",
    allergens: [],
  },
  {
    id: "pollo-a-la-brasa-medio-pollo",
    name: "Pollo a la Brasa (½ pollo)",
    category: "brasas",
    price: 16,
    description: "Medio pollo a la brasa, acompañado de patatas y ensalada.",
    allergens: [],
  },
  {
    id: "pollo-a-la-brasa-cuarto-pollo",
    name: "Pollo a la Brasa (¼ pollo)",
    category: "brasas",
    price: 11,
    description:
      "Cuarto de pollo a la brasa, acompañado de patatas y ensalada.",
    allergens: [],
  },
  {
    id: "mostrito-cuarto-brasa",
    name: "Mostrito ¼ Brasa",
    category: "brasas",
    price: 14,
    description:
      "Cuarto de pollo a la brasa acompañado de arroz chaufa y patatas fritas.",
    allergens: ["soja", "huevo*"],
  },
  {
    id: "mostro-1-pollo-a-la-brasa",
    name: "Mostro 1 Pollo a la Brasa",
    category: "brasas",
    price: 32,
    description:
      "Pollo entero a la brasa acompañado de arroz chaufa y patatas fritas.",
    allergens: ["soja", "huevo*"],
  },
  {
    id: "pollo-broaster-cuarto",
    name: "Pollo Broaster ¼",
    category: "brasas",
    price: 12.5,
    description:
      "Pollo crujiente y dorado al estilo broaster, acompañado de patatas.",
    allergens: ["gluten", "huevo*"],
  },
  {
    id: "mostrito-cuarto-broaster",
    name: "Mostrito ¼ Broaster",
    category: "brasas",
    price: 15,
    description:
      "Cuarto de pollo broaster acompañado de arroz chaufa y patatas fritas.",
    allergens: ["gluten", "huevo", "soja*"],
  },
  {
    id: "chaufa-con-alitas",
    name: "Chaufa con Alitas",
    category: "brasas",
    price: 14.5,
    description: "Arroz chaufa acompañado de crujientes alitas de pollo.",
    allergens: ["soja", "huevo*"],
  },
  {
    id: "salchipapa-clasica",
    name: "Salchipapa Clásica",
    category: "fast-food",
    price: 10,
    description:
      "Clásica combinación de patatas fritas y salchicha, acompañada de nuestras salsas.",
    allergens: ["mostaza", "leche", "huevo*"],
  },
  {
    id: "alitas-acevichadas",
    name: "Alitas Acevichadas",
    category: "fast-food",
    price: 13,
    description:
      "Crujientes alitas de pollo bañadas en salsa acevichada, acompañadas de patatas fritas.",
    allergens: ["pescado", "leche", "huevo*"],
  },
  {
    id: "hamburguesa-royal-de-carne",
    name: "Hamburguesa Royal de Carne",
    category: "fast-food",
    price: 14,
    description:
      "Hamburguesa de carne, lechuga, tomate, huevo, queso, patatas fritas y salsas, todo servido dentro de un pan de hamburguesa especial de la casa.",
    allergens: ["gluten", "huevo", "leche", "mostaza*"],
  },
  {
    id: "hamburguesa-de-pollo",
    name: "Hamburguesa de Pollo",
    category: "fast-food",
    price: 12.5,
    description:
      "Suaves trozos de pollo deshilachado, lechuga, tomate, patatas fritas y salsas, servido en pan de hamburguesa especial.",
    allergens: ["gluten", "huevo", "leche", "mostaza*"],
  },
  {
    id: "hamburguesa-mixta",
    name: "Hamburguesa Mixta",
    category: "fast-food",
    price: 15,
    description:
      "Hamburguesa de carne y pollo deshilachado, lechuga, tomate, huevo, queso, patatas fritas y salsas, todo servido dentro de un pan de hamburguesa especial de la casa.",
    allergens: ["gluten", "huevo", "leche", "mostaza*"],
  },
  {
    id: "hamburguesa-de-la-casa",
    name: "Hamburguesa de la Casa",
    category: "fast-food",
    price: 15.5,
    description:
      "Doble hamburguesa de carne, lechuga, tomate, huevo, doble queso, patatas fritas y salsas, todo servido dentro de un pan de hamburguesa especial de la casa.",
    allergens: ["gluten", "huevo", "leche", "mostaza*"],
  },
  {
    id: "porcion-de-arroz-blanco",
    name: "Porción de Arroz Blanco",
    category: "guarniciones",
    price: 3,
    description: "",
  },
  {
    id: "porcion-de-yuca",
    name: "Porción de Yuca",
    category: "guarniciones",
    price: 4,
    description: "",
  },
  {
    id: "porcion-de-papas-fritas",
    name: "Porción de Papas Fritas",
    category: "guarniciones",
    price: 5,
    description: "",
  },
  {
    id: "porcion-de-cancha-con-chifles",
    name: "Porción de Cancha con Chifles",
    category: "guarniciones",
    price: 3.5,
    description: "",
  },
  {
    id: "porcion-de-ensalada-fresca",
    name: "Porción de Ensalada Fresca",
    category: "guarniciones",
    price: 4.5,
    description: "",
  },
  {
    id: "jarra-de-chicha-morada",
    name: "Jarra de Chicha Morada",
    category: "bebidas",
    price: 10.5,
    description: "",
  },
  {
    id: "vaso-de-chicha-morada",
    name: "Vaso de Chicha Morada",
    category: "bebidas",
    price: 4,
    description: "",
  },
  {
    id: "jarra-de-maracuya",
    name: "Jarra de Maracuyá",
    category: "bebidas",
    price: 10.5,
    description: "",
  },
  {
    id: "vaso-de-maracuya",
    name: "Vaso de Maracuyá",
    category: "bebidas",
    price: 4,
    description: "",
  },
  {
    id: "inca-kola-personal",
    name: "Inca Kola Personal",
    category: "bebidas",
    price: 3.2,
    description: "",
  },
  {
    id: "inca-kola-gordita",
    name: "Inca Kola Gordita",
    category: "bebidas",
    price: 8,
    description: "",
  },
  {
    id: "inca-kola-2-25-l",
    name: "Inca Kola 2,25 L",
    category: "bebidas",
    price: 12,
    description: "",
  },
  {
    id: "aquarius-fuze-tea",
    name: "Aquarius / Fuze Tea",
    category: "bebidas",
    price: 2.2,
    description: "",
  },
  {
    id: "cerveza-corona",
    name: "Cerveza Corona",
    category: "bebidas",
    price: 3.2,
    description: "",
  },
  {
    id: "cerveza-heineken",
    name: "Cerveza Heineken",
    category: "bebidas",
    price: 3.2,
    description: "",
  },
  {
    id: "cerveza-pilsen",
    name: "Cerveza Pilsen",
    category: "bebidas",
    price: 3.5,
    description: "",
  },
  {
    id: "cerveza-cusquena",
    name: "Cerveza Cusqueña",
    category: "bebidas",
    price: 4,
    description: "",
  },
  {
    id: "cerveza-cusquena-negra",
    name: "Cerveza Cusqueña Negra",
    category: "bebidas",
    price: 4.5,
    description: "",
  },
  {
    id: "cubo-de-mahou",
    name: "Cubo de Mahou",
    category: "bebidas",
    price: 8.5,
    description: "",
  },
  {
    id: "tinto-de-verano",
    name: "Tinto de Verano",
    category: "bebidas",
    price: 3.5,
    description: "",
  },
  {
    id: "agua-mineral",
    name: "Agua Mineral",
    category: "bebidas",
    price: 2.2,
    description: "",
  },
  {
    id: "gaseosas-en-lata",
    name: "Gaseosas en Lata",
    category: "bebidas",
    price: 2,
    description: "",
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
