import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { OG_IMAGE } from "@/lib/images";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.github.io/DomArt";

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  colorScheme: "light",
};

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
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Domart facade accent wall in a modern living room",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domart — Dominican Facade Back Boards",
    description:
      "Modular accent walls inspired by Dominican vernacular architecture.",
    images: [OG_IMAGE],
  },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
