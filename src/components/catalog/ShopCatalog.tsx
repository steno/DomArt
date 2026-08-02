"use client";

import { useState } from "react";
import { CatalogFilters, CatalogGrid } from "./CatalogGrid";
import type { ProductType } from "@/lib/products";

export function ShopCatalog() {
  const [filter, setFilter] = useState<ProductType | "all">("all");

  return (
    <div>
      <div className="mb-12">
        <CatalogFilters activeFilter={filter} onFilterChange={setFilter} />
      </div>
      <CatalogGrid activeFilter={filter} />
    </div>
  );
}
