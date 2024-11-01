window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        location.reload();
    }
});

import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarDatos = () => {
    let filtro = $("#selectFiltro").val();
    let rut = localStorage.getItem('rutEmpresa');
    tomarProductos(rut, filtro);
}

const tomarBusqueda = () => {
    let filtro = $("#selectFiltro").val();
    let busqueda = $("#busqueda-inv").val();
    let tipoBusqueda = $("#selectBusqueda").val();
    let rut = localStorage.getItem('rutEmpresa');
    tomarProductosBusqueda(rut, filtro, tipoBusqueda, busqueda);
}

const tomarProductos = (rut, filtro) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "indexFiltro", controlador: "ProductoControlador", valores: [rut, filtro]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirProductos(response);
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

const tomarProductosBusqueda = (rut, filtro, tipoBusqueda, busqueda) => {
    if(tipoBusqueda == "general") {
        $.ajax({
            url: '/TuxOut/proveedores/core/Enrutador.php', 
            method: 'POST', 
            dataType: 'json', 
            data: {accion: "busquedaProducto", controlador: "ProductoControlador", valores: [rut, busqueda, filtro]},
            success: function(response) {
                if (response.error) {
                    console.error('Error ', response.error);
                } else {
                    if(response) {
                        imprimirProductos(response);
                    }else {
                        console.error(response);
                    } 
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', xhr, error, status);
            }
        }); 
    }else {
        $.ajax({
            url: '/TuxOut/proveedores/core/Enrutador.php', 
            method: 'POST', 
            dataType: 'json', 
            data: {accion: "showFiltro", controlador: "ProductoControlador", valores: [tipoBusqueda, busqueda, rut, filtro]},
            success: function(response) {
                if (response.error) {
                    alerta.alertar('Error:', response.error);
                } else {
                    if(response) {
                        if(response == "vacio") {
                            alerta.alertar("No se encontraron resultados para "+busqueda)
                        }else {
                            imprimirProductos(response);
                        }
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
}

const imprimirProductos = (productos) => {
    $('#tablaProductos').html("");

    for(let i = 0; i < productos.length; i++) {
        let item = productos[i];

        let oculto = item["oculto"];
        oculto = oculto == 1 ? oculto = "checked" : oculto = "";
        
        $('#tablaProductos').append(
            `<tr data-fila="producto-${item["idProducto"]}">
                <td>${item["idProducto"] || ''}</td>
                <td class="tdLargo">${item["nombre"] || ''}</td>
                <td>${item["descripcion"] || ''}</td>
                <td>${item["precio"] || ''}</td>
                <td>${item["stock"]}</td>
                <td>${item["estado"] || ''}</td>
                <td>${item["marca"] || ''}</td>
                <td><input type="checkbox" id="checkOcultar_${item["idProducto"]}" class="checkOcultar" ${oculto}></td>
                <td><img src="../../tienda/assets/img_productos/${item["idProducto"]}_1.jpg" class="rounded img-inv" alt="${item["idProducto"]}" onerror="this.onerror=null;this.src='../assets/img/default.png';"></td>
                <td>
                    <div class="btn-group">
                        <a class="btn border" href="abrirProducto.html?idProducto=${item["idProducto"]}">ABRIR</a>
                        <a class="btn border" href="editarProducto.html?idProducto=${item["idProducto"]}">EDITAR</a>
                    </div>
                </td>
            </tr>`
        );
    }
}

const tomarIdOcultar = (evento) => {
    let idCheck = $(evento.target).attr('id');
    let idProducto = idCheck.split('_')[1];
    let oculto = $(`#${idCheck}`).is(':checked') ? 1 : 0;
    ocultar(idProducto, oculto);
}

const ocultar = (idProducto, oculto) => {

    $.ajax({
        url: 'http://localhost/TuxOut/backoffice/core/Enrutador.php', 
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

$(document).on('change', '.checkOcultar', tomarIdOcultar);
$("#btn-busqueda-inv").click(tomarBusqueda);
$("#btn-reset").click(tomarDatos);
$("#selectFiltro").change(tomarDatos)
$(document).ready(tomarDatos);