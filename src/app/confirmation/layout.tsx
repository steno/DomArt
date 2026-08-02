import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry Sent",
  description: "Your Domart configuration inquiry was opened in WhatsApp.",
  robots: { index: false, follow: false },
};

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
