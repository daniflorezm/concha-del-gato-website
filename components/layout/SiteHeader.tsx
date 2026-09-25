import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { restaurant } from "@/data/restaurant";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-gold/15 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-9 w-10" />
          <span className="hidden font-logo text-base text-brand-gold sm:inline">
            La concha del gato
          </span>
        </Link>
        <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-foreground/75 sm:gap-7">
          <Link href="/carta" className="hover:text-brand-turquoise">
            Carta
          </Link>
          <Link href="/#visitanos" className="hover:text-brand-turquoise">
            Visítanos
          </Link>
          <a
            href={restaurant.phoneHref}
            className="rounded-full border border-brand-magenta px-4 py-2 text-foreground transition-colors hover:bg-brand-magenta"
          >
            Llamar
          </a>
        </div>
      </nav>
    </header>
  );
}
