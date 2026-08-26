import { MARK_DIAMOND_PATH, MARK_KNOT_PATH, WORDMARK_PATH, WORDMARK_VIEWBOX_HEIGHT } from './paths'

/**
 * Define una sola vez los trazados del logotipo y la máscara de arco.
 * El resto de la web los reutiliza con <use />, así el peso del logotipo
 * no se repite en cada cabecera, pie o tarjeta.
 */
export function BrandSprite() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute h-0 w-0 overflow-hidden">
      <defs>
        <symbol id="yv-mark" viewBox="0 0 100 100">
          <path className="yv-knot" fill="currentColor" d={MARK_KNOT_PATH} />
          <path className="yv-diamond" fill="var(--yv-diamond, #c1943a)" d={MARK_DIAMOND_PATH} />
        </symbol>

        <symbol id="yv-wordmark" viewBox={`0 0 1000 ${WORDMARK_VIEWBOX_HEIGHT}`}>
          <path fill="currentColor" d={WORDMARK_PATH} />
        </symbol>

        {/* Arco marroquí usado como máscara de imagen */}
        <clipPath id="yv-arch" clipPathUnits="objectBoundingBox">
          <path d="M0,1 L0,0.44 C0,0.197 0.224,0 0.5,0 C0.776,0 1,0.197 1,0.44 L1,1 Z" />
        </clipPath>
      </defs>
    </svg>
  )
}
