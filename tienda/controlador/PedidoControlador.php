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

    public function store($valores) {
        $modelo = new Pedido();
        $modelo->setEstado($valores[0]);
        $modelo->setMedioPago($valores[1]);
        $modelo->setEmail($valores[2]);

        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
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

    public function update($valores) {
        $modelo = new Pedido();
        $modelo->setIdPedido($valores[0]);
        $modelo->setEstado($valores[1]);
        $modelo->setMedioPago($valores[2]);
        $modelo->setFecha($valores[3]);
        $modelo->setEmail($valores[4]);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Pedido();
        $modelo->setIdPedido($valores[0]);

        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>

