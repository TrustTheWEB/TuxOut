const tomarProductos = () => {
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
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
            let descuento = item["descuento"]
            let precioNuevo = descuento === null ? precio : (precio - (precio * (descuento/100))).toFixed(2);
            if(descuento === null) {
                descuento = "‎";
                precio = "";
                precioNuevo = "$"+precioNuevo;
            }else {
                precio = "$"+precio;
                precioNuevo = "$"+precioNuevo;
                descuento = descuento+"% OFF";
            }
            
            $("#contenedorProductosInicio").append(`
            <article class="col-5 col-md-2 card m-2 py-2">
                <a href="abrirProducto.html">
                    <img src="../assets/img_productos/${item['idProducto']}_1.jpg" class="card-img-top" alt="${item['nombre']}">
                </a>
                <h5 class="card-title m-0 px-3 card-title-producto">${item["nombre"]}</h5>
                <div class="card-body card-body-inicio pb-0">
                        <p class="precio-anterior m-0">${precio}</p>
                        <p class="precio-nuevo m-0">${precioNuevo}</p>
                        <p class="precio-descuento m-0">${descuento}</p>
                        <button class="btn btn-primary agregar-carrito" data-id-producto="${item["idProducto"]}">Agregar al carrito</button>
                </div>
                <button class="btn btn-favorite botonFavorito">
                    <img src="../assets/logo/favorito.png" alt="favorito">
                </button>
            </article>
            `)
    });
    } else {

    }
}

$(document).ready(tomarProductos);