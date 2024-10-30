window.addEventListener("pageshow", function() {
    let logueado = localStorage.getItem("logueado");
    if (logueado !== "true") {
            window.location.href = 'index.html';
    }
});

import Alerta from './Alerta.js';
const alerta = new Alerta();

import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

const tomarDirecciones = () => {
    let email = localStorage.getItem('email');
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "DireccionControlador", valores: ["email", email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirDirecciones(response);
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

const imprimirDirecciones = (direcciones) => {

    let usuario = localStorage.getItem("usuario");
    $("#titulo-dir").html(`Direcciones de ${usuario}`)

    $("#contenedorDirecciones").html("");
    for(let i = 0; i < direcciones.length; i++) {
        $("#contenedorDirecciones").append(`
            <article class="row justify-content-center col-4" data-dir="${direcciones[i]['direccion']}">
            <div class="card p-3 mb-3 col-12">
                <div class="card-body text-center">
                    <h4 class="card-title">Dirección</h4>
                    <p class="card-text">${direcciones[i]['direccion']}</p>
                </div>
                <div class="col-12 row justify-content-end">
                <button class="boton-borrar-dir" data-dir="${direcciones[i]['direccion']}">
                    <i class="bi bi-trash-fill"></i>
                </button>
                </div>
            </div>
            </article>       
        `);
    }
   
}

const tomarDireccionEliminar = (event) => {
    let email = localStorage.getItem('email');
    event.preventDefault();
    let botonEliminar = $(event.currentTarget);
    let direccion = botonEliminar.attr("data-dir");
    let selector = '[data-dir="'+ direccion +'"]'

    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "destroy", controlador: "DireccionControlador", valores: [email, direccion]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    $(selector).remove();
                }else {
                    alerta.alertar("No se ha podido eliminar.")
                } 
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

const tomarDireccionAgregar = () => {
    let direccion = $("#input-dir-nueva").val();
    let email = localStorage.getItem('email');
    try{

        if(!validaciones.validarDireccion(direccion)) {
            throw new Error("Dirección inválida")
        }

        ingresarDireccion(email, direccion);
    
    }catch(e) {
        alerta.alertar(e)
    }
}

const ingresarDireccion = (email, direccion) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "DireccionControlador", valores: [email, direccion]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    tomarDirecciones();
                }else {
                    alerta.alertar("No se ha podido eliminar.")
                } 
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}


$(document).on('click', '#boton-agregar-dir', tomarDireccionAgregar);
$(document).on('click', '.boton-borrar-dir', tomarDireccionEliminar);
$(document).ready(tomarDirecciones);