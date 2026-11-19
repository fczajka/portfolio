import { buildSiteOgImage } from "@/lib/ogImage";

export const alt =
  "Franciszek Czajka — Full-Stack Web & Mobile Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return buildSiteOgImage("en");
}
