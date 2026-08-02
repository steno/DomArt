"use client";

import { ShopCatalog } from "@/components/catalog/ShopCatalog";
import { useDictionary } from "@/i18n/provider";

export function ShopPageContent() {
  const t = useDictionary().shop;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="mb-12 max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          {t.series}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-neutral-900 md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">{t.body}</p>
      </div>
      <ShopCatalog />
    </div>
  );
}
