let productos = [];

const mostrarProductos = () => {
    $("#carrito-vista-previa").empty();
    for(let i = 0; i < productos.length ; i++) {
        $("#carrito-vista-previa").append("id: "+productos[i][0]+ " | cantidad: "+productos[i][1]+ "<br>");
    }
}

const agregarProducto = (id) => {
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

const tomarProducto = (evento) => {
    let idProducto = $(evento.target).data('id-producto');

    alert(agregarProducto(idProducto));
}

$(document).on('click', '.agregar-carrito', tomarProducto);
$(".carrito").click(mostrarProductos);