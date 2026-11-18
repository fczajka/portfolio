"use client";

import Image from "next/image";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import ProjectLinks from "@/components/MyWork/ProjectLinks";
import RelatedProjectCard from "@/components/MyWork/RelatedProjectCard";
import Slider from "@/components/MyWork/Slider/Slider";
import TechStackPills from "@/components/MyWork/TechStackPills";
import { useLocale } from "@/components/Providers/LocaleProvider";
import { getContent, getUiCopy } from "@/data/content";
import { toProjectSlug } from "@/helpers/projects";

type ProjectCaseStudyViewProps = {
  slug: string;
};

/** Client case study body reading active EN/PL locale while preserving static route metadata on the server. */
export default function ProjectCaseStudyView({
  slug,
}: ProjectCaseStudyViewProps) {
  const { locale } = useLocale();
  const { projects } = getContent(locale).myWork;
  const uiCopy = getUiCopy(locale).projectPage;

  const project = projects.find((item) => toProjectSlug(item.name) === slug);
  if (!project) return null;

  const relatedProjects = projects.filter(
    (item) => toProjectSlug(item.name) !== slug,
  );

  return (
    <section className="pt-10 pb-16 px-4 lg:pt-28 lg:px-12">
      <div className="mx-auto max-w-section">
        <Link
          href="/#my-work"
          className="inline-flex items-center gap-2 rounded-full bg-zinc-200/70 px-4 py-1.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 dark:bg-dark-secondary-bg dark:text-zinc-200 dark:hover:bg-dark-tertiary-bg"
        >
          <MdArrowBack aria-hidden="true" />
          <span>{uiCopy.backToAll}</span>
        </Link>

        <div className="mt-8 rounded-primary bg-zinc-200/80 p-5 dark:bg-dark-secondary-bg/90 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/70 p-1 dark:bg-dark-tertiary-bg">
                <Image
                  src={project.logo}
                  alt={uiCopy.logoAlt(project.name)}
                  className="h-full w-full rounded-xl object-cover"
                />
              </div>
              <div>
                <span className="inline-block text-xs font-semibold tracking-wide text-primary-700 dark:text-primary-200">
                  {project.platform}
                </span>
                <h1 className="mt-0.5 text-left text-3xl sm:text-4xl lg:text-5xl font-headline tracking-tight text-zinc-900 dark:text-zinc-100">
                  {project.name}
                </h1>
              </div>
            </div>
            <ProjectLinks links={project.links} />
          </div>

          <div
            className={`mt-8 flex flex-col items-stretch gap-8 lg:grid lg:gap-10 ${
              project.imagesInFormat === "3:4"
                ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
                : "lg:grid-cols-2"
            }`}
          >
            <div className="flex flex-col justify-between gap-6">
              <div>
                <h2 className="font-headline text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100">
                  {uiCopy.overviewHeading}
                </h2>

                <div className="mt-4 space-y-5">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {uiCopy.problemLabel}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {project.caseStudy.challenge}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {uiCopy.architectureLabel}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {project.caseStudy.architecture}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {uiCopy.highlightsLabel}
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {project.caseStudy.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2.5"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600 dark:bg-primary-400"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-headline text-lg text-zinc-900 dark:text-zinc-100">
                  {uiCopy.technologiesLabel}
                </h3>
                <TechStackPills techStack={project.techStack} immediate />
              </div>
            </div>

            <div className="min-w-0 rounded-primary">
              <Slider
                images={project.images}
                imagesInFormat={project.imagesInFormat}
                projectName={project.name}
                immediate
              />
            </div>
          </div>
        </div>

        {relatedProjects.length > 0 && (
          <div className="mt-14">
            <h2 className="font-headline text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
              {uiCopy.moreProjects}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {relatedProjects.map((item) => (
                <RelatedProjectCard
                  key={item.name}
                  project={item}
                  slug={toProjectSlug(item.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
