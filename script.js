// Importar Firebase y Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkorvIgkM-xZ4YQYmpn_Zi-uwe_CMm99U",
    authDomain: "juego-unico.firebaseapp.com",
    databaseURL: "https://juego-unico-default-rtdb.firebaseio.com",
    projectId: "juego-unico",
    storageBucket: "juego-unico.firebasestorage.app",
    messagingSenderId: "1072325060700",
    appId: "1:1072325060700:web:e061578857ec1e7dbede99"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Generar número secreto
const numeroSecreto = Math.floor(Math.random() * 100) + 1;

// Función para comprobar número
async function comprobarNumero() {
    const input = document.getElementById('inputNumero');
    const mensaje = document.getElementById('mensaje');
    const intento = parseInt(input.value, 10);

    if (isNaN(intento) || intento < 1 || intento > 100) {
        mensaje.textContent = 'Por favor, introduce un número válido entre 1 y 100.';
        mensaje.style.color = 'red';
        return;
    }

    let resultado;
    if (intento === numeroSecreto) {
        resultado = 'Correcto';
        mensaje.textContent = '¡Felicidades! ¡Adivinaste el número!';
        mensaje.style.color = 'green';
    } else if (intento < numeroSecreto) {
        resultado = 'Más alto';
        mensaje.textContent = 'El número es más alto.';
        mensaje.style.color = 'blue';
    } else {
        resultado = 'Más bajo';
        mensaje.textContent = 'El número es más bajo.';
        mensaje.style.color = 'orange';
    }

    // Guardar intento en Firestore
    try {
        await addDoc(collection(db, "intentos"), {
            numeroIntentado: intento,
            resultado: resultado,
            timestamp: new Date()
        });
        console.log("Intento guardado en Firestore");
    } catch (error) {
        console.error("Error al guardar intento:", error);
    }

    input.value = '';
    input.focus();
}

// Asignar la función al botón (opcional, si usas `onclick` en HTML no es necesario)
document.querySelector("button").addEventListener("click", comprobarNumero);

