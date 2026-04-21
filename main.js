import { cargarProductos } from "./catalogo.js";
import { iniciarEscuchaAuth, setupAuthForm } from "./auth.js";

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  iniciarEscuchaAuth();
  setupAuthForm();
});
