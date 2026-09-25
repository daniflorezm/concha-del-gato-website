import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { restaurant } from "@/data/restaurant";

export function SiteFooter() {
  const { address } = restaurant;
  return (
    <footer className="relative border-t border-brand-gold/20 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm text-foreground/55">
        <Logo className="h-12 w-14" />
        <p className="font-logo text-base text-brand-gold">La concha del gato</p>
        <p>
          {address.street} · {address.postalCode} {address.city}, {address.region}
        </p>
        <p className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <a href={restaurant.phoneHref} className="hover:text-brand-turquoise">
            {restaurant.phone}
          </a>
          <Link href="/carta" className="hover:text-brand-turquoise">
            Carta
          </Link>
          <a href={restaurant.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-turquoise">
            Cómo llegar
          </a>
        </p>
      </div>
    </footer>
  );
}
