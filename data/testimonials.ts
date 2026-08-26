import type { ImageKey } from './images'

/**
 * TESTIMONIOS DE VIAJEROS
 *
 * ⚠️  PENDIENTE. Aquí no hay ni habrá testimonios inventados.
 *     Cuando Yalah Viajes facilite las opiniones reales de sus viajeros,
 *     basta con añadirlas al array `testimonials` siguiendo este formato:
 *
 *     {
 *       id: 'marta-2025-06',
 *       name: 'Nombre del viajero',
 *       location: 'Ciudad, España',       // opcional
 *       date: '2025-06',                  // AAAA-MM, opcional
 *       tourSlug: 'marruecos-6-dias',     // slug del viaje realizado
 *       rating: 5,                        // 1-5, opcional
 *       quote: 'Frase corta destacada.',   // opcional
 *       text: 'Testimonio completo…',
 *       photo: null,                      // clave de data/images.ts si la hay
 *     }
 *
 * Mientras el array esté vacío, la web muestra un estado editorial
 * honesto en /testimonios y en la home, sin inventar reseñas.
 */

export type Testimonial = {
  id: string
  name: string
  location?: string
  /** AAAA-MM */
  date?: string
  tourSlug?: string
  rating?: 1 | 2 | 3 | 4 | 5
  quote?: string
  text: string
  photo?: ImageKey | null
}

export const testimonials: Testimonial[] = [
  // PENDIENTE — añadir aquí los testimonios reales de los viajeros.
]

export const hasTestimonials = testimonials.length > 0
