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
  return getProjectPageMetadata(slug, "pl");
}

export default async function PolishProjectPage({ params }: ProjectPageParams) {
  const { slug } = await params;
  return <ProjectPageContent rawSlug={slug} locale="pl" />;
}
