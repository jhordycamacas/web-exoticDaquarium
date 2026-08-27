/* ============================================================
   Carga de datos
   Hoy lee los JSON de /data. Cuando tengas base de datos,
   cambia FUENTES por las URLs de tu API y lo demás sigue igual.
   ============================================================ */

const FUENTES = {
  peces:     'data/peces.json',
  productos: 'data/productos.json',
  servicios: 'data/servicios.json'
};

export const CATEGORIAS = {
  peces:     { etiqueta: 'Peces',     singular: 'Pez' },
  productos: { etiqueta: 'Productos', singular: 'Producto' },
  servicios: { etiqueta: 'Servicios', singular: 'Servicio' }
};

let cache = null;
let pendiente = null;

async function traer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} respondió ${res.status}`);
  return res.json();
}

/* Carga las tres fuentes una sola vez */
export function cargarTodo() {
  if (cache) return Promise.resolve(cache);
  if (pendiente) return pendiente;

  const claves = Object.keys(FUENTES);
  pendiente = Promise.all(claves.map((k) => traer(FUENTES[k])))
    .then((resultados) => {
      cache = {};
      claves.forEach((k, i) => { cache[k] = resultados[i]; });
      return cache;
    })
    .finally(() => { pendiente = null; });

  return pendiente;
}

export async function porCategoria(categoria) {
  const datos = await cargarTodo();
  if (categoria === 'todo') {
    return [...datos.peces, ...datos.productos, ...datos.servicios];
  }
  return datos[categoria] || [];
}

export async function porId(id) {
  const datos = await cargarTodo();
  return [...datos.peces, ...datos.productos, ...datos.servicios]
    .find((item) => item.id === id) || null;
}

export async function destacados(categoria, limite = 3) {
  const lista = await porCategoria(categoria);
  const marcados = lista.filter((i) => i.destacado);
  return (marcados.length ? marcados : lista).slice(0, limite);
}

/* Relacionados: otros de la misma categoría */
export async function relacionados(item, limite = 3) {
  const lista = await porCategoria(item.categoria);
  return lista.filter((i) => i.id !== item.id).slice(0, limite);
}
