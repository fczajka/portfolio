"use client";

import { useEffect, useRef } from "react";
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
      className={`fixed w-full h-dvh top-0 pt-16 bg-zinc-50 z-10 px-12 overflow-y-auto outline-none lg:pt-32 ${
        wantsToSee
          ? "animate-show-menu-mobile lg:animate-show-menu-desktop"
          : "animate-hide-menu-mobile lg:animate-hide-menu-desktop"
      } dark:bg-dark-primary-bg dark:text-zinc-200 motion-reduce:animate-none lg:motion-reduce:animate-none`}
    >
      <div className="flex items-center">
        <div className="w-24 h-1 bg-primary-200 animate-show-down-up [animation-delay:0.5s] motion-reduce:animate-none"></div>
        <ul className="flex flex-row items-center">
          {icons.map((icon, index) => (
            <li
              key={icon.key}
              className={`mx-6 text-xl sm:text-2xl lg:text-3xl animate-show-down-up ${iconsDelays[index]} motion-reduce:animate-none`}
            >
              {icon.type === "link" ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={icon.href}
                  aria-label={icon.label}
                >
                  <icon.icon aria-hidden="true" />
                </a>
              ) : (
                <a href={`mailto:${icon.href}`} aria-label={icon.label}>
                  <icon.icon aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
          <li>
            <ToggleTheme style="animate-show-down-up [animation-delay:1s] motion-reduce:animate-none lg:hidden" />
          </li>
          <li className="ml-3 animate-show-down-up [animation-delay:1.05s] motion-reduce:animate-none lg:hidden">
            <ToggleLocale />
          </li>
        </ul>
      </div>
      <div className="w-full h-full py-8 pb-24 lg:py-16">
        <ul className="w-full h-full flex flex-col justify-between max-h-96 sm:w-3/5 lg:w-1/2 lg:max-h-112 xl:w-2/5 2xl:w-1/3">
          {links.map((link, index) => (
            <li
              key={link.href}
              className={`flex flex-col items-start justify-between animate-show-up-down ${
                linksDelays[index % linksDelays.length]
              } motion-reduce:animate-none sm:flex-row sm:items-end`}
            >
              <a
                href={link.href}
                onClick={handleMenu}
                className="text-xl sm:text-3xl lg:text-6xl font-headline"
              >
                {link.text}
              </a>
              <p className="text-sm sm:text-base lg:text-lg">{link.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
