import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

let isLoginMode = false; // Por defecto empezamos en "Registrarse"

window.toggleAuthMode = function() {
    isLoginMode = !isLoginMode;
    document.getElementById('authTitle').innerText = isLoginMode ? "Iniciar Sesión" : "Crear Cuenta";
    document.getElementById('authBtn').innerText = isLoginMode ? "Entrar" : "Registrarse";
    document.getElementById('authSwitch').innerHTML = isLoginMode ? 
        "¿No tienes cuenta? <span onclick='toggleAuthMode()'>Regístrate</span>" : 
        "¿Ya tienes cuenta? <span onclick='toggleAuthMode()'>Inicia Sesión</span>";
}

document.getElementById('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;
    const errorMsg = document.getElementById('authError');

    try {
        if (isLoginMode) {
            // Lógica para Iniciar Sesión
            await signInWithEmailAndPassword(auth, email, password);
            alert("¡Bienvenido de nuevo a LeopardX!");
        } else {
            // Lógica para Registrarse
            await createUserWithEmailAndPassword(auth, email, password);
            alert("¡Cuenta creada con éxito!");
        }
        closeAuth();
    } catch (error) {
        errorMsg.innerText = "Error: " + error.message;
    }
});

window.closeAuth = function() {
    document.getElementById('authModal').style.display = 'none';
}

window.openAuth = function() {
    document.getElementById('authModal').style.display = 'block';
}
