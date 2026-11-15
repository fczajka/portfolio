"use client";

import type { MutableRefObject } from "react";
import { useCallback, useEffect, useRef } from "react";
import {
  extractAverageRgb,
  formatProjectBorderColors,
} from "@/helpers/logoColor";

/** Extracts a logo image's average RGB color and stores hover border/shadow CSS variables on the card container. */
export function useLogoBorderColors<T extends HTMLElement = HTMLDivElement>(
  externalRef?: MutableRefObject<T | null>,
) {
  const internalRef = useRef<T | null>(null);
  const containerRef = externalRef ?? internalRef;
  const logoImgRef = useRef<HTMLImageElement | null>(null);

  const applyLogoBorderColor = useCallback(
    (img: HTMLImageElement | null) => {
      const container = containerRef.current;
      if (!container || !img) return;
      const rgb = extractAverageRgb(img);
      if (!rgb) return;
      const { lightBorder, darkBorder, lightShadow } =
        formatProjectBorderColors(rgb);
      container.style.setProperty("--project-border-light", lightBorder);
      container.style.setProperty("--project-border-dark", darkBorder);
      container.style.setProperty("--project-shadow", lightShadow);
    },
    [containerRef],
  );

  useEffect(() => {
    if (logoImgRef.current?.complete) {
      applyLogoBorderColor(logoImgRef.current);
    }
  }, [applyLogoBorderColor]);

  return { containerRef, logoImgRef, applyLogoBorderColor };
}
