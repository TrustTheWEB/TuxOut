<?php

require_once("../config/Conexion.php");

class Categoriza {

    private $conn;
    private $tabla = "categoriza";

    private $idCategoria;
    private $idProducto;

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

    // idProducto
    public function getIdProducto() {
        return $this->idProducto;
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
            $query = "INSERT INTO " . $this->tabla . " (idCategoria, idProducto) VALUES (?, ?)";
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([$this->idCategoria, $this->idProducto]);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        try {
            $query = "SELECT * FROM " . $this->tabla . " WHERE $tipoCondicion = ?";
            $stmt = $this->conn->prepare($query);

            switch ($tipoCondicion) {
                case "idCategoria":
                    $parametro = $this->idCategoria;
                    $tipoDato = PDO::PARAM_INT;
                    break;
                case "idProducto":
                    $parametro = $this->idProducto;
                    $tipoDato = PDO::PARAM_INT;
                    break;
                default:
                    throw new Exception("Tipo de condición no reconocida");
            }

            $stmt->bindValue(1, $parametro, $tipoDato);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        }
    }

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET idCategoria = ?, idProducto = ? WHERE idCategoria = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([$this->idCategoria, $this->idProducto, $this->idCategoria, $this->idProducto]);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idCategoria = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([$this->idCategoria, $this->idProducto]);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
