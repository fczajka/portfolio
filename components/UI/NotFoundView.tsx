"use client";

import Link from "next/link";
import { MdArrowBack, MdCode } from "react-icons/md";
import HeroPortrait from "@/components/Landing/HeroPortrait";
import { useLocale } from "@/components/Providers/LocaleProvider";
import { getUiCopy } from "@/data/content";
import { localizePath } from "@/helpers/locale";

/** Bilingual branded 404 experience featuring the interactive portrait and locale-aware navigation CTAs. */
export default function NotFoundView() {
  const { locale } = useLocale();
  const copy = getUiCopy(locale).notFound;
  const homeHref = localizePath("/", locale);
  const workHref = localizePath("/#my-work", locale);

  return (
    <section className="relative flex min-h-[calc(100dvh-10rem)] items-center pt-10 pb-16 lg:pt-28 lg:pb-12">
      <div className="mx-auto flex w-full max-w-section flex-col-reverse items-center justify-center gap-8 lg:flex-row lg:gap-12">
        <div className="flex basis-auto flex-col items-center lg:basis-1/2 lg:items-start">
          <p
            aria-hidden="true"
            className="font-headline text-6xl tracking-wider text-primary-500/90 dark:text-primary-300/90 sm:text-7xl lg:text-8xl"
          >
            404
          </p>

          <h1 className="mt-2 font-headline text-center lg:text-left">
            {copy.heading}
          </h1>

          <p className="mt-3 max-w-xl text-center text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base lg:mt-4 lg:text-left lg:text-lg">
            {copy.description}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href={homeHref}
              className="inline-flex items-center gap-2 rounded-full bg-primary-200 px-5 py-2.5 font-headline text-sm tracking-wide text-zinc-900 shadow-custom shadow-zinc-300 transition-all hover:bg-primary-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:shadow-none motion-reduce:transition-none sm:text-base"
            >
              <MdArrowBack aria-hidden="true" className="text-lg" />
              <span>{copy.homeCta}</span>
            </Link>

            <Link
              href={workHref}
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary-300 px-5 py-2.5 font-headline text-sm tracking-wide text-zinc-900 transition-all hover:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:border-zinc-500 dark:text-zinc-100 dark:hover:bg-dark-secondary-bg motion-reduce:transition-none sm:text-base"
            >
              <MdCode aria-hidden="true" className="text-lg" />
              <span>{copy.projectsCta}</span>
            </Link>
          </div>
        </div>

        <div className="flex w-full basis-auto items-center justify-center lg:basis-1/2">
          <HeroPortrait
            isVisible
            className="max-w-[16rem] sm:max-w-[20rem] lg:max-w-[28rem]"
          />
        </div>
      </div>
    </section>
  );
}
