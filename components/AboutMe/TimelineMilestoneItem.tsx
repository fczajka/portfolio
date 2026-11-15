"use client";

import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiCpu,
  FiGlobe,
  FiSmartphone,
} from "react-icons/fi";
import { logoHoverCardClasses } from "@/components/UI/constants";
import { useLogoBorderColors } from "@/hooks/useLogoBorderColors";
import type { ExperienceMilestone, TimelineIconKey } from "@/types";

const MILESTONE_ICONS: Record<TimelineIconKey, IconType> = {
  enterprise: FiBriefcase,
  code: FiCode,
  web: FiGlobe,
  mobile: FiSmartphone,
  ai: FiCpu,
  education: FiBookOpen,
};

type TimelineMilestoneItemProps = {
  milestone: ExperienceMilestone;
  stepNumber: number;
  isActive: boolean;
  checkpointRef: (el: HTMLDivElement | null) => void;
};

/** Single timeline checkpoint row with company logo and average-logo-color hover border matching project cards. */
export default function TimelineMilestoneItem({
  milestone,
  stepNumber,
  isActive,
  checkpointRef,
}: TimelineMilestoneItemProps) {
  const { containerRef, logoImgRef, applyLogoBorderColor } =
    useLogoBorderColors<HTMLElement>();
  const FallbackIcon = milestone.icon
    ? MILESTONE_ICONS[milestone.icon]
    : undefined;

  return (
    <li className="relative flex items-start gap-4 sm:gap-6">
      <div
        ref={checkpointRef}
        aria-hidden="true"
        className={`relative z-10 mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-headline text-sm transition-all duration-300 sm:h-10 sm:w-10 motion-reduce:transition-none ${
          isActive
            ? "bg-primary-500 text-white shadow-[0_0_18px_rgba(59,130,246,0.45)] ring-4 ring-primary-200/70 dark:bg-primary-300 dark:text-zinc-950 dark:shadow-[0_0_18px_rgba(147,197,253,0.45)] dark:ring-primary-400/20"
            : "bg-zinc-200 text-zinc-500 dark:bg-dark-tertiary-bg dark:text-zinc-400"
        }`}
      >
        {stepNumber}
      </div>

      <article
        ref={containerRef}
        data-active={isActive ? "true" : "false"}
        className={`flex-1 origin-left rounded-2xl p-5 transition-all duration-300 hover:scale-[1.01] hover:opacity-100 sm:p-6 motion-reduce:transition-none motion-reduce:hover:scale-100 ${logoHoverCardClasses} ${
          isActive
            ? "bg-zinc-100/95 shadow-custom shadow-zinc-300/60 dark:bg-dark-secondary-bg/95 dark:shadow-none"
            : "bg-zinc-100/60 opacity-80 dark:bg-dark-secondary-bg/60"
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {milestone.logo ? (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                <Image
                  ref={logoImgRef}
                  src={milestone.logo}
                  alt={milestone.logoAlt ?? `${milestone.eyebrow} logo`}
                  onLoad={(event) => applyLogoBorderColor(event.currentTarget)}
                  width={40}
                  height={40}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
            ) : (
              FallbackIcon && (
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 motion-reduce:transition-none ${
                    isActive
                      ? "bg-primary-200/80 text-primary-800 dark:bg-primary-400/20 dark:text-primary-200"
                      : "bg-zinc-200/80 text-zinc-600 dark:bg-dark-tertiary-bg dark:text-zinc-400"
                  }`}
                >
                  <FallbackIcon aria-hidden="true" className="text-lg" />
                </span>
              )
            )}
            <p className="text-xs font-semibold tracking-wide text-zinc-600 dark:text-zinc-400">
              {milestone.eyebrow}
            </p>
          </div>
          {milestone.period && (
            <span className="rounded-full bg-zinc-200/80 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-dark-tertiary-bg dark:text-zinc-300">
              {milestone.period}
            </span>
          )}
        </div>

        <h4 className="mt-3 text-left font-headline text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100">
          {milestone.title}
        </h4>
        {milestone.location && (
          <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            {milestone.location}
          </p>
        )}
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          {milestone.description}
        </p>

        {milestone.roles && milestone.roles.length > 0 && (
          <div className="mt-4 ml-1.5 space-y-3 border-l-2 border-zinc-300/80 pl-4 dark:border-zinc-700/80">
            {milestone.roles.map((role) => (
              <div key={`${role.title}-${role.period}`} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-300"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-headline text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                    {role.title}
                  </p>
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {role.period}
                    {role.workMode ? ` · ${role.workMode}` : ""}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <ul className="mt-4 flex flex-wrap gap-2">
          {milestone.highlights.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-semibold text-zinc-800 dark:bg-dark-tertiary-bg dark:text-zinc-200"
            >
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
