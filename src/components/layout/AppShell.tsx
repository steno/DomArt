"use client";

import { LocaleProvider } from "@/i18n/provider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useHydrateConfiguratorStore } from "@/store/configurator";
import type { ReactNode } from "react";

export function AppShell({ children }: { children: ReactNode }) {
  useHydrateConfiguratorStore();

  return (
    <LocaleProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
