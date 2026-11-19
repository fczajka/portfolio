import { ImageResponse } from "next/og";
import { getProjectsMeta } from "@/data/projectsMeta";
import { SITE_HOST } from "@/lib/site";
import type { Locale } from "@/types";

const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

const SITE_OG_COPY: Record<
  Locale,
  {
    location: string;
    role: string;
    summary: string;
  }
> = {
  en: {
    location: "Poznań, Poland",
    role: "Full-Stack Web & Mobile Developer",
    summary:
      "Cross-platform Flutter apps, edge AI products, and real-time Next.js web experiences.",
  },
  pl: {
    location: "Poznań, Polska",
    role: "Full-Stack Developer Web i Mobile",
    summary:
      "Wieloplatformowe aplikacje Flutter, produkty Edge AI oraz nowoczesne platformy webowe w Next.js.",
  },
};

/** Renders the localized site OpenGraph / Twitter image card. */
export function buildSiteOgImage(locale: Locale = "en") {
  const copy = SITE_OG_COPY[locale];
  const hostBadge = locale === "pl" ? `${SITE_HOST}/pl` : SITE_HOST;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background:
          "linear-gradient(135deg, #18181b 0%, #1f2430 55%, #172554 100%)",
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
            alignItems: "center",
            gap: "12px",
            padding: "10px 20px",
            borderRadius: "9999px",
            backgroundColor: "rgba(96, 165, 250, 0.16)",
            border: "1px solid rgba(147, 197, 253, 0.35)",
            color: "#bfdbfe",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          {hostBadge}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#a1a1aa",
          }}
        >
          {copy.location}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "960px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#ffffff",
          }}
        >
          Franciszek Czajka
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            color: "#93c5fd",
          }}
        >
          {copy.role}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.45,
            color: "#d4d4d8",
          }}
        >
          {copy.summary}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        {["Next.js", "TypeScript", "Flutter", "Supabase", "Tailwind CSS"].map(
          (tech) => (
            <div
              key={tech}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                color: "#e4e4e7",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {tech}
            </div>
          ),
        )}
      </div>
    </div>,
    OG_IMAGE_SIZE,
  );
}

/** Renders the localized project case study OpenGraph image card. */
export function buildProjectOgImage(slug: string, locale: Locale = "en") {
  const project = getProjectsMeta(locale).find(
    (item) => item.slug === slug.toLowerCase(),
  );

  const fallbackTitle =
    locale === "pl" ? "Case Study Projektu" : "Project Case Study";
  const fallbackPlatform =
    locale === "pl"
      ? "Portfolio — Franciszek Czajka"
      : "Franciszek Czajka Portfolio";
  const fallbackSummary =
    locale === "pl"
      ? "Case study aplikacji webowej i mobilnej — Franciszek Czajka."
      : "Full-stack web and mobile case study by Franciszek Czajka.";

  const title = project?.name ?? fallbackTitle;
  const platform = project?.platform ?? fallbackPlatform;
  const summary = project?.shortDesc ?? fallbackSummary;
  const stack = project?.techStack ?? ["Next.js", "TypeScript", "Flutter"];

  return new ImageResponse(
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
    </div>,
    OG_IMAGE_SIZE,
  );
}
