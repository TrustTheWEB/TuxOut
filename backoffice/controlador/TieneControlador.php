<?php

require_once("../modelo/Tiene.php");

class TieneControlador {
    
    public function index() {
        $tiene = new Tiene();
        $resultados = $tiene->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        error_log(json_encode($resultados));
            
        exit;
    }

    public function store($idProducto, $idDescuento) {
        $tiene = new Tiene();
        $tiene->setIdProducto($idProducto);
        $tiene->setIdDescuento($idDescuento);
        
        if($tiene->store()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }

    public function show($atributo, $valor) {
        $tiene = new Tiene();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "idProducto":
                $tiene->setIdProducto($valor);
                break;
            case "idDescuento":
                $tiene->setIdDescuento($valor);
                break;
            default:
                // ERROR
        }

        $resultados = $tiene->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($idProducto, $idDescuento) {
        $tiene = new Tiene();
        $tiene->setIdProducto($idProducto);
        $tiene->setIdDescuento($idDescuento);

        if($tiene->update()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }

    public function destroy($idProducto, $idDescuento) {
        $tiene = new Tiene();
        $tiene->setIdProducto($idProducto);
        $tiene->setIdDescuento($idDescuento);

        if($tiene->destroy()) {
            // EXITOSO
        } else {
            // ERROR
        }
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
}

?>
