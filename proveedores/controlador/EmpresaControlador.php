<?php

require_once("../modelo/Empresa.php");

class EmpresaControlador {
    
    public function index() {
        $modelo = new Empresa();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($valores) {
        $modelo = new Empresa();
        $modelo->setRut($valores[0]);
        $modelo->setNombre($valores[1]);
        $modelo->setTelefono($valores[2]);
        $modelo->setDireccion($valores[3]);
        $modelo->setEmail($valores[4]);
        $modelo->setContraseña($valores[5]);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
        $modelo = new Empresa();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' esta vacio o es nulo.");
        }

        switch($atributo) {
        case "rut":
            $modelo->setRut($valor);
            break;
    
        case "nombre":
            $modelo->setNombre($valor);
            break;
    
        case "telefono":
            $modelo->setTelefono($valor);
            break;
    
        case "direccion":
            $modelo->setDireccion($valor);
            break;
    
        case "email":
            $modelo->setEmail($valor);
            break;
    
        case "contraseña":
            $modelo->setContraseña($valor);
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
        $modelo = new Empresa();
        $modelo->setRut($valores[0]);
        $modelo->setNombre($valores[1]);
        $modelo->setTelefono($valores[2]);
        $modelo->setDireccion($valores[3]);
        $modelo->setEmail($valores[4]);
        $modelo->setContraseña($valores[5]);

        $resultados = $modelo->update();
            header('Content-Type: application/json');
            echo json_encode($resultados);
            exit;
    }

    public function destroy($valores) {
        $modelo = new Empresa();
        $modelo->setRut($valores[0]);
        $resultados = $modelo->destroy();
        
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function registro($valores) {
        $modelo = new Empresa();
        $modelo->setRut($valores[0]);
        $modelo->setNombre($valores[1]);
        $modelo->setTelefono($valores[2]);
        $modelo->setDireccion($valores[3]);
        $modelo->setEmail($valores[4]);
        $modelo->setContraseña($valores[5]);
        
        $resultados = $modelo->registro();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function login($valores) {
        $modelo = new Empresa();
        $modelo->setEmail($valores[0]);
        $modelo->setContraseña($valores[1]);
        
        $resultados = $modelo->login();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}


?>
