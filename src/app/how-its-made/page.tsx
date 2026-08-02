import type { Metadata } from "next";
import { HowItsMadeContent } from "./how-its-made-content";

export const metadata: Metadata = {
  title: "How It’s Made",
  description:
    "Light pine, paint, and modular panels. How Domart builds Fachada Series walls in 1–2 weeks.",
};

export default function HowItsMadePage() {
  return <HowItsMadeContent />;
}
