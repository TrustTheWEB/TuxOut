window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        location.reload();
    }
});

const tomarDatos = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    cargarImagenGrande(idProducto);
    cargarImagenes(idProducto);
    cargarProducto(idProducto);
    cargarCaracteristicas(idProducto);
    cargarComentarios(idProducto);
}

const cargarCaracteristicas = (idProducto) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "CaracteristicaControlador", valores: ["idProducto", idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirCaracteristicas(response);
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

const imprimirCaracteristicas = (resultado) => {
    for(let i = 0; i < resultado.length; i++) {
        $(".datos-caracteristicas").append(`
            <p class="atributo-producto"><b>${resultado[i]["nombre"]}:</b> ${resultado[i]["valor"]}</p>    
        `);
    }
}

const cargarProducto = (idProducto) => {
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
    $(".btn-editar").attr("href", `editarProducto.html?idProducto=${resultado['idProducto']}`);
    $(".btn-agregar-car").attr("href", `agregar.html?idProducto=${resultado['idProducto']}&tipo=caracteristica`);
    $(".btn-agregar-cat").attr("href", `agregar.html?idProducto=${resultado['idProducto']}&tipo=categoria`);
    $(".btn-agregar-des").attr("href", `agregar.html?idProducto=${resultado['idProducto']}&tipo=descuento`);

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

const imprimirEstrellas = (calificacion, contenedor) => {
    for (let i = 1; i <= 5; i++) {
        
        if (i <= Math.floor(calificacion)) {
            $(contenedor).append(`<i class="bi bi-star-fill estrella"></i> `);
        } else if (i - 0.5 <= calificacion) {
            $(contenedor).append(`<i class="bi bi-star-half estrella"></i> `);
        }else {
            $(contenedor).append(`<i class="bi bi-star estrella"></i> `);
        }
    }    
}

const cargarImagenGrande = (idProducto) => {
    let url = `../../tienda/assets/img_productos/${idProducto}_1.jpg`;
        imagenExiste(url)
        .then(existe => {
            if (!existe) {
                url = `../../tienda/assets/img/default.png`;
                $(".art-selector-abrir").addClass('d-none');
            }
            imprimirImagenGrande(url);
        }); 
}

const cargarImagenes = (idProducto) => {
    for (let i = 1; i <= 5; i++) {
        let url = `../../tienda/assets/img_productos/${idProducto}_${i}.jpg`;
        imagenExiste(url)
        .then(existe => {
            if (existe) {
                imprimirImagenChica(url)
            }
        })
    }
}

const imagenExiste = (url) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/TuxOut/tienda/core/Enrutador.php', 
            method: 'POST', 
            dataType: 'json', 
            data: {accion: "imagenExiste", controlador: "ImagenControlador", valores: url},
            success: function(response) {
                if (response.error) {
                    console.error('Error:', response.error);
                    reject(false);
                } else {
                    if (response) {
                        resolve(true);
                    } else {
                        resolve(false); 
                    } 
                }
            },
            error: function(xhr, status, error) {
                console.error('Error en la solicitud:', xhr, error, status);
                reject(false);
            }
        });
    });
}

const imprimirImagenChica = (url) => {
    $("#imagenes-chicas").append(`
        <li class="li-abrir">
            <button class="btn btn-abrir-select p-0 m-1">
              <img src="${url}" class="rounded border img-abrir-select" alt="producto">
            </button>
          </li>
    `);
}

const imprimirImagenGrande = (url) => {
    $("#imagen-grande").html(`
        <img src="${url}" class="rounded border img-abrir" alt="producto">
    `);

}

const cargarComentarios = (idProducto) => {
    $.ajax({
        url: '/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "show", controlador: "ComentaControlador", valores: ["idProducto", idProducto]},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirComentarios(response);
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

const imprimirComentarios = (resultado) => {
    if(!resultado.length) {
        $(".comentarios").append('<p class="mb-3">Este producto no ha sido calificado.</p>')
    }
    
    for (let i = 0 ; i < resultado.length ; i++) {
        $(".comentarios").append(`
            <div class="card ps-3 py-1 mb-3">
               <div class="card-body">
                 <span class=estrellas-comentario-${i+1}></span>
                 <p>
                   ${resultado[i]["comentario"]}
                 </p>
               </div>
             </div> 
         `);
         imprimirEstrellas(resultado[i]["calificacion"], `.estrellas-comentario-${i+1}`);
    }
}

$(document).ready(tomarDatos);