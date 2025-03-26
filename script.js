 const firebaseConfig = {
    apiKey: "AIzaSyCkorvIgkM-xZ4YQYmpn_Zi-uwe_CMm99U",
    authDomain: "juego-unico.firebaseapp.com",
    projectId: "juego-unico",
    storageBucket: "juego-unico.firebasestorage.app",
    messagingSenderId: "1072325060700",
    appId: "1:1072325060700:web:e061578857ec1e7dbede99"
  };

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

    input.value = '';
    input.focus();
}
