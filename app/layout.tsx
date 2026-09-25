import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Geist } from "next/font/google";
import { LineTexture } from "@/components/brand/LineTexture";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { restaurantJsonLd } from "@/data/restaurant";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Cinzel: la misma familia de mayúsculas clásicas del rótulo del logo.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "La Concha del Gato · Restaurante peruano en Alcorcón",
    template: "%s · La Concha del Gato",
  },
  description:
    "Restaurante peruano en Alcorcón: ceviches, causas, lomo saltado, chifa y pollo a la brasa. Consulta la carta, el horario y cómo llegar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        {/* Fondos decorativos recortados a la página: si sobresalen, en móvil
            ensanchan la vista y se puede desplazar/alejar en horizontal. */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <LineTexture className="text-foreground/[0.035]" />
          <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-brand-magenta/10 blur-[140px]" />
        </div>
        <SiteHeader />
        <div className="relative flex flex-1 flex-col">{children}</div>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd()) }}
        />
      </body>
    </html>
  );
}
