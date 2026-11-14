"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  extractAverageRgb,
  formatProjectBorderColors,
} from "@/helpers/logoColor";
import { headlineFont } from "@/lib/fonts";
import type { ProjectProps } from "@/types";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import Button from "../UI/Button";

export default function Project({
  name,
  platform,
  shortDesc,
  animationDelay,
  buttonInfo,
  logo,
  onOpen,
}: ProjectProps) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
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

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col justify-between p-4 rounded-primary opacity-0 transition-all duration-300 bg-zinc-100 outline outline-1 outline-transparent hover:outline-[color:var(--project-border-light,#60a5fa)] dark:hover:outline-[color:var(--project-border-dark,#60a5fa)] hover:scale-[1.02] hover:opacity-100 hover:shadow-xl hover:shadow-[color:var(--project-shadow,rgba(219,234,254,0.5))] dark:hover:shadow-none hover:[animation-fill-mode:backwards] dark:bg-dark-secondary-bg dark:shadow-none ${
        isVisible ? "animate-show-down-up" : ""
      } ${animationDelay} motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none sm:p-6`}
    >
      <div className="flex flex-col justify-start">
        <div className="flex justify-between items-start gap-4 w-full">
          <div>
            <h3
              className={`${headlineFont.variable} font-headline text-2xl lg:text-3xl tracking-tight text-zinc-900 dark:text-zinc-100`}
            >
              {name}
            </h3>
            <span className="inline-block mt-1 text-xs font-semibold tracking-wide text-primary-700 dark:text-primary-200">
              {platform}
            </span>
          </div>
          {logo && (
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                ref={logoImgRef}
                src={logo}
                alt={`${name} logo`}
                onLoad={(event) => applyLogoBorderColor(event.currentTarget)}
                className="rounded-xl object-contain"
              />
            </div>
          )}
        </div>
        <p className="text-justify my-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {shortDesc}
        </p>
      </div>
      <div className="flex justify-end items-end pt-2">
        <Button
          text={buttonInfo.text}
          callback={() => onOpen?.()}
          aria={buttonInfo.aria ?? `Check details of ${name}`}
          type={buttonInfo.type}
          style="dark:text-zinc-900"
        />
      </div>
    </div>
  );
}
