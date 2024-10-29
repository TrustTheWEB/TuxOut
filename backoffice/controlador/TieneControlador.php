<?php

require_once("../modelo/Tiene.php");

class TieneControlador {
    
    public function index() {
        $modelo = new Tiene();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        error_log(json_encode($resultados));
            
        exit;
    }

    public function store($valores) {
        $modelo = new Tiene();
        $modelo->setIdDescuento($valores[0]);
        $modelo->setIdProducto($valores[1]);

        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Tiene();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "idProducto":
                $modelo->setIdProducto($valor);
                break;
            case "idDescuento":
                $modelo->setIdDescuento($valor);
                break;
            default:
                // ERROR
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($valores) {
        $modelo = new Tiene();
        $modelo->setIdProducto($valores[0]);
        $modelo->setIdDescuento($valores[1]);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Tiene();
        $modelo->setIdProducto($valores[0]);
        $modelo->setIdDescuento($valores[1]);
        
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>
