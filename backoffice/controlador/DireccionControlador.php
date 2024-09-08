<?php

require_once("../modelo/Direccion.php");

class DireccionControlador {

    public function index() {
        $modelo = new Direccion();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Direccion();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $modelo->setEmail($valor);
                break;

            case "direccion":
                $modelo->setDireccion($valor);
                break;

            default:
                throw new Exception("Atributo '$atributo' no válido.");
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($email, $dir) {
        $modelo = new Direccion();
        $modelo->setEmail($email);
        $modelo->setDireccion($dir);
        
        $resultados = $modelo->destroy();
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
    case "store":
        $controlador->store($_POST["valores"][0],$_POST["valores"][1]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
    default:
        break;
}

?>
