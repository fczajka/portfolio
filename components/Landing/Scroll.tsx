"use client";

import useElementOnScreen from "@/hooks/useElementOnScreen";
import { landing } from "@/public/content";
import { delays } from "./constants";

export default function Scroll() {
  const { letters } = landing;
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  return (
    <div
      ref={containerRef}
      className="absolute h-1/3 flex flex-col items-center left-1/2 -translate-x-1/2 -bottom-12 sm:-bottom-16 md:-bottom-24 lg:left-1/4 lg:-translate-x-1/4 lg:-bottom-28 lg:h-2/5"
    >
      <div className="relative flex mb-4 tracking-wider animate-fade-in [animation-delay:1.9s] motion-reduce:animate-none text-sm md:text-base lg:[animation-delay:1.6s]">
        {letters.map((letter) => (
          <span
            key={letter.id}
            className={`animate-jump dark:animate-jump-dark ${
              delays[Number(letter.id)]
            } motion-reduce:animate-none`}
          >
            {letter.letter}
          </span>
        ))}
      </div>
      <div
        className={`w-0.5 h-full bg-primary-200 opacity-0 ${
          isVisible && "animate-line"
        } [transform-origin:bottom] [animation-delay:1.1s] lg:[animation-delay:1.6s] motion-reduce:animate-none motion-reduce:opacity-100`}
      ></div>
    </div>
  );
}
