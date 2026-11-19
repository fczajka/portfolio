import { notFound } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import ProjectCaseStudyView from "@/components/MyWork/ProjectCaseStudyView";
import BackgroundParticles from "@/components/UI/BackgroundParticles";
import JsonLd from "@/components/UI/JsonLd";
import { getProjectsMeta } from "@/data/projectsMeta";
import { getProjectStructuredData } from "@/lib/metadata";
import type { Locale } from "@/types";

type ProjectPageContentProps = {
  rawSlug: string;
  locale: Locale;
};

/** Shared project case study page shell rendered by `/projects/[slug]` (EN) and `/pl/projects/[slug]` (PL). */
export default function ProjectPageContent({
  rawSlug,
  locale,
}: ProjectPageContentProps) {
  const normalized = rawSlug.toLowerCase();
  const project = getProjectsMeta(locale).find(
    (item) => item.slug === normalized,
  );
  if (!project) {
    notFound();
  }

  return (
    <main>
      <JsonLd data={getProjectStructuredData(project, locale)} />
      <BackgroundParticles />
      <div className="relative max-w-1920 mx-auto">
        <ProjectCaseStudyView slug={project.slug} />
        <Footer />
      </div>
    </main>
  );
}
