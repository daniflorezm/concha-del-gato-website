# La Concha del Gato — Web

Restaurante peruano. Este documento es el contexto persistente del proyecto para Claude Code: léelo siempre antes de trabajar y mantenlo actualizado si el stack o las convenciones cambian.

## Qué estamos construyendo

Web de presentación del restaurante. La pieza central es la carta: cada plato se muestra con un visor 3D navegable en 360°, una animación de entrada donde los ingredientes "se van amontonando" hasta formar el plato, y una descripción junto al visor.

No es un sistema de pedidos ni reservas (por ahora) — es escaparate + carta interactiva.

## Identidad de marca

Extraída del logo real del restaurante:

- Fondo: negro / casi negro (`#0d0d0f` — usar como base, no negro puro).
- Acento primario: magenta/rosa fuerte (`#E5177D` aprox.) — nombre del restaurante, CTAs, bordes de la concha.
- Acento secundario: dorado (`#D4AF37` aprox.) — líneas divisorias, marcos, tipografía de detalle ("MENÚ", precios).
- Acento terciario: turquesa/azul (`#29ABE2` aprox.) — el icono de tenedor/cuchara dentro de la concha del logo. Usar con moderación, para micro-detalles o hover states.
- Texto principal sobre fondo oscuro: blanco roto (`#F5F5F0`).
- Tipografía: serif elegante para titulares (el logo y "MENÚ" usan una serif clásica tipo *display*), sans-serif limpia para cuerpo de texto/precios.
- Motivo gráfico de fondo: ilustraciones lineales finas (cubiertos, verduras) en gris sobre negro — se puede reutilizar como textura decorativa sutil, sin competir con el contenido.

Ajustar los tonos exactos con un selector de color sobre el PDF/logo original antes de fijarlos en el design system (`tailwind.config` o `theme.ts`), estos son de partida.

## Stack técnico

- Framework: Next.js (App Router) + TypeScript.
- 3D: `three`, `@react-three/fiber`, `@react-three/drei` (usar `OrbitControls` para el giro 360° y `useGLTF` para cargar modelos).
- Animación: GSAP (timelines para el ensamblaje de ingredientes) + Framer Motion (transiciones de UI, entrada/salida de tarjetas y del panel de descripción).
- Estilos: Tailwind CSS con los design tokens de marca arriba definidos como variables de tema.
- Modelos 3D: formato `.glb`, comprimidos con Draco o Meshopt, servidos desde `/public/models/`.
- Deploy objetivo: Vercel.

No introducir otro framework de 3D (p. ej. Babylon.js) ni otra librería de animación adicional sin justificarlo — mantener el stack acotado.

## Estructura de carpetas

```
/app
  /(marketing)/page.tsx        → landing
  /carta/page.tsx              → carta completa
  /carta/[slug]/page.tsx       → vista de un plato (opcional, o modal desde /carta)
/components
  /three/DishViewer3D.tsx      → visor 3D reutilizable (modelo + OrbitControls + animación de ensamblaje)
  /three/IngredientAssembly.ts → lógica de timeline GSAP para animar piezas del modelo
  /ui/DishCard.tsx
  /ui/DishDescriptionPanel.tsx
/data
  dishes.ts                    → array tipado con todos los platos (ver esquema abajo)
/public/models/*.glb
/public/textures (si aplica)
```

## Esquema de datos de un plato

```ts
type Dish = {
  id: string;                // slug único, ej. "lomo-saltado"
  name: string;
  category: "entrantes" | "caldos" | "trios" | "a-la-carta" | "pescados-mariscos"
           | "pollo-brasa" | "chifas" | "fast-food" | "bebidas" | "cocteles" | "postres";
  price: number;              // en euros
  description: string;        // por escribir — el PDF de la carta trae nombre y precio, no descripción de sabor/ingredientes
  modelPath: string;          // "/models/lomo-saltado.glb"
  ingredientAnchors?: string[]; // nombres de los nodos/mallas del glb que se animan por separado en el ensamblaje, si el modelo viene segmentado por ingrediente
};
```

Categorías reales tomadas de la carta del restaurante (`LA CONCHA DEL GATO.pdf`): Entrantes, Caldos, Los Tríos de la Concha, Platos a la Carta, Pescados y Mariscos, Pollo a la Brasa, Chifas, Fast Food, Bebidas Frías, Refrescos, Cervezas, Cócteles, Postres. Son ~80 platos en total — el sitio debe ser **data-driven**: no se crea un componente por plato, se itera `dishes.ts` sobre `DishCard` / `DishViewer3D`.

Las descripciones de cada plato (ingredientes, sabor, origen) no vienen en la carta original y hay que redactarlas — pedírmelo aparte cuando toque poblar `dishes.ts`.

## Sobre los modelos 3D

Claude Code no genera modelos 3D. El flujo de assets es:

1. Conseguir el `.glb` de cada plato fuera de este repo (fotogrametría con Polycam/Luma AI sobre el plato real, generador IA como Meshy, o encargo a un artista 3D).
2. Optimizar (Draco/Meshopt, reducir polycount, texturas ≤2K) antes de meterlo en `/public/models/`.
3. Mientras no haya modelo real de un plato, usar un placeholder (cubo o esfera con material del color del plato) en `DishViewer3D` para poder construir y probar la interacción/animación sin bloquear el desarrollo.

Si el modelo viene como una sola malla (sin separación por ingrediente), la animación de "ensamblaje" se simula con partículas/instancias genéricas que convergen hacia el modelo final, en vez de animar piezas reales — dejarlo documentado en el propio componente si se hace así.

## Cómo trabajar en este repo (para el propio Claude Code)

- Cambios pequeños y verticales: un componente o una feature por sesión de trabajo, no "la web entera".
- Antes de tocar arquitectura de la escena 3D o el sistema de animación, plantear el plan y confirmar antes de escribir código.
- Verificar visualmente: levantar el dev server y usar Playwright para capturas de pantalla del resultado (carga del modelo, giro 360, timeline de ensamblaje) en vez de asumir que el código "se ve bien".
- Commits frecuentes por unidad de trabajo (por componente o por plato añadido), no un commit gigante al final.
- Mantener `dishes.ts` como única fuente de verdad para contenido de la carta — no hardcodear nombres/precios en componentes.
- Actualizar este `CLAUDE.md` si cambia el stack, la paleta definitiva, o la convención de carpetas.
