/**
 * DATOS LEGALES DEL TITULAR DEL SITIO
 *
 * La LSSI-CE (art. 10) obliga a mostrar la identificación del prestador de
 * servicios, y el RGPD (arts. 13-14) obliga a identificar al responsable del
 * tratamiento. Ambos quedan cubiertos con los datos de abajo.
 *
 * Si algún campo vuelve a `null`, la web muestra un marcador visible en lugar
 * de inventar el dato.
 */

export type LegalHolder = {
  /** Denominación social o nombre y apellidos del autónomo. */
  legalName: string | null
  /** Nombre comercial. */
  tradeName: string
  /** NIF / CIF. */
  taxId: string | null
  /** Domicilio social completo. */
  address: string | null
  /** Correo electrónico de contacto legal. */
  email: string | null
  /** Teléfono de contacto. */
  phone: string
  /** Datos registrales, si la sociedad está inscrita. */
  registry: string | null
  /** Nº de registro de agencia de viajes / código CICMA u equivalente. */
  travelAgencyLicence: string | null
  /** Proveedor de alojamiento web. */
  host: string
  hostAddress: string
  hostPrivacyUrl: string
  /** Fecha de última actualización de los textos legales. */
  lastUpdated: string
}

export const legal: LegalHolder = {
  legalName: 'María del Pilar Arribas Muñoz',
  tradeName: 'Yalah Viajes',
  taxId: '05723254A',
  address: 'Avenida de España 56, 13130 Fuente el Fresno (Ciudad Real), España',
  email: 'pilararribas1996@gmail.com',
  phone: '+34 624 15 89 59',
  /** Persona física: no procede inscripción registral. */
  registry: null,
  /** Pendiente de facilitar si la actividad requiere título administrativo. */
  travelAgencyLicence: null,
  host: 'Vercel Inc.',
  hostAddress: '340 S Lemon Ave #4133, Walnut, CA 91789 (Estados Unidos)',
  hostPrivacyUrl: 'https://vercel.com/legal/privacy-policy',
  lastUpdated: '2026-09-03',
}

/** Devuelve el dato o un marcador visible si todavía está pendiente. */
export function legalField(value: string | null, placeholder: string) {
  return value ?? `[${placeholder}]`
}

export function formatLegalDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * Inventario de cookies. Debe reflejar exactamente lo que carga la web:
 * hoy solo hay almacenamiento propio técnico y la analítica de Vercel,
 * que únicamente se activa si el usuario la acepta.
 */
export type CookieEntry = {
  name: string
  provider: string
  purpose: string
  duration: string
  type: 'necesaria' | 'analitica'
}

export const cookieInventory: CookieEntry[] = [
  {
    name: 'yv-consent',
    provider: 'Yalah Viajes (almacenamiento local del navegador)',
    purpose:
      'Guarda tu decisión sobre las cookies para no volver a preguntártelo en cada visita.',
    duration: 'Hasta que la borres o cambies tu decisión',
    type: 'necesaria',
  },
  {
    name: 'yv-intro-seen',
    provider: 'Yalah Viajes (almacenamiento de sesión del navegador)',
    purpose: 'Evita repetir la animación de entrada mientras navegas por la web.',
    duration: 'Se borra al cerrar la pestaña',
    type: 'necesaria',
  },
  {
    name: '_vercel_jwt',
    provider: 'Vercel Inc. (alojamiento)',
    purpose:
      'Cookie técnica del proveedor de alojamiento, necesaria para servir la web y protegerla frente a abusos.',
    duration: 'Sesión',
    type: 'necesaria',
  },
  {
    name: 'Vercel Web Analytics',
    provider: 'Vercel Inc.',
    purpose:
      'Mide de forma agregada las visitas y las páginas más vistas para mejorar la web. No utiliza cookies de seguimiento ni identifica a personas concretas; el script solo se carga si aceptas la analítica.',
    duration: 'No almacena identificadores persistentes',
    type: 'analitica',
  },
  {
    name: 'Vercel Speed Insights',
    provider: 'Vercel Inc.',
    purpose:
      'Recoge métricas anónimas de rendimiento (velocidad de carga) de forma agregada. Solo se carga si aceptas la analítica.',
    duration: 'No almacena identificadores persistentes',
    type: 'analitica',
  },
]
