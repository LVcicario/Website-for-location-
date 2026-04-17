export const LOCALES = ["fr", "en", "it", "de", "es", "ru", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const RTL_LOCALES: readonly Locale[] = ["ar"] as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  it: "Italiano",
  de: "Deutsch",
  es: "Español",
  ru: "Русский",
  ar: "العربية",
};

export const LAUNCH_LOCALES: readonly Locale[] = ["fr", "en"] as const;

export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return isRTL(locale) ? "rtl" : "ltr";
}
