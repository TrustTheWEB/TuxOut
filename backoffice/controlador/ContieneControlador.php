<?php

require_once("../modelo/Contiene.php");

class ContieneControlador {
    
    public function index() {
        $contiene = new Contiene();
        $resultados = $contiene->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($idProducto, $idPedido) {
        $contiene = new Contiene();
        $contiene->setIdProducto($idProducto);
        $contiene->setIdPedido($idPedido);
        if($contiene->store()) {
             //EXITOSO
        } else {
            //ERROR
        }
    }

    public function show($atributo, $valor) {
        $contiene = new Contiene();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "idProducto":
            $contiene->setIdProducto($valor);
            break;
    
        case "idPedido":
            $contiene->setIdPedido($valor);
            break;
    
        default:
            //error
        }

        $resultados = $contiene->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($idProducto, $idPedido) {
        $contiene = new Contiene();
        $contiene->setIdProducto($idProducto);
        $contiene->setIdPedido($idPedido);
        if($contiene->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($idProducto, $idPedido) {
        $contiene = new Contiene();
        $contiene->setIdProducto($idProducto);
        $contiene->setIdPedido($idPedido);
        $resultados = $contiene->destroy();

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
        $controlador->store($_POST["idProducto"], $_POST["idPedido"]);
        break;
    case "update":
        $controlador->update($_POST["idProducto"], $_POST["idPedido"]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
}

?>
