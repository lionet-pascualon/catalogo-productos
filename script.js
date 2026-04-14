const detallesProductos = {
  "Auriculares AKG": { desc: "Sonido de estudio profesional. Ideal para música, gaming y llamadas.", specs: ["Cable reforzado 1.2m", "Cancelación pasiva de ruido", "Bajos profundos y potentes", "Compatible con todos los dispositivos"] },
  "TWS M90 Pro": { desc: "Libertad total sin cables. Bluetooth 5.3 con latencia ultra baja.", specs: ["Bluetooth 5.3", "Estuche de carga con pantalla LED", "Autonomía 6h + 24h con estuche", "Resistente al sudor"] },
  "Smartwatch Inteligente": { desc: "Tu compañero de salud y estilo en la muñeca.", specs: ["Sensor cardíaco y SpO2", "Resistente al agua IP68", "Batería hasta 7 días", "Compatible Android e iOS"] },
  "Parlante Greatnice RGB": { desc: "Potencia sonora con show de luces LED incluido.", specs: ["Luces RGB multicolor", "Bluetooth 5.0", "Batería recargable", "Portátil y resistente"] },
  "Proyector Astronauta": { desc: "Transforma cualquier habitación en una galaxia.", specs: ["Nebulosa y estrellas giratorias", "Control remoto incluido", "Ideal para regalo", "360° de rotación"] }
};

let carrito = [];
let productoActual = {};

/* ═══ MODAL PRODUCTOS ═══ */
function abrirModal(titulo, precio, img) {
  productoActual = { titulo, precio, img };
  document.getElementById('modalTitle').innerText = titulo;
  document.getElementById('modalPrice').innerText = precio;
  document.getElementById('modalImg').src = img;
  
  const info = detallesProductos[titulo] || { desc: "Producto de alta calidad.", specs: ["Garantía incluida"] };
  document.getElementById('modalDesc').innerText = info.desc;
  document.getElementById('modalSpecs').innerHTML = info.specs.map(s => `<li>${s}</li>`).join('');
  
  const waText = encodeURIComponent(`Hola! Me interesa el producto: ${titulo} — Precio: ${precio}`);
  document.getElementById('modalWaBtn').href = `https://wa.me/3512366414?text=${waText}`;
  
  document.getElementById('productModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  document.getElementById('productModal').style.display = 'none';
  document.body.style.overflow = '';
}

function cerrarModalFuera(e) {
  if (e.target === document.getElementById('productModal')) cerrarModal();
}

/* ═══ MODAL LOGIN (AUTH) ═══ */
function abrirAuth() {
  document.getElementById('authModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function cerrarAuth() {
  document.getElementById('authModal').style.display = 'none';
  document.body.style.overflow = '';
}

/* ═══ TECLA ESCAPE GLOBAL ═══ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    cerrarModal();
    cerrarWarning();
    cerrarAuth();
    cerrarCarrito();
  }
});

/* ═══ CARRITO ═══ */
function agregarAlCarrito() {
  if (!productoActual.titulo) return;
  const btn = document.querySelector('.btn-carrito');
  const textoOriginal = btn.innerHTML;
  btn.innerHTML = '✓ ¡Agregado!';
  btn.style.background = '#2a7a3b';
  
  setTimeout(() => { btn.innerHTML = textoOriginal; btn.style.background = 'var(--gold)'; }, 1200);
  
  carrito.push({ ...productoActual });
  actualizarCarrito();
  
  setTimeout(() => { cerrarModal(); abrirCarrito(); }, 900);
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

  cartCount.innerText = carrito.length;

  if (carrito.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
    cartTotal.innerText = '$0';
    cartWaBtn.classList.add('disabled');
    return;
  }
  
  cartWaBtn.classList.remove('disabled');
  let total = 0;
  
  cartItems.innerHTML = carrito.map((item, i) => {
    const valor = parseInt(item.precio.replace(/\D/g, '')) || 0;
    total += valor;
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.titulo}"/>
        <div class="cart-item-info">
          <span class="cart-item-name">${item.titulo}</span>
          <span class="cart-item-price">${item.precio}</span>
        </div>
        <button class="cart-item-remove" onclick="eliminarDelCarrito(${i})">X</button>
      </div>`;
  }).join('');

  cartTotal.innerText = `$${total.toLocaleString('es-AR')}`;
  
  const lineas = carrito.map((item, i) => `${i + 1}. ${item.titulo} — ${item.precio}`).join('%0A');
  const mensaje = `Hola! Quiero encargar esto:%0A%0A${lineas}%0A%0ATotal: *$${total.toLocaleString('es-AR')}*`;
  cartWaBtn.href = `https://wa.me/3512366414?text=${mensaje}`;
}

function abrirCarrito() { document.getElementById('cartPanel').classList.add('open'); document.getElementById('cartOverlay').classList.add('open'); }
function cerrarCarrito() { document.getElementById('cartPanel').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('open'); }
function toggleCart() { document.getElementById('cartPanel').classList.contains('open') ? cerrarCarrito() : abrirCarrito(); }

/* ═══ TABS Y OTROS VENDEDORES ═══ */
function filterProducts(tipo, event) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');
  const gridOficial = document.getElementById('productGrid');
  const gridOtros = document.getElementById('othersGrid');
  
  if (tipo === 'others') {
    abrirWarning();
    gridOficial.style.display = 'none';
    gridOtros.style.display = 'grid';
  } else {
    gridOficial.style.display = 'grid';
    gridOtros.style.display = 'none';
  }
}

function abrirWarning() { document.getElementById('warningModal').classList.add('open'); }
function cerrarWarning() { document.getElementById('warningModal').classList.remove('open'); }

/* ═══ FILTROS Y BUSCADOR ═══ */
const navLinks = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.card');

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    const filter = this.dataset.filter;
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    
    document.getElementById('productGrid').style.display = 'grid';
    document.getElementById('othersGrid').style.display = 'none';
    
    cards.forEach(card => {
      if (filter === 'all' || card.dataset.categoria === filter) {
        card.style.display = ''; card.classList.add('card-show');
      } else {
        card.style.display = 'none'; card.classList.remove('card-show');
      }
    });
  });
});

document.addEventListener('keyup', e => {
  if (e.target.matches('#buscador')) {
    const texto = e.target.value.toLowerCase();
    cards.forEach(card => {
      if (card.textContent.toLowerCase().includes(texto)) { card.style.display = ''; } 
      else { card.style.display = 'none'; }
    });
  }
});

/* ═══ ANIMACIONES AL SCROLL ═══ */
document.addEventListener('DOMContentLoaded', () => {
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('card-visible');
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
    card.classList.add('card-show'); // Fuerza que se vean al inicio
  });
});
