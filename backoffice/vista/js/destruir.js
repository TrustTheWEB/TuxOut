const tomarTablaEliminar = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del botón, si es necesario
    let tabla = $("#selectTabla").val();
    let $botonEliminar = $(event.currentTarget); // Obtiene el botón específico que fue clicado
    eliminarDato(tabla, $botonEliminar);
}


const eliminarDato = (tabla, $botonEliminar) => {
    let valores = [];
    let id = "";

    let idProducto, nombre, valor, idCategoria, idPedido, idDescuento, direccion, email, rut;

    switch (tabla) {
        case 'caracteristica':
            idProducto = $botonEliminar.data('idproducto');
            nombre = $botonEliminar.data('nombre');
            valor = $botonEliminar.data('valor');
            id = ""+tabla+"-"+idProducto+"-"+nombre+"-"+valor;
            valores = [idProducto, nombre, valor];
            break;
        case 'categoria':
            idCategoria = $botonEliminar.data('idcategoria');
            id = ""+tabla+"-"+idCategoria;
            valores = [idCategoria];
            break;
        case 'categoriza':
            idCategoria = $botonEliminar.data('idcategoria');
            idProducto = $botonEliminar.data('idproducto');
            id = ""+tabla+"-"+idCategoria+"-"+idProducto;
            valores = [idCategoria, idProducto];
            break;
        case 'contiene':
            idPedido = $botonEliminar.data('idpedido');
            idProducto = $botonEliminar.data('idproducto');
            id = ""+tabla+"-"+idPedido+"-"+idProducto;
            valores = [idPedido, idProducto];
            break;
        case 'descuento':
            idDescuento = $botonEliminar.data('iddescuento');
            id = ""+tabla+"-"+idDescuento;
            valores = [idDescuento];
            break;
        case 'direccion':
            direccion = $botonEliminar.data('direccion');
            email = $botonEliminar.data('email');
            id = ""+tabla+"-"+email+"-"+direccion;
            valores = [email, direccion];
            break;
        case 'empresa':
            rut = $botonEliminar.data('rut');
            id = ""+tabla+"-"+rut;
            valores = [rut];
            break;
        case 'favorito':
            idProducto = $botonEliminar.data('idproducto');
            email = $botonEliminar.data('email');
            id = ""+tabla+"-"+idProducto+"-"+email;
            valores = [idProducto, email];
            break;
        case 'pedido':
            idPedido = $botonEliminar.data('idpedido');
            id = ""+tabla+"-"+idPedido;
            valores = [idPedido];
            break;
        case 'producto':
            idProducto = $botonEliminar.data('idproducto');
            id = ""+tabla+"-"+idProducto;
            valores = [idProducto];
            break;
        case 'tiene':
            idProducto = $botonEliminar.data('idproducto');
            idDescuento = $botonEliminar.data('iddescuento');
            id = ""+tabla+"-"+idProducto+"-"+idDescuento;
            valores = [idProducto, idDescuento];
            break;
        case 'usuario':
            email = $botonEliminar.data('email');
            id = ""+tabla+"-"+email;
            valores = [email];
            break;
        case 'visita':
            email = $botonEliminar.data('email');
            idProducto = $botonEliminar.data('idproducto');
            id = ""+tabla+"-"+email+"-"+idProducto;
            valores = [email, idProducto];
            break;
        default:
            console.log("Selección no válida");
    }

    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php',
        method: 'POST',
        dataType: 'json',
        data: {accion: "destroy", controlador: controlador ,valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    console.log(response);
                    alert("Eliminado exitosamente");
                    let selector = '[data-fila="'+ id +'"]';
                    
                    
                    if ($(selector).length) {
                        console.log("Elemento encontrado:", id);
                        $(selector).remove();
                    } else {
                        console.error("Elemento no encontrado:", id);
                    }
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

$(document).on('click', '.eliminar', tomarTablaEliminar);