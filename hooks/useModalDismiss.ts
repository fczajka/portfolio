"use client";

import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type UseModalDismissOptions = {
  containerRef: RefObject<HTMLElement>;
  onClose: () => void;
  closeDelayMs?: number;
  isSuspended?: boolean;
  onSuspendedEscape?: () => void;
};

/** Manages animated modal dismissal via Escape key, backdrop clicks, and reduced-motion timing. */
export default function useModalDismiss({
  containerRef,
  onClose,
  closeDelayMs = 300,
  isSuspended = false,
  onSuspendedEscape,
}: UseModalDismissOptions) {
  const closeTimerRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const [wantsToClose, setWantsToClose] = useState(false);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const triggerClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setWantsToClose(true);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      onClose();
      return;
    }

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, closeDelayMs);
  }, [closeDelayMs, onClose]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (isSuspended) {
        onSuspendedEscape?.();
        return;
      }
      triggerClose();
    }

    function handleOutsideClick(event: MouseEvent) {
      if (isSuspended) return;
      const target = event.target as Node | null;
      if (!target || !document.contains(target)) return;
      if (containerRef.current?.contains(target)) return;

      triggerClose();
    }

    document.addEventListener("keyup", handleEscape);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("keyup", handleEscape);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [containerRef, isSuspended, onSuspendedEscape, triggerClose]);

  return { wantsToClose, triggerClose };
}
