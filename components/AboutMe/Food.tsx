"use client";

import Image from "next/image";
import { MdArrowForward } from "react-icons/md";
import { useLocale } from "@/components/Providers/LocaleProvider";
import { logoHoverCardClasses } from "@/components/UI/constants";
import { getUiCopy } from "@/data/content";
import useElementOnScreen from "@/hooks/useElementOnScreen";
import { useLogoBorderColors } from "@/hooks/useLogoBorderColors";
import type { FoodProps } from "@/types";

export default function Food({ food, delay, onOpen }: FoodProps) {
  const { locale } = useLocale();
  const uiCopy = getUiCopy(locale).foods;
  const [containerRef, isVisible] = useElementOnScreen<HTMLButtonElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  });
  const { logoImgRef, applyLogoBorderColor } =
    useLogoBorderColors<HTMLButtonElement>(containerRef);

  return (
    <button
      ref={containerRef}
      type="button"
      onClick={() => onOpen?.(food)}
      aria-label={uiCopy.openAria(food.name)}
      className={`group flex w-full max-w-sm mx-auto flex-col rounded-primary bg-zinc-200/80 p-3 text-left opacity-0 transition-all duration-300 hover:scale-[1.02] hover:opacity-100 hover:[animation-fill-mode:backwards] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-secondary-bg ${logoHoverCardClasses} ${
        isVisible ? "animate-show-down-up" : ""
      } ${delay} motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transition-none motion-reduce:hover:scale-100 sm:max-w-none sm:p-4`}
    >
      <Image
        ref={logoImgRef}
        src={food.image}
        alt={food.alt}
        onLoad={(event) => applyLogoBorderColor(event.currentTarget)}
        className="aspect-square w-full rounded-[1.35rem] object-cover"
      />
      <div className="mt-3 flex w-full items-center justify-between gap-2 px-1">
        <h4 className="text-left font-headline text-lg text-zinc-900 dark:text-zinc-100 sm:text-xl">
          {food.name}
        </h4>
        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary-700 dark:text-primary-300">
          <span>{uiCopy.viewNotes}</span>
          <MdArrowForward
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          />
        </span>
      </div>
      <p className="mt-1 px-1 text-left text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
        {food.tagline}
      </p>
    </button>
  );
}
