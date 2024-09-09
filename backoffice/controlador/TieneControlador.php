<?php

require_once("../modelo/Tiene.php");

class TieneControlador {
    
    public function index() {
        $modelo = new Tiene();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        error_log(json_encode($resultados));
            
        exit;
    }

    public function store($idProducto, $idDescuento) {
        $modelo = new Tiene();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdDescuento($idDescuento);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Tiene();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "idProducto":
                $modelo->setIdProducto($valor);
                break;
            case "idDescuento":
                $modelo->setIdDescuento($valor);
                break;
            default:
                // ERROR
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($idProducto, $idDescuento) {
        $modelo = new Tiene();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdDescuento($idDescuento);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($idProducto, $idDescuento) {
        $modelo = new Tiene();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdDescuento($idDescuento);
        
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new TieneControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"], $_POST["valor"]);
        break;
    case "store":
        $controlador->store($_POST["valores"][0],$_POST["valores"][1]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
    case "update":
        $controlador->update($_POST["valores"][0],$_POST["valores"][1]);
        break;
    default:
        break;
}

?>
