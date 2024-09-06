<?php

require_once("../config/Conexion.php");

class Descuento {
    private $idDescuento;
    private $porcentaje;
    private $fechaInicio;
    private $fechaFin;
    private $motivo;
    
    private $conn;
    private $tabla = "descuento";

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // Métodos GET y SET
    public function getIdDescuento() {
        return $this->idDescuento;
    }

    public function setIdDescuento($idDescuento) {
        $this->idDescuento = $idDescuento;
    }

    public function getPorcentaje() {
        return $this->porcentaje;
    }

    public function setPorcentaje($porcentaje) {
        $this->porcentaje = $porcentaje;
    }

    public function getFechaInicio() {
        return $this->fechaInicio;
    }

    public function setFechaInicio($fechaInicio) {
        $this->fechaInicio = $fechaInicio;
    }

    public function getFechaFin() {
        return $this->fechaFin;
    }

    public function setFechaFin($fechaFin) {
        $this->fechaFin = $fechaFin;
    }

    public function getMotivo() {
        return $this->motivo;
    }

    public function setMotivo($motivo) {
        $this->motivo = $motivo;
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

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "idDescuento":
                $parametro = $this->idDescuento;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "porcentaje":
                $parametro = $this->porcentaje;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "fechaInicio":
                $parametro = $this->fechaInicio;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "fechaFin":
                $parametro = $this->fechaFin;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "motivo":
                $parametro = $this->motivo;
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
    
    

    public function store() {
        try {
            $query = "INSERT INTO " . $this->tabla . " (porcentaje, fechaInicio, fechaFin, motivo) VALUES (?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->porcentaje, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->fechaInicio, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->fechaFin, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->motivo, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET porcentaje = ?, fechaInicio = ?, fechaFin = ?, motivo = ? WHERE idDescuento = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->porcentaje, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->fechaInicio, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->fechaFin, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->motivo, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->idDescuento, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idDescuento = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idDescuento, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
