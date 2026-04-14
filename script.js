/* =============================================
   LeopardX — script.js
   ============================================= */

/* ─── Datos detallados por producto ─── */
const detallesProductos = {
  "Auriculares AKG": {
    desc: "Sonido de estudio profesional. Ideal para música, gaming y llamadas.",
    specs: ["Cable reforzado 1.2m", "Cancelación pasiva de ruido", "Bajos profundos y potentes", "Compatible con todos los dispositivos"]
  },
  "TWS M90 Pro": {
    desc: "Libertad total sin cables. Bluetooth 5.3 con latencia ultra baja.",
    specs: ["Bluetooth 5.3", "Estuche de carga con pantalla LED", "Autonomía 6h + 24h con estuche", "Resistente al sudor"]
  },
  "Smartwatch Inteligente": {
    desc: "Tu compañero de salud y estilo en la muñeca.",
    specs: ["Sensor cardíaco y SpO2", "Resistente al agua IP68", "Batería hasta 7 días", "Compatible Android e iOS"]
  },
  "Parlante Greatnice RGB": {
    desc: "Potencia sonora con show de luces LED incluido.",
    specs: ["Luces RGB multicolor", "Bluetooth 5.0", "Batería recargable", "Portátil y resistente"]
  },
  "Proyector Astronauta": {
    desc: "Transforma cualquier habitación en una galaxia.",
    specs: ["Nebulosa y estrellas giratorias", "Control remoto incluido", "Ideal para regalo", "360° de rotación"]
  }
};

let carrito = [];
let productoActual = {};

/* ═══════════════════════════════════════
   MODALES (PRODUCTO, WARNING, LOGIN)
═══════════════════════════════════════ */

// Abrir Modal de Producto
function abrirModal(titulo, precio, img) {
  productoActual = { titulo, precio, img };

  document.getElementById('modalTitle').innerText  = titulo;
  document.getElementById('modalPrice').innerText  = precio;
  document.getElementById('modalImg').src          = img;
  document.getElementById('modalImg').alt          = titulo;

  const info = detallesProductos[titulo] || {
    desc: "Producto de alta calidad LeopardX.",
    specs: ["Garantía incluida"]
  };
  document.getElementById('modalDesc').innerText    = info.desc;
  document.getElementById('modalSpecs').innerHTML   =
    info.specs.map(s => `<li>${s}</li>`).join('');

  const waText = encodeURIComponent(`Hola! Me interesa el producto: ${titulo} — Precio: ${precio}`);
  document.getElementById('modalWaBtn').href = `https://wa.me/3512366414?text=${waText}`;

  document.getElementById('productModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Funciones Genéricas de Cierre
function cerrarModal() {
  document.querySelectorAll('.product-modal, .warning-modal, #authModal').forEach(m => m.style.display = 'none');
  document.querySelectorAll('.warning-modal, .product-modal').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

// Cerrar al hacer click fuera del contenido
window.onclick = function(event) {
  if (event.target.classList.contains('product-modal') || 
      event.target.classList.contains('warning-modal') || 
      event.target.id === 'authModal') {
    cerrarModal();
  }
};

/* ═══════════════════════════════════════
   SISTEMA DE LOGIN / REGISTRO
═══════════════════════════════════════ */
function abrirAuth(type) {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const btn = document.getElementById('authSubmitBtn');
    const switchText = document.getElementById('authSwitch');

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (type === 'login') {
        title.innerText = 'Iniciar Sesión';
        btn.innerText = 'Entrar a mi Cuenta';
        switchText.innerHTML = '¿No tienes cuenta? <span onclick="abrirAuth(\'register\')">Regístrate</span>';
    } else {
        title.innerText = 'Crear Cuenta';
        btn.innerText = 'Registrarme';
        switchText.innerHTML = '¿Ya tienes cuenta? <span onclick="abrirAuth(\'login\')">Inicia Sesión</span>';
    }
}

/* ═══════════════════════════════════════
   CARRITO DE COMPRAS
═══════════════════════════════════════ */
function agregarAlCarrito() {
  if (!productoActual.titulo) return;

  const btn = document.querySelector('.btn-carrito');
  const textoOriginal = btn.innerHTML;
  btn.innerHTML = '✓ ¡Agregado!';
  btn.style.background = '#2a7a3b';
  
  setTimeout(() => {
    btn.innerHTML = textoOriginal;
    btn.style.background = '';
  }, 1200);

  carrito.push({ ...productoActual });
  actualizarCarrito();

  setTimeout(() => {
    cerrarModal();
    abrirCarrito();
  }, 900);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const cartWaBtn = document.getElementById('cartWaBtn');

  if(cartCount) {
      cartCount.innerText = carrito.length;
      cartCount.classList.remove('bump');
      void cartCount.offsetWidth;
      cartCount.classList.add('bump');
  }

  if (carrito.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    cartTotal.innerText = '$0';
    cartWaBtn.href = '#';
    cartWaBtn.classList.add('disabled');
    return;
  }

  cartWaBtn.classList.remove('disabled');

  let total = 0;
  cartItems.innerHTML = carrito.map((item, i) => {
    // Limpieza de precio para sumar correctamente
    const valor = parseInt(item.precio.replace(/[^0-9]/g, '')) || 0;
    total += valor;
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.titulo}"/>
        <div class="cart-item-info">
          <span class="cart-item-name">${item.titulo}</span>
          <span class="cart-item-price">${item.precio}</span>
        </div>
        <button class="cart-item-remove" onclick="eliminarDelCarrito(${i})">
          &times;
        </button>
      </div>`;
  }).join('');

  cartTotal.innerText = `$${total.toLocaleString('es-AR')}`;

  const lineas = carrito.map((item, i) => `${i + 1}. ${item.titulo} (${item.precio})`).join('%0A');
  const mensaje = `Hola LeopardX! Quiero consultar por:%0A%0A${lineas}%0A%0ATotal: *$${total.toLocaleString('es-AR')}*`;
  cartWaBtn.href = `https://wa.me/3512366414?text=${mensaje}`;
}

function abrirCarrito() {
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarCarrito() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════
   FILTROS Y BUSCADOR
═══════════════════════════════════════ */
function filterProducts(tipo, event) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const gridOficial = document.getElementById('productGrid');
  const gridOtros   = document.getElementById('othersGrid');

  if (tipo === 'others') {
    document.getElementById('warningModal').classList.add('open');
    gridOficial.style.display = 'none';
    gridOtros.style.display   = 'grid';
  } else {
    gridOficial.style.display = 'grid';
    gridOtros.style.display   = 'none';
  }
}

// Buscador
document.addEventListener('keyup', e => {
  if (e.target.matches('#buscador')) {
    const texto = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.textContent.toLowerCase().includes(texto) 
        ? card.style.display = '' 
        : card.style.display = 'none';
    });
  }
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Observador para animaciones
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('card-visible');
    });
  });
  document.querySelectorAll('.card').forEach(card => observer.observe(card));
});

// Agregá esto al final de tu script.js para forzar que las cards se vean
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
});


