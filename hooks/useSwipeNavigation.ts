import { useRef, type TouchEvent } from "react";

type UseSwipeNavigationOptions = {
  onPrev: () => void;
  onNext: () => void;
  thresholdPx?: number;
};

/** Handles horizontal swipe gestures on touch devices while leaving vertical scroll untouched. */
export default function useSwipeNavigation({
  onPrev,
  onNext,
  thresholdPx = 40,
}: UseSwipeNavigationOptions) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.changedTouches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    if (Math.abs(dx) < thresholdPx || Math.abs(dx) <= Math.abs(dy)) return;

    if (dx < 0) {
      onNext();
    } else {
      onPrev();
    }
  };

  return { onTouchStart, onTouchEnd };
}
