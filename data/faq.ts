/**
 * PREGUNTAS FRECUENTES
 *
 * Todas las respuestas alimentan el structured data `FAQPage` de Google, así
 * que conviene que digan exactamente lo que la agencia cumple.
 *
 * Ojo con estas, que son compromisos públicos y contractuales: precio,
 * proceso de reserva, política de cancelación y condiciones de los grupos.
 * Si cambian las condiciones, hay que cambiarlas también aquí.
 *
 * Si alguna respuesta volviera a `null`, la web muestra un aviso honesto
 * («estamos completando esta respuesta») con acceso directo a WhatsApp, en
 * lugar de inventar el dato.
 */

export type FaqCategory = 'viaje' | 'alojamiento' | 'comidas' | 'transporte' | 'reservas' | 'marruecos'

export type FaqItem = {
  q: string
  /** `null` = pendiente; la web lo dice en vez de inventarlo. */
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
    answer:
      'Los viajes son privados: el vehículo y el guía son solo para tu grupo, viajéis dos personas o un grupo de amigos o familia. Adaptamos el vehículo al número de viajeros, así que no vas a compartir la ruta con desconocidos ni a depender del ritmo de un autobús.',
    category: 'viaje',
  },
  {
    q: '¿Hay fechas de salida fijas?',
    answer:
      'No trabajamos con un calendario cerrado: la salida se organiza en las fechas que tú elijas, cualquier día del año. Solo necesitamos saber cuándo llegas a Marrakech y cuándo sales para ajustar la recogida y el traslado de vuelta. Cuanto antes lo apalabremos, más fácil es reservar el campamento en temporada alta.',
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
    answer:
      'En Marrakech, un riad tradicional dentro de la Medina, a pie de zoco. En la ruta, un hotel en las gargantas del Dades. Y en el desierto, un campamento de lujo en el corazón del Erg Chebbi, con tienda privada y baño. Los nombres concretos te los damos por escrito en la propuesta, antes de que reserves: dependen de la disponibilidad en tus fechas.',
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
    answer:
      'Sí. Avísanos al reservar y lo dejamos hablado con los alojamientos y con el campamento. La cocina marroquí es muy agradecida con el vegetariano (verduras, legumbres, cuscús, tajine de verduras) y las alergias se gestionan sin problema si las sabemos con antelación.',
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
    answer:
      'La ruta de 5 días y 4 noches cuesta desde 275 € por persona, y la de 6 días y 5 noches desde 400 € por persona. En ese precio entra todo lo que aparece en el apartado «El viaje incluye» de cada ruta: transporte, alojamientos con las comidas indicadas, campamento de lujo, guía y actividades. Los vuelos no están incluidos.',
    category: 'reservas',
    featured: true,
  },
  {
    q: '¿Cómo se reserva?',
    answer:
      'Escríbenos por WhatsApp o desde el formulario con tus fechas y cuántos sois. Te mandamos la propuesta por escrito con la ruta, los alojamientos y el precio cerrado. Si te encaja, la reserva se confirma con una señal por transferencia y el resto se abona a la llegada a Marrakech. Te enviamos la confirmación con todos los detalles antes de que viajes.',
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
    answer:
      'Si cancelas con más de 15 días de antelación te devolvemos la señal íntegra. Entre 15 y 7 días antes, se retiene la parte ya comprometida con los alojamientos y el campamento. Con menos de 7 días no podemos recuperar lo reservado. Si el problema viene de nuestra parte o de una causa de fuerza mayor, te devolvemos todo lo pagado o te buscamos fechas nuevas, lo que prefieras.',
    category: 'reservas',
  },

  // ── Marruecos ───────────────────────────────────────────────────────────
  {
    q: '¿Qué documentación necesito para viajar a Marruecos desde España?',
    answer:
      'Pasaporte. El DNI no sirve para entrar en Marruecos: necesitas el pasaporte en vigor y con una validez mínima de tres meses desde la fecha de entrada. Para estancias turísticas de menos de 90 días no hace falta visado si viajas con pasaporte español o de la Unión Europea. Como los requisitos pueden cambiar, conviene confirmarlos antes de volar en la web de Recomendaciones de Viaje del Ministerio de Asuntos Exteriores.',
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
    answer:
      'El dirham marroquí (MAD). Es una moneda cerrada, así que no se consigue en España: se cambia ya en Marruecos, en el propio aeropuerto de Marrakech, en bancos o en casas de cambio. En ciudad y en los hoteles se puede pagar con tarjeta, pero lleva algo de efectivo para el zoco, las propinas y los pueblos pequeños de la ruta, donde casi todo se paga en metálico.',
    category: 'marruecos',
  },
]

export const featuredFaq = faq.filter((f) => f.featured)

export function faqByCategory(category: FaqCategory) {
  return faq.filter((f) => f.category === category)
}

/** Solo las preguntas ya respondidas sirven para el structured data de SEO. */
export const answeredFaq = faq.filter((f): f is FaqItem & { answer: string } => Boolean(f.answer))
