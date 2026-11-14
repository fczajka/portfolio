"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

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
      {children}
    </ThemeProvider>
  );
}
