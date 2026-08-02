"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/provider";

export default function NotFound() {
  const t = useDictionary().notFound;

  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">404</p>
      <h1 className="font-display mt-4 text-4xl text-neutral-900">{t.title}</h1>
      <p className="mt-4 text-neutral-600">{t.body}</p>
      <Button asChild className="mt-8">
        <Link href="/">{t.returnHome}</Link>
      </Button>
    </div>
  );
}
