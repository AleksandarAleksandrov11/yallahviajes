import type { ImageKey } from './images'

/**
 * Destinos que aparecen realmente en los itinerarios de Yalah Viajes.
 * No añadir lugares que no formen parte de ninguna ruta.
 */
export type Destination = {
  name: string
  kicker: string
  description: string
  image: ImageKey
  /** Viajes en los que se visita. */
  tours: string[]
}

export const destinations: Destination[] = [
  {
    name: 'Marrakech',
    kicker: 'Punto de partida',
    description:
      'La Medina, el zoco y la plaza Jemaa el-Fna. Todos nuestros viajes empiezan y terminan aquí, con alojamiento dentro de la Medina.',
    image: 'jemaa-el-fna-atardecer',
    tours: ['marruecos-5-dias', 'marruecos-6-dias'],
  },
  {
    name: 'Alto Atlas',
    kicker: 'Puerto de Tizi n’Tichka · 2.260 m',
    description:
      'La carretera que cruza la cordillera, con paradas panorámicas y pueblos bereberes colgados de la montaña.',
    image: 'dades-carretera-roja',
    tours: ['marruecos-5-dias', 'marruecos-6-dias'],
  },
  {
    name: 'Aït Ben Haddou',
    kicker: 'Patrimonio de la Humanidad',
    description:
      'El ksar de tierra donde se rodaron Gladiator, Juego de Tronos, La Momia o Lawrence de Arabia. Una hora de visita paseando por el pueblo antiguo.',
    image: 'ait-ben-haddou',
    tours: ['marruecos-5-dias', 'marruecos-6-dias'],
  },
  {
    name: 'Valle del Dades',
    kicker: 'Gargantas y valle de las Rosas',
    description:
      'Kasbahs de adobe, huertas y paredes rojizas. Aquí se duerme la primera noche fuera de Marrakech.',
    image: 'valle-pueblo',
    tours: ['marruecos-5-dias', 'marruecos-6-dias'],
  },
  {
    name: 'Gargantas del Todra',
    kicker: 'Paredes de 200 metros',
    description:
      'Un desfiladero que se estrecha entre dos muros verticales de roca. Se recorre a pie, sin prisa, antes de seguir hacia el desierto.',
    image: 'ait-ben-haddou-palmeral',
    tours: ['marruecos-5-dias', 'marruecos-6-dias'],
  },
  {
    name: 'Merzouga · Erg Chebbi',
    kicker: 'El Sahara',
    description:
      'El mar de dunas. Se entra en dromedario, se cena bajo las estrellas en el campamento y se sube a ver el amanecer.',
    image: 'erg-chebbi',
    tours: ['marruecos-5-dias', 'marruecos-6-dias'],
  },
  {
    name: 'Khamlia',
    kicker: 'Solo en la ruta de 6 días',
    description:
      'El pueblo de la música gnawa, al sur de Merzouga. Té, percusión y canto en vivo dentro de una casa del pueblo.',
    image: 'musicos-bereberes',
    tours: ['marruecos-6-dias'],
  },
]
