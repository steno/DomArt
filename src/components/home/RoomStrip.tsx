"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteImage } from "@/components/ui/site-image";
import { lifestyleImages } from "@/lib/images";
import { interpolate, useDictionary } from "@/i18n/provider";

export function RoomStrip() {
  const t = useDictionary().roomStrip;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const rooms = [
    {
      src: lifestyleImages.bedroomJungla,
      label: t.bedroom,
      href: "/product/bedroom-headboard/",
    },
    {
      src: lifestyleImages.diningSol,
      label: t.dining,
      href: "/product/dining-room/",
    },
    {
      src: lifestyleImages.livingCoralTv,
      label: t.living,
      href: "/product/living-room/?color=coral",
    },
    {
      src: lifestyleImages.bathroomCosta,
      label: t.bathroom,
      href: "/product/bathroom/",
    },
  ] as const;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < max - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByPage = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-room-card]");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="border-t border-neutral-200/70 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {rooms.map(({ src, label, href }) => (
            <Link
              key={href}
              href={href}
              data-room-card
              className="group relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden sm:w-[48%] md:w-[calc((100%-2rem)/3)]"
            >
              <SiteImage
                src={src}
                alt={interpolate(t.alt, { label })}
                fill
                className="absolute inset-0"
                sizes="(max-width: 640px) 78vw, (max-width: 768px) 48vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80 transition-opacity group-hover:opacity-90" />
              <p className="absolute bottom-5 left-5 font-display text-xl text-white">
                {label}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            aria-label={t.prev}
            onClick={() => scrollByPage(-1)}
            disabled={!canPrev}
            className="flex h-9 w-9 items-center justify-center border border-neutral-300 text-neutral-900 transition enabled:hover:border-neutral-900 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={t.next}
            onClick={() => scrollByPage(1)}
            disabled={!canNext}
            className="flex h-9 w-9 items-center justify-center border border-neutral-300 text-neutral-900 transition enabled:hover:border-neutral-900 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
