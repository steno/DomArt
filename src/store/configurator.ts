"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BaseBandHeight,
  Configuration,
  ProductType,
  WallWidth,
} from "@/lib/products";
import type { ColorwayId } from "@/lib/colorways";
import { getProduct } from "@/lib/products";

interface ConfiguratorState extends Configuration {
  setProduct: (productId: ProductType) => void;
  setColorway: (colorwayId: ColorwayId) => void;
  setTvRecess: (tvRecess: boolean) => void;
  setLattice: (lattice: boolean) => void;
  setBaseBand: (baseBand: BaseBandHeight) => void;
  setWidth: (width: WallWidth) => void;
  loadConfig: (config: Partial<Configuration> & { productId: ProductType }) => void;
  toConfig: () => Configuration;
}

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    (set, get) => ({
      productId: "living-room",
      colorwayId: "costa",
      tvRecess: true,
      lattice: false,
      baseBand: "low",
      width: "standard",
      setProduct: (productId) => {
        const product = getProduct(productId);
        if (!product) return;
        set({
          productId,
          tvRecess: product.defaultOptions.tvRecess,
          lattice: product.defaultOptions.lattice,
          baseBand: product.defaultOptions.baseBand,
          width: product.defaultOptions.width,
        });
      },
      setColorway: (colorwayId) => set({ colorwayId }),
      setTvRecess: (tvRecess) => set({ tvRecess }),
      setLattice: (lattice) => set({ lattice }),
      setBaseBand: (baseBand) => set({ baseBand }),
      setWidth: (width) => set({ width }),
      loadConfig: (config) => {
        const product = getProduct(config.productId);
        set({
          productId: config.productId,
          colorwayId: config.colorwayId ?? "costa",
          tvRecess: config.tvRecess ?? product?.defaultOptions.tvRecess ?? false,
          lattice: config.lattice ?? product?.defaultOptions.lattice ?? false,
          baseBand: config.baseBand ?? product?.defaultOptions.baseBand ?? "none",
          width: config.width ?? product?.defaultOptions.width ?? "standard",
        });
      },
      toConfig: () => {
        const s = get();
        return {
          productId: s.productId,
          colorwayId: s.colorwayId,
          tvRecess: s.tvRecess,
          lattice: s.lattice,
          baseBand: s.baseBand,
          width: s.width,
        };
      },
    }),
    { name: "domart-config" }
  )
);
