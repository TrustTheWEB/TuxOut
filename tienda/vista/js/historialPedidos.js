const tomarUsuario = () => {
    let email = localStorage.getItem("email");
    let filtro = $("#selectPedidos").val();

        if(filtro != "recientes" && filtro != "antiguos") {
            filtro = "recientes"
        }

    tomarPedidos(email, filtro)
}

const tomarPedidos = (email, filtro) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "showFiltro", controlador: "PedidoControlador", valores: [email, filtro]},
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
    if(!Array.isArray(pedidos)) {
        pedidos = [pedidos];
    }
    
    $("#bodyPedidos").html("");

    pedidos.forEach(pedido => {
        let estado = pedido['estado'];
        let color = "bg-secondary"
        if (estado == "pagado") {
            color = "bg-success"
        }

        $("#bodyPedidos").append(`
            <tr>
                <td class="py-4 px-3">${pedido['idPedido']}</td>
                <td class="py-4 px-3">${pedido['fecha']}</td>
                <td class="py-4 px-3">${pedido['medioPago']}</td>
                <td class="py-4 px-3"><span class="rounded ${color} text-white p-2 w-100">${estado}</span></td>
                <td class="py-4 px-3"><a href="detallespedido.html?idPedido=${pedido['idPedido']}&fecha=${pedido['fecha']}">Ver detalles</a></td>
            </tr>
        `);
    });
}

$("#selectPedidos").change(tomarUsuario);
$(document).ready(tomarUsuario)