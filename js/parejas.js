function mostrarInformacion() {
    const Windows = window.open("instrucciones.html","Informació navegador","width=400,height=400");
}
function perfilJugador() {
nomJugador = getCookie('nomJugador');
nomJugadorObj.textContent = nomJugador;
}

perfilJugador()