function agregarProducto (producto) {
    let carrito = localStorage.getItem("carrito");
    localStorage.setItem("carrito", carrito+producto+" <br>");
}


$(".carrito").click(cargarProductos);

function cargarProductos() {
    localStorage.setItem("carrito", "");
    
    let producto1 = "iPhone15";
    let producto2 = "XiaomiRedmi9";
    let producto3 = "SamsungGalaxyS23";

    agregarProducto(producto1);
    agregarProducto(producto2);
    agregarProducto(producto3);

    mostrarProductos();
}

function mostrarProductos() {
    let productos = localStorage.getItem("carrito");
    $("#productos-carrito").html(productos);
}