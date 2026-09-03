/**
 * Configuración global de la marca y datos de contacto.
 *
 * Todos los datos son reales y facilitados por Yalah Viajes.
 */

/** Normaliza a `https://dominio` sin barra final. */
function normalize(url: string) {
  const withProtocol = url.startsWith('http') ? url : `https://${url}`
  return withProtocol.replace(/\/+$/, '')
}

function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return normalize(explicit)

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return normalize(vercel)

  return 'https://www.yalahviajes.com'
}

export const site = {
  name: 'Yalah Viajes',
  /** Wordmark tal y como aparece en el logotipo original. */
  wordmark: 'yalāh viajes',
  descriptor: 'Marruecos',
  tagline: 'a un viaje de distancia',
  shortDescription: 'Tu viaje a Marruecos, organizado desde España.',
  description:
    'Yalah Viajes organiza viajes y circuitos por Marruecos para viajeros que salen desde España. Nos ocupamos de todo: alojamiento, comidas, transporte y un conductor y guía de habla hispana que te acompaña durante el recorrido.',
  /**
   * Dominio canónico. Se resuelve en este orden:
   *   1. NEXT_PUBLIC_SITE_URL, si se define en el entorno.
   *   2. El dominio de producción que asigna Vercel al proyecto.
   *   3. El dominio definitivo, como último recurso.
   *
   * Así el canonical, el sitemap y las Open Graph siempre apuntan al dominio
   * real desde el que se sirve la web, y no a uno distinto.
   */
  url: resolveSiteUrl(),
  locale: 'es_ES',
  lang: 'es',
} as const

export const contact = {
  /** Dato real tomado del material de marca de Yalah Viajes. */
  phoneDisplay: '+34 624 15 89 59',
  phoneRaw: '+34624158959',
  whatsappNumber: '34624158959',
  email: 'pilararribas1996@gmail.com' as string | null,
  emailPlaceholder: '[EMAIL DE CONTACTO]',
  /** Población desde la que se organiza el viaje en España. */
  baseLocation: 'Fuente el Fresno, Ciudad Real' as string | null,
  hours: 'Todos los días, de 9:00 a 21:00 (hora peninsular).' as string | null,
} as const

export const social = [
  {
    name: 'Instagram',
    handle: '@yalahviajes',
    href: 'https://www.instagram.com/yalahviajes/',
  },
  // Añadir aquí Facebook o TikTok si la agencia abre perfil.
] as const

/** Mensaje precargado para el enlace de WhatsApp. */
export function whatsappUrl(message?: string) {
  const text =
    message ?? 'Hola Yalah Viajes, me gustaría información sobre los viajes a Marruecos.'
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`
}

export const nav = [
  { label: 'Inicio', href: '/' },
  { label: 'Viajes', href: '/viajes' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contacto', href: '/contacto' },
] as const

export const legalNav = [
  { label: 'Aviso legal', href: '/legal/aviso-legal' },
  { label: 'Política de privacidad', href: '/legal/privacidad' },
  { label: 'Política de cookies', href: '/legal/cookies' },
] as const
