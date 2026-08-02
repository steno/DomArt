"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDictionary, useLocale } from "@/i18n/provider";
import { useLocalizedProducts } from "@/i18n/localized-data";
import {
  inquireCustomWidthViaWhatsApp,
  inquireTradeViaWhatsApp,
  WHATSAPP_ORDER_NUMBER,
} from "@/lib/whatsapp";

const field =
  "mt-1.5 w-full border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-neutral-900";

function formatWhatsAppDisplay(digits: string): string {
  const m = digits.match(/^(\d)(\d{3})(\d{3})(\d{4})$/);
  if (!m) return `+${digits}`;
  return `+${m[1]} ${m[2]}-${m[3]}-${m[4]}`;
}

export default function ContactPage() {
  const [tradeSent, setTradeSent] = useState(false);
  const [customSent, setCustomSent] = useState(false);
  const t = useDictionary().contact;
  const { locale } = useLocale();
  const products = useLocalizedProducts();
  const waDisplay = formatWhatsAppDisplay(WHATSAPP_ORDER_NUMBER);

  const handleTrade = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") || "").trim();

    inquireTradeViaWhatsApp(
      {
        name: String(data.get("name") || "").trim(),
        company: company || undefined,
        email: String(data.get("email") || "").trim(),
        message: String(data.get("message") || "").trim(),
      },
      locale
    );

    setTradeSent(true);
    form.reset();
  };

  const handleCustom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const details = String(data.get("details") || "").trim();

    inquireCustomWidthViaWhatsApp(
      {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        product: String(data.get("product") || "").trim(),
        width: String(data.get("width") || "").trim(),
        details: details || undefined,
      },
      locale
    );

    setCustomSent(true);
    form.reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          {t.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-neutral-900 md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">{t.lead}</p>
      </div>

      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl text-neutral-900">
            {t.tradeTitle}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">{t.tradeLead}</p>

          {tradeSent ? (
            <p className="mt-8 border border-neutral-200 bg-[#F7F3EC] px-5 py-6 text-sm text-neutral-700">
              {t.tradeThanks}
            </p>
          ) : (
            <form onSubmit={handleTrade} className="mt-8 space-y-4">
              <input type="hidden" name="form" value="trade" />
              <div>
                <Label htmlFor="trade-name">{t.name}</Label>
                <input id="trade-name" name="name" required className={field} />
              </div>
              <div>
                <Label htmlFor="trade-company">{t.company}</Label>
                <input id="trade-company" name="company" className={field} />
              </div>
              <div>
                <Label htmlFor="trade-email">{t.email}</Label>
                <input
                  id="trade-email"
                  name="email"
                  type="email"
                  required
                  className={field}
                />
              </div>
              <div>
                <Label htmlFor="trade-message">{t.message}</Label>
                <textarea
                  id="trade-message"
                  name="message"
                  rows={4}
                  required
                  className={field}
                />
              </div>
              <Button type="submit">{t.sendInquiry}</Button>
            </form>
          )}
        </section>

        <section id="custom">
          <h2 className="font-display text-2xl text-neutral-900">
            {t.customTitle}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">{t.customLead}</p>

          {customSent ? (
            <p className="mt-8 border border-neutral-200 bg-[#F7F3EC] px-5 py-6 text-sm text-neutral-700">
              {t.customThanks}
            </p>
          ) : (
            <form onSubmit={handleCustom} className="mt-8 space-y-4">
              <input type="hidden" name="form" value="custom-width" />
              <div>
                <Label htmlFor="custom-name">{t.name}</Label>
                <input id="custom-name" name="name" required className={field} />
              </div>
              <div>
                <Label htmlFor="custom-email">{t.email}</Label>
                <input
                  id="custom-email"
                  name="email"
                  type="email"
                  required
                  className={field}
                />
              </div>
              <div>
                <Label htmlFor="custom-product">{t.productType}</Label>
                <select id="custom-product" name="product" className={field}>
                  {products.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="custom-width">{t.desiredWidth}</Label>
                <input
                  id="custom-width"
                  name="width"
                  required
                  placeholder={t.widthPlaceholder}
                  className={field}
                />
              </div>
              <div>
                <Label htmlFor="custom-details">{t.details}</Label>
                <textarea
                  id="custom-details"
                  name="details"
                  rows={3}
                  className={field}
                  placeholder={t.detailsPlaceholder}
                />
              </div>
              <Button type="submit" variant="outline">
                {t.requestCustom}
              </Button>
            </form>
          )}
        </section>
      </div>

      <p className="mt-16 text-sm text-neutral-500">
        {t.footerLine}{" "}
        <a
          href={`https://wa.me/${WHATSAPP_ORDER_NUMBER}`}
          className="underline underline-offset-2 text-neutral-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          {waDisplay}
        </a>
      </p>
    </div>
  );
}
