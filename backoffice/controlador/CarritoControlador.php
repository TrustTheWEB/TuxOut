<?php

require_once("../modelo/Carrito.php");

class CarritoControlador {

    public function index() {
        $modelo = new Carrito();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($valores) {
        $modelo = new Carrito();
        $modelo->setEmail($valores[0]);
        $modelo->setIdProducto($valores[1]);
        $modelo->setCantidad($valores[2]);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Carrito();

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

            case "cantidad":
                $modelo->setCantidad($valor);
                break;
        
            default:

        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($valores) {
        $modelo = new Carrito();
        $modelo->setEmail($valores[0]);
        $modelo->setIdProducto($valores[1]);
        $modelo->setCantidad($valores[2]);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Carrito();
        $modelo->setEmail($valores[0]);
        $modelo->setIdProducto($valores[1]);
        
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function verificarCarrito($valores) {
        $modelo = new Carrito();
        $modelo->setEmail($valores[0]);
        $modelo->setIdProducto($valores[1]);
        
        $resultados = $modelo->verificarCarrito();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>