const tomarProducto = () => {
    let idProducto = 0; //tomar con get desde url

    cargarProducto(idProducto);
} 

const cargarProducto = (idProducto) => {
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "showAbrir", controlador: "ProductoControlador", valores: [idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirProducto(response);
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

$(document).ready(tomarProducto);