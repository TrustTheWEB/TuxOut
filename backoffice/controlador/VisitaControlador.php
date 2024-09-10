<?php

require_once("../modelo/Visita.php");

class VisitaControlador {

    public function index() {
        $modelo = new Visita();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($email, $idProducto) {
        $modelo = new Visita();
        $modelo->setEmail($email);
        $modelo->setIdProducto($idProducto);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Visita();

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

            case "fecha":
                $modelo->setFecha($valor);
                break;
        
            default:
                //error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($email, $idProducto, $fecha) {
        $modelo = new Visita();
        $modelo->setEmail($email);
        $modelo->setIdProducto($idProducto);
        $modelo->setFecha($fecha);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($email, $idProducto) {
        $modelo = new Visita();
        $modelo->setEmail($email);
        $modelo->setIdProducto($idProducto);
        
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new VisitaControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"],$_POST["valor"]);
        break;
    case "store":
        $controlador->store($_POST["valores"][0],$_POST["valores"][1]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
    case "update":
        $controlador->update($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2]);
        break;
    default:
        break;
}

?>