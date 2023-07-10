function Videojuego(nombre, genero, desarrollador, fecha_de_publicacion, puntuacion, plataformas, ruta_img, id) {
    this.nombre = nombre
    this.genero = genero
    this.desarrollador = desarrollador
    this.fecha_de_publicacion = fecha_de_publicacion
    this.puntuacion = puntuacion
    this.plataformas = plataformas
    this.ruta_img = ruta_img
    this.id = id
}

function principal() {

    let videojuegos = [
        new Videojuego("Persona 5 Royal", "RPG", "Altus Co", "21-10-2022",
            8.8, ["Xbox One", "Nintendo Switch", "Windows", "PlayStation 5"], "persona_5.jpeg", "01"),
        new Videojuego("The Legend of Zelda: Tears of the Kingdom", "Accion", "Nintendo", "12-05-2023",
            9.5, ["Nintendo Switch"], "the-Legend-of-Zelda-Tears-of-the-Kingdom.jpg", "02"),
        new Videojuego("Portal", "Puzzle", "Valve Co", "10-10-2007",
            8.4, ["Linux", "Windows", "Android"], "portal.jpg", "03"),
        new Videojuego("Mass Effect", "Accion-RPG", "BioWare Corporation", "20-11-2007",
            8.6, ["Windows", "Xbox 360", "Xbox One"], "mass_effect.jpg", "04"),
        new Videojuego("Circus Charlie", "Accion", "Konami Industry Co. Ltd.", "1984",
            6.5, ["MSX", "Arcade", "NES", "Commodore 64", "Wii U", "PlayStation 4", "Nintendo Switch"], "circus_charlie.jpg", "05"),
        new Videojuego("Pac-Man World 3", "Accion", "Blitz Games Ltd", "15-11-2005",
            7.2, ["Windows", "PlayStation 2", "Xbox", "GameCube", "PSP", "Nintendo DS"], "pacman_world_3.jpg", "06"),
        new Videojuego("Cult of the Lamb", "Accion", "Massive Monster Ltd.", "11-04-2022",
            8.2, ["Windows", "Macintosh", "PlayStation 4", "Xbox One", "Nintendo Switch", "PlayStation 5", "Xbox Series"],
            "cult_of_the_lamb.jpg", "07"),
        new Videojuego("Terraria", "Accion", "Re-Logic", "16-05-20112",
            7.9, ["Windows", "PlaStation 4", "Android", "Xbox 360", "iPhone", "PSVita", "Wii U"], "terraria.jpg", "08"),
        new Videojuego("Hades", "RPG", "Supergiant Games, Inc.", "06-12-2018",
            9.0, ["Windows", "Nintendo Switch", "PlaStation 4", "Xbox One", "Playstation 5"], "hades_cover_art.jpg", "09"),
        new Videojuego("Super Mario 64", "Accion", "Nintendo", "1996",
            8.5, ["Nintendo 64", "Wii", "Wii U", "Nintendo Switch"], "supermario_64.jpg", "10")

    ]

    let seccion = document.getElementById("juegos")
    crearCards(videojuegos, seccion)
    filtrado(videojuegos)

    let buscador = document.getElementById("buscador")
    buscador.addEventListener("input", () => { filtro(videojuegos) })
}

principal()

//sacar de global cuando funcione
let coleccion = []
let coleccionJSON = JSON.parse(localStorage.getItem("coleccion"))
let mostrarListaColeccion = document.getElementById("coleccion")
mostrarListaColeccion.addEventListener("click", () => mostrarColeccion(coleccionJSON))

//agrega contenido html
function crearCards(array, contenedor) {
    contenedor.innerHTML = " "
    for (let i = 0; i < array.length; i++) {
        let juego = document.createElement("div")
        contenedor.appendChild(juego)
        juego.classList.add("cardJuego")
        juego.innerHTML = `
            <img class="cover" src=../images/portadas/${array[i].ruta_img}>
            <h6 class="titulo">${array[i].nombre}</h6>
            <button class=buttonCard id="${array[i].id}">+</button>
            `
        let botonAgregarAColeccion = document.getElementById(array[i].id)
        botonAgregarAColeccion.addEventListener("click", () => agregarAColeccion(array[i]))
    }
}

function agregarAColeccion(juegoPendiente) {
    let juegoEncontrado = coleccion.find(juego => juegoPendiente.id === juego.id)
    if (juegoEncontrado == undefined) {
        coleccion.push({
            id: juegoPendiente.id,
            nombre: juegoPendiente.nombre,
            ruta_img: juegoPendiente.ruta_img
        })
    }
    else {
        alert("Este juego ya esta en tu colección")
    }

    localStorage.setItem("coleccion", JSON.stringify(coleccion))
    console.log(coleccion)
}

function mostrarColeccion(array) {
    let seccionColeccion = document.getElementById("coleccion")

    seccionColeccion.innerHTML = " "
    for (let i = 0; i < array.length; i++) {
        let juego = document.createElement("div")
        seccionColeccion.appendChild(juego)
        juego.classList.add("cardJuego")
        juego.innerHTML = `
            <img class="cover" src=../images/portadas/${array[i].ruta_img}>
            <h6 class="titulo">${array[i].nombre}</h6>
            <button id="${array[i].id}">-</button>
            `
    }

}
//Crea las Cards de los filtros
function filtro(array) {
    let seccionFiltrada = document.getElementById("juegos")
    let arrayFiltrado = array.filter(videojuego => videojuego.nombre.toLowerCase().includes(buscador.value))
    crearCards(arrayFiltrado, seccionFiltrada)
}

//agrega el contenido html de los filtros
function filtrado(array) {
    let filtros = []
    array.forEach(videojuego => {
        if (!filtros.includes(videojuego.genero)) {
            filtros.push(videojuego.genero)
        }
    })

    let ulFiltros = document.getElementById("filtros")
    filtros.forEach(filtro => {
        let lista = document.createElement("li")
        lista.classList.add("filtroPropiedad")
        ulFiltros.appendChild(lista)
        lista.innerHTML = `
    <a id="${filtro.toLowerCase()}">${filtro}</a></li>
    `
    })

    let todos = document.createElement("li")
    todos.classList.add("filtroPropiedad")
    ulFiltros.appendChild(todos)
    todos.innerHTML = `
    <a id="">Todos</a></li>
    `
    //Contenido que podría estar en otra función
    let filtroPropiedad = document.getElementsByClassName("filtroPropiedad")
    for (const elemento of filtroPropiedad) {
        elemento.addEventListener("click", filtrarCategoria)
    }
    let seccionFiltrada = document.getElementById("juegos")
    function filtrarCategoria(e) {
        let arrayFiltrado = array.filter(videojuego => videojuego.genero.toLowerCase().includes(e.target.id))
        crearCards(arrayFiltrado, seccionFiltrada)
    }
}




