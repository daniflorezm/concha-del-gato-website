// Textura de fondo: ilustraciones lineales finas (cubiertos, ají, choclo,
// limón) en gris sobre negro, como el motivo de la carta impresa. Va muy
// atenuada para no competir con el contenido.
export function LineTexture({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    >
      <defs>
        <pattern
          id="line-texture"
          width="220"
          height="220"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-8)"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
            {/* tenedor */}
            <path d="M30 20 v28 M24 20 v14 a6 6 0 0 0 12 0 v-14 M30 48 v42" />
            {/* cuchara */}
            <path d="M160 130 c-8 0 -11 10 -11 17 c0 7 5 11 11 11 c6 0 11 -4 11 -11 c0 -7 -3 -17 -11 -17 z M160 158 v44" />
            {/* ají */}
            <path d="M120 30 c10 4 22 20 14 44 c-4 12 -14 18 -20 14 c-6 -4 2 -16 3 -28 c1 -12 -4 -22 3 -30 z M120 30 c-2 -6 2 -12 8 -12" />
            {/* choclo */}
            <path d="M60 140 c-10 20 -8 50 6 62 c14 -12 16 -42 6 -62 c-4 -6 -8 -6 -12 0 z M62 150 h12 M60 162 h16 M60 174 h16 M62 186 h12 M66 140 v58" />
            <path d="M58 180 c-10 -2 -18 6 -20 18 M78 180 c10 -2 18 6 20 18" />
            {/* limón */}
            <circle cx="190" cy="50" r="16" />
            <path d="M190 34 v32 M174 50 h32 M179 39 l22 22 M201 39 l-22 22" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#line-texture)" />
    </svg>
  );
}
