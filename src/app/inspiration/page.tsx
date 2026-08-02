import type { Metadata } from "next";
import { InspirationContent } from "./inspiration-content";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "Excerpts of Dominican facade culture brought indoors as memory—Fachada Series walls in living rooms, bedrooms, and dining spaces.",
};

export default function InspirationPage() {
  return <InspirationContent />;
}
