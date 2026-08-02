import type { Locale } from "../config";
import type { Dictionary } from "../types";
import { en } from "./en";
import { es } from "./es";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
