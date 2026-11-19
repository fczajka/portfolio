"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLocale } from "@/components/Providers/LocaleProvider";
import { getUiCopy } from "@/data/content";
import useDialogAccessibility from "@/hooks/useDialogAccessibility";
import useSwipeNavigation from "@/hooks/useSwipeNavigation";
import type { MyWorkPhotos } from "@/types";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

type LightboxProps = {
  images: MyWorkPhotos;
  currentIndex: number;
  projectName?: string;
  onSelectIndex: (nextIndex: number) => void;
  onClose: () => void;
};

export default function Lightbox({
  images,
  currentIndex,
  projectName,
  onSelectIndex,
  onClose,
}: LightboxProps) {
  const { locale } = useLocale();
  const uiCopy = getUiCopy(locale).slider;
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const safeIndex =
    ((currentIndex % images.length) + images.length) % images.length;
  const activeImage = images[safeIndex];

  const handlePrev = () => {
    onSelectIndex((safeIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onSelectIndex((safeIndex + 1) % images.length);
  };

  useDialogAccessibility({
    isOpen: true,
    dialogRef: lightboxRef,
    initialFocusRef: closeBtnRef,
    trapFocus: true,
    lockScroll: false,
    restoreFocus: true,
  });

  const swipeHandlers = useSwipeNavigation({
    onPrev: handlePrev,
    onNext: handleNext,
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        onSelectIndex((safeIndex - 1 + images.length) % images.length);
      } else if (event.key === "ArrowRight") {
        onSelectIndex((safeIndex + 1) % images.length);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [safeIndex, images.length, onSelectIndex]);

  if (!activeImage) return null;

  return (
    <div
      ref={lightboxRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={uiCopy.lightboxAria(projectName)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/85 p-4 backdrop-blur-xs touch-pan-y outline-none sm:p-8"
      {...swipeHandlers}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label={uiCopy.closeLightboxAria}
        className="absolute top-4 right-4 z-10 rounded-full text-3xl text-zinc-100 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:top-6 sm:right-6 sm:text-4xl"
      >
        <AiFillCloseCircle aria-hidden="true" />
      </button>

      <div className="relative flex w-full max-w-5xl items-center justify-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={handlePrev}
          aria-label={uiCopy.prevAria}
          className="rounded-full bg-zinc-900/80 p-1.5 text-3xl text-zinc-50 transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:text-4xl"
        >
          <BsArrowLeftShort aria-hidden="true" />
        </button>

        <div className="flex min-w-0 max-h-[78dvh] max-w-full items-center justify-center overflow-hidden rounded-2xl bg-zinc-950/60 p-1">
          <Image
            src={activeImage.image}
            alt={activeImage.alt}
            className="max-h-[75dvh] w-auto max-w-full rounded-xl object-contain"
            sizes="(max-width: 768px) 92vw, 1024px"
          />
        </div>

        <button
          type="button"
          onClick={() => onSelectIndex((safeIndex + 1) % images.length)}
          aria-label={uiCopy.nextAria}
          className="rounded-full bg-zinc-900/80 p-1.5 text-3xl text-zinc-50 transition-colors hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:text-4xl"
        >
          <BsArrowRightShort aria-hidden="true" />
        </button>
      </div>

      <p className="mt-4 max-w-2xl text-center text-xs text-zinc-300 sm:text-sm">
        <span className="font-semibold text-primary-300">
          {safeIndex + 1} / {images.length}
        </span>
        {" — "}
        {activeImage.alt}
      </p>
    </div>
  );
}
