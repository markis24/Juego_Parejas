// Funció per obtenir el valor d'una cookie pel seu nom
function getCookie(nombre) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(c => c.startsWith(`${nombre}=`));
    return cookie ? cookie.split("=")[1] : null;
}

// Configuració per començar una nova partida
document.getElementById('btn-Partida').addEventListener('click', () => {
    const nombre = document.getElementById("nomJugador").value.trim();
    if (!nombre) {
        alert("Cal introduir un nom per començar la partida!");
        return;
    }

    // Verificar si ja hi ha una partida en curs
    if (localStorage.getItem("partidaEnCurso") === "true") {
        alert("Ja tens una partida en curs!");
        return;
    }

    // Guardar el nom del jugador a les cookies i marcar la partida com a en curs
    document.cookie = `nomJugador=${nombre}; path=/`;
    localStorage.setItem("partidaEnCurso", "true");

    // Obrir una nova finestra amb el joc
    window.open("joc.html", "_blank");
});

// Configuració de BroadcastChannel per gestionar missatges entre finestres
const channel = new BroadcastChannel('game_channel');
channel.onmessage = (event) => {
    if (event.data.tipo === 'puntuacion') {
        // Actualitzar puntuació
        document.getElementById("puntuacio-actual").textContent = `Puntuació actual: ${event.data.puntuacion}`;
        actualitzaInformacioJugador(event.data.puntuacion);
    } else if (event.data.tipo === 'finalitzar') {
        // Missatge de finalització de partida
        document.getElementById("puntuacio-actual").textContent = `Puntuació final: ${event.data.puntuacion}. ¡Joc finalitzat!`;
        actualitzaInformacioJugador(event.data.puntuacion);
    } else if (event.data.tipo === 'borrar') {
        // Borrar la partida
        document.getElementById("puntuacio-actual").textContent = "No hi ha cap partida en joc";
        actualitzaInformacioJugador(0);
    }
};

// Funció per actualitzar la informació del jugador
function actualitzaInformacioJugador(puntuacio) {
    const nomJugador = getCookie("nomJugador");
    document.getElementById("informacion-jugador").textContent = 
        `Nom: ${nomJugador || "No informat"}. Puntuació: ${puntuacio || 0}. Estat partida: ${localStorage.getItem("partidaEnCurso") === "true" ? "En curs" : "No començada"}`;
}

// Funció per borrar la partida
document.getElementById('btn-Borrar').addEventListener('click', () => {
    localStorage.removeItem("partidaEnCurso");
    channel.postMessage({ tipo: 'borrar' });
    document.getElementById("puntuacio-actual").textContent = "No hi ha cap partida en joc";
    actualitzaInformacioJugador(0);

    // Tancar finestres del joc si és obert
    channel.postMessage({ tipo: 'tancarFinestra' });
});

// Enviar un missatge per tancar finestres si es requereix
channel.onmessage = (event) => {
    if (event.data.tipo === 'tancarFinestra') {
        window.close();
    }
};

// Inicialització de l'informació del jugador en carregar la pàgina
document.addEventListener('DOMContentLoaded', () => {
    actualitzaInformacioJugador(0);
});

// Función para mostrar la URL de la página
function mostrarUrl() {
    const url = location.href; // Obtiene la URL completa
    document.getElementById("informacion-url").innerHTML = url; // Muestra la URL en el elemento con id 'informacion-url'
}

// Función para mostrar la información del navegador
function mostrarInformacionNavegador() {
    const navegador = navigator.userAgent; // Obtiene la información del agente del usuario
    document.getElementById("informacion-navegador").innerHTML = navegador; // Muestra la información del navegador en el elemento con id 'informacion-navegador'
}

// Llamamos a las funciones para mostrar la información al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    mostrarUrl();
    mostrarInformacionNavegador();
});

