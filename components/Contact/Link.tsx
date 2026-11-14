"use client";

import { copyTextToClipboard } from "@/helpers/helpers";
import type { LinkProps } from "@/types";
import { useEffect, useRef, useState } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

export default function Link({
  href,
  icon: Icon,
  type,
  delay,
  isVisible,
}: LinkProps) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
    const ok = await copyTextToClipboard(href);
    if (!ok) return;

    setCopied(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      copyTimerRef.current = null;
      setCopied(false);
    }, 2000);
  };

  return (
    <li
      className={`my-6 opacity-0 text-xs min-[400px]:text-sm sm:text-base ${
        isVisible ? "animate-show-down-up" : ""
      }  motion-reduce:animate-none motion-reduce:opacity-100 ${delay}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={type === "link" ? href : `mailto:${href}`}
          target={type === "link" ? "_blank" : undefined}
          rel={type === "link" ? "noopener noreferrer" : undefined}
          className="flex relative items-center max-w-fit after:[content:''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-zinc-900 after:origin-bottom-right after:[transition:transform_0.25s_ease-out] hover:after:scale-x-100 hover:after:origin-bottom-left hover:after:motion-reduce:scale-x-0 hover:motion-reduce:underline dark:after:bg-zinc-500"
        >
          <Icon className="mr-2" aria-hidden="true" /> {href}
        </a>
        {type === "mail" && (
          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label={
              copied
                ? `Copied ${href} to clipboard`
                : `Copy email address ${href}`
            }
            className="inline-flex items-center gap-1 rounded-full bg-zinc-200/80 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 transition-colors hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-tertiary-bg dark:text-zinc-200 dark:hover:bg-primary-500/20"
          >
            {copied ? (
              <>
                <MdCheck aria-hidden="true" className="text-sm" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <MdContentCopy aria-hidden="true" className="text-xs" />
                <span>Copy</span>
              </>
            )}
          </button>
        )}
      </div>
    </li>
  );
}
