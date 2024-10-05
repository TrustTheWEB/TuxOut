const tomarCategorias = () => {
    $.ajax({
        url: 'http://localhost/TuxOut/tienda/core/Enrutador.php', 
        method: 'POST', 
        dataType: 'json', 
        data: {accion: "index", controlador: "CategoriaControlador", valores: null},
        success: function(response) {
            if (response.error) {
                console.error('Error:', response.error);
            } else {
                if(response) {
                    imprimirCategoriasMenu(response);
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

const imprimirCategoriasMenu = (resultado) => {
    let categorias = [];
    if (Array.isArray(resultado)) {
        resultado.forEach(item => {
            categorias.push(item["nombre"]);
    });
    } else {
        categorias.push(resultado["nombre"]);
    }

    $("#barraMenu").html("");
    for(let i = 0; i < categorias.length; i++) {
        let categoria = categorias[i];
        $("#barraMenu").append(`
            
            <li class="nav-item">
              <a class="nav-link categoriaAside" href="productos.html?categoria=${categoria}">${categoria}</a>
            </li>

            `)

    }
}

const tomarBusqueda = () => {
    let busqueda = $(".inputBuscarPrincipal").val();
    window.location.href = `productos.html?busqueda=${encodeURI(busqueda)}`

}

$("#botonMenu").click(tomarCategorias);
$("#botonBuscarPrincipal").click(tomarBusqueda);
