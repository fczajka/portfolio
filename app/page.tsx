import type { Metadata } from "next";
import HomePage from "@/components/Pages/HomePage";
import { getSiteMetadata } from "@/lib/metadata";

export const metadata: Metadata = getSiteMetadata("en");

export default function Home() {
  return <HomePage locale="en" />;
}
