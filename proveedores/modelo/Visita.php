<?php

require_once("../config/Conexion.php");

class Visita {
    private $email;
    private $idProducto;
    private $fecha;
    private $tabla = "visita";

    private $conn;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // Getters y Setters
    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getIdProducto() {
        return $this->idProducto;
    }

    public function setIdProducto($idProducto) {
        $this->idProducto = $idProducto;
    }

    public function getFecha() {
        return $this->fecha;
    }

    public function setFecha($fecha) {
        $this->fecha = $fecha;
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
        try {
            switch ($tipoCondicion) {
                case "email":
                    $parametro = $this->email;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                case "idProducto":
                    $parametro = $this->idProducto;
                    $tipoDato = PDO::PARAM_INT;
                    break;
                case "fecha":
                    $parametro = $this->fecha;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                default:
                    throw new Exception("Tipo de condición no reconocida");
            }

            $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $parametro, $tipoDato);

            $stmt->execute();

            $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (!$resultados) {
                throw new Exception("No se encontraron resultados para la consulta.");
            }

            return $resultados;
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET fecha = ? WHERE email = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->fecha, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->idProducto, PDO::PARAM_INT);

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

    public function actualizarFecha() {
        try {
            $query = "UPDATE " . $this->tabla . " SET fecha = NOW() WHERE email = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function visitado() {
        try {
            $query = "SELECT * FROM " . $this->tabla . " WHERE email = ? AND idProducto = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);

            if($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    return true;
                } else {
                    return "no";
                }
            }else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
