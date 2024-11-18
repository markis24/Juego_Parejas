document.addEventListener('DOMContentLoaded', function () {
    // Inicializamos las cartas
    const cartas = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J"];
    let primeraCarta = null;
    let segundaCarta = null;
    let puntuacio = 0;
    let cartasEncontradas = 0;

    // Función para obtener el valor de una cookie por su nombre
    function getCookie(nombre) {
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find(c => c.startsWith(`${nombre}=`));
        return cookie ? cookie.split("=")[1] : null;
    }

    // Inicializamos el grid de cartas
    function inicializarGrid() {
        const gridContainer = document.querySelector(".grid-container");
        gridContainer.innerHTML = ""; // Limpiar el grid antes de llenarlo
        // Mezclamos las cartas para que estén en un orden aleatorio
        const cartasMezcladas = cartas.sort(() => Math.random() - 0); // Mejor mezclar las cartas
        cartasMezcladas.forEach(valor => {
            const carta = document.createElement("div");
            carta.classList.add("card");
            carta.dataset.valor = valor;
            carta.addEventListener("click", manejarClicCarta);
            gridContainer.appendChild(carta);
        });
    }

    // Manejador de clic en las cartas
    function manejarClicCarta(event) {
        const cartaSeleccionada = event.target;

        if (cartaSeleccionada.classList.contains("disabled") || cartaSeleccionada === primeraCarta) return;

        cartaSeleccionada.textContent = cartaSeleccionada.dataset.valor;
        cartaSeleccionada.classList.add("disabled");

        if (!primeraCarta) {
            primeraCarta = cartaSeleccionada;
        } else {
            segundaCarta = cartaSeleccionada;
            verificarPareja();
        }
    }

    // Verificar si las dos cartas seleccionadas son iguales
    function verificarPareja() {
        if (primeraCarta.dataset.valor === segundaCarta.dataset.valor) {
            puntuacio += 10;
            cartasEncontradas += 2;
            primeraCarta = null;
            segundaCarta = null;

            if (cartasEncontradas === cartas.length) {
                // Cuando se encuentran todas las cartas, redirigimos a otra página
                setTimeout(() => {
                    // Redirigir a otra página
                    window.location.href = "final.html"; // Cambia "final.html" por la URL de la página de tu elección
                }, 500);
            }
        } else {
            puntuacio -= 3;
            setTimeout(() => {
                primeraCarta.textContent = "";
                primeraCarta.classList.remove("disabled");
                segundaCarta.textContent = "";
                segundaCarta.classList.remove("disabled");
                primeraCarta = null;
                segundaCarta = null;
            }, 1000);
        }
        actualizarInformacionJugador();
    }

    // Actualizamos la información del jugador
    function actualizarInformacionJugador() {
        const jugador = getCookie("nomJugador") || "Jugador"; // Usamos la cookie o un valor por defecto
        document.getElementById("informacion-jugador").textContent = `JUGADOR: ${jugador} - PUNTS: ${puntuacio} punts`; // Actualizamos el nombre y puntuación
        document.getElementById("nombre-jugador").textContent = `${jugador}`
        document.getElementById("puntuacio-actual").textContent = `Punts: ${puntuacio}`; // Actualizamos el texto de puntuación
    }

    // Inicializamos el grid al cargar la página
    inicializarGrid();
});
document.addEventListener('DOMContentLoaded', function () {
    // Crear el botón de manera dinámica
    const botonContainer = document.getElementById("boton-container");
    const botonMostrarInfo = document.createElement("button");
    botonMostrarInfo.textContent = "Mostrar información";
    
    // Añadir el evento al botón de manera dinámica
    botonMostrarInfo.addEventListener("click", function () {
        // Abrir la nueva ventana con un tamaño de 400x400
        window.open("instrucciones.html", "Instrucciones", "width=400,height=400");
    });
    
    // Añadir el botón al contenedor
    botonContainer.appendChild(botonMostrarInfo);
});
