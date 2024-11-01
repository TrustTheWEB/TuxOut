<?php

require_once("../modelo/Comenta.php");

class ComentaControlador {
    
    public function index() {
        $modelo = new Comenta();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($valores) {
        $modelo = new Comenta();
        $modelo->setIdProducto($valores[0]);
        $modelo->setEmail($valores[1]);
        $modelo->setCalificacion($valores[2]);
        $modelo->setComentario($valores[3]);
    
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }    

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Comenta();
    
        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }
    
        switch($atributo) {
            case "idProducto":
                $modelo->setIdProducto($valor);
                break;
            case "email":
                $modelo->setEmail($valor);
                break;
            case "calificacion":
                $modelo->setCalificacion($valor);
                break;
            case "comentario":
                $modelo->setComentario($valor);
                break;
            default:
                throw new Exception("Atributo no reconocido.");
        }
    
        $resultados = $modelo->show($atributo);
    
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }    

    public function destroy($valores) {
        $modelo = new Comenta();
        $modelo->setIdProducto($valores[0]);
        $modelo->setEmail($valores[1]);
    
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }    

    public function buscarComentario($valores) {
        $modelo = new Comenta();
        $modelo->setIdProducto($valores[1]);
        $modelo->setEmail($valores[0]);
    
        $resultados = $modelo->buscarComentario();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }   
    
}

?>
