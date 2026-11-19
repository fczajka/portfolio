import Header from "@/components/Header/Header";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import ThemeProviderWrapper from "@/components/Providers/ThemeProviderWrapper";
import { defaultFont, headlineFont } from "@/lib/fonts";
import { getSiteMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = getSiteMetadata("en");

const LOCALE_BOOTSTRAP_SCRIPT =
  '(function(){try{var p=location.pathname;if(p==="/pl"||p.startsWith("/pl/")){document.documentElement.lang="pl";}}catch(e){}})();';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headlineFont.variable} ${defaultFont.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="font-default bg-zinc-50 text-zinc-900 dark:bg-dark-primary-bg dark:text-zinc-200">
        <ThemeProviderWrapper>
          <Header />
          {children}
          <MobileNavbar />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
