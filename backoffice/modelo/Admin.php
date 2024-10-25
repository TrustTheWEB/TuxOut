<?php
require_once("../config/ConexionBackOffice.php");

class Admin {
    private $conn;
    private $tabla = "admin";
    private $usuario;
    private $contra;

    public function __construct() {
        $this->conn = ConexionBackOffice::getInstance()->getDatabaseInstance();
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function getUsuario() {
        return $this->usuario;
    }

    public function setContra($contra) {
        $this->contra = $contra;
    }

    public function getContra() {
        return $this->contra;
    }

    public function login() {
        try {
            $query = "SELECT usuario, contraseña FROM " . $this->tabla . " WHERE usuario = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->usuario);
            $stmt->execute();
            $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if ($resultado && password_verify($this->contra, $resultado['contraseña'])) {
                return $resultado['usuario']; 
            }
            return false;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
    
}
?>
