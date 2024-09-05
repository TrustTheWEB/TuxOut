<?php

require_once("../config/Conexion.php");

class Caracteristica {

    private $conn;
    private $tabla = "caracteristica";

    private $idProducto;
    private $nombre;
    private $valor;

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

    // nombre
    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    // valor
    public function getValor() {
        return $this->valor;
    }

    public function setValor($valor) {
        $this->valor = $valor;
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
            $query = "INSERT INTO " . $this->tabla . " (idProducto, nombre, valor) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->valor, PDO::PARAM_STR);

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
            $query = "UPDATE " . $this->tabla . " SET valor = ? WHERE idProducto = ? AND nombre = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->valor, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(3, $this->nombre, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE idProducto = ? AND nombre = ?";
            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->idProducto, PDO::PARAM_INT);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>
