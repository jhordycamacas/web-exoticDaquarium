/* ============================================================
   Las cinco pantallas del sitio
   Cada vista devuelve { html, mount? }
   ============================================================ */
import { SITE, HOME, NOSOTROS, PROCESO, FAQ, TBD } from './config.js';
import * as D from './data.js';
import {
  $, $$, esc, val, valCorto, precio, icon, iconSolid, media, slot, hydrateMedia,
  waLink, mailLink, marquee, seccionCabecera, bloqueCTA, initFaq, isTBD
} from './ui.js';

/* ---------- Tarjeta reutilizable ---------- */
function tarjeta(item, delay = 0) {
  const etiquetas = [
    `<span class="tag">${esc(D.CATEGORIAS[item.categoria]?.etiqueta || item.categoria)}</span>`,
    item.destacado ? '<span class="tag tag--hot">Destacado</span>' : '',
    item.novedad ? '<span class="tag tag--new">Nuevo</span>' : ''
  ].join('');

  return `
    <a class="card" href="#/item/${esc(item.id)}" data-link data-reveal style="--delay:${delay}ms">
      ${media(item.imagen, item.nombre, {
        clase: 'card__media',
        tamano: 'sm',
        extra: `<div class="card__tags">${etiquetas}</div>`
      })}
      <div class="card__body">
        <div class="card__top">
          <div>
            <h3 class="card__name">${esc(item.nombre)}</h3>
            <p class="card__sub">${valCorto(item.subtitulo)}</p>
          </div>
          <span class="card__price">${precio(item.precio, true)}</span>
        </div>
        <p class="card__desc">${val(item.resumen)}</p>
        <div class="card__foot">
          <span>${valCorto(item.tipo)}</span>
          <span class="link-arrow">Ver ficha ${icon('arrow')}</span>
        </div>
      </div>
    </a>`;
}

function cuadricula(items) {
  if (!items.length) {
    return `<div class="empty"><strong>Sin resultados</strong>Prueba con otro nombre o cambia el filtro.</div>`;
  }
  return items.map((it, i) => tarjeta(it, Math.min(i, 6) * 60)).join('');
}

/* ============================================================
   1. INICIO
   ============================================================ */
export async function vistaInicio() {
  const [pecesTop, serviciosTop] = await Promise.all([
    D.destacados('peces', 3),
    D.porCategoria('servicios')
  ]);

  const wa = waLink('Hola, quiero asesoría para mi acuario.');

  const html = `
    <div class="screen">
      <!-- HERO -->
      <section class="hero">
        <div class="container hero__inner">
          <span class="pill" data-reveal>
            <span class="pill__dot"></span> ${esc(HOME.pill)}
          </span>

          <h1 class="display" data-reveal style="--delay:60ms">
            ${esc(HOME.titulo[0])} <span class="grad">${esc(HOME.titulo[1])}</span>
          </h1>

          <p class="lead" data-reveal style="--delay:130ms">${esc(HOME.subtitulo)}</p>

          <div class="hero__cta" data-reveal style="--delay:190ms">
            <a href="#/catalogo" class="btn" data-link>Ver el catálogo ${icon('arrow')}</a>
            <a href="#/contacto" class="btn btn--ghost" data-link>Pedir asesoría</a>
          </div>

          <!-- Video de fondo marino -->
          <div class="hero__stage" id="heroStage" data-reveal style="--delay:250ms">
            ${slot('video', 'assets/video/hero.mp4')}
            <video id="heroVideo" muted loop playsinline autoplay
                   poster="assets/images/hero-poster.jpg" preload="auto">
              <source src="assets/video/hero.webm" type="video/webm" />
              <source src="assets/video/hero.mp4" type="video/mp4" />
            </video>
            <div class="hero__overlay">
              <p>${esc(HOME.videoTexto)}</p>
              <a href="#/catalogo" class="btn btn--sm" data-link>Explorar ${icon('arrow')}</a>
            </div>
          </div>

          <!-- Métricas -->
          <div class="stats" data-reveal>
            ${HOME.stats.map((s) => `
              <div class="stat">
                <div class="stat__num" data-count="${s.num}" data-suffix="${s.sufijo}">0</div>
                <div class="stat__label">${esc(s.label)}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>

      ${marquee(HOME.marquee)}

      <!-- Destacados -->
      <section class="section">
        <div class="container">
          ${seccionCabecera(
            'Catálogo',
            'Lo que hay nadando <span class="grad">ahora mismo</span>',
            'Cada ejemplar pasa cuarentena antes de salir. Entra a la ficha para ver sus requisitos.',
            '<a href="#/catalogo" class="link-arrow" data-link>Ver todo el catálogo ' + icon('arrow') + '</a>'
          )}
          <div class="grid">${cuadricula(pecesTop)}</div>
        </div>
      </section>

      <!-- Servicios -->
      <section class="section section--tight">
        <div class="container">
          ${seccionCabecera(
            'Servicios',
            'Más que vender peces',
            '',
            '<a href="#/servicios" class="link-arrow" data-link>Ver detalle ' + icon('arrow') + '</a>'
          )}
          <div class="grid grid--3">
            ${serviciosTop.slice(0, 3).map((s, i) => `
              <a href="#/item/${esc(s.id)}" class="svc" data-link data-reveal style="--delay:${i * 80}ms">
                <span class="svc__icon">${icon(['tank', 'drop', 'spark'][i % 3])}</span>
                <h3>${esc(s.nombre)}</h3>
                <p>${val(s.resumen)}</p>
                <ul class="svc__list">
                  ${(s.incluye || [TBD, TBD, TBD]).map((x) => `<li>${val(x)}</li>`).join('')}
                </ul>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <!-- Quiénes somos -->
      <section class="section section--tight">
        <div class="container">
          <div class="nosotros" data-reveal>
            <div class="nosotros__texto">
              <span class="eyebrow">Quiénes somos</span>
              <h2>${esc(NOSOTROS.titulo)}</h2>
              ${NOSOTROS.parrafos.map((t) => `<p>${esc(t)}</p>`).join('')}
              <a href="#/contacto" class="btn btn--calido" data-link>Hablemos ${icon('arrow')}</a>
            </div>
            <div class="nosotros__foto">
              ${media('assets/images/nosotros.jpg', 'Nuestro acuario', { tamano: 'md' })}
            </div>
          </div>
        </div>
      </section>

      <!-- Proceso -->
      <section class="section section--tight">
        <div class="container">
          ${seccionCabecera('Cómo trabajamos', 'Cuatro pasos, cero sustos')}
          <div class="steps" data-reveal>
            ${PROCESO.map((p) => `
              <div class="step">
                <div class="step__n">PASO ${esc(p.n)}</div>
                <h3>${esc(p.titulo)}</h3>
                <p>${esc(p.texto)}</p>
              </div>`).join('')}
          </div>
        </div>
      </section>

      ${bloqueCTA()}
    </div>`;

  return {
    html,
    mount() {
      // El video aparece solo cuando exista el archivo
      const stage = $('#heroStage');
      const video = $('#heroVideo');
      if (stage && video) {
        video.addEventListener('loadeddata', () => {
          stage.classList.add('has-video');
          video.play().catch(() => {});
        }, { once: true });
      }
    }
  };
}

/* ============================================================
   2. CATÁLOGO
   ============================================================ */
const estadoCatalogo = { categoria: 'peces', marca: 'todos', busqueda: '' };

export async function vistaCatalogo(params) {
  if (params.cat && D.CATEGORIAS[params.cat]) estadoCatalogo.categoria = params.cat;

  const tabs = ['peces', 'productos', 'servicios', 'todo'];
  const nombreTab = (t) => (t === 'todo' ? 'Todo' : D.CATEGORIAS[t].etiqueta);

  const html = `
    <div class="screen">
      <section class="section section--first">
        <div class="container">
          ${seccionCabecera(
            'Catálogo',
            'Peces, equipos y <span class="grad">servicios</span>',
            'Todo lo que tenemos disponible. Toca cualquier tarjeta para ver la ficha completa con fotos y video.'
          )}

          <div class="tabs" id="tabs" data-reveal>
            ${tabs.map((t) => `
              <button class="tab ${t === estadoCatalogo.categoria ? 'is-active' : ''}" data-tab="${t}">
                ${nombreTab(t)}
              </button>`).join('')}
          </div>

          <div class="toolbar" style="margin-top:26px" data-reveal>
            <div class="chips" id="chips">
              <button class="chip-btn is-active" data-marca="todos">Todos</button>
              <button class="chip-btn" data-marca="destacado">Destacados</button>
              <button class="chip-btn" data-marca="novedad">Novedades</button>
            </div>
            <label class="search">
              <span class="sr-only">Buscar</span>
              ${icon('search')}
              <input type="search" id="buscar" placeholder="Buscar por nombre..." autocomplete="off" />
            </label>
          </div>

          <div class="grid" id="grid" aria-live="polite">
            ${Array.from({ length: 6 }, () => '<div class="skeleton"></div>').join('')}
          </div>
        </div>
      </section>
    </div>`;

  return {
    html,
    async mount(refrescar) {
      const grid = $('#grid');

      const pintar = async () => {
        let lista = await D.porCategoria(estadoCatalogo.categoria);

        if (estadoCatalogo.marca !== 'todos') {
          lista = lista.filter((i) => i[estadoCatalogo.marca]);
        }
        if (estadoCatalogo.busqueda) {
          const q = estadoCatalogo.busqueda.toLowerCase();
          lista = lista.filter((i) =>
            `${i.nombre} ${i.subtitulo || ''} ${i.tipo || ''}`.toLowerCase().includes(q));
        }

        grid.innerHTML = cuadricula(lista);
        refrescar(grid);
      };

      $('#tabs').addEventListener('click', (e) => {
        const btn = e.target.closest('.tab');
        if (!btn) return;
        $$('.tab').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        estadoCatalogo.categoria = btn.dataset.tab;
        pintar();
      });

      $('#chips').addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (!btn) return;
        $$('.chip-btn').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        estadoCatalogo.marca = btn.dataset.marca;
        pintar();
      });

      let temporizador;
      $('#buscar').addEventListener('input', (e) => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
          estadoCatalogo.busqueda = e.target.value.trim();
          pintar();
        }, 180);
      });

      await pintar();
    }
  };
}

/* ============================================================
   3. FICHA DE PRODUCTO
   ============================================================ */
export async function vistaDetalle(params) {
  const item = await D.porId(params.id);

  if (!item) {
    return {
      html: `
        <div class="screen">
          <section class="section section--first">
            <div class="container">
              <div class="empty">
                <strong>No encontramos esa ficha</strong>
                Puede que el enlace esté mal escrito.
                <div style="margin-top:20px">
                  <a href="#/catalogo" class="btn" data-link>Volver al catálogo</a>
                </div>
              </div>
            </div>
          </section>
        </div>`
    };
  }

  const cat = D.CATEGORIAS[item.categoria];
  const otros = await D.relacionados(item, 3);
  const wa = waLink(`Hola, me interesa ${item.nombre}.`);
  const specs = Object.entries(item.especificaciones || {});
  const galeria = [item.imagen, ...(item.galeria || [])];

  const html = `
    <div class="screen">
      <section class="section section--first">
        <div class="container">
          <nav class="crumbs" data-reveal>
            <a href="#/" data-link>Inicio</a> ${icon('chevron')}
            <a href="#/catalogo/${esc(item.categoria)}" data-link>${esc(cat.etiqueta)}</a> ${icon('chevron')}
            <span>${esc(item.nombre)}</span>
          </nav>

          <div class="detail">
            <!-- Galería -->
            <div class="gallery" data-reveal>
              <div class="gallery__main media" id="galeriaPrincipal" data-media>
                ${slot('imagen', item.imagen)}
                <img src="${esc(item.imagen)}" alt="${esc(item.nombre)}" />
              </div>
              <div class="gallery__thumbs" id="miniaturas">
                ${galeria.map((src, i) => `
                  <button class="thumb media ${i === 0 ? 'is-active' : ''}" data-media data-src="${esc(src)}">
                    ${slot('imagen', src, 'mini')}
                    <img src="${esc(src)}" alt="Foto ${i + 1} de ${esc(item.nombre)}" loading="lazy" />
                  </button>`).join('')}
              </div>
            </div>

            <!-- Información -->
            <div class="detail__info" data-reveal style="--delay:80ms">
              <div>
                <span class="eyebrow">${esc(cat.etiqueta)}</span>
                <h1 class="detail__title">${esc(item.nombre)}</h1>
                <p class="detail__sub">${val(item.subtitulo)}</p>
              </div>

              <span class="detail__price">${precio(item.precio)}</span>
              <p class="lead" style="font-size:1rem">${val(item.resumen)}</p>

              <div class="specs">
                ${specs.map(([k, v]) => `
                  <div class="spec">
                    <div class="spec__k">${esc(k)}</div>
                    <div class="spec__v">${val(v)}</div>
                  </div>`).join('')}
              </div>

              <div class="detail__actions">
                ${wa
                  ? `<a href="${wa}" class="btn" target="_blank" rel="noopener">Consultar disponibilidad ${icon('arrow')}</a>`
                  : `<a href="#/contacto" class="btn" data-link>Consultar disponibilidad ${icon('arrow')}</a>`}
                <a href="#/catalogo/${esc(item.categoria)}" class="btn btn--ghost" data-link>Ver más ${esc(cat.etiqueta.toLowerCase())}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Video -->
      <section class="section section--tight" style="padding-top:0">
        <div class="container">
          ${seccionCabecera('En movimiento', `${esc(item.nombre)} en video`)}
          <div class="detail__video media" data-media data-reveal>
            ${slot('video', item.video)}
            <video src="${esc(item.video)}" controls muted loop playsinline preload="metadata"></video>
          </div>
        </div>
      </section>

      <!-- Descripción -->
      <section class="section section--tight" style="padding-top:0">
        <div class="container">
          <div class="panel" data-reveal>
            <span class="eyebrow">Descripción</span>
            <div class="prose">
              ${(item.descripcion || [TBD]).map((p) => `<p>${val(p)}</p>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- Relacionados -->
      ${otros.length ? `
      <section class="section section--tight" style="padding-top:0">
        <div class="container">
          ${seccionCabecera('También te puede servir', 'Otros de esta categoría')}
          <div class="grid">${cuadricula(otros)}</div>
        </div>
      </section>` : ''}

      ${bloqueCTA()}
    </div>`;

  return {
    html,
    mount() {
      const principal = $('#galeriaPrincipal');
      const img = $('img', principal);

      $$('#miniaturas .thumb').forEach((thumb) => {
        thumb.addEventListener('click', () => {
          $$('#miniaturas .thumb').forEach((t) => t.classList.remove('is-active'));
          thumb.classList.add('is-active');
          principal.classList.remove('has-media');
          $('.slot__path', principal).textContent = thumb.dataset.src;
          img.src = thumb.dataset.src;
        });
      });
    }
  };
}

/* ============================================================
   4. SERVICIOS
   ============================================================ */
export async function vistaServicios() {
  const servicios = await D.porCategoria('servicios');

  const html = `
    <div class="screen">
      <section class="section section--first">
        <div class="container">
          ${seccionCabecera(
            'Servicios',
            'Te acompañamos <span class="grad">todo el camino</span>',
            'Desde elegir la pecera hasta mantener el agua estable meses después.'
          )}

          <div class="grid grid--3">
            ${servicios.map((s, i) => `
              <a href="#/item/${esc(s.id)}" class="svc" data-link data-reveal style="--delay:${i * 80}ms">
                <span class="svc__icon">${icon(['tank', 'drop', 'spark', 'chat'][i % 4])}</span>
                <h3>${esc(s.nombre)}</h3>
                <p>${val(s.resumen)}</p>
                <ul class="svc__list">
                  ${(s.incluye || [TBD, TBD, TBD]).map((x) => `<li>${val(x)}</li>`).join('')}
                </ul>
                <span class="link-arrow" style="margin-top:18px">Ver detalle ${icon('arrow')}</span>
              </a>`).join('')}
          </div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="container">
          ${seccionCabecera('Cómo trabajo', 'Cuatro pasos, cero sustos')}
          <div class="steps" data-reveal>
            ${PROCESO.map((p) => `
              <div class="step">
                <div class="step__n">PASO ${esc(p.n)}</div>
                <h3>${esc(p.titulo)}</h3>
                <p>${esc(p.texto)}</p>
              </div>`).join('')}
          </div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="container">
          ${seccionCabecera('Preguntas frecuentes', 'Lo que más me preguntan')}
          <div class="faq" data-reveal>
            ${FAQ.map((f) => `
              <div class="faq__item">
                <button class="faq__q" aria-expanded="false">
                  ${esc(f.q)}<span class="faq__icon"></span>
                </button>
                <div class="faq__a"><div><p>${val(f.a)}</p></div></div>
              </div>`).join('')}
          </div>
        </div>
      </section>

      ${bloqueCTA()}
    </div>`;

  return { html, mount() { initFaq(); } };
}

/* ============================================================
   5. CONTACTO
   ============================================================ */
export async function vistaContacto() {
  const wa = waLink();
  const mail = mailLink();

  const dato = (nombre, valor, enlace) => {
    const contenido = isTBD(valor)
      ? `<span class="tbd">${TBD}</span>`
      : (enlace ? `<a href="${enlace}">${esc(valor)}</a>` : esc(valor));
    return { nombre, contenido };
  };

  const datos = [
    { icono: 'chat',  ...dato('WhatsApp', SITE.whatsapp, wa) },
    { icono: 'mail',  ...dato('Correo', SITE.email, mail) },
    { icono: 'pin',   ...dato('Dónde estoy', SITE.ciudad) },
    { icono: 'clock', ...dato('Horario de visita', SITE.horario) }
  ];

  const redes = [
    ['instagram', SITE.instagram],
    ['facebook', SITE.facebook],
    ['tiktok', SITE.tiktok]
  ].filter(([, url]) => url);

  const html = `
    <div class="screen">
      <section class="section section--first">
        <div class="container">
          ${seccionCabecera(
            'Contacto',
            'Cuéntanos <span class="grad">tu idea</span>',
            'Respondo personalmente. Mientras más detalles me des del espacio, mejor será la propuesta.'
          )}

          <div class="contact-grid">
            <!-- Formulario -->
            <div class="panel" data-reveal>
              <form class="form" id="formulario">
                <div class="form__row">
                  <div class="field">
                    <label for="f-nombre">Tu nombre</label>
                    <input id="f-nombre" name="nombre" required placeholder="Cómo te llamas" />
                  </div>
                  <div class="field">
                    <label for="f-contacto">Teléfono o correo</label>
                    <input id="f-contacto" name="contacto" required placeholder="Para responderte" />
                  </div>
                </div>

                <div class="field">
                  <label for="f-tema">¿Sobre qué es?</label>
                  <select id="f-tema" name="tema">
                    <option>Quiero comprar peces</option>
                    <option>Necesito un filtro o equipo</option>
                    <option>Quiero armar una pecera</option>
                    <option>Asesoría personalizada</option>
                    <option>Otra cosa</option>
                  </select>
                </div>

                <div class="field">
                  <label for="f-mensaje">Cuéntame</label>
                  <textarea id="f-mensaje" name="mensaje" required
                    placeholder="Medidas del espacio, si ya tienes pecera, qué peces te gustan..."></textarea>
                </div>

                <button type="submit" class="btn">Enviar mensaje ${icon('arrow')}</button>
                <p class="card__sub" id="avisoForm"></p>
              </form>
            </div>

            <!-- Datos -->
            <div data-reveal style="--delay:80ms">
              <div class="info-list">
                ${datos.map((d) => `
                  <div class="info-item">
                    ${icon(d.icono)}
                    <div>
                      <div class="info-item__k">${esc(d.nombre)}</div>
                      <div class="info-item__v">${d.contenido}</div>
                    </div>
                  </div>`).join('')}
              </div>

              ${redes.length ? `
                <div style="margin-top:26px">
                  <h4 style="font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-bottom:14px">Sígueme</h4>
                  <div class="socials">
                    ${redes.map(([r, url]) =>
                      `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${r}">${iconSolid[r]}</a>`).join('')}
                  </div>
                </div>` : ''}
            </div>
          </div>
        </div>
      </section>
    </div>`;

  return {
    html,
    mount() {
      const form = $('#formulario');
      const aviso = $('#avisoForm');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const d = new FormData(form);
        const texto =
          `Hola, soy ${d.get('nombre')}.\n` +
          `Tema: ${d.get('tema')}\n` +
          `${d.get('mensaje')}\n\n` +
          `Mi contacto: ${d.get('contacto')}`;

        const destinoWa = waLink(texto);
        if (destinoWa) { window.open(destinoWa, '_blank', 'noopener'); return; }
        if (SITE.email) {
          window.location.href =
            `mailto:${SITE.email}?subject=${encodeURIComponent('Consulta desde la web')}&body=${encodeURIComponent(texto)}`;
          return;
        }
        aviso.innerHTML =
          `<span class="tbd">Falta configurar el WhatsApp o el correo en js/config.js para que este formulario envíe.</span>`;
      });
    }
  };
}
