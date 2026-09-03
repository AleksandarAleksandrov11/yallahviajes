import type { Metadata } from 'next'
import { legal } from '@/data/legal'
import { contact, site, social } from '@/data/site'
import { tours } from '@/data/tours'

const OG_IMAGE = {
  url: '/img/desierto-caravana-dunas.jpg',
  width: 2200,
  height: 1468,
  alt: 'Caravana de dromedarios en las dunas del Sahara marroquí — Yalah Viajes',
}

type PageSeo = {
  title: string
  description: string
  path: string
  image?: { url: string; width: number; height: number; alt: string }
}

/** Metadatos consistentes para todas las páginas. */
export function pageMetadata({ title, description, path, image = OG_IMAGE }: PageSeo): Metadata {
  const url = `${site.url}${path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  }
}

/**
 * Ficha de la organización: se inyecta una sola vez, en el layout raíz.
 * Incluye dirección y datos de contacto reales, que es lo que Google usa
 * para el panel de negocio y para el posicionamiento local.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${site.url}#organizacion`,
    name: site.name,
    legalName: legal.legalName ?? undefined,
    taxID: legal.taxId ?? undefined,
    url: site.url,
    description: site.description,
    slogan: site.tagline,
    logo: `${site.url}/brand/mark.svg`,
    image: `${site.url}${OG_IMAGE.url}`,
    telephone: contact.phoneRaw,
    email: contact.email ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Avenida de España 56',
      addressLocality: 'Fuente el Fresno',
      addressRegion: 'Ciudad Real',
      postalCode: '13130',
      addressCountry: 'ES',
    },
    sameAs: social.map((s) => s.href),
    areaServed: [
      { '@type': 'Country', name: 'España' },
      { '@type': 'Country', name: 'Marruecos' },
    ],
    knowsLanguage: ['es', 'ar', 'fr'],
    availableLanguage: 'es',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'reservas y atención al cliente',
      telephone: contact.phoneRaw,
      email: contact.email ?? undefined,
      availableLanguage: ['es'],
      areaServed: 'ES',
    },
  }
}

/** Ficha del sitio: ayuda a Google a mostrar el nombre de marca correcto. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#sitio`,
    url: site.url,
    name: site.name,
    inLanguage: 'es-ES',
    publisher: { '@id': `${site.url}#organizacion` },
  }
}

/** Migas de pan para las páginas internas. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  }
}

/**
 * Producto turístico. Solo se declara `offers` cuando hay precio real:
 * marcar un precio inventado sería un dato falso para los buscadores.
 */
export function tourJsonLd(slug: string) {
  const tour = tours.find((t) => t.slug === slug)
  if (!tour) return null

  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.officialTitle,
    description: tour.seo.description,
    url: `${site.url}/viajes/${tour.slug}`,
    image: `${site.url}/img/${tour.hero}.jpg`,
    provider: { '@id': `${site.url}#organizacion` },
    touristType: 'Viajeros desde España',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: tour.itinerary.length,
      itemListElement: tour.itinerary.map((day) => ({
        '@type': 'ListItem',
        position: day.day,
        item: { '@type': 'TouristDestination', name: day.route, description: day.description },
      })),
    },
    subjectOf: {
      '@type': 'CreativeWork',
      about: tour.route.join(', '),
    },
  }

  if (tour.price.from !== null) {
    base.offers = {
      '@type': 'Offer',
      price: tour.price.from,
      priceCurrency: tour.price.currency,
      availability: 'https://schema.org/InStock',
      url: `${site.url}/viajes/${tour.slug}`,
    }
  }

  return base
}

export function faqJsonLd(items: { q: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
