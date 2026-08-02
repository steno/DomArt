"use client";

import Link from "next/link";
import { useState } from "react";
import { ColorSwatches } from "@/components/configurator/ColorSwatches";
import { SiteImage } from "@/components/ui/site-image";
import type { Product } from "@/lib/products";
import type { ColorwayId } from "@/lib/colorways";
import { lifestyleForProduct } from "@/lib/images";
import { formatPrice, cn } from "@/lib/utils";
import { useDictionary, useLocale } from "@/i18n/provider";
import { useLocalizedColorway } from "@/i18n/localized-data";

interface ProductCardProps {
  product: Product;
  initialColorway?: ColorwayId;
  className?: string;
}

/** Shop card — color swatches swap the lifestyle photo. */
export function ProductCard({
  product,
  initialColorway = "costa",
  className,
}: ProductCardProps) {
  const [colorwayId, setColorwayId] = useState<ColorwayId>(initialColorway);
  const colorway = useLocalizedColorway(colorwayId);
  const { locale } = useLocale();
  const t = useDictionary().shop;
  const lifestyleSrc = lifestyleForProduct(product.id, colorwayId);
  const caption = `${product.name} · ${colorway.name}`;

  return (
    <article className={cn("group", className)}>
      <div className="relative">
        <Link
          href={`/product/${product.slug}/?color=${colorwayId}`}
          className="relative block aspect-[4/3] overflow-hidden bg-[#E8DFD2]"
          aria-label={caption}
        >
          <SiteImage
            key={lifestyleSrc}
            src={lifestyleSrc}
            alt={caption}
            fill
            className="absolute inset-0"
            sizes="(max-width: 768px) 100vw, 50vw"
            imgClassName="object-cover"
          />
        </Link>
        <p className="mt-2 text-center text-xs text-neutral-500">{caption}</p>
      </div>

      <div className="mt-4 space-y-3.5">
        <div>
          <h3 className="font-display text-[1.35rem] leading-snug tracking-tight text-neutral-900 md:text-xl">
            <Link
              href={`/product/${product.slug}/?color=${colorwayId}`}
              className="transition-opacity hover:opacity-70"
            >
              {product.name}
            </Link>
          </h3>
          <p className="mt-1.5 text-[0.95rem] text-neutral-500">
            {colorway.name} · {t.from} {formatPrice(product.basePriceCents, locale)}
          </p>
        </div>

        <ColorSwatches
          productId={product.id}
          value={colorwayId}
          onChange={setColorwayId}
          size="md"
        />
      </div>
    </article>
  );
}
