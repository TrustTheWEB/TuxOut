<?php

require_once("../config/Conexion.php");

class Categoria {

    private $conn;
    private $tabla = "categoria";

    private $idCategoria;
    private $nombre;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // idCategoria
    public function getIdCategoria() {
        return $this->idCategoria;
    }

    public function setIdCategoria($idCategoria) {
        $this->idCategoria = $idCategoria;
    }

    // nombre
    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
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
            $query = "INSERT INTO " . $this->tabla . " (nombre) VALUES (?)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->nombre, PDO::PARAM_STR);
            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "idCategoria":
                $parametro = $this->idCategoria;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "nombre":
                $parametro = $this->nombre;
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
            $query = "UPDATE " . $this->tabla . " SET nombre = ? WHERE idCategoria = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idCategoria, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idCategoria = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->idCategoria, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
