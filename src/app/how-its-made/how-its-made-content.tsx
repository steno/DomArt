"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteImage } from "@/components/ui/site-image";
import { colorwayImages } from "@/lib/images";
import { interpolate, useDictionary } from "@/i18n/provider";
import { useLocalizedColorways } from "@/i18n/localized-data";

export function HowItsMadeContent() {
  const t = useDictionary().howItsMade;
  const colorways = useLocalizedColorways();
  const stepNums = ["01", "02", "03", "04"] as const;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          {t.process}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-neutral-900 md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-5 text-neutral-600 leading-relaxed">{t.lead}</p>
      </div>

      <ol className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((step, i) => (
          <li key={stepNums[i]} className="border-t border-neutral-300 pt-6">
            <p className="text-xs tracking-[0.2em] text-neutral-400">
              {stepNums[i]}
            </p>
            <h2 className="font-display mt-3 text-xl text-neutral-900">
              {step.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <section className="mt-20 border-t border-neutral-200/70 pt-16">
        <div className="mb-12 max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            {t.sixColorways}
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight text-neutral-900 md:text-4xl">
            {t.colorwaysHeadline}
          </h2>
          <p className="mt-4 text-neutral-600">{t.colorwaysBody}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {colorways.map((c) => (
            <Link
              key={c.id}
              href={`/product/living-room/?color=${c.id}`}
              className="group block overflow-hidden bg-[#FAF8F5] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <SiteImage
                src={colorwayImages[c.id]}
                alt={interpolate(t.colorwayAlt, { name: c.name })}
                aspect="aspect-[5/4]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="flex items-center gap-3 px-5 py-4">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: c.accent }}
                  aria-hidden
                />
                <div>
                  <p className="font-display text-lg text-neutral-900">{c.name}</p>
                  <p className="text-xs text-neutral-500">{c.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-20 border border-neutral-200 bg-[#F7F3EC] p-8 md:p-12">
        <h2 className="font-display text-2xl text-neutral-900">
          {t.materialsTitle}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-neutral-400">
              {t.baseMaterial}
            </h3>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
              {t.baseMaterialBody}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-neutral-400">
              {t.signature}
            </h3>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
              {t.signatureBody}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-neutral-400">
              {t.diyKit}
            </h3>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
              {t.diyKitBody}
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.14em] text-neutral-400">
              {t.timeline}
            </h3>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed">
              {t.timelineBody}
            </p>
          </div>
        </div>
      </section>

      <div className="mt-14 text-center">
        <Button asChild>
          <Link href="/product/living-room/">{t.configureWall}</Link>
        </Button>
      </div>
    </div>
  );
}
