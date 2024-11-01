import Alerta from './Alerta.js';
const alerta = new Alerta();

import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

const volver = () => {
    window.history.back();
}

$(".volver").click(volver)

const tomarComentario = () => {
    let calificacion = $("input[name='star']:checked").val();
    let comentario = $("#input-comentario").val();
    let email = localStorage.getItem('email');
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');

    validarComentario(email, idProducto, comentario, calificacion);
}

const validarComentario = (email, idProducto, comentario, calificacion) => {
    try {
        if(!validaciones.validarEmail(email)) {
            throw new Error("El usuario no es válido");
        }

        if(!validaciones.validarId(idProducto)) {
            throw new Error("La ID del producto no es válida");
        }
        
        if(!validaciones.validarCalificacion(calificacion)) {
            throw new Error("El puntaje ingresado no es válido");
        }

        if(!validaciones.validarDescripcionProducto(comentario)) {
            throw new Error("El comentario no es válido");
        }

        ingresarComentario(email, idProducto, comentario, calificacion);
    }catch(e) {
        alerta.alertar(e)
    }
}

const ingresarComentario = (email, idProducto, comentario, calificacion) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "ComentaControlador", valores: [idProducto, email, calificacion, comentario]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    location.reload();
                }else {
                    console.error(response);
                } 
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

const tomarUsuario = () => {
    let email = localStorage.getItem('email');
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');

    buscarComentario(email, idProducto);
}

const buscarComentario = (email, idProducto) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "buscarComentario", controlador: "ComentaControlador", valores: [email, idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    if(response == "no_existe") {
                        imprimirFormularioComentario();
                    }else {
                        imprimirComentario(response)
                    }
                }else {
                    console.error(response);
                } 
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

const imprimirComentario = (comentario) => {
    comentario = comentario[0];
    let estrellas = comentario['calificacion'];
    console.log(comentario)

    $("#contenedor-comentar").html("");
    $("#contenedor-comentar").append(`
              <h2 id="titulo-dir" class="text-center col-12">Tu comentario</span></h2>
      <article class="col-12 col-lg-5 card p-3 mt-3">
        <div class="ms-2 p-1" id="comentario-estrellas"></div>
        <div class="card-body">
          <p class="card-text">${comentario['comentario']}</p>
        </div>
      </article>
    `);

    imprimirEstrellas(estrellas, `#comentario-estrellas`)
}

const imprimirEstrellas = (calificacion, contenedor) => {
    for (let i = 1; i <= 5; i++) {
        
        if (i <= Math.floor(calificacion)) {
            $(contenedor).append(`<i class="bi bi-star-fill estrella"></i> `);
        } else if (i - 0.5 <= calificacion) {
            $(contenedor).append(`<i class="bi bi-star-half estrella"></i> `);
        }else {
            $(contenedor).append(`<i class="bi bi-star estrella"></i> `);
        }
    }
}

const imprimirFormularioComentario = () => {
    $("#contenedor-comentar").html("");
    $("#contenedor-comentar").append(`
        <h2 id="titulo-dir" class="text-center col-12">Calificar</span></h2>
      <article id="contenedorCalificacion" class="col-lg-5 col-12 justify-content-center mt-4 card p-3">
          <div class="rating">
              <input type="radio" id="star-1" class="rating-radio" value="5" name="star">
              <label for="star-1"><i class="bi bi-star-fill"></i></label>
              <input type="radio" id="star-2" class="rating-radio" value="4" name="star">
              <label for="star-2"><i class="bi bi-star-fill"></i></label>
              <input type="radio" id="star-3" class="rating-radio" value="3" name="star">
              <label for="star-3"><i class="bi bi-star-fill"></i></label>
              <input type="radio" id="star-4" class="rating-radio" value="2" name="star">
              <label for="star-4"><i class="bi bi-star-fill"></i></label>
              <input type="radio" id="star-5" class="rating-radio" value="1" name="star">
              <label for="star-5"><i class="bi bi-star-fill"></i></label>
          </div>
  
          <label for="input-comentario" class="form-label">Comentario:</label>
          <textarea class="form-control p-3" id="input-comentario" rows="3"></textarea>
          <button class="btn btn-card-comprar mt-3 rounded" id="btn-calificar">CALIFICAR</button>
      </article> 
    `);
}

$(document).ready(tomarUsuario);
$(document).on('click', '#btn-calificar', tomarComentario);