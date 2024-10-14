let imagenes = 0;

const cargarPreview = (evento) => {
    
    let img = evento.target.files;
    let input = evento.target.id;

    $(`#${input}`).next('img').remove();

    if (img.length > 0) {
        let archivo = img[0];
        let urlImagen = URL.createObjectURL(archivo);
        
        $(`#${input}`).after(`
            <img src="${urlImagen}" alt="Vista previa" class="imgPreview m-2 border rounded d-block">
            `);
    }
}

const agregarInputImagen = () => {
    if (imagenes < 5) {
        imagenes++;
        $("#formularioImagen").append(`
            <div id="contenedorInputImagen${imagenes}">
            <label for="inputImagen${imagenes}">Imagen ${imagenes}:</label>
            <input type="file" class="form-control inputImagen" id="inputImagen${imagenes}" accept=".jpg, .png. jpeg">
            </div>
            `);
        $('#agregarImagen').attr('data-cant', imagenes);
        if(imagenes==2) {
            $("#agregarImagen").after(`<button id="quitarImagen" class="mt-2 mx-2 quitarImagen">-</button>`);
        }
    } else {
        alert("El límite de imágenes ha sido alcanzado");
    }
}

const quitarInputImagen = () => {
    if (imagenes > 1) {
        $(`#contenedorInputImagen${imagenes}`).remove()
        imagenes--;
    
        if(imagenes <= 1) {
            $("#quitarImagen").remove();
        }
    }
}

const obtenerUrls = (id) => {
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Buscar.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {id: id},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    console.log(response)
                    cargarImagenes(response)
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

const cargarImagenes = (urls) => {
    if(urls[0] == "") {
        $("#formularioImagen").append(`
            <div id="contenedorInputImagen1">
                <label for="inputImagen1">Imagen:</label>
                <input type="file" class="form-control inputImagen" id="inputImagen1" accept=".jpg, .png. jpeg" data-modificado="no">
            </div>
        `);
    }else {
        for(let i = 0; i < urls.length ; i++) {
            $("#formularioImagen").append(`
                <div id="contenedorInputImagen${i+1}">
                    <label for="inputImagen${i+1}">Imagen ${i+1}:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen${i+1}" accept=".jpg, .png. jpeg" data-modificado="no">
                </div>
            `);
            $(`#inputImagen${i+1}`).after(`
                <img src="${urls[i]}" alt="Vista previa" class="imgPreview m-2 border rounded d-block">
                `);
            imagenes++;
        }
    }

    if(imagenes > 1) {
        $("#agregarImagen").after(`<button id="quitarImagen" class="mt-2 mx-2 quitarImagen">-</button>`);
    }else {
        imagenes = 1;
    }
}

const cambiarModificado = (event) => {
    let input = $(event.currentTarget);
    input.attr('data-modificado', "si")
}

$(document).on('click', '#agregarImagen', agregarInputImagen);
$(document).on('click', '#quitarImagen', quitarInputImagen);
$(document).on('change', '.inputImagen', cargarPreview);
$(document).on('change', '.inputImagen', cambiarModificado);

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
            <label for="inputContraseña">Contraseña:</label>
            <input type="password" id="inputContraseña" class="form-control inputIngresar" value="${datos[5]}">
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
                <option value="carrito" ${datos[1] === 'carrito' ? 'selected' : ''}>Carrito</option>
                <option value="procesando" ${datos[1] === 'procesando' ? 'selected' : ''}>Procesando</option>
                <option value="pagado" ${datos[1] === 'pagado' ? 'selected' : ''}>Pagado</option>
                <option value="entregado" ${datos[1] === 'entregado' ? 'selected' : ''}>Entregado</option>
            </select>
            
            <label for="inputMedioPago">Medio de Pago:</label>
            <select id="inputMedioPago" class="form-select">
                <option value="PayPal" ${datos[2] === 'PayPal' ? 'selected' : ''}>PayPal</option>
                <option value="MercadoPago" ${datos[2] === 'MercadoPago' ? 'selected' : ''}>MercadoPago</option>
            </select>
            
            <label for="inputMontoTotal">Monto Total:</label>
            <input type="number" id="inputMontoTotal" class="form-control inputIngresar" value="${datos[3]}">

            <label for="inputFecha">Fecha:</label>
            <input type="datetime-local" id="inputFecha" class="form-control inputIngresar" value="${datos[4]}">
            
            <label for="inputEmail">Email:</label>
            <input type="email" id="inputEmail" class="form-control inputIngresar" value="${datos[5]}">
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
            <label for="inputDescripción">Descripción:</label>
            <input type="text" id="inputDescripción" class="form-control inputIngresar" value="${datos[2]}">
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
        obtenerUrls(datos[0]);
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
            <label for="inputContraseña">Contraseña:</label>
            <input type="password" id="inputContraseña" class="form-control inputIngresar" value="${datos[5]}">
            <label for="inputFechaNac">Fecha de Nacimiento:</label>
            <input type="date" id="inputFechaNac" class="form-control inputIngresar" value="${datos[6]}">
            <label for="inputCi">CI:</label>
            <input type="text" id="inputCi" class="form-control inputIngresar" value="${datos[7]}">
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
            urlParams.get('cantidad')
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
            urlParams.get('contraseña')
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
            urlParams.get('montoTotal'),
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
            urlParams.get('contraseña'),
            urlParams.get('fechaNac'),
            urlParams.get('ci')
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
