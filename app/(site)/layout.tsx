import { LineTexture } from "@/components/brand/LineTexture";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

// Cabecera, pie y textura de la web. La carta imprimible (/carta/imprimir)
// queda fuera de este grupo para salir limpia en papel.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/* Fondos decorativos recortados a la página: si sobresalen, en móvil
          ensanchan la vista y se puede desplazar/alejar en horizontal. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <LineTexture className="text-foreground/[0.035]" />
        <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-brand-magenta/10 blur-[140px]" />
      </div>
      <SiteHeader />
      <div className="relative flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </>
  );
}
