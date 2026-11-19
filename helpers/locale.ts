import type { Locale } from "@/types";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "pl"] as const;

/** Type guard verifying whether a string is a supported portfolio locale. */
export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "pl";
}

/** Detects the locale implied by a route pathname (`/pl` or `/pl/...` => `pl`, otherwise `en`). */
export function getLocaleFromPathname(
  pathname: string | null | undefined,
): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  return pathname === "/pl" || pathname.startsWith("/pl/") ? "pl" : "en";
}

/** Removes any leading `/pl` locale prefix while keeping a normalized leading slash. */
export function stripLocalePrefix(pathname: string): string {
  if (!pathname || pathname === "/pl" || pathname === "/pl/") {
    return "/";
  }
  if (pathname.startsWith("/pl/")) {
    return pathname.slice(3);
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/**
 * Formats an internal path (with optional `?query` and `#hash`) for the target locale.
 * English uses root paths (`/`, `/#my-work`, `/projects/kippr`);
 * Polish prefixes with `/pl` (`/pl`, `/pl#my-work`, `/pl/projects/kippr`).
 */
export function localizePath(path: string, locale: Locale): string {
  const hashIndex = path.indexOf("#");
  const withoutHash = hashIndex === -1 ? path : path.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : path.slice(hashIndex);

  const queryIndex = withoutHash.indexOf("?");
  const rawPathname =
    queryIndex === -1 ? withoutHash : withoutHash.slice(0, queryIndex);
  const query = queryIndex === -1 ? "" : withoutHash.slice(queryIndex);

  const basePathname = stripLocalePrefix(rawPathname || "/");

  if (locale === "pl") {
    const localizedPathname =
      basePathname === "/" ? "/pl" : `/pl${basePathname}`;
    return `${localizedPathname}${query}${hash}`;
  }

  return `${basePathname}${query}${hash}`;
}

/** Returns true when a pathname (with or without `/pl` prefix) targets a project case study route. */
export function isProjectPath(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const normalized = stripLocalePrefix(pathname);
  return normalized === "/projects" || normalized.startsWith("/projects/");
}
