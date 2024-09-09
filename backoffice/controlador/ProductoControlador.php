<?php

require_once("../modelo/Producto.php");

class ProductoControlador {
    
    public function index() {
        $modelo = new Producto();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados); 
        exit;
    }

    public function store($rut, $nombre, $descripcion, $precio, $stock, $estado, $marca) {
        $modelo = new Producto();
        $modelo->setRut($rut);
        $modelo->setNombre($nombre);
        $modelo->setDescripcion($descripcion);
        $modelo->setPrecio($precio);
        $modelo->setStock($stock);
        $modelo->setEstado($estado);
        $modelo->setMarca($marca);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Producto();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "idProducto":
            $modelo->setIdProducto($valor);
            break;
            
        case "RUT":
            $modelo->setRut($valor);
            break;
    
        case "nombre":
            $modelo->setNombre($valor);
            break;
    
        case "descripcion":
            $modelo->setDescripcion($valor);
            break;
    
        case "precio":
            $modelo->setPrecio($valor);
            break;
    
        case "stock":
            $modelo->setStock($valor);
            break;
    
        case "estado":
            $modelo->setEstado($valor);
            break;
    
        case "marca":
            $modelo->setMarca($valor);
            break;
        default:
            //error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($idProducto, $rut, $nombre, $descripcion, $precio, $stock, $estado, $marca) {
        $modelo = new Producto();
        $idProducto->setIdProducto($idProducto);
        $rut->setNombre($rut);
        $modelo->setNombre($nombre);
        $modelo->setDescripcion($descripcion);
        $modelo->setPrecio($precio);
        $modelo->setStock($stock);
        $modelo->setEstado($estado);
        $modelo->setMarca($marca);
        
        $resultados = $modelo->update();
            header('Content-Type: application/json');
            echo json_encode($resultados);
            exit;
    }

    public function destroy($id) {
        $modelo = new Producto();
        $modelo->setIdProducto($id);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
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
    case "store":
        $controlador->store($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3],$_POST["valores"][4],$_POST["valores"][5],$_POST["valores"][6]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0]);
        break;
    case "update":
        $controlador->update($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3],$_POST["valores"][4],$_POST["valores"][5],$_POST["valores"][6],$_POST["valores"][7]);
        break;
    default:
        break;
}

?>