<?php

require_once("../modelo/Categoriza.php");

class CategorizaControlador {
    
    public function index() {
        $modelo = new Categoriza();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($idProducto, $idCategoria) {
        $modelo = new Categoriza();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdCategoria($idCategoria);
        
        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Categoriza();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "idProducto":
            $modelo->setIdProducto($valor);
            break;
    
        case "idCategoria":
            $modelo->setIdCategoria($valor);
            break;
    
        default:
            //error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($idProducto, $idCategoria) {
        $modelo = new Categoriza();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdCategoria($idCategoria);
        if($modelo->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($idProducto, $idCategoria) {
        $modelo = new Categoriza();
        $modelo->setIdProducto($idProducto);
        $modelo->setIdCategoria($idCategoria);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new CategorizaControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"],$_POST["valor"]);
        break;
    case "store":
        $controlador->store($_POST["valores"][0], $_POST["valores"][1]);
        break;
    case "update":
        $controlador->update($_POST["valores"][0], $_POST["valores"][1]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
}

?>
