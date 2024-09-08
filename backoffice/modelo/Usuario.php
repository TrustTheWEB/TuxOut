<?php

require_once("../config/Conexion.php");

class Usuario {

    private $conn;
    private $tabla = "usuario";

    private $email;
    private $usuario;
    private $nombre;
    private $apellido;
    private $telefono;
    private $contraseña;
    private $fechaNac;
    private $ci;

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

    public function getUsuario() {
        return $this->usuario;
    }

    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    public function getNombre() {
        return $this->nombre;
    }

    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    public function getApellido() {
        return $this->apellido;
    }

    public function setApellido($apellido) {
        $this->apellido = $apellido;
    }

    public function getTelefono() {
        return $this->telefono;
    }

    public function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    public function getContraseña() {
        return $this->contraseña;
    }

    public function setContraseña($contraseña) {
        $this->contraseña = $contraseña;
    }

    public function getFechaNac() {
        return $this->fechaNac;
    }

    public function setFechaNac($fechaNac) {
        $this->fechaNac = $fechaNac;
    }

    public function getCI() {
        return $this->ci;
    }

    public function setCI($ci) {
        $this->ci = $ci;
    }

    // Métodos CRUD

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

    public function store() {
        try {
            $query = "INSERT INTO " . $this->tabla . " (email, usuario, nombre, apellido, telefono, contraseña, fechaNac, ci) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->usuario, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->apellido, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->telefono, PDO::PARAM_STR);
            $hashedPassword = password_hash($this->contraseña, PASSWORD_DEFAULT);
            $stmt->bindValue(6, $hashedPassword, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->fechaNac, PDO::PARAM_STR);
            $stmt->bindValue(8, $this->ci, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function show($tipoCondicion) {
        switch ($tipoCondicion) {
            case "email":
                $parametro = $this->email;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "usuario":
                $parametro = $this->usuario;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "nombre":
                $parametro = $this->nombre;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "apellido":
                $parametro = $this->apellido;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "telefono":
                $parametro = $this->telefono;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "contraseña":
                $parametro = $this->contraseña;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "fechaNac":
                $parametro = $this->fechaNac;
                $tipoDato = PDO::PARAM_STR;
                break;
            case "ci":
                $parametro = $this->ci;
                $tipoDato = PDO::PARAM_STR;
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

    public function update() {
        try {
            $query = "UPDATE " . $this->tabla . " SET usuario=?, nombre=?, apellido=?, telefono=?, contraseña=?, fechaNac=?, ci=? WHERE email=?";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->usuario, PDO::PARAM_STR);
            $stmt->bindValue(2, $this->nombre, PDO::PARAM_STR);
            $stmt->bindValue(3, $this->apellido, PDO::PARAM_STR);
            $stmt->bindValue(4, $this->telefono, PDO::PARAM_STR);
            $stmt->bindValue(5, $this->contraseña, PDO::PARAM_STR);
            $stmt->bindValue(6, $this->fechaNac, PDO::PARAM_STR);
            $stmt->bindValue(7, $this->ci, PDO::PARAM_STR);
            $stmt->bindValue(8, $this->email, PDO::PARAM_STR);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }

    public function destroy() {
        try {
            $query = "DELETE FROM " . $this->tabla . " WHERE email = ?";

            $stmt = $this->conn->prepare($query);

            $stmt->bindValue(1, $this->email, PDO::PARAM_STR);

            if ($stmt->execute()) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return "Error en la consulta: " . $e->getMessage();
        }
    }
}

?>