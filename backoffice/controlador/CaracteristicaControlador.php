<?php

require_once("../modelo/Caracteristica.php");

class CaracteristicaControlador {
    
    public function index() {
        $modelo = new Caracteristica();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($idProducto, $nombre, $valor) {
        $modelo = new Caracteristica();
        $modelo->setIdProducto($idProducto);
        $modelo->setNombre($nombre);
        $modelo->setValor($valor);

        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Caracteristica();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "idProducto":
                $modelo->setIdProducto($valor);
                break;
            case "nombre":
                $modelo->setNombre($valor);
                break;
            case "valor":
                $modelo->setValor($valor);
                break;
            default:
                // error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($idProducto, $caracteristica) {
        $modelo = new Caracteristica();
        $modelo->setIdProducto($idProducto);
        $modelo->setCaracteristica($caracteristica);
        if($modelo->update()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }

    public function destroy($idProducto, $nombre, $valor) {
        $modelo = new Caracteristica();
        $modelo->setIdProducto($idProducto);
        $modelo->setNombre($nombre);
        $modelo->setValor($valor);
        
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
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
    case "store";
        $controlador->store($_POST["valores"][0], $_POST["valores"][1], $_POST["valores"][2]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1], $_POST["valores"][2]);
        break;
    // Puedes agregar aquí otros casos para métodos como store, update y destroy
}

?>
