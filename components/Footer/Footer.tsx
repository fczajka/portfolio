"use client";

import { useLocale } from "@/components/Providers/LocaleProvider";
import { getContent, getUiCopy } from "@/data/content";
import { MdArrowUpward } from "react-icons/md";

export default function Footer() {
  const { locale } = useLocale();
  const { name, tagline, links, socials } = getContent(locale).footer;
  const uiCopy = getUiCopy(locale).footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 pt-10 pb-20 min-[400px]:pb-24 dark:border-zinc-800 lg:mt-16 lg:px-12 lg:pb-10">
      <div className="mx-auto max-w-section flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <p className="font-headline text-xl sm:text-2xl tracking-wide text-zinc-900 dark:text-zinc-100">
              {name}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {tagline}
            </p>
          </div>

          <nav aria-label={uiCopy.navAria}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-3">
            {socials.map((social) => {
              const SocialIcon = social.icon;
              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noopener noreferrer" : undefined}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-lg text-zinc-900 transition-colors hover:bg-primary-200 dark:bg-dark-secondary-bg dark:text-zinc-200 dark:hover:bg-dark-tertiary-bg"
                  >
                    <SocialIcon aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-zinc-200/80 pt-6 text-xs text-zinc-600 dark:border-zinc-700/60 dark:text-zinc-400 sm:flex-row">
          <p className="text-xs sm:text-sm">
            © {currentYear} {name}. {uiCopy.rightsReserved}
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 font-semibold text-zinc-800 transition-colors hover:text-primary-700 dark:text-zinc-200 dark:hover:text-primary-300"
          >
            <span>{uiCopy.backToTop}</span>
            <MdArrowUpward aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
