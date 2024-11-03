function toggleOffcanvas() {
    var offcanvas = document.getElementById('offcanvasNavbar');
    var offcanvasInstance = new bootstrap.Offcanvas(offcanvas);
  
    offcanvasInstance.toggle();
  }

  $("#botonMenu").click(toggleOffcanvas)
  
  $(document).on('click', '.pass-emp', function() {
    mostrarContraseña("#contraSignUpEmpresa")
  });
  
  $(document).on('click', '.pass-emp-repetir', function() {
    mostrarContraseña("#contraSignUpEmpresaRepetir")
  });

  $(document).on('click', '.pass-nueva', function() {
    mostrarContraseña("#contraseñaEditarEmpresa")
  });

  $(document).on('click', '.pass-nueva-repetir', function() {
    mostrarContraseña("#contraseñaRepetirEditarEmpresa")
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