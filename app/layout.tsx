"use client";

import Header from "@/components/Header/Header";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
