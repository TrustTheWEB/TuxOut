<?php

require_once("../config/Conexion.php");

class Contiene {

    private $conn;
    private $tabla = "contiene";

    private $idPedido;
    private $idProducto;
    private $cantidad;
    private $precioHistorico;
    private $estado;

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

    public function getPrecioHistorico() {
        return $this->precioHistorico;
    }
    
    public function setPrecioHistorico($precioHistorico) {
        $this->precioHistorico = $precioHistorico;
    }
    
    public function getEstado() {
        return $this->estado;
    }
    
    public function setEstado($estado) {
        $this->estado = $estado;
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
            $query = "INSERT INTO " . $this->tabla . " (idPedido, idProducto, cantidad, precioHistorico, estado) VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idPedido, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(3, $this->cantidad, PDO::PARAM_INT);
            $stmt->bindValue(4, $this->precioHistorico, PDO::PARAM_INT);
            $stmt->bindValue(5, $this->estado, PDO::PARAM_STR);

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
            case "cantidad":
                $parametro = $this->cantidad;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "precioHistorico":
                $parametro = $this->idProducto;
                $tipoDato = PDO::PARAM_INT;
                break;
            case "estado":
                $parametro = $this->idProducto;
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
            $query = "UPDATE " . $this->tabla . " SET cantidad = ?, precioHistorico = ?, estado = ? WHERE idPedido = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->cantidad, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->precioHistorico, PDO::PARAM_INT);
            $stmt->bindValue(3, $this->estado, PDO::PARAM_INT);
            $stmt->bindValue(4, $this->idPedido, PDO::PARAM_INT);
            $stmt->bindValue(5, $this->idProducto, PDO::PARAM_INT);

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

    public function showPedidosEmpresa($rut, $filtro) {
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
            $consulta = $this->conn->prepare("SELECT * FROM vistapedidosempresa
                WHERE RUT = ?
                ORDER BY $filtro;");

            $consulta->bindValue(1, $rut, PDO::PARAM_STR);
            $consulta->execute();
            $resultados = $consulta->fetchAll(PDO::FETCH_ASSOC);

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function cambiarEstado() {
        try {
            $query = "UPDATE " . $this->tabla . " SET estado = ? WHERE idPedido = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->estado, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->idPedido, PDO::PARAM_INT);
            $stmt->bindValue(3, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
