"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { LocaleProvider } from "./LocaleProvider";
import { ThemeTransitionProvider } from "./ThemeTransitionProvider";

/** Wraps client-only UI context providers while keeping RootLayout a Server Component. */
export default function ThemeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeTransitionProvider>
        <LocaleProvider>{children}</LocaleProvider>
      </ThemeTransitionProvider>
    </ThemeProvider>
  );
}
