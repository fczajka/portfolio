import { ImageResponse } from "next/og";

export const alt =
  "Franciszek Czajka — Full-Stack Web & Mobile Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          franciszekczajka.me
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#a1a1aa",
          }}
        >
          Poznań, Poland
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
          Full-Stack Web & Mobile Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            lineHeight: 1.45,
            color: "#d4d4d8",
          }}
        >
          Cross-platform Flutter apps, edge AI products, and real-time Next.js
          web experiences.
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
    size,
  );
}
