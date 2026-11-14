"use client";

import { useState, useEffect, useRef, type MutableRefObject } from "react";
import type { UseElementOnScreenProps } from "@/types";

export default function useElementOnScreen(options: UseElementOnScreenProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { root, rootMargin, threshold } = options;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, isVisible]);

  return [containerRef, isVisible] as [
    MutableRefObject<HTMLDivElement | null>,
    boolean,
  ];
}
