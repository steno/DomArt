import type { Metadata } from "next";
import { AboutPageContent } from "./about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Domart creates modular accent walls inspired by Dominican casas de madera—Caribbean joy in modern form.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
