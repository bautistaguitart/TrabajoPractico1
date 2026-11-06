// Esta parte arma el índice automáticamente con los títulos del articulo
const indice = document.getElementById("indice");
const titulos = document.querySelectorAll("main section h2");

titulos.forEach(function(titulo) {
    const elemento = document.createElement("li");
    const enlace = document.createElement("a");

    enlace.textContent = titulo.textContent;
    enlace.href = "#" + titulo.id;

    elemento.appendChild(enlace);
    indice.appendChild(elemento);
});

// Esta parte permite activar y desactivar el modo oscuro
const botonModo = document.getElementById("botonModo");

botonModo.addEventListener("click", function() {
    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")) {
        botonModo.textContent = "Modo claro";
    } else {
        botonModo.textContent = "Modo oscuro";
    }
});

// Esta parte cambia el tamaño del texto del articulo
const botonesTamano = document.querySelectorAll(".botonTamano");
const articulo = document.querySelector("main");

botonesTamano.forEach(function(boton) {
    boton.addEventListener("click", function() {
        articulo.classList.remove("texto-pequeno", "texto-estandar", "texto-grande");
        articulo.classList.add("texto-" + boton.dataset.tamano);

        botonesTamano.forEach(function(otroBoton) {
            otroBoton.classList.remove("seleccionado");
        });

        boton.classList.add("seleccionado");
    });
});

// Esta parte permite plegar y desplegar cada sección del articulo
const secciones = document.querySelectorAll("main section");

secciones.forEach(function(seccion) {
    const titulo = seccion.querySelector("h2");
    const contenido = seccion.children;
    const flecha = document.createElement("span");

    flecha.classList.add("flecha");
    flecha.textContent = "▾";
    titulo.insertBefore(flecha, titulo.firstChild);

    titulo.addEventListener("click", function() {
        const estaAbierta = flecha.textContent === "▾";

        for (let i = 0; i < contenido.length; i++) {
            if (contenido[i] !== titulo) {
                contenido[i].hidden = estaAbierta;
            }
        }

        if (estaAbierta) {
            flecha.textContent = "▸";
        } else {
            flecha.textContent = "▾";
        }
    });
});

// Esta parte controla el formulario, el contador y los comentarios
const formulario = document.querySelector(".formulario");
const nombre = document.getElementById("nombre");
const comentario = document.getElementById("comentario");
const contador = document.getElementById("contador");
const aviso = document.getElementById("aviso");
const listaComentarios = document.getElementById("comentarios");

comentario.addEventListener("input", function() {
    contador.textContent = comentario.value.length + " / 200";
});

// Esta parte valida los datos y agrega el comentario sin recargar la página
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    nombre.classList.remove("error");
    comentario.classList.remove("error");
    aviso.textContent = "";

    let datosCorrectos = true;

    if (nombre.value.trim() === "") {
        nombre.classList.add("error");
        aviso.textContent = "Tenés que escribir tu nombre";
        datosCorrectos = false;
    }

    if (comentario.value.trim().length < 10 || comentario.value.length > 200) {
        comentario.classList.add("error");

        if (aviso.textContent !== "") {
            aviso.textContent += ". ";
        }

        aviso.textContent += "El comentario debe tener entre 10 y 200 caracteres";
        datosCorrectos = false;
    }

    if (datosCorrectos) {
        const nuevoComentario = document.createElement("li");
        const textoNombre = document.createElement("strong");
        const textoComentario = document.createElement("p");
        const botonBorrar = document.createElement("button");

        nuevoComentario.classList.add("comentario-item");
        textoNombre.textContent = nombre.value.trim();
        textoComentario.textContent = comentario.value;
        botonBorrar.textContent = "Borrar";
        botonBorrar.type = "button";

        botonBorrar.addEventListener("click", function() {
            nuevoComentario.remove();
        });

        nuevoComentario.appendChild(textoNombre);
        nuevoComentario.appendChild(textoComentario);
        nuevoComentario.appendChild(botonBorrar);
        listaComentarios.appendChild(nuevoComentario);

        nombre.value = "";
        comentario.value = "";
        contador.textContent = "0 / 200";
        aviso.textContent = "Comentario agregado";
    }
});

// Esta parte saca las marcas de error cuando se corrigen los campos
nombre.addEventListener("input", function() {
    nombre.classList.remove("error");
    aviso.textContent = "";
});

comentario.addEventListener("input", function() {
    comentario.classList.remove("error");
    aviso.textContent = "";
});
