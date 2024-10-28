<?php

require_once("../config/Conexion.php");

class Pedido {

    private $conn;
    private $tabla = "pedido";

    private $idPedido;
    private $estado;
    private $medioPago;
    private $fecha;
    private $email;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // Getters y Setters
    public function getIdPedido() {
        return $this->idPedido;
    }

    public function setIdPedido($idPedido) {
        $this->idPedido = $idPedido;
    }

    public function getEstado() {
        return $this->estado;
    }

    public function setEstado($estado) {
        $this->estado = $estado;
    }

    public function getMedioPago() {
        return $this->medioPago;
    }

    public function setMedioPago($medioPago) {
        $this->medioPago = $medioPago;
    }

    public function getFecha() {
        return $this->fecha;
    }

    public function setFecha($fecha) {
        $this->fecha = $fecha;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
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
            $query = "INSERT INTO " . $this->tabla . " (estado, medioPago, email) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->estado, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->medioPago, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->email, PDO::PARAM_STR);

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
            case "estado":
                $parametro = $this->estado;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "medioPago":
                $parametro = $this->medioPago;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "fecha":
                $parametro = $this->fecha;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "email":
                $parametro = $this->email;
                $tipoDato = PDO::PARAM_STR;
                break;
            default:
                throw new Exception("Tipo de condición no reconocido");
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
            $query = "UPDATE " . $this->tabla . " SET estado=?, medioPago=?, fecha=?, email=? WHERE idPedido=?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->estado, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->medioPago, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->fecha, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->idPedido, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idPedido = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idPedido, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function showFiltro($filtro) {

        switch($filtro) {
            case "recientes":
                $filtro = "fecha DESC";
                break;
            case "antiguos":
                $filtro = "fecha";
                break;
            default:
                $filtro = "fecha DESC";
                break;
        }

        try {
            $consulta = $this->conn->prepare("SELECT * FROM pedido WHERE email = ? ORDER BY " . $filtro);
            $consulta->bindValue(1, $this->email, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function verDetalles() {
        try {
            $consulta = $this->conn->prepare("SELECT * FROM vistadetalles WHERE idPedido = ? AND email = ?;");
            $consulta->bindValue(1, $this->idPedido, PDO::PARAM_INT);
            $consulta->bindValue(2, $this->email, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
