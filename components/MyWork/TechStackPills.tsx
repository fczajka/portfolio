import type { IconType } from "react-icons";
import { FiCode, FiCpu, FiCreditCard, FiLayers, FiZap } from "react-icons/fi";
import {
  SiFlutter,
  SiNextdotjs,
  SiPrisma,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

type TechStackPillsProps = {
  techStack: string[];
};

const techIcons: Record<string, IconType> = {
  Flutter: SiFlutter,
  PowerSync: FiZap,
  SQLite: SiSqlite,
  Supabase: SiSupabase,
  Riverpod: FiLayers,
  "Sherpa ONNX": FiCpu,
  RevenueCat: FiCreditCard,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  Prisma: SiPrisma,
  "Tailwind CSS": SiTailwindcss,
};

const techIconColors: Record<string, string> = {
  Flutter: "text-sky-500",
  PowerSync: "text-blue-600",
  SQLite: "text-sky-700",
  Supabase: "text-emerald-500",
  Riverpod: "text-indigo-500",
  "Sherpa ONNX": "text-violet-500",
  RevenueCat: "text-amber-500",
  "Next.js": "text-zinc-900 dark:text-zinc-100",
  TypeScript: "text-blue-600",
  Prisma: "text-slate-700 dark:text-slate-200",
  "Tailwind CSS": "text-cyan-500",
};

export default function TechStackPills({ techStack }: TechStackPillsProps) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2 animate-fade-in [animation-delay:1s] motion-reduce:animate-none">
      {techStack.map((tech) => {
        const TechIcon = techIcons[tech] ?? FiCode;
        const iconColor =
          techIconColors[tech] ?? "text-zinc-700 dark:text-zinc-200";

        return (
          <li
            key={tech}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1.5 text-xs font-semibold leading-none shadow-sm shadow-zinc-200 dark:bg-dark-tertiary-bg dark:shadow-none"
          >
            <TechIcon
              aria-hidden="true"
              className={`h-3 w-3 ${iconColor}`}
              strokeWidth={1.75}
            />
            <span>{tech}</span>
          </li>
        );
      })}
    </ul>
  );
}
