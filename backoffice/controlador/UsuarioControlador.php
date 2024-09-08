<?php

require_once("../modelo/Usuario.php");

class UsuarioControlador {

    public function index() {
        $modelo = new Usuario();
        $resultados = $modelo->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($email, $usuario, $nombre, $apellido, $telefono, $contraseña, $fechaNac, $ci) {
        $modelo = new Usuario();
        $modelo->setEmail($email);
        $modelo->setUsuario($usuario);
        $modelo->setNombre($nombre);
        $modelo->setApellido($apellido);
        $modelo->setTelefono($telefono);
        $modelo->setContraseña($contraseña);
        $modelo->setFechaNac($fechaNac);
        $modelo->setCI($ci);

        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($atributo, $valor) {
        $modelo = new Usuario();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $modelo->setEmail($valor);
                break;
        
            case "usuario":
                $modelo->setUsuario($valor);
                break;

            case "nombre":
                $modelo->setNombre($valor);
                break;
        
            case "apellido":
                $modelo->setApellido($valor);
                break;

            case "telefono":
                $modelo->setTelefono($valor);
                break;

            case "contraseña":
                $modelo->setContraseña($valor);
                break;

            case "fechaNac":
                $modelo->setFechaNac($valor);
                break;

            case "ci":
                $modelo->setCi($valor);
                break;

            default:
                //error
        }

        $resultados = $modelo->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($email, $usuario, $nombre, $apellido, $telefono, $contraseña, $fechaNac, $ci) {
        $modelo = new Usuario();
        $modelo->setEmail($email);
        $modelo->setUsuario($usuario);
        $modelo->setNombre($nombre);
        $modelo->setApellido($apellido);
        $modelo->setTelefono($telefono);
        $modelo->setContraseña($contraseña);
        $modelo->setFechaNac($fechaNac);
        $modelo->setCI($ci);

        if ($modelo->update()) {
            // Proceso exitoso
        } else {
            // Error
        }
    }

    public function destroy($email) {
        $modelo = new Usuario();
        $modelo->setEmail($email);

        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

$controlador = new UsuarioControlador();
$metodo = $_POST["metodoControlador"];

switch($metodo) {
    case "index":
        $controlador->index();
        break;
    case "show":
        $controlador->show($_POST["atributo"], $_POST["valor"]);
        break;
    case "store":
            $controlador->store($_POST["valores"][0],$_POST["valores"][1],$_POST["valores"][2],$_POST["valores"][3],$_POST["valores"][4],$_POST["valores"][5],$_POST["valores"][6],$_POST["valores"][7]);
            break;
    case "destroy":
        $controlador->destroy($_POST["valores"][0]);
        break;
    default:
        break;
    // Agrega más casos según lo necesites
}
?>
