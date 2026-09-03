# Contenido pendiente y pasos para publicar

Esta web está construida con **una regla estricta: no se ha inventado ningún dato**.
Todo lo publicado procede de los materiales de Yalah Viajes (los dos dossieres de
itinerarios, el material de marca y los datos facilitados por la titular).

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

### Precios (recomendable, no bloquea)

Cada viaje tiene `price.from = null` en `data/tours.ts`. Mientras siga así, la
web muestra **«Precio a consultar»** y lleva al formulario y a WhatsApp. Para
publicar el importe:

```ts
price: {
  from: 000,                  // importe por persona
  currency: 'EUR',
  unit: 'por persona',
  note: 'Mínimo 2 personas',  // o lo que corresponda
}
```

En cuanto `from` deje de ser `null`, el precio aparece en las tarjetas, en la
comparativa, en la ficha del viaje y en los datos estructurados de Google
(que hoy se omiten a propósito para no dar un precio falso).

---

## 2. Fotografías

Todas las fotos actuales son material propio de Yalah Viajes, extraídas de los
dossieres y del archivo de la agencia. **No se usa ninguna imagen de banco**, y
así lo declara el aviso legal.

Doce de ellas vienen de los PDF y son de baja resolución (324-605 px). Ya se han
sacado de los huecos grandes, pero conviene sustituirlas por el original en alta
cuando esté disponible:

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

Faltan fotos propias de dos experiencias que sí están en los itinerarios:
**sandboard** (ruta de 5 días) y **tatuajes de henna** (ambas rutas).

---

## 3. Respuestas de FAQ pendientes

En `data/faq.ts`, las preguntas con `answer: null` muestran un aviso honesto
(«estamos completando esta respuesta») con acceso directo a WhatsApp, en lugar
de un dato inventado. Faltan:

- ¿Cuántas personas forman el grupo?
- ¿Hay fechas de salida fijas?
- ¿En qué hoteles y riads nos alojamos?
- ¿Podéis adaptar el menú a alergias, dietas o comida vegetariana?
- ¿Cuánto cuesta el viaje?
- ¿Cómo se reserva? (proceso, señal, formas de pago)
- ¿Qué política de cancelación tenéis?
- ¿Qué documentación necesito para viajar a Marruecos desde España?
- ¿Qué moneda se usa y dónde se cambia?

Sustituir `answer: null` por el texto real. Las ya respondidas alimentan el
structured data `FAQPage` de Google; las pendientes se excluyen a propósito.

---

## 4. Otros datos opcionales

- **Horario de atención** — `data/site.ts` → `contact.hours`. Si es `null`, la
  página de contacto dice «respondemos en menos de 24 h».
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
