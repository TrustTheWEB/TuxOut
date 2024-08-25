<?php

require_once("../modelo/Producto.php");

class ProductoControlador {
    
    public function index() {
        $producto = new Producto();
        $resultados = $producto->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        error_log(json_encode($resultados));
            
        exit;
    }

    public function create($rut, $nombre, $descripcion, $precio, $stock, $estado, $marca) {
        $producto = new Producto();
        $producto->setRut($rut);
        $producto->setNombre($nombre);
        $producto->setDescripcion($descripcion);
        $producto->setPrecio($precio);
        $producto->setStock($stock);
        $producto->setEstado($estado);
        $producto->setMarca($marca);
        if($usuario->create()) {
             //EXITOSO
        } else {
            //ERROR
        }
    }

    public function show($id) {
        $producto = new Producto();
        $producto->setIdProducto($id);
        $resultados = $producto->show();

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($nombre, $descripcion, $precio, $stock, $estado, $marca) {
        $producto = new Producto();
        $producto->setNombre($nombre);
        $producto->setDescripcion($descripcion);
        $producto->setPrecio($precio);
        $producto->setStock($stock);
        $producto->setEstado($estado);
        $producto->setMarca($marca);
        if($usuario->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($id) {
        $producto = new Producto();
        $producto->setIdProducto($id);
        if($usuario->destroy()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }
}

$controlador = new ProductoControlador();
$metodo = $_POST["metodoControlador"];
switch($metodo) {
    case "index":
        $controlador->index();
    break;
}

?>