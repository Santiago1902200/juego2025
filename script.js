  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCkorvIgkM-xZ4YQYmpn_Zi-uwe_CMm99U",
    authDomain: "juego-unico.firebaseapp.com",
    databaseURL: "https://juego-unico-default-rtdb.firebaseio.com",
    projectId: "juego-unico",
    storageBucket: "juego-unico.firebasestorage.app",
    messagingSenderId: "1072325060700",
    appId: "1:1072325060700:web:e061578857ec1e7dbede99"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const numeroSecreto = Math.floor(Math.random() * 100) + 1;

function comprobarNumero() {
    const input = document.getElementById('inputNumero');
    const mensaje = document.getElementById('mensaje');
    const intento = parseInt(input.value, 10);

    if (isNaN(intento) || intento < 1 || intento > 100) {
        mensaje.textContent = 'Por favor, introduce un número válido entre 1 y 100.';
        mensaje.style.color = 'red';
        return;
    }

    if (intento === numeroSecreto) {
        mensaje.textContent = '¡Felicidades! ¡Adivinaste el número!';
        mensaje.style.color = 'green';
    } else if (intento < numeroSecreto) {
        mensaje.textContent = 'El número es más alto.';
        mensaje.style.color = 'blue';
    } else {
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
