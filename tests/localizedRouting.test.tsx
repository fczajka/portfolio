import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sitemap from "@/app/sitemap";
import { LocaleProvider } from "@/components/Providers/LocaleProvider";
import ToggleLocale from "@/components/UI/ToggleLocale";
import { projectsMeta } from "@/data/projectsMeta";
import {
  getLocaleFromPathname,
  isProjectPath,
  localizePath,
  stripLocalePrefix,
} from "@/helpers/locale";
import {
  getProjectPageMetadata,
  getProjectStructuredData,
  getRouteDocumentMeta,
  getSiteMetadata,
  getSiteStructuredData,
} from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

let mockedPathname: string | null = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
}));

describe("Localized URL & Metadata Support", () => {
  beforeEach(() => {
    mockedPathname = "/";
    window.localStorage.clear();
    window.history.replaceState(null, "", "/");
    document.documentElement.lang = "en";
    document.title = "";

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    cleanup();
    document.head.innerHTML = "";
    vi.restoreAllMocks();
  });

  it("maps EN and PL paths cleanly across root, hash anchors, query params, and project pages", () => {
    expect(getLocaleFromPathname("/")).toBe("en");
    expect(getLocaleFromPathname("/projects/kippr")).toBe("en");
    expect(getLocaleFromPathname("/pl")).toBe("pl");
    expect(getLocaleFromPathname("/pl/projects/kippr")).toBe("pl");
    expect(getLocaleFromPathname("/platterify")).toBe("en");

    expect(stripLocalePrefix("/pl")).toBe("/");
    expect(stripLocalePrefix("/pl/projects/kippr")).toBe("/projects/kippr");
    expect(stripLocalePrefix("/projects/kippr")).toBe("/projects/kippr");

    expect(localizePath("/", "pl")).toBe("/pl");
    expect(localizePath("/#my-work", "pl")).toBe("/pl#my-work");
    expect(localizePath("/projects/kippr", "pl")).toBe("/pl/projects/kippr");
    expect(localizePath("/?project=kippr#my-work", "pl")).toBe(
      "/pl?project=kippr#my-work",
    );

    expect(localizePath("/pl", "en")).toBe("/");
    expect(localizePath("/pl#about-me", "en")).toBe("/#about-me");
    expect(localizePath("/pl/projects/kippr", "en")).toBe("/projects/kippr");

    expect(isProjectPath("/projects/platterify")).toBe(true);
    expect(isProjectPath("/pl/projects/platterify")).toBe(true);
    expect(isProjectPath("/pl")).toBe(false);
  });

  it("generates localized site & project metadata with canonical and hreflang alternates", () => {
    const enMeta = getSiteMetadata("en");
    const plMeta = getSiteMetadata("pl");

    expect(enMeta.alternates?.canonical).toBe("/");
    expect(enMeta.alternates?.languages).toEqual({
      en: "/",
      pl: "/pl",
      "x-default": "/",
    });
    expect(enMeta.openGraph?.locale).toBe("en_US");

    expect(plMeta.alternates?.canonical).toBe("/pl");
    expect(plMeta.alternates?.languages).toEqual({
      en: "/",
      pl: "/pl",
      "x-default": "/",
    });
    expect(plMeta.openGraph?.locale).toBe("pl_PL");
    expect(plMeta.description).not.toBe(enMeta.description);

    const plProjectMeta = getProjectPageMetadata("platterify", "pl");
    expect(plProjectMeta.alternates?.canonical).toBe("/pl/projects/platterify");
    expect(plProjectMeta.alternates?.languages).toEqual({
      en: "/projects/platterify",
      pl: "/pl/projects/platterify",
      "x-default": "/projects/platterify",
    });
    expect(plProjectMeta.openGraph?.locale).toBe("pl_PL");

    const plSiteJsonLd = getSiteStructuredData("pl") as {
      "@graph": Array<Record<string, unknown>>;
    };
    expect(plSiteJsonLd["@graph"][1]?.inLanguage).toBe("pl");
    expect(plSiteJsonLd["@graph"][1]?.url).toBe(`${SITE_URL}/pl`);

    const plProjectJsonLd = getProjectStructuredData(projectsMeta[0], "pl");
    expect(plProjectJsonLd.inLanguage).toBe("pl");
    expect(plProjectJsonLd.url).toBe(
      `${SITE_URL}/pl/projects/${projectsMeta[0].slug}`,
    );

    const docMeta = getRouteDocumentMeta("/pl/projects/kippr", "pl");
    expect(docMeta.title).toContain("Kippr");
    expect(docMeta.title).toContain("iOS i Android");
  });

  it("includes both EN and PL URLs with hreflang alternates in sitemap.xml", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/pl`);

    for (const project of projectsMeta) {
      expect(urls).toContain(`${SITE_URL}/projects/${project.slug}`);
      expect(urls).toContain(`${SITE_URL}/pl/projects/${project.slug}`);
    }

    const homeEntry = entries.find((entry) => entry.url === SITE_URL);
    expect(homeEntry?.alternates?.languages).toEqual({
      en: SITE_URL,
      pl: `${SITE_URL}/pl`,
    });
  });

  it("derives Polish locale from /pl route and syncs URL, html lang, title, description, and canonical on toggle", () => {
    const descMeta = document.createElement("meta");
    descMeta.setAttribute("name", "description");
    descMeta.setAttribute("content", "");
    document.head.appendChild(descMeta);

    const canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("href", `${SITE_URL}/pl/projects/kippr`);
    document.head.appendChild(canonical);

    mockedPathname = "/pl/projects/kippr";
    window.history.replaceState(
      null,
      "",
      "/pl/projects/kippr?tab=overview#top",
    );

    render(
      <LocaleProvider>
        <ToggleLocale />
      </LocaleProvider>,
    );

    const plButton = screen.getByRole("button", { name: "Polski" });
    const enButton = screen.getByRole("button", { name: "English" });

    expect(plButton.getAttribute("aria-pressed")).toBe("true");
    expect(document.documentElement.lang).toBe("pl");

    // Toggle PL -> EN updates URL while keeping query/hash, plus document metadata
    fireEvent.click(enButton);

    expect(enButton.getAttribute("aria-pressed")).toBe("true");
    expect(document.documentElement.lang).toBe("en");
    expect(window.location.pathname).toBe("/projects/kippr");
    expect(window.location.search).toBe("?tab=overview");
    expect(window.location.hash).toBe("#top");
    expect(document.title).toContain("Kippr — iOS & Android");
    expect(descMeta.getAttribute("content")).toContain("offline-first pantry");
    expect(canonical.getAttribute("href")).toBe(`${SITE_URL}/projects/kippr`);

    // Toggle EN -> PL updates back to /pl/projects/kippr
    fireEvent.click(plButton);

    expect(plButton.getAttribute("aria-pressed")).toBe("true");
    expect(document.documentElement.lang).toBe("pl");
    expect(window.location.pathname).toBe("/pl/projects/kippr");
    expect(document.title).toContain("Kippr — iOS i Android");
    expect(canonical.getAttribute("href")).toBe(
      `${SITE_URL}/pl/projects/kippr`,
    );
  });
});
