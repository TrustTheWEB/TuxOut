//FUNCIÓN PARA ABRIR EL MENÚ
  $('.botonMenu').click(function() {
    $('.contenidoMenu').toggle();
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
  });