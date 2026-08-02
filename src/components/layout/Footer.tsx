"use client";

import Link from "next/link";
import { useDictionary } from "@/i18n/provider";

export function Footer() {
  const t = useDictionary();

  const footerLinks = [
    {
      title: t.footer.explore,
      links: [
        { href: "/shop/", label: t.footer.shopSeries },
        { href: "/inspiration/", label: t.footer.inspiration },
        { href: "/how-its-made/", label: t.footer.howItsMade },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { href: "/about/", label: t.footer.about },
        { href: "/contact/", label: t.footer.contactTrade },
        { href: "/contact/#custom", label: t.footer.customWidth },
      ],
    },
  ];

  return (
    <footer className="border-t border-neutral-200/80 bg-[#F3EEE6]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl tracking-[0.08em] text-neutral-900">
              DOMART
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
              {t.footer.blurb}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-neutral-400">
              Fachada Series · Casa Alegre Walls
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-400 mb-4">
                {group.title}
              </p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-700 hover:text-neutral-950 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.16em] text-neutral-400 mb-4">
              {t.footer.craftsmanship}
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {t.footer.craftsmanshipBody}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-neutral-300/50 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Domart. {t.footer.rights}
          </p>
          <p className="text-xs text-neutral-500">
            {t.footer.ordersVia}{" "}
            <a
              href="https://wa.me/17542133764"
              className="underline underline-offset-2 hover:text-neutral-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              +1 754-213-3764
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
