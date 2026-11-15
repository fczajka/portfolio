"use client";

import useDialogAccessibility from "@/hooks/useDialogAccessibility";
import useModalDismiss from "@/hooks/useModalDismiss";
import type { ProjectDetailsProps } from "@/types";
import { useCallback, useRef, useState } from "react";
import ProjectDetailsBody from "./ProjectDetailsBody";
import ProjectDetailsHeader from "./ProjectDetailsHeader";
import ProjectLinks from "./ProjectLinks";

/** Accessible project details modal combining header controls, media slider, and external links. */
export default function ProjectDetails({
  isOpen,
  onClose,
  name,
  slug,
  platform,
  longDesc,
  techStack,
  images,
  links,
  imagesInFormat,
}: ProjectDetailsProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const { wantsToClose, triggerClose } = useModalDismiss({
    containerRef: elRef,
    onClose,
    isSuspended: isLightboxOpen,
    onSuspendedEscape: handleCloseLightbox,
  });

  useDialogAccessibility({
    isOpen: isOpen && !wantsToClose,
    dialogRef: elRef,
    initialFocusRef: closeButtonRef,
    trapFocus: !isLightboxOpen,
    lockScroll: true,
    restoreFocus: true,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-details-title"
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center p-4 bg-zinc-800/90 z-40 overflow-y-auto ${
        wantsToClose ? "animate-fade-out" : "animate-fade-in"
      } motion-reduce:animate-none`}
    >
      <div
        ref={elRef}
        tabIndex={-1}
        className={`basis-full max-h-[92vh] overflow-y-auto bg-zinc-50 p-4 flex flex-col rounded-primary shadow-lg shadow-zinc-800 max-w-sm outline-none dark:bg-dark-secondary-bg dark:text-zinc-200 ${
          wantsToClose
            ? "animate-slide-down-project-details-mobile lg:animate-slide-down-project-details-desktop"
            : "animate-show-project-details"
        } motion-reduce:animate-none sm:p-6 lg:h-min lg:max-w-3xl xl:max-w-4xl`}
      >
        <ProjectDetailsHeader
          name={name}
          slug={slug}
          platform={platform}
          closeButtonRef={closeButtonRef}
          onClose={triggerClose}
        />
        <ProjectDetailsBody
          name={name}
          longDesc={longDesc}
          techStack={techStack}
          images={images}
          imagesInFormat={imagesInFormat}
          isLightboxOpen={isLightboxOpen}
          onLightboxChange={setIsLightboxOpen}
        />
        <ProjectLinks links={links} />
      </div>
    </div>
  );
}
