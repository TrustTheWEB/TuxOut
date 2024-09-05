<?php

require_once("../config/Conexion.php");

class Direccion {
    private $email;
    private $direccion;

    private $conexion;
    private $tabla = "direccion";

    public function __construct() {
        $this->conexion = Conexion::getInstance()->getDatabaseInstance();
    }

    // Métodos GET y SET
    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getDireccion() {
        return $this->direccion;
    }

    public function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    // Métodos CRUD

    public function index() {
        try {
            $consulta = $this->conexion->prepare("SELECT * FROM " . $this->tabla . ";");
            $consulta->execute();
            return $consulta->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function store() {
        try {
            $query = "INSERT INTO " . $this->tabla . " (email, direccion) VALUES (?, ?)";
            $stmt = $this->conexion->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->direccion, PDO::PARAM_STR);

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
                case "direccion":
                    $parametro = $this->direccion;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                default:
                    throw new Exception("Tipo de condición no reconocido");
            }

            $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?;";
            $stmt = $this->conexion->prepare($query);
            $stmt->bindValue(1, $parametro, $tipoDato);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET direccion = ? WHERE email = ?";
            $stmt = $this->conexion->prepare($query);

            $stmt->bindValue(1, $this->direccion, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->email, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE email = ?";
            $stmt = $this->conexion->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
