import { mobileNavbar } from "@/public/content";
import { MenuProps, MobileMenuProps } from "@/public/types";
import Link from "./Link";
import MenuButton from "./MenuButton";

export default function Links({ isOpen, handleMenu }: MobileMenuProps) {
  const { links } = mobileNavbar;

  return (
    <ul className="flex h-full">
      {links.map((link) => (
        <Link
          key={link.text}
          text={link.text}
          href={link.href}
          icon={link.icon}
        />
      ))}
      <MenuButton isOpen={isOpen} handleMenu={handleMenu} />
    </ul>
  );
}
