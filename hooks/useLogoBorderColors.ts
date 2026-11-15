"use client";

import type { MutableRefObject } from "react";
import { useEffect, useRef } from "react";
import {
  extractAverageRgb,
  formatProjectBorderColors,
} from "@/helpers/logoColor";

function applyLogoBorderColorToContainer(
  container: HTMLElement | null,
  img: HTMLImageElement | null,
) {
  if (!container || !img) return;
  const rgb = extractAverageRgb(img);
  if (!rgb) return;
  const { lightBorder, darkBorder, lightShadow } =
    formatProjectBorderColors(rgb);
  container.style.setProperty("--project-border-light", lightBorder);
  container.style.setProperty("--project-border-dark", darkBorder);
  container.style.setProperty("--project-shadow", lightShadow);
}

/** Extracts a logo image's average RGB color and stores hover border/shadow CSS variables on the card container. */
export function useLogoBorderColors<T extends HTMLElement = HTMLDivElement>(
  externalRef?: MutableRefObject<T | null>,
) {
  const internalRef = useRef<T | null>(null);
  const containerRef = externalRef ?? internalRef;
  const logoImgRef = useRef<HTMLImageElement | null>(null);

  const applyLogoBorderColor = (img: HTMLImageElement | null) => {
    applyLogoBorderColorToContainer(containerRef.current, img);
  };

  useEffect(() => {
    if (logoImgRef.current?.complete) {
      applyLogoBorderColorToContainer(
        (externalRef ?? internalRef).current,
        logoImgRef.current,
      );
    }
  }, [externalRef]);

  return { containerRef, logoImgRef, applyLogoBorderColor };
}
