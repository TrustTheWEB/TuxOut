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

    public function store($porcentaje, $fechaInicio, $fechaFin, $motivo) {
        $modelo = new Descuento();
        $modelo->setPorcentaje($porcentaje);
        $modelo->setFechaInicio($fechaInicio);
        $modelo->setFechaFin($fechaFin);
        $modelo->setMotivo($motivo);
        $resultados = $modelo->store();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
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

    public function update($idDescuento, $porcentaje, $fechaInicio, $fechaFin, $motivo) {
        $modelo = new Descuento();
        $modelo->setIdDescuento($idDescuento);
        $modelo->setPorcentaje($porcentaje);
        $modelo->setFechaInicio($fechaInicio);
        $modelo->setFechaFin($fechaFin);
        $modelo->setMotivo($motivo);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($idDescuento) {
        $modelo = new Descuento();
        $modelo->setIdDescuento($idDescuento);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
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
    case "store":
        $controlador->store($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0]);
        break;
    case "update":
        $controlador->update($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3],$_POST["valores"][4]);
        break;
    default:
        break;
}

?>