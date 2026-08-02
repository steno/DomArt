import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Your Wall",
  description:
    "Review your Domart Fachada Series design and estimate, then inquire via WhatsApp.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
