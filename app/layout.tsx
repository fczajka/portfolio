import Header from "@/components/Header/Header";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import ThemeProviderWrapper from "@/components/Providers/ThemeProviderWrapper";
import JsonLd from "@/components/UI/JsonLd";
import { contact, footer } from "@/data/content";
import { defaultFont, headlineFont } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Franciszek Czajka | Full-Stack Web & Mobile Developer",
    template: "%s | Franciszek Czajka",
  },
  description:
    "I am an independent full-stack web and mobile developer from Poznań, Poland, building cross-platform Flutter apps and accessible Next.js web applications.",
  keywords: [
    "Franciszek Czajka",
    "Full-Stack Developer",
    "Flutter Developer",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Poznań",
    "Portfolio",
  ],
  authors: [{ name: "Franciszek Czajka", url: siteUrl }],
  creator: "Franciszek Czajka",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
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
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Franciszek Czajka | Full-Stack Web & Mobile Developer",
    description:
      "Cross-platform Flutter apps, edge AI products, and real-time Next.js web applications.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: footer.name,
      url: siteUrl,
      jobTitle: "Full-Stack Web & Mobile Developer",
      description:
        "Independent full-stack web and mobile developer building cross-platform Flutter apps and Next.js web platforms.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Poznań",
        addressCountry: "PL",
      },
      email: "mailto:franekczajkaa@gmail.com",
      sameAs: contact.links
        .filter((link) => link.type === "link")
        .map((link) => link.href),
      knowsAbout: [
        "Java",
        "Vaadin",
        "Next.js",
        "React",
        "Angular",
        "TypeScript",
        "Tailwind CSS",
        "Flutter",
        "Supabase",
        "PostgreSQL",
        "Prisma",
        "SQLite",
        "PowerSync",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Franciszek Czajka Portfolio",
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headlineFont.variable} ${defaultFont.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <body className="font-default bg-zinc-50 text-zinc-900 dark:bg-dark-primary-bg dark:text-zinc-200">
        <JsonLd data={structuredData} />
        <ThemeProviderWrapper>
          <Header />
          {children}
          <MobileNavbar />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
