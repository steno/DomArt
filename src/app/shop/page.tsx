import type { Metadata } from "next";
import { ShopPageContent } from "./shop-content";

export const metadata: Metadata = {
  title: "Accent Walls for Every Room",
  description:
    "Shop the Fachada Series—living room, bedroom, dining room, and bathroom vanity walls in six Caribbean accent colors.",
};

export default function ShopPage() {
  return <ShopPageContent />;
}
