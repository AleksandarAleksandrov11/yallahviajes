# Contenido pendiente

Esta web está construida con **una regla estricta: no se ha inventado ningún dato**.
Todo lo que aparece publicado procede de los materiales facilitados por Yalah Viajes
(los dos dossieres de itinerarios y el material de marca).

Lo que todavía falta está listado aquí. Cada punto indica **el fichero exacto** que
hay que tocar; no hace falta modificar ningún componente ni volver a maquetar nada.

---

## 1. Prioridad alta — bloquea la publicación

### Datos legales del titular — `data/legal.ts`

La LSSI-CE (art. 10) y el RGPD (arts. 13-14) obligan a publicarlos. Mientras estén
vacíos, las páginas legales muestran el marcador resaltado en pantalla.

| Campo | Qué es |
| --- | --- |
| `legalName` | Razón social o nombre y apellidos del autónomo |
| `taxId` | NIF / CIF |
| `address` | Domicilio completo |
| `email` | Correo de contacto legal y para ejercer derechos RGPD |
| `registry` | Datos registrales, si la sociedad está inscrita |
| `travelAgencyLicence` | Nº de licencia / código de agencia de viajes |

También en la política de privacidad: `[PROVEEDOR DE CORREO ELECTRÓNICO]` (el
servicio con el que se gestionan los correos: Google Workspace, Zoho…).

### Dominio definitivo — `data/site.ts` → `site.url`

Ahora mismo `https://www.yalahviajes.com`. Afecta a los canonical, al sitemap,
a las Open Graph y a los datos estructurados.

### Precios — `data/tours.ts`

Cada viaje tiene `price: { from: null, … }`. Mientras sea `null`, la web muestra
**«Precio a consultar»** y lleva al formulario y a WhatsApp; es honesto y convierte,
pero conviene poner el precio real:

```ts
price: {
  from: 000,              // importe por persona
  currency: 'EUR',
  unit: 'por persona',
  note: 'Mínimo 2 personas', // o lo que corresponda
}
```

En cuanto `from` deje de ser `null`, el precio aparece en las tarjetas, en la
comparativa, en la ficha del viaje y en los datos estructurados de Google.

---

## 2. Prioridad media — mejora la conversión

### Correo electrónico público — `data/site.ts` → `contact.email`

Mientras sea `null`, el pie de página simplemente no muestra la línea de correo
(no aparece ningún hueco ni marcador). Al rellenarlo, aparece automáticamente.

### Formulario de contacto — `components/contact/ContactForm.tsx` → `ENDPOINT`

Hoy el formulario **valida y compone el mensaje, y lo abre en WhatsApp**, que es
el canal real de la agencia. No finge un envío que no ocurre.

Cuando exista un backend (una API route, Resend, Formspree, Brevo…), basta con:

```ts
const ENDPOINT: string | null = 'https://…/consulta'
```

El formulario pasará a hacer `POST` con el JSON de los campos y mostrará el panel
de éxito. El texto de ese panel está en `SuccessPanel`, dentro del mismo fichero.

### Testimonios — `data/testimonials.ts`

El array está vacío **a propósito**: no hay ni habrá reseñas inventadas. Mientras
esté vacío, `/testimonios` y la home muestran un bloque editorial honesto que
explica la política y lleva a Instagram.

Al añadir el primer testimonio con el formato documentado en el fichero, ambas
secciones pasan a mostrarlos automáticamente, sin tocar nada más.

### Respuestas de FAQ pendientes — `data/faq.ts`

Las preguntas con `answer: null` muestran un aviso honesto («estamos completando
esta respuesta») con acceso directo a WhatsApp, en lugar de un dato inventado.
Faltan:

- ¿Cuántas personas forman el grupo?
- ¿Hay fechas de salida fijas?
- ¿En qué hoteles y riads nos alojamos?
- ¿Podéis adaptar el menú a alergias, dietas o comida vegetariana?
- ¿Cuánto cuesta el viaje?
- ¿Cómo se reserva? (proceso, señal, formas de pago)
- ¿Qué política de cancelación tenéis?
- ¿Qué documentación necesito para viajar a Marruecos desde España?
- ¿Qué moneda se usa y dónde se cambia?

Sustituir `answer: null` por el texto real. Las respuestas ya escritas alimentan
el structured data `FAQPage` de Google; las pendientes se excluyen a propósito.

### Horario de atención — `data/site.ts` → `contact.hours`

Si es `null`, la página de contacto muestra «Escríbenos a cualquier hora:
respondemos en menos de 24 h».

---

## 3. Prioridad baja

- **Redes sociales** — `data/site.ts` → `social`. Ahora solo está Instagram
  (`@yalahviajes`, dato real del material de marca). Añadir Facebook o TikTok si existen.
- **Ubicación en España** — `data/site.ts` → `contact.baseLocation`. Útil para SEO local.
- **Logotipo en vectorial** — los trazados de `components/brand/paths.ts` se han
  obtenido vectorizando el logotipo original. Si existe el archivo `.ai`/`.svg`
  original, se puede sustituir ahí y en `public/brand/`.

---

## 4. Lo que NO está pendiente

Para que quede claro qué es dato real y qué no:

| Dato | Origen |
| --- | --- |
| Los dos itinerarios completos, día a día | Dossieres oficiales de la agencia, texto literal |
| Listas de «el viaje incluye» | Apartado «TOUR INCLUYE» de cada dossier |
| Lugares, rutas y experiencias | Solo los que aparecen en los itinerarios |
| Duración (5 días/4 noches y 6 días/5 noches) | Dossieres |
| Teléfono `+34 624 15 89 59` | Material de marca de la agencia |
| Instagram `@yalahviajes` | Material de marca de la agencia |
| Lema «a un viaje de distancia» | Material de marca de la agencia |
| Colores azul marino `#0B2545` y oro `#C1943A` | Muestreados del logotipo original |
| Todas las fotografías | Archivo propio de Yalah Viajes |

**No se ha usado ninguna imagen de banco.** No hay años de experiencia, número de
viajeros, certificaciones ni reseñas inventadas en ninguna parte del sitio.

### Nota sobre «no incluye»

El apartado «No incluye» de cada viaje (`notIncluded` en `data/tours.ts`) **no
figura en los dossieres**: se ha redactado por deducción de lo que la agencia no
menciona como incluido (vuelos, seguro, bebidas, entradas no citadas, propinas).
Conviene revisarlo con la agencia antes de publicar.
