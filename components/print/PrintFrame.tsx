import { Logo } from "@/components/brand/Logo";
import { LineTexture } from "@/components/brand/LineTexture";

// Medidas de la hoja A4 y del marco, en mm.
const PAGE_W = 210;
const PAGE_H = 297;
const INSET = 7;
const CORNER = 15;

// Marco dorado de la carta impresa, como el de la carta del restaurante: una
// línea con las esquinas curvadas hacia dentro. Dibujado a tamaño real (en
// mm), solo para hojas A4 de alto fijo.
export function PrintFrame() {
  const w = PAGE_W - INSET * 2;
  const h = PAGE_H - INSET * 2;
  const r = CORNER;
  const d = [
    `M${r} 0 H${w - r}`,
    `A${r} ${r} 0 0 0 ${w} ${r}`,
    `V${h - r}`,
    `A${r} ${r} 0 0 0 ${w - r} ${h}`,
    `H${r}`,
    `A${r} ${r} 0 0 0 0 ${h - r}`,
    `V${r}`,
    `A${r} ${r} 0 0 0 ${r} 0`,
    "Z",
  ].join(" ");
  return (
    <svg
      viewBox={`-1 -1 ${w + 2} ${h + 2}`}
      className="pointer-events-none absolute z-[1]"
      style={{ left: `${INSET - 1}mm`, top: `${INSET - 1}mm`, width: `${w + 2}mm`, height: `${h + 2}mm` }}
      aria-hidden
    >
      <path d={d} fill="none" stroke="var(--color-brand-gold)" strokeWidth="0.7" />
    </svg>
  );
}

/** Escudo con el logo que cuelga del borde superior y corta el marco. */
export function PrintBadge() {
  return (
    <div className="absolute left-1/2 top-0 z-[2] h-[36mm] w-[40mm] -translate-x-1/2" aria-hidden>
      <svg viewBox="0 0 40 36" className="absolute inset-0 h-full w-full">
        <path
          d="M0.4 0 V27 L20 35.4 L39.6 27 V0"
          fill="var(--background)"
          stroke="var(--color-brand-gold)"
          strokeWidth="0.7"
        />
      </svg>
      <Logo variant="full" className="absolute left-1/2 top-[2mm] w-[30mm] -translate-x-1/2" />
    </div>
  );
}

/** Dibujos de cubiertos y verduras a línea, difuminados hacia arriba, al pie de la hoja. */
export function PrintFootArt() {
  return (
    <div
      className="pointer-events-none absolute inset-x-[7mm] bottom-[7mm] h-[50mm] overflow-hidden [mask-image:linear-gradient(to_top,black,transparent)]"
      aria-hidden
    >
      <LineTexture className="text-foreground/[0.22]" />
    </div>
  );
}

/** Separador dorado: línea, rombo, línea. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-[2mm] text-brand-gold ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-current opacity-60" />
      <svg viewBox="0 0 10 4" className="h-[2mm] w-[5mm] fill-current">
        <path d="M5 0 L7 2 L5 4 L3 2 Z" />
        <circle cx="0.8" cy="2" r="0.5" />
        <circle cx="9.2" cy="2" r="0.5" />
      </svg>
      <span className="h-px flex-1 bg-current opacity-60" />
    </span>
  );
}
