"use client";

import Link from "next/link";
import { SiteImage } from "@/components/ui/site-image";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/provider";
import {
  useLocalizedGallery,
  useLocalizedProducts,
} from "@/i18n/localized-data";

export function InspirationContent() {
  const t = useDictionary().inspiration;
  const gallery = useLocalizedGallery();
  const products = useLocalizedProducts();

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
          {t.gallery}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight text-neutral-900 md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-4 text-neutral-600 leading-relaxed">{t.lead}</p>
      </div>

      <div className="mt-14 columns-1 gap-6 sm:columns-2">
        {gallery.map((item, i) => (
          <figure
            key={`${item.title}-${i}`}
            className="mb-6 break-inside-avoid overflow-hidden bg-[#F3EEE6]"
          >
            <Link href={item.href} className="block">
              <SiteImage
                src={item.src}
                alt={item.title}
                aspect={i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>
            <figcaption className="px-5 py-4">
              <p className="font-display text-lg text-neutral-900">{item.title}</p>
              <p className="mt-1 text-sm text-neutral-500">{item.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-16 border-t border-neutral-200 pt-14 text-center">
        <h2 className="font-display text-2xl text-neutral-900">
          {t.findYourRoom}
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {products.map((p) => (
            <Button key={p.id} asChild variant="outline" size="sm">
              <Link href={`/product/${p.slug}/`}>{p.shortName}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
