const indexProducto = () => {
 
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/ProductoControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "index"},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirProducto(response)
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirProducto = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>ID Producto</th>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Marca</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>
        `
    );

    resultado.forEach(item => {
        $('#tablaBody').append(
            `<tr>
                <td>${item["idProducto"] || ''}</td>
                <td>${item["RUT"] || ''}</td>
                <td>${item["Nombre"] || ''}</td>
                <td>${item["Descripción"] || ''}</td>
                <td>${item["Precio"] || ''}</td>
                <td>${item["Stock"] || ''}</td>
                <td>${item["Estado"] || ''}</td>
                <td>${item["Marca"] || ''}</td>
                <td><a id="editarItem${item["idProducto"]}" href="editarProducto.html?tabla=producto&id=${item["idProducto"]}">EDITAR</a><button id="eliminarItem${item["idProducto"]}">ELIMINAR</button></td>
            </tr>`
        );
    });
}

const tomarTabla = () => {
    let tabla = $("#selectTabla").val();

    switch (tabla) {case 'caracteristica':
        indexCaracteristica();
        break;
    case 'categoria':
        indexCategoria();
        break;
    case 'contiene':
        indexContiene();
        break;
    case 'descuento':
        indexDescuento();
        break;
    case 'direccion':
        indexDireccion();
        break;
    case 'empresa':
        indexEmpresa();
        break;
    case 'favorito':
        indexFavorito();
        break;
    case 'pedido':
        indexPedido();
        break;
    case 'producto':
        indexProducto();
        break;
    case 'tiene':
        indexTiene();
        break;
    case 'usuario':
        indexUsuario();
        break;
    case 'visita':
        indexVisita();
        break;
    default:
        console.log("Selección no válida");
    }
}

$("#seleccionar").click(tomarTabla);
