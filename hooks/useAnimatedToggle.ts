"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Manages open and exit-animation state with reduced-motion handling and timer cleanup. */
export default function useAnimatedToggle(delayMs = 700) {
  const [isOpen, setIsOpen] = useState(false);
  const [wantsToSee, setWantsToSee] = useState(false);
  const isVisibleRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const nextVisible = !isVisibleRef.current;
    isVisibleRef.current = nextVisible;
    setWantsToSee(nextVisible);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!nextVisible) {
      if (prefersReducedMotion) {
        setIsOpen(false);
        return;
      }

      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        setIsOpen(false);
      }, delayMs);
      return;
    }

    setIsOpen(true);
  }, [delayMs]);

  const close = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    isVisibleRef.current = false;
    setWantsToSee(false);
    setIsOpen(false);
  }, []);

  return { isOpen, wantsToSee, toggle, close };
}
