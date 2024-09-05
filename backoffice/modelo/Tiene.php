<?php

require_once("../config/Conexion.php");

class Tiene {

    private $conn;
    private $tabla = "tiene";

    private $idProducto;
    private $idDescuento;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // idProducto
    public function getIdProducto() {
        return $this->idProducto;
    }

    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }

    // idDescuento
    public function getIdDescuento() {
        return $this->idDescuento;
    }

    public function setIdDescuento($idDescuento) {
        $this->idDescuento = $idDescuento;
    }

    // Métodos principales

    public function index() {
        try {
            $consulta = $this->conn->prepare("SELECT * FROM " . $this->tabla . ";");
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function store() { // create - store
        try {
            $query = "INSERT INTO " . $this->tabla . " (idProducto, idDescuento) VALUES (?, ?)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->idDescuento, PDO::PARAM_INT);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }

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
            case "idDescuento":
                $parametro = $this->idDescuento;
                $tipoDato = PDO::PARAM_INT;
                break;
            default:
                throw new Exception("Tipo de condición no reconocida");
        }
    
        $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?;";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindValue(1, $parametro, $tipoDato);
        
        $stmt->execute();
        
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
        if (!$resultados) {
            throw new Exception("No se encontraron resultados para la consulta: " . $query . " con el valor: " . $parametro);
        }
    
        return $resultados;
    }

    public function update() { // edit - update
        $query = "UPDATE " . $this->tabla . " SET idDescuento=? WHERE idProducto=?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(1, $this->idDescuento, PDO::PARAM_INT);
        $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function destroy() {
        $query = "DELETE FROM " . $this->tabla . " WHERE idProducto = ? AND idDescuento = ?";

        $stmt = $this->conn->prepare($query);

        $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);
        $stmt->bindValue(2, $this->idDescuento, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}

?>
