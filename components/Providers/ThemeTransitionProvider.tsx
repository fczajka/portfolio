"use client";

import { useTheme } from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import {
  resetActiveViewTransition,
  runCircularViewTransition,
} from "@/helpers/viewTransition";

type ThemeTarget = "light" | "dark";

type ThemeTransitionContextValue = {
  toggleThemeWithTransition: (nextTheme: ThemeTarget) => void;
};

const TRANSITION_DURATION_MS = 820;
const TRANSITION_EASING = "cubic-bezier(0.32, 0.72, 0, 1)";

const ThemeTransitionContext =
  createContext<ThemeTransitionContextValue | null>(null);

/** Coordinates a GPU-accelerated diagonal top-right to bottom-left View Transition theme sweep. */
export function ThemeTransitionProvider({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    return () => {
      resetActiveViewTransition();
    };
  }, []);

  const toggleThemeWithTransition = useCallback(
    (nextTheme: ThemeTarget) => {
      runCircularViewTransition({
        mode: "theme",
        durationMs: TRANSITION_DURATION_MS,
        easing: TRANSITION_EASING,
        onUpdate: () => {
          const root = document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(nextTheme);
          root.style.colorScheme = nextTheme;
          setTheme(nextTheme);
        },
      });
    },
    [setTheme],
  );

  const value = useMemo(
    () => ({ toggleThemeWithTransition }),
    [toggleThemeWithTransition],
  );

  return (
    <ThemeTransitionContext.Provider value={value}>
      {children}
    </ThemeTransitionContext.Provider>
  );
}

/** Returns theme switcher that uses the diagonal View Transition wave when available. */
export function useThemeTransition(): ThemeTransitionContextValue {
  const ctx = useContext(ThemeTransitionContext);
  const { setTheme } = useTheme();

  return useMemo(
    () =>
      ctx ?? {
        toggleThemeWithTransition: (nextTheme: ThemeTarget) => {
          setTheme(nextTheme);
        },
      },
    [ctx, setTheme],
  );
}
