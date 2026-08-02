"use client";

import Image from "next/image";
import type { ColorwayId } from "@/lib/colorways";
import { swatchForProduct } from "@/lib/images";
import type { ProductType } from "@/lib/products";
import { cn, withBasePath } from "@/lib/utils";
import { useDictionary } from "@/i18n/provider";
import { useLocalizedColorways } from "@/i18n/localized-data";

interface ColorSwatchesProps {
  value: ColorwayId;
  onChange: (id: ColorwayId) => void;
  /** When set, swatches are photo thumbs that swap the lifestyle image */
  productId?: ProductType;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

/**
 * Colorway picker — photo thumbs when a product has swap images,
 * otherwise solid accent circles.
 */
export function ColorSwatches({
  value,
  onChange,
  productId,
  size = "md",
  showLabels = false,
  className,
}: ColorSwatchesProps) {
  const colorways = useLocalizedColorways();
  const t = useDictionary().configurator;
  const sizeClass =
    size === "sm" ? "h-7 w-7" : size === "lg" ? "h-11 w-11" : "h-9 w-9";

  return (
    <div
      className={cn("flex flex-wrap items-center gap-2.5", className)}
      role="radiogroup"
      aria-label={t.colorway}
    >
      {colorways.map((c) => {
        const selected = value === c.id;
        const swatchSrc = productId
          ? swatchForProduct(productId, c.id)
          : undefined;

        return (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={c.name}
            title={c.name}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChange(c.id);
            }}
            className={cn(
              "flex flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2"
            )}
          >
            {swatchSrc ? (
              <span
                className={cn(
                  "relative block overflow-hidden rounded-sm transition-shadow duration-200",
                  sizeClass,
                  selected
                    ? "ring-1 ring-neutral-900 ring-offset-[3px] ring-offset-[#FAF8F5]"
                    : "ring-1 ring-black/10 hover:ring-neutral-400"
                )}
              >
                <Image
                  src={withBasePath(swatchSrc)}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="44px"
                />
              </span>
            ) : (
              <span
                className={cn(
                  "block rounded-full transition-shadow duration-200",
                  size === "sm"
                    ? "h-5 w-5"
                    : size === "lg"
                      ? "h-9 w-9"
                      : "h-7 w-7",
                  selected
                    ? "ring-1 ring-neutral-900 ring-offset-[3px] ring-offset-[#FAF8F5]"
                    : "ring-1 ring-black/5 hover:ring-neutral-400"
                )}
                style={{ backgroundColor: c.accent }}
              />
            )}
            {showLabels && (
              <span
                className={cn(
                  "text-[10px] tracking-wide uppercase",
                  selected ? "text-neutral-900" : "text-neutral-400"
                )}
              >
                {c.name}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
