"use client";

import Link from "next/link";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdCheck, MdLink, MdOpenInNew } from "react-icons/md";
import { useLocale } from "@/components/Providers/LocaleProvider";
import { getUiCopy } from "@/data/content";
import { copyTextToClipboard } from "@/helpers/helpers";

type ProjectDetailsHeaderProps = {
  name: string;
  slug: string;
  platform?: string;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
};

/** Header bar for ProjectDetails with title, platform label, share-link copy, full page link, and close button. */
export default function ProjectDetailsHeader({
  name,
  slug,
  platform,
  closeButtonRef,
  onClose,
}: ProjectDetailsHeaderProps) {
  const { locale } = useLocale();
  const uiCopy = getUiCopy(locale).projectModal;
  const copyTimerRef = useRef<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/projects/${slug}`;
    const copied = await copyTextToClipboard(shareUrl);
    if (!copied) return;

    setCopiedLink(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      copyTimerRef.current = null;
      setCopiedLink(false);
    }, 2000);
  };

  return (
    <div className="flex justify-between items-start gap-4">
      <div className="flex min-w-0 flex-wrap items-center gap-3 animate-show-down-up [animation-delay:0.4s] motion-reduce:animate-none">
        <h3 id="project-details-title" className="font-headline">
          {name}
        </h3>
        {platform && (
          <span className="text-xs font-semibold tracking-wide text-primary-700 dark:text-primary-200">
            {platform}
          </span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2 animate-show-down-up [animation-delay:0.4s] motion-reduce:animate-none">
        <Link
          href={`/projects/${slug}`}
          aria-label={uiCopy.fullPageAria(name)}
          className="inline-flex items-center gap-1 rounded-full bg-zinc-300/65 px-3 py-1 text-xs font-semibold text-zinc-800 transition-colors hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-tertiary-bg dark:text-zinc-200 dark:hover:bg-primary-500/20"
        >
          <MdOpenInNew aria-hidden="true" className="text-sm" />
          <span className="hidden sm:inline">{uiCopy.fullPage}</span>
        </Link>
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={
            copiedLink ? uiCopy.copiedLinkAria(name) : uiCopy.copyLinkAria(name)
          }
          className="inline-flex items-center gap-1 rounded-full bg-zinc-300/65 px-3 py-1 text-xs font-semibold text-zinc-800 transition-colors hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-tertiary-bg dark:text-zinc-200 dark:hover:bg-primary-500/20"
        >
          {copiedLink ? (
            <>
              <MdCheck aria-hidden="true" className="text-sm" />
              <span>{uiCopy.copied}</span>
            </>
          ) : (
            <>
              <MdLink aria-hidden="true" className="text-sm" />
              <span>{uiCopy.copyLink}</span>
            </>
          )}
        </button>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={uiCopy.closeAria(name)}
          className="text-xl rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:text-3xl"
        >
          <AiFillCloseCircle aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
