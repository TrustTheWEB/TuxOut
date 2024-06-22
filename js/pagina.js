  //ES PARA QUE TENGAN UNA IDEA DE LO QUE DEBE HACER CADA COSA, NO ES EL CODIGO FIJO!!!!! TIENE ERRORES 
  // Y ESTÁ DESORDENADO!, HAY QUE SIMPLIFICARLO Y ORDENARLO SEGÚN EL ORDEN DE LA PÁGINA ;) 



  $('.usuario').click(function() {
    $('.contenidoUsuario').toggle();
  })


  //FUNCION PARA LOS BOTONES DE PODRÍA INTERESARTE
  $(function() {
    var items = $(".item");
    var startIndex = 0;
    var endIndex = 5;
    var totalItems = items.length;
    items.hide();
    items.slice(startIndex, endIndex).show();
    
    $(".boton-derecho").click(function() {
      items.hide();
      startIndex += 5;
      endIndex += 5;
      items.slice(startIndex, endIndex).show();

      $(".boton-izquierdo").prop("disabled", false);
      if (endIndex >= totalItems) {
        $(this).prop("disabled", true);
      }
      if (endIndex >= totalItems - 5) {
        $(this).hide();
      }
      $(".boton-izquierdo").show();
    })
    
    $(".boton-izquierdo").click(function() {
      items.hide();
      
      startIndex -= 5;
      endIndex -= 5;
      items.slice(startIndex, endIndex).show();
      $(".boton-derecho").prop("disabled", false);
            if (startIndex <= 0) {
        $(this).prop("disabled", true);
      }
      if (startIndex <= 5) {
        $(this).hide();
      }
      $(".boton-derecho").show();
    })
    $(".boton-izquierdo").hide();
    if (totalItems <= 5) {
      $(".boton-derecho").hide();
    }
  })

  //para que al iniciar sesion crear cuenta e ingresar desaparezcan
  $(function() {
    const crearCuenta = $('#crear-cuenta');
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
        window.location.href = 'ingresar.html';
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
        window.location.href = 'ingresar.html';
      }
    });
      if (usuarioIniciado === 'true') {
      $('#carrito-contenedor').load('carrito.html');
    }
