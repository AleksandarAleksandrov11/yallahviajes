import type { Metadata } from 'next'
import Link from 'next/link'
import { CookieStatus } from '@/components/consent/CookieStatus'
import { LegalLayout, LegalSection } from '@/components/ui/LegalLayout'
import { cookieInventory, legal } from '@/data/legal'
import { pageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Política de cookies',
    description:
      'Qué cookies y tecnologías similares utiliza la web de Yallah Viajes, para qué sirven y cómo cambiar tu decisión en cualquier momento.',
    path: '/legal/cookies',
  }),
  robots: { index: false, follow: true },
}

const TYPE_LABEL: Record<string, string> = {
  necesaria: 'Necesaria',
  analitica: 'Analítica',
}

export default function CookiesPage() {
  const necessary = cookieInventory.filter((c) => c.type === 'necesaria')
  const analytics = cookieInventory.filter((c) => c.type === 'analitica')

  return (
    <LegalLayout
      current="/legal/cookies"
      title="Política de cookies"
      intro="Esta web usa lo mínimo imprescindible. Aquí tienes el detalle de cada elemento que se guarda en tu navegador y un botón para cambiar tu decisión cuando quieras."
    >
      <CookieStatus />

      <LegalSection n="01" title="Qué son las cookies">
        <p>
          Una cookie es un pequeño fichero que un sitio web guarda en tu navegador cuando lo visitas.
          Sirve, por ejemplo, para recordar una preferencia o para medir de forma agregada cuánta
          gente entra en una página. En esta política usamos «cookies» en sentido amplio: incluye
          también otras tecnologías de almacenamiento del navegador, como <em>localStorage</em> y{' '}
          <em>sessionStorage</em>, que es lo que realmente utilizamos.
        </p>
        <p>
          Conforme al artículo 22.2 de la LSSI-CE, solo instalamos elementos que no son estrictamente
          necesarios cuando nos das tu consentimiento previo.
        </p>
      </LegalSection>

      <LegalSection n="02" title="Cookies necesarias">
        <p>
          Son imprescindibles para que la web funcione y para recordar la decisión que tomas sobre
          las cookies. No requieren consentimiento y no se pueden desactivar. No se usan para
          seguirte ni para crear perfiles.
        </p>
        <CookieTable rows={necessary} />
      </LegalSection>

      <LegalSection n="03" title="Cookies analíticas">
        <p>
          Nos ayudan a entender qué páginas se visitan más y cómo de rápido carga la web, para poder
          mejorarla. Utilizamos <strong className="font-medium text-ink">Vercel Web Analytics</strong> y{' '}
          <strong className="font-medium text-ink">Vercel Speed Insights</strong>, servicios de{' '}
          {legal.host} que miden de forma agregada y sin identificar a personas concretas.
        </p>
        <p>
          <strong className="font-medium text-ink">
            Estos scripts no se cargan si no los aceptas.
          </strong>{' '}
          Si rechazas la analítica, el código ni siquiera se descarga.
        </p>
        <CookieTable rows={analytics} />
      </LegalSection>

      <LegalSection n="04" title="Lo que no usamos">
        <p>
          Esta web <strong className="font-medium text-ink">no</strong> utiliza cookies de
          publicidad, de redes sociales, de remarketing ni de terceros con fines comerciales. No hay
          píxeles de seguimiento ni etiquetas de gestores de publicidad.
        </p>
        <p>
          Las tipografías se sirven desde nuestro propio dominio, de modo que tu navegador no
          necesita conectarse a servidores externos para mostrarlas.
        </p>
      </LegalSection>

      <LegalSection n="05" title="Cómo cambiar tu decisión">
        <p>
          Puedes modificar o retirar tu consentimiento en cualquier momento, con el mismo esfuerzo con
          el que lo diste:
        </p>
        <ul className="ml-4 list-disc space-y-2 marker:text-gold">
          <li>
            Con el botón <strong className="font-medium text-ink">«Configurar cookies»</strong> que
            aparece arriba en esta misma página y en el pie de todas las páginas del sitio.
          </li>
          <li>
            Desde la configuración de tu navegador, donde también puedes bloquear o eliminar los
            datos almacenados. Ten en cuenta que si bloqueas el almacenamiento necesario, la web
            volverá a preguntarte por las cookies en cada visita.
          </li>
        </ul>
        <p className="text-[0.9rem] text-muted">
          Guías de los navegadores más habituales:{' '}
          <a
            href="https://support.google.com/chrome/answer/95647?hl=es"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Chrome
          </a>
          ,{' '}
          <a
            href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Safari
          </a>
          ,{' '}
          <a
            href="https://support.mozilla.org/es/kb/Borrar%20cookies"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Firefox
          </a>
          ,{' '}
          <a
            href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            Edge
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection n="06" title="Más información">
        <p>
          El tratamiento de datos personales derivado del uso de la web se explica en nuestra{' '}
          <Link href="/legal/privacidad" className="link-underline font-medium text-gold-deep">
            política de privacidad
          </Link>
          . Los datos identificativos del titular del sitio están en el{' '}
          <Link href="/legal/aviso-legal" className="link-underline font-medium text-gold-deep">
            aviso legal
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

function CookieTable({ rows }: { rows: typeof cookieInventory }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[38rem] table-fixed border-collapse text-left text-[0.84rem]">
        <thead>
          <tr className="border-b border-ink/15 text-[0.64rem] tracking-[0.14em] text-muted uppercase">
            <th className="w-[17%] py-3 pr-4 font-medium">Nombre</th>
            <th className="w-[21%] py-3 pr-4 font-medium">Proveedor</th>
            <th className="w-[32%] py-3 pr-4 font-medium">Finalidad</th>
            <th className="w-[18%] py-3 pr-4 font-medium">Duración</th>
            <th className="w-[12%] py-3 font-medium">Tipo</th>
          </tr>
        </thead>
        <tbody className="align-top">
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-ink/8 last:border-b-0">
              <td className="py-3.5 pr-4 font-mono text-[0.76rem] break-words text-ink">{row.name}</td>
              <td className="py-3.5 pr-4 text-ink/68">{row.provider}</td>
              <td className="py-3.5 pr-4 text-ink/68">{row.purpose}</td>
              <td className="py-3.5 pr-4 text-ink/68">{row.duration}</td>
              <td className="py-3.5 text-ink/68">{TYPE_LABEL[row.type]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
