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

    public function store($valores) {
        $modelo = new Favorito();
        $modelo->setEmail($valores[0]);
        $modelo->setIdProducto($valores[1]);
       
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
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

    public function update($valores) {
        $modelo = new Favorito();
        $modelo->setEmail($valores[0]);
        $modelo->setIdProducto($valores[1]);
        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Favorito();
        $modelo->setEmail($valores[0]);
        $modelo->setIdProducto($valores[1]);
        $resultados = $modelo->destroy();

        
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>