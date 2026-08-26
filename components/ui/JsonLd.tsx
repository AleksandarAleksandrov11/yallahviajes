/**
 * Inyecta datos estructurados. El contenido procede siempre de data/ y de
 * lib/seo.ts —nunca de entrada del usuario—, así que se serializa tal cual.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
