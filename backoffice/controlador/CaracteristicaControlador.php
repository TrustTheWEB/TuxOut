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

    public function store($valores) {
        $modelo = new Caracteristica();
        $modelo->setIdProducto($valores[0]);
        $modelo->setNombre($valores[1]);
        $modelo->setValor($valores[2]);

        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
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

    public function update($valores) {
        $modelo = new Caracteristica();
        $modelo->setIdProducto($valores[0]);
        $modelo->setNombre($valores[1]);
        $modelo->setValor($valores[2]);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Caracteristica();
        $modelo->setIdProducto($valores[0]);
        $modelo->setNombre($valores[1]);
        $modelo->setValor($valores[2]);
        
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>
