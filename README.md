# Exotic D. Aquarium — sitio web

Web vitrina de **Exotic D. Aquarium**, un acuario de Loja (Ecuador) que vende peces de
agua dulce, equipos y peceras armadas a medida.

No es una tienda con carrito. El objetivo es enseñar el catálogo, explicar cómo se
trabaja y llevar la conversación a WhatsApp, que es por donde se cierra todo.

> **Manual de uso:** si lo que buscas es cambiar textos, subir fotos o publicar la web,
> está todo explicado paso a paso en **[LEEME.md](LEEME.md)**.

---

## Cómo se ve

Cinco pantallas, cada una con su URL propia:

| Ruta | Pantalla |
|---|---|
| `#/` | Inicio: video, quiénes somos, destacados, proceso y preguntas |
| `#/catalogo` | Catálogo completo, con pestañas y buscador |
| `#/item/pez-1` | Ficha individual: foto, galería, video y datos del pez |
| `#/servicios` | Servicios: armado, mantenimiento, asesoría |
| `#/contacto` | Ubicación en el mapa y formulario |

## Stack

HTML + CSS + JavaScript **vanilla**, con módulos ES nativos.

Sin framework, sin bundler, sin dependencias, sin paso de compilación. Es deliberado:
quien mantiene esto edita un archivo, lo sube y ya está publicado. No hay nada que
instalar ni que recordar.

```bash
npx serve        # y abrir http://localhost:3000
```

Tiene que ser por servidor. Si abres `index.html` con doble clic, el navegador bloquea
la carga de los módulos y de los JSON, y no se ve nada.

## Estructura

```
index.html          Único HTML: cabecera, contenedor de la app y pie
css/styles.css      Todo el CSS, en 22 secciones numeradas
js/
  config.js         Textos, contacto, redes y ubicación  ← lo que se edita a diario
  data.js           Carga y normaliza los JSON del catálogo
  router.js         Router por hash
  views.js          Las cinco pantallas
  ui.js             Utilidades: iconos, medios, enlaces, animaciones
  main.js           Arranque, header, menú móvil, pie
data/               Fichas de peces, productos y servicios (JSON)
assets/             Fotos, video y logo
```

Dos ideas sostienen el proyecto:

**Todo lo editable está en un sitio.** Textos y contacto en `js/config.js`; las fichas en
`data/*.json`. No hay contenido escrito dentro de las pantallas.

**Las fotos entran por convención.** Mientras una foto falta, la web muestra un hueco
rayado que **dice el nombre exacto del archivo que espera**. Copias el archivo con ese
nombre y la foto aparece sola. No hay que tocar código para llenar el catálogo.

---

## Por dónde va el avance

### Terminado

- **Estructura y navegación.** Las cinco pantallas, el router por hash, las transiciones
  entre vistas y el menú móvil.
- **Catálogo.** Pestañas por categoría, buscador, fichas individuales con galería y
  especificaciones. Funciona ya, con datos de relleno.
- **Diseño visual.** Paleta Color Hunt (`#3368A0` · `#66A3BF` · `#C8DFDB` · `#F2EFE7`),
  tipografía Montserrat e Inter, tema claro y oscuro según el sistema operativo, y
  contraste verificado en nivel AA.
- **Contacto.** Banner con la ubicación en el mapa y, debajo, el formulario, que envía
  por WhatsApp o por correo. El botón "Pedir asesoría" entra directo al formulario.
- **Datos del negocio.** WhatsApp, correo, ciudad, Instagram, Facebook y TikTok, ya
  conectados.
- **Rendimiento de imágenes.** Los originales pesados quedan archivados en Git LFS y la
  web sirve versiones comprimidas (el logo pasó de 1,13 MB a 37 KB; el mapa, de 1,7 MB
  a 176 KB).

### En curso

- **Fotos del catálogo** — 1 de 18. Falta `pez-2` … `pez-8`, los 6 productos y los 4
  servicios, más las galerías de cada ficha.
- **Textos del catálogo.** Las 18 fichas están creadas pero sin rellenar: 238 campos
  marcados como *"Aún no definido"* (nombres, precios, descripciones y parámetros del
  agua). La web los muestra en gris y en cursiva mientras tanto, sin romperse.
- **Dirección exacta.** El mapa ya está puesto; las calles y la referencia que se leen
  debajo son texto de demostración, pendiente de reescribir.
- **Horario de atención** — sin definir.

### Pendiente

- Publicar. **Ojo:** GitHub Pages no resuelve Git LFS y serviría el video del inicio
  roto. Conviene Netlify, Vercel o Cloudflare Pages, que sí lo soportan. Está explicado
  en `.gitattributes` y en `LEEME.md`.
- Repasar los textos definitivos con el dueño.

---

## Documentación

| Archivo | Para quién |
|---|---|
| [`LEEME.md`](LEEME.md) | El dueño del acuario: cómo editar y publicar, sin jerga |
| [`CLAUDE.md`](CLAUDE.md) | Claude Code: convenciones, decisiones de diseño y trampas |
