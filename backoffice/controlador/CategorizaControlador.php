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

    public function store($valores) {
        $modelo = new Categoriza();
        $modelo->setIdProducto($valores[0]);
        $modelo->setIdCategoria($valores[1]);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
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

    public function update($valores) {
        $modelo = new Categoriza();
        $modelo->setIdProducto($valores[0]);
        $modelo->setIdCategoria($valores[1]);
        if($modelo->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($valores) {
        $modelo = new Categoriza();
        $modelo->setIdProducto($valores[1]);
        $modelo->setIdCategoria($valores[0]);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>
