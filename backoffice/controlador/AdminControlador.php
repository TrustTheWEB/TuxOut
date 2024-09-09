<?php
session_start();
require_once("../modelo/Admin.php");

class AdminControlador {
    public function verificarLogin($usuario, $contraseña) {
        try {
            $modelo = new Admin();
            $modelo->setUsuario($usuario);
            $modelo->setContraseña($contraseña);

            $loginExitoso = $modelo->login();

            if ($loginExitoso) {
                $_SESSION['login'] = true;
                $_SESSION['adminLogin'] = $usuario;
                echo json_encode([true, $usuario]);
            } else {
                $_SESSION['login'] = false;
                echo json_encode([false, null]);
            }
        } catch (Exception $e) {
            echo json_encode(['error' => 'Error de conexión o de base de datos']);
        }
        exit;
    }

    public function cerrarSesion() {
        session_unset();
        session_destroy();
        echo json_encode(['success' => true]);
        exit;
    }
}

$controlador = new AdminControlador();

$metodo = $_POST['metodoControlador'] ?? '';

if ($metodo == "cargarPagina") {
    if (!isset($_SESSION['login']) || !$_SESSION['login']) {
        echo json_encode([false]);
    } else {
        echo json_encode([true, $_SESSION['adminLogin']]);
    }
    exit;
}

if ($metodo == "login") {
    $controlador->verificarLogin($_POST['usuario'], $_POST['contraseña']);
}

if ($metodo == "cerrarSesion") {
    $controlador->cerrarSesion();
}
?>
