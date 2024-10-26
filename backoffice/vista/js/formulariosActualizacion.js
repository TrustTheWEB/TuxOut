const formularios = {
    imprimirFormularioCaracteristica: (datos) => {
        $("#titulo-formulario-actualizacion").append("característica");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdProducto">ID Producto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputNombre">Nombre de la característica:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar" value="${datos[1]}" disabled="disabled">
            <label for="inputValor">Valor:</label>
            <input type="text" id="inputValor" class="form-control inputIngresar" value="${datos[2]}">
            `
        );
    },

    imprimirFormularioCategoria: (datos) => {
        $("#titulo-formulario-actualizacion").append("categoría");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdCategoria">ID Categoría:</label>
            <input id="inputIdCategoria" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar" value="${datos[1]}">
            `
        );
    },

    imprimirFormularioCategoriza: (datos) => {
        $("#titulo-formulario-actualizacion").append("categoriza");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdProducto">ID Producto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputIdCategoria">ID Categoría:</label>
            <input id="inputIdCategoria" class="form-control inputIngresar" value="${datos[1]}" disabled="disabled">
            `
        );
    },

    imprimirFormularioContiene: (datos) => {
        $("#titulo-formulario-actualizacion").append("contiene");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdPedido">ID Pedido:</label>
            <input id="inputIdPedido" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputIdProducto">ID Producto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar" value="${datos[1]}" disabled="disabled">
            <label for="inputCantidad">Cantidad:</label>
            <input type="number" id="inputCantidad" class="form-control inputIngresar" value="${datos[2]}">
            <label for="inputPrecioHistorico">Precio Histórico:</label>
            <input type="number" id="inputPrecioHistorico" class="form-control inputIngresar" value="${datos[4]}">
            <label for="inputEstado">Estado:</label>
            <select id="inputEstado" class="form-select">
                <option value="preparando" ${datos[1] === 'preparando' ? 'selected' : ''}>Preparando</option>
                <option value="entregado" ${datos[1] === 'entregado' ? 'selected' : ''}>Entregado</option>
            </select>
            `
        );
    },

    imprimirFormularioDescuento: (datos) => {
        $("#titulo-formulario-actualizacion").append("descuento");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdDescuento">ID Descuento:</label>
            <input id="inputIdDescuento" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputPorcentaje">Porcentaje:</label>
            <input type="number" id="inputPorcentaje" class="form-control inputIngresar" value="${datos[1]}">
            <label for="inputFechaInicio">Fecha Inicio:</label>
            <input type="date" id="inputFechaInicio" class="form-control inputIngresar" value="${datos[2]}">
            <label for="inputFechaFin">Fecha Fin:</label>
            <input type="date" id="inputFechaFin" class="form-control inputIngresar" value="${datos[3]}">
            <label for="inputMotivo">Motivo:</label>
            <input type="text" id="inputMotivo" class="form-control inputIngresar" value="${datos[4]}">
            `
        );
    },

    imprimirFormularioDireccion: (datos) => {
        $("#titulo-formulario-actualizacion").append("dirección");
        $("#formulario-actualizacion").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputDireccion">Dirección:</label>
            <input type="text" id="inputDireccion" class="form-control inputIngresar" value="${datos[1]}">
            `
        );
    },

    imprimirFormularioEmpresa: (datos) => {
        let suspendido = datos[5];
        suspendido = suspendido == 0 ? suspendido = "" : suspendido = "checked";
        $("#titulo-formulario-actualizacion").append("empresa");
        $("#formulario-actualizacion").append(
            `
            <label for="inputRUT">RUT:</label>
            <input type="text" id="inputRUT" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar" value="${datos[1]}">
            <label for="inputTelefono">Teléfono:</label>
            <input type="text" id="inputTelefono" class="form-control inputIngresar" value="${datos[2]}">
            <label for="inputDireccion">Dirección:</label>
            <input type="text" id="inputDireccion" class="form-control inputIngresar" value="${datos[3]}">
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[4]}">
            <label class="my-2">
                <input type="checkbox" id="inputSuspendido" ${suspendido}> Suspendido
            </label>
            `
        );
    },

    imprimirFormularioContraEmpresa: (datos) => {
        $("#titulo-formulario-actualizacion").append("contraseña de empresa");
        $("#formulario-actualizacion").append(
            `
            <label for="inputRUT">RUT:</label>
            <input type="text" id="inputRUT" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputContra">Contraseña nueva:</label>
            <input type="password" id="inputContra" class="form-control inputIngresar" value="">
            `
        );
    },

    imprimirFormularioFavorito: (datos) => {
        $("#titulo-formulario-actualizacion").append("favorito");
        $("#formulario-actualizacion").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputIdProducto">ID Producto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar" value="${datos[1]}" disabled="disabled">
            `
        );
    },

    imprimirFormularioPedido: (datos) => {
        $("#titulo-formulario-actualizacion").append("pedido");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdPedido">ID Pedido:</label>
            <input id="inputIdPedido" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            
            <label for="inputEstado">Estado:</label>
            <select id="inputEstado" class="form-select">
                <option value="procesando" ${datos[1] === 'procesando' ? 'selected' : ''}>Procesando</option>
                <option value="pagado" ${datos[1] === 'pagado' ? 'selected' : ''}>Pagado</option>
            </select>
            
            <label for="inputMedioPago">Medio de Pago:</label>
            <select id="inputMedioPago" class="form-select">
                <option value="PayPal" ${datos[2] === 'PayPal' ? 'selected' : ''}>PayPal</option>
                <option value="MercadoPago" ${datos[2] === 'MercadoPago' ? 'selected' : ''}>MercadoPago</option>
            </select>

            <label for="inputFecha">Fecha:</label>
            <input type="datetime-local" id="inputFecha" class="form-control inputIngresar" value="${datos[3]}">
            
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[4]}">
            `
        );
    },
    

    imprimirFormularioProducto: (datos) => {
        let oculto = datos[8];
        oculto = oculto == 0 ? oculto = "" : oculto = "checked";
        $("#titulo-formulario-actualizacion").append("producto");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdProducto">ID Producto:</label>
            <input type="text" id="inputIdProducto" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputRUT">RUT:</label>
            <input type="text" id="inputRUT" class="form-control inputIngresar" value="${datos[1]}">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar" value="${datos[5]}">
            <label for="inputDescripcion">Descripción:</label>
            <input type="text" id="inputDescripcion" class="form-control inputIngresar" value="${datos[2]}">
            <label for="inputPrecio">Precio:</label>
            <input type="number" id="inputPrecio" class="form-control inputIngresar" value="${datos[4]}">
            <label for="inputStock">Stock:</label>
            <input type="number" id="inputStock" class="form-control inputIngresar" value="${datos[6]}">
            <label for="inputEstado">Estado:</label>
            <select id="inputEstado" class="form-control inputIngresar">
                <option value="Nuevo" ${datos[3] === 'Nuevo' ? 'selected' : ''}>Nuevo</option>
                <option value="Renovado" ${datos[3] === 'Renovado' ? 'selected' : ''}>Renovado</option>
                <option value="Usado" ${datos[3] === 'Usado' ? 'selected' : ''}>Usado</option>
            </select>
            <label for="inputMarca">Marca:</label>
            <input type="text" id="inputMarca" class="form-control inputIngresar" value="${datos[7]}">
            <label class="my-2">
                <input type="checkbox" id="inputOculto" ${oculto}> Oculto
            </label>
            <div id="formularioImagen">
                
            </div>
            <button id="agregarImagen" class="mt-2 mx-2" data-cant="1">+</button>

            `
        );
    },

    imprimirFormularioTiene: (datos) => {
        $("#titulo-formulario-actualizacion").append("tiene");
        $("#formulario-actualizacion").append(
            `
            <label for="inputIdDescuento">ID Descuento:</label>
            <input id="inputIdDescuento" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputIdProducto">ID Producto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar" value="${datos[1]}" disabled="disabled">
            `
        );
    },

    imprimirFormularioUsuario: (datos) => {
        $("#titulo-formulario-actualizacion").append("usuario");
        $("#formulario-actualizacion").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputUsuario">Usuario:</label>
            <input type="text" id="inputUsuario" class="form-control inputIngresar" value="${datos[1]}">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar" value="${datos[2]}">
            <label for="inputApellido">Apellido:</label>
            <input type="text" id="inputApellido" class="form-control inputIngresar" value="${datos[3]}">
            <label for="inputTelefono">Teléfono:</label>
            <input type="text" id="inputTelefono" class="form-control inputIngresar" value="${datos[4]}">
            <label for="inputFechaNac">Fecha de Nacimiento:</label>
            <input type="date" id="inputFechaNac" class="form-control inputIngresar" value="${datos[5]}">
            <label for="inputCi">CI:</label>
            <input type="text" id="inputCi" class="form-control inputIngresar" value="${datos[6]}">
            `
        );
    },

    imprimirFormularioContraUsuario: (datos) => {
        $("#titulo-formulario-actualizacion").append("contraseña de usuario");
        $("#formulario-actualizacion").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputContra">Contraseña nueva:</label>
            <input type="password" id="inputContra" class="form-control inputIngresar" value="">
            `
        );
    },

    imprimirFormularioVisita: (datos) => {
        $("#titulo-formulario-actualizacion").append("visita");
        $("#formulario-actualizacion").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[0]}" disabled="disabled">
            <label for="inputIdProducto">ID Producto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar" value="${datos[1]}" disabled="disabled">
            <label for="inputFecha">Fecha:</label>
            <input type="datetime-local" id="inputFecha" class="form-control inputIngresar" value="${datos[2]}">
            `
        );
    }    
}

const obtenerDatos = {
    obtenerCaracteristica: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idProducto'),
            urlParams.get('nombre'),
            urlParams.get('valor')
        ];
    },

    obtenerCategoria: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idCategoria'),
            urlParams.get('nombre')
        ];
    },

    obtenerCategoriza: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idProducto'),
            urlParams.get('idCategoria')
        ];
    },

    obtenerComenta: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('email'),
            urlParams.get('idProducto'),
            urlParams.get('calificacion'),
            urlParams.get('comentario')
        ];
    },

    obtenerContiene: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idPedido'),
            urlParams.get('idProducto'),
            urlParams.get('cantidad'),
            urlParams.get('precioHistorico'),
            urlParams.get('estado')
        ];
    },

    obtenerDescuento: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idDescuento'),
            urlParams.get('porcentaje'),
            urlParams.get('fechaInicio'),
            urlParams.get('fechaFin'),
            urlParams.get('motivo')
        ];
    },

    obtenerDireccion: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('email'),
            urlParams.get('direccion')
        ];
    },

    obtenerEmpresa: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('rut'),
            urlParams.get('nombre'),
            urlParams.get('telefono'),
            urlParams.get('direccion'),
            urlParams.get('email'),
            urlParams.get('suspendido')
        ];
    },
    
    obtenerContraEmpresa: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('rut')
        ];
    },


    obtenerFavorito: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('email'),
            urlParams.get('idProducto')
        ];
    },

    obtenerPedido: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idPedido'),
            urlParams.get('estado'),
            urlParams.get('medioPago'),
            urlParams.get('fecha'),
            urlParams.get('email')
        ];
    },

    obtenerProducto: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idProducto'),
            urlParams.get('rut'),
            urlParams.get('descripcion'),
            urlParams.get('estado'),
            urlParams.get('precio'),
            urlParams.get('nombre'),
            urlParams.get('stock'),
            urlParams.get('marca'),
            urlParams.get('oculto')
        ];
    },

    obtenerTiene: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('idDescuento'),
            urlParams.get('idProducto')
        ];
    },

    obtenerUsuario: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('email'),
            urlParams.get('usuario'),
            urlParams.get('nombre'),
            urlParams.get('apellido'),
            urlParams.get('telefono'),
            urlParams.get('fechaNac'),
            urlParams.get('ci')
        ];
    },

    obtenerContraUsuario: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('email')
        ];
    },

    obtenerVisita: () => {
        let urlParams = new URLSearchParams(window.location.search);
        return [
            urlParams.get('email'),
            urlParams.get('idProducto'),
            urlParams.get('fecha')
        ];
    }
}

let tomarTablaDatos = () => {
    let url = new URLSearchParams(window.location.search);
    let tabla = url.get('tabla');
    let metodo = "obtener" + tabla.charAt(0).toUpperCase() + tabla.slice(1);
    let datos = obtenerDatos[metodo]();

    let formulario = "imprimirFormulario" + tabla.charAt(0).toUpperCase() + tabla.slice(1);

    formularios[formulario](datos);

}

$(document).ready(tomarTablaDatos);
