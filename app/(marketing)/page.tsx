import { LineTexture } from "@/components/brand/LineTexture";
import { ShellGlyph } from "@/components/brand/ShellFrame";
import { DishSpotlight } from "@/components/landing/DishSpotlight";
import { Hero } from "@/components/landing/Hero";
import { IngredientMarquee } from "@/components/landing/IngredientMarquee";
import { MenuIndex } from "@/components/landing/MenuIndex";
import { dishes } from "@/data/dishes";

export default function Home() {
  const withPhoto = dishes.filter((dish) => dish.photo);
  const heroDish = withPhoto.find((dish) => dish.category === "trios") ?? withPhoto[0];

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <LineTexture className="text-foreground/[0.035]" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-brand-magenta/10 blur-[140px]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-gold/15 bg-background/70 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
          <a href="#" className="flex items-center gap-3 text-brand-magenta">
            <ShellGlyph className="h-8 w-8" />
            <span className="font-display text-lg text-foreground">
              La Concha del Gato
            </span>
          </a>
          <div className="flex gap-6 text-xs uppercase tracking-[0.25em] text-foreground/70">
            <a href="#platos" className="hover:text-brand-turquoise">
              Platos
            </a>
            <a href="#carta" className="hover:text-brand-turquoise">
              Carta
            </a>
          </div>
        </nav>
      </header>

      <main className="relative flex flex-col gap-24 pb-24 sm:gap-32">
        {heroDish && <Hero dish={heroDish} />}

        <IngredientMarquee />

        <section id="platos" className="flex scroll-mt-24 flex-col gap-24 sm:gap-36">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-turquoise">
              Recién salidos de cocina
            </p>
            <h2 className="font-display text-5xl text-foreground sm:text-6xl">
              Cada plato, <span className="italic text-brand-magenta">por dentro</span>
            </h2>
            <p className="text-foreground/60">
              Pasa por los números de cada foto para ver qué lleva.
            </p>
          </div>

          {withPhoto
            .filter((dish) => dish !== heroDish)
            .concat(heroDish ? [heroDish] : [])
            .map((dish, i) => (
              <DishSpotlight key={dish.id} dish={dish} index={i} />
            ))}
        </section>

        <MenuIndex />
      </main>

      <footer className="relative border-t border-brand-gold/20 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center text-sm text-foreground/50">
          <ShellGlyph className="h-6 w-6 text-brand-magenta" />
          <p className="font-display text-base text-foreground/80">La Concha del Gato</p>
          <p>Cocina peruana</p>
        </div>
      </footer>
    </div>
  );
}
