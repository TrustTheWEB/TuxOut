let productos = 0;

import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarDatosCarrito = () => {
  let email = localStorage.getItem("email");
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
                imprimirDatosCarrito(response);
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

const imprimirDatosCarrito = (resultado) => {
  if(resultado.length) {
    let total = 0;
    for(let i = 0; i < resultado.length; i++) {
      productos++;

      let precio = resultado[i]["precio"];
      let descuento = resultado[i]["descuento"];
      let precioNuevo = descuento == 0 ? precio : (precio - (precio * (descuento / 100))).toFixed(2);

      let subtotal = resultado[i]["precioFinal"];
      let cantidad = resultado[i]["cantidad"];
      total += Number(subtotal);
      console.log(total)

      let precioStr = descuento == 0 ? "" : "$" + precio;
      let precioNuevoStr = "$" + precioNuevo;
      let descuentoStr = descuento == 0 ? "‎" : descuento + "% OFF";
      
        $("#section-carrito").append(
            `
            <article class="card p-3 mb-3" id="carrito-eliminar-${resultado[i]["idProducto"]}">
                          <div class="row">
                            <div class="col-12">
                              <h6 class="titulo-carrito">${resultado[i]["nombre"]}</h6>
                            </div>
                            <hr class="mt-1 mb-3">
                            <div class="col-4 col-lg-3">
                              <img src="../assets/img_productos/${resultado[i]["idProducto"]}_1.jpg" alt="${resultado[i]["nombre"]}" onerror="this.src='../assets/img/default.png';" class="img-carrito">
                            </div>
                            <div class="col-8 col-lg-5 ps-4 mt-2">
                              <p class="precio-viejo-carrito">${precioStr}</p>
                              <p class="precio-nuevo-carrito">${precioNuevoStr}</p>
                              <p class="descuento-carrito">${descuentoStr}</p>
                            </div>
                            <hr class="d-lg-none my-2">
                            <div class="col-10 col-lg-3 botonera-carrito d-inline-flex align-items-end justify-content-start">
                              <button class="boton-carrito boton-carrito-restar" data-id-producto="${resultado[i]["idProducto"]}">-</button>
                              <p class="boton-carrito boton-carrito-numero" id="cantidad-carrito-${resultado[i]["idProducto"]}">${cantidad}</p>
                              <button class="boton-carrito boton-carrito-sumar" data-id-producto="${resultado[i]["idProducto"]}">+</button>
                            </div>
                            <div class="col-2 col-lg-1 d-inline-flex align-items-end">
                              <button class="boton-eliminar-carrito" data-id-producto="${resultado[i]["idProducto"]}">
                                <i class="bi bi-trash-fill"></i>
                              </button>
                            </div>
                          </div>
                        </article>
            `    
        );

        $("#section-resumen-carrito").append(`

          <div id="carrito-resumen-${resultado[i]["idProducto"]}" class="d-flex div-resumen justify-content-between">
              <p class="nombre-subtotal-resumen"><i class="bi bi-x"></i><span id="subtotal-cantidad-${resultado[i]["idProducto"]}">${cantidad}</span> ${resultado[i]["nombre"]}</p>
              <p class="subtotal-resumen">$<span id="subtotal-precio-${resultado[i]["idProducto"]}" data-precio="${precioNuevo}">${subtotal}</span></p>
          </div>  
        `);
    }

    $("#section-resumen-carrito").append(`
    <hr>
    <p>Total: $<span id="resumen-total" data-total="${total}">${total}</span><p>  
    `);

  }else {
    restaurarPagina();
  }
}

const sumarCantidad = (idProducto) => {
  let email = localStorage.getItem("email");
  $.ajax({
    url: '/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "sumarCantidad", controlador: "CarritoControlador", valores: [email, idProducto]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(response) {
              actualizarCantidad(response, idProducto, (response-1));
            }else {
              alerta.alertar("No hay suficiente stock de este producto.")
            } 
        }
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', xhr, error, status);
    }
});
}

const restarCantidad = (idProducto) => {
  let email = localStorage.getItem("email");
  $.ajax({
    url: '/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "restarCantidad", controlador: "CarritoControlador", valores: [email, idProducto]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(response) {
                actualizarCantidad(response, idProducto, (response+1));
            }else {
                alerta.alertar("No puedes restar más la cantidad de este producto.")
            } 
        }
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', xhr, error, status);
    }
});
}

const eliminarCarrito = (idProducto) => {
  let email = localStorage.getItem("email");
  $.ajax({
    url: '/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "destroy", controlador: "CarritoControlador", valores: [email, idProducto]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(response) {
                actualizarEliminado(idProducto);
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

const restaurarPagina = () => {
  $("#section-carrito").html(`
    <h5>Debes llenar tu carrito.</h5>
    <a href="index.html">Seguir comprando</a>`);
  $("#section-comprar").html("");
}

const actualizarEliminado = (idProducto) => {
  productos--;
  if(productos<=0) {
    restaurarPagina();
  }else {
    alerta.confirmar("Producto eliminado")
    $(`#carrito-eliminar-${idProducto}`).remove();
    $(`#carrito-resumen-${idProducto}`).remove();
  }
}

const actualizarCantidad = (cantidad, idProducto, cantidadVieja) => {
   $(`#cantidad-carrito-${idProducto}`).html(cantidad);
   $(`#subtotal-cantidad-${idProducto}`).html(cantidad);
   let precio = $(`#subtotal-precio-${idProducto}`).attr("data-precio");
   let subtotal = Number(precio)*Number(cantidad);
   subtotal = subtotal.toFixed(2)
   $(`#subtotal-precio-${idProducto}`).html(subtotal);

   let subtotalViejo = Number(precio)*Number(cantidadVieja);
   let total = $(`#resumen-total`).attr("data-total")
   total = (Number(total) - Number(subtotalViejo)) + Number(subtotal);
   total = total.toFixed(2);
   console.log(total, subtotal, subtotalViejo, cantidad, cantidadVieja)
   $(`#resumen-total`).html(total);
   $(`#resumen-total`).attr("data-total", total);
}

const tomarCantidadRestar = (evento) => {
  evento.preventDefault();
  
  let botonRestar = $(evento.currentTarget);
  let idProducto = botonRestar.attr("data-id-producto");
  restarCantidad(idProducto)
}

const tomarCantidadSumar = (evento) => {
  evento.preventDefault();
  
  let botonSumar = $(evento.currentTarget);
  let idProducto = botonSumar.attr("data-id-producto");
  sumarCantidad(idProducto);
}

const tomarCarritoEliminar = (evento) => {
  evento.preventDefault();
  
  let botonEliminar = $(evento.currentTarget);
  let idProducto = botonEliminar.attr("data-id-producto");
  eliminarCarrito(idProducto);
}

$(document).on('click', '.boton-carrito-restar', tomarCantidadRestar);
$(document).on('click', '.boton-carrito-sumar', tomarCantidadSumar);
$(document).on('click', '.boton-eliminar-carrito', tomarCarritoEliminar);
$(document).ready(tomarDatosCarrito);



