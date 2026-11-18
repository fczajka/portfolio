"use client";

import { useLocale } from "@/components/Providers/LocaleProvider";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import { getContent } from "@/data/content";
import { delays } from "./constants";

export default function Scroll() {
  const { locale } = useLocale();
  const { letters } = getContent(locale).landing;
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  return (
    <div
      ref={containerRef}
      className="relative self-center mt-3 h-44 -mb-30 sm:h-48 sm:-mb-32 shrink-0 flex flex-col items-center lg:mt-0 lg:mb-0 lg:absolute lg:left-1/4 lg:-translate-x-1/4 lg:-bottom-28 lg:h-2/5"
    >
      <div className="relative flex mb-3 lg:mb-4 tracking-wider animate-fade-in [animation-delay:1.9s] motion-reduce:animate-none text-sm md:text-base lg:[animation-delay:1.6s]">
        {letters.map((letter) => (
          <span
            key={letter.id}
            className={`animate-jump dark:animate-jump-dark ${
              delays[Number(letter.id) % delays.length]
            } motion-reduce:animate-none`}
          >
            {letter.letter}
          </span>
        ))}
      </div>
      <div
        className={`w-0.5 flex-1 bg-primary-200 opacity-0 ${
          isVisible && "animate-line"
        } [transform-origin:bottom] [animation-delay:1.1s] lg:[animation-delay:1.6s] motion-reduce:animate-none motion-reduce:opacity-100`}
      ></div>
    </div>
  );
}
