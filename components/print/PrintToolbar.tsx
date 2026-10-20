"use client";

import Link from "next/link";

type PrintToolbarProps = {
  light: boolean;
};

// Barra solo de pantalla (no sale en papel): imprimir y cambiar de fondo.
export function PrintToolbar({ light }: PrintToolbarProps) {
  const option =
    "inline-flex h-11 items-center rounded-full border px-4 transition-colors";
  return (
    <div className="print:hidden sticky top-0 z-10 flex flex-wrap items-center justify-center gap-2 border-b border-white/10 bg-[#1c1c20] px-4 py-3 text-sm text-[#f5f5f0]">
      <Link href="/carta" className={`${option} border-transparent text-white/60 hover:text-white`}>
        ← Carta
      </Link>
      <Link
        href="/carta/imprimir"
        className={`${option} ${light ? "border-white/20 text-white/70" : "border-[#e6b737] text-[#e6b737]"}`}
      >
        Fondo negro
      </Link>
      <Link
        href="/carta/imprimir?fondo=claro"
        className={`${option} ${light ? "border-[#e6b737] text-[#e6b737]" : "border-white/20 text-white/70"}`}
      >
        Fondo claro
      </Link>
      <button
        type="button"
        onClick={() => window.print()}
        className={`${option} border-[#e5177d] bg-[#e5177d] font-medium text-white hover:bg-[#c9126b]`}
      >
        Imprimir / Guardar PDF
      </button>
    </div>
  );
}
