/* ============================================================
   Router por hash — cada pantalla tiene su propia URL
     #/               inicio
     #/catalogo       catálogo (opcional: #/catalogo/productos)
     #/item/pez-1     ficha individual
     #/servicios      servicios
     #/contacto       contacto (#/contacto/formulario baja al formulario)
   ============================================================ */
import { $, $$, initReveal, initCounters, initCardGlow, hydrateMedia, reduceMotion } from './ui.js';
import { vistaInicio, vistaCatalogo, vistaDetalle, vistaServicios, vistaContacto } from './views.js';

const RUTAS = [
  { patron: /^\/?$/,                    vista: vistaInicio,    nav: '#/' },
  { patron: /^\/catalogo(?:\/(\w+))?$/, vista: vistaCatalogo,  nav: '#/catalogo', claves: ['cat'] },
  { patron: /^\/item\/([\w-]+)$/,       vista: vistaDetalle,   nav: '#/catalogo', claves: ['id'] },
  { patron: /^\/servicios$/,            vista: vistaServicios, nav: '#/servicios' },
  { patron: /^\/contacto(?:\/(\w+))?$/,   vista: vistaContacto,  nav: '#/contacto', claves: ['foco'] }
];

function resolver(hash) {
  const ruta = hash.replace(/^#/, '') || '/';
  for (const r of RUTAS) {
    const m = ruta.match(r.patron);
    if (!m) continue;
    const params = {};
    (r.claves || []).forEach((clave, i) => { params[clave] = m[i + 1]; });
    return { ...r, params };
  }
  return { ...RUTAS[0], params: {} };
}

/* Activa los efectos de una pantalla recién pintada */
function activarEfectos(ctx) {
  hydrateMedia(ctx);
  initReveal(ctx);
  initCounters(ctx);
  initCardGlow(ctx);
}

let pintando = false;

export async function navegar() {
  if (pintando) return;
  pintando = true;

  const app = $('#app');
  const { vista, params, nav } = resolver(window.location.hash);

  // Cortina de agua + salida de la pantalla actual
  if (!reduceMotion && app.children.length) {
    const curtain = $('#curtain');
    curtain.classList.remove('is-active');
    void curtain.offsetWidth;
    curtain.classList.add('is-active');
    app.classList.add('is-leaving');
    await new Promise((r) => setTimeout(r, 240));
  }

  let resultado;
  try {
    resultado = await vista(params);
  } catch (error) {
    console.error('Error al abrir la pantalla:', error);
    resultado = {
      html: `
        <div class="screen">
          <section class="section section--first"><div class="container">
            <div class="empty">
              <strong>No se pudieron cargar los datos</strong>
              Abre la página con un servidor local (por ejemplo <code>npx serve</code>);
              el navegador bloquea la lectura de los archivos JSON si abres el HTML directamente.
            </div>
          </div></section>
        </div>`
    };
  }

  app.innerHTML = resultado.html;
  app.classList.remove('is-leaving');
  window.scrollTo({ top: 0, behavior: 'auto' });

  activarEfectos(app);
  await resultado.mount?.(activarEfectos);

  // Marca el enlace de navegación correspondiente
  $$('[data-nav]').forEach((a) => {
    a.classList.toggle('is-active', a.getAttribute('href') === nav);
  });

  pintando = false;
}

export function iniciarRouter() {
  window.addEventListener('hashchange', navegar);

  // Enlaces internos: si ya estamos en esa ruta, repintamos igual
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (!link) return;
    const destino = link.getAttribute('href');
    if (destino === window.location.hash) {
      e.preventDefault();
      navegar();
    }
  });

  if (!window.location.hash) window.location.replace('#/');
  navegar();
}
