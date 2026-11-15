"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { myWork } from "@/data/content";
import { toProjectSlug } from "@/helpers/projects";
import type { ProjectCategory } from "@/types";
import Panel from "../UI/Panel";
import Project from "./Project";
import ProjectDetails from "./ProjectDetails";
import { delays } from "./constants";

type FilterValue = "all" | ProjectCategory;

export default function MyWork() {
  const { h2, desc, projects } = myWork;
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const openedViaPushRef = useRef(false);

  const findProjectBySlug = useCallback(
    (slugParam: string | null) => {
      if (!slugParam) return null;
      const normalized = slugParam.toLowerCase();
      return (
        projects.find(
          (project) => toProjectSlug(project.name) === normalized,
        ) ?? null
      );
    },
    [projects],
  );

  useEffect(() => {
    const syncFromUrl = () => {
      const slugParam = new URLSearchParams(window.location.search).get(
        "project",
      );
      const matched = findProjectBySlug(slugParam);
      openedViaPushRef.current = false;
      setOpenSlug(matched ? toProjectSlug(matched.name) : null);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => {
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, [findProjectBySlug]);

  const handleOpenProject = (slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("project", slug);
    window.history.pushState(
      { project: slug },
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
    openedViaPushRef.current = true;
    setOpenSlug(slug);
  };

  const handleCloseProject = useCallback(() => {
    setOpenSlug(null);
    if (openedViaPushRef.current) {
      openedViaPushRef.current = false;
      window.history.back();
      return;
    }

    const url = new URL(window.location.href);
    if (url.searchParams.has("project")) {
      url.searchParams.delete("project");
      window.history.replaceState(
        null,
        "",
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
  }, []);

  const webCount = projects.filter((p) => p.category === "web").length;
  const mobileCount = projects.filter((p) => p.category === "mobile").length;

  const filterOptions: { value: FilterValue; label: string; count: number }[] =
    [
      { value: "all", label: "All", count: projects.length },
      { value: "web", label: "Web", count: webCount },
      { value: "mobile", label: "Mobile", count: mobileCount },
    ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const activeProject = findProjectBySlug(openSlug);

  return (
    <section id="my-work">
      <div className="mx-auto max-w-section">
        <Panel headline={h2} desc={desc} />

        <div
          role="group"
          aria-label="Filter projects by platform"
          className="flex flex-wrap items-center gap-2.5 mt-6 lg:mt-10"
        >
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(option.value)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-all motion-reduce:transition-none font-headline tracking-wide ${
                  isActive
                    ? "bg-primary-200 text-zinc-900 shadow-xs shadow-zinc-300 dark:shadow-none"
                    : "bg-zinc-100 text-zinc-700 hover:bg-primary-100 dark:bg-dark-secondary-bg dark:text-zinc-300 dark:hover:bg-dark-tertiary-bg"
                }`}
              >
                <span>{option.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-default font-semibold ${
                    isActive
                      ? "bg-zinc-900/10 text-zinc-900"
                      : "bg-zinc-200/80 text-zinc-700 dark:bg-dark-tertiary-bg dark:text-zinc-300"
                  }`}
                >
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 lg:mt-8">
          {filteredProjects.map((project, index) => {
            const slug = toProjectSlug(project.name);
            return (
              <Project
                key={project.name}
                name={project.name}
                category={project.category}
                platform={project.platform}
                shortDesc={project.shortDesc}
                techStack={project.techStack}
                longDesc={project.longDesc}
                images={project.images}
                links={project.links}
                animationDelay={delays[index % delays.length]}
                buttonInfo={project.buttonInfo}
                logo={project.logo}
                imagesInFormat={project.imagesInFormat}
                onOpen={() => handleOpenProject(slug)}
              />
            );
          })}
        </div>
      </div>
      {activeProject && (
        <ProjectDetails
          key={openSlug ?? activeProject.name}
          isOpen
          onClose={handleCloseProject}
          name={activeProject.name}
          slug={openSlug ?? toProjectSlug(activeProject.name)}
          platform={activeProject.platform}
          longDesc={activeProject.longDesc}
          techStack={activeProject.techStack}
          images={activeProject.images}
          links={activeProject.links}
          imagesInFormat={activeProject.imagesInFormat}
        />
      )}
    </section>
  );
}
