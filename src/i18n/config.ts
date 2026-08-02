export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_STORAGE_KEY = "domart-locale";

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "es";
}
