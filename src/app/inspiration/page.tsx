import type { Metadata } from "next";
import { InspirationContent } from "./inspiration-content";

export const metadata: Metadata = {
  title: "Dominican Color, Indoors",
  description:
    "Shutters, color, and light wood from Dominican house fronts—brought inside. See Fachada Series walls in living rooms, bedrooms, and dining spaces.",
};

export default function InspirationPage() {
  return <InspirationContent />;
}
