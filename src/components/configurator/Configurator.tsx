"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ColorSwatches } from "./ColorSwatches";
import { SiteImage } from "@/components/ui/site-image";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { useConfiguratorStore } from "@/store/configurator";
import {
  calculatePrice,
  type ProductType,
  type BaseBandHeight,
  type WallWidth,
} from "@/lib/products";
import { lifestyleForProduct } from "@/lib/images";
import { formatPrice, cn } from "@/lib/utils";
import { ArrowRight, Info } from "lucide-react";
import { interpolate, useDictionary, useLocale } from "@/i18n/provider";
import {
  useLocalizedBands,
  useLocalizedColorway,
  useLocalizedProducts,
  useLocalizedWidths,
  useProductionWeeks,
} from "@/i18n/localized-data";

interface ConfiguratorProps {
  initialProductId?: ProductType;
  className?: string;
}

export function Configurator({ initialProductId, className }: ConfiguratorProps) {
  const router = useRouter();
  const {
    productId,
    colorwayId,
    tvRecess,
    lattice,
    baseBand,
    width,
    setProduct,
    setColorway,
    setTvRecess,
    setLattice,
    setBaseBand,
    setWidth,
    toConfig,
  } = useConfiguratorStore();
  const { locale } = useLocale();
  const t = useDictionary().configurator;
  const products = useLocalizedProducts();
  const colorway = useLocalizedColorway(colorwayId);
  const widths = useLocalizedWidths(productId);
  const bands = useLocalizedBands();
  const weeks = useProductionWeeks();
  const [imageFullscreen, setImageFullscreen] = useState(false);

  useEffect(() => {
    if (initialProductId) setProduct(initialProductId);
  }, [initialProductId, setProduct]);

  const product = products.find((p) => p.id === productId)!;
  const price = calculatePrice(toConfig());
  const showTvOption = productId === "living-room";
  const widthLegend =
    productId === "bathroom" ? t.vanityWidth : t.wallWidth;

  const lifestyleSrc = lifestyleForProduct(productId, colorwayId);
  const lifestyleAlt = `${product.name} · ${colorway.name}`;

  return (
    <div className={cn("grid gap-10 lg:grid-cols-12 lg:gap-14", className)}>
      <div className="sticky top-16 z-20 self-start -mx-5 bg-[#FAF8F5] px-5 pb-3 md:top-[4.5rem] lg:col-span-7 lg:mx-0 lg:bg-[#FAF8F5] lg:px-0 lg:pb-0">
        <button
          type="button"
          onClick={() => setImageFullscreen(true)}
          aria-label={t.expandImage}
          className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-[#F3EEE6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30"
        >
          <SiteImage
            key={lifestyleSrc}
            src={lifestyleSrc}
            alt={lifestyleAlt}
            fill
            className="absolute inset-0"
            sizes="(max-width: 1024px) 100vw, 60vw"
            imgClassName="object-cover"
            priority
          />
        </button>
        <div className="mt-3 flex items-center justify-between gap-3 lg:mt-4 lg:justify-center">
          <div className="flex min-w-0 items-start gap-2 lg:items-center lg:justify-center">
            <p className="text-[0.95rem] leading-snug text-neutral-700 lg:text-center">
              {colorway.description}
            </p>
            <span className="group relative inline-flex shrink-0 pt-0.5 lg:pt-0">
              <button
                type="button"
                className="text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:text-neutral-900 focus-visible:outline-none"
                aria-label={t.moduleTip}
              >
                <Info className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-48 -translate-x-1/2 rounded bg-neutral-900 px-2.5 py-1.5 text-center text-[11px] leading-snug text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
              >
                {t.moduleTip}
              </span>
            </span>
          </div>
          <p
            className="shrink-0 font-display text-lg text-neutral-900 tabular-nums lg:hidden"
            aria-live="polite"
          >
            {formatPrice(price, locale)}
          </p>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-4 h-4 bg-gradient-to-b from-[#FAF8F5] to-transparent lg:hidden"
          aria-hidden
        />
      </div>

      <div className="relative z-0 lg:col-span-5 flex flex-col gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-2">
            Fachada Series
          </p>
          <h1 className="font-display text-3xl md:text-4xl text-neutral-900 tracking-tight">
            {product.name}
          </h1>
          <p className="mt-3 text-neutral-600 leading-relaxed">{product.tagline}</p>
          <p className="mt-4 text-sm text-neutral-500 lg:hidden">
            {t.includesInstallation} · {interpolate(t.craftsmanship, { weeks })}
          </p>
        </div>

        <div className="relative hidden lg:sticky lg:top-[4.5rem] lg:z-20 lg:-mx-1 lg:block lg:bg-[#FAF8F5] lg:px-1 lg:pt-3 lg:pb-6 lg:shadow-[0_-2rem_0_0_#FAF8F5]">
          <p
            className="font-display text-2xl text-neutral-900 tabular-nums"
            aria-live="polite"
          >
            {formatPrice(price, locale)}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {t.includesInstallation} · {interpolate(t.craftsmanship, { weeks })}
          </p>
          <Separator className="mt-6" />
        </div>

        <Separator className="lg:hidden" />

        <fieldset>
          <legend className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            {t.productType}
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setProduct(p.id);
                  router.replace(`/product/${p.slug}/`, { scroll: false });
                }}
                className={cn(
                  "border px-3 py-2.5 text-left text-sm transition-all duration-200",
                  productId === p.id
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                )}
              >
                {p.shortName}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            {t.accentColor} · {colorway.name}
          </legend>
          <ColorSwatches
            productId={productId}
            value={colorwayId}
            onChange={setColorway}
            size="lg"
            showLabels
          />
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            {widthLegend}
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {widths.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setWidth(w.id as WallWidth)}
                className={cn(
                  "border px-2 py-2.5 text-center transition-all duration-200",
                  width === w.id
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200 hover:border-neutral-400"
                )}
              >
                <span className="block text-sm text-neutral-900">{w.label}</span>
                <span className="block text-[11px] text-neutral-500">{w.inches}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="mb-1 text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            {t.optionalFeatures}
          </legend>

          {showTvOption && (
            <label className="flex items-center justify-between gap-4 border border-neutral-200 px-4 py-3 cursor-pointer hover:border-neutral-400 transition-colors">
              <div>
                <span className="block text-sm text-neutral-900">{t.tvRecess}</span>
                <span className="text-xs text-neutral-500">{t.tvRecessHint}</span>
              </div>
              <input
                type="checkbox"
                checked={tvRecess}
                onChange={(e) => setTvRecess(e.target.checked)}
                className="h-4 w-4 accent-neutral-900"
              />
            </label>
          )}

          <label className="flex items-center justify-between gap-4 border border-neutral-200 px-4 py-3 cursor-pointer hover:border-neutral-400 transition-colors">
            <div>
              <span className="block text-sm text-neutral-900">{t.lattice}</span>
              <span className="text-xs text-neutral-500">{t.latticeHint}</span>
            </div>
            <input
              type="checkbox"
              checked={lattice}
              onChange={(e) => setLattice(e.target.checked)}
              className="h-4 w-4 accent-neutral-900"
            />
          </label>

          <div>
            <p className="text-sm text-neutral-900 mb-2">{t.zocalo}</p>
            <div className="grid grid-cols-3 gap-2">
              {bands.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBaseBand(b.id as BaseBandHeight)}
                  className={cn(
                    "border px-2 py-2 text-xs transition-all duration-200",
                    baseBand === b.id
                      ? "border-neutral-900 bg-neutral-50"
                      : "border-neutral-200 hover:border-neutral-400"
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </fieldset>

        <div className="flex flex-col gap-3 pt-2">
          <Button
            size="lg"
            className="w-full"
            onClick={() => router.push("/review/")}
          >
            {t.reviewDesign}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="text-center text-xs text-neutral-500">
            {interpolate(t.configSaved, { weeks })}
          </p>
        </div>
      </div>

      <ImageLightbox
        src={lifestyleSrc}
        alt={lifestyleAlt}
        open={imageFullscreen}
        onClose={() => setImageFullscreen(false)}
        closeLabel={t.closeImage}
      />
    </div>
  );
}
