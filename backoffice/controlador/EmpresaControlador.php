<?php

require_once("../modelo/Empresa.php");

class EmpresaControlador {
    
    public function index() {
        $empresa = new Empresa();
        $resultados = $empresa->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($rut, $nombre, $telefono, $direccion, $email, $contraseña) {
        $empresa = new Empresa();
        $empresa->setRut($rut);
        $empresa->setNombre($nombre);
        $empresa->setTelefono($telefono);
        $empresa->setDireccion($direccion);
        $empresa->setEmail($email);
        $empresa->setContraseña($contraseña);
        if($empresa->store()) {
             //EXITOSO
        } else {
            //ERROR
        }
    }

    public function show($atributo, $valor) {
        $empresa = new Empresa();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
        case "RUT":
            $empresa->setRut($valor);
            break;
    
        case "nombre":
            $empresa->setNombre($valor);
            break;
    
        case "telefono":
            $empresa->setTelefono($valor);
            break;
    
        case "direccion":
            $empresa->setDireccion($valor);
            break;
    
        case "email":
            $empresa->setEmail($valor);
            break;
    
        case "contraseña":
            $empresa->setContraseña($valor);
            break;
    
        default:
            //error
        }

        $resultados = $empresa->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
            
        exit;
    }

    public function update($rut, $nombre, $telefono, $direccion, $email, $contraseña) {
        $empresa = new Empresa();
        $empresa->setRut($rut);
        $empresa->setNombre($nombre);
        $empresa->setTelefono($telefono);
        $empresa->setDireccion($direccion);
        $empresa->setEmail($email);
        $empresa->setContraseña($contraseña);
        if($empresa->update()) {
            //EXITOSO
       } else {
           //ERROR
       }
    }

    public function destroy($rut) {
        $empresa = new Empresa();
        $empresa->setRut($rut);
        if($empresa->destroy()) {
            //EXITOSO
       } else {
           //ERROR
       }
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
}

?>
