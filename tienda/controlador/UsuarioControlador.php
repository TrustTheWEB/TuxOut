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

    public function store($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $modelo->setUsuario($valores[1]);
        $modelo->setNombre($valores[2]);
        $modelo->setApellido($valores[3]);
        $modelo->setTelefono($valores[4]);
        $modelo->setContra($valores[5]);
        $modelo->setFechaNac($valores[6]);
        $modelo->setCI($valores[7]);

        $resultados = $modelo->store();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function show($valores) {
        $atributo = $valores[0];
        $valor = $valores[1];
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
                $modelo->setContra($valor);
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

    public function update($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $modelo->setUsuario($valores[1]);
        $modelo->setNombre($valores[2]);
        $modelo->setApellido($valores[3]);
        $modelo->setTelefono($valores[4]);
        $modelo->setContra($valores[5]);
        $modelo->setFechaNac($valores[6]);
        $modelo->setCI($valores[7]);

        $resultados = $modelo->update();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function destroy($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);

        $resultados = $modelo->destroy();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function registro($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $modelo->setUsuario($valores[1]);
        $modelo->setNombre($valores[2]);
        $modelo->setApellido($valores[3]);
        $modelo->setContra($valores[4]);
    
        $resultados = $modelo->registro();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function login($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $modelo->setContra($valores[1]);
    
        $resultados = $modelo->login();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function updateSinContra($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $modelo->setUsuario($valores[1]);
        $modelo->setNombre($valores[2]);
        $modelo->setApellido($valores[3]);
        $modelo->setTelefono($valores[4]);
        $modelo->setCI($valores[5]);
        $modelo->setFechaNac($valores[6]);

        $resultados = $modelo->updateSinContra();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function busquedaFavoritos($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $resultados = $modelo->busquedaFavoritos($valores[1]);
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function busquedaHistorial($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $resultados = $modelo->busquedaHistorial($valores[1]);
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function buscarValoresNull($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $resultados = $modelo->buscarValoresNull();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }

    public function updateContra($valores) {
        $modelo = new Usuario();
        $modelo->setEmail($valores[0]);
        $modelo->setContra($valores[1]);

        $resultados = $modelo->updateContra();
        header('Content-Type: application/json');
        echo json_encode($resultados);
        exit;
    }
}

?>
