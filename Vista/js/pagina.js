
function toggleOffcanvas() {
    var offcanvas = document.getElementById('offcanvasNavbar');
    var offcanvasInstance = new bootstrap.Offcanvas(offcanvas);
    
    offcanvasInstance.toggle();
  }
  $('.usuario').click(function() {
    $('.contenidoUsuario').toggle();
  })

  
  $(function() {
    const crearCuenta = $('#crear');
    const ingresar = $('#ingresar');
    const usuarioIniciado = localStorage.getItem('usuarioIniciado');
  
    if (usuarioIniciado) {
      if (crearCuenta.length) {
        crearCuenta.hide();
      }
  
      if (ingresar.length) {
        ingresar.hide();
      }
    }
  })
  //si el usuario inicia sesion index.html debe mostrarse sin crear cuenta e ingresar 
  $(function() {
    $('form').submit(function(e) {
      e.preventDefault();
      const usuarioValidado = true;
  
      if (usuarioValidado) {
        localStorage.setItem('usuarioIniciado', true);
        window.location.href = 'index.html';
      }
    })
  //cierra la sesión, solo borra el mensaje de bievenida y vuelve a mostrar crear cuenta e ingresar XD
    const cerrarSesionBtn = $('#cerrar-sesion');
  
    if (cerrarSesionBtn.length) {
      cerrarSesionBtn.click(function() {
        localStorage.removeItem('usuarioIniciado');
        window.location.href = 'index.html';
      })
   
  }
  //cuando el usuario inicia, crear cuenta e ingresar desaparecen pero se muestra un mensaje de bienvenida y el boton de usaurio
    const contenedorBienvenida = $('#contenedor-bienvenida')[0];
    const botonUsuario = $('.usuario')[0];
    const usuarioIniciado = localStorage.getItem('usuarioIniciado');
  
    if (usuarioIniciado === 'true' && contenedorBienvenida) {
      contenedorBienvenida.style.display = 'block';
      botonUsuario.style.display = 'block';
    } else {
      if (contenedorBienvenida) {
        contenedorBienvenida.style.display = 'none';
        botonUsuario.style.display = 'none';
      }
    }
  })
   
    const usuarioIniciado = localStorage.getItem('usuarioIniciado');
      $('.carrito').click(function(event) {
      if (usuarioIniciado !== 'true') {
        event.preventDefault();
      }
    });
  
    $('.carrito').click(function(event) {
      if (usuarioIniciado !== 'true') {
        event.preventDefault();
        $('.alerta-carrito').show();
        $('#exampleModal').modal('hide'); 
      }
    });
    $
    