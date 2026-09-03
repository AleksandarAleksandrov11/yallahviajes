# Contenido pendiente y pasos para publicar

Los itinerarios, las inclusiones, los precios y los datos de la titular proceden
de los materiales facilitados por Yallah Viajes y son literales.

**Las políticas comerciales sí se han redactado desde cero** a petición de la
agencia, para no dejar huecos en la web: grupos, fechas de salida, proceso de
reserva, cancelación y adaptación de menús. Son condiciones razonables y
habituales en este tipo de circuito, pero **hay que leerlas y confirmarlas**:
una vez publicadas son compromisos frente al cliente. Están todas en la tabla
del apartado 1.

---

## 1. Antes de dar al botón de publicar

### Dominio

Definir `NEXT_PUBLIC_SITE_URL` en las variables de entorno de Vercel con el
dominio definitivo, por ejemplo `https://www.yalahviajes.com`. De ello dependen
el `canonical`, el sitemap, las Open Graph y los datos estructurados.

Si no se define, se usa el dominio de producción que asigna Vercel.

### Verificación en Google

1. Dar de alta el dominio en **Google Search Console** y enviar
   `https://tu-dominio/sitemap.xml`.
2. Crear una ficha de **Google Business Profile**. Los datos estructurados de la
   web ya declaran dirección, teléfono y correo, así que ambos coincidirán.

### Revisar los compromisos publicados

Estos datos ya están publicados y son **compromisos públicos**. Si alguno no
coincide con cómo trabajáis, hay que corregirlo antes de dar difusión al sitio:

| Dato | Dónde | Valor publicado |
| --- | --- | --- |
| Precio ruta 5 días | `data/tours.ts` | Desde 275 € por persona |
| Precio ruta 6 días | `data/tours.ts` | Desde 400 € por persona |
| Grupos | `data/faq.ts` | Viajes privados, solo tu grupo |
| Fechas | `data/faq.ts` | Sin calendario fijo, cualquier día del año |
| Reserva | `data/faq.ts` | Señal por transferencia; resto a la llegada |
| Cancelación | `data/faq.ts` | +15 días: señal íntegra · 15-7 días: se retiene lo comprometido · −7 días: sin devolución |
| Horario | `data/site.ts` | Todos los días, 9:00-21:00 |

El precio alimenta también los datos estructurados de Google (`offers`), así que
un precio desactualizado se muestra en los resultados de búsqueda.

---

## 2. Fotografías

Todas las fotos actuales son material propio de Yallah Viajes, extraídas de los
dossieres y del archivo de la agencia. **No se usa ninguna imagen de banco**, y
así lo declara el aviso legal.

En la segunda entrega llegaron cinco fotos en alta resolución que ya están
integradas: dromedario al amanecer, Jemaa el-Fna al atardecer, quads, sandboard
y henna. Las dos últimas cubren experiencias que aparecen en los itinerarios y
de las que no había foto.

Once fotos vienen de los PDF y siguen siendo de baja resolución (324-605 px).
Ya se han sacado de los huecos grandes, pero conviene sustituirlas por el
original en alta cuando esté disponible:

| Imagen | Resolución | Dónde se usa |
| --- | --- | --- |
| `ait-ben-haddou-palmeral` | 324×324 | Destino «Gargantas del Todra», galería |
| `dunas-caminante` | 324×324 | Galería |
| `te-menta` | 432×432 | Home, Nosotros, galería |
| `jaima-nomada` | 432×432 | Nosotros, galería |
| `valle-pueblo` | 432×432 | Destino «Valle del Dades», galería |
| `riad-desayuno` | 432×432 | Home, galería |
| `jemaa-el-fna-noche` | 432×432 | Home, galería |
| `camellos-silueta` | 432×432 | Galería |
| `dunas-atardecer` | 432×432 | Galería |
| `musicos-bereberes` | 600×600 | Nosotros, destino «Khamlia» |
| `puerta-monumental` | 605×807 | Galería |

Para sustituir o añadir fotos:

```bash
# 1. Copiar los originales y actualizar el mapa de scripts/build-images.py
python3 scripts/build-images.py
# 2. Regenera public/img/*.jpg y data/images.ts con sus blur placeholders
```

Todas las experiencias de los itinerarios tienen ya foto propia.

---

## 3. Preguntas frecuentes

Las 21 preguntas están respondidas y alimentan el structured data `FAQPage` de
Google. Las de precio, reserva, cancelación y grupos son compromisos públicos:
ver la tabla del apartado 1.

---

## 4. Otros datos opcionales

- **Redes sociales** — `data/site.ts` → `social`. Solo está Instagram.
- **Título de agencia de viajes** — `data/legal.ts` →
  `travelAgencyLicence`. Si la actividad requiere título administrativo
  autonómico, al rellenarlo aparece automáticamente en el aviso legal.

---

## 5. Lo que ya está resuelto

| Dato | Origen |
| --- | --- |
| Titular, NIF, domicilio y correo | Facilitados por la titular |
| Los dos itinerarios completos, día a día | Dossieres oficiales, texto literal |
| Listas de «el viaje incluye» | Apartado «TOUR INCLUYE» de cada dossier |
| Lugares, rutas y experiencias | Solo los que aparecen en los itinerarios |
| Teléfono e Instagram | Material de marca de la agencia |
| Lema «a un viaje de distancia» | Material de marca de la agencia |
| Colores azul `#0B2545` y oro `#C1943A` | Muestreados del logotipo original |

No hay años de experiencia, número de viajeros ni certificaciones inventadas en
ninguna parte del sitio.

### Nota sobre «no incluye»

El apartado `notIncluded` de cada viaje **no figura en los dossieres**: se ha
redactado por deducción de lo que la agencia no menciona como incluido (vuelos,
seguro, bebidas, entradas no citadas, propinas). Conviene revisarlo.
