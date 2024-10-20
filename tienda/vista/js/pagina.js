

$(".mostrarPassEditarUsuario").click(function() {
  mostrarContraseña("#contraseñaEditarUsuario")
});

//menu desplegable

function toggleOffcanvas() {
    var offcanvas = document.getElementById('offcanvasNavbar');
    var offcanvasInstance = new bootstrap.Offcanvas(offcanvas);

    offcanvasInstance.toggle();
  }
  
  $('.usuario').click(function() {
    $('.contenidoUsuario').toggle();
  })

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
            <a class="nav-link categoriaAside" href="productos.html?categoria=${categoria}">${categoria}</a>
          </li>

          `)

  }
}

$("#botonMenu").click(tomarCategorias);

const mostrarProductos = () => {

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
              console.log("modificado");
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
              console.log("agregado");
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
                console.log(response)
                modificarCarrito(email, idProducto, response)
              }
            }
    },
    error: function(xhr, status, error) {
        console.error('Error en la solicitud:', xhr, error, status);
    }
});   
}

const tomarProducto = (evento) => {
  let logueado = localStorage.getItem("logueado");
  if(logueado == "true") {
    let idProducto = $(evento.target).data('id-producto');
    let email = localStorage.getItem("email");
    verificarCarrito(idProducto, email);
  }else {
    alert("debes crearte una cuenta")
  }
}

$(document).on('click', '.agregar-carrito', tomarProducto);
$(".carrito").click(mostrarProductos);


