"use client";

import { useLocale } from "@/components/Providers/LocaleProvider";
import { getContent } from "@/data/content";
import type { MobileMenuProps } from "@/types";
import Link from "./Link";
import MenuButton from "./MenuButton";

export default function Links({ isOpen, handleMenu }: MobileMenuProps) {
  const { locale } = useLocale();
  const { links } = getContent(locale).mobileNavbar;

  return (
    <ul className="flex h-full">
      {links.map((link) => (
        <Link
          key={link.href}
          text={link.text}
          href={link.href}
          icon={link.icon}
        />
      ))}
      <MenuButton isOpen={isOpen} handleMenu={handleMenu} />
    </ul>
  );
}
