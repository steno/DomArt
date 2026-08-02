"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDictionary, useLocale } from "@/i18n/provider";
import { locales, localeLabels } from "@/i18n/config";

export function Header() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const t = useDictionary();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nav = [
    { href: "/shop/", label: t.nav.shop },
    { href: "/inspiration/", label: t.nav.inspiration },
    { href: "/how-its-made/", label: t.nav.howItsMade },
    { href: "/about/", label: t.nav.about },
    { href: "/contact/", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const LanguageToggle = ({ className }: { className?: string }) => (
    <div
      className={cn("flex items-center gap-0.5 text-[11px] uppercase tracking-[0.14em]", className)}
      role="group"
      aria-label={t.nav.language}
    >
      {locales.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => {
            setLocale(code);
            setOpen(false);
          }}
          className={cn(
            "px-1.5 py-0.5 transition-colors",
            locale === code
              ? "text-neutral-900"
              : "text-neutral-400 hover:text-neutral-700"
          )}
          aria-pressed={locale === code}
        >
          {localeLabels[code]}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-neutral-200/60"
          : "bg-[#FAF8F5]/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[4.5rem] md:px-8">
        <button
          type="button"
          className="md:hidden p-2 -ml-2 text-neutral-800"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
        >
          <span className="font-display text-xl tracking-[0.08em] text-neutral-900 md:text-2xl">
            DOMART
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label={t.nav.primary}>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-xs uppercase tracking-[0.16em] transition-colors duration-200",
                pathname?.startsWith(item.href.replace(/\/$/, "")) ||
                  pathname === item.href
                  ? "text-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <LanguageToggle className="hidden md:flex" />
          {/* spacer on mobile so logo stays centered without cart icon */}
          <span className="md:hidden w-9" aria-hidden />
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-neutral-200/60 transition-all duration-300",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 bg-[#FAF8F5]" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm uppercase tracking-[0.14em] text-neutral-700"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-neutral-200/60 mt-2">
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
