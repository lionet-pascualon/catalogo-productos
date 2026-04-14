// Importamos lo necesario desde el CDN (la nube)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Tu configuración (la que me pasaste)
const firebaseConfig = {
  apiKey: "AIzaSyDA4oxTvYgrv7NKdhreFq_0eJFQ8EKlCUA",
  authDomain: "leopardx.firebaseapp.com",
  projectId: "leopardx",
  storageBucket: "leopardx.firebasestorage.app",
  messagingSenderId: "20322051861",
  appId: "1:20322051861:web:3764871bfc4b7f30b96b1c",
  measurementId: "G-XM9ZQT2ZM7"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportamos las herramientas para usarlas en otros archivos
export const db = getFirestore(app);
export const auth = getAuth(app);
