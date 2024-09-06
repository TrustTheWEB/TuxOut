<?php

require_once("../modelo/Pedido.php");

class PedidoControlador {

    public function index() {
        $pedido = new Pedido();
        $resultados = $pedido->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($estado, $medioPago, $montoTotal, $fecha, $email) {
        $pedido = new Pedido();
        $pedido->setEstado($estado);
        $pedido->setMedioPago($medioPago);
        $pedido->setMontoTotal($montoTotal);
        $pedido->setFecha($fecha);
        $pedido->setEmail($email);

        if($pedido->store()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Error al guardar el pedido."]);
        }
        exit;
    }

    public function show($atributo, $valor) {
        $pedido = new Pedido();
    
        switch($atributo) {
            case "idPedido":
                $pedido->setIdPedido($valor);
                break;
        
            case "estado":
                $pedido->setEstado($valor);
                break;
        
            case "medioPago":
                $pedido->setMedioPago($valor);
                break;
        
            case "montoTotal":
                $pedido->setMontoTotal($valor);
                break;
        
            case "fecha":
                $pedido->setFecha($valor);
                break;
        
            case "email":
                $pedido->setEmail($valor);
                break;
        
            default:
                // manejar error
        }
        
        $resultados = $pedido->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($idPedido, $estado, $medioPago, $montoTotal, $fecha, $email) {
        $pedido = new Pedido();
        $pedido->setIdPedido($idPedido);
        $pedido->setEstado($estado);
        $pedido->setMedioPago($medioPago);
        $pedido->setMontoTotal($montoTotal);
        $pedido->setFecha($fecha);
        $pedido->setEmail($email);

        if($pedido->update()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Error al actualizar el pedido."]);
        }
        exit;
    }

    public function destroy($idPedido) {
        $pedido = new Pedido();
        $pedido->setIdPedido($idPedido);

        $resultados = $pedido->destroy();
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
    case "destroy":
        $controlador->destroy($_POST["valores"][0]);
        break;
    default:
        break;
    // Otros métodos pueden ser añadidos aquí
}

?>

