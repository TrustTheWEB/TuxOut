import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarDatosCarrito = () => {
  let email = localStorage.getItem("email");
  $.ajax({
    url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
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
    console.log(resultado)

    for(let i = 0; i < resultado.length; i++) {

      let precio = resultado[i]["precio"];
      let descuento = resultado[i]["descuento"];
      let precioNuevo = descuento == 0 ? precio : (precio - (precio * (descuento / 100))).toFixed(2);
  
      precio = descuento == 0 ? "" : "$" + precio;
      precioNuevo = "$" + precioNuevo;
      descuento = descuento == 0 ? "‎" : descuento + "% OFF";
      
        $("#section-carrito").append(
            `
            <article class="card p-3 mb-3" data-id-producto="${resultado[i]["idProducto"]}">
                          <div class="row">
                            <div class="col-12">
                              <h6 class="titulo-carrito">${resultado[i]["nombre"]}</h6>
                            </div>
                            <hr class="mt-1 mb-3">
                            <div class="col-4 col-lg-3">
                              <img src="../assets/img_productos/${resultado[i]["idProducto"]}_1.jpg" alt="${resultado[i]["nombre"]}" onerror="this.src='../assets/img/default.png';" class="img-carrito">
                            </div>
                            <div class="col-8 col-lg-5 ps-4 mt-2">
                              <p class="precio-viejo-carrito">${precio}</p>
                              <p class="precio-nuevo-carrito">${precioNuevo}</p>
                              <p class="descuento-carrito">${descuento}</p>
                            </div>
                            <hr class="d-lg-none my-2">
                            <div class="col-10 col-lg-3 botonera-carrito d-inline-flex align-items-end justify-content-start">
                              <button class="boton-carrito boton-carrito-restar" data-id-producto="${resultado[i]["idProducto"]}">-</button>
                              <p class="boton-carrito boton-carrito-numero" id="cantidad-carrito-${resultado[i]["idProducto"]}">${resultado[i]["cantidad"]}</p>
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
    }
}

const sumarCantidad = (idProducto) => {
  let email = localStorage.getItem("email");
  $.ajax({
    url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "sumarCantidad", controlador: "CarritoControlador", valores: [email, idProducto]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(response) {
              actualizarCantidad(response, idProducto);
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
    url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "restarCantidad", controlador: "CarritoControlador", valores: [email, idProducto]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(response) {
                actualizarCantidad(response, idProducto);
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

const actualizarCantidad = (cantidad, idProducto) => {
   $(`#cantidad-carrito-${idProducto}`).html(cantidad);
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

$(document).on('click', '.boton-carrito-restar', tomarCantidadRestar);
$(document).on('click', '.boton-carrito-sumar', tomarCantidadSumar);
$(document).ready(tomarDatosCarrito);



