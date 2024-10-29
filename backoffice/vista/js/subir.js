import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

import Alerta from './Alerta.js';
const alerta = new Alerta();

let metodo = null;

const tomarImagenes = (response) => {
    alert(response)

    let imagenes

    for(let i = 1; i <= 5; i++) {
        imagenes = $(`#inputImagen${i}`).val();
    }

    console.log(imagenes)
}

const storeTabla = (tabla, valores) => {
    
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: controlador, valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    console.log(response)
                    window.location.href = 'index.html';
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

const updateTabla = (tabla, valores) => {
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "update", controlador: controlador, valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    console.log(response)
                    window.location.href = 'index.html';
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

    const updateContra = (tabla, valores) => {
        let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
        $.ajax({
            url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php', 
            method: 'POST', 
            dataType: 'json', 
            data: {accion: "updateContra", controlador: controlador, valores: valores},
            success: function(response) {
                if (response.error) {
                    console.error('Error:', response.error);
                } else {
                    if(response) {
                        if(tabla === "producto") {
                            
                        }
                        window.location.href = 'index.html';
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

const validacionTablasIngresar = {
    validar: (tabla, valores, validaciones, mensajesError) => {
        try {

            for (let i = 0; i < valores.length; i++) {
                if (!validaciones[i](valores[i])) {
                    throw new Error(mensajesError[i]); 
                }
            }

            console.log(typeof(valores[4]))
            switch (metodo) {
                case "store":
                    storeTabla(tabla, valores);
                    break;
                case "update":
                    updateTabla(tabla, valores);
                    break;
                case "updateContra":
                    updateContra(tabla, valores);
                    break;
                default:
                    console.error("metodo no valido")
            }

        } catch (error) {
            alerta.alertar(error); 
        }
    },

    validarCaracteristica: (idProducto, nombre, valor) => {
        validacionTablasIngresar.validar(
            "caracteristica", 
            [idProducto, nombre, valor], 
            [validaciones.validarId, validaciones.validarNombreCaracteristica, validaciones.validarValor],
            ["ID de producto inválido", "Nombre de característica inválido", "Valor de característica inválido"]
        );
    },

    validarCarrito: (email, idProducto, cantidad) => {
        validacionTablasIngresar.validar(
            "carrito", 
            [email, idProducto, cantidad], 
            [validaciones.validarEmail, validaciones.validarId, validaciones.validarCantidad],
            ["Email inválido", "ID de producto inválido", "Cantidad inválida"]
        );
    },

    validarCategoria: (nombre) => {
        validacionTablasIngresar.validar(
            "categoria", 
            [nombre], 
            [validaciones.validarNombreCategoria],
            ["Nombre de categoría inválido"]
        );
    },

    validarCategoriaUpdate: (idCategoria, nombre) => {
        validacionTablasIngresar.validar(
            "categoria", 
            [idCategoria, nombre], 
            [validaciones.validarId, validaciones.validarNombreCategoria],
            ["ID categoría inválido","Nombre de categoría inválido"]
        );
    },


    validarCategoriza: (idProducto, idCategoria) => {
        validacionTablasIngresar.validar(
            "categoriza", 
            [idProducto, idCategoria], 
            [validaciones.validarId, validaciones.validarId],
            ["ID de producto inválido", "ID de categoría inválido"]
        );
    },

    validarComenta: (email, idProducto, calificacion, comentario) => {
        validacionTablasIngresar.validar(
            "comenta", 
            [email, idProducto, calificacion, comentario], 
            [validaciones.validarEmail, validaciones.validarId, validaciones.validarCalificacion, validaciones.validarDescripcionProducto],
            ["Email inválido", "ID de producto inválido", "Calificación inválida", "Comentario inválido"]
        );
    },

    validarContiene: (idPedido, idProducto, cantidad, precioHistorico, estado) => {
        validacionTablasIngresar.validar(
            "contiene", 
            [idPedido, idProducto, cantidad, precioHistorico, estado], 
            [validaciones.validarId, validaciones.validarId, validaciones.validarCantidad, validaciones.validarPrecio, validaciones.validarEstadoContiene],
            ["ID de pedido inválido", "ID de producto inválido", "Cantidad inválida", "Precio inválido", "Estado inválido"]
        );
    },

    validarDescuento: (porcentaje, fechaInicio, fechaFin, motivo) => {
        validacionTablasIngresar.validar(
            "descuento", 
            [porcentaje, fechaInicio, fechaFin, motivo], 
            [validaciones.validarPorcentaje, validaciones.validarFecha, validaciones.validarFecha, validaciones.validarMotivoDescuento],
            ["Porcentaje inválido", "Fecha de inicio inválida", "Fecha de fin inválida", "Motivo inválido"]
        );
    },

    validarDescuentoUpdate: (idDescuento, porcentaje, fechaInicio, fechaFin, motivo) => {
        validacionTablasIngresar.validar(
            "descuento", 
            [idDescuento, porcentaje, fechaInicio, fechaFin, motivo], 
            [validaciones.validarId, validaciones.validarPorcentaje, validaciones.validarFecha, validaciones.validarFecha, validaciones.validarMotivoDescuento],
            ["ID Descuento inválido", "Porcentaje inválido", "Fecha de inicio inválida", "Fecha de fin inválida", "Motivo inválido"]
        );
    },

    validarDireccion: (email, direccion) => {
        validacionTablasIngresar.validar(
            "direccion", 
            [email, direccion], 
            [validaciones.validarEmail, validaciones.validarDireccion],
            ["Email inválido", "Dirección inválida"]
        );
    },

    validarEmpresa: (rut, nombre, telefono, direccion, email, contraseña, suspendido) => {
        validacionTablasIngresar.validar(
            "empresa", 
            [rut, nombre, telefono, direccion, email, contraseña, suspendido ? 1 : 0], 
            [validaciones.validarRUT, validaciones.validarNombreUsuario, validaciones.validarTelefono, validaciones.validarDireccion, validaciones.validarEmail, validaciones.validarContra, validaciones.validarBooleano],
            ["RUT inválido", "Nombre inválido", "Teléfono inválido", "Dirección inválida", "Email inválido", "Contraseña inválida", "Valor de suspendido inválido"]
        );
    },

    validarEmpresaUpdate: (rut, nombre, telefono, direccion, email, suspendido) => {
        validacionTablasIngresar.validar(
            "empresa", 
            [rut, nombre, telefono, direccion, email, suspendido ? 1 : 0], 
            [validaciones.validarRUT, validaciones.validarNombreUsuario, validaciones.validarTelefono, validaciones.validarDireccion, validaciones.validarEmail, validaciones.validarBooleano],
            ["RUT inválido", "Nombre inválido", "Teléfono inválido", "Dirección inválida", "Email inválido", "Valor de suspendido inválido"]
        );
    },

    validarContraEmpresa: (rut, contraseña) => {
        validacionTablasIngresar.validar(
            "empresa", 
            [rut, contraseña], 
            [validaciones.validarRUT, validaciones.validarContra],
            ["RUT inválido", "Contraseña inválida"]
        );
    },

    validarFavorito: (email, idProducto) => {
        validacionTablasIngresar.validar(
            "favorito", 
            [email, idProducto], 
            [validaciones.validarEmail, validaciones.validarId],
            ["Email inválido", "ID de producto inválido"]
        );
    },

    validarPedido: (estado, medioPago, direccion, email) => {
        validacionTablasIngresar.validar(
            "pedido", 
            [estado, medioPago, direccion, email], 
            [validaciones.validarEstadoPedido, validaciones.validarMedioPago, validaciones.validarDireccion, validaciones.validarEmail],
            ["Estado inválido", "Medio de pago inválido", "Dirección inválido", "Email inválido"]
        );
    },

    validarPedidoUpdate: (idPedido, estado, medioPago, direccion, fecha, email) => {
        validacionTablasIngresar.validar(
            "pedido", 
            [idPedido, estado, medioPago, direccion, fecha, email], 
            [validaciones.validarId, validaciones.validarEstadoPedido, validaciones.validarMedioPago, validaciones.validarDireccion, validaciones.validarFechaHora,validaciones.validarEmail],
            ["ID pedido inválido", "Estado inválido", "Medio de pago inválido", "Dirección inválido", "Fecha inválida", "Email inválido"]
        );
    },

    validarProducto: (rut, nombre, descripcion, precio, stock, estado, marca, oculto) => {
        validacionTablasIngresar.validar(
            "producto", 
            [rut, nombre, descripcion, precio, stock, estado, marca, oculto ? 1 : 0], 
            [validaciones.validarRUT, validaciones.validarNombreProducto, validaciones.validarDescripcionProducto, validaciones.validarPrecio, validaciones.validarStock, validaciones.validarEstadoProducto, validaciones.validarMarcaProducto, validaciones.validarBooleano],
            ["RUT inválido", "Nombre inválido", "Descripción inválida", "Precio inválido", "Stock inválido", "Estado inválido", "Marca inválida", "Valor de oculto inválido"]
        );
    },

    validarProductoUpdate: (idProducto, rut, nombre, descripcion, precio, stock, estado, marca, oculto) => {
        validacionTablasIngresar.validar(
            "producto", 
            [idProducto, rut, nombre, descripcion, precio, stock, estado, marca, oculto ? 1 : 0], 
            [validaciones.validarId, validaciones.validarRUT, validaciones.validarNombreProducto, validaciones.validarDescripcionProducto, validaciones.validarPrecio, validaciones.validarStock, validaciones.validarEstadoProducto, validaciones.validarMarcaProducto, validaciones.validarBooleano],
            ["ID producto inválido", "RUT inválido", "Nombre inválido", "Descripción inválida", "Precio inválido", "Stock inválido", "Estado inválido", "Marca inválida", "Valor de oculto inválido"]
        );
    },

    validarTiene: (idDescuento, idProducto) => {
        validacionTablasIngresar.validar(
            "tiene", 
            [idDescuento, idProducto], 
            [validaciones.validarId, validaciones.validarId],
            ["ID de descuento inválido", "ID de producto inválido"]
        );
    },

    validarUsuario: (email, usuario, nombre, apellido, telefono, fechaNac, ci, contraseña) => {
        validacionTablasIngresar.validar(
            "usuario", 
            [email, usuario, nombre, apellido, telefono, fechaNac, ci, contraseña], 
            [validaciones.validarEmail, validaciones.validarNickUsuario, validaciones.validarNombreUsuario, validaciones.validarApellidoUsuario, validaciones.validarTelefonoNull, validaciones.validarFechaNac, validaciones.validarCiNull, validaciones.validarContra],
            ["Email inválido", "Usuario inválido", "Nombre inválido", "Apellido inválido", "Teléfono inválido", "Fecha de nacimiento inválida", "CI inválida",  "Contraseña inválida"]
        );
    },

    validarUsuarioUpdate: (email, usuario, nombre, apellido, telefono, fechaNac, ci) => {
        validacionTablasIngresar.validar(
            "usuario", 
            [email, usuario, nombre, apellido, telefono, fechaNac, ci], 
            [validaciones.validarEmail, validaciones.validarNickUsuario, validaciones.validarNombreUsuario, validaciones.validarApellidoUsuario, validaciones.validarTelefonoNull, validaciones.validarFechaNac, validaciones.validarCiNull],
            ["Email inválido", "Usuario inválido", "Nombre inválido", "Apellido inválido", "Teléfono inválido", "Fecha de nacimiento inválida", "CI inválida"]
        );
    },

    validarContraUsuario: (email, contraseña) => {
        validacionTablasIngresar.validar(
            "usuario", 
            [email, contraseña], 
            [validaciones.validarEmail, validaciones.validarContra],
            ["Email inválido", "Contraseña inválida"]
        );
    },

    validarVisita: (email, idProducto) => {
        validacionTablasIngresar.validar(
            "visita", 
            [email, idProducto], 
            [validaciones.validarEmail, validaciones.validarId],
            ["Email inválido", "ID de producto inválido"]
        );
    }
};

const tomarDatosIngresar = {
    tomarCaracteristica: () => {
        let idProducto = $("#inputIdProducto").val();
        let nombre = $("#inputNombre").val();
        let valor = $("#inputValor").val();
        validacionTablasIngresar.validarCaracteristica(idProducto, nombre, valor);
    },

    tomarCarrito: () => {
        let email = $("#inputEmail").val();
        let idProducto = $("#inputIdProducto").val();
        let cantidad = $("#inputCantidad").val();
        validacionTablasIngresar.validarCarrito(email, idProducto, cantidad);
    },

    tomarCategoria: () => {
        let nombre = $("#inputNombre").val();
        validacionTablasIngresar.validarCategoria(nombre);
    },

    tomarCategoriaUpdate: () => {
        let idCategoria = $("#inputIdCategoria").val();
        let nombre = $("#inputNombre").val();
        validacionTablasIngresar.validarCategoriaUpdate(idCategoria, nombre);
    },

    tomarCategoriza: () => {
        let idProducto = $("#inputIdProducto").val();
        let idCategoria = $("#inputIdCategoria").val();
        validacionTablasIngresar.validarCategoriza(idProducto, idCategoria);
    },

    tomarComenta: () => {
        let email = $("#inputEmail").val();
        let idProducto = $("#inputIdProducto").val();
        let calificacion = $("#inputCalificacion").val();
        let comentario = $("#inputComentario").val();
        validacionTablasIngresar.validarComenta(email, idProducto, calificacion, comentario);
    },

    tomarContiene: () => {
        let idPedido = $("#inputIdPedido").val();
        let idProducto = $("#inputIdProducto").val();
        let cantidad = $("#inputCantidad").val();
        let precioHistorico = $("#inputPrecioHistorico").val();
        let estado = $("#inputEstado").val();
        validacionTablasIngresar.validarContiene(idPedido, idProducto, cantidad, precioHistorico, estado);
    },

    tomarDescuento: () => {
        let porcentaje = $("#inputPorcentaje").val();
        let fechaInicio = $("#inputFechaInicio").val();
        let fechaFin = $("#inputFechaFin").val();
        let motivo = $("#inputMotivo").val();
        validacionTablasIngresar.validarDescuento(porcentaje, fechaInicio, fechaFin, motivo);
    },

    tomarDescuentoUpdate: () => {
        let idDescuento = $("#inputIdDescuento").val();
        let porcentaje = $("#inputPorcentaje").val();
        let fechaInicio = $("#inputFechaInicio").val();
        let fechaFin = $("#inputFechaFin").val();
        let motivo = $("#inputMotivo").val();
        validacionTablasIngresar.validarDescuentoUpdate(idDescuento, porcentaje, fechaInicio, fechaFin, motivo);
    },

    tomarDireccion: () => {
        let email = $("#inputEmail").val();
        let direccion = $("#inputDireccion").val();
        validacionTablasIngresar.validarDireccion(email, direccion);
    },

    tomarEmpresa: () => {
        let rut = $("#inputRUT").val();
        let nombre = $("#inputNombre").val();
        let telefono = $("#inputTelefono").val();
        let direccion = $("#inputDireccion").val();
        let email = $("#inputEmail").val();
        let contraseña = $("#inputContra").val();
        let suspendido = $("#inputSuspendido").is(':checked');
        validacionTablasIngresar.validarEmpresa(rut, nombre, telefono, direccion, email, contraseña, suspendido);
    },

    tomarEmpresaUpdate: () => {
        let rut = $("#inputRUT").val();
        let nombre = $("#inputNombre").val();
        let telefono = $("#inputTelefono").val();
        let direccion = $("#inputDireccion").val();
        let email = $("#inputEmail").val();
        let suspendido = $("#inputSuspendido").is(':checked');
        validacionTablasIngresar.validarEmpresaUpdate(rut, nombre, telefono, direccion, email, suspendido);
    },

    tomarContraEmpresa: () => {
        let rut = $("#inputRUT").val();
        let contraseña = $("#inputContra").val();
        validacionTablasIngresar.validarContraEmpresa(rut, contraseña);
    },

    tomarFavorito: () => {
        let email = $("#inputEmail").val();
        let idProducto = $("#inputIdProducto").val();
        validacionTablasIngresar.validarFavorito(email, idProducto);
    },

    tomarPedido: () => {
        let estado = $("#inputEstado").val();
        let medioPago = $("#inputMedioPago").val();
        let direccion = $("#inputDireccion").val();
        let email = $("#inputEmail").val();
        validacionTablasIngresar.validarPedido(estado, medioPago, direccion, email);
    },

    tomarPedidoUpdate: () => {
        let idPedido = $("#inputIdPedido").val();
        let estado = $("#inputEstado").val();
        let medioPago = $("#inputMedioPago").val();
        let direccion = $("#inputDireccion").val();
        let fecha = $("#inputFecha").val();
        let email = $("#inputEmail").val();
        validacionTablasIngresar.validarPedidoUpdate(idPedido, estado, medioPago, direccion, fecha, email);
    },

    tomarProducto: () => {
        let rut = $("#inputRUT").val();
        let nombre = $("#inputNombre").val();
        let descripcion = $("#inputDescripcion").val();
        let precio = $("#inputPrecio").val();
        let stock = $("#inputStock").val();
        let estado = $("#inputEstado").val();
        let marca = $("#inputMarca").val();
        let oculto = $("#inputOculto").is(':checked');
        validacionTablasIngresar.validarProducto(rut, nombre, descripcion, precio, stock, estado, marca, oculto);
    },

    tomarProductoUpdate: () => {
        let idProducto = $("#inputIdProducto").val();
        let rut = $("#inputRUT").val();
        let nombre = $("#inputNombre").val();
        let descripcion = $("#inputDescripcion").val();
        let precio = $("#inputPrecio").val();
        let stock = $("#inputStock").val();
        let estado = $("#inputEstado").val();
        let marca = $("#inputMarca").val();
        let oculto = $("#inputOculto").is(':checked');
        validacionTablasIngresar.validarProductoUpdate(idProducto, rut, nombre, descripcion, precio, stock, estado, marca, oculto);
    },

    tomarTiene: () => {
        let idDescuento = $("#inputIdDescuento").val();
        let idProducto = $("#inputIdProducto").val();
        validacionTablasIngresar.validarTiene(idDescuento, idProducto);
    },

    tomarUsuario: () => {
        let email = $("#inputEmail").val();
        let usuario = $("#inputUsuario").val();
        let nombre = $("#inputNombre").val();
        let apellido = $("#inputApellido").val();
        let telefono = $("#inputTelefono").val();
        let fechaNac = $("#inputFechaNac").val();
        let ci = $("#inputCi").val();
        let contraseña = $("#inputContra").val();
        validacionTablasIngresar.validarUsuario(email, usuario, nombre, apellido, telefono, fechaNac, ci, contraseña);
    },

    tomarUsuarioUpdate: () => {
        let email = $("#inputEmail").val();
        let usuario = $("#inputUsuario").val();
        let nombre = $("#inputNombre").val();
        let apellido = $("#inputApellido").val();
        let telefono = $("#inputTelefono").val();
        let fechaNac = $("#inputFechaNac").val();
        let ci = $("#inputCi").val();
        validacionTablasIngresar.validarUsuarioUpdate(email, usuario, nombre, apellido, telefono, fechaNac, ci);
    },

    tomarContraUsuario: () => {
        let email = $("#inputEmail").val();
        let contraseña = $("#inputContra").val();
        validacionTablasIngresar.validarContraUsuario(email, contraseña);
    },

    tomarVisita: () => {
        let email = $("#inputEmail").val();
        let idProducto = $("#inputIdProducto").val();
        let fecha = $("#inputFecha").val();
        validacionTablasIngresar.validarVisita(email, idProducto, fecha);
    }
}

const tomarTablaIngresar = () => {
    let url = new URLSearchParams(window.location.search);
    let tabla = url.get('tabla');
    tabla = tabla.charAt(0).toUpperCase() + tabla.slice(1);
    if((tabla == "Usuario" || tabla == "Empresa" || tabla == "Categoria" || tabla == "Descuento" || tabla =="Pedido" || tabla == "Producto") && metodo == "update") {
        tomarDatosIngresar["tomar"+tabla+"Update"]();
    }else if(tabla == "ContraUsuario" || tabla == "ContraEmpresa" ) {
        metodo = "updateContra";
        tomarDatosIngresar["tomar"+tabla]();
    }else {
        tomarDatosIngresar["tomar"+tabla]();
    }
}


$("#btnIngresarFormularioTabla").click(function() {
    metodo = "store";
    tomarTablaIngresar()
});

$("#btnActualizarFormularioTabla").click(function() {
    metodo = "update"
    tomarTablaIngresar()
});