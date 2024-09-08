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

    public function store($rut, $nombre, $telefono, $direccion, $email, $contraseña) {
        $modelo = new Empresa();
        $modelo->setRut($rut);
        $modelo->setNombre($nombre);
        $modelo->setTelefono($telefono);
        $modelo->setDireccion($direccion);
        $modelo->setEmail($email);
        $modelo->setContraseña($contraseña);
        
        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Empresa();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "RUT":
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

    public function update($rut, $nombre, $telefono, $direccion, $email, $contraseña) {
        $modelo = new Empresa();
        $modelo->setRut($rut);
        $modelo->setNombre($nombre);
        $modelo->setTelefono($telefono);
        $modelo->setDireccion($direccion);
        $modelo->setEmail($email);
        $modelo->setContraseña($contraseña);
        if($modelo->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($rut) {
        $modelo = new Empresa();
        $modelo->setRut($rut);
        $resultados = $modelo->destroy();
        
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new EmpresaControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show": 
        $controlador->show($_POST["atributo"],$_POST["valor"]);
        break;
    case "store":
        $controlador->store($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3],$_POST["valores"][4],$_POST["valores"][5]);
        break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0]);
        break;
    default:
        break;
}

?>
