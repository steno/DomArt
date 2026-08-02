"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { interpolate, useDictionary, useLocale } from "@/i18n/provider";
import { useProductionWeeks } from "@/i18n/localized-data";
import { WHATSAPP_ORDER_NUMBER } from "@/lib/whatsapp";

interface StoredInquiry {
  inquiryId: string;
  name?: string;
  createdAt: string;
  priceCents: number;
  label: string;
  colorway: string;
  details: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [inquiry, setInquiry] = useState<StoredInquiry | null>(null);
  const t = useDictionary().confirmation;
  const { locale } = useLocale();
  const weeks = useProductionWeeks();

  useEffect(() => {
    const raw =
      sessionStorage.getItem("domart-inquiry") ||
      localStorage.getItem("domart-last-inquiry") ||
      // legacy keys from cart-era checkout
      sessionStorage.getItem("domart-order") ||
      localStorage.getItem("domart-last-order");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.inquiryId || parsed.orderId) {
          setInquiry({
            inquiryId: parsed.inquiryId || parsed.orderId,
            name: parsed.name,
            createdAt: parsed.createdAt,
            priceCents: parsed.priceCents ?? parsed.totalCents ?? 0,
            label: parsed.label ?? parsed.items?.[0]?.label ?? "",
            colorway: parsed.colorway ?? parsed.items?.[0]?.colorway ?? "",
            details: parsed.details ?? "",
          });
        }
      } catch {
        setInquiry(null);
      }
    }
  }, []);

  const inquiryId =
    searchParams.get("inquiry") ||
    searchParams.get("order") ||
    inquiry?.inquiryId ||
    "DM-PENDING";

  const waUrl = `https://wa.me/${WHATSAPP_ORDER_NUMBER}`;
  const waDisplay = "+1 754-213-3764";

  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center md:px-8 md:py-28">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
        {t.eyebrow}
      </p>
      <h1 className="font-display mt-4 text-4xl tracking-tight text-neutral-900 md:text-5xl">
        {t.thankYou}
        {inquiry?.name ? `, ${inquiry.name.split(" ")[0]}` : ""}
      </h1>
      <p className="mt-4 text-neutral-600 leading-relaxed">
        {interpolate(t.body, { weeks })}
      </p>

      <div className="mt-10 border border-neutral-200 bg-[#F7F3EC] px-6 py-8 text-left">
        <dl className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-neutral-500">{t.inquiry}</dt>
            <dd className="text-neutral-900 font-medium">{inquiryId}</dd>
          </div>
          {inquiry?.label && (
            <div className="flex justify-between gap-4">
              <dt className="text-neutral-500">{t.design}</dt>
              <dd className="text-right text-neutral-900">
                {inquiry.label}
                {inquiry.colorway ? ` · ${inquiry.colorway}` : ""}
              </dd>
            </div>
          )}
          {inquiry && inquiry.priceCents > 0 && (
            <div className="flex justify-between gap-4 border-t border-neutral-300/50 pt-4">
              <dt className="text-neutral-500">{t.estimate}</dt>
              <dd className="font-display text-lg text-neutral-900">
                {formatPrice(inquiry.priceCents, locale)}
              </dd>
            </div>
          )}
        </dl>
      </div>

      <p className="mt-8 text-sm text-neutral-500">
        {t.whatsappMissed}{" "}
        <a
          href={waUrl}
          className="underline underline-offset-2 text-neutral-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {waDisplay}
        </a>
        . {t.questions}{" "}
        <Link href="/contact/" className="underline underline-offset-2">
          {t.contactUs}
        </Link>
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <a href={waUrl} target="_blank" rel="noopener noreferrer">
            {t.reopenWhatsApp}
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link href="/shop/">{t.continueBrowsing}</Link>
        </Button>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  const loading = useDictionary().confirmation.loading;

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-5 py-20 text-center text-neutral-500">
          {loading}
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
