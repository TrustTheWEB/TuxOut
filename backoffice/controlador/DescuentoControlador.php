<?php

require_once("../modelo/Descuento.php");

class DescuentoControlador {
    
    public function index() {
        $descuento = new Descuento();
        $resultados = $descuento->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($porcentaje, $fechaInicio, $fechaFin, $motivo) {
        $descuento = new Descuento();
        $descuento->setPorcentaje($porcentaje);
        $descuento->setFechaInicio($fechaInicio);
        $descuento->setFechaFin($fechaFin);
        $descuento->setMotivo($motivo);
        if($descuento->store()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }

    public function show($atributo, $valor) {
        $descuento = new Descuento();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "idDescuento":
                $descuento->setIdDescuento($valor);
                break;
            case "porcentaje":
                $descuento->setPorcentaje($valor);
                break;
            case "fechaInicio":
                $descuento->setFechaInicio($valor);
                break;
            case "fechaFin":
                $descuento->setFechaFin($valor);
                break;
            case "motivo":
                $descuento->setMotivo($valor);
                break;
            default:
                // error
        }

        $resultados = $descuento->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($idDescuento, $porcentaje, $fechaInicio, $fechaFin, $motivo) {
        $descuento = new Descuento();
        $descuento->setIdDescuento($idDescuento);
        $descuento->setPorcentaje($porcentaje);
        $descuento->setFechaInicio($fechaInicio);
        $descuento->setFechaFin($fechaFin);
        $descuento->setMotivo($motivo);
        if($descuento->update()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }

    public function destroy($idDescuento) {
        $descuento = new Descuento();
        $descuento->setIdDescuento($idDescuento);
        if($descuento->destroy()) {
            // EXITOSO
        } else {
            // ERROR
        }
    }
}

$controlador = new DescuentoControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"], $_POST["valor"]);
        break;
    // Puedes agregar aquí otros casos para métodos como store, update y destroy
}

?>