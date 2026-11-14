"use client";

import { headlineFont } from "@/lib/fonts";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import type { TextAndImageProps } from "@/types";
import HeroPortrait from "./HeroPortrait";

export default function TextAndImage({
  h1,
  paragraph,
  ctas,
}: TextAndImageProps) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const revealClass = isVisible ? "animate-show-down-up" : "";

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col-reverse justify-center gap-6 max-w-section mx-auto items-center lg:flex-row lg:gap-0"
    >
      <div className="basis-auto lg:basis-1/2 flex flex-col items-center lg:items-start">
        <h1
          className={`opacity-0 [animation-delay:0.1s] motion-reduce:animate-none motion-reduce:opacity-100 ${headlineFont.variable} font-headline ${revealClass}`}
        >
          {h1}
        </h1>
        <p
          className={`mt-3 text-center text-sm sm:text-base max-w-xl text-zinc-700 dark:text-zinc-300 opacity-0 [animation-delay:0.3s] motion-reduce:animate-none motion-reduce:opacity-100 ${revealClass} lg:text-left lg:text-xl lg:mt-4`}
        >
          {paragraph}
        </p>
        <div
          className={`flex flex-wrap justify-center gap-3 mt-5 opacity-0 [animation-delay:0.45s] motion-reduce:animate-none motion-reduce:opacity-100 ${revealClass} lg:justify-start lg:mt-6`}
        >
          {ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`px-5 py-2.5 rounded-full text-sm sm:text-base ${
                headlineFont.variable
              } font-headline tracking-wide transition-all motion-reduce:transition-none ${
                cta.variant === "primary"
                  ? "bg-primary-200 text-zinc-900 shadow-custom shadow-zinc-300 hover:bg-primary-300 focus:bg-primary-300 dark:shadow-none"
                  : "border-2 border-primary-300 text-zinc-900 hover:bg-primary-100 focus:bg-primary-100 dark:border-zinc-500 dark:text-zinc-100 dark:hover:bg-dark-secondary-bg dark:focus:bg-dark-secondary-bg"
              }`}
            >
              {cta.text}
            </a>
          ))}
        </div>
      </div>
      <div className="basis-auto lg:basis-1/2 w-full flex items-center justify-center lg:mx-auto">
        <HeroPortrait isVisible={isVisible} />
      </div>
    </div>
  );
}
