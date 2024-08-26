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

const showProducto = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/ProductoControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "show", atributo: atributo, valor: valor},
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

    console.log(resultado)

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr>
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["RUT"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td>${item["descripcion"] || ''}</td>
                    <td>${item["precio"] || ''}</td>
                    <td>${item["stock"] || ''}</td>
                    <td>${item["estado"] || ''}</td>
                    <td>${item["marca"] || ''}</td>
                    <td><a id="editarItem${item["idProducto"]}" href="editarProducto.html?tabla=producto&id=${item["idProducto"]}">EDITAR</a><button id="eliminarItem${item["idProducto"]}">ELIMINAR</button></td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr>
                <td>${resultado["idProducto"] || ''}</td>
                <td>${resultado["RUT"] || ''}</td>
                <td>${resultado["nombre"] || ''}</td>
                <td>${resultado["descripcion"] || ''}</td>
                <td>${resultado["precio"] || ''}</td>
                <td>${resultado["stock"] || ''}</td>
                <td>${resultado["estado"] || ''}</td>
                <td>${resultado["marca"] || ''}</td>
                <td><a id="editarItem${resultado["idProducto"]}" href="editarProducto.html?tabla=producto&id=${resultado["idProducto"]}">EDITAR</a><button id="eliminarItem${resultado["idProducto"]}">ELIMINAR</button></td>
            </tr>`
        );
    }
}

const tomarTabla = () => {
    let tabla = $("#selectTabla").val();

    switch (tabla) {
        case 'caracteristica':
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

const tomarTablaAtributo = () => {
    let tabla = $("#selectTabla").val();
    let atributo = $("#selectAtributo").val();
    let valor = $("#selectValor").val();

    switch (tabla) {
        case 'caracteristica':
            showCaracteristica(atributo, valor);
            break;
        case 'categoria':
            showCategoria(atributo, valor);
            break;
        case 'contiene':
            showContiene(atributo, valor);
            break;
        case 'descuento':
            showDescuento(atributo, valor);
            break;
        case 'direccion':
            showDireccion(atributo, valor);
            break;
        case 'empresa':
            showEmpresa(atributo, valor);
            break;
        case 'favorito':
            showFavorito(atributo, valor);
            break;
        case 'pedido':
            showPedido(atributo, valor);
            break;
        case 'producto':
            showProducto(atributo, valor);
            break;
        case 'tiene':
            showTiene(atributo, valor);
            break;
        case 'usuario':
            showUsuario(atributo, valor);
            break;
        case 'visita':
            showVisita(atributo, valor);
            break;
        default:
            console.log("Selección no válida");
    }
}

$("#seleccionar").click(tomarTabla);
$("#seleccionarCondicion").click(tomarTablaAtributo);
