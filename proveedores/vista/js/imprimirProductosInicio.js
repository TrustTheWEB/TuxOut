import Alerta from './Alerta.js';
const alerta = new Alerta();

import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

const tomarDatos = () => {
    let rut = localStorage.getItem('rutEmpresa');
    let nombre = localStorage.getItem('nombreEmpresa');
    imprimirNombre(nombre)
    tomarEstadisticasMes(rut);
    tomarMasVendidos(rut);
    tomarPendientes(rut);
}

const imprimirNombre = (nombre) => {
    $("#nombre-empresa").html(nombre)
}

const tomarPendientes = (rut) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "pedidosPendientes", controlador: "EmpresaControlador", valores: [rut]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    imprimirPedidosPendientes(response);
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

const imprimirPedidosPendientes = (pedidosPendientes) => {
    $("#pedidos-pendientes").html(pedidosPendientes[0]['pedidosPendientes']);
}

const tomarEstadisticasMes = (rut) => {

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "estadisticasMes", controlador: "EmpresaControlador", valores: [rut]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    imprimirEstadisticasMes(response);
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

const imprimirEstadisticasMes = (estadisticas) => {
    $("#ventas-mes").html(estadisticas[0]['ventasMes']);
    $("#ingresos-mes").html(estadisticas[0]['ingresosMes']);
}

const tomarMasVendidos = (rut) => {

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json',
        data: {accion: "indexInicio", controlador: "ProductoControlador", valores: [rut]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) { 
                    imprimirMasVendidos(response);
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

const imprimirMasVendidos = (productos) => {
    $(".contenedor-mas-vendidos").html(`<h3 class="mb-3 col-12 col-lg-10">Artículos más vendidos</h3>`)
    for(let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let idProducto = producto['idProducto'];
        let nombre = producto['nombre'];
        let descuento = producto['descuento'];
        let precio = producto['precio'];
        let precioNuevo = producto['precioDescuento']

        let precioStr = descuento == 0 ? "‎" : "$" + precio;
        let precioNuevoStr = "$" + precioNuevo;
        let descuentoStr = descuento == 0 ? "‎" : descuento + "% OFF";

        $(".contenedor-mas-vendidos").append(`
            <article class="d-inline-flex col-12 col-lg-5 p-2">
                <a href="abrirProducto.html?idProducto=${idProducto}" class="text-decoration-none">
                    <div class="card card-proveedor">
                        <div class="row">
                            <div class="col-5 col-lg-4">
                                <img src="../../tienda/assets/img_productos/${idProducto}_1.jpg" class="card-img-top img-inicio mt-xl-2 mt-xxl-1 me-3" alt="${nombre}" onerror="this.onerror=null;this.src='../assets/img/default.png';">
                            </div>
                            <div class="col-7 col-lg-8">
                                <div class="card-body">
                                    <h5 class="m-0 card-title card-title-proveedor-estadistica">${nombre}</h5>
                                    <p class="m-0 precio-anterior">${precioStr}</p>
                                    <p class="m-0 precio-nuevo">${precioNuevoStr}</p>
                                    <p class="m-0 precio-descuento">${descuentoStr}</p>
                                    <p class="m-0">Stock: ${producto['stock']}</p>
                                    <p class="m-0">Vendidos este mes: ${producto['cantidadVendida']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
        `); 
    }
}

$(document).ready(tomarDatos);