const storeTabla = (tabla, valores) => {
    tabla = tabla.charAt(0).toUpperCase() + tabla.slice(1);
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/controlador/'+tabla+'Controlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "store", valores: valores},
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
            console.error('Error en la solicitud:', error);
        }
    });
}

const updateTabla = (tabla, valores) => {
    tabla = tabla.charAt(0).toUpperCase() + tabla.slice(1);
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/controlador/'+tabla+'Controlador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {metodoControlador: "update", valores: valores},
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
            console.error('Error en la solicitud:', error);
        }
    });
}

const validaciones = {
    validarNombreUsuario: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarApellidoUsuario: (apellido) => {
        if (apellido == null || apellido == undefined || apellido == "") {
            return false;
        }

        const caracteresPermitidosApellido = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (apellido.length > 20) {
            return false;
        }

        for (let i = 0; i < apellido.length; i++) {
            if (!caracteresPermitidosApellido.includes(apellido[i])) {
                return false;
            }
        }

        return true;
    },

    validarNickUsuario: (usuario) => {
        if (usuario == null || usuario == undefined) {
            return false;
        }

        const caracteresPermitidosUsuario = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';
        if (usuario.length > 25) {
            return false;
        }

        for (let i = 0; i < usuario.length; i++) {
            if (!caracteresPermitidosUsuario.includes(usuario[i])) {
                return false;
            }
        }

        return true;
    },

    validarTelefono: (telefono) => {
        const caracteresPermitidosTelefono = "0123456789-+";
        if (telefono.length > 15 || telefono.length < 8) {
            return false;
        }

        for (let i = 0; i < telefono.length; i++) {
            if (!caracteresPermitidosTelefono.includes(telefono[i])) {
                return false;
            }
        }

        return true;
    },

    validarEmail: (email) => {
        if (email == null || email == undefined || email == "") {
            return false;
        }

        const caracteresPermitidosUsuario = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-+%_';
        const caracteresPermitidosDominio = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-';

        let partes = email.split('@');
        if (partes.length != 2) {
            return false;
        }

        let usuario = partes[0];
        let dominio = partes[1];

        if (usuario.length < 1 || usuario.length > 64 || dominio.length < 1 || dominio.length > 255) {
            return false;
        }

        for (let i = 0; i < usuario.length; i++) {
            if (!caracteresPermitidosUsuario.includes(usuario[i])) {
                return false;
            }
        }

        for (let i = 0; i < dominio.length; i++) {
            if (!caracteresPermitidosDominio.includes(dominio[i])) {
                return false;
            }
        }

        let subDominios = dominio.split('.');

        if (subDominios.length <= 1) {
            return false;
        }

        if (subDominios[0].length == 0 || subDominios[subDominios.length - 1].length == 0) {
            return false;
        }

        return true;
    },

    validarFecha: (fecha) => {
        const caracteresPermitidosFecha = "0123456789-";

        let partes = fecha.split('-');
        if (partes.length != 3) {
            return false;
        }

        for (let i = 0; i < fecha.length; i++) {
            if (!caracteresPermitidosFecha.includes(fecha[i])) {
                return false;
            }
        }

        let año = Number(partes[0]);
        let mes = Number(partes[1]);
        let dia = Number(partes[2]);
        let bisiesto = false;

        if (año > 2999 || año < 1900) {
            return false;
        }

        if ((año % 4 == 0 && año % 100 != 0) || año % 400 == 0) {
            bisiesto = true;
        }

        if (mes > 12 || mes < 0) {
            return false;
        }

        if (mes == 2 && bisiesto) {
            if (dia > 30 || dia < 0) {
                return false;
            }
        } else if (mes == 2 && !bisiesto) {
            if (dia > 29 || dia < 0) {
                return false;
            }
        } else if (mes == 1 || mes == 3 || mes == 5 || mes == 7 || mes == 8 || mes == 10 || mes == 12) {
            if (dia > 31 || dia < 0) {
                return false;
            }
        } else {
            if (dia > 30 || dia < 0) {
                return false;
            }
        }

        return true;
    },

    validarRUT: (rut) => {
        const caracteresPermitidosRUT = "0123456789";
        if (rut.length < 8) {
            return false;
        }

        for (let i = 0; i < rut.length; i++) {
            if (!caracteresPermitidosRUT.includes(rut[i])) {
                return false;
            }
        }

        return true;
    },

    validarDireccion: (dir) => {
        const caracteresPermitidosDir = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.- ';
        if (dir.length > 40) {
            return false;
        }

        for (let i = 0; i < dir.length; i++) {
            if (!caracteresPermitidosDir.includes(dir[i])) {
                return false;
            }
        }

        return true;
    },

    validarCi: (ci) => {
        const caracteresPermitidosCi = "0123456789";

        for (let i = 0; i < ci.length; i++) {
            if (!caracteresPermitidosCi.includes(ci[i])) {
                return false;
            }
        }

        return true;
    },

    validarContraseña: (contra) => {
        if (contra == null || contra === "" || contra === undefined) {
            return false;
        }

        const caracteresPermitidosContra = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?';
        if (contra.length > 40) {
            return false;
        }

        for (let i = 0; i < contra.length; i++) {
            if (!caracteresPermitidosContra.includes(contra[i])) {
                return false;
            }
        }

        return true;
    },

    validarId: (id) => {
        if (Number.isInteger(Number(id)) && Number(id) > 0) {
            return true;
          } else {
            return false;
          }
    },

    validarCantidad: (cantidad) => {
        if (Number.isInteger(Number(cantidad)) && Number(cantidad) > 0) {
            return true;
          } else {
            return false;
          }
    },

    validarNumero: (numero) => {
        if (Number.isInteger(Number(numero)) && Number(numero) > 0) {
            return true;
          } else {
            return false;
          }
    },

    validarMedioPago: (medioPago) => {
        if (medioPago === "MercadoPago" || medioPago === "PayPal") {
           return true;
          } else {
            return false;
          }
    },

    validarNombreCategoria: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarNombreCaracteristica: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarNombreProducto: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarMarcaProducto: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarDescripcionProducto: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 320) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarMotivoDescuento: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarValor: (nombre) => {
        if (nombre == null || nombre == undefined || nombre == "") {
            return false;
        }

        const caracteresPermitidosNombre = "0123456789.-:_,áéíóúabcdefghijklmnopqrstuvwxyzÁÉÍÓÚABCDEFGHIJKLMNOPQRSTUVWXYZ ";
        if (nombre.length > 20) {
            return false;
        }

        for (let i = 0; i < nombre.length; i++) {
            if (!caracteresPermitidosNombre.includes(nombre[i])) {
                return false;
            }
        }

        return true;
    },

    validarEstadoPedido: (estado) => {
        if (estado === "carrito" || estado === "procesando" || estado === "pagado" || estado === "entregado") {
          return true;
        } else {
          return false;
        }
      },

      validarEstadoProducto: (estado) => {
        if (estado === "nuevo" || estado === "usado" || estado === "renovado") {
          return true;
        } else {
          return false;
        }
      }
};

//INGRESAR

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
        let montoTotalValido = validaciones.validarNumero(montoTotal);
        let emailValido = validaciones.validarEmail(email);

        if (estadoValido && medioPagoValido && montoTotalValido && emailValido) {
            let valores = [estado, medioPago, montoTotal, email];
            storeTabla("pedido", valores);
        } else {
            console.error("Los datos de pedido no son válidos");
        }
    },

    validarProducto: (rut, descripcion, estado, precio, nombre, stock, marca) => {
        let rutValido = validaciones.validarId(rut);
        let descripcionValida = validaciones.validarDescripcionProducto(descripcion);
        let estadoValido = validaciones.validarEstadoProducto(estado);
        let precioValido = validaciones.validarNumero(precio);
        let nombreValido = validaciones.validarNombreProducto(nombre);
        let stockValido = validaciones.validarNumero(stock);
        let marcaValida = validaciones.validarMarcaProducto(marca);

        if (rutValido && descripcionValida && estadoValido && precioValido && nombreValido && stockValido && marcaValida) {
            let valores = [rut, descripcion, estado, precio, nombre, stock, marca];
            storeTabla("producto", valores);
        } else {
            console.error("Los datos de producto no son válidos");
        }
    },

    validarTiene: (idDescuento, idProducto) => {
        let idDescuentoValido = validaciones.validarId(idDescuento);
        let idProductoValido = validaciones.validarId(idProducto);

        if (idDescuentoValido && idProductoValido) {
            let valores = [idDescuento, idProducto];
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

    validarVisita: (email, idProducto, fecha) => {
        let emailValido = validaciones.validarEmail(email);
        let idProductoValido = validaciones.validarId(idProducto);
        let fechaValida = validaciones.validarFecha(fecha);

        if (emailValido && idProductoValido && fechaValida) {
            let valores = [email, idProducto, fecha];
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
        let telefono = $("#inputTeléfono").val();
        let direccion = $("#inputDirección").val();
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
        validacionTablasIngresar.validarProducto(rut, descripcion, estado, precio, nombre, stock, marca);
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
        let telefono = $("#inputTeléfono").val();
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

    validarDescuento: (porcentaje, fechaInicio, fechaFin, motivo) => {
        let porcentajeValido = validaciones.validarPorcentaje(porcentaje);
        let fechaInicioValida = validaciones.validarFecha(fechaInicio);
        let fechaFinValida = validaciones.validarFecha(fechaFin);
        let motivoValido = validaciones.validarMotivoDescuento(motivo);

        if (porcentajeValido && fechaInicioValida && fechaFinValida && motivoValido) {
            let valores = [porcentaje, fechaInicio, fechaFin, motivo];
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

    validarPedido: (estado, medioPago, montoTotal, email) => {
        let estadoValido = validaciones.validarEstadoPedido(estado);
        let medioPagoValido = validaciones.validarMedioPago(medioPago);
        let montoTotalValido = validaciones.validarNumero(montoTotal);
        let emailValido = validaciones.validarEmail(email);

        if (estadoValido && medioPagoValido && montoTotalValido && emailValido) {
            let valores = [estado, medioPago, montoTotal, email];
            updateTabla("pedido", valores);
        } else {
            console.error("Los datos de pedido no son válidos");
        }
    },

    validarProducto: (rut, descripcion, estado, precio, nombre, stock, marca) => {
        let rutValido = validaciones.validarId(rut);
        let descripcionValida = validaciones.validarDescripcionProducto(descripcion);
        let estadoValido = validaciones.validarEstadoProducto(estado);
        let precioValido = validaciones.validarNumero(precio);
        let nombreValido = validaciones.validarNombreProducto(nombre);
        let stockValido = validaciones.validarNumero(stock);
        let marcaValida = validaciones.validarMarcaProducto(marca);

        if (rutValido && descripcionValida && estadoValido && precioValido && nombreValido && stockValido && marcaValida) {
            let valores = [rut, descripcion, estado, precio, nombre, stock, marca];
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
        let fechaValida = validaciones.validarFecha(fecha);

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
        let nombre = $("#inputNombre").val();
        let descripcion = $("#inputDescripcion").val();
        let precio = $("#inputPrecio").val();
        validacionTablasActualizar.validarProducto(idProducto, nombre, descripcion, precio);
    },

    tomarUsuario: () => {
        let email = $("#inputEmail").val();
        let usuario = $("#inputUsuario").val();
        let nombre = $("#inputNombre").val();
        let apellido = $("#inputApellido").val();
        let telefono = $("#inputTeléfono").val();
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
        let porcentaje = $("#inputPorcentaje").val();
        let fechaInicio = $("#inputFechaInicio").val();
        let fechaFin = $("#inputFechaFin").val();
        let motivo = $("#inputMotivo").val();
        validacionTablasActualizar.validarDescuento(porcentaje, fechaInicio, fechaFin, motivo);
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
        let estado = $("#inputEstado").val();
        let medioPago = $("#inputMedioPago").val();
        let montoTotal = $("#inputMontoTotal").val();
        let email = $("#inputEmail").val();
        validacionTablasActualizar.validarPedido(estado, medioPago, montoTotal, email);
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

//BOTONES

$("#btnIngresarFormularioTabla").click(tomarTablaIngresar);
$("#btnActualizarFormularioTabla").click(tomarTablaActualizar);