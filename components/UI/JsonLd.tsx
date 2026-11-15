import { serializeJsonLd } from "@/helpers/jsonLd";

type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Renders an inline JSON-LD structured data script with HTML-escaped JSON. */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
