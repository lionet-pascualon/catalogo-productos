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
