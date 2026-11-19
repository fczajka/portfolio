import { buildSiteOgImage } from "@/lib/ogImage";

export const alt =
  "Franciszek Czajka — Portfolio Full-Stack Developera Web i Mobile";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function PolishOpenGraphImage() {
  return buildSiteOgImage("pl");
}
