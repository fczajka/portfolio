import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = getSiteMetadata("pl");

export default function PolishLayout({ children }: { children: ReactNode }) {
  return children;
}
