"use client";

import useElementOnScreen from "@/hooks/useElementOnScreen";
import type { PanelProps } from "@/types";

export default function Panel({ headline, desc }: PanelProps) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const revealClass = isVisible ? "animate-show-down-up" : "";

  return (
    <div ref={containerRef} className="w-full sm:w-4/5 md:w-3/5 xl:w-2/5">
      <h2
        className={`opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 font-headline ${revealClass}`}
      >
        {headline}
      </h2>
      <p
        className={`mt-4 text-justify opacity-0 ${revealClass} [animation-delay:0.2s] motion-reduce:animate-none motion-reduce:opacity-100 lg:text-lg`}
      >
        {desc}
      </p>
    </div>
  );
}
