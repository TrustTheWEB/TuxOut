function toggleOffcanvas() {
    var offcanvas = document.getElementById('offcanvasNavbar');
    var offcanvasInstance = new bootstrap.Offcanvas(offcanvas);
  
    offcanvasInstance.toggle();
  }

  $("#botonMenu").click(toggleOffcanvas)