"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SiteImage } from "@/components/ui/site-image";
import {
  useConfiguratorHasHydrated,
  useConfiguratorStore,
} from "@/store/configurator";
import { calculatePrice, getProduct } from "@/lib/products";
import { lifestyleForProduct } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import {
  inquireViaWhatsApp,
  WHATSAPP_ORDER_NUMBER,
  type InquiryPayload,
} from "@/lib/whatsapp";
import { interpolate, useDictionary, useLocale } from "@/i18n/provider";
import {
  useLocalizedBands,
  useLocalizedColorway,
  useLocalizedProducts,
  useLocalizedWidths,
  useProductionWeeks,
} from "@/i18n/localized-data";

export default function ReviewPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const { productId, colorwayId, tvRecess, lattice, baseBand, width, toConfig } =
    useConfiguratorStore();
  const hasHydrated = useConfiguratorHasHydrated();
  const dict = useDictionary();
  const t = dict.review;
  const { locale } = useLocale();
  const products = useLocalizedProducts();
  const colorway = useLocalizedColorway(colorwayId);
  const widths = useLocalizedWidths(productId);
  const bands = useLocalizedBands();
  const weeks = useProductionWeeks();

  const product =
    products.find((p) => p.id === productId) ??
    products[0];
  const price = calculatePrice(toConfig());
  const widthOpt = widths.find((w) => w.id === width);
  const bandOpt = bands.find((b) => b.id === baseBand);
  const lifestyleSrc = lifestyleForProduct(productId, colorwayId);
  const productSlug = getProduct(productId)?.slug ?? "living-room";

  const detailParts = [
    widthOpt ? `${widthOpt.label} (${widthOpt.inches})` : width,
    tvRecess ? t.tvRecess : null,
    lattice ? t.lattice : null,
    baseBand !== "none" && bandOpt ? `${t.zocalo} · ${bandOpt.label}` : null,
  ].filter(Boolean) as string[];

  const waDisplay = `+${WHATSAPP_ORDER_NUMBER.replace(/^(\d)(\d{3})(\d{3})(\d{4})$/, "$1 $2-$3-$4")}`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: InquiryPayload = {
      name: name.trim() || undefined,
      notes: notes.trim() || undefined,
      label: product.name,
      colorway: colorway.name,
      details: detailParts.join(" · "),
      priceCents: price,
    };

    const inquiryId = inquireViaWhatsApp(payload, locale);
    router.push(`/confirmation/?inquiry=${inquiryId}`);
  };

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-20 text-neutral-500">
        {t.loading}
      </div>
    );
  }

  const field =
    "mt-1.5 w-full border border-neutral-200 bg-white px-3 py-2.5 text-base text-neutral-900 outline-none transition-colors focus:border-neutral-900 md:text-sm";

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
        {t.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-4xl tracking-tight text-neutral-900 md:text-5xl">
        {t.title}
      </h1>
      <p className="mt-3 max-w-xl text-neutral-600 leading-relaxed">
        {interpolate(t.lead, { weeks })}
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14"
      >
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#F3EEE6]">
            <SiteImage
              src={lifestyleSrc}
              alt={`${product.name} · ${colorway.name}`}
              fill
              className="absolute inset-0"
              sizes="(max-width: 1024px) 100vw, 60vw"
              imgClassName="object-cover"
              priority
            />
          </div>

          <dl className="mt-8 space-y-4 border-t border-neutral-200 pt-8">
            <div className="flex justify-between gap-6 text-sm">
              <dt className="text-neutral-500">{t.product}</dt>
              <dd className="text-right text-neutral-900">{product.name}</dd>
            </div>
            <div className="flex justify-between gap-6 text-sm">
              <dt className="text-neutral-500">{t.colorway}</dt>
              <dd className="text-right text-neutral-900">{colorway.name}</dd>
            </div>
            <div className="flex justify-between gap-6 text-sm">
              <dt className="text-neutral-500">{t.width}</dt>
              <dd className="text-right text-neutral-900">
                {widthOpt
                  ? `${widthOpt.label} (${widthOpt.inches})`
                  : width}
              </dd>
            </div>
            {(tvRecess || lattice || (baseBand !== "none" && bandOpt)) && (
              <div className="flex justify-between gap-6 text-sm">
                <dt className="text-neutral-500">{t.options}</dt>
                <dd className="text-right text-neutral-900">
                  {[
                    tvRecess ? t.tvRecess : null,
                    lattice ? t.lattice : null,
                    baseBand !== "none" && bandOpt
                      ? `${t.zocalo} · ${bandOpt.label}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-6 border-t border-neutral-200 pt-4">
              <dt className="text-sm text-neutral-500">{t.estimate}</dt>
              <dd className="text-right">
                <span className="block font-display text-2xl text-neutral-900 tabular-nums">
                  {formatPrice(price, locale)}
                </span>
                <span className="mt-1 block text-xs text-neutral-500">
                  {t.includesInstallation}
                </span>
              </dd>
            </div>
          </dl>

          <Link
            href={`/product/${productSlug}/`}
            className="mt-6 inline-block text-xs uppercase tracking-[0.14em] text-neutral-500 transition-colors hover:text-neutral-900"
          >
            {t.editDesign}
          </Link>
        </div>

        <div className="lg:col-span-5">
          <div className="space-y-5 lg:sticky lg:top-24">
            <div>
              <Label htmlFor="name">{t.nameOptional}</Label>
              <input
                id="name"
                className={field}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <Label htmlFor="notes">{t.notesOptional}</Label>
              <textarea
                id="notes"
                rows={4}
                className={field}
                placeholder={t.notesPlaceholder}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? t.openingWhatsApp : t.inquireWhatsApp}
            </Button>
            <p className="text-center text-[11px] leading-relaxed text-neutral-500">
              {interpolate(t.opensNote, { phone: waDisplay })}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
