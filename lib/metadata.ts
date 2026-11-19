import type { Metadata } from "next";
import { getProjectsMeta, type ProjectMeta } from "@/data/projectsMeta";
import { localizePath, stripLocalePrefix } from "@/helpers/locale";
import { SITE_URL } from "@/lib/site";
import type { Locale } from "@/types";

const AUTHOR_NAME = "Franciszek Czajka";
const AUTHOR_EMAIL = "mailto:franekczajkaa@gmail.com";
const AUTHOR_SOCIALS = [
  "https://github.com/fczajka",
  "https://www.linkedin.com/in/franciszek-czajka/",
];

const SITE_KNOWS_ABOUT = [
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
];

type SiteMetaCopy = {
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  ogDescription: string;
  twitterDescription: string;
  siteName: string;
  ogLocale: string;
  alternateOgLocale: string;
  keywords: string[];
  jobTitle: string;
  personDescription: string;
  notFoundTitle: string;
};

const SITE_META_COPY: Record<Locale, SiteMetaCopy> = {
  en: {
    defaultTitle: "Franciszek Czajka | Full-Stack Web & Mobile Developer",
    titleTemplate: "%s | Franciszek Czajka",
    description:
      "I am an independent full-stack web and mobile developer from Poznań, Poland, building cross-platform Flutter apps and accessible Next.js web applications.",
    ogDescription:
      "Portfolio of Franciszek Czajka — cross-platform Flutter apps, edge AI products, and real-time Next.js web applications.",
    twitterDescription:
      "Cross-platform Flutter apps, edge AI products, and real-time Next.js web applications.",
    siteName: "Franciszek Czajka Portfolio",
    ogLocale: "en_US",
    alternateOgLocale: "pl_PL",
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
    jobTitle: "Full-Stack Web & Mobile Developer",
    personDescription:
      "Independent full-stack web and mobile developer building cross-platform Flutter apps and Next.js web platforms.",
    notFoundTitle: "Project Not Found",
  },
  pl: {
    defaultTitle: "Franciszek Czajka | Full-Stack Developer Web i Mobile",
    titleTemplate: "%s | Franciszek Czajka",
    description:
      "Jestem niezależnym full-stack developerem web i mobile z Poznania — tworzę wieloplatformowe aplikacje we Flutterze oraz nowoczesne aplikacje webowe w Next.js.",
    ogDescription:
      "Portfolio Franciszka Czajki — wieloplatformowe aplikacje Flutter, produkty Edge AI oraz aplikacje webowe czasu rzeczywistego w Next.js.",
    twitterDescription:
      "Wieloplatformowe aplikacje Flutter, produkty Edge AI i aplikacje webowe w Next.js.",
    siteName: "Portfolio — Franciszek Czajka",
    ogLocale: "pl_PL",
    alternateOgLocale: "en_US",
    keywords: [
      "Franciszek Czajka",
      "Full-Stack Developer",
      "Programista Flutter",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Poznań",
      "Portfolio",
    ],
    jobTitle: "Full-Stack Developer Web i Mobile",
    personDescription:
      "Niezależny full-stack developer web i mobile tworzący wieloplatformowe aplikacje Flutter oraz platformy webowe Next.js.",
    notFoundTitle: "Nie znaleziono projektu",
  },
};

/** Builds localized site-level Next.js Metadata including canonical and hreflang alternates. */
export function getSiteMetadata(locale: Locale = "en"): Metadata {
  const copy = SITE_META_COPY[locale];
  const canonicalPath = localizePath("/", locale);
  const fullUrl =
    canonicalPath === "/" ? SITE_URL : `${SITE_URL}${canonicalPath}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: copy.defaultTitle,
      template: copy.titleTemplate,
    },
    description: copy.description,
    keywords: copy.keywords,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/",
        pl: "/pl",
        "x-default": "/",
      },
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
      url: fullUrl,
      title: copy.defaultTitle,
      description: copy.ogDescription,
      siteName: copy.siteName,
      locale: copy.ogLocale,
      alternateLocale: [copy.alternateOgLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.defaultTitle,
      description: copy.twitterDescription,
    },
  };
}

/** Builds localized Next.js Metadata for an individual project case study route. */
export function getProjectPageMetadata(
  rawSlug: string,
  locale: Locale = "en",
): Metadata {
  const copy = SITE_META_COPY[locale];
  const normalized = rawSlug.toLowerCase();
  const project = getProjectsMeta(locale).find(
    (item) => item.slug === normalized,
  );

  if (!project) {
    return {
      title: copy.notFoundTitle,
    };
  }

  const enPath = `/projects/${project.slug}`;
  const plPath = `/pl/projects/${project.slug}`;
  const canonicalPath = locale === "pl" ? plPath : enPath;

  return {
    title: `${project.name} — ${project.platform}`,
    description: project.shortDesc,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: enPath,
        pl: plPath,
        "x-default": enPath,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${canonicalPath}`,
      title: `${project.name} | ${AUTHOR_NAME}`,
      description: project.shortDesc,
      siteName: copy.siteName,
      locale: copy.ogLocale,
      alternateLocale: [copy.alternateOgLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | ${AUTHOR_NAME}`,
      description: project.shortDesc,
    },
  };
}

/** Builds localized Schema.org Person + WebSite JSON-LD graph. */
export function getSiteStructuredData(
  locale: Locale = "en",
): Record<string, unknown> {
  const copy = SITE_META_COPY[locale];
  const pageUrl = locale === "pl" ? `${SITE_URL}/pl` : SITE_URL;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: AUTHOR_NAME,
        url: SITE_URL,
        jobTitle: copy.jobTitle,
        description: copy.personDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Poznań",
          addressCountry: "PL",
        },
        email: AUTHOR_EMAIL,
        sameAs: AUTHOR_SOCIALS,
        knowsAbout: SITE_KNOWS_ABOUT,
      },
      {
        "@type": "WebSite",
        "@id": `${pageUrl}/#website`,
        url: pageUrl,
        name: copy.siteName,
        inLanguage: locale,
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

/** Builds localized Schema.org SoftwareApplication JSON-LD for a project page. */
export function getProjectStructuredData(
  project: Pick<
    ProjectMeta,
    "name" | "category" | "platform" | "longDesc" | "slug"
  >,
  locale: Locale = "en",
): Record<string, unknown> {
  const localizedPath = localizePath(`/projects/${project.slug}`, locale);

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory:
      project.category === "mobile" ? "MobileApplication" : "WebApplication",
    operatingSystem: project.platform,
    description: project.longDesc,
    inLanguage: locale,
    url: `${SITE_URL}${localizedPath}`,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
  };
}

/** Resolves client-side document title & description when toggling locales smoothly. */
export function getRouteDocumentMeta(
  pathname: string,
  locale: Locale,
): { title: string; description: string } {
  const copy = SITE_META_COPY[locale];
  const basePath = stripLocalePrefix(pathname);

  if (basePath.startsWith("/projects/")) {
    const slug = basePath.slice("/projects/".length).split("/")[0] ?? "";
    const project = getProjectsMeta(locale).find(
      (item) => item.slug === slug.toLowerCase(),
    );
    if (project) {
      return {
        title: `${project.name} — ${project.platform} | ${AUTHOR_NAME}`,
        description: project.shortDesc,
      };
    }
  }

  return {
    title: copy.defaultTitle,
    description: copy.description,
  };
}
