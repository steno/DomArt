"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { lifestyleImages } from "@/lib/images";
import { useDictionary } from "@/i18n/provider";

export function AboutPageContent() {
  const t = useDictionary().about;

  return (
    <>
      <section className="relative min-h-[50vh] overflow-hidden border-b border-neutral-200/70">
        <SiteImage
          src={lifestyleImages.livingCosta}
          alt={t.heroAlt}
          fill
          priority
          className="absolute inset-0"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/75 to-[#FAF8F5]/30" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            {t.eyebrow}
          </p>
          <h1 className="font-display mt-4 max-w-2xl text-4xl tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600 leading-relaxed">
            {t.lead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-24">
        <h2 className="font-display text-2xl text-neutral-900 md:text-3xl">
          {t.sectionTitle}
        </h2>
        <div className="mt-8 space-y-5 text-neutral-600 leading-relaxed">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>
      </section>

      <section className="border-t border-neutral-200/70 bg-[#F3EEE6]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {(
              [
                [lifestyleImages.livingCostaTv, t.living],
                [lifestyleImages.bedroomJungla, t.bedroom],
                [lifestyleImages.diningSol, t.dining],
              ] as const
            ).map(([src, label]) => (
              <div key={label} className="overflow-hidden bg-[#FAF8F5]">
                <SiteImage
                  src={src}
                  alt={`${label} Fachada Series`}
                  aspect="aspect-[4/3]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <p className="px-4 py-3 text-xs uppercase tracking-[0.14em] text-neutral-500">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8">
        <h2 className="font-display text-2xl text-neutral-900">
          {t.craftedTitle}
        </h2>
        <p className="mt-4 text-neutral-600">{t.craftedBody}</p>
        <Button asChild className="mt-8">
          <Link href="/shop/">{t.exploreSeries}</Link>
        </Button>
      </section>
    </>
  );
}
