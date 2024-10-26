<?php

require_once("../config/Conexion.php");

class Comenta {

    private $conn;
    private $tabla = "comenta";

    private $idProducto;
    private $email;
    private $calificacion;
    private $comentario;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }
    
    // Getter y Setter para idProducto
    public function getIdProducto() {
        return $this->idProducto;
    }

    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }

    // Getter y Setter para email
    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    // Getter y Setter para calificacion
    public function getCalificacion() {
        return $this->calificacion;
    }

    public function setCalificacion($calificacion) {
        $this->calificacion = $calificacion;
    }

    // Getter y Setter para comentario
    public function getComentario() {
        return $this->comentario;
    }

    public function setComentario($comentario) {
        $this->comentario = $comentario;
    }

    // Métodos CRUD

    public function index() {
        try {
            $query = "SELECT * FROM " . $this->tabla;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function store() {
        try {
            $query = "INSERT INTO " . $this->tabla . " (idProducto, email, calificacion, comentario) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->calificacion, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->comentario, PDO::PARAM_STR);
            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
    

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "idProducto":
                $parametro = $this->idProducto;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "email":
                $parametro = $this->email;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "calificacion":
                $parametro = $this->calificacion;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "comentario":
                $parametro = $this->comentario;
                $tipoDato = PDO::PARAM_STR;
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
            $query = "UPDATE " . $this->tabla . " SET email = ?, calificacion = ?, comentario = ? WHERE idProducto = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->calificacion, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->comentario, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->idProducto, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idProducto = ? AND email = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);
            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }    
}

?>
