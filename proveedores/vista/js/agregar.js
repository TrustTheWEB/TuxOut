
import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarFormulario = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    let tipo = urlParams.get('tipo');
    
    switch(tipo) {
        case "descuento": 
            tomarDescuentos(idProducto);
            break;
        case "caracteristica":
            tomarCaracteristicas(idProducto);
            break;
        case "categoria":
            tomarCategorias(idProducto);
            break;
        default:
            window.history.back();
    }
}

const tomarDescuentos = (idProducto) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "index", controlador: "DescuentoControlador", valores: [null]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al cargar los descuentos');
            } else {
                if(response) {
                    imprimirDescuentos(response, idProducto);
                }
            }
        },
        error: function() {
            alerta.alertar("Error al cargar los descuentos")
        }
    }); 
}

const imprimirDescuentos = (descuentos, idProducto) => {
    $("#contenedorAgregar").html(`
        <h2 class="col-12 text-center">Descuentos</h2>
        <h4 class="col-12 text-center">Selecciona los descuentos para tu producto:</h4>
        <p class="col-12 text-center">(Al vender solo se tendra en cuenta el descuento en fecha de mayor valor)</p>
        <hr class="col-12 col-lg-8 my-2 mb-4">
        <article class="col-12 col-lg-7 row justify-content-center table-responsive bg-transparent tabla-descuento">
            <h4 class="text-center">Crear código de descuento</h4>
            <table class="table sm-table tabla-descuento">
                <thead>
                    <tr>
                        <td>Motivo</td>
                        <td>Porcentaje</td>
                        <td>Fecha Inicial</td>
                        <td>Fecha Final</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" class="form-control" id="inputMotivo"></input></td>
                        <td><input type="number" class="form-control" id="inputPorcentaje"></input></td>
                        <td><input type="date" class="form-control" id="inputFechaInicio"></input></td>
                        <td><input type="date" class="form-control" id="inputFechaFin"></input></td>
                    </tr>
                </tbody>
            </table>
            <button class="btn col-3 border rounded-pill bg-none" id="boton-agregar-descuento">Ingresar</button>
        </article>
        <hr class="col-12 col-lg-7 mt-4 mb-4">
        <article id="contenedorDescuentos" class="col-12 col-lg-6 row justify-content-between">
        </article>
        `);

    for(let i = 0; i < descuentos.length; i++) {
        $("#contenedorDescuentos").append(`
        <div class="form-check col-12">
            <input class="form-check-input check-descuento" type="checkbox" value="" data-id-descuento="${descuentos[i]['idDescuento']}">
            <label class="form-check-label" for="flexCheckDefault">
                ${descuentos[i]['motivo']} %${descuentos[i]['porcentaje']} (${descuentos[i]['fechaInicio']} - ${descuentos[i]['fechaFin']})
            </label>
        </div>     
        `);
    }

    tomarDescuentosProducto(idProducto);
}

const tomarDescuentosProducto = (idProducto) => {

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "TieneControlador", valores: ["idProducto", idProducto]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al obtener descuentos');
            } else {
                if(response) {
                    checkDescuentos(response);
                }
            }
        },
        error: function() {
            alerta.alertar("Error al obtener descuentos")
        }
    }); 
}

const tomarCategorias = (idProducto) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "index", controlador: "CategoriaControlador", valores: [null]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al cargar las categorías');
            } else {
                if(response) {
                    imprimirCategorias(response, idProducto);
                }
            }
        },
        error: function() {
            alerta.alertar("Error al cargar las categorías")
        }
    }); 
}

const imprimirCategorias = (categorias, idProducto) => {
    $("#contenedorAgregar").html(`
        <h2 class="col-12 text-center">Categorías</h2>
        <h4 class="col-12 text-center">Selecciona las categorías para tu producto:</h4>
        <hr class="col-12 col-lg-7 my-2 mb-4">
        <article id="contenedorCategorias" class="col-12 col-lg-6 row justify-content-between">
        </article>
        `);

    for(let i = 0; i < categorias.length; i++) {
        $("#contenedorCategorias").append(`
        <div class="form-check col-6 col-lg-4">
            <input class="form-check-input check-categoria" type="checkbox" value="" data-id-categoria="${categorias[i]['idCategoria']}">
            <label class="form-check-label" for="flexCheckDefault">
                ${categorias[i]['nombre']}
            </label>
        </div>     
        `);
    }

    tomarCategoriasProducto(idProducto);
}

const checkDescuentos = (descuentos) => {
    for (let i = 0; i < descuentos.length; i++) {
        let idDescuento = descuentos[i]['idDescuento'];
        $(`.check-descuento[data-id-descuento="${idDescuento}"]`).prop('checked', true);
    }
}

const tomarCategoriasProducto = (idProducto) => {

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "CategorizaControlador", valores: ["idProducto", idProducto]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al categorizar');
            } else {
                if(response) {
                    checkCategorias(response);
                }
            }
        },
        error: function() {
            alerta.alertar("Error al categorizar")
        }
    }); 
}

const checkCategorias = (categorias) => {
    for (let i = 0; i < categorias.length; i++) {
        let idCategoria = categorias[i]['idCategoria'];
        $(`.check-categoria[data-id-categoria="${idCategoria}"]`).prop('checked', true);
    }
}


const tomarCaracteristicas = (idProducto) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "CaracteristicaControlador", valores: ["idProducto", idProducto]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al cargar las características del producto');
            } else {
                if(response) {
                    cargarFormularioCaracteristica(response);
                }
            }
        },
        error: function() {
            alerta.alertar("Error al cargar las características del producto")
        }
    }); 
}

const cargarFormularioCaracteristica = (caracteristicas) => {
    $("#contenedorAgregar").html(`
        <h2 class="col-12 text-center">Características</h2>
        <article class="table-responsive col-12 col-lg-6">
            <table class="table p-2 border">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Valor</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tablaCaracteristicas">

            </tbody>
            </table>
        </article>    
        <hr class="col-12 col-lg-7 my-2">
        <h4 class="col-12 text-center mt-3">Nueva característica</h4>
        <article class="col-12 col-lg-6 mb-2">
            <label for="input-car-nombre-nueva" class="form-label text-center text-lg-end mb-1 mt-2 label-dir pe-0">Nombre:</label>
        <div class="">
            <input id="input-car-nombre-nueva" class="form-control" type="text">
        </div>
        <label for="input-car-valor-nueva" class="form-label text-center text-lg-end mb-1 mt-2 label-dir pe-0">Valor:</label>
        <div class="">
            <input id="input-car-valor-nueva" class="form-control" type="text">
        </div>
        <button id="boton-agregar-car" class="btn w-100 btn-card-comprar my-4">Ingresar</button>
        </article>
    `);

    for(let i = 0; i < caracteristicas.length; i++) {
        $("#tablaCaracteristicas").append(`
            <tr data-fila="${caracteristicas[i]['idProducto']}-${caracteristicas[i]['nombre']}-${caracteristicas[i]['valor']}">
                <td>${caracteristicas[i]['nombre']}</td>
                <td>${caracteristicas[i]['valor']}</td>
                <td><button class="btn boton-eliminar-car" data-id-producto="${caracteristicas[i]['idProducto']}" data-nombre="${caracteristicas[i]['nombre']}" data-valor="${caracteristicas[i]['valor']}" >Eliminar</button></td>
            </tr>
        `);
        
    }
}

const tomarDatosAgregarCaracteristica = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    let nombre = $("#input-car-nombre-nueva").val();
    let valor = $("#input-car-valor-nueva").val();

    try {
        if(!validaciones.validarNombreCaracteristica(nombre)) {
            throw new Error("el nombre de la característica no es válido")
        }
        
        if(!validaciones.validarValor(valor)) {
            throw new Error("el valor de la característica no es válido")
        }

        if(!validaciones.validarId(idProducto)) {
            throw new Error("el ID del producto no es válido")
        }

        agregarCaracteristica(idProducto, nombre, valor);

    }catch(e) {
        alerta.alertar(e);
    }
}

const agregarCaracteristica = (idProducto, nombre,valor) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "CaracteristicaControlador", valores: [idProducto, nombre, valor]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al agregar la característica');
            } else {
                if(response) {
                    if(response == true) {
                        tomarCaracteristicas(idProducto);
                    }else {
                        alerta.alertar('Error al agregar la característica');
                    }
                }
            }
        },
        error: function() {
            alerta.alertar("Error al agregar la característica")
        }
    }); 
}

const tomarDatosEliminarCaracteristica = (e) => {
    e.preventDefault();
    let botonEliminar = $(e.currentTarget);
    let idProducto = botonEliminar.attr("data-id-producto");
    let nombre = botonEliminar.attr("data-nombre");
    let valor = botonEliminar.attr("data-valor");
    
    eliminarCaracteristica(idProducto, nombre, valor);
}

const eliminarCaracteristica = (idProducto, nombre, valor) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "destroy", controlador: "CaracteristicaControlador", valores: [idProducto, nombre, valor]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al eliminar la característica');
            } else {
                if(response) {
                    if(response == true) {
                        let fila = idProducto+"-"+nombre+"-"+valor;
                        let selector = '[data-fila="'+ fila +'"]';
                        $(selector).remove();
                    }else {
                        alerta.alertar('Error al eliminar la característica');
                    }
                }
            }
        },
        error: function() {
            alerta.alertar("Error al agregar la característica")
        }
    }); 
}

const tomarDatosCategorizar = (e) => {
    e.preventDefault();
    let check = $(e.currentTarget);
    let idCategoria = check.attr("data-id-categoria");
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    
    if(!check.is(":checked")) {
        descategorizar(idProducto, idCategoria)
    }else {
        categorizar(idProducto, idCategoria);
    }
}

const descategorizar = (idProducto, idCategoria) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "destroy", controlador: "CategorizaControlador", valores: [idProducto, idCategoria]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al descategorizar');
            } else {
                if(response) {
                    alerta.confirmar("Producto descategorizado correctametne")
                }
            }
        },
        error: function() {
            alerta.alertar("Error al descategorizar")
        }
    }); 
}

const categorizar = (idProducto, idCategoria) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "CategorizaControlador", valores: [idProducto, idCategoria]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al categorizar');
            } else {
                if(response) {
                    alerta.confirmar("Producto categorizado correctametne")
                }
            }
        },
        error: function() {
            alerta.alertar("Error al categorizar")
        }
    }); 
}

const tomarDatosTieneDescuento = (e) => {
    e.preventDefault();
    let check = $(e.currentTarget);
    let idDescuento = check.attr("data-id-descuento");
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    
    if(!check.is(":checked")) {
        quitarDescuento(idProducto, idDescuento)
    }else {
        agregarDescuetno(idProducto, idDescuento);
    }
}

const quitarDescuento = (idProducto, idDescuento) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "destroy", controlador: "TieneControlador", valores: [idProducto, idDescuento]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al quitar descuento');
            } else {
                if(response) {
                    alerta.confirmar("Descuento removido correctamente")
                }
            }
        },
        error: function() {
            alerta.alertar("Error al quitar descuento")
        }
    }); 
}

const agregarDescuetno = (idProducto, idDescuento) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "TieneControlador", valores: [idProducto, idDescuento]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error agregar descuento');
            } else {
                if(response) {
                    alerta.confirmar("Descuento agregado correctamente")
                }
            }
        },
        error: function() {
            alerta.alertar("Error agregar descuento")
        }
    }); 
}

const tomarDatosAgregarDescuento = () => {
    let motivo = $("#inputMotivo").val();
    let porcentaje = $("#inputPorcentaje").val();
    let fechaInicio = $("#inputFechaInicio").val();
    let fechaFin = $("#inputFechaFin").val();

    try{
        if(!validaciones.validarMotivoDescuento(motivo)) {
            throw new Error("El motivo ingresado no es válido")
        }

        if(!validaciones.validarPorcentaje(porcentaje)) {
            throw new Error("El porcentaje ingresado no es válido")
        }

        if(!validaciones.validarFechaNoNull(fechaInicio)) {
            throw new Error("La fecha de inicio no es válida")
        }

        if(!validaciones.validarFechaNoNull(fechaFin)) {
            throw new Error("La fecha de inicio no es válida")

        } 

        let dateInicio = new Date(fechaInicio);
        let dateFin = new Date(fechaFin);

        if (dateFin < dateInicio) {
            throw new Error("La fecha de inicio debe ser posterior a la de finalización.")
        }

        crearDescuento(motivo, porcentaje, fechaInicio, fechaFin);

    }catch(e) {
        alerta.alertar(e);
    }
}

const crearDescuento = (motivo, porcentaje, fechaInicio, fechaFin) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "DescuentoControlador", valores: [porcentaje, fechaInicio, fechaFin, motivo]},
        success: function(response) {
            if (response.error) {
                alerta.alertar('Error al agregar descuento');
            } else {
                if(response) {  
                    let urlParams = new URLSearchParams(window.location.search)
                    let idProducto = urlParams.get('idProducto');
                    tomarDescuentos(idProducto);
                }
            }
        },
        error: function() {
            alerta.alertar("Error al agregar descuento")
        }
    }); 
}

$(document).on("change", ".check-descuento", tomarDatosTieneDescuento)
$(document).on("change", ".check-categoria", tomarDatosCategorizar)
$(document).on("click", ".boton-eliminar-car", tomarDatosEliminarCaracteristica)
$(document).on("click", "#boton-agregar-descuento", tomarDatosAgregarDescuento)
$(document).on("click", "#boton-agregar-car", tomarDatosAgregarCaracteristica)
$(document).ready(tomarFormulario);