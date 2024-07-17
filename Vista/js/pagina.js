//menu desplegable

$(".mostrarPassEditarUsuario").click(function() {
  mostrarContraseña("#contraseñaEditarUsuario")
});

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