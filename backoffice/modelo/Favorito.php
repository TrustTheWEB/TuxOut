<?php

require_once("../config/Conexion.php");

class Favorito {

    private $email;
    private $idProducto;
    private $conn;
    private $tabla = "favorito";

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }

    // Métodos CRUD

    public function index() {
        try {
            $consulta = $this->conn->prepare("SELECT * FROM " . $this->tabla . ";");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function store() {
        try {
            $query = "INSERT INTO " . $this->tabla . " (email, idProducto) VALUES (?, ?)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "email":
                $parametro = $this->email;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "idProducto":
                $parametro = $this->idProducto;
                $tipoDato = PDO::PARAM_INT;
                break;
            default:
                throw new Exception("Tipo de condición no reconocida");
        }
    
        try {
            $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?";
            $stmt = $this->conn->prepare($query);
    
            $stmt->bindValue(1, $parametro, $tipoDato);
    
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
    

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET idProducto = ? WHERE email = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE email = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
