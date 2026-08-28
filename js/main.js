/* ============================================================
   Arranque: cabecera, menú móvil, footer y router
   ============================================================ */
import { SITE, NOSOTROS } from './config.js';
import { $, $$, esc, icon, iconSolid, waLink, mailLink, isTBD } from './ui.js';
import { iniciarRouter } from './router.js';

const ENLACES = [
  ['#/',          'Inicio'],
  ['#/catalogo',  'Catálogo'],
  ['#/servicios', 'Servicios'],
  ['#/contacto',  'Contacto']
];

/* ---------- Cabecera ---------- */
function montarHeader() {
  $('#header').innerHTML = `
    <div class="container header__inner">
      <a href="#/" class="brand" data-link aria-label="${esc(SITE.nombre)}, ir al inicio">
        <img src="assets/images/logo.webp" alt="" class="brand__logo" width="44" height="44" />
        <span class="brand__name">
          Exotic <em>D.</em> Aquarium
          <span class="brand__tag">${esc(SITE.claim)}</span>
        </span>
      </a>

      <nav class="nav" aria-label="Navegación principal">
        ${ENLACES.map(([href, texto]) =>
          `<a href="${href}" data-link data-nav>${texto}</a>`).join('')}
      </nav>

      <div class="header__actions">
        <a href="#/contacto/formulario" class="btn btn--sm" data-link>Pedir asesoría ${icon('arrow')}</a>
        <button class="icon-btn burger" id="burger" aria-label="Abrir menú"
                aria-expanded="false" aria-controls="mobileMenu">${icon('menu')}</button>
      </div>
    </div>`;

  $('#mobileMenu').innerHTML = `
    ${ENLACES.map(([href, texto]) => `<a href="${href}" data-link>${texto}</a>`).join('')}
    <a href="#/contacto/formulario" class="btn" data-link>Pedir asesoría ${icon('arrow')}</a>`;

  const burger = $('#burger');
  const menu = $('#mobileMenu');

  const cerrar = () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  };

  burger.addEventListener('click', () => {
    const abierto = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(abierto));
    burger.innerHTML = icon(abierto ? 'close' : 'menu');
    document.body.classList.toggle('no-scroll', abierto);
    $$('a', menu).forEach((a, i) => {
      a.style.transitionDelay = abierto ? `${60 + i * 55}ms` : '0ms';
    });
  });

  $$('a', menu).forEach((a) => a.addEventListener('click', () => {
    cerrar();
    burger.innerHTML = icon('menu');
  }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      cerrar();
      burger.innerHTML = icon('menu');
    }
  });
}

/* ---------- Pie de página ---------- */
function montarFooter() {
  const wa = waLink();
  const mail = mailLink();

  const linea = (ico, texto, enlace) => {
    const contenido = isTBD(texto)
      ? '<span class="tbd">Aún no definido</span>'
      : (enlace ? `<a href="${enlace}">${esc(texto)}</a>` : esc(texto));
    return `<li>${icon(ico)} ${contenido}</li>`;
  };

  const redes = [
    ['instagram', SITE.instagram],
    ['facebook', SITE.facebook],
    ['tiktok', SITE.tiktok]
  ].filter(([, url]) => url);

  $('#footer').innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div class="footer__about">
          <a href="#/" class="brand" data-link>
            <img src="assets/images/logo.webp" alt="" class="brand__logo" width="44" height="44" />
            <span class="brand__name">Exotic <em>D.</em> Aquarium
              <span class="brand__tag">${esc(SITE.claim)}</span></span>
          </a>
          <p>${esc(NOSOTROS.resumen)}</p>
          ${redes.length ? `<div class="socials">${redes.map(([r, url]) =>
            `<a href="${esc(url)}" target="_blank" rel="noopener" aria-label="${r}">${iconSolid[r]}</a>`
          ).join('')}</div>` : ''}
        </div>

        <div>
          <h4>Explorar</h4>
          <div class="footer__links">
            ${ENLACES.map(([href, texto]) =>
              `<a href="${href}" data-link>${texto}</a>`).join('')}
          </div>
        </div>

        <div>
          <h4>Catálogo</h4>
          <div class="footer__links">
            <a href="#/catalogo/peces" data-link>Peces</a>
            <a href="#/catalogo/productos" data-link>Productos</a>
            <a href="#/catalogo/servicios" data-link>Servicios</a>
            <a href="#/catalogo/todo" data-link>Ver todo</a>
          </div>
        </div>

        <div>
          <h4>Contacto</h4>
          <ul class="footer__contact">
            ${linea('chat', SITE.whatsapp, wa)}
            ${linea('mail', SITE.email, mail)}
            ${linea('pin', SITE.ciudad)}
            ${linea('clock', SITE.horario)}
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© <span id="anio"></span> ${esc(SITE.nombre)}. Todos los derechos reservados.</p>
        <p>Hecho con agua limpia y mucha paciencia.</p>
      </div>
    </div>`;

  $('#anio').textContent = new Date().getFullYear();

  // Botón flotante de WhatsApp
  const flotante = $('#waBtn');
  if (wa) {
    flotante.href = wa;
    flotante.innerHTML = iconSolid.whatsapp;
  } else {
    flotante.remove();
  }
}

/* ---------- Efectos globales de scroll ---------- */
function montarScroll() {
  const header = $('#header');
  const barra = $('#progress');
  const flotante = $('#waBtn');

  const alScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-stuck', y > 20);

    const alto = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.width = alto > 0 ? `${(y / alto) * 100}%` : '0%';

    if (flotante) flotante.classList.toggle('is-visible', y > 400);
  };

  window.addEventListener('scroll', alScroll, { passive: true });
  window.addEventListener('resize', alScroll);
  alScroll();
}

/* ---------- Inicio ---------- */
montarHeader();
montarFooter();
montarScroll();
iniciarRouter();
