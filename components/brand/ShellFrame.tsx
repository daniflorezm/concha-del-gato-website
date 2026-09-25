import Image from "next/image";
import { useId } from "react";

// Silueta de concha (vieira) generada en un lienzo de 100×100: bisagra abajo,
// borde superior festoneado. Es el motivo del logo y se usa como máscara de
// fotos y como marco con "neón" magenta.
const SHELL_PATH =
  "M45.0,90.0 L1.7,52.3 Q-0.1,41.7 7.6,39.9 Q7.4,29.0 15.2,29.3 Q16.5,18.5 24.2,21.0 Q26.9,10.8 34.1,15.3 Q38.2,6.0 44.6,12.4 Q50.0,4.4 55.4,12.4 Q61.8,6.0 65.9,15.3 Q73.1,10.8 75.8,21.0 Q83.5,18.5 84.8,29.3 Q92.6,29.0 92.4,39.9 Q100.1,41.7 98.3,52.3 L55.0,90.0 L63.0,91.0 L61.0,97.0 L39.0,97.0 L37.0,91.0 Z";

const RIBS_PATH =
  "M50.0,88.0 L9.3,41.8 M50.0,88.0 L16.6,31.7 M50.0,88.0 L25.2,23.7 M50.0,88.0 L34.7,18.2 M50.0,88.0 L44.8,15.4 M50.0,88.0 L55.2,15.4 M50.0,88.0 L65.3,18.2 M50.0,88.0 L74.8,23.7 M50.0,88.0 L83.4,31.7 M50.0,88.0 L90.7,41.8";

type ShellFrameProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Desplaza el encuadre de la foto dentro de la concha (object-position). */
  objectPosition?: string;
};

export function ShellFrame({
  src,
  alt,
  priority,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  className = "",
  objectPosition = "center",
}: ShellFrameProps) {
  const clipId = useId().replace(/:/g, "");

  return (
    <div className={`relative aspect-square ${className}`}>
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={SHELL_PATH} transform="scale(0.01)" />
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
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>

      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <path
          d={RIBS_PATH}
          fill="none"
          stroke="var(--color-brand-magenta)"
          strokeWidth="0.25"
          strokeOpacity="0.35"
        />
        <path
          d={SHELL_PATH}
          fill="none"
          stroke="var(--color-brand-magenta)"
          strokeWidth="0.6"
          className="shell-neon"
        />
      </svg>
    </div>
  );
}

export function ShellGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d={RIBS_PATH} fill="none" stroke="currentColor" strokeWidth="3" />
      <path d={SHELL_PATH} fill="none" stroke="currentColor" strokeWidth="4" />
    </svg>
  );
}
