"use client";

import { useLocale } from "@/components/Providers/LocaleProvider";
import { getContent } from "@/data/content";
import type { MobileMenuProps } from "@/types";
import { MdMenu } from "react-icons/md";

export default function MenuButton({ isOpen, handleMenu }: MobileMenuProps) {
  const { locale } = useLocale();
  const { buttons } = getContent(locale).mobileNavbar;
  const activeButton = isOpen ? buttons[1] : buttons[0];

  return (
    <li className="basis-1/5 flex justify-center items-center">
      <button
        onClick={handleMenu}
        aria-label={activeButton.aria}
        aria-expanded={isOpen}
        type="button"
        className="flex h-full w-full flex-col justify-center items-center text-xs min-[400px]:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-400"
      >
        <MdMenu aria-hidden="true" />
        <span className="relative grid place-items-center overflow-hidden">
          {buttons.map((button, index) => {
            const isActive = isOpen ? index === 1 : index === 0;
            const hiddenTranslate =
              index === 0 ? "-translate-y-full" : "translate-y-full";

            return (
              <span
                key={button.aria}
                aria-hidden={!isActive}
                className={`col-start-1 row-start-1 whitespace-nowrap transition-transform duration-200 motion-reduce:transition-none ${
                  isActive ? "translate-y-0" : hiddenTranslate
                }`}
              >
                {button.text}
              </span>
            );
          })}
        </span>
      </button>
    </li>
  );
}
