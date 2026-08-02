"use client";

import type { ProductType } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";
import type { ColorwayId } from "@/lib/colorways";
import { useDictionary } from "@/i18n/provider";
import { useLocalizedProducts } from "@/i18n/localized-data";

/** Featured starting color per product so the grid shows variety */
const defaultColors: Record<ProductType, ColorwayId> = {
  "living-room": "coral",
  "bedroom-headboard": "jungla",
  "dining-room": "sol",
  bathroom: "costa",
};

export function CatalogFilters({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: ProductType | "all";
  onFilterChange: (f: ProductType | "all") => void;
}) {
  const t = useDictionary().shop;
  const filters: { id: ProductType | "all"; label: string }[] = [
    { id: "all", label: t.all },
    { id: "living-room", label: t.livingRoom },
    { id: "bedroom-headboard", label: t.bedroom },
    { id: "dining-room", label: t.diningRoom },
    { id: "bathroom", label: t.bathroom },
  ];

  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label={t.filters}
    >
      {filters.map((f) => (
        <button
          key={f.id}
          type="button"
          role="tab"
          aria-selected={activeFilter === f.id}
          onClick={() => onFilterChange(f.id)}
          className={cn(
            "px-4 py-2 text-xs uppercase tracking-[0.14em] border transition-all duration-200",
            activeFilter === f.id
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export function CatalogGrid({
  activeFilter,
}: {
  activeFilter: ProductType | "all";
}) {
  const products = useLocalizedProducts();
  const filtered =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.id === activeFilter);

  return (
    <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
      {filtered.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          initialColorway={defaultColors[product.id]}
        />
      ))}
    </div>
  );
}
