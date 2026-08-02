"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Configurator } from "@/components/configurator/Configurator";
import { SiteImage } from "@/components/ui/site-image";
import { Separator } from "@/components/ui/separator";
import {
  useConfiguratorHasHydrated,
  useConfiguratorStore,
} from "@/store/configurator";
import { type ProductType } from "@/lib/products";
import { colorways, type ColorwayId } from "@/lib/colorways";
import { colorwayImages } from "@/lib/images";
import Link from "next/link";
import { useDictionary } from "@/i18n/provider";
import {
  useLocalizedColorways,
  useLocalizedProduct,
  useProductionWeeks,
} from "@/i18n/localized-data";

interface ProductDetailClientProps {
  productId: ProductType;
}

export function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const searchParams = useSearchParams();
  const { setColorway, loadConfig } = useConfiguratorStore();
  const hasHydrated = useConfiguratorHasHydrated();
  const product = useLocalizedProduct(productId)!;
  const localizedColorways = useLocalizedColorways();
  const weeks = useProductionWeeks();
  const t = useDictionary().productDetail;

  useEffect(() => {
    if (!hasHydrated) return;
    const color = searchParams.get("color") as ColorwayId | null;
    loadConfig({
      productId,
      colorwayId: color && colorways.some((c) => c.id === color) ? color : undefined,
    });
  }, [hasHydrated, productId, searchParams, loadConfig]);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <Configurator initialProductId={productId} />
      </div>

      <section className="border-t border-neutral-200/70">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl text-neutral-900 md:text-3xl">
                {t.technicalSpecs}
              </h2>
              <dl className="mt-8 space-y-5">
                {(
                  [
                    [t.materials, product.specs.materials],
                    [t.finish, product.specs.finish],
                    [t.modularWidths, product.specs.modularWidths],
                    [t.depth, product.specs.depth],
                    [t.diyVsFinished, product.specs.diyOption],
                    [t.production, weeks],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs uppercase tracking-[0.14em] text-neutral-400">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm text-neutral-700 leading-relaxed">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="font-display text-2xl text-neutral-900 md:text-3xl">
                {t.cutListTitle}
              </h2>
              <p className="mt-3 text-sm text-neutral-600">{t.cutListLead}</p>
              <ul className="mt-6 space-y-3">
                {product.cutList.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-neutral-700"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-14" />

          <div>
            <h2 className="font-display text-2xl text-neutral-900">
              {t.relatedColorways}
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {localizedColorways.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorway(c.id)}
                  className="group text-left overflow-hidden bg-[#F3EEE6] transition-opacity hover:opacity-90"
                >
                  <SiteImage
                    src={colorwayImages[c.id]}
                    alt={`${c.name} accent color`}
                    aspect="aspect-[5/3]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="flex items-center gap-2 px-4 py-3">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: c.accent }}
                    />
                    <span className="text-sm text-neutral-800">{c.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-12 text-center text-sm text-neutral-500">
            {t.customWidth}{" "}
            <Link href="/contact/#custom" className="underline underline-offset-2">
              {t.requestInquiry}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
