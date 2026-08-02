import type { Metadata } from "next";
import { AboutPageContent } from "./about-content";

export const metadata: Metadata = {
  title: "About Domart",
  description:
    "Domart creates accent walls inspired by Dominican wooden houses—Caribbean joy in modern form.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
