# Exotic D. Aquarium — guía para rellenar la web

## Cómo abrirla

La página lee archivos JSON, así que **no funciona abriendo `index.html` con doble clic**.
Necesita un servidor local. Desde esta carpeta:

```bash
python -m http.server 5500
```

Y abre `http://localhost:5500`.

---

## Las pantallas

Cada pantalla tiene su propia dirección. Puedes compartir el enlace de un pez concreto.

| Dirección | Pantalla |
|---|---|
| `#/` | Inicio |
| `#/catalogo` | Catálogo completo |
| `#/catalogo/productos` | Catálogo abierto en una pestaña |
| `#/item/pez-1` | Ficha individual (foto, video, datos) |
| `#/servicios` | Servicios, proceso y preguntas |
| `#/contacto` | Formulario y datos de contacto |

El tema claro u oscuro **lo decide el sistema operativo**. No hay botón: si tu Windows está
en modo claro, la web se ve clara. El diseño está pensado **partiendo del tema claro**
(papel cálido); el oscuro es la variante de noche.

---

## 1. Tus datos de contacto → `js/config.js`

Es lo primero que deberías llenar. Mientras estos campos estén vacíos, la web muestra
"Aún no definido" y el botón flotante de WhatsApp no aparece.

```js
export const SITE = {
  whatsapp: '',   // '593987654321' — sin +, sin espacios
  email: '',      // 'hola@exoticdaquarium.com'
  ciudad: TBD,    // 'Loja, Ecuador'
  horario: TBD,   // 'Lun a sáb, 09:00 – 19:00'
  instagram: '',  // URL completa. Vacío = no se muestra el icono
  facebook: '',
  tiktok: ''
};
```

En ese mismo archivo están los textos del inicio (`HOME`), el texto de "Quiénes somos"
(`NOSOTROS`), los cuatro pasos del proceso (`PROCESO`) y las preguntas frecuentes (`FAQ`).
Las respuestas que aún no sabemos están como `TBD`.

> El texto de `NOSOTROS.parrafos` es el que enviaste. La última frase venía cortada
> ("...ayudarte a crear un acuario") y la cerramos como *"...un acuario del que te
> sientas orgulloso"*. Cámbiala si tenías otro final en mente.

**Las métricas del inicio están en cero a propósito** (`HOME.stats`). Pon los números
reales y se animarán al hacer scroll; mientras sean 0 muestran "Aún no definido".

---

## 2. Peces, productos y servicios → `data/*.json`

| Archivo | Contiene |
|---|---|
| `data/peces.json` | 8 peces de ejemplo (`pez-1` … `pez-8`) |
| `data/productos.json` | 6 productos (`producto-1` … `producto-6`) |
| `data/servicios.json` | 4 servicios (`servicio-1` … `servicio-4`) |

Cada ficha tiene esta forma:

```json
{
  "id": "pez-1",                     ← no lo cambies sin cambiar también el nombre de las fotos
  "categoria": "peces",
  "nombre": "Pez 1",                 ← "Betta Halfmoon"
  "subtitulo": "Aún no definido",    ← nombre científico o modelo
  "resumen": "Aún no definido",      ← una línea, se ve en la tarjeta
  "descripcion": ["Aún no definido", "Aún no definido"],  ← párrafos de la ficha
  "precio": null,                    ← 15.00 (número, sin comillas ni $)
  "tipo": "Aún no definido",         ← "Agua dulce"
  "destacado": true,                 ← aparece en el inicio
  "novedad": false,
  "imagen": "assets/images/catalogo/pez-1.jpg",
  "galeria": [ ... tres fotos más ... ],
  "video": "assets/video/pez-1.mp4",
  "especificaciones": { "Tipo de agua": "Aún no definido", ... }
}
```

Puedes añadir o quitar filas de `especificaciones` libremente: la ficha dibuja las
que encuentre. Para agregar un pez nuevo, copia un bloque completo y cambia el `id`.

> Cuidado: el JSON no admite comas de más al final ni comillas simples.
> Si la pantalla se queda en blanco, casi siempre es una coma mal puesta.

---

## 3. Fotos y videos

Los huecos rayados que ves en la web **te dicen exactamente qué archivo falta**.
Copia el archivo con ese nombre y la foto aparece sola — no hay que tocar código.

```
assets/
├── video/
│   ├── hero.mp4          ← video de peces del inicio (el grande)
│   ├── hero.webm         ← opcional, versión más liviana
│   ├── pez-1.mp4         ← video de cada ficha
│   └── producto-1.mp4
└── images/
    ├── hero-poster.jpg   ← imagen fija mientras carga el video del inicio
    ├── nosotros.jpg      ← foto vertical de "Quiénes somos" (unos 900×1125)
    └── catalogo/
        ├── pez-1.jpg     ← foto principal (sale en la tarjeta)
        ├── pez-1-1.jpg   ← galería de la ficha
        ├── pez-1-2.jpg
        └── pez-1-3.jpg
```

Recomendaciones: fotos horizontales de **1200×900 px** aprox. y el video del inicio
en **1920×1080, menos de 10 MB** y sin audio (se reproduce en silencio).

Mientras no existan los archivos, la consola del navegador mostrará errores 404.
Es normal y esperado: desaparecen cuando subas las fotos.

---

## 4. Cuando tengas base de datos

Solo hay que cambiar `js/data.js`:

```js
const FUENTES = {
  peces:     'data/peces.json',      →  'https://tu-api.com/peces'
  productos: 'data/productos.json',
  servicios: 'data/servicios.json'
};
```

Mientras la API devuelva objetos con los mismos campos, todo lo demás sigue funcionando.

---

## Los colores

Están todos arriba del todo en `css/styles.css`, en el bloque `:root`:

| Token | Para qué sirve |
|---|---|
| `--agua` | Color de marca: enlaces, botón principal, foco, pestañas activas |
| `--madera` | Acento cálido **reservado**: CTA, precios, etiqueta "Destacado" |
| `--planta` | Verde de detalle. Casi no se usa, y es a propósito |
| `--text` `--muted` `--dim` | Los tres niveles de texto |
| `--bg` `--surface` | Fondo de la página y de las tarjetas |

La idea de fondo: **el verde y el azul los ponen tus fotos, no la interfaz**. Si la web
fuera verde, las fotos de los peces se hundirían en el fondo. Por eso el marco es neutro
cálido y el acento fuerte es terracota: contrasta con las fotos en vez de competir con
ellas. Es lo mismo que hacen Tropica (azul-agua sobre grises) y Green Aqua — que se
llama "verde" y usa naranja de acento.

Si cambias un color, cámbialo en los **dos** bloques: `:root` y el de
`@media (prefers-color-scheme: dark)`.

---

## Estructura de archivos

```
index.html          esqueleto (casi vacío, todo se dibuja con JavaScript)
css/styles.css      todo el diseño; los colores están arriba, en :root
js/
├── config.js       ← tus textos y datos de contacto
├── data.js         ← de dónde salen los peces y productos
├── ui.js           piezas reutilizables (tarjetas, huecos, iconos)
├── views.js        las cinco pantallas
├── router.js       cambia de pantalla sin recargar
└── main.js         cabecera, pie y arranque
data/*.json         ← el contenido del catálogo
assets/             ← tus fotos, videos y el logo
```

Los dos archivos que más vas a tocar están marcados con ←.
