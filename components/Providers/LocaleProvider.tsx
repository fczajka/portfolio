"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getLocaleFromPathname,
  isLocale,
  localizePath,
} from "@/helpers/locale";
import {
  resetActiveViewTransition,
  runCircularViewTransition,
  type TransitionOrigin,
} from "@/helpers/viewTransition";
import { getRouteDocumentMeta } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import type { Locale } from "@/types";

export const LOCALE_STORAGE_KEY = "portfolio-locale";

const LOCALE_TRANSITION_DURATION_MS = 760;
const LOCALE_TRANSITION_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale, origin?: TransitionOrigin) => void;
  toggleLocale: (origin?: TransitionOrigin) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
  toggleLocale: () => {},
});

const listeners = new Set<() => void>();
let fallbackLocale: Locale | null = null;

function subscribeLocaleStore(listener: () => void): () => void {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === LOCALE_STORAGE_KEY) {
      listener();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(saved)) {
      return saved;
    }
  } catch {
    // Fall back to in-memory locale when storage access fails.
  }
  return fallbackLocale ?? "en";
}

function getServerLocaleSnapshot(): Locale {
  return "en";
}

function persistLocale(nextLocale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    fallbackLocale = null;
  } catch {
    fallbackLocale = nextLocale;
  }
  listeners.forEach((listener) => listener());
}

function syncDocumentMetadata(pathname: string, nextLocale: Locale): void {
  if (typeof document === "undefined") return;

  document.documentElement.lang = nextLocale;

  const { title, description } = getRouteDocumentMeta(pathname, nextLocale);
  document.title = title;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", description);
  }

  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    const canonicalHref =
      pathname === "/" ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;
    canonicalLink.setAttribute("href", canonicalHref);
  }
}

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

type PendingRouteLocale = {
  locale: Locale;
  forPathname: string;
};

/** Provides URL-aware EN/PL language state, `<html lang>` + metadata sync, and circular View Transition sweep. */
export function LocaleProvider({
  children,
  initialLocale,
}: LocaleProviderProps) {
  const pathname = usePathname();
  const isRouterMounted = pathname !== null;
  const routeLocale = getLocaleFromPathname(pathname);

  const isControlledForTest = initialLocale !== undefined;
  const [controlledLocale, setControlledLocale] = useState<Locale>(
    initialLocale ?? "en",
  );
  const [pendingRouteLocale, setPendingRouteLocale] =
    useState<PendingRouteLocale | null>(null);

  const storedLocale = useSyncExternalStore(
    subscribeLocaleStore,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  const locale: Locale = (() => {
    if (isControlledForTest) return controlledLocale;
    if (isRouterMounted) {
      if (pendingRouteLocale && pendingRouteLocale.forPathname === pathname) {
        return pendingRouteLocale.locale;
      }
      return routeLocale;
    }
    return storedLocale;
  })();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  useEffect(() => {
    return () => {
      resetActiveViewTransition();
    };
  }, []);

  const applyLocaleUpdate = useCallback(
    (nextLocale: Locale) => {
      if (typeof document !== "undefined") {
        document.documentElement.lang = nextLocale;
      }
      if (isControlledForTest) {
        setControlledLocale(nextLocale);
        return;
      }

      if (isRouterMounted && typeof window !== "undefined") {
        const currentPathname = window.location.pathname || pathname || "/";
        const localizedPathname = localizePath(currentPathname, nextLocale);
        const nextUrl = `${localizedPathname}${window.location.search}${window.location.hash}`;

        try {
          window.history.replaceState(null, "", nextUrl);
        } catch {
          // Ignore History API failures in restricted contexts.
        }

        syncDocumentMetadata(localizedPathname, nextLocale);
        setPendingRouteLocale({ locale: nextLocale, forPathname: pathname });
      }

      persistLocale(nextLocale);
    },
    [isControlledForTest, isRouterMounted, pathname],
  );

  const setLocale = useCallback(
    (nextLocale: Locale, origin?: TransitionOrigin) => {
      if (nextLocale === locale) return;

      runCircularViewTransition({
        mode: "locale",
        durationMs: LOCALE_TRANSITION_DURATION_MS,
        easing: LOCALE_TRANSITION_EASING,
        origin,
        fadeOldLayer: true,
        onUpdate: () => {
          applyLocaleUpdate(nextLocale);
        },
      });
    },
    [applyLocaleUpdate, locale],
  );

  const toggleLocale = useCallback(
    (origin?: TransitionOrigin) => {
      const next: Locale = locale === "en" ? "pl" : "en";
      setLocale(next, origin);
    },
    [locale, setLocale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/** Returns the active portfolio locale (`en` or `pl`) and locale switching helpers. */
export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
