const tomarDatos = () => {
    let email = localStorage.getItem('email');
    let urlParams = new URLSearchParams(window.location.search);
    let idPedido = urlParams.get('idPedido');
    let fecha = urlParams.get('fecha');

    tomarDetalles(idPedido, email, fecha);
}

const tomarDetalles = (idPedido, email, fecha) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "verDetalles", controlador: "PedidoControlador", valores: [idPedido, email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirDetalles(response, fecha);
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

const imprimirDetalles = (detalles, fecha) => {
    if(!Array.isArray(detalles)) {
        detalles = [detalles];
    }

    $(".fechaPedido").html(fecha)

    detalles.forEach(producto => {
        $("#contenedorDetalles").append(`
        <article class="card col-12 col-lg-7 mb-3">
            <div class="row g-0">
              <div class="col-5 col-md-4">
                <img src="../assets/img_productos/${producto['idProducto']}_1.jpg" class=" rounded-start imagen-detalle" alt="${producto['nombre']}" onerror="this.onerror=null;this.src='../assets/img/default.png';">
              </div>
              <div class="col-7 col-md-8">
                <div class="card-body">
                  <h5 class="card-title mb-4">${producto['nombre']}</h5>
                  <p class="card-text detalle-texto">Costo: $${producto['precioHistorico']}</p>
                  <p class="card-text detalle-texto">Estado: ${producto['estado']}</p>
                  <p class="card-text detalle-texto">Cantidad: ${producto['cantidad']}</p>
                </div>
              </div>
            </div>
          </article>    
        `);
    });
}

$(document).ready(tomarDatos);