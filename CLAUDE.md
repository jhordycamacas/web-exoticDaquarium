# CLAUDE.md

Contexto para trabajar en este repositorio.

## Qué es

Web vitrina de **Exotic D. Aquarium**, un acuario de Loja (Ecuador) que vende peces
de agua dulce, equipos y peceras armadas a medida. No es una tienda con carrito: el
objetivo es enseñar el catálogo y llevar la conversación a WhatsApp.

Cliente real, proyecto en curso. El código está terminado; **lo que falta es contenido**
(fotos y textos), y por eso todo está diseñado para que rellenarlo no exija tocar código.

## Stack

HTML + CSS + JavaScript **vanilla**, módulos ES nativos. Sin framework, sin build, sin
dependencias, sin `package.json`. Se abre con cualquier servidor estático.

**No introduzcas un bundler, npm ni un framework** sin que lo pida el dueño. La ausencia
de build es deliberada: quien mantiene esto edita archivos y sube cambios, nada más.

```
index.html          Único HTML. Solo el <head>, el header, el contenedor #app y el pie.
css/styles.css      Todo el CSS, en secciones numeradas (1. TOKENS … 22. RESPONSIVE).
js/config.js        Textos, contacto, redes, ubicación. Lo que edita el dueño.
js/data.js          Carga los JSON de /data y normaliza las categorías.
js/router.js        Router por hash. Cada pantalla tiene su URL.
js/views.js         Las cinco pantallas. Cada vista devuelve { html, mount? }.
js/ui.js            Utilidades compartidas: esc, icon, media, waLink, reveal, contadores.
js/main.js          Arranque, header, menú móvil, pie de página.
data/*.json         Fichas de peces, productos y servicios.
assets/             Fotos, video y logo.
```

## Cómo se ejecuta

```bash
npx serve
```

Tiene que ser por servidor: los módulos ES y el `fetch` de los JSON fallan si se abre
el `index.html` con doble clic (`file://`). La vista de error del router ya lo explica.

## Convenciones que hay que respetar

**Todo el texto de cara al usuario va en español**, con acentos correctos. También los
comentarios, los nombres de clases CSS (`.ubi__calles`, `.mapa__pie`) y los identificadores
del dominio (`UBICACION`, `vistaContacto`, `waLink`). Es un proyecto en español de punta a
punta; no lo mezcles con inglés.

**Nada de datos quemados en las vistas.** Los textos van a `js/config.js` y las fichas a
`data/*.json`. Si algo se va a editar alguna vez, va a config.

**El patrón `TBD`.** Los campos sin rellenar valen `'Aún no definido'` (constante `TBD`).
`isTBD()` los detecta y la interfaz los pinta con la clase `.tbd`, en cursiva y apagados,
en vez de dejar un hueco. Cuando añadas un campo nuevo que el dueño deba rellenar, sigue
este patrón en lugar de inventar un valor.

**Imágenes por convención, no por configuración.** `media()` pinta un placeholder que
muestra la ruta exacta del archivo que falta; `hydrateMedia()` añade `.has-media` cuando
la imagen carga de verdad y la foto tapa el placeholder. Consecuencia: para añadir una
foto **basta con dejar el archivo con el nombre que dice el JSON** — `pez-1.jpg`,
`producto-3.jpg`, `servicio-2.jpg`, en `assets/images/catalogo/`. No hay que tocar código.

**Escapa siempre.** Todo lo que venga de config o de los JSON pasa por `esc()` al
interpolarlo en un template. Ya hay `innerHTML` por todas partes; no abras un agujero.

**Los colores solo se tocan en los tokens.** Están en `:root` y en el bloque
`@media (prefers-color-scheme: dark)` de `css/styles.css`. Cambia siempre **los dos**.
No metas hex sueltos en las reglas.

## Decisiones de diseño (y por qué)

**Paleta Color Hunt**: `#3368A0` · `#66A3BF` · `#C8DFDB` · `#F2EFE7`. La muestra está en
`assets/images/ubicacion_y_extras/`.

Es una gama **analógica** (azul → verde agua → crema), sin color opuesto. Por eso la
jerarquía no se hace con un acento caliente sino con **valor**: cuanto más oscuro y
saturado, más importante. De ahí `--hondo` (`#1F4C7D`), el mismo azul llevado a un valor
más profundo para que el CTA le gane a los enlaces sin salirse de la gama. En tema oscuro
se invierte — ahí destaca lo claro — y `--hondo` pasa a ser la menta.

Hubo una paleta anterior de crema y terracota (`--madera`, `--planta`). Ya no existe: si
ves esos nombres en algún sitio, es residuo y hay que limpiarlo.

**Tipografía**: Montserrat en títulos y precios, Inter en el cuerpo. Antes había una serif
(Fraunces) que no cargaba y caía a Times New Roman; el dueño la rechazó explícitamente.
**No vuelvas a meter una serif.**

**Títulos de un solo color.** El `<span class="grad">` de los titulares llevaba un degradado
recortado sobre el texto y el dueño lo rechazó. Ahora `.grad` es solo `color: var(--text)`.
La clase sigue viva como gancho, pero no la conviertas otra vez en degradado.

**El tema claro/oscuro sale del sistema operativo.** No hay interruptor y no se ha pedido.
Cualquier color nuevo tiene que funcionar en los dos.

**Contraste**: mínimo AA (4.5:1 en texto normal, 3:1 en texto grande). Se verificó al fijar
la paleta. Si tocas un token, vuelve a comprobarlo.

## Trampas conocidas

**Git LFS y GitHub Pages.** `.gitattributes` manda a LFS los videos y los `*-original.png`.
**Pages no resuelve LFS**: sirve el fichero puntero en texto plano y el archivo sale roto.
Por eso las fotos que la web sirve de verdad (`.jpg` de catálogo, `.webp`) van como
archivos normales, a propósito. Al añadir un binario, comprueba de qué lado cae:

```bash
git check-attr filter -- ruta/al/archivo
```

**Imágenes pesadas.** Las capturas de pantalla y las fotos de móvil llegan con varios MB.
El repo usa este esquema: el original va a LFS como `nombre-original.png` y la web sirve
un `nombre.webp` comprimido. Así se hizo con el logo (1,13 MB → 37 KB) y con el mapa de
la ubicación (1,7 MB → 176 KB). Hay PIL disponible para convertir; no hay ImageMagick ni
ffmpeg.

**Nombres de archivo.** Las fotos llegan como `WhatsApp Image 2026-08-26 at 09.05.48.jpeg`.
Renómbralas: los espacios y los puntos rompen la URL.

**El router hace `scrollTo(0)` en cada navegación**, antes de llamar a `mount()`. Si una
vista tiene que aparecer desplazada, el scroll va en su `mount()` y hay que restar
`--header-h`, o el header fijo tapa el contenido. Está hecho así en `vistaContacto` para
la ruta `#/contacto/formulario`.

## Documentación

- **`LEEME.md`** — manual del dueño, en español y sin jerga: cómo cambiar textos, subir
  fotos y publicar. **Si cambias algo que ahí se describe, actualízalo**; ya se desincronizó
  una vez con el cambio de paleta.
- **`README.md`** — portada del repo: qué es el proyecto y por dónde va el avance.
