"use client";

import type { Colorway, ColorwayId } from "@/lib/colorways";
import { colorways as baseColorways, getColorway as getBaseColorway } from "@/lib/colorways";
import type {
  BaseBandHeight,
  Product,
  ProductType,
  WallWidth,
} from "@/lib/products";
import {
  BASE_BANDS as baseBands,
  products as baseProducts,
  WALL_WIDTHS as baseWidths,
  getProduct as getBaseProduct,
} from "@/lib/products";
import { inspirationGallery as baseGallery } from "@/lib/images";
import { useDictionary } from "./provider";

export function useLocalizedProducts(): Product[] {
  const dict = useDictionary();
  return baseProducts.map((p) => {
    const t = dict.products[p.id];
    return {
      ...p,
      name: t.name,
      shortName: t.shortName,
      tagline: t.tagline,
      description: t.description,
      features: t.features,
      specs: t.specs,
      cutList: t.cutList,
    };
  });
}

export function useLocalizedProduct(slugOrId: string): Product | undefined {
  const products = useLocalizedProducts();
  return products.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

export function useLocalizedColorways(): Colorway[] {
  const dict = useDictionary();
  return baseColorways.map((c) => ({
    ...c,
    name: dict.colorways[c.id].name,
    description: dict.colorways[c.id].description,
  }));
}

export function useLocalizedColorway(id: ColorwayId): Colorway {
  const dict = useDictionary();
  const base = getBaseColorway(id);
  return {
    ...base,
    name: dict.colorways[base.id].name,
    description: dict.colorways[base.id].description,
  };
}

export function useLocalizedWidths() {
  const dict = useDictionary();
  return baseWidths.map((w) => ({
    ...w,
    label: dict.widths[w.id as WallWidth],
  }));
}

export function useLocalizedBands() {
  const dict = useDictionary();
  return baseBands.map((b) => ({
    ...b,
    label: dict.bands[b.id as BaseBandHeight],
  }));
}

export function useLocalizedGallery() {
  const dict = useDictionary();
  return baseGallery.map((item, i) => {
    const t = dict.gallery[i];
    return {
      ...item,
      title: t?.title ?? item.title,
      caption: t?.caption ?? item.caption,
    };
  });
}

export function useProductionWeeks() {
  return useDictionary().productionWeeks;
}

/** Non-hook helpers for places that already have a dictionary */
export function localizeProduct(
  product: Product | undefined,
  dict: ReturnType<typeof useDictionary>
): Product | undefined {
  if (!product) return undefined;
  const t = dict.products[product.id as ProductType];
  return {
    ...product,
    name: t.name,
    shortName: t.shortName,
    tagline: t.tagline,
    description: t.description,
    features: t.features,
    specs: t.specs,
    cutList: t.cutList,
  };
}

export function localizeColorway(
  id: ColorwayId,
  dict: ReturnType<typeof useDictionary>
): Colorway {
  const base = getBaseColorway(id);
  return {
    ...base,
    name: dict.colorways[base.id].name,
    description: dict.colorways[base.id].description,
  };
}

export function getBaseProductById(id: ProductType) {
  return getBaseProduct(id);
}
