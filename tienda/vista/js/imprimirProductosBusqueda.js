const tomarBusqueda = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let tipo = urlParams.get('tipo');
    let filtro = $("#selectBusqueda").val();

    if(filtro != "populares" && filtro != "menorPrecio" && filtro != "mayorPrecio" && filtro != "calificados") {
        filtro = "populares"
    }

    switch(tipo) {
        case "categoria":
            tomarProdutosCategoria(urlParams.get('categoria'), filtro)
            break;
        case "barra":
            tomarProdutosBusqueda(urlParams.get('busqueda'), filtro);
            break;
        case "favoritos":
            tomarProdutosFavoritos(filtro);
            break;
        case "historial":
            tomarProdutosHistorial(filtro);
            break;
        default:
            imprimirErrorBusqueda();
    }
}

const tomarProdutosBusqueda = (busqueda, filtro) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "busquedaProducto", controlador: "ProductoControlador", valores: [busqueda, filtro]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirResultados(response, `Resultados para: ${busqueda}`);
                    
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

const tomarProdutosCategoria = (categoria, filtro) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "busquedaCategoria", controlador: "CategoriaControlador", valores: [categoria, filtro]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirResultados(response, `Resultados para: ${categoria}`);
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

const tomarProdutosFavoritos = (filtro) => {
    let email = localStorage.getItem("email");
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "busquedaFavoritos", controlador: "UsuarioControlador", valores: [email, filtro]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirResultados(response, "Favoritos");
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

const tomarProdutosHistorial = (filtro) => {
    let email = localStorage.getItem("email");
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "busquedaHistorial", controlador: "UsuarioControlador", valores: [email, filtro]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirResultados(response, "Historial");
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

const imprimirResultados = (resultado, busqueda) => {
    $("#tituloBusqueda").html(busqueda);
    $("#contenedorProductosBusqueda").html("");
    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            
            let precio = item["precio"];
            let descuento = item["descuento"];
            let precioNuevo = descuento == 0 ? precio : (precio - (precio * (descuento / 100))).toFixed(2);

            precio = descuento == 0 ? "" : "$" + precio;
            precioNuevo = "$" + precioNuevo;
            descuento = descuento == 0 ? "‎" : descuento + "% OFF";
            $("#contenedorProductosBusqueda").append(`
                
            <div class="col-6 col-md-4 col-lg-3 col-xl-3 m-xl-2 card-producto">
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

$(document).ready(tomarBusqueda);
$("#selectBusqueda").change(tomarBusqueda);