"use client";

import Header from "@/components/Header/Header";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth motion-reduce:scroll-auto">
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
          <MobileNavbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
