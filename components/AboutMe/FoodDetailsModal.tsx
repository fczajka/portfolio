"use client";

import Image from "next/image";
import { useRef } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { useLocale } from "@/components/Providers/LocaleProvider";
import {
  modalCardSurfaceClasses,
  modalOverlayClasses,
} from "@/components/UI/constants";
import { getUiCopy } from "@/data/content";
import useDialogAccessibility from "@/hooks/useDialogAccessibility";
import useModalDismiss from "@/hooks/useModalDismiss";
import type { FoodItem } from "@/types";

type FoodDetailsModalProps = {
  food: FoodItem;
  isOpen: boolean;
  onClose: () => void;
};

/** Accessible mini-modal showing kitchen notes, method, and highlights for a featured dish. */
export default function FoodDetailsModal({
  food,
  isOpen,
  onClose,
}: FoodDetailsModalProps) {
  const { locale } = useLocale();
  const uiCopy = getUiCopy(locale).foods;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { wantsToClose, triggerClose } = useModalDismiss({
    containerRef: dialogRef,
    onClose,
  });

  useDialogAccessibility({
    isOpen: isOpen && !wantsToClose,
    dialogRef,
    initialFocusRef: closeButtonRef,
    trapFocus: true,
    lockScroll: true,
    restoreFocus: true,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="food-details-title"
      className={`fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center overflow-y-auto p-4 ${modalOverlayClasses} ${
        wantsToClose ? "animate-fade-out" : "animate-fade-in"
      } motion-reduce:animate-none`}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`flex max-h-[92dvh] w-full max-w-md flex-col overflow-y-auto rounded-primary p-5 outline-none ${modalCardSurfaceClasses} sm:max-w-2xl sm:p-7 lg:max-w-3xl lg:p-8 xl:max-w-4xl ${
          wantsToClose
            ? "animate-slide-down-project-details-mobile lg:animate-slide-down-project-details-desktop"
            : "animate-show-project-details"
        } motion-reduce:animate-none`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              id="food-details-title"
              className="font-headline text-2xl text-zinc-900 dark:text-zinc-100 sm:text-3xl lg:text-4xl"
            >
              {food.name}
            </h3>
            <p className="mt-1 text-sm font-semibold tracking-wide text-primary-700 dark:text-primary-200 sm:text-base">
              {food.tagline}
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={triggerClose}
            aria-label={uiCopy.closeAria(food.name)}
            className="shrink-0 rounded-full text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 sm:text-3xl lg:text-4xl"
          >
            <AiFillCloseCircle aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <Image
              src={food.image}
              alt={food.alt}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 lg:gap-6">
            <div>
              <h4 className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:text-sm">
                {uiCopy.storyLabel}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base lg:text-lg">
                {food.story}
              </p>
            </div>

            <div>
              <h4 className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:text-sm">
                {uiCopy.prepLabel}
              </h4>
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-zinc-300/65 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:bg-dark-tertiary-bg dark:text-zinc-200 sm:text-sm">
                <FiClock aria-hidden="true" className="shrink-0 text-base" />
                <span>{food.prepNote}</span>
              </p>
            </div>

            <div>
              <h4 className="text-left text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 sm:text-sm">
                {uiCopy.highlightsLabel}
              </h4>
              <ul className="mt-2.5 flex flex-wrap gap-2.5">
                {food.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full bg-zinc-300/65 px-3.5 py-1.5 text-xs font-semibold text-zinc-800 dark:bg-dark-tertiary-bg dark:text-zinc-200 sm:text-sm"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
