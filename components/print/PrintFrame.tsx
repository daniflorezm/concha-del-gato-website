// Marco dorado de la carta impresa: filete doble con esquinas en arco
// rematadas con un rombo. Unidades del SVG en mm.
function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`absolute h-[16mm] w-[16mm] ${className}`} aria-hidden>
      {/* Tapa el filete interior en la esquina para dibujar el arco encima. */}
      <rect x="1.1" y="1.1" width="8.1" height="8.1" fill="var(--background)" />
      <g fill="none" stroke="var(--color-brand-gold)" strokeWidth="0.25">
        <path d="M1.6 9.2 A7.6 7.6 0 0 0 9.2 1.6" />
        <path d="M1.6 12 A10.4 10.4 0 0 0 12 1.6" strokeWidth="0.15" />
      </g>
      <g fill="var(--color-brand-gold)">
        <path d="M4.2 2.4 L6 4.2 L4.2 6 L2.4 4.2 Z" />
        <circle cx="7.2" cy="7.2" r="0.45" />
      </g>
    </svg>
  );
}

export function PrintFrame({ className = "" }: { className?: string }) {
  return (
    <div className={`carta-frame pointer-events-none ${className}`} aria-hidden>
      <div className="absolute inset-0 border-[0.5mm] border-brand-gold" />
      <div className="absolute inset-[1.6mm] border-[0.25mm] border-brand-gold" />
      <Corner className="left-0 top-0" />
      <Corner className="right-0 top-0 -scale-x-100" />
      <Corner className="bottom-0 left-0 -scale-y-100" />
      <Corner className="bottom-0 right-0 -scale-100" />
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
