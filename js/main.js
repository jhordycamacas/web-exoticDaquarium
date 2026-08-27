document.addEventListener('DOMContentLoaded', () => {
    // ===== 1. Crear burbujas en el hero =====
    function crearBurbujas() {
        const contenedor = document.querySelector('.bubbles');
        if (!contenedor) return;
        for (let i = 0; i < 25; i++) {
            const burbuja = document.createElement('div');
            burbuja.className = 'bubble';
            const size = Math.random() * 40 + 10;
            burbuja.style.width = size + 'px';
            burbuja.style.height = size + 'px';
            burbuja.style.left = Math.random() * 100 + '%';
            burbuja.style.animationDuration = Math.random() * 10 + 15 + 's';
            burbuja.style.animationDelay = Math.random() * 10 + 's';
            contenedor.appendChild(burbuja);
        }
    }
    crearBurbujas();

    // ===== 2. Cargar los peces desde el JSON =====
    let todosLosPeces = [];

    async function cargarPeces() {
        try {
            const respuesta = await fetch('data/peces.json');
            if (!respuesta.ok) throw new Error('No se pudo cargar el archivo de peces.');
            todosLosPeces = await respuesta.json();
            // Renderizamos todos al inicio
            renderizarPeces(todosLosPeces);
        } catch (error) {
            console.error('Error al cargar los peces:', error);
            document.getElementById('productGrid').innerHTML = `
                <p class="col-span-full text-center text-red-400">Error al cargar los productos. Intenta de nuevo más tarde.</p>
            `;
        }
    }

    // ===== 3. Renderizar tarjetas =====
    function renderizarPeces(peces) {
        const grid = document.getElementById('productGrid');
        const noResults = document.getElementById('noResults');

        if (peces.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }
        noResults.classList.add('hidden');

        // Generamos el HTML de cada tarjeta
        const html = peces.map(pez => `
            <div class="pez-card p-4 flex flex-col items-start gap-2 transition-all" style="animation-delay: ${Math.random() * 0.3}s">
                <div class="w-full h-48 bg-[#102D26] rounded-lg overflow-hidden relative">
                    <img src="${pez.imagen}" alt="${pez.nombre}" class="w-full h-full object-cover" />
                    ${pez.destacado ? `<span class="badge badge-destacado absolute top-2 left-2">Destacado</span>` : ''}
                    ${pez.novedad ? `<span class="badge badge-novedad absolute top-2 right-2">Novedad</span>` : ''}
                </div>
                <h3 class="text-xl font-bold text-[#F4F8F6]">${pez.nombre}</h3>
                <p class="text-sm text-[#A9BBB5] line-clamp-2">${pez.descripcion}</p>
                <div class="flex items-center justify-between w-full mt-2">
                    <span class="text-lg font-semibold text-[#6CC7E5]">$${pez.precio.toFixed(2)}</span>
                    <span class="text-xs text-[#A9BBB5]">${pez.tipo}</span>
                </div>
                <button class="mt-2 w-full bg-[#165A46] hover:bg-[#0B3027] text-[#F4F8F6] font-medium py-2 rounded-full transition-colors">
                    Agregar al carrito
                </button>
            </div>
        `).join('');

        grid.innerHTML = html;
    }

    // ===== 4. Filtrar y buscar =====
    function filtrarPeces() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const tipoSeleccionado = document.getElementById('filterType').value;

        const filtrados = todosLosPeces.filter(pez => {
            const coincideNombre = pez.nombre.toLowerCase().includes(searchTerm);
            const coincideTipo = tipoSeleccionado === 'all' || pez.tipo === tipoSeleccionado;
            return coincideNombre && coincideTipo;
        });

        renderizarPeces(filtrados);
    }

    // ===== 5. Event listeners =====
    document.getElementById('searchInput').addEventListener('input', filtrarPeces);
    document.getElementById('filterType').addEventListener('change', filtrarPeces);

    // ===== 6. Iniciar la carga =====
    cargarPeces();

    // ===== 7. (Opcional) Modo oscuro - por ahora solo un toggle visual =====
    // El botón de modo oscuro no tiene funcionalidad aún, pero puedes añadirla después.
    // Si quieres, ahora mismo no la implementamos para no complicar.
});