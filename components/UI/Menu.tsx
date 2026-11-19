"use client";

import { useEffect, useRef } from "react";
import { MdArrowForward } from "react-icons/md";
import { useLocale } from "@/components/Providers/LocaleProvider";
import useDialogAccessibility from "@/hooks/useDialogAccessibility";
import { getContent, getUiCopy } from "@/data/content";
import type { MenuProps } from "@/types";
import ToggleLocale from "./ToggleLocale";
import ToggleTheme from "./ToggleTheme";
import { iconsDelays, linksDelays } from "./constants";

export default function Menu({ wantsToSee, handleMenu }: MenuProps) {
  const { locale } = useLocale();
  const { icons, links } = getContent(locale).menu;
  const uiCopy = getUiCopy(locale).menu;
  const menuRef = useRef<HTMLDivElement>(null);

  useDialogAccessibility({
    isOpen: wantsToSee,
    dialogRef: menuRef,
    trapFocus: false,
    lockScroll: true,
    restoreFocus: true,
  });

  useEffect(() => {
    if (!wantsToSee) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleMenu();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [wantsToSee, handleMenu]);

  return (
    <div
      ref={menuRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={uiCopy.navAria}
      className={`fixed inset-0 z-[25] flex flex-col overflow-y-auto bg-zinc-50 px-6 pt-6 pb-20 min-[400px]:pb-24 outline-none sm:px-10 sm:pt-8 lg:px-12 lg:pt-32 lg:pb-12 ${
        wantsToSee
          ? "animate-show-menu-mobile lg:animate-show-menu-desktop"
          : "animate-hide-menu-mobile lg:animate-hide-menu-desktop"
      } dark:bg-dark-primary-bg dark:text-zinc-200 motion-reduce:animate-none lg:motion-reduce:animate-none`}
    >
      <div className="flex w-full flex-1 flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-zinc-200/80 pb-5 dark:border-zinc-800/80 lg:hidden">
          <div className="h-1 w-10 shrink-0 rounded-full bg-primary-300 dark:bg-primary-200 animate-show-down-up [animation-delay:0.2s] motion-reduce:animate-none" />
          <div className="flex shrink-0 items-center gap-3 animate-show-down-up [animation-delay:0.25s] motion-reduce:animate-none">
            <div className="shrink-0">
              <ToggleTheme />
            </div>
            <ToggleLocale />
          </div>
        </div>

        <nav
          aria-label={uiCopy.navAria}
          className="flex flex-1 flex-col justify-center py-6 lg:justify-start lg:py-16"
        >
          <ul className="flex w-full flex-col divide-y divide-zinc-200/75 dark:divide-zinc-800/80 lg:max-w-2xl lg:divide-y-0 lg:gap-8">
            {links.map((link, index) => (
              <li
                key={link.href}
                className={`animate-show-up-down ${
                  linksDelays[index % linksDelays.length]
                } motion-reduce:animate-none`}
              >
                <a
                  href={link.href}
                  onClick={handleMenu}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:rounded-xl sm:py-5 lg:py-0"
                >
                  <div className="flex flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-headline text-3xl tracking-wide text-zinc-900 transition-colors group-hover:text-primary-600 dark:text-zinc-100 dark:group-hover:text-primary-300 sm:text-4xl lg:text-6xl">
                      {link.text}
                    </span>
                    <span className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200 sm:text-base lg:text-lg">
                      {link.desc}
                    </span>
                  </div>
                  <MdArrowForward
                    aria-hidden="true"
                    className="shrink-0 text-xl text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600 dark:text-zinc-500 dark:group-hover:text-primary-300 sm:hidden"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center border-t border-zinc-200/80 pt-5 dark:border-zinc-800/80 lg:order-first lg:gap-8 lg:border-t-0 lg:pt-0">
          <div className="hidden h-1 w-24 shrink-0 bg-primary-200 animate-show-down-up [animation-delay:0.2s] motion-reduce:animate-none lg:block" />
          <ul className="flex flex-row items-center gap-3 lg:gap-8">
            {icons.map((icon, index) => {
              const Icon = icon.icon;
              const href =
                icon.type === "link" ? icon.href : `mailto:${icon.href}`;
              return (
                <li
                  key={icon.key}
                  className={`animate-show-down-up ${iconsDelays[index]} motion-reduce:animate-none`}
                >
                  <a
                    href={href}
                    aria-label={icon.label}
                    target={icon.type === "link" ? "_blank" : undefined}
                    rel={
                      icon.type === "link" ? "noopener noreferrer" : undefined
                    }
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-xl text-zinc-900 transition-colors hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-secondary-bg dark:text-zinc-200 dark:hover:bg-dark-tertiary-bg lg:h-auto lg:w-auto lg:rounded-none lg:bg-transparent lg:text-3xl lg:hover:bg-transparent lg:hover:text-primary-600 dark:lg:bg-transparent dark:lg:hover:bg-transparent dark:lg:hover:text-primary-300"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
