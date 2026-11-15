import { projectsMeta } from "@/data/projectsMeta";
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function ProjectOpenGraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectsMeta.find(
    (item) => item.slug === params.slug.toLowerCase(),
  );

  const title = project?.name ?? "Project Case Study";
  const platform = project?.platform ?? "Franciszek Czajka Portfolio";
  const summary =
    project?.shortDesc ??
    "Full-stack web and mobile case study by Franciszek Czajka.";
  const stack = project?.techStack ?? ["Next.js", "TypeScript", "Flutter"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background:
            "linear-gradient(135deg, #18181b 0%, #1e293b 52%, #172554 100%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: "9999px",
              backgroundColor: "rgba(96, 165, 250, 0.16)",
              border: "1px solid rgba(147, 197, 253, 0.35)",
              color: "#bfdbfe",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {platform}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#a1a1aa",
            }}
          >
            Franciszek Czajka
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 25,
              lineHeight: 1.45,
              color: "#d4d4d8",
            }}
          >
            {summary.length > 175 ? `${summary.slice(0, 172)}...` : summary}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {stack.slice(0, 5).map((tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#e4e4e7",
                fontSize: 21,
                fontWeight: 600,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
