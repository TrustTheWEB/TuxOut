<?php

require_once("../modelo/Descuento.php");

class DescuentoControlador {
    
    public function index() {
        $modelo = new Descuento();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($valores) {
        $modelo = new Descuento();
        $modelo->setPorcentaje($valores[0]);
        $modelo->setFechaInicio($valores[1]);
        $modelo->setFechaFin($valores[2]);
        $modelo->setMotivo($valores[3]);
        $resultados = $modelo->store();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Descuento();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "idDescuento":
                $modelo->setIdDescuento($valor);
                break;
            case "porcentaje":
                $modelo->setPorcentaje($valor);
                break;
            case "fechaInicio":
                $modelo->setFechaInicio($valor);
                break;
            case "fechaFin":
                $modelo->setFechaFin($valor);
                break;
            case "motivo":
                $modelo->setMotivo($valor);
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
        $modelo = new Descuento();
        $modelo->setIdDescuento($valores[0]);
        $modelo->setPorcentaje($valores[1]);
        $modelo->setFechaInicio($valores[2]);
        $modelo->setFechaFin($valores[3]);
        $modelo->setMotivo($valores[4]);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Descuento();
        $modelo->setIdDescuento($valores[0]);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>