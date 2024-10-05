<?php

require_once("../config/Conexion.php");

class Empresa {

    private $conn;
    private $tabla = "empresa";

    private $rut;
    private $nombre;
    private $telefono;
    private $direccion;
    private $email;
    private $contraseña;

    public function __construct() {
        $this->conn = Conexion::getInstance()->getDatabaseInstance();
    }

    // Métodos GET y SET para cada atributo
    public function getRut() {
        return $this->rut;
    }

    public function setRut($rut) {
        $this->rut = $rut;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    public function getDireccion() {
        return $this->direccion;
    }

    public function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    public function getEmail() {
        return $this->email;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getContraseña() {
        return $this->contraseña;
    }

    public function setContraseña($contraseña) {
        $this->contraseña = $contraseña;
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
            $query = "INSERT INTO " . $this->tabla . " (rut, nombre, telefono, direccion, email, contraseña) VALUES (?, ?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->rut, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->telefono, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->direccion, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->email, PDO::PARAM_STR);
            $hashedPassword = password_hash($this->contraseña, PASSWORD_DEFAULT);
            $stmt->bindValue(6, $hashedPassword, PDO::PARAM_STR);

            return $stmt->execute();

        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        try {
            switch ($tipoCondicion) {
                case "rut":
                    $parametro = $this->rut;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                case "nombre":
                    $parametro = $this->nombre;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                case "telefono":
                    $parametro = $this->telefono;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                case "direccion":
                    $parametro = $this->direccion;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                case "email":
                    $parametro = $this->email;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                case "contraseña":
                    $parametro = $this->contraseña;
                    $tipoDato = PDO::PARAM_STR;
                    break;
                default:
                    throw new Exception("Tipo de condición no reconocida");
            }

            $query = "SELECT * FROM " . $this->tabla . " WHERE " . $tipoCondicion . " = ?;";
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
            $query = "UPDATE " . $this->tabla . " SET nombre=?, telefono=?, direccion=?, email=?, contraseña=? WHERE rut=?";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->telefono, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->direccion, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->email, PDO::PARAM_STR);
            $hashedPassword = password_hash($this->contraseña, PASSWORD_DEFAULT);
            $stmt->bindValue(6, $this->rut, PDO::PARAM_STR);

            return $stmt->execute();

        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE rut = ?";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(1, $this->rut, PDO::PARAM_STR);

            return $stmt->execute();

        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
    
}

?>