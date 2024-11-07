
const puntuacioActual = document.getElementById("puntuacio-actual").value = "No hi ha cap partida ";
const btnPartida = document.getElementById("btn-Partida");
const btnBorrar = document.getElementById("btn-Borrar");
const url = document.getElementById("informacion-url").innerHTML = location.href
const informacionNavegador = document.getElementById("informacion-navegador").innerHTML = navigator.userAgent
//const navegador = document.getElementById("navegador").innerHTML = navigator.;
const nomJugador = document.getElementById("nomJugador");
// DECLARAR EVENTOS

btnPartida.addEventListener("click", empezarPartida);
btnBorrar.addEventListener("click", borrarPartida);

// DECLARAR VARIABLES Y CONSTANTES

let win;

// DECLARAR FUNCIONES


//document.cookie = "nomJugador = nomJugador.value; experies  = Thursday, 1 January 2023 00:00:00 UTC";
//console.log(document.cookie);

//document.cookie = "nomJugador = nomJugador.value; experies  = Thursday, 1 January 2023 00:00:00 UTC";

function empezarPartida() {
    if (nomJugador.value ) {
        document.cookie = "nomJugador ="+ nomJugador.value;
        let nomJugadorObj = document.getElementById("nomJugador");
        nomJugadorObj.textContent = nomJugador.value;
        win = window.open("parejas.html", "Joc de les Parelles");

    }
    else {
        alert("Introduce tu nombre");

        localStorage.setItem("nomJugador", document.getElementById("nomJugador").value);
        sessionStorage.setItem("nomJugador", document.getElementById("nomJugador").value);

    }

}
document.getElementById('nomJugador').value = etCookie('jugador');


function borrarPartida() {
    alert('Partida borrada!');
    win.close();
}



// Get data cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



