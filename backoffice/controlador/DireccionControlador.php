<?php

require_once("../modelo/Direccion.php");

class DireccionControlador {

    public function index() {
        $modelo = new Direccion();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($valores) {
        $modelo = new Direccion();
        $modelo->setEmail($valores[0]);
        $modelo->setDireccion($valores[1]);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Direccion();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $modelo->setEmail($valor);
                break;

            case "direccion":
                $modelo->setDireccion($valor);
                break;

            default:
                throw new Exception("Atributo '$atributo' no válido.");
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($valores) {
        $modelo = new Direccion();
        $modelo->setEmail($valores[0]);
        $modelo->setDireccion($valores[1]);
        
        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Direccion();
        $modelo->setEmail($valores[0]);
        $modelo->setDireccion($valores[1]);
        
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
    
}

?>
