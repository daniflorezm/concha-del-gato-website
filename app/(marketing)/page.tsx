import { DishSpotlight } from "@/components/landing/DishSpotlight";
import { Hero } from "@/components/landing/Hero";
import { IngredientMarquee } from "@/components/landing/IngredientMarquee";
import { MenuIndex } from "@/components/landing/MenuIndex";
import { VisitSection } from "@/components/landing/VisitSection";
import { dishes } from "@/data/dishes";

export default function Home() {
  const withPhoto = dishes.filter((dish) => dish.photo);
  const heroDish = withPhoto.find((dish) => dish.category === "duos-trios") ?? withPhoto[0];
  const spotlights = withPhoto.filter((dish) => dish !== heroDish).concat(heroDish ? [heroDish] : []);

  return (
    <main className="flex flex-col gap-24 pb-24 sm:gap-32">
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
            Toca los números de cada foto para ver qué lleva.
          </p>
        </div>

        {spotlights.map((dish, i) => (
          <DishSpotlight key={dish.id} dish={dish} index={i} />
        ))}
      </section>

      <MenuIndex />

      <VisitSection />
    </main>
  );
}
