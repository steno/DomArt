import type { Metadata } from "next";
import { ShopPageContent } from "./shop-content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop the Fachada Series—living room, bedroom, dining room, and bathroom vanity backboards in six Caribbean colorways.",
};

export default function ShopPage() {
  return <ShopPageContent />;
}
