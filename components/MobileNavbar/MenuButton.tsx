import { mobileNavbar } from "@/public/content";
import { MobileMenuProps } from "@/public/types";
import { MdMenu } from "react-icons/md";

export default function MenuButton({ isOpen, handleMenu }: MobileMenuProps) {
  const { buttons } = mobileNavbar;

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
              key={button.text}
              onClick={handleMenu}
              aria-label={button.aria}
              type="button"
              className={`transition-all ${buttonsStyles[index]}`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </li>
  );
}
