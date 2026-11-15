"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useAnimatedToggle from "@/hooks/useAnimatedToggle";
import { header, menu } from "@/data/content";
import Menu from "../UI/Menu";
import ToggleTheme from "../UI/ToggleTheme";

const SECTION_ANCHORS = [
  { id: "contact-me", href: "/#contact-me" },
  { id: "about-me", href: "/#about-me" },
  { id: "my-work", href: "/#my-work" },
];

export default function Header() {
  const pathname = usePathname();
  const { isOpen, wantsToSee, toggle: handleMenu } = useAnimatedToggle(700);
  const [activeHref, setActiveHref] = useState("/");
  const { links } = header;
  const { buttons } = menu;

  const buttonsStyles = [
    `absolute ${isOpen ? "-translate-y-10" : "-translate-y-0"}`,
    `${isOpen ? "-translate-y-0" : "-translate-y-10"}`,
  ];

  useEffect(() => {
    if (pathname.startsWith("/projects")) {
      setActiveHref("/#my-work");
      return;
    }

    const updateActiveSection = () => {
      if (window.scrollY < 160) {
        setActiveHref("/");
        return;
      }

      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40;
      if (reachedBottom) {
        setActiveHref("/#contact-me");
        return;
      }

      const scrollOffset = window.scrollY + 140;
      for (const section of SECTION_ANCHORS) {
        const el = document.getElementById(section.id);
        if (el) {
          const sectionTop = el.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollOffset) {
            setActiveHref(section.href);
            return;
          }
        }
      }

      setActiveHref("/");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
    };
  }, [pathname]);

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
                className={`text-xl pl-2 transition-all font-headline tracking-wider ${buttonsStyles[index]} hover:pl-1.5 hover:tracking-widest motion-reduce:transition-none`}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
        <nav className="basis-1/2 max-w-5xl">
          <ul className="flex items-center h-full">
            {links.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li
                  key={link.text}
                  className="basis-1/5 text-center whitespace-nowrap"
                >
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative inline-block transition-colors after:[content:''] after:absolute after:w-full after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:transform_0.25s_ease-out] hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline dark:after:bg-primary-300 ${
                      isActive
                        ? "font-semibold text-primary-700 after:scale-x-100 dark:text-primary-300"
                        : "after:scale-x-0"
                    }`}
                  >
                    {link.text}
                  </a>
                </li>
              );
            })}
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
