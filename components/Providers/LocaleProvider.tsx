"use client";

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
  resetActiveViewTransition,
  runCircularViewTransition,
  type TransitionOrigin,
} from "@/helpers/viewTransition";
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

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "pl";
}

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

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale?: Locale;
};

/** Provides persisted EN/PL language state, `<html lang>` sync, and circular View Transition sweep. */
export function LocaleProvider({
  children,
  initialLocale,
}: LocaleProviderProps) {
  const isControlledForTest = initialLocale !== undefined;
  const [controlledLocale, setControlledLocale] = useState<Locale>(
    initialLocale ?? "en",
  );
  const storedLocale = useSyncExternalStore(
    subscribeLocaleStore,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  const locale = isControlledForTest ? controlledLocale : storedLocale;

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
      persistLocale(nextLocale);
    },
    [isControlledForTest],
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
