import type { Metadata } from "next";
import ProjectPageContent from "@/components/Pages/ProjectPageContent";
import { projectsMeta } from "@/data/projectsMeta";
import { getProjectPageMetadata } from "@/lib/metadata";

type ProjectPageParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsMeta.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageParams): Promise<Metadata> {
  const { slug } = await params;
  return getProjectPageMetadata(slug, "en");
}

export default async function ProjectPage({ params }: ProjectPageParams) {
  const { slug } = await params;
  return <ProjectPageContent rawSlug={slug} locale="en" />;
}
