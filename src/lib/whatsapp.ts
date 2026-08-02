import { formatPrice } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** Domart orders WhatsApp number (digits only, with country code) */
export const WHATSAPP_ORDER_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "17542133764";

export interface InquiryPayload {
  name?: string;
  notes?: string;
  label: string;
  colorway: string;
  details: string;
  priceCents: number;
}

export function buildInquirySummary(
  payload: InquiryPayload,
  inquiryId: string,
  locale: Locale = "en"
): string {
  const t = getDictionary(locale).whatsapp;
  const lines = [
    t.greeting,
    "",
    `${t.inquiry}: ${inquiryId}`,
    "",
    payload.name ? `${t.name}: ${payload.name}` : null,
    payload.notes ? `${t.notes}: ${payload.notes}` : null,
    payload.name || payload.notes ? "" : null,
    `${t.configuration}:`,
    `• ${payload.label} — ${payload.colorway}`,
    `   ${payload.details}`,
    `   ${t.estimate}: ${formatPrice(payload.priceCents, locale)}`,
    "",
    t.closing,
  ];

  return lines.filter((line) => line !== null).join("\n");
}

export function buildWhatsAppInquiryUrl(
  payload: InquiryPayload,
  inquiryId: string,
  locale: Locale = "en"
): string {
  const text = buildInquirySummary(payload, inquiryId, locale);
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
}

function openWhatsAppMessage(text: string): void {
  if (typeof window === "undefined") return;
  const waUrl = `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(waUrl, "_blank", "noopener,noreferrer");
}

function nextInquiryId(): string {
  return `DM-${Date.now().toString(36).toUpperCase()}`;
}

/**
 * Opens WhatsApp with a pre-filled configuration inquiry.
 * Fully static-export compatible — no server required.
 */
export function inquireViaWhatsApp(
  payload: InquiryPayload,
  locale: Locale = "en"
): string {
  const inquiryId = nextInquiryId();
  const inquiry = {
    ...payload,
    inquiryId,
    createdAt: new Date().toISOString(),
    locale,
  };

  if (typeof window !== "undefined") {
    sessionStorage.setItem("domart-inquiry", JSON.stringify(inquiry));
    localStorage.setItem("domart-last-inquiry", JSON.stringify(inquiry));

    const waUrl = buildWhatsAppInquiryUrl(payload, inquiryId, locale);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  return inquiryId;
}

export interface TradeContactPayload {
  name: string;
  company?: string;
  email: string;
  message: string;
}

export interface CustomWidthContactPayload {
  name: string;
  email: string;
  product: string;
  width: string;
  details?: string;
}

export function buildTradeContactMessage(
  payload: TradeContactPayload,
  inquiryId: string,
  locale: Locale = "en"
): string {
  const t = getDictionary(locale).whatsapp;
  const lines = [
    t.tradeGreeting,
    "",
    `${t.inquiry}: ${inquiryId}`,
    "",
    `${t.name}: ${payload.name}`,
    payload.company ? `${t.company}: ${payload.company}` : null,
    `${t.email}: ${payload.email}`,
    "",
    `${t.message}:`,
    payload.message,
    "",
    t.closing,
  ];
  return lines.filter((line) => line !== null).join("\n");
}

export function buildCustomWidthContactMessage(
  payload: CustomWidthContactPayload,
  inquiryId: string,
  locale: Locale = "en"
): string {
  const t = getDictionary(locale).whatsapp;
  const lines = [
    t.customGreeting,
    "",
    `${t.inquiry}: ${inquiryId}`,
    "",
    `${t.name}: ${payload.name}`,
    `${t.email}: ${payload.email}`,
    `${t.product}: ${payload.product}`,
    `${t.desiredWidth}: ${payload.width}`,
    payload.details ? `${t.details}: ${payload.details}` : null,
    "",
    t.closing,
  ];
  return lines.filter((line) => line !== null).join("\n");
}

/** Opens WhatsApp with a trade / contact inquiry. */
export function inquireTradeViaWhatsApp(
  payload: TradeContactPayload,
  locale: Locale = "en"
): string {
  const inquiryId = nextInquiryId();
  openWhatsAppMessage(buildTradeContactMessage(payload, inquiryId, locale));
  return inquiryId;
}

/** Opens WhatsApp with a custom-width inquiry. */
export function inquireCustomWidthViaWhatsApp(
  payload: CustomWidthContactPayload,
  locale: Locale = "en"
): string {
  const inquiryId = nextInquiryId();
  openWhatsAppMessage(
    buildCustomWidthContactMessage(payload, inquiryId, locale)
  );
  return inquiryId;
}
