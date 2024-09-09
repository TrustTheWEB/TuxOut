<?php

require_once("../modelo/Favorito.php");

class FavoritoControlador {

    public function index() {
        $modelo = new Favorito();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        error_log(json_encode($resultados));
        exit;
    }

    public function store($email, $idProducto) {
        $modelo = new Favorito();
        $modelo->setEmail($email);
        $modelo->setIdProducto($idProducto);
       
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Favorito();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $modelo->setEmail($valor);
                break;

            case "idProducto":
                $modelo->setIdProducto($valor);
                break;

            default:
                // Error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($email, $idProducto) {
        $modelo = new Favorito();
        $modelo->setEmail($email);
        $modelo->setIdProducto($idProducto);
        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($email, $idProducto) {
        $modelo = new Favorito();
        $modelo->setEmail($email);
        $modelo->setIdProducto($idProducto);
        $resultados = $modelo->destroy();

        
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new FavoritoControlador();
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
    // Agregar casos para store, update y destroy según sea necesario
}

?>