let videojuegos=[]

fetch("/videojuegos.json")
    .then(response => response.json())
    .then(data => {videojuegos=data})
    .then(() => principal())
    .catch(error => console.error(error));

function principal() {

    let seccionJuegos = document.getElementById("juegos")
    let buscador = document.getElementById("buscador")
    crearCards(videojuegos, seccionJuegos)
    filtrado(videojuegos,seccionJuegos)
    let generoToggle=document.getElementById("generoToggle")
    generoToggle.addEventListener("click", () => document.getElementById("filtros").classList.toggle("ocultar"))

    if(seccionColeccion){
        mostrarColeccion(coleccionJSON,seccionColeccion)
        buscador.addEventListener("input", () => { filtro(coleccionJSON,seccionColeccion)})
    }
    if(seccionJuegos){
        buscador.addEventListener("input", () => { filtro(videojuegos,seccionJuegos)})
    }
}

let seccionColeccion = document.getElementById("coleccion")
let coleccion = []
let coleccionJSON = JSON.parse(localStorage.getItem("coleccion"))

//agrega contenido html a index
function crearCards(array, contenedor) {
    contenedor.innerHTML = " "
    for (let i = 0; i < array.length; i++) {
        let juego = document.createElement("div")
        contenedor.appendChild(juego)
        juego.classList.add("cardJuego")
        juego.innerHTML = `
            <img class="cover" src=../images/portadas/${array[i].ruta_img}>
            <h5 class="titulo">${array[i].nombre}</h5>
            <button class=buttonAdd id="${array[i].id}"><h1>+</h1></button>
            `
        let botonAgregarAColeccion = document.getElementById(array[i].id)
        botonAgregarAColeccion.addEventListener("click", () => agregarAColeccion(array[i]))
    }
}

function eliminarDeColeccion(juegoSeleccionado) {
    let juegoEncontrado = coleccionJSON.indexOf(juegoSeleccionado)
    if (juegoEncontrado > -1) {
        coleccionJSON.splice(juegoEncontrado, 1)
        Toastify({
            text: "Has eliminado un juego de tu colección",
            duration: 4500,
            newWindow: true,
            gravity: "top",
            position: 'right',
            className: "advertencia",
          }).showToast();
    }
    else {
        Toastify({
            text: "Este juego no esta en tu colección",
            duration: 4500,
            newWindow: true,
            gravity: "top",
            position: 'right',
            className: "error",
          }).showToast();
    }
    localStorage.setItem("coleccion", JSON.stringify(coleccionJSON))
    mostrarColeccion(coleccionJSON,seccionColeccion)
}

function agregarAColeccion(juegoPendiente) {
    if (coleccionJSON!=null && coleccionJSON.length> 0 ) {
        let juegoEncontrado = coleccionJSON.find(juego => juegoPendiente.id === juego.id)
        if (juegoEncontrado === undefined) {
            coleccionJSON.push({
                id: juegoPendiente.id,
                nombre: juegoPendiente.nombre,
                ruta_img: juegoPendiente.ruta_img
            })
            localStorage.setItem("coleccion", JSON.stringify(coleccionJSON))
            Toastify({
                text: "Se ha agregado un juego a tu colección",
                duration: 4500,
                newWindow: true,
                gravity: "top",
                position: 'right',
                className: "success",
              }).showToast();
        }
        else {
            Toastify({
                text: "Este juego ya esta en tu colección",
                duration: 4500,
                newWindow: true,
                gravity: "top",
                position: 'right',
                className: "error",
              }).showToast();
        }
    }
    else {
        let juegoEncontrado = coleccion.find(juego => juegoPendiente.id === juego.id)
        if (juegoEncontrado === undefined) {
            coleccion.push({
                id: juegoPendiente.id,
                nombre: juegoPendiente.nombre,
                ruta_img: juegoPendiente.ruta_img
            })
            localStorage.setItem("coleccion", JSON.stringify(coleccion))
            Toastify({
                text: "Se ha agregado un juego a tu colección",
                duration: 4500,
                newWindow: true,
                gravity: "top",
                position: 'right',
                className: "success",
              }).showToast();
        }
        else {
            Toastify({
                text: "Este juego ya esta en tu colección",
                duration: 4500,
                newWindow: true,
                gravity: "top",
                position: 'right',
                className: "error",
              }).showToast();
        }
    }
}

//agrega contenido html a coleccion
function mostrarColeccion(array,seccion) {
    seccion.innerHTML = ` `
    for (let i = 0; i < array.length; i++) {
        let juego = document.createElement("div")
        seccion.appendChild(juego)
        juego.classList.add("cardJuego")
        juego.innerHTML = `
            <img class="cover" src=../images/portadas/${array[i].ruta_img}>
            <h5 class="titulo">${array[i].nombre}</h5>
            <button class="buttonRemove" id="${array[i].id}"><h1>-</h1></button>
            `
        let botonEliminarDeColeccion = document.getElementById(array[i].id)
        botonEliminarDeColeccion.addEventListener("click", () => eliminarDeColeccion(array[i]))
    }

}
//Crea las Cards de los filtros
function filtro(array,seccion) {
    let arrayFiltrado = array.filter(videojuego => videojuego.nombre.toLowerCase().includes(buscador.value))
        crearCards(arrayFiltrado, seccion)
}

//agrega el contenido html de los filtros
function filtrado(array,seccion) {
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
    
    function filtrarCategoria(e) {
        let arrayFiltrado = array.filter(videojuego => videojuego.genero.toLowerCase().includes(e.target.id))
        crearCards(arrayFiltrado, seccion)
    }
}
