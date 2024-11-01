import Alerta from './Alerta.js';
const alerta = new Alerta();

import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();



const cargarPreview = (evento) => {
    
    let img = evento.target.files;
    let input = evento.target.id;

    $(`#${input}`).attr("data-cambiado", "cambiado")
    $(`#${input}`).next('img').remove();

    if (img.length > 0) {
        let archivo = img[0];
        let urlImagen = URL.createObjectURL(archivo);
        
        $(`#${input}`).after(`<img src="${urlImagen}" alt="Vista previa" class="w-25 imgPreview m-2 border rounded d-block">`);
    }
}

const cargarPreviewUpdate = (idProducto) => {
    for (let i = 0; i < 5 ; i++) {
        $(`#inputImagen${i+1}`).after(`<img src="../../tienda/assets/img_productos/${idProducto}_${i+1}.jpg" alt="Vista previa" class="w-25 imgPreview m-2 border rounded d-block" onerror="this.onerror=null;this.src='../../tienda/assets/img/default.png';">`);        
    }
}

const quitarImagen = (event) => {
    event.preventDefault();
    let botonEliminar = $(event.currentTarget);
    let numeroImagen = $(botonEliminar).attr("data-num-img");
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    let nombre = idProducto+"_"+numeroImagen;
    $(`#inputImagen${numeroImagen}`).attr("data-camiado", "eliminado")  
    $(`#inputImagen${numeroImagen}`).next('img').remove();  
    $(`#inputImagen${numeroImagen}`).after(`<img src="../../tienda/assets/img/default.png" alt="Vista previa" class="w-25 imgPreview m-2 border rounded d-block">`); 
    destruirImagen(nombre);
}

const destruirImagen = (nombre) => {
    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php',
        type: 'POST',
        dataType: 'json',
        data: { accion: "eliminarImagenNombre", valores: [nombre], controlador: "ImagenControlador"}
    });
}

const validarImagenesUpdate = (idProducto) => {
    const extensionesValidas = ['jpg', 'jpeg', 'png'];

    let imagenes = [];
    let nombres = [];
    let cambiados = 0;
    try {
        for (let i = 1; i <= 5; i++) {
            let inputImagen = $(`#inputImagen${i}`);
            let cambiado = inputImagen.attr("data-cambiado")
            
            if(cambiado == "cambiado") {
                cambiados++;
                let archivo = inputImagen[0].files[0];

                if (archivo) {
                    let extension = archivo.name.split('.').pop().toLowerCase();

                    if (extensionesValidas.includes(extension)) {
                        imagenes.push(archivo);
                        let nombre = idProducto+"_"+i;
                        nombres.push(nombre)
                    } else {
                        alerta.alertar(`La imagen ${archivo.name} no es válida. Solo se permiten archivos JPG, JPEG o PNG.`);
                    }
                }
            }
        }

        if(cambiados<=0) {
            window.history.back();
        }else {
            for (let i = 0; i < imagenes.length; i++) {
                subirImagen(imagenes[i], nombres[i], idProducto);
            }
        }

    } catch (error) {
        alerta.alertar(error);
    }
}

const subirImagen = (imagen, nombre, idProducto) => {
    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('valores[]', nombre);
    formData.append('controlador', "ImagenControlador");
    formData.append('accion', "subirImagen")

    $.ajax({
        url: '/TuxOut/backoffice/core/Enrutador.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function() {
            window.history.back();
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr);
        }
    });
}

const tomarDatosProducto = () => {
    let url = new URLSearchParams(window.location.search);
    let idProducto = url.get('idProducto');
    console.log(idProducto)

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "show", controlador: "ProductoControlador", valores: ["idProducto", idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    imprimirFormulario(response);
                }else {
                    console.error("response")
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

const imprimirFormulario = (datosProducto) => {
    console.log(datosProducto)
    let datos = datosProducto[0];
    let oculto = datos['oculto'];
    oculto = oculto == 0 ? oculto = "" : oculto = "checked";

    $("#titulo-editar-producto").html(`Editar ${datos['nombre']}`)
    $("#contenedor-abrir").append(`
        <label for="inputIdProducto">ID Producto:</label>
            <input type="text" id="inputIdProducto" class="form-control inputIngresar" value="${datos['idProducto']}" disabled="disabled">
            <label for="inputNombre">Nombre:</label>
            <input type="text" id="inputNombre" class="form-control inputIngresar" value="${datos['nombre']}">
            <label for="inputDescripcion">Descripción:</label>
            <input type="text" id="inputDescripcion" class="form-control inputIngresar" value="${datos['descripcion']}">
            <label for="inputPrecio">Precio:</label>
            <input type="number" id="inputPrecio" class="form-control inputIngresar" value="${datos['precio']}">
            <label for="inputStock">Stock:</label>
            <input type="number" id="inputStock" class="form-control inputIngresar" value="${datos['stock']}">
            <label for="inputEstado">Estado:</label>
            <select id="inputEstado" class="form-control inputIngresar">
                <option value="Nuevo" ${datos['estado'] === 'Nuevo' ? 'selected' : ''}>Nuevo</option>
                <option value="Renovado" ${datos['estado'] === 'Renovado' ? 'selected' : ''}>Renovado</option>
                <option value="Usado" ${datos['estado'] === 'Usado' ? 'selected' : ''}>Usado</option>
            </select>
            <label for="inputMarca">Marca:</label>
            <input type="text" id="inputMarca" class="form-control inputIngresar" value="${datos['marca']}">
            <label class="my-2">
                <input type="checkbox" id="inputOculto" ${oculto}> Oculto
            </label>
            <div id="formularioImagen">
                <div id="contenedorInputImagen1">
                    <label for="inputImagen1">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen1" accept=".jpg, .png. jpeg">
                    <button class="btn-eliminar-imagen" data-num-img="1">x</button>
                </div>
                <div id="contenedorInputImagen2">
                    <label for="inputImagen2">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen2" accept=".jpg, .png. jpeg">
                    <button class="btn-eliminar-imagen" data-num-img="2">x</button>
                </div>
                <div id="contenedorInputImagen3">
                    <label for="inputImagen3">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen3" accept=".jpg, .png. jpeg">
                    <button class="btn-eliminar-imagen" data-num-img="3">x</button>    
                </div>
                <div id="contenedorInputImagen4">
                    <label for="inputImagen4">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen4" accept=".jpg, .png. jpeg">
                    <button class="btn-eliminar-imagen" data-num-img="4">x</button>
                </div>
                <div id="contenedorInputImagen5">
                    <label for="inputImagen5">Imagen:</label>
                    <input type="file" class="form-control inputImagen" id="inputImagen5" accept=".jpg, .png. jpeg">
                    <button class="btn-eliminar-imagen" data-num-img="5">x</button>
                </div>
            </div>`); 
            cargarPreviewUpdate(datos['idProducto'])
}

const tomarDatosUpdate = () => {
    let idProducto = $("#inputIdProducto").val();
    let rut = localStorage.getItem('rutEmpresa')
    let nombre = $("#inputNombre").val();
    let descripcion = $("#inputDescripcion").val();
    let precio = $("#inputPrecio").val();
    let stock = $("#inputStock").val();
    let estado = $("#inputEstado").val();
    let marca = $("#inputMarca").val();
    let oculto = $("#inputOculto").is(":checked");

    try {

        if(!validaciones.validarId(idProducto)) {
            throw new Error("idProducto invalido");
        }
        if (!validaciones.validarRUT(rut)) {
            throw new Error("RUT inválido");
        }
        if (!validaciones.validarNombreProducto(nombre)) {
            throw new Error("Nombre inválido");
        }
        if (!validaciones.validarDescripcionProducto(descripcion)) {
            throw new Error("Descripción inválida");
        }
        if (!validaciones.validarPrecio(precio)) {
            throw new Error("Precio inválido");
        }
        if (!validaciones.validarStock(stock)) {
            throw new Error("Stock inválido");
        }
        if (!validaciones.validarEstadoProducto(estado)) {
            throw new Error("Estado inválido");
        }
        if (!validaciones.validarMarcaProducto(marca)) {
            throw new Error("Marca inválida");
        }
        if (!validaciones.validarBooleano(oculto)) {
            throw new Error("Estado oculto inválido");
        }

        if(oculto) {
            oculto = 1;
        }else {
            oculto = 0;
        }

        updateProducto(idProducto, rut, nombre, descripcion, precio, stock, estado, marca, oculto);

    }catch(e) {
        alerta.alertar(e);
    }
}

const updateProducto = (idProducto, rut, nombre, descripcion, precio, stock, estado, marca, oculto) => {
    let valores = [idProducto, rut, nombre, descripcion, precio, stock, estado, marca, oculto];

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "update", controlador: "ProductoControlador", valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    validarImagenesUpdate(idProducto);
                }else {
                    alerta.alertar("No se ha podido actualizar");
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

$("#btn-editar-producto").click(tomarDatosUpdate);
$(document).ready(tomarDatosProducto);
$(document).on('click', '.btn-eliminar-imagen', quitarImagen);
$(document).on('change', '.inputImagen', cargarPreview);