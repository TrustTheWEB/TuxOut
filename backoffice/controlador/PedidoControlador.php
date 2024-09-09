<?php

require_once("../modelo/Pedido.php");

class PedidoControlador {

    public function index() {
        $modelo = new Pedido();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($estado, $medioPago, $montoTotal, $fecha, $email) {
        $modelo = new Pedido();
        $modelo->setEstado($estado);
        $modelo->setMedioPago($medioPago);
        $modelo->setMontoTotal($montoTotal);
        $modelo->setFecha($fecha);
        $modelo->setEmail($email);

        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Pedido();
    
        switch($atributo) {
            case "idPedido":
                $modelo->setIdPedido($valor);
                break;
        
            case "estado":
                $modelo->setEstado($valor);
                break;
        
            case "medioPago":
                $modelo->setMedioPago($valor);
                break;
        
            case "montoTotal":
                $modelo->setMontoTotal($valor);
                break;
        
            case "fecha":
                $modelo->setFecha($valor);
                break;
        
            case "email":
                $modelo->setEmail($valor);
                break;
        
            default:
                // manejar error
        }
        
        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($idPedido, $estado, $medioPago, $montoTotal, $fecha, $email) {
        $modelo = new Pedido();
        $modelo->setIdPedido($idPedido);
        $modelo->setEstado($estado);
        $modelo->setMedioPago($medioPago);
        $modelo->setMontoTotal($montoTotal);
        $modelo->setFecha($fecha);
        $modelo->setEmail($email);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($idPedido) {
        $modelo = new Pedido();
        $modelo->setIdPedido($idPedido);

        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new PedidoControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"], $_POST["valor"]);
        break;
    case "store":
        $controlador->store($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3],$_POST["valores"][4]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0]);
        break;
    case "update":
        $controlador->update($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3],$_POST["valores"][4],$_POST["valores"][5]);
        break;
    default:
        break;
    // Otros métodos pueden ser añadidos aquí
}

?>

