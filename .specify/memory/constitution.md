<!--
Sync Impact Report
- Version change: (template, unratified) → 1.0.0
- Rationale: Initial ratification of the project constitution. No prior version existed —
  the file at .specify/memory/constitution.md only contained unfilled template placeholders.
- Modified principles: n/a (initial adoption)
- Added sections:
  - Core Principles: I. Contenido dirigido por datos (dishes.ts) · II. Stack tecnológico
    acotado · III. Verificación visual antes de dar por completado · IV. Cambios pequeños,
    verticales y confirmados · V. Commits frecuentes por unidad de trabajo
  - Identidad de marca y design tokens (Section 2)
  - Pipeline de assets 3D (Section 3)
  - Governance
- Removed sections: none
- Templates requiring updates: none modified by this command (out of scope — dependent
  templates/commands read this constitution at runtime per the scope guard).
- Deferred / TODO placeholders: none. RATIFICATION_DATE set to today's date because this
  repository has no prior commits or constitution history — today is the initial adoption.
-->

# La Concha del Gato Constitution

## Core Principles

### I. Contenido dirigido por datos (dishes.ts)
`dishes.ts` es la única fuente de verdad para el contenido de la carta: nombres, precios,
categorías, descripciones y rutas de modelos 3D. Los nombres, precios o descripciones de
platos MUST NOT estar hardcodeados dentro de componentes. El sitio se construye iterando
`dishes.ts` sobre componentes reutilizables (`DishCard`, `DishViewer3D`); no se crea un
componente nuevo por cada uno de los ~80 platos de la carta. Justificación: el menú cambia
con más frecuencia que el código de UI, y un modelo data-driven evita que esos cambios
requieran tocar componentes.

### II. Stack tecnológico acotado
El stack del proyecto se limita a: Next.js (App Router) + TypeScript; `three` junto con
`@react-three/fiber` y `@react-three/drei` para todo el 3D; GSAP y Framer Motion para
animación; Tailwind CSS para estilos. No se introduce otro framework 3D (p. ej. Babylon.js)
ni otra librería de animación adicional sin justificación explícita planteada y confirmada
antes de implementarla. Justificación: un stack acotado reduce la superficie de
mantenimiento en un sitio con decenas de componentes de plato estructuralmente similares.

### III. Verificación visual antes de dar por completado
Ningún cambio de UI, animación o visor 3D se reporta como terminado sin levantar el dev
server y verificar el resultado con capturas de pantalla (Playwright): carga del modelo,
giro 360°, y timeline de ensamblaje de ingredientes. No se debe asumir que el código "se ve
bien" solo porque compila o pasa el type-check. Justificación: la experiencia central del
sitio es visual e interactiva (3D + animación), y las verificaciones de tipos no capturan
regresiones visuales ni de interacción.

### IV. Cambios pequeños, verticales y confirmados
Cada sesión de trabajo aborda un componente o una feature concreta — nunca "la web entera".
Antes de tocar la arquitectura de la escena 3D o el sistema de animación (timelines de GSAP,
estructura de `DishViewer3D`, `IngredientAssembly.ts`), se debe plantear el plan y obtener
confirmación explícita antes de escribir código. Justificación: la arquitectura 3D y de
animación es costosa de revertir una vez que múltiples platos dependen de ella.

### V. Commits frecuentes por unidad de trabajo
Se realizan commits frecuentes, uno por componente o por plato añadido, nunca un commit
gigante al final de la sesión. Justificación: permite revertir un plato o componente
problemático de forma aislada sin afectar el resto del trabajo ya validado.

## Identidad de marca y design tokens

Paleta extraída del logo real del restaurante, a usar como base del design system
(`tailwind.config` / `theme.ts`):

- Fondo: negro casi puro (`#0d0d0f`), no negro puro.
- Acento primario: magenta/rosa fuerte (`#E5177D` aprox.) — nombre del restaurante, CTAs,
  bordes de la concha.
- Acento secundario: dorado (`#D4AF37` aprox.) — líneas divisorias, marcos, tipografía de
  detalle ("MENÚ", precios).
- Acento terciario: turquesa/azul (`#29ABE2` aprox.) — icono de tenedor/cuchara dentro de la
  concha del logo; usar con moderación, solo en micro-detalles o estados hover.
- Texto principal sobre fondo oscuro: blanco roto (`#F5F5F0`).
- Tipografía: serif elegante para titulares, sans-serif limpia para cuerpo de texto y
  precios.
- Motivo gráfico de fondo: ilustraciones lineales finas (cubiertos, verduras) en gris sobre
  negro, como textura decorativa sutil que no compite con el contenido.

Estos tonos son de partida y deben ajustarse con un selector de color sobre el PDF/logo
original antes de fijarse de forma definitiva en el design system.

## Pipeline de assets 3D

Claude Code no genera modelos 3D; el flujo de assets es el siguiente:

1. Conseguir el `.glb` de cada plato fuera de este repo (fotogrametría con Polycam/Luma AI
   sobre el plato real, generador IA como Meshy, o encargo a un artista 3D).
2. Optimizar (Draco/Meshopt, reducir polycount, texturas ≤2K) antes de colocarlo en
   `/public/models/`.
3. Mientras no exista modelo real de un plato, usar un placeholder (cubo o esfera con
   material del color del plato) en `DishViewer3D` para poder construir y probar la
   interacción y la animación sin bloquear el desarrollo.
4. Si el modelo llega como una sola malla (sin separación por ingrediente), la animación de
   "ensamblaje" se simula con partículas/instancias genéricas que convergen hacia el modelo
   final, en lugar de animar piezas reales; este fallback debe quedar documentado en el
   propio componente cuando se use.

## Governance

Esta constitución tiene prioridad sobre cualquier otra práctica o preferencia ad-hoc
adoptada durante el desarrollo. Toda enmienda:

- MUST actualizar este archivo y, si corresponde, `CLAUDE.md` en la misma sesión de trabajo.
- MUST incrementar la versión según versionado semántico: MAJOR para eliminación o
  redefinición incompatible de un principio; MINOR para la adición de un principio nuevo o
  guía material adicional; PATCH para aclaraciones o correcciones no semánticas.
- MUST registrar la fecha de última enmienda en el pie de este documento.

`CLAUDE.md` debe mantenerse sincronizado con esta constitución: si cambia el stack técnico,
la paleta definitiva de marca, o la convención de carpetas, ambos documentos se actualizan
juntos. El cumplimiento de los principios se revisa al inicio de cada sesión de trabajo,
leyendo este documento y `CLAUDE.md` antes de tocar código. Cualquier desviación del stack
acotado (Principio II) o de la arquitectura 3D/animación (Principio IV) debe justificarse
explícitamente y confirmarse con el usuario antes de implementarse.

**Version**: 1.0.0 | **Ratified**: 2026-08-10 | **Last Amended**: 2026-08-10
