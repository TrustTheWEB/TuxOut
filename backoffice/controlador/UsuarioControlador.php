<?php

require_once("../modelo/Usuario.php");

class UsuarioControlador {

    public function index() {
        $usuario = new Usuario();
        $resultados = $usuario->index();

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function store($email, $usuario, $nombre, $apellido, $telefono, $contraseña, $fechaNac, $ci) {
        $usuario = new Usuario();
        $usuario->setEmail($email);
        $usuario->setUsuario($usuario);
        $usuario->setNombre($nombre);
        $usuario->setApellido($apellido);
        $usuario->setTelefono($telefono);
        $usuario->setContraseña($contraseña);
        $usuario->setFechaNac($fechaNac);
        $usuario->setCI($ci);

        if ($usuario->store()) {
            // Proceso exitoso
        } else {
            // Error
        }
    }

    public function show($atributo, $valor) {
        $usuario = new Usuario();

        if (empty($valor)) {
            throw new Exception("El valor para '$atributo' está vacío o es nulo.");
        }

        switch($atributo) {
            case "email":
                $usuario->setEmail($valor);
                break;
        
            case "usuario":
                $usuario->setUsuario($valor);
                break;

            case "nombre":
                $usuario->setNombre($valor);
                break;
        
            case "apellido":
                $usuario->setApellido($valor);
                break;

            case "telefono":
                $usuario->setTelefono($valor);
                break;

            case "contraseña":
                $usuario->setContraseña($valor);
                break;

            case "fechaNac":
                $usuario->setFechaNac($valor);
                break;

            case "ci":
                $usuario->setCi($valor);
                break;

            default:
                //error
        }

        $resultados = $usuario->show($atributo);

        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function update($email, $usuario, $nombre, $apellido, $telefono, $contraseña, $fechaNac, $ci) {
        $usuario = new Usuario();
        $usuario->setEmail($email);
        $usuario->setUsuario($usuario);
        $usuario->setNombre($nombre);
        $usuario->setApellido($apellido);
        $usuario->setTelefono($telefono);
        $usuario->setContraseña($contraseña);
        $usuario->setFechaNac($fechaNac);
        $usuario->setCI($ci);

        if ($usuario->update()) {
            // Proceso exitoso
        } else {
            // Error
        }
    }

    public function destroy($email) {
        $usuario = new Usuario();
        $usuario->setEmail($email);

        if ($usuario->destroy()) {
            // Proceso exitoso
        } else {
            // Error
        }
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
    // Agrega más casos según lo necesites
}
?>
