export const locales = ["en", "es", "fr", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_STORAGE_KEY = "domart-locale";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  fr: "FR",
  ru: "RU",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}
