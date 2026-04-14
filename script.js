document.addEventListener("keyup", e => {
  if (e.target.matches("#buscador")) {
    const textoBusqueda = e.target.value.toLowerCase(); // Convertimos lo que escriben a minúsculas
    
    document.querySelectorAll(".card").forEach(producto => {
      producto.textContent.toLowerCase().includes(textoBusqueda)
        ? producto.classList.remove("filtro")
        : producto.classList.add("filtro");
    });
  }
});


function filtrar(categoria) {
    const tarjetas = document.querySelectorAll('.card');
    const botones = document.querySelectorAll('.btn-filtro');

    // Cambiar el botón activo
    botones.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(categoria)) {
            btn.classList.add('active');
        }
    });

    // Filtrar las tarjetas de los productos para filtrarlo al tocarlo
    tarjetas.forEach(tarjeta => {
        // Buscamos dentro de los 'tags' que pusimos antes
        const etiquetas = tarjeta.querySelector('.tags').innerText.toLowerCase();
        
        if (categoria === 'todos' || etiquetas.includes(categoria)) {
            tarjeta.style.display = "block"; // Mostrar
        } else {
            tarjeta.style.display = "none"; // Ocultar
        }
    });
}

function filterProducts(type, event) {
    // 1. Manejo visual de los botones
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // 2. Lógica del cartel
    if (type === 'others') {
        document.getElementById('warningModal').style.display = 'block';
    } else {
        // Aquí volvería a mostrar solo tus productos
        console.log("Mostrando catálogo oficial");
    }
}

function closeWarning() {
    document.getElementById('warningModal').style.display = 'none';
}

// Cerrar el cartel si el usuario hace clic fuera de la caja negra
window.onclick = function(event) {
    const modal = document.getElementById('warningModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
