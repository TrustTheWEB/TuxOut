<?php

require_once("../modelo/Categoria.php");

class CategoriaControlador {

    public function index() {
        $categoria = new Categoria();
        $resultados = $categoria->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($idProducto, $categoria) {
        $categoria = new Categoria();
        $categoria->setIdProducto($idProducto);
        $categoria->setCategoria($categoria);
        if ($categoria->store()) {
            // Éxito
        } else {
            // Error
        }
    }

    public function show($atributo, $valor) {
        $categoria = new Categoria();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch ($atributo) {
            case "idCategoria":
                $categoria->setIdCategoria($valor);
                break;
            case "nombre":
                $categoria->setNombre($valor);
                break;
            default:
                // Error
        }

        $resultados = $categoria->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($idProducto, $categoria) {
        $categoria = new Categoria();
        $categoria->setIdProducto($idProducto);
        $categoria->setCategoria($categoria);
        if ($categoria->update()) {
            // Éxito
        } else {
            // Error
        }
    }

    public function destroy($idProducto) {
        $categoria = new Categoria();
        $categoria->setIdProducto($idProducto);
        if ($categoria->destroy()) {
            // Éxito
        } else {
            // Error
        }
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
}
?>
