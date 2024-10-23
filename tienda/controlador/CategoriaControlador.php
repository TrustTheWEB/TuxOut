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

    public function store($valores) {
        $modelo = new Categoria();
        $modelo->setNombre($valores[0]);
        $resultados = $modelo->store();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
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

    public function update($valores) {
        $modelo = new Categoria();
        $modelo->setIdCategoria($valores[0]);
        $modelo->setNombre($valores[1]);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Categoria();
        $modelo->setIdCategoria($valores[0]);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function busquedaCategoria($valores) {
        $modelo = new Categoria();
        $modelo->setNombre($valores[0]);
        $resultados = $modelo->busquedaCategoria();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>
