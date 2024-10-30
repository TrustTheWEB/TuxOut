<?php

require_once("../modelo/Producto.php");

class ProductoControlador {
    
    public function index() {
        $modelo = new Producto();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados); 
        exit;
    }

    public function store($valores) {
        $modelo = new Producto();
        $modelo->setRut($valores[0]);
        $modelo->setNombre($valores[1]);
        $modelo->setDescripcion($valores[2]);
        $modelo->setPrecio($valores[3]);
        $modelo->setStock($valores[4]);
        $modelo->setEstado($valores[5]);
        $modelo->setMarca($valores[6]);
        $modelo->setOculto($valores[7]);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Producto();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "idProducto":
            $modelo->setIdProducto($valor);
            break;
            
        case "rut":
            $modelo->setRut($valor);
            break;
    
        case "nombre":
            $modelo->setNombre($valor);
            break;
    
        case "descripcion":
            $modelo->setDescripcion($valor);
            break;
    
        case "precio":
            $modelo->setPrecio($valor);
            break;
    
        case "stock":
            $modelo->setStock($valor);
            break;
    
        case "estado":
            $modelo->setEstado($valor);
            break;
    
        case "marca":
            $modelo->setMarca($valor);
            break;

        case "oculto":
            $modelo->setOculto($valor);
            break;
        default:
            break;
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($valores) {
        $modelo = new Producto();
        $modelo->setIdProducto($valores[0]);
        $modelo->setRut($valores[1]);
        $modelo->setNombre($valores[2]);
        $modelo->setDescripcion($valores[3]);
        $modelo->setPrecio($valores[4]);
        $modelo->setStock($valores[5]);
        $modelo->setEstado($valores[6]);
        $modelo->setMarca($valores[7]);
        $modelo->setOculto($valores[8]);
        
        $resultados = $modelo->update();
            header('Content-Type: application/json');
            echo json_encode($resultados);
            exit;
    }

    public function destroy($valores) {
        $modelo = new Producto();
        $modelo->setIdProducto($valores[0]);
        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    //funciones extra

    public function ocultar($valores) {
        $modelo = new Producto();
        $modelo->setIdProducto($valores[0]);
        $modelo->setOculto($valores[1]);
        $resultados = $modelo->ocultar();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    
}

?>