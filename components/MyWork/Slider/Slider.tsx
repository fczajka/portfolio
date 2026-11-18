"use client";

import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import useSwipeNavigation from "@/hooks/useSwipeNavigation";
import type { SliderProps } from "@/types";
import Images from "./Images";
import Buttons from "./Buttons";
import Indicators from "./Indicators";
import Lightbox from "./Lightbox";

export default function Slider({
  images,
  imagesInFormat,
  projectName,
  isLightboxOpen,
  onLightboxChange,
  immediate = false,
}: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [internalLightboxOpen, setInternalLightboxOpen] = useState(false);
  const indexes = Array.from(Array(images.length).keys());

  const lightboxOpen = isLightboxOpen ?? internalLightboxOpen;
  const setLightboxOpen: Dispatch<SetStateAction<boolean>> =
    onLightboxChange ?? setInternalLightboxOpen;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const swipeHandlers = useSwipeNavigation({
    onPrev: handlePrev,
    onNext: handleNext,
  });

  useEffect(() => {
    if (lightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, images.length]);

  const activeImage = images[currentIndex] ?? images[0];

  const imageAnim = immediate
    ? ""
    : "animate-fade-in [animation-delay:0.8s] motion-reduce:animate-none";
  const captionAnim = immediate
    ? ""
    : "animate-fade-in [animation-delay:1s] motion-reduce:animate-none";
  const controlsAnim = immediate
    ? ""
    : "animate-fade-in [animation-delay:1.1s] motion-reduce:animate-none";

  return (
    <div className="w-full min-w-0 h-full flex flex-col">
      <div
        className={`rounded-[1.25rem] overflow-hidden ${imageAnim} ${
          imagesInFormat === "3:4"
            ? "aspect-[3/4] max-w-[260px] w-full mx-auto shrink-0 lg:max-w-none"
            : "aspect-square w-full shrink-0"
        }`}
      >
        <div className="relative w-full h-full touch-pan-y" {...swipeHandlers}>
          <Images
            images={images}
            currentIndex={currentIndex}
            imagesInFormat={imagesInFormat}
            onExpand={() => setLightboxOpen(true)}
          />
        </div>
      </div>
      {activeImage && (
        <div
          className={`mt-2.5 flex min-w-0 items-center justify-center gap-2 px-2 ${captionAnim}`}
        >
          <span className="shrink-0 rounded-full bg-primary-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-800 dark:bg-dark-tertiary-bg dark:text-primary-200">
            {currentIndex + 1}/{images.length}
          </span>
          <p
            title={activeImage.alt}
            className="min-w-0 truncate text-xs text-zinc-600 dark:text-zinc-300"
          >
            {activeImage.alt}
          </p>
        </div>
      )}
      <div
        className={`relative flex justify-center px-2 pt-1 pb-2 lg:px-4 lg:pb-3 ${controlsAnim}`}
      >
        <Buttons onPrev={handlePrev} onNext={handleNext} />
        <Indicators
          indexes={indexes}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          projectName={projectName}
          onSelectIndex={setCurrentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
