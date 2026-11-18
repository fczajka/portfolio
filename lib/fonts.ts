import { Baloo_2, Source_Sans_3 } from "next/font/google";

export const headlineFont = Baloo_2({
  weight: "800",
  subsets: ["latin", "latin-ext"],
  variable: "--font-headline",
  display: "swap",
});

export const defaultFont = Source_Sans_3({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-default",
  display: "swap",
});
