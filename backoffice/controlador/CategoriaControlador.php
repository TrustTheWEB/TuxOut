<?php

require_once("../modelo/Categoria.php");

class CategoriaControlador {

    public function index() {
        $modelo = new Categoria();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($nombre) {
        $modelo = new Categoria();
        $modelo->setNombre($nombre);
        $resultados = $modelo->store();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Categoria();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch ($atributo) {
            case "idCategoria":
                $modelo->setIdCategoria($valor);
                break;
            case "nombre":
                $modelo->setNombre($valor);
                break;
            default:
                // Error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($idCategoria, $nombre) {
        $modelo = new Categoria();
        $modelo->setIdCategoria($idCategoria);
        $modelo->setNombre($nombre);
        if ($modelo->update()) {
            // Éxito
        } else {
            // Error
        }
    }

    public function destroy($idCategoria) {
        $modelo = new Categoria();
        $modelo->setIdCategoria($idCategoria);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new CategoriaControlador();
$metodo = $_POST["metodoControlador"];

switch ($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show":
        $controlador->show($_POST["atributo"], $_POST["valor"]);
        break;
    case "store":
        $controlador->destroy($_POST["valores"][0]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0]);
        break;
    default:
        break;
}
?>
