const tomarProductoAbrir = () => {
    let urlParams = new URLSearchParams(window.location.search);
    let idProducto = urlParams.get('idProducto');
    cargarImagenGrande(idProducto);
    cargarImagenes(idProducto);
    cargarProducto(idProducto);
    
} 

const imprimirProductoAbrir = (resultado) => {
    console.log(resultado)
}

const cargarImagenGrande = (idProducto) => {
    let url = `../assets/img_productos/${idProducto}_1.jpg`;
        imagenExiste(url)
        .then(existe => {
            if (!existe) {
                url = `../assets/img/default.png`;
            }
        });
        imprimirImagenGrande(url);
}

const cargarImagenes = (idProducto) => {
    for (let i = 1; i <= 5; i++) {
        let url = `../assets/img_productos/${idProducto}_${i}.jpg`;
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
            url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
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
        <img src="${url}" class="rounded border img-abrir" alt="producto" onerror="this.onerror=null;this.src='../assets/img/default.png';">
    `);
}

const cargarProducto = (idProducto) => {
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "showAbrir", controlador: "ProductoControlador", valores: idProducto},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirProductoAbrir(response);
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

$(document).ready(tomarProductoAbrir);