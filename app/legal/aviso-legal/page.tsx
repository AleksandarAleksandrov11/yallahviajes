import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalLayout, LegalSection, Pending } from '@/components/ui/LegalLayout'
import { legal } from '@/data/legal'
import { site } from '@/data/site'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Aviso legal',
    description:
      'Información legal del titular del sitio web de Yalah Viajes, condiciones de uso y propiedad intelectual.',
    path: '/legal/aviso-legal',
  }),
  robots: { index: false, follow: true },
}

/** Marcador visible para los datos que la agencia aún no ha facilitado. */
function P({ children }: { children: string }) {
  return <Pending>[{children}]</Pending>
}

export default function AvisoLegalPage() {
  return (
    <LegalLayout
      current="/legal/aviso-legal"
      title="Aviso legal"
      intro="Quién está detrás de esta web y en qué condiciones puedes usarla, conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE)."
    >
      <LegalSection n="01" title="Titular del sitio web">
        <p>
          En cumplimiento del artículo 10 de la LSSI-CE, se informa de los datos identificativos del
          titular de este sitio web:
        </p>
        <ul className="space-y-2.5">
          <li>
            <strong className="font-medium text-ink">Titular:</strong>{' '}
            {legal.legalName ?? <P>RAZÓN SOCIAL O NOMBRE DEL TITULAR</P>}
          </li>
          <li>
            <strong className="font-medium text-ink">Nombre comercial:</strong> {legal.tradeName}
          </li>
          <li>
            <strong className="font-medium text-ink">NIF / CIF:</strong>{' '}
            {legal.taxId ?? <P>NIF O CIF</P>}
          </li>
          <li>
            <strong className="font-medium text-ink">Domicilio:</strong>{' '}
            {legal.address ?? <P>DOMICILIO COMPLETO</P>}
          </li>
          <li>
            <strong className="font-medium text-ink">Teléfono:</strong> {legal.phone}
          </li>
          <li>
            <strong className="font-medium text-ink">Correo electrónico:</strong>{' '}
            {legal.email ?? <P>CORREO ELECTRÓNICO DE CONTACTO</P>}
          </li>
          <li>
            <strong className="font-medium text-ink">Datos registrales:</strong>{' '}
            {legal.registry ?? <P>DATOS REGISTRALES, SI PROCEDE</P>}
          </li>
          <li>
            <strong className="font-medium text-ink">
              Título administrativo de agencia de viajes:
            </strong>{' '}
            {legal.travelAgencyLicence ?? <P>Nº DE LICENCIA / CÓDIGO DE AGENCIA DE VIAJES</P>}
          </li>
          <li>
            <strong className="font-medium text-ink">Sitio web:</strong> {site.url}
          </li>
        </ul>
        <p className="text-[0.9rem] text-muted">
          Los campos resaltados están pendientes de completar con los datos registrales definitivos
          antes de la publicación del sitio.
        </p>
      </LegalSection>

      <LegalSection n="02" title="Alojamiento">
        <p>
          Este sitio web está alojado en los servidores de {legal.host}, con domicilio en{' '}
          {legal.hostAddress}. Puedes consultar su política de privacidad en{' '}
          <a
            href={legal.hostPrivacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-medium text-gold-deep"
          >
            {legal.hostPrivacyUrl}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection n="03" title="Objeto y ámbito de aplicación">
        <p>
          Este aviso legal regula el acceso, la navegación y el uso del sitio web de {site.name}. El
          acceso al sitio es gratuito y no exige registro previo, salvo en los formularios de
          contacto y solicitud de información.
        </p>
        <p>
          La navegación por el sitio atribuye la condición de usuario e implica la aceptación plena
          de todas las cláusulas de este aviso legal en la versión publicada en el momento del
          acceso. Si no estás de acuerdo con alguna de ellas, te pedimos que no utilices el sitio.
        </p>
      </LegalSection>

      <LegalSection n="04" title="Uso del sitio web">
        <p>El usuario se compromete a:</p>
        <ul className="ml-4 list-disc space-y-2 marker:text-gold">
          <li>Utilizar el sitio conforme a la ley, la buena fe y este aviso legal.</li>
          <li>
            No introducir ni difundir contenidos que resulten difamatorios, discriminatorios,
            violentos o contrarios a la ley, la moral o el orden público.
          </li>
          <li>
            No introducir programas, virus, macros o cualquier otro dispositivo lógico o físico que
            pueda dañar el sitio, sus sistemas o los de terceros.
          </li>
          <li>
            No intentar acceder a áreas restringidas, ni realizar acciones de ingeniería inversa
            sobre el sitio.
          </li>
          <li>Facilitar datos veraces en los formularios de contacto.</li>
        </ul>
      </LegalSection>

      <LegalSection n="05" title="Propiedad intelectual e industrial">
        <p>
          Todos los contenidos del sitio —textos, fotografías, itinerarios, diseño gráfico, logotipo,
          código fuente y selección y disposición de los contenidos— son titularidad de{' '}
          {legal.tradeName} o de terceros que han autorizado su uso, y están protegidos por la
          normativa de propiedad intelectual e industrial.
        </p>
        <p>
          Las fotografías publicadas en este sitio son material propio de {legal.tradeName},
          realizadas durante los viajes que organiza. Queda prohibida su reproducción, distribución,
          comunicación pública o transformación sin autorización expresa y por escrito del titular.
        </p>
        <p>
          El acceso al sitio no otorga al usuario ningún derecho de propiedad sobre los contenidos.
          Se permite su visualización, impresión y descarga para uso personal y privado.
        </p>
      </LegalSection>

      <LegalSection n="06" title="Responsabilidad">
        <p>
          {legal.tradeName} no garantiza la disponibilidad ininterrumpida del sitio ni la ausencia de
          errores, aunque hará todo lo razonablemente posible por evitarlos y por corregirlos cuando
          se detecten.
        </p>
        <p>
          La información sobre itinerarios, servicios incluidos, horarios y descripciones publicada
          en este sitio tiene carácter informativo y orientativo. Las condiciones concretas de cada
          viaje —precio, fechas, alojamientos y servicios— son las que se pacten por escrito con el
          cliente en el momento de la contratación.
        </p>
        <p>
          El sitio puede contener enlaces a páginas de terceros. {legal.tradeName} no se responsabiliza
          de los contenidos ni de las políticas de privacidad de esos sitios.
        </p>
      </LegalSection>

      <LegalSection n="07" title="Protección de datos y cookies">
        <p>
          El tratamiento de los datos personales que nos facilitas se describe en la{' '}
          <Link href="/legal/privacidad" className="link-underline font-medium text-gold-deep">
            política de privacidad
          </Link>
          . El uso de cookies y tecnologías similares se detalla en la{' '}
          <Link href="/legal/cookies" className="link-underline font-medium text-gold-deep">
            política de cookies
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection n="08" title="Modificaciones">
        <p>
          {legal.tradeName} se reserva el derecho a modificar este aviso legal y la presentación y
          configuración del sitio en cualquier momento. Los cambios entrarán en vigor desde su
          publicación.
        </p>
      </LegalSection>

      <LegalSection n="09" title="Legislación aplicable y jurisdicción">
        <p>
          Este aviso legal se rige por la legislación española. Para la resolución de cualquier
          controversia derivada del acceso o uso del sitio, las partes se someten a los juzgados y
          tribunales que correspondan conforme a la normativa aplicable, respetando en todo caso el
          fuero que la ley reconozca a las personas consumidoras.
        </p>
        <p>
          Puedes dirigir cualquier consulta relacionada con este aviso legal a{' '}
          {legal.email ?? <P>CORREO ELECTRÓNICO DE CONTACTO</P>}.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
