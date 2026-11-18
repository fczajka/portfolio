"use client";

import { useLocale } from "@/components/Providers/LocaleProvider";
import { getContent } from "@/data/content";
import type { MobileMenuProps } from "@/types";
import { MdMenu } from "react-icons/md";

export default function MenuButton({ isOpen, handleMenu }: MobileMenuProps) {
  const { locale } = useLocale();
  const { buttons } = getContent(locale).mobileNavbar;

  const buttonsStyles = [
    `absolute ${isOpen ? "translate-y-10" : "translate-y-0"}`,
    `${isOpen ? "translate-y-0" : "translate-y-10"}`,
  ];

  return (
    <li className="basis-1/5">
      <div className="flex h-full flex-col justify-center items-center text-xs min-[400px]:text-sm">
        <MdMenu />
        <div className="overflow-y-hidden flex flex-col">
          {buttons.map((button, index) => (
            <button
              key={button.aria}
              onClick={handleMenu}
              aria-label={button.aria}
              type="button"
              className={`transition-transform ${buttonsStyles[index]}`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </li>
  );
}
