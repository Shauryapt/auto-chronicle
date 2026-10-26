/**
 * Structured data for search engines. Escapes "<" so record text can never close the script tag.
 * Only pass values that are shown and sourced on the page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
