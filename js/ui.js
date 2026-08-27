/* ============================================================
   Utilidades e ingredientes reutilizables de interfaz
   ============================================================ */
import { TBD, SITE } from './config.js';

export const $  = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

export const reduceMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Texto seguro para insertar en HTML --- */
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* --- ¿Este dato todavía está sin llenar? --- */
export const isTBD = (v) => v == null || v === '' || v === TBD;

/* --- Muestra un valor o la marca "Aún no definido" --- */
export function val(v) {
  return isTBD(v) ? `<span class="tbd">${TBD}</span>` : esc(v);
}

/* --- Marcador discreto: un guion en vez del texto largo --- */
export function valCorto(v) {
  return isTBD(v) ? `<span class="tbd tbd--dash" title="${TBD}">—</span>` : esc(v);
}

/* --- Precio: número con formato, o pendiente --- */
export function precio(v, corto = false) {
  if (v == null || v === '') {
    return corto
      ? `<span class="tbd tbd--dash" title="${TBD}">—</span>`
      : `<span class="tbd">${TBD}</span>`;
  }
  return new Intl.NumberFormat('es-EC', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2
  }).format(v);
}

/* --- Iconos (una sola fuente para todo el sitio) --- */
const PATHS = {
  arrow:   '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  search:  '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  menu:    '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close:   '<path d="M6 6l12 12M18 6L6 18"/>',
  image:   '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m4 17 5-5 4 4 3-3 4 4"/>',
  play:    '<circle cx="12" cy="12" r="9"/><path d="M10 8.5v7l6-3.5z"/>',
  tank:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 14c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0"/>',
  drop:    '<path d="M12 3s6 6.5 6 10.5A6 6 0 0 1 6 13.5C6 9.5 12 3 12 3z"/>',
  pin:     '<path d="M12 21s-7-4.4-7-10a7 7 0 1 1 14 0c0 5.6-7 10-7 10z"/><circle cx="12" cy="11" r="2.5"/>',
  mail:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  phone:   '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/>',
  clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chat:    '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
  spark:   '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>'
};

export function icon(name, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${PATHS[name] || ''}</svg>`;
}

export const iconSolid = {
  whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.4 14.2c-.2.6-1.3 1.2-1.8 1.3-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6a11 11 0 0 1-4.2-3.9c-.3-.5-.7-1.2-.7-2s.4-1.3.6-1.5c.2-.2.4-.3.6-.3h.5c.1 0 .3 0 .5.4l.7 1.6c0 .2.1.3 0 .5l-.3.4-.3.3c-.1.1-.2.2 0 .5.2.3.7 1.1 1.4 1.8.9.8 1.6 1 1.9 1.2.3.1.4.1.6-.1l.7-.9c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3.1.1.1.5 0 1z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.4 2.3 1.8 3.8 4 4v3c-1.5.1-2.9-.3-4-1.1V15a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.2A3 3 0 1 0 13 15V3h3z"/></svg>'
};

/* --- Hueco visible donde irá un archivo que aún no existe --- */
export function slot(tipo, ruta, tamano = '') {
  const esVideo = tipo === 'video';
  const clase = tamano === 'sm' ? 'slot--sm' : tamano === 'mini' ? 'slot--mini' : '';
  return `
    <div class="slot ${clase}" title="${esc(ruta)}">
      <span class="slot__icon">${icon(esVideo ? 'play' : 'image')}</span>
      <span class="slot__title">${esVideo ? 'Espacio para video' : 'Espacio para foto'}</span>
      <span class="slot__path">${esc(ruta)}</span>
    </div>`;
}

/* --- Bloque de medios: la foto aparece sola cuando la subas --- */
export function media(src, alt, { tipo = 'imagen', clase = '', tamano = '', lazy = true, extra = '' } = {}) {
  const tag = tipo === 'video'
    ? `<video src="${esc(src)}" muted loop playsinline preload="metadata"></video>`
    : `<img src="${esc(src)}" alt="${esc(alt)}" ${lazy ? 'loading="lazy"' : ''} />`;
  return `<div class="media ${clase}" data-media>${slot(tipo, src, tamano)}${tag}${extra}</div>`;
}

/* Marca como cargados los medios que sí existen */
export function hydrateMedia(ctx = document) {
  $$('[data-media]', ctx).forEach((box) => {
    const el = $('img, video', box);
    if (!el) return;

    const ok = () => box.classList.add('has-media');

    if (el.tagName === 'IMG') {
      if (el.complete && el.naturalWidth > 0) ok();
      else el.addEventListener('load', ok, { once: true });
    } else {
      el.addEventListener('loadeddata', () => { ok(); el.play?.().catch(() => {}); }, { once: true });
      el.load();
    }
  });
}

/* --- Enlaces de contacto que se desactivan si aún no hay datos --- */
export function waLink(mensaje = '') {
  if (!SITE.whatsapp) return null;
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/${SITE.whatsapp}${texto}`;
}

export function mailLink() {
  return SITE.email ? `mailto:${SITE.email}` : null;
}

/* --- Revelado progresivo al hacer scroll --- */
export function initReveal(ctx = document) {
  const items = $$('[data-reveal]', ctx);
  if (!items.length) return;

  if (!('IntersectionObserver' in window) || reduceMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  items.forEach((el) => io.observe(el));
}

/* --- Contadores animados --- */
export function initCounters(ctx = document) {
  const nums = $$('[data-count]', ctx);
  if (!nums.length) return;

  const run = (el) => {
    const target = parseFloat(el.dataset.count);
    const sufijo = el.dataset.suffix || '';
    if (!target) { el.textContent = TBD; el.classList.add('tbd'); return; }
    if (reduceMotion) { el.textContent = target + sufijo; return; }

    const inicio = performance.now();
    const tick = (now) => {
      const p = Math.min((now - inicio) / 1400, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + sufijo;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  nums.forEach((el) => io.observe(el));
}

/* --- Brillo que sigue al cursor sobre las tarjetas --- */
export function initCardGlow(ctx = document) {
  $$('.card', ctx).forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* --- Acordeón --- */
export function initFaq(ctx = document) {
  $$('.faq__item', ctx).forEach((item) => {
    const q = $('.faq__q', item);
    q.addEventListener('click', () => {
      const abierto = item.classList.contains('is-open');
      $$('.faq__item', ctx).forEach((otro) => {
        otro.classList.remove('is-open');
        $('.faq__q', otro).setAttribute('aria-expanded', 'false');
      });
      if (!abierto) {
        item.classList.add('is-open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --- Marquee infinito --- */
export function marquee(palabras) {
  const items = palabras.map((p) => `<span class="marquee__item">${esc(p)}</span>`).join('');
  return `<div class="marquee"><div class="marquee__track">${items}${items}</div></div>`;
}

/* --- Bloques compartidos entre pantallas --- */
export function seccionCabecera(eyebrow, titulo, texto = '', extra = '') {
  return `
    <div class="section-head" data-reveal>
      <div class="section-head__text">
        <span class="eyebrow">${esc(eyebrow)}</span>
        <h2>${titulo}</h2>
        ${texto ? `<p class="lead" style="margin-top:16px">${texto}</p>` : ''}
      </div>
      ${extra}
    </div>`;
}

export function bloqueCTA() {
  const wa = waLink('Hola, quiero armar una pecera.');
  const mail = mailLink();
  return `
    <section class="section section--tight">
      <div class="container">
        <div class="cta" data-reveal>
          <span class="eyebrow" style="justify-content:center">Empecemos</span>
          <h2>¿Armamos tu pecera?</h2>
          <p class="lead">Cuéntanos qué espacio tienes y te proponemos peces, equipo y presupuesto. Sin compromiso.</p>
          <div class="cta__actions">
            ${wa
              ? `<a href="${wa}" class="btn" target="_blank" rel="noopener">Escríbenos por WhatsApp ${icon('arrow')}</a>`
              : `<a href="#/contacto" class="btn" data-link>Ir a contacto ${icon('arrow')}</a>`}
            ${mail
              ? `<a href="${mail}" class="btn btn--ghost">Enviar un correo</a>`
              : `<a href="#/servicios" class="btn btn--ghost" data-link>Ver servicios</a>`}
          </div>
        </div>
      </div>
    </section>`;
}
