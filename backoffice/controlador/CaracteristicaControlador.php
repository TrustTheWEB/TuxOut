<?php

require_once("../modelo/Caracteristica.php");

class CaracteristicaControlador {
    
    public function index() {
        $caracteristica = new Caracteristica();
        $resultados = $caracteristica->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($idProducto, $caracteristica) {
        $caracteristica = new Caracteristica();
        $caracteristica->setIdProducto($idProducto);
        $caracteristica->setCaracteristica($caracteristica);
        if($caracteristica->store()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }

    public function show($atributo, $valor) {
        $caracteristica = new Caracteristica();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "idProducto":
                $caracteristica->setIdProducto($valor);
                break;
            case "caracteristica":
                $caracteristica->setCaracteristica($valor);
                break;
            default:
                // error
        }

        $resultados = $caracteristica->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($idProducto, $caracteristica) {
        $caracteristica = new Caracteristica();
        $caracteristica->setIdProducto($idProducto);
        $caracteristica->setCaracteristica($caracteristica);
        if($caracteristica->update()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }

    public function destroy($idProducto) {
        $caracteristica = new Caracteristica();
        $caracteristica->setIdProducto($idProducto);
        if($caracteristica->destroy()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }
}

$controlador = new CaracteristicaControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"], $_POST["valor"]);
        break;
    // Puedes agregar aquí otros casos para métodos como store, update y destroy
}

?>
