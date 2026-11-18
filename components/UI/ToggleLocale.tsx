"use client";

import type { MouseEvent } from "react";
import { useLocale } from "@/components/Providers/LocaleProvider";
import type { Locale } from "@/types";

type ToggleLocaleProps = {
  className?: string;
};

const LOCALE_OPTIONS: { code: Locale; label: string; ariaLabel: string }[] = [
  { code: "en", label: "EN", ariaLabel: "English" },
  { code: "pl", label: "PL", ariaLabel: "Polski" },
];

/** Accessible EN / PL segmented language toggle synced with LocaleProvider. */
export default function ToggleLocale({ className = "" }: ToggleLocaleProps) {
  const { locale, setLocale } = useLocale();
  const groupLabel = locale === "pl" ? "Wybierz język" : "Select language";

  const handleSelect = (code: Locale, event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const origin =
      rect.width > 0 || rect.height > 0
        ? {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }
        : undefined;
    setLocale(code, origin);
  };

  return (
    <div
      role="group"
      aria-label={groupLabel}
      className={`inline-flex items-center rounded-full bg-zinc-200/80 p-0.5 dark:bg-dark-tertiary-bg/90 ${className}`}
    >
      {LOCALE_OPTIONS.map((option) => {
        const isActive = locale === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={(event) => handleSelect(option.code, event)}
            aria-label={option.ariaLabel}
            aria-pressed={isActive}
            className={`rounded-full px-2.5 py-1 font-headline text-xs tracking-wider transition-colors motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
              isActive
                ? "bg-primary-200 text-zinc-900 shadow-xs dark:bg-primary-300 dark:text-zinc-950"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
