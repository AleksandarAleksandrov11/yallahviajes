import type { ImageKey } from './images'

/**
 * Galería fotográfica. Todas las imágenes son material propio de Yallah Viajes
 * (dossieres de itinerarios y archivo de la agencia).
 */
export type GalleryCategory = 'desierto' | 'marrakech' | 'rutas' | 'experiencias'

export type GalleryItem = {
  key: ImageKey
  caption: string
  place: string
  category: GalleryCategory
  /** Peso en la composición editorial: 'wide' ocupa dos columnas, 'tall' dos filas. */
  span?: 'wide' | 'tall' | 'big'
}

export const galleryCategories: { id: GalleryCategory | 'todo'; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'desierto', label: 'Desierto' },
  { id: 'marrakech', label: 'Marrakech' },
  { id: 'rutas', label: 'Rutas y valles' },
  { id: 'experiencias', label: 'Experiencias' },
]

export const gallery: GalleryItem[] = [
  { key: 'desierto-caravana-dunas', caption: 'Camino del campamento', place: 'Erg Chebbi, Merzouga', category: 'desierto', span: 'wide' },
  { key: 'dromedario-amanecer', caption: 'Listos antes del amanecer', place: 'Merzouga', category: 'desierto', span: 'tall' },
  { key: 'amanecer-viajera', caption: 'El amanecer se espera sentado', place: 'Merzouga', category: 'desierto', span: 'tall' },
  { key: 'ait-ben-haddou', caption: 'El ksar de tierra', place: 'Aït Ben Haddou', category: 'rutas', span: 'big' },
  { key: 'te-menta', caption: 'Té a la menta', place: 'Campamento del desierto', category: 'experiencias' },
  { key: 'henna', caption: 'Tatuajes de henna', place: 'Jemaa el-Fna, Marrakech', category: 'experiencias', span: 'tall' },
  { key: 'sandboard-atardecer', caption: 'La tabla y el atardecer', place: 'Erg Chebbi', category: 'experiencias', span: 'tall' },
  { key: 'quad-atardecer', caption: 'Quads al caer el sol', place: 'Merzouga', category: 'experiencias', span: 'tall' },
  { key: 'jemaa-el-fna-noche', caption: 'La plaza se enciende', place: 'Jemaa el-Fna, Marrakech', category: 'marrakech' },
  { key: 'erg-chebbi', caption: 'Mar de dunas', place: 'Erg Chebbi', category: 'desierto', span: 'tall' },
  { key: 'dades-carretera-roja', caption: 'La carretera del Dades', place: 'Gargantas del Dades', category: 'rutas', span: 'tall' },
  { key: 'marrakech-zoco', caption: 'Dentro del zoco', place: 'Medina de Marrakech', category: 'marrakech' },
  { key: 'musicos-bereberes', caption: 'Música en vivo', place: 'Khamlia', category: 'experiencias' },
  { key: 'camellos-sombras', caption: 'Sombras largas', place: 'Merzouga', category: 'desierto', span: 'wide' },
  { key: 'quad-dunas', caption: 'Sobre las dunas', place: 'Merzouga', category: 'experiencias', span: 'tall' },
  { key: 'valle-pueblo', caption: 'Pueblo al pie de la garganta', place: 'Valle del Dades', category: 'rutas' },
  { key: 'jaima-nomada', caption: 'Una familia nómada', place: 'Desierto de Merzouga', category: 'experiencias' },
  { key: 'marrakech-koutoubia', caption: 'La Koutoubia', place: 'Marrakech', category: 'marrakech', span: 'tall' },
  { key: 'cielo-estrellado', caption: 'Cielo sin ciudades', place: 'Erg Chebbi', category: 'desierto' },
  { key: 'duna-caminando', caption: 'Subir la duna grande', place: 'Merzouga', category: 'desierto', span: 'tall' },
  { key: 'riad-desayuno', caption: 'Desayuno en el riad', place: 'Medina de Marrakech', category: 'experiencias' },
  { key: 'jemaa-el-fna-atardecer', caption: 'Última luz sobre la plaza', place: 'Marrakech', category: 'marrakech', span: 'tall' },
  { key: 'camellos-cielo-azul', caption: 'En marcha', place: 'Erg Chebbi', category: 'desierto', span: 'wide' },
  { key: 'ait-ben-haddou-palmeral', caption: 'Kasbahs y palmeral', place: 'Valle del Ounila', category: 'rutas' },
  { key: 'puerta-monumental', caption: 'Puertas de azulejo', place: 'Marruecos', category: 'marrakech', span: 'tall' },
  { key: 'merzouga-caravana-atardecer', caption: 'La hora naranja', place: 'Erg Chebbi', category: 'desierto', span: 'wide' },
  { key: 'curtidurias', caption: 'Curtidurías tradicionales', place: 'Marruecos', category: 'experiencias', span: 'tall' },
  { key: 'dunas-caminante', caption: 'La escala del Sahara', place: 'Erg Chebbi', category: 'desierto' },
  { key: 'dunas-minimal', caption: 'Silencio', place: 'Merzouga', category: 'desierto' },
  { key: 'camellos-silueta', caption: 'Siluetas', place: 'Erg Chebbi', category: 'desierto' },
  { key: 'amanecer-dunas', caption: 'Amanece en el Erg Chebbi', place: 'Merzouga', category: 'desierto', span: 'wide' },
  { key: 'dunas-atardecer', caption: 'Se apaga el día', place: 'Erg Chebbi', category: 'desierto' },
]
