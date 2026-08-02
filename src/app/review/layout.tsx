import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Review Your Design",
  description:
    "Review your Domart Fachada Series configuration and estimate, then inquire via WhatsApp.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
