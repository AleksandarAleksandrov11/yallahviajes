'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { Mark } from '@/components/brand/Logo'
import { contact, whatsappUrl } from '@/data/site'
import { tours } from '@/data/tours'

type Fields = {
  nombre: string
  email: string
  telefono: string
  viajeros: string
  fecha: string
  viaje: string
  mensaje: string
  privacidad: boolean
  /** Campo trampa para bots: si viene relleno, se descarta el envío. */
  web: string
}

type Errors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = {
  nombre: '',
  email: '',
  telefono: '',
  viajeros: '2',
  fecha: '',
  viaje: '',
  mensaje: '',
  privacidad: false,
  web: '',
}

function validate(values: Fields): Errors {
  const errors: Errors = {}
  if (values.nombre.trim().length < 2) errors.nombre = 'Dinos cómo te llamas.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Revisa el correo: parece que falta algo.'
  if (values.telefono.trim() && !/^[+\d][\d\s().-]{6,}$/.test(values.telefono.trim()))
    errors.telefono = 'Ese teléfono no parece válido.'
  const travellers = Number(values.viajeros)
  if (!Number.isFinite(travellers) || travellers < 1) errors.viajeros = 'Indica el número de viajeros.'
  if (values.mensaje.trim().length < 10) errors.mensaje = 'Cuéntanos algo más para poder ayudarte.'
  if (!values.privacidad) errors.privacidad = 'Necesitamos tu consentimiento para poder responderte.'
  return errors
}

/**
 * Formulario de contacto.
 *
 * Al enviarlo, se valida todo y se abre WhatsApp con el mensaje ya redactado
 * a partir de los datos del formulario, listo para mandar al número de
 * Yalah Viajes. Es el canal real de la agencia: la consulta llega al
 * momento, sin depender de un servidor de correo ni de un formulario que se
 * quede a medias.
 */
export function ContactForm() {
  const searchParams = useSearchParams()
  const [values, setValues] = useState<Fields>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  // Si se llega desde una página de viaje, el desplegable viene preseleccionado
  useEffect(() => {
    const preset = searchParams.get('viaje')
    if (preset && tours.some((t) => t.slug === preset)) {
      setValues((v) => ({ ...v, viaje: preset }))
    }
  }, [searchParams])

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    if (touched[key]) setErrors(validate({ ...values, [key]: value }))
  }

  const blur = (key: keyof Fields) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({
      nombre: true,
      email: true,
      telefono: true,
      viajeros: true,
      mensaje: true,
      privacidad: true,
    })
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>('[data-invalid="true"]')?.focus()
      return
    }
    if (values.web) return // bot

    setStatus('sending')

    const tourName = tours.find((t) => t.slug === values.viaje)?.name
    const summary = [
      `Hola Yalah Viajes, soy ${values.nombre.trim()}.`,
      tourName ? `Me interesa el viaje: ${tourName}.` : null,
      `Seríamos ${values.viajeros} viajero(s).`,
      values.fecha ? `Fechas aproximadas: ${values.fecha}.` : null,
      values.telefono ? `Mi teléfono: ${values.telefono.trim()}.` : null,
      `Mi correo: ${values.email.trim()}.`,
      '',
      values.mensaje.trim(),
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const win = window.open(whatsappUrl(summary), '_blank', 'noopener,noreferrer')
      if (!win) throw new Error('popup blocked')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return <SuccessPanel onReset={() => { setValues(EMPTY); setTouched({}); setErrors({}); setStatus('idle') }} />
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {/* Trampa para bots: invisible y fuera del recorrido de tabulación */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="yv-web">No rellenar</label>
        <input
          id="yv-web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.web}
          onChange={(e) => set('web', e.target.value)}
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          label="Nombre"
          required
          value={values.nombre}
          error={touched.nombre ? errors.nombre : undefined}
          onChange={(v) => set('nombre', v)}
          onBlur={() => blur('nombre')}
          autoComplete="name"
        />
        <Field
          label="Correo electrónico"
          type="email"
          required
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={(v) => set('email', v)}
          onBlur={() => blur('email')}
          autoComplete="email"
          inputMode="email"
        />
        <Field
          label="Teléfono"
          type="tel"
          hint="Opcional, pero acelera mucho las cosas"
          value={values.telefono}
          error={touched.telefono ? errors.telefono : undefined}
          onChange={(v) => set('telefono', v)}
          onBlur={() => blur('telefono')}
          autoComplete="tel"
          inputMode="tel"
        />
        <Field
          label="Número de viajeros"
          type="number"
          required
          min={1}
          max={40}
          value={values.viajeros}
          error={touched.viajeros ? errors.viajeros : undefined}
          onChange={(v) => set('viajeros', v)}
          onBlur={() => blur('viajeros')}
          inputMode="numeric"
        />
        <Field
          label="Fecha aproximada"
          type="month"
          hint="Un mes orientativo nos vale"
          value={values.fecha}
          onChange={(v) => set('fecha', v)}
          onBlur={() => blur('fecha')}
        />
        <SelectField
          label="Viaje que te interesa"
          value={values.viaje}
          onChange={(v) => set('viaje', v)}
          options={[
            { value: '', label: 'Todavía no lo sé / quiero que me asesoréis' },
            ...tours.map((t) => ({ value: t.slug, label: `${t.name} · ${t.days} días` })),
          ]}
        />
      </div>

      <TextAreaField
        label="Tu mensaje"
        required
        value={values.mensaje}
        error={touched.mensaje ? errors.mensaje : undefined}
        onChange={(v) => set('mensaje', v)}
        onBlur={() => blur('mensaje')}
        placeholder="Cuéntanos qué te apetece hacer, cuántos días tienes o cualquier duda que tengas."
      />

      <CheckboxField
        checked={values.privacidad}
        error={touched.privacidad ? errors.privacidad : undefined}
        onChange={(v) => set('privacidad', v)}
        onBlur={() => blur('privacidad')}
      />

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex shrink-0 items-center justify-center gap-2.5 bg-ink px-9 py-4.5 text-[0.72rem] font-medium tracking-[0.18em] whitespace-nowrap text-sand uppercase transition-colors duration-500 hover:bg-ink-2 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={1.6} aria-hidden="true" />
              Enviando
            </>
          ) : (
            <>
              Enviar consulta
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </>
          )}
        </button>
        <p className="text-[0.78rem] leading-relaxed text-muted">
          Te respondemos en menos de 24 h. También puedes llamarnos al{' '}
          <a href={`tel:${contact.phoneRaw}`} className="link-underline text-ink">
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>

      <AnimatePresence>
        {status === 'error' && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-terracotta/40 bg-terracotta/8 px-5 py-4 text-[0.88rem] text-terracotta"
          >
            No hemos podido enviar el mensaje. Escríbenos por WhatsApp al {contact.phoneDisplay} y lo
            resolvemos al momento.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

/* ── Campos ─────────────────────────────────────────────────────────────── */

const fieldBase =
  'peer w-full border-b bg-transparent pt-6 pb-2.5 text-[0.98rem] text-ink transition-colors duration-300 outline-none placeholder:text-transparent focus:border-gold'

function Field({
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required,
  type = 'text',
  ...rest
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error?: string
  hint?: string
  required?: boolean
  type?: string
} & Omit<React.ComponentProps<'input'>, 'onChange' | 'onBlur' | 'value' | 'type'>) {
  const id = useId()
  const invalid = Boolean(error)

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        aria-invalid={invalid}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        data-invalid={invalid}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`${fieldBase} ${invalid ? 'border-terracotta' : 'border-ink/20'}`}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute top-0 left-0 text-[0.64rem] font-medium tracking-[0.16em] uppercase transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-[0.95rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[0.64rem] peer-focus:tracking-[0.16em] peer-focus:uppercase ${
          invalid ? 'text-terracotta' : 'text-muted peer-focus:text-gold-deep'
        }`}
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <FieldMessage id={id} error={error} hint={hint} />
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  const id = useId()
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="block text-[0.64rem] font-medium tracking-[0.16em] text-muted uppercase"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full appearance-none border-b border-ink/20 bg-transparent bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230B2545%22 stroke-width=%221.2%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_2px_center] bg-no-repeat pt-2 pb-2.5 pr-7 text-[0.98rem] text-ink outline-none transition-colors duration-300 focus:border-gold"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function TextAreaField({
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  onBlur: () => void
  error?: string
  required?: boolean
  placeholder?: string
}) {
  const id = useId()
  const invalid = Boolean(error)
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-[0.64rem] font-medium tracking-[0.16em] uppercase ${
          invalid ? 'text-terracotta' : 'text-muted'
        }`}
      >
        {label}
        {required && <span className="ml-1 text-gold">*</span>}
      </label>
      <textarea
        id={id}
        rows={5}
        value={value}
        required={required}
        placeholder={placeholder}
        aria-invalid={invalid}
        aria-describedby={error ? `${id}-error` : undefined}
        data-invalid={invalid}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`mt-3 w-full resize-y border bg-paper px-4 py-3.5 text-[0.98rem] text-ink transition-colors duration-300 outline-none placeholder:text-ink/32 focus:border-gold ${
          invalid ? 'border-terracotta' : 'border-ink/20'
        }`}
      />
      <FieldMessage id={id} error={error} />
    </div>
  )
}

function CheckboxField({
  checked,
  onChange,
  onBlur,
  error,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  onBlur: () => void
  error?: string
}) {
  const id = useId()
  const invalid = Boolean(error)
  return (
    <div>
      <div className="flex items-start gap-3.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          aria-invalid={invalid}
          aria-describedby={error ? `${id}-error` : undefined}
          data-invalid={invalid}
          className={`mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer appearance-none border transition-colors duration-200 checked:bg-ink focus-visible:outline-2 ${
            invalid ? 'border-terracotta' : 'border-ink/30'
          } bg-[length:12px] bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23F4EFE8%22 stroke-width=%223%22><path d=%22M20 6L9 17l-5-5%22/></svg>')]`}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.85rem] leading-relaxed text-ink/70">
          He leído y acepto la{' '}
          <a href="/legal/privacidad" className="link-underline font-medium text-gold-deep">
            política de privacidad
          </a>
          . Usaremos tus datos únicamente para responder a tu consulta y preparar tu propuesta de
          viaje.
        </label>
      </div>
      <FieldMessage id={id} error={error} />
    </div>
  )
}

function FieldMessage({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {error ? (
        <motion.p
          key="error"
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-2 text-[0.76rem] text-terracotta"
        >
          {error}
        </motion.p>
      ) : hint ? (
        <p key="hint" id={`${id}-hint`} className="mt-2 text-[0.74rem] text-muted">
          {hint}
        </p>
      ) : null}
    </AnimatePresence>
  )
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grain relative overflow-hidden bg-ink px-8 py-14 text-center text-sand md:px-12"
    >
      <div
        aria-hidden="true"
        className="zellige-veil pointer-events-none absolute inset-0 opacity-[0.06]"
      />
      <div className="relative">
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/50"
        >
          <Check className="h-6 w-6 text-gold" strokeWidth={1.4} aria-hidden="true" />
        </motion.span>

        <h2 className="mt-8 font-display text-3xl leading-tight text-sand">Mensaje preparado</h2>
        <p className="mx-auto mt-4 max-w-md text-[0.96rem] leading-relaxed text-sand/65">
          Se ha abierto WhatsApp con tu consulta ya redactada: solo tienes que darle a enviar. Si no
          se ha abierto, escríbenos directamente al {contact.phoneDisplay}.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-sand px-7 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-ink uppercase transition-colors hover:bg-white"
          >
            Abrir WhatsApp
          </a>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center border border-sand/40 px-7 py-4 text-[0.7rem] font-medium tracking-[0.18em] text-sand uppercase transition-colors hover:border-sand hover:bg-sand/10"
          >
            Escribir otra consulta
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-sand/55">
          <Mark className="h-4 w-4" diamond="#e2c88f" />
          <span className="text-[0.62rem] tracking-[0.2em] uppercase">a un viaje de distancia</span>
        </div>
      </div>
    </motion.div>
  )
}
