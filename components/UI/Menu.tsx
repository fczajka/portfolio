import { menu } from "@/public/content";
import { headlineFont } from "@/public/fonts";
import { MenuProps } from "@/public/types";
import ToggleTheme from "./ToggleTheme";

export default function Menu({ wantsToSee, handleMenu }: MenuProps) {
  const { icons, links } = menu;

  const iconsDelays = [
    "[animation-delay:0.7s]",
    "[animation-delay:0.8s]",
    "[animation-delay:0.9s]",
  ];

  const linksDelays = [
    "[animation-delay:1.3s]",
    "[animation-delay:1.6s]",
    "[animation-delay:1.9s]",
    "[animation-delay:2.2s]",
  ];

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  return (
    <div
      className={`fixed w-full h-screen top-0 pt-16 bg-zinc-50 z-10 px-12 touch-none lg:pt-32 ${
        wantsToSee
          ? "animate-show-menu-mobile lg:animate-show-menu-desktop"
          : "animate-hide-menu-mobile lg:animate-hide-menu-desktop"
      } dark:bg-dark-primary-bg dark:text-zinc-200 motion-reduce:animate-none lg:motion-reduce:animate-none`}
    >
      <div className="flex items-center">
        <div className="w-24 h-1 bg-primary-200 animate-slide-in-bar [animation-delay:0.6s] motion-reduce:animate-none"></div>
        <ul className="flex flex-row items-center">
          {icons.map((icon, index) => (
            <li
              key={icon.key}
              className={`mx-6 text-xl sm:text-2xl lg:text-3xl animate-slide-in-right ${iconsDelays[index]} motion-reduce:animate-none`}
            >
              {icon.type === "link" ? (
                <a target="_blank" rel="noopener noreferrer" href={icon.href}>
                  <icon.icon />
                </a>
              ) : (
                <a href={`mailto:${icon.href}`}>
                  <icon.icon />
                </a>
              )}
            </li>
          ))}
          <li>
            <ToggleTheme style="animate-slide-in-right [animation-delay:1s] motion-reduce:animate-none lg:hidden" />
          </li>
        </ul>
      </div>
      <div className="w-full h-full py-8 pb-24 lg:py-16">
        <ul className="w-full h-full flex flex-col justify-between max-h-96 sm:w-3/5 lg:w-1/2 lg:max-h-112 xl:w-2/5 2xl:w-1/3">
          {links.map((link, index) => (
            <li
              key={link.text}
              className={`flex flex-col items-start justify-between animate-show-up-down ${linksDelays[index]} motion-reduce:animate-none sm:flex-row sm:items-end`}
            >
              <a
                href={link.href}
                onClick={handleMenu}
                className={`text-xl sm:text-3xl lg:text-6xl ${headlineFont.variable} font-headline`}
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
