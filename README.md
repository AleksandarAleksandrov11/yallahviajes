# Yalah Viajes

Web oficial de **Yalah Viajes** — agencia que organiza viajes y circuitos por
Marruecos para viajeros que salen desde España.

> Tu viaje a Marruecos, organizado desde España. *A un viaje de distancia.*

---

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # compilación de producción
npm run start      # servir la compilación
npm run typecheck  # comprobación de tipos
```

**Requisitos:** Node 20 o superior.

---

## Stack

| Pieza | Elección | Por qué |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | Páginas estáticas, imágenes optimizadas y SEO por página |
| Lenguaje | TypeScript en modo estricto | Los itinerarios son datos tipados, no cadenas sueltas |
| Estilos | Tailwind CSS v4 (`@theme` en CSS) | Los tokens de marca viven en un único sitio |
| Animación | `motion` (Framer Motion) | Solo lo necesario y siempre con `prefers-reduced-motion` |
| Iconos | `lucide-react` | Trazo fino, coherente con la tipografía |
| Analítica | Vercel Web Analytics + Speed Insights | Solo se carga si la persona la acepta |

---

## Arquitectura

```
app/                     Rutas (App Router)
  page.tsx               Home
  viajes/                Índice de viajes
  viajes/[slug]/         Ficha de cada viaje (generada desde data/tours.ts)
  galeria/ nosotros/ contacto/ faq/
  legal/                 Aviso legal · Privacidad · Cookies
  sitemap.ts robots.ts   SEO técnico
  globals.css            Sistema de diseño (tokens, utilidades, texturas)

components/
  brand/                 Logotipo vectorizado (emblema + logotipo tipográfico)
  layout/                Navbar, menú móvil, pie, cortinilla de entrada
  motion/                Primitivas de animación reutilizables
  ui/                    Botones, acordeón, lightbox, secciones legales
  home/ trips/ gallery/ contact/ consent/

data/                    ⬅ TODO EL CONTENIDO EDITABLE VIVE AQUÍ
  site.ts                Marca, contacto, navegación, redes
  tours.ts               Los dos itinerarios, día a día
  destinations.ts        Destinos que aparecen en las rutas
  gallery.ts             Composición de la galería
  faq.ts                 Preguntas frecuentes
  legal.ts               Datos del titular e inventario de cookies
  images.ts              Fotografías (autogenerado)

public/
  img/                   Fotografías optimizadas
  brand/                 Logotipo en SVG (claro, oscuro, emblema, lockup)

scripts/build-images.py  Regenera public/img + data/images.ts desde los originales
```

### Contenido separado de la presentación

**Para cambiar un precio, un día del itinerario, una FAQ o una foto no hay que
tocar ni un componente.** Todo está en `data/`. Las páginas se generan a partir
de ahí: añadir un tercer viaje a `data/tours.ts` crea su ficha, su entrada en la
comparativa, su enlace en el pie y su URL en el sitemap automáticamente.

Cada fichero de `data/` documenta su formato en cabecera.

---

## Identidad visual

Extraída del logotipo original de la marca, muestreando los colores directamente
del archivo:

| Token | Valor | Uso |
| --- | --- | --- |
| `ink` | `#0B2545` | Azul marino del emblema. Confianza: navegación, titulares, botones |
| `gold` | `#C1943A` | Oro del rombo central. Acentos, filetes, iconos, detalles |
| `gold-deep` | `#8A6114` | Variante para texto pequeño (contraste AA) |
| `paper` / `sand` | `#FCFAF7` / `#F4EFE8` | Base. La mayor parte de la interfaz respira en blanco roto |
| `terracotta` | `#B0603A` | Tierra marroquí. Errores de formulario y calidez puntual |

**Tipografía:** Cormorant Garamond (titulares, editorial) + Inter (texto e interfaz).

**Recursos de marca propios:** máscara de arco marroquí, filete con rombo, velo de
zellige, grano de arena y numeración de secciones. Ningún gradiente decorativo
gratuito y ningún borde redondeado por defecto.

El logotipo se define una sola vez (`components/brand/BrandSprite.tsx`) y se
reutiliza con `<use>`, así no se repite su peso en cada cabecera y pie.

---

## Fotografía

**Todas las imágenes son material propio de Yalah Viajes**, extraídas de los
dossieres de itinerarios y del archivo de la agencia. No se ha usado ninguna
fotografía de banco de imágenes.

Para añadir o sustituir fotos:

```bash
# 1. Colocar los originales y actualizar el mapa de scripts/build-images.py
python3 scripts/build-images.py
# 2. Regenera public/img/*.jpg y data/images.ts (con blur placeholders)
```

Cada imagen se sirve con `next/image`, `sizes` explícito, `blurDataURL` propio y
proporción fija: no hay saltos de maquetación al cargar.

---

## Animación

Tres reglas:

1. **Toda animación tiene una razón.** Nada se mueve por moverse.
2. **`prefers-reduced-motion` se respeta de verdad:** los componentes devuelven
   marcado plano, no contenido invisible esperando a un observador.
3. **Nada bloquea el contenido.** La cortinilla de entrada dura 1,85 s, solo se
   ve en la primera visita de cada sesión y tiene un temporizador de seguridad.

Primitivas en `components/motion/`: `Reveal`, `RevealGroup`, `SplitText`,
`ImageReveal`, `Parallax`.

---

## Cookies y analítica

- Aviso al entrar, con **rechazar al mismo nivel que aceptar** (guía de la AEPD).
- La analítica de Vercel **no se descarga** hasta que se acepta.
- La decisión se puede cambiar en cualquier momento desde el enlace
  «Configurar cookies» del pie o desde `/legal/cookies`.
- Al subir `CONSENT_VERSION` en `components/consent/ConsentProvider.tsx` se
  vuelve a pedir consentimiento a todo el mundo (útil si cambia la política).

---

## SEO

- `title`, `description`, canonical, Open Graph y Twitter Card por página.
- Datos estructurados: `TravelAgency`, `TouristTrip` (uno por viaje),
  `BreadcrumbList` y `FAQPage`.
- `sitemap.xml` y `robots.txt` generados desde `data/`.
- Las páginas legales van con `noindex` y excluidas del rastreo.
- **`TouristTrip` no declara `offers` mientras no haya precio real:** marcar un
  precio inventado sería dar un dato falso a Google.

---

## Despliegue

Pensado para Vercel. `vercel.json` incluye cabeceras de seguridad, caché inmutable
para `/img` y `/brand`, y redirecciones desde rutas antiguas o en inglés.

```bash
vercel --prod
```

Antes de publicar hay que definir la variable de entorno **`NEXT_PUBLIC_SITE_URL`**
con el dominio definitivo: de ella dependen el canonical, el sitemap, las Open
Graph y los datos estructurados. Ver `.env.example`.

**[CONTENIDO-PENDIENTE.md](./CONTENIDO-PENDIENTE.md)** recoge lo que queda por
completar (precios, algunas respuestas de FAQ y las fotos en alta resolución)
con el fichero exacto donde va cada cosa.

---

## Regla de contenido

No hay ni un dato inventado en esta web: ni precios, ni hoteles, ni años de
experiencia, ni certificaciones. Cuando falta información, la web lo dice con
claridad y ofrece la vía rápida para preguntarlo.
