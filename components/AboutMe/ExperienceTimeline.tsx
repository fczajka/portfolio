"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AiFillLinkedin } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { MdArrowForward, MdDownload } from "react-icons/md";
import type { ExperienceSnapshot } from "@/types";
import TimelineMilestoneItem from "./TimelineMilestoneItem";

type ExperienceTimelineProps = {
  experience: ExperienceSnapshot;
};

type TimelineGeometry = {
  trackTop: number;
  trackHeight: number;
  progressPx: number;
  activeCount: number;
};

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Scroll-progress career & capabilities timeline with sticky overview and milestone checkpoints. */
export default function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  const { badge, headline, summary, cv, coreStack, milestones } = experience;
  const listRef = useRef<HTMLOListElement | null>(null);
  const checkpointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [geometry, setGeometry] = useState<TimelineGeometry>({
    trackTop: 28,
    trackHeight: 0,
    progressPx: 0,
    activeCount: milestones.length > 0 ? 1 : 0,
  });

  const measureProgress = useCallback(() => {
    const listEl = listRef.current;
    if (!listEl || milestones.length === 0) return;

    const listRect = listEl.getBoundingClientRect();
    const centers = milestones
      .map((_, index) => {
        const dotEl = checkpointRefs.current[index];
        if (!dotEl) return null;
        const dotRect = dotEl.getBoundingClientRect();
        return dotRect.top - listRect.top + dotRect.height / 2;
      })
      .filter((value): value is number => value !== null);

    if (centers.length === 0) return;

    const firstCenter = centers[0];
    const lastCenter = centers[centers.length - 1];
    const trackHeight = Math.max(0, lastCenter - firstCenter);

    if (prefersReducedMotion) {
      setGeometry({
        trackTop: firstCenter,
        trackHeight,
        progressPx: trackHeight,
        activeCount: milestones.length,
      });
      return;
    }

    const reachedBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 48;
    const triggerY = window.innerHeight * 0.62;
    const rawProgress = reachedBottom
      ? trackHeight
      : triggerY - (listRect.top + firstCenter);
    const progressPx = clamp(rawProgress, 0, trackHeight);

    let activeCount = 0;
    for (let i = 0; i < centers.length; i++) {
      const offsetFromStart = centers[i] - firstCenter;
      if (
        progressPx >= offsetFromStart - 8 ||
        centers[i] + listRect.top <= triggerY
      ) {
        activeCount = i + 1;
      }
    }

    setGeometry((prev) => {
      if (
        Math.abs(prev.trackTop - firstCenter) < 0.5 &&
        Math.abs(prev.trackHeight - trackHeight) < 0.5 &&
        Math.abs(prev.progressPx - progressPx) < 0.5 &&
        prev.activeCount === activeCount
      ) {
        return prev;
      }
      return {
        trackTop: firstCenter,
        trackHeight,
        progressPx,
        activeCount,
      };
    });
  }, [milestones, prefersReducedMotion]);

  useEffect(() => {
    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(motionQuery?.matches ?? false);
    };
    updateMotionPreference();

    const scheduleMeasure = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        measureProgress();
      });
    };

    measureProgress();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && listRef.current
        ? new ResizeObserver(scheduleMeasure)
        : null;
    if (resizeObserver && listRef.current) {
      resizeObserver.observe(listRef.current);
    }

    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    motionQuery?.addEventListener?.("change", updateMotionPreference);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
      motionQuery?.removeEventListener?.("change", updateMotionPreference);
    };
  }, [measureProgress]);

  const cvHref = cv.downloadUrl ?? cv.href;
  const hasDirectCv = Boolean(cv.downloadUrl);
  const isExternalCv = /^https?:\/\//i.test(cvHref);

  return (
    <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
        <span className="inline-flex items-center rounded-full bg-primary-100/80 px-3.5 py-1 text-xs font-semibold tracking-wide text-primary-800 dark:bg-primary-500/15 dark:text-primary-200">
          {badge}
        </span>
        <h3 className="mt-4 font-headline text-2xl sm:text-3xl lg:text-4xl tracking-tight text-zinc-900 dark:text-zinc-100">
          {headline}
        </h3>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {summary}
        </p>

        <div className="mt-6 space-y-3 rounded-2xl bg-zinc-100/80 p-4 dark:bg-dark-secondary-bg/80">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Core Stack
          </p>
          <div className="space-y-3">
            {coreStack.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  {group.category}
                </p>
                <ul className="mt-1.5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-zinc-200/80 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-dark-tertiary-bg dark:text-zinc-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={cvHref}
            target={isExternalCv ? "_blank" : undefined}
            rel={isExternalCv ? "noopener noreferrer" : undefined}
            download={hasDirectCv ? true : undefined}
            className="inline-flex items-center gap-2 rounded-full bg-primary-200 px-5 py-2.5 font-headline text-sm sm:text-base tracking-wide text-zinc-900 transition-colors hover:bg-primary-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 motion-reduce:transition-none"
          >
            {hasDirectCv ? (
              <MdDownload aria-hidden="true" className="text-lg" />
            ) : (
              <FiFileText aria-hidden="true" className="text-base" />
            )}
            <span>{cv.label}</span>
            {!hasDirectCv && (
              <MdArrowForward aria-hidden="true" className="text-base" />
            )}
          </a>
          <a
            href="https://www.linkedin.com/in/franciszek-czajka/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-200/80 px-4 py-2.5 font-headline text-sm sm:text-base tracking-wide text-zinc-900 transition-colors hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-secondary-bg dark:text-zinc-100 dark:hover:bg-dark-tertiary-bg motion-reduce:transition-none"
          >
            <AiFillLinkedin aria-hidden="true" className="text-lg" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="lg:col-span-7 relative">
        {geometry.trackHeight > 0 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[17px] w-0.5 -translate-x-1/2 overflow-hidden rounded-full bg-zinc-300 dark:bg-zinc-700/70 sm:left-[19px]"
            style={{
              top: `${geometry.trackTop}px`,
              height: `${geometry.trackHeight}px`,
            }}
          >
            <div
              className="w-full rounded-full bg-primary-500 transition-[height] duration-150 ease-out dark:bg-primary-300 motion-reduce:transition-none"
              style={{ height: `${geometry.progressPx}px` }}
            />
          </div>
        )}
        <ol ref={listRef} className="relative space-y-6">
          {milestones.map((milestone, index) => (
            <TimelineMilestoneItem
              key={milestone.step}
              milestone={milestone}
              stepNumber={index + 1}
              isActive={prefersReducedMotion || index < geometry.activeCount}
              checkpointRef={(el) => {
                checkpointRefs.current[index] = el;
              }}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}
