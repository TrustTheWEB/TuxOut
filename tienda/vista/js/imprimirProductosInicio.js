import Alerta from './Alerta.js';
const alerta = new Alerta();

const tomarProductos = () => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "indexInicio", controlador: "ProductoControlador", valores: null},
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

const imprimirProductos = (resultado) => {
    console.log(resultado)

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            
            let precio = item["precio"];
            let descuento = item["descuento"];
            let precioNuevo = descuento == 0 ? precio : (precio - (precio * (descuento / 100))).toFixed(2);

            precio = descuento == 0 ? "" : "$" + precio;
            precioNuevo = "$" + precioNuevo;
            descuento = descuento == 0 ? "‎" : descuento + "% OFF";

            $("#contenedorProductosInicio").append(`
                
            <div class="col-6 col-md-4 col-lg-3 col-xl-2 m-xl-2 card-producto">
            <article class="card h-100 p-2">
            <div class="contenedor-img-top">    
                <a href="abrirProducto.html?idProducto=${item['idProducto']}" class="a-img-top">
                    <img src="../assets/img_productos/${item['idProducto']}_1.jpg" class="card-img-top" alt="${item['nombre']}" onerror="this.onerror=null;this.src='../assets/img/default.png';">
                </a>
            </div>
                <h5 class="card-title m-0 px-3 card-title-producto">${item["nombre"]}</h5>
                <div class="card-body card-body-inicio pb-0">
                        <p class="precio-anterior m-0">${precio}</p>
                        <p class="precio-nuevo m-0">${precioNuevo}</p>
                        <p class="precio-descuento m-0">${descuento}</p>
                        <button class="btn btn-primary agregar-carrito" data-id-producto="${item["idProducto"]}">Agregar al carrito</button>
                </div>
                <button class="btn-favorite agregar-favorito" data-id-producto="${item["idProducto"]}" id="btnHeart${item["idProducto"]}" data-favorito="false">
                    <i class="bi bi-heart logo-favorito" id="heart${item["idProducto"]}"></i>
                </button>
            </article>
            <div>
            `)
    });
    }
}

$(document).ready(tomarProductos);