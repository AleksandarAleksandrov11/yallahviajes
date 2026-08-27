import Link from 'next/link'
import { Accordion, type AccordionEntry } from '@/components/ui/Accordion'
import { whatsappUrl } from '@/data/site'
import type { FaqItem } from '@/data/faq'

/**
 * Convierte las preguntas de data/faq.ts en entradas de acordeón.
 * Si una respuesta está pendiente, se dice con claridad y se ofrece
 * la vía rápida (WhatsApp) en lugar de inventar el dato.
 */
export function toAccordionEntries(items: FaqItem[], tone: 'ink' | 'light' = 'ink'): AccordionEntry[] {
  return items.map((item, i) => ({
    id: `faq-${i}-${item.q.slice(0, 18).replace(/\W+/g, '-').toLowerCase()}`,
    question: item.q,
    answer: item.answer ? (
      <p>{item.answer}</p>
    ) : (
      <p className={tone === 'light' ? 'text-sand/62' : 'text-ink/68'}>
        Estamos terminando de cerrar este dato y preferimos no publicarlo hasta tenerlo confirmado.
        Si lo necesitas ahora,{' '}
        <a
          href={whatsappUrl(`Hola Yalah Viajes, tengo una duda: ${item.q}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-medium text-gold-deep"
        >
          escríbenos por WhatsApp
        </a>{' '}
        o{' '}
        <Link href="/contacto" className="link-underline font-medium text-gold-deep">
          déjanos tu consulta
        </Link>{' '}
        y te contestamos con la información exacta.
      </p>
    ),
  }))
}

export function FaqList({
  items,
  tone = 'ink',
  defaultOpenFirst = false,
}: {
  items: FaqItem[]
  tone?: 'ink' | 'light'
  defaultOpenFirst?: boolean
}) {
  const entries = toAccordionEntries(items, tone)
  return <Accordion items={entries} tone={tone} defaultOpen={defaultOpenFirst ? entries[0]?.id : undefined} />
}
