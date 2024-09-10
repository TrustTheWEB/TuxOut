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

    public function store($idPedido, $idProducto, $cantidad) {
        $modelo = new Contiene();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdPedido($idPedido);
        $modelo->setCantidad($cantidad);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
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
    
        default:
            //error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($idProducto, $idPedido) {
        $modelo = new Contiene();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdPedido($idPedido);
        $modelo->setCantidad($cantidad);
        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($idProducto, $idPedido) {
        $modelo = new Contiene();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdPedido($idPedido);
        $resultados = $modelo->destroy();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new ContieneControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"],$_POST["valor"]);
        break;
    case "store":
        $controlador->store($_POST["valores"][0], $_POST["valores"][1], $_POST["valores"][2]);
        break;
    case "update":
        $controlador->update($_POST["valores"][0], $_POST["valores"][1], $_POST["valores"][2]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
}

?>
