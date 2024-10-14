import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

const validarImagen = (img) => {
    const extensionesValidas = ['jpg', 'jpeg', 'png'];
    const sizeMax = 4 * 1024 * 1024; 

        const fileExtension = img.name.split('.').pop().toLowerCase();
        const sizeImg = img.size;

        if (!extensionesValidas.includes(fileExtension)) {
            alert(`La extensión de la imagen ${img.name} no es válida, solo se permiten jpg, jpeg y png`);
            return false;
        }else if(sizeImg > sizeMax) {
            alert(`La imagen ${img.name} es muy pesada, el máximo son 4MB`)
            return false;
        }

        return true;
}

const subirImagenes = (id) => {
    let cantImg = $("#agregarImagen").data('cant');
    if(cantImg > 5) {
        cantImg = 5;
    }

    for(let i = 1; i <= cantImg; i++) {
        let formData = new FormData();
        let img = $(`#inputImagen${i}`)[0].files[0];
        let imagenValida = validarImagen(img);

        if(imagenValida) {
            formData.append('file', img);
            formData.append('idProducto', id);
            formData.append('numeroImagen', i);
    
            $.ajax({
                url: 'http://localhost/TuxOut/backoffice/core/Subir.php',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                error: function() {
                    console.log('Error al subir el archivo');
                }
            });
        }
    }
}

const eliminarImagenes = (id) => {
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Eliminar.php',
        type: 'POST',
        dataType: 'json',
        data: { idProducto: id },
        success: function(response) {
            console.log(response);
        },
        error: function() {
            console.log('Error al eliminar el archivo');
        }
    });
}

const storeTabla = (tabla, valores) => {
    
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: controlador, valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    if(tabla === "producto") {
                        subirImagenes(response)
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

const updateTabla = (tabla, valores) => {
    let controlador = tabla.charAt(0).toUpperCase() + tabla.slice(1) + "Controlador";
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "update", controlador: controlador, valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    if(tabla === "producto") {
                        eliminarImagenes(valores[0]);
                        subirImagenes(valores[0]);
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
    validarCaracteristica: (idProducto, nombre, valor) => {
        let idProductoValido = validaciones.validarId(idProducto);
        let nombreValido = validaciones.validarNombreCaracteristica(nombre);
        let valorValido = validaciones.validarValor(valor);

        if (idProductoValido && nombreValido && valorValido) {
            let valores = [idProducto, nombre, valor];
            storeTabla("caracteristica", valores);
        } else {
            console.error("Los datos de característica no son válidos");
        }
    },

    validarCategoria: (nombre) => {
        let nombreValido = validaciones.validarNombreCategoria(nombre);

        if (nombreValido) {
            let valores = [nombre];
            storeTabla("categoria", valores);
        } else {
            console.error("Los datos de categoría no son válidos");
        }
    },

    validarCategoriza: (idProducto, idCategoria) => {
        let idProductoValido = validaciones.validarId(idProducto);
        let idCategoriaValido = validaciones.validarId(idCategoria);

        if (idProductoValido && idCategoriaValido) {
            let valores = [idProducto, idCategoria];
            storeTabla("categoriza", valores);
        } else {
            console.error("Los datos de categoriza no son válidos");
        }
    },

    validarContiene: (idPedido, idProducto, cantidad) => {
        let idPedidoValido = validaciones.validarId(idPedido);
        let idProductoValido = validaciones.validarId(idProducto);
        let cantidadValida = validaciones.validarCantidad(cantidad);

        if (idPedidoValido && idProductoValido && cantidadValida) {
            let valores = [idPedido, idProducto, cantidad];
            storeTabla("contiene", valores);
        } else {
            console.error("Los datos de contiene no son válidos");
        }
    },

    validarDescuento: (porcentaje, fechaInicio, fechaFin, motivo) => {
        let porcentajeValido = validaciones.validarPorcentaje(porcentaje);
        let fechaInicioValida = validaciones.validarFecha(fechaInicio);
        let fechaFinValida = validaciones.validarFecha(fechaFin);
        let motivoValido = validaciones.validarMotivoDescuento(motivo);

        if (porcentajeValido && fechaInicioValida && fechaFinValida && motivoValido) {
            let valores = [porcentaje, fechaInicio, fechaFin, motivo];
            storeTabla("descuento", valores);
        } else {
            console.error("Los datos de descuento no son válidos");
        }
    },

    validarDireccion: (email, direccion) => {
        let emailValido = validaciones.validarEmail(email);
        let direccionValida = validaciones.validarDireccion(direccion);

        if (emailValido && direccionValida) {
            let valores = [email, direccion];
            storeTabla("direccion", valores);
        } else {
            console.error("Los datos de dirección no son válidos");
        }
    },

    validarEmpresa: (rut, nombre, telefono, direccion, email, contraseña) => {
        let rutValido = validaciones.validarId(rut);
        let nombreValido = validaciones.validarNombreUsuario(nombre);
        let telefonoValido = validaciones.validarTelefono(telefono);
        let direccionValida = validaciones.validarDireccion(direccion);
        let emailValido = validaciones.validarEmail(email);
        let contraseñaValida = validaciones.validarContraseña(contraseña);

        if (rutValido && nombreValido && telefonoValido && direccionValida && emailValido && contraseñaValida) {
            let valores = [rut, nombre, telefono, direccion, email, contraseña];
            storeTabla("empresa", valores);
        } else {
            console.error("Los datos de empresa no son válidos");
            console.error(rutValido +" "+ nombreValido +" "+ telefonoValido +" "+ direccionValida +" "+ emailValido +" "+ contraseñaValida)
        }
    },

    validarFavorito: (email, idProducto) => {
        let emailValido = validaciones.validarEmail(email);
        let idProductoValido = validaciones.validarId(idProducto);

        if (emailValido && idProductoValido) {
            let valores = [email, idProducto];
            storeTabla("favorito", valores);
        } else {
            console.error("Los datos de favorito no son válidos");
        }
    },

    validarPedido: (estado, medioPago, montoTotal, email) => {
        let estadoValido = validaciones.validarEstadoPedido(estado);
        let medioPagoValido = validaciones.validarMedioPago(medioPago);
        let montoTotalValido = validaciones.validarPrecio(montoTotal);
        let emailValido = validaciones.validarEmail(email);

        if (estadoValido && medioPagoValido && montoTotalValido && emailValido) {
            let valores = [estado, medioPago, montoTotal, email];
            storeTabla("pedido", valores);
        } else {
            console.error("Los datos de pedido no son válidos");
        }
    },

    validarProducto: (rut, descripcion, estado, precio, nombre, stock, marca, oculto) => {
        let rutValido = validaciones.validarId(rut);
        let descripcionValida = validaciones.validarDescripcionProducto(descripcion);
        let estadoValido = validaciones.validarEstadoProducto(estado);
        let precioValido = validaciones.validarPrecio(precio);
        let nombreValido = validaciones.validarNombreProducto(nombre);
        let stockValido = validaciones.validarStock(stock);
        let marcaValida = validaciones.validarMarcaProducto(marca);
        let ocultoValido = validaciones.validarBooleano(oculto);
        oculto = !oculto ? oculto = 0 : oculto = 1;

        if (rutValido && descripcionValida && estadoValido && precioValido && nombreValido && stockValido && marcaValida && ocultoValido) {
            let valores = [rut, nombre, descripcion, precio, stock, estado, marca, oculto];
            storeTabla("producto", valores);
        }else {
            console.error("Los datos de pedido no son válidos", rutValido, descripcionValida, estadoValido, precioValido, nombreValido, stockValido, marcaValida, ocultoValido);
        }
    },

    validarTiene: (idDescuento, idProducto) => {
        let idDescuentoValido = validaciones.validarId(idDescuento);
        let idProductoValido = validaciones.validarId(idProducto);

        if (idDescuentoValido && idProductoValido) {
            let valores = [idProducto, idDescuento];
            storeTabla("tiene", valores);
        } else {
            console.error("Los datos de tiene no son válidos");
        }
    },

    validarUsuario: (email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci) => {
        let emailValido = validaciones.validarEmail(email);
        let usuarioValido = validaciones.validarNickUsuario(usuario);
        let nombreValido = validaciones.validarNombreUsuario(nombre);
        let apellidoValido = validaciones.validarApellidoUsuario(apellido);
        let telefonoValido = validaciones.validarTelefono(telefono);
        let contraseñaValida = validaciones.validarContraseña(contraseña);
        let fechaNacValida = validaciones.validarFecha(fechaNac);
        let ciValida = validaciones.validarCi(ci);

        if (emailValido && usuarioValido && nombreValido && apellidoValido && telefonoValido && contraseñaValida && fechaNacValida && ciValida) {
            let valores = [email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci];
            storeTabla("usuario", valores);
        } else {
            console.error("Los datos de usuario no son válidos");
        }
    },

    validarVisita: (email, idProducto) => {
        let emailValido = validaciones.validarEmail(email);
        let idProductoValido = validaciones.validarId(idProducto);

        if (emailValido && idProductoValido) {
            let valores = [email, idProducto];
            storeTabla("visita", valores);
        } else {
            console.error("Los datos de visita no son válidos");
        }
    }
}

const tomarDatosIngresar = {
    tomarCaracteristica: () => {
        let idProducto = $("#inputIdProducto").val();
        let nombre = $("#inputNombre").val();
        let valor = $("#inputValor").val();
        validacionTablasIngresar.validarCaracteristica(idProducto, nombre, valor);
    },

    tomarCategoria: () => {
        let nombre = $("#inputNombre").val();
        validacionTablasIngresar.validarCategoria(nombre);
    },

    tomarCategoriza: () => {
        let idProducto = $("#inputIdProducto").val();
        let idCategoria = $("#inputIdCategoria").val();
        validacionTablasIngresar.validarCategoriza(idProducto, idCategoria);
    },

    tomarContiene: () => {
        let idPedido = $("#inputIdPedido").val();
        let idProducto = $("#inputIdProducto").val();
        let cantidad = $("#inputCantidad").val();
        validacionTablasIngresar.validarContiene(idPedido, idProducto, cantidad);
    },

    tomarDescuento: () => {
        let porcentaje = $("#inputPorcentaje").val();
        let fechaInicio = $("#inputFechaInicio").val();
        let fechaFin = $("#inputFechaFin").val();
        let motivo = $("#inputMotivo").val();
        validacionTablasIngresar.validarDescuento(porcentaje, fechaInicio, fechaFin, motivo);
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
        let contraseña = $("#inputContraseña").val();
        validacionTablasIngresar.validarEmpresa(rut, nombre, telefono, direccion, email, contraseña);
    },

    tomarFavorito: () => {
        let email = $("#inputEmail").val();
        let idProducto = $("#inputIdProducto").val();
        validacionTablasIngresar.validarFavorito(email, idProducto);
    },

    tomarPedido: () => {
        let estado = $("#inputEstado").val();
        let medioPago = $("#inputMedioPago").val();
        let montoTotal = $("#inputMontoTotal").val();
        let email = $("#inputEmail").val();
        validacionTablasIngresar.validarPedido(estado, medioPago, montoTotal, email);
    },

    tomarProducto: () => {
        let rut = $("#inputRUT").val();
        let descripcion = $("#inputDescripción").val();
        let estado = $("#inputEstado").val();
        let precio = $("#inputPrecio").val();
        let nombre = $("#inputNombre").val();
        let stock = $("#inputStock").val();
        let marca = $("#inputMarca").val();
        let oculto = $("#inputOculto").is(':checked');
        validacionTablasIngresar.validarProducto(rut, descripcion, estado, precio, nombre, stock, marca, oculto);
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
        let contraseña = $("#inputContraseña").val();
        let fechaNac = $("#inputFechaNac").val();
        let ci = $("#inputCi").val();
        validacionTablasIngresar.validarUsuario(email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci);
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
    tomarDatosIngresar["tomar"+tabla]();
}

// ACTUALIZAR

const validacionTablasActualizar = {
    validarCaracteristica: (idProducto, nombre, valor) => {
        let idProductoValido = validaciones.validarId(idProducto);
        let nombreValido = validaciones.validarNombreCaracteristica(nombre);
        let valorValido = validaciones.validarValor(valor);

        if (idProductoValido && nombreValido && valorValido) {
            let valores = [idProducto, nombre, valor];
            updateTabla("caracteristica", valores);
        } else {
            console.error("Los datos de característica no son válidos");
        }
    },

    validarCategoria: (nombre) => {
        let nombreValido = validaciones.validarNombreCategoria(nombre);

        if (nombreValido) {
            let valores = [nombre];
            updateTabla("categoria", valores);
        } else {
            console.error("Los datos de categoría no son válidos");
        }
    },

    validarCategoriza: (idProducto, idCategoria) => {
        let idProductoValido = validaciones.validarId(idProducto);
        let idCategoriaValido = validaciones.validarId(idCategoria);

        if (idProductoValido && idCategoriaValido) {
            let valores = [idProducto, idCategoria];
            updateTabla("categoriza", valores);
        } else {
            console.error("Los datos de categoriza no son válidos");
        }
    },

    validarContiene: (idPedido, idProducto, cantidad) => {
        let idPedidoValido = validaciones.validarId(idPedido);
        let idProductoValido = validaciones.validarId(idProducto);
        let cantidadValida = validaciones.validarCantidad(cantidad);

        if (idPedidoValido && idProductoValido && cantidadValida) {
            let valores = [idPedido, idProducto, cantidad];
            updateTabla("contiene", valores);
        } else {
            console.error("Los datos de contiene no son válidos");
        }
    },

    validarDescuento: (idDescuento, porcentaje, fechaInicio, fechaFin, motivo) => {
        let idDescuentoValido = validaciones.validarId(idDescuento);
        let porcentajeValido = validaciones.validarPorcentaje(porcentaje);
        let fechaInicioValida = validaciones.validarFecha(fechaInicio);
        let fechaFinValida = validaciones.validarFecha(fechaFin);
        let motivoValido = validaciones.validarMotivoDescuento(motivo);

        if (porcentajeValido && fechaInicioValida && fechaFinValida && motivoValido && idDescuentoValido) {
            let valores = [idDescuento, porcentaje, fechaInicio, fechaFin, motivo];
            updateTabla("descuento", valores);
        } else {
            console.error("Los datos de descuento no son válidos");
        }
    },

    validarDireccion: (email, direccion) => {
        let emailValido = validaciones.validarEmail(email);
        let direccionValida = validaciones.validarDireccion(direccion);

        if (emailValido && direccionValida) {
            let valores = [email, direccion];
            updateTabla("direccion", valores);
        } else {
            console.error("Los datos de dirección no son válidos");
        }
    },

    validarEmpresa: (rut, nombre, telefono, direccion, email, contraseña) => {
        let rutValido = validaciones.validarId(rut);
        let nombreValido = validaciones.validarNombreUsuario(nombre);
        let telefonoValido = validaciones.validarTelefono(telefono);
        let direccionValida = validaciones.validarDireccion(direccion);
        let emailValido = validaciones.validarEmail(email);
        let contraseñaValida = validaciones.validarContraseña(contraseña);

        if (rutValido && nombreValido && telefonoValido && direccionValida && emailValido && contraseñaValida) {
            let valores = [rut, nombre, telefono, direccion, email, contraseña];
            updateTabla("empresa", valores);
        } else {
            console.error("Los datos de empresa no son válidos");
        }
    },

    validarFavorito: (email, idProducto) => {
        let emailValido = validaciones.validarEmail(email);
        let idProductoValido = validaciones.validarId(idProducto);

        if (emailValido && idProductoValido) {
            let valores = [email, idProducto];
            updateTabla("favorito", valores);
        } else {
            console.error("Los datos de favorito no son válidos");
        }
    },

    validarPedido: (idPedido, estado, medioPago, montoTotal, fecha, email) => {
        let idPedidoValido = validaciones.validarId(idPedido);
        let estadoValido = validaciones.validarEstadoPedido(estado);
        let medioPagoValido = validaciones.validarMedioPago(medioPago);
        let montoTotalValido = validaciones.validarPrecio(montoTotal);
        let fechaValida = validaciones.validarFechaHora(fecha);
        let emailValido = validaciones.validarEmail(email);

        if (estadoValido && idPedidoValido && fechaValida && medioPagoValido && montoTotalValido && emailValido) {
            let valores = [idPedido, estado, medioPago, montoTotal, fecha, email];
            updateTabla("pedido", valores);
        } else {
            console.error("Los datos de pedido no son válidos");
        }
    },

    validarProducto: (idProducto, rut, descripcion, estado, precio, nombre, stock, marca, oculto) => {
        let idProductoValido = validaciones.validarId(idProducto);
        let rutValido = validaciones.validarId(rut);
        let descripcionValida = validaciones.validarDescripcionProducto(descripcion);
        let estadoValido = validaciones.validarEstadoProducto(estado);
        let precioValido = validaciones.validarPrecio(precio);
        let nombreValido = validaciones.validarNombreProducto(nombre);
        let stockValido = validaciones.validarStock(stock);
        let marcaValida = validaciones.validarMarcaProducto(marca);
        let ocultoValido = validaciones.validarBooleano(oculto)
        oculto = !oculto ? oculto = 0 : oculto = 1;

        if (idProductoValido && rutValido && descripcionValida && estadoValido && precioValido && nombreValido && stockValido && marcaValida && ocultoValido) {
            let valores = [idProducto, rut, nombre, descripcion, precio, stock, estado, marca, oculto];
            updateTabla("producto", valores);
        } else {
            console.error("Los datos de producto no son válidos");    
        }
    },

    validarTiene: (idDescuento, idProducto) => {
        let idDescuentoValido = validaciones.validarId(idDescuento);
        let idProductoValido = validaciones.validarId(idProducto);

        if (idDescuentoValido && idProductoValido) {
            let valores = [idDescuento, idProducto];
            updateTabla("tiene", valores);
        } else {
            console.error("Los datos de tiene no son válidos");
        }
    },

    validarUsuario: (email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci) => {
        let emailValido = validaciones.validarEmail(email);
        let usuarioValido = validaciones.validarNickUsuario(usuario);
        let nombreValido = validaciones.validarNombreUsuario(nombre);
        let apellidoValido = validaciones.validarApellidoUsuario(apellido);
        let telefonoValido = validaciones.validarTelefono(telefono);
        let contraseñaValida = validaciones.validarContraseña(contraseña);
        let fechaNacValida = validaciones.validarFecha(fechaNac);
        let ciValida = validaciones.validarCi(ci);

        if (emailValido && usuarioValido && nombreValido && apellidoValido && telefonoValido && contraseñaValida && fechaNacValida && ciValida) {
            let valores = [email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci];
            updateTabla("usuario", valores);
        } else {
            console.error("Los datos de usuario no son válidos");
        }
    },

    validarVisita: (email, idProducto, fecha) => {
        let emailValido = validaciones.validarEmail(email);
        let idProductoValido = validaciones.validarId(idProducto);
        let fechaValida = validaciones.validarFechaHora(fecha);

        if (emailValido && idProductoValido && fechaValida) {
            let valores = [email, idProducto, fecha];
            updateTabla("visita", valores);
        } else {
            console.error("Los datos de visita no son válidos");
        }
    }
}

const tomarDatosActualizar = {
    tomarCaracteristica: () => {
        let idProducto = $("#inputIdProducto").val();
        let nombre = $("#inputNombre").val();
        let valor = $("#inputValor").val();
        validacionTablasActualizar.validarCaracteristica(idProducto, nombre, valor);
    },

    tomarCategoria: () => {
        let idCategoria = $("#inputIdCategoria").val();
        let nombre = $("#inputNombre").val();
        validacionTablasActualizar.validarCategoria(idCategoria, nombre);
    },

    tomarProducto: () => {
        let idProducto = $("#inputIdProducto").val();
        let rut = $("#inputRUT").val();
        let descripcion = $("#inputDescripción").val();
        let estado = $("#inputEstado").val();
        let precio = $("#inputPrecio").val();
        let nombre = $("#inputNombre").val();
        let stock = $("#inputStock").val();
        let marca = $("#inputMarca").val();
        let oculto = $("#inputOculto").is(':checked');
        validacionTablasActualizar.validarProducto(idProducto, rut, descripcion, estado, precio, nombre, stock, marca, oculto);
    },

    tomarUsuario: () => {
        let email = $("#inputEmail").val();
        let usuario = $("#inputUsuario").val();
        let nombre = $("#inputNombre").val();
        let apellido = $("#inputApellido").val();
        let telefono = $("#inputTelefono").val();
        let contraseña = $("#inputContraseña").val();
        let fechaNac = $("#inputFechaNac").val();
        let ci = $("#inputCi").val();
        validacionTablasActualizar.validarUsuario(email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci);
    },

    tomarEmpresa: () => {
        let rut = $("#inputRut").val();
        let nombre = $("#inputNombre").val();
        let telefono = $("#inputTelefono").val();
        let direccion = $("#inputDireccion").val();
        let email = $("#inputEmail").val();
        validacionTablasActualizar.validarEmpresa(rut, nombre, telefono, direccion, email);
    },

    tomarCategoriza: () => {
        let idProducto = $("#inputIdProducto").val();
        let idCategoria = $("#inputIdCategoria").val();
        validacionTablasActualizar.validarCategoriza(idProducto, idCategoria);
    },

    tomarContiene: () => {
        let idPedido = $("#inputIdPedido").val();
        let idProducto = $("#inputIdProducto").val();
        let cantidad = $("#inputCantidad").val();
        validacionTablasActualizar.validarContiene(idPedido, idProducto, cantidad);
    },

    tomarDescuento: () => {
        let idDescuento = $("#inputIdDescuento").val();
        let porcentaje = $("#inputPorcentaje").val();
        let fechaInicio = $("#inputFechaInicio").val();
        let fechaFin = $("#inputFechaFin").val();
        let motivo = $("#inputMotivo").val();
        validacionTablasActualizar.validarDescuento(idDescuento, porcentaje, fechaInicio, fechaFin, motivo);
    },

    tomarDireccion: () => {
        let email = $("#inputEmail").val();
        let direccion = $("#inputDireccion").val();
        validacionTablasActualizar.validarDireccion(email, direccion);
    },

    tomarFavorito: () => {
        let email = $("#inputEmail").val();
        let idProducto = $("#inputIdProducto").val();
        validacionTablasActualizar.validarFavorito(email, idProducto);
    },

    tomarPedido: () => {
        let idPedido = $("#inputIdPedido").val()
        let estado = $("#inputEstado").val();
        let medioPago = $("#inputMedioPago").val();
        let montoTotal = $("#inputMontoTotal").val();
        let fecha = $("#inputFecha").val();
        let email = $("#inputEmail").val();
        validacionTablasActualizar.validarPedido(idPedido, estado, medioPago, montoTotal, fecha, email);
    },

    tomarTiene: () => {
        let idDescuento = $("#inputIdDescuento").val();
        let idProducto = $("#inputIdProducto").val();
        validacionTablasActualizar.validarTiene(idDescuento, idProducto);
    },

    tomarVisita: () => {
        let email = $("#inputEmail").val();
        let idProducto = $("#inputIdProducto").val();
        let fecha = $("#inputFecha").val();
        validacionTablasActualizar.validarVisita(email, idProducto, fecha);
    }
}


const tomarTablaActualizar = () => {
    let url = new URLSearchParams(window.location.search);
    let tabla = url.get('tabla');
    tabla = tabla.charAt(0).toUpperCase() + tabla.slice(1);
    tomarDatosActualizar["tomar"+tabla]();
}

$("#btnIngresarFormularioTabla").click(tomarTablaIngresar);
$("#btnActualizarFormularioTabla").click(tomarTablaActualizar);