
import Validaciones from './Validaciones.js';
const validaciones = new Validaciones();

import Alerta from './Alerta.js';
const alerta = new Alerta();


const tomarPedidos = () => {
    let rut = localStorage.getItem('rutEmpresa');
    let filtro = $("#selectFiltro").val();

    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "showPedidosEmpresa", controlador: "ContieneControlador", valores: [rut, filtro]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirPedidos(response);
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

const imprimirPedidos = (pedidos) => {
    $("#tablaPedidos").html("");
    for (let i = 0; i < pedidos.length; i++) {
        let pedido = pedidos[i];
        let selectedPreparando = "";
        let selectEntregado = "";
        if(pedido['estado'] == "preparando") {
            selectedPreparando = "selected";
            selectEntregado = "";
        }else {
            selectedPreparando = "";
            selectEntregado = "selected";
        }
        $("#tablaPedidos").append(`
            <tr>
                <td>${pedido['usuario']}</td>
                <td>${pedido['idProducto']}</td>
                <td>${pedido['nombre']}</td>
                <td>${pedido['fecha']}</td>
                <td>${pedido['cantidad']}</td>
                <td>${pedido['montoTotal']}</td>
                <td>
                   <select  class="form-select selectEstado" id="selectEstado${i}" data-id-producto=${pedido['idProducto']} data-id-pedido=${pedido['idPedido']} name="estado">
                        <option value="preparando" ${selectedPreparando}>Preparando</option>
                        <option value="entregado" ${selectEntregado}>Entregado</option>
                    </select>
                </td>
            </tr>
        `);
    }
}

const cambiarEstado = (e) => {
    e.preventDefault();
    let select = e.target.id;
    let estado = $("#"+select).val();
    let idPedido = $("#"+select).attr("data-id-pedido");
    let idProducto = $("#"+select).attr("data-id-producto");
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "cambiarEstado", controlador: "ContieneControlador", valores: [idPedido, idProducto, estado]},
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
            console.error('Error en la solicitud:', xhr, error, status);
        }
    }); 
}

$(document).on('change', '.selectEstado', cambiarEstado);
$("#selectFiltro").change(tomarPedidos);
$(document).ready(tomarPedidos);