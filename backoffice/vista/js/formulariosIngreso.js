let imagenes = 1;

const cargarPreview = (evento) => {
    
    let img = evento.target.files;
    let input = evento.target.id;

    $(`#${input}`).next('img').remove();

    if (img.length > 0) {
        let archivo = img[0];
        let urlImagen = URL.createObjectURL(archivo);
        
        $(`#${input}`).after(`<img src="${urlImagen}" alt="Vista previa" class="w-25 imgPreview m-2 border rounded d-block">`);
    }
}

$(document).on('change', '.inputImagen', cargarPreview);

const formularios = {
    imprimirFormularioCaracteristica: () => {
        $("#titulo-formulario-ingreso").append("característica");
        $("#formulario-ingreso").append(
            `
            <label for="inputIdProducto">ID Producto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar">
            <label for="inputNombre">Nombre de la característica:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar">
            <label for="inputValor">Valor:</label>
            <input type="text" id="inputValor" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioCarrito: () => {
        $("#titulo-formulario-ingreso").append("carrito");
        $("#formulario-ingreso").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            <label for="inputIdProducto">idProducto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar">
            <label for="inputCantidad">Cantidad:</label>
            <input type="number" id="inputCantidad" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioCategoria: () => {
        $("#titulo-formulario-ingreso").append("categoría");
        $("#formulario-ingreso").append(
            `
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioCategoriza: () => {
        $("#titulo-formulario-ingreso").append("categoriza");
        $("#formulario-ingreso").append(
            `
            <label for="inputIdProducto">idProducto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar">
            <label for="inputIdCategoria">idCategoria:</label>
            <input id="inputIdCategoria" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioComenta: () => {
        $("#titulo-formulario-ingreso").append("comenta");
        $("#formulario-ingreso").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            <label for="inputIdProducto">idProducto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar">
            <label for="inputCalificacion">Calificación:</label>
            <input type="number" id="inputCalificacion" class="form-control inputIngresar">
            <label for="inputComentario">Comentario:</label>
            <input type="text" id="inputComentario" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioContiene: () => {
        $("#titulo-formulario-ingreso").append("contiene");
        $("#formulario-ingreso").append(
            `
            <label for="inputIdPedido">idPedido:</label>
            <input id="inputIdPedido" class="form-control inputIngresar">
            <label for="inputIdProducto">idProducto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar">
            <label for="inputCantidad">Cantidad:</label>
            <input type="number" id="inputCantidad" class="form-control inputIngresar">
            <label for="inputPrecioHistorico">Precio Histórico:</label>
            <input type="number" id="inputPrecioHistorico" class="form-control inputIngresar">
            <label for="inputEstado">Estado:</label>
            <select id="inputEstado" class="form-select">
                <option value="preparando">Preparando</option>
                <option value="entregado">Entregado</option>
            </select>
            `
        );
    },

    imprimirFormularioDescuento: () => {
        $("#titulo-formulario-ingreso").append("descuento");
        $("#formulario-ingreso").append(
            `
            <label for="inputPorcentaje">Porcentaje:</label>
            <input type="number" id="inputPorcentaje" class="form-control inputIngresar">
            <label for="inputFechaInicio">fechaInicio:</label>
            <input type="date" id="inputFechaInicio" class="form-control inputIngresar">
            <label for="inputFechaFin">fechaFin:</label>
            <input type="date" id="inputFechaFin" class="form-control inputIngresar">
            <label for="inputMotivo">Motivo:</label>
            <input type="text" id="inputMotivo" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioDireccion: () => {
        $("#titulo-formulario-ingreso").append("dirección");
        $("#formulario-ingreso").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            <label for="inputDireccion">Dirección:</label>
            <input type="text" id="inputDireccion" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioEmpresa: () => {
        $("#titulo-formulario-ingreso").append("empresa");
        $("#formulario-ingreso").append(
            `
            <label for="inputRUT">RUT:</label>
            <input type="text" id="inputRUT" class="form-control inputIngresar">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar">
            <label for="inputTelefono">Teléfono:</label>
            <input type="text" id="inputTelefono" class="form-control inputIngresar">
            <label for="inputDireccion">Dirección:</label>
            <input type="text" id="inputDireccion" class="form-control inputIngresar">
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            <label for="inputContra">Contraseña:</label>
            <input type="password" id="inputContra" class="form-control inputIngresar">
            <label class="my-2">
                <input type="checkbox" id="inputSuspendido"> Suspendido
            </label>
            `
        );
    },

    imprimirFormularioFavorito: () => {
        $("#titulo-formulario-ingreso").append("favorito");
        $("#formulario-ingreso").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            <label for="inputIdProducto">idProducto:</label>
            <input id="inputIdProducto" class="form-select">
            `
        );
    },

    imprimirFormularioPedido: () => {
        $("#titulo-formulario-ingreso").append("pedido");
        $("#formulario-ingreso").append(
            `
            <label for="inputEstado">Estado:</label>
            <select id="inputEstado" class="form-select">
                <option value="procesando">Procesando</option>
                <option value="pagado">Pagado</option>
            </select>
            
            <label for="inputMedioPago">medioPago:</label>
            <select id="inputMedioPago" class="form-select">
                <option value="PayPal">PayPal</option>
                <option value="MercadoPago">MercadoPago</option>
            </select>

            <label for="inputDireccion">Dirección:</label>
            <input type="email" id="inputDireccion" class="form-control inputIngresar">

            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioProducto: () => {
        $("#titulo-formulario-ingreso").append("producto");
        $("#formulario-ingreso").append(
            `
            <label for="inputRUT">RUT:</label>
            <input type="text" id="inputRUT" class="form-control inputIngresar">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar">
            <label for="inputDescripcion">Descripción:</label>
            <input type="text" id="inputDescripcion" class="form-control inputIngresar">
            <label for="inputPrecio">Precio:</label>
            <input type="number" id="inputPrecio" class="form-control inputIngresar">
            <label for="inputStock">Stock:</label>
            <input type="number" id="inputStock" class="form-control inputIngresar">
            <label for="inputEstado">Estado:</label>
            <select id="inputEstado" class="form-control inputIngresar">
            <option value="nuevo">Nuevo</option>
            <option value="renovado">Renovado</option>
            <option value="usado">Usado</option>
            </select>
            <label for="inputMarca">Marca:</label>
            <input type="text" id="inputMarca" class="form-control inputIngresar">
            <label class="my-2">
                <input type="checkbox" id="inputOculto"> Oculto
            </label>
            <div id="formularioImagen">
                <div id="contenedorInputImagen1">
                    <label for="inputImagen1">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen1" accept=".jpg, .png. jpeg">
                </div>
                <div id="contenedorInputImagen2">
                    <label for="inputImagen2">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen2" accept=".jpg, .png. jpeg">
                </div>
                <div id="contenedorInputImagen3">
                    <label for="inputImagen3">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen3" accept=".jpg, .png. jpeg">
                </div>
                <div id="contenedorInputImagen4">
                    <label for="inputImagen4">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen4" accept=".jpg, .png. jpeg">
                </div>
                <div id="contenedorInputImagen5">
                    <label for="inputImagen5">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen5" accept=".jpg, .png. jpeg">
                </div>
            </div>
            </form>
            `
        );
    },

    imprimirFormularioTiene: () => {
        $("#titulo-formulario-ingreso").append("tiene");
        $("#formulario-ingreso").append(
            `
            <label for="inputIdDescuento">idDescuento:</label>
            <input id="inputIdDescuento" class="form-control inputIngresar">
            <label for="inputIdProducto">idProducto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioUsuario: () => {
        $("#titulo-formulario-ingreso").append("usuario");
        $("#formulario-ingreso").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            <label for="inputUsuario">Usuario:</label>
            <input type="text" id="inputUsuario" class="form-control inputIngresar">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar">
            <label for="inputApellido">Apellido:</label>
            <input type="text" id="inputApellido" class="form-control inputIngresar">
            <label for="inputTelefono">Teléfono:</label>
            <input type="text" id="inputTelefono" class="form-control inputIngresar">
            <label for="inputFechaNac">Fecha de nacimiento:</label>
            <input type="date" id="inputFechaNac" class="form-control inputIngresar">
            <label for="inputCi">Cédula de Identidad:</label>
            <input type="text" id="inputCi" class="form-control inputIngresar">
            <label for="inputContra">Contraseña:</label>
            <input type="password" id="inputContra" class="form-control inputIngresar">
            `
        );
    },

    imprimirFormularioVisita: () => {
        $("#titulo-formulario-ingreso").append("visita");
        $("#formulario-ingreso").append(
            `
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar">
            <label for="inputIdProducto">idProducto:</label>
            <input id="inputIdProducto" class="form-control inputIngresar">
            `
        );
    },
}


let tomarTabla = () => {
    let url = new URLSearchParams(window.location.search);
    let tabla = url.get('tabla');

    let formulario = "imprimirFormulario" + tabla.charAt(0).toUpperCase() + tabla.slice(1);
        
    formularios[formulario]();

}

$(document).ready(tomarTabla);
