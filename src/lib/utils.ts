import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceLocales: Record<string, string> = {
  en: "en-US",
  es: "es-DO",
  fr: "fr-FR",
  ru: "ru-RU",
};

export function formatPrice(
  cents: number,
  locale: string = "en"
): string {
  return new Intl.NumberFormat(priceLocales[locale] ?? "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path) return base || "/";
  if (base && (path === base || path.startsWith(`${base}/`))) return path;
  if (!path.startsWith("/")) return `${base}/${path}`;
  return `${base}${path}`;
}
