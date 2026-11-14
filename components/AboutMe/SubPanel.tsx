"use client";

import { headlineFont } from "@/lib/fonts";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import type { PanelProps } from "@/types";

export default function SubPanel({ headline, desc }: PanelProps) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const revealClass = isVisible ? "animate-show-down-up" : "";

  return (
    <div ref={containerRef} className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5">
      <h3
        className={`${headlineFont.variable} font-headline opacity-0 ${revealClass} motion-reduce:animate-none motion-reduce:opacity-100`}
      >
        {headline}
      </h3>
      <p
        className={`mt-4 text-justify opacity-0 [animation-delay:0.2s] ${revealClass} motion-reduce:animate-none motion-reduce:opacity-100 lg:text-lg`}
      >
        {desc}
      </p>
    </div>
  );
}
