import Image from "next/image";
import { useId } from "react";
import {
  LOGO_HEIGHT,
  LOGO_VIEWBOX,
  LOGO_WIDTH,
  SHELL_SILHOUETTE_PATH,
  SHELL_STROKE_PATH,
} from "@/components/brand/logoPaths";

type ShellFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Desplaza el encuadre de la foto dentro de la concha (object-position). */
  objectPosition?: string;
};

// La concha del logo usada como máscara de una foto real, con su trazo magenta
// encima y un brillo de neón como el del rótulo del local.
export function ShellFrame({
  src,
  alt,
  priority,
  sizes = "(min-width: 1024px) 45vw, 90vw",
  className = "",
  objectPosition = "center",
}: ShellFrameProps) {
  const clipId = useId().replace(/:/g, "");

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}>
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path
              d={SHELL_SILHOUETTE_PATH}
              transform={`scale(${1 / LOGO_WIDTH} ${1 / LOGO_HEIGHT})`}
            />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute inset-0" style={{ clipPath: `url(#${clipId})` }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>

      <svg
        viewBox={LOGO_VIEWBOX}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <path
          d={SHELL_STROKE_PATH}
          fill="var(--color-brand-magenta)"
          fillRule="evenodd"
          className="shell-neon"
        />
      </svg>
    </div>
  );
}
