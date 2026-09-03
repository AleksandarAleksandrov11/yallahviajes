import type { ImageKey } from './images'

/**
 * ITINERARIOS DE YALAH VIAJES
 *
 * Todo el contenido de este fichero procede de los dossieres oficiales
 * facilitados por Yalah Viajes:
 *   · «VIAJE ESPECIAL DE 5 DÍAS / 4 NOCHES POR MARRUECOS»
 *   · «VIAJE ESPECIAL DE 6 DÍAS / 5 NOCHES POR MARRUECOS»
 *
 * ⚠️  No se ha inventado ningún dato. Los campos con valor `null` están
 *     PENDIENTES de que la agencia los facilite (precios, hoteles concretos,
 *     tamaño de grupo, fechas de salida…). Ver CONTENIDO-PENDIENTE.md.
 *
 * Para editar un viaje basta con modificar este fichero: las páginas
 * /viajes y /viajes/[slug] se generan automáticamente a partir de aquí.
 */

export type Meal = 'desayuno' | 'almuerzo' | 'cena'

export type ItineraryDay = {
  /** Número de día dentro del circuito. */
  day: number
  /** Titular corto para el resumen del recorrido. */
  route: string
  /** Título largo del día, tal y como figura en el dossier. */
  title: string
  /** Descripción íntegra del día (texto de la agencia). */
  description: string
  /** Hitos concretos que se mencionan en el texto del día. */
  highlights: string[]
  /** Comidas incluidas ese día según el apartado «Tour incluye». */
  meals: Meal[]
  /** Dónde se pernocta. `null` en el día de regreso. */
  stay: string | null
  image: ImageKey
}

export type Price = {
  /** PENDIENTE: importe por persona. Mientras sea `null` la web muestra
   *  «Precio a consultar» y dirige al formulario / WhatsApp. */
  from: number | null
  currency: 'EUR'
  unit: 'por persona'
  /** Notas sobre el precio facilitadas por la agencia. PENDIENTE. */
  note: string | null
}

export type Tour = {
  slug: string
  /** Nombre comercial del viaje. */
  name: string
  /** Título tal y como aparece en el dossier original. */
  officialTitle: string
  /** Frase corta de posicionamiento. */
  claim: string
  intro: string
  days: number
  nights: number
  /** Punto de inicio y fin del circuito. */
  startsIn: string
  endsIn: string
  price: Price
  /** Etiquetas de recorrido para las tarjetas comparativas. */
  route: string[]
  /** Experiencias destacadas (extraídas del itinerario). */
  experiences: string[]
  /** Apartado «TOUR INCLUYE» del dossier, literal. */
  includes: string[]
  /** No figura en el dossier: se enumera lo que la agencia no menciona
   *  como incluido. Revisar con la agencia antes de publicar. */
  notIncluded: string[]
  itinerary: ItineraryDay[]
  gallery: ImageKey[]
  hero: ImageKey
  cardImage: ImageKey
  /** Diferencia clave frente al otro viaje. */
  bestFor: string
  seo: { title: string; description: string }
}

const PRICE_PENDING: Price = {
  from: null, // PENDIENTE — facilitar precio por persona
  currency: 'EUR',
  unit: 'por persona',
  note: null, // PENDIENTE — p. ej. «mínimo 2 personas», temporada alta, etc.
}

/** Conceptos que el dossier NO recoge como incluidos. */
const COMMON_NOT_INCLUDED = [
  'Vuelos desde España a Marrakech',
  'Seguro de viaje',
  'Bebidas y comidas no indicadas en el apartado «El viaje incluye»',
  'Entradas a monumentos y museos no mencionados en el itinerario',
  'Propinas y gastos personales',
]

export const tours: Tour[] = [
  {
    slug: 'marruecos-5-dias',
    name: 'Marrakech y desierto de Merzouga',
    officialTitle: 'Viaje especial de 5 días y 4 noches por Marruecos',
    claim: 'La ruta esencial: del zoco de Marrakech a una noche bajo las estrellas del Erg Chebbi.',
    intro:
      'Cinco días para cruzar el Alto Atlas, dormir en las gargantas del Dades y llegar a las dunas de Merzouga a lomos de un dromedario. Un circuito directo, sin tiempos muertos, pensado para quien tiene pocos días y quiere verlo todo.',
    days: 5,
    nights: 4,
    startsIn: 'Aeropuerto de Marrakech',
    endsIn: 'Aeropuerto de Marrakech',
    price: PRICE_PENDING,
    route: ['Marrakech', 'Aït Ben Haddou', 'Valle del Dades', 'Gargantas del Todra', 'Merzouga'],
    experiences: [
      'Paseo en dromedario de una hora hasta el campamento',
      'Noche en campamento de lujo en el centro del Erg Chebbi',
      'Sandboard sobre las dunas',
      'Visita al ksar de Aït Ben Haddou',
      'Kasbah de Amridil y palmeral de Skoura',
      'Traje bereber y tatuajes de henna',
    ],
    includes: [
      'Transporte cómodo con aire acondicionado',
      'Conductor y guía de habla hispana',
      'Una noche en el Dades con cena y desayuno',
      'Noche en el desierto con cena y desayuno',
      'Campamento de lujo',
      '2 noches en Marrakech con desayuno',
      'Una hora de paseo en dromedario',
      'Sandboard (la tabla)',
      'Traje bereber para las fotos',
      'Tatuajes de henna',
    ],
    notIncluded: COMMON_NOT_INCLUDED,
    hero: 'desierto-caravana-dunas',
    cardImage: 'merzouga-caravana-atardecer',
    bestFor: 'Quien viaja con pocos días y quiere el Sahara sí o sí.',
    itinerary: [
      {
        day: 1,
        route: 'Llegada a Marrakech',
        title: 'Llegada a Marrakech',
        description:
          'A la hora de tu llegada te recogemos en el aeropuerto y te llevamos a tu alojamiento en la antigua Medina de Marrakech. Día libre en Marrakech para descubrir la Medina.',
        highlights: ['Recogida en el aeropuerto', 'Alojamiento en la antigua Medina', 'Tarde libre'],
        meals: [],
        stay: 'Marrakech (Medina)',
        image: 'marrakech-zoco',
      },
      {
        day: 2,
        route: 'Marrakech → Valle del Dades',
        title: 'Marrakech · Kasbah de Aït Ben Haddou · Valle del Dades',
        description:
          'Salida desde Marrakech, puerto de Tizi n’Tichka (2.260 m) y camino hacia Aït Ben Haddou, con pueblos bereberes en la ruta. Llegada a Aït Ben Haddou y visita del kasbah. Almuerzo. Palmeral de Skoura pasando por Ouarzazate. Visita del magnífico kasbah de Amridil. Saldremos hacia el valle de las Rosas y sus pueblos bereberes. La garganta del Dades por Boumalne. Excursiones a la garganta y encuentro con gente local y sus rebaños. Noche en el hotel en las gargantas del Dades.',
        highlights: [
          'Puerto de Tizi n’Tichka (2.260 m)',
          'Ksar de Aït Ben Haddou',
          'Palmeral de Skoura y Ouarzazate',
          'Kasbah de Amridil',
          'Valle de las Rosas y gargantas del Dades',
        ],
        // Desayuno en Marrakech (incluido en «2 noches con desayuno»),
        // almuerzo en Aït Ben Haddou y cena en el Dades.
        meals: ['desayuno', 'almuerzo', 'cena'],
        stay: 'Gargantas del Dades',
        image: 'ait-ben-haddou',
      },
      {
        day: 3,
        route: 'Valle del Dades → Merzouga',
        title: 'Valle del Todra · Gargantas del Todra · Desierto de Merzouga',
        description:
          'Después del desayuno saldremos hacia la garganta del Todra, un paseo de una hora por el valle de Tinghir. Saldremos hacia Merzouga a través de Tinjdad, Erfoud y sus famosos fósiles, Rissani, la antigua capital del desierto de Tafilalet, y Merzouga. Cuando lleguemos al pie de las dunas empezaremos el paseo en dromedario para llegar al bivouac en el centro del Erg Chebbi. Entonces podemos disfrutar del atardecer y el té de menta. La cena y música en el campamento bajo el cielo lleno de estrellas.',
        highlights: [
          'Gargantas del Todra y valle de Tinghir',
          'Tinjdad, Erfoud y sus fósiles',
          'Rissani, antigua capital de Tafilalet',
          'Paseo en dromedario hasta el bivouac',
          'Atardecer, té de menta y música bajo las estrellas',
        ],
        meals: ['desayuno', 'cena'],
        stay: 'Campamento de lujo (Erg Chebbi)',
        image: 'merzouga-caravana-atardecer',
      },
      {
        day: 4,
        route: 'Merzouga → Marrakech',
        title: 'Merzouga · Marrakech',
        description:
          'Por la mañana nos levantaremos temprano para subir a las dunas a ver el amanecer y tomaremos un buen desayuno en el campamento. Llega el momento de despedirnos del desierto: cogemos los dromedarios de vuelta al pueblo de Merzouga, donde encontraremos a nuestro conductor para regresar a Marrakech con paradas de descanso y para comer. Llegaremos a Marrakech sobre las 19:00.',
        highlights: [
          'Amanecer desde lo alto de las dunas',
          'Desayuno en el campamento',
          'Regreso en dromedario hasta Merzouga',
          'Llegada a Marrakech sobre las 19:00',
        ],
        meals: ['desayuno'],
        stay: 'Marrakech (Medina)',
        image: 'amanecer-dunas',
      },
      {
        day: 5,
        route: 'Marrakech → Aeropuerto',
        title: 'Aeropuerto de Marrakech',
        description:
          'El último día de tu mágico viaje tienes la oportunidad de conocer la Medina de Marrakech, dependiendo del horario de tu vuelo. A la hora del vuelo te llevaremos al aeropuerto para regresar a España.',
        highlights: ['Tiempo libre en la Medina', 'Traslado al aeropuerto'],
        meals: ['desayuno'],
        stay: null,
        image: 'jemaa-el-fna-atardecer',
      },
    ],
    gallery: [
      'desierto-caravana-dunas',
      'ait-ben-haddou',
      'dades-carretera-roja',
      'valle-pueblo',
      'merzouga-caravana-atardecer',
      'musicos-bereberes',
      'te-menta',
      'amanecer-viajera',
      'jemaa-el-fna-noche',
    ],
    seo: {
      title: 'Viaje a Marruecos 5 días: Marrakech y Merzouga',
      description:
        'Ruta de 5 días y 4 noches desde Marrakech al desierto de Merzouga: Aït Ben Haddou, gargantas del Todra y noche en campamento de lujo.',
    },
  },

  {
    slug: 'marruecos-6-dias',
    name: 'Gran ruta del Sahara',
    officialTitle: 'Viaje especial de 6 días y 5 noches por Marruecos',
    claim: 'Un día más en el desierto: 4x4 entre los nómadas, música gnawa en Khamlia y piscina entre las dunas.',
    intro:
      'La versión completa de la ruta. Mismo recorrido por el Atlas, Aït Ben Haddou y las gargantas, pero con una jornada entera dedicada al desierto de Merzouga: excursión en 4x4, visita a familias nómadas, té y música en vivo en Khamlia y una segunda noche en el Sahara.',
    days: 6,
    nights: 5,
    startsIn: 'Aeropuerto de Marrakech',
    endsIn: 'Aeropuerto de Marrakech',
    price: PRICE_PENDING,
    route: [
      'Marrakech',
      'Aït Ben Haddou',
      'Valle del Dades',
      'Gargantas del Todra',
      'Merzouga',
      'Khamlia',
    ],
    experiences: [
      'Excursión en 4x4 por el desierto',
      'Visita a familias nómadas y a las antiguas minas de kohl',
      'Té y música tradicional en vivo en Khamlia',
      'Paseo en dromedario y atardecer sobre las dunas',
      'Noche en campamento de lujo y noche en hotel con piscina en el desierto',
      'Cooperativa de mujeres bereberes: aceite de argán',
    ],
    includes: [
      'Transporte cómodo con aire acondicionado',
      'Ida y vuelta al aeropuerto',
      'Conductor y guía',
      'Dos noches en Marrakech con desayuno',
      'Una noche en el Dades con cena y desayuno',
      'Noche en el desierto con cena y desayuno',
      'Campamento de lujo',
      'Noche en Merzouga con cena y desayuno',
      'Una hora de paseo en dromedario',
      'Excursión en 4x4 en el desierto',
      'Traje bereber para las fotos',
      'Tatuajes de henna',
    ],
    notIncluded: COMMON_NOT_INCLUDED,
    hero: 'erg-chebbi',
    cardImage: 'camellos-sombras',
    bestFor: 'Quien quiere vivir el desierto sin prisa y conocer a quien vive en él.',
    itinerary: [
      {
        day: 1,
        route: 'Llegada a Marrakech',
        title: 'Marrakech',
        description:
          'A la hora de tu llegada te recogemos en el aeropuerto y te llevamos a tu alojamiento en la Medina de Marrakech. Día libre en Marrakech.',
        highlights: ['Recogida en el aeropuerto', 'Alojamiento en la Medina', 'Día libre'],
        meals: [],
        stay: 'Marrakech (Medina)',
        image: 'marrakech-koutoubia',
      },
      {
        day: 2,
        route: 'Marrakech → Valle del Dades',
        title: 'Marrakech · Kasbah de Aït Ben Haddou · Valle del Dades',
        description:
          'El día 2 de nuestro viaje saldremos por la mañana, después de un rico desayuno en nuestro riad, hacia el valle del Dades. En el camino cruzaremos las montañas del Alto Atlas, con 2.260 m de altura, con paradas panorámicas, y visitaremos una cooperativa de mujeres bereberes donde puedes descubrir cómo se hace el aceite de argán. Seguiremos a la parada más importante del día, el Patrimonio de la Humanidad de la kasbah de Aït Ben Haddou, donde se han grabado varias películas famosas como Gladiator, Juego de Tronos, La Momia o Lawrence de Arabia. En la kasbah hacemos una hora de visita paseando por el pueblo antiguo para descubrir su historia. Después de la visita paramos una hora para comer y seguimos nuestra ruta vía Ouarzazate, el valle de las Rosas y nuestro alojamiento en el valle del Dades.',
        highlights: [
          'Montañas del Alto Atlas (2.260 m)',
          'Cooperativa de mujeres bereberes: aceite de argán',
          'Aït Ben Haddou, Patrimonio de la Humanidad',
          'Ouarzazate y valle de las Rosas',
        ],
        meals: ['desayuno', 'cena'],
        stay: 'Valle del Dades',
        image: 'ait-ben-haddou',
      },
      {
        day: 3,
        route: 'Valle del Dades → Merzouga',
        title: 'Valle del Dades · Gargantas del Todra · Desierto de Merzouga',
        description:
          'Por la mañana empezamos nuestro día con un buen desayuno en el hotel y saldremos hacia el desierto visitando las gargantas del Dades y las gargantas del Todra, donde paramos para pasear entre las montañas formadas como dos paredes de 200 m de altura. Seguiremos hacia Tinjdad, donde hacemos la parada para comer, y después nos vamos al desierto de Merzouga con una parada antes de los dromedarios en un bazar bereber, donde puedes vestir el traje bereber para sacarte fotos, hacerte tatuajes de henna y comprar pañuelos para la experiencia del desierto. Llegaremos al desierto sobre las 17:30 y encontraremos a nuestros dromedarios esperando para llevarnos por las dunas al campamento, con una parada para ver un impresionante atardecer sobre las dunas de color naranja. Al llegar al campamento nos instalamos en nuestras tiendas de lujo, donde vamos a pasar la noche bajo las estrellas.',
        highlights: [
          'Gargantas del Dades',
          'Gargantas del Todra: paredes de 200 m',
          'Bazar bereber: traje y henna',
          'Llegada al desierto sobre las 17:30',
          'Atardecer sobre las dunas naranjas',
        ],
        meals: ['desayuno', 'cena'],
        stay: 'Campamento de lujo (Erg Chebbi)',
        image: 'dades-carretera-roja',
      },
      {
        day: 4,
        route: 'Merzouga · día completo',
        title: 'Excursión por el desierto',
        description:
          'Por la mañana nos levantaremos temprano para subir a las dunas a ver el amanecer y disfrutar de la tranquilidad y el silencio del desierto. Después bajaremos al campamento para tomar el desayuno antes de coger rumbo en 4x4 para descubrir el desierto y a sus nómadas, cómo viven, y las antiguas minas de kohl. De ahí al pueblo de Khamlia, donde vamos a tomar un té y disfrutar de su música tradicional en vivo. Por la tarde iremos a nuestro hotel, donde vamos a aprovechar la piscina en medio del desierto y pasar la noche en el hotel.',
        highlights: [
          'Amanecer sobre las dunas',
          'Excursión en 4x4 por el desierto',
          'Familias nómadas y minas antiguas de kohl',
          'Té y música en vivo en Khamlia',
          'Piscina en medio del desierto',
        ],
        meals: ['desayuno', 'cena'],
        stay: 'Merzouga (hotel)',
        image: 'quad-dunas',
      },
      {
        day: 5,
        route: 'Merzouga → Marrakech',
        title: 'Merzouga · Marrakech',
        description:
          'Después de un buen desayuno en el hotel llega el momento de despedirnos del desierto para volver a Marrakech, con paradas de descanso y para comer. Llegaremos a Marrakech sobre las 19:00.',
        highlights: ['Desayuno en el hotel', 'Regreso con paradas de descanso', 'Llegada sobre las 19:00'],
        meals: ['desayuno'],
        stay: 'Marrakech (Medina)',
        image: 'dunas-caravana-amplia',
      },
      {
        day: 6,
        route: 'Marrakech → Aeropuerto',
        title: 'Aeropuerto de Marrakech',
        description:
          'El último día de tu mágico viaje tienes la oportunidad de conocer la Medina de Marrakech, dependiendo del horario de tu vuelo. A la hora del vuelo te llevaremos al aeropuerto para regresar a casa.',
        highlights: ['Tiempo libre en la Medina', 'Traslado al aeropuerto'],
        meals: ['desayuno'],
        stay: null,
        image: 'marrakech-zoco',
      },
    ],
    gallery: [
      'erg-chebbi',
      'camellos-sombras',
      'quad-dunas',
      'musicos-bereberes',
      'jaima-nomada',
      'cielo-estrellado',
      'ait-ben-haddou-palmeral',
      'amanecer-dunas',
      'te-menta',
    ],
    seo: {
      title: 'Viaje a Marruecos 6 días: gran ruta del Sahara',
      description:
        'Ruta de 6 días y 5 noches por Marruecos: Alto Atlas, Aït Ben Haddou, gargantas del Todra, dos noches en Merzouga y excursión en 4x4.',
    },
  },
]

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug)
}

export function tourSlugs() {
  return tours.map((t) => t.slug)
}

/** Etiqueta de precio lista para pintar. */
export function priceLabel(price: Price): string {
  if (price.from === null) return 'Precio a consultar'
  return `Desde ${price.from} ${price.currency === 'EUR' ? '€' : price.currency} ${price.unit}`
}
