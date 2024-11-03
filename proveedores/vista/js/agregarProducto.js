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
        url: '/TuxOut/backoffice/core/Enrutador.php',
        type: 'POST',
        dataType: 'json',
        data: { accion: "eliminarImagenNombre", valores: [nombre], controlador: "ImagenControlador"}
    });
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

const validarImagenes = (idProducto) => {
    const extensionesValidas = ['jpg', 'jpeg', 'png'];

    let imagenes = [];

    try {
        for (let i = 1; i <= 5; i++) {
            let inputImagen = $(`#inputImagen${i}`);
            let archivo = inputImagen[0].files[0];

            if (archivo) {
                let extension = archivo.name.split('.').pop().toLowerCase();

                if (extensionesValidas.includes(extension)) {
                    imagenes.push(archivo);
                } else {
                    alerta.alertar(`La imagen ${archivo.name} no es válida. Solo se permiten archivos JPG, JPEG o PNG.`);
                }
            }
        };

        for (let i = 0; i < imagenes.length; i++) {
            let nombre = idProducto+"_"+(i+1);
            subirImagen(imagenes[i], nombre);
        }

    } catch (error) {
        alerta.alertar(error);
        destroyProducto(idProducto);
    }
}

const tomarDatosIngresar = () => {
    let rut = localStorage.getItem('rutEmpresa')
    let nombre = $("#inputNombre").val();
    let descripcion = $("#inputDescripcion").val();
    let precio = $("#inputPrecio").val();
    let stock = $("#inputStock").val();
    let estado = $("#inputEstado").val();
    let marca = $("#inputMarca").val();
    let oculto = $("#inputOculto").is(":checked");

    try {

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

        storeProducto(rut, nombre, descripcion, precio, stock, estado, marca, oculto);

    }catch(e) {
        alerta.alertar(e);
    }
}

const storeProducto = (rut, nombre, descripcion, precio, stock, estado, marca, oculto) => {
    let valores = [rut, nombre, descripcion, precio, stock, estado, marca, oculto];

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "store", controlador: "ProductoControlador", valores: valores},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    validarImagenes(response);
                }else {
                    alerta.alertar("No se ha podido ingresar");
                }
            }
        },
        error: function(xhr, status, error) {
            console.error('Error en la solicitud:', xhr, error, status);
        }
    });
}

$("#btn-ingresar-producto").click(tomarDatosIngresar);
$(document).on('click', '.btn-eliminar-imagen', quitarImagen);
$(document).on('change', '.inputImagen', cargarPreview);