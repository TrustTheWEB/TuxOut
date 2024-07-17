//funciones que simulan el ingreso de productos al carrito

let productos = [];
$(".agregar-carrito").click(tomarProducto);
$(".carrito").click(mostrarProductos);

function tomarProducto() {
    let idProducto = $(this).closest(".contenedor-producto").find(".id-producto").data("id-producto");
    
    alert(agregarProducto(idProducto));
}

function agregarProducto(id) {
    let cantidad = 1;

    for(let i = 0 ; i < productos.length ; i++) {
        if (productos[i][0] == id) {
            productos[i][1]++;
            return("Producto agregado nuevamente");    
        }
    }

    productos.push([id, cantidad]);
    return("Producto agregado al carrito");
}

//Aún no se implementa la función de mostrar productos con un diseño elaborado por la falta de base de datos
//una vez implementada únicamente se necesitara la id y se extraeran nombre, imagen, cantidad, etc para poder mostrarlo
function mostrarProductos() {
    $("#carrito-vista-previa").empty();
    for(let i = 0; i < productos.length ; i++) {
        $("#carrito-vista-previa").append("id: "+productos[i][0]+ " | cantidad: "+productos[i][1]+ "<br>");
    }
}