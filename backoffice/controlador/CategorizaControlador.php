<?php

require_once("../modelo/Categoriza.php");

class CategorizaControlador {
    
    public function index() {
        $categoriza = new Categoriza();
        $resultados = $categoriza->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($idProducto, $idCategoria) {
        $categoriza = new Categoriza();
        $categoriza->setIdProducto($idProducto);
        $categoriza->setIdCategoria($idCategoria);
        if($categoriza->store()) {
             //EXITOSO
        } else {
            //ERROR
        }
    }

    public function show($atributo, $valor) {
        $categoriza = new Categoriza();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "idProducto":
            $categoriza->setIdProducto($valor);
            break;
    
        case "idCategoria":
            $categoriza->setIdCategoria($valor);
            break;
    
        default:
            //error
        }

        $resultados = $categoriza->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($idProducto, $idCategoria) {
        $categoriza = new Categoriza();
        $categoriza->setIdProducto($idProducto);
        $categoriza->setIdCategoria($idCategoria);
        if($categoriza->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($idProducto, $idCategoria) {
        $categoriza = new Categoriza();
        $categoriza->setIdProducto($idProducto);
        $categoriza->setIdCategoria($idCategoria);
        $resultados = $categoriza->destroy();
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
        $controlador->store($_POST["idProducto"], $_POST["idCategoria"]);
        break;
    case "update":
        $controlador->update($_POST["idProducto"], $_POST["idCategoria"]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
}

?>
