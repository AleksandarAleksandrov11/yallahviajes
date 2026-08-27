import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalLayout, LegalSection, Pending } from '@/components/ui/LegalLayout'
import { legal } from '@/data/legal'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Política de privacidad',
    description:
      'Cómo trata Yalah Viajes los datos personales que le facilitas: responsable, finalidad, base legal, plazos y derechos.',
    path: '/legal/privacidad',
  }),
  robots: { index: false, follow: true },
}

function P({ children }: { children: string }) {
  return <Pending>[{children}]</Pending>
}

export default function PrivacidadPage() {
  return (
    <LegalLayout
      current="/legal/privacidad"
      title="Política de privacidad"
      intro="Qué datos recogemos, para qué los usamos, cuánto los guardamos y cómo puedes controlarlos. Redactada conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD)."
    >
      <LegalSection n="01" title="Responsable del tratamiento">
        <ul className="space-y-2.5">
          <li>
            <strong className="font-medium text-ink">Responsable:</strong>{' '}
            {legal.legalName ?? <P>RAZÓN SOCIAL O NOMBRE DEL TITULAR</P>} ({legal.tradeName})
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
            <strong className="font-medium text-ink">Correo electrónico:</strong>{' '}
            {legal.email ?? <P>CORREO ELECTRÓNICO DE CONTACTO</P>}
          </li>
          <li>
            <strong className="font-medium text-ink">Teléfono:</strong> {legal.phone}
          </li>
          <li>
            <strong className="font-medium text-ink">Delegado de protección de datos:</strong> no
            resulta obligatorio designarlo conforme al artículo 37 del RGPD. Para cualquier cuestión
            sobre protección de datos puedes escribir a la dirección indicada arriba.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n="02" title="Qué datos tratamos y de dónde proceden">
        <p>
          Solo tratamos los datos que nos facilitas voluntariamente. No compramos bases de datos ni
          obtenemos información de terceros.
        </p>
        <ul className="ml-4 list-disc space-y-2 marker:text-gold">
          <li>
            <strong className="font-medium text-ink">Formulario de contacto:</strong> nombre, correo
            electrónico, teléfono, número de viajeros, fechas aproximadas, viaje de interés y el
            contenido del mensaje.
          </li>
          <li>
            <strong className="font-medium text-ink">WhatsApp, teléfono o correo:</strong> los datos
            que nos proporciones en la conversación, incluido tu número de teléfono.
          </li>
          <li>
            <strong className="font-medium text-ink">Contratación de un viaje:</strong> además de lo
            anterior, los datos identificativos y de facturación necesarios para prestar el servicio
            y cumplir las obligaciones legales.
          </li>
          <li>
            <strong className="font-medium text-ink">Navegación:</strong> datos técnicos y estadísticos
            agregados, únicamente si aceptas la analítica. Se detallan en la{' '}
            <Link href="/legal/cookies" className="link-underline font-medium text-gold-deep">
              política de cookies
            </Link>
            .
          </li>
        </ul>
        <p>
          No tratamos datos de categorías especiales (salud, ideología, religión…). Si necesitas
          comunicarnos alguna circunstancia relevante para el viaje, por ejemplo una alergia
          alimentaria, la trataremos únicamente para poder prestarte el servicio y con tu
          consentimiento explícito.
        </p>
        <p>
          Este sitio no está dirigido a menores de 14 años y no recogemos conscientemente sus datos.
        </p>
      </LegalSection>

      <LegalSection n="03" title="Para qué usamos tus datos y con qué base legal">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9rem]">
            <thead>
              <tr className="border-b border-ink/15 text-[0.66rem] tracking-[0.14em] text-muted uppercase">
                <th className="py-3 pr-4 font-medium">Finalidad</th>
                <th className="py-3 pr-4 font-medium">Base legal (art. 6 RGPD)</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b border-ink/8">
                <td className="py-3.5 pr-4">
                  Responder a tu consulta y prepararte una propuesta de viaje.
                </td>
                <td className="py-3.5 pr-4 text-ink/68">
                  Aplicación de medidas precontractuales a petición del interesado (art. 6.1.b).
                </td>
              </tr>
              <tr className="border-b border-ink/8">
                <td className="py-3.5 pr-4">
                  Gestionar la reserva y la prestación del viaje contratado.
                </td>
                <td className="py-3.5 pr-4 text-ink/68">Ejecución de un contrato (art. 6.1.b).</td>
              </tr>
              <tr className="border-b border-ink/8">
                <td className="py-3.5 pr-4">
                  Cumplir obligaciones fiscales, contables y de la normativa turística.
                </td>
                <td className="py-3.5 pr-4 text-ink/68">Obligación legal (art. 6.1.c).</td>
              </tr>
              <tr className="border-b border-ink/8">
                <td className="py-3.5 pr-4">
                  Medir de forma anónima y agregada el uso de la web para mejorarla.
                </td>
                <td className="py-3.5 pr-4 text-ink/68">Consentimiento (art. 6.1.a), revocable.</td>
              </tr>
              <tr>
                <td className="py-3.5 pr-4">
                  Enviarte información sobre nuestros viajes, si nos lo pides expresamente.
                </td>
                <td className="py-3.5 pr-4 text-ink/68">Consentimiento (art. 6.1.a), revocable.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos.</p>
      </LegalSection>

      <LegalSection n="04" title="Durante cuánto tiempo los conservamos">
        <ul className="ml-4 list-disc space-y-2 marker:text-gold">
          <li>
            <strong className="font-medium text-ink">Consultas que no acaban en reserva:</strong>{' '}
            hasta un año desde el último contacto, salvo que nos pidas antes su supresión.
          </li>
          <li>
            <strong className="font-medium text-ink">Clientes:</strong> durante la relación
            contractual y, después, durante los plazos de prescripción legal aplicables
            (con carácter general, seis años para la documentación mercantil y cuatro para las
            obligaciones fiscales).
          </li>
          <li>
            <strong className="font-medium text-ink">Consentimientos:</strong> hasta que los
            revoques.
          </li>
        </ul>
      </LegalSection>

      <LegalSection n="05" title="A quién comunicamos tus datos">
        <p>
          No vendemos ni cedemos tus datos a terceros con fines comerciales. Para poder organizar tu
          viaje y prestar el servicio, pueden acceder a ellos:
        </p>
        <ul className="ml-4 list-disc space-y-2 marker:text-gold">
          <li>
            Los <strong className="font-medium text-ink">alojamientos y proveedores en Marruecos</strong>{' '}
            (riads, hoteles, campamento del desierto y equipo de conductores y guías), únicamente con
            los datos imprescindibles para prestar el servicio contratado.
          </li>
          <li>
            <strong className="font-medium text-ink">Proveedores tecnológicos</strong> que actúan como
            encargados del tratamiento: {legal.host} (alojamiento y analítica del sitio) y{' '}
            <Pending>[PROVEEDOR DE CORREO ELECTRÓNICO]</Pending>.
          </li>
          <li>
            <strong className="font-medium text-ink">Administraciones públicas</strong>, cuando exista
            una obligación legal.
          </li>
        </ul>
        <p>
          La prestación del servicio implica una{' '}
          <strong className="font-medium text-ink">transferencia internacional de datos a Marruecos</strong>
          , país que la Comisión Europea ha declarado con nivel de protección adecuado mediante la
          Decisión 2019/1765 relativa a la protección de datos personales. En el caso de proveedores
          tecnológicos con infraestructura fuera del Espacio Económico Europeo, las transferencias se
          amparan en las cláusulas contractuales tipo aprobadas por la Comisión Europea.
        </p>
      </LegalSection>

      <LegalSection n="06" title="Tus derechos">
        <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
        <ul className="ml-4 list-disc space-y-2 marker:text-gold">
          <li>
            <strong className="font-medium text-ink">Acceso:</strong> saber qué datos tuyos tratamos.
          </li>
          <li>
            <strong className="font-medium text-ink">Rectificación:</strong> corregir los datos
            inexactos.
          </li>
          <li>
            <strong className="font-medium text-ink">Supresión:</strong> pedir que los borremos
            cuando ya no sean necesarios.
          </li>
          <li>
            <strong className="font-medium text-ink">Limitación y oposición:</strong> restringir u
            oponerte a determinados tratamientos.
          </li>
          <li>
            <strong className="font-medium text-ink">Portabilidad:</strong> recibir tus datos en un
            formato estructurado y de uso común.
          </li>
          <li>
            <strong className="font-medium text-ink">Retirar el consentimiento</strong> en cualquier
            momento, sin que ello afecte a la licitud del tratamiento anterior.
          </li>
        </ul>
        <p>
          Para ejercerlos, escríbenos a {legal.email ?? <P>CORREO ELECTRÓNICO DE CONTACTO</P>}{' '}
          indicando el derecho que quieres ejercer y adjuntando una copia de un documento que
          acredite tu identidad. Responderemos en el plazo máximo de un mes.
        </p>
        <p>
          Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una
          reclamación ante la{' '}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline font-medium text-gold-deep"
          >
            Agencia Española de Protección de Datos
          </a>{' '}
          (C/ Jorge Juan, 6, 28001 Madrid).
        </p>
      </LegalSection>

      <LegalSection n="07" title="Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a
          accesos no autorizados, pérdida o alteración: cifrado del sitio mediante HTTPS, acceso
          restringido a la información y contratos de encargo de tratamiento con nuestros
          proveedores.
        </p>
      </LegalSection>

      <LegalSection n="08" title="Cambios en esta política">
        <p>
          Podemos actualizar esta política para adaptarla a novedades legislativas o a cambios en
          nuestros servicios. Publicaremos siempre la versión vigente en esta página, con su fecha de
          actualización.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
