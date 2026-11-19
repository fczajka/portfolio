import type { MetadataRoute } from "next";
import { projectsMeta } from "@/data/projectsMeta";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();

  const homeAlternates = {
    languages: {
      en: baseUrl,
      pl: `${baseUrl}/pl`,
    },
  };

  const projectRoutes: MetadataRoute.Sitemap = projectsMeta.flatMap(
    (project) => {
      const enUrl = `${baseUrl}/projects/${project.slug}`;
      const plUrl = `${baseUrl}/pl/projects/${project.slug}`;
      const alternates = {
        languages: {
          en: enUrl,
          pl: plUrl,
        },
      };

      return [
        {
          url: enUrl,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.8,
          alternates,
        },
        {
          url: plUrl,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.8,
          alternates,
        },
      ];
    },
  );

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: homeAlternates,
    },
    {
      url: `${baseUrl}/pl`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: homeAlternates,
    },
    ...projectRoutes,
  ];
}
