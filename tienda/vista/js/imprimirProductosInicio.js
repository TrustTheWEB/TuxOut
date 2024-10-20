const tomarDatos = () => {
    tomarProductos();

    let logueado = localStorage.getItem("logueado");
    if(logueado == "true") {
        tomarFavoritos(localStorage.getItem("email"));
    }
    
}

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

    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            
            let precio = item["precio"];
            let descuento = item["descuento"];
            let precioNuevo = descuento == 0 ? precio : (precio - (precio * (descuento / 100))).toFixed(2);

            precio = descuento == 0 ? "" : "$" + precio;
            precioNuevo = "$" + precioNuevo;
            descuento = descuento == 0 ? "‎" : descuento + "% OFF";

            $("#contenedorProductosInicio").append(`
                
            <article class="col-5 col-lg-3 col-xl-2 card m-2 py-2">
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
            `)
    });
    } else {

    }
}

const tomarFavoritos = (email) => {
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "FavoritoControlador", valores: ["email", email]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    mostrarFavoritos(response);
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

const mostrarFavoritos = (favoritos) => {

    for (let i = 0; i < favoritos.length; i++) {
        $(`#heart${favoritos[i]["idProducto"]}`).toggleClass("bi-heart");
        $(`#heart${favoritos[i]["idProducto"]}`).addClass("bi-heart-fill");
        $(`#btnHeart${favoritos[i]["idProducto"]}`).attr("data-favorito",true);
    }
}

$(document).ready(tomarDatos);

const agregarFavorito = (email, idProducto) => {
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "store", controlador: "FavoritoControlador", valores: [email, idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    actualizarCorazon(idProducto);
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

const eliminarFavorito = (email, idProducto) => {
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "destroy", controlador: "FavoritoControlador", valores: [email, idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    actualizarCorazon(idProducto);
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

const actualizarCorazon = (idProducto) => {
    let btnHeart = $(`#btnHeart${idProducto}`);
    let heart = $(`#heart${idProducto}`);
    let favorito = btnHeart.attr("data-favorito") === "true";
    console.log(favorito);
    
    if (favorito) {
        heart.removeClass("bi-heart-fill").addClass("bi-heart");
        btnHeart.attr("data-favorito", "false");
    } else {
        heart.removeClass("bi-heart").addClass("bi-heart-fill");
        btnHeart.attr("data-favorito", "true");
    }    
}

const tomarProductoFavorito = (evento) => {
    let idProducto = $(evento.currentTarget).data('id-producto');
    let logueado = localStorage.getItem("logueado");
    let favorito = $(evento.currentTarget).data('favorito');

    if(logueado) {
        let email = localStorage.getItem("email");
        if(favorito) {
            eliminarFavorito(email, idProducto);
        }else {
            agregarFavorito(email, idProducto);   
        }
        
    }else {
        alert("Debes crearte una cuenta para agregar productos a favorito");
    }
    
}

$(document).ready(function () {
    $(document).on('click', '.agregar-favorito', tomarProductoFavorito);
});