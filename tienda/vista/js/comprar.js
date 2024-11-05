import Alerta from './Alerta.js';
import Validaciones from './Validaciones.js';
const alerta = new Alerta();
const validaciones = new Validaciones();

window.addEventListener("pageshow", function() {
    let logueado = localStorage.getItem("logueado");
    if (logueado !== "true") {
            window.location.href = 'index.html';
    }
});

const tomarUsuario = () => {
    let email = localStorage.getItem("email");

    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "buscarValoresNull", controlador: "UsuarioControlador", valores: [email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    if(response == "datos") {
                        window.location.href = 'usuario.html?alerta=completar';
                    }else if(response == "direcciones") {
                        window.location.href = 'direcciones.html?alerta=completar';
                    }else {
                        tomarCompra(email);
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

const tomarCompra = (email) => {
    let urlParams = new URLSearchParams(window.location.search);
    let tipoCompra = urlParams.get('tipo');
    
    switch(tipoCompra) {
        case "carrito":
            tomarCarrito(email);
            break;
        case "unico":
            destruirCarrito(email);
            setTimeout(() => {
                storeCarrito(email, urlParams.get('idProducto'), 1);
            }, 30);
            break;
        default:
            window.location.href = 'carrito.html';
            break; 
    }

    tomarDirecciones(email)
}

const tomarDirecciones = (email) => {
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

const storeCarrito = (email, idProducto, cantidad) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "CarritoControlador", valores: [email, idProducto, cantidad]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    tomarCarrito(email);
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

const tomarCarrito = (email) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "showCarritoPreview", controlador: "CarritoControlador", valores: [email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirResumen(response);
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

const imprimirResumen = (resumen) => {
    if(!Array.isArray(resumen)) {
        resumen = [resumen];
    }
    let total = 0;

    resumen.forEach(producto => {
        total += Number(producto['precioFinal']);
        $(".compra-resumen").append(`
            <p class="row">
              <span class="col-auto">
                <i class="bi bi-x"></i> ${producto['cantidad']} ${producto['nombre']}
              </span>
              <span class="col text-end pe-4">
                $${producto['precioFinal']}
              </span>
            </p>
          `); 
          
    });

    $(".compra-resumen").append(`Total: $${Number(total).toFixed(2)}`);
}

const imprimirDirecciones = (direcciones) => {
    console.log(direcciones);
    if(!Array.isArray(direcciones)) {
        direcciones = [direcciones];
    }

    for (let i = 0 ; i < direcciones.length; i++) {
        $(".compra-direcciones").append(`
            <div class="form-check">
            <input class="form-check-input" type="radio" name="direccion" id="direccion${i}" value="${direcciones[i]['direccion']}">
            <label class="form-check-label" for="direccion${i}">
                ${direcciones[i]['direccion']}
            </label>
            </div>
        `);
    }
}

const destruirCarrito = (email) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "destroyEmail", controlador: "CarritoControlador", valores: [email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(!response) {
                    console.error(response);
                } 
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

const efectuarPedido = (medioPago, direccion, email) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "efectuarPedido", controlador: "PedidoControlador", valores: [medioPago, direccion, email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    tomarProductosCarrito(response, email);
                } else{
                    console.error(response);
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

const tomarProductosCarrito = (idPedido, email) => {
    
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "showCarritoPreview", controlador: "CarritoControlador", valores: [email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    agregarProductos(idPedido, response, email);
                } else{
                    console.error(response);
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });

}

const agregarProductos = (idPedido, productos, email) => {
    console.log(idPedido, productos)
    for (let i = 0 ; i < productos.length; i++) {
        $.ajax({
            url: '/TuxOut/tienda/core/Enrutador.php', 
            method: 'POST', 
            dataType: 'json', 
            data: {accion: "store", controlador: "ContieneControlador", valores: [productos[i]['idProducto'], idPedido, productos[i]['cantidad'], productos[i]['precioDescuento'], "preparando"]},
            success: function(response) {
                if (response.error) {
                    console.error('Error:', response.error);
                } else {
                    if(response) {
                        destruirCarrito(email);
                        window.location.href = 'pedidos.html?alerta=confirmar'
                    } else{
                        console.error(response);
                    }
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', xhr, error, status);
            }
        });
    }  
}

const tomarDatosPedido = () => {
    let email = localStorage.getItem("email");
    let direccion = $("input[name='direccion']:checked").val();
    let medioPago = $("#selectMedioPago").val();

    try {
        if(!direccion) {
            throw new Error("Debes elegir una dirección");
        }

        if(!medioPago) {
            throw new Error("Debes elegir un medio de pago");
        }

        if(!validaciones.validarMedioPago(medioPago)) {
            throw new Error("Metodo de pago inválido");
        }

        efectuarPedido(medioPago, direccion, email);
    }catch(e) {
        alerta.alertar(e);
    }
}

$("#btn-efectuar-pedido").click(tomarDatosPedido);
$(document).ready(tomarUsuario);