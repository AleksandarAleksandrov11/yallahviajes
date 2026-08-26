'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'

export type AccordionEntry = {
  id: string
  question: string
  answer: ReactNode
}

/**
 * Acordeón accesible. Un solo panel abierto a la vez para que la lista
 * no se descoloque bajo el dedo en móvil.
 */
export function Accordion({
  items,
  defaultOpen,
  tone = 'ink',
}: {
  items: AccordionEntry[]
  defaultOpen?: string
  tone?: 'ink' | 'light'
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)
  const light = tone === 'light'

  return (
    <div className={`border-t ${light ? 'border-sand/18' : 'border-ink/10'}`}>
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id} className={`border-b ${light ? 'border-sand/18' : 'border-ink/10'}`}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`trigger-${item.id}`}
                className={`group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-300 md:py-7 ${
                  light ? 'text-sand hover:text-gold-soft' : 'text-ink hover:text-gold-deep'
                }`}
              >
                <span className="font-display text-xl leading-snug md:text-2xl">{item.question}</span>
                <span
                  className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    light ? 'border-sand/30' : 'border-ink/15 group-hover:border-gold/50'
                  }`}
                >
                  <Plus
                    className={`h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`panel-${item.id}`}
                  role="region"
                  aria-labelledby={`trigger-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className={`max-w-2xl pb-7 pr-10 text-[0.98rem] leading-relaxed ${
                      light ? 'text-sand/70' : 'text-ink/72'
                    }`}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
