<?php

require_once("../modelo/Contiene.php");

class ContieneControlador {
    
    public function index() {
        $modelo = new Contiene();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($valores) {
        $modelo = new Contiene();
        $modelo->setIdProducto($valores[0]);
        $modelo->setIdPedido($valores[1]);
        $modelo->setCantidad($valores[2]);
        $modelo->setPrecioHistorico($valores[3]);
        $modelo->setEstado($valores[4]);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Contiene();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "idProducto":
            $modelo->setIdProducto($valor);
            break;
    
        case "idPedido":
            $modelo->setIdPedido($valor);
            break;

        case "cantidad":
            $modelo->setCantidad($valor);
            break;

        case "precioHistorico":
            $modelo->setPrecioHistorico($valor);
            break;

        case "estado":
            $modelo->setEstado($valor);
            break;
    
        default:
            //error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($valores) {
        $modelo = new Contiene();
        $modelo->setIdProducto($valores[0]);
        $modelo->setIdPedido($valores[1]);
        $modelo->setCantidad($valores[2]);
        $modelo->setPrecioHistorico($valores[3]);
        $modelo->setEstado($valores[4]);
        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Contiene();
        $modelo->setIdProducto($valores[0]);
        $modelo->setIdPedido($valores[1]);
        $resultados = $modelo->destroy();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function showPedidosEmpresa($valores) {
        $modelo = new Contiene();
        $resultados = $modelo->showPedidosEmpresa($valores[0], $valores[1]);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function cambiarEstado($valores) {
        $modelo = new Contiene();
        $modelo->setIdPedido($valores[0]);
        $modelo->setIdProducto($valores[1]);
        $modelo->setEstado($valores[2]);
        $resultados = $modelo->cambiarEstado();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>
