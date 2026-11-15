"use client";

import Image from "next/image";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { logoHoverCardClasses } from "@/components/UI/constants";
import { useLogoBorderColors } from "@/hooks/useLogoBorderColors";
import type { ProjectItem } from "@/types";

type RelatedProjectCardProps = {
  project: ProjectItem;
  slug: string;
};

/** Borderless related-project card with logo-derived average-color hover border. */
export default function RelatedProjectCard({
  project,
  slug,
}: RelatedProjectCardProps) {
  const { containerRef, logoImgRef, applyLogoBorderColor } =
    useLogoBorderColors<HTMLAnchorElement>();

  return (
    <Link
      ref={containerRef}
      href={`/projects/${slug}`}
      className={`group flex flex-col justify-between rounded-2xl bg-zinc-100/90 p-5 shadow-custom shadow-zinc-300/60 transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-secondary-bg/90 dark:shadow-none motion-reduce:transition-none motion-reduce:hover:scale-100 ${logoHoverCardClasses}`}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-primary-700 dark:text-primary-200">
            {project.platform}
          </span>
          <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg">
            <Image
              ref={logoImgRef}
              src={project.logo}
              alt={`${project.name} logo`}
              onLoad={(event) => applyLogoBorderColor(event.currentTarget)}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <h3 className="mt-2 font-headline text-xl text-zinc-900 dark:text-zinc-100">
          {project.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
          {project.shortDesc}
        </p>
      </div>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-700 transition-all group-hover:gap-2 dark:text-primary-300">
        <span>View case study</span>
        <MdArrowForward aria-hidden="true" />
      </span>
    </Link>
  );
}
