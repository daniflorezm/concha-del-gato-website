// Datos de contacto y horario — única fuente de verdad para cabecera, pie,
// sección "Visítanos" y datos estructurados (SEO). Tomados de la ficha de
// Google del restaurante.

export type OpeningSlot = { opens: string; closes: string };

export type OpeningDay = {
  /** 0 = domingo … 6 = sábado (igual que Date.getDay()). */
  day: number;
  label: string;
  schemaDay: string;
  slots: OpeningSlot[];
};

export const restaurant = {
  name: "La Concha del Gato",
  tagline: "Restaurante peruano",
  phone: "607 24 57 72",
  phoneHref: "tel:+34607245772",
  address: {
    street: "C. Virgen de Icíar, 32",
    postalCode: "28921",
    city: "Alcorcón",
    region: "Madrid",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=La+Concha+del+Gato+C.+Virgen+de+Iciar+32+Alcorc%C3%B3n",
  mapsEmbedUrl:
    "https://www.google.com/maps?q=C.+Virgen+de+Iciar+32,+28921+Alcorc%C3%B3n,+Madrid&output=embed",
  priceRange: "10–20 €",
} as const;

// Ordenado de lunes a domingo, como se lee un horario en España.
// OJO: en Google el lunes aparece como 0:00–18:00; se asume que es un error y
// que abre a las 12:00 como el resto de días — confirmar con el restaurante.
export const openingHours: OpeningDay[] = [
  { day: 1, label: "Lunes", schemaDay: "Monday", slots: [{ opens: "12:00", closes: "18:00" }, { opens: "20:00", closes: "02:00" }] },
  { day: 2, label: "Martes", schemaDay: "Tuesday", slots: [{ opens: "12:00", closes: "18:00" }, { opens: "20:00", closes: "02:00" }] },
  { day: 3, label: "Miércoles", schemaDay: "Wednesday", slots: [] },
  { day: 4, label: "Jueves", schemaDay: "Thursday", slots: [{ opens: "12:00", closes: "18:00" }, { opens: "20:00", closes: "02:00" }] },
  { day: 5, label: "Viernes", schemaDay: "Friday", slots: [{ opens: "12:00", closes: "18:00" }, { opens: "20:00", closes: "02:00" }] },
  { day: 6, label: "Sábado", schemaDay: "Saturday", slots: [{ opens: "12:00", closes: "02:00" }] },
  { day: 0, label: "Domingo", schemaDay: "Sunday", slots: [{ opens: "12:00", closes: "24:00" }] },
];

export function formatSlots(slots: OpeningSlot[]) {
  return slots.length === 0
    ? "Cerrado"
    : slots.map((slot) => `${slot.opens}–${slot.closes}`).join(" · ");
}

/** Datos estructurados schema.org para que Google entienda la ficha. */
export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    servesCuisine: "Peruana",
    priceRange: restaurant.priceRange,
    telephone: "+34607245772",
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      postalCode: restaurant.address.postalCode,
      addressLocality: restaurant.address.city,
      addressRegion: restaurant.address.region,
      addressCountry: "ES",
    },
    openingHoursSpecification: openingHours.flatMap((day) =>
      day.slots.map((slot) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${day.schemaDay}`,
        opens: slot.opens,
        closes: slot.closes === "24:00" ? "23:59" : slot.closes,
      })),
    ),
  };
}
