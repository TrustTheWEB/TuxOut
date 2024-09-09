//EMPRESA

const indexEmpresa = () => {
 
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/EmpresaControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "index"},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirEmpresa(response)
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showEmpresa = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/EmpresaControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "show", atributo: atributo, valor: valor},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirEmpresa(response)
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirEmpresa = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>
        `
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="empresa-${item["RUT"]}">
                    <td>${item["RUT"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td>${item["telefono"] || ''}</td>
                    <td>${item["direccion"] || ''}</td>
                    <td>${item["email"] || ''}</td>
                    <td class="tdContra">${item["contraseña"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=empresa&rut=${item["RUT"]}&nombre=${encodeURIComponent(item["nombre"])}&telefono=${encodeURIComponent(item["telefono"])}&direccion=${encodeURIComponent(item["direccion"])}&email=${encodeURIComponent(item["email"])}&contraseña=${encodeURIComponent(item["contraseña"])}">EDITAR</a> <button class="btn eliminar" data-rut="${item["RUT"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="empresa-${resultado["RUT"]}">
                <td>${resultado["RUT"] || ''}</td>
                <td>${resultado["nombre"] || ''}</td>
                <td>${resultado["telefono"] || ''}</td>
                <td>${resultado["direccion"] || ''}</td>
                <td>${resultado["email"] || ''}</td>
                <td class="tdContra">${resultado["contraseña"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=empresa&rut=${resultado["RUT"]}&nombre=${encodeURIComponent(resultado["nombre"])}&telefono=${encodeURIComponent(resultado["telefono"])}&direccion=${encodeURIComponent(resultado["direccion"])}&email=${encodeURIComponent(resultado["email"])}&contraseña=${encodeURIComponent(resultado["contraseña"])}">EDITAR</a> <button class="btn eliminar" data-rut="${resultado["RUT"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}


const cargarAtributosEmpresa = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
                <option value="rut">RUT</option>
                <option value="nombre">Nombre</option>
                <option value="telefono">Teléfono</option>
                <option value="direccion">Dirección</option>
                <option value="email">Email</option>
                <option value="contraseña">Contraseña</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=empresa");
}

// PRODUCTO

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

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="producto-${item["idProducto"]}">
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["RUT"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td>${item["descripcion"] || ''}</td>
                    <td>${item["precio"] || ''}</td>
                    <td>${item["stock"] || ''}</td>
                    <td>${item["estado"] || ''}</td>
                    <td>${item["marca"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=producto&idProducto=${item["idProducto"]}">EDITAR</a> <button class="btn eliminar" data-idProducto="${item["idProducto"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="producto-${resultado["idProducto"]}">
                <td>${resultado["idProducto"] || ''}</td>
                <td>${resultado["RUT"] || ''}</td>
                <td>${resultado["nombre"] || ''}</td>
                <td>${resultado["descripcion"] || ''}</td>
                <td>${resultado["precio"] || ''}</td>
                <td>${resultado["stock"] || ''}</td>
                <td>${resultado["estado"] || ''}</td>
                <td>${resultado["marca"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=producto&idProducto=${resultado["idProducto"]}">EDITAR</a> <button class="btn eliminar" data-idProducto="${resultado["idProducto"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}


const cargarAtributosProducto = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
                <option value="idProducto">ID Producto</option>
                <option value="RUT">RUT</option>
                <option value="nombre">Nombre</option>
                <option value="descripcion">Descripción</option>
                <option value="precio">Precio</option>
                <option value="stock">Stock</option>
                <option value="estado">Estado</option>
                <option value="marca">Marca</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=producto");
}

// CONTIENE 

const indexContiene = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/ContieneControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "index" },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirContiene(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showContiene = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/ContieneControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "show", atributo: atributo, valor: valor },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirContiene(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirContiene = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>IdPedido</th>
                <th>IdProducto</th>
                <th>Cantidad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="contiene-${item["idPedido"]}-${item["idProducto"]}">
                    <td>${item["idPedido"] || ''}</td>
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["cantidad"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=contiene&idPedido=${item["idPedido"]}&idProducto=${item["idProducto"]}&cantidad=${encodeURIComponent(item["cantidad"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${item["idPedido"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="contiene-${resultado["idPedido"]}-${resultado["idProducto"]}">
                <td>${resultado["idPedido"] || ''}</td>
                <td>${resultado["idProducto"] || ''}</td>
                <td>${resultado["cantidad"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=contiene&idPedido=${resultado["idPedido"]}&idProducto=${resultado["idProducto"]}&cantidad=${encodeURIComponent(resultado["cantidad"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${resultado["idPedido"]}" data-idproducto="${resultado["idProducto"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosContiene = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="idPedido">IdPedido</option>
        <option value="idProducto">IdProducto</option>
        <option value="cantidad">Cantidad</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=contiene");
}

// PEDIDO

const indexPedido = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/PedidoControlador.php',
        method: 'POST',
        dataType: 'json',
        data: {metodoControlador: "index"},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirPedido(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showPedido = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/PedidoControlador.php',
        method: 'POST',
        dataType: 'json',
        data: {metodoControlador: "show", atributo: atributo, valor: valor},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirPedido(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirPedido = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>ID Pedido</th>
                <th>Estado</th>
                <th>Medio de Pago</th>
                <th>Monto Total</th>
                <th>Fecha</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="pedido-${item["idPedido"]}">
                    <td>${item["idPedido"] || ''}</td>
                    <td>${item["estado"] || ''}</td>
                    <td>${item["medioPago"] || ''}</td>
                    <td>${item["montoTotal"] || ''}</td>
                    <td>${item["fecha"] || ''}</td>
                    <td>${item["email"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=pedido&idPedido=${item["idPedido"]}&estado=${encodeURIComponent(item["estado"])}&medioPago=${encodeURIComponent(item["medioPago"])}&montoTotal=${encodeURIComponent(item["montoTotal"])}&fecha=${encodeURIComponent(item["fecha"])}&email=${encodeURIComponent(item["email"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${item["idPedido"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="pedido-${resultado["idPedido"]}">
                <td>${resultado["idPedido"] || ''}</td>
                <td>${resultado["estado"] || ''}</td>
                <td>${resultado["medioPago"] || ''}</td>
                <td>${resultado["montoTotal"] || ''}</td>
                <td>${resultado["fecha"] || ''}</td>
                <td>${resultado["email"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=pedido&idPedido=${resultado["idPedido"]}&estado=${encodeURIComponent(resultado["estado"])}&medioPago=${encodeURIComponent(resultado["medioPago"])}&montoTotal=${encodeURIComponent(resultado["montoTotal"])}&fecha=${encodeURIComponent(resultado["fecha"])}&email=${encodeURIComponent(resultado["email"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${resultado["idPedido"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosPedido = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="idPedido">ID Pedido</option>
        <option value="estado">Estado</option>
        <option value="medioPago">Medio de Pago</option>
        <option value="montoTotal">Monto Total</option>
        <option value="fecha">Fecha</option>
        <option value="email">Email</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=pedido");
}

// USUARIO

const indexUsuario = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/UsuarioControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "index"},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirUsuario(response)
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showUsuario = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/UsuarioControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "show", atributo: atributo, valor: valor},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirUsuario(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirUsuario = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>Email</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Teléfono</th>
                <th>Contraseña</th>
                <th>Fecha de Nacimiento</th>
                <th>CI</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="usuario-${item["email"]}">
                    <td>${item["email"] || ''}</td>
                    <td>${item["usuario"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td>${item["apellido"] || ''}</td>
                    <td>${item["telefono"] || ''}</td>
                    <td class="tdContra">${item["contraseña"] || ''}</td>
                    <td>${item["fechaNac"] || ''}</td>
                    <td>${item["ci"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=usuario&email=${encodeURIComponent(item["email"])}&usuario=${encodeURIComponent(item["usuario"])}&nombre=${encodeURIComponent(item["nombre"])}&apellido=${encodeURIComponent(item["apellido"])}&telefono=${encodeURIComponent(item["telefono"])}&contraseña=${encodeURIComponent(item["contraseña"])}&fechaNac=${encodeURIComponent(item["fechaNac"])}&ci=${encodeURIComponent(item["ci"])}">EDITAR</a> <button class="btn eliminar" data-email="${item["email"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="usuario-${resultado["email"]}">
                <td>${resultado["email"] || ''}</td>
                <td>${resultado["usuario"] || ''}</td>
                <td>${resultado["nombre"] || ''}</td>
                <td>${resultado["apellido"] || ''}</td>
                <td>${resultado["telefono"] || ''}</td>
                <td class="tdContra">${resultado["contraseña"] || ''}</td>
                <td>${resultado["fechaNac"] || ''}</td>
                <td>${resultado["ci"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=usuario&email=${encodeURIComponent(resultado["email"])}&usuario=${encodeURIComponent(resultado["usuario"])}&nombre=${encodeURIComponent(resultado["nombre"])}&apellido=${encodeURIComponent(resultado["apellido"])}&telefono=${encodeURIComponent(resultado["telefono"])}&contraseña=${encodeURIComponent(resultado["contraseña"])}&fechaNac=${encodeURIComponent(resultado["fechaNac"])}&ci=${encodeURIComponent(resultado["ci"])}">EDITAR</a> <button class="btn eliminar" data-email="${resultado["email"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosUsuario = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="email">Email</option>
        <option value="usuario">Usuario</option>
        <option value="nombre">Nombre</option>
        <option value="apellido">Apellido</option>
        <option value="telefono">Teléfono</option>
        <option value="contraseña">Contraseña</option>
        <option value="fechaNac">Fecha de Nacimiento</option>
        <option value="ci">CI</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=usuario");
}

// CATEGORIA

const indexCategoria = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/CategoriaControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "index" },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirCategoria(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showCategoria = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/CategoriaControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "show", atributo: atributo, valor: valor },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirCategoria(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirCategoria = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>ID Categoría</th>
                <th>Nombre</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="categoria-${item["idCategoria"]}">
                    <td>${item["idCategoria"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=categoria&idCategoria=${encodeURIComponent(item["idCategoria"])}&nombre=${encodeURIComponent(item["nombre"])}">EDITAR</a> <button class="btn eliminar" data-idcategoria="${item["idCategoria"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="categoria-${resultado["idCategoria"]}">
                <td>${resultado["idCategoria"] || ''}</td>
                <td>${resultado["nombre"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=categoria&idCategoria=${encodeURIComponent(resultado["idCategoria"])}&nombre=${encodeURIComponent(resultado["nombre"])}">EDITAR</a> <button class="btn eliminar" data-idcategoria="${resultado["idCategoria"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosCategoria = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="idCategoria">ID Categoría</option>
        <option value="nombre">Nombre</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=categoria");
}

// CARACTERISTICA

const indexCaracteristica = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/CaracteristicaControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "index"},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirCaracteristica(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showCaracteristica = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/CaracteristicaControlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "show", atributo: atributo, valor: valor},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirCaracteristica(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirCaracteristica = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>Id Producto</th>
                <th>Nombre</th>
                <th>Valor</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="caracteristica-${item["idProducto"]}-${encodeURIComponent(item["nombre"])}-${encodeURIComponent(item["valor"])}">
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td>${item["valor"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=caracteristica&idProducto=${encodeURIComponent(item["idProducto"])}&nombre=${encodeURIComponent(item["nombre"])}&valor=${encodeURIComponent(item["valor"])}">EDITAR</a> <button class="btn eliminar" data-idproducto="${item["idProducto"]}" data-nombre="${item["nombre"]}" data-valor="${item["valor"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="caracteristica-${encodeURIComponent(resultado["idProducto"])}-${encodeURIComponent(resultado["nombre"])}-${encodeURIComponent(resultado["valor"])}">
                <td>${resultado["idProducto"] || ''}</td>
                <td>${resultado["nombre"] || ''}</td>
                <td>${resultado["valor"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=caracteristica&idProducto=${encodeURIComponent(resultado["idProducto"])}&nombre=${encodeURIComponent(resultado["nombre"])}&valor=${encodeURIComponent(resultado["valor"])}">EDITAR</a> <button class="btn eliminar" data-idproducto="${resultado["idProducto"]}" data-nombre="${resultado["nombre"]}" data-valor="${resultado["valor"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosCaracteristica = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="idProducto">Id Producto</option>
        <option value="nombre">Nombre</option>
        <option value="valor">Valor</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=caracteristica");
}


// DESCUENTO

const indexDescuento = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/DescuentoControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "index" },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirDescuento(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showDescuento = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/DescuentoControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "show", atributo: atributo, valor: valor },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirDescuento(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirDescuento = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>ID Descuento</th>
                <th>Porcentaje</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Motivo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="descuento-${item["idDescuento"]}">
                    <td>${item["idDescuento"] || ''}</td>
                    <td>${item["porcentaje"] || ''}</td>
                    <td>${item["fechaInicio"] || ''}</td>
                    <td>${item["fechaFin"] || ''}</td>
                    <td>${item["motivo"] || ''}</td>
                    <td> 
                        <a class="btn editar" href="editar.html?tabla=descuento&idDescuento=${item["idDescuento"]}&porcentaje=${item["porcentaje"]}&fechaInicio=${item["fechaInicio"]}&fechaFin=${item["fechaFin"]}&motivo=${item["motivo"]}">EDITAR</a> 
                        <button class="btn eliminar" data-iddescuento="${item["idDescuento"]}">ELIMINAR</button> 
                    </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="descuento-${resultado["idDescuento"]}">
                <td>${resultado["idDescuento"] || ''}</td>
                <td>${resultado["porcentaje"] || ''}</td>
                <td>${resultado["fechaInicio"] || ''}</td>
                <td>${resultado["fechaFin"] || ''}</td>
                <td>${resultado["motivo"] || ''}</td>
                <td> 
                    <a class="btn editar" href="editar.html?tabla=descuento&idDescuento=${resultado["idDescuento"]}&porcentaje=${resultado["porcentaje"]}&fechaInicio=${resultado["fechaInicio"]}&fechaFin=${resultado["fechaFin"]}&motivo=${resultado["motivo"]}">EDITAR</a> 
                    <button class="btn eliminar" data-iddescuento="${resultado["idDescuento"]}">ELIMINAR</button> 
                </td>
            </tr>`
        );
    }
}

const cargarAtributosDescuento = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="idDescuento">ID Descuento</option>
        <option value="porcentaje">Porcentaje</option>
        <option value="fechaInicio">Fecha Inicio</option>
        <option value="fechaFin">Fecha Fin</option>
        <option value="motivo">Motivo</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=descuento");
}

// VISITA

const indexVisita = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/VisitaControlador.php',
        method: 'POST',
        dataType: 'json',
        data: {metodoControlador: "index"},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirVisita(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showVisita = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/VisitaControlador.php',
        method: 'POST',
        dataType: 'json',
        data: {metodoControlador: "show", atributo: atributo, valor: valor},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirVisita(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirVisita = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>Email</th>
                <th>idProducto</th>
                <th>Fecha</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="visita-${item["email"]}-${item["idProducto"]}">
                    <td>${item["email"] || ''}</td>
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["fecha"] || ''}</td>
                    <td>
                        <a class="btn editar" href="editar.html?tabla=visita&email=${item["email"]}&idProducto=${item["idProducto"]}&fecha=${item["fecha"]}">EDITAR</a>
                        <button class="btn eliminar" data-email="${item["email"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button>
                    </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="visita-${resultado["email"]}-${resultado["idProducto"]}">
                <td>${resultado["email"] || ''}</td>
                <td>${resultado["idProducto"] || ''}</td>
                <td>${resultado["fecha"] || ''}</td>
                <td>
                    <a class="btn editar" href="editar.html?tabla=visita&email=${resultado["email"]}&idProducto=${resultado["idProducto"]}&fecha=${resultado["fecha"]}">EDITAR</a>
                    <button class="btn eliminar" data-email="${resultado["email"]}" data-idproducto="${resultado["idProducto"]}">ELIMINAR</button>
                </td>
            </tr>`
        );
    }
}

const cargarAtributosVisita = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="email">Email</option>
        <option value="idProducto">ID Producto</option>
        <option value="fecha">Fecha</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=visita");
}

// FAVORITO

const indexFavorito = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/FavoritoControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "index" },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirFavorito(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showFavorito = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/FavoritoControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "show", atributo: atributo, valor: valor },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirFavorito(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirFavorito = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>Email</th>
                <th>ID Producto</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="favorito-${item["email"]}-${item["idProducto"]}">
                    <td>${item["email"] || ''}</td>
                    <td>${item["idProducto"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=favorito&email=${item["email"]}&idProducto=${item["idProducto"]}">EDITAR</a> <button class="btn eliminar" data-email="${item["email"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="favorito-${resultado["email"]}-${resultado["idProducto"]}">
                <td>${resultado["email"] || ''}</td>
                <td>${resultado["idProducto"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=favorito&email=${resultado["email"]}&idProducto=${resultado["idProducto"]}">EDITAR</a> <button class="btn eliminar" data-email="${resultado["email"]}" data-idproducto="${resultado["idProducto"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosFavorito = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="email">Email</option>
        <option value="idProducto">ID Producto</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=favorito");
}

// DIRECCION

const indexDireccion = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/DireccionControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "index" },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirDireccion(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showDireccion = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/DireccionControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "show", atributo: atributo, valor: valor },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirDireccion(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirDireccion = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>Email</th>
                <th>Dirección</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="direccion-${item["email"]}-${(item["direccion"])}">
                    <td>${item["email"] || ''}</td>
                    <td>${item["direccion"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=direccion&email=${item["email"]}&direccion=${(item["direccion"])}">EDITAR</a> <button class="btn eliminar" data-email="${item["email"]}" data-direccion="${(item["direccion"])}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="direccion-${resultado["email"]}-${(resultado["direccion"])}">
                <td>${resultado["email"] || ''}</td>
                <td>${resultado["direccion"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=direccion&email=${resultado["email"]}&direccion=${(resultado["direccion"])}">EDITAR</a> <button class="btn eliminar" data-email="${resultado["email"]}" data-direccion="${(resultado["direccion"])}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosDireccion = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="email">Email</option>
        <option value="direccion">Dirección</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=direccion");

}

// TIENE

const indexTiene = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/TieneControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "index" },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirTiene(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showTiene = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/TieneControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "show", atributo: atributo, valor: valor },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirTiene(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirTiene = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>idProducto</th>
                <th>idDescuento</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="tiene-${item["idProducto"]}-${item["idDescuento"]}">
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["idDescuento"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=tiene&idProducto=${item["idProducto"]}&idDescuento=${item["idDescuento"]}">EDITAR</a> <button class="btn eliminar" data-idproducto="${item["idProducto"]}" data-iddescuento="${item["idDescuento"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="tiene-${resultado["idProducto"]}-${resultado["idDescuento"]}">
                <td>${resultado["idProducto"] || ''}</td>
                <td>${resultado["idDescuento"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=tiene&idProducto=${resultado["idProducto"]}&idDescuento=${resultado["idDescuento"]}">EDITAR</a> <button class="btn eliminar" data-idproducto="${resultado["idProducto"]}" data-iddescuento="${resultado["idDescuento"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosTiene = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="email">idProducto</option>
        <option value="direccion">idDescuento</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=tiene");
}

// CATEGORIZA

const indexCategoriza = () => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/CategorizaControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "index" },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirCategoriza(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const showCategoriza = (atributo, valor) => {
    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/CategorizaControlador.php',
        method: 'POST',
        dataType: 'json',
        data: { metodoControlador: "show", atributo: atributo, valor: valor },
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                imprimirCategoriza(response);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', error);
        }
    });
}

const imprimirCategoriza = (resultado) => {
    $("#tabla").html("");
    $("#tabla").append(
        `<thead>
            <tr>
                <th>ID Categoría</th>
                <th>ID Producto</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>`
    );

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="categoriza-${item["idCategoria"]}-${item["idProducto"]}">
                    <td>${item["idCategoria"] || ''}</td>
                    <td>${item["idProducto"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=categoriza&idCategoria=${item["idCategoria"]}&idProducto=${item["idProducto"]}">EDITAR</a> <button class="btn eliminar" data-idcategoria="${item["idCategoria"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button> </td>
                </tr>`
            );
        });
    } else {
        $('#tablaBody').append(
            `<tr data-fila="categoriza-${resultado["idCategoria"]}-${resultado["idProducto"]}">
                <td>${resultado["idCategoria"] || ''}</td>
                <td>${resultado["idProducto"] || ''}</td>
                <td> <a class="btn editar" href="editar.html?tabla=categoriza&idCategoria=${resultado["idCategoria"]}&idProducto=${resultado["idProducto"]}">EDITAR</a> <button class="btn eliminar" data-idcategoria="${resultado["idCategoria"]}" data-idproducto="${resultado["idProducto"]}">ELIMINAR</button> </td>
            </tr>`
        );
    }
}

const cargarAtributosCategoriza = () => {
    $("#selectAtributo").html("");
    $("#selectAtributo").append(`
        <option value="idCategoria">ID Categoría</option>
        <option value="idProducto">ID Producto</option>
    `);
    $("#btnIngresarTabla").attr("href","ingresar.html?tabla=categoriza");
}

// TABLAS

const tomarUltimaTabla = () => {

    let tabla = localStorage.getItem("ultimaTabla");
    $("#selectTabla").val(tabla).change();
    if(tabla === null || tabla === undefined) {
        let tabla = $("#selectTabla").val();
        localStorage.setItem("ultimaTabla", tabla);
    }
    llamarMetodosImpresion(tabla);
}

const tomarTabla = () => {

    let tabla = $("#selectTabla").val();
    localStorage.setItem("ultimaTabla", tabla);
    llamarMetodosImpresion(tabla);
}

const llamarMetodosImpresion = (tabla) => {

    switch (tabla) {
        case 'caracteristica':
            cargarAtributosCaracteristica();
            indexCaracteristica();
            break;
        case 'categoria':
            cargarAtributosCategoria();
            indexCategoria();
            break;
        case 'categoriza':
            cargarAtributosCategoriza();
            indexCategoriza();
            break;
        case 'contiene':
            cargarAtributosContiene();
            indexContiene();
            break;
        case 'descuento':
            cargarAtributosDescuento();
            indexDescuento();
            break;
        case 'direccion':
            cargarAtributosDireccion();
            indexDireccion();
            break;
        case 'empresa':
            cargarAtributosEmpresa();
            indexEmpresa();
            break;
        case 'favorito':
            cargarAtributosFavorito();
            indexFavorito();
            break;
        case 'pedido':
            cargarAtributosPedido();
            indexPedido();
            break;
        case 'producto':
            cargarAtributosProducto();
            indexProducto();
            break;
        case 'tiene':
            cargarAtributosTiene();
            indexTiene();
            break;
        case 'usuario':
            cargarAtributosUsuario();
            indexUsuario();
            break;
        case 'visita':
            cargarAtributosVisita();
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
        case 'categoriza':
            showCategoriza(atributo, valor);
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

const tomarTablaEliminar = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del botón, si es necesario
    let tabla = $("#selectTabla").val();
    let $botonEliminar = $(event.currentTarget); // Obtiene el botón específico que fue clicado
    eliminarDato(tabla, $botonEliminar);
}


const eliminarDato = (tabla, $botonEliminar) => {
    let valores = [];
    let id = "";

    // Declaración de variables fuera del switch
    let idProducto, nombre, valor, idCategoria, idPedido, idDescuento, direccion, email, rut;

    // Obtención de datos del botón clicado
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
            valores = [direccion, email];
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

    $.ajax({
        url: 'http://localhost/PROYECTO/TuxOut/backoffice/controlador/'+tabla+'Controlador.php',
        method: 'POST',
        dataType: 'json',
        data: {metodoControlador: "destroy", valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    console.error(response);
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

$(document).ready(tomarUltimaTabla);
$("#selectTabla").change(tomarTabla);
$("#btnSeleccionarAtributo").click(tomarTablaAtributo);
$(document).on('click', '.eliminar', tomarTablaEliminar);

$(document).ready(function() {
    $('#selectValor').keydown(function(event) {
        if (event.key === 'Enter') {
            tomarTablaAtributo();
            event.preventDefault();
        }
    });
});
