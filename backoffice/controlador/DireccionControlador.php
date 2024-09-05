<?php

require_once("../modelo/Direccion.php");

class DireccionControlador {

    public function index() {
        $direccion = new Direccion();
        $resultados = $direccion->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $direccion = new Direccion();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $direccion->setEmail($valor);
                break;

            case "direccion":
                $direccion->setDireccion($valor);
                break;

            default:
                throw new Exception("Atributo '$atributo' no válido.");
        }

        $resultados = $direccion->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new DireccionControlador();
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
