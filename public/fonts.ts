import { Lilita_One, Source_Sans_3 } from "next/font/google";

export const headlineFont = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

export const defaultFont = Source_Sans_3({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-default",
  display: "swap",
});
