import { flushSync } from "react-dom";

export type TransitionOrigin = {
  x: number;
  y: number;
};

type ViewTransitionHandle = {
  ready?: Promise<void>;
  finished: Promise<void>;
  skipTransition?: () => void;
};

type DocumentWithViewTransition = Document & {
  startViewTransition?: (
    updateCallback: () => void | Promise<void>,
  ) => ViewTransitionHandle;
};

export type CircularTransitionOptions = {
  mode: "theme" | "locale";
  durationMs: number;
  easing: string;
  origin?: TransitionOrigin;
  fadeOldLayer?: boolean;
  onUpdate: () => void;
};

let activeTransitionId = 0;
let activeTransitionHandle: ViewTransitionHandle | null = null;

/** Cancels any in-flight View Transition and cleans up root transition attributes. */
export function resetActiveViewTransition(): void {
  activeTransitionHandle?.skipTransition?.();
  activeTransitionHandle = null;
  if (typeof document !== "undefined") {
    delete document.documentElement.dataset.themeTransition;
  }
}

/**
 * Runs a GPU-accelerated circular View Transition sweep from `origin` (defaulting to top-right).
 * Falls back immediately to `onUpdate()` when reduced motion is preferred or unsupported.
 */
export function runCircularViewTransition({
  mode,
  durationMs,
  easing,
  origin,
  fadeOldLayer = false,
  onUpdate,
}: CircularTransitionOptions): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    onUpdate();
    return;
  }

  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const doc = document as DocumentWithViewTransition;

  if (reducedMotion || typeof doc.startViewTransition !== "function") {
    onUpdate();
    return;
  }

  const transitionId = ++activeTransitionId;
  activeTransitionHandle?.skipTransition?.();

  const root = document.documentElement;
  root.dataset.themeTransition = mode;

  let transition: ViewTransitionHandle;
  try {
    transition = doc.startViewTransition(() => {
      flushSync(() => {
        onUpdate();
      });
    });
  } catch {
    delete root.dataset.themeTransition;
    onUpdate();
    return;
  }

  activeTransitionHandle = transition;

  const originX = origin?.x ?? window.innerWidth;
  const originY = origin?.y ?? 0;
  const maxX = Math.max(originX, window.innerWidth - originX);
  const maxY = Math.max(originY, window.innerHeight - originY);
  const endRadius = Math.hypot(maxX, maxY);

  void transition.ready
    ?.then(() => {
      if (
        activeTransitionId !== transitionId ||
        typeof root.animate !== "function"
      ) {
        return;
      }

      try {
        root.animate(
          [
            { clipPath: `circle(0px at ${originX}px ${originY}px)` },
            {
              clipPath: `circle(${endRadius}px at ${originX}px ${originY}px)`,
            },
          ],
          {
            duration: durationMs,
            easing,
            fill: "both",
            pseudoElement: "::view-transition-new(root)",
          },
        );

        if (fadeOldLayer) {
          root.animate(
            [
              { opacity: 1, transform: "translate3d(0, 0, 0)" },
              { opacity: 0, transform: "translate3d(-10px, 6px, 0)" },
            ],
            {
              duration: Math.round(durationMs * 0.7),
              easing: "ease-out",
              fill: "both",
              pseudoElement: "::view-transition-old(root)",
            },
          );
        }
      } catch {
        // Ignore pseudo-element animation errors on browsers with partial support.
      }
    })
    .catch(() => {});

  void transition.finished
    .catch(() => {})
    .finally(() => {
      if (activeTransitionId === transitionId) {
        activeTransitionHandle = null;
        delete root.dataset.themeTransition;
      }
    });
}
