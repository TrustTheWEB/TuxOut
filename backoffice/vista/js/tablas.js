const indexTabla = (tabla) => {
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    let metodo = "imprimir"+tabla.charAt(0).toUpperCase() + tabla.slice(1);
    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php', 
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
    console.log(tabla, valores)
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    let metodo = "imprimir"+tabla.charAt(0).toUpperCase() + tabla.slice(1);
    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php', 
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
    cargarAtributosCaracteristica: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idProducto">Id Producto</option>
            <option value="nombre">Nombre</option>
            <option value="valor">Valor</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=caracteristica");
    },
    cargarAtributosCarrito: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">Email</option>
            <option value="idProducto">ID Producto</option>
            <option value="cantidad">Cantidad</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=carrito");
    },
    cargarAtributosCategoria: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idCategoria">ID Categoría</option>
            <option value="nombre">Nombre</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=categoria");
    },
    cargarAtributosCategoriza: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idCategoria">ID Categoría</option>
            <option value="idProducto">ID Producto</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=categoriza");
    },
    cargarAtributosComenta: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idProducto">ID Producto</option>
            <option value="email">Email</option>
            <option value="calificacion">Calificación</option>
            <option value="comentario">Comentario</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=comenta");
    },
    cargarAtributosContiene: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idPedido">IdPedido</option>
            <option value="idProducto">IdProducto</option>
            <option value="cantidad">Cantidad</option>
            <option value="precioHistorico">Precio Histórico</option>
            <option value="estado">Estado</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=contiene");
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
    cargarAtributosDireccion: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">Email</option>
            <option value="direccion">Dirección</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=direccion");
    
    },
    cargarAtributosEmpresa: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
                    <option value="rut">RUT</option>
                    <option value="nombre">Nombre</option>
                    <option value="telefono">Teléfono</option>
                    <option value="direccion">Dirección</option>
                    <option value="email">Email</option>
                    <option value="contraseña">Contraseña</option>
                    <option value="suspendido">Suspendido</option>
            `);
            $("#btnIngresarTabla").attr("href","ingresar.html?tabla=empresa");
    },
    cargarAtributosFavorito: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">Email</option>
            <option value="idProducto">ID Producto</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=favorito");
    },
    cargarAtributosPedido: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="idPedido">ID Pedido</option>
            <option value="estado">Estado</option>
            <option value="medioPago">Medio de Pago</option>
            <option value="fecha">Fecha</option>
            <option value="email">Email</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=pedido");
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
                    <option value="oculto">Oculto</option>
            `);
            $("#btnIngresarTabla").attr("href","ingresar.html?tabla=producto");
    },
    cargarAtributosTiene: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">idProducto</option>
            <option value="direccion">idDescuento</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=tiene");
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
    cargarAtributosVisita: () => {
        $("#selectAtributo").html("");
        $("#selectAtributo").append(`
            <option value="email">Email</option>
            <option value="idProducto">ID Producto</option>
            <option value="fecha">Fecha</option>
        `);
        $("#btnIngresarTabla").attr("href","ingresar.html?tabla=visita");
    }
}

const imprimirTablas = {
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }

        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="caracteristica-${item["idProducto"]}-${(item["nombre"])}-${(item["valor"])}">
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td>${item["valor"] || ''}</td>
                    <td>
                        <div class="btn-group">
                            <a class="btn editar border" href="editar.html?tabla=caracteristica&idProducto=${(item["idProducto"])}&nombre=${(item["nombre"])}&valor=${(item["valor"])}">EDITAR</a>
                            <button class="btn eliminar border" data-idproducto="${item["idProducto"]}" data-nombre="${item["nombre"]}" data-valor="${item["valor"]}">ELIMINAR</button>
                        </div>
                    </td>
                </tr>`
            );
        });
    },
    imprimirCarrito: (resultado) => {
        $("#tabla").html("");
        $("#tabla").append(
            `<thead>
                <tr>
                    <th>Email</th>
                    <th>idProducto</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>`
        );
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }

        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="carrito-${item["email"]}-${item["idProducto"]}">
                    <td>${item["email"] || ''}</td>
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["cantidad"]}</td>
                    <td>
                        <div class="btn-group">
                            <a class="btn editar border" href="editar.html?tabla=carrito&email=${item["email"]}&idProducto=${item["idProducto"]}&cantidad=${item["cantidad"]}">EDITAR</a>
                            <button class="btn eliminar border" data-email="${item["email"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button>
                        </div>
                    </td>
                </tr>`
            );
        });
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }

        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="categoria-${item["idCategoria"]}">
                    <td>${item["idCategoria"] || ''}</td>
                    <td>${item["nombre"] || ''}</td>
                    <td>
                        <div class="btn-group">
                            <a class="btn editar border" href="editar.html?tabla=categoria&idCategoria=${(item["idCategoria"])}&nombre=${(item["nombre"])}">EDITAR</a>
                            <button class="btn eliminar border" data-idcategoria="${item["idCategoria"]}">ELIMINAR</button>
                        </div>
                    </td>
                </tr>`
            );
        });
       
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="categoriza-${item["idCategoria"]}-${item["idProducto"]}">
                        <td>${item["idCategoria"] || ''}</td>
                        <td>${item["idProducto"] || ''}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=categoriza&idCategoria=${item["idCategoria"] || ''}&idProducto=${item["idProducto"] || ''}">EDITAR</a>
                                <button class="btn eliminar border" data-idcategoria="${item["idCategoria"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
    },
    imprimirComenta: (resultado) => {
        $("#tabla").html("");
        $("#tabla").append(
            `<thead>
                <tr>
                    <th>Email</th>
                    <th>idProducto</th>
                    <th>Calificación</th>
                    <th>Comentario</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>`
        );
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }

        resultado.forEach(item => {
            $('#tablaBody').append(
                `<tr data-fila="comenta-${item["idProducto"]}-${item["email"]}">
                    <td>${item["email"] || ''}</td>
                    <td>${item["idProducto"] || ''}</td>
                    <td>${item["calificacion"] || ''}</td>
                    <td>${item["comentario"] || ''}</td>
                    <td>
                        <div class="btn-group">
                            <a class="btn editar border" href="editar.html?tabla=comenta&email=${item["email"] || ''}&idProducto=${item["idProducto"] || ''}&calificacion=${item["calificacion"] || ''}&comentario=${item["comentario"] || ''}">EDITAR</a>
                            <button class="btn eliminar border" data-email="${item["email"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button>
                        </div>
                    </td>
                </tr>`
            );
        });
    },
    imprimirContiene: (resultado) => {
        $("#tabla").html("");
        $("#tabla").append(
            `<thead>
                <tr>
                    <th>IdPedido</th>
                    <th>IdProducto</th>
                    <th>Cantidad</th>
                    <th>Precio Histórico</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>`
        );
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="contiene-${item["idPedido"]}-${item["idProducto"]}">
                        <td>${item["idPedido"] || ''}</td>
                        <td>${item["idProducto"] || ''}</td>
                        <td>${item["cantidad"] || ''}</td>
                        <td>${item["precioHistorico"] || ''}</td>
                        <td>${item["estado"] || ''}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=contiene&idPedido=${item["idPedido"] || ''}&idProducto=${item["idProducto"] || ''}&cantidad=${item["cantidad"] || ''}&precioHistorico=${item["precioHistorico"] || ''}&estado=${item["estado"] || ''}">EDITAR</a>
                                <button class="btn eliminar border" data-idpedido="${item["idPedido"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="descuento-${item["idDescuento"]}">
                        <td>${item["idDescuento"] || ''}</td>
                        <td>${item["porcentaje"] || ''}</td>
                        <td>${item["fechaInicio"] || ''}</td>
                        <td>${item["fechaFin"] || ''}</td>
                        <td>${item["motivo"] || ''}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=descuento&idDescuento=${item["idDescuento"] || ''}&porcentaje=${item["porcentaje"] || ''}&fechaInicio=${item["fechaInicio"] || ''}&fechaFin=${item["fechaFin"] || ''}&motivo=${item["motivo"] || ''}">EDITAR</a>
                                <button class="btn eliminar border" data-iddescuento="${item["idDescuento"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="direccion-${item["email"]}-${(item["direccion"])}">
                        <td>${item["email"] || ''}</td>
                        <td>${item["direccion"] || ''}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=direccion&email=${item["email"] || ''}&direccion=${item["direccion"] || ''}">EDITAR</a>
                                <button class="btn eliminar border" data-email="${item["email"] || ''}" data-direccion="${item["direccion"] || ''}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
    },
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
                    <th>Suspendido</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>
            `
        );
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {

                let suspendido = item["suspendido"];
                suspendido = suspendido == 1 ? suspendido = "checked" : suspendido = "";
                console.log(suspendido)
                $('#tablaBody').append(
                    `<tr data-fila="empresa-${item["RUT"]}">
                        <td>${item["RUT"] || ''}</td>
                        <td>${item["nombre"] || ''}</td>
                        <td>${item["telefono"] || ''}</td>
                        <td>${item["direccion"] || ''}</td>
                        <td>${item["email"] || ''}</td>
                        <td class="tdLargo">${item["contraseña"] || ''}</td>
                        <td><input type="checkbox" id="checkSuspender_${item["RUT"]}" class="checkSuspender" ${suspendido}></td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=empresa&rut=${item["RUT"] || ''}&nombre=${item["nombre"] || ''}&telefono=${item["telefono"] || ''}&direccion=${item["direccion"] || ''}&email=${item["email"] || ''}&suspendido=${item["suspendido"]}">EDITAR</a>
                                <a class="btn editar border" href="editar.html?tabla=contraEmpresa&rut=${item["RUT"]}">CONTRASEÑA</a>
                                <button class="btn eliminar border" data-rut="${item["RUT"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="favorito-${item["email"]}-${item["idProducto"]}">
                        <td>${item["email"] || ''}</td>
                        <td>${item["idProducto"] || ''}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=favorito&email=${item["email"]}&idProducto=${item["idProducto"]}">EDITAR</a>
                                <button class="btn eliminar border border" data-email="${item["email"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button> 
                            </div>
                        </td>
                    </tr>`
                );
            });
    },
    imprimirPedido: (resultado) => {
        $("#tabla").html("");
        $("#tabla").append(
            `<thead>
                <tr>
                    <th>ID Pedido</th>
                    <th>Estado</th>
                    <th>Medio de Pago</th>
                    <th>Dirección</th>
                    <th>Fecha</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>`
        );
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="pedido-${item["idPedido"]}">
                        <td>${item["idPedido"] || ''}</td>
                        <td>${item["estado"] || ''}</td>
                        <td>${item["medioPago"] || ''}</td>
                        <td>${item["direccion"] || ''}</td>
                        <td>${item["fecha"] || ''}</td>
                        <td>${item["email"] || ''}</td>
                        <td>
                            <div class="btn-group"> 
                                <a class="btn editar border" href="editar.html?tabla=pedido&idPedido=${item["idPedido"]}&estado=${item["estado"]}&medioPago=${item["medioPago"]}&direccion=${item["direccion"]}&fecha=${item["fecha"]}&email=${(item["email"])}">EDITAR</a> 
                                <button class="btn eliminar border" data-idpedido="${item["idPedido"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
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
                    <th>Oculto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaBody">
            </tbody>
            `
        );
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                let oculto = item["oculto"];
                oculto = oculto == 1 ? oculto = "checked" : oculto = "";
                $('#tablaBody').append(
                    `<tr data-fila="producto-${item["idProducto"]}">
                        <td>${item["idProducto"] || ''}</td>
                        <td>${item["RUT"] || ''}</td>
                        <td class="tdLargo">${item["nombre"] || ''}</td>
                        <td>${item["descripcion"] || ''}</td>
                        <td>${item["precio"] || ''}</td>
                        <td>${item["stock"]}</td>
                        <td>${item["estado"] || ''}</td>
                        <td>${item["marca"] || ''}</td>
                        <td><input type="checkbox" id="checkOcultar_${item["idProducto"]}" class="checkOcultar" ${oculto}></td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=producto&idProducto=${item["idProducto"]}&rut=${item["RUT"]}&descripcion=${item["descripcion"]}&estado=${item["estado"]}&precio=${item["precio"]}&nombre=${item["nombre"]}&stock=${item["stock"]}&marca=${item["marca"]}&oculto=${item["oculto"]}">EDITAR</a>
                                <button class="btn eliminar border" data-idproducto="${item["idProducto"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="tiene-${item["idProducto"]}-${item["idDescuento"]}">
                        <td>${item["idProducto"] || ''}</td>
                        <td>${item["idDescuento"] || ''}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=tiene&idProducto=${item["idProducto"]}&idDescuento=${item["idDescuento"]}">EDITAR</a>
                                <button class="btn eliminar border" data-idproducto="${item["idProducto"]}" data-iddescuento="${item["idDescuento"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
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
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=usuario&email=${item["email"] || ''}&usuario=${item["usuario"]}&nombre=${item["nombre"] || ''}&apellido=${item["apellido"] || ''}&telefono=${item["telefono"] || ''}&fechaNac=${item["fechaNac"] || ''}&ci=${item["ci"] || ''}">EDITAR</a>
                                <a class="btn editar border" href="editar.html?tabla=contraUsuario&email=${item["email"]}">CONTRASEÑA</a>
                                <button class="btn eliminar border" data-email="${item["email"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
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
    
        if (!Array.isArray(resultado)) {
            resultado = [resultado];
        }
            resultado.forEach(item => {
                $('#tablaBody').append(
                    `<tr data-fila="visita-${item["email"]}-${item["idProducto"]}">
                        <td>${item["email"] || ''}</td>
                        <td>${item["idProducto"] || ''}</td>
                        <td>${item["fecha"] || ''}</td>
                        <td>
                            <div class="btn-group">
                                <a class="btn editar border" href="editar.html?tabla=visita&email=${item["email"]}&idProducto=${item["idProducto"]}&fecha=${item["fecha"]}">EDITAR</a>
                                <button class="btn eliminar border" data-email="${item["email"]}" data-idproducto="${item["idProducto"]}">ELIMINAR</button>
                            </div>
                        </td>
                    </tr>`
                );
            });
    }
}

const tomarUltimaTabla = () => {

    let tabla = localStorage.getItem("ultimaTabla");
    if(!tabla) {
        let tabla = $("#selectTabla").val();
        localStorage.setItem("ultimaTabla", tabla);
    }

    $("#selectTabla").val(tabla).change();

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

const ocultar = (idProducto, oculto) => {

    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "ocultar", controlador: "ProductoControlador", valores: [idProducto, oculto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    
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

const suspender = (rut, suspendido) => {

    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "suspender", controlador: "EmpresaControlador", valores: [rut, suspendido]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    
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

const modificarBotonesOculto = (idProducto, oculto) => {
      let botonEditar = $(`.editar[href*="idProducto=${idProducto}"]`);
      let href = botonEditar.attr('href');
      href = href.replace(/oculto=\d+/, `oculto=${oculto}`);
      botonEditar.attr('href', href);
}

const modificarBotonesSuspendido = (rut, suspendido) => {
    let botonEditar = $(`.editar[href*="rut=${rut}"]`);
    let href = botonEditar.attr('href');
    href = href.replace(/suspendido=\d+/, `suspendido=${suspendido}`);
    botonEditar.attr('href', href);
}

const tomarIdOcultar = (evento) => {
    let idCheck = $(evento.target).attr('id');
    let idProducto = idCheck.split('_')[1];
    let oculto = $(`#${idCheck}`).is(':checked') ? 1 : 0;
    modificarBotonesOculto(idProducto, oculto);
    ocultar(idProducto, oculto);
}

const tomarRutSuspender = (evento) => {
    let idCheck = $(evento.target).attr('id');
    let rut = idCheck.split('_')[1];
    let suspendido = $(`#${idCheck}`).is(':checked') ? 1 : 0;
    console.log(rut, suspendido)
    modificarBotonesSuspendido(rut, suspendido);
    suspender(rut, suspendido);
}

$(document).on('change', '.checkOcultar', tomarIdOcultar);
$(document).on('change', '.checkSuspender', tomarRutSuspender);
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