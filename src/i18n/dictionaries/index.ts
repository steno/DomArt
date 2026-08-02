import type { Locale } from "../config";
import type { Dictionary } from "../types";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { ru } from "./ru";

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  es,
  fr,
  ru,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
