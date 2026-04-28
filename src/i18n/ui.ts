import type { Locale } from "./config";

type UIStrings = {
  nav: {
    the_place: string;
    the_apartment: string;
    art_of_living: string;
    reserve: string;
  };
  cta: {
    book_airbnb: string;
    book_airbnb_aria: string;
    scroll_to_explore: string;
    discover_more: string;
  };
  footer: {
    tagline: string;
    legal: string;
    credits: string;
  };
  chapters: {
    opening: string;
    prologue: string;
    the_place: string;
    the_apartment: string;
    materials: string;
    art_of_living: string;
    seasons: string;
    reserve: string;
  };
};

const fr: UIStrings = {
  nav: {
    the_place: "Le lieu",
    the_apartment: "L’appartement",
    art_of_living: "L’art de vivre",
    reserve: "Réserver",
  },
  cta: {
    book_airbnb: "Réserver sur Airbnb",
    book_airbnb_aria: "Réserver cet appartement sur Airbnb — ouvre dans un nouvel onglet",
    scroll_to_explore: "Laissez-vous porter",
    discover_more: "Découvrir",
  },
  footer: {
    tagline: "Sainte-Maxime · face à Saint-Tropez — une adresse confidentielle.",
    legal: "Mentions légales",
    credits: "© L’Arbois",
  },
  chapters: {
    opening: "Ouverture",
    prologue: "Prologue",
    the_place: "Le lieu",
    the_apartment: "L’appartement",
    materials: "Matières",
    art_of_living: "L’art de vivre",
    seasons: "Saisons",
    reserve: "Réserver",
  },
};

const en: UIStrings = {
  nav: {
    the_place: "The place",
    the_apartment: "The apartment",
    art_of_living: "Art of living",
    reserve: "Reserve",
  },
  cta: {
    book_airbnb: "Book on Airbnb",
    book_airbnb_aria: "Book this apartment on Airbnb — opens in a new tab",
    scroll_to_explore: "Let yourself in",
    discover_more: "Discover",
  },
  footer: {
    tagline: "Sainte-Maxime · facing Saint-Tropez — a private address.",
    legal: "Legal",
    credits: "© L’Arbois",
  },
  chapters: {
    opening: "Overture",
    prologue: "Prologue",
    the_place: "The place",
    the_apartment: "The apartment",
    materials: "Materials",
    art_of_living: "Art of living",
    seasons: "Seasons",
    reserve: "Reserve",
  },
};

export const ui: Record<Locale, UIStrings> = {
  fr,
  en,
  it: en,
  de: en,
  es: en,
  ru: en,
  ar: en,
};

export function t(locale: Locale): UIStrings {
  return ui[locale] ?? ui.fr;
}
