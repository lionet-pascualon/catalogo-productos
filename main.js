import { cargarProductos } from "/LeopardX/catalogo.js";
import { iniciarEscuchaAuth, setupAuthForm } from "/LeopardX/auth.js";

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  iniciarEscuchaAuth();
  setupAuthForm();
});
