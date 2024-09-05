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

    public function store($rut, $nombre, $descripcion, $precio, $stock, $estado, $marca) {
        $producto = new Producto();
        $producto->setRut($rut);
        $producto->setNombre($nombre);
        $producto->setDescripcion($descripcion);
        $producto->setPrecio($precio);
        $producto->setStock($stock);
        $producto->setEstado($estado);
        $producto->setMarca($marca);
        if($usuario->store()) {
             //EXITOSO
        } else {
            //ERROR
        }
    }

    public function show($atributo, $valor) {
        $producto = new Producto();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "idProducto":
            $producto->setIdProducto($valor);
            break;
            
        case "RUT":
            $producto->setRut($valor);
            break;
    
        case "nombre":
            $producto->setNombre($valor);
            break;
    
        case "descripcion":
            $producto->setDescripcion($valor);
            break;
    
        case "precio":
            $producto->setPrecio($valor);
            break;
    
        case "stock":
            $producto->setStock($valor);
            break;
    
        case "estado":
            $producto->setEstado($valor);
            break;
    
        case "marca":
            $producto->setMarca($valor);
            break;
        default:
            //error
        }

        $resultados = $producto->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($rut, $nombre, $descripcion, $precio, $stock, $estado, $marca) {
        $producto = new Producto();
        $rut->setNombre($rut);
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
    case "show": 
        $controlador->show($_POST["atributo"],$_POST["valor"]);
        break;
}

?>