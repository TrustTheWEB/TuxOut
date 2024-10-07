const indexTabla = (tabla) => {
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    let metodo = "imprimir"+tabla.charAt(0).toUpperCase() + tabla.slice(1);
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "index", controlador: controlador, valores: null},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirTablas[metodo](response);
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

const showTabla = (tabla, valores) => {
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    let metodo = "imprimir"+tabla.charAt(0).toUpperCase() + tabla.slice(1);
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: controlador, valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirTablas[metodo](response);
                }else {
                    console.error(response);
                } 
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr);
        }
    });
}

const cargarAtributos = {
    cargarAtributosEmpresa: () => {
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
    },
    cargarAtributosProducto: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
                    <option value="idProducto">ID Producto</option>
                    <option value="rut">RUT</option>
                    <option value="nombre">Nombre</option>
                    <option value="descripcion">Descripción</option>
                    <option value="precio">Precio</option>
                    <option value="stock">Stock</option>
                    <option value="estado">Estado</option>
                    <option value="marca">Marca</option>
            `);
            $("#btnIngresarTabla").attr("href","ingresar.html?tabla=producto");
    },
    cargarAtributosContiene: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idPedido">IdPedido</option>
            <option value="idProducto">IdProducto</option>
            <option value="cantidad">Cantidad</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=contiene");
    },
    cargarAtributosPedido: () => {
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
    },
    cargarAtributosUsuario: () => {
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
    },
    cargarAtributosCategoria: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idCategoria">ID Categoría</option>
            <option value="nombre">Nombre</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=categoria");
    },
    cargarAtributosCaracteristica: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idProducto">Id Producto</option>
            <option value="nombre">Nombre</option>
            <option value="valor">Valor</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=caracteristica");
    },
    cargarAtributosDescuento: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idDescuento">ID Descuento</option>
            <option value="porcentaje">Porcentaje</option>
            <option value="fechaInicio">Fecha Inicio</option>
            <option value="fechaFin">Fecha Fin</option>
            <option value="motivo">Motivo</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=descuento");
    },
    cargarAtributosVisita: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">Email</option>
            <option value="idProducto">ID Producto</option>
            <option value="fecha">Fecha</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=visita");
    },
    cargarAtributosFavorito: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">Email</option>
            <option value="idProducto">ID Producto</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=favorito");
    },
    cargarAtributosDireccion: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">Email</option>
            <option value="direccion">Dirección</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=direccion");
    
    },
    cargarAtributosTiene: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">idProducto</option>
            <option value="direccion">idDescuento</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=tiene");
    },
    cargarAtributosCategoriza: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idCategoria">ID Categoría</option>
            <option value="idProducto">ID Producto</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=categoriza");
    }
}

const imprimirTablas = {
    imprimirEmpresa: (resultado) => {
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
                        <td class="tdLargo">${item["contraseña"] || ''}</td>
                        <td> <a class="btn editar" href="editar.html?tabla=empresa&rut=${item["RUT"]}&nombre=${(item["nombre"])}&telefono=${(item["telefono"])}&direccion=${(item["direccion"])}&email=${(item["email"])}&contraseña=${(item["contraseña"])}">EDITAR</a> <button class="btn eliminar" data-rut="${item["RUT"]}">ELIMINAR</button> </td>
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
                    <td class="tdLargo">${resultado["contraseña"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=empresa&rut=${resultado["RUT"]}&nombre=${(resultado["nombre"])}&telefono=${(resultado["telefono"])}&direccion=${(resultado["direccion"])}&email=${(resultado["email"])}&contraseña=${(resultado["contraseña"])}">EDITAR</a> <button class="btn eliminar" data-rut="${resultado["RUT"]}">ELIMINAR</button> </td>
                </tr>`
            );
        }
    },
    imprimirProducto: (resultado) => {
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
                        <td class="tdLargo">${item["nombre"] || ''}</td>
                        <td>${item["descripcion"] || ''}</td>
                        <td>${item["precio"] || ''}</td>
                        <td>${item["stock"] || ''}</td>
                        <td>${item["estado"] || ''}</td>
                        <td>${item["marca"] || ''}</td>
                        <td> <a class="btn editar" href="editar.html?tabla=producto&idProducto=${item["idProducto"]}&rut=${item["RUT"]}&descripcion=${item["descripcion"]}&estado=${item["estado"]}&precio=${item["precio"]}&nombre=${item["nombre"]}&stock=${item["stock"]}&marca=${item["marca"]}">EDITAR</a> <button class="btn eliminar" data-idProducto="${item["idProducto"]}">ELIMINAR</button> </td>
                    </tr>`
                );
            });
        } else {
            $('#tablaBody').append(
                `<tr data-fila="producto-${resultado["idProducto"]}">
                    <td>${resultado["idProducto"] || ''}</td>
                    <td>${resultado["RUT"] || ''}</td>
                    <td class="tdLargo">${resultado["nombre"] || ''}</td>
                    <td>${resultado["descripcion"] || ''}</td>
                    <td>${resultado["precio"] || ''}</td>
                    <td>${resultado["stock"] || ''}</td>
                    <td>${resultado["estado"] || ''}</td>
                    <td>${resultado["marca"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=producto&idProducto=${resultado["idProducto"]}&rut=${resultado["RUT"]}&descripcion=${resultado["descripcion"]}&estado=${resultado["estado"]}&precio=${resultado["precio"]}&nombre=${resultado["nombre"]}&stock=${resultado["stock"]}&marca=${resultado["marca"]}">EDITAR</a> <button class="btn eliminar" data-idProducto="${resultado["idProducto"]}">ELIMINAR</button> </td>
                </tr>`
            );
        }
    },
    imprimirContiene: (resultado) => {
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
                        <td> <a class="btn editar" href="editar.html?tabla=contiene&idPedido=${item["idPedido"]}&idProducto=${item["idProducto"]}&cantidad=${(item["cantidad"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${item["idPedido"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button> </td>
                    </tr>`
                );
            });
        } else {
            $('#tablaBody').append(
                `<tr data-fila="contiene-${resultado["idPedido"]}-${resultado["idProducto"]}">
                    <td>${resultado["idPedido"] || ''}</td>
                    <td>${resultado["idProducto"] || ''}</td>
                    <td>${resultado["cantidad"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=contiene&idPedido=${resultado["idPedido"]}&idProducto=${resultado["idProducto"]}&cantidad=${(resultado["cantidad"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${resultado["idPedido"]}" data-idproducto="${resultado["idProducto"]}">ELIMINAR</button> </td>
                </tr>`
            );
        }
    },
    imprimirPedido: (resultado) => {
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
                        <td> <a class="btn editar" href="editar.html?tabla=pedido&idPedido=${item["idPedido"]}&estado=${(item["estado"])}&medioPago=${(item["medioPago"])}&montoTotal=${(item["montoTotal"])}&fecha=${(item["fecha"])}&email=${(item["email"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${item["idPedido"]}">ELIMINAR</button> </td>
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
                    <td> <a class="btn editar" href="editar.html?tabla=pedido&idPedido=${resultado["idPedido"]}&estado=${(resultado["estado"])}&medioPago=${(resultado["medioPago"])}&montoTotal=${(resultado["montoTotal"])}&fecha=${(resultado["fecha"])}&email=${(resultado["email"])}">EDITAR</a> <button class="btn eliminar" data-idpedido="${resultado["idPedido"]}">ELIMINAR</button> </td>
                </tr>`
            );
        }
    },
    imprimirUsuario: (resultado) => {
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
                        <td class="tdLargo">${item["contraseña"] || ''}</td>
                        <td>${item["fechaNac"] || ''}</td>
                        <td>${item["ci"] || ''}</td>
                        <td> <a class="btn editar" href="editar.html?tabla=usuario&email=${(item["email"])}&usuario=${(item["usuario"])}&nombre=${(item["nombre"])}&apellido=${(item["apellido"])}&telefono=${(item["telefono"])}&contraseña=${(item["contraseña"])}&fechaNac=${(item["fechaNac"])}&ci=${(item["ci"])}">EDITAR</a> <button class="btn eliminar" data-email="${item["email"]}">ELIMINAR</button> </td>
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
                    <td class="tdLargo">${resultado["contraseña"] || ''}</td>
                    <td>${resultado["fechaNac"] || ''}</td>
                    <td>${resultado["ci"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=usuario&email=${(resultado["email"])}&usuario=${(resultado["usuario"])}&nombre=${(resultado["nombre"])}&apellido=${(resultado["apellido"])}&telefono=${(resultado["telefono"])}&contraseña=${(resultado["contraseña"])}&fechaNac=${(resultado["fechaNac"])}&ci=${(resultado["ci"])}">EDITAR</a> <button class="btn eliminar" data-email="${resultado["email"]}">ELIMINAR</button> </td>
                </tr>`
            );
        }
    },
    imprimirCategoria: (resultado) => {
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
                        <td> <a class="btn editar" href="editar.html?tabla=categoria&idCategoria=${(item["idCategoria"])}&nombre=${(item["nombre"])}">EDITAR</a> <button class="btn eliminar" data-idcategoria="${item["idCategoria"]}">ELIMINAR</button> </td>
                    </tr>`
                );
            });
        } else {
            $('#tablaBody').append(
                `<tr data-fila="categoria-${resultado["idCategoria"]}">
                    <td>${resultado["idCategoria"] || ''}</td>
                    <td>${resultado["nombre"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=categoria&idCategoria=${(resultado["idCategoria"])}&nombre=${(resultado["nombre"])}">EDITAR</a> <button class="btn eliminar" data-idcategoria="${resultado["idCategoria"]}">ELIMINAR</button> </td>
                </tr>`
            );
        }
    },
    imprimirCaracteristica: (resultado) => {
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
                    `<tr data-fila="caracteristica-${item["idProducto"]}-${(item["nombre"])}-${(item["valor"])}">
                        <td>${item["idProducto"] || ''}</td>
                        <td>${item["nombre"] || ''}</td>
                        <td>${item["valor"] || ''}</td>
                        <td> <a class="btn editar" href="editar.html?tabla=caracteristica&idProducto=${(item["idProducto"])}&nombre=${(item["nombre"])}&valor=${(item["valor"])}">EDITAR</a> <button class="btn eliminar" data-idproducto="${item["idProducto"]}" data-nombre="${item["nombre"]}" data-valor="${item["valor"]}">ELIMINAR</button> </td>
                    </tr>`
                );
            });
        } else {
            $('#tablaBody').append(
                `<tr data-fila="caracteristica-${(resultado["idProducto"])}-${(resultado["nombre"])}-${(resultado["valor"])}">
                    <td>${resultado["idProducto"] || ''}</td>
                    <td>${resultado["nombre"] || ''}</td>
                    <td>${resultado["valor"] || ''}</td>
                    <td> <a class="btn editar" href="editar.html?tabla=caracteristica&idProducto=${(resultado["idProducto"])}&nombre=${(resultado["nombre"])}&valor=${(resultado["valor"])}">EDITAR</a> <button class="btn eliminar" data-idproducto="${resultado["idProducto"]}" data-nombre="${resultado["nombre"]}" data-valor="${resultado["valor"]}">ELIMINAR</button> </td>
                </tr>`
            );
        }
    },
    imprimirDescuento: (resultado) => {
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
    },
    imprimirVisita: (resultado) => {
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
    },
    imprimirFavorito: (resultado) => {
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
    },
    imprimirDireccion: (resultado) => {
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
    },
    imprimirTiene: (resultado) => {
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
    },
    imprimirCategoriza: (resultado) => {
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
}

const tomarUltimaTabla = () => {

    let tabla = localStorage.getItem("ultimaTabla");
    $("#selectTabla").val(tabla).change();
    if(tabla === null || tabla === undefined) {
        let tabla = $("#selectTabla").val();
        localStorage.setItem("ultimaTabla", tabla);
    }

    let metodo = "cargarAtributos"+tabla.charAt(0).toUpperCase() + tabla.slice(1);
    cargarAtributos[metodo]();
    indexTabla(tabla);
}

const tomarTabla = () => {
    let tabla = $("#selectTabla").val();
    localStorage.setItem("ultimaTabla", tabla);

    let metodo = "cargarAtributos"+tabla.charAt(0).toUpperCase() + tabla.slice(1);
    cargarAtributos[metodo]();
    indexTabla(tabla);
}

const tomarTablaAtributo = () => {
    let tabla = $("#selectTabla").val();
    let atributo = $("#selectAtributo").val();
    let valor = $("#selectValor").val();
    let valores = [atributo, valor];

    showTabla(tabla, valores);
}

$(document).ready(tomarUltimaTabla);
$("#selectTabla").change(tomarTabla);
$("#btnSeleccionarAtributo").click(tomarTablaAtributo);
$(document).ready(function() {
    $('#selectValor').keydown(function(event) {
        if (event.key === 'Enter') {
            tomarTablaAtributo();
            event.preventDefault();
        }
    });
});