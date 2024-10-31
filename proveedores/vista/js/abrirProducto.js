const tomarDatos = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    tomarProducto(idProducto);
}

const tomarProducto = (idProducto) => {
    $.ajax({
        url: '/TuxOut/proveedores/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "showAbrir", controlador: "ProductoControlador", valores: idProducto},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirProducto(response);
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

const imprimirProducto = (resultado) => {
    resultado = resultado[0];
    $(".titulo-producto").html(resultado['nombre']);
    $("#p-descripcion-abrir").html(resultado['descripcion'])
    $(".agregar-carrito").attr("data-id-producto", resultado['idProducto'])
    $(".btn-comprar").attr("href", `comprar.html?tipo=unico&idProducto=${resultado['idProducto']}`)

    let precio = resultado["precio"];
    let descuento = resultado["descuento"];
    let precioNuevo = descuento == 0 ? precio : (precio - (precio * (descuento / 100))).toFixed(2);

    precio = descuento == 0 ? "" : "$" + precio;
    precioNuevo = "$" + precioNuevo;
    descuento = descuento == 0 ? "‎" : descuento + "% OFF";

    $(".datos-estado").append(`
        <p class="atributo-producto"><b>Estado: </b>${resultado['estado']}</p>    
    `);
    $(".card-precios").html(`
    <p class="precio-anterior m-0">${precio}</p>
    <p class="precio-nuevo m-0">${precioNuevo}</p>
    <p class="precio-descuento m-0">${descuento}</p>    
    `);
    $(".id-producto").attr("data-id-producto", resultado['idProducto']);
    imprimirEstrellas(resultado['promedioCalificacion'], ".calificacion-total");
    let calificacion = Number(resultado['promedioCalificacion']).toFixed(1);
    $(".calificacion-total").append(`   (${calificacion})`);
}

$(document).ready(tomarDatos);