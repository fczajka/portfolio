import Footer from "@/components/Footer/Footer";
import ProjectCaseStudyView from "@/components/MyWork/ProjectCaseStudyView";
import BackgroundParticles from "@/components/UI/BackgroundParticles";
import JsonLd from "@/components/UI/JsonLd";
import { myWork } from "@/data/content";
import { toProjectSlug } from "@/helpers/projects";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ProjectPageParams = {
  params: Promise<{ slug: string }>;
};

function findProject(slug: string) {
  const normalized = slug.toLowerCase();
  return myWork.projects.find(
    (project) => toProjectSlug(project.name) === normalized,
  );
}

export function generateStaticParams() {
  return myWork.projects.map((project) => ({
    slug: toProjectSlug(project.name),
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageParams): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const project = findProject(rawSlug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const slug = toProjectSlug(project.name);
  const url = `/projects/${slug}`;

  return {
    title: `${project.name} — ${project.platform}`,
    description: project.shortDesc,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${project.name} | Franciszek Czajka`,
      description: project.shortDesc,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Franciszek Czajka`,
      description: project.shortDesc,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const { slug: rawSlug } = await params;
  const project = findProject(rawSlug);
  if (!project) {
    notFound();
  }

  const slug = toProjectSlug(project.name);

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory:
      project.category === "mobile" ? "MobileApplication" : "WebApplication",
    operatingSystem: project.platform,
    description: project.longDesc,
    url: `${SITE_URL}/projects/${slug}`,
    author: {
      "@type": "Person",
      name: "Franciszek Czajka",
      url: SITE_URL,
    },
  };

  return (
    <main>
      <JsonLd data={projectJsonLd} />
      <BackgroundParticles />
      <div className="relative max-w-1920 mx-auto">
        <ProjectCaseStudyView slug={slug} />
        <Footer />
      </div>
    </main>
  );
}
