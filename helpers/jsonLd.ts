/** Serializes JSON-LD data into an HTML-safe string for inline script tags. */
export function serializeJsonLd(data: unknown): string {
  const json = JSON.stringify(data) ?? "null";
  return json
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
