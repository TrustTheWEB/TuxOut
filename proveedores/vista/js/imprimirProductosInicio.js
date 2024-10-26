const tomarDatos = () => {
    //tomarEstadisticas();
    tomarMasVendidos();
    //tomarProdutos();
}

const tomarMasVendidos = () => {
    let response = "";
    imprimirMasVendidos(response);
}

const imprimirMasVendidos = (productos) => {
    $(".contenedor-mas-vendidos").html(`<h3 class="mb-3 col-12 col-lg-10">Artículos más vendidos</h3>`)
    for(let i = 0; i < 4; i++) {
        $(".contenedor-mas-vendidos").append(`
            <article class="d-inline-flex col-12 col-lg-5 p-2">
                <a href="productos.html" class="text-decoration-none">
                    <div class="card card-proveedor">
                        <div class="row">
                            <div class="col-4">
                                <img src="../assets/img_productos/${""}_1.jpg" class="card-img-top" alt="${""}" onerror="this.onerror=null;this.src='../assets/img/default.png';">
                            </div>
                            <div class="col-8">
                                <div class="card-body">
                                    <h5 class="m-0 card-title card-title-proveedor-estadistica">iPhone 15, 64GB, Color Negro, Unlocked</h5>
                                    <p class="m-0 precio-anterior">$80.000</p>
                                    <p class="m-0 precio-nuevo">$25.000</p>
                                    <p class="m-0 precio-descuento">100% OFF</p>
                                    <p class="m-0">Stock: 52</p>
                                    <p class="m-0">Vendidos este mes: 52</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
        `); 
    }
}

$(document).ready(tomarDatos);