"use client";

import { useEffect, type RefObject } from "react";

/** Tracks pointer movement across the hero portrait and writes smoothed `--px`/`--py` CSS variables. */
export function usePortraitParallax(
  containerRef: RefObject<HTMLDivElement | null>,
  isVisible: boolean,
): void {
  useEffect(() => {
    const element = containerRef.current;
    if (!element || !isVisible) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    const resetOffsets = () => {
      element.style.setProperty("--px", "0");
      element.style.setProperty("--py", "0");
    };

    if (motionQuery.matches || !pointerQuery.matches) {
      resetOffsets();
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isDisposed = false;

    const tick = () => {
      if (isDisposed) return;

      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001
      ) {
        currentX = targetX;
        currentY = targetY;
        element.style.setProperty("--px", currentX.toFixed(4));
        element.style.setProperty("--py", currentY.toFixed(4));
        rafId = null;
        return;
      }

      element.style.setProperty("--px", currentX.toFixed(4));
      element.style.setProperty("--py", currentY.toFixed(4));
      rafId = window.requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (rafId === null && !isDisposed) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
      }

      const rect = element.getBoundingClientRect();
      if (
        rect.width === 0 ||
        rect.bottom < 0 ||
        rect.top > window.innerHeight
      ) {
        return;
      }

      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.43;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < 0.5) {
        targetX = 0;
        targetY = 0;
      } else {
        const radius = Math.max(rect.width, 320) * 0.85;
        const strength = (distance / (distance + radius)) * 1.15;
        targetX = Math.max(-1, Math.min(1, (dx / distance) * strength));
        targetY = Math.max(-1, Math.min(1, (dy / distance) * strength));
      }

      startAnimation();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        targetX = 0;
        targetY = 0;
        currentX = 0;
        currentY = 0;
        resetOffsets();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handlePointerLeave);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      isDisposed = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [containerRef, isVisible]);
}
