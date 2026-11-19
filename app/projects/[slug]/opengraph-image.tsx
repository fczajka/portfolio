import { projectsMeta } from "@/data/projectsMeta";
import { buildProjectOgImage } from "@/lib/ogImage";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return projectsMeta.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return buildProjectOgImage(slug, "en");
}
