<?php

require_once("../modelo/Visita.php");

class VisitaControlador {

    public function index() {
        $visita = new Visita();
        $resultados = $visita->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function store($email, $idProducto, $fecha) {
        $visita = new Visita();
        $visita->setEmail($email);
        $visita->setIdProducto($idProducto);
        $visita->setFecha($fecha);
        if($visita->store()) {
             //EXITOSO
        } else {
            //ERROR
        }
    }

    public function show($atributo, $valor) {
        $visita = new Visita();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $visita->setEmail($valor);
                break;
        
            case "idProducto":
                $visita->setIdProducto($valor);
                break;

            case "fecha":
                $visita->setFecha($valor);
                break;
        
            default:
                //error
        }

        $resultados = $visita->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($email, $idProducto, $fecha) {
        $visita = new Visita();
        $visita->setEmail($email);
        $visita->setIdProducto($idProducto);
        $visita->setFecha($fecha);
        if($visita->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($email, $idProducto) {
        $visita = new Visita();
        $visita->setEmail($email);
        $visita->setIdProducto($idProducto);
        
        $resultados = $visita->destroy();
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
    case "destroy":
        $controlador->destroy($_POST["valores"][0], $_POST["valores"][1]);
        break;
    default:
        break;
}

?>