import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.github.io/DomArt";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Domart — Dominican Facade Back Boards",
    template: "%s · Domart",
  },
  description:
    "Modular living-room, bedroom, and dining-room accent walls inspired by Dominican casas de madera. Caribbean joy in modern form. Crafted in 1–2 weeks.",
  openGraph: {
    title: "Domart — Dominican Facade Back Boards",
    description:
      "Fachada Series / Casa Alegre Walls. Modular pine panels with joyful Caribbean colorways for modern interiors.",
    type: "website",
    locale: "en_US",
    siteName: "Domart",
  },
  twitter: {
    card: "summary_large_image",
    title: "Domart — Dominican Facade Back Boards",
    description:
      "Modular accent walls inspired by Dominican vernacular architecture.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${outfit.variable} min-h-screen flex flex-col antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
