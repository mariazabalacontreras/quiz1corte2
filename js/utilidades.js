const listaAnimes = document.getElementById("listaAnimes");
const cuerpoTabla = document.querySelector("#tablaAnimes tbody");
let datosAnimes = [];

async function obtenerAnimes() {
    try {
        const respuesta = await fetch("https://api.jikan.moe/v4/top/anime?type=ona");
        const datos = await respuesta.json();
        datosAnimes = datos.data;

        llenarLista(datosAnimes);
        mostrarTabla(datosAnimes); 
    } catch (error) {
        console.error("Error al obtener los animes:", error);
    }
}

function llenarLista(lista) {
    lista.forEach(anime => {
        const opcion = document.createElement("option");
        opcion.value = anime.title;
        opcion.textContent = anime.title;
        listaAnimes.appendChild(opcion);
    });
}

function mostrarTabla(filtrados) {
    cuerpoTabla.innerHTML = "";

    filtrados.forEach(anime => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${anime.title_english || "No disponible"}</td>
            <td>${anime.title_japanese || "No disponible"}</td>
            <td><img src="${anime.images.jpg.image_url}" alt="imagen"></td>
            <td>${anime.episodes || "N/D"}</td>
            <td>${anime.duration || "N/D"}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}


listaAnimes.addEventListener("change", () => {
    const tituloSeleccionado = listaAnimes.value;

    if (tituloSeleccionado === "") {
        mostrarTabla(datosAnimes); 
    } else {
        const animeFiltrado = datosAnimes.filter(a => a.title === tituloSeleccionado);
        mostrarTabla(animeFiltrado);
    }
});


obtenerAnimes();

