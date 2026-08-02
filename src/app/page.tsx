"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/home/HeroBackground";
import { RoomStrip } from "@/components/home/RoomStrip";
import { useDictionary } from "@/i18n/provider";

export default function HomePage() {
  const t = useDictionary().home;

  return (
    <>
      <section className="relative min-h-[88vh] overflow-hidden">
        <HeroBackground alt={t.heroAlt} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c1917]/70 via-[#1c1917]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/50 via-transparent to-[#1c1917]/20" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24">
          <div className="max-w-xl text-white">
            <p className="animate-fade-up text-xs uppercase tracking-[0.22em] text-white/70">
              {t.series}
            </p>
            <h1 className="animate-fade-up-delay font-display mt-4 text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              DOMART
            </h1>
            <p className="animate-fade-up-delay-2 mt-5 text-lg leading-relaxed text-white/85 md:text-xl">
              {t.tagline}
            </p>
            <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="/shop/">{t.exploreSeries}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:border-white hover:bg-white/10"
              >
                <Link href="/product/living-room/">{t.configureYours}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200/70 bg-[#FAF8F5]">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-28">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
            {t.ourStory}
          </p>
          <h2 className="font-display mt-4 text-3xl tracking-tight text-neutral-900 md:text-4xl">
            {t.storyHeadline}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-neutral-600 md:text-lg">
            {t.storyBody}
          </p>
          <Link
            href="/about/"
            className="mt-8 inline-block text-xs uppercase tracking-[0.16em] text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
          >
            {t.readFullStory}
          </Link>
        </div>
      </section>

      <RoomStrip />

      <section className="border-t border-neutral-200/70 bg-neutral-900 text-white">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:px-8 md:py-24">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            {t.ctaHeadline}
          </h2>
          <p className="mt-4 text-neutral-400">{t.ctaBody}</p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-white text-neutral-900 hover:bg-neutral-100"
            >
              <Link href="/product/living-room/">{t.startConfiguring}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
