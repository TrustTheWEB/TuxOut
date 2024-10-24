import Alerta from './alerta.js';
const alerta = new Alerta();

$(".mostrarPassEditarUsuario").click(function() {
  mostrarContraseña("#contraseñaEditarUsuario")
});

//ocultar contraseña

function mostrarContraseña(id) {
  let contra = $(id);
  if(contra.attr('type') === 'password') {
    contra.attr('type','text');
  }else {
    contra.attr('type','password');
  }
}

//Menu lateral

const tomarCategorias = () => {
  $.ajax({
      url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
      method: 'POST', 
      dataType: 'json', 
      data: {accion: "index", controlador: "CategoriaControlador", valores: null},
      success: function(response) {
          if (response.error) {
              console.error('Error:', response.error);
          } else {
              if(response) {
                  imprimirCategoriasMenu(response);
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

const imprimirCategoriasMenu = (resultado) => {
  let categorias = [];
  if (Array.isArray(resultado)) {
      resultado.forEach(item => {
          categorias.push(item["nombre"]);
  });
  } else {
      categorias.push(resultado["nombre"]);
  }

  $("#barraMenu").html("");
  for(let i = 0; i < categorias.length; i++) {
      let categoria = categorias[i];
      $("#barraMenu").append(`
          
          <li class="nav-item">
            <a class="nav-link categoriaAside" href="productos.html?tipo=categoria&categoria=${categoria}">${categoria}</a>
          </li>

          `)

  }
}

$("#botonMenu").click(tomarCategorias);


const tomarProductosCarrito = () => {
  
  let logueado = localStorage.getItem("logueado");
  if(logueado == "true") {
    const modal = new bootstrap.Modal(document.getElementById('carritoModal'));
    modal.show();
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
                mostrarProductosCarrito(response);
              }
          }
      },
      error: function(xhr, status, error) {
          console.error('Error en la solicitud:', xhr, error, status);
      }
  });   
  }else {
    alerta.alertar("Debes crearte una cuenta");
  }
}

const mostrarProductosCarrito = (productos) => {
  $("#carrito-vista-previa").html("");
  productos.forEach(producto => {
    $("#carrito-vista-previa").append(`${producto['nombre']} - ${producto['precio']} - Cantidad: ${producto['cantidad']} <br>`)
  });
}

const modificarCarrito = (email, idProducto, cantidad) => {
  $.ajax({
    url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "update", controlador: "CarritoControlador", valores: [email, idProducto, cantidad+1]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(response) { 
              alerta.confirmar("Producto agregado al carrito");
            }
        }
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', xhr, error, status);
    }
});   
}

const agregarCarrito = (email, idProducto) => {
  $.ajax({
    url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "store", controlador: "CarritoControlador", valores: [email, idProducto, 1]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(response) { 
              alerta.confirmar("Producto agregado al carrito");
            }
        }
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', xhr, error, status);
    }
});   
}

const verificarCarrito = (idProducto, email) => {
  $.ajax({
    url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
    method: 'POST', 
    dataType: 'json', 
    data: {accion: "verificarCarrito", controlador: "CarritoControlador", valores: [email, idProducto]},
    success: function(response) {
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            if(!response) {
                agregarCarrito(email, idProducto)
              }else if (response) {
                modificarCarrito(email, idProducto, response)
              }
            }
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', xhr, error, status);
    }
});   
}

const tomarDatosBarra = () => {
  let busqueda = $(".inputBuscarPrincipal").val();

  if(busqueda) {
    window.location.href = `productos.html?tipo=barra&busqueda=${busqueda}`;
  }
}

const tomarProducto = (evento) => {
  let logueado = localStorage.getItem("logueado");
  if(logueado == "true") {
    let idProducto = $(evento.target).data('id-producto');
    let email = localStorage.getItem("email");
    verificarCarrito(idProducto, email);
  }else {
    alerta.alertar("Debes crearte una cuenta para añadir productos al carrito")
  }
}

function toggleOffcanvas() {
  var offcanvas = document.getElementById('offcanvasNavbar');
  var offcanvasInstance = new bootstrap.Offcanvas(offcanvas);

  offcanvasInstance.toggle();
}

$('.usuario').click(function() {
  $('.contenidoUsuario').toggle();
})

$("#botonMenu").click(toggleOffcanvas)
$(".btn-close-error").click(alerta.ocultarError)
$(".btn-close-principal").click(alerta.ocultarPrincipal)
$(document).on('click', '.agregar-carrito', tomarProducto);
$(".carrito").click(tomarProductosCarrito);
$("#botonBuscarPrincipal").click(tomarDatosBarra)

