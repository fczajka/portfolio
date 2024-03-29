"use client";

import { useState } from "react";
import { headlineFont } from "@/public/fonts";
import { header, menu } from "@/public/content";
import Menu from "../UI/Menu";
import ToggleTheme from "../UI/ToggleTheme";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [wantsToSee, setWantsToSee] = useState(false);
  const { links } = header;
  const { buttons } = menu;

  const buttonsStyles = [
    `absolute ${isOpen ? "-translate-y-10" : "-translate-y-0"}`,
    `${isOpen ? "-translate-y-0" : "-translate-y-10"}`,
  ];

  const handleMenu = () => {
    setWantsToSee(!wantsToSee);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    console.log(prefersReducedMotion);
    if (prefersReducedMotion && isOpen) {
      setIsOpen(!isOpen);
      return;
    }
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(!isOpen);
      }, 700);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <header className="hidden lg:flex lg:justify-between">
        <div className="flex basis-1/2 h-full pl-10 items-center">
          <div className="relative overflow-y-hidden pr-2">
            {buttons.map((button, index) => (
              <button
                key={button.text}
                onClick={handleMenu}
                aria-label={button.aria}
                type="button"
                className={`text-xl pl-2 transition-all ${headlineFont.variable} font-headline tracking-wider ${buttonsStyles[index]} hover:pl-1.5 hover:tracking-widest motion-reduce:transition-none`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
        <nav className="basis-1/2 max-w-5xl">
          <ul className="flex items-center h-full">
            {links.map((link) => (
              <li key={link.text} className="basis-1/5 text-center">
                <a
                  href={link.href}
                  className="relative inline-block after:[content:''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:transform_0.25s_ease-out] hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline dark:after:bg-zinc-500"
                >
                  {link.text}
                </a>
              </li>
            ))}
            <li className="basis-1/5">
              <ToggleTheme />
            </li>
          </ul>
        </nav>
      </header>
      {isOpen && <Menu wantsToSee={wantsToSee} handleMenu={handleMenu} />}
    </>
  );
}
