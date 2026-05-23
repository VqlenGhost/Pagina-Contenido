const catalogo = document.getElementById('catalogo');

// ==================== PEDIR POR TELEGRAM (CORREGIDO) ====================
function pedirPorTelegram(nombre, precio) {
    const mensaje = `Hola! Quiero este producto:%0A%0A` +
                    `🛍️ *${encodeURIComponent(nombre)}*%0A` +
                    `💰 Precio: $${precio}%0A`
                    ;

    const url = `https://t.me/ghostvqle?text=${mensaje}`;
    window.open(url, '_blank');
}

// ==================== MOSTRAR PRODUCTOS ====================
function mostrarProductos(categoria) {
  catalogo.innerHTML = '';

  const productosFiltrados = productos.filter(producto => {
    if (categoria === 'general') return true;
    if (categoria === 'mas-vendidos') return producto.masVendido === true;
    return producto.categoria === categoria;
  });

  productosFiltrados.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p class="precio">$${parseFloat(producto.precio).toLocaleString()}</p>
      <p>${producto.descripcion}</p>
      
      <div class="botones">

      <button class="btn-telegram" onclick="pedirPorTelegram('${producto.nombre.replace(/'/g, "\\'")}', '${producto.precio}', '${producto.imagen || ""}')">
          📨 Pedir por Telegram
        </button>

        ${producto.previewUrl ? 
          `<button class="btn-vista" onclick="mostrarVistaPrevia('${producto.previewUrl}')">👁️ Vista Previa</button>` : 
          `<button class="btn-vista" style="opacity:0.5; cursor:default;">Vista Previa</button>`
        }


        
      </div>
    `;
    catalogo.appendChild(card);
  });
}

// ==================== MODAL ====================
const modal = document.getElementById('modal');
const modalIframe = document.getElementById('modal-iframe');

function mostrarVistaPrevia(url) {
  modalIframe.src = url;
  modal.style.display = 'flex';
}

document.querySelector('.close').onclick = () => {
  modal.style.display = 'none';
  setTimeout(() => modalIframe.src = '', 500);
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    setTimeout(() => modalIframe.src = '', 500);
  }
};

// ==================== INICIO ====================
document.addEventListener('DOMContentLoaded', () => {
  mostrarProductos('general');
});


// ==================== CARRUSEL AUTOMÁTICO ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Cambia de foto cada 5 segundos
setInterval(nextSlide, 5000);
