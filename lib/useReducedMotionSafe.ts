'use client'

import { useEffect, useState } from 'react'

/**
 * Igual que `useReducedMotion`, pero seguro para la hidratación: en el
 * servidor y en el primer render del cliente devuelve siempre `false`, de
 * modo que el HTML coincide. Después de montar se ajusta a la preferencia
 * real del sistema y las animaciones dejan de ejecutarse.
 */
export function useReducedMotionSafe() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return reduced
}
