import type { Metadata } from "next";
import HomePage from "@/components/Pages/HomePage";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = getSiteMetadata("pl");

export default function PolishHome() {
  return <HomePage locale="pl" />;
}
