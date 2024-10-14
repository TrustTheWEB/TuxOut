const eliminarImagenes = (id) => {
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Eliminar.php',
        type: 'POST',
        dataType: 'json',
        data: { idProducto: id }
    });
}

const tomarTablaEliminar = (event) => {
    event.preventDefault();
    let tabla = $("#selectTabla").val();
    let botonEliminar = $(event.currentTarget);
    eliminarDato(tabla, botonEliminar);
}

const generarId = {
    generarIdCaracteristica: (botonEliminar) => {
        let idProducto = botonEliminar.data('idproducto');
        let nombre = botonEliminar.data('nombre');
        let valor = botonEliminar.data('valor');
        let id = `caracteristica-${idProducto}-${nombre}-${valor}`;
        let valores = [idProducto, nombre, valor];
        return [id, valores];
    },

    generarIdCategoria: (botonEliminar) => {
        let idCategoria = botonEliminar.data('idcategoria');
        let id = `categoria-${idCategoria}`;
        let valores = [idCategoria];
        return [id, valores];
    },

    generarIdCategoriza: (botonEliminar) => {
        let idCategoria = botonEliminar.data('idcategoria');
        let idProducto = botonEliminar.data('idproducto');
        let id = `categoriza-${idCategoria}-${idProducto}`;
        let valores = [idCategoria, idProducto];
        return [id, valores];
    },

    generarIdContiene: (botonEliminar) => {
        let idPedido = botonEliminar.data('idpedido');
        let idProducto = botonEliminar.data('idproducto');
        let id = `contiene-${idPedido}-${idProducto}`;
        let valores = [idProducto, idPedido];
        return [id, valores];
    },

    generarIdDescuento: (botonEliminar) => {
        let idDescuento = botonEliminar.data('iddescuento');
        let id = `descuento-${idDescuento}`;
        let valores = [idDescuento];
        return [id, valores];
    },

    generarIdDireccion: (botonEliminar) => {
        let direccion = botonEliminar.data('direccion');
        let email = botonEliminar.data('email');
        let id = `direccion-${email}-${direccion}`;
        let valores = [email, direccion];
        return [id, valores];
    },

    generarIdEmpresa: (botonEliminar) => {
        let rut = botonEliminar.data('rut');
        let id = `empresa-${rut}`;
        let valores = [rut];
        return [id, valores];
    },

    generarIdFavorito: (botonEliminar) => {
        let idProducto = botonEliminar.data('idproducto');
        let email = botonEliminar.data('email');
        let id = `favorito-${idProducto}-${email}`;
        let valores = [idProducto, email];
        return [id, valores];
    },

    generarIdPedido: (botonEliminar) => {
        let idPedido = botonEliminar.data('idpedido');
        let id = `pedido-${idPedido}`;
        let valores = [idPedido];
        return [id, valores];
    },

    generarIdProducto: (botonEliminar) => {
        let idProducto = botonEliminar.data('idproducto');
        let id = `producto-${idProducto}`;
        let valores = [idProducto];
        return [id, valores];
    },

    generarIdTiene: (botonEliminar) => {
        let idProducto = botonEliminar.data('idproducto');
        let idDescuento = botonEliminar.data('iddescuento');
        let id = `tiene-${idProducto}-${idDescuento}`;
        let valores = [idProducto, idDescuento];
        return [id, valores];
    },

    generarIdUsuario: (botonEliminar) => {
        let email = botonEliminar.data('email');
        let id = `usuario-${email}`;
        let valores = [email];
        return [id, valores];
    },

    generarIdVisita: (botonEliminar) => {
        let email = botonEliminar.data('email');
        let idProducto = botonEliminar.data('idproducto');
        let id = `visita-${email}-${idProducto}`;
        let valores = [email, idProducto];
        return [id, valores];
    }
};

const eliminarDato = (tabla, botonEliminar) => {

    let datos = generarId[`generarId${tabla.charAt(0).toUpperCase() + tabla.slice(1)}`](botonEliminar);
    let id = datos[0];
    let valores = datos[1];

    console.log(valores, id)

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
                    let selector = '[data-fila="'+ id +'"]';
                    if ($(selector).length) {
                        console.log("Elemento encontrado:", id);
                        $(selector).remove();
                        if(tabla === "producto") {
                            eliminarImagenes(response);
                        }
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