import type { ComponentType } from "react";

type TechStackPillsProps = {
  techStack: string[];
  className?: string;
  immediate?: boolean;
};

function NextJsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#09090b"
        stroke="#52525b"
        strokeWidth="1.2"
      />
      <path
        d="M8.5 16V8L16.8 18.2M15.5 8V13"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <circle cx="12" cy="12" r="2.1" fill="#38bdf8" />
      <g fill="none" stroke="#38bdf8" strokeWidth="1.4">
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(60 12 12)"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="3.8"
          transform="rotate(120 12 12)"
        />
      </g>
    </svg>
  );
}

function TypeScriptIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178c6" />
      <path d="M5.8 11.4H12.4V13.1H10V19H8.2V13.1H5.8V11.4Z" fill="#ffffff" />
      <path
        d="M18.6 12.6C18.1 12.1 17.4 11.9 16.6 11.9C15.5 11.9 14.7 12.5 14.7 13.3C14.7 14.2 15.5 14.6 16.7 14.9C18 15.3 18.8 15.8 18.8 17C18.8 18.1 17.8 18.9 16.3 18.9C15.4 18.9 14.6 18.6 14 18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M13.5 2.4L4.4 13.8C3.9 14.4 4.3 15.3 5.1 15.3H12L13.5 2.4Z"
        fill="#24b47e"
      />
      <path
        d="M10.5 21.6L19.6 10.2C20.1 9.6 19.7 8.7 18.9 8.7H12L10.5 21.6Z"
        fill="#3ecf8e"
      />
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M7 9.5C7.9 6.5 9.8 5.2 12.6 5.2C15.4 5.2 16.7 7 17.7 8.1C18.5 9 19.3 9.2 20.5 8.8C19.6 11.7 17.7 13 14.9 13C12.1 13 10.8 11.2 9.8 10.1C9 9.2 8.2 9 7 9.5Z"
        fill="#38bdf8"
      />
      <path
        d="M3.5 15.2C4.4 12.2 6.3 10.9 9.1 10.9C11.9 10.9 13.2 12.7 14.2 13.8C15 14.7 15.8 14.9 17 14.5C16.1 17.4 14.2 18.7 11.4 18.7C8.6 18.7 7.3 16.9 6.3 15.8C5.5 14.9 4.7 14.7 3.5 15.2Z"
        fill="#0ea5e9"
      />
    </svg>
  );
}

function FlutterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path d="M14.3 2L4.2 12.1L7.3 15.2L20.4 2H14.3Z" fill="#54c5f8" />
      <path d="M14.3 11.2L8.9 16.6L12 19.7L20.4 11.2H14.3Z" fill="#54c5f8" />
      <path d="M8.9 16.6L12 19.7L15.1 16.6L12 13.5L8.9 16.6Z" fill="#01579b" />
      <path d="M12 19.7L14.3 22H20.4L15.1 16.6L12 19.7Z" fill="#29b6f6" />
    </svg>
  );
}

function PrismaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M12.1 2.4L4.2 16.3L10.7 21.4L19.8 18.3L12.1 2.4Z"
        fill="#1e293b"
        stroke="#94a3b8"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M12.1 2.4L10.7 21.4L19.8 18.3L12.1 2.4Z"
        fill="#38bdf8"
        fillOpacity="0.28"
      />
      <path d="M12.1 2.4V20.9" stroke="#e2e8f0" strokeWidth="1.3" />
    </svg>
  );
}

function SqliteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <ellipse cx="12" cy="6.2" rx="7.5" ry="2.8" fill="#38bdf8" />
      <path
        d="M4.5 6.2V11.8C4.5 13.3 7.9 14.6 12 14.6C16.1 14.6 19.5 13.3 19.5 11.8V6.2"
        fill="#0284c7"
      />
      <path
        d="M4.5 11.8V17.4C4.5 18.9 7.9 20.2 12 20.2C16.1 20.2 19.5 18.9 19.5 17.4V11.8"
        fill="#0369a1"
      />
      <ellipse
        cx="12"
        cy="6.2"
        rx="7.5"
        ry="2.8"
        fill="none"
        stroke="#bae6fd"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function PowerSyncIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M5.5 9A7 7 0 0 1 18.2 7.5M18.5 15A7 7 0 0 1 5.8 16.5"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M18.6 4.4V8.4H14.6" fill="#3b82f6" />
      <path d="M5.4 19.6V15.6H9.4" fill="#3b82f6" />
      <path
        d="M12.6 8.2L9.5 12.6H12.2L11.4 15.8L14.5 11.4H11.8L12.6 8.2Z"
        fill="#22d3ee"
      />
    </svg>
  );
}

function RiverpodIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#1d4ed8" />
      <path
        d="M6.5 9.5C8.5 7.5 10.5 7.5 12.5 9.5C14.5 11.5 16.5 11.5 18 9.8"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M6.5 14.8C8.5 12.8 10.5 12.8 12.5 14.8C14.5 16.8 16.5 16.8 18 15.1"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SherpaOnnxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <polygon
        points="12,2 20.7,7 20.7,17 12,22 3.3,17 3.3,7"
        fill="#4c1d95"
        stroke="#a78bfa"
        strokeWidth="1.4"
      />
      <path
        d="M7.5 12.5V11.5M10 15V9M12.5 16.5V7.5M15 14.5V9.5M17.2 12.5V11.5"
        stroke="#e9d5ff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RevenueCatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M5 7L7.5 3.5L10.5 6H13.5L16.5 3.5L19 7V15.5C19 18.8 16 20.5 12 20.5C8 20.5 5 18.8 5 15.5V7Z"
        fill="#f2545b"
      />
      <circle cx="9.6" cy="12" r="1.4" fill="#fef3c7" />
      <circle cx="14.4" cy="12" r="1.4" fill="#fef3c7" />
      <path
        d="M10.5 15.5C11.4 16.3 12.6 16.3 13.5 15.5"
        fill="none"
        stroke="#fef3c7"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DefaultTechIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M8.5 8L4.5 12L8.5 16M15.5 8L19.5 12L15.5 16M13.5 6.5L10.5 17.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TECH_ICONS: Record<string, ComponentType> = {
  "Next.js": NextJsIcon,
  React: ReactIcon,
  TypeScript: TypeScriptIcon,
  Supabase: SupabaseIcon,
  "Tailwind CSS": TailwindIcon,
  Flutter: FlutterIcon,
  Prisma: PrismaIcon,
  SQLite: SqliteIcon,
  PowerSync: PowerSyncIcon,
  Riverpod: RiverpodIcon,
  "Sherpa ONNX": SherpaOnnxIcon,
  RevenueCat: RevenueCatIcon,
};

export default function TechStackPills({
  techStack,
  className = "mt-4",
  immediate = false,
}: TechStackPillsProps) {
  const animationClass = immediate
    ? ""
    : "animate-fade-in [animation-delay:1s] motion-reduce:animate-none";

  return (
    <ul className={`flex flex-wrap gap-2 ${animationClass} ${className}`}>
      {techStack.map((tech) => {
        const RenderIcon = TECH_ICONS[tech] ?? DefaultTechIcon;

        return (
          <li
            key={tech}
            className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3.5 py-2 text-sm font-semibold leading-none dark:bg-dark-tertiary-bg"
          >
            <RenderIcon />
            <span>{tech}</span>
          </li>
        );
      })}
    </ul>
  );
}
