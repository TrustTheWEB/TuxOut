
import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarUsuario = () => {
    let logueado = localStorage.getItem("logueado");
    if(logueado == "true") {
        setTimeout(() => {
            tomarFavoritos(localStorage.getItem("email"));
        }, 100);
    }   
}

const tomarFavoritos = (email) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "FavoritoControlador", valores: ["email", email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    mostrarFavoritos(response);
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

const mostrarFavoritos = (favoritos) => {

    for (let i = 0; i < favoritos.length; i++) {
        $(`#heart${favoritos[i]["idProducto"]}`).toggleClass("bi-heart");
        $(`#heart${favoritos[i]["idProducto"]}`).addClass("bi-heart-fill");
        $(`#btnHeart${favoritos[i]["idProducto"]}`).attr("data-favorito",true);
    }
}

const agregarFavorito = (email, idProducto) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "FavoritoControlador", valores: [email, idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    actualizarCorazon(idProducto);
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

const eliminarFavorito = (email, idProducto) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "destroy", controlador: "FavoritoControlador", valores: [email, idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    actualizarCorazon(idProducto);
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

const actualizarCorazon = (idProducto) => {
    let btnHeart = $(`#btnHeart${idProducto}`);
    let heart = $(`#heart${idProducto}`);
    let favorito = btnHeart.attr("data-favorito") === "true";
    
    if (favorito) {
        heart.removeClass("bi-heart-fill").addClass("bi-heart");
        btnHeart.attr("data-favorito", "false");
    } else {
        heart.removeClass("bi-heart").addClass("bi-heart-fill");
        btnHeart.attr("data-favorito", "true");
    }    
}

const tomarProductoFavorito = (evento) => {
    let idProducto = $(evento.currentTarget).data('id-producto');
    let logueado = localStorage.getItem("logueado");
    let favorito = $(evento.currentTarget).data('favorito');
    if(logueado == "true") {
        let email = localStorage.getItem("email");
        if(favorito) {
            eliminarFavorito(email, idProducto);
        }else {
            agregarFavorito(email, idProducto);   
        }
    }else {
        alerta.alertar("Debes crearte una cuenta para agregar productos a favorito");
    }
    
}

$(document).ready(function () {
    $(document).on('click', '.agregar-favorito', tomarProductoFavorito);
});

$(document).ready(tomarUsuario)
$("#selectBusqueda").change(tomarUsuario)
$("#selectHistorial").change(tomarUsuario);