<?php

require_once("../modelo/Favorito.php");

class FavoritoControlador {

    public function index() {
        $favorito = new Favorito();
        $resultados = $favorito->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        error_log(json_encode($resultados));
        exit;
    }

    public function store($email, $idProducto) {
        $favorito = new Favorito();
        $favorito->setEmail($email);
        $favorito->setIdProducto($idProducto);
        if($favorito->store()) {
            // Éxito
        } else {
            // Error
        }
    }

    public function show($atributo, $valor) {
        $favorito = new Favorito();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $favorito->setEmail($valor);
                break;

            case "idProducto":
                $favorito->setIdProducto($valor);
                break;

            default:
                // Error
        }

        $resultados = $favorito->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($email, $idProducto) {
        $favorito = new Favorito();
        $favorito->setEmail($email);
        $favorito->setIdProducto($idProducto);
        if($favorito->update()) {
            // Éxito
        } else {
            // Error
        }
    }

    public function destroy($email, $idProducto) {
        $favorito = new Favorito();
        $favorito->setEmail($email);
        $favorito->setIdProducto($idProducto);
        if($favorito->destroy()) {
            // Éxito
        } else {
            // Error
        }
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
    // Agregar casos para store, update y destroy según sea necesario
}

?>