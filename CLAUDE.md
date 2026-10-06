# La Concha del Gato — Web

Restaurante peruano. Este documento es el contexto persistente del proyecto para Claude Code: léelo siempre antes de trabajar y mantenlo actualizado si el stack o las convenciones cambian.

## Qué estamos construyendo

Web de presentación de un restaurante peruano de barrio en Alcorcón (Madrid). **Sencilla a propósito**: fotos reales de los platos, la carta legible en móvil (se abrirá sobre todo desde un QR en mesa) y lo que un cliente busca — dirección, horario y teléfono.

Lo personal viene del diseño con la marca real (concha, neón, carta impresa), no de efectos técnicos.

No es un sistema de pedidos ni reservas (por ahora).

**Descartado** (probado por el cliente, no queda bien): visor 3D de platos, modelos generados desde foto, vídeos generados con IA y edición/recorte de fotos con IA. No volver a proponerlo: la comida de la web tiene que ser la real, sin retoques generativos.

## Identidad de marca

Extraída del logo real del restaurante:

- Fondo: negro / casi negro (`#0d0d0f` — usar como base, no negro puro).
- Acento primario: magenta/rosa fuerte (`#E5177D` aprox.) — nombre del restaurante, CTAs, bordes de la concha.
- Acento secundario: dorado (`#E6B737`, medido en el logo) — líneas divisorias, marcos, tipografía de detalle ("MENÚ", precios).
- Acento terciario: turquesa (`#49BBE4`, medido en el logo) — el icono de tenedor-gato/cuchara dentro de la concha del logo. Usar con moderación, para micro-detalles o hover states.
- Texto principal sobre fondo oscuro: blanco roto (`#F5F5F0`).
- Tipografía: serif elegante para titulares (el logo y "MENÚ" usan una serif clásica tipo *display*), sans-serif limpia para cuerpo de texto/precios. Elegidas: Cinzel (`font-logo`, misma familia de mayúsculas clásicas que el rótulo del logo, para el nombre y títulos de sección), Cormorant Garamond (`font-display`, nombres de platos y textos en serif) y Geist (`font-sans`).
- Motivo gráfico de fondo: ilustraciones lineales finas (cubiertos, verduras) en gris sobre negro — se puede reutilizar como textura decorativa sutil, sin competir con el contenido.

Los tokens viven en `app/globals.css` (`@theme`). El logo está vectorizado en `components/brand/logoPaths.ts` a partir de una imagen; si llega el archivo vectorial original, sustituir esos trazados.

Recursos visuales propios de la web (para que no parezca una plantilla):

- La concha del logo como máscara de las fotos, con su trazo magenta con brillo de neón (`ShellFrame`).
- "Carta táctil": fotos reales limpias; al tocar cualquier punto aparece el componente principal más cercano (3–4 por plato, sin números; el detalle va en la descripción) (`DishSpotlight`).
- Fondo del Hero: tenedor-gato a línea dorada que se dibuja al cargar (`CatForkLine`); en "Visítanos", ruta Trujillo → Alcorcón sobre el contorno de Perú (`PeruRoute`, `peruPath.ts`).
- Índice de la carta con números romanos y línea de puntos dorada, como la carta impresa (`MenuIndex`).

## Stack técnico

- Framework: Next.js (App Router) + TypeScript.
- Animación: Framer Motion, solo transiciones de entrada discretas. Respetar `prefers-reduced-motion`.
- Estilos: Tailwind CSS v4 con los design tokens de marca definidos como variables de tema.
- Imágenes: `next/image` sobre WebP en `/public/images/platos/`.
- Deploy objetivo: Vercel.

Sin 3D ni más librerías de animación: mantener el stack acotado.

## Estructura de carpetas

```
/app
  layout.tsx                   → cabecera, pie, textura de fondo y datos estructurados (schema.org Restaurant)
  icon.svg                     → favicon (concha del logo)
  /(marketing)/page.tsx        → landing
  /carta/page.tsx              → carta completa, pensada para móvil
/components
  /brand/logoPaths.ts          → trazados vectoriales del logo
  /brand/Logo.tsx              → logo ("mark" = concha + icono, "full" = con nombre)
  /brand/ShellFrame.tsx        → foto recortada con la silueta de la concha + trazo neón
  /brand/LineTexture.tsx       → textura de fondo de ilustraciones lineales
  /layout/SiteHeader.tsx, SiteFooter.tsx
  /landing/*                   → Hero, IngredientMarquee, DishSpotlight, MenuIndex, VisitSection
  /carta/MenuItem.tsx          → fila de plato en /carta
/data
  dishes.ts                    → array tipado con todos los platos (ver esquema abajo)
  restaurant.ts                → dirección, teléfono, horario, enlaces a Maps
/public/images/platos/*.webp   → fotos reales (verticales recortadas a 4:5 centradas en el plato, ≤1600px)
```

## Esquema de datos de un plato

```ts
type Dish = {
  id: string;                // slug único, ej. "lomo-saltado"
  name: string;
  category: "entrantes" | "ceviches" | "crocantes" | "arroces" | "sopas" | "duos-trios"
           | "tacu-tacus" | "criollos" | "brasas" | "fast-food" | "guarniciones" | "bebidas";
  price: number | null;       // en euros; null = pendiente de confirmar con la carta impresa (no se muestra)
  description: string;        // texto de la carta (vacío en guarniciones y bebidas)
  allergens?: string[];       // "x*" = según elaboración; [] = ninguno; ausente = sin dato
  photo?: {                   // foto real del plato (WebP en /public/images/platos/)
    src: string; width: number; height: number;
    hotspots?: { label: string; x: number; y: number }[]; // ingredientes señalados sobre la foto, en % de ancho/alto
  };
};
```

Categorías y platos tomados de `CARTA CON DESCRIPCION Y ALERGENOS.docx` (la carta vigente): Entradas, Ceviches, Los Crocantes, Arroces Criollos y Marinos, Nuestras Sopas, Dúos/Tríos/Barcos Marinos, Los Tacu Tacus, Criollos y Especiales de la Casa, Brasas y Broasters, Fast Food, Guarniciones y Bebidas y Licores (~98 entradas). El sitio es **data-driven**: se itera `dishes.ts` sobre `MenuItem` / `DishSpotlight`; las categorías sin platos no se muestran.

Estado actual: carta completa con precios, descripciones y alérgenos. 22 platos tienen foto real (sesión de fotos del iPhone); solo los 5 con ingredientes tocables (`hotspots`) salen en la landing, el resto de fotos se ve en /carta.

## Datos del restaurante

En `data/restaurant.ts`, tomados de la ficha de Google. En Google el lunes aparece como 0:00–18:00; se ha puesto 12:00–18:00 asumiendo que es un error — confirmar.

## Cómo trabajar en este repo (para el propio Claude Code)

- Cambios pequeños y verticales: un componente o una feature por sesión de trabajo, no "la web entera".
- Antes de cambiar el planteamiento de la web (añadir secciones grandes, efectos, dependencias), plantear el plan y confirmar antes de escribir código.
- Verificar visualmente: levantar el servidor y usar Playwright para capturas en escritorio y móvil (390px) en vez de asumir que el código "se ve bien".
- En móvil (320, 360 y 390px) comprobar que `document.documentElement.scrollWidth` es igual al ancho de la pantalla: si algo sobresale, al pellizcar se puede alejar la página y la cabecera fija se estira. Los adornos de fondo (halos, texturas) van dentro de un contenedor con `overflow-hidden`.
- Zonas táctiles de al menos 44px (enlaces, botones y puntos de ingredientes).
- Al cambiar una foto con el mismo nombre, borrar `.next/cache/images` o `next/image` seguirá sirviendo la versión anterior en local.
- Los puntos de ingredientes (`hotspots`) se colocan en % sobre la foto ya recortada: comprobarlos con una captura.
- Commits frecuentes por unidad de trabajo (por componente o por plato añadido), no un commit gigante al final.
- Mantener `dishes.ts` y `restaurant.ts` como única fuente de verdad — no hardcodear nombres, precios, horario ni teléfono en componentes.
- Actualizar este `CLAUDE.md` si cambia el stack, la paleta definitiva, o la convención de carpetas.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
