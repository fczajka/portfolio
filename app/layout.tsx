import Header from "@/components/Header/Header";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import ThemeProviderWrapper from "@/components/Providers/ThemeProviderWrapper";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://www.franciszekczajka.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Franciszek Czajka | Full-Stack Web & Mobile Developer",
  description:
    "I am an independent full-stack web and mobile developer from Poznań, Poland, building cross-platform Flutter apps and accessible Next.js web applications.",
  keywords: [
    "Franciszek Czajka",
    "Full-Stack Developer",
    "Flutter Developer",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Franciszek Czajka", url: siteUrl }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Franciszek Czajka | Full-Stack Web & Mobile Developer",
    description:
      "Portfolio of Franciszek Czajka — cross-platform Flutter apps, edge AI products, and real-time Next.js web applications.",
    siteName: "Franciszek Czajka Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franciszek Czajka | Full-Stack Web & Mobile Developer",
    description:
      "Cross-platform Flutter apps, edge AI products, and real-time Next.js web applications.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth motion-reduce:scroll-auto"
    >
      <body>
        <ThemeProviderWrapper>
          <Header />
          {children}
          <MobileNavbar />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
