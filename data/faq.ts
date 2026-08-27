/**
 * PREGUNTAS FRECUENTES
 *
 * Regla de contenido: solo se responde lo que consta en los dossieres de
 * itinerarios de Yalah Viajes. Cuando la respuesta es `null`, la web muestra
 * un aviso honesto («estamos completando esta respuesta») con acceso directo
 * a WhatsApp, en lugar de inventar el dato.
 *
 * Para completar una respuesta: sustituir `answer: null` por el texto real.
 */

export type FaqCategory = 'viaje' | 'alojamiento' | 'comidas' | 'transporte' | 'reservas' | 'marruecos'

export type FaqItem = {
  q: string
  /** `null` = PENDIENTE de que la agencia facilite el dato. */
  answer: string | null
  category: FaqCategory
  /** Se muestra en la home y en las páginas de viaje. */
  featured?: boolean
}

export const faqCategories: { id: FaqCategory; label: string; intro: string }[] = [
  { id: 'viaje', label: 'El viaje', intro: 'Cómo funciona el circuito de principio a fin.' },
  { id: 'alojamiento', label: 'Alojamiento', intro: 'Dónde se duerme cada noche.' },
  { id: 'comidas', label: 'Comidas', intro: 'Qué comidas están incluidas.' },
  { id: 'transporte', label: 'Transporte y guías', intro: 'Cómo nos movemos y quién te acompaña.' },
  { id: 'reservas', label: 'Reservas y precios', intro: 'Cómo se reserva y qué hay que saber antes.' },
  { id: 'marruecos', label: 'Marruecos', intro: 'Preparar el viaje y llegar tranquilo.' },
]

export const faq: FaqItem[] = [
  // ── El viaje ────────────────────────────────────────────────────────────
  {
    q: '¿Desde dónde empieza el viaje?',
    answer:
      'El circuito empieza y termina en el aeropuerto de Marrakech. Te recogemos a la llegada del vuelo y te llevamos al alojamiento en la Medina. El último día te acercamos de nuevo al aeropuerto según el horario de tu vuelo.',
    category: 'viaje',
    featured: true,
  },
  {
    q: '¿Qué diferencia hay entre el viaje de 5 días y el de 6 días?',
    answer:
      'El recorrido base es el mismo: Alto Atlas, Aït Ben Haddou, valle del Dades, gargantas del Todra y desierto de Merzouga. La ruta de 6 días añade una jornada completa en el desierto: excursión en 4x4, visita a familias nómadas y a las antiguas minas de kohl, té y música en vivo en Khamlia, y una segunda noche en Merzouga, en hotel con piscina.',
    category: 'viaje',
    featured: true,
  },
  {
    q: '¿Cuánto se anda o cuánta actividad física hay?',
    answer:
      'Es un circuito por carretera con paradas. Los tramos a pie son cortos y accesibles: una hora de visita en Aït Ben Haddou, un paseo por las gargantas del Todra y la subida a las dunas para ver el amanecer, que es opcional. El acceso al campamento se hace en dromedario, con un paseo de una hora.',
    category: 'viaje',
  },
  {
    q: '¿Cuántas personas forman el grupo?',
    answer: null, // PENDIENTE — confirmar tamaño de grupo / si es privado o compartido
    category: 'viaje',
  },
  {
    q: '¿Hay fechas de salida fijas?',
    answer: null, // PENDIENTE — calendario de salidas o salidas a medida
    category: 'viaje',
  },

  // ── Alojamiento ─────────────────────────────────────────────────────────
  {
    q: '¿Está incluido el alojamiento?',
    answer:
      'Sí. En la ruta de 5 días se incluyen 2 noches en Marrakech con desayuno, una noche en el Dades con cena y desayuno y una noche en campamento de lujo en el desierto con cena y desayuno. En la de 6 días se añade una noche más en Merzouga, también con cena y desayuno.',
    category: 'alojamiento',
    featured: true,
  },
  {
    q: '¿Cómo es la noche en el desierto?',
    answer:
      'Se duerme en un campamento de lujo, en tiendas, en el corazón del Erg Chebbi. Se llega en dromedario al atardecer, se cena en el campamento con música bajo las estrellas y por la mañana se sube a las dunas a ver el amanecer antes del desayuno.',
    category: 'alojamiento',
    featured: true,
  },
  {
    q: '¿En qué hoteles y riads nos alojamos?',
    answer: null, // PENDIENTE — nombres y categoría de los alojamientos
    category: 'alojamiento',
  },

  // ── Comidas ─────────────────────────────────────────────────────────────
  {
    q: '¿Las comidas están incluidas?',
    answer:
      'Están incluidos todos los desayunos, y las cenas de las noches en el Dades, en el campamento del desierto y, en la ruta de 6 días, en Merzouga. En la ruta de 5 días también se incluye el almuerzo del día 2, en Aït Ben Haddou. El resto de comidas y bebidas no están incluidas: se paran para comer durante la ruta, en sitios que conocemos bien.',
    category: 'comidas',
    featured: true,
  },
  {
    q: '¿Podéis adaptar el menú a alergias, dietas o comida vegetariana?',
    answer: null, // PENDIENTE — confirmar con la agencia
    category: 'comidas',
  },

  // ── Transporte y guías ──────────────────────────────────────────────────
  {
    q: '¿Cómo funciona el transporte?',
    answer:
      'Todo el recorrido se hace en un vehículo cómodo con aire acondicionado, con nuestro conductor. Incluye la ida y la vuelta al aeropuerto de Marrakech y las paradas panorámicas y de descanso de cada etapa.',
    category: 'transporte',
    featured: true,
  },
  {
    q: '¿Tenemos guía en español?',
    answer:
      'Sí. Nuestro conductor y guía es de habla hispana y te acompaña durante todo el recorrido, desde la recogida en el aeropuerto hasta el regreso.',
    category: 'transporte',
    featured: true,
  },
  {
    q: '¿Qué ocurre cuando llegamos a Marruecos?',
    answer:
      'Te esperamos en el aeropuerto de Marrakech a la hora de llegada de tu vuelo y te llevamos directamente al alojamiento en la Medina. A partir de ahí ya no tienes que organizar nada: cada mañana se sale a la hora acordada y nosotros nos encargamos de la ruta, las paradas, las visitas y los alojamientos.',
    category: 'transporte',
    featured: true,
  },

  // ── Reservas y precios ──────────────────────────────────────────────────
  {
    q: '¿Qué incluye el precio?',
    answer:
      'Cada viaje tiene su listado detallado en su página: transporte con aire acondicionado, conductor y guía, alojamientos con las comidas indicadas, campamento de lujo, una hora de paseo en dromedario y las experiencias incluidas (traje bereber para las fotos y tatuajes de henna; sandboard en la ruta de 5 días; excursión en 4x4 en la de 6 días).',
    category: 'reservas',
    featured: true,
  },
  {
    q: '¿Cuánto cuesta el viaje?',
    answer: null, // PENDIENTE — precio por persona de cada ruta
    category: 'reservas',
    featured: true,
  },
  {
    q: '¿Cómo se reserva?',
    answer: null, // PENDIENTE — proceso de reserva, señal, formas de pago
    category: 'reservas',
  },
  {
    q: '¿Están incluidos los vuelos desde España?',
    answer:
      'No. Los vuelos no están incluidos: nosotros organizamos toda la experiencia dentro de Marruecos, desde que aterrizas en Marrakech hasta que te dejamos de nuevo en el aeropuerto. Si nos dices tus horarios de vuelo, ajustamos la recogida y el traslado de vuelta.',
    category: 'reservas',
  },
  {
    q: '¿Qué política de cancelación tenéis?',
    answer: null, // PENDIENTE — condiciones de cancelación
    category: 'reservas',
  },

  // ── Marruecos ───────────────────────────────────────────────────────────
  {
    q: '¿Qué documentación necesito para viajar a Marruecos desde España?',
    answer: null, // PENDIENTE — no publicamos requisitos sin confirmarlos con fuente oficial
    category: 'marruecos',
  },
  {
    q: '¿Qué debo llevar en la maleta?',
    answer:
      'Lo que pide la ruta: calzado cómodo para caminar por la kasbah y las gargantas, ropa ligera para el día y algo de abrigo para la noche del desierto, gafas de sol, protección solar y un pañuelo para la arena (también puedes comprarlo en el bazar bereber de camino a Merzouga). En el campamento y en los alojamientos no hace falta nada especial.',
    category: 'marruecos',
  },
  {
    q: '¿Qué moneda se usa y dónde se cambia?',
    answer: null, // PENDIENTE — recomendaciones de la agencia sobre cambio de moneda
    category: 'marruecos',
  },
]

export const featuredFaq = faq.filter((f) => f.featured)

export function faqByCategory(category: FaqCategory) {
  return faq.filter((f) => f.category === category)
}

/** Solo las preguntas ya respondidas sirven para el structured data de SEO. */
export const answeredFaq = faq.filter((f): f is FaqItem & { answer: string } => Boolean(f.answer))
