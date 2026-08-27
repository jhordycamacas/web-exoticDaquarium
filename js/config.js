/* ============================================================
   CONFIGURACIÓN DEL SITIO
   Este es el único archivo que necesitas editar para cambiar
   textos, contacto y redes. Los peces, productos y servicios
   viven en /data/*.json
   ============================================================ */

export const TBD = 'Aún no definido';

export const SITE = {
  nombre: 'Exotic D. Aquarium',
  claim: 'Peces exóticos',

  /* --- Datos de contacto: reemplaza estos valores --- */
  whatsapp: '', // Ej: '593987654321' (sin + ni espacios). Vacío = se muestra "Aún no definido"
  email: '',    // Ej: 'hola@exoticdaquarium.com'
  ciudad: TBD,
  horario: TBD,
  instagram: '',
  facebook: '',
  tiktok: ''
};

/* --- Pantalla de inicio --- */
export const HOME = {
  pill: 'Atención cercana y personalizada',
  titulo: ['Peces sanos y', 'agua estable'],
  subtitulo:
    'Nos apasiona el mundo acuático y trabajamos cada día para que tú y tus peces ' +
    'tengan la mejor experiencia posible. Peces de calidad, todo para tu acuario ' +
    'y el acompañamiento que hace falta para que el agua se mantenga estable.',
  videoTexto: 'Así se ve un acuario cuando el agua está en su punto',

  stats: [
    { num: 0, sufijo: '',  label: 'Años en el acuarismo' },
    { num: 0, sufijo: '+', label: 'Especies disponibles' },
    { num: 0, sufijo: '+', label: 'Peceras armadas' },
    { num: 0, sufijo: '%', label: 'Clientes que repiten' }
  ],

  marquee: [
    'Agua dulce', 'Agua salada', 'Peceras a medida', 'Filtros y equipos',
    'Asesoría personalizada', 'Mantenimiento', 'Atención por WhatsApp'
  ]
};

/* --- Quiénes somos: se muestra en el inicio y en el pie --- */
export const NOSOTROS = {
  titulo: 'Nos importa el bienestar de tus peces',
  parrafos: [
    'En Exotic D. Aquarium nos apasiona el maravilloso mundo acuático y trabajamos ' +
    'cada día para que tú y tus peces tengan la mejor experiencia posible. Ofrecemos ' +
    'peces de excelente calidad y una amplia selección de artículos para acuarios, ' +
    'peceras y accesorios, siempre a precios accesibles.',

    'Nos caracterizamos por brindar una atención cercana y personalizada, porque ' +
    'realmente nos importa el bienestar de tus peces y la tranquilidad de nuestros ' +
    'clientes. Nuestra mayor motivación es ayudarte a crear un acuario del que te ' +
    'sientas orgulloso.'
  ],
  /* Frase corta para el pie de página */
  resumen: 'Peces de excelente calidad, todo para tu acuario y una atención cercana ' +
           'que se preocupa de verdad por el bienestar de tus peces.'
};

/* --- Cómo trabajamos (4 pasos) --- */
export const PROCESO = [
  { n: '01', titulo: 'Hablamos',     texto: 'Nos cuentas qué espacio tienes, tu presupuesto y qué te gustaría ver nadando.' },
  { n: '02', titulo: 'Te proponemos', texto: 'Armado de la pecera, equipo necesario y especies que conviven bien entre sí.' },
  { n: '03', titulo: 'Ciclamos',     texto: 'Montamos el acuario y arrancamos el ciclo del nitrógeno. Los peces entran cuando el agua está lista.' },
  { n: '04', titulo: 'Te acompañamos', texto: 'Seguimiento del primer mes por WhatsApp y mantenimiento si lo necesitas.' }
];

/* --- Preguntas frecuentes --- */
export const FAQ = [
  {
    q: '¿Puedo pasar a ver los peces?',
    a: 'Claro que sí. La visita es con cita previa: escríbenos por WhatsApp y coordinamos día y hora.'
  },
  {
    q: '¿Qué pecera necesito para empezar?',
    a: 'Depende de qué quieras tener. Cuanta más agua, más estables son los parámetros y más perdona los errores del principiante. Cuéntanos tu espacio y te decimos qué volumen te conviene.'
  },
  {
    q: '¿Me llevo los peces el mismo día?',
    a: 'Solo si tu acuario ya está ciclado. Si recién lo montas, primero va el equipo y los peces entran cuando los nitritos llegan a cero. Nosotros te avisamos cuándo.'
  },
  {
    q: '¿Los peces tienen garantía?',
    a: TBD
  },
  {
    q: '¿Hacen envíos a otras ciudades?',
    a: TBD
  },
  {
    q: '¿Cuánto cuesta armar una pecera?',
    a: TBD
  }
];
