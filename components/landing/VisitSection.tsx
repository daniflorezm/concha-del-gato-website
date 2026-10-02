"use client";

import { useSyncExternalStore } from "react";
import { PeruRoute } from "@/components/landing/PeruRoute";
import { formatSlots, openingHours, restaurant } from "@/data/restaurant";

const noopSubscribe = () => () => {};

export function VisitSection() {
  // El día de hoy se calcula en el navegador (en el servidor es null): la
  // página es estática y se generó en otro momento.
  const today = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getDay(),
    () => null,
  );

  const { address } = restaurant;

  return (
    <section id="visitanos" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 sm:px-8">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-turquoise">
          Te esperamos
        </p>
        <h2 className="font-logo text-4xl text-brand-gold sm:text-5xl">Visítanos</h2>
        <span className="h-px w-24 bg-brand-gold" />
      </div>

      <div className="mb-14">
        <PeruRoute />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Dirección</p>
            <p className="font-display text-2xl text-foreground">
              {address.street}
              <br />
              {address.postalCode} {address.city}, {address.region}
            </p>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center self-start text-sm uppercase tracking-[0.2em] text-brand-gold hover:text-brand-turquoise"
            >
              Cómo llegar →
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Teléfono</p>
            <a
              href={restaurant.phoneHref}
              className="inline-flex min-h-11 items-center self-start font-display text-3xl text-foreground hover:text-brand-magenta"
            >
              {restaurant.phone}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">Horario</p>
            <dl className="flex flex-col">
              {openingHours.map((day) => {
                const isToday = day.day === today;
                return (
                  <div
                    key={day.day}
                    className={`flex items-baseline gap-4 border-b border-brand-gold/15 py-2 ${
                      isToday ? "text-brand-turquoise" : "text-foreground/75"
                    }`}
                  >
                    <dt className="w-28 shrink-0 font-display text-lg">
                      {day.label}
                      {isToday && <span className="ml-2 text-xs uppercase tracking-widest">hoy</span>}
                    </dt>
                    <dd className={`ml-auto text-right text-sm ${day.slots.length === 0 ? "text-brand-magenta" : ""}`}>
                      {formatSlots(day.slots)}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-brand-gold/30">
          <iframe
            title={`Mapa: ${restaurant.name}`}
            src={restaurant.mapsEmbedUrl}
            className="absolute inset-0 h-full w-full grayscale invert-[0.9] hue-rotate-180"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
