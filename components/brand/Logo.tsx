import {
  CAT_FORK_PATH,
  LOGO_VIEWBOX,
  SHELL_STROKE_PATH,
} from "@/components/brand/logoPaths";

type LogoProps = {
  className?: string;
  /** "mark": solo concha + icono. "full": con nombre y "Restaurante peruano". */
  variant?: "mark" | "full";
  title?: string;
};

export function Logo({ className = "", variant = "mark", title = "La Concha del Gato" }: LogoProps) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title}>
      <path d={SHELL_STROKE_PATH} fill="var(--color-brand-magenta)" fillRule="evenodd" />
      {variant === "mark" ? (
        // En la versión icono el tenedor-gato se escala y centra para que se lea en tamaños pequeños.
        <g transform="translate(1000 880) scale(2) translate(-1000 -560)">
          <path d={CAT_FORK_PATH} fill="var(--color-brand-turquoise)" fillRule="evenodd" />
        </g>
      ) : (
        <>
          <path d={CAT_FORK_PATH} fill="var(--color-brand-turquoise)" fillRule="evenodd" />
          <g
            fill="var(--color-brand-gold)"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-cinzel), serif" }}
          >
            <text x="1000" y="970" fontSize="190">
              La concha
            </text>
            <text x="1000" y="1170" fontSize="190">
              del gato
            </text>
          </g>
          <rect x="674" y="1262" width="656" height="9" fill="var(--color-brand-gold)" />
          <text
            x="1000"
            y="1414"
            fontSize="50"
            letterSpacing="4"
            textAnchor="middle"
            fill="var(--color-brand-turquoise)"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            RESTAURANTE PERUANO
          </text>
        </>
      )}
    </svg>
  );
}
