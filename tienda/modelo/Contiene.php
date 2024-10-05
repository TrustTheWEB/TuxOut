<?php

require_once("../config/Conexion.php");

class Contiene {

    private $conn;
    private $tabla = "contiene";

    private $idPedido;
    private $idProducto;
    private $cantidad;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // idPedido
    public function getIdPedido() {
        return $this->idPedido;
    }

    public function setIdPedido($idPedido) {
        $this->idPedido = $idPedido;
    }

    // idProducto
    public function getIdProducto() {
        return $this->idProducto;
    }

    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }

    // cantidad
    public function getCantidad() {
        return $this->cantidad;
    }

    public function setCantidad($cantidad) {
        $this->cantidad = $cantidad;
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
            $query = "INSERT INTO " . $this->tabla . " (idPedido, idProducto, cantidad) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idPedido, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(3, $this->cantidad, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "idPedido":
                $parametro = $this->idPedido;
                $tipoDato = PDO::PARAM_INT;
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
            $query = "UPDATE " . $this->tabla . " SET cantidad = ? WHERE idPedido = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->cantidad, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->idPedido, PDO::PARAM_INT);
            $stmt->bindValue(3, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idPedido = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idPedido, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
