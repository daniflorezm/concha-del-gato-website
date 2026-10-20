"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PrintFrame } from "@/components/print/PrintFrame";

// Alto útil de una hoja A4 (297 mm menos 17 mm de relleno arriba y abajo) y
// separación mínima entre bloques.
const PAGE_CONTENT_MM = 263;
const MIN_GAP_MM = 6;
const PX_PER_MM = 96 / 25.4;

/**
 * Reparte los bloques, en orden y sin partirlos, en el menor número de hojas
 * con el hueco libre lo más igualado posible (minimiza la suma de los
 * cuadrados del espacio sobrante de cada hoja).
 */
function paginate(heights: number[]) {
  const n = heights.length;
  const cost = Array<number>(n + 1).fill(Infinity);
  const start = Array<number>(n + 1).fill(0);
  cost[0] = 0;
  for (let end = 1; end <= n; end++) {
    let used = -MIN_GAP_MM;
    for (let from = end - 1; from >= 0; from--) {
      used += heights[from] + MIN_GAP_MM;
      // Un bloque más alto que la hoja va solo en la suya.
      if (used > PAGE_CONTENT_MM && end - from > 1) break;
      const total = cost[from] + (PAGE_CONTENT_MM - used) ** 2;
      if (total < cost[end]) {
        cost[end] = total;
        start[end] = from;
      }
    }
  }
  const pages: number[][] = [];
  for (let end = n; end > 0; end = start[end]) {
    pages.unshift(Array.from({ length: end - start[end] }, (_, i) => start[end] + i));
  }
  return pages;
}

// Hojas de platos. Primero se pintan todos los bloques seguidos para medirlos
// (es también lo que queda si no hay JavaScript) y después se reparten en
// hojas A4, con el espacio libre de cada hoja repartido entre los bloques.
export function PrintPages({ blocks }: { blocks: ReactNode[] }) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number[][] | null>(null);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      const container = measureRef.current;
      if (cancelled || !container) return;
      const heights = [...container.children].map(
        (el) => el.getBoundingClientRect().height / PX_PER_MM,
      );
      setPages(paginate(heights));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!pages) {
    return (
      <section className="carta-sheet relative">
        <PrintFrame />
        <div ref={measureRef} className="flex flex-col gap-[6mm]">
          {blocks}
        </div>
      </section>
    );
  }

  return (
    <div data-paginated>
      {pages.map((page) => (
        <section key={page[0]} className="carta-sheet carta-page relative flex flex-col justify-evenly">
          <PrintFrame />
          {page.map((index) => blocks[index])}
        </section>
      ))}
    </div>
  );
}
