<?php
require_once("../config/ConexionBackOffice.php");

class Admin {
    private $conexion;
    private $tabla = "admin";
    private $usuario;
    private $contraseña;

    public function __construct() {
        $this->conexion = ConexionBackOffice::getInstance()->getDatabaseInstance();
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function setContraseña($contraseña) {
        $this->contraseña = $contraseña;
    }

    public function login() {
        $query = "SELECT contraseña FROM " . $this->tabla . " WHERE usuario = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bindValue(1, $this->usuario);
        $stmt->execute();
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultado && password_verify($this->contraseña, $resultado['contraseña'])) {
            return true;
        }
        return false;
    }
}
?>
